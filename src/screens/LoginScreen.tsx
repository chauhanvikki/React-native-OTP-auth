import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { otpManager } from '../services/otpManager';
import { analytics } from '../services/analytics';

interface LoginScreenProps {
  onOTPSent: (email: string, otp: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onOTPSent }) => {
  const [email, setEmail] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');

  const handleSendOTP = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }

    const otp = otpManager.generateOTP(email);
    analytics.otpGenerated(email);
    
    // Display OTP on screen for demo
    setGeneratedOTP(otp);
    
    // Log to console for easy access
    console.log('='.repeat(50));
    console.log('YOUR OTP CODE:', otp);
    console.log('Valid for 60 seconds');
    console.log('='.repeat(50));
    
    // Also show alert as backup
    Alert.alert('OTP Generated', `Your OTP is: ${otp}\n(Valid for 60 seconds)`);
    
    onOTPSent(email, otp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passwordless Login</Text>
      <Text style={styles.subtitle}>Enter your email to receive OTP</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      {generatedOTP && (
        <View style={styles.otpDisplay}>
          <Text style={styles.otpLabel}>Your OTP (for demo):</Text>
          <Text style={styles.otpCode}>{generatedOTP}</Text>
          <Text style={styles.otpNote}>Valid for 60 seconds</Text>
        </View>
      )}
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  otpDisplay: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4caf50',
    alignItems: 'center',
  },
  otpLabel: {
    fontSize: 14,
    color: '#2e7d32',
    marginBottom: 10,
  },
  otpCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1b5e20',
    letterSpacing: 8,
    marginBottom: 10,
  },
  otpNote: {
    fontSize: 12,
    color: '#558b2f',
    fontStyle: 'italic',
  },
});
