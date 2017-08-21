import React, {Component} from 'react'
import classname from 'classnames';
import PreLoader from '../components/PreLoader';

class MultiSelectFieldGroup extends Component {
    render() {
        const {label, /*disabledValue,*/ onChange, value, name, options, error, isFetching, EmptyText} = this.props;

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
                    multiple
                    size='10'
                    onChange={onChange}
                    value={value}>
                        
                        {options.map((o, i) => {
                            return <option key={i} value={o.id}>{o.name}</option>
                        })}
                </select>
                {(error) ? <span className='help-block'>{error}</span> : ''}
            </div>
        )
    }
}

MultiSelectFieldGroup.propTypes = {
    label: React.PropTypes.string.isRequired,
    /*disabledValue: React.PropTypes.string.isRequired,*/
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    error: React.PropTypes.string,
    isFetching: React.PropTypes.bool,
    EmptyText: React.PropTypes.string,
};

MultiSelectFieldGroup.getDefaultProps = {
    isFetching: false,
    EmptyText: '',
    error: ''
}

export default MultiSelectFieldGroup