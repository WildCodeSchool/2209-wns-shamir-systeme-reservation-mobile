//@ts-ignore
import Logo from '../../assets/images/512.png';
//@ts-ignore
import home from "../../assets/images/home.jpg";
import { View, Text, useWindowDimensions, ScrollView, ImageBackground, StyleSheet, ActivityIndicator} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useForm } from "react-hook-form";
import { LinearGradient } from 'expo-linear-gradient';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
export type StackNavigation = StackNavigationProp<StackParamList>;

const SignIn = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation<StackNavigation>();

    //function register in AuthContext
    const {handleToken, setErrorCreate, errorCreate, sizeSpin, animateSpin, styleSpin} = useContext(AuthContext);

    // form
    const {control, handleSubmit, reset, formState: {isSubmitSuccessful, errors}} = useForm();

    //reset input after submitSuccess
    useEffect(() => {
        if(isSubmitSuccessful){
            reset();
        }
    });

    const onForgotPressed = () => {
        console.log("Mot de passe oublié");
    }

    const styles = StyleSheet.create({
        root: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 40,
            paddingTop: 80,
        },
        background: {
            height: height
        },
        title: {
            marginVertical: 20,
            paddingTop: 20,
            fontSize: 25,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#fff'
        },
        image: {
            flex: 1,
            justifyContent: 'center',
          },
        rules: {
            paddingHorizontal: 30,
            paddingVertical: 30,
            color: '#fff'
        },
        rulesLink: {
            textDecorationLine: 'underline',
        },
        form:{
            flex: 1,
            width: 300
        },
        label: {
            color: '#fff',
            fontSize: 15,
            textAlign: 'left'
        },
    });

  return (
        <ImageBackground source={home} resizeMode="cover" style={styles.image}>
            <LinearGradient colors={['transparent', '#0d81ab']} style={styles.background}>
                <View style={styles.root} >
                    <Text style={styles.title}>CONNEXION</Text>
                    {isSubmitSuccessful ? <ActivityIndicator color='#30bcef' size={sizeSpin} animating={animateSpin} style={styleSpin}/> : ''}

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Email</Text>
                        </View>
                        <CustomInput label="Email" size="300" control={control} name="email" type="text" rules={{required: "L'email est requis", pattern: {value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Votre email n'est pas valide."}}}/>
                        <View>
                            <Text style={styles.label}>Mot de passe</Text>
                        </View>
                        <CustomInput label="Mot de passe" size="300" control={control} name="password" type="text" rules={{required: "Le mot de passe est requis"}} secureTextEntry={true}/>

                        {errorCreate ? <Text style={{color: 'red', width: 300}}>{errorCreate}</Text> : ''}

                        <CustomButton size="300" text="Valider" onPress={handleSubmit(handleToken)} type="WILD"/>
                        <CustomButton size="300" text='Mot de passe oublié ?' onPress={onForgotPressed} type="TERTIARY" />

                        <CustomButton size="300" text="Je n'ai pas de compte" onPress={() => navigation.navigate('Register')} type="SECONDARY" />
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
  )

}


export default SignIn