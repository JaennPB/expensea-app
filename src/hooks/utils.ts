export function useReduceItems(
  data: {
    expensesArr?: DataObj[];
    incomesArr?: DataObj[];
  },
  returnType: "total" | "expenses" | "incomes"
) {
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

export function useGetDates(type: string, dataArr: DataObj[]): string[] {
  let datesArr: string[];

  if (type === "income") {
    const incomesArr = dataArr.filter((item) => item.type === "income");

    datesArr = incomesArr.map((item) => item.date);
  }

  if (type === "expense") {
    const incomesArr = dataArr.filter((item) => item.type === "expense");

    datesArr = incomesArr.map((item) => item.date);
  }

  return [...new Set(datesArr!)];
}
