import { BadgeDollarSign } from "lucide-react";
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
    return (
            <header className="w-full text-center">
                <div className="bg-slate-900 shadow-lg px-10 py-3 flex flex-row items-center justify-between gap-1">
                    <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <BadgeDollarSign size={52} className="text-blue-500"/>

                        <div className="text-left">
                            <h1 className="text-3xl font-bold text-white">Controle de Gastos</h1>
                            <p className="text-sm text-slate-400">Sistema de Controle Residencial</p>
                        </div>
                    </NavLink>
                    <nav className="flex flex-col gap-4 md:flex-row md:text-center">
                        <NavLink to="/" className={navLinkClass}>Home</NavLink>
                        <NavLink to="/people" className={navLinkClass}>Pessoas</NavLink>
                        <NavLink to="/transactions" className={navLinkClass}>Transações</NavLink>
                        <NavLink to="/report" className={navLinkClass}>Relatório</NavLink>
                    </nav>
                </div>
            </header>
    )
}

export default Header;