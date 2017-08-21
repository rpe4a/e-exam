import React, {Component} from 'react';
import classname from 'classnames';

class TextAreaGroup extends Component {
    render() {

        const { name, value, label, error, onChange, placeholder, cols, rows } = this.props;

        return (
            <div className={classname('form-group', { 'has-feedback has-error': error }) }>
                <label htmlFor={`textarea-${name}`} className='control-label'>{label}</label>
                <textarea name={name}
                    id={`textarea-${name}`}
                    className='form-control'
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    cols={cols} rows={rows}>
                </textarea>
                {(error) ? <span className='glyphicon glyphicon-remove form-control-feedback'></span> : ''}
                {(error) ? <span className='help-block'>{error}</span> : ''}
            </div>
        );
    }
}

TextAreaGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func,
}

TextAreaGroup.getDefaultProps = {
    cols: '30',
    rows: '10'
}

export default TextAreaGroup;