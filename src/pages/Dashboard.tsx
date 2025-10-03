import { useEffect, useState } from "react";
import { DollarSign, Users, Receipt, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DashboardStats {
  totalExpenses: number;
  pendingApprovals: number;
  totalUsers: number;
  approvedThisMonth: number;
}

interface RecentExpense {
  id: number;
  title: string;
  amount: number;
  status: string;
  user_name: string;
  created_at: string;
}

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  approved: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground",
  draft: "bg-muted text-muted-foreground",
  paid: "bg-info text-info-foreground",
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalExpenses: 0,
    pendingApprovals: 0,
    totalUsers: 0,
    approvedThisMonth: 0,
  });
  const [recentExpenses, setRecentExpenses] = useState<RecentExpense[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch total expenses sum
      const { data: expensesData, error: expensesError } = await supabase
        .from("expenses")
        .select("amount");
      
      if (expensesError) throw expensesError;
      
      const totalExpenses = expensesData?.reduce((sum: number, exp: any) => sum + Number(exp.amount), 0) || 0;

      // Fetch pending count
      const { count: pendingCount, error: pendingError } = await supabase
        .from("expenses")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      
      if (pendingError) throw pendingError;

      // Fetch total users
      const { count: usersCount, error: usersError } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);
      
      if (usersError) throw usersError;

      // Fetch approved this month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count: approvedCount, error: approvedError } = await supabase
        .from("expenses")
        .select("*", { count: "exact", head: true })
        .eq("status", "approved")
        .gte("approved_at", startOfMonth.toISOString());
      
      if (approvedError) throw approvedError;

      setStats({
        totalExpenses,
        pendingApprovals: pendingCount || 0,
        totalUsers: usersCount || 0,
        approvedThisMonth: approvedCount || 0,
      });

      // Fetch recent expenses with user info
      const { data: recentData, error: recentError } = await supabase
        .from("vw_expense_summary")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (recentError) throw recentError;

      setRecentExpenses(recentData || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your expense management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value={`LKR ${stats.totalExpenses.toLocaleString()}`}
          icon={DollarSign}
          variant="info"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals.toString()}
          icon={Receipt}
          variant="warning"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toString()}
          icon={Users}
          variant="success"
        />
        <StatCard
          title="Approved This Month"
          value={stats.approvedThisMonth.toString()}
          icon={CheckCircle}
          variant="success"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Latest expense submissions requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No expenses found
                  </TableCell>
                </TableRow>
              ) : (
                recentExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.user_name || "N/A"}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>LKR {Number(expense.amount).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[expense.status as keyof typeof statusColors]}>
                        {expense.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
