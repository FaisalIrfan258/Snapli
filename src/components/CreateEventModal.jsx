import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  Animated,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventDetailsModal from './EventDetailsModal';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const eventTypes = [
  {
    id: 'birthday',
    label: 'Birthday',
    icon: require('../assets/icons/birthday.png'),
  },
  {
    id: 'wedding',
    label: 'Wedding',
    icon: require('../assets/icons/wedding.png'),
  },
  {
    id: 'party',
    label: 'Party',
    icon: require('../assets/icons/party.png'),
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: require('../assets/icons/travel.png'),
  },
  {
    id: 'other',
    label: 'Other',
    icon: require('../assets/icons/other.png'),
  },
];

const EventType = ({ icon, label, onPress, isSelected }) => (
  <TouchableOpacity 
    style={[
      styles.eventTypeButton,
      isSelected && styles.eventTypeButtonSelected
    ]}
    onPress={onPress}
  >
    <View style={styles.iconCircle}>
      <Image source={icon} style={styles.eventIcon} />
    </View>
    <Text style={styles.eventTypeLabel}>{label}</Text>
  </TouchableOpacity>
);

const CreateEventModal = ({ visible, onClose }) => {
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [showEventDetails, setShowEventDetails] = React.useState(false);
  const navigation = useNavigation();

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

  const handleContinue = () => {
    if (selectedEvent) {
      setShowEventDetails(true);
      onClose();
    }
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
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.title}>New Event</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.heading}>What's the occasion?</Text>
              <Text style={styles.subheading}>Choose the type of event you're planning</Text>

              <View style={styles.eventTypesGrid}>
                {eventTypes.map((eventType) => (
                  <EventType
                    key={eventType.id}
                    icon={eventType.icon}
                    label={eventType.label}
                    onPress={() => setSelectedEvent(eventType.id)}
                    isSelected={selectedEvent === eventType.id}
                  />
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity 
              style={[
                styles.continueButton,
                !selectedEvent && styles.continueButtonDisabled
              ]}
              disabled={!selectedEvent}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <EventDetailsModal 
        visible={showEventDetails}
        onClose={() => setShowEventDetails(false)}
        eventType={selectedEvent}
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
    padding: 20,
    height: SCREEN_HEIGHT * 0.8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  closeIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    color: '#9E9E9E',
    marginBottom: 30,
  },
  eventTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 4,
  },
  eventTypeButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'rgba(139, 127, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B7FFF',
    
  },
  eventTypeButtonSelected: {
    backgroundColor: 'rgba(139, 127, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#8B7FFF',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(139, 127, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  eventTypeLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#8B7FFF',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#4A4A4A',
    opacity: 0.7,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateEventModal;