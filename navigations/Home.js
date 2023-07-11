import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config'

const Home = () => {
    const [list, setlist] = useState([])
    useEffect(() => {
        async function fetchData() {
            axios.get(config.API_URL + `/user`)
                .then(response => {
                    setlist(response.data);
                    console.log(list);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        fetchData();
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text>{config.API_URL}</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})