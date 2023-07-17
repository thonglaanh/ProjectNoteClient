import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navigation from '../navigations/Navigations';

const CreateNote = ({ navigation }) => {
    const [title, settitle] = useState()
    const [content, setcontent] = useState()
    const [img, setimg] = useState()
    const [endDate, setendDate] = useState()
    const [color, setcolor] = useState()
    const [category, setcategory] = useState()

    return (
        <View style={{ flex: 1, padding: 20, paddingTop: 40, backgroundColor: '#F4DFCD' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={styles.backgroundIcon}
                    onPress={() => navigation.navigate(Navigation)}
                >
                    <Image source={require('../assets/arrow.png')} style={styles.icon}></Image>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.backgroundIcon, { marginHorizontal: 10 }]}
                    >
                        <Image source={require('../assets/bookmark-white.png')} style={styles.icon}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backgroundIcon}>
                        <Image source={require('../assets/check.png')} style={styles.icon}></Image>
                    </TouchableOpacity>
                </View>
            </View>


            <TextInput
                style={{ fontSize: 30, fontWeight: 'bold', marginTop: 30, color: '#fff' }}
                placeholder="Nhập tiêu đề của bạn"
                placeholderTextColor="gray"
                multiline={true} //
                onChangeText={(txt) => settitle(txt)}
            />
            <TextInput
                style={{ fontSize: 18, color: '#fff', marginTop: 30 }}
                placeholder="Nhập nội dung của bạn"
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={(txt) => setcontent(txt)}
            />
        </View>
    );
};

export default CreateNote;

const styles = StyleSheet.create({
    backgroundIcon: {
        backgroundColor: '#000', borderRadius: 25, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'
    },
    icon: {
        width: 17, height: 17, tintColor: '#fff'

    }
});
