import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProfileScreen: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export type RegisterProps = NativeStackScreenProps<RootStackParamList, "RegisterScreen">;
export interface IRegistrationValues {
  name: string;
  email: string;
  password: string;
  confPassword: string;
}

export type ProfileProps = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;
