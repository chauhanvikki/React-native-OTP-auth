import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSessionTimer } from '../hooks/useSessionTimer';
import { analytics } from '../services/analytics';

interface SessionScreenProps {
  email: string;
  startTime: number;
  onLogout: () => void;
}

export const SessionScreen: React.FC<SessionScreenProps> = ({ email, startTime, onLogout }) => {
  const { duration, formattedDuration } = useSessionTimer(startTime);

  const handleLogout = () => {
    analytics.logout(email, duration);
    onLogout();
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Active</Text>
      
      <View style={styles.infoCard}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Session Started</Text>
        <Text style={styles.value}>{formatDate(startTime)}</Text>
      </View>

      <View style={styles.timerCard}>
        <Text style={styles.timerLabel}>Session Duration</Text>
        <Text style={styles.timer}>{formattedDuration}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  timerCard: {
    backgroundColor: '#007AFF',
    padding: 30,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
