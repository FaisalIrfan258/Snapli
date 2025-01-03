import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Text,
  Platform,
  Alert,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GalleryScreen = () => {
  const route = useRoute();
  const { eventId } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample images from Unsplash
  const eventPhotos = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3' },
    { id: '2', uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7' },
    { id: '3', uri: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf' },
    { id: '4', uri: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745' },
    { id: '5', uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30' },
    { id: '6', uri: 'https://images.unsplash.com/photo-1496024840928-4c417adf211d' },
    { id: '7', uri: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec' },
    { id: '8', uri: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7' },
    { id: '9', uri: 'https://images.unsplash.com/photo-1506157786151-b8491531f063' },
    { id: '10', uri: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4' },
    { id: '11', uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' },
    { id: '12', uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819' },
    { id: '13', uri: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b' },
    { id: '14', uri: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea' },
    { id: '15', uri: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a' },
    { id: '16', uri: 'https://images.unsplash.com/photo-1574391534633-fb3c217d0a4d' },
    { id: '17', uri: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec' },
    { id: '18', uri: 'https://images.unsplash.com/photo-1506157786151-b8491531f063' },
    { id: '19', uri: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4' },
    { id: '20', uri: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3' },
    { id: '21', uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819' },
    { id: '22', uri: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b' },
    { id: '23', uri: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea' },
    { id: '24', uri: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a' },
    { id: '25', uri: 'https://images.unsplash.com/photo-1574391534633-fb3c217d0a4d' },
  ];

  const openSettings = () => {
    Linking.openSettings();
  };

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        
        if (permission) {
          return true;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to save photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const saveImage = async (imageUrl) => {
    try {
      const hasPermission = await checkPermission();
      
      if (!hasPermission) {
        Alert.alert(
          'Permission Required', 
          'Please grant storage permission in your device settings to save images.',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Open Settings', 
              onPress: openSettings
            }
          ]
        );
        return;
      }

      Alert.alert('Saving...', 'Please wait while we save your image.');

      const { config, fs } = RNFetchBlob;
      const fileName = `event_photo_${Date.now()}.jpg`;
      
      if (Platform.OS === 'ios') {
        const response = await config({
          fileCache: true,
          appendExt: 'jpg',
        }).fetch('GET', imageUrl);
        
        const filePath = response.path();
        await RNFetchBlob.ios.previewDocument(filePath);
      } else {
        const response = await config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: `${fs.dirs.PictureDir}/${fileName}`,
            description: 'Image downloaded',
            mediaScannable: true,
          },
        }).fetch('GET', imageUrl);
      }

      Alert.alert('Success', 'Image saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save image. Please try again.');
    }
  };

  const saveAllImages = async () => {
    const hasPermission = await checkPermission();
    
    if (!hasPermission) {
      return;
    }

    Alert.alert(
      'Save All Images',
      'Do you want to save all images to your gallery?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async () => {
            try {
              Alert.alert('Saving...', 'Please wait while we save all images.');
              
              for (const photo of eventPhotos) {
                await saveImage(photo.uri);
              }
              
              Alert.alert('Success', 'All images saved successfully!');
            } catch (error) {
              console.error('Save all error:', error);
              Alert.alert('Error', 'Failed to save all images. Please try again.');
            }
          },
        },
      ]
    );
  };

  const deleteImage = (imageId) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Add your delete logic here based on your storage solution
            Alert.alert('Success', 'Image deleted successfully!');
          },
        },
      ]
    );
  };

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => setSelectedImage(item)}
    >
      <Image
        source={{ uri: `${item.uri}?w=300&q=80` }}
        style={styles.gridImage}
      />
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={() => saveImage(item.uri)}
      >
        <Icon name="download" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const ImageViewer = () => (
    <Modal visible={!!selectedImage} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <SafeAreaView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setSelectedImage(null)}
            >
              <Icon name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => selectedImage && saveImage(selectedImage.uri)}
              >
                <Icon name="download" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteButton]}
                onPress={() => selectedImage && deleteImage(selectedImage.id)}
              >
                <Icon name="delete" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          )}
        </SafeAreaView>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gallery</Text>
        <TouchableOpacity 
          style={styles.saveAllButton}
          onPress={saveAllImages}
        >
          <Icon name="download-multiple" size={24} color="#FFFFFF" />
          <Text style={styles.saveAllText}>Save All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={eventPhotos}
        renderItem={renderPhotoItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.photoList}
      />
      <ImageViewer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  photoList: {
    padding: 2,
  },
  gridItem: {
    flex: 1/3,
    aspectRatio: 1,
    padding: 2,
  },
  gridImage: {
    flex: 1,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  fullScreenImage: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  saveAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B7FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveAllText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
  saveButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 1,
  },
  modalActions: {
    flexDirection: 'row',
  },
  modalButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#FF4B6A',
  },
});

export default GalleryScreen;
