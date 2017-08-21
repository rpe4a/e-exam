import React, {Component} from 'react';
import {some} from 'lodash/collection';

class FiltratingInput extends Component {
    constructor(props) {
        super(props);
        
        this.FilterItems = this.FilterItems.bind(this);
        this.CheckItem = this.CheckItem.bind(this);
    }

    CheckItem(item, filter){
        switch (Object.prototype.toString.call(item)) {
            case '[object String]':
                return item.toUpperCase().indexOf(filter.toUpperCase()) !== -1;
            case '[object Array]':
                return some(item, (i) => { return i[this.props.prop].toUpperCase().indexOf(filter.toUpperCase()) !== -1})
        }   
    }

    FilterItems(e){
        e.preventDefault()

        const filter = e.target.value, {items, field, onChange} = this.props;
        
        let filteredItems = [];

        for (let i = 0; i < items.length; i++) {
            if(filter && this.CheckItem(items[i][field], filter)){
                filteredItems.push(items[i])
            }
        }

        onChange((filter) ? filteredItems : items)
    }

    render() {
        const {placeholder} = this.props;

        return (
            <div className='form-group'>
                <input type='text' className='form-control margin-r-1' placeholder={placeholder}
                    onChange={this.FilterItems}
                    />
            </div>
        );
    }
}

FiltratingInput.propTypes = {
    items: React.PropTypes.array.isRequired,
    field: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    prop: React.PropTypes.string,

}

export default FiltratingInput;