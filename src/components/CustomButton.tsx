import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import ICustomeButtonProp from '../interfaces/ICustomeButtonProp';

const CustomButton = ({onPress, text, type, size, icon, nameIcon, colorIcon}: ICustomeButtonProp) => {
    
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={[styles.button, styles[`btn_${type}`], styles[`btn_${parseInt(size)}`] ]}>
            {text}
            {icon ? <Ionicons name={nameIcon} size={32} color={colorIcon} /> : ''}
        </Text>
    </TouchableOpacity >
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    btn_100: {
        width: 20
    },
    btn_200: {
        width: 200
    },
    btn_250: {
        width: 250
    },
    btn_300: {
        width: 300
    },
    button: {
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        fontSize: 16, 
        borderRadius: 5,
        width: 300,
    },
    btn_WILD: {
        backgroundColor: '#30bcef',
        color: '#fff',
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#bcbcbc',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btn_TERTIARY: {
        backgroundColor: '#f3f6f4',
        color: '#5b5b5b',
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#bcbcbc',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btn_RED: {
        backgroundColor: '#ea9999',
        color: '#fff',
    },
    btn_BLUE: {
        backgroundColor: '#6fa8dc',
        color: '#fff',
    },
    btn_SECONDARY: {
        backgroundColor: '#999999',
        color: '#fff',
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#bcbcbc',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btn_LIGHT: {
        backgroundColor: 'transparent',
        color: '#fff',
        borderColor: "#fff",
        borderWidth: 2,
    },
})

export default CustomButton;