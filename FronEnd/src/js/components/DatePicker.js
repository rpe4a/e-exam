import React, {Component} from 'react'
import classname from 'classnames';
import $ from 'jquery';

class DatePicker extends Component {

    componentDidMount() {
        const datepicker = this.refs.datepicker, {onChange, name, minDate} = this.props;
        $(datepicker).datetimepicker({
            locale: 'ru',
            format: 'DD.MM.YYYY',
            minDate
        })
            .on('dp.change', function (e) {
                onChange({ [name]: (e.date._d) ? e.date._d.toLocaleDateString() : '' })
            }.bind(this));
    }

    render() {
        let { name, value, label, error, placeholder} = this.props;
        return (
            <div className={classname('form-group', { 'has-feedback has-error': error }) }>
                <label className='control-label'>{label}</label>
                <div className='input-group date' id={`datepiker-${name}`} ref='datepicker'>
                    <input
                        type='text'
                        name={name}
                        className='form-control'
                        value={value}
                        placeholder={placeholder}
                        />
                    <span className='input-group-addon'>
                        <span className='glyphicon glyphicon-calendar'></span>
                    </span>
                </div>

                {(error) ? <span className='help-block'>{error}</span> : ''}
            </div>
        )
    }
}

DatePicker.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.oneOfType([React.PropTypes.string,
        React.PropTypes.date,]),
    minDate: React.PropTypes.object,
    label: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    onChange: React.PropTypes.func,
}

DatePicker.getDefaultProps = {
    minDate: false
}

export default DatePicker