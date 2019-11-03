const fs = require('fs');
const tasks = [];
const wordCounts = {};
const filesDir = './../text';
let completedTasks = 0;

function checkIfComplete () {
    completedTasks++;
    if (completedTasks === tasks.length) {
        for (let index in wordCounts) {
            if(wordCounts[index]>2) {
                console.log(`${index}:${wordCounts[index]}`)
            }
        }
    }
}

function addWordCount(word) {
    wordCounts[word] = wordCounts[word]?wordCounts[word]+1:1
}

function countWordsInText(text) {
 const words = text.toString().toLowerCase().split(/\W+/).sort();
 const stringMap = new Map();
 words.filter((word,index,arr)=>word).forEach(element => {
    addWordCount(element);
 });
}

fs.readdir(filesDir,(err,files) => {
    if (err)  throw err;
    if (files.length === 0) {
        throw new Error(`the filesTask is empty`);
    }
    files.forEach(file => {
        const task = (file => {
            return () => {
                fs.readFile(file, (err, text) => {
                    if (err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                })
            }
        })(`${filesDir}/${file}`);
        tasks.push(task)
    })
    tasks.forEach(task=> {task()})
})