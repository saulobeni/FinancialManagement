# Instruções para Iniciar o Projeto *FinancialManagement*

Este guia detalha o processo para configurar e iniciar a aplicação **FinancialManagement**, composta por uma parte de *back-end* e outra de *front-end*.

---

## Pré-requisitos
- **Node.js** instalado (versão 18 ou superior recomendada).
- Banco de dados configurado para uso com **Prisma**.
- Ferramenta de gerenciamento de pacotes **npm**.

---

## Passos para Configuração e Execução

### 1. **Preparar os Terminais**
Abra **dois terminais** e navegue para as pastas correspondentes:

- No primeiro terminal:
  ```bash
  cd FinancialManagementBack/
  ```

- No segundo terminal:
  ```bash
  cd FinancialManagementFront/
  ```

---

### 2. **Instalar Dependências**
Em ambos os terminais, execute o comando abaixo para instalar as dependências necessárias:

```bash
npm install
```

---

### 3. **Configurar e Iniciar o Back-end**
No terminal do *back-end*:

1. Sincronize o modelo com o banco de dados usando o **Prisma**:
   ```bash
   npx prisma db push
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

### 4. **Iniciar o Front-end**
No terminal do *front-end*:

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## Pronto!
Agora você pode acessar a aplicação no navegador. Por padrão, o *front-end* será iniciado em [http://localhost:3000](http://localhost:3000). Certifique-se de que o *back-end* também está em execução para o correto funcionamento da aplicação.