export const renderTitleTransaction = (service: number): string => {
  switch (service) {
    case 1:
      return 'Nạp tiền';
    case 2:
      return 'Rút tiền';
    case 3:
      return 'Nhận tiền';
    case 4:
      return 'Chuyển tiền';
    case 5:
      return 'Staking';
    case 6:
      return 'Máy đào xu';
    default:
      return 'Giao dịch';
  }
};
