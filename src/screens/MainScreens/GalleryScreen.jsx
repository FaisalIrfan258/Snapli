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
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GalleryScreen = () => {
  const route = useRoute();
  const { images } = route.params; // Get images from route params
  const [selectedImage, setSelectedImage] = useState(null);

  const renderPhotoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => setSelectedImage(item)}
    >
      <Image
        source={{ uri: item }}
        style={styles.gridImage}
      />
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={() => saveImage(item)}
      >
        <Icon name="download" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gallery</Text>
      </View>
      <FlatList
        data={images} // Use the images passed from EventScreen
        renderItem={renderPhotoItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.photoList}
      />
      {/* Image Viewer Modal */}
      {selectedImage && (
        <Modal visible={!!selectedImage} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <SafeAreaView style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setSelectedImage(null)}
              >
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            </SafeAreaView>
          </View>
        </Modal>
      )}
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
