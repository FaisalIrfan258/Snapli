import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    Alert.alert('Reset Password', `Reset link will be sent to: ${email}`);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.description}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>Send Reset Link</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backToLogin}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
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
    width: '100%',
  },
  resetButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    marginTop: 24,
    alignItems: 'center',
  },
  backToLoginText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ForgotPassword;
