import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navigation from '../navigations/Navigations';
import config from '../config';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPickerModal from '../components/ColorPickerModal';

const DetailNote = ({ route, navigation }) => {
    const { item } = route.params;

    const [title, settitle] = useState(item.title)
    const [content, setcontent] = useState(item.content)
    const [img, setimg] = useState()
    const [imgItem, setimgItem] = useState(item.img)
    const [endDate, setendDate] = useState(new Date(item.endDate));
    const [color, setcolor] = useState(item.color)
    const [category, setcategory] = useState('64abad56b4e06ffbdff84489')

    //
    const [show, setShow] = useState(false)
    const [showColor, setShowColor] = useState(false);
    useEffect(() => {
        setimg(item.img);
        setcolor(item.color);
    }, [item.img, item.color]);

    const handleSelectColor = (selectedColor) => {
        setcolor(selectedColor);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShow(Platform.OS == 'ios');
        setendDate(currentDate.toString());

        let temDate = new Date(currentDate);
        console.log(temDate);

    }

    const pickImage = async () => {
        await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(res => {
            if (res.type == 'success') {
                let { name, size, uri } = res;
                let nameParts = name.split('.');
                let fileType = nameParts[nameParts.length - 1];
                var fileToUpload = {
                    name: name,
                    size: size,
                    uri: uri,
                    type: "application/" + fileType
                };
                console.log(fileToUpload, '...............file')
                setimgItem(null)
                setimg(fileToUpload);

            }
        })
    }
    const postNote = async () => {
        const formData = new FormData();
        formData.append('title', title)
        formData.append('content', content)
        if (img) {
            formData.append('img', img); // Nếu có hình ảnh được chọn, thêm nó vào formData
        }
        formData.append('color', color)
        formData.append('category', category)
        formData.append('endDate', '2023-07-18T00:00:00.000Z')
        console.log(formData);
        try {
            console.log(formData);
            await axios.post(config.API_URL + '/note/updateNote/' + item._id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Success')
        } catch (error) {
            console.log('Error ' + error);
        }

    }
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
                    <TouchableOpacity style={styles.backgroundIcon} onPress={postNote}>
                        <Image source={require('../assets/check.png')} style={styles.icon}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput
                style={{ fontSize: 30, fontWeight: 'bold', marginTop: 30, color: '#fff' }}
                placeholder="Nhập tiêu đề của bạn"
                placeholderTextColor="gray"
                multiline={true} //
                value={title}
                onChangeText={(txt) => settitle(txt)}
            />
            <TextInput
                style={{ fontSize: 18, color: '#fff', marginTop: 30 }}
                placeholder="Nhập nội dung của bạn"
                placeholderTextColor="gray"
                multiline={true}
                value={content}
                onChangeText={(txt) => setcontent(txt)}

            />
            <View style={{ width: '100%', height: '40%', marginTop: 30 }}>
                {imgItem ? (
                    <Image source={{ uri: imgItem }} style={{ resizeMode: 'cover', borderRadius: 10, width: '100%', height: '100%' }} />
                ) : img ? (
                    <Image source={{ uri: img.uri }} style={{ resizeMode: 'cover', borderRadius: 10, width: '100%', height: '100%' }} />
                ) : null}

            </View>
            <View style={{
                backgroundColor: '#C7EBB3',
                borderRadius: 30,
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between', paddingHorizontal: 40,
                paddingVertical: 10,
                top: 150

            }}>

                <TouchableOpacity
                    style={[styles.backgroundIcon, { backgroundColor: 'white', width: 40, height: 40 }]}
                    onPress={() => setShow(true)}
                >
                    <Image source={require('../assets/calendar.png')} style={[styles.icon, { tintColor: 'black' }]} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backgroundIcon, { backgroundColor: color, width: 40, height: 40 }]}
                    onPress={() => setShowColor(true)}
                >
                    <Image source={require('../assets/palette.png')} style={[styles.icon, { tintColor: 'black' }]}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backgroundIcon, { backgroundColor: 'white', width: 40, height: 40 }]}
                    onPress={pickImage}
                >
                    <Image source={require('../assets/insert-picture-icon.png')} style={[styles.icon, { tintColor: 'black' }]}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backgroundIcon, { backgroundColor: 'white', width: 40, height: 40 }]}
                    onPress={() => navigation.navigate(Navigation)}
                >
                    <Image source={require('../assets/send.png')} style={[styles.icon, { tintColor: 'black' }]}></Image>
                </TouchableOpacity>
            </View>
            {
                show && (<DateTimePicker
                    testID='dateTimePicker'
                    value={endDate}
                    mode='date'
                    is24Hour={true}
                    display='default'
                    onChange={onChange} />)
            }
            {
                showColor && (
                    <ColorPickerModal
                        visible={showColor}
                        onSelectColor={handleSelectColor}
                        onClose={() => setShowColor(false)}

                    />
                )
            }
        </View >
    );
};

export default DetailNote;

const styles = StyleSheet.create({
    backgroundIcon: {
        backgroundColor: '#000', borderRadius: 25, width: 50, height: 50, alignItems: 'center', justifyContent: 'center'
    },
    icon: {
        width: 17, height: 17, tintColor: '#fff'

    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

});
