import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
    useEffect(() => {
        const fethData = async () => {
            const account = await AsyncStorage.getItem('account');
            if (account) {
                setTimeout(() => {
                    navigation.navigate('Navigation')
                }, 3000)
            } else {
                setTimeout(() => {
                    navigation.navigate('Introduce');
                }, 3000)
            }
        };
        fethData();

    }, []);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 0.9,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Image
                source={require('../assets/notes.png')}
                style={styles.icon}
                resizeMode='contain'
            />
        </Animated.View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    icon: {
        width: 100,
        height: 100,
    },
});

export default Splash;
