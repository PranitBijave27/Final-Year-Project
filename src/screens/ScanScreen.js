import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Button as NativeButton } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ProgressBar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [analyzing, setAnalyzing] = useState(false);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  const simulateAnalysis = (imageUri) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const diagnoses = ['Healthy', 'Glaucoma Detected', 'Diabetic Retinopathy'];
      const randomDiagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];
      navigation.replace('Result', { diagnosis: randomDiagnosis, imageUri });
    }, 2000);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        setAnalyzing(true);
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          simulateAnalysis(photo.uri);
        } else {
          setAnalyzing(false);
        }
      } catch (error) {
        console.error("Camera capture failed", error);
        setAnalyzing(false);
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        simulateAnalysis(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image", error);
    }
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>
          We need your permission to show the camera
        </Text>
        <NativeButton onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView style={styles.camera} ref={cameraRef} facing="back">
          <View style={styles.overlay}>
            <View style={styles.guideFrame} />
            <Text style={styles.guideText}>Align retina within the frame</Text>
          </View>
        </CameraView>
      )}

      <View style={styles.controls}>
        {analyzing ? (
          <View style={styles.processingContainer}>
            <Text style={styles.processingText}>Analyzing Retinal Image...</Text>
            <ProgressBar indeterminate color="#00d873" style={styles.progressBar} />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.galleryButton}>
              <MaterialCommunityIcons name="image" size={30} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
              <View style={styles.captureInner} />
            </TouchableOpacity>

            <View style={{ width: 50 }} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 125,
    borderStyle: 'dashed',
  },
  guideText: {
    color: '#fff',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 4,
  },
  controls: {
    height: 150,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
  },
  galleryButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
  },
  processingContainer: {
    width: '80%',
    alignItems: 'center',
  },
  processingText: {
    color: '#fff',
    marginBottom: 10,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
  },
});
