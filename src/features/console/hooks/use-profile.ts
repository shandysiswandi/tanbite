import { createContext, useContext } from "react";
import type { Profile } from "../model/profile";

interface ProfileContextValue {
  profile?: Profile;
  isProfileLoading: boolean;
  isProfileError: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
}

export const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return context;
}
