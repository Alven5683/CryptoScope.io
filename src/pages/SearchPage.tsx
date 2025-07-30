import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockBlogPosts } from "@/data/mockData";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const searchResults = mockBlogPosts.filter(post => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return false;
    
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    );
  });

  // Pagination
  const totalPages = Math.ceil(searchResults.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedResults = searchResults.slice(startIndex, startIndex + postsPerPage);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      setCurrentPage(1);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Search Articles</h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for articles, topics, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-2 h-10"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-muted-foreground">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {/* Results Grid */}
        {searchQuery && searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedResults.map((post) => (
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
        ) : searchQuery && searchResults.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No Results Found</h2>
            <p className="text-muted-foreground mb-8">
              We couldn't find any articles matching "{searchQuery}". Try different keywords or browse our categories.
            </p>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Suggestions:</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Try different or more general keywords</li>
                <li>• Check your spelling</li>
                <li>• Browse our categories to discover content</li>
                <li>• Use fewer words in your search</li>
              </ul>
            </div>
          </div>
        ) : !searchQuery ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Start Your Search</h2>
            <p className="text-muted-foreground mb-8">
              Enter keywords above to find articles on technology, finance, trading, and more.
            </p>
            
            {/* Popular Searches */}
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-4">Popular Searches:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "AI Trading",
                  "DeFi",
                  "Market Analysis",
                  "Cryptocurrency",
                  "Investment",
                  "Technical Analysis"
                ].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(term);
                      setSearchParams({ q: term });
                      setCurrentPage(1);
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Recent Articles */}
        {!searchQuery && (
          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold mb-8 text-center">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockBlogPosts.slice(0, 6).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;