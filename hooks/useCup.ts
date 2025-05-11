import { useState } from "react";

interface Bet {
  id: string;
  ticketId: string;
  dateTime: string;
  stake: number;
  status: "pending" | "running" | "won" | "lost";
  bookingCode: string;
  totalOdds: number;
  maxBunus: number;
  potentialReturn: number;
  matches: Array<{
    teams: {
      home: string;
      away: string;
    };
    prediction: string;
    odds: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

interface UseCupModalProps {
  onClose?: () => void;
  delay?: number;
}

export const useCupModal = ({ onClose, delay = 0 }: UseCupModalProps = {}) => {
  const [showCupModal, setShowCupModal] = useState(false);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);

  const openCupModal = (bet: Bet) => {
    setSelectedBet(bet);
    if (delay > 0) {
      setTimeout(() => setShowCupModal(true), delay);
    } else {
      setShowCupModal(true);
    }
  };

  const closeCupModal = () => {
    setShowCupModal(false);
    setSelectedBet(null);
    onClose?.();
  };

  return {
    showCupModal,
    selectedBet,
    openCupModal,
    closeCupModal,
  };
};
