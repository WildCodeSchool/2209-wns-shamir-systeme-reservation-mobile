import React from 'react'
import { Controller } from 'react-hook-form'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import ICustomInputProps from '../interfaces/ICustomInputProps'

const CustomInput = ({control, name, placeholder, rules, secureTextEntry, size}: ICustomInputProps) => {

  return (
    <Controller name={name} control={control} rules={rules} render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
      <>
        <View style={[styles.root, styles[`root_${parseInt(size)}`], {borderColor: error ? 'red' : '#f2f2f2'}]}>
          <TextInput placeholder={placeholder} onChangeText={onChange} value={value} onBlur={onBlur} style={styles.input} secureTextEntry={secureTextEntry}/>
        </View>
        {error ? <Text role="alert" style={styles.errorMessage}>{error.message}</Text> : ''}
      </>
    )} />
  )
}

const styles = StyleSheet.create({
    root_200: {
      width: 200
    },
    root_250: {
      width: 250
    },
    root_300: {
      width: 300
    },
    root: {
      marginTop: 5,
      marginBottom: 15,
      backgroundColor: '#f2f2f2',
      borderRadius: 20,
      paddingHorizontal: 10,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: .3,
      shadowRadius: 3,
      borderWidth: 1.3,
    },
    label: {
      color: 'black',
      fontSize: 18,
    },
    input: {
      padding: 5,
    },
    errorMessage: {
      color: 'red',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 1,
      shadowRadius: 5,
      width: 250,
      paddingBottom: 10,
    },
})

export default CustomInput