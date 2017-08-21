import React, {Component} from 'react'
import classname from 'classnames';
import PreLoader from '../components/PreLoader';

class SelectFieldGroup extends Component {
    render() {
        const {label, disabledValue, onChange, value, name, options, error, isFetching, EmptyText} = this.props;

        if(isFetching)
            return <PreLoader />    
        if(options.length <= 0)
            return <p><span className='label label-warning'>{EmptyText}</span></p>

        return (
            <div className={classname('form-group', { 'has-feedback has-error': error }) }>
                <label className='control-label'>{label}</label>
                <select
                    className='form-control'
                    name={name}
                    onChange={onChange}
                    value={value}>
                        <option value='' disabled>{disabledValue}</option>
                        {options.map((o, i) => {
                            return <option key={i} value={o.id}>{o.name}</option>
                        })}
                </select>
                {(error) ? <span className='help-block'>{error}</span> : ''}
            </div>
        )
    }
}

SelectFieldGroup.propTypes = {
    label: React.PropTypes.string,
    disabledValue: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    error: React.PropTypes.string,
    isFetching: React.PropTypes.bool,
    EmptyText: React.PropTypes.string,
};

SelectFieldGroup.getDefaultProps = {
    isFetching: false,
    EmptyText: '',
    error: ''
}

export default SelectFieldGroup