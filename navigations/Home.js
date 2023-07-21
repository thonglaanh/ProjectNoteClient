import { StyleSheet, View, TouchableOpacity, Image, TextInput, FlatList, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import LoadingScreen from '../components/LoadingScreen';
import Item from '../items/Item';
import OptionsModal from '../components/OptionsModal';

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [listNote, setListNote] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [categoryQuery, setCategoryQuery] = useState();
    const [searchQuery, setSearchQuery] = useState();
    const [account, setAccount] = useState();
    const [time, settime] = useState()
    const [showOption, setshowOption] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    //Lấy time hiện tại
    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        let greeting;
        if (currentHour >= 5 && currentHour < 12) {
            settime('Chào buổi sáng')
        } else if (currentHour >= 12 && currentHour < 18) {
            settime('Chào buổi chiều')
        } else {
            settime('Chào buổi tối')

        }
    })
    //Lấy data
    const fetchData = async () => {
        try {
            const response = await axios.get(config.API_URL + '/note', {
                params: {
                    category: categoryQuery,
                    title: searchQuery,
                },
            });
            setLoading(true);
            setTimeout(() => {
                setAccount(response.data.account);
                setListCategory([{ _id: '', name: 'All' }, ...response.data.categories]);
                setListNote(response.data.notes);
                setLoading(false);
            }, 2500);
        } catch (error) {
            console.error(error);
        }
    };
    //
    useEffect(() => {
        fetchData();
    }, []);
    //Log data thôi
    useEffect(() => {
        console.log(listNote);
        console.log(listCategory);
        console.log(account);
    }, [listCategory, listNote, account]);

    // const searchCategory = (data) => {
    //     setCategoryQuery(data);
    //     console.log(data);
    //     fetchData();
    // }
    const renderCategoryItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.categoryItem}
            // onPress={() => searchCategory(item._id)}
            >
                <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
    //Xử lý option
    const handleLongPress = (item) => {
        setSelectedItem(item);
        setshowOption(true);
    };
    const handleEdit = () => {
        navigation.navigate('DetailNote', { item: selectedItem, categories: listCategory });
        setshowOption(false);
    };
    const handleView = () => {
        navigation.navigate('DetailNote', { item: selectedItem, categories: listCategory });
        setshowOption(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(config.API_URL + '/note/deleteNote/' + selectedItem._id);
            console.log('Success');
            fetchData();

        } catch (error) {
            console.log(error);

        }
        setshowOption(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F4DFCD', paddingBottom: 105, paddingHorizontal: 15 }}>
            {!loading ? (
                <View>
                    <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl onRefresh={fetchData} />}>
                        <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#000', marginTop: 45 }}>{time}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View
                                style={{
                                    width: 300,
                                    height: 50,
                                    backgroundColor: '#C7EBB3',
                                    borderRadius: 30,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderColor: 'gray',
                                    borderWidth: 1
                                }}
                            >
                                <TextInput
                                    style={{ width: '85%', padding: 15 }}
                                    placeholder='Input text...'
                                    onChangeText={(txt) => setSearchQuery(txt)}
                                />
                                <TouchableOpacity onPress={() => fetchData()}>
                                    <Image source={require('../assets/magnifying-glass.png')} style={{ width: 25, height: 25 }} />
                                </TouchableOpacity>
                            </View>
                            {/* <Image source={{ uri: account.img }} style={{ width: 50, height: 50, borderRadius: 25, marginLeft: 5 }} onLoad={() => setLoading(false)} /> */}
                        </View>
                        <FlatList
                            data={listCategory}
                            keyExtractor={(item) => item._id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderCategoryItem}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <View >
                                {
                                    listNote.filter((_, i) => i % 2 === 0).map(item => <TouchableOpacity onPress={() => {
                                        navigation.navigate('DetailNote', { item: selectedItem, categories: listCategory });
                                        console.log(item);
                                    }}
                                        onLongPress={() => handleLongPress(item)}>
                                        <Item item={item}></Item>
                                    </TouchableOpacity>)
                                }
                            </View>
                            <View >
                                {
                                    listNote.filter((_, i) => i % 2 !== 0).map(item => <TouchableOpacity onPress={() => navigation.navigate('DetailNote', { item: selectedItem, categories: listCategory })} onLongPress={() => handleLongPress(item)}><Item item={item}></Item></TouchableOpacity>)
                                }
                            </View>
                        </View>
                    </ScrollView>
                    {showOption && (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <OptionsModal
                                visible={showOption}
                                conClose={() => setshowOption(false)}
                                onEdit={handleEdit}
                                onView={handleView}
                                onDelete={handleDelete}
                            /></View>
                    )}

                </View>
            ) : (
                <LoadingScreen />
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    categoryItem: {
        marginVertical: 10,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: 'gray',
        borderColor: 'orange'
    },
    categoryText: {
        fontSize: 16,
        color: 'black',
    },
});
