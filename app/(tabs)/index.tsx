import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Target, Trophy, Flame, BookOpen, BrainCircuit } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Dashboard() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [studyStats, setStudyStats] = useState({
    todayMinutes: 0,
    streak: 0,
    weeklyGoal: 0,
    completedTopics: 0,
  });

  const colors = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#06B6D4',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    background: isDark ? '#0F0F23' : '#FFFFFF',
    surface: isDark ? '#1E1E3A' : '#F8F9FA',
    card: isDark ? '#2D2D5A' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1F2937',
    textSecondary: isDark ? '#D1D5DB' : '#6B7280',
    border: isDark ? '#374151' : '#E5E7EB',
  };

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const stats = await AsyncStorage.getItem('studyStats');
      if (stats) {
        setStudyStats(JSON.parse(stats));
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const navigateToTimer = () => {
    router.push('/(tabs)/timer');
  };

  const navigateToSyllabus = () => {
    router.push('/(tabs)/syllabus');
  };

  const navigateToFlashcards = () => {
    router.push('/(tabs)/flashcards');
  };

  const QuickActionCard = ({ icon: Icon, title, subtitle, onPress, gradient }) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
      <LinearGradient
        colors={gradient}
        style={styles.quickActionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Icon size={28} color="#FFFFFF" />
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const StatCard = ({ icon: Icon, title, value, unit, color }) => (
    <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.statHeader}>
        <Icon size={24} color={color} />
        <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statUnit, { color: colors.textSecondary }]}>{unit}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <LinearGradient
        colors={isDark ? ['#1E1E3A', '#2D2D5A'] : ['#6366F1', '#8B5CF6']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.motivationalText}>Ready to achieve your goals?</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            icon={Clock}
            title="Today"
            value={studyStats.todayMinutes}
            unit="minutes"
            color={colors.primary}
          />
          <StatCard
            icon={Flame}
            title="Streak"
            value={studyStats.streak}
            unit="days"
            color={colors.warning}
          />
          <StatCard
            icon={Target}
            title="Weekly Goal"
            value={`${studyStats.weeklyGoal}%`}
            unit="completed"
            color={colors.success}
          />
          <StatCard
            icon={Trophy}
            title="Topics"
            value={studyStats.completedTopics}
            unit="completed"
            color={colors.accent}
          />
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <QuickActionCard
            icon={Clock}
            title="Start Timer"
            subtitle="Begin Pomodoro"
            onPress={navigateToTimer}
            gradient={['#6366F1', '#8B5CF6']}
          />
          <QuickActionCard
            icon={BookOpen}
            title="Study Plan"
            subtitle="View Syllabus"
            onPress={navigateToSyllabus}
            gradient={['#10B981', '#059669']}
          />
          <QuickActionCard
            icon={BrainCircuit}
            title="Flashcards"
            subtitle="Review Cards"
            onPress={navigateToFlashcards}
            gradient={['#F59E0B', '#D97706']}
          />
        </View>

        {/* Recent Activity */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        <View style={[styles.activityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.activityTitle, { color: colors.text }]}>Mathematics - Calculus</Text>
          <Text style={[styles.activitySubtitle, { color: colors.textSecondary }]}>
            Completed 3 topics • 45 minutes studied
          </Text>
          <View style={styles.activityProgress}>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '75%' }]} />
            </View>
            <Text style={[styles.progressText, { color: colors.textSecondary }]}>75%</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  motivationalText: {
    fontSize: 16,
    color: '#E0E7FF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  quickActionCard: {
    width: '31%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 11,
    color: '#E0E7FF',
    marginTop: 4,
    textAlign: 'center',
  },
  activityCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  activityProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
});