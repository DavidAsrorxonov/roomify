export type AuthState = {
  isSignedIn: boolean;
  userName: string | null;
  userId: string | null;
};

export type AuthContext = {
  isSignedIn: boolean;
  userName: string | null;
  userId: string | null;
  refreshAuth: () => Promise<boolean>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
};
