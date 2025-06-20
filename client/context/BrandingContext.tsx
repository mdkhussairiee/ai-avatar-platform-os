import { createContext, useContext, useEffect, useState } from 'react';

export const BrandingContext = createContext<{ logoUrl?: string; themeColor?: string }>({});

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<{ logoUrl?: string; themeColor?: string }>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/me', {
      headers: { Authorization: 'Bearer ' + token },
    })
      .then((res) => res.json())
      .then((me) => {
        if (me.orgId) {
          fetch(`/api/branding/byOrgId/${me.orgId}`)
            .then((res) => res.json())
            .then((data) => setBranding(data));
        }
      });
  }, []);

  return <BrandingContext.Provider value={branding}>{children}</BrandingContext.Provider>;
}

export function useBranding() {
  return useContext(BrandingContext);
}
