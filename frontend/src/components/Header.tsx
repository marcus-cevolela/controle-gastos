import { useState } from "react";
import { BadgeDollarSign, Menu, X, House, Users, ReceiptText, ChartColumn } from "lucide-react";
import { NavLink } from "react-router-dom";

/*
Define as classes CSS dos links de navegação.
Destaca a página ativa e aplica os estilos padrão nas outras.
*/
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
        ? "text-blue-500 font-semibold"
        : "text-slate-300 hover:text-white transition-colors duration-200";

/*
Cabeçalho principal da aplicação.
Com o título do sistema e a navegação entre as páginas.
*/
function Header() {
    //estados
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full text-center">
            <div className="bg-slate-900 shadow-lg px-10 py-3 flex flex-row items-center justify-between gap-1">
                {menuOpen && (
                    //escurece o fundo e fecha o menu ao clicar fora dele
                    <div
                        className="fixed inset-0 bg-black/60 z-40 md:hidden"
                        onClick={() => setMenuOpen(false)}
                    />
                )}
                <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                    <BadgeDollarSign className="text-blue-500 w-9 h-9 md:w-13 md:h-13" />

                    <div className="text-left">
                        <h1 className="text-xl md:text-3xl font-bold text-white">Controle de Gastos</h1>
                        <p className="hidden md:block text-sm text-slate-400">Sistema de Controle Residencial</p>
                    </div>
                </NavLink>

                {/* menu de navegação exibido apenas em telas médias e grandes */}
                <nav className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className={navLinkClass}>Home</NavLink>
                    <NavLink to="/people" className={navLinkClass}>Pessoas</NavLink>
                    <NavLink to="/transactions" className={navLinkClass}>Transações</NavLink>
                    <NavLink to="/report" className={navLinkClass}>Relatório</NavLink>
                </nav>

                {/* botão para abrir e fechar o menu mobile */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white hover:text-blue-500 transition-colors cursor-pointer"
                >
                    {menuOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
            </div>

            {menuOpen && (
                //menu lateral exibido em dispositivos móveis
                <nav className="fixed top-0 right-0 h-screen w-72 bg-slate-900 border-l border-slate-700 shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out">
                    
                    {/* cabeçalho do menu lateral */}
                    <div className="flex items-center justify-between p-5 border-b border-slate-700">
                        <h2 className="text-white text-xl font-bold">Menu</h2>
                        <button onClick={() => setMenuOpen(false)} className="text-white hover:text-blue-500 cursor-pointer">
                            <X size={28} />
                        </button>
                    </div>
                    {/*links de navegação do menu mobile */}
                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => `${navLinkClass({ isActive })} flex items-center gap-3 px-3 py-4 rounded-lg hover:bg-slate-800`}>
                        <House size={22} />
                        Home
                    </NavLink>

                    <NavLink
                        to="/people"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => `${navLinkClass({ isActive })} flex items-center gap-3 px-3 py-4 rounded-lg hover:bg-slate-800`}>
                        <Users size={22} />
                        Pessoas
                    </NavLink>

                    <NavLink
                        to="/transactions"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => `${navLinkClass({ isActive })} flex items-center gap-3 px-3 py-4 rounded-lg hover:bg-slate-800`}>
                        <ReceiptText size={22} />
                        Transações
                    </NavLink>

                    <NavLink
                        to="/report"
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) => `${navLinkClass({ isActive })} flex items-center gap-3 px-3 py-4 rounded-lg hover:bg-slate-800`}>
                        <ChartColumn size={22} />
                        Relatório
                    </NavLink>

                </nav>
            )}
        </header>
    )
}

export default Header;