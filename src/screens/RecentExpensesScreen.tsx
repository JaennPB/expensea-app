import React from "react";

import ExpensesOutput from "../components/Lists/ExpensesOutput";

const RecentExpensesScreen: React.FC = () => {
  return <ExpensesOutput period="Last 7 days" />;
};

export default RecentExpensesScreen;
