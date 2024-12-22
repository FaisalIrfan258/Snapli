import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EventCard = ({ event, onPress }) => (
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
            source={require('../../assets/icons/location.png')}
            style={styles.detailIcon}
          />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>
      </View>

      <View style={styles.guestsContainer}>
        <Image 
          source={require('../../assets/icons/guests.png')}
          style={styles.guestsIcon}
        />
        <Text style={styles.guestsCount}>{event.guestsCount}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const EventsScreen = () => {
  const navigation = useNavigation();

  // Sample event data
  const events = [
    {
      id: 1,
      occasion: 'Birthday',
      eventName: 'FB',
      date: '16-Dec-2024',
      location: 'NY',
      guestsCount: 1,
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
          onPress={() => {
            // Show create event modal
          }}
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
              onPress={() => navigation.navigate('Event', { eventData: event })}
            />
          ))}
        </View>
      </ScrollView>
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
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 30,
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
  guestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestsIcon: {
    width: 16,
    height: 16,
    tintColor: '#9E9E9E',
    marginRight: 8,
  },
  guestsCount: {
    color: '#9E9E9E',
    fontSize: 14,
  },
});

export default EventsScreen;
