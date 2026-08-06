import { Users, CreditCard, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPeople } from "../services/personService";
import { getTransactions } from "../services/transactionService";
import { getReport } from "../services/reportService";
import type { Report } from "../interfaces/Report";

function Home() {
    //estados
    const [peopleCount, setPeopleCount] = useState(0);
    const [transactionCount, setTransactionCount] = useState(0);
    const [report, setReport] = useState<Report | null>(null);

    useEffect(() => {
        async function loadData() {
            const people = await getPeople();
            const transactions = await getTransactions();
            const report = await getReport();

            setPeopleCount(people.length);
            setTransactionCount(transactions.length);
            setReport(report);
        }
        loadData();
    }, []);

    return (

        <main className="min-h-screen bg-slate-800 py-10">
            <div className="mx-auto max-w-5xl px-6">

                <h1 className="text-center text-blue-500 text-2xl font-bold">Controle de Gastos</h1>
                <p className="text-center text-slate-400 mb-5">Gerencie pessoas, registre transações e acompanhe relatórios financeiros de forma simples e eficiente.</p>

                {/* indicadores do sistema */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center mb-5">

                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl px-5 py-8">
                        <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-blue-500">
                            <Users size={28} />
                            Pessoas Cadastradas
                        </h3>
                        <p className="mt-4 text-3xl font-bold">{peopleCount}</p>
                    </div>

                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl px-5 py-8">
                        <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-blue-500">
                            <CreditCard size={28} />
                            Transações Registradas
                        </h3>
                        <p className="mt-4 text-3xl font-bold">{transactionCount}</p>
                    </div>

                    <div className="bg-slate-900 text-white rounded-2xl shadow-xl px-5 py-8">
                        <h3 className="flex items-center justify-center gap-2 text-lg font-bold text-blue-500">
                            <BarChart3 size={28} />
                            Saldo Líquido Atual
                        </h3>
                        <p
                            className={`mt-4 text-3xl font-bold ${report && report.saldoLiquido >= 0
                                ? "text-green-500"
                                : "text-red-500"
                                }`}
                        >
                            R$ {report?.saldoLiquido.toFixed(2)}
                        </p>
                    </div>

                </section>

                {/* atalhos para as outras páginas */}
                <section>

                    <h2 className="text-center text-blue-500 text-2xl font-bold">Acessos Rápidos</h2>
                    <p className="text-center text-slate-400 mb-5">Navegue pelas principais funcionalidades do sistema.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white flex flex-col items-center text-center">
                            <Users size={48} className="text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold">Pessoas</h3>
                            <p className="text-slate-400 mt-3 mb-6">Cadastre, visualize e gerencie todas as pessoas do sistema.</p>

                            <Link
                                to="/people"
                                className="mt-auto flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors px-5 py-2 rounded-lg font-semibold"
                            >
                                Acessar
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                        
                        <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white flex flex-col items-center text-center">
                            <CreditCard size={48} className="text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold">Transações</h3>
                            <p className="text-slate-400 mt-3 mb-6">Registre receitas e despesas vinculadas às pessoas cadastradas.</p>

                            <Link
                                to="/transactions"
                                className="mt-auto flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors px-5 py-2 rounded-lg font-semibold"
                            >
                                Acessar
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                        
                        <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white flex flex-col items-center text-center">
                            <BarChart3 size={48} className="text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold">Relatórios</h3>
                            <p className="text-slate-400 mt-3 mb-6">Consulte os totais de receitas, despesas e saldo de cada pessoa.</p>
                            
                            <Link
                                to="/report"
                                className="mt-auto flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors px-5 py-2 rounded-lg font-semibold"
                            >
                                Acessar
                                <ArrowRight size={18} />
                            </Link>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    )
}

export default Home;