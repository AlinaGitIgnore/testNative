const AuthStack = createStackNavigator<RootStackParamList>();
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";

export const useRoute = (isAuth: boolean) => {
  return (
    <AuthStack.Navigator>
      {!isAuth ? (
        <>
          <AuthStack.Screen
            options={{ headerShown: false }}
            name='LoginScreen'
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name='RegisterScreen'
            component={RegisterScreen}
          />
        </>
      ) : (
        <AuthStack.Screen
          options={{ headerShown: false }}
          name='ProfileScreen'
          component={ProfileScreen}
        />
      )}
    </AuthStack.Navigator>
  );
};
