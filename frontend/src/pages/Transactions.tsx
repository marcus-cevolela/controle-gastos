import { useEffect, useState } from "react";
import { getTransactions, createTransaction, deleteTransaction } from "../services/transactionService";
import { getPeople } from "../services/personService";
import type { Person } from "../interfaces/Person";
import type { Transaction } from "../interfaces/Transaction";
import { TransactionType } from "../enums/TransactionType";
import { Trash2 } from "lucide-react";


function Transactions() {
    //estados
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [people, setPeople] = useState<Person[]>([]);
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);
    const [type, setType] = useState<TransactionType>(TransactionType.Receita);
    const [personId, setPersonId] = useState(0);

    //carrega as transações e as pessoas cadastradas quando abre a página
    useEffect(() => {
        async function loadTransactions() {
            const resposta = await getTransactions();
            setTransactions(resposta)
        }

        async function loadPeople() {
            const resposta = await getPeople();
            setPeople(resposta);
        }

        loadTransactions();
        loadPeople();
    }, []);

    //realiza o cadastro de uma nova transação
    async function handleCreateTransaction(e: React.FormEvent<HTMLFormElement>) {
        //impede a pagina de recarregar
        e.preventDefault();

        //verifica se uma pessoa foi selecionada
        if (personId === 0) {
            alert("Selecione uma pessoa.");
            return;
        }

        //cria um objeto com os dados informados no formulário
        const transaction = {
            description,
            value,
            type,
            personId
        }

        //envia os dados para a API
        await createTransaction(transaction);
        //atualiza a lista de transações
        const resposta = await getTransactions();
        setTransactions(resposta);

        //limpa os campos do formulário
        setDescription("");
        setValue(0);
        setType(TransactionType.Receita);
        setPersonId(0);
    }

    //remove uma transação cadastrada
    async function handleDeleteTransaction(id: number) {
        await deleteTransaction(id);
        const resposta = await getTransactions();
        setTransactions(resposta);
    }

    return (
        <main className="min-h-screen bg-slate-800 py-10">

            <div className="mx-auto max-w-5xl px-6">

                <h1 className="text-center text-blue-500 text-2xl font-bold">Transações</h1>
                <p className="text-center text-slate-400 mb-5">Gerencia as transações cadastradas</p>

                <section className="bg-slate-900 text-white rounded-2xl shadow-xl p-8 mb-10">
                    <div className="text-center pb-5 ">
                        <h2 className="font-bold text-2xl">Cadastre uma nova transação</h2>
                        <p className="font-semibold">Preencha o formulário abaixo e realize o cadastro de uma nova transação</p>
                    </div>

                    <form onSubmit={handleCreateTransaction} className="flex flex-col w-[80%] m-auto gap-6">

                        <div className="flex flex-col gap-1">
                            <label htmlFor="description">Descrição</label>
                            <input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                placeholder="Digite a descrição da transação..."
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 rounded-lg h-11 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="value">Valor</label>
                            <input
                                id="value"
                                type="number"
                                step="0.01"
                                min="0"
                                value={value}
                                onChange={(e) => { setValue(Number(e.target.value)) }}
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 rounded-lg h-11 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="type">Tipo de Transação</label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => { setType(e.target.value as TransactionType) }}
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 rounded-lg h-11 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={TransactionType.Receita}>Receita</option>
                                <option value={TransactionType.Despesa}>Despesa</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="personId">Pessoa</label>
                            <select
                                id="personId"
                                value={personId}
                                onChange={(e) => { setPersonId(Number(e.target.value)) }}
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 rounded-lg h-11 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={0}>Selecione uma pessoa</option>

                                {people.map((person) => (
                                    <option key={person.id} value={person.id}>{person.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 h-11 cursor-pointer hover:scale-[1.02]">Cadastrar</button>
                    </form>
                </section>

                <section>
                    <h2 className="text-center text-blue-500 text-2xl font-bold">Transações Cadastradas</h2>

                    {transactions.length === 0 ? (
                        <p className="text-center text-slate-400 mt-6">
                            Nenhuma transação cadastrada.
                        </p>
                    ) : (
                        transactions.map((transaction) => {
                            //busca a pessoa responsável pela transação
                            const person = people.find((p) => p.id === transaction.personId);

                            return (
                                <div key={transaction.id} className="flex items-center justify-between rounded-xl border p-4 bg-slate-900 shadow-md my-2 hover:shadow-xl hover:border-blue-500 transition-all duration-200 hover:scale-[1.02]">
                                    <div>

                                        <h3 className="font-semibold text-white">
                                            {transaction.description} - R$ {transaction.value.toFixed(2)}
                                        </h3>

                                        {/* altera a cor do texto de acordo com o tipo da transação */}
                                        <p className={`text-sm font-semibold ${transaction.type === TransactionType.Receita
                                                ? "text-green-500"
                                                : "text-red-500"
                                            }`}>{transaction.type}
                                        </p>

                                        <p className="text-sm text-gray-400 font-bold">Pessoa: {person?.name}</p>

                                    </div>
                                    <button onClick={() => handleDeleteTransaction(transaction.id)} className="bg-red-500 px-3 py-2 text-white hover:bg-red-600 rounded-xl w-12 h-12 font-bold transition-colors duration-500 cursor-pointer flex items-center justify-center"><Trash2 size={20} /></button>
                                </div>
                            )
                        }
                        ))}
                </section>

            </div>

        </main>
    )
}

export default Transactions;