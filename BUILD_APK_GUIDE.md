# 📱 How to Build APK for Submission

## ✅ Setup Complete! Now Follow These Steps:

### Step 1: Login to Expo (Required)
```bash
eas login
```

**If you don't have an Expo account:**
1. Go to https://expo.dev/signup
2. Create a free account
3. Come back and run `eas login`
4. Enter your credentials

---

### Step 2: Configure Project
```bash
eas build:configure
```

This will:
- Link your project to Expo
- Generate a project ID
- Update app.json automatically

---

### Step 3: Build APK (Takes ~10-15 minutes)
```bash
eas build -p android --profile preview
```

This will:
- Upload your code to Expo servers
- Build APK in the cloud (no Android SDK needed!)
- Give you a download link

**Wait for the build to complete...**

---

### Step 4: Get APK Link

After build completes, you'll see:
```
✔ Build finished
https://expo.dev/artifacts/eas/[your-build-id].apk
```

**Copy this link and share it!**

---

## 🚀 Alternative: Quick Share (If Build Fails)

If EAS build has issues, you can share:

### Option A: Expo Go Instructions
```
Repository: https://github.com/chauhanvikki/React-native-OTP-auth

To test:
1. Install "Expo Go" app from Play Store
2. Clone the repository
3. Run: npm install
4. Run: npm start
5. Scan QR code with Expo Go app
```

### Option B: Web Demo Link
```
The app is fully functional on web:
1. Clone: https://github.com/chauhanvikki/React-native-OTP-auth
2. Run: npm install && npm start
3. Press 'w' to open in browser
```

---

## 📋 What to Submit

**Best Option:** APK download link from EAS Build
```
https://expo.dev/artifacts/eas/[your-build-id].apk
```

**Backup Option:** GitHub repo + instructions
```
GitHub: https://github.com/chauhanvikki/React-native-OTP-auth
Instructions: See README.md for setup
```

---

## ⚠️ Important Notes

1. **EAS Build is FREE** for the first build
2. **Build time:** 10-15 minutes
3. **Internet required:** Build happens in cloud
4. **No Android SDK needed:** Everything is cloud-based

---

## 🆘 If You Get Errors

### Error: "Not logged in"
```bash
eas login
```

### Error: "Project not configured"
```bash
eas build:configure
```

### Error: "Build failed"
- Check your internet connection
- Try again: `eas build -p android --profile preview`
- Or share GitHub repo as backup

---

## ✅ Final Checklist

- [ ] Run `eas login`
- [ ] Run `eas build:configure`
- [ ] Run `eas build -p android --profile preview`
- [ ] Wait for build to complete (~15 min)
- [ ] Copy APK download link
- [ ] Share the link

---

**Your code is ready! Just need to build the APK now.** 🚀
