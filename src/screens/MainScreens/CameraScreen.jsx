import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
} from 'react-native-vision-camera';
import { useRoute, useNavigation } from '@react-navigation/native';

const CameraScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const { eventId, photoLimit, photosRemaining: initialPhotosRemaining } = route.params || {};
  
  const [isReady, setIsReady] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [photosRemaining, setPhotosRemaining] = useState(initialPhotosRemaining);
  const [flash, setFlash] = useState('off');
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  // Check permissions when component mounts
  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      
      if (cameraPermission !== 'authorized') {
        const newCameraPermission = await Camera.requestCameraPermission();
        
        if (newCameraPermission === 'denied') {
          Alert.alert(
            'Camera Permission Required',
            'Please enable camera access in your device settings to use this feature.',
            [
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(),
              },
              {
                text: 'Cancel',
                onPress: () => navigation.goBack(),
                style: 'cancel',
              },
            ]
          );
          return;
        }
      }
      
      setHasPermission(true);
      setIsReady(true);
    } catch (error) {
      console.error('Error checking permissions:', error);
      Alert.alert('Error', 'Failed to initialize camera');
    }
  };

  // Show loading state
  if (!isReady || !device) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#8B7FFF" />
        <Text style={styles.loadingText}>Initializing camera...</Text>
      </SafeAreaView>
    );
  }

  // Show permission request
  if (!hasPermission) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.permissionText}>Camera access is required</Text>
        <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={checkPermissions}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={isFrontCamera ? devices.front : device}
        isActive={true}
        photo={true}
        enableZoomGesture
        preset="high"
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../../assets/icons/close.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              {photosRemaining} photos remaining
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.flashButton} 
            onPress={toggleFlash}
          >
            <Image 
              source={
                flash === 'off'
                  ? require('../../assets/icons/flash.png')
                  : require('../../assets/icons/flash.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.flipButton}
            onPress={toggleCamera}
          >
            <Image 
              source={require('../../assets/icons/flip.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.captureButton}
            onPress={handleCapture}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          <View style={styles.placeholder} />
        </View>
      </Camera>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    padding: 10,
  },
  flashButton: {
    padding: 10,
  },
  flipButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  counterContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  counterText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
  },
  placeholder: {
    width: 44,
  },
  permissionButton: {
    backgroundColor: '#8B7FFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  },
});

export default CameraScreen;