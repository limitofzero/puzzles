import * as React from 'react';


export default class PuzzleNodeInput extends React.Component {
    constructor(props) {
        super(props);

        //время в puzzleJson представлено как H:MM
        this.jsonTimeRegex = /^(\d):(\d{2})(?::(\d{2}))?$/gm;
        //время формата 0H:MM
        this.standartTimeRegex = /^(0\d):(\d{2})(?::(\d{2}))?$/gm;

        const {type} = props;

        let {value} =  props;
        value = type === 'TIME' ? this.transformTimeForInputFormat(value) : value;

        this.state = {
            value,
            isEdited: false
        }
    }

    transformTimeForInputFormat(time) {
        if(this.jsonTimeRegex.test(time)) {
            return '0' + time;
        }

        return time;
    }


    transformTimeForJson(time) {
        if(this.standartTimeRegex.test(time)){
            return time.slice(1, time.length);
        }

        return time;
    }

    onChangeHandler = (e) => {
        this.setState({
            value: e.target.value,
            isEdited: true
        });
    };

    onBlurHandler = () => {
        const {isEdited} = this.state;
        const {type} = this.props;
        let {value} = this.state;

        value = type === 'TIME' ? this.transformTimeForJson(value) : value;

        if(isEdited) {
            const {name, onValueChanged} = this.props;
            onValueChanged({
                valueName: name,
                value
            })
        }
    };

    render() {
        const {type} = this.props;
        const inputType = type === 'STRING' ? 'text' : 'time';

        return (
            <input className='puzzle_input'
                   type={inputType}
                   value={this.state.value}
                   onBlur={this.onBlurHandler}
                   onChange={this.onChangeHandler}/>
        );
    }
}