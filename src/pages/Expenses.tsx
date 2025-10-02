import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Check, X, Eye } from "lucide-react";

const mockExpenses = [
  {
    id: 1,
    user: "John Doe",
    title: "Office Supplies",
    category: "Supplies",
    amount: "5,000",
    date: "2025-01-15",
    status: "pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    title: "Client Lunch Meeting",
    category: "Meals",
    amount: "8,500",
    date: "2025-01-14",
    status: "approved",
  },
  {
    id: 3,
    user: "Mike Johnson",
    title: "Business Travel - Colombo",
    category: "Travel",
    amount: "15,000",
    date: "2025-01-13",
    status: "pending",
  },
  {
    id: 4,
    user: "Sarah Williams",
    title: "Software License Annual",
    category: "Software",
    amount: "12,000",
    date: "2025-01-12",
    status: "approved",
  },
  {
    id: 5,
    user: "Tom Brown",
    title: "Conference Registration",
    category: "Training",
    amount: "25,000",
    date: "2025-01-11",
    status: "rejected",
  },
];

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  approved: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground",
  paid: "bg-info text-info-foreground",
};

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expense Management</h1>
        <p className="text-muted-foreground">Review and manage all expense submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Expenses</CardTitle>
          <CardDescription>Filter and manage expense submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount (LKR)</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">#{expense.id}</TableCell>
                    <TableCell>{expense.user}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[expense.status as keyof typeof statusColors]}>
                        {expense.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {expense.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline" className="text-success">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-destructive">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;
