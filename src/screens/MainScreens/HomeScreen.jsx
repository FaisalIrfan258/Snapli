import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';
import CreateEventModal from '../../components/CreateEventModal';

const HomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Snaply</Text>
        <Text style={styles.subtitle}>Create memories together</Text>
        
        <View style={styles.cameraCircle}>
          <Image 
            source={require('../../assets/icons/camera.png')}
            style={styles.cameraIcon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.noEventsText}>No Events Yet</Text>
        <Text style={styles.startText}>
          Start by creating your first event{'\n'}and invite friends to join
        </Text>

        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.createButtonText}>+ Create First Event</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar />
      
      <CreateEventModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720', // Dark purple background
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#8B7FFF', // Purple color for Snaply text
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#9E9E9E',
    marginBottom: 40,
  },
  cameraCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 127, 255, 0.2)', // Semi-transparent purple
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  cameraIcon: {
    width: 48,
    height: 48,
    tintColor: '#8B7FFF',
  },
  noEventsText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  startText: {
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  createButton: {
    backgroundColor: '#8B7FFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    maxWidth: 300,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
  
