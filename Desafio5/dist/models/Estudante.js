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
var _Estudante_matricula, _Estudante_nome, _Estudante_curso, _Estudante_notas, _Estudante_ativo;
export class Estudante {
    constructor(matricula, nome, curso) {
        _Estudante_matricula.set(this, void 0);
        _Estudante_nome.set(this, void 0);
        _Estudante_curso.set(this, void 0);
        _Estudante_notas.set(this, []);
        _Estudante_ativo.set(this, true);
        if (!matricula.trim()) {
            throw new Error("A matrícula é obrigatória.");
        }
        if (!nome.trim()) {
            throw new Error("O nome é obrigatório.");
        }
        if (!curso.trim()) {
            throw new Error("O curso é obrigatório.");
        }
        __classPrivateFieldSet(this, _Estudante_matricula, matricula.trim(), "f");
        __classPrivateFieldSet(this, _Estudante_nome, nome.trim(), "f");
        __classPrivateFieldSet(this, _Estudante_curso, curso.trim(), "f");
    }
    get matricula() {
        return __classPrivateFieldGet(this, _Estudante_matricula, "f");
    }
    get nome() {
        return __classPrivateFieldGet(this, _Estudante_nome, "f");
    }
    get curso() {
        return __classPrivateFieldGet(this, _Estudante_curso, "f");
    }
    get ativo() {
        return __classPrivateFieldGet(this, _Estudante_ativo, "f");
    }
    desativar() {
        __classPrivateFieldSet(this, _Estudante_ativo, false, "f");
    }
    adicionarNota(nota) {
        if (!Number.isFinite(nota) ||
            nota < 0 ||
            nota > 10) {
            throw new Error("A nota deve ser um número entre 0 e 10.");
        }
        __classPrivateFieldGet(this, _Estudante_notas, "f").push(nota);
    }
    calcularMedia() {
        if (__classPrivateFieldGet(this, _Estudante_notas, "f").length === 0) {
            return null;
        }
        const soma = __classPrivateFieldGet(this, _Estudante_notas, "f").reduce((total, nota) => total + nota, 0);
        return soma / __classPrivateFieldGet(this, _Estudante_notas, "f").length;
    }
    listarNotas() {
        return [...__classPrivateFieldGet(this, _Estudante_notas, "f")];
    }
    gerarResumo() {
        return {
            matricula: __classPrivateFieldGet(this, _Estudante_matricula, "f"),
            nome: __classPrivateFieldGet(this, _Estudante_nome, "f"),
            curso: __classPrivateFieldGet(this, _Estudante_curso, "f"),
            ativo: __classPrivateFieldGet(this, _Estudante_ativo, "f"),
            notas: this.listarNotas(),
            media: this.calcularMedia()
        };
    }
}
_Estudante_matricula = new WeakMap(), _Estudante_nome = new WeakMap(), _Estudante_curso = new WeakMap(), _Estudante_notas = new WeakMap(), _Estudante_ativo = new WeakMap();
