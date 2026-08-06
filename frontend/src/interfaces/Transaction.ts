import type { TransactionType } from "../enums/TransactionType";

export interface Transaction {
    id: number;
    description: string;
    value: number;
    type: TransactionType;
    personId: number;
}

export interface TransactionCreate {
    description: string;
    value: number;
    type: TransactionType;
    personId: number;
}