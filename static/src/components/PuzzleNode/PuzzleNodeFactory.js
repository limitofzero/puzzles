import * as SRD from 'storm-react-diagrams';
import * as React from 'react';
import PuzzleNodeWidget from './PuzzleNodeWidget';
import {PuzzleNodeModel} from './PuzzleNodeModel';

export class PuzzleNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super('puzzle');
    }

    generateReactWidget(diagramEngine, node) {
        return <PuzzleNodeWidget node={node} diagramEngine={diagramEngine}/>;
    }

    getNewInstance() {
        return new PuzzleNodeModel();
    }
}
