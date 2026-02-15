# Quick Setup Guide

## Install Dependencies
```bash
npm install
```

## Run the App
```bash
npm start
```

Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator
- Scan QR code with Expo Go app on your phone

## Test the Flow

1. **Login Screen**
   - Enter any email (e.g., test@example.com)
   - Tap "Send OTP"
   - Note the 6-digit OTP from the alert

2. **OTP Screen**
   - Enter the OTP within 60 seconds
   - Watch the countdown timer
   - Tap "Verify OTP"

3. **Session Screen**
   - View your session start time
   - Watch the live session timer (mm:ss)
   - Tap "Logout" to end session

## Test Edge Cases

- **Expired OTP**: Wait 60 seconds before entering OTP
- **Wrong OTP**: Enter incorrect OTP 3 times
- **Resend OTP**: Tap "Resend OTP" to generate new code

## Check Analytics Logs

Open the console/terminal where you ran `npm start` to see analytics events:
- [Analytics] otp_generated
- [Analytics] otp_validation_success
- [Analytics] otp_validation_failure
- [Analytics] logout
