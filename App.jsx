// App.jsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreens/SplashScreen';
import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import SignUpScreen from './src/screens/AuthScreens/SignUpScreen';
import ForgotPassword from './src/screens/AuthScreens/ForgotPassword';
import HomeScreen from './src/screens/MainScreens/HomeScreen';
import EventScreen from './src/screens/MainScreens/EventScreen';
import ProfileScreen from './src/screens/MainScreens/ProfileScreen';
import CreatedEventScreen from './src/screens/MainScreens/ CreatedEventScreen';
import EditProfileScreen from './src/screens/MainScreens/ EditProfileScreen';
// import NotificationsScreen from './src/screens/MainScreens/NotificationsScreen';
import ContactUsScreen from './src/screens/MainScreens/ContactUsScreen';
import PrivacyScreen from './src/screens/MainScreens/PrivacyScreen';
import TermsScreen from './src/screens/MainScreens/TermsScreen';
import HelpCenterScreen from './src/screens/MainScreens/HelpCenterScreen';
import CameraScreen from './src/screens/MainScreens/CameraScreen';
import { Camera } from 'react-native-vision-camera';
const Stack = createStackNavigator();

// Initialize camera permissions at app startup
const initializeCameraPermissions = async () => {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  if (cameraPermission === 'not-determined') {
    await Camera.requestCameraPermission();
  }
};

// Call this in your app's initialization
initializeCameraPermissions();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreatedEvent"
          component={CreatedEventScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="Notification"
          component={NotificationsScreen}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Help"
          component={HelpCenterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: false,
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
