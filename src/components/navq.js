import React from 'react';
class NavQ extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {
          noq : props.noq
      }
      this.onClickButton = this.onClickButton.bind(this)
    }
    onClickButton(event){
        let r = parseInt(event.target.getAttribute('r'));
        if(r===(-1)){
            console.log('create a new question');

            this.props.createQues();
        }else{
            this.props.changeMainQ(r);
        }
        
    }
  
    render() {
        let questions = [];
        let i = 0;
        for (i = 0; i < this.props.noq; i++) {
            questions.push(<button key={i.toString()} r={i.toString()} onClick={this.onClickButton}>{i}</button>);
        }
      return (
        <span id="navq">
          <h1>This is nav bar</h1>
          {questions}
          <button r="-1" onClick={this.onClickButton}>+</button>
  
        </span>
      );
    }
  }
export {NavQ};