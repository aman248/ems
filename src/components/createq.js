import React from 'react';
import {Option} from './option';

class CreateQ extends React.Component {
    constructor(props) {
        super(props);
        this.emptyOption = {
            value: '',
            isCorrect: false
        }
        console.log(props);
        this.r = props.r
        this.state = props.values;
        this.handleChange = this.handleChange.bind(this);
        this.addOption = this.addOption.bind(this);
        this.onOptionChange = this.onOptionChange.bind(this);
        this.printState = this.printState.bind(this);
        this.printProps = this.printProps.bind(this);
        this.save = this.save.bind(this);
        this.saveToDb = this.saveToDb.bind(this);
    }
    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }
    componentDidMount(){
        console.log('component mounted.');
    }
    componentWillUnmount(){
        this.props.sendState(parseInt(this.props.r),this.state);
        console.log('component unmountng....');
    }
    addOption(){
        let lis = [...this.state.options];
        lis.push(this.emptyOption);
        this.setState({
            options : lis
        });

    }
    onOptionChange(value,id){
        console.log('this is called');
        console.log(id);
        let lis = [...this.state.options];
        lis[id] = value;
        this.setState({
            options:lis
        })

    }
    save(){
        console.log(this.props.r);
        this.props.sendState(parseInt(this.props.r),this.state);

    }
    printState(){
        console.log(this.state);
        
        //console.log(parseInt(this.props.r));
    }
    printProps(){
        console.log(this.props);
    }
    saveToDb(event){
        this.props.sendState(parseInt(this.props.r),this.state);
    }
  
    render() {
        let count = -1;
        let options = this.state.options.map(
            (state) => {
                count += 1;
                return <Option key={"o" + count.toString()} r={count} values={state} fun={this.onOptionChange}/>}
                );


      return (
        <span id="createq">
            <h1>{this.props.r}</h1>
          <textarea value={this.state.value} onChange={this.handleChange}>Enter question here</textarea>
          <div>
              {options}
          </div>
          <button onClick={this.addOption}>add option</button>
          <button onClick={this.saveToDb}> SaveToDb</button>
        </span>
      );
    }
  }
export {CreateQ};