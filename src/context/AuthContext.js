import React, { createContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CREATE_USER, GET_TOKEN } from '../Tools/Mutation';
import { useMutation } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigation = useNavigation();

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        setErrorCreate('');
    }, [])

    //msg erreur 
    const [errorCreate, setErrorCreate] = useState('');
    const [animateSpin, setAnimateSpin] = useState(false);
    const [styleSpin, setStyleSpin]     = useState('');
    const [sizeSpin, setSizeSpin]       = useState(0);

    const [getToken] = useMutation(GET_TOKEN);
    const [createUser] = useMutation(CREATE_USER);

    const handleToken = (data) => {
        getToken({ variables: { password: data.password, email: data.email } })
        .then(async ({ data }) => {
            await AsyncStorage.setItem("@token", data.getToken);
            setLogged(true);
            setAnimateSpin(true);
            setSizeSpin(80);
            setStyleSpin(styles.spinner);
            setTimeout(() => {
                navigation.navigate("Accueil");
              setAnimateSpin(false);
              setSizeSpin(0);
            }, 2000);
        })
        .catch((e) => {
            setErrorCreate('Identifiant ou mot de passe incorrect.');
          console.log('====================================');
          console.log('error ', e);
          console.log('====================================');
        });
    }

    const handleRegister = (data) => {
        const userEmail = data.email;
        const userPassword = data.password;
        if(userPassword === data.passwordConfirm){
            createUser({ variables: {firstname: data.firstname, lastname: data.lastname, phone: data.phone, email: data.email, password: data.password, passwordConfirm: data.passwordConfirm } })
            .then(async ({ data }) => {
                
                console.log('====================================');
                console.log('data ', data);
                console.log('userEmail => ', userEmail);
                console.log('userPassword => ', userPassword);
                console.log('====================================');
                const userData = {password: userPassword, email: userEmail}
                handleToken(userData);
            })
            .catch((e) => {
                if(e.message.substring(0, 9) === "duplicate"){
                    setErrorCreate('Ce compte existe déjà.');
                }else{
                    setErrorCreate('Une erreur est survenue, merci de réessayer.');
                }
              console.log('====================================');
              console.log('error ', e);
              console.log('====================================');
            });
        }
    }

    return (
        <AuthContext.Provider value={{handleRegister, handleToken, setErrorCreate, setLogged, errorCreate, logged, animateSpin, styleSpin, sizeSpin}}>
            {children}
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    spinner: {
      marginTop: 30
    }
});