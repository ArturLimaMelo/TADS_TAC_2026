export function validarEstudante(dados) {
    const erros = [];
    if (typeof dados.matricula !== "string" ||
        !dados.matricula.trim()) {
        erros.push("A matrícula deve ser uma string não vazia.");
    }
    else if (!/^[a-zA-Z0-9-]+$/.test(dados.matricula.trim())) {
        erros.push("A matrícula deve conter apenas letras, números ou hífens.");
    }
    if (typeof dados.nome !== "string" ||
        !dados.nome.trim()) {
        erros.push("O nome deve ser uma string não vazia.");
    }
    if (typeof dados.curso !== "string" ||
        !dados.curso.trim()) {
        erros.push("O curso deve ser uma string não vazia.");
    }
    return {
        valido: erros.length === 0,
        erros
    };
}
