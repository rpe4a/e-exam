import React, {Component} from 'react';

class Pagination extends Component {
    render() {
        const {items, pickItem, DynamicPaginatorView } = this.props;

        return (
            <div id='pagination' className='btn-group'>
                {items.map((item, index) => {
                    return <DynamicPaginatorView key={index} index={index}  item={item} pickItem={pickItem}>
                        {index + 1}
                    </DynamicPaginatorView>
                }) }
            </div>
        );
    }
}

Pagination.propTypes = {
    items: React.PropTypes.array.isRequired,
    pickItem: React.PropTypes.func.isRequired,
    DynamicPaginatorView: React.PropTypes.func.isRequired,
};



export default Pagination;