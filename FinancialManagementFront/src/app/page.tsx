"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button, Container, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssessmentIcon from "@mui/icons-material/Assessment";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col scroll-smooth">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4">
        <Container maxWidth="lg" className="text-center">
          <div className="flex flex-col justify-center items-center h-screen">
            <Typography variant="h3" className="font-bold mb-4 text-blue-700">
              Controle Total de Suas Finanças
            </Typography>
            <Typography variant="h6" color="textSecondary" className="mb-6">
              Organize suas receitas e despesas com facilidade e visualize seus dados
              em gráficos detalhados para uma melhor tomada de decisão financeira.
            </Typography>
            <div className="flex justify-center space-x-4">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="px-6"
                href="/pages/login"
              >
                Começar Agora
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                className="px-6"
                href="#sobre"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </Container>
      </main>

      <section id="sobre" className="bg-white py-16 px-4 min-h-[50vh]">
        <Container maxWidth="lg" className="text-center">
          <Typography variant="h4" className="font-bold mb-6 text-blue-700">
            Suas Finanças, Simples e Intuitivas
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <BarChartIcon className="text-blue-700 text-5xl mb-2" />
              <Typography className="font-bold text-blue-700">
                Gráficos Detalhados
              </Typography>
              <Typography color="textSecondary">
                Visualize suas receitas e despesas em gráficos claros, ajudando a
                identificar padrões e tomar decisões financeiras informadas.
              </Typography>
            </div>

            <div className="text-center">
              <AddCircleIcon className="text-blue-700 text-5xl mb-2" />
              <Typography className="font-bold text-blue-700">
                Adicionar Transações
              </Typography>
              <Typography color="textSecondary">
                Registre rapidamente novas receitas ou despesas em sua lista de
                transações, garantindo o controle completo do seu fluxo de caixa.
              </Typography>
            </div>

            <div className="text-center">
              <EditIcon className="text-blue-700 text-5xl mb-2" />
              <Typography className="font-bold text-blue-700">
                Editar Transações
              </Typography>
              <Typography color="textSecondary">
                Atualize informações de suas receitas e despesas sempre que necessário,
                garantindo a precisão dos seus dados.
              </Typography>
            </div>

            <div className="text-center">
              <DeleteForeverIcon className="text-blue-700 text-5xl mb-2" />
              <Typography className="font-bold text-blue-700">
                Remover Transações
              </Typography>
              <Typography color="textSecondary">
                Exclua receitas ou despesas de forma prática, mantendo sua lista de
                transações organizada e sempre atualizada.
              </Typography>
            </div>
          </div>
        </Container>
      </section>

      <section id="solucoes" className="bg-gray-100 py-16 px-4 min-h-[50vh] flex items-center">
        <Container maxWidth="lg" className="text-center">
          <Typography variant="h4" className="font-bold mb-6 text-blue-700 mt-7">
            Soluções Personalizadas para Suas Necessidades
          </Typography>
          <div className="flex justify-center space-x-6">
            <div className="flex flex-col items-center text-center max-w-xs mx-auto">
              <AccountBalanceWalletIcon className="text-blue-700 text-5xl mb-2" />
              <Typography className="font-bold text-blue-700 mb-2">
                Solução para Controle de Despesas
              </Typography>
              <Typography color="textSecondary">
                Organize suas despesas com categorias específicas, definindo orçamentos mensais e acompanhando o progresso em tempo real.
              </Typography>
            </div>

            <div className="flex flex-col items-center text-center max-w-xs mx-auto">
              <MonetizationOnIcon className="text-blue-700 text-5xl mb-2" />
              <Typography className="font-bold text-blue-700 mb-2">
                Solução para Planejamento de Investimentos
              </Typography>
              <Typography color="textSecondary">
                Acompanhe seus investimentos, visualize os retornos e obtenha insights valiosos para maximizar seus lucros.
              </Typography>
            </div>

            <div className="flex flex-col items-center text-center max-w-xs mx-auto">
              <AssessmentIcon className="text-blue-700 text-5xl mb-2" />
              <Typography className="font-bold text-blue-700 mb-2">
                Solução para Relatórios de Desempenho
              </Typography>
              <Typography color="textSecondary">
                Gere relatórios detalhados sobre sua saúde financeira, ajudando a tomar decisões estratégicas com base em dados precisos.
              </Typography>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
