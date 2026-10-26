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
var _Turma_codigo, _Turma_componenteCurricular, _Turma_vinculos;
import { Estudante } from "./Estudante.js";
import { VinculoNaTurma } from "./VinculoNaTurma.js";
export class Turma {
    constructor(codigo, componenteCurricular) {
        _Turma_codigo.set(this, void 0);
        _Turma_componenteCurricular.set(this, void 0);
        _Turma_vinculos.set(this, new Map());
        if (!codigo.trim()) {
            throw new Error("O código da turma é obrigatório.");
        }
        if (!componenteCurricular.trim()) {
            throw new Error("O componente curricular é obrigatório.");
        }
        __classPrivateFieldSet(this, _Turma_codigo, codigo.trim(), "f");
        __classPrivateFieldSet(this, _Turma_componenteCurricular, componenteCurricular.trim(), "f");
    }
    get codigo() {
        return __classPrivateFieldGet(this, _Turma_codigo, "f");
    }
    get componenteCurricular() {
        return __classPrivateFieldGet(this, _Turma_componenteCurricular, "f");
    }
    matricular(estudante, dataEntrada = new Date()) {
        if (!(estudante instanceof Estudante)) {
            throw new Error("Estudante inválido.");
        }
        const matricula = estudante.matricula;
        if (__classPrivateFieldGet(this, _Turma_vinculos, "f").has(matricula)) {
            throw new Error(`O estudante ${matricula} já está matriculado nesta turma.`);
        }
        const vinculo = new VinculoNaTurma(estudante, dataEntrada);
        __classPrivateFieldGet(this, _Turma_vinculos, "f").set(matricula, vinculo);
        return vinculo.gerarResumo();
    }
    registrarFrequencia(matricula, percentual) {
        const vinculo = __classPrivateFieldGet(this, _Turma_vinculos, "f").get(matricula);
        if (!vinculo) {
            throw new Error("Não existe matrícula correspondente nesta turma.");
        }
        vinculo.registrarFrequencia(percentual);
    }
    listarMatriculados() {
        return Array.from(__classPrivateFieldGet(this, _Turma_vinculos, "f").values(), vinculo => vinculo.gerarResumo());
    }
    gerarResumo() {
        return {
            codigo: __classPrivateFieldGet(this, _Turma_codigo, "f"),
            componenteCurricular: __classPrivateFieldGet(this, _Turma_componenteCurricular, "f"),
            quantidadeMatriculados: __classPrivateFieldGet(this, _Turma_vinculos, "f").size,
            matriculados: this.listarMatriculados()
        };
    }
}
_Turma_codigo = new WeakMap(), _Turma_componenteCurricular = new WeakMap(), _Turma_vinculos = new WeakMap();
