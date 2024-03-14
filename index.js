const apiURL = "https://opentdb.com/api.php?amount=50";
const URL ='https://jsonplaceholder.typicode.com/users/1';

let score = 0;
updateScore();

function updateScore(){
    document.querySelector('#score').innerHTML = ('Score:'+score);
}

class Question{
    constructor(data) {
        this.difficulty = data.difficulty;
        this.category = data.category;
        this.question = data.question;
        this.correct = data.correct_answer;
        this.incorrect = data.incorrect_answers;
    }
}

let index = 0;
let testData;
function goNext(){
    index++;
    setTimeout(handleData,3000);
    setTimeout(test = () =>{
        let validationElement = document.querySelector('#optionValidation');
        validationElement.style.opacity = "0";
    },3000);

}
function fetchData() {
    fetch(apiURL, {})
        .then(response => response.json())

        .then(data => {
            // console.log(data.results);
            testData = data.results;
            handleData();
        })

        .catch(error => {
            console.log(error);
        })
}
fetchData();


function setOptions(ques){
    document.querySelector('#option1').innerHTML = ques.correct;

    document.querySelector('#option3').style.display = "grid";
    document.querySelector('#option4').style.display = "grid";
    //
    // console.log(ques.incorrect);
    for(let i = 0;i<3;i++){
        document.querySelector('#option'+(i+2)).innerHTML = ques.incorrect[i];
    }
    if(ques.incorrect[0]==="True" || ques.incorrect[0]==="False"){
        document.querySelector('#option1').innerHTML = "True";
        document.querySelector('#option2').innerHTML = "False";

        document.querySelector('#option3').style.display = "none";
        document.querySelector('#option4').style.display = "none";

    }

}
function handleData() {
    let ques = new Question(testData[index]);
//
    document.querySelector('#ques').innerHTML = ques.question;
    document.querySelector('#diff').innerHTML = ques.difficulty;
    document.querySelector('#cate').innerHTML = ques.category;

    setOptions(ques);
}

function correctAnswer(){
    let validationElement = document.querySelector('#optionValidation');
    validationElement.innerHTML = "Correct Answer";
    validationElement.style.opacity = "100";
    validationElement.style.color = '#00ff00';
    console.log(validationElement.innerHTML);

    score++;
    updateScore();
    goNext();
}

function wrongAnswer(){
    let validationElement = document.querySelector('#optionValidation');
    validationElement.innerHTML = "Incorrect Answer";
    validationElement.style.opacity = "100";
    validationElement.style.color = '#ff0000';
    console.log(validationElement.innerHTML);
    goNext();

}



