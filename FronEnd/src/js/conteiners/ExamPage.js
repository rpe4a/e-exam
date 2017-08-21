import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

class ExamPage extends Component {
    render() {
        const {exam} = this.props;

        return (
            <div>
                <p>{exam.description}</p>
                <p><strong>Задания: </strong></p>
                <ul className='list-group'>
                    {exam.tasks.map((t, i) => {
                        return <li key={i} className={classnames('list-group-item', { 'padding-b-1': t.finish, 'padding-b-2': !t.finish }) }>
                            <span>{t.name}</span>
                            <span className='pull-right'>
                                {t.finish ? <span className='label label-primary'>Закончено</span> : <Link to={`/exam/${exam.id}/task/${t.id}`} className='btn btn-sm btn-success '>Приступить</Link>}
                            </span>
                        </li>
                    }) }

                </ul>
            </div>


        );
    }
}

ExamPage.propTypes = {
    exam: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
    return {
        exam: state.exam,
    }
}

export default connect(mapStateToProps)(ExamPage);
