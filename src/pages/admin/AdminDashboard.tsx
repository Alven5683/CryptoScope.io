import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Tags, MessageSquare, Eye, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCategories: 0,
    totalComments: 0,
    pendingComments: 0
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentComments, setRecentComments] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch posts count
      const { count: postsCount } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true });

      // Fetch categories count
      const { count: categoriesCount } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      // Fetch comments count
      const { count: commentsCount } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true });

      // Fetch pending comments count
      const { count: pendingCount } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalPosts: postsCount || 0,
        totalCategories: categoriesCount || 0,
        totalComments: commentsCount || 0,
        pendingComments: pendingCount || 0
      });

      // Fetch recent posts
      const { data: posts } = await supabase
        .from('blogs')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      // Fetch recent comments
      const { data: comments } = await supabase
        .from('comments')
        .select('id, name, content, created_at, blogs(title)')
        .order('created_at', { ascending: false })
        .limit(3);

      setRecentPosts(posts || []);
      setRecentComments(comments || []);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const statsData = [
    { title: "Total Posts", value: stats.totalPosts.toString(), icon: FileText, color: "text-blue-600" },
    { title: "Categories", value: stats.totalCategories.toString(), icon: Tags, color: "text-green-600" },
    { title: "Comments", value: stats.totalComments.toString(), icon: MessageSquare, color: "text-purple-600" },
    { title: "Pending", value: stats.pendingComments.toString(), icon: Eye, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your blog.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Posts</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/blogs">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
              {recentPosts.length === 0 && (
                <p className="text-sm text-muted-foreground">No posts yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Comments</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/comments">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComments.map((comment) => (
                <div key={comment.id} className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{comment.name}</p>
                    <span className="text-xs text-muted-foreground">{comment.blogs?.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {comment.content.length > 50 ? comment.content.substring(0, 50) + "..." : comment.content}
                  </p>
                </div>
              ))}
              {recentComments.length === 0 && (
                <p className="text-sm text-muted-foreground">No comments yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/admin/blogs/new">Create New Post</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/categories">Manage Categories</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/comments">Moderate Comments</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;