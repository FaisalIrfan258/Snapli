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
import Slider from '@react-native-community/slider';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const EventSettingsModal = ({ 
  visible, 
  onClose, 
  eventData,
  navigation
}) => {
  const [photoLimit, setPhotoLimit] = React.useState(10);
  const [guestLimit, setGuestLimit] = React.useState(25);
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const photoLimitOptions = [5, 10, 15, 25, 30];
  const guestLimitOptions = [25, 50, 75, 100, 150, 200, 250, '250+'];

  const defaultEventData = {
    occasion: 'Event',
    eventName: '',
    location: '',
    startDate: new Date().toLocaleString(),
    coverImage: null,
  };

  const safeEventData = eventData || defaultEventData;

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
      occasion: safeEventData.occasion,
      eventName: safeEventData.eventName,
      location: safeEventData.location,
      startDate: safeEventData.startDate,
      coverImage: safeEventData.coverImage,
      photoLimit: photoLimit,
      guestLimit: guestLimit,
      isPremium: guestLimit > 25,
      guestsCount: 1,
      photosCount: 42
    };
    
    if (guestLimit > 25) {
      navigation.navigate('PaymentScreen', { 
        eventData: completeEventData 
      });
    } else {
      navigation.navigate('CreatedEvent', { 
        eventData: completeEventData 
      });
    }
    onClose();
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

            {/* Photo Limit Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Photo Limit</Text>
                <Text style={styles.valueDisplay}>{photoLimit} photos</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={5}
                maximumValue={30}
                step={5}
                value={photoLimit}
                onValueChange={setPhotoLimit}
                minimumTrackTintColor="#8B7FFF"
                maximumTrackTintColor="rgba(255, 255, 255, 0.1)"
                thumbTintColor="#8B7FFF"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>5</Text>
                <Text style={styles.sliderLabel}>30</Text>
              </View>
            </View>

            {/* Guest Limit Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Number of Guests</Text>
                <Text style={styles.valueDisplay}>
                  {guestLimit === 275 ? '250+' : guestLimit} guests
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={25}
                maximumValue={275}
                step={25}
                value={guestLimit}
                onValueChange={setGuestLimit}
                minimumTrackTintColor="#8B7FFF"
                maximumTrackTintColor="rgba(255, 255, 255, 0.1)"
                thumbTintColor="#8B7FFF"
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>25</Text>
                <Text style={styles.sliderLabel}>250+</Text>
              </View>
              {guestLimit > 25 && (
                <Text style={styles.premiumNote}>
                  *Premium feature - Requires payment
                </Text>
              )}
            </View>

            {/* Event Summary Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Event Summary</Text>
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Occasion</Text>
                  <Text style={styles.summaryValue}>{safeEventData.occasion}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Event Name</Text>
                  <Text style={styles.summaryValue}>{safeEventData.eventName}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Location</Text>
                  <Text style={styles.summaryValue}>{safeEventData.location}</Text>
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
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sliderLabel: {
    color: '#666',
    fontSize: 14,
  },
  valueDisplay: {
    color: '#8B7FFF',
    fontSize: 16,
    fontWeight: '600',
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 15,
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: 'rgba(139, 127, 255, 0.2)',
    borderColor: '#8B7FFF',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#8B7FFF',
    fontWeight: '600',
  },
  premiumNote: {
    color: '#8B7FFF',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
});

export default EventSettingsModal;
