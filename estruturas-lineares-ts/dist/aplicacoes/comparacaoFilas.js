import { ShiftQueue } from "../estruturas/ShiftQueue.js";
import { IndexQueue } from "../estruturas/IndexQueue.js";
const quantidade = 100_000;
function testarShiftQueue() {
    const fila = new ShiftQueue();
    console.time("ShiftQueue - Inserção");
    for (let i = 0; i < quantidade; i++) {
        fila.enqueue(i);
    }
    console.timeEnd("ShiftQueue - Inserção");
    console.time("ShiftQueue - Remoção");
    while (!fila.isEmpty()) {
        fila.dequeue();
    }
    console.timeEnd("ShiftQueue - Remoção");
}
function testarIndexQueue() {
    const fila = new IndexQueue();
    console.time("IndexQueue - Inserção");
    for (let i = 0; i < quantidade; i++) {
        fila.enqueue(i);
    }
    console.timeEnd("IndexQueue - Inserção");
    console.time("IndexQueue - Remoção");
    while (!fila.isEmpty()) {
        fila.dequeue();
    }
    console.timeEnd("IndexQueue - Remoção");
}
testarShiftQueue();
testarIndexQueue();
