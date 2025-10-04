import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ImageOff } from "lucide-react";

interface ExpenseAttachment {
  id: number;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
}

interface ExpenseImageViewerProps {
  expenseId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExpenseImageViewer = ({ expenseId, open, onOpenChange }: ExpenseImageViewerProps) => {
  const [attachments, setAttachments] = useState<ExpenseAttachment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      fetchAttachments();
    }
  }, [open, expenseId]);

  const fetchAttachments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("expense_attachments")
        .select("*")
        .eq("expense_id", expenseId)
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      setAttachments(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch attachments");
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Expense Attachments</DialogTitle>
          <DialogDescription>
            View all images and receipts for this expense
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : attachments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ImageOff className="h-12 w-12 mb-4" />
            <p>No attachments found for this expense</p>
          </div>
        ) : (
          <div className="space-y-4">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 flex justify-between items-center">
                  <span className="font-medium text-sm">{attachment.file_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(attachment.file_size)} • {new Date(attachment.uploaded_at).toLocaleDateString()}
                  </span>
                </div>
                {attachment.file_type?.startsWith("image/") ? (
                  <img
                    src={attachment.file_url}
                    alt={attachment.file_name}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      This file type cannot be previewed
                    </p>
                    <a
                      href={attachment.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Download File
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
