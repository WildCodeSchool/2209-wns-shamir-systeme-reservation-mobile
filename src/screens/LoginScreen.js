import React from "react";
import { Text } from "react-native";

export default function LoginScreen ({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Code de connexion, par exemple en utilisant une requête HTTP
    // ...

    setIsLoggedIn(true);
    navigation.navigate('Home');
  }

  return (
    <View>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={login}>
        <Text>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}
