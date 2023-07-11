import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';

const Login = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [submit, setsubmit] = useState(true)
    let url = config.API_URL + '/user/login'
    const sendData = async (data) => {
        if (email.length <= 0) {
            setsubmit(false)
            alert('Vui lòng nhập email!')
            return;
        } else {
            if (re.test(email)) {
                setsubmit(true)
            } else {
                setsubmit(false)
                alert('Vui lòng nhập đúng định dạng email!')
                return;
            }
        }
        if (password.length < 6) {
            setsubmit(false)
            alert('Password phải hơn 6 kí tự và không để trống!')
            return;
        }
        if (submit) {
            try {
                const response = await axios.post(url, data);
                console.log(response.data.data)
                if (response.data.status === 'success') {
                    await AsyncStorage.setItem('account', JSON.stringify(response.data.data));
                    navigation.navigate('Navigation')
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
                if (error.response && error.response.status === 409) {
                    alert("Sai mật khẩu!!");
                } else {
                    console.log(error);
                    alert("Tài khoản chưa tồn tại");
                }
            }
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to our app!</Text>
            <Text style={styles.text2}>Fill your details or continue with {'\n'}social media</Text>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={22} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter your email'
                    placeholderTextColor="#9E9E9E"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={25} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#9E9E9E"
                    secureTextEntry={passwordVisible}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                    <Icon name={!passwordVisible ? "eye" : "eye-slash"} size={20} color="#000" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#A0522D' }]} onPress={() => sendData({ email: email, password: password })}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 12 }}>Login</Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: 5, fontSize: 12, marginTop: 10 }}>Not registered yet?<Text style={{ color: 'brown' }} onPress={() => navigation.navigate('Register')}> Create an Account</Text></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10 }}><View style={{ backgroundColor: 'gray', height: 1, width: 90, marginTop: 7 }}></View><Text style={{ color: 'gray', fontSize: 10 }}> or Sign up with </Text><View style={{ backgroundColor: 'gray', height: 1, width: 90, marginTop: 7 }}></View></View>
            <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]}>
                <Image style={{ width: 30, height: 30, marginLeft: 20 }} source={require("../assets/google.png")} />
                <Text style={{ marginLeft: 55, fontSize: 13 }}>Sign up with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]}>
                <Image style={{ width: 32, height: 32, marginLeft: 20 }} source={require("../assets/apple-logo.png")} />
                <Text style={{ marginLeft: 53, fontSize: 13 }}>Sign up with Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { flexDirection: 'row', alignItems: 'center' }]}>
                <Image style={{ width: 30, height: 30, marginLeft: 20 }} source={require("../assets/facebook.png")} />
                <Text style={{ marginLeft: 55, fontSize: 13 }}>Sign up with Facebook</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 80,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginVertical: 20,
    },
    textInput: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 5,
        padding: 10,
        fontSize: 12,
        paddingLeft: 60, // Thêm khoảng trống bên trái để làm chỗ cho biểu tượng
    },
    button: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10
    },
    text2: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 20
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 10,
        borderColor: 'gray',
    },
    icon: {
        position: 'absolute',
        left: 15, // Vị trí của biểu tượng từ bên trái
        top: 15, // Vị trí của biểu tượng từ trên xuống
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 17,
    },
});
