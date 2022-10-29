import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme,DarkTheme } from '@react-navigation/native';

import { useColorScheme } from 'react-native';
import { BookDetail } from "./screens/";
import Tabs from './navigation/tab';
import { useFonts } from 'expo-font';

const theme = {
  ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    },
    
}


const Stack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();
    const [loaded] = useFonts({
            "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
            "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
            "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
        })

    if(!loaded){
        return null;
    }
    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DarkTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                {/* Tabs */}
                <Stack.Screen name="Home" component={Tabs} />

                {/* Screens */}
                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;