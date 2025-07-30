import { BlogPost } from "@/components/BlogCard";

// Mock blog data for demonstration
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Decentralized Finance: What You Need to Know",
    slug: "future-of-defi-guide",
    excerpt: "Explore the revolutionary world of DeFi and discover how it's reshaping the financial landscape. From yield farming to liquidity pools, learn the fundamentals.",
    category: "Finance",
    categorySlug: "finance",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop",
    publishedAt: "2024-01-25",
    readTime: 8,
    views: 2547,
    likes: 124,
    commentsCount: 18,
  },
  {
    id: "2",
    title: "AI Trading Algorithms: The New Era of Market Analysis",
    slug: "ai-trading-algorithms-market-analysis",
    excerpt: "Discover how artificial intelligence is transforming trading strategies and market predictions. Learn about machine learning applications in finance.",
    category: "Technology",
    categorySlug: "technology",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    publishedAt: "2024-01-24",
    readTime: 12,
    views: 3891,
    likes: 267,
    commentsCount: 32,
  },
  {
    id: "3",
    title: "Understanding Market Volatility: A Complete Guide",
    slug: "understanding-market-volatility-guide",
    excerpt: "Learn how to navigate market volatility with confidence. This comprehensive guide covers risk management strategies and market timing techniques.",
    category: "Trading",
    categorySlug: "trading",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
    publishedAt: "2024-01-23",
    readTime: 6,
    views: 1923,
    likes: 89,
    commentsCount: 14,
  },
  {
    id: "4",
    title: "Cryptocurrency Regulations: Global Trends and Implications",
    slug: "cryptocurrency-regulations-global-trends",
    excerpt: "Stay updated on the latest cryptocurrency regulations worldwide and understand their impact on the digital asset ecosystem.",
    category: "Markets",
    categorySlug: "markets",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop",
    publishedAt: "2024-01-22",
    readTime: 10,
    views: 2156,
    likes: 143,
    commentsCount: 21,
  },
  {
    id: "5",
    title: "Technical Analysis Patterns Every Trader Should Know",
    slug: "technical-analysis-patterns-traders",
    excerpt: "Master the essential technical analysis patterns that can help you identify profitable trading opportunities and improve your market timing.",
    category: "Analysis",
    categorySlug: "analysis",
    imageUrl: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop",
    publishedAt: "2024-01-21",
    readTime: 15,
    views: 4234,
    likes: 312,
    commentsCount: 45,
  },
  {
    id: "6",
    title: "Building a Diversified Investment Portfolio in 2024",
    slug: "diversified-investment-portfolio-2024",
    excerpt: "Learn the principles of portfolio diversification and discover modern strategies for building wealth in today's dynamic market environment.",
    category: "Finance",
    categorySlug: "finance",
    imageUrl: "https://images.unsplash.com/photo-1559589688-fcdeb39348ee?w=800&h=400&fit=crop",
    publishedAt: "2024-01-20",
    readTime: 11,
    views: 3567,
    likes: 198,
    commentsCount: 28,
  },
];

export const categories = [
  { name: "Technology", slug: "technology", count: 45 },
  { name: "Finance", slug: "finance", count: 38 },
  { name: "Trading", slug: "trading", count: 52 },
  { name: "Markets", slug: "markets", count: 29 },
  { name: "Analysis", slug: "analysis", count: 33 },
];

export interface Comment {
  id: string;
  postId: string;
  name: string;
  email?: string;
  content: string;
  status: "pending" | "approved" | "deleted";
  createdAt: string;
}

export const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    content: "Great article! Really helped me understand DeFi better. Looking forward to more content like this.",
    status: "approved",
    createdAt: "2024-01-25T10:30:00Z",
  },
  {
    id: "2",
    postId: "1",
    name: "Sarah Chen",
    content: "The explanation of yield farming was particularly clear. Thanks for breaking down such a complex topic.",
    status: "approved",
    createdAt: "2024-01-25T14:22:00Z",
  },
  {
    id: "3",
    postId: "2",
    name: "Mike Rodriguez",
    email: "mike@example.com",
    content: "AI in trading is fascinating. Have you considered covering reinforcement learning applications?",
    status: "approved",
    createdAt: "2024-01-24T16:45:00Z",
  },
];