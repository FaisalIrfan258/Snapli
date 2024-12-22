import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  useWindowDimensions,
  Platform,
  Modal,
  Animated,
} from 'react-native';
import EventSettingsModal from './EventSettingsModal';
import { useNavigation } from '@react-navigation/native';

const EventDetailsModal = ({ visible, onClose, eventType }) => {
  const { width: screenWidth, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [eventName, setEventName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [showSettings, setShowSettings] = React.useState(false);
  const navigation = useNavigation();

  // Animation value for sliding
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 90,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, SCREEN_HEIGHT]);

  // Get dynamic sizes based on screen width
  const getSizes = () => ({
    padding: screenWidth < 380 ? 16 : 20,
    fontSize: {
      title: screenWidth < 380 ? 16 : 18,
      label: screenWidth < 380 ? 14 : 16,
      input: screenWidth < 380 ? 14 : 16,
      button: screenWidth < 380 ? 16 : 18,
    },
    iconSize: screenWidth < 380 ? 32 : 40,
    modalHeight: SCREEN_HEIGHT * 0.9,
  });

  const sizes = getSizes();

  const handleContinue = () => {
    setShowSettings(true);
    onClose(); // Close details modal
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              { 
                transform: [{ translateY: slideAnim }],
                height: sizes.modalHeight,
              }
            ]}
          >
            <View style={[styles.header, { padding: sizes.padding }]}>
              <TouchableOpacity 
                onPress={onClose} 
                style={[styles.closeButton, { left: sizes.padding }]}
              >
                <Text style={[styles.closeIcon, { fontSize: sizes.fontSize.title }]}>✕</Text>
              </TouchableOpacity>
              <Text style={[styles.title, { fontSize: sizes.fontSize.title }]}>
                Event Details
              </Text>
            </View>

            <ScrollView 
              style={[styles.content, { padding: sizes.padding }]} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Cover Photo Section */}
              <TouchableOpacity style={styles.coverPhotoContainer}>
                <View style={styles.coverPhotoPlaceholder}>
                  <Image 
                    source={require('../assets/icons/camera.png')}
                    style={[styles.placeholderIcon, { width: sizes.iconSize, height: sizes.iconSize }]}
                  />
                  <Text style={[styles.coverPhotoText, { fontSize: sizes.fontSize.title }]}>
                    Add Cover Photo
                  </Text>
                  <Text style={[styles.coverPhotoSubtext, { fontSize: sizes.fontSize.label - 2 }]}>
                    Make your event stand out
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Event Name Input */}
              <View style={[styles.inputGroup, { marginBottom: sizes.padding }]}>
                <Text style={[styles.inputLabel, { fontSize: sizes.fontSize.label }]}>
                  Event Name
                </Text>
                <TextInput
                  style={[styles.input, { fontSize: sizes.fontSize.input }]}
                  placeholder="Enter event name"
                  placeholderTextColor="#666"
                  value={eventName}
                  onChangeText={setEventName}
                />
              </View>

              {/* Location Input */}
              <View style={[styles.inputGroup, { marginBottom: sizes.padding }]}>
                <Text style={[styles.inputLabel, { fontSize: sizes.fontSize.label }]}>
                  Location
                </Text>
                <TextInput
                  style={[styles.input, { fontSize: sizes.fontSize.input }]}
                  placeholder="Enter event location"
                  placeholderTextColor="#666"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>

              {/* Date & Time Inputs */}
              {['Start', 'End'].map((timeType, index) => (
                <View 
                  key={timeType} 
                  style={[styles.inputGroup, { marginBottom: sizes.padding }]}
                >
                  <Text style={[styles.inputLabel, { fontSize: sizes.fontSize.label }]}>
                    {timeType} Date & Time
                  </Text>
                  <View style={styles.dateTimeContainer}>
                    <TouchableOpacity style={[styles.dateInput, styles.inputBase]}>
                      <Text style={[styles.dateTimeText, { fontSize: sizes.fontSize.input }]}>
                        16-Dec-2024
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.timeInput, styles.inputBase]}>
                      <Text style={[styles.dateTimeText, { fontSize: sizes.fontSize.input }]}>
                        12:22 PM
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.timeZoneInput, styles.inputBase]}>
                      <Text style={[styles.dateTimeText, { fontSize: sizes.fontSize.input }]}>
                        GMT+1
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={[styles.bottomNav, { padding: sizes.padding }]}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={onClose}
              >
                <Text style={[styles.backButtonText, { fontSize: sizes.fontSize.button }]}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={[styles.continueButtonText, { fontSize: sizes.fontSize.button }]}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <EventSettingsModal 
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        navigation={navigation}
        eventData={{
          occasion: eventType,
          eventName: eventName,
          location: location,
          startDate: '16 December 2024 at 12:24 PM',
        }}
      />
    </>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    position: 'absolute',
    zIndex: 1,
    padding: 8,
  },
  closeIcon: {
    color: '#FFFFFF',
  },
  title: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  coverPhotoContainer: {
    aspectRatio: 16/9,
    backgroundColor: 'rgba(139, 127, 255, 0.1)',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  coverPhotoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    tintColor: '#8B7FFF',
    marginBottom: 12,
  },
  coverPhotoText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  coverPhotoSubtext: {
    color: '#666',
  },
  inputGroup: {
    width: '100%',
  },
  inputLabel: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputBase: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    height: 56,
    justifyContent: 'center',
  },
  input: {
    ...Platform.select({
      ios: {
        height: 56,
      },
      android: {
        height: 56,
        paddingVertical: 8,
      },
    }),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 2,
  },
  timeInput: {
    flex: 1,
  },
  timeZoneInput: {
    flex: 1,
  },
  dateTimeText: {
    color: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
  },
  backButton: {
    flex: 1,
    height: 56,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    flex: 1,
    height: 56,
    borderRadius: 30,
    backgroundColor: '#8B7FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default EventDetailsModal;