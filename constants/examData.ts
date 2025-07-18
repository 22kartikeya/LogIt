export const EXAM_SYLLABI = {
  GMAT: {
    id: 'gmat',
    name: 'GMAT',
    subjects: [
      {
        id: 'quant',
        name: 'Quantitative Reasoning',
        chapters: [
          {
            id: 'problem-solving',
            name: 'Problem Solving',
            topics: [
              'Arithmetic',
              'Algebra',
              'Geometry',
              'Word Problems',
            ],
          },
          {
            id: 'data-sufficiency',
            name: 'Data Sufficiency',
            topics: [
              'Basic Concepts',
              'Advanced Strategies',
              'Common Pitfalls',
            ],
          },
        ],
      },
      {
        id: 'verbal',
        name: 'Verbal Reasoning',
        chapters: [
          {
            id: 'reading-comprehension',
            name: 'Reading Comprehension',
            topics: [
              'Main Idea Questions',
              'Detail Questions',
              'Inference Questions',
              'Critical Reasoning',
            ],
          },
          {
            id: 'sentence-correction',
            name: 'Sentence Correction',
            topics: [
              'Grammar Rules',
              'Idioms',
              'Parallelism',
              'Modifiers',
            ],
          },
        ],
      },
    ],
  },
  
  JEE: {
    id: 'jee',
    name: 'JEE Advanced',
    subjects: [
      {
        id: 'physics',
        name: 'Physics',
        chapters: [
          {
            id: 'mechanics',
            name: 'Mechanics',
            topics: [
              'Kinematics',
              'Laws of Motion',
              'Work, Energy and Power',
              'Rotational Motion',
              'Gravitation',
            ],
          },
          {
            id: 'thermodynamics',
            name: 'Thermodynamics',
            topics: [
              'Heat and Temperature',
              'Kinetic Theory',
              'Laws of Thermodynamics',
            ],
          },
          {
            id: 'electromagnetism',
            name: 'Electromagnetism',
            topics: [
              'Electric Field',
              'Magnetic Field',
              'Electromagnetic Induction',
              'AC Circuits',
            ],
          },
        ],
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        chapters: [
          {
            id: 'physical-chemistry',
            name: 'Physical Chemistry',
            topics: [
              'Atomic Structure',
              'Chemical Bonding',
              'Thermodynamics',
              'Equilibrium',
              'Kinetics',
            ],
          },
          {
            id: 'organic-chemistry',
            name: 'Organic Chemistry',
            topics: [
              'Hydrocarbons',
              'Functional Groups',
              'Reactions and Mechanisms',
              'Stereochemistry',
            ],
          },
          {
            id: 'inorganic-chemistry',
            name: 'Inorganic Chemistry',
            topics: [
              'Periodic Table',
              'Chemical Bonding',
              'Coordination Compounds',
              'Metallurgy',
            ],
          },
        ],
      },
      {
        id: 'mathematics',
        name: 'Mathematics',
        chapters: [
          {
            id: 'algebra',
            name: 'Algebra',
            topics: [
              'Complex Numbers',
              'Quadratic Equations',
              'Sequences and Series',
              'Permutations and Combinations',
              'Binomial Theorem',
            ],
          },
          {
            id: 'calculus',
            name: 'Calculus',
            topics: [
              'Limits',
              'Derivatives',
              'Applications of Derivatives',
              'Integrals',
              'Differential Equations',
            ],
          },
          {
            id: 'coordinate-geometry',
            name: 'Coordinate Geometry',
            topics: [
              'Straight Lines',
              'Circles',
              'Parabola',
              'Ellipse',
              'Hyperbola',
            ],
          },
        ],
      },
    ],
  },

  PROGRAMMING: {
    id: 'programming',
    name: 'Programming Roadmap',
    subjects: [
      {
        id: 'fundamentals',
        name: 'Programming Fundamentals',
        chapters: [
          {
            id: 'basics',
            name: 'Basics',
            topics: [
              'Variables and Data Types',
              'Control Structures',
              'Functions',
              'Arrays and Objects',
            ],
          },
          {
            id: 'oop',
            name: 'Object-Oriented Programming',
            topics: [
              'Classes and Objects',
              'Inheritance',
              'Polymorphism',
              'Encapsulation',
            ],
          },
        ],
      },
      {
        id: 'data-structures',
        name: 'Data Structures',
        chapters: [
          {
            id: 'linear',
            name: 'Linear Data Structures',
            topics: [
              'Arrays',
              'Linked Lists',
              'Stacks',
              'Queues',
            ],
          },
          {
            id: 'non-linear',
            name: 'Non-Linear Data Structures',
            topics: [
              'Trees',
              'Graphs',
              'Hash Tables',
              'Heaps',
            ],
          },
        ],
      },
      {
        id: 'algorithms',
        name: 'Algorithms',
        chapters: [
          {
            id: 'sorting',
            name: 'Sorting Algorithms',
            topics: [
              'Bubble Sort',
              'Quick Sort',
              'Merge Sort',
              'Heap Sort',
            ],
          },
          {
            id: 'searching',
            name: 'Searching Algorithms',
            topics: [
              'Linear Search',
              'Binary Search',
              'Depth-First Search',
              'Breadth-First Search',
            ],
          },
        ],
      },
    ],
  },
};

export const SAMPLE_FLASHCARDS = {
  GMAT: [
    {
      id: 'gmat-1',
      front: 'If x + y = 10 and x - y = 4, what is the value of x?',
      back: 'x = 7 (Add the equations: 2x = 14, so x = 7)',
      subject: 'GMAT',
      topic: 'Algebra',
      difficulty: 2,
    },
    {
      id: 'gmat-2',
      front: 'What is the area of a circle with radius 5?',
      back: '25π (Area = πr² = π × 5² = 25π)',
      subject: 'GMAT',
      topic: 'Geometry',
      difficulty: 1,
    },
  ],
  
  JEE: [
    {
      id: 'jee-1',
      front: 'State Newton\'s Second Law of Motion',
      back: 'F = ma (Force equals mass times acceleration)',
      subject: 'Physics',
      topic: 'Mechanics',
      difficulty: 1,
    },
    {
      id: 'jee-2',
      front: 'What is the derivative of sin(x)?',
      back: 'cos(x)',
      subject: 'Mathematics',
      topic: 'Calculus',
      difficulty: 2,
    },
  ],
  
  PROGRAMMING: [
    {
      id: 'prog-1',
      front: 'What is the time complexity of binary search?',
      back: 'O(log n) - Binary search eliminates half the search space in each iteration',
      subject: 'Programming',
      topic: 'Algorithms',
      difficulty: 2,
    },
    {
      id: 'prog-2',
      front: 'Explain what a stack data structure is',
      back: 'A Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end (top)',
      subject: 'Programming',
      topic: 'Data Structures',
      difficulty: 1,
    },
  ],
};