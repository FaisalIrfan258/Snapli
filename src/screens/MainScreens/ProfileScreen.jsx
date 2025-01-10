import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import BottomNavBar from '../../components/BottomNavBar';

const MenuItem = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <Text style={styles.menuItemText}>{title}</Text>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await auth().signOut(); // Log out the user
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Profile</Text>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user && user.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>{user ? user.displayName.charAt(0) : 'J'}</Text>
            )}
          </View>
          <Text style={styles.name}>{user ? user.displayName : 'John Doe'}</Text>
          <Text style={styles.email}>{user ? user.email : 'john.doe@example.com'}</Text>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <View style={styles.menuContainer}>
            <MenuItem 
              icon={<Text style={styles.menuIcon}>👤</Text>}
              title="Edit Profile"
              onPress={() => navigation.navigate('EditProfile')}
            />
            <MenuItem 
              icon={<Text style={styles.menuIcon}>🔒</Text>}
              title="Privacy"
              onPress={() => navigation.navigate('Privacy')}
            />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <View style={styles.menuContainer}>
            <MenuItem 
              icon={<Text style={styles.menuIcon}>❓</Text>}
              title="Help Center"
              onPress={() => navigation.navigate('Help')}
            />
            <MenuItem 
              icon={<Text style={styles.menuIcon}>✉️</Text>}
              title="Contact Us"
              onPress={() => navigation.navigate('ContactUs')}
            />
            <MenuItem 
              icon={<Text style={styles.menuIcon}>📜</Text>}
              title="Terms & Privacy"
              onPress={() => navigation.navigate('Terms')}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2A2630',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarText: {
    fontSize: 32,
    color: '#8B7FFF',
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  section: {
    marginBottom: 32,
  },
  menuContainer: {
    backgroundColor: '#2A2630',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 127, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  chevron: {
    fontSize: 20,
    color: '#9E9E9E',
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
