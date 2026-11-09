import { ArrayStack } from "../estruturas/ArrayStack.js";
import { AlteracaoCampo } from "../dominio/AlteracaoCampo.js";

export class HistoricoFormulario {
    private historico = new ArrayStack<AlteracaoCampo>();

    registrarAlteracao(alteracao: AlteracaoCampo): void {
        this.historico.push(alteracao);
    }

    desfazer(): AlteracaoCampo | undefined {
        return this.historico.pop();
    }

    consultarUltimaAlteracao(): AlteracaoCampo | undefined {
        return this.historico.peek();
    }

    tamanho(): number {
        return this.historico.size();
    }
}