import React, {Component} from 'react'
import classnames from 'classnames';

class CheckButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false,
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        if(this.state.checked){
            this.props.doSomeThingUnChecked();
        }else{
            this.props.doSomeThingChecked();
        }
        
        this.setState({checked: !this.state.checked})

    }


    render() {
        const {className, invalid } = this.props, {checked} = this.state;


        return (
            <button type='button' disabled={invalid} title={(checked) ? 'Снять' : 'Выделить'} onClick={this.toggle} className={className}>
                <i className={classnames('fa', {'fa-check-square-o': checked, 'fa-square-o': !checked} )}></i>
            </button>
        )
    }
}

CheckButton.propTypes = {
    invalid: React.PropTypes.bool,
    className: React.PropTypes.string.isRequired,
    doSomeThingChecked: React.PropTypes.func.isRequired,
    doSomeThingUnChecked: React.PropTypes.func.isRequired,
};

CheckButton.defaultProps = {
    invalid: false
}

export default CheckButton