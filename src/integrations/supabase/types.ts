export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          changes_summary: string | null
          created_at: string | null
          device_info: Json | null
          entity_id: number | null
          entity_type: string
          id: number
          ip_address: unknown | null
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
          user_id: number | null
        }
        Insert: {
          action: string
          changes_summary?: string | null
          created_at?: string | null
          device_info?: Json | null
          entity_id?: number | null
          entity_type: string
          id?: number
          ip_address?: unknown | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: number | null
        }
        Update: {
          action?: string
          changes_summary?: string | null
          created_at?: string | null
          device_info?: Json | null
          entity_id?: number | null
          entity_type?: string
          id?: number
          ip_address?: unknown | null
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_banners: {
        Row: {
          action_data: Json | null
          click_count: number | null
          created_at: string | null
          created_by: number | null
          description: string | null
          display_order: number | null
          end_date: string | null
          id: number
          image_path: string | null
          image_url: string
          is_active: boolean | null
          link_type: string | null
          link_url: string | null
          start_date: string | null
          storage_bucket: string | null
          target_roles: string[] | null
          title: string | null
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          action_data?: Json | null
          click_count?: number | null
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: number
          image_path?: string | null
          image_url: string
          is_active?: boolean | null
          link_type?: string | null
          link_url?: string | null
          start_date?: string | null
          storage_bucket?: string | null
          target_roles?: string[] | null
          title?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          action_data?: Json | null
          click_count?: number | null
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: number
          image_path?: string | null
          image_url?: string
          is_active?: boolean | null
          link_type?: string | null
          link_url?: string | null
          start_date?: string | null
          storage_bucket?: string | null
          target_roles?: string[] | null
          title?: string | null
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_banners_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_banners_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
        ]
      }
      app_settings: {
        Row: {
          category: string | null
          created_at: string | null
          default_value: string | null
          description: string | null
          id: number
          is_editable: boolean | null
          is_public: boolean | null
          key: string
          updated_at: string | null
          validation_rule: string | null
          value: string | null
          value_type: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          default_value?: string | null
          description?: string | null
          id?: number
          is_editable?: boolean | null
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          validation_rule?: string | null
          value?: string | null
          value_type?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          default_value?: string | null
          description?: string | null
          id?: number
          is_editable?: boolean | null
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          validation_rule?: string | null
          value?: string | null
          value_type?: string | null
        }
        Relationships: []
      }
      expense_approvals: {
        Row: {
          action: string
          approval_level: number | null
          approver_id: number
          created_at: string | null
          expense_id: number
          id: number
          is_final_approval: boolean | null
          notes: string | null
        }
        Insert: {
          action: string
          approval_level?: number | null
          approver_id: number
          created_at?: string | null
          expense_id: number
          id?: number
          is_final_approval?: boolean | null
          notes?: string | null
        }
        Update: {
          action?: string
          approval_level?: number | null
          approver_id?: number
          created_at?: string | null
          expense_id?: number
          id?: number
          is_final_approval?: boolean | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_approvals_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_approvals_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_approvals_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_approvals_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_attachments: {
        Row: {
          created_at: string | null
          expense_id: number
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: number
          is_receipt: boolean | null
          mime_type: string | null
          ocr_confidence: number | null
          ocr_processed: boolean | null
          ocr_text: string | null
          storage_bucket: string | null
          storage_path: string | null
          uploaded_at: string | null
        }
        Insert: {
          created_at?: string | null
          expense_id: number
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: number
          is_receipt?: boolean | null
          mime_type?: string | null
          ocr_confidence?: number | null
          ocr_processed?: boolean | null
          ocr_text?: string | null
          storage_bucket?: string | null
          storage_path?: string | null
          uploaded_at?: string | null
        }
        Update: {
          created_at?: string | null
          expense_id?: number
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: number
          is_receipt?: boolean | null
          mime_type?: string | null
          ocr_confidence?: number | null
          ocr_processed?: boolean | null
          ocr_text?: string | null
          storage_bucket?: string | null
          storage_path?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_attachments_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_attachments_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: number
          is_active: boolean | null
          max_amount: number | null
          name: string
          parent_id: number | null
          requires_approval: boolean | null
          requires_receipt: boolean | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean | null
          max_amount?: number | null
          name: string
          parent_id?: number | null
          requires_approval?: boolean | null
          requires_receipt?: boolean | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean | null
          max_amount?: number | null
          name?: string
          parent_id?: number | null
          requires_approval?: boolean | null
          requires_receipt?: boolean | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          approval_notes: string | null
          approved_at: string | null
          approved_by: number | null
          category_id: number | null
          category_name: string | null
          client_name: string | null
          created_at: string | null
          currency: string | null
          custom_fields: Json | null
          deleted_at: string | null
          description: string | null
          expense_date: string
          expense_time: string | null
          id: number
          is_approved: boolean | null
          is_billable: boolean | null
          is_paid: boolean | null
          is_recurring: boolean | null
          is_reimbursable: boolean | null
          is_taxable: boolean | null
          location: string | null
          location_coords: unknown | null
          paid_at: string | null
          paid_by: number | null
          payment_method: string | null
          payment_notes: string | null
          payment_reference: string | null
          recurring_frequency: string | null
          recurring_until: string | null
          reimbursed_at: string | null
          reimbursement_amount: number | null
          reimbursement_status: string | null
          rejected_at: string | null
          rejected_by: number | null
          rejection_reason: string | null
          status: string | null
          tags: string[] | null
          tax_amount: number | null
          tax_rate: number | null
          title: string
          updated_at: string | null
          user_id: number
          vendor_contact: string | null
          vendor_name: string | null
        }
        Insert: {
          amount: number
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: number | null
          category_id?: number | null
          category_name?: string | null
          client_name?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          deleted_at?: string | null
          description?: string | null
          expense_date: string
          expense_time?: string | null
          id?: number
          is_approved?: boolean | null
          is_billable?: boolean | null
          is_paid?: boolean | null
          is_recurring?: boolean | null
          is_reimbursable?: boolean | null
          is_taxable?: boolean | null
          location?: string | null
          location_coords?: unknown | null
          paid_at?: string | null
          paid_by?: number | null
          payment_method?: string | null
          payment_notes?: string | null
          payment_reference?: string | null
          recurring_frequency?: string | null
          recurring_until?: string | null
          reimbursed_at?: string | null
          reimbursement_amount?: number | null
          reimbursement_status?: string | null
          rejected_at?: string | null
          rejected_by?: number | null
          rejection_reason?: string | null
          status?: string | null
          tags?: string[] | null
          tax_amount?: number | null
          tax_rate?: number | null
          title: string
          updated_at?: string | null
          user_id: number
          vendor_contact?: string | null
          vendor_name?: string | null
        }
        Update: {
          amount?: number
          approval_notes?: string | null
          approved_at?: string | null
          approved_by?: number | null
          category_id?: number | null
          category_name?: string | null
          client_name?: string | null
          created_at?: string | null
          currency?: string | null
          custom_fields?: Json | null
          deleted_at?: string | null
          description?: string | null
          expense_date?: string
          expense_time?: string | null
          id?: number
          is_approved?: boolean | null
          is_billable?: boolean | null
          is_paid?: boolean | null
          is_recurring?: boolean | null
          is_reimbursable?: boolean | null
          is_taxable?: boolean | null
          location?: string | null
          location_coords?: unknown | null
          paid_at?: string | null
          paid_by?: number | null
          payment_method?: string | null
          payment_notes?: string | null
          payment_reference?: string | null
          recurring_frequency?: string | null
          recurring_until?: string | null
          reimbursed_at?: string | null
          reimbursement_amount?: number | null
          reimbursement_status?: string | null
          rejected_at?: string | null
          rejected_by?: number | null
          rejection_reason?: string | null
          status?: string | null
          tags?: string[] | null
          tax_amount?: number | null
          tax_rate?: number | null
          title?: string
          updated_at?: string | null
          user_id?: number
          vendor_contact?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "expense_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_paid_by_fkey"
            columns: ["paid_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_paid_by_fkey"
            columns: ["paid_by"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          created_at: string | null
          dismissed_at: string | null
          expires_at: string | null
          id: number
          is_dismissed: boolean | null
          is_read: boolean | null
          message: string
          priority: string | null
          read_at: string | null
          related_entity_id: number | null
          related_entity_type: string | null
          sent_email: boolean | null
          sent_push: boolean | null
          sent_sms: boolean | null
          title: string
          type: string
          user_id: number
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string | null
          dismissed_at?: string | null
          expires_at?: string | null
          id?: number
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message: string
          priority?: string | null
          read_at?: string | null
          related_entity_id?: number | null
          related_entity_type?: string | null
          sent_email?: boolean | null
          sent_push?: boolean | null
          sent_sms?: boolean | null
          title: string
          type: string
          user_id: number
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string | null
          dismissed_at?: string | null
          expires_at?: string | null
          id?: number
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message?: string
          priority?: string | null
          read_at?: string | null
          related_entity_id?: number | null
          related_entity_type?: string | null
          sent_email?: boolean | null
          sent_push?: boolean | null
          sent_sms?: boolean | null
          title?: string
          type?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
        ]
      }
      otp_logs: {
        Row: {
          cost: number | null
          created_at: string | null
          device_info: Json | null
          error_message: string | null
          id: number
          ip_address: unknown | null
          location_data: Json | null
          otp_type: string | null
          phone: string
          provider: string | null
          sms_id: string | null
          success: boolean
          user_agent: string | null
        }
        Insert: {
          cost?: number | null
          created_at?: string | null
          device_info?: Json | null
          error_message?: string | null
          id?: number
          ip_address?: unknown | null
          location_data?: Json | null
          otp_type?: string | null
          phone: string
          provider?: string | null
          sms_id?: string | null
          success: boolean
          user_agent?: string | null
        }
        Update: {
          cost?: number | null
          created_at?: string | null
          device_info?: Json | null
          error_message?: string | null
          id?: number
          ip_address?: unknown | null
          location_data?: Json | null
          otp_type?: string | null
          phone?: string
          provider?: string | null
          sms_id?: string | null
          success?: boolean
          user_agent?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      support_attachments: {
        Row: {
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: number
          message_id: number
          mime_type: string | null
          storage_bucket: string | null
          storage_path: string | null
          ticket_id: number
          uploaded_at: string | null
        }
        Insert: {
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: number
          message_id: number
          mime_type?: string | null
          storage_bucket?: string | null
          storage_path?: string | null
          ticket_id: number
          uploaded_at?: string | null
        }
        Update: {
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: number
          message_id?: number
          mime_type?: string | null
          storage_bucket?: string | null
          storage_path?: string | null
          ticket_id?: number
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "support_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_attachments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_messages: {
        Row: {
          attachment_name: string | null
          attachment_path: string | null
          attachment_size: number | null
          attachment_type: string | null
          attachment_url: string | null
          created_at: string | null
          deleted_at: string | null
          edited_at: string | null
          id: number
          is_deleted: boolean | null
          is_edited: boolean | null
          is_read: boolean | null
          is_reply: boolean | null
          message: string
          message_type: string | null
          metadata: Json | null
          read_at: string | null
          reply_to_id: number | null
          sender_id: number
          sender_type: string
          ticket_id: number
          updated_at: string | null
        }
        Insert: {
          attachment_name?: string | null
          attachment_path?: string | null
          attachment_size?: number | null
          attachment_type?: string | null
          attachment_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          edited_at?: string | null
          id?: number
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_read?: boolean | null
          is_reply?: boolean | null
          message: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          reply_to_id?: number | null
          sender_id: number
          sender_type: string
          ticket_id: number
          updated_at?: string | null
        }
        Update: {
          attachment_name?: string | null
          attachment_path?: string | null
          attachment_size?: number | null
          attachment_type?: string | null
          attachment_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          edited_at?: string | null
          id?: number
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_read?: boolean | null
          is_reply?: boolean | null
          message?: string
          message_type?: string | null
          metadata?: Json | null
          read_at?: string | null
          reply_to_id?: number | null
          sender_id?: number
          sender_type?: string
          ticket_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_reply_to_id_fkey"
            columns: ["reply_to_id"]
            isOneToOne: false
            referencedRelation: "support_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_at: string | null
          assigned_to: number | null
          category: string | null
          created_at: string | null
          feedback: string | null
          id: number
          last_message_at: string | null
          priority: string | null
          rating: number | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: number | null
          status: string | null
          subject: string
          ticket_number: string
          updated_at: string | null
          user_id: number
        }
        Insert: {
          assigned_at?: string | null
          assigned_to?: number | null
          category?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: number
          last_message_at?: string | null
          priority?: string | null
          rating?: number | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: number | null
          status?: string | null
          subject: string
          ticket_number: string
          updated_at?: string | null
          user_id: number
        }
        Update: {
          assigned_at?: string | null
          assigned_to?: number | null
          category?: string | null
          created_at?: string | null
          feedback?: string | null
          id?: number
          last_message_at?: string | null
          priority?: string | null
          rating?: number | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: number | null
          status?: string | null
          subject?: string
          ticket_number?: string
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
        ]
      }
      system_logs: {
        Row: {
          component: string | null
          created_at: string | null
          error_code: string | null
          error_details: Json | null
          function_name: string | null
          id: number
          level: string
          message: string
          metadata: Json | null
          stack_trace: string | null
        }
        Insert: {
          component?: string | null
          created_at?: string | null
          error_code?: string | null
          error_details?: Json | null
          function_name?: string | null
          id?: number
          level: string
          message: string
          metadata?: Json | null
          stack_trace?: string | null
        }
        Update: {
          component?: string | null
          created_at?: string | null
          error_code?: string | null
          error_details?: Json | null
          function_name?: string | null
          id?: number
          level?: string
          message?: string
          metadata?: Json | null
          stack_trace?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          alternate_mobile: string | null
          bio: string | null
          business_name: string | null
          business_registration_no: string | null
          city: string | null
          country: string | null
          cover_photo_url: string | null
          created_at: string | null
          currency: string | null
          date_of_birth: string | null
          department: string | null
          display_name: string | null
          email: string | null
          email_notifications: boolean | null
          employee_id: string | null
          first_name: string | null
          full_name: string | null
          gender: string | null
          joining_date: string | null
          language: string | null
          last_name: string | null
          nic: string | null
          notes: string | null
          passport_number: string | null
          position: string | null
          postal_code: string | null
          profile_picture_path: string | null
          profile_picture_url: string | null
          province: string | null
          push_notifications: boolean | null
          reporting_to: number | null
          sms_notifications: boolean | null
          tax_id: string | null
          timezone: string | null
          updated_at: string | null
          user_id: number
          whatsapp_number: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          alternate_mobile?: string | null
          bio?: string | null
          business_name?: string | null
          business_registration_no?: string | null
          city?: string | null
          country?: string | null
          cover_photo_url?: string | null
          created_at?: string | null
          currency?: string | null
          date_of_birth?: string | null
          department?: string | null
          display_name?: string | null
          email?: string | null
          email_notifications?: boolean | null
          employee_id?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          joining_date?: string | null
          language?: string | null
          last_name?: string | null
          nic?: string | null
          notes?: string | null
          passport_number?: string | null
          position?: string | null
          postal_code?: string | null
          profile_picture_path?: string | null
          profile_picture_url?: string | null
          province?: string | null
          push_notifications?: boolean | null
          reporting_to?: number | null
          sms_notifications?: boolean | null
          tax_id?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id: number
          whatsapp_number?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          alternate_mobile?: string | null
          bio?: string | null
          business_name?: string | null
          business_registration_no?: string | null
          city?: string | null
          country?: string | null
          cover_photo_url?: string | null
          created_at?: string | null
          currency?: string | null
          date_of_birth?: string | null
          department?: string | null
          display_name?: string | null
          email?: string | null
          email_notifications?: boolean | null
          employee_id?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          joining_date?: string | null
          language?: string | null
          last_name?: string | null
          nic?: string | null
          notes?: string | null
          passport_number?: string | null
          position?: string | null
          postal_code?: string | null
          profile_picture_path?: string | null
          profile_picture_url?: string | null
          province?: string | null
          push_notifications?: boolean | null
          reporting_to?: number | null
          sms_notifications?: boolean | null
          tax_id?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: number
          whatsapp_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_reporting_to_fkey"
            columns: ["reporting_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_reporting_to_fkey"
            columns: ["reporting_to"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          app_version: string | null
          browser: string | null
          created_at: string | null
          device_id: string | null
          device_name: string | null
          device_os: string | null
          device_type: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          last_activity_at: string | null
          location_data: Json | null
          refresh_token: string | null
          session_token: string
          terminated_at: string | null
          termination_reason: string | null
          user_agent: string | null
          user_id: number
        }
        Insert: {
          app_version?: string | null
          browser?: string | null
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          device_os?: string | null
          device_type?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity_at?: string | null
          location_data?: Json | null
          refresh_token?: string | null
          session_token: string
          terminated_at?: string | null
          termination_reason?: string | null
          user_agent?: string | null
          user_id: number
        }
        Update: {
          app_version?: string | null
          browser?: string | null
          created_at?: string | null
          device_id?: string | null
          device_name?: string | null
          device_os?: string | null
          device_type?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          last_activity_at?: string | null
          location_data?: Json | null
          refresh_token?: string | null
          session_token?: string
          terminated_at?: string | null
          termination_reason?: string | null
          user_agent?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          adm_code: string | null
          blocked_at: string | null
          blocked_reason: string | null
          country_code: string | null
          created_at: string | null
          deleted_at: string | null
          failed_login_attempts: number | null
          id: number
          is_active: boolean | null
          is_blocked: boolean | null
          is_verified: boolean | null
          last_failed_login_at: string | null
          last_login_at: string | null
          mobile_number: string
          password_hash: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          adm_code?: string | null
          blocked_at?: string | null
          blocked_reason?: string | null
          country_code?: string | null
          created_at?: string | null
          deleted_at?: string | null
          failed_login_attempts?: number | null
          id?: number
          is_active?: boolean | null
          is_blocked?: boolean | null
          is_verified?: boolean | null
          last_failed_login_at?: string | null
          last_login_at?: string | null
          mobile_number: string
          password_hash?: string | null
          role: string
          updated_at?: string | null
        }
        Update: {
          adm_code?: string | null
          blocked_at?: string | null
          blocked_reason?: string | null
          country_code?: string | null
          created_at?: string | null
          deleted_at?: string | null
          failed_login_attempts?: number | null
          id?: number
          is_active?: boolean | null
          is_blocked?: boolean | null
          is_verified?: boolean | null
          last_failed_login_at?: string | null
          last_login_at?: string | null
          mobile_number?: string
          password_hash?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      vw_expense_summary: {
        Row: {
          amount: number | null
          approver_id: number | null
          approver_name: string | null
          category_name: string | null
          created_at: string | null
          currency: string | null
          expense_date: string | null
          id: number | null
          is_approved: boolean | null
          mobile_number: string | null
          status: string | null
          title: string | null
          user_id: number | null
          user_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_details"
            referencedColumns: ["id"]
          },
        ]
      }
      vw_user_details: {
        Row: {
          adm_code: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          id: number | null
          is_active: boolean | null
          is_blocked: boolean | null
          is_verified: boolean | null
          last_login_at: string | null
          last_name: string | null
          mobile_number: string | null
          position: string | null
          profile_picture_url: string | null
          role: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      approve_expense: {
        Args: { p_approved_by: number; p_expense_id: number }
        Returns: boolean
      }
      approve_expense_advanced: {
        Args: { p_approver_id: number; p_expense_id: number; p_notes?: string }
        Returns: Json
      }
      check_otp_rate_limit: {
        Args: {
          p_max_attempts?: number
          p_phone: string
          p_time_window_minutes?: number
        }
        Returns: boolean
      }
      clean_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      clean_old_activity_logs: {
        Args: { p_days_old?: number }
        Returns: number
      }
      clean_old_notifications: {
        Args: { p_days_old?: number }
        Returns: number
      }
      clean_old_otp_logs: {
        Args: { p_days_old?: number }
        Returns: number
      }
      cleanup_old_notifications: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      create_bulk_notification: {
        Args: {
          p_message: string
          p_title: string
          p_type?: string
          p_user_ids: number[]
        }
        Returns: number
      }
      create_expense: {
        Args: {
          p_amount: number
          p_category: string
          p_description: string
          p_expense_date: string
          p_receipt_path?: string
          p_title: string
          p_user_id: number
        }
        Returns: number
      }
      create_notification: {
        Args: {
          p_message: string
          p_related_entity_id?: number
          p_related_entity_type?: string
          p_title: string
          p_type: string
          p_user_id: number
        }
        Returns: number
      }
      create_user_session: {
        Args: {
          p_device_info?: Json
          p_ip_address?: unknown
          p_session_duration_minutes?: number
          p_user_id: number
        }
        Returns: Json
      }
      create_user_with_profile: {
        Args: {
          p_email?: string
          p_first_name?: string
          p_last_name?: string
          p_mobile_number: string
          p_nic?: string
          p_role: string
        }
        Returns: Json
      }
      delete_expired_notifications: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      generate_adm_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_ticket_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_active_banners: {
        Args: { user_role?: string }
        Returns: {
          action_data: Json
          description: string
          display_order: number
          id: number
          image_url: string
          link_type: string
          link_url: string
          title: string
        }[]
      }
      get_app_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          successful_otp_attempts: number
          total_employees: number
          total_expense_amount: number
          total_expenses: number
          total_otp_attempts: number
          total_owners: number
          total_users: number
        }[]
      }
      get_dashboard_stats: {
        Args: { p_user_id?: number }
        Returns: Json
      }
      get_expenses_by_category: {
        Args: { p_end_date?: string; p_start_date?: string; p_user_id?: number }
        Returns: {
          category_name: string
          expense_count: number
          total_amount: number
        }[]
      }
      get_monthly_expense_trend: {
        Args: { p_months?: number; p_user_id?: number }
        Returns: {
          expense_count: number
          month_year: string
          total_amount: number
        }[]
      }
      get_pending_expenses_for_approver: {
        Args: { p_approver_id: number }
        Returns: {
          amount: number
          days_pending: number
          expense_date: string
          expense_id: number
          title: string
          user_name: string
        }[]
      }
      get_unread_count: {
        Args: { ticket_id_param: number; user_id_param: number }
        Returns: number
      }
      get_unread_notification_count: {
        Args: { p_user_id: number }
        Returns: number
      }
      get_user_by_mobile: {
        Args: { p_mobile_number: string }
        Returns: {
          adm_code: string
          created_at: string
          date_of_birth: string
          gender: string
          id: number
          is_active: boolean
          is_verified: boolean
          last_login_at: string
          mobile_number: string
          name: string
          nic: string
          profile_picture_path: string
          role: string
          updated_at: string
        }[]
      }
      get_user_expense_stats: {
        Args: { p_end_date?: string; p_start_date?: string; p_user_id: number }
        Returns: Json
      }
      get_user_expenses_summary: {
        Args: { p_end_date?: string; p_start_date?: string; p_user_id: number }
        Returns: {
          approved_expenses: number
          expense_count: number
          pending_expenses: number
          total_expenses: number
        }[]
      }
      log_otp_attempt: {
        Args: {
          p_error_message?: string
          p_ip_address?: unknown
          p_phone: string
          p_success: boolean
          p_user_agent?: string
        }
        Returns: number
      }
      mark_all_notifications_read: {
        Args: { p_user_id: number }
        Returns: number
      }
      mark_all_user_notifications_read: {
        Args: { p_user_id: number }
        Returns: number
      }
      mark_message_as_read: {
        Args: { message_id: number }
        Returns: undefined
      }
      mark_notification_read: {
        Args: { notification_id: string } | { p_notification_id: number }
        Returns: undefined
      }
      reject_expense: {
        Args: { p_expense_id: number; p_reason: string; p_rejector_id: number }
        Returns: Json
      }
      set_user_block_status: {
        Args: {
          p_admin_id?: number
          p_is_blocked: boolean
          p_reason?: string
          p_user_id: number
        }
        Returns: Json
      }
      system_health_check: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      update_user_last_login: {
        Args: { p_user_id: number }
        Returns: undefined
      }
      upsert_user: {
        Args: {
          p_date_of_birth?: string
          p_gender?: string
          p_mobile_number: string
          p_name?: string
          p_nic?: string
          p_role: string
        }
        Returns: number
      }
      validate_session: {
        Args: { p_session_token: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
