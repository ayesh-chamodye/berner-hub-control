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

const recentExpenses = [
  { id: 1, user: "John Doe", title: "Office Supplies", amount: "LKR 5,000", status: "pending" },
  { id: 2, user: "Jane Smith", title: "Client Lunch", amount: "LKR 8,500", status: "approved" },
  { id: 3, user: "Mike Johnson", title: "Travel", amount: "LKR 15,000", status: "pending" },
  { id: 4, user: "Sarah Williams", title: "Software License", amount: "LKR 12,000", status: "approved" },
  { id: 5, user: "Tom Brown", title: "Conference", amount: "LKR 25,000", status: "rejected" },
];

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  approved: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground",
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your expense management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expenses"
          value="LKR 2.5M"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          variant="info"
        />
        <StatCard
          title="Pending Approvals"
          value="23"
          icon={Receipt}
          variant="warning"
        />
        <StatCard
          title="Total Users"
          value="156"
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="Approved This Month"
          value="89"
          icon={CheckCircle}
          trend={{ value: 15.3, isPositive: true }}
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
              {recentExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.user}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[expense.status as keyof typeof statusColors]}>
                      {expense.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
