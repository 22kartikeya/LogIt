import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useTheme } from '@/hooks/useTheme';

const { width } = Dimensions.get('window');

interface PomodoroTimerProps {
  onSessionComplete?: (type: 'work' | 'break', duration: number) => void;
}

export default function PomodoroTimer({ onSessionComplete }: PomodoroTimerProps) {
  const { colors } = useTheme();
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const flipValue = useSharedValue(0);
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    loadSettings();
    setupNotifications();
  }, []);

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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const setupNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Notifications Disabled',
        'Enable notifications to get alerts when your timer completes.'
      );
    }
  };

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('pomodoroSettings');
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings(parsedSettings);
        setTime(parsedSettings.workDuration * 60);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleTimerComplete = async () => {
    setIsRunning(false);
    
    // Trigger notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: isBreak ? 'Break Complete!' : 'Pomodoro Complete!',
        body: isBreak ? 'Time to get back to work!' : 'Great job! Time for a break.',
        sound: true,
      },
      trigger: null,
    });

    // Trigger flip animation
    flipValue.value = withSpring(1, {}, () => {
      flipValue.value = withSpring(0);
    });

    if (!isBreak) {
      // Work session completed
      const newSessions = sessions + 1;
      setSessions(newSessions);
      onSessionComplete?.('work', settings.workDuration);
      
      // Determine break type
      const isLongBreak = newSessions % settings.sessionsUntilLongBreak === 0;
      const breakDuration = isLongBreak ? settings.longBreakDuration : settings.breakDuration;
      
      setTime(breakDuration * 60);
      setIsBreak(true);
    } else {
      // Break completed
      onSessionComplete?.('break', isBreak ? settings.breakDuration : settings.longBreakDuration);
      setTime(settings.workDuration * 60);
      setIsBreak(false);
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    scaleValue.value = withSpring(isRunning ? 1 : 0.95);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(isBreak ? settings.breakDuration * 60 : settings.workDuration * 60);
    scaleValue.value = withSpring(1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? 1 - time / (settings.breakDuration * 60)
    : 1 - time / (settings.workDuration * 60);

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
    const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <View style={{ width: size, height: size }}>
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
    <View style={styles.container}>
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
          style={[styles.controlButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}
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
          style={[styles.controlButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}
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
            {Math.floor((sessions * settings.workDuration) / 60)}h {(sessions * settings.workDuration) % 60}m
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Today</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>7</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
});