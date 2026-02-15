import AsyncStorage from '@react-native-async-storage/async-storage';

type EventType = 'otp_generated' | 'otp_validation_success' | 'otp_validation_failure' | 'logout';

interface AnalyticsEvent {
  type: EventType;
  timestamp: number;
  metadata?: Record<string, any>;
}

class Analytics {
  private async logEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const key = `analytics_${Date.now()}`;
      await AsyncStorage.setItem(key, JSON.stringify(event));
      console.log('[Analytics]', event.type, event.metadata);
    } catch (error) {
      console.error('[Analytics] Failed to log event:', error);
    }
  }

  async getAllEvents(): Promise<AnalyticsEvent[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const analyticsKeys = keys.filter(key => key.startsWith('analytics_'));
      const items = await AsyncStorage.multiGet(analyticsKeys);
      return items.map(([_, value]) => JSON.parse(value || '{}'));
    } catch (error) {
      console.error('[Analytics] Failed to get events:', error);
      return [];
    }
  }

  async clearAllEvents(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const analyticsKeys = keys.filter(key => key.startsWith('analytics_'));
      await AsyncStorage.multiRemove(analyticsKeys);
      console.log('[Analytics] All events cleared');
    } catch (error) {
      console.error('[Analytics] Failed to clear events:', error);
    }
  }

  otpGenerated(email: string): void {
    this.logEvent({
      type: 'otp_generated',
      timestamp: Date.now(),
      metadata: { email },
    });
  }

  otpValidationSuccess(email: string): void {
    this.logEvent({
      type: 'otp_validation_success',
      timestamp: Date.now(),
      metadata: { email },
    });
  }

  otpValidationFailure(email: string, reason: string): void {
    this.logEvent({
      type: 'otp_validation_failure',
      timestamp: Date.now(),
      metadata: { email, reason },
    });
  }

  logout(email: string, sessionDuration: number): void {
    this.logEvent({
      type: 'logout',
      timestamp: Date.now(),
      metadata: { email, sessionDuration },
    });
  }
}

export const analytics = new Analytics();
