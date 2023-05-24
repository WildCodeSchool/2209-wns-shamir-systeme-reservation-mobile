import React, { createContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CREATE_USER, GET_TOKEN } from "../Tools/Mutation";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import IUserProps from "../interfaces/IUserProps";
import IAuthContextProps from "../interfaces/IAuthContextProps";
import { setToken } from "../stores/tokenReducer";
import { useDispatch } from "react-redux";
import ISigninProps from "../interfaces/ISignInProps";

export const AuthContext = createContext<IAuthContextProps | null>(null);

export const AuthProvider = ({ children }: any) => {
  const navigation = useNavigation();

  const [logged, setLogged] = useState<boolean>(false);
  const [errorCreate, setErrorCreate] = useState<string>("");
  const [animateSpin, setAnimateSpin] = useState<boolean>(false);
  const [styleSpin, setStyleSpin] = useState({});
  const [sizeSpin, setSizeSpin] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setErrorCreate("");
  }, []);

  const [getToken] = useMutation(GET_TOKEN);
  const [createUser] = useMutation(CREATE_USER);

  const handleToken = (data: ISigninProps): void => {
    getToken({ variables: { password: data.password, email: data.email } })
      .then(async ({ data }) => {
        await AsyncStorage.setItem("token", data.getToken);
        dispatch(setToken(data.getToken));
        setLogged(true);
        setAnimateSpin(true);
        setSizeSpin(80);
        setStyleSpin(styles.spinner);
        navigation.navigate("CustomTab", { screen: "Accueil" });
        setAnimateSpin(false);
        setSizeSpin(0);
      })
      .catch((e) => {
        setErrorCreate("Identifiant ou mot de passe incorrect.");
        console.log("====================================");
        console.log("error dans handleToken (AuthContet) ", e);
        console.log("====================================");
      });
  };

  const handleRegister = (res: IUserProps): void => {
    const userEmail = res.email;
    const userPassword = res.password;
    if (userPassword === res.passwordConfirm) {
      createUser({
        variables: {
          firstname: res.firstname,
          lastname: res.lastname,
          phone: res.phone,
          email: res.email,
          password: res.password,
          passwordConfirm: res.passwordConfirm,
        },
      })
        .then(async ({ data }) => {
          console.log('====================================');
          console.log('la data dans context ', data);
          console.log('====================================');
          const token = await getToken({ variables: { password: res.password, email: res.email } });
          await AsyncStorage.setItem("token", token.data.getToken);
          dispatch(setToken(token.data.getToken));
          setLogged(true);
          setAnimateSpin(true);
          setSizeSpin(80);
          setStyleSpin(styles.spinner);
          // setTimeout(() => {
              navigation.navigate("CustomTab", {screen: 'Accueil'});
            setAnimateSpin(false);
            setSizeSpin(0);
          // }, 2000);
        })
        .catch((e) => {
          if (e.message.substring(0, 9) === "duplicate") {
            setErrorCreate("Ce compte existe déjà.");
          } else {
            setErrorCreate("Une erreur est survenue, merci de réessayer.");
          }
          console.log("====================================");
          console.log("error dans handleRegister (AuthContext) ", e);
          console.log("====================================");
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleRegister,
        handleToken,
        setErrorCreate,
        setLogged,
        errorCreate,
        logged,
        animateSpin,
        styleSpin,
        sizeSpin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  spinner: {
    marginTop: 30,
  },
});
