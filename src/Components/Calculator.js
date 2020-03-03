import React, { Component } from 'react';

let ganswer = 0;

class Calculator extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            answer:0,
            input: 0,
            queue: [],
        }
    }
    calculateQueue(){
        var value = this.state.queue;
        var que = this.state.queue;
        var inp = 0;

        if (this.state.input !==0) {
            inp = parseFloat(this.state.input);
            this.addToQueue(inp);
        }

        var answer = value[0];
        var dividedByZero = 0;

        for (  var i = 2; i < value.length; i= i+2) {

            switch (que[i-1]) {
                case '+':
                    answer+= value[i];
                    break;
                case '-':
                    answer-= value[i];
                    break;
                case '/':    
                    if (value[i] === 0)  
                        dividedByZero = 1;
                    else      
                        answer = answer / value[i];
                    break;
                case'*': answer = answer * value[i];
                    break;
            }

        }

        answer = answer.toFixed(10);
        answer = parseFloat(answer);

        //console.log(answer);

        if ( dividedByZero === 1) 
        {
            this.clearAll();
            
        }
        else
        {   
            if(ganswer >= 0){
                ganswer = answer;
            }
            this.setState({
                answer : answer,
                input: answer,
                queue: []
            })
        }
    }

    addToQueue(input){

        var queu=this.state.queue;
        queu.push(input);

        this.setState({              
            queue:[...queu]
        });
    }

    clearAll() {
        this.setState({              
            queue:[],
            input:0,
            answer:0,
            question:''
        });
        ganswer =0;
    }

    numericButton(e){
        var arg = e.target.value;
        var inp = '';
        var quest = '';
        

        if ( this.state.answer ===  "ERROR" || (this.state.answer == "0" && arg != "."))
        { 
              this.setState({              
                answer:''
              });  
        }

        if (!(arg === ".") || !this.state.input.match(/[.]/)) 
        {
            inp = this.state.input + arg;
            quest = this.state.question + arg;
            
            this.setState({              
                question : quest,
                input: inp
            }); 
            //console.log(this.state.question);
            
        }
    }
    
    operatorButton(e){
        var arg = e.target.value;
        var inp=0;
        var ques='';

        if (this.state.input !== 0 && this.state.input !== "-" && arg !== "tog" && arg !== "%") {
            inp = parseFloat(this.state.input);

                this.addToQueue(inp);
                this.addToQueue(arg);

                ques =this.state.question+ arg;

                this.setState({              
                    question : ques,
                    input: 0
                });

        }
        if (arg == "-"  && isNaN(this.state.queue[0]) && this.state.input !== "-")
        {
    
            this.setState({              
                question : '-',
                input: '-'
            }); 
        }

        if(arg === "tog"){
            let ans;

            this.calculateQueue();
            //console.log(ganswer);

            ans = (-1) * (ganswer);
            ganswer = ans;

            this.setState({              
                answer:ans,
                question:''
            }); 
            
        }

        if(arg === "%"){
            let ans=0;
            
            this.calculateQueue();
            ganswer = (ganswer/100);
            
            this.setState({              
                answer:ganswer,
                question:''
            }); 
        }

    }
   
    render() {
        return (
        <div >
            <br/><br/><br/>
            <div id="calculatorBody"> 
                <div>  
                    <div className="ansques" >
                        <div id="question" >{this.state.question}</div>
                        <div id="answer" >{this.state.answer}</div>
                    </div>
                </div>
                    <div class="row">
                    </div>
                <div class="row">
                    <button id="AC" onClick={this.clearAll.bind(this)} value="C">C</button>
                    <button id="toggle" onClick={this.operatorButton.bind(this)} value="tog">+/-</button>
                    <button  onClick={this.operatorButton.bind(this)} value="%">%</button>
                    <button className="operator" onClick={this.operatorButton.bind(this)} value="/">/</button>
                </div>
                <div class="row">
                    <button onClick={this.numericButton.bind(this)} value="7">7</button>
                    <button onClick={this.numericButton.bind(this)} value="8">8</button>
                    <button onClick={this.numericButton.bind(this)} value="9">9</button>
                    <button className="operator" onClick={this.operatorButton.bind(this)} value="*">x</button>
                </div>
                <div class="row">
                    <button onClick={this.numericButton.bind(this)} value="4">4</button>
                    <button onClick={this.numericButton.bind(this)} value="5">5</button>
                    <button onClick={this.numericButton.bind(this)} value="6">6</button>
                    <button className="operator" onClick={this.operatorButton.bind(this)} value="-">-</button>
                </div>
                <div class="row">
                    <button onClick={this.numericButton.bind(this)} value="1">1</button>
                    <button onClick={this.numericButton.bind(this)} value="2">2</button>
                    <button onClick={this.numericButton.bind(this)} value="3">3</button>
                    <button className="operator" onClick={this.operatorButton.bind(this)} value="+">+</button>
                </div>
                <div class="row">
                    <button onClick={this.numericButton.bind(this)} value="0">0</button>
                    <button onClick={this.numericButton.bind(this)} value=".">.</button>
                    <button id="equals"  onClick={this.calculateQueue.bind(this)} value="=">=</button>
                </div>
        </div>
        </div>
        );
   }
}

export default Calculator;