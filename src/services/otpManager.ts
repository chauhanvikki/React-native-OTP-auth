import { OTPStore, OTPData } from '../types/auth';

const OTP_EXPIRY_MS = 60000; // 60 seconds
const MAX_ATTEMPTS = 3;

class OTPManager {
  private store: OTPStore = {};

  generateOTP(email: string): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.store[email] = {
      code,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
      attempts: 0,
    };
    return code;
  }

  validateOTP(email: string, code: string): { success: boolean; error?: string } {
    const otpData = this.store[email];

    if (!otpData) {
      return { success: false, error: 'No OTP generated for this email' };
    }

    if (Date.now() > otpData.expiresAt) {
      return { success: false, error: 'OTP expired' };
    }

    if (otpData.attempts >= MAX_ATTEMPTS) {
      return { success: false, error: 'Maximum attempts exceeded' };
    }

    this.store[email].attempts += 1;

    if (otpData.code !== code) {
      return { success: false, error: `Invalid OTP (${MAX_ATTEMPTS - otpData.attempts} attempts remaining)` };
    }

    delete this.store[email];
    return { success: true };
  }

  clearOTP(email: string): void {
    delete this.store[email];
  }
}

export const otpManager = new OTPManager();
