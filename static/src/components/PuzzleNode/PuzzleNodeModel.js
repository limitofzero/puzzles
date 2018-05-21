import { NodeModel, Toolkit, DefaultPortModel } from 'storm-react-diagrams';

export class PuzzleNodeModel extends NodeModel {
    constructor(puzzle) {
        super('puzzle');
        this.puzzle = puzzle;
        this.ports = {};
    }

    addInPort(label) {
        return this.addPort(new DefaultPortModel(true, Toolkit.UID(), label));
    }

    addOutPort(label) {
        return this.addPort(new DefaultPortModel(false, Toolkit.UID(), label));
    }

    getInPorts() {
        return Object.keys(this.ports)
            .map(key => this.ports[key])
            .filter(port => port.in);
    }

    getOutPorts() {
        return Object.keys(this.ports)
            .map(key => this.ports[key])
            .filter(port => !port.in);
    }

    deSerialize(object, engine) {
        super.deSerialize(object, engine);
        this.puzzle = object.puzzle;
    }

    serialize() {
        return Object.assign(super.serialize(), {
            puzzle: this.puzzle
        });
    }

    getPuzzle = () => {
        return this.puzzle;
    }
}