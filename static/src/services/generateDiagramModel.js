import {DiagramModel} from 'storm-react-diagrams';
import {PuzzleNodeModel} from '../components/PuzzleNode/PuzzleNodeModel';
import {puzzleOffsets, puzzleSize} from '../constants';

export default function generateDiagramModel(puzzles) {
    const model = new DiagramModel();
    const nodes = puzzles.map(puzzle => new PuzzleNodeModel(puzzle));

    setNodePositionsByPuzzleContent(nodes);
    const links = getNodesLinks(nodes);

    model.addAll(...nodes, ...links);
    model.setLocked(true);

    return model;
}


function setNodePositionsByPuzzleContent(nodes) {
    const {minOffsetX, minOffsetY} = puzzleOffsets;
    const {width, height} = puzzleSize;

    let prevOffsetX = 0,
        maxOffsetY = 0,
        lineOffsetY = 0;

    for(let i = 0; i < nodes.length; i++) {
        if(i % 3 === 0) {//ставить по три ноды в 1 ряд
            prevOffsetX = 0;
            lineOffsetY = maxOffsetY;
            maxOffsetY = 0;
        }

        const node = nodes[i];

        const offsetX = prevOffsetX + minOffsetX;
        const offsetY = lineOffsetY + minOffsetY;
        node.setPosition(offsetX, offsetY);

        prevOffsetX = offsetX + width;
        const currentNodeBottomY = offsetY + height;
        maxOffsetY = currentNodeBottomY > maxOffsetY ? currentNodeBottomY : maxOffsetY;
    }
}

function getNodesLinks(nodes) {
    const links = [];

    for(let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const puzzle = node.getPuzzle();
        const puzzleLinksNames = getLinksNamesFromPuzzle(puzzle);

        for(let j = 0; j < puzzleLinksNames.length; j++) {
            const linkedPuzzle = puzzleLinksNames[j];

            const linkedNode = nodes.find(
                node => linkedPuzzle.value === node.getPuzzle().name
            );

            if(linkedNode) {
                const outPort = node.addOutPort('Out');
                const inputPort = linkedNode.addInPort('In');
                const link = outPort.link(inputPort);
                links.push(link);
            }
        }
    }

    return links;
}

function getLinksNamesFromPuzzle(puzzle) {
    return Object.keys(puzzle.values)
        .map(key => puzzle.values[key])
        .filter(value => value.type === 'LINK')
}