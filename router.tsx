const Stack = createStackNavigator<RootStackParamList>();
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";

export const useRoute = (isAuth: boolean) => {
  return (
    <Stack.Navigator>
      {!isAuth ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name='LoginScreen'
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name='RegisterScreen'
            component={RegisterScreen}
          />
        </>
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name='ProfileScreen'
          component={ProfileScreen}
        />
      )}
    </Stack.Navigator>
  );
};
