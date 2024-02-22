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
 json-server --watch lib/placeholder-data.json -p 8000
```
- Abrir [http://localhost:3000](http://localhost:3000) no browser

## Executar testes

- Iniciar servidor de desenvolviemnto:

```bash
npm run dev
```

- Executar cypress


```bash
 npm run cypress:open
```

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

- [ ] Alterar tratativa de timeout
    - ou criar uma api sem utilizar json-server ou fazer loader aparecer apenas na linha que está carregando

### Bugs
- [ ] Título: erro de paginação da tabela
    - Descrição: ao deletar último item de uma página diferente da primeira é lançado um erro de número da página excede a quantidade de páginas
    - Causa identificada: prop page excede quantidade de páginas
    - Solução: (TEMPORÁRIA) remover páginação

- [ ] Escopo: json-server
    - [ ] Título: json-server não permite que dados sejam alterados
        - Causa identificada: json-server permite GET, mas para fazer write foi necessário utilizar de outros artifícios, ver [https://github.com/kitloong/json-server-vercel/tree/main REFERENCIA]
        - Solução: (TEMPORÁRIA) adiciona setTimeOut logo após CREATE, UPDATE e DELETE

    - [ ] Título: json-server deleta todas as entries
        - Descrição: Ao fazer um requisição DELETE em drivers, todos os drivers eram deletados
        - Causa identificada: json-server tem limitação de, ao fazer um DELETE request todos os drivers com vehicleId inexistentes, todos os drivers são deletados
        - Solução: (TEMPORÁRIA) menu de seleção feito a partir de drivers existentes na criação de um driver
            - Obs: um veículo deve ser criado antes de criar um driver, no futuro seria interessante poder criar um vehicle apenas com placa e id a partir da criação de um driver
