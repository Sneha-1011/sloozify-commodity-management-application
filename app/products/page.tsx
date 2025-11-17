'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth-context';
import { ProtectedRoute } from '@/components/protected-route';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Search, Filter, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function ProductsLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background animate-page-in">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Inventory Management
            </h1>
            <ThemeToggle />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isManager } = useAuth();

  const categories = [
    'All',
    'Grains',
    'Energy',
    'Metals',
    'Agricultural',
    'Textiles',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  return (
    <ProtectedRoute>
      <ProductsLayout>
        <div className="p-4 md:p-6 space-y-6 animate-page-in">
          <Card className="p-4 md:p-6 backdrop-blur border-border/50 animate-fade-in shadow-lg">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                {isManager && (
                  <Button className="h-10 gap-2 transition-all duration-200 hover:scale-105 shadow-lg">
                    <Plus className="w-4 h-4" />
                    Add Product
                  </Button>
                )}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat, index) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="whitespace-nowrap transition-all duration-200 hover:scale-105 animate-slide-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="flex flex-col items-center gap-3 animate-scale-in">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <Card className="p-12 text-center animate-fade-in border-border/50">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-lg mb-2">
                No products found
              </p>
              <p className="text-sm text-muted-foreground/70">
                Try adjusting your search or filters
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-page-in">
              {filteredProducts.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* Products Summary */}
          {filteredProducts.length > 0 && (
            <Card className="p-4 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-primary/20 animate-fade-in [animation-delay:200ms]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-1 hover:scale-105 transition-transform">
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold text-primary">
                    {filteredProducts.length}
                  </p>
                </div>
                <div className="space-y-1 hover:scale-105 transition-transform">
                  <p className="text-sm text-muted-foreground">
                    Total Quantity
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {filteredProducts.reduce(
                      (sum, p) => sum + p.quantity,
                      0
                    )}
                  </p>
                </div>
                <div className="space-y-1 hover:scale-105 transition-transform">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold text-primary">
                    $
                    {(
                      filteredProducts.reduce(
                        (sum, p) => sum + p.price * p.quantity,
                        0
                      ) / 1000
                    ).toFixed(1)}
                    K
                  </p>
                </div>
                <div className="space-y-1 hover:scale-105 transition-transform">
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <p className="text-2xl font-bold text-destructive">
                    {filteredProducts.filter((p) => p.quantity < 50).length}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </ProductsLayout>
    </ProtectedRoute>
  );
}
