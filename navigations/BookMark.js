import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ColorPickerModal from '../components/ColorPickerModal';

const BookMark = () => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setcolor] = useState()

    const handleSelectColor = (selectedColor) => {
        setcolor(selectedColor);
    };
    return (

        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Button onPress={() => setShowColorPicker(true)} title='hahaha'></Button>
            <ColorPickerModal
                visible={showColorPicker}
                onSelectColor={handleSelectColor}
                onClose={() => setShowColorPicker(false)}
            />
        </View>
    )
}

export default BookMark

const styles = StyleSheet.create({})