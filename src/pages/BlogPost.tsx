import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Eye, MessageCircle, Calendar, ArrowLeft, Share2 } from "lucide-react";
import { mockBlogPosts, mockComments, Comment } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentForm, setCommentForm] = useState({
    name: "",
    email: "",
    content: "",
  });

  const post = mockBlogPosts.find(p => p.slug === slug);
  const relatedPosts = mockBlogPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 3);

  useEffect(() => {
    if (post) {
      // Increment view count
      setViews(post.views + 1);
      
      // Check if user has liked this post
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
      setIsLiked(likedPosts.includes(post.id));
      setLikesCount(post.likes);

      // Load comments for this post
      const postComments = mockComments.filter(c => c.postId === post.id && c.status === "approved");
      setComments(postComments);
    }
  }, [post]);

  const handleLike = () => {
    if (!post) return;
    
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    
    if (isLiked) {
      const updatedLikes = likedPosts.filter((id: string) => id !== post.id);
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikes));
      setLikesCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      likedPosts.push(post.id);
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      setLikesCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Comment Submitted",
      description: "Your comment has been submitted for review.",
    });

    // Reset form
    setCommentForm({ name: "", email: "", content: "" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Back Button */}
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to articles
            </Link>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge>{post.category}</Badge>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{post.readTime} min read</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {comments.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                    {likesCount}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
              
              <div className="space-y-6 text-foreground">
                <p>
                  In today's rapidly evolving digital landscape, understanding the intricacies of modern financial systems 
                  has become more crucial than ever. This comprehensive analysis delves deep into the fundamental concepts 
                  that are reshaping how we think about money, value, and digital assets.
                </p>
                
                <p>
                  The emergence of new technologies has created unprecedented opportunities for both individual investors 
                  and institutional players. By examining current trends and analyzing market data, we can better understand 
                  the trajectory of this exciting field.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Key Insights and Analysis</h2>
                
                <p>
                  Our research indicates several important trends that are likely to shape the future of this industry. 
                  These developments represent both opportunities and challenges for market participants at every level.
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Enhanced security measures and protocols</li>
                  <li>Improved user experience and accessibility</li>
                  <li>Greater institutional adoption and support</li>
                  <li>Regulatory clarity and compliance frameworks</li>
                  <li>Innovation in underlying technologies</li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">Looking Forward</h2>
                
                <p>
                  As we move forward, it's essential to maintain a balanced perspective on both the opportunities and risks 
                  inherent in this space. Continuous education and staying informed about developments will be key to 
                  making sound decisions.
                </p>
                
                <p>
                  The future promises exciting developments that could fundamentally change how we interact with financial 
                  systems and digital assets. By staying informed and adapting to these changes, we can position ourselves 
                  to benefit from this ongoing transformation.
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold">Leave a Comment</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your name *"
                      value={commentForm.name}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email (optional)"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <Textarea
                    placeholder="Your comment *"
                    value={commentForm.content}
                    onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    required
                  />
                  <Button type="submit">Submit Comment</Button>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-primary/20 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold">{comment.name}</h5>
                        <span className="text-sm text-muted-foreground">
                          {formatCommentDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                  
                  {comments.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Latest Posts */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Latest Posts</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockBlogPosts.slice(0, 5).map((latestPost) => (
                    <Link
                      key={latestPost.id}
                      to={`/blog/${latestPost.slug}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <img
                          src={latestPost.imageUrl}
                          alt={latestPost.title}
                          className="w-16 h-16 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {latestPost.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatCommentDate(latestPost.publishedAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Categories</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Technology", "Finance", "Trading", "Markets", "Analysis"].map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase()}`}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;