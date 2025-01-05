import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '663731162238-a31vkeacnfsset8jdk8sh5vi9t438954.apps.googleusercontent.com',
    });
    
  }, []);

  const handleGoogleLogin = async () => {
    try {
      // Check if the device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user
      await auth().signInWithCredential(googleCredential);
      Alert.alert('Success', 'You are now signed in!');
      navigation.navigate('HomeScreen'); // Replace 'Home' with your target screen
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Snaply.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Sign in with Google to continue</Text>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <Image
            source={require('../../assets/google-icon.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A1720',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 180,
    height: 90,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    marginBottom: 32,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242129',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
 
});

export default LoginScreen;