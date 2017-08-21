import React, {Component} from 'react';
import classnames from 'classnames';

class QuestionPaginatorView extends Component {
    render() {
        const {item, pickItem} = this.props;

        return (
            <button id={item.id} disabled={item.answered || item.picked} onClick={pickItem}
                className={classnames('btn btn-default', {
                    'btn-primary': item.picked,
                    'btn-skiping': item.skiped === true && (item.answered !== true && item.picked !== true),
                    'btn-success': item.answered === true,
                }) }>
                {this.props.children}
            </button>
        );
    }
}

QuestionPaginatorView.propTypes = {
    item: React.PropTypes.object.isRequired,
    pickItem: React.PropTypes.func.isRequired,
};

export default QuestionPaginatorView;