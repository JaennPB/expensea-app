type NavParams = {
  LoginScreen: undefined;
  SignupScreen: { username: string };
  WelcomeScreen: undefined;
  AllDataScreen: undefined;
  ExpensesScreen: undefined;
  IncomesScreen: undefined;
  AccountScreen: undefined;
  BottomTabsNav: undefined;
  ManageDataScreen: {
    itemIdtoEdit?: string;
  };
};

interface DataObj {
  id: string;
  title: string;
  amount: string;
  description: string;
  date: string;
  type: string;
}
