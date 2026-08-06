import type { TransactionReport } from "../interfaces/TransactionReport";

export interface PersonReport {
    id: number;
    name: string;
    age: number;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
    transactions: TransactionReport[];
}