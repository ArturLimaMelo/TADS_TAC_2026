var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChamadoService_chamados;
import { Chamado } from "../models/Chamado.js";
export class ChamadoService {
    constructor() {
        _ChamadoService_chamados.set(this, new Map());
    }
    cadastrar(id, titulo, solicitante) {
        const chave = String(id).trim();
        if (__classPrivateFieldGet(this, _ChamadoService_chamados, "f").has(chave)) {
            throw new Error("Já existe um chamado com esse ID.");
        }
        const chamado = new Chamado(id, titulo, solicitante);
        __classPrivateFieldGet(this, _ChamadoService_chamados, "f").set(chamado.id, chamado);
        return chamado;
    }
    buscarPorId(id) {
        return __classPrivateFieldGet(this, _ChamadoService_chamados, "f").get(id) ?? null;
    }
    listar() {
        return Array.from(__classPrivateFieldGet(this, _ChamadoService_chamados, "f").values());
    }
    consultarStatus(id) {
        const chamado = this.buscarPorId(id);
        if (chamado === null) {
            return null;
        }
        return chamado.status;
    }
    iniciarAtendimento(id, responsavel) {
        const chamado = this.buscarPorId(id);
        if (chamado === null) {
            return false;
        }
        chamado.iniciarAtendimento(responsavel);
        return true;
    }
    finalizar(id) {
        const chamado = this.buscarPorId(id);
        if (chamado === null) {
            return false;
        }
        chamado.finalizar();
        return true;
    }
}
_ChamadoService_chamados = new WeakMap();
