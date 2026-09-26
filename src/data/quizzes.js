// LearnSphere Interactive Quizzes Data

const quizzes = [
  {
    id: 1,
    courseId: 1,
    title: "React JS Core Fundamentals Assessment",
    duration: "15 mins",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of the Virtual DOM in React?",
        options: [
          "To directly manipulate browser HTML nodes faster than native JS",
          "To compute minimal differences (diffing) before updating the real DOM",
          "To store user sessions in client browser storage",
          "To transpile TypeScript code into ES5 standard JavaScript"
        ],
        correctIndex: 1,
        explanation: "React maintains a virtual representation of the DOM in memory, calculates differences via reconciliation, and batches updates to optimize performance."
      },
      {
        id: 2,
        question: "Which hook should be used to perform side effects in functional components?",
        options: [
          "useState()",
          "useMemo()",
          "useEffect()",
          "useContext()"
        ],
        correctIndex: 2,
        explanation: "useEffect is designed for subscriptions, data fetching, manual DOM manipulations, and timers."
      },
      {
        id: 3,
        question: "What happens when you update state using useState in React?",
        options: [
          "The browser performs a full-page reload",
          "The component schedules a re-render with the new state value",
          "The component is immediately unmounted and deleted",
          "The parent component only re-renders, not the child"
        ],
        correctIndex: 1,
        explanation: "Calling a state setter schedules a re-render of that component and its children (unless memoized)."
      },
      {
        id: 4,
        question: "Why should list items in React always have unique 'key' props?",
        options: [
          "Keys are required by CSS for applying styles to elements",
          "Keys help React identify which items have changed, been added, or removed",
          "Keys are transmitted to backend API endpoints automatically",
          "Keys allow components to access window.localStorage directly"
        ],
        correctIndex: 1,
        explanation: "Keys provide identity to elements in an array across renders, avoiding unnecessary DOM re-creations."
      },
      {
        id: 5,
        question: "What is the correct syntax to pass props from a parent to a child component?",
        options: [
          "<ChildComponent props={title: 'Hello'} />",
          "<ChildComponent title='Hello' />",
          "<ChildComponent.props('Hello') />",
          "<ChildComponent>props: 'Hello'</ChildComponent>"
        ],
        correctIndex: 1,
        explanation: "Props are passed as attributes directly on the JSX component element, e.g. <ChildComponent title='Hello' />."
      }
    ]
  },
  {
    id: 2,
    courseId: 2,
    title: "Java OOP & Collections Benchmark",
    duration: "15 mins",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Which of the following is NOT one of the four core pillars of Object-Oriented Programming?",
        options: [
          "Encapsulation",
          "Inheritance",
          "Compilation",
          "Polymorphism"
        ],
        correctIndex: 2,
        explanation: "The four OOP pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction. Compilation is a build phase."
      },
      {
        id: 2,
        question: "What is the difference between ArrayList and LinkedList in Java?",
        options: [
          "ArrayList uses a dynamic resizable array while LinkedList uses doubly linked nodes",
          "ArrayList cannot store objects, only primitives",
          "LinkedList is synchronized by default, ArrayList is not",
          "ArrayList does not support indexing by integer positions"
        ],
        correctIndex: 0,
        explanation: "ArrayList provides O(1) random access backed by an array, whereas LinkedList provides efficient insertions and deletions at ends."
      },
      {
        id: 3,
        question: "Which keyword in Java prevents a class from being subclassed?",
        options: [
          "static",
          "final",
          "const",
          "abstract"
        ],
        correctIndex: 1,
        explanation: "A 'final' class in Java cannot be extended by any other class (e.g., java.lang.String)."
      },
      {
        id: 4,
        question: "What is the contract between equals() and hashCode() in Java?",
        options: [
          "If two objects are equal by equals(), their hashCode() values MUST be the same",
          "If two objects have the same hashCode(), they MUST be equal by equals()",
          "There is no relationship between hashCode() and equals()",
          "hashCode() is only called when equals() returns false"
        ],
        correctIndex: 0,
        explanation: "If o1.equals(o2) is true, then o1.hashCode() must equal o2.hashCode(). The reverse is not required (collisions are allowed)."
      }
    ]
  }
];

export default quizzes;
