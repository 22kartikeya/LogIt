import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Calendar, TrendingUp, Target, Clock, Flame, Award } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Analytics() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [analyticsData, setAnalyticsData] = useState({
    studyMinutes: [45, 60, 30, 90, 75, 120, 80],
    subjects: [
      { name: 'Math', minutes: 120, color: '#6366F1' },
      { name: 'Physics', minutes: 90, color: '#8B5CF6' },
      { name: 'Chemistry', minutes: 60, color: '#06B6D4' },
      { name: 'Biology', minutes: 45, color: '#10B981' },
    ],
    streakDays: 12,
    totalHours: 47.5,
    avgSession: 65,
    completionRate: 85,
  });

  const colors = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#06B6D4',
    success: '#10B981',
    warning: '#F59E0B',
    background: isDark ? '#0F0F23' : '#FFFFFF',
    surface: isDark ? '#1E1E3A' : '#F8F9FA',
    card: isDark ? '#2D2D5A' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1F2937',
    textSecondary: isDark ? '#D1D5DB' : '#6B7280',
    border: isDark ? '#374151' : '#E5E7EB',
  };

  const chartConfig = {
    backgroundColor: colors.card,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(31, 41, 55, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 12,
      fontWeight: '600',
    },
  };

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Year' },
  ];

  const StatCard = ({ icon: Icon, title, value, unit, color, trend }) => (
    <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.statHeader}>
        <Icon size={24} color={color} />
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend > 0 ? colors.success + '20' : colors.error + '20' }]}>
            <Text style={[styles.trendText, { color: trend > 0 ? colors.success : colors.error }]}>
              {trend > 0 ? '+' : ''}{trend}%
            </Text>
          </View>
        )}
      </View>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statTitle, { color: colors.textSecondary }]}>{title}</Text>
      {unit && <Text style={[styles.statUnit, { color: colors.textSecondary }]}>{unit}</Text>}
    </View>
  );

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: analyticsData.studyMinutes,
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const subjectData = analyticsData.subjects.map(subject => ({
    name: subject.name,
    population: subject.minutes,
    color: subject.color,
    legendFontColor: colors.text,
    legendFontSize: 14,
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Analytics</Text>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => setSelectedPeriod(period.key)}>
              <Text
                style={[
                  styles.periodButtonText,
                  {
                    color: selectedPeriod === period.key ? '#FFFFFF' : colors.textSecondary,
                  },
                ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Metrics</Text>
        <View style={styles.metricsContainer}>
          <StatCard
            icon={Clock}
            title="Total Hours"
            value={analyticsData.totalHours}
            unit="this week"
            color={colors.primary}
            trend={12}
          />
          <StatCard
            icon={Flame}
            title="Study Streak"
            value={analyticsData.streakDays}
            unit="days"
            color={colors.warning}
            trend={5}
          />
          <StatCard
            icon={Target}
            title="Avg Session"
            value={analyticsData.avgSession}
            unit="minutes"
            color={colors.accent}
            trend={-3}
          />
          <StatCard
            icon={Award}
            title="Completion"
            value={analyticsData.completionRate}
            unit="percent"
            color={colors.success}
            trend={8}
          />
        </View>

        {/* Study Time Chart */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Daily Study Time</Text>
        <View style={[styles.chartContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <LineChart
            data={lineData}
            width={width - 60}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={true}
            withDots={true}
            withShadow={false}
          />
        </View>

        {/* Subject Distribution */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Subject Distribution</Text>
        <View style={[styles.chartContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <PieChart
            data={subjectData}
            width={width - 60}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </View>

        {/* Weekly Goals */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Goals</Text>
        <View style={[styles.goalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.goalHeader}>
            <Text style={[styles.goalTitle, { color: colors.text }]}>Study Time Goal</Text>
            <Text style={[styles.goalValue, { color: colors.success }]}>47.5 / 50 hours</Text>
          </View>
          <View style={styles.goalProgress}>
            <View style={[styles.goalProgressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.goalProgressFill,
                  {
                    backgroundColor: colors.success,
                    width: `${(47.5 / 50) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.goalPercentage, { color: colors.textSecondary }]}>95%</Text>
          </View>
        </View>

        <View style={[styles.goalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.goalHeader}>
            <Text style={[styles.goalTitle, { color: colors.text }]}>Flashcard Reviews</Text>
            <Text style={[styles.goalValue, { color: colors.primary }]}>85 / 100 cards</Text>
          </View>
          <View style={styles.goalProgress}>
            <View style={[styles.goalProgressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.goalProgressFill,
                  {
                    backgroundColor: colors.primary,
                    width: '85%',
                  },
                ]}
              />
            </View>
            <Text style={[styles.goalPercentage, { color: colors.textSecondary }]}>85%</Text>
          </View>
        </View>

        {/* Achievements */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Achievements</Text>
        <View style={[styles.achievementCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.achievementIcon, { backgroundColor: colors.warning + '20' }]}>
            <Flame size={24} color={colors.warning} />
          </View>
          <View style={styles.achievementContent}>
            <Text style={[styles.achievementTitle, { color: colors.text }]}>7-Day Streak!</Text>
            <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
              You've studied for 7 consecutive days
            </Text>
          </View>
        </View>

        <View style={[styles.achievementCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.achievementIcon, { backgroundColor: colors.success + '20' }]}>
            <Target size={24} color={colors.success} />
          </View>
          <View style={styles.achievementContent}>
            <Text style={[styles.achievementTitle, { color: colors.text }]}>Goal Crusher</Text>
            <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>
              Completed 95% of weekly study goal
            </Text>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  statUnit: {
    fontSize: 12,
    marginTop: 2,
  },
  chartContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  goalCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  goalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalProgressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalPercentage: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 35,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
  },
});