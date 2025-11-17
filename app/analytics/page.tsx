'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';
import { TrendingUp, Activity, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background animate-page-in">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
              📈 Analytics & Reports
            </h1>
            <ThemeToggle />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState({
    trend: [] as any[],
    performance: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateTrendData = () => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      return months.map((month, i) => ({
        month,
        sales: Math.floor(Math.random() * 50000) + 20000,
        revenue: Math.floor(Math.random() * 100000) + 50000,
      }));
    };

    const generatePerformanceData = () => {
      return Array.from({ length: 12 }, (_, i) => ({
        week: `Week ${i + 1}`,
        performance: Math.floor(Math.random() * 100) + 50,
        efficiency: Math.floor(Math.random() * 100) + 40,
      }));
    };

    setTimeout(() => {
      setData({
        trend: generateTrendData(),
        performance: generatePerformanceData(),
      });
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <ProtectedRoute requiredRole="manager">
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-96">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground">Loading analytics...</p>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="manager">
      <DashboardLayout>
        <div className="p-4 md:p-6 space-y-6 animate-page-in">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="animate-slide-in border-l-4 border-l-green-500 bg-gradient-to-br from-card to-card/80">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <div className="p-2 bg-green-500/20 rounded-lg animate-pulse-glow">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">+24.5%</div>
                <p className="text-xs text-muted-foreground mt-1">vs last month</p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in border-l-4 border-l-blue-500 bg-gradient-to-br from-card to-card/80 [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Activity</CardTitle>
                <div className="p-2 bg-blue-500/20 rounded-lg animate-pulse-glow [animation-delay:0.5s]">
                  <Activity className="w-5 h-5 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">1,248</div>
                <p className="text-xs text-muted-foreground mt-1">transactions</p>
              </CardContent>
            </Card>

            <Card className="animate-slide-in border-l-4 border-l-yellow-500 bg-gradient-to-br from-card to-card/80 [animation-delay:200ms]">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
                <div className="p-2 bg-yellow-500/20 rounded-lg animate-pulse-glow [animation-delay:1s]">
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-500">98.2%</div>
                <p className="text-xs text-muted-foreground mt-1">uptime</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="animate-fade-in border-t-4 border-t-cyan-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span> Sales Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--color-foreground))" />
                    <YAxis stroke="hsl(var(--color-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--color-background))',
                        border: '2px solid hsl(180 90% 50%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      fill="hsl(180 90% 50%)"
                      stroke="hsl(180 90% 50%)"
                      fillOpacity={0.3}
                      animationDuration={800}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      fill="hsl(280 85% 60%)"
                      stroke="hsl(280 85% 60%)"
                      fillOpacity={0.3}
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="animate-fade-in border-t-4 border-t-purple-500 [animation-delay:100ms]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span> Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.performance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--color-foreground))" />
                    <YAxis stroke="hsl(var(--color-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--color-background))',
                        border: '2px solid hsl(280 85% 60%)',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="performance"
                      stroke="hsl(280 85% 60%)"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(280 85% 60%)', r: 4 }}
                      animationDuration={800}
                    />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="hsl(45 95% 55%)"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(45 95% 55%)', r: 4 }}
                      animationDuration={800}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Insights Section */}
          <Card className="animate-fade-in border-t-4 border-t-green-500 [animation-delay:200ms]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💡</span> Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 animate-slide-in">
                  <p className="font-semibold text-green-500">↑ Highest Sales</p>
                  <p className="text-sm text-muted-foreground mt-1">Electronics category showing 45% growth</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 animate-slide-in [animation-delay:50ms]">
                  <p className="font-semibold text-blue-500">📈 Peak Hours</p>
                  <p className="text-sm text-muted-foreground mt-1">Maximum activity between 10 AM - 2 PM</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 animate-slide-in [animation-delay:100ms]">
                  <p className="font-semibold text-orange-500">⚠️ Areas to Improve</p>
                  <p className="text-sm text-muted-foreground mt-1">Inventory turnover needs optimization</p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 animate-slide-in [animation-delay:150ms]">
                  <p className="font-semibold text-purple-500">🎯 Recommendations</p>
                  <p className="text-sm text-muted-foreground mt-1">Focus on mobile-first customer experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
