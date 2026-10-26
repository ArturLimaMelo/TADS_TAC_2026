var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Chamado_id, _Chamado_titulo, _Chamado_solicitante, _Chamado_responsavel, _Chamado_status;
export class Chamado {
    constructor(id, titulo, solicitante) {
        _Chamado_id.set(this, void 0);
        _Chamado_titulo.set(this, void 0);
        _Chamado_solicitante.set(this, void 0);
        _Chamado_responsavel.set(this, null);
        _Chamado_status.set(this, "ABERTO");
        if (!String(id).trim()) {
            throw new Error("O ID do chamado é obrigatório.");
        }
        if (!titulo.trim()) {
            throw new Error("O título do chamado é obrigatório.");
        }
        __classPrivateFieldSet(this, _Chamado_id, String(id).trim(), "f");
        __classPrivateFieldSet(this, _Chamado_titulo, titulo.trim(), "f");
        __classPrivateFieldSet(this, _Chamado_solicitante, solicitante, "f");
    }
    get id() {
        return __classPrivateFieldGet(this, _Chamado_id, "f");
    }
    get titulo() {
        return __classPrivateFieldGet(this, _Chamado_titulo, "f");
    }
    get status() {
        return __classPrivateFieldGet(this, _Chamado_status, "f");
    }
    get solicitante() {
        return __classPrivateFieldGet(this, _Chamado_solicitante, "f");
    }
    get responsavel() {
        return __classPrivateFieldGet(this, _Chamado_responsavel, "f");
    }
    iniciarAtendimento(responsavel) {
        if (__classPrivateFieldGet(this, _Chamado_status, "f") !== "ABERTO") {
            throw new Error("Somente chamados abertos podem iniciar atendimento.");
        }
        if (!responsavel.trim()) {
            throw new Error("Informe o nome do responsável pelo atendimento.");
        }
        __classPrivateFieldSet(this, _Chamado_responsavel, responsavel.trim(), "f");
        __classPrivateFieldSet(this, _Chamado_status, "EM_ATENDIMENTO", "f");
    }
    finalizar() {
        if (__classPrivateFieldGet(this, _Chamado_status, "f") !== "EM_ATENDIMENTO") {
            throw new Error("Somente chamados em atendimento podem ser finalizados.");
        }
        __classPrivateFieldSet(this, _Chamado_status, "FINALIZADO", "f");
    }
    gerarResumo() {
        return {
            id: __classPrivateFieldGet(this, _Chamado_id, "f"),
            titulo: __classPrivateFieldGet(this, _Chamado_titulo, "f"),
            solicitante: {
                matricula: __classPrivateFieldGet(this, _Chamado_solicitante, "f").matricula,
                nome: __classPrivateFieldGet(this, _Chamado_solicitante, "f").nome
            },
            responsavel: __classPrivateFieldGet(this, _Chamado_responsavel, "f"),
            status: __classPrivateFieldGet(this, _Chamado_status, "f")
        };
    }
}
_Chamado_id = new WeakMap(), _Chamado_titulo = new WeakMap(), _Chamado_solicitante = new WeakMap(), _Chamado_responsavel = new WeakMap(), _Chamado_status = new WeakMap();
Chamado.STATUS = Object.freeze({
    ABERTO: "ABERTO",
    EM_ATENDIMENTO: "EM_ATENDIMENTO",
    FINALIZADO: "FINALIZADO"
});
