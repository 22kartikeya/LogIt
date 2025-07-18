import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

interface ExpandableListProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  level?: number;
  icon?: React.ReactNode;
}

export default function ExpandableList({
  title,
  children,
  defaultExpanded = false,
  level = 0,
  icon,
}: ExpandableListProps) {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  const animatedHeight = useSharedValue(defaultExpanded ? 1 : 0);
  const animatedRotation = useSharedValue(defaultExpanded ? 1 : 0);

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    animatedHeight.value = withTiming(newExpanded ? 1 : 0, { duration: 300 });
    animatedRotation.value = withTiming(newExpanded ? 1 : 0, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: interpolate(animatedHeight.value, [0, 1], [0, 200]),
    opacity: animatedHeight.value,
    overflow: 'hidden',
  }));

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(animatedRotation.value, [0, 1], [0, 90])}deg`,
      },
    ],
  }));

  const getIndentColor = (level: number) => {
    const colors = ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981'];
    return colors[level % colors.length];
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            marginLeft: level * 20,
          },
        ]}
        onPress={toggleExpanded}>
        
        <View style={styles.headerLeft}>
          {level > 0 && (
            <View
              style={[
                styles.indentLine,
                { backgroundColor: getIndentColor(level - 1) },
              ]}
            />
          )}
          
          <Animated.View style={rotationStyle}>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Animated.View>
          
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </View>
      </TouchableOpacity>

      <Animated.View style={animatedStyle}>
        <View style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indentLine: {
    width: 3,
    height: 20,
    borderRadius: 2,
    marginRight: 12,
  },
  iconContainer: {
    marginLeft: 12,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  content: {
    paddingLeft: 20,
    paddingTop: 8,
  },
});