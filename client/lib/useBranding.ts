import { useEffect, useState } from 'react';

export function useBranding(domain?: string | null) {
  const [branding, setBranding] = useState<{ logoUrl?: string; themeColor?: string }>({});

  useEffect(() => {
    if (!domain) return;
    fetch(`/api/branding?domain=${domain}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.logoUrl || data.themeColor) setBranding(data);
      });
  }, [domain]);

  return branding;
}
