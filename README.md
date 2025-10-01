<h1 align='center'>Vite + React + TypeScript + Eslint + Prettier Template ⚡</h1>

Create a new project with Vite, React JS, TypeScript, Eslint, Prettier in just 1 second and you don't need to setup anything.

#### **Vercel Deploy: https://vite-react-ts-eslint-prettier.vercel.app**

![image](https://user-images.githubusercontent.com/70432453/170648662-2ff424b9-74e9-4754-a04d-512fe1496a3b.png)

## **Some Features 📋**

Alias Import

![image](https://user-images.githubusercontent.com/70432453/170644457-ede03cca-44e9-4543-94d3-412c9d317063.png)

Hook Warning

![image](https://user-images.githubusercontent.com/70432453/170638708-23a20ffd-156e-494a-84be-b1e1cfdb5c93.png)

Prettier Warning

![image](https://user-images.githubusercontent.com/70432453/170639043-24423ed1-73cc-4730-b270-2acea1ae0c74.png)

Etc...

## **Using 📦**

1. Clone Template

```
git clone https://github.com/igdev116/vite-react-ts-eslint-prettier.git
```

2. Install Packages

```
yarn install
```

3. Start Project

```
yarn dev
```

4. If you using git, delete the existing folder .git after cloning (open `git bash` or other terminal)

```
rm -rf .git
```

## **Options ✍️**

1. Check lint

```
yarn lint
```

2. Fix lint

```
yarn lint:fix
```

3. Check prettier

```
yarn prettier
```

4. Fix prettier

```
yarn prettier:fix
```

5. Fix lint and prettier

```
yarn format
```

# Frontend

Este projeto agora suporta integração opcional com Supabase para autenticação.

## Variáveis de Ambiente

Adicione as seguintes variáveis no seu arquivo .env (veja example.env):

- VITE_USE_SUPABASE_AUTH=true | false (habilita/desabilita autenticação via Supabase)
- VITE_USE_SUPABASE_DB=true | false (habilita/desabilita o uso do banco Supabase no lugar do backend Node)
- VITE_SUPABASE_URL= sua URL do projeto Supabase
- VITE_SUPABASE_ANON_KEY= sua anon key do Supabase

Comportamento:
- Se VITE_USE_SUPABASE_AUTH=true e as credenciais do Supabase estiverem definidas, o app utilizará Supabase Auth. 
- Se VITE_USE_SUPABASE_DB=true, os módulos de Cartas (tarot), Missões e Diário passarão a usar diretamente o banco de dados do Supabase. Caso contrário, continuarão usando a API existente (VITE_APP_AUTH_API).

## Autenticação

Quando o Supabase está habilitado:
- signIn usa supabase.auth.signInWithPassword
- signOut usa supabase.auth.signOut

O token de acesso e um objeto de usuário simplificado são persistidos em cookies para manter a compatibilidade com o restante do app.

## Banco de Dados no Supabase

Para criar as tabelas (missões, anotações/diário, cartas de tarô e perfis) e políticas (RLS) no Supabase:

1) Abra o SQL Editor do seu projeto Supabase
2) Cole e execute o conteúdo do arquivo supabase/schema.sql
3) Opcional: execute supabase/seeds.sql para dados iniciais (missões e cartas)

Principais tabelas:
- public.profiles (vinculada a auth.users)
- public.missions (missões do desafio)
- public.user_missions (progresso do usuário nas missões)
- public.diary_entries (anotações do diário do usuário)
- public.tarot_cards (catálogo de cartas)

Políticas RLS:
- Usuário autenticado lê missions e tarot_cards
- Usuário só pode CRUD nos seus próprios diary_entries e user_missions
- profiles permite o próprio usuário inserir/ler/atualizar sua linha

Observação: Caso queira gerenciar missões e cartas via painel/admin, realize inserts/updates usando a Service Role Key (bypass de RLS) ou crie políticas adicionais conforme necessidade.

