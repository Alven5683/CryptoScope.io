import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Tags, MessageSquare, Eye, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Posts", value: "24", icon: FileText, color: "text-blue-600" },
    { title: "Categories", value: "8", icon: Tags, color: "text-green-600" },
    { title: "Comments", value: "142", icon: MessageSquare, color: "text-purple-600" },
    { title: "Total Views", value: "12,847", icon: Eye, color: "text-orange-600" },
    { title: "Active Users", value: "1,234", icon: Users, color: "text-pink-600" },
    { title: "Growth", value: "+12%", icon: TrendingUp, color: "text-emerald-600" },
  ];

  const recentPosts = [
    { title: "Getting Started with React", status: "Published", views: 234 },
    { title: "Advanced TypeScript Patterns", status: "Draft", views: 0 },
    { title: "Building Modern UIs", status: "Published", views: 189 },
  ];

  const recentComments = [
    { author: "John Doe", post: "React Best Practices", content: "Great article! Very helpful..." },
    { author: "Jane Smith", post: "TypeScript Tips", content: "Thanks for sharing this..." },
    { author: "Mike Johnson", post: "CSS Grid Guide", content: "Could you explain more about..." },
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
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
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {post.status}
                      </span>
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
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
              {recentComments.map((comment, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{comment.author}</p>
                    <span className="text-xs text-muted-foreground">{comment.post}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              ))}
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