import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import QRCodeGenerator from 'qrcode';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const InviteGuestsModal = ({ visible, onClose, eventData }) => {
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [qrCodeUri, setQrCodeUri] = React.useState(null);

  React.useEffect(() => {
    if (visible && eventData) {
      // Generate QR Code URI
      QRCodeGenerator.toDataURL(`event-id-${eventData.eventName}`, { width: 200, margin: 1 }, (err, url) => {
        if (!err) {
          setQrCodeUri(url);
        }
      });
    }
  }, [visible, eventData]);

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
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Invite Guests</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              </View>

              {/* QR Code */}
              <View style={styles.qrContainer}>
                {qrCodeUri && (
                  <Image
                    source={{ uri: qrCodeUri }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
                <Text style={styles.eventName}>{eventData?.eventName}</Text>
                <Text style={styles.subtitle}>Share this QR code with your guests</Text>
              </View>

              {/* Event Info */}
              <View style={styles.eventInfo}>
                <View style={styles.infoRow}>
                  <Image 
                    source={require('../assets/icons/calender.png')}
                    style={[styles.infoIcon, { tintColor: '#8B7FFF' }]}
                  />
                  <Text style={styles.infoText}>{eventData?.startDate}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Image 
                    source={require('../assets/icons/location.png')}
                    style={[styles.infoIcon, { tintColor: '#8B7FFF' }]}
                  />
                  <Text style={styles.infoText}>{eventData?.location}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Image 
                    source={require('../assets/icons/guests.png')}
                    style={[styles.infoIcon, { tintColor: '#8B7FFF' }]}
                  />
                  <Text style={styles.infoText}>{eventData?.guestsCount || 1} guests</Text>
                </View>
              </View>

              {/* Share Button */}
              <TouchableOpacity style={styles.shareButton}>
                <Image 
                  source={require('../assets/icons/share.png')}
                  style={styles.shareIcon}
                />
                <Text style={styles.shareButtonText}>Share Invite Link</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
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
    height: SCREEN_HEIGHT * 0.7, // Takes up 90% of screen height
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  doneButton: {
    fontSize: 16,
    color: '#8B7FFF',
    fontWeight: '600',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  eventName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9E9E9E',
  },
  eventInfo: {
    backgroundColor: 'rgba(139, 127, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    marginBottom: 40,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcon: {
    width: 20,
    height: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B7FFF',
    padding: 16,
    borderRadius: 30,
    gap: 8,
  },
  shareIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InviteGuestsModal;
