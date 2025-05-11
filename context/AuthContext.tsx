import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface UserProfile {
  uid: string;
  email: string;
  phoneNumber: string;
  currency: string;
  username: string;
  balance: number;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  dateOfSubscription: Date;
  endDateOfSubscription: import('firebase/firestore').Timestamp;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    if (user) {
      // Subscribe to user profile updates
      unsubscribeProfile = onSnapshot(
        doc(db, 'users', user.uid),
        (doc) => {
          if (doc.exists()) {
            const data = doc.data() as UserProfile;
            // Convert Firestore Timestamps to Dates
            setUserProfile(data);
          }
          setLoading(false);
        },
        (error) => {
          // console.error('Error fetching user profile:', error);
          setLoading(false);
        }
      );
    }

    return () => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);