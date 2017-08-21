import React, {Component } from 'react'
import classname from 'classnames';

class InputFieldGroup extends Component {
    render() {
        const { name, value, label, type, error, onChange, placeholder, checkUserExists, disabled, visible} = this.props;

        return (
            <div className={classname('form-group', { 'has-feedback has-error': error, 'hidden': visible }) }>
                <label htmlFor={`input-${name}`} className='control-label'>{label}</label>
                <input
                    type={type}
                    name={name}
                    id={`input-${name}`}
                    className='form-control'
                    value={value}
                    onChange={onChange}
                    onBlur={checkUserExists}
                    placeholder={placeholder}
                    disabled={disabled}
                    />
                {(error) ? <span className='glyphicon glyphicon-remove form-control-feedback'></span> : ''}
                {(error) ? <span className='help-block'>{error}</span> : ''}
            </div>
        )
    }
}

InputFieldGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func,
    checkUserExists: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    visible: React.PropTypes.bool,
}

InputFieldGroup.getDefaultProps = {
    disabled: false
}

export default InputFieldGroup