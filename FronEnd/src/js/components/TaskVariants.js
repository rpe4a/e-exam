import React, {Component} from 'react'
import AlertsCollection from '../components/AlertsCollection';
import Variants from '../components/Variants';

class TaskVariants extends Component {
    render () {

        const {variants, deleteVariant, getSorteredVariant, error} = this.props;


        const alerts = [
            'На данной вкладке Вы можете посмотреть все добавленные Вами ранее варианты задания.',
            'Для каждого конкретного задания тестируемый случайным образом получить один вариант из тех, что Вы добавите.',
            'Чтобы настроить порядок вопросов в варианте, Вы можете использовать простое перетаскивание.',
            'Если выбрано случайное перемещивание, то можете не использовать перетаскивание.',
        ]

        return (
            <div className='row'>
                <div className='col-md-12'>
                    <AlertsCollection styles='alert alert-info' alerts={alerts} />
                    <AlertsCollection styles='alert alert-danger' header='Ошибки' alerts={[error]} />
                </div>
                <div className='col-md-12'>
                    <Variants variants={variants} deleteVariant={deleteVariant} getSorteredVariant={getSorteredVariant}/>    
                </div>
            </div>
        )
    }
}

TaskVariants.propTypes = {
    variants: React.PropTypes.array.isRequired,
    deleteVariant: React.PropTypes.func.isRequired,
    getSorteredVariant: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
}

export default TaskVariants