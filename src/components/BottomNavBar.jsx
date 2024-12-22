import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tab} 
        onPress={() => navigation.navigate('Events')}
      >
        <Text style={[styles.icon, isActive('Events') && styles.activeIcon]}>📅</Text>
        {/* <Text style={[styles.label, isActive('Events') && styles.activeLabel]}>Events</Text> */}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Event')}
      >
        <Text style={[styles.icon, isActive('Camera') && styles.activeIcon]}>📸</Text>
        {/* <Text style={[styles.label, isActive('Camera') && styles.activeLabel]}>Camera</Text> */}
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={[styles.icon, isActive('Profile') && styles.activeIcon]}>👤</Text>
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
    fontSize: 24,
    marginBottom: 4,
    color: '#666',
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  activeIcon: {
    color: '#8B7FFF',
  },
  activeLabel: {
    color: '#8B7FFF',
  },
});

export default BottomNavBar;
