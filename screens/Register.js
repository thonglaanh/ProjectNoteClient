import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import config from '../config';

const Register = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [submit, setsubmit] = useState(true)
    let url = config.API_URL + '/user/register'
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
        if (username.length <= 0) {
            setsubmit(false)
            alert('Username không để trống!')
            return;
        }
        if (password.length < 6) {
            setsubmit(false)
            alert('Password phải hơn 6 kí tự và không để trống!')
            return;
        }
        if (submit) {
            try {
                const response = await axios.post(url, data);
                if (response.data.status === 'success') {
                    alert('Tạo tài khoản thành công!')
                }
            } catch (error) {
                if (error.response.status === 400) {
                    alert('Email đã tồn tại!')
                } else {
                    alert("Tạo thất bại!!");
                }

            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create your Account</Text>
            <Image source={require('../assets/notes.png')} style={{ width: 70, height: 70, alignSelf: 'center', marginVertical: 20 }}></Image>
            <View style={styles.inputContainer}>
                <Icon name="user" size={25} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter your username'
                    placeholderTextColor="#9E9E9E"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={22} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter your email'
                    placeholderTextColor="#9E9E9E"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                    <Icon name={passwordVisible ? "eye-slash" : "eye"} size={20} color="#000" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#A0522D' }]} onPress={() => sendData({ email: email, username: username, password: password })}>
                <Text style={{ color: 'white', textAlign: 'center', padding: 12 }}>Register</Text>
            </TouchableOpacity>
            <Text style={{ marginLeft: 5, fontSize: 12, marginTop: 10 }}>
                Already have an account?
                <Text style={{ color: 'brown' }} onPress={() => navigation.navigate('Login')}> Login</Text>
            </Text>

        </View>
    )
}

export default Register

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
        marginTop: 20,
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
        marginTop: 20
    },
    text2: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 50
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
