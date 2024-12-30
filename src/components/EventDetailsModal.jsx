import React, { useState } from 'react';
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
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import EventSettingsModal from './EventSettingsModal';
import { useNavigation } from '@react-navigation/native';

const EventDetailsModal = ({ visible, onClose, eventType }) => {
  const { width: screenWidth, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [eventName, setEventName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [showSettings, setShowSettings] = React.useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = React.useState(false);
  const [coverPhoto, setCoverPhoto] = useState(null);
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

  // Updated image picker function
  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.error) {
        Alert.alert('Error', 'Image picker error: ' + response.error);
        return;
      }
      if (response.assets && response.assets[0]) {
        setCoverPhoto(response.assets[0].uri);
      }
    });
  };

  // Updated Date & Time Picker handlers for Android and iOS
  const handleDateTimeChange = (event, selectedDate, isStart, mode) => {
    if (Platform.OS === 'Android' && event.type === 'dismissed') {
      return;
    }

    const currentDate = selectedDate || (isStart ? startDate : endDate);

    if (isStart) {
      setShowStartDatePicker(Platform.OS === 'ios');
      setShowStartTimePicker(Platform.OS === 'ios');
      setStartDate(currentDate);
    } else {
      setShowEndDatePicker(Platform.OS === 'ios');
      setShowEndTimePicker(Platform.OS === 'ios');
      setEndDate(currentDate);
    }
  };

  // Updated Date & Time Section
  const renderDateTimePicker = (timeType, date, isStart) => (
    <View style={[styles.inputGroup, { marginBottom: sizes.padding }]}>
      <Text style={[styles.inputLabel, { fontSize: sizes.fontSize.label }]}>
        {timeType} Date & Time
      </Text>
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity 
          style={[styles.dateInput, styles.inputBase]}
          onPress={() => isStart ? setShowStartDatePicker(true) : setShowEndDatePicker(true)}
        >
          <Text style={[styles.dateTimeText, { fontSize: sizes.fontSize.input }]}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.timeInput, styles.inputBase]}
          onPress={() => isStart ? setShowStartTimePicker(true) : setShowEndTimePicker(true)}
        >
          <Text style={[styles.dateTimeText, { fontSize: sizes.fontSize.input }]}>
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
      </View>

      {Platform.OS === 'ios' ? (
        <>
          {showStartDatePicker && isStart && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => handleDateTimeChange(event, selectedDate, isStart, 'date')}
            />
          )}
          {showStartTimePicker && isStart && (
            <DateTimePicker
              value={date}
              mode="time"
              display="spinner"
              onChange={(event, selectedDate) => handleDateTimeChange(event, selectedDate, isStart, 'time')}
            />
          )}
        </>
      ) : (
        <>
          {((isStart && showStartDatePicker) || (!isStart && showEndDatePicker)) && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => handleDateTimeChange(event, selectedDate, isStart, 'date')}
            />
          )}
          {((isStart && showStartTimePicker) || (!isStart && showEndTimePicker)) && (
            <DateTimePicker
              value={date}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => handleDateTimeChange(event, selectedDate, isStart, 'time')}
            />
          )}
        </>
      )}
    </View>
  );

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
              <TouchableOpacity 
                style={styles.coverPhotoContainer}
                onPress={pickImage}
              >
                {coverPhoto ? (
                  <Image 
                    source={{ uri: coverPhoto }} 
                    style={styles.coverPhoto}
                    resizeMode="cover"
                  />
                ) : (
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
                )}
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
                  {renderDateTimePicker(timeType, index === 0 ? startDate : endDate, index === 0)}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    alignSelf: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: 'rgba(139, 127, 255, 0.2)',
    borderStyle: 'dashed',
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
    height: 56,
    backgroundColor: '#242129',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 56,
    backgroundColor: '#242129',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  dateInput: {
    flex: 2,
  },
  timeInput: {
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
  coverPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
});

export default EventDetailsModal;