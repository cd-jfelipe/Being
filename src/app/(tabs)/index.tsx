import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Receitas() {
    return (
        <View style={styles.container}>
            <Text>Tela de receiras</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})