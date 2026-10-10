export interface Testimonial {
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  title: string;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    user: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah.chen",
    },
    rating: 5,
    title: "Landed my dream job",
    content:
      "Prep's AI feedback was incredibly specific. It caught filler words and weak answers I never noticed. Three weeks of practice and I got the offer.",
  },
  {
    user: {
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/150?u=marcus.johnson",
    },
    rating: 5,
    title: "Feels like a real interview",
    content:
      "The tailored questions for my field were spot on. It felt like practicing with a senior engineer rather than a generic question bank.",
  },
  {
    user: {
      name: "Priya Patel",
      avatar: "https://i.pravatar.cc/150?u=priya.patel",
    },
    rating: 4,
    title: "Great for system design",
    content:
      "The progress tracking kept me accountable. I could see exactly which topics needed work and improved my system design answers fast.",
  },
  {
    user: {
      name: "David Kim",
      avatar: "https://i.pravatar.cc/150?u=david.kim",
    },
    rating: 5,
    title: "Worth every penny",
    content:
      "I went from freezing up in interviews to confidently structuring my answers. The real-time hints during practice made all the difference.",
  },
];

export const userRoles: string[] = ["user", "admin"];
