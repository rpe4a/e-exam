import React, {Component} from 'react';


class ListPaginatorView extends Component {
    render() {
        const {index, pickItem} = this.props;

        return (
            <button onClick={pickItem} id={index} className='btn btn-default'>
                {this.props.children}
            </button>
        );
    }
}

ListPaginatorView.propTypes = {
    item: React.PropTypes.array.isRequired,
    pickItem: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
};

export default ListPaginatorView;
