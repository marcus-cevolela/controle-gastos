export interface PersonSummary {
    id: number;
    name: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface Report {
    people: PersonSummary[];
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
}