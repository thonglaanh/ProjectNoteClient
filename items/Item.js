import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const Item = (props) => {
    return (
        <View style={[styles.noteItem, { backgroundColor: props.item.color }, props.item.img ? styles.itemWithImage : styles.itemWithoutImage]}>

            {props.item.img && <Image source={{ uri: props.item.img }} style={styles.noteImage} />}
            <Text style={styles.noteTitle}>{props.item.title}</Text>
            <Text style={styles.noteContent}>{props.item.content}</Text>
            <Text style={styles.noteContent}>{props.item.startDate}</Text>
        </View>
    );
};

export default Item;

const styles = StyleSheet.create({
    noteItem: {
        width: 172,
        margin: 3,
        padding: 6,
        borderRadius: 25,
        overflow: 'hidden', // Cắt bỏ nội dung vượt quá kích thước item
    },
    itemWithImage: {
        maxHeight: 400, // Điều chỉnh chiều cao cho item có ảnh

    },
    itemWithoutImage: {
        maxHeight: 190, // Điều chỉnh chiều cao cho item không có ảnh
    },
    noteImage: {
        width: 154,
        height: 140,
        marginHorizontal: 3,
        borderRadius: 25,
    },
    noteTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginHorizontal: 7,
    },
    noteContent: {
        marginHorizontal: 7,
        fontSize: 12
    },
});
