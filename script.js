// 1º Saber quantas questões eu tenho.
// Exiba de um em um
// Quando clicar o quiz salva e vai para a próxima questão até chega no final.

//Initial data
let curretQuestion = 0;
let correctAnswers = 0;

showQuestion();

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


//Functions
function showQuestion() {
    if(questions[curretQuestion]) {
        let q = questions[curretQuestion];

        let pct = Math.floor((curretQuestion / questions.length) * 100)

        document.querySelector('.progress--bar').style.width = `${pct}%`
        
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = ' ';
        for(let i in q.options) { //Faz um looping e imprime as questões armazenada nos objetos apenas modificando o elemento já criado no html 
            optionsHtml += `<div data-op="${i}" class="option"> <span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    } else {
        //Acabaram as questões 
        finishQuiz();
    }
}

//Função de marcar ponto de resposta correta
function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[curretQuestion].answer === clickedOption) {
        correctAnswers++;
    } 
    
    curretQuestion++;
    showQuestion(); //atualiza a questão;

}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = `Tá ruim em?!`;
        document.querySelector('.scorePct').style.color = '#FF0000';

    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = `Muito bom!`;
        document.querySelector('.scorePct').style.color = '#FFFF00';
        
    } else if (points >= 70){
        document.querySelector('.scoreText1').innerHTML = `Parabéns!!`;
        document.querySelector('.scorePct').style.color = '#0D630D';
    };

    document.querySelector('.scorePct').innerHTML = `Acertou: ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}` 

    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.progress--bar').style.width = `100%`


}

function resetEvent() {
    correctAnswers = 0;
    curretQuestion = 0;
    showQuestion();
}