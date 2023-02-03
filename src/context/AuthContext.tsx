import React, { createContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CREATE_USER, GET_TOKEN } from '../Tools/Mutation';
import { useMutation } from "@apollo/client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import IUserProps from '../interfaces/IUserProps';
import ISigninProps from '../interfaces/ISignInProps';
import IAuthContextProps from '../interfaces/IAuthContextProps';
import { setToken } from '../stores/tokenReducer';
import { useDispatch } from 'react-redux';

export const AuthContext = createContext<IAuthContextProps | null>(null);

export const AuthProvider = ({children}: any) => {
    const navigation = useNavigation();
    
    const [logged, setLogged] = useState<boolean>(false);
    const [errorCreate, setErrorCreate] = useState<string>('');
    const [animateSpin, setAnimateSpin] = useState<boolean>(false);
    const [styleSpin, setStyleSpin]     = useState({});
    const [sizeSpin, setSizeSpin]       = useState<number>(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setErrorCreate('');
    }, [])

    const [getToken] = useMutation(GET_TOKEN);
    const [createUser] = useMutation(CREATE_USER);

    const handleToken = (data: ISigninProps): void => {
        getToken({ variables: { password: data.password, email: data.email } })
        .then(async ({ data }) => {
            await AsyncStorage.setItem("@token", data.getToken);
            dispatch(setToken(data.getToken));
            setLogged(true);
            setAnimateSpin(true);
            setSizeSpin(80);
            setStyleSpin(styles.spinner);
            setTimeout(() => {
                navigation.navigate("CustomTab", {screen: 'Accueil'});
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

    const handleRegister = (data: IUserProps): void => {
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
                const userData = {email: userEmail, password: userPassword}
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