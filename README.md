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

## Proximos passos
### Refatorações
- [ ] Aplicar testes em cypress
- [ ] Criar validação para formulários
- [ ] Componentizar modals de criação e edição
- [ ] Revisar estrutura de thunks de vehicleSlice

### Bugs
- [ ] Título: json-server
    - Descrição: Ao fazer um requisição DELETE em drivers, todos os drivers eram deletados
    - Causa identificada: json-server tem limitação de, ao fazer um DELETE request todos os drivers com vehicleId inexistentes, todos os drivers são deletados
    - Solução: (temporária) menu de seleção feito a partir de drivers existentes na criação de um driver
        - Obs: um veículo deve ser criado antes de criar um driver, no futuro seria interessante poder criar um vehicle apenas com placa e id a partir da criação de um driver

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
