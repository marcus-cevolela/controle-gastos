import Header from "../components/Header";
import { Outlet } from "react-router-dom";

/*
Layout principal da aplicação.
Renderiza o cabeçalho compartilhado e exibe
o conteúdo da rota atual por meio do Outlet.
*/
function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default MainLayout;