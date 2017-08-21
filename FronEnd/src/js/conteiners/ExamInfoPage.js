import React, {Component} from 'react'
import PreLoader from '../components/PreLoader';
import ExamInfo from '../components/ExamInfo';
import {connect} from 'react-redux';
import {getExamInfo } from '../actions/examActions';


class ExamInfoPage extends Component {
    constructor(props) {
        super(props)

        this._getView = this._getView.bind(this);
    }

    componentDidMount() {
        this.props.getExamInfo(this.props.params.id)
    }

    _getView() {
        const {isFetching} = this.props.examInfo;

        if (isFetching)
            return <PreLoader />

        return (<ExamInfo exam={this.props.examInfo}></ExamInfo>)
    }

    render() {
        

        return (
            <div className='row'>
                <div className='col-md-12'>
                    {this._getView() }
                </div>

            </div>
        )
    }
}

ExamInfoPage.propTypes = {
    examInfo: React.PropTypes.object.isRequired,
    getExamInfo: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        examInfo: state.exam,
    }
}

export default connect(mapStateToProps, { getExamInfo })(ExamInfoPage);