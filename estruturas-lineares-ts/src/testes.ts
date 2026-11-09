import { ArrayStack } from "./estruturas/ArrayStack.js";
import { ShiftQueue } from "./estruturas/ShiftQueue.js";
import { IndexQueue } from "./estruturas/IndexQueue.js";

function verificar(
    condicao: boolean,
    mensagem: string
): void {
    if (!condicao) {
        throw new Error(`Falha: ${mensagem}`);
    }

    console.log(`OK: ${mensagem}`);
}

// Testes da pilha
const pilha = new ArrayStack<number>();

verificar(pilha.isEmpty(), "Pilha inicialmente vazia");
verificar(pilha.pop() === undefined, "Pop em pilha vazia");
verificar(pilha.peek() === undefined, "Peek em pilha vazia");

pilha.push(10);
pilha.push(20);
pilha.push(30);

verificar(pilha.size() === 3, "Tamanho da pilha");
verificar(pilha.peek() === 30, "Peek retorna último elemento");
verificar(pilha.pop() === 30, "Pop remove último elemento");
verificar(pilha.pop() === 20, "Ordem LIFO");
verificar(pilha.pop() === 10, "Remoção do último elemento");
verificar(pilha.isEmpty(), "Pilha vazia após remoções");

// Testes da ShiftQueue
const filaShift = new ShiftQueue<number>();

verificar(filaShift.isEmpty(), "ShiftQueue inicialmente vazia");
verificar(filaShift.dequeue() === undefined, "Dequeue em fila vazia");
verificar(filaShift.front() === undefined, "Front em fila vazia");

for (let i = 0; i < 200; i++) {
    filaShift.enqueue(i);
}

verificar(filaShift.size() === 200, "ShiftQueue com 200 elementos");

for (let i = 0; i < 200; i++) {
    verificar(filaShift.dequeue() === i, `ShiftQueue FIFO: ${i}`);
}

verificar(filaShift.isEmpty(), "ShiftQueue vazia após remoções");

// Testes da IndexQueue
const filaIndex = new IndexQueue<number>();

verificar(filaIndex.isEmpty(), "IndexQueue inicialmente vazia");
verificar(filaIndex.dequeue() === undefined, "Dequeue em fila vazia");
verificar(filaIndex.front() === undefined, "Front em fila vazia");

for (let i = 0; i < 200; i++) {
    filaIndex.enqueue(i);
}

verificar(filaIndex.size() === 200, "IndexQueue com 200 elementos");

for (let i = 0; i < 200; i++) {
    verificar(filaIndex.dequeue() === i, `IndexQueue FIFO: ${i}`);
}

verificar(filaIndex.isEmpty(), "IndexQueue vazia após remoções");

console.log("Todos os testes foram concluídos!");