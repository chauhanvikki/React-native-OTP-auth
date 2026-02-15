# Application Flow Diagram

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         LOGIN SCREEN                             │
│                                                                  │
│  1. User enters email                                           │
│  2. Taps "Send OTP"                                             │
│  3. OTPManager generates 6-digit code                           │
│  4. Analytics logs "otp_generated"                              │
│  5. Alert shows OTP (simulating email/SMS)                      │
│                                                                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                          OTP SCREEN                              │
│                                                                  │
│  1. Countdown timer starts (60s)                                │
│  2. User enters 6-digit OTP                                     │
│  3. Taps "Verify OTP"                                           │
│  4. OTPManager validates:                                       │
│     - Exists? ──────────────────────────────────────────┐       │
│     - Not expired? (< 60s) ─────────────────────────────┤       │
│     - Attempts < 3? ────────────────────────────────────┤       │
│     - Code matches? ────────────────────────────────────┤       │
│                                                          │       │
│  5. If valid:                                           │       │
│     - Analytics logs "otp_validation_success" ──────────┤       │
│     - Navigate to Session Screen                        │       │
│                                                          │       │
│  6. If invalid:                                         │       │
│     - Analytics logs "otp_validation_failure" ──────────┤       │
│     - Show error message                                │       │
│     - Increment attempt counter                         │       │
│                                                          │       │
│  7. Resend OTP:                                         │       │
│     - Invalidates old OTP                               │       │
│     - Resets attempt counter                            │       │
│     - Returns to Login Screen                           │       │
│                                                          │       │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SESSION SCREEN                            │
│                                                                  │
│  1. Session starts with timestamp                               │
│  2. useSessionTimer hook:                                       │
│     - Calculates duration from startTime                        │
│     - Updates every 1 second                                    │
│     - Formats as mm:ss                                          │
│  3. Displays:                                                   │
│     - Email                                                     │
│     - Session start time                                        │
│     - Live duration timer                                       │
│  4. Logout button:                                              │
│     - Analytics logs "logout" with duration                     │
│     - Clears session                                            │
│     - Returns to Login Screen                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐
│  App.tsx     │  ← Main orchestrator
│  (State)     │
└──────┬───────┘
       │
       ├─────────────────┬─────────────────┬──────────────────┐
       │                 │                 │                  │
       ▼                 ▼                 ▼                  ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│LoginScreen  │   │ OtpScreen   │   │SessionScreen│   │ Services    │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                 │                 │                  │
       │                 │                 │                  │
       └─────────────────┴─────────────────┴──────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   OTPManager          │
                    │   - generateOTP()     │
                    │   - validateOTP()     │
                    │   - clearOTP()        │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Analytics           │
                    │   - otpGenerated()    │
                    │   - otpValidation...()│
                    │   - logout()          │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   AsyncStorage        │
                    │   (Persistent logs)   │
                    └───────────────────────┘
```

## OTP Storage Structure

```
OTPStore = {
  "user1@example.com": {
    code: "123456",
    expiresAt: 1704067200000,  // Unix timestamp
    attempts: 0
  },
  "user2@example.com": {
    code: "789012",
    expiresAt: 1704067260000,
    attempts: 2
  }
}
```

## Timer Implementation

```
useSessionTimer(startTime)
  │
  ├─ useEffect(() => {
  │    intervalRef.current = setInterval(() => {
  │      duration = (Date.now() - startTime) / 1000
  │    }, 1000)
  │    
  │    return () => clearInterval(intervalRef.current)  ← Cleanup
  │  }, [startTime])
  │
  └─ Returns: { duration, formattedDuration }
```

## Component Lifecycle

```
Mount → useEffect runs → setInterval starts → Updates every 1s
                                                      │
                                                      ▼
Unmount → Cleanup function → clearInterval → No memory leak
```

## Analytics Events

```
Event: otp_generated
{
  type: "otp_generated",
  timestamp: 1704067200000,
  metadata: { email: "user@example.com" }
}

Event: otp_validation_success
{
  type: "otp_validation_success",
  timestamp: 1704067215000,
  metadata: { email: "user@example.com" }
}

Event: otp_validation_failure
{
  type: "otp_validation_failure",
  timestamp: 1704067210000,
  metadata: { 
    email: "user@example.com",
    reason: "Invalid OTP (2 attempts remaining)"
  }
}

Event: logout
{
  type: "logout",
  timestamp: 1704067500000,
  metadata: { 
    email: "user@example.com",
    sessionDuration: 285  // seconds
  }
}
```
