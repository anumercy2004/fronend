// LearnSphere Notifications Mock Data

const notifications = [
  {
    id: 1,
    title: "New Quiz Available",
    message: "Test your React knowledge with the new React JS Core Assessment.",
    timestamp: "10 mins ago",
    read: false,
    type: "quiz"
  },
  {
    id: 2,
    title: "Course Enrollment Confirmed",
    message: "You have successfully enrolled in Complete React JS & Modern Frontend.",
    timestamp: "2 hours ago",
    read: false,
    type: "enrollment"
  },
  {
    id: 3,
    title: "Certificate Earned",
    message: "Congratulations! You earned your Certificate for Complete React JS.",
    timestamp: "1 day ago",
    read: true,
    type: "certificate"
  },
  {
    id: 4,
    title: "Weekend Flash Discount",
    message: "Explore Java and Python masterclasses at 50% off this weekend.",
    timestamp: "2 days ago",
    read: true,
    type: "promo"
  }
];

export default notifications;
