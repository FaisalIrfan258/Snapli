import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import your icons
import calendarIcon from '../assets/icons/calender.png'; // Adjust the path as necessary
import cameraIcon from '../assets/icons/camera.png'; // Adjust the path as necessary
import profileIcon from '../assets/icons/profile.png'; // Adjust the path as necessary

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Image 
          source={calendarIcon} 
          style={[styles.icon, isActive('Events') && styles.activeIcon]} 
        />
        {/* <Text style={[styles.label, isActive('Events') && styles.activeLabel]}>Events</Text> */}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Event')}
      >
        <Image 
          source={cameraIcon} 
          style={[styles.icon, isActive('Camera') && styles.activeIcon]} 
        />
        {/* <Text style={[styles.label, isActive('Camera') && styles.activeLabel]}>Camera</Text> */}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image 
          source={profileIcon} 
          style={[styles.icon, isActive('Profile') && styles.activeIcon]} 
        />
        {/* <Text style={[styles.label, isActive('Profile') && styles.activeLabel]}>Profile</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1A1720',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 20,
    paddingTop: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 30, // Set the width of the icon
    height: 30, // Set the height of the icon
    marginBottom: 4,
    tintColor: '#666', // Use tintColor for color change
  },
  activeIcon: {
    tintColor: '#8B7FFF', // Change color when active
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  activeLabel: {
    color: '#8B7FFF',
  },
});

export default BottomNavBar;
