import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Camera')}
      >
        <Image 
          source={require('../assets/icons/camera.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Create')}
      >
        <Image 
          source={require('../assets/icons/create.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Settings')}
      >
        <Image 
          source={require('../assets/icons/setting.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#333333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF', // This will make the icons white
  },
});

export default BottomNavBar;
