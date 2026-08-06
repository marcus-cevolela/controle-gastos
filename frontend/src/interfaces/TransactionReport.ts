import type { TransactionType } from "../enums/TransactionType";

export interface TransactionReport {
    id: number;
    description: string;
    value: number;
    type: TransactionType;
}