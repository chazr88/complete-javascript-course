
//Function constructor

// var john = {
//     name: 'John',
//     yearofBirth: 1990,
//     job: 'teacher'
// };

// var Person = function(name, yearofBirth, job) {
//     this.name = name;
//     this.yearofBirth = yearofBirth;
//     this.job = job;
// }

// Person.prototype.calculateAge = function () {
//     console.log(2016 - this.yearofBirth);
// };

// Person.prototype.lastName = "Smith";

// var john = new Person('John', 1990, 'teacher');
// var john = new Person('Jane', 1969, 'designer');
// var john = new Person('Mark', 1948, 'retired');

// john.calculateAge();

// console.log(john.lastName);

// var a = 23;

// a = 46; 
// var b = a;

// console.log(a);
// console.log(b);


// var years = [1991, 1965, 2001, 1987, 1923];

// function arrayCalc(arr, fn) {
//     var arrRes = [];
//     arr.forEach(function(a){
//         arrRes.push(fn(a));
//     });
//     return arrRes;
// }

// function calculateAge(el){
//     return 2016 - el;
// }

// var ages = arrayCalc(years, calculateAge);

// console.log(ages)

// function interviewQuestion(job) {
//     if(job === 'designer') {
//         return function(name) {
//             console.log(name + ', can yo uplease explain what UX design is?');
//         }
//     } else if (job === 'teacher') {
//         return function(name) {
//             console.log('What subject do you teach, ' + name + '?'); 
//         }
//     } else {
//         return function(name) {
//             console.log('Hello ' + name + ', what do you do?');
//         }
//     }
// }

// var teacherQuestion = interviewQuestion('teacher');

// teacherQuestion('John');

// function game(){
//     var score = Math.random() * 10;
//     console.log(score >= 5)
// }
// game();

// (function(){
//     var score = Math.random() * 10;
//     console.log(score >= 5)
// })();

// function interviewQuestion(job) {
//     return function(name) {
//         if(job === 'designer') {
//             console.log(name + ', can yo uplease explain what UX design is?');
//         } else if (job === 'teacher') {
//             console.log('What subject do you teach, ' + name + '?'); 
//         } else {
//             console.log('Hello ' + name + ', what do you do?');
//         }       
//     }
// }

// interviewQuestion('teacher')('John')


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/



function Question(question, answers, correct){
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

Question.prototype.displayQuestion = function() {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
        console.log( i + ': ' + this.answers[i]);
    }
}

Question.prototype.checkAnswer = function(ans) {
    if(ans === this.correct) {
        console.log('Correct answer!')
    } else {
        console.log('Wrong answer. Try again.')
    }
}

var q1 = new Question("Is Javascript the coolest programming language", ['Yes', 'No'], 0)
var q2 = new Question("Just choose A", ['a', 'b', 'c'], 0)
var q3 = new Question("Just choose b", ['a', 'b', 'c'], 1 )

var questions = [q1, q2, q3];

var n = Math.floor(Math.random() * questions.length);

questions[n].displayQuestion();

var answer = parseInt(prompt('Please select the correct answer.'));

questions[n].checkAnswer(answer);


