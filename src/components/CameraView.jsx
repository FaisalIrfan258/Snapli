// import React, { useRef, useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';

// const CameraView = () => {
//   const camera = useRef(null);
//   const devices = useCameraDevices();
//   const device = devices.back;

//   if (!device) {
//     return <View style={styles.container} />;
//   }

//   return (
//     <Camera
//       ref={camera}
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive={true}
//       photo={true}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
// });

// export default CameraView; 