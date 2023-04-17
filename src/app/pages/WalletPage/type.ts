export type TButtonWallet = {
  id: number;
  icon: JSX.Element;
  title: string;
  path: string;
};

export type TFilterDate = {
  start: Date;
  end: Date;
};
export enum EResponseTransactions {
  Stake = 'stake',
  BuyMachine = 'Buy machine',
  // demo
  Recharge = 'recharge',
  Withdraw = 'withdraw',
  Receive = 'receive',
  Transfer = 'transfer',
}
