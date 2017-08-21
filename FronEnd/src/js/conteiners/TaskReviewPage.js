import React, {Component} from 'react'
/*import ReviewTask from '../components/ReviewTask';*/
import ReviewThing from '../components/ReviewThing';
import {connect} from 'react-redux';
import {reviewTask } from '../actions/taskActions';
import Variant from '../components/Variant';

const properties ={
    name: 'Название',
    typeName: 'Тип задания', 
    dirName: 'Родительская директория', 
    variants: 'Варианты'
}


class TaskReviewPage extends Component {
    componentDidMount() {
        this.props.reviewTask(this.props.params.id)
    }

    render() {
        const { task } = this.props;
        return (
            <div>
                <h2>Просмотр задания</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        {/*<ReviewTask task={task}/>*/}
                        <ReviewThing thing={task} properties={properties} children='variants' DynamicChildrenView={Variant} />
                    </div>
                </div>
            </div>

        )
    }
}

TaskReviewPage.propTypes = {
    task: React.PropTypes.object.isRequired,
    reviewTask: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        task: state.task,
    }
}

export default connect(mapStateToProps, { reviewTask })(TaskReviewPage)