import * as React from 'react';
import '../../scss/puzzle.scss';
import { PortWidget } from 'storm-react-diagrams';
import PuzzleNodeInput from './PuzzleNodeInput';
import { connect } from 'react-redux';
import {puzzleValueChanged} from '../../actions';


class PuzzleNodeWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    getPorts(isInputPort) {
        const node = this.props.node;
        let ports, elementClassName;
        if(isInputPort) {
            ports = node.getInPorts();
            elementClassName = 'puzzle_port is-in';
        } else {
            ports = node.getOutPorts();
            elementClassName = 'puzzle_port is-out'
        }

        return ports.map(port =>
            <PortWidget className={elementClassName}
                        key={port.name}
                        name={port.name}
                        node={node} />)
    }

    getPuzzleValues(values) {
        return Object.keys(values)
            .filter(key => {
                const value = values[key];
                return value.type !== 'LINK';
            })
            .map(key => {
                const value = values[key];
                return (
                    <li className='puzzle_param-value' key={key}>
                        <span>{key}</span>: {this.getPuzzleInput(key, value)}
                    </li>
                );
            });
    }

    getPuzzleInput(name, value) {
        return <PuzzleNodeInput
            {...value }
            name={name}
            onValueChanged={this.valueChangeHandler}/>
    }

    valueChangeHandler = ({valueName, value}) => {
        const puzzle = this.props.node.getPuzzle();
        const {name} = puzzle;

        this.props.puzzleValueChanged({
            puzzleName: name,
            valueName,
            value
        });
    };

    render() {
        const puzzle = this.props.node.getPuzzle();
        const name = puzzle.name;

        return (
            <div className='puzzle'>
                <div className='puzzle_name'>{name}</div>
                <div className='puzzle_port is-in'>
                    {this.getPorts(true)}
                </div>
                <div className='puzzle_port is-out'>
                    {this.getPorts(false)}
                </div>
                <ul className='puzzle_param-list'>
                    {this.getPuzzleValues(puzzle.values)}
                </ul>
            </div>
        );
    }
}

export default connect(null, {puzzleValueChanged})(PuzzleNodeWidget);
