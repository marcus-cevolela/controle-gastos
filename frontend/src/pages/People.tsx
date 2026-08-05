import { useEffect, useState } from "react";
import { getPeople, createPerson, deletePerson } from "../services/personService";
import type { Person } from "../interfaces/Person";
import { Trash2 } from "lucide-react";

function People() {
    //estados
    const [people, setPeople] = useState<Person[]>([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

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
                                value={age}
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
                                    <h3 className="font-semibold text-white">{person.name}</h3>
                                    <p className="text-sm text-gray-500">{person.age} anos</p>
                                </div>
                                <button onClick={() => handleDeletePerson(person.id)} className="bg-red-500 px-3 py-2 text-white hover:bg-red-600 rounded-xl w-12 h-12 font-bold transition-colors duration-500 cursor-pointer flex items-center justify-center"><Trash2 size={20} /></button>
                            </div>
                        ))
                    )}
                </section>

            </div>

        </main>
    )
}

export default People;