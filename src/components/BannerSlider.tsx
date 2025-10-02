import React, { useEffect, useState } from "react";
import { getActiveBanners, incrementBannerViewCount, incrementBannerClickCount } from "../integrations/supabase/client";

export default function BannerSlider({ userRole }: { userRole?: string }) {
  const [banners, setBanners] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      setLoading(true);
      try {
        const data = await getActiveBanners(userRole);
        setBanners(data || []);
        setCurrent(0);
        // Increment view count for first banner
        if (data && data.length > 0) {
          incrementBannerViewCount(data[0].id);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBanners();
  }, [userRole]);

  const handleNext = () => {
    const next = (current + 1) % banners.length;
    setCurrent(next);
    incrementBannerViewCount(banners[next].id);
  };

  const handlePrev = () => {
    const prev = (current - 1 + banners.length) % banners.length;
    setCurrent(prev);
    incrementBannerViewCount(banners[prev].id);
  };

  const handleClick = (banner: any) => {
    incrementBannerClickCount(banner.id);
    if (banner.link_url && banner.link_type !== "none") {
      window.open(banner.link_url, banner.link_type === "external" ? "_blank" : "_self");
    }
  };

  if (loading) return <div className="text-center py-8">Loading banners...</div>;
  if (!banners.length) return <div className="text-center py-8">No active banners</div>;

  const banner = banners[current];

  return (
    <div className="relative max-w-2xl mx-auto bg-white rounded shadow overflow-hidden">
      <img
        src={banner.image_url}
        alt={banner.title}
        className="w-full h-64 object-cover cursor-pointer"
        onClick={() => handleClick(banner)}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{banner.title}</h3>
        <p className="text-gray-700">{banner.description}</p>
        {banner.link_url && banner.link_type !== "none" && (
          <a
            href={banner.link_url}
            target={banner.link_type === "external" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-blue-600 underline"
            onClick={e => { e.preventDefault(); handleClick(banner); }}
          >
            Learn more
          </a>
        )}
      </div>
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
        <button onClick={handlePrev} className="bg-gray-200 rounded-full p-2">&#8592;</button>
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
        <button onClick={handleNext} className="bg-gray-200 rounded-full p-2">&#8594;</button>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-2 h-2 rounded-full ${idx === current ? "bg-blue-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
