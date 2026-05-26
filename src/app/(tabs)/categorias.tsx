import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Category() {
    return(
        <View style={styles.container}>
            <Text>Tela de categorias</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
})