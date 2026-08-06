import { useEffect, useState } from "react";
import { getPeople, createPerson, deletePerson } from "../services/personService";
import { getPersonReport } from "../services/reportService";
import type { Person } from "../interfaces/Person";
import type { PersonReport } from "../interfaces/PersonReport";
import { Trash2, FileText, X, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { TransactionType } from "../enums/TransactionType";

function People() {
    //estados
    const [people, setPeople] = useState<Person[]>([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [personReport, setPersonReport] = useState<PersonReport | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    //carrega as pessoas cadastradas quando abre a página
    useEffect(() => {
        async function loadPeople() {
            const resposta = await getPeople();
            setPeople(resposta)
        }
        loadPeople();
    }, []);

    //realiza o cadastro de uma nova pessoa
    async function handleCreatePerson(e: React.FormEvent<HTMLFormElement>) {
        //impede a pagina de recarregar
        e.preventDefault();

        //verifica se tem um nome válido
        if (name.trim() === "") {
            alert("Digite um nome.");
            return;
        }

        //verifica se tem uma idade válida
        if (age <= 0) {
            alert("Digite uma idade válida.");
            return;
        }

        const person = {
            name,
            age
        }

        //envia os dados para a API
        await createPerson(person);
        //atualiza a lista de pessoas
        const resposta = await getPeople();
        setPeople(resposta)

        setName("");
        setAge(0);
    }

    //remove uma pessoa cadastrada
    async function handleDeletePerson(id: number) {
        await deletePerson(id);
        const resposta = await getPeople();
        setPeople(resposta);
    }

    //abre o modal com o relatorio individual
    async function handleOpenPersonReport(personId: number) {
        const resposta = await getPersonReport(personId);
        setPersonReport(resposta);
        setModalOpen(true);
    }

    return (
        <main className="min-h-screen bg-slate-800 py-10">

            <div className="mx-auto max-w-5xl px-6">

                <h1 className="text-center text-blue-500 text-2xl font-bold">Pessoas</h1>
                <p className="text-center text-slate-400 mb-5">Gerencia as pessoas cadastradas</p>

                <section className="bg-slate-900 text-white rounded-2xl shadow-xl p-8 mb-10">
                    <div className="text-center pb-5 ">
                        <h2 className="font-bold text-2xl">Cadastre uma nova pessoa</h2>
                        <p className="font-semibold">Preencha o formulário abaixo e realize o cadastro de uma nova pessoa</p>
                    </div>
                    <form onSubmit={handleCreatePerson} className="flex flex-col w-[80%] m-auto gap-6">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                placeholder="Digite o nome da pessoa..."
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 rounded-lg h-11 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="age">Idade</label>
                            <input
                                id="age"
                                type="number"
                                min="0"
                                value={age === 0 ? "" : age}
                                onChange={(e) => { setAge(Number(e.target.value)) }}
                                placeholder="Digite a idade da pessoa..."
                                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 rounded-lg h-11 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 h-11 cursor-pointer hover:scale-[1.02]">Cadastrar</button>
                    </form>
                </section>

                <section>
                    <h2 className="text-center text-blue-500 text-2xl font-bold">Pessoas Cadastradas</h2>

                    {people.length === 0 ? (
                        <p className="text-center text-slate-400 mt-6">
                            Nenhuma pessoa cadastrada.
                        </p>
                    ) : (
                        people.map((person) => (
                            <div key={person.id} className="flex items-center justify-between rounded-xl border p-4 bg-slate-900 shadow-md my-2 hover:shadow-xl hover:border-blue-500 transition-all duration-200 hover:scale-[1.02]">
                                <div>
                                    <h3 className="font-bold text-white text-xl">{person.name}</h3>
                                    <p className="text-base text-gray-500">{person.age} anos</p>
                                </div>

                                <div className="flex flex-row gap-5">
                                    <button onClick={() => handleOpenPersonReport(person.id)} className="bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 rounded-xl w-20 h-20 font-bold transition-colors duration-500 cursor-pointer flex flex-col items-center justify-center gap-1 text-xs hover:scale-105"><FileText size={35} /> RELATÓRIO </button>

                                    <button onClick={() => handleDeletePerson(person.id)} className="bg-red-500 px-3 py-2 text-white hover:bg-red-600 rounded-xl w-20 h-20 font-bold transition-colors duration-500 cursor-pointer flex flex-col items-center justify-center gap-1 text-xs hover:scale-105"><Trash2 size={35} /> EXCLUIR </button>
                                </div>

                            </div>
                        ))
                    )}
                </section>

            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
                    <div className="rounded-xl border border-blue-500 p-6 bg-slate-900 shadow-md max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                        <div className=" flex justify-between items-center">
                            <h1 className="text-blue-500 text-2xl font-bold">Relatório Individual</h1>
                            <button onClick={() => setModalOpen(false)} className="bg-red-500 px-3 py-2 text-white hover:bg-red-600 rounded-xl w-10 h-10 font-bold transition-colors duration-500 cursor-pointer flex flex-col items-center justify-center hover:scale-105"><X size={28} /></button>
                        </div>


                        <div className="mt-3">
                            <hr className="mt-2 mb-3 border-slate-700" />

                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-white text-2xl">{personReport?.name}</h3>
                                    <p className="text-xl text-gray-500 font-bold">{personReport?.age} anos</p>
                                </div>

                                <div className="flex flex-row gap-2">

                                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-30 h-auto border border-green-500">
                                        <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                                            <TrendingUp size={20} className="text-green-500" />
                                            Receita
                                        </h3>
                                        <p className="mt-1 text-center text-base font-bold">
                                            R$ {personReport?.totalReceitas.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-30 h-auto border border-red-500">
                                        <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                                            <TrendingDown size={20} className="text-red-500" />
                                            Despesa
                                        </h3>
                                        <p className="mt-1 text-center text-base font-bold">
                                            R$ {personReport?.totalDespesas.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-30 h-auto border border-blue-500">
                                        <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                                            <Wallet size={20} className="text-blue-500" />
                                            Saldo
                                        </h3>
                                        <p className="mt-1 text-center text-base font-bold">
                                            R$ {personReport?.saldo.toFixed(2)}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <hr className="mt-3 mb-3 border-slate-700" />

                            <h2 className="text-xl text-center font-bold text-blue-500">Transações</h2>

                            <div className="mt-3">
                                {personReport?.transactions.length === 0 ? (
                                    <p className="text-center text-slate-400 mt-6">Nenhuma transação cadastrada.</p>
                                ) : (personReport?.transactions.map((transaction) => {
                                    return (
                                        <div key={transaction.id} className={`flex justify-between items-center py-3 border-b border-slate-700 font-bold capitalize ${transaction.type === TransactionType.Receita ? "text-green-500" : "text-red-500"}`}>
                                            <p>{transaction.description}</p>
                                            <p>{transaction.type === TransactionType.Receita ? "+" : "-"} R$ {transaction.value.toFixed(2)}</p>
                                        </div>
                                    );
                                })
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </main>
    )
}

export default People;