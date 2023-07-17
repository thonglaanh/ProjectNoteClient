import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const Introduce = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/background.png')} style={styles.image} />
            <Text style={styles.title}>Stay Organized, Get Things Done</Text>
            <Text style={styles.subtitle}>
                Effortlessly manage tasks, stay organized, and accomplish more with our app!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText} >Get started</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Introduce

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE4B5'
    },
    image: {
        width: 300, height: 300, marginVertical: 110,
        alignSelf: 'center'
    }
    ,
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
        marginHorizontal: 10
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        marginBottom: 40,
        textAlign: 'center',
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#A0522D',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 100,
        marginBottom: 60,
        marginHorizontal: 30

    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
})