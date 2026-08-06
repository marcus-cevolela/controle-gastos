export const TransactionType = {
    Receita: "Receita",
    Despesa: "Despesa",
} as const;

export type TransactionType =
    typeof TransactionType[keyof typeof TransactionType];