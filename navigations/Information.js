import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import config from '../config'
import LoadingScreen from '../components/LoadingScreen'

const Information = ({ navigation }) => {
    const [loading, setloading] = useState(false)

    const [account, setaccount] = useState()
    const logout = async () => {
        AsyncStorage.clear();
        axios.get(config.API_URL + `/logout`);
        navigation.navigate('Login');
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await AsyncStorage.getItem('account');
                const parseData = JSON.parse(data);
                setloading(true);
                setaccount(parseData);
                console.log(account);
                setloading(false);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        console.log(account);
    }, [account]);
    return (

        <View style={{ flex: 1, backgroundColor: '#F4DFCD' }}>
            {!loading && account ? (
                <>
                    <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 80, marginHorizontal: 40, marginBottom: 30 }}>
                        <Image source={{ uri: account.img }} style={{ width: 100, height: 100, borderRadius: 50 }}></Image>
                        <View style={{ flexDirection: 'column', margin: 20 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 28, color: '#000' }}>{account.username}</Text>
                            <Text style={{ fontSize: 14, color: '#000', marginHorizontal: 5 }}>{account.email}</Text>
                        </View>
                    </View>
                    <Text style={styles.text}>Quản lý tài khoản</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#C7EBB3' }]}>
                        <Image style={styles.iconButton} source={require('../assets/edit.png')} />
                        <Text style={styles.textButton}>Sửa thông tin cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FFB6C1' }]}>
                        <Image style={styles.iconButton} source={require('../assets/bell.png')} />
                        <Text style={styles.textButton}>Thông báo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#00CCCC' }]}>
                        <Image style={styles.iconButton} source={require('../assets/send.png')} />
                        <Text style={styles.textButton}>Chia sẻ</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Cài đặt và tài khoản</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#90EE90' }]} onPress={() => logout()}>
                        <Image style={styles.iconButton} source={require('../assets/setting.png')} />
                        <Text style={styles.textButton}>Cài đặt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#FFDAB9' }]} onPress={() => logout()}>
                        <Image style={styles.iconButton} source={require('../assets/logout.png')} />
                        <Text style={styles.textButton}>Đăng xuất</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <LoadingScreen />
            )}
        </View>

    )
}

export default Information

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 0,
        marginTop: 5,
        height: 60,
    },
    text: {
        marginBottom: 5, marginHorizontal: 20
        , fontWeight: 'bold', fontSize: 18,
        marginTop: 20, color: '#000'
    },
    textButton: {
        marginLeft: 27, fontSize: 17, color: '#fff'
    },
    iconButton: {
        width: 27, height: 27, marginLeft: 27, tintColor: '#fff'
    }
})