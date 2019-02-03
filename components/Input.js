import React from 'react'
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native'
import {blue, lightPurp, white} from '../utils/colors'
import {Constants} from 'expo'

const Input = ({style = {}, title, value, onChange, placeholder}) => {
    return (
        <View style={styles.textInput}>
            <Text style={{fontSize: 28}}>{title}</Text>
            <TextInput style={styles.input} onChangeText={(text) => onChange(text)}
                       placeholder={placeholder} value={value}/>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        paddingTop: Constants.statusBarHeight,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        borderWidth: 1.0,
        color: 'gray',
        backgroundColor: '#f8f8f8',
    },
    input: {
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        borderWidth: 1.0,
        borderColor: 'black',
        color: blue,
        backgroundColor: white,
        height: 70,
        fontSize: 28,
        width: 350,
    },
})

export default Input
