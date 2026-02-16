# 📱 React Native Assignment Submission

## 🔗 GitHub Repository
**https://github.com/chauhanvikki/React-native-OTP-auth**

---

## ✅ Assignment Completed

### Features Implemented:
- ✅ Email + OTP passwordless authentication
- ✅ 6-digit OTP with 60-second expiry
- ✅ Maximum 3 attempts per OTP
- ✅ Resend OTP functionality (invalidates old OTP)
- ✅ Per-email OTP storage
- ✅ Session screen with live timer (mm:ss format)
- ✅ Logout functionality
- ✅ AsyncStorage SDK integration for analytics
- ✅ All 4 events logged (otp_generated, otp_validation_success, otp_validation_failure, logout)
- ✅ TypeScript with full type safety
- ✅ Functional components only
- ✅ React Hooks (useState, useEffect, useRef, custom hook)
- ✅ Clean architecture (UI/Logic/Effects separation)
- ✅ Comprehensive documentation

---

## 📱 How to Test the App

### Method 1: Expo Go (Recommended - Native Android Experience)

1. **Install Expo Go** from Google Play Store
   - Link: https://play.google.com/store/apps/details?id=host.exp.exponent

2. **Clone the repository:**
   ```bash
   git clone https://github.com/chauhanvikki/React-native-OTP-auth.git
   cd React-native-OTP-auth
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the app:**
   ```bash
   npm start
   ```

5. **Scan QR code** with Expo Go app on your Android phone

6. **Test the flow:**
   - Enter email → Send OTP
   - Copy OTP from screen (displayed in blue box)
   - Enter OTP → Verify
   - View session screen with live timer
   - Click "View Analytics" to see all logged events
   - Logout

---

### Method 2: Web Browser (Quick Testing)

1. **Clone and install** (steps 2-3 above)

2. **Start the app:**
   ```bash
   npm start
   ```

3. **Press `w`** to open in web browser

4. **Test all features** (same flow as above)

---

## 📊 Key Features to Test

### 1. OTP Generation & Validation
- Generate OTP → See it displayed on screen
- Try wrong OTP → See error message with remaining attempts
- Try 3 wrong OTPs → See "Maximum attempts exceeded"
- Wait 60 seconds → See "OTP expired" error

### 2. Session Management
- Login successfully → See session screen
- Watch live timer counting up (00:00, 00:01, 00:02...)
- Timer continues running without reset
- Logout → Timer stops and returns to login

### 3. Analytics Dashboard
- Click "📊 View Analytics" button (top-right)
- See all logged events:
  - 🔵 OTP Generated
  - 🟢 OTP Validation Success
  - 🔴 OTP Validation Failure
  - 🟠 Logout
- Each event shows timestamp and metadata

---

## 📁 Project Structure

```
src/
├── screens/
│   ├── LoginScreen.tsx          # Email input & OTP generation
│   ├── OtpScreen.tsx             # OTP verification with countdown
│   ├── SessionScreen.tsx         # Active session with live timer
│   └── AnalyticsViewer.tsx       # Analytics dashboard
├── hooks/
│   └── useSessionTimer.ts        # Custom hook for session duration
├── services/
│   ├── otpManager.ts             # OTP generation & validation logic
│   └── analytics.ts              # AsyncStorage event logging
└── types/
    └── auth.ts                   # TypeScript type definitions
```

---

## 🔧 Technical Implementation

### OTP Management
- **Storage:** Per-email (supports multiple users)
- **Expiry:** 60 seconds from generation
- **Attempts:** Maximum 3 per OTP
- **Resend:** Completely invalidates old OTP

### Session Timer
- **Implementation:** Uses timestamps (no drift)
- **Cleanup:** Proper useEffect cleanup (no memory leaks)
- **Format:** mm:ss display
- **Accuracy:** Updates every second

### Analytics (AsyncStorage)
- **SDK:** @react-native-async-storage/async-storage
- **Events:** 4 types logged with metadata
- **Storage:** Persistent (survives app restart)
- **Viewer:** Built-in dashboard to view all events

---

## 📚 Documentation

All documentation is included in the repository:
- **README.md** - Complete project documentation
- **SETUP.md** - Quick setup guide
- **FLOW_DIAGRAM.md** - Visual flow diagrams
- **TESTING_CHECKLIST.md** - Comprehensive test cases
- **ASSIGNMENT_SUMMARY.md** - Assignment completion summary

---

## 🎯 Why Expo Go Instead of APK?

1. **Same Native Experience:** Expo Go runs native React Native code
2. **Faster Testing:** No build time required
3. **Industry Standard:** Commonly used for React Native development
4. **Full Functionality:** All features work identically to standalone APK

**Note:** Standalone APK can be generated using EAS Build if absolutely required, but requires additional build configuration and 15-20 minutes build time.

---

## ✅ Assignment Requirements Met

| Requirement | Status |
|------------|--------|
| Email + OTP Login | ✅ Complete |
| 6-digit OTP | ✅ Complete |
| 60-second expiry | ✅ Complete |
| Max 3 attempts | ✅ Complete |
| Resend OTP | ✅ Complete |
| Per-email storage | ✅ Complete |
| Session screen | ✅ Complete |
| Live timer (mm:ss) | ✅ Complete |
| Logout | ✅ Complete |
| External SDK (AsyncStorage) | ✅ Complete |
| Analytics logging | ✅ Complete |
| TypeScript | ✅ Complete |
| Functional components | ✅ Complete |
| React Hooks | ✅ Complete |
| Clean architecture | ✅ Complete |
| Documentation | ✅ Complete |

---

## 👨‍💻 Developer

**Vikki Chauhan**
- GitHub: https://github.com/chauhanvikki
- Repository: https://github.com/chauhanvikki/React-native-OTP-auth

---

## 📞 Support

If you encounter any issues:
1. Check README.md for detailed setup instructions
2. Ensure Node.js v16+ is installed
3. Run `npm install` before starting
4. Use Expo Go app for best experience

---

**Built with ❤️ for Lokal Assignment**
