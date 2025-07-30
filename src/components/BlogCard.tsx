import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Eye, MessageCircle, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  imageUrl: string;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  commentsCount: number;
}

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  useEffect(() => {
    // Check if user has liked this post
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setIsLiked(likedPosts.includes(post.id));
  }, [post.id]);

  const handleLike = () => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    
    if (isLiked) {
      // Unlike
      const updatedLikes = likedPosts.filter((id: string) => id !== post.id);
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      // Like
      likedPosts.push(post.id);
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (featured) {
    return (
      <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
              Featured
            </Badge>
          </div>
          <CardContent className="p-6 flex flex-col justify-center">
            <div className="mb-3">
              <Badge variant="secondary" className="mr-2">
                {post.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {post.commentsCount}
                </span>
                <span>{post.readTime} min read</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {likesCount}
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-secondary/90 text-secondary-foreground">
          {post.category}
        </Badge>
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="mb-3 flex items-center text-sm text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          {formatDate(post.publishedAt)}
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors flex-1">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {post.commentsCount}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
          >
            <Heart className={`h-3 w-3 ${isLiked ? "fill-current" : ""}`} />
            {likesCount}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;