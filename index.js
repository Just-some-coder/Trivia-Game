const apiURL = "https://opentdb.com/api.php?amount=50";

let score = 0;


function updateScore(){
    document.querySelector('#score').innerHTML = ('Score:'+score);
}

function showCorrect(){
    document.querySelector('#option1').style.background = "#00aa00";

    document.querySelector('#option2').style.background = "#ff0000";

    document.querySelector('#option3').style.background = "#ff0000";

    document.querySelector('#option4').style.background = "#ff0000";

}

function hideCorrect(){
    document.querySelector('#option1').style.background = '#007bff';
    document.querySelector('#option2').style.background = '#007bff';
    document.querySelector('#option3').style.background = '#007bff';
    document.querySelector('#option4').style.background = '#007bff';
    document.querySelector('#next').style.background = '#007bff';
}

function disableOptions(){
    document.querySelector('#option1').disabled = true;
    document.querySelector('#option2').disabled = true;
    document.querySelector('#option3').disabled = true;
    document.querySelector('#option4').disabled = true;

    setTimeout(showCorrect,0);

    console.log("Disabled");
}

function enableOptions(){
    document.querySelector('#option1').disabled = false;
    document.querySelector('#option2').disabled = false;
    document.querySelector('#option3').disabled = false;
    document.querySelector('#option4').disabled = false;
    document.querySelector('#next').disabled = false;



    setTimeout(hideCorrect,0);

    console.log("Enabled");
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
    setTimeout(enableOptions,1500);
    setTimeout(handleData,1500);
    setTimeout(test = () =>{
        let validationElement = document.querySelector('#optionValidation');
        validationElement.style.opacity = "0";
    },1500);



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
    setTimeout(disableOptions,0);

    let validationElement = document.querySelector('#optionValidation');
    validationElement.innerHTML = "Correct Answer";
    validationElement.style.opacity = "100";
    validationElement.style.color = '#00aa00';
    console.log(validationElement.innerHTML);

    score++;
    updateScore();

    goNext();
}

function wrongAnswer(){

    setTimeout(disableOptions,0);

    let validationElement = document.querySelector('#optionValidation');
    validationElement.innerHTML = "Incorrect Answer";
    validationElement.style.opacity = "100";
    validationElement.style.color = '#ff0000';

    setTimeout(goNext,0);

}

function skipQuestion(){

    setTimeout(disableOptions,0);
    let validationElement = document.querySelector('#optionValidation');
    validationElement.innerHTML = "Question Skipped";
    validationElement.style.opacity = "100";
    validationElement.style.color = '#000000';

    setTimeout(goNext,0);

}

updateScore();
fetchData();



