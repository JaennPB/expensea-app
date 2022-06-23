export function useReduceItems(
  data: {
    expensesArr?: DataObj[];
    incomesArr?: DataObj[];
  },
  returnType: "total" | "expenses" | "incomes"
): number {
  const expensesSum: number | undefined = data.expensesArr?.reduce(
    (sum, expense) => sum + +expense.amount,
    0
  )!;

  const incomesSum: number | undefined = data.incomesArr?.reduce(
    (sum, income) => sum + +income.amount,
    0
  )!;

  const total = incomesSum - expensesSum;

  if (returnType === "total") {
    return total;
  } else if (returnType === "expenses") {
    return expensesSum;
  } else if (returnType === "incomes") {
    return incomesSum;
  }

  return 0;
}
