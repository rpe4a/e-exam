import React, {Component} from 'react'
import Variant from '../components/Variant';
import SortingVariantQuestions from '../components/SortingVariantQuestions';


class Variants extends Component {

    _getVariantsView() {
        const {variants, deleteVariant, getSorteredVariant} = this.props;

        if (variants.length > 0)
            return (variants.map((v, i) => {
                return <Variant key={i} variant={v} deleteVariant={deleteVariant} getSorteredVariant={getSorteredVariant} DinamicVariantQiestionView={SortingVariantQuestions}/>
            }))
        else
            return (
                <div className=' alert alert-warning'>
                    У Вас пока, нет вариантов.Пожалуйста добавьте их.
                </div>
            )
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='panel panel-primary'>
                        <div className='panel-heading'><h4>Добавленные варианты</h4></div>
                        <div className='panel-body'>
                            <div className='col-md-12'>
                                {:: this._getVariantsView() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Variants.propTypes = {
    variants: React.PropTypes.array.isRequired,
    deleteVariant: React.PropTypes.func.isRequired,
    getSorteredVariant: React.PropTypes.func.isRequired,
}

export default Variants