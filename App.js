import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './views/home/HomeScreen';
import SavedColorsScreen from './views/savedColors/SavedColorsScreen';
import ChoosePhotoScreen from './views/choosePhoto/ChoosePhotoScreen';
import PhotoScreen from './views/photo/PhotoScreen';
import HarmoniesScreen from './views/harmonies/HarmoniesScreen';
import SavedHarmoniesScreen from './views/savedHarmonies/SavedHarmoniesScreen';
import {DefaultTheme, IconButton, Provider as PaperProvider} from 'react-native-paper';
import AboutScreen from './views/about/AboutScreen';
import {LogBox} from "react-native";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(0, 119, 110)',
        accent: 'rgb(240, 230, 140)'
    },
};

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <MyStack/>
            </NavigationContainer>
        </PaperProvider>
    );
}

function MyStack() {
    return (
        <Stack.Navigator screenOptions={({navigation, route}) => ({
            headerStyle: {
                backgroundColor: 'rgb(255, 255, 255)',
            },
            headerTintColor: 'rgb(50, 50, 50)',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            cardStyle: {backgroundColor: 'rgb(255, 255, 255)'},
            headerRight: () => (route.name !== 'Home' &&
                <IconButton
                    onPress={() => navigation.navigate('Home')}
                    title="Info"
                    color="rgb(50, 50, 50)"
                    icon="home"
                />
            )
        })}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Saved Colors" component={SavedColorsScreen}/>
            <Stack.Screen name="Choose a photo" component={ChoosePhotoScreen}/>
            <Stack.Screen name="Chosen photo" component={PhotoScreen}/>
            <Stack.Screen name="Harmonies" component={HarmoniesScreen}/>
            <Stack.Screen name="Saved Harmonies" component={SavedHarmoniesScreen}/>
            <Stack.Screen name="About" component={AboutScreen}/>
        </Stack.Navigator>
    );
}
