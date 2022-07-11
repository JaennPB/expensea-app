type NavParams = {
  LoginScreen: undefined;
  SignupScreen: { username: string };
  WelcomeScreen: undefined;
  AccountScreen: undefined;
  AllDataScreen: undefined;
  ExpensesScreen: undefined;
  IncomesScreen: undefined;
  BottomTabsNav: undefined;
  ManageDataScreen: {
    itemIdtoEdit?: string | null;
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
