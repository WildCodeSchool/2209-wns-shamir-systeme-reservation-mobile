import { useMutation } from "@apollo/client";
import { MAKING_CONTACT } from "../Tools/Mutation";
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ImageBackground, useWindowDimensions, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
//@ts-ignore
import home from "../../assets/images/home.jpg";
import { LinearGradient } from 'expo-linear-gradient';
import FlashMessage, { showMessage } from "react-native-flash-message";


export default function ContactScreen() {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("Sélectionnez une rubrique");
    const [message, setMessage] = useState<string>("");
    const [messageConfirm, setMessageConfirm] = useState<string>("");

    const [makingContact] = useMutation(MAKING_CONTACT);
    const { height } = useWindowDimensions();

    const submitContact = (e: any): void => {
        e.preventDefault();
        handleSubmit(name, email, subject, message);
        setMessageConfirm("");
    };

    const handleSubmit = (name: string, email: string, subject: string, message: string): void => {
        makingContact({
            variables: {
                name,
                email,
                subject,
                message
            }
        }).then(({ data }) => {
            setMessageConfirm(data.makingContact);
            setName("");
            setEmail("");
            setSubject("Sélectionnez une rubrique");
            setMessage("");
            showMessage({
                message: messageConfirm,
                type: "info",
            });
        }).catch((e) => {
            showMessage({
                message: "Une erreur est survenue.",
                type: "info",
            });
            console.log("Une erreur est survenue : ", e)
        })
    };


    const styles = StyleSheet.create({
        background: {
            height: height
        },
        image: {
            flex: 1,
            resizeMode: 'cover',
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        title: {
            fontSize: 25,
            fontWeight: 'bold',
            marginTop: 42,
            marginBottom: 20,
            color: '#fff',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
            width: '100%',
        },
        whiteInput: {
            backgroundColor: '#fff',
            color: '#000',
        },
        dropdown: {
            backgroundColor: 'white',
            borderRadius: 5,
        },
        dropdownText: {
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 14,
            color: '#333',
        },
        dropdownContainer: {
            width: '82.5%',
            backgroundColor: '#fff',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ddd',
            maxHeight: 110,
        },
        textarea: {
            height: 100,
            textAlignVertical: 'top',
        },
        button: {
            backgroundColor: '#2196f3',
            padding: 10,
            borderRadius: 5,
            width: '100%',
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    });

    return (
        <ScrollView>
            <ImageBackground source={home} style={styles.image}>
                <LinearGradient colors={['transparent', '#0d81ab']} style={styles.background}>
                    <View style={styles.container}>
                        <FlashMessage position="top" />
                        <Text style={styles.title}>CONTACT</Text>
                        <TextInput
                            placeholder="Nom"
                            value={name}
                            onChangeText={(value) => setName(value)}
                            style={[styles.input, styles.whiteInput]}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(value) => setEmail(value)}
                            style={[styles.input, styles.whiteInput]}
                        />
                        <View style={[styles.input, styles.whiteInput]}>
                            <ModalDropdown
                                options={['Question sur ma réservation', 'Question sur un produit', 'Autre question']}
                                defaultValue={subject}
                                style={styles.dropdown}
                                textStyle={styles.dropdownText}
                                dropdownStyle={styles.dropdownContainer}
                                // value={subject}
                                onSelect={(value: any) => {
                                    if (value === 0) {
                                        value = "- réservation";
                                    } else if (value === 1) {
                                        value = "- produit"
                                    } else if (value === 2) {
                                        value = "- divers"
                                    }
                                    setSubject(value)
                                }}
                            />
                        </View>
                        <TextInput
                            placeholder="Message"
                            value={message}
                            onChangeText={(value) => setMessage(value)}
                            multiline={true}
                            numberOfLines={4}
                            style={[styles.input, styles.textarea, styles.whiteInput]}
                        />
                        <TouchableOpacity style={styles.button} onPress={submitContact}>
                            <Text style={styles.buttonText}>Envoyer</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </ScrollView>
    );
}