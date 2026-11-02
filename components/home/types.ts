export interface CourseCardItem {
  id?: string;
  slug?: string;
  title: string;
  category: string;
  iconType: string;
  badge?: string;
  color?: string;
  tags?: string[];
  duration?: string;
  popular?: boolean;
}

export interface ComboPackItem {
  id: string;
  title: string;
  subtitle: string;
  category: "all" | "dev" | "data" | "design" | "marketing";
  enrolled: string;
  discount: string;
  rating: number;
  validity: string;
  courses: { name: string; icon: string }[];
  price?: number;
  originalPrice?: number;
}

export interface StudentReview {
  id: string;
  name: string;
  role: string;
  timeAgo: string;
  rating: number;
  avatarText: string;
  avatarColor: string;
  review: string;
  highlight?: string;
}

export interface VideoReview {
  id: string;
  name: string;
  role: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
}
