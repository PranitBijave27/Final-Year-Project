import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, SafeAreaView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ route, navigation }) {
  const userName = route?.params?.name || 'Doctor';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeSubtitle}>Welcome back,</Text>
            <Text style={styles.welcomeTitle}>{userName}</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileBadge}
            onPress={() => navigation.navigate('History')}
          >
            <MaterialCommunityIcons name="account-circle-outline" size={32} color="#1a3d32" />
          </TouchableOpacity>
        </View>

        {/* Status / Overview Banner */}
        <View style={styles.bannerCard}>
          <View style={styles.bannerIconWrapper}>
            <MaterialCommunityIcons name="shield-check" size={28} color="#00d873" />
          </View>
          <View style={styles.bannerTextWrapper}>
            <Text style={styles.bannerTitle}>AI Diagnostic Ready</Text>
            <Text style={styles.bannerSubtitle}>Retinal image scan & real-time disease detection</Text>
          </View>
        </View>

        {/* Primary Action Card: Scan Eye */}
        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.mainActionCard}
          onPress={() => navigation.navigate('Scan')}
        >
          <View style={styles.mainActionContent}>
            <View style={styles.scanIconCircle}>
              <MaterialCommunityIcons name="eye-outline" size={44} color="#fff" />
            </View>
            <Text style={styles.mainActionTitle}>Start Eye Scan</Text>
            <Text style={styles.mainActionSubtitle}>
              Align retina using guided camera or select a fundus image from gallery
            </Text>
            <View style={styles.mainActionButton}>
              <Text style={styles.mainActionButtonText}>Open Scanner</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#00d873" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Features Row */}
        <Text style={styles.sectionHeading}>Quick Access</Text>
        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate('History')}
            activeOpacity={0.8}
          >
            <View style={[styles.quickIconCircle, { backgroundColor: '#e6f7ef' }]}>
              <MaterialCommunityIcons name="clock-time-three-outline" size={26} color="#00d873" />
            </View>
            <Text style={styles.quickTitle}>Scan History</Text>
            <Text style={styles.quickDesc}>View past diagnostic records</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => navigation.navigate('Scan')}
            activeOpacity={0.8}
          >
            <View style={[styles.quickIconCircle, { backgroundColor: '#eef3fc' }]}>
              <MaterialCommunityIcons name="image-multiple-outline" size={26} color="#2563eb" />
            </View>
            <Text style={styles.quickTitle}>Upload Photo</Text>
            <Text style={styles.quickDesc}>Analyze saved retina images</Text>
          </TouchableOpacity>
        </View>

        {/* Information Notice */}
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information-outline" size={20} color="#64748b" />
          <Text style={styles.infoText}>
            Alpha-Eye uses deep learning models to identify signs of Glaucoma and Diabetic Retinopathy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7faf8',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#667085',
    fontWeight: '500',
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a3d32',
    letterSpacing: -0.5,
  },
  profileBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2f5ec',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6 },
      android: { elevation: 2 },
      web: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6 },
    }),
  },
  bannerIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e6f7ef',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  bannerTextWrapper: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a3d32',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  mainActionCard: {
    backgroundColor: '#1a3d32',
    borderRadius: 24,
    padding: 24,
    marginBottom: 26,
    ...Platform.select({
      ios: { shadowColor: '#1a3d32', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16 },
      android: { elevation: 6 },
      web: { shadowColor: '#1a3d32', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16 },
    }),
  },
  mainActionContent: {
    alignItems: 'center',
  },
  scanIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  mainActionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  mainActionSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  mainActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 20,
    gap: 8,
  },
  mainActionButtonText: {
    color: '#1a3d32',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a3d32',
    marginBottom: 12,
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 24,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8 },
      android: { elevation: 2 },
      web: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8 },
    }),
  },
  quickIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a3d32',
    marginBottom: 4,
  },
  quickDesc: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#64748b',
    lineHeight: 17,
  },
});
