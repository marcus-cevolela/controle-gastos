import type { Transaction, TransactionCreate } from "../interfaces/Transaction";
import { API_URL } from "../config/api";

/*
busca todas as transações na API
caso dê tudo certo retorna uma lista de transações, caso ocorra alguma falha lança um erro
*/
export async function getTransactions(): Promise<Transaction[]> {
    try {
        //envia um GET para obter todas as transações
        const response = await fetch(`${API_URL}/api/Transactions`);

        //verifica se a API respondeu com sucesso
        if (!response.ok) {
            throw new Error("Erro ao buscar a lista de transações.");
        }

        //converte a resposta para uma lista de transações
        const data = await response.json() as Transaction[];

        return data;

    } catch (error) {
        //registra as informações de erro
        if (error instanceof Error) {
            console.log(error.name);
            console.log(error.message);
        }
        //repassa o erro para a página tratar
        throw error;
    }
}

export async function createTransaction(transactionCreate: TransactionCreate): Promise<Transaction> {
    try {
        //envia um POST para criar uma transação
        const response = await fetch(`${API_URL}/api/Transactions`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(transactionCreate)
        });

        //verifica se a API respondeu com sucesso
        if (!response.ok) {
            throw new Error("Erro ao criar a transação.");
        }

        //converte a resposta para um objeto transação
        const data = await response.json() as Transaction;

        return data;

    } catch (error) {
        //registra as informações de erro
        if (error instanceof Error) {
            console.log(error.name);
            console.log(error.message);
        }
        //repassa o erro para a página tratar
        throw error;
    }
}

export async function deleteTransaction(id: number): Promise<void> {
    try {
        //envia um DELETE para apagar uma transação
        const response = await fetch(`${API_URL}/api/Transactions/${id}`, {
            method: "DELETE",
        });

        //verifica se a API respondeu com sucesso
        if (!response.ok) {
            throw new Error("Erro ao apagar a transação.");
        }

    } catch (error) {
        //registra as informações de erro
        if (error instanceof Error) {
            console.log(error.name);
            console.log(error.message);
        }
        //repassa o erro para a página tratar
        throw error;
    }
}