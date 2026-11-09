import { ArrayStack } from "../estruturas/ArrayStack.js";
export class HistoricoFormulario {
    historico = new ArrayStack();
    registrarAlteracao(alteracao) {
        this.historico.push(alteracao);
    }
    desfazer() {
        return this.historico.pop();
    }
    consultarUltimaAlteracao() {
        return this.historico.peek();
    }
    tamanho() {
        return this.historico.size();
    }
}
