import { Dispatch, SetStateAction } from "react";
import ISigninProps from "./ISignInProps";
import IUserProps from "./IUserProps";

export default interface IAuthContextProps {
    handleRegister: (data: IUserProps) => void;
    handleToken: (data: ISigninProps) => void;
    setErrorCreate: Dispatch<SetStateAction<string>>;
    setLogged: Dispatch<SetStateAction<boolean>>;
    errorCreate: string; 
    logged: boolean; 
    animateSpin: boolean; 
    styleSpin: {}; 
    sizeSpin: number;
  }