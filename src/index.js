import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "./App.css";
import {CreateQ} from './components/createq';
import {NavQ} from './components/navq';
import {addQuestionQuery, addOptionQuery} from './queries/queries';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.emptyQ ={
      value: '',
      options: [
          {
              value:'',
              isCorrect:false
          }
      ]
  };
    this.state = {
      currentQ: 0,
      questions:[
        this.emptyQ
      ]
    }
    this.saveStateOfQ = this.saveStateOfQ.bind(this);
    this.createQues = this.createQues.bind(this);
    this.changeMainQ = this.changeMainQ.bind(this);
    this.saveToDb = this.saveToDb.bind(this);
  }
  saveStateOfQ(id,state){
    let lis = [...this.state.questions];
    lis[id] = state;
    this.setState({
      questions: lis
    });
  }
  createQues(){
    let lis = [...this.state.questions];
    console.log('hello',lis);
    lis.push(this.emptyQ);
    this.setState({
      questions:lis
    });

  }
  saveToDb(event){
    this.state.questions.map((que) =>{
      let questionTitle = que.value;
      let marks = 5;
      let exam = 1;
      if (que.value){
        fetch('http://localhost:8000/exam/b/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query:addQuestionQuery,
            variables: {
              input: {
                questionTitle,
                marks,
                exam
              }
            }
          })
        })
          .then(r => r.json())
          .then(data => {
            console.log(data);
            let question = data.data.addQuestion.question.id;
            //console.log(question);
            que.options.map(option => {
              if (option.value){
                let optionTitle = option.value;
                let isCorrect = option.isCorrect;
                fetch('http://localhost:8000/exam/b/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                  body: JSON.stringify({
                    query:addOptionQuery,
                    variables: {
                      input: {
                        optionTitle,
                        question,
                        isCorrect
                      }
                    }
                  })
                })
                  .then(r => r.json())
                  .then(data => console.log(data))
              }

            })
          });   
      }  
    }) 

  }
  changeMainQ(id){
    this.setState({
      currentQ : id
    });
  }
  render(){
    let count = -1;
    let dir = ['one','two','three','four','five','six','seven','eight','nine','ten'];
    let questions = []
    this.state.questions.forEach(
      (values) => {
      count += 1;
      questions.push(<CreateQ key={"q" + count.toString()} r={count} values={values} sendState={this.saveStateOfQ}/>)});
    let element = (<div id="main">
                    {questions[this.state.currentQ]}
                    <button id="gets" onClick={this.saveToDb}>get state</button>
                    <NavQ noq={this.state.questions.length} createQues={this.createQues} changeMainQ={this.changeMainQ}/>
                    
                    </div>);
    return(
      element
    );
  }
}
ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();