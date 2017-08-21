import React, {Component} from 'react';
import {connect} from 'react-redux';
import Task from '../components/Task';
import {pickQuestion, skipQuestion, answeredQuestion, pickAnswer, finishTest, getDemoTest, clearDemoTest, putElapsedTime, timeOut} from '../actions/testActions';
import {addFlashMessage} from '../actions/flashMessageActions';

class DemoTestPage extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getDemoTest();
    }

    render() { 
        if (!this.props.test.id) {
            return <h1>Loading...</h1>
        } 

        return (
            <div id={`test-${this.props.test.id}`} >
                <Task {...this.props} />
            </div>
        );
    }
}

DemoTestPage.propTypes = {
    test: React.PropTypes.object.isRequired,
    pickQuestion: React.PropTypes.func.isRequired,
    skipQuestion: React.PropTypes.func.isRequired,
    answeredQuestion: React.PropTypes.func.isRequired,
    pickAnswer: React.PropTypes.func.isRequired,
    /*putElapsedTime: React.PropTypes.func.isRequired,*/
    finishTest: React.PropTypes.func.isRequired,
    timeOut: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        test: state.demoTest
    };
}

export default connect(mapStateToProps, {
    pickQuestion, skipQuestion, answeredQuestion, pickAnswer, finishTest, getDemoTest, addFlashMessage, clearDemoTest, putElapsedTime, timeOut
})(DemoTestPage);