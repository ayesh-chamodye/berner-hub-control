import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Paperclip } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: number;
  message: string;
  sender_type: string;
  sender_id: number;
  created_at: string;
  is_read: boolean;
  attachment_url?: string;
  attachment_name?: string;
}

interface Ticket {
  id: number;
  ticket_number: string;
  subject: string;
  status: string;
  priority: string;
  category: string | null;
}

interface SupportChatDialogProps {
  ticketId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SupportChatDialog = ({ ticketId, open, onOpenChange }: SupportChatDialogProps) => {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      fetchTicketData();
    }
  }, [open, ticketId]);

  useEffect(() => {
    if (messages.length > 0 && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchTicketData = async () => {
    try {
      setLoading(true);
      
      // Fetch ticket details
      const { data: ticketData, error: ticketError } = await supabase
        .from("support_tickets")
        .select("*")
        .eq("id", ticketId)
        .single();

      if (ticketError) throw ticketError;
      setTicket(ticketData);

      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from("support_messages")
        .select("*")
        .eq("ticket_id", ticketId)
        .eq("is_deleted", false)
        .order("created_at", { ascending: true });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);

      // Mark unread messages as read
      await markMessagesAsRead();
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch ticket data");
    } finally {
      setLoading(false);
    }
  };

  const markMessagesAsRead = async () => {
    try {
      await supabase
        .from("support_messages")
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq("ticket_id", ticketId)
        .eq("is_read", false)
        .eq("sender_type", "user");
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !ticket) return;

    try {
      setSending(true);

      const { error } = await supabase
        .from("support_messages")
        .insert({
          ticket_id: ticketId,
          sender_id: 1, // Admin user - should be dynamic in production
          sender_type: "admin",
          message: newMessage.trim(),
          message_type: "text",
        });

      if (error) throw error;

      // Update ticket status if it was resolved/closed
      if (ticket.status === "resolved" || ticket.status === "closed") {
        await supabase
          .from("support_tickets")
          .update({ status: "in_progress" })
          .eq("id", ticketId);
      }

      setNewMessage("");
      await fetchTicketData();
      toast.success("Message sent successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {ticket?.ticket_number} - {ticket?.subject}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Badge variant="outline">{ticket?.status?.replace("_", " ")}</Badge>
            <Badge variant="outline">{ticket?.priority}</Badge>
            {ticket?.category && <Badge variant="outline">{ticket.category}</Badge>}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
              <div className="space-y-4 pb-4">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender_type === "admin" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {message.sender_type === "admin" ? "A" : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`flex flex-col gap-1 max-w-[70%] ${
                          message.sender_type === "admin" ? "items-end" : ""
                        }`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender_type === "admin"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        </div>
                        {message.attachment_url && (
                          <a
                            href={message.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <Paperclip className="h-3 w-3" />
                            {message.attachment_name}
                          </a>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.created_at)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            <div className="flex gap-2 pt-4 border-t">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="min-h-[80px] resize-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sending}
                className="self-end"
              >
                {sending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
