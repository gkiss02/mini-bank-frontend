export const eurosToCents = (euros: number): number => Math.round(euros * 100);

export const centsToEuros = (cents: number): number => cents / 100;

export const formatMoney = (amount: number): string => {
  return centsToEuros(amount).toFixed(2);
};
