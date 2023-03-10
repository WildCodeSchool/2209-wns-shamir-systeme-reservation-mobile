import Logo from '../../../assets/images/512.png';
import home from "../../../assets/images/home.jpg";
import { View, Text, useWindowDimensions, ScrollView, ImageBackground, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { LinearGradient } from 'expo-linear-gradient';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

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

    const dontAccount = () => {
        console.log("Pas de compte");
        navigation.navigate('Register');
    }

  return (
    <ScrollView>
        <ImageBackground source={home} resizeMode="cover" style={styles.image}>
            <LinearGradient colors={['transparent', '#0d81ab']} style={styles.background}>
                <View style={styles.root} >
                    <Image source={Logo} style={[styles.logo, {height: height * 0.1}]} resizeMode="contain"></Image>
                    <Text style={styles.title}>CONNEXION</Text>
                    <ActivityIndicator color='#30bcef' size={sizeSpin} animating={animateSpin} style={styleSpin}/>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.label}>Email</Text>
                        </View>
                        <CustomInput label="Email" size="250" control={control} name="email" placeholder="Email" type="text" rules={{required: "L'email est requis", pattern: {value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Votre email n'est pas valide."}}}/>
                        <View>
                            <Text style={styles.label}>Mot de passe</Text>
                        </View>
                        <CustomInput label="Mot de passe" size="250" control={control} name="password" placeholder="Mot de passe" type="text" rules={{required: "Le mot de passe est requis", minLength: {value: 5, message: "Le mot de passe doit contenir au minimum 5 caractères."}, pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/, message: "Le mot de passe doit contenir au minimum 5 caractères, minimum une lettre majuscule, une lettre minuscule, un chiffre et un caractere special"}}} secureTextEntry={true}/>

                        {errorCreate ? <Text style={{color: 'red', width: 250}}>{errorCreate}</Text> : ''}

                        <CustomButton size="250" text="Valider" onPress={handleSubmit(handleToken)} type="WILD"/>
                        <CustomButton size="250" text='Mot de passe oublié ?' onPress={onForgotPressed} type="TERTIARY" />

                        <CustomButton size="250" text="Je n'ai pas de compte" onPress={dontAccount} type="SECONDARY" />
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },
    title: {
        marginVertical: 20,
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#fff'
    },
    logo: {
      maxWidth: 300,
      maxHeight: 100,
      marginBottom: 30,
      marginTop: 70,
      padding: 10,
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
        width: 250
    },
    label: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'left'
    },
  });

export default SignIn