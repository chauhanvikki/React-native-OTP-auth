import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { analytics } from '../services/analytics';

interface AnalyticsViewerProps {
  onClose: () => void;
}

export const AnalyticsViewer: React.FC<AnalyticsViewerProps> = ({ onClose }) => {
  const [events, setEvents] = useState<any[]>([]);

  const loadEvents = async () => {
    const allEvents = await analytics.getAllEvents();
    setEvents(allEvents.sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleClear = async () => {
    await analytics.clearAllEvents();
    setEvents([]);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'otp_generated': return '#2196f3';
      case 'otp_validation_success': return '#4caf50';
      case 'otp_validation_failure': return '#f44336';
      case 'logout': return '#ff9800';
      default: return '#757575';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Events ({events.length})</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.refreshButton} onPress={loadEvents}>
            <Text style={styles.buttonText}>🔄 Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>🗑️ Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>✕ Close</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.eventList}>
        {events.length === 0 ? (
          <Text style={styles.emptyText}>No events logged yet</Text>
        ) : (
          events.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <View style={[styles.eventType, { backgroundColor: getEventColor(event.type) }]}>
                <Text style={styles.eventTypeText}>{event.type}</Text>
              </View>
              <Text style={styles.eventTime}>{formatTime(event.timestamp)}</Text>
              {event.metadata && (
                <View style={styles.metadata}>
                  {Object.entries(event.metadata).map(([key, value]) => (
                    <Text key={key} style={styles.metadataText}>
                      {key}: {String(value)}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  refreshButton: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#757575',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  eventList: {
    flex: 1,
    padding: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 50,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  eventType: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  eventTypeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  metadata: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 4,
  },
  metadataText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
});
