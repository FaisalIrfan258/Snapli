import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';

const PrivacyScreen = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    locationSharing: false,
    activityStatus: true,
    dataCollection: true,
  });

  const toggleSwitch = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Privacy Settings</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.optionsContainer}>
          <View style={styles.option}>
            <View>
              <Text style={styles.optionTitle}>Profile Visibility</Text>
              <Text style={styles.optionDescription}>
                Make your profile visible to other users
              </Text>
            </View>
            <Switch
              value={privacySettings.profileVisibility}
              onValueChange={() => toggleSwitch('profileVisibility')}
              trackColor={{ false: '#333', true: '#8B7FFF' }}
              thumbColor={privacySettings.profileVisibility ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          <View style={styles.option}>
            <View>
              <Text style={styles.optionTitle}>Location Sharing</Text>
              <Text style={styles.optionDescription}>
                Share your location with event attendees
              </Text>
            </View>
            <Switch
              value={privacySettings.locationSharing}
              onValueChange={() => toggleSwitch('locationSharing')}
              trackColor={{ false: '#333', true: '#8B7FFF' }}
              thumbColor={privacySettings.locationSharing ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          <View style={styles.option}>
            <View>
              <Text style={styles.optionTitle}>Activity Status</Text>
              <Text style={styles.optionDescription}>
                Show when you're active on the app
              </Text>
            </View>
            <Switch
              value={privacySettings.activityStatus}
              onValueChange={() => toggleSwitch('activityStatus')}
              trackColor={{ false: '#333', true: '#8B7FFF' }}
              thumbColor={privacySettings.activityStatus ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>

          <View style={styles.option}>
            <View>
              <Text style={styles.optionTitle}>Data Collection</Text>
              <Text style={styles.optionDescription}>
                Allow data collection to improve app experience
              </Text>
            </View>
            <Switch
              value={privacySettings.dataCollection}
              onValueChange={() => toggleSwitch('dataCollection')}
              trackColor={{ false: '#333', true: '#8B7FFF' }}
              thumbColor={privacySettings.dataCollection ? '#FFFFFF' : '#F4F3F4'}
            />
          </View>
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

export default PrivacyScreen;
