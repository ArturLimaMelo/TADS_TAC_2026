const cursos = [];



function inserirCurso(cursos, codigo, nome, cargaHoraria, ativo) {

 const curso = {

 codigo: codigo,

 nome: nome,

 cargaHoraria: cargaHoraria,

 ativo: ativo

 };



 cursos.push(curso);

}



function listarCursos(cursos) {

 cursos.map(curso => {

 console.log(

 `Código: ${curso.codigo} | ` +

 `Nome: ${curso.nome} | ` +

 `Carga horária: ${curso.cargaHoraria}h | ` +

 `Ativo: ${curso.ativo ? "Sim" : "Não"}`

 );

 });

}




function filtrarCursosAtivos(cursos) {

 return cursos.filter(curso => curso.ativo === true);

}

function calcularMediaCargaHoraria(cursosAtivos) {

 const cargasHorarias = cursosAtivos.map(curso => curso.cargaHoraria);



 const soma = cargasHorarias.reduce(

 (total, cargaHoraria) => total + cargaHoraria,

 0

 );



 return soma / cursosAtivos.length;

}





inserirCurso(cursos, "C001", "JavaScript", 40, true);

inserirCurso(cursos, "C002", "Python", 60, true);

inserirCurso(cursos, "C003", "Banco de Dados", 50, false);

inserirCurso(cursos, "C004", "HTML e CSS", 30, true);

inserirCurso(cursos, "C005", "Java", 80, false);



listarCursos(cursos);



const cursosAtivos = filtrarCursosAtivos(cursos);



console.log("\nCursos ativos");



cursosAtivos.map(curso => {

 console.log(

 `${curso.codigo} - ${curso.nome} - ${curso.cargaHoraria}h`

 );

});



const mediaCargaHoraria = calcularMediaCargaHoraria(cursosAtivos);



console.log("\nRelatório");

console.log(`Total de cursos cadastrados: ${cursos.length}`);

console.log(`Total de cursos ativos: ${cursosAtivos.length}`);

console.log(

 `Média da carga horária dos cursos ativos: ${mediaCargaHoraria.toFixed(2)} horas`

);