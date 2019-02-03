import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { purple } from '../utils/colors'

export default function TextButton({children, onPress, disabled, style = {}}) {
    return (
            <TouchableOpacity
                onPress={onPress} disabled={disabled}>
                <Text style={[styles.button, style]}>{children}</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        color: purple,
        textAlign: 'center',
        padding: 10,
    }

})