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
        source={eventData.coverImage || require('../../assets/icons/camera.png')}
        style={styles.coverImage}
      />

      {/* Event Details */}
      <View style={styles.eventDetails}>
        <View style={styles.eventTypeContainer}>
          <Text style={styles.eventType}>{eventData.occasion || 'Event'}</Text>
        </View>

        <Text style={styles.eventName}>{eventData.eventName || 'Untitled Event'}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{eventData.guestsCount || 1}</Text>
            <Text style={styles.statLabel}>Guests</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{eventData.photosCount || 42}</Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Image 
              source={require('../../assets/icons/calender.png')}
              style={[styles.infoIcon, { tintColor: '#8B7FFF' }]}
            />
            <View>
              <Text style={styles.infoLabel}>Date & Time</Text>
              <Text style={styles.infoValue}>{eventData.startDate}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Image 
              source={require('../../assets/icons/location.png')}
              style={[styles.infoIcon, { tintColor: '#8B7FFF' }]}
            />
            <View>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{eventData.location}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Image 
              source={require('../../assets/icons/gallery.png')}
              style={[styles.infoIcon, { tintColor: '#8B7FFF' }]}
            />
            <View>
              <Text style={styles.infoLabel}>Gallery Access</Text>
              <Text style={styles.infoValue}>
                {eventData.galleryAccess ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.inviteButton]}
            onPress={() => setShowInviteModal(true)}
          >
            <Image 
              source={require('../../assets/icons/invite.png')}
              style={styles.actionButtonIcon}
            />
            <Text style={styles.actionButtonText}>Invite Guests</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.galleryButton]}
            onPress={() => {
              // Handle view gallery
            }}
          >
            <Image 
              source={require('../../assets/icons/gallery.png')}
              style={styles.actionButtonIcon}
            />
            <Text style={styles.actionButtonText}>View Gallery</Text>
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
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  coverImage: {
    width: '100%',
    height: '45%',
    position: 'absolute',
  },
  eventDetails: {
    flex: 1,
    marginTop: 'auto',
    backgroundColor: 'rgba(26, 23, 32, 0.95)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    gap: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#8B7FFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9E9E9E',
    fontSize: 16,
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
    width: 24,
    height: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  inviteButton: {
    backgroundColor: '#8B7FFF',
  },
  galleryButton: {
    backgroundColor: 'rgba(139, 127, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#8B7FFF',
  },
  actionButtonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatedEventScreen;
