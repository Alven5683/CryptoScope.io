import { useParams } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockBlogPosts, categories } from "@/data/mockData";

const CategoryPage = () => {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const category = categories.find(c => c.slug === slug);
  const categoryPosts = mockBlogPosts.filter(post => 
    post.categorySlug === slug
  );

  // Pagination
  const totalPages = Math.ceil(categoryPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = categoryPosts.slice(startIndex, startIndex + postsPerPage);

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Category Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 text-lg px-4 py-2">{category.name}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name} Articles
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover insights and analysis in {category.name.toLowerCase()}
          </p>
          <div className="mt-4">
            <span className="text-muted-foreground">
              {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        {paginatedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  Previous
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No Articles Found</h2>
            <p className="text-muted-foreground mb-8">
              There are no articles in this category yet. Check back soon!
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-16 pt-16 border-t border-border">
          <h2 className="text-2xl font-bold mb-8 text-center">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter(c => c.slug !== slug)
              .map((otherCategory) => (
                <a
                  key={otherCategory.slug}
                  href={`/category/${otherCategory.slug}`}
                  className="text-center p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold mb-1">{otherCategory.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {otherCategory.count} articles
                  </Badge>
                </a>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
