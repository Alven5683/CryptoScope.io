import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-blog-accent rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">B</span>
              </div>
              <span className="text-xl font-bold">BlogPulse</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your trusted source for insights on technology, finance, trading, and market analysis. 
              Stay informed with our expert-curated content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/technology" className="text-muted-foreground hover:text-primary transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/finance" className="text-muted-foreground hover:text-primary transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link to="/category/trading" className="text-muted-foreground hover:text-primary transition-colors">
                  Trading
                </Link>
              </li>
              <li>
                <Link to="/category/markets" className="text-muted-foreground hover:text-primary transition-colors">
                  Markets
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm text-center">
            © 2024 BlogPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;