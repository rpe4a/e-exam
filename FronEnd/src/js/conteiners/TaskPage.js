import React, {Component} from 'react';
import {connect} from 'react-redux';
import {find} from 'lodash/collection';
import Task from '../components/Task';
/*import FreeTask from '../components/FreeTask';*/
import {pickQuestion, skipQuestion, answeredQuestion, pickAnswer, finishTest, putElapsedTime, timeOut} from '../actions/testActions';
import {addFlashMessage} from '../actions/flashMessageActions';
/*import {taskTypes} from '../utils/constants';*/

class TaskPage extends Component {
    render() {
        const {tasks, pickQuestion, skipQuestion, answeredQuestion, pickAnswer, finishTest, addFlashMessage, putElapsedTime, timeOut} = this.props;
        const task = find(tasks, { id: +this.props.params.taskid })
        return <Task task={task} pickQuestion={pickQuestion}
            skipQuestion={skipQuestion}
            answeredQuestion={answeredQuestion}
            pickAnswer={pickAnswer}
            finishTest={finishTest}
            putElapsedTime={putElapsedTime}
            timeOut={timeOut}
            addFlashMessage={addFlashMessage}/>
    }
}


TaskPage.propTypes = {
    tasks: React.PropTypes.array.isRequired,
}

function mapStateToProps(state/*, ownProps*/) {
    return {
        tasks: state.exam.tasks
    }
}

export default connect(mapStateToProps, { pickQuestion, skipQuestion, answeredQuestion, pickAnswer, finishTest, addFlashMessage, putElapsedTime, timeOut })(TaskPage);