import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { img } from "./images";

export type UserRole = "traveler" | "business" | "admin" | "guide";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | undefined;
  phone?: string | undefined;
  businessName?: string | undefined;
  businessCategory?: string | undefined;
  location?: string | undefined;
  bio?: string | undefined;
  createdAt: string;
};

// Preset demo accounts for instant 1-click test and realistic scenarios
export const DEMO_ACCOUNTS: Record<UserRole, AuthUser> = {
  traveler: {
    id: "usr_traveler_01",
    name: "Sokchan Min (សុខចាន់ មីន)",
    email: "sokchan.traveler@cambodia-unlocked.kh",
    role: "traveler",
    avatar: img.travelerSokchan,
    phone: "+855 12 888 123",
    location: "Phnom Penh / Siem Reap",
    bio: "Passionate cultural explorer exploring hidden artisan villages across Siem Reap.",
    createdAt: "2026-01-15",
  },
  business: {
    id: "usr_business_01",
    name: "Chanreay Sok (ចាន់រី សុខ)",
    email: "chanreay@villagepottery.kh",
    role: "business",
    avatar: img.ownerChanreay,
    phone: "+855 12 345 678",
    businessName: "Village Pottery Studio (ស្ទូឌីយោស្មូនឆ្នាំងភូមិ)",
    businessCategory: "Community Tourism & Handicrafts",
    location: "Roluos, Siem Reap",
    bio: "Founder of Village Pottery Studio, carrying on 3 generations of Khmer ceramic arts.",
    createdAt: "2025-11-20",
  },
  admin: {
    id: "usr_admin_01",
    name: "Borey Seng (បូរី សេង)",
    email: "admin.borey@cambodia-unlocked.kh",
    role: "admin",
    avatar: img.expertHistorian,
    phone: "+855 12 999 888",
    location: "Siem Reap Provincial Office",
    bio: "Platform Lead Administrator & Tourism Ecosystem Director.",
    createdAt: "2025-08-01",
  },
  guide: {
    id: "usr_guide_01",
    name: "Dara Sok (ដារ៉ា សុខ)",
    email: "dara@guides.kh",
    role: "guide",
    avatar: img.guideDara,
    phone: "+855 12 864 200",
    location: "Siem Reap Town",
    bio: "Licensed senior heritage guide specializing in Angkor Wat and Banteay Srei history.",
    createdAt: "2025-09-10",
  },
};

const STORAGE_KEY = "cambodia_unlocked_auth_user";

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (email: string, role?: UserRole, name?: string) => AuthUser;
  quickLogin: (role: UserRole) => AuthUser;
  signup: (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string | undefined;
    businessName?: string | undefined;
    businessCategory?: string | undefined;
    location?: string | undefined;
  }) => AuthUser;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  getDashboardUrl: (role?: UserRole) => string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default to traveler for smooth initial demo experience
    return DEMO_ACCOUNTS.traveler;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user]);

  const getDashboardUrl = (targetRole?: UserRole) => {
    const r = targetRole ?? user?.role ?? "traveler";
    switch (r) {
      case "business":
        return "/business-dashboard";
      case "admin":
        return "/admin";
      case "guide":
        return "/guide-dashboard";
      case "traveler":
      default:
        return "/dashboard";
    }
  };

  const login = (email: string, role?: UserRole, name?: string): AuthUser => {
    // If it matches a demo account, use that demo account
    const matchedRole =
      role ??
      (Object.keys(DEMO_ACCOUNTS) as UserRole[]).find(
        (k) => DEMO_ACCOUNTS[k].email.toLowerCase() === email.toLowerCase()
      ) ??
      "traveler";

    const base = DEMO_ACCOUNTS[matchedRole];
    const newUser: AuthUser = {
      ...base,
      email: email || base.email,
      name: name || base.name,
      role: matchedRole,
    };
    setUser(newUser);
    return newUser;
  };

  const quickLogin = (selectedRole: UserRole): AuthUser => {
    const account = DEMO_ACCOUNTS[selectedRole] ?? DEMO_ACCOUNTS.traveler;
    setUser(account);
    return account;
  };

  const signup = (data: {
    name: string;
    email: string;
    role: UserRole;
    phone?: string | undefined;
    businessName?: string | undefined;
    businessCategory?: string | undefined;
    location?: string | undefined;
  }): AuthUser => {
    const avatar =
      data.role === "business"
        ? img.ownerChanreay
        : data.role === "admin"
        ? img.expertHistorian
        : data.role === "guide"
        ? img.guideDara
        : img.travelerSokchan;

    const newUser: AuthUser = {
      id: "usr_" + Math.random().toString(36).slice(2, 9),
      name: data.name,
      email: data.email,
      role: data.role,
      avatar,
      phone: data.phone ?? "+855 12 000 000",
      businessName: data.businessName,
      businessCategory: data.businessCategory,
      location: data.location ?? "Siem Reap, Cambodia",
      bio:
        data.role === "business"
          ? `Owner of ${data.businessName || "Local Business"} in Siem Reap.`
          : data.role === "admin"
          ? "Platform Administrator."
          : "Explorer and supporter of authentic Cambodian communities.",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role ?? null,
        login,
        quickLogin,
        signup,
        logout,
        updateUser,
        getDashboardUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
