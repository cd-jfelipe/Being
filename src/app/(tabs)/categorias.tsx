import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RECEITAS, CATEGORIAS, Recipe } from '../../data/receitas';

export default function Categorias() {
    const router = useRouter();

    const [selected, setSelected] = useState<string | null>(null);

    const filtered = selected
        ? RECEITAS.filter(r => r.category === selected)
        : [];

    if (selected) {
        return (
            <SafeAreaView style={styles.container}>
                    <View style={styles.categoryHeader}>
                        <TouchableOpacity onPress={() => setSelected(null)}>
                            <Ionicons name="arrow-back" size={24} color="#111" />
                        </TouchableOpacity>
                        <Text style={styles.header}>{selected}</Text>
                        <View style={{ width: 24 }} />
                    </View>

                <FlatList
                    key="receitas"
                    data={filtered}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: 16 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.horizontalCard}
                            onPress={() => router.push(`/receitas/${item.id}`)}
                            activeOpacity={0.85}
                        >
                            <Image source={{ uri: item.image }} style={styles.horizontalImage} />
                            <View style={styles.horizontalInfo}>
                                <Text style={styles.cardName}>{item.name}</Text>
                                <Text style={styles.cardMeta}>{item.time} · {item.difficulty}</Text>
                                <Text style={styles.cardDesc} numberOfLines={2}>
                                {item.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        );
    }

return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Categorias</Text>

        <FlatList
            key="categorias"
            data={CATEGORIAS}
            keyExtractor={item => item}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: category }) => {
                const cover = RECEITAS.find(r => r.category === category);
                const count = RECEITAS.filter(r => r.category === category).length;

            return (
                <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => setSelected(category)}
                activeOpacity={0.85}
                >
                    <Image source={{ uri: cover?.image }} style={styles.categoryImage} />
                    <View style={styles.overlay} />
                    <View style={styles.categoryLabel}>
                        <Text style={styles.categoryName}>{category}</Text>
                        <Text style={styles.categoryCount}>{count} receitas</Text>
                    </View>
                </TouchableOpacity>
            );
            }}
        />
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  // Card de categoria (grade)
  categoryCard: {
    width: '48%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  categoryLabel: {
    position: 'absolute',
    bottom: 8,
    left: 10,
  },
  categoryName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  categoryCount: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  // Card horizontal (lista de receitas de uma categoria)
  horizontalCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  horizontalImage: {
    width: 90,
    height: 90,
  },
  horizontalInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 16,
  },
});