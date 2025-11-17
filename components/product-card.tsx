'use client';

import { Product } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const lowStock = product.quantity < 50;
  const totalValue = product.price * product.quantity;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-slide-in',
        'hover:border-primary/50 group border-border/50 hover:border-primary',
        'backdrop-blur-sm bg-background/50'
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>
          <div className="ml-2 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
            <Package className="w-5 h-5 text-primary group-hover:animate-float" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Category</span>
          <Badge variant="secondary" className="transition-all duration-200 group-hover:scale-110">{product.category}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300">
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Price</p>
            <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              ${product.price.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Quantity</p>
            <p
              className={cn(
                'text-lg font-bold transition-colors duration-300',
                lowStock ? 'text-destructive group-hover:text-destructive' : 'text-primary group-hover:text-accent'
              )}
            >
              {product.quantity}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-muted space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Total Value
            </span>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
              ${totalValue.toLocaleString()}
            </span>
          </div>
          {lowStock && (
            <div className="text-xs text-destructive bg-destructive/10 hover:bg-destructive/20 px-2 py-1 rounded flex items-center gap-1 transition-all duration-200 animate-slide-in">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              Low Stock Alert
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
