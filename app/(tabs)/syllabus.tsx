import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  Alert,
} from 'react-native';
import { ChevronDown, ChevronRight, Plus, BookOpen, CircleCheck as CheckCircle2, Circle } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export default function Syllabus() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [syllabus, setSyllabus] = useState([]);
  const [expandedItems, setExpandedItems] = useState(new Set());

  const colors = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    success: '#10B981',
    background: isDark ? '#0F0F23' : '#FFFFFF',
    surface: isDark ? '#1E1E3A' : '#F8F9FA',
    card: isDark ? '#2D2D5A' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1F2937',
    textSecondary: isDark ? '#D1D5DB' : '#6B7280',
    border: isDark ? '#374151' : '#E5E7EB',
  };

  useEffect(() => {
    loadSyllabus();
  }, []);

  const loadSyllabus = async () => {
    try {
      const storedSyllabus = await AsyncStorage.getItem('syllabus');
      if (storedSyllabus) {
        setSyllabus(JSON.parse(storedSyllabus));
      } else {
        setSyllabus(getDefaultSyllabus());
      }
    } catch (error) {
      console.error('Error loading syllabus:', error);
      setSyllabus(getDefaultSyllabus());
    }
  };

  const saveSyllabus = async (newSyllabus) => {
    try {
      await AsyncStorage.setItem('syllabus', JSON.stringify(newSyllabus));
      setSyllabus(newSyllabus);
    } catch (error) {
      console.error('Error saving syllabus:', error);
    }
  };

  const getDefaultSyllabus = () => [
    {
      id: '1',
      title: 'Data Structures & Algorithms',
      type: 'subject',
      completed: false,
      children: [
        {
          id: '1-1',
          title: 'Data Structures',
          type: 'chapter',
          completed: false,
          children: [
            {
              id: '1-1-1',
              title: 'Linear Data Structures',
              type: 'topic',
              completed: false,
              children: [
                { id: '1-1-1-1', title: 'Arrays', type: 'subtopic', completed: true },
                { id: '1-1-1-2', title: 'Linked Lists', type: 'subtopic', completed: true },
                { id: '1-1-1-3', title: 'Stacks', type: 'subtopic', completed: false },
                { id: '1-1-1-4', title: 'Queues', type: 'subtopic', completed: false },
              ],
            },
            {
              id: '1-1-2',
              title: 'Non-Linear Data Structures',
              type: 'topic',
              completed: false,
              children: [
                { id: '1-1-2-1', title: 'Trees', type: 'subtopic', completed: false },
                { id: '1-1-2-2', title: 'Graphs', type: 'subtopic', completed: false },
                { id: '1-1-2-3', title: 'Hash Tables', type: 'subtopic', completed: false },
              ],
            },
          ],
        },
        {
          id: '1-2',
          title: 'Algorithms',
          type: 'chapter',
          completed: false,
          children: [
            {
              id: '1-2-1',
              title: 'Sorting Algorithms',
              type: 'topic',
              completed: false,
              children: [
                { id: '1-2-1-1', title: 'Bubble Sort', type: 'subtopic', completed: false },
                { id: '1-2-1-2', title: 'Quick Sort', type: 'subtopic', completed: false },
                { id: '1-2-1-3', title: 'Merge Sort', type: 'subtopic', completed: false },
              ],
            },
            {
              id: '1-2-2',
              title: 'Searching Algorithms',
              type: 'topic',
              completed: false,
              children: [
                { id: '1-2-2-1', title: 'Linear Search', type: 'subtopic', completed: false },
                { id: '1-2-2-2', title: 'Binary Search', type: 'subtopic', completed: false },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Web2 Development',
      type: 'subject',
      completed: false,
      children: [
        {
          id: '2-1',
          title: 'Frontend Development',
          type: 'chapter',
          completed: false,
          children: [
            {
              id: '2-1-1',
              title: 'HTML & CSS',
              type: 'topic',
              completed: false,
              children: [
                { id: '2-1-1-1', title: 'HTML Fundamentals', type: 'subtopic', completed: true },
                { id: '2-1-1-2', title: 'CSS Grid & Flexbox', type: 'subtopic', completed: false },
                { id: '2-1-1-3', title: 'Responsive Design', type: 'subtopic', completed: false },
              ],
            },
            {
              id: '2-1-2',
              title: 'JavaScript',
              type: 'topic',
              completed: false,
              children: [
                { id: '2-1-2-1', title: 'ES6+ Features', type: 'subtopic', completed: false },
                { id: '2-1-2-2', title: 'DOM Manipulation', type: 'subtopic', completed: false },
                { id: '2-1-2-3', title: 'Async Programming', type: 'subtopic', completed: false },
              ],
            },
            {
              id: '2-1-3',
              title: 'React.js',
              type: 'topic',
              completed: false,
              children: [
                { id: '2-1-3-1', title: 'Components & JSX', type: 'subtopic', completed: false },
                { id: '2-1-3-2', title: 'State Management', type: 'subtopic', completed: false },
                { id: '2-1-3-3', title: 'Hooks', type: 'subtopic', completed: false },
              ],
            },
          ],
        },
        {
          id: '2-2',
          title: 'Backend Development',
          type: 'chapter',
          completed: false,
          children: [
            {
              id: '2-2-1',
              title: 'Node.js',
              type: 'topic',
              completed: false,
              children: [
                { id: '2-2-1-1', title: 'Express.js', type: 'subtopic', completed: false },
                { id: '2-2-1-2', title: 'RESTful APIs', type: 'subtopic', completed: false },
                { id: '2-2-1-3', title: 'Authentication', type: 'subtopic', completed: false },
              ],
            },
            {
              id: '2-2-2',
              title: 'Databases',
              type: 'topic',
              completed: false,
              children: [
                { id: '2-2-2-1', title: 'MongoDB', type: 'subtopic', completed: false },
                { id: '2-2-2-2', title: 'PostgreSQL', type: 'subtopic', completed: false },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '3',
      title: 'Web3 Development',
      type: 'subject',
      completed: false,
      children: [
        {
          id: '3-1',
          title: 'Blockchain Fundamentals',
          type: 'chapter',
          completed: false,
          children: [
            {
              id: '3-1-1',
              title: 'Blockchain Basics',
              type: 'topic',
              completed: false,
              children: [
                { id: '3-1-1-1', title: 'Cryptography', type: 'subtopic', completed: false },
                { id: '3-1-1-2', title: 'Consensus Mechanisms', type: 'subtopic', completed: false },
                { id: '3-1-1-3', title: 'Decentralization', type: 'subtopic', completed: false },
              ],
            },
            {
              id: '3-1-2',
              title: 'Ethereum',
              type: 'topic',
              completed: false,
              children: [
                { id: '3-1-2-1', title: 'Smart Contracts', type: 'subtopic', completed: false },
                { id: '3-1-2-2', title: 'Gas & Transactions', type: 'subtopic', completed: false },
                { id: '3-1-2-3', title: 'EVM', type: 'subtopic', completed: false },
              ],
            },
          ],
        },
        {
          id: '3-2',
          title: 'Smart Contract Development',
          type: 'chapter',
          completed: false,
          children: [
            {
              id: '3-2-1',
              title: 'Solidity',
              type: 'topic',
              completed: false,
              children: [
                { id: '3-2-1-1', title: 'Syntax & Data Types', type: 'subtopic', completed: false },
                { id: '3-2-1-2', title: 'Functions & Modifiers', type: 'subtopic', completed: false },
                { id: '3-2-1-3', title: 'Inheritance', type: 'subtopic', completed: false },
              ],
            },
            {
              id: '3-2-2',
              title: 'DeFi Protocols',
              type: 'topic',
              completed: false,
              children: [
                { id: '3-2-2-1', title: 'DEX Development', type: 'subtopic', completed: false },
                { id: '3-2-2-2', title: 'Lending Protocols', type: 'subtopic', completed: false },
                { id: '3-2-2-3', title: 'Yield Farming', type: 'subtopic', completed: false },
              ],
            },
          ],
        },
        {
          id: '3-3',
          title: 'DApp Development',
          type: 'chapter',
          completed: false,
          children: [
            {
              id: '3-3-1',
              title: 'Web3.js & Ethers.js',
              type: 'topic',
              completed: false,
              children: [
                { id: '3-3-1-1', title: 'Wallet Integration', type: 'subtopic', completed: false },
                { id: '3-3-1-2', title: 'Contract Interaction', type: 'subtopic', completed: false },
              ],
            },
          ],
        },
      ],
    },
  ];

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const toggleCompleted = (item, parentPath = []) => {
    const updateItem = (items, path, index = 0) => {
      if (index === path.length) {
        return items.map(currentItem => 
          currentItem.id === item.id 
            ? { ...currentItem, completed: !currentItem.completed }
            : currentItem
        );
      }

      return items.map((currentItem) => {
        if (currentItem.id === path[index]) {
          return {
            ...currentItem,
            children: currentItem.children ? updateItem(currentItem.children, path, index + 1) : undefined,
          };
        }
        return currentItem;
      });
    };

    const fullPath = [...parentPath, item.id];
    const newSyllabus = fullPath.length === 1 
      ? updateItem(syllabus, [])
      : updateItem(syllabus, fullPath.slice(0, -1));
    saveSyllabus(newSyllabus);
  };

  const calculateProgress = (item) => {
    if (!item.children || item.children.length === 0) {
      return item.completed ? 100 : 0;
    }

    const totalChildren = item.children.length;
    const completedChildren = item.children.filter(child => {
      const childProgress = calculateProgress(child);
      return childProgress === 100;
    }).length;

    return Math.round((completedChildren / totalChildren) * 100);
  };

  const SyllabusItem = ({ item, level = 0, parentPath = [] }) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const progress = calculateProgress(item);
    const currentPath = [...parentPath, item.id];
    
    const animatedHeight = useSharedValue(0);
    const animatedOpacity = useSharedValue(0);
    
    React.useEffect(() => {
      if (isExpanded && hasChildren) {
        animatedHeight.value = withTiming(1);
        animatedOpacity.value = withTiming(1);
      } else {
        animatedHeight.value = withTiming(0);
        animatedOpacity.value = withTiming(0);
      }
    }, [isExpanded]);

    const animatedStyle = useAnimatedStyle(() => ({
      height: hasChildren ? animatedHeight.value * 200 : 0,
      opacity: animatedOpacity.value,
      overflow: 'hidden',
    }));

    const getIndentColor = (level) => {
      const colors = ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981'];
      return colors[level % colors.length];
    };

    return (
      <View style={styles.syllabusItem}>
        <TouchableOpacity
          style={[
            styles.itemHeader,
            { backgroundColor: colors.card, borderColor: colors.border },
            level > 0 && { marginLeft: level * 20 }
          ]}
          onPress={() => hasChildren && toggleExpanded(item.id)}>
          
          <View style={styles.itemLeft}>
            {level > 0 && (
              <View
                style={[
                  styles.indentLine,
                  { backgroundColor: getIndentColor(level - 1) }
                ]}
              />
            )}
            
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={20} color={colors.textSecondary} />
              ) : (
                <ChevronRight size={20} color={colors.textSecondary} />
              )
            ) : (
              <TouchableOpacity onPress={() => toggleCompleted(item, parentPath)}>
                {item.completed ? (
                  <CheckCircle2 size={20} color={colors.success} />
                ) : (
                  <Circle size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            )}
            
            <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
          </View>

          <View style={styles.itemRight}>
            {progress > 0 && (
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        backgroundColor: progress === 100 ? colors.success : colors.primary,
                        width: `${progress}%`
                      }
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                  {progress}%
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {hasChildren && (
          <Animated.View style={animatedStyle}>
            {isExpanded && item.children.map((child) => (
              <SyllabusItem
                key={child.id}
                item={child}
                level={level + 1}
                parentPath={currentPath}
              />
            ))}
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Study Syllabus</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {syllabus.map((item) => (
          <SyllabusItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  syllabusItem: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  itemLeft: {
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
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  progressBar: {
    width: 50,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 30,
  },
});