import React, {Component} from 'react'
import FilteredMultiSelect from 'react-filtered-multiselect'

class MultiSelect extends Component {
    render() {
        const {options, selectedOptions, textProp, valueProp, handleSelectionChange, buttonText, size, placeholder} = this.props;

        if(!options){
            return <p><span className='label label-warning'>Нет данных.</span></p>
        }

        return (
            <FilteredMultiSelect
                onChange={handleSelectionChange}
                options={options}
                selectedOptions={selectedOptions}
                textProp={textProp}
                valueProp={valueProp}
                size={+size}
                placeholder={placeholder}
                buttonText={buttonText}
                classNames={
                    {
                        button: 'btn btn-primary',
                        buttonActive: 'btn btn-primary',
                        filter: 'form-control',
                        select: 'form-control',
                    }
                }
                />
        )
    }
}

MultiSelect.propTypes = {
    options: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
    selectedOptions: React.PropTypes.array.isRequired,
    textProp: React.PropTypes.string.isRequired,
    valueProp: React.PropTypes.string.isRequired,
    size: React.PropTypes.string.isRequired,
    buttonText: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    handleSelectionChange: React.PropTypes.func.isRequired,
};

export default MultiSelect