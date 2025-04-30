// Add this function to calculate total odds

export const calculateTotalOdds = (
  matches: any
): number => {
  return matches.reduce((total: number, match: any) => total * match.odds, 1);
};
