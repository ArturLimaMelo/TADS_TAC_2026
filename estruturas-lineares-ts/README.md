
## Estruturas implementadas

### ArrayStack<T>
Implementação de pilha baseada em array.

Segue o princípio LIFO (Last In, First Out).

Complexidade:
- push: O(1) amortizado
- pop: O(1)
- peek: O(1)

### ShiftQueue<T>
Implementação de fila utilizando Array.shift().

Segue o princípio FIFO (First In, First Out).

Complexidade:
- enqueue: O(1) amortizado
- dequeue: O(n)
- front: O(1)

### IndexQueue<T>
Implementação de fila utilizando índices de início e fim.

Complexidade:
- enqueue: O(1) amortizado
- dequeue: O(1)
- front: O(1)

## Integração com o domínio

- HistoricoFormulario: utiliza ArrayStack<AlteracaoCampo>
  para armazenar alterações e permitir desfazer operações.

- FilaChamados: utiliza IndexQueue<Chamado>
  para organizar os chamados por ordem de chegada.

- ShiftQueue: utilizada para demonstrar as limitações
  de desempenho da operação shift().

## Comparação

A ShiftQueue apresenta custo O(n) na remoção,
pois precisa reorganizar os índices do array.

A IndexQueue realiza a remoção em O(1), pois apenas
incrementa o índice de início.

Por esse motivo, a IndexQueue é mais adequada
para filas de atendimento com muitos elementos.

## Testes

Os testes verificam:

- Operações em estruturas vazias.
- Comportamento LIFO da pilha.
- Comportamento FIFO das filas.
- Inserção e remoção de 200 elementos.
- Comparação de desempenho entre as filas.
## Resumo das complexidades

| Operação | ArrayStack | ShiftQueue | IndexQueue |
|---|---:|---:|---:|
| Inserção | O(1)* | O(1)* | O(1)* |
| Remoção | O(1) | O(n) | O(1) |
| Consulta | O(1) | O(1) | O(1) |
| Tamanho | O(1) | O(1) | O(1) |


## Justificativa das escolhas

As estruturas genéricas permite a reutilização das pilhas e filas, sem implementar uma estrutura nova para cada tipo de dado.

A `ArrayStack<T>` foi escolhida para o histórico do formulário porque permite recuperar as alterações seguindo o princípio LIFO (Last In, First Out).

A `IndexQueue<T>` foi escolhida para o atendimento de chamados porque mantém a ordem de chegada e realiza inserções e remoções em O(1), seguindo o princípio FIFO (First In, First Out).

A `ShiftQueue<T>` foi implementada para comparação de desempenho com a `IndexQueue<T>`. Sua operação dequeue() possui complexidade O(n), pois utiliza shift() para remover elementos, reorganizando os índices do array.

Por esse motivo, a `IndexQueue<T>` é mais adequada para filas com grande quantidade de elementos.
## Execução

npm install
npm run dev
npm run comparar
npm run check
npm run build