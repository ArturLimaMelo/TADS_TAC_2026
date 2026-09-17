function calcularMedia(n1, n2, n3) {
    return (n1 + n2 + n3) / 3; 
}

function calcularSituacao(media, frequencia) {
    if (media >= 70 && frequencia >= 75) {
        aprovados += 1;
        return "Aprovado";
    } else if (media >= 40 && media < 70 && frequencia >= 75) {
        recuperacao += 1;
        return "Recuperação";
    } else {
        reprovados += 1;
        return "Reprovado";
    }
}

var qnt_alunos = Number(prompt("Quantos alunos você deseja cadastrar?"));
var relatorio = "Relatório de Alunos\n\n";
var aprovados = 0;
var reprovados = 0;
var recuperacao = 0;
for (var i = 0; i < qnt_alunos; i++) {
    var nome = prompt("Qual é o seu nome?");
    var matricula = Number(prompt("Qual é a sua matrícula?"));
    var n1 = Number(prompt("Digite a primeira nota:"));
    var n2 = Number(prompt("Digite a segunda nota:"));
    var n3 = Number(prompt("Digite a terceira nota:"));
    var frequencia = Number(prompt("Digite a frequência do aluno:"));
    var media = calcularMedia(n1, n2, n3);
    var situacao = calcularSituacao(media, frequencia);
    relatorio += "Nome: " + nome + "\nMatrícula: " + matricula + "\nMédia: " + media.toFixed(2) + "\nSituação: " + situacao + "\n\n";
}
console.log(relatorio + "Quantidade de alunos aprovados: " + aprovados + "\nQuantidade de alunos em recuperação: " + recuperacao + "\nQuantidade de alunos reprovados: " + reprovados);