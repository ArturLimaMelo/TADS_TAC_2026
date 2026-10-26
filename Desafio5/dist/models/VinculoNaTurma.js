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
var _VinculoNaTurma_estudante, _VinculoNaTurma_dataEntrada, _VinculoNaTurma_frequencia;
export class VinculoNaTurma {
    constructor(estudante, dataEntrada = new Date()) {
        _VinculoNaTurma_estudante.set(this, void 0);
        _VinculoNaTurma_dataEntrada.set(this, void 0);
        _VinculoNaTurma_frequencia.set(this, 0);
        if (!(dataEntrada instanceof Date) ||
            Number.isNaN(dataEntrada.getTime())) {
            throw new Error("A data de entrada é inválida.");
        }
        __classPrivateFieldSet(this, _VinculoNaTurma_estudante, estudante, "f");
        __classPrivateFieldSet(this, _VinculoNaTurma_dataEntrada, new Date(dataEntrada.getTime()), "f");
    }
    get matricula() {
        return __classPrivateFieldGet(this, _VinculoNaTurma_estudante, "f").matricula;
    }
    registrarFrequencia(percentual) {
        if (!Number.isFinite(percentual) ||
            percentual < 0 ||
            percentual > 100) {
            throw new Error("A frequência deve estar entre 0 e 100.");
        }
        __classPrivateFieldSet(this, _VinculoNaTurma_frequencia, percentual, "f");
    }
    gerarResumo() {
        return {
            matricula: __classPrivateFieldGet(this, _VinculoNaTurma_estudante, "f").matricula,
            nome: __classPrivateFieldGet(this, _VinculoNaTurma_estudante, "f").nome,
            curso: __classPrivateFieldGet(this, _VinculoNaTurma_estudante, "f").curso,
            dataEntrada: __classPrivateFieldGet(this, _VinculoNaTurma_dataEntrada, "f").toISOString(),
            frequencia: __classPrivateFieldGet(this, _VinculoNaTurma_frequencia, "f")
        };
    }
}
_VinculoNaTurma_estudante = new WeakMap(), _VinculoNaTurma_dataEntrada = new WeakMap(), _VinculoNaTurma_frequencia = new WeakMap();
