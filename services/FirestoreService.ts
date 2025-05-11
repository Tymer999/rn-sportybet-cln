import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  arrayUnion,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

interface UserProfile {
  uid: string;
  email: string;
  phoneNumber: string;
  username: string;
  profilePicture?: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  networkProvider?: string;
  subscription?: string;
  subscriptionStatus?: "active" | "inactive";
  dateOfSubscription: Date;
  endDateOfSubscription: Date;
  currency: string;
}

// ...existing UserProfile interface...

interface Bet {
  totalOdds: number;
  maxBunus: number;
  stake: number;
  potentialReturn: number;
  bookingCode: string;
  ticketId: string;
  dateTime: string;
  status: "void" | "running" | "won" | "lost";
  matches: Array<{
    teams: {
      home: string;
      away: string;
    };
    pick: string;
    odds: number;
    market: string;
    gameId: string;
    dateTime: string;
    outcome: string;
    ftScore: string;
    matchStatus: "void" | "notStart" | "won" | "lost";
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export const createUserProfile = async (
  uid: string,
  email: string,
  phoneNumber: string,
  initialBalance: number = 0,
  currency: string = "GHS"
): Promise<void> => {
  try {
    const dateOfSubscription = new Date();
    const endDateOfSubscription = new Date(dateOfSubscription);
    endDateOfSubscription.setDate(dateOfSubscription.getDate() + 31);
    const userProfile: UserProfile = {
      uid,
      email,
      phoneNumber,
      username: email.split("@")[0], // Default username from email
      balance: initialBalance,
      profilePicture: "3.png",
      createdAt: new Date(),
      updatedAt: new Date(),
      dateOfSubscription: new Date(),
      endDateOfSubscription,
      currency,
    };

    await setDoc(doc(db, "users", uid), userProfile);
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

// ...existing user profile functions...

export const placeBet = async (
  uid: string,
  stake: number,
  dateTime: string,
  ticketId: string,
  status?: "void" | "running" | "won" | "lost",
  maxBunus?: number,
  matches?: Array<any>,
  bookingCode?: string
): Promise<string> => {
  try {
    const bet: Bet = {
      stake,
      ticketId,
      dateTime,
      totalOdds: 1.0,
      status: status || "won",
      bookingCode: bookingCode || "BOOKINGCODE",
      maxBunus: maxBunus || 1.0,
      potentialReturn: stake * 1.0,
      matches: matches || [], // Add your matches data here
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const betsCollectionRef = collection(db, "users", uid, "bets");
    const docRef = await addDoc(betsCollectionRef, bet);

    // Update user balance
    const userProfile = await getUserProfile(uid);
    if (userProfile) {
      await updateUserBalance(uid, userProfile.balance - stake);
    }

    return docRef.id;
  } catch (error) {
    console.error("Error placing bet:", error);
    throw error;
  }
};

export const addMatchesToBet = async (
  uid: string,
  betId: string,
  matches: Array<{
    teams: {
      home: string;
      away: string;
    };
    pick: string;
    odds: number;
    market: string;
    gameId: string;
    dateTime: string;
    ftScore: string;
    outcome?: string;
    matchStatus: "void" | "notStart" | "won" | "lost";
  }>
) => {
  try {
    const betRef = doc(db, "users", uid, "bets", betId);
    await updateDoc(betRef, {
      matches: arrayUnion(...matches),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error adding matches:", error);
    throw error;
  }
};

// ... existing code ...
// export const getUserBets = async (uid: string) => {
//   try {
//     const betsRef = collection(db, "users", uid, "bets");
//     const q = query(betsRef, orderBy("createdAt", "desc"));
//     const querySnapshot = await getDocs(q);

//     const bets = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return bets;
//   } catch (error) {
//     console.error("Error fetching bets:", error);
//     throw error;
//   }
// };
export const getUserBets = (
  uid: string,
  onUpdate: (bets: Bet[]) => void
): (() => void) => {
  try {
    const betsRef = collection(db, "users", uid, "bets");
    const q = query(betsRef, orderBy("createdAt", "desc"));

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const bets = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...(data as Bet),
          };
        });

        onUpdate(bets);
      },
      (error) => {
        console.error("Error listening to bets:", error);
      }
    );

    // Return unsubscribe function
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up bets listener:", error);
    throw error;
  }
};

export const updateTicketDetails = async (
  uid: string,
  betId: string,
  updates: {
    stake?: number;
    ticketId?: string;
    dateTime?: string;
    bookingCode?: string;
  }
) => {
  try {
    const betRef = doc(db, "users", uid, "bets", betId);
    await updateDoc(betRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating ticket details:", error);
    throw error;
  }
};

export const deleteBet = async (uid: string, betId: string): Promise<void> => {
  try {
    const betRef = doc(db, "users", uid, "bets", betId);
    await deleteDoc(betRef);
  } catch (error) {
    console.error("Error deleting bet:", error);
    throw error;
  }
};

export const updateMatch = async (
  uid: string,
  betId: string,
  gameId: string,
  updates: {
    odds: number;
    pick: string;
    outcome: string;
    market: string;
    ftScore: string;
    matchStatus: string;
  }
) => {
  try {
    const betRef = doc(db, "users", uid, "bets", betId);
    const betDoc = await getDoc(betRef);

    if (!betDoc.exists()) {
      throw new Error("Bet not found");
    }

    const matches = betDoc
      .data()
      .matches.map((match: any) =>
        match.gameId === gameId ? { ...match, ...updates } : match
      );

    // Determine bet status based on match statuses
    let newBetStatus: "void" | "running" | "won" | "lost" = "won";

    // Check matches in priority order
    const hasLostMatch = matches.some(
      (match: { matchStatus: string }) => match.matchStatus === "lost"
    );
    const hasVoidMatch = matches.some(
      (match: { matchStatus: string }) => match.matchStatus === "void"
    );
    const hasNotStartedMatch = matches.some(
      (match: { matchStatus: string }) => match.matchStatus === "notStart"
    );
    const allMatchesWon = matches.every(
      (match: { matchStatus: string }) => match.matchStatus === "won"
    );

    if (hasLostMatch) {
      newBetStatus = "lost";
    } else if (hasVoidMatch && !hasNotStartedMatch && !hasLostMatch) {
      newBetStatus = "void";
    } else if (hasNotStartedMatch) {
      newBetStatus = "running";
    } else if (allMatchesWon) {
      newBetStatus = "won";
    } else {
      newBetStatus = "running";
    }

    await updateDoc(betRef, {
      matches,
      status: newBetStatus,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating match:", error);
    throw error;
  }
};

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserCurrency = async (
  uid: string,
  newCurrency: string
): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", uid), {
      currency: newCurrency,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user balance:", error);
    throw error;
  }
};
export const updateUserBalance = async (
  uid: string,
  newBalance: number
): Promise<void> => {
  try {
    await updateDoc(doc(db, "users", uid), {
      balance: newBalance,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user balance:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  uid: string,
  data: {
    balance?: number;
    username?: string;
    phoneNumber?: string;
    email?: string;
    profilePicture?: string;
  }
): Promise<void> => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
