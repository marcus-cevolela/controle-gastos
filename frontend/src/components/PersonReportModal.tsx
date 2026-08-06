import type { PersonReport } from "../interfaces/PersonReport";
import { X, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { TransactionType } from "../enums/TransactionType";

interface PersonReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    personReport: PersonReport | null;
}

function PersonReportModal({ isOpen, onClose, personReport, }: PersonReportModalProps) {
    if (!isOpen || !personReport) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="rounded-xl border border-blue-500 p-6 bg-slate-900 shadow-md max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className=" flex justify-between items-center">
                    <h1 className="text-blue-500 text-2xl font-bold">Relatório Individual</h1>
                    <button onClick={onClose} className="bg-red-500 px-3 py-2 text-white hover:bg-red-600 rounded-xl w-10 h-10 font-bold transition-colors duration-500 cursor-pointer flex flex-col items-center justify-center hover:scale-105"><X size={28} /></button>
                </div>


                <div className="mt-3">
                    <hr className="mt-2 mb-3 border-slate-700" />

                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-white text-2xl">{personReport.name}</h3>
                            <p className="text-xl text-gray-500 font-bold">{personReport.age} anos</p>
                        </div>

                        <div className="flex flex-row gap-2">

                            <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-30 h-auto border border-green-500">
                                <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                                    <TrendingUp size={20} className="text-green-500" />
                                    Receita
                                </h3>
                                <p className="mt-1 text-center text-base font-bold">
                                    R$ {personReport.totalReceitas.toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-30 h-auto border border-red-500">
                                <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                                    <TrendingDown size={20} className="text-red-500" />
                                    Despesa
                                </h3>
                                <p className="mt-1 text-center text-base font-bold">
                                    R$ {personReport.totalDespesas.toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-30 h-auto border border-blue-500">
                                <h3 className="flex items-center justify-center gap-2 text-lg font-semibold">
                                    <Wallet size={20} className="text-blue-500" />
                                    Saldo
                                </h3>
                                <p className="mt-1 text-center text-base font-bold">
                                    R$ {personReport.saldo.toFixed(2)}
                                </p>
                            </div>

                        </div>
                    </div>

                    <hr className="mt-3 mb-3 border-slate-700" />

                    <h2 className="text-xl text-center font-bold text-blue-500">Transações</h2>

                    <div className="mt-3">
                        {personReport.transactions.length === 0 ? (
                            <p className="text-center text-slate-400 mt-6">Nenhuma transação cadastrada.</p>
                        ) : (personReport.transactions.map((transaction) => {
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
    )
}

export default PersonReportModal;