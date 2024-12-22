import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Switch,
  ScrollView
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const EventSettingsModal = ({ 
  visible, 
  onClose, 
  eventData,
  navigation
}) => {
  const [photoLimit, setPhotoLimit] = React.useState(10);
  const [galleryAccess, setGalleryAccess] = React.useState(true);
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleCreateEvent = () => {
    const completeEventData = {
      occasion: eventData?.occasion || 'Event',
      eventName: eventData?.eventName || '',
      location: eventData?.location || '',
      startDate: eventData?.startDate || '16 December 2024 at 12:24 PM',
      coverImage: eventData?.coverImage || null,
      photoLimit: photoLimit,
      galleryAccess: galleryAccess,
      guestsCount: 1,
      photosCount: 42
    };
    
    navigation.navigate('CreatedEvent', { 
      eventData: completeEventData 
    });
    onClose(); // Close the modal
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Event Settings</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Progress Dots */}
            <View style={styles.progressDots}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={[styles.dot, styles.activeDot]} />
              <View style={[styles.dot, styles.activeDot]} />
            </View>

            {/* Photo Limit Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Photo Limit</Text>
              </View>
              <View style={styles.photoLimitContainer}>
                <Text style={styles.photoLimitValue}>{photoLimit}</Text>
                <Text style={styles.photoLimitLabel}>photos per person</Text>
              </View>
              <View style={styles.sliderContainer}>
                <View style={styles.slider}>
                  {/* Replace with a proper Slider component */}
                </View>
              </View>
              <Text style={styles.photoLimitHint}>Set to 0 for unlimited photos</Text>
            </View>

            {/* Gallery Access Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Gallery Access</Text>
                <Switch
                  value={galleryAccess}
                  onValueChange={setGalleryAccess}
                  trackColor={{ false: '#3A3A3A', true: '#8B7FFF' }}
                  thumbColor="#FFFFFF"
                />
              </View>
              <Text style={styles.sectionDescription}>
                Allow guests to view gallery before event ends
              </Text>
              <Text style={styles.galleryHint}>
                Guests can view photos in real-time as they're taken
              </Text>
            </View>

            {/* Event Summary Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Summary</Text>
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Occasion</Text>
                  <Text style={styles.summaryValue}>{eventData.occasion}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Event Name</Text>
                  <Text style={styles.summaryValue}>{eventData.eventName}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Location</Text>
                  <Text style={styles.summaryValue}>{eventData.location}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={onClose}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleCreateEvent}
            >
              <Text style={styles.createButtonText}>Create Event</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1720',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#444',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#8B7FFF',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  photoLimitContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 12,
  },
  photoLimitValue: {
    fontSize: 32,
    fontWeight: '600',
    color: '#8B7FFF',
    marginRight: 8,
  },
  photoLimitLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  photoLimitHint: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  sliderContainer: {
    marginVertical: 16,
  },
  slider: {
    height: 4,
    backgroundColor: '#8B7FFF',
    borderRadius: 2,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  galleryHint: {
    fontSize: 14,
    color: '#666',
  },
  summaryContainer: {
    marginTop: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  backButton: {
    flex: 1,
    height: 56,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    flex: 1,
    height: 56,
    borderRadius: 30,
    backgroundColor: '#8B7FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EventSettingsModal;
