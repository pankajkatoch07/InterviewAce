require("dotenv").config();
const mongoose = require("mongoose");
const { QuestionModel } = require("./models/Question.model");

const questions = [
  // MERN Stack Questions
  { question: "What is the MERN stack and explain how each technology contributes to a full-stack application?", techStack: "mern", difficulty: "easy" },
  { question: "Explain the difference between SQL and NoSQL databases. Why is MongoDB a good fit for the MERN stack?", techStack: "mern", difficulty: "easy" },
  { question: "What is the Virtual DOM in React and how does it improve performance compared to the real DOM?", techStack: "mern", difficulty: "medium" },
  { question: "Explain how state management works in a MERN application. Compare Redux with Context API.", techStack: "mern", difficulty: "medium" },
  { question: "How would you handle authentication and authorization in a MERN stack application? Explain the JWT flow.", techStack: "mern", difficulty: "hard" },
  { question: "Describe how you would design a RESTful API for a social media platform using Express and MongoDB.", techStack: "mern", difficulty: "hard" },
  { question: "What are React Hooks? Explain useState, useEffect, and useContext with examples.", techStack: "mern", difficulty: "medium" },
  { question: "How do you handle errors in a MERN stack application — both on the frontend and backend?", techStack: "mern", difficulty: "medium" },
  { question: "Explain the concept of middleware in Express.js. Give examples of built-in and custom middleware.", techStack: "mern", difficulty: "medium" },
  { question: "What is server-side rendering (SSR) and how does it differ from client-side rendering (CSR) in React?", techStack: "mern", difficulty: "hard" },

  // Node.js Questions
  { question: "What is Node.js and how does the event-driven, non-blocking I/O model work?", techStack: "node", difficulty: "easy" },
  { question: "Explain the difference between process.nextTick(), setImmediate(), and setTimeout() in Node.js.", techStack: "node", difficulty: "hard" },
  { question: "What is the Node.js Event Loop? Explain its phases in detail.", techStack: "node", difficulty: "hard" },
  { question: "How do streams work in Node.js? What are the different types of streams?", techStack: "node", difficulty: "medium" },
  { question: "Explain the module system in Node.js. What is the difference between require() and import?", techStack: "node", difficulty: "easy" },
  { question: "What is clustering in Node.js and how does it help with performance?", techStack: "node", difficulty: "hard" },
  { question: "How do you handle file operations in Node.js? Explain the difference between synchronous and asynchronous methods.", techStack: "node", difficulty: "easy" },
  { question: "What is middleware in Express.js? How would you create custom error-handling middleware?", techStack: "node", difficulty: "medium" },
  { question: "Explain how you would implement rate limiting and security best practices in a Node.js API.", techStack: "node", difficulty: "medium" },
  { question: "What are Worker Threads in Node.js and when would you use them over Child Processes?", techStack: "node", difficulty: "hard" },

  // Java Questions
  { question: "Explain the four pillars of Object-Oriented Programming with Java examples.", techStack: "java", difficulty: "easy" },
  { question: "What is the difference between an Abstract Class and an Interface in Java? When would you use each?", techStack: "java", difficulty: "medium" },
  { question: "Explain the Java Collections Framework. Compare ArrayList, LinkedList, HashSet, and HashMap.", techStack: "java", difficulty: "medium" },
  { question: "What is multithreading in Java? Explain the lifecycle of a thread and synchronization.", techStack: "java", difficulty: "hard" },
  { question: "What are Java Streams? How do they differ from traditional loops for data processing?", techStack: "java", difficulty: "medium" },
  { question: "Explain the SOLID principles with Java code examples.", techStack: "java", difficulty: "hard" },
  { question: "What is Spring Boot and how does it simplify Java application development?", techStack: "java", difficulty: "easy" },
  { question: "Explain dependency injection in Spring. What are the different types of injection?", techStack: "java", difficulty: "medium" },
  { question: "What is the Java Memory Model? Explain heap vs stack memory and garbage collection.", techStack: "java", difficulty: "hard" },
  { question: "How do you handle exceptions in Java? Explain checked vs unchecked exceptions with examples.", techStack: "java", difficulty: "easy" },

  // React Questions
  { question: "What is the difference between functional and class components in React?", techStack: "react", difficulty: "easy" },
  { question: "Explain the React component lifecycle methods and their equivalent hooks.", techStack: "react", difficulty: "medium" },
  { question: "What is prop drilling and how would you solve it? Compare Context API, Redux, and Zustand.", techStack: "react", difficulty: "medium" },
  { question: "How does React's reconciliation algorithm work? What is the role of keys in lists?", techStack: "react", difficulty: "hard" },
  { question: "Explain code-splitting and lazy loading in React. How do React.lazy and Suspense work?", techStack: "react", difficulty: "medium" },

  // JavaScript Questions
  { question: "Explain closures in JavaScript with a practical example. What are common use cases?", techStack: "javascript", difficulty: "medium" },
  { question: "What is the difference between var, let, and const? Explain hoisting and temporal dead zone.", techStack: "javascript", difficulty: "easy" },
  { question: "Explain Promises, async/await, and the event loop in JavaScript.", techStack: "javascript", difficulty: "medium" },
  { question: "What is prototypal inheritance in JavaScript? How does it differ from classical inheritance?", techStack: "javascript", difficulty: "hard" },
  { question: "Explain the difference between == and ===. How does type coercion work in JavaScript?", techStack: "javascript", difficulty: "easy" },

  // Python Questions
  { question: "What are Python decorators and how do they work? Provide an example.", techStack: "python", difficulty: "medium" },
  { question: "Explain the GIL (Global Interpreter Lock) in Python. How does it affect multithreading?", techStack: "python", difficulty: "hard" },
  { question: "What are list comprehensions in Python? How do they compare to map/filter functions?", techStack: "python", difficulty: "easy" },
  { question: "Explain the difference between deep copy and shallow copy in Python.", techStack: "python", difficulty: "medium" },
  { question: "What are Python generators and how do they differ from regular functions?", techStack: "python", difficulty: "medium" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await QuestionModel.deleteMany({});
    console.log("Cleared existing questions");

    await QuestionModel.insertMany(questions);
    console.log(`Seeded ${questions.length} questions successfully!`);

    const counts = {};
    for (const q of questions) {
      counts[q.techStack] = (counts[q.techStack] || 0) + 1;
    }
    console.log("Questions per category:", counts);

    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
