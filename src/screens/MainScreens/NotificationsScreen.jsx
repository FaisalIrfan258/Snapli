import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    eventReminders: true,
    friendRequests: true,
    messages: true,
    emailNotifications: false,
  });

  const toggleSwitch = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Push Notifications</Text>
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <View>
              <Text style={styles.optionTitle}>Push Notifications</Text>
              <Text style={styles.optionDescription}>
                Receive push notifications for important updates
              </Text>
            </View>
            <Switch
              value={notifications.pushNotifications}
              onValueChange={() => toggleSwitch('pushNotifications')}
              trackColor={{ false: '#333', true: '#8B7FFF' }}
              thumbColor={notifications.pushNotifications ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          <View style={styles.option}>
            <View>
              <Text style={styles.optionTitle}>Event Reminders</Text>
              <Text style={styles.optionDescription}>
                Get notified about upcoming events
              </Text>
            </View>
            <Switch
              value={notifications.eventReminders}
              onValueChange={() => toggleSwitch('eventReminders')}
              trackColor={{ false: '#333', true: '#8B7FFF' }}
              thumbColor={notifications.eventReminders ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          {/* Add more notification options as needed */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#9E9E9E',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    backgroundColor: '#2A2630',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  optionDescription: {
    color: '#9E9E9E',
    fontSize: 14,
  },
});

export default NotificationsScreen;
