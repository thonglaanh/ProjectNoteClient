import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Information from './Information';
import Notification from './Notification';
import BookMark from './BookMark';
import CreateNote from '../screens/CreateNote';
const Navigation = ({ navigation }) => {
    const Tab = createBottomTabNavigator();
    const CustomTabBarButton = ({ children, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',


            }}>
            <View style={{
                width: 70, height: 70,
                borderRadius: 35,
                backgroundColor: '#333333',
                ...styles.shadow
            }}>
                {children}
            </View>
        </TouchableOpacity>
    )
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                position: 'absolute',
                bottom: 10,
                left: 20, right: 20, elevation: 0,
                backgroundColor: '#333333',
                borderRadius: 15,
                height: 90,
                ...styles.shadow
            },
            tabBarShowLabel: false,
            headerShown: false,
            tabBarHideOnKeyboard: true
        }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                        <Image source={require('../assets/house.png')}
                            resizeMode='contain'
                            style={{
                                width: 30, height: 30,
                                tintColor: focused ? '#fff' : 'gray'
                            }}></Image>
                    </View>
                )
            }}></Tab.Screen>
            <Tab.Screen name="Notification" component={Notification}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                            <Image source={require('../assets/bell.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30, height: 30,
                                    tintColor: focused ? '#fff' : 'gray'
                                }}></Image>
                        </View>
                    )
                }}></Tab.Screen>
            <Tab.Screen name="CreateNote" component={CreateNote}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/plus.png')}
                            resizeMode='contain'
                            style={{ width: 30, height: 30, tintColor: '#fff' }} />),
                    tabBarButton: (props) => (
                        <CustomTabBarButton{...props} onPress={() => navigation.navigate(CreateNote)} />
                    )

                }}></Tab.Screen>
            <Tab.Screen name="BookMark" component={BookMark}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                            <Image source={require('../assets/bookmark.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25, height: 25,
                                    tintColor: focused ? '#fff' : 'gray'
                                }}></Image>
                        </View>
                    )
                }}></Tab.Screen>
            <Tab.Screen name="Information" component={Information}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
                            <Image source={require('../assets/infor.png')}
                                resizeMode='contain'
                                style={{
                                    width: 30, height: 30,
                                    tintColor: focused ? '#fff' : 'gray'
                                }}></Image>
                        </View>
                    )
                }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default Navigation

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
})