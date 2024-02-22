Para esse projeto foi utilizado npm v20.11.0

## Iniciando projeto


- Baixar dependências

```bash
npm install
```

- Iniciar servidor de desenvolviemnto:

```bash
npm run dev
```

- Iniciar json-server:

```bash
 npm run json-server
 OU
 json-server --watch lib/placeholder-data.json -p 8000"
```
- Abrir [http://localhost:3000](http://localhost:3000) no browser

## Acompanhamento
- [x] Criar página de motoristas
    - [x] listagem
    - [x] criação
    - [x] edição
    - [x] deleção
- [x] Criar página de vehicles
    - [x] listagem
    - [x] criação
    - [x] edição
    - [x] deleção
- [x] Adicionar gerenciador de estado global 
- [ ] Aplicar testes básicos em cypress
    - [x] Testar caso normal para CRUD de driver
    - [ ] Testar caso normal para CRUD de vehicle

## Proximos passos
### Refatorações
- [ ] Aplicar testes aprimorados em cypress
    - [ ] Testar caso campo inválido em formulários para CRUD de driver
    - [ ] Testar caso de erro na chamada ou envio de daods em CRUD de driver
    - [ ] Testar caso campo inválido em formulários para CRUD de driver
    - [ ] Testar caso de erro na chamada ou envio de daods em CRUD de driver
- [ ] Criar validação para formulários
    - [ ] Form de criação de driver
    - [ ] Form de edição de driver
    - [ ] Form de criação de vehicle
    - [ ] Form de edição de vehicle
- [ ] Componentizar modals de criação e edição
    - [ ] modal de form de criação de driver
    - [ ] modal de form de edição de driver
    - [ ] modal de form de criação de vehicle
    - [ ] modal de form de edição de vehicle
- [ ] Revisar estrutura de thunks de vehicleSlice

### Bugs
- [ ] Título: erro de paginação da tabela
    - Descrição: ao deletar último item de uma página diferente da primeira é lançado um erro de número da página excede a quantidade de páginas
    - Causa identificada: prop page excede quantidade de páginas
    - Solução: (TEMPORÁRIA) remover páginação

    
- [ ] Título: json-server
    - Descrição: Ao fazer um requisição DELETE em drivers, todos os drivers eram deletados
    - Causa identificada: json-server tem limitação de, ao fazer um DELETE request todos os drivers com vehicleId inexistentes, todos os drivers são deletados
    - Solução: (temporária) menu de seleção feito a partir de drivers existentes na criação de um driver
        - Obs: um veículo deve ser criado antes de criar um driver, no futuro seria interessante poder criar um vehicle apenas com placa e id a partir da criação de um driver

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
