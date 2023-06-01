export const renderTitleTransaction = (service: number, exchange = 0, isUSDT): string => {
  switch (service) {
    case 1:
      return 'Recharge';
    case 2:
      return 'Withdraw money';
    case 3:
      return 'Receive money';
    case 4:
      return 'Transfer money';
    case 5:
      return 'Staking';
    case 6:
      if (!isUSDT) {
        if (exchange > 0) return 'Buy';
        return 'Sell';
      } else {
        if (exchange < 0) return 'Buy';
        return 'Sell';
      }
    default:
      return 'Giao dịch';
  }
};
