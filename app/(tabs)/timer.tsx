import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, RotateCcw, Settings, X, Save } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Timer() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [settings, setSettings] = useState({
    focusTime: 25,
    breakTime: 5,
  });
  const [time, setTime] = useState(settings.focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  const intervalRef = useRef(null);

  const flipValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);

  const colors = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#06B6D4',
    success: '#10B981',
    warning: '#F59E0B',
    background: isDark ? '#0F0F23' : '#1A1A2E',
    surface: isDark ? '#1E1E3A' : '#16213E',
    text: '#FFFFFF',
    textSecondary: '#E0E7FF',
  };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (!isRunning) {
      setTime(isBreak ? settings.breakTime * 60 : settings.focusTime * 60);
    }
  }, [settings, isBreak]);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('timerSettings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        setTempSettings(parsed);
        setTime(parsed.focusTime * 60);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('timerSettings', JSON.stringify(tempSettings));
      setSettings(tempSettings);
      setShowSettings(false);
      setIsRunning(false);
      setTime(isBreak ? tempSettings.breakTime * 60 : tempSettings.focusTime * 60);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (!isBreak) {
      setSessions(sessions + 1);
      setTime(settings.breakTime * 60);
      setIsBreak(true);
    } else {
      setTime(settings.focusTime * 60);
      setIsBreak(false);
    }
    
    // Trigger flip animation
    flipValue.value = withSpring(1, {}, () => {
      flipValue.value = withSpring(0);
    });
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    scaleValue.value = withSpring(isRunning ? 1 : 0.95);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(isBreak ? settings.breakTime * 60 : settings.focusTime * 60);
    scaleValue.value = withSpring(1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak ? 1 - time / (settings.breakTime * 60) : 1 - time / (settings.focusTime * 60);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 0.5, 1], [0, 90, 0]);
    return {
      transform: [
        { rotateY: `${rotateY}deg` },
        { scale: scaleValue.value },
      ],
    };
  });

  const CircularProgress = ({ progress, size, strokeWidth, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <View style={{ width: size, height: size, transform: [{ rotate: '-90deg' }] }}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: 'rgba(255,255,255,0.1)',
            position: 'absolute',
          }}
        />
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: color,
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            position: 'absolute',
            transform: [{ rotate: `${progress * 360}deg` }],
          }}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      
      <LinearGradient
        colors={['#1A1A2E', '#16213E', '#0F0F23']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.sessionInfo}>
            <Text style={[styles.sessionText, { color: colors.textSecondary }]}>
              Session {sessions + 1}
            </Text>
            <Text style={[styles.modeText, { color: isBreak ? colors.success : colors.primary }]}>
              {isBreak ? 'Break Time' : 'Focus Time'}
            </Text>
          </View>
          <TouchableOpacity style={styles.settingsButton} onPress={() => setShowSettings(true)}>
            <Settings size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <Animated.View style={[styles.timerWrapper, animatedStyle]}>
            <CircularProgress
              progress={progress}
              size={300}
              strokeWidth={8}
              color={isBreak ? colors.success : colors.primary}
            />
            <View style={styles.timerCenter}>
              <Text style={[styles.timerText, { color: colors.text }]}>
                {formatTime(time)}
              </Text>
              <Text style={[styles.timerLabel, { color: colors.textSecondary }]}>
                {isBreak ? 'Break' : 'Focus'}
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={resetTimer}>
            <RotateCcw size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.primaryButton,
              { backgroundColor: isBreak ? colors.success : colors.primary }
            ]}
            onPress={toggleTimer}>
            {isRunning ? (
              <Pause size={32} color="#FFFFFF" />
            ) : (
              <Play size={32} color="#FFFFFF" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={() => setIsBreak(!isBreak)}>
            <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>{sessions}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {Math.floor((sessions * settings.focusTime) / 60)}h {(sessions * settings.focusTime) % 60}m
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>7</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowSettings(false)}>
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={() => setShowSettings(false)}>
              <X size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Timer Settings</Text>
            <TouchableOpacity onPress={saveSettings}>
              <Save size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Focus Time (minutes)</Text>
              <TextInput
                style={[styles.settingInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                value={tempSettings.focusTime.toString()}
                onChangeText={(text) => setTempSettings({ ...tempSettings, focusTime: parseInt(text) || 25 })}
                keyboardType="numeric"
                placeholder="25"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Break Time (minutes)</Text>
              <TextInput
                style={[styles.settingInput, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
                value={tempSettings.breakTime.toString()}
                onChangeText={(text) => setTempSettings({ ...tempSettings, breakTime: parseInt(text) || 5 })}
                keyboardType="numeric"
                placeholder="5"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    marginBottom: 40,
  },
  sessionInfo: {
    alignItems: 'flex-start',
  },
  sessionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  settingsButton: {
    padding: 8,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  timerLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  primaryButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  settingItem: {
    marginBottom: 30,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
});