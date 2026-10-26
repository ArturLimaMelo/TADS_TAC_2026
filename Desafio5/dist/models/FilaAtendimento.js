var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FilaAtendimento_chamados;
import { Chamado } from "./Chamado.js";
export class FilaAtendimento {
    constructor() {
        _FilaAtendimento_chamados.set(this, []);
    }
    adicionar(chamado) {
        if (!(chamado instanceof Chamado)) {
            throw new Error("Chamado inválido.");
        }
        __classPrivateFieldGet(this, _FilaAtendimento_chamados, "f").push(chamado);
    }
    retirarProximo() {
        return __classPrivateFieldGet(this, _FilaAtendimento_chamados, "f").shift() ?? null;
    }
    consultarTamanho() {
        return __classPrivateFieldGet(this, _FilaAtendimento_chamados, "f").length;
    }
    estaVazia() {
        return __classPrivateFieldGet(this, _FilaAtendimento_chamados, "f").length === 0;
    }
    gerarResumo() {
        return {
            tamanho: __classPrivateFieldGet(this, _FilaAtendimento_chamados, "f").length,
            vazia: this.estaVazia(),
            chamados: __classPrivateFieldGet(this, _FilaAtendimento_chamados, "f").map(chamado => chamado.gerarResumo())
        };
    }
}
_FilaAtendimento_chamados = new WeakMap();
