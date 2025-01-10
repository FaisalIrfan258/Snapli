import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InviteGuestsModal from '../../components/InviteGuestsModal';
import CreateEventModal from '../../components/CreateEventModal';
import BottomNavBar from '../../components/BottomNavBar';
import firestore from '@react-native-firebase/firestore';
import { launchCamera } from 'react-native-image-picker';

const EventCard = ({ event, onPress, onCameraPress, onGalleryPress, onInvitePress, onDeletePress, onUpdatePress }) => (
  <View>
    <TouchableOpacity style={styles.eventCard} onPress={onPress}>
      {event.coverImage ? (
        <Image source={event.coverImage} style={styles.eventImage} />
      ) : (
        <View style={styles.eventImagePlaceholder}>
          <Image 
            source={require('../../assets/icons/gift.png')} 
            style={styles.placeholderIcon}
          />
        </View>
      )}
      
      <View style={styles.eventInfo}>
        <View style={styles.eventTypeContainer}>
          <Text style={styles.eventType}>{event.occasion}</Text>
        </View>
        
        <Text style={styles.eventName}>{event.eventName}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailItem}>
            <Image 
              source={require('../../assets/icons/calender.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{event.date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Image 
              source={require('../../assets/icons/clock.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Image 
              source={require('../../assets/icons/location.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Image 
              source={require('../../assets/icons/guests.png')}
              style={styles.statsIcon}
            />
            <Text style={styles.statsText}>{event.guestsCount} guests</Text>
          </View>
          
          <View style={styles.statItem}>
            <Image 
              source={require('../../assets/icons/camera.png')}
              style={styles.statsIcon}
            />
            <Text style={styles.statsText}>{event.photoLimit} photos/guest</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>

    <View style={styles.actionButtons}>
      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onCameraPress}
      >
        <Image 
          source={require('../../assets/icons/camera.png')}
          style={styles.actionIcon}
        />
        <Text style={styles.actionText}>Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onGalleryPress}
      >
        <Image 
          source={require('../../assets/icons/gallery.png')}
          style={styles.actionIcon}
        />
        <Text style={styles.actionText}>Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onInvitePress}
      >
        <Image 
          source={require('../../assets/icons/invite.png')}
          style={styles.actionIcon}
        />
        <Text style={styles.actionText}>Invite</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onUpdatePress}
      >
        <Image 
          source={require('../../assets/icons/edit.png')}
          style={styles.actionIcon}
        />
        <Text style={styles.actionText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onDeletePress}
      >
        <Image 
          source={require('../../assets/icons/delete.png')}
          style={styles.actionIcon}
        />
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const EventsScreen = () => {
  const navigation = useNavigation();
  const [createEventModalVisible, setCreateEventModalVisible] = useState(false);
  const [inviteGuestsModalVisible, setInviteGuestsModalVisible] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);

  const handleCameraPress = async (event) => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.error('Camera error: ', response.error);
      } else {
        // Handle the image response here
        console.log('Image URI: ', response.assets[0].uri);
        // You can now use the image URI as needed
      }
    });
  };

  const handleGalleryPress = (event) => {
    // Handle gallery action
    navigation.navigate('Gallery', { eventId: event.id });
  };

  const handleInvitePress = (event) => {
    setSelectedEventData(event);
    setInviteGuestsModalVisible(true);
  };

  const handleCreateEvent = () => {
    setCreateEventModalVisible(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await firestore().collection('events').doc(eventId).delete();
      Alert.alert('Success', 'Event deleted successfully');
    } catch (error) {
      console.error("Error deleting event: ", error);
      Alert.alert('Error', 'Failed to delete event');
    }
  };

  const handleUpdatePress = (event) => {
    setSelectedEventData(event);
    setCreateEventModalVisible(true);
  };

  // Sample event data
  const events = [
    {
      id: 1,
      occasion: 'Birthday',
      eventName: 'FB',
      date: '16-Dec-2024',
      time: '12:24 PM',
      location: 'NY',
      guestsCount: 1,
      photoLimit: 10,
      coverImage: require('../../assets/icons/camera.png'),
    },
    
    // Add more events as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Snaply</Text>
          <Text style={styles.subtitle}>Capture moments together</Text>
        </View>

        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.createButtonIcon}>+</Text>
          <Text style={styles.createButtonText}>Create New Event</Text>
        </TouchableOpacity>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Your Events</Text>
          {events.map(event => (
            <EventCard 
              key={event.id}
              event={event}
              onPress={() => handleInvitePress(event)}
              onCameraPress={() => handleCameraPress(event)}
              onGalleryPress={() => handleGalleryPress(event)}
              onInvitePress={() => handleInvitePress(event)}
              onUpdatePress={() => handleUpdatePress(event)}
              onDeletePress={() => handleDeleteEvent(event.id)}
            />
          ))}
        </View>
      </ScrollView>

      <CreateEventModal 
        visible={createEventModalVisible}
        onClose={() => setCreateEventModalVisible(false)}
      />

      <InviteGuestsModal 
        visible={inviteGuestsModalVisible}
        onClose={() => setInviteGuestsModalVisible(false)}
        eventData={selectedEventData}
      />

      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9E9E9E',
    marginBottom: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B7FFF',
    marginHorizontal: 50,
    padding: 12,
    borderRadius: 320,
    marginBottom: 32,
  },
  createButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    marginRight: 8,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  eventsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#2A2630',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  eventImagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(139, 127, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: 48,
    height: 48,
    tintColor: '#8B7FFF',
  },
  eventInfo: {
    padding: 16,
  },
  eventTypeContainer: {
    backgroundColor: 'rgba(139, 127, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  eventType: {
    color: '#8B7FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  eventName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  eventDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 16,
    height: 16,
    tintColor: '#9E9E9E',
    marginRight: 8,
  },
  detailText: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsIcon: {
    width: 16,
    height: 16,
    tintColor: '#9E9E9E',
    marginRight: 8,
  },
  statsText: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2A2630',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: 12,
    marginTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#8B7FFF',
    marginBottom: 4,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default EventsScreen;
