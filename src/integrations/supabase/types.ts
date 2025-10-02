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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "expense_approvals_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "expenses_paid_by_fkey"
            columns: ["paid_by"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "expenses_rejected_by_fkey"
            columns: ["rejected_by"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "expenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "user_profiles_reporting_to_fkey"
            columns: ["reporting_to"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["approver_id"]
          },
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_expense_summary"
            referencedColumns: ["user_id"]
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
        Relationships: []
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
      [_ in never]: never
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
