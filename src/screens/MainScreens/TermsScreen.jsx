import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Terms & Privacy</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms of Service</Text>
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              Welcome to Snapli. By using our app, you agree to these terms. Please read them carefully.
            </Text>
            
            <Text style={styles.subheading}>1. Using our Services</Text>
            <Text style={styles.paragraph}>
              You must follow any policies made available to you within the Services. Don't misuse our Services. You may use our Services only as permitted by law.
            </Text>

            <Text style={styles.subheading}>2. Your Content</Text>
            <Text style={styles.paragraph}>
              Our Services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              When you use our services, you're trusting us with your information. We understand this is a big responsibility and work hard to protect your information.
            </Text>

            <Text style={styles.subheading}>Information We Collect</Text>
            <Text style={styles.paragraph}>
              • Profile information you provide
              {'\n'}• Content you create, upload, or receive
              {'\n'}• Usage and log information
              {'\n'}• Location information
              {'\n'}• Device information
            </Text>

            <Text style={styles.subheading}>How We Use Information</Text>
            <Text style={styles.paragraph}>
              We use the information we collect to provide, maintain, and improve our services, develop new ones, and protect our users.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  textContainer: {
    backgroundColor: '#2A2630',
    borderRadius: 16,
    padding: 16,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#9E9E9E',
    marginBottom: 16,
  },
});

export default TermsScreen;
