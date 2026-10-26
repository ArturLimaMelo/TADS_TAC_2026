var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EstudanteService_estudantes;
import { Estudante } from "../models/Estudante.js";
import { validarEstudante } from "../validacao/validarEstudante.js";
export class EstudanteService {
    constructor() {
        _EstudanteService_estudantes.set(this, new Map());
    }
    cadastrar(matricula, nome, curso) {
        const resultado = validarEstudante({
            matricula,
            nome,
            curso
        });
        if (!resultado.valido) {
            throw new Error(resultado.erros.join(" "));
        }
        if (__classPrivateFieldGet(this, _EstudanteService_estudantes, "f").has(matricula.trim())) {
            throw new Error("Já existe um estudante com essa matrícula.");
        }
        const estudante = new Estudante(matricula, nome, curso);
        __classPrivateFieldGet(this, _EstudanteService_estudantes, "f").set(estudante.matricula, estudante);
        return estudante;
    }
    buscarPorMatricula(matricula) {
        return __classPrivateFieldGet(this, _EstudanteService_estudantes, "f").get(matricula) ?? null;
    }
    listar() {
        return Array.from(__classPrivateFieldGet(this, _EstudanteService_estudantes, "f").values(), estudante => estudante.gerarResumo());
    }
    calcularMedia(matricula) {
        const estudante = this.buscarPorMatricula(matricula);
        if (estudante === null) {
            return null;
        }
        return estudante.calcularMedia();
    }
}
_EstudanteService_estudantes = new WeakMap();
