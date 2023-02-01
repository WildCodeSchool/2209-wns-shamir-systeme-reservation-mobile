import { TextProps, TextStyle } from "react-native";
export default interface ICustomeButtonProp {
    onPress?: () => void;
    text?: string; 
    type?: string; 
    size?: string;  
    icon?: boolean; 
    nameIcon?: string | undefined; 
    colorIcon?: string;
  }