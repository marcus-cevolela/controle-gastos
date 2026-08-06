import type { Report } from "../interfaces/Report";
import type { PersonReport } from "../interfaces/PersonReport";
import { API_URL } from "../config/api";

/*
busca o relatório geral na API.
caso dê tudo certo retorna um relatório, caso ocorra alguma falha lança um erro.
*/
export async function getReport(): Promise<Report> {
    try {
        //envia um GET para obter o relatorio
        const response = await fetch(`${API_URL}/api/Report`);

        //verifica se a API respondeu com sucesso
        if (!response.ok) {
            throw new Error("Erro ao buscar o relatório.");
        }

        //converte a resposta para um relatorio
        const data = await response.json() as Report;

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

export async function getPersonReport(personId: number): Promise<PersonReport> {
    try {
        //envia um GET para obter o relatorio individual
        const response = await fetch(`${API_URL}/api/Report/person/${personId}`);

        //verifica se a API respondeu com sucesso
        if (!response.ok) {
            throw new Error("Erro ao buscar o relatório.");
        }
        //converte a resposta para um relatorio individual
            const data = await response.json() as PersonReport;

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