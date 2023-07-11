import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './navigations/Navigations';
import Splash from './screens/Splash';
import Introduce from './screens/Introduce';
import Register from './screens/Register';
import Login from './screens/Login';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
        <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>



        <Stack.Screen name="Introduce" component={Introduce}></Stack.Screen>

        <Stack.Screen name="Navigation" component={Navigation}></Stack.Screen>
        <Stack.Screen name="Register" component={Register}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
