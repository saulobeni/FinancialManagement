-- Tabela User
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL
);

-- Tabela Revenue (Receitas)
CREATE TABLE "Revenue" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cost NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL, -- Data da receita
    is_recurring BOOLEAN DEFAULT FALSE, -- Indica se é recorrente
    recurrence_date DATE DEFAULT NULL, -- Próxima data de recorrência
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
);

-- Tabela Expense (Despesas)
CREATE TABLE "Expense" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cost NUMERIC(10, 2) NOT NULL,
    date DATE NOT NULL, -- Data da despesa
    is_recurring BOOLEAN DEFAULT FALSE, -- Indica se é recorrente
    recurrence_date DATE DEFAULT NULL, -- Próxima data de recorrência
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
);
