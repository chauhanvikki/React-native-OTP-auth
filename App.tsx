import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { OtpScreen } from './src/screens/OtpScreen';
import { SessionScreen } from './src/screens/SessionScreen';
import { AnalyticsViewer } from './src/screens/AnalyticsViewer';
import { SessionData } from './src/types/auth';

type Screen = 'login' | 'otp' | 'session' | 'analytics';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [email, setEmail] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [session, setSession] = useState<SessionData | null>(null);

  const handleOTPSent = (userEmail: string, otp: string) => {
    setEmail(userEmail);
    setGeneratedOTP(otp);
    setCurrentScreen('otp');
  };

  const handleOTPSuccess = () => {
    setSession({
      email,
      startTime: Date.now(),
    });
    setCurrentScreen('session');
  };

  const handleResendOTP = () => {
    setCurrentScreen('login');
  };

  const handleLogout = () => {
    setSession(null);
    setEmail('');
    setCurrentScreen('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen !== 'analytics' && (
        <TouchableOpacity 
          style={styles.analyticsButton} 
          onPress={() => setCurrentScreen('analytics')}
        >
          <Text style={styles.analyticsButtonText}>📊 View Analytics</Text>
        </TouchableOpacity>
      )}

      {currentScreen === 'login' && (
        <LoginScreen onOTPSent={handleOTPSent} />
      )}
      {currentScreen === 'otp' && (
        <OtpScreen 
          email={email}
          generatedOTP={generatedOTP}
          onSuccess={handleOTPSuccess}
          onResend={handleResendOTP}
        />
      )}
      {currentScreen === 'session' && session && (
        <SessionScreen 
          email={session.email}
          startTime={session.startTime}
          onLogout={handleLogout}
        />
      )}
      {currentScreen === 'analytics' && (
        <AnalyticsViewer onClose={() => setCurrentScreen('login')} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  analyticsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#673ab7',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 1000,
  },
  analyticsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default App;
