import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import People from "../pages/People";
import Transactions from "../pages/Transactions";
import Report from "../pages/Report";

/*
Configuração das rotas da aplicação.
Todas as páginas utilizam o MainLayout, que compartilha o mesmo cabeçalho.
*/
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [

            //Página inicial
            {
                index: true,
                element: <Home />
            },

            // Cadastro de pessoas
            {
                path: "people",
                element: <People />
            },

            // Cadastro de transações
            {
                path: "transactions",
                element: <Transactions />
            },

            // Consulta de totais
            {
                path: "report",
                element: <Report />
            }

        ]
    }
]);