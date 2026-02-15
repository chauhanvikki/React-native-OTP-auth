export interface OTPData {
  code: string;
  expiresAt: number;
  attempts: number;
}

export interface OTPStore {
  [email: string]: OTPData;
}

export interface SessionData {
  email: string;
  startTime: number;
}
