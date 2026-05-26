import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RECEITAS, Recipe } from '../../data/receitas';

export default function Home() {
    const router = useRouter();

    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    function toggleFavorite(id: string) {
        setFavorites(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function renderCard({ item } : { item: Recipe }) {
        const isFav = favorites.has(item.id);

        return (
            <TouchableOpacity style={styles.card} onPress={() => router.push(`/receitas/${item.id}`)} activeOpacity={0.85}>
                <Image source={{ uri: item.image }} style={styles.cardImage} />

                <TouchableOpacity style={styles.heartButton} onPress={() => toggleFavorite(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name={isFav ? 'heart' : 'heart-outline'} size={22} color={isFav ? '#ef4444' : '#fff'} />
                </TouchableOpacity>

                <View style={styles.cardFooter}>
                    <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.cardCategory}>{item.category}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Receitas</Text>

            <FlatList
                data={RECEITAS}
                renderItem={renderCard}
                keyExtractor={item => item.id}  
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header:{
        fontSize: 26,
        fontWeight: '700',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    listContent: {
        paddingHorizontal: 12,
        paddingBottom: 16,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    card:{
        width: '48%',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    cardImage: {
        width: '100%',
        height: 130,
    },
    heartButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 4,
    },
    cardFooter: {
        padding: 8,
    },
    cardName: {
        fontSize: 14,
        fontWeight: '600',
    },
    cardCategory: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
});