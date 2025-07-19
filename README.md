# LogIt: Study Tracker & Timer

A comprehensive React Native mobile application designed to enhance your study productivity through advanced time management, progress tracking, and spaced repetition learning techniques.

![React Native](https://img.shields.io/badge/React%20Native-0.79.1-blue.svg)
![Expo](https://img.shields.io/badge/Expo-53.0.0-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)

## 🌟 Features

### 🍅 Advanced Pomodoro Timer
- **Full-screen flip clock design** with smooth animations
- **Customizable work/break intervals** (default: 25min work, 5min break)
- **Background notifications** for session completion
- **Session tracking** with daily statistics
- **Auto-transition** between work and break periods

### 📋 Hierarchical Syllabus Tracker
- **Multi-level organization**: Subject → Chapter → Topic → Subtopic
- **Interactive checkbox system** with progress calculation
- **Expandable tree structure** with smooth animations
- **Visual progress indicators** for each level
- **Persistent progress tracking** across sessions

### 🧠 Spaced Repetition Flashcards
- **Intelligent review scheduling** based on performance
- **Difficulty rating system** (Easy, Medium, Hard)
- **3D flip animations** for card interactions
- **Performance analytics** with accuracy tracking
- **Customizable study sessions**

### 📊 Comprehensive Analytics
- **Daily, weekly, and monthly statistics**
- **Study streak tracking** with achievement system
- **Interactive charts** showing progress trends
- **Subject-wise time distribution**
- **Goal setting and progress monitoring**

### 📝 Rich Note-Taking System
- **Topic-organized notes** with tagging system
- **Rich text formatting** capabilities
- **Search and filter functionality**
- **Cross-reference with syllabus topics**

### 🎯 Preloaded Study Content
- **Data Structures & Algorithms** (Arrays, Trees, Graphs, Sorting, etc.)
- **Web2 Development** (HTML/CSS, JavaScript, React, Node.js, Databases)
- **Web3 Development** (Blockchain, Solidity, DeFi, Smart Contracts)
- **Programming Fundamentals** with comprehensive roadmaps

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/trackit-study-tracker.git
   cd trackit-study-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Run on your preferred platform**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for Web Browser
   - Scan QR code with Expo Go app for physical device
```

## 🎨 Design System

### Color Palette
- **Primary**: `#6366F1` (Indigo)
- **Secondary**: `#8B5CF6` (Purple)
- **Success**: `#10B981` (Emerald)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)

### Typography
- **Headers**: Inter Bold (24-32px)
- **Body**: Inter Regular (14-16px)
- **Captions**: Inter Medium (12-14px)

### Animations
- **React Native Reanimated 3** for smooth 60fps animations
- **Spring animations** for natural feel
- **Gesture-based interactions** with haptic feedback

## 🛠️ Tech Stack

### Core Technologies
- **React Native 0.79.1** - Cross-platform mobile framework
- **Expo 53.0.0** - Development platform and toolchain
- **TypeScript 5.8.3** - Type-safe JavaScript
- **React Navigation 7** - Navigation library

### UI & Animations
- **React Native Reanimated 3** - High-performance animations
- **React Native Gesture Handler** - Native gesture recognition
- **Lucide React Native** - Beautiful icon library
- **React Native Chart Kit** - Data visualization

### Storage & State
- **AsyncStorage** - Persistent local storage
- **React Hooks** - State management
- **Custom hooks** - Reusable logic

### Development Tools
- **Expo Router** - File-based routing
- **TypeScript** - Static type checking
- **ESLint & Prettier** - Code formatting

## 🔧 Configuration

### Timer Settings
```typescript
interface PomodoroSettings {
  workDuration: number;        // Default: 25 minutes
  breakDuration: number;       // Default: 5 minutes
  longBreakDuration: number;   // Default: 15 minutes
  sessionsUntilLongBreak: number; // Default: 4
}
```

### Theme Configuration
The app supports both light and dark themes with automatic system detection:

```typescript
const theme = {
  colors: {
    primary: '#6366F1',
    background: isDark ? '#0F0F23' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1F2937',
    // ... more colors
  }
}
```

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure cross-platform compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


### Upcoming Features
- [ ] **Cloud Sync** - Backup data across devices
- [ ] **Study Groups** - Collaborative learning features
- [ ] **AI-Powered Insights** - Personalized study recommendations
- [ ] **Offline Mode** - Full functionality without internet
- [ ] **Widget Support** - Home screen timer widget
- [ ] **Apple Watch Integration** - Wrist-based timer controls

---

<div align="center">
  <p>Made with ❤️ for students worldwide</p>
  <p>⭐ Star this repo if it helped you!</p>
</div>