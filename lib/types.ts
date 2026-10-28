export type Role = "user" | "admin";
export type PaymentStatus = "pending" | "completed" | "refunded";
export type Level = "Beginner" | "Intermediate" | "Advanced";

export type CourseMetadata = {
  subtitle: string;
  partner: string;
  instructor_name: string;
  instructor_title: string;
  instructor_bio: string;
  level: Level;
  rating: number;
  review_count: number;
  enrolled_count: number;
  duration_label: string;
  skills: string[];
  category: string;
  language: string;
  learning_points: string[];
};

export type Course = {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  price: number;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  metadata: CourseMetadata;
};

export type CourseView = Course & {
  learner_count: number;
};

export type LessonLink = {
  id: string;
  title: string;
  summary: string | null;
  module_title: string;
  sort_order: number;
};

export type CoursePdf = LessonLink & {
  course_id: string;
  file_path: string;
  created_at: string;
};

export type Purchase = {
  id: string;
  user_id: string;
  course_id: string;
  amount_paid: number;
  payment_status: PaymentStatus;
  payment_reference: string | null;
  purchased_at: string;
};

export type SessionUser = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: Role;
};

export type StudentUser = SessionUser & {
  created_at: string;
  enrolled_count: number;
  total_spent: number;
};

export type SubscriptionItem = {
  id: string;
  user_id: string;
  course_id: string;
  student_name: string;
  student_email: string;
  course_title: string;
  course_thumbnail: string | null;
  amount_paid: number;
  payment_status: PaymentStatus;
  payment_reference: string | null;
  purchased_at: string;
};

export type CourseInput = {
  title: string;
  description: string;
  thumbnail_url: string | null;
  price: number;
  is_published: boolean;
  metadata: CourseMetadata;
};

export type ActionState = {
  error?: string;
  ok?: boolean;
  message?: string;
};

export type LearningItem = {
  id: string;
  title: string;
  thumbnail_url: string | null;
  partner: string;
  lessonIds: string[];
  firstLessonId: string | null;
  purchased_at: string;
};

export type AdminStats = {
  users: number;
  courses: number;
  published: number;
  enrollments: number;
  revenue: number;
  recent: {
    id: string;
    learner: string;
    course: string;
    amount: number;
    status: PaymentStatus;
    purchased_at: string;
  }[];
};

export type UserDetail = {
  profile: SessionUser & { created_at: string };
  purchases: {
    id: string;
    course_id: string;
    course_title: string;
    amount: number;
    status: PaymentStatus;
    purchased_at: string;
  }[];
};
