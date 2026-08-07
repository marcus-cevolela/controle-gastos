import { useEffect, useState } from "react";
import { getPeople, createPerson, deletePerson } from "../services/personService";
import { getPersonReport } from "../services/reportService";
import type { Person } from "../interfaces/Person";
import type { PersonReport } from "../interfaces/PersonReport";
import { Trash2, FileText } from "lucide-react";
import PersonReportModal from "../components/PersonReportModal";

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
        //remove a pessoa da API
        await deletePerson(id);
        //atualiza a lista de pessoas
        const resposta = await getPeople();
        setPeople(resposta);
    }

    //busca o relatorio individual e abre o modal
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

                {/* lista todas as pessoas cadastradas */}
                <section>
                    <h2 className="text-center text-blue-500 text-2xl font-bold">Pessoas Cadastradas</h2>

                    {people.length === 0 ? (
                        <p className="text-center text-slate-400 mt-6">
                            Nenhuma pessoa cadastrada.
                        </p>
                    ) : (
                        //percorre todas as pessoas cadastradas e gera um card para cada
                        people.map((person) => (
                            <div key={person.id} className="flex items-center justify-between rounded-xl border p-3 md:p-4 bg-slate-900 shadow-md my-2 hover:shadow-xl hover:border-blue-500 transition-all duration-200 hover:scale-[1.02]">
                                <div>
                                    <h3 className="font-bold text-white text-lg md:text-xl">{person.name}</h3>
                                    <p className="text-sm md:text-base text-gray-500">{person.age} anos</p>
                                </div>

                                <div className="flex flex-row gap-5">
                                    {/* abre o relatório financeiro detalhado da pessoa */}
                                    <button onClick={() => handleOpenPersonReport(person.id)} className="bg-blue-500 px-2 py-2 text-white hover:bg-blue-600 rounded-xl w-16 h-16 md:w-20 md:h-20 font-bold transition-colors duration-500 cursor-pointer flex flex-col items-center justify-center gap-1 text-[10px] md:text-xs hover:scale-105"><FileText className="w-6 h-6 md:w-9 md:h-9" /> RELATÓRIO </button>

                                    <button onClick={() => handleDeletePerson(person.id)}className="bg-red-500 px-2 py-2 text-white hover:bg-red-600 rounded-xl w-16 h-16 md:w-20 md:h-20 font-bold transition-colors duration-500 cursor-pointer flex flex-col items-center justify-center gap-1 text-[10px] md:text-xs hover:scale-105"><Trash2 className="w-6 h-6 md:w-9 md:h-9" /> EXCLUIR </button>
                                </div>

                            </div>
                        ))
                    )}
                </section>

            </div>
            
            {/* modal reutilizável para exibir o relatório individual */}
            <PersonReportModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                personReport={personReport}
            />

        </main>
    )
}

export default People;