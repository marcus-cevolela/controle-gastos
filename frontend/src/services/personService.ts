import type { Person, PersonCreate } from "../interfaces/Person";
import { API_URL } from "../config/api";

/*
busca todas as pessoas cadastradas na API
caso dê tudo certo retorna uma lista de pessoas, caso ocorra alguma falha lança um erro
*/
export async function getPeople(): Promise<Person[]> {
    try{
        //envia um GET para obter todas as pessoas
        const response = await fetch(`${API_URL}/api/People`);

        //verifica se a API respondeu com sucesso
        if (!response.ok) {
            throw new Error("Erro ao buscar a lista de pessoas.");
        }

        //converte a resposta para uma lista de pessoas
        const data = await response.json() as Person[];

        return data;

    } catch (error) {
        //registra as informações de erro
        if (error instanceof Error){
            console.log(error.name); 
            console.log(error.message); 
        }
        //repassa o erro para a página tratar
        throw error;
    }
}

export async function createPerson(personCreate: PersonCreate): Promise<Person> {

}

export async function deletePerson(id: number): Promise<void> {

}