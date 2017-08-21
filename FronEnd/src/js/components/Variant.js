import React, {Component} from 'react'
/*import SortingVariantQuestions from '../components/SortingVariantQuestions';*/
import classnames from 'classnames';

class Variant extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            isHidden: true,
            variant: {...props.variant},
        }

        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
        this.sortedQuestions = this.sortedQuestions.bind(this)
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({variant: {...nextProps.variant}})
    }
    

    toggle(){
        this.setState({isHidden: !this.state.isHidden})
    }

    delete(){
        this.props.deleteVariant(this.props.variant)
    }

    sortedQuestions(questions){
        const {variant} = this.state;
        this.props.getSorteredVariant({...variant, questions});
    }

    render () {
        const {isHidden, variant, } = this.state;
        const {deleteVariant, DinamicVariantQiestionView} = this.props;
        return (
                <div className='panel panel-info'>
                    <div className='panel-heading'>
                        <span>{variant.name}</span>
                        <span className='badge text-success margin-lr-1' title='Количество вопросов в варианте'><i className='fa fa-question-circle'></i> {variant.questions.length}</span>
                        {variant.isRandomOrder && <i title='Случайное перемещивание вопросов' className='fa fa-random '></i>}
                        <i title={(isHidden) ? 'Развернуть' : 'Свернуть'} onClick={this.toggle} className={classnames('fa fa-lg pull-right cursor-pointer', {'fa-angle-down': isHidden} , {'fa-angle-up': !isHidden})}></i>
                        {deleteVariant && <i title='Удалить' onClick={this.delete} className='fa fa-lg fa-times pull-right cursor-pointer margin-lr-1'></i>}
                    </div>
                    <DinamicVariantQiestionView questions={variant.questions} isHidden={isHidden} handler={(variant.isRandomOrder) ? '' : this.sortedQuestions}/>
                </div>
        )
    }
}

Variant.propTypes = {
    variant: React.PropTypes.object.isRequired,
    deleteVariant: React.PropTypes.func,
    getSorteredVariant: React.PropTypes.func,
    DinamicVariantQiestionView: React.PropTypes.func.isRequired
}

export default Variant