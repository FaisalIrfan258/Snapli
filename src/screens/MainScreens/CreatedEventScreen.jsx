import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNavBar from '../../components/BottomNavBar';
import InviteGuestsModal from '../../components/InviteGuestsModal';

const CreatedEventScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { eventData = {} } = route.params || {};
  const [showInviteModal, setShowInviteModal] = React.useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Cover Image */}
      <Image
        source={eventData.coverImage ? { uri: eventData.coverImage } : require('../../assets/icons/camera.png')}
        style={styles.coverImage}
      />

      {/* Event Details Card */}
      <View style={styles.eventDetails}>
        <View style={styles.eventTypeContainer}>
          <Text style={styles.eventType}>{eventData.occasion || 'Event'}</Text>
        </View>

        <Text style={styles.eventName}>{eventData.eventName || 'Untitled Event'}</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Image 
              source={require('../../assets/icons/calender.png')}
              style={styles.infoIcon}
            />
            <View>
              <Text style={styles.infoLabel}>Date & Time</Text>
              <Text style={styles.infoValue}>{eventData.startDate}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Image 
              source={require('../../assets/icons/location.png')}
              style={styles.infoIcon}
            />
            <View>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{eventData.location}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Image 
              source={require('../../assets/icons/photo-limit.png')}
              style={styles.infoIcon}
            />
            <View>
              <Text style={styles.infoLabel}>Photo Limit</Text>
              <Text style={styles.infoValue}>{eventData.photoLimit || 10}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Image 
              source={require('../../assets/icons/guests.png')}
              style={styles.infoIcon}
            />
            <View>
              <Text style={styles.infoLabel}>Number of Guests</Text>
              <Text style={styles.infoValue}>{eventData.guestLimit || 25}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.inviteButton]}
            onPress={() => navigation.navigate('Event')}
          >
            <Text style={styles.actionButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Invite Modal */}
      <InviteGuestsModal 
        visible={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        eventData={eventData}
      />

      {/* Bottom Navigation */}
      {/* <BottomNavBar /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720', // Solid background color
  },
  coverImage: {
    width: '100%',
    height: 250, // Adjust height as needed
    position: 'absolute',
    top: 0,
    zIndex: 1, // Ensure the image is on top
  },
  eventDetails: {
    flex: 1,
    marginTop: 200, // Adjust margin to position below the cover image
    backgroundColor: '#242129', // Darker card background
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Shadow effect for Android
    zIndex: 2, // Ensure the card is above the background
  },
  eventTypeContainer: {
    backgroundColor: 'rgba(139, 127, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  eventType: {
    color: '#8B7FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  eventName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 24,
  },
  infoSection: {
    gap: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  infoIcon: {
    width: 28, // Slightly larger icons
    height: 28,
  },
  infoLabel: {
    color: '#9E9E9E',
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B7FFF', // Button color
    elevation: 3, // Shadow effect for buttons
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatedEventScreen;
