# Git Setup Instructions

## Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: React Native Passwordless Auth App

- Implemented Email + OTP authentication flow
- Added 6-digit OTP with 60s expiry and 3 max attempts
- Created session screen with live timer (mm:ss)
- Integrated AsyncStorage for analytics logging
- Built with TypeScript and functional components
- Clean architecture with separation of concerns
- Comprehensive documentation included"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `react-native-passwordless-auth` (or your choice)
3. Description: "Passwordless authentication app with Email + OTP flow"
4. Choose Public or Private
5. Don't initialize with README (we already have one)
6. Click "Create repository"
7. Copy the repository URL
8. Use it in the `git remote add origin` command above

## Verify Repository

After pushing, your GitHub repo should contain:
- All source code in `src/` folder
- Main `App.tsx` file
- Configuration files (package.json, tsconfig.json, etc.)
- Comprehensive documentation (README.md, SETUP.md, etc.)
- .gitignore (node_modules excluded)

## Repository Structure on GitHub

```
react-native-passwordless-auth/
├── src/
│   ├── screens/
│   ├── hooks/
│   ├── services/
│   └── types/
├── App.tsx
├── package.json
├── README.md
├── SETUP.md
├── FLOW_DIAGRAM.md
├── TESTING_CHECKLIST.md
├── ASSIGNMENT_SUMMARY.md
├── PROJECT_OVERVIEW.md
└── Other config files
```

## README Preview

Your README.md will be displayed on the GitHub homepage with:
- Project description
- Setup instructions
- Architecture explanation
- OTP logic documentation
- SDK integration details
- Testing guide

## Submission

Share the GitHub repository URL:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
```

## Optional: Add Topics

On GitHub, add these topics to your repository:
- react-native
- typescript
- passwordless-auth
- otp-authentication
- expo
- mobile-app
- asyncstorage

## Optional: Add License

If you want to add a license:
```bash
# Add MIT License (or your choice)
# GitHub can generate this for you in the repository settings
```

---

**Note**: Make sure to replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and desired repository name.
