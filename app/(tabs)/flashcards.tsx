import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import { RotateCw, Star, CircleCheck as CheckCircle, Circle as XCircle, Plus, Filter } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function Flashcards() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showStudyView, setShowStudyView] = useState(false);

  const flipValue = useSharedValue(0);

  const colors = {
    primary: '#6366F1',
    secondary: '#8B5CF6',
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
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    try {
      const storedCards = await AsyncStorage.getItem('flashcards');
      if (storedCards) {
        setFlashcards(JSON.parse(storedCards));
      } else {
        setFlashcards(getDefaultFlashcards());
      }
    } catch (error) {
      console.error('Error loading flashcards:', error);
      setFlashcards(getDefaultFlashcards());
    }
  };

  const getDefaultFlashcards = () => [
    {
      id: '1',
      front: 'What is the derivative of x²?',
      back: '2x',
      subject: 'Mathematics',
      topic: 'Calculus',
      difficulty: 2,
      lastReviewed: null,
      nextReview: new Date().getTime(),
      correctCount: 0,
      incorrectCount: 0,
    },
    {
      id: '2',
      front: 'Define photosynthesis',
      back: 'The process by which plants convert light energy into chemical energy',
      subject: 'Biology',
      topic: 'Plant Biology',
      difficulty: 1,
      lastReviewed: null,
      nextReview: new Date().getTime(),
      correctCount: 0,
      incorrectCount: 0,
    },
    {
      id: '3',
      front: 'What is Newton\'s First Law?',
      back: 'An object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force',
      subject: 'Physics',
      topic: 'Mechanics',
      difficulty: 2,
      lastReviewed: null,
      nextReview: new Date().getTime(),
      correctCount: 0,
      incorrectCount: 0,
    },
  ];

  const flipCard = () => {
    flipValue.value = withSpring(isFlipped ? 0 : 1, {}, () => {
      runOnJS(setIsFlipped)(!isFlipped);
    });
  };

  const markAnswer = (isCorrect) => {
    const card = flashcards[currentCardIndex];
    const updatedCard = {
      ...card,
      lastReviewed: new Date().getTime(),
      correctCount: isCorrect ? card.correctCount + 1 : card.correctCount,
      incorrectCount: isCorrect ? card.incorrectCount : card.incorrectCount + 1,
      nextReview: calculateNextReview(card.difficulty, isCorrect),
    };

    const updatedCards = [...flashcards];
    updatedCards[currentCardIndex] = updatedCard;
    setFlashcards(updatedCards);
    
    // Move to next card
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
    
    setIsFlipped(false);
    flipValue.value = 0;
  };

  const calculateNextReview = (difficulty, isCorrect) => {
    const now = new Date().getTime();
    const intervals = isCorrect 
      ? [1, 3, 7, 14, 30] // days for correct answers
      : [0.5, 1, 2]; // days for incorrect answers
    
    const dayIndex = Math.min(difficulty, intervals.length - 1);
    const daysToAdd = intervals[dayIndex];
    
    return now + (daysToAdd * 24 * 60 * 60 * 1000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return colors.success;
      case 2: return colors.warning;
      case 3: return colors.error;
      default: return colors.primary;
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return 'Unknown';
    }
  };

  const animatedFrontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 1], [0, 180]);
    const opacity = interpolate(flipValue.value, [0, 0.5, 1], [1, 0, 0]);
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
    };
  });

  const animatedBackStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 1], [180, 360]);
    const opacity = interpolate(flipValue.value, [0, 0.5, 1], [0, 0, 1]);
    
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      opacity,
    };
  });

  if (showStudyView && flashcards.length > 0) {
    const currentCard = flashcards[currentCardIndex];
    
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        
        {/* Study Header */}
        <View style={[styles.studyHeader, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => setShowStudyView(false)}>
            <Text style={[styles.backButton, { color: colors.primary }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.cardCounter, { color: colors.text }]}>
            {currentCardIndex + 1} / {flashcards.length}
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Card Display */}
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.cardTouchable} onPress={flipCard}>
            <Animated.View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, animatedFrontStyle]}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardSubject, { color: colors.primary }]}>
                    {currentCard.subject}
                  </Text>
                  <View style={styles.difficultyContainer}>
                    <View
                      style={[
                        styles.difficultyBadge,
                        { backgroundColor: getDifficultyColor(currentCard.difficulty) }
                      ]}>
                      <Text style={styles.difficultyText}>
                        {getDifficultyText(currentCard.difficulty)}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.cardText, { color: colors.text }]}>
                  {currentCard.front}
                </Text>
                <View style={styles.cardFooter}>
                  <RotateCw size={20} color={colors.textSecondary} />
                  <Text style={[styles.flipHint, { color: colors.textSecondary }]}>
                    Tap to flip
                  </Text>
                </View>
              </View>
            </Animated.View>

            <Animated.View style={[styles.card, styles.cardBack, { backgroundColor: colors.card, borderColor: colors.border }, animatedBackStyle]}>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardSubject, { color: colors.success }]}>
                    Answer
                  </Text>
                </View>
                <Text style={[styles.cardText, { color: colors.text }]}>
                  {currentCard.back}
                </Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Answer Buttons */}
        {isFlipped && (
          <View style={styles.answerButtons}>
            <TouchableOpacity
              style={[styles.answerButton, { backgroundColor: colors.error }]}
              onPress={() => markAnswer(false)}>
              <XCircle size={24} color="#FFFFFF" />
              <Text style={styles.answerButtonText}>Incorrect</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.answerButton, { backgroundColor: colors.success }]}
              onPress={() => markAnswer(true)}>
              <CheckCircle size={24} color="#FFFFFF" />
              <Text style={styles.answerButtonText}>Correct</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Flashcards</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Plus size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Study Button */}
        <TouchableOpacity
          style={[styles.studyButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowStudyView(true)}>
          <Text style={styles.studyButtonText}>Start Studying ({flashcards.length} cards)</Text>
        </TouchableOpacity>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{flashcards.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Cards</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {flashcards.filter(card => card.nextReview <= new Date().getTime()).length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Due Today</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>85%</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Accuracy</Text>
          </View>
        </View>

        {/* Recent Cards */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Cards</Text>
        {flashcards.slice(0, 5).map((card, index) => (
          <View key={card.id} style={[styles.cardPreview, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardPreviewContent}>
              <Text style={[styles.cardPreviewTitle, { color: colors.text }]} numberOfLines={1}>
                {card.front}
              </Text>
              <Text style={[styles.cardPreviewSubject, { color: colors.textSecondary }]}>
                {card.subject} • {card.topic}
              </Text>
            </View>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(card.difficulty) }
              ]}>
              <Text style={styles.difficultyText}>
                {getDifficultyText(card.difficulty)}
              </Text>
            </View>
          </View>
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
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  studyButton: {
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  studyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  statCard: {
    width: '31%',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardPreviewContent: {
    flex: 1,
  },
  cardPreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardPreviewSubject: {
    fontSize: 14,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  // Study View Styles
  studyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardCounter: {
    fontSize: 16,
    fontWeight: '600',
  },
  placeholder: {
    width: 50,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardTouchable: {
    width: width - 40,
    height: 300,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 1,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    transformOrigin: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardSubject: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  difficultyContainer: {
    alignItems: 'flex-end',
  },
  cardText: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  flipHint: {
    fontSize: 14,
    marginLeft: 8,
  },
  answerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 140,
    justifyContent: 'center',
  },
  answerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});