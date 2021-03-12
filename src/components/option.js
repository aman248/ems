import React from 'react';
class Option extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.handleChange = this.handleChange.bind(this);
        this.onClickRadio = this.onClickRadio.bind(this);
    }
    handleChange(event){
        let value = {
            value: event.target.value,
            isCorrect: this.props.values.isCorrect
        }
        this.props.fun(value,parseInt(this.props.r));
    }
    onClickRadio(event){
        console.log(this);
        let boolean = true;
        if (this.props.values.isCorrect){
            boolean = false
        }
        let value = {
            value: this.props.values.value,
            isCorrect: boolean

        }
        this.props.fun(value,parseInt(this.props.r));
        
        console.log('hello');
    }
    onChangeRadio(event){
        console.log("changed");
    }
    render(){
        return(
            <div className="optioninput">
                <label>
                    Enter Option:
                    <input type="text" value={this.props.values.value} onChange={this.handleChange}></input>
                </label>
                <label>
                    Is correct:
                    <input type="radio" checked={this.props.values.isCorrect} onClick={this.onClickRadio} onChange={this.onChangeRadio}></input>
                </label>
            </div>
            
        )

    }
}
export {Option};