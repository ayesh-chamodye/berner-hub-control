-- Fix the handle_new_user function to have proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$;

-- Fix existing views that have security definer issues
-- Recreate vw_expense_summary without security definer
DROP VIEW IF EXISTS public.vw_expense_summary;
CREATE VIEW public.vw_expense_summary AS
SELECT 
  e.id,
  e.title,
  e.amount,
  e.currency,
  e.expense_date,
  e.status,
  e.is_approved,
  e.category_name,
  e.created_at,
  e.user_id,
  u.mobile_number,
  up.full_name as user_name,
  e.approved_by as approver_id,
  ap.full_name as approver_name
FROM expenses e
LEFT JOIN users u ON e.user_id = u.id
LEFT JOIN user_profiles up ON e.user_id = up.user_id
LEFT JOIN user_profiles ap ON e.approved_by = ap.user_id;

-- Recreate vw_user_details without security definer
DROP VIEW IF EXISTS public.vw_user_details;
CREATE VIEW public.vw_user_details AS
SELECT 
  u.id,
  u.mobile_number,
  u.role,
  u.adm_code,
  u.is_verified,
  u.is_active,
  u.is_blocked,
  u.last_login_at,
  u.created_at,
  up.first_name,
  up.last_name,
  up.full_name,
  up.email,
  up.profile_picture_url,
  up.department,
  up.position
FROM users u
LEFT JOIN user_profiles up ON u.id = up.user_id;