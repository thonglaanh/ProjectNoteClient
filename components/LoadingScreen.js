import { Animated, StyleSheet, Text, View, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'

const LoadingScreen = () => {
    const spinValue = useState(new Animated.Value(0))[0];
    const startAnimation = () => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    useEffect(() => {
        startAnimation();
    }, []);
    return (
        <View style={styles.container}>
            <Animated.Image
                style={[styles.loadingIcon, { transform: [{ rotate: spin }] }]}
                source={require('../assets/loading.png')}
            />
            <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    loadingIcon: {
        width: 50,
        height: 50
    },
    loadingText: {
        marginTop: 10,
    },
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    }
})