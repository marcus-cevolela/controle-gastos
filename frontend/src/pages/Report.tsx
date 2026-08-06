import { useEffect, useState } from "react";
import type { Report } from "../interfaces/Report";
import { Wallet, TrendingUp, TrendingDown, } from "lucide-react";
import type { PersonReport } from "../interfaces/PersonReport";
import { getReport, getPersonReport } from "../services/reportService";
import PersonReportModal from "../components/PersonReportModal";

function Report() {
    //estados
    const [report, setReport] = useState<Report | null>(null);
    const [personReport, setPersonReport] = useState<PersonReport | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    //carrega o relatório quando abre a página
    useEffect(() => {
        async function loadReport() {
            const resposta = await getReport();
            setReport(resposta)
        }
        loadReport();
    }, []);

    //busca o relatorio individual e abre o modal
    async function handleOpenPersonReport(personId: number) {
        const resposta = await getPersonReport(personId);
        setPersonReport(resposta);
        setModalOpen(true);
    }

    //enquanto o relátorio não carrega, exibe uma mensagem
    if (!report) {
        return (
            <main className="min-h-screen bg-slate-800 flex items-center justify-center">
                <p className="text-slate-300 text-lg animate-pulse">Carregando relatório...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-800 py-10">

            <div className="mx-auto max-w-5xl px-6">

                <h1 className="text-center text-blue-500 text-2xl font-bold">Relatórios</h1>
                <p className="text-center text-slate-400 mb-5">Visualize o resumo financeiro do sistema</p>

                {/* resumo financeiro geral do sistema */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center mb-5">

                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                            <TrendingUp size={28} className="text-green-500" />
                            Receitas
                        </h3>
                        <p className="mt-4 text-3xl font-bold">
                            R$ {report.totalReceitas.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                            <TrendingDown size={28} className="text-red-500" />
                            Despesas
                        </h3>
                        <p className="mt-4 text-3xl font-bold">
                            R$ {report.totalDespesas.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                            <Wallet size={28} className="text-blue-500" />
                            Saldo
                        </h3>
                        {/* saldo positivo fica verde e saldo negativo fica vermelho */}
                        <p
                            className={`mt-4 text-3xl font-bold ${report.saldoLiquido >= 0
                                ? "text-green-500"
                                : "text-red-500"
                                }`}
                        >
                            R$ {report.saldoLiquido.toFixed(2)}
                        </p>
                    </div>

                </section>

                {/* resumo financeiro individual de cada pessoa */}
                <section>
                    <h2 className="text-center text-blue-500 text-2xl font-bold">Resumo por Pessoa</h2>
                    <p className="text-center text-slate-400 mb-5">Visualize o resumo financeiro de cada pessoa</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center mb-5">
                        {/* percorre todas as pessoas presentes no relatório e gera um card para cada */}
                        {report.people.map((person) => {
                            return (
                                <div key={person.id} className="bg-slate-900 text-white rounded-2xl shadow-xl px-5 py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                                    <h3 className="text-2xl font-bold text-center">{person.name}</h3>
                                    <hr className="mt-1 mb-4 border-slate-700" />

                                    <div className="space-y-3">

                                        <div className="flex items-center justify-between text-green-500 font-semibold">
                                            <span className="flex items-center gap-2">
                                                <TrendingUp size={20} />
                                                Receitas
                                            </span>
                                            <span>R$ {person.totalReceitas.toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-red-500 font-semibold">
                                            <span className="flex items-center gap-2">
                                                <TrendingDown size={20} />
                                                Despesas
                                            </span>
                                            <span>R$ {person.totalDespesas.toFixed(2)}</span>
                                        </div>
                                        <hr className="border-slate-700" />

                                        <div
                                            className="flex items-center justify-between font-semibold text-blue-500"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Wallet size={20} />
                                                Saldo
                                            </span>
                                            {/* saldo positivo fica azul e saldo negativo fica vermelho */}
                                            <span className={`${person.saldo >= 0 ? "text-blue-500" : "text-red-500"
                                                }`}>R$ {person.saldo.toFixed(2)}</span>
                                        </div>
                                        
                                        {/* abre o relatório financeiro detalhado da pessoa */}
                                        <button
                                            onClick={() => handleOpenPersonReport(person.id)}
                                            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                                            Ver relatório completo
                                        </button>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>


            </div>
            {/* modal reutilizável para exibir o relatório individual */}
            <PersonReportModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                personReport={personReport}
            />
        </main>
    );
}

export default Report;