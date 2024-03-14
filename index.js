const apiURL = "https://opentdb.com/api.php?amount=10";
const URL ='https://jsonplaceholder.typicode.com/users/1';
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
    handleData();
}
function fetchData() {
    fetch(apiURL, {})
        .then(response => response.json())

        .then(data => {
            console.log(data.results);
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
    console.log(ques.incorrect);
    for(let i = 0;i<3;i++){
        document.querySelector('#option'+(i+2)).innerHTML = ques.incorrect[i];
    }
    if(ques.incorrect.size === 1){
        document.querySelector('#option2').style.display = 'none';
        document.querySelector('#option3').style.display = 'none';
        document.querySelector('#option4').style.display = 'none';
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