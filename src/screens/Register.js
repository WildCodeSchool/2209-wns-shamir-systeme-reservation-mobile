import Logo from "../../assets/images/512.png";
import home from "../../assets/images/home.jpg";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";

const Register = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  //function register in AuthContext
  const {
    handleRegister,
    setErrorCreate,
    errorCreate,
    sizeSpin,
    animateSpin,
    styleSpin,
  } = useContext(AuthContext);

  // form
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  //reset input after submitSuccess
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setErrorCreate("");
    }
  });

  const onForgotPressed = () => {
    console.log("Mot de passe oublié");
  };

  const alreadyAccount = () => {
    console.log("pas de compte");
    navigation.navigate("SignIn");
  };

  //onPress of rulesLink
  const onRulesPress = () => {
    console.log("vue sur les conditions générales");
  };

  return (
    <ScrollView>
      <ImageBackground source={home} resizeMode="cover" style={styles.image}>
        <LinearGradient
          colors={["#0d81ab", "transparent", "#0d81ab"]}
          style={styles.background}
        >
          <View style={styles.root}>
            <Image
              source={Logo}
              style={[styles.logo, { height: height * 0.1 }]}
              resizeMode="contain"
            ></Image>
            <Text style={styles.title}>Inscription</Text>
            <ActivityIndicator
              color="#30bcef"
              size={sizeSpin}
              animating={animateSpin}
              style={styleSpin}
            />

            <View style={styles.form}>
              <View>
                <Text style={styles.label}>Nom</Text>
              </View>
              <CustomInput
                label="Nom"
                size="250"
                control={control}
                name="lastname"
                placeholder="Nom"
                type="text"
                rules={{ required: "Le nom est requis" }}
              />
              <View>
                <Text style={styles.label}>Prénom</Text>
              </View>
              <CustomInput
                label="Prénom"
                size="250"
                control={control}
                name="firstname"
                placeholder="Prénom"
                type="text"
                rules={{ required: "Le prénom est requis" }}
              />
              <View>
                <Text style={styles.label}>Téléphone</Text>
              </View>
              <CustomInput
                label="Téléphone"
                size="250"
                control={control}
                name="phone"
                placeholder="Téléphone"
                type="number"
                rules={{
                  required: "Le téléphone est requis",
                  pattern: {
                    value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                    message: "Le numéro n'est pas valide.",
                  },
                  maxLength: {
                    value: 10,
                    message: "Le numéro n'est pas valide",
                  },
                }}
              />
              <View>
                <Text style={styles.label}>Email</Text>
              </View>
              <CustomInput
                label="Email"
                size="250"
                control={control}
                name="email"
                placeholder="Email"
                type="text"
                rules={{
                  required: "L'email est requis",
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Votre email n'est pas valide.",
                  },
                }}
              />
              <View>
                <Text style={styles.label}>Mot de passe</Text>
              </View>
              <CustomInput
                label="Mot de passe"
                size="250"
                control={control}
                name="password"
                placeholder="Mot de passe"
                type="password"
                rules={{
                  required: "Le mot de passe est requis",
                  minLength: {
                    value: 5,
                    message:
                      "Le mot de passe doit contenir au minimum 5 caractères.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
                    message:
                      "Le mot de passe doit contenir au minimum 5 caractères, minimum une lettre majuscule, une lettre minuscule, un chiffre et un caractere special",
                  },
                }}
                secureTextEntry={true}
              />
              <View>
                <Text style={styles.label}>Confirmation du mot de passe</Text>
              </View>
              <CustomInput
                label="Mot de passe"
                size="250"
                control={control}
                name="passwordConfirm"
                placeholder="Confirmation du mot de passe"
                type="password"
                rules={{
                  required: "Le mot de passe est requis",
                  minLength: {
                    value: 5,
                    message:
                      "Le mot de passe doit contenir au minimum 5 caractères.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
                    message:
                      "Le mot de passe doit contenir au minimum 5 caractères, minimum une lettre majuscule, une lettre minuscule, un chiffre et un caractere special",
                  },
                }}
                secureTextEntry={true}
              />

              {errorCreate ? (
                <Text style={{ color: "red", width: 250 }}>{errorCreate}</Text>
              ) : (
                ""
              )}

              <Text style={styles.rules}>
                J'accepte les{" "}
                <Text style={styles.rulesLink} onPress={onRulesPress}>
                  conditions générales
                </Text>{" "}
                requises à l'inscription
              </Text>

              <CustomButton
                size="250"
                text="Valider"
                onPress={handleSubmit(handleRegister)}
                type="WILD"
              />
              <CustomButton
                size="250"
                text="Mot de passe oublié ?"
                onPress={onForgotPressed}
                type="TERTIARY"
              />

              <CustomButton
                size="250"
                text="J'ai déjà un compte"
                onPress={alreadyAccount}
                type="SECONDARY"
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
  },
  title: {
    marginVertical: 20,
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
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
    justifyContent: "center",
  },
  rules: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    color: "#fff",
  },
  rulesLink: {
    textDecorationLine: "underline",
  },
  form: {
    flex: 1,
    width: 250,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    textAlign: "left",
  },
});

export default Register;
