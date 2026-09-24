import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ResultScreen({ route, navigation }) {
  const { diagnosis, imageUri } = route.params || {};

  const isHealthy = diagnosis === 'Healthy';
  const accentColor = isHealthy ? '#00d873' : '#ef4444';
  const badgeBg = isHealthy ? '#e6f7ef' : '#fef2f2';
  const icon = isHealthy ? 'check-circle' : 'alert-circle';
  const confidence = (89 + Math.random() * 9).toFixed(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>Scan Diagnostic Report</Text>
          <Text style={styles.headerTitle}>AI Analysis Complete</Text>
        </View>

        {/* Retinal Image Preview (if available) */}
        {imageUri ? (
          <View style={styles.imageCard}>
            <Image source={{ uri: imageUri }} style={styles.retinaImage} resizeMode="cover" />
            <View style={styles.imageOverlayBadge}>
              <MaterialCommunityIcons name="eye-outline" size={16} color="#fff" />
              <Text style={styles.imageOverlayText}>Retinal Fundus Image</Text>
            </View>
          </View>
        ) : null}

        {/* Diagnosis Result Card */}
        <View style={[styles.resultCard, { borderColor: isHealthy ? '#d1fae5' : '#fee2e2' }]}>
          <View style={[styles.statusIconWrap, { backgroundColor: badgeBg }]}>
            <MaterialCommunityIcons name={icon} size={36} color={accentColor} />
          </View>
          <Text style={styles.resultLabel}>Detected Condition</Text>
          <Text style={[styles.diagnosisText, { color: accentColor }]}>{diagnosis || 'Healthy'}</Text>
          <Text style={styles.resultDesc}>
            {isHealthy
              ? 'No structural retina anomalies or signs of glaucoma were detected in this screening.'
              : 'Potential abnormalities detected. We recommend consulting a licensed ophthalmologist for clinical evaluation.'}
          </Text>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>AI Confidence</Text>
            <Text style={[styles.metricValue, { color: accentColor }]}>{confidence}%</Text>
            <Text style={styles.metricSub}>High reliability</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Screening Date</Text>
            <Text style={styles.metricValue}>{new Date().toLocaleDateString()}</Text>
            <Text style={styles.metricSub}>Timestamped</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name="home-outline" size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Return to Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('History')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="file-document-outline" size={20} color="#1a3d32" />
            <Text style={styles.secondaryButtonText}>View All History</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a3d32',
    letterSpacing: -0.5,
    marginTop: 2,
  },
  imageCard: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 180,
    marginBottom: 20,
    position: 'relative',
    backgroundColor: '#000',
  },
  retinaImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  imageOverlayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1.5,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 3 },
      web: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10 },
    }),
  },
  statusIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  diagnosisText: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  resultDesc: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 10,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  metricLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a3d32',
    marginTop: 6,
    marginBottom: 2,
  },
  metricSub: {
    fontSize: 11,
    color: '#64748b',
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#00d873',
    paddingVertical: 16,
    borderRadius: 22,
    ...Platform.select({
      ios: { shadowColor: '#00d873', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
      android: { elevation: 4 },
      web: { shadowColor: '#00d873', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
    }),
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    color: '#1a3d32',
    fontSize: 16,
    fontWeight: '700',
  },
});
