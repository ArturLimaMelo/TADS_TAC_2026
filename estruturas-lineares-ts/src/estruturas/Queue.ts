export interface Queue<T> {
    enqueue(elemento: T): void;
    dequeue(): T | undefined;
    front(): T | undefined;
    isEmpty(): boolean;
    size(): number;
}