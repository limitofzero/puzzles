import {PuzzleNodeFactory} from '../components/PuzzleNode/PuzzleNodeFactory';
import {DiagramEngine} from 'storm-react-diagrams';

let instance = null;

const puzzleDiagramEngine = {
    getInstance: function() {
        if(!instance) {
            instance = new DiagramEngine();
            instance.installDefaultFactories();
            instance.registerNodeFactory(new PuzzleNodeFactory());
        }

        return instance;
    }
};

export default puzzleDiagramEngine;