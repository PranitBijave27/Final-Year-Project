import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HISTORY_DATA = [
  { id: '1', patientName: 'John Doe', date: '2023-10-25', diagnosis: 'Healthy', confidence: 0.98 },
  { id: '2', patientName: 'Jane Smith', date: '2023-10-24', diagnosis: 'Glaucoma Suspected', confidence: 0.85 },
  { id: '3', patientName: 'Robert Brown', date: '2023-10-22', diagnosis: 'Diabetic Retinopathy', confidence: 0.92 },
  { id: '4', patientName: 'Emily Davis', date: '2023-10-20', diagnosis: 'Healthy', confidence: 0.99 },
];

export default function HistoryScreen({ navigation }) {
  const renderItem = ({ item }) => {
    const isHealthy = item.diagnosis === 'Healthy';
    const badgeBg = isHealthy ? '#e6f7ef' : '#fef2f2';
    const badgeColor = isHealthy ? '#00d873' : '#ef4444';
    const icon = isHealthy ? 'check-circle-outline' : 'alert-circle-outline';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Result', { diagnosis: item.diagnosis })}
      >
        <View style={[styles.iconCircle, { backgroundColor: badgeBg }]}>
          <MaterialCommunityIcons name={icon} size={24} color={badgeColor} />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.recordDate}>{item.date}</Text>
        </View>

        <View style={styles.badgeContainer}>
          <View style={[styles.diagnosisBadge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.diagnosisText, { color: badgeColor }]}>{item.diagnosis}</Text>
          </View>
          <Text style={styles.confidenceScore}>{(item.confidence * 100).toFixed(0)}% AI Conf.</Text>
        </View>

        <MaterialCommunityIcons name="chevron-right" size={20} color="#94a3b8" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={HISTORY_DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.headerTitle}>Diagnostic Records</Text>
              <Text style={styles.headerSubtitle}>Recent patient fundus screenings & classifications</Text>
            </View>
          }
        />

        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Scan')}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.fabText}>New Scan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7faf8',
  },
  container: {
    flex: 1,
  },
  listHeader: {
    marginBottom: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a3d32',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  listContent: {
    padding: 20,
    paddingBottom: 90,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6 },
      android: { elevation: 2 },
      web: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6 },
    }),
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardContent: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a3d32',
  },
  recordDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 3,
  },
  badgeContainer: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  diagnosisBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 4,
  },
  diagnosisText: {
    fontSize: 11,
    fontWeight: '700',
  },
  confidenceScore: {
    fontSize: 11,
    color: '#64748b',
  },
  fab: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    right: 20,
    bottom: 24,
    backgroundColor: '#00d873',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 28,
    ...Platform.select({
      ios: { shadowColor: '#00d873', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 10 },
      android: { elevation: 6 },
      web: { shadowColor: '#00d873', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 10 },
    }),
  },
  fabText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
