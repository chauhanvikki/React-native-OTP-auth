import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { otpManager } from '../services/otpManager';
import { analytics } from '../services/analytics';

interface OtpScreenProps {
  email: string;
  generatedOTP: string;
  onSuccess: () => void;
  onResend: () => void;
}

export const OtpScreen: React.FC<OtpScreenProps> = ({ email, generatedOTP, onSuccess, onResend }) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [errorMessage, setErrorMessage] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(60);
    setErrorMessage('');
    
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [email]);

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      setErrorMessage('Please enter a 6-digit OTP');
      return;
    }

    const result = otpManager.validateOTP(email, otp);

    if (result.success) {
      analytics.otpValidationSuccess(email);
      setErrorMessage('');
      onSuccess();
    } else {
      analytics.otpValidationFailure(email, result.error || 'Unknown error');
      setErrorMessage(result.error || 'Verification failed');
      setOtp('');
      
      // If max attempts exceeded, go back to login after 2 seconds
      if (result.error?.includes('Maximum attempts exceeded')) {
        setTimeout(() => {
          Alert.alert('Max Attempts Reached', 'Please request a new OTP', [
            { text: 'OK', onPress: onResend }
          ]);
        }, 2000);
      }
    }
  };

  const handleResend = () => {
    setOtp('');
    setErrorMessage('');
    onResend();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Sent to {email}</Text>
      
      {generatedOTP && (
        <View style={styles.otpDisplay}>
          <Text style={styles.otpLabel}>Your OTP (Demo):</Text>
          <Text style={styles.otpCode}>{generatedOTP}</Text>
          <Text style={styles.otpNote}>Copy this code below</Text>
        </View>
      )}
      
      <View style={styles.timerContainer}>
        <Text style={[styles.timer, timeLeft === 0 && styles.timerExpired]}>
          {timeLeft > 0 ? `${timeLeft}s` : 'Expired'}
        </Text>
      </View>

      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ {errorMessage}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChangeText={(text) => {
          setOtp(text);
          setErrorMessage('');
        }}
        keyboardType="number-pad"
        maxLength={6}
        autoFocus
      />
      
      <TouchableOpacity 
        style={[styles.button, timeLeft === 0 && styles.buttonDisabled]} 
        onPress={handleVerifyOTP}
        disabled={timeLeft === 0}
      >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
        <Text style={styles.resendText}>Resend OTP</Text>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  timerExpired: {
    color: '#FF3B30',
  },
  otpDisplay: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2196f3',
    alignItems: 'center',
  },
  otpLabel: {
    fontSize: 14,
    color: '#1565c0',
    marginBottom: 10,
    fontWeight: '600',
  },
  otpCode: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0d47a1',
    letterSpacing: 10,
    marginBottom: 10,
  },
  otpNote: {
    fontSize: 12,
    color: '#1976d2',
    fontStyle: 'italic',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ef5350',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    letterSpacing: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    padding: 10,
    alignItems: 'center',
  },
  resendText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
