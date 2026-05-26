import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, PanResponder, Animated, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RECEITAS } from '../../data/receitas';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SHEET_COLLAPSED = SCREEN_HEIGHT * 0.55;
const SHEET_EXPANDED  = SCREEN_HEIGHT * 0.12;

export default function RecipeDetail() {
    const router = useRouter();

    const { id } = useLocalSearchParams<{ id: string }>();

    const recipe = RECEITAS.find(r => r.id === id);

    const [isFav, setIsFav] = useState(false);

    const translateY = useRef(new Animated.Value(SHEET_COLLAPSED)).current;

    const currentY = useRef(SHEET_COLLAPSED);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderMove: (_, gestureState) => {
                const newY = currentY.current + gestureState.dy;
                const clamped = Math.max(SHEET_EXPANDED, Math.min(SHEET_COLLAPSED, newY));
                translateY.setValue(clamped);
            },

            onPanResponderRelease: (_, gestureState) => {
                const shouldExpand = gestureState.dy < -50 || gestureState.vy < -0.5;
                const toValue = shouldExpand ? SHEET_EXPANDED : SHEET_COLLAPSED;
                Animated.spring(translateY, {
                    toValue,
                    useNativeDriver: true,
                    damping: 20,
                    stiffness: 200,
                }).start();

                currentY.current = toValue;
            },
        })
    ).current;

    if (!recipe) {
        return (
            <View style={styles.notFound}>
                <Text>Receita não encontrada</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={{ color: '#3b82f6' }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

return (
        <>
            <Image source={{ uri: recipe.image }} style={styles.backgroundImage}/>

            <SafeAreaView style={styles.topButtons}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton} onPress={() => setIsFav(f => !f)}>
                    <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={22} color={isFav ? '#ef4444' : '#fff'}/>
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
                <View style={styles.dragHandle} {...panResponder.panHandlers}>
                    <View style={styles.handleBar}/>
                </View>

                <ScrollView style={styles.sheetScroll} showsVerticalScrollIndicator={false} scrollEnabled={currentY.current === SHEET_EXPANDED}>
                    <Text style={styles.recipeName}>{recipe.name}</Text>

                    <View style={styles.metaRow}>
                        <MetaChip icon="time-outline"  label={recipe.time} />
                        <MetaChip icon="people-outline" label={`${recipe.servings} porções`} />
                        <MetaChip icon="speedometer-outline" label={recipe.difficulty} />
                    </View>

                    <Text style={styles.sectionTitle}>Descrição</Text>
                    <Text style={styles.bodyText}>{recipe.description}</Text>

                    <Text style={styles.sectionTitle}>Ingredientes</Text>
                    {recipe.ingredients.map((ing, index) => (
                        <View key={index} style={styles.ingredientRow}>
                        <View style={styles.bullet} />
                        <Text style={styles.bodyText}>{ing}</Text>
                        </View>
                    ))}

                    <Text style={styles.sectionTitle}>Modo de Preparo</Text>
                    {recipe.steps.map((step, index) => (
                        <View key={index} style={styles.stepRow}>
                        <Text style={styles.stepNumber}>{index + 1}</Text>
                        <Text style={[styles.bodyText, { flex: 1 }]}>{step}</Text>
                        </View>
                    ))}

                     <View style={{ height: 40 }} />
                </ScrollView>
            </Animated.View>
        </>
    );
}

function MetaChip({ icon, label }: { icon: any; label: string }) {
    return (
        <View style={styles.chip}>
        <Ionicons name={icon} size={14} color="#3b82f6" />
        <Text style={styles.chipText}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%',
    height: '100%',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 24,
    padding: 8,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d1d5db',
  },
  sheetScroll: {
    paddingHorizontal: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 4,
  },
  bodyText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 13,
    fontWeight: '700',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});