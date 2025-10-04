import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
import { ExpenseImageViewer } from "@/components/ExpenseImageViewer";

interface Expense {
  id: number;
  title: string;
  amount: number;
  currency: string;
  expense_date: string;
  status: string;
  category_name: string | null;
  user_name: string | null;
  mobile_number: string | null;
}

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  approved: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground",
  paid: "bg-info text-info-foreground",
};

const Expenses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [statusFilter]);

  const fetchExpenses = async () => {
    try {
      let query = supabase
        .from("vw_expense_summary")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .update({ 
          status: "approved", 
          is_approved: true,
          approved_at: new Date().toISOString() 
        } as any)
        .eq("id", id);

      if (error) throw error;
      toast.success("Expense approved successfully");
      fetchExpenses();
    } catch (error: any) {
      toast.error(error.message || "Failed to approve expense");
    }
  };

  const handleReject = async (id: number) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .update({ 
          status: "rejected",
          rejected_at: new Date().toISOString() 
        } as any)
        .eq("id", id);

      if (error) throw error;
      toast.success("Expense rejected successfully");
      fetchExpenses();
    } catch (error: any) {
      toast.error(error.message || "Failed to reject expense");
    }
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.user_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                {filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No expenses found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">
                        #{expense.id}
                      </TableCell>
                      <TableCell>{expense.user_name || "N/A"}</TableCell>
                      <TableCell>{expense.title}</TableCell>
                      <TableCell>{expense.category_name || "N/A"}</TableCell>
                      <TableCell>{Number(expense.amount).toLocaleString()}</TableCell>
                      <TableCell>{new Date(expense.expense_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[expense.status as keyof typeof statusColors]}>
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedExpenseId(expense.id);
                              setImageViewerOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {expense.status === "pending" && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-success"
                                onClick={() => handleApprove(expense.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-destructive"
                                onClick={() => handleReject(expense.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedExpenseId && (
        <ExpenseImageViewer
          expenseId={selectedExpenseId}
          open={imageViewerOpen}
          onOpenChange={setImageViewerOpen}
        />
      )}
    </div>
  );
};

export default Expenses;
