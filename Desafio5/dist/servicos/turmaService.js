var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TurmaService_turmas;
import { Turma } from "../models/Turma.js";
export class TurmaService {
    constructor() {
        _TurmaService_turmas.set(this, new Map());
    }
    cadastrar(codigo, componenteCurricular) {
        if (__classPrivateFieldGet(this, _TurmaService_turmas, "f").has(codigo.trim())) {
            throw new Error("Já existe uma turma com esse código.");
        }
        const turma = new Turma(codigo, componenteCurricular);
        __classPrivateFieldGet(this, _TurmaService_turmas, "f").set(turma.codigo, turma);
        return turma;
    }
    buscarPorCodigo(codigo) {
        return __classPrivateFieldGet(this, _TurmaService_turmas, "f").get(codigo) ?? null;
    }
    matricular(codigoTurma, estudante, dataEntrada = new Date()) {
        const turma = this.buscarPorCodigo(codigoTurma);
        if (turma === null) {
            return null;
        }
        return turma.matricular(estudante, dataEntrada);
    }
    listar() {
        return Array.from(__classPrivateFieldGet(this, _TurmaService_turmas, "f").values(), turma => turma.gerarResumo());
    }
}
_TurmaService_turmas = new WeakMap();
