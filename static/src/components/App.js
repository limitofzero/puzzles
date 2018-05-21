import React, { Component } from 'react';
import {connect} from 'react-redux';
import {DiagramWidget} from 'storm-react-diagrams';
import generateDiagramModel from '../services/generateDiagramModel';
import puzzleDiagramEngine from '../services/puzzleDiagramEngine';
import getPuzzles from '../services/getPuzzles';
import '../scss/canvas.scss';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {loaded, loading, withError} = this.props;
        if(loading === false && loaded === false && withError === false) {
            this.props.getPuzzles();
        }
    }

    getStatusElement() {
        const {loading,  withError} = this.props;
        if(loading || withError) {
            return <div className='status'>
                {loading ? 'Loading...' : 'Error'}
                </div>
        }

        return null;
    }

    render(){
        const engine = puzzleDiagramEngine.getInstance();
        const {puzzles, loaded, withError} = this.props;

        //при неудачной загрузки, данные берутся напрямую
        if(loaded || withError) {
            const model = generateDiagramModel(puzzles);
            engine.setDiagramModel(model);
        }

        return (
            <div className='app'>
                {this.getStatusElement()}
                <DiagramWidget
                    allowLooseLinks={false}
                    allowCanvasTranslation={false}
                    allowCanvasZoom={false}
                    smartRouting={true}
                    className='canvas'
                    diagramEngine={engine} />
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        puzzles: state.puzzleModel && state.puzzleModel.puzzles,
        loading: state.loading,
        loaded: state.loaded,
        withError: state.withError
    }
}

export default connect(mapStateToProps, {getPuzzles})(App);