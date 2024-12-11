import React from 'react';
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.content}>
      <Image 
          source={require('../../assets/bg.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      {/* Header positioned above BottomNavBar */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/Snaply.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.faqButton}>
            <Image
              source={require('../../assets/icons/faq.png')}
              style={styles.faqIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Image
            source={require('../../assets/icons/search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="What's the occasion?"
            placeholderTextColor="#808080"
          />
        </View>

        <TouchableOpacity style={styles.addNameButton}>
          <TextInput
            style={styles.addNameText}
            placeholder="Add a Name to Get Started →"
            placeholderTextColor="#808080"
            editable={false}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1F1F',
    },
    content: {
      flex: 1,
      justifyContent: 'center', // Vertically center the content
      alignItems: 'center', // Horizontally center the content
    },
    icon: {
      width: '80%', // Adjust the width as per your preference
      height: '50%', // Adjust the height as per your preference
    },
    header: {
      justifyContent: 'center',
      height: 250,
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: '#000000',
      borderTopWidth: 0.5,
      borderTopColor: '#333333',
      gap: 20,
      marginBottom: 60, // Adjust this to set above the BottomNavBar
    },
    logoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      width: 100,
      height: 40,
    },
    faqButton: {
      padding: 10,
    },
    faqIcon: {
      width: 24,
      height: 24,
      tintColor: '#FFFFFF',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2A2A2A',
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 45,
    },
    searchIcon: {
      width: 18,
      height: 18,
      tintColor: '#808080',
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      color: '#FFFFFF',
      fontSize: 16,
    },
    addNameButton: {
      backgroundColor: '#2A2A2A',
      borderRadius: 12,
      height: 45,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    addNameText: {
      color: '#808080',
      fontSize: 16,
    },
  });
  
  export default HomeScreen;
  