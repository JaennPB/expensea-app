type NavParams = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  AllDataScreen: undefined;
  ExpensesScreen: undefined;
  IncomesScreen: undefined;
  BottomTabsNav: undefined;
  ManageDataScreen: {
    itemId?: string | null;
  };
};

interface DataObj {
  id: string;
  title: string;
  amount: string;
  date: string;
  type: string;
}
