import React, { Component } from 'react';

class ButtonComponent extends Component {
    render() {

        const { isLoding, className, text, invalid, onClick} = this.props;

        let buttonBody;

        if (isLoding) {
            buttonBody = <span><i className='fa fa-spinner fa-spin fa-fw'></i>Подождите</span>
        } else {
            buttonBody = text
        }

        return (
            <button disabled={isLoding || invalid}
                className={className}
                onClick={onClick || ''}>
                {buttonBody}
            </button>
        );
    }
}

ButtonComponent.propTypes = {
    isLoding: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    className: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    onClikc: React.PropTypes.func
};

ButtonComponent.defaultProps = {
    isLoding: false,
    invalid: false
}

export default ButtonComponent;