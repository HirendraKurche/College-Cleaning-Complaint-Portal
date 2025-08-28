# Clean Campus Management System

A comprehensive digital solution for maintaining campus cleanliness through community reporting and efficient complaint management. This system empowers students to report unsanitary conditions and enables supervisors to monitor and track cleaning activities effectively.

## 🏗️ Project Structure

```
cleanWebMain/
├── cleancampusAPP/          # Flutter mobile application
│   ├── lib/                 # Flutter source code
│   ├── assets/             # Mobile app assets
│   ├── android/            # Android platform files
│   ├── ios/                # iOS platform files
│   └── pubspec.yaml        # Flutter dependencies
├── cleanning_managment/    # Next.js web application
│   ├── app/                # Next.js app router pages
│   ├── components/         # Reusable React components
│   ├── firebase/           # Firebase configuration
│   └── public/            # Static assets
└── README.md              # This file
```

## 🚀 Features

### Web Application ([cleanning_managment/](cleanning_managment/))
- **User Authentication**: Secure login/register with Firebase Auth
- **Issue Reporting**: Report cleanliness issues with image uploads
- **Dashboard**: Track complaint status and history
- **Real-time Updates**: Live complaint tracking and status updates
- **Responsive Design**: Works on desktop and mobile browsers

### Mobile Application ([cleancampusAPP/](cleancampusAPP/))
- **Native Mobile Experience**: Optimized Flutter app for iOS and Android
- **Camera Integration**: Direct photo capture for issue reporting
- **Offline Capability**: Report issues even without internet connection
- **Push Notifications**: Real-time updates on complaint status

## 🛠️ Technology Stack

### Web Application
- **Framework**: Next.js 14 with App Router
- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Image Hosting**: Cloudinary

### Mobile Application
- **Framework**: Flutter
- **State Management**: Provider/Bloc
- **Backend**: Firebase (shared with web app)
- **Platform**: Cross-platform (PC & Android)

## 📱 Quick Start

### Web Application Setup

1. **Navigate to web app directory**:
   ```bash
   cd cleanning_managment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # ... other Firebase config
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**: http://localhost:3000

### Mobile Application Setup

1. **Navigate to mobile app directory**:
   ```bash
   cd cleancampusAPP
   ```

2. **Install Flutter dependencies**:
   ```bash
   flutter pub get
   ```

3. **Configure Firebase**:
   - Add your `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Ensure Firebase is properly configured for your platform

4. **Run the app**:
   ```bash
   # For Android
   flutter run
   
   # For iOS (macOS only)
   flutter run -d ios
   ```

## 🔧 Core Components

### Web Application Components

- **[Hero](cleanning_managment/components/Hero.js)**: Landing page hero section
- **[About](cleanning_managment/components/About.js)**: System information and benefits
- **[WhyThisSystem](cleanning_managment/components/WhyThisSystem.js)**: Animated feature showcase
- **[HowItWorks](cleanning_managment/components/HowItWorks.js)**: Step-by-step process guide
- **[ComplaintList](cleanning_managment/components/ComplaintList.js)**: Real-time complaint tracking
- **[ReportIssueSection](cleanning_managment/components/ReportIssueSection.js)**: Issue reporting form

### Key Pages

- **[Home Page](cleanning_managment/app/page.js)**: Main landing page with all sections
- **[Welcome Page](cleanning_managment/app/welcome/page.js)**: Post-login dashboard
- **[Report Page](cleanning_managment/app/report/page.js)**: Dedicated reporting interface
- **[Dashboard](cleanning_managment/app/dashboard/pagecopy.js)**: User complaint management

## 🔐 Authentication & Security

- **Firebase Authentication**: Secure user management
- **Email/Password**: Traditional authentication method
- **Mobile OTP**: Phone number verification (planned)
- **Session Management**: Automatic login state persistence
- **Route Protection**: Authenticated route guards

## 📊 Database Schema

### Firebase Firestore Collections

```javascript
// Reports Collection
{
  adminId: string,
  sweeperId: string,
  location: string,
  description: string,
  imageBefore: string,
  imageAfter: string (optional),
  status: "Pending" | "In Progress" | "Completed",
  timestamp: Timestamp,
  userId: string,
  category: string
}

// Users Collection
{
  uid: string,
  email: string,
  displayName: string,
  role: "student" | "admin" | "sweeper",
  createdAt: Timestamp
}
```

## 🌐 Deployment

### Web Application
- **Platform**: Vercel 
- **Build Command**: `npm run build`
- **Environment Variables**: Configure Firebase keys in deployment platform

### Mobile Application
- **Android**: Apk
- **Build**: Use Flutter build commands for release builds

## 🔄 Development Workflow

1. **Feature Development**: Create feature branches from main
2. **Code Review**: Pull request review process
3. **Testing**: Automated testing for critical paths
4. **Deployment**: Automated deployment on merge to main

## 📈 Features Roadmap

- [ ] **Real-time Notifications**: Push notifications for status updates
- [ ] **Analytics Dashboard**: Admin analytics and reporting
- [ ] **API Integration**: Third-party service integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support & Contact

- **Email**: [Hirendra Kurche](hirendrakurche423@gmail.com)
- **Project Type**: Campus Management System

## 📄 License

This project is developed for educational and institutional use at MANIT Bhopal.

## 🙏 Acknowledgments

- MANIT Bhopal for project support
- Firebase for backend infrastructure
- Flutter and React communities for excellent documentation
- All contributors who helped build this system

---

**Built with ❤️ for a cleaner campus environment**
