# Testing Checklist

## Setup
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] App loads without errors
- [ ] Console shows no warnings

## Happy Path Testing

### Login Flow
- [ ] Enter valid email (e.g., test@example.com)
- [ ] Tap "Send OTP"
- [ ] Alert shows 6-digit OTP
- [ ] Console logs: `[Analytics] otp_generated`
- [ ] Navigate to OTP screen

### OTP Verification
- [ ] Countdown timer shows 60 seconds
- [ ] Timer counts down every second
- [ ] Enter the correct OTP
- [ ] Tap "Verify OTP"
- [ ] Console logs: `[Analytics] otp_validation_success`
- [ ] Navigate to Session screen

### Session Screen
- [ ] Email is displayed correctly
- [ ] Session start time is shown
- [ ] Session duration timer starts at 00:00
- [ ] Timer updates every second (00:01, 00:02, etc.)
- [ ] Timer continues running (test for 2-3 minutes)
- [ ] Tap "Logout"
- [ ] Console logs: `[Analytics] logout` with duration
- [ ] Return to Login screen

## Edge Case Testing

### Expired OTP
- [ ] Enter email and generate OTP
- [ ] Wait 60 seconds (timer shows "Expired")
- [ ] Try to verify OTP
- [ ] Error: "OTP expired"
- [ ] Console logs: `[Analytics] otp_validation_failure`

### Wrong OTP - Attempt 1
- [ ] Generate OTP
- [ ] Enter wrong code (e.g., 000000)
- [ ] Tap "Verify OTP"
- [ ] Error: "Invalid OTP (2 attempts remaining)"
- [ ] Console logs: `[Analytics] otp_validation_failure`

### Wrong OTP - Attempt 2
- [ ] Enter wrong code again
- [ ] Error: "Invalid OTP (1 attempts remaining)"
- [ ] Console logs: `[Analytics] otp_validation_failure`

### Wrong OTP - Attempt 3
- [ ] Enter wrong code third time
- [ ] Error: "Invalid OTP (0 attempts remaining)"
- [ ] Console logs: `[Analytics] otp_validation_failure`

### Max Attempts Exceeded
- [ ] Try to verify again (4th attempt)
- [ ] Error: "Maximum attempts exceeded"
- [ ] Cannot proceed even with correct OTP

### Resend OTP
- [ ] Generate OTP (note the code)
- [ ] Tap "Resend OTP"
- [ ] Return to Login screen
- [ ] Tap "Send OTP" again
- [ ] New OTP generated (different from old one)
- [ ] Try old OTP → Should fail
- [ ] Try new OTP → Should succeed

### Multiple Users
- [ ] Login with user1@example.com
- [ ] Note OTP for user1
- [ ] Tap "Resend OTP"
- [ ] Login with user2@example.com
- [ ] Note OTP for user2
- [ ] Both OTPs should be different
- [ ] Each email has independent OTP state

## Timer Testing

### Session Timer Accuracy
- [ ] Login successfully
- [ ] Watch timer for 1 minute
- [ ] Timer should show 01:00 after 60 seconds
- [ ] No drift or skipping

### Timer Cleanup
- [ ] Login successfully
- [ ] Wait 10 seconds
- [ ] Logout
- [ ] Login again
- [ ] Timer should start from 00:00 (not continue)

### No Memory Leaks
- [ ] Login and logout 5 times rapidly
- [ ] Check console for errors
- [ ] App should remain responsive
- [ ] No "Can't perform a React state update on unmounted component" warnings

## UI/UX Testing

### Input Validation
- [ ] Try empty email → Error
- [ ] Try invalid email (no @) → Error
- [ ] Try invalid email (no domain) → Error
- [ ] Valid email format accepted

### OTP Input
- [ ] OTP input accepts only numbers
- [ ] Maximum 6 digits
- [ ] Cannot enter 7th digit
- [ ] Auto-focuses on mount

### Button States
- [ ] "Send OTP" button is clickable
- [ ] "Verify OTP" button disabled when timer expired
- [ ] "Resend OTP" always clickable
- [ ] "Logout" button always clickable

### Visual Feedback
- [ ] Countdown timer changes color when expired
- [ ] Error messages are clear and helpful
- [ ] Success navigation is smooth
- [ ] No UI glitches or flickers

## Analytics Verification

### Check AsyncStorage
- [ ] Open React Native Debugger or Flipper
- [ ] Check AsyncStorage entries
- [ ] Should see keys like `analytics_1704067200000`
- [ ] Each entry has correct event type and metadata

### Console Logs
- [ ] All 4 event types logged:
  - [Analytics] otp_generated
  - [Analytics] otp_validation_success
  - [Analytics] otp_validation_failure
  - [Analytics] logout
- [ ] Each log includes relevant metadata

## Performance Testing

### Re-render Check
- [ ] Add console.log in components
- [ ] Verify components don't re-render unnecessarily
- [ ] Timer updates shouldn't re-render entire app

### Memory Usage
- [ ] Use React DevTools Profiler
- [ ] Check for memory leaks
- [ ] Intervals should be cleaned up

## Code Quality Checks

- [ ] No TypeScript errors
- [ ] No ESLint warnings (if configured)
- [ ] All imports resolve correctly
- [ ] No unused variables
- [ ] Proper type annotations

## Documentation Review

- [ ] README.md is comprehensive
- [ ] Setup instructions are clear
- [ ] All features documented
- [ ] Architecture explained
- [ ] GPT vs. self-implementation breakdown included

## Final Checklist

- [ ] All functional requirements met
- [ ] All technical requirements met
- [ ] All edge cases handled
- [ ] No memory leaks
- [ ] Clean code structure
- [ ] Comprehensive documentation
- [ ] Ready for submission

---

**Testing completed on:** _____________

**Tested by:** _____________

**Issues found:** _____________

**Status:** ✅ Pass / ❌ Fail
