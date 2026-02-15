# Passwordless Authentication App

A React Native application implementing passwordless authentication using Email + OTP flow with session tracking.

## Features

- ✅ Email-based OTP authentication
- ✅ 6-digit OTP with 60-second expiry
- ✅ Maximum 3 attempts per OTP
- ✅ Live session timer (mm:ss format)
- ✅ AsyncStorage integration for analytics logging
- ✅ Clean architecture with separation of concerns
- ✅ TypeScript with proper type safety
- ✅ No memory leaks or unnecessary re-renders

## Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **Functional Components** with Hooks
- **AsyncStorage** for event logging
- **Custom Hooks** for session timer

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, will be installed with dependencies)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd lokal
```

2. Install dependencies
```bash
npm install
```

3. Start the app
```bash
npm start
```

4. Run on your preferred platform
- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web
- Or scan the QR code with Expo Go app

## Architecture

### Project Structure
```
src/
├── screens/
│   ├── LoginScreen.tsx      # Email input and OTP generation
│   ├── OtpScreen.tsx         # OTP verification with countdown
│   └── SessionScreen.tsx     # Active session with live timer
├── hooks/
│   └── useSessionTimer.ts    # Custom hook for session duration
├── services/
│   ├── otpManager.ts         # OTP generation and validation logic
│   └── analytics.ts          # Event logging with AsyncStorage
└── types/
    └── auth.ts               # TypeScript type definitions
```

### Separation of Concerns

1. **UI Layer** (screens/)
   - Pure presentational components
   - Handle user interactions
   - Delegate business logic to services

2. **Business Logic** (services/)
   - OTP generation, validation, expiry
   - Analytics event logging
   - No UI dependencies

3. **Side Effects** (hooks/)
   - Session timer with proper cleanup
   - Interval management
   - No memory leaks

## OTP Logic and Expiry Handling

### OTP Generation
- Generates a random 6-digit code (100000-999999)
- Stores per email (not globally)
- Sets expiry timestamp (current time + 60 seconds)
- Resets attempt counter to 0

### OTP Validation
The validation process checks in order:
1. **Existence**: Does an OTP exist for this email?
2. **Expiry**: Is current time < expiresAt?
3. **Attempts**: Have we exceeded 3 attempts?
4. **Correctness**: Does the entered code match?

Each validation attempt increments the attempt counter, even if the OTP is wrong.

### Resend OTP Behavior
When a new OTP is generated for the same email:
- Old OTP is completely replaced
- New expiry time is set
- Attempt counter resets to 0
- Previous OTP becomes invalid

### Edge Cases Handled
- ✅ Expired OTP → Shows "OTP expired" error
- ✅ Wrong OTP → Shows remaining attempts
- ✅ Max attempts exceeded → Blocks further validation
- ✅ No OTP generated → Shows appropriate error
- ✅ Resend resets all state

## Data Structures

### OTPStore
```typescript
{
  [email: string]: {
    code: string;        // 6-digit OTP
    expiresAt: number;   // Unix timestamp
    attempts: number;    // Current attempt count
  }
}
```

**Why this structure?**
- Per-email storage allows multiple users
- Single object lookup by email (O(1) access)
- All OTP metadata grouped together
- Easy to invalidate on resend (just replace the object)

### SessionData
```typescript
{
  email: string;
  startTime: number;  // Unix timestamp
}
```

**Why this structure?**
- Minimal data needed for session tracking
- startTime enables duration calculation
- Immutable after creation (no updates needed)

## External SDK Integration

### Chosen SDK: AsyncStorage

**Why AsyncStorage?**
1. **Native to React Native** - No additional setup complexity
2. **Persistent logging** - Events survive app restarts
3. **Simple API** - Key-value storage perfect for analytics
4. **Documentation** - Well-documented with clear examples

### Implementation
- Logs 4 event types: OTP generated, validation success/failure, logout
- Each event stored with unique timestamp-based key
- Includes metadata (email, reason, duration)
- Console logs for development visibility

### Events Logged
1. **otp_generated** - When OTP is created (includes email)
2. **otp_validation_success** - Successful login (includes email)
3. **otp_validation_failure** - Failed validation (includes email + reason)
4. **logout** - User logs out (includes email + session duration)

## Session Timer Implementation

### Custom Hook: useSessionTimer

**Key Features:**
- Uses `useRef` to store interval ID (prevents re-render issues)
- Calculates duration from startTime (not incremental counter)
- Proper cleanup in useEffect return function
- Formats duration as mm:ss

**Why this approach?**
- **No drift**: Calculates from absolute timestamps
- **Re-render safe**: Interval ID in ref, not state
- **Memory safe**: Cleanup function clears interval
- **Accurate**: Uses Date.now() for precision

### Timer Behavior
- ✅ Starts immediately on session screen mount
- ✅ Updates every second
- ✅ Doesn't reset on component re-render
- ✅ Stops and cleans up on logout
- ✅ Cleans up on screen unmount

## React Hooks Usage

### useState
- Managing form inputs (email, OTP)
- Screen navigation state
- Timer countdown display

### useEffect
- Starting/stopping timers
- Cleanup on unmount
- Dependency arrays properly configured

### useRef
- Storing interval IDs (prevents re-render issues)
- Mutable values that don't trigger re-renders

### useMemo
- Not used in this implementation (no expensive computations)
- Could be added for optimization if needed

## What GPT Helped With vs. What I Implemented

### GPT Assisted:
- Project structure suggestions
- TypeScript type definitions syntax
- React Native styling patterns
- AsyncStorage API documentation lookup
- Edge case identification

### I Understood and Implemented:
- OTP validation logic and state management
- Per-email storage architecture decision
- Session timer implementation with useRef
- Cleanup patterns to prevent memory leaks
- Component composition and data flow
- Analytics event structure
- Error handling strategy
- All business logic in services layer

### Key Decisions I Made:
1. **Class-based services** (OTPManager, Analytics) for singleton pattern
2. **Per-email OTP storage** instead of global state
3. **Timestamp-based duration** calculation instead of counter
4. **AsyncStorage over Firebase** for simplicity and learning
5. **Alert for OTP display** (simulating email/SMS in demo)

## Testing the App

### Test Flow
1. Enter email → Tap "Send OTP"
2. Note the OTP from alert (valid for 60 seconds)
3. Enter OTP → Tap "Verify OTP"
4. View session screen with live timer
5. Tap "Logout" to return to login

### Test Cases
- ✅ Valid OTP within 60 seconds → Success
- ✅ Expired OTP (wait 60s) → Error
- ✅ Wrong OTP 3 times → Max attempts error
- ✅ Resend OTP → Old OTP invalid, new OTP works
- ✅ Session timer runs continuously
- ✅ Logout stops timer and returns to login

## Performance Considerations

- No global mutable variables
- No setInterval leaks (proper cleanup)
- No logic in render blocks
- Minimal re-renders (refs for intervals)
- Efficient O(1) OTP lookup by email

## Future Enhancements (Not Implemented)

- Session persistence with AsyncStorage
- Background/foreground state handling
- Biometric authentication
- Rate limiting on OTP generation
- Email validation service integration
- Unit tests with Jest
- E2E tests with Detox

## License

MIT

---

**Built with ❤️ for Lokal Assignment**
