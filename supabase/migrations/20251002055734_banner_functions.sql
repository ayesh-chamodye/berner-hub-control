-- Create functions for banner analytics
CREATE OR REPLACE FUNCTION increment_banner_view(banner_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE ad_banners
  SET view_count = view_count + 1
  WHERE id = banner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_banner_click(banner_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE ad_banners
  SET click_count = click_count + 1
  WHERE id = banner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION increment_banner_view IS 'Increment the view count for a banner';
COMMENT ON FUNCTION increment_banner_click IS 'Increment the click count for a banner';