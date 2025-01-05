import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();

  const handleGoogleSignup = () => {
    Alert.alert('Google Sign-In', 'Sign in with Google');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Snaply.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
          
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup}>
            <Image 
              source={require('../../assets/google-icon.png')} 
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 80,
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 90,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    height: 52,
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#242129',
    color: '#FFFFFF',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  orText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: 14,
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
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SignupScreen;
