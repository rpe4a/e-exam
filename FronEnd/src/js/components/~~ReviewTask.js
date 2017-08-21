import React, {Component} from 'react';
import PreLoader from '../components/PreLoader';
import Variant from '../components/Variant';
import ReviewQuestionsVariant from '../components/ReviewQuestionsVariant';
import ReviewProperty from '../components/ReviewProperty';

class ReviewTask extends Component {
    rawMarkup(text) {
        return { __html: text };
    }

    render() {
        const {isFetching, name, description, typeName, dirName, variants} = this.props.task;

        if (isFetching)
            return <PreLoader />

        return (
            <div >
                <ReviewProperty label='Название' name={name}/>
                <ReviewProperty label='Тип задания' name={typeName}/>
                <ReviewProperty label='Родительская директория' name={dirName}/>
                <hr/>
                <h4><strong>Описание: </strong></h4>
                <div dangerouslySetInnerHTML={this.rawMarkup(description) }></div>
                <hr/>
                <h4><strong>Варианты: </strong></h4>
                <div>
                    {variants.map((v, index) => {
                        return <Variant key={index} variant={v} DinamicVariantQiestionView={ReviewQuestionsVariant} />
                    }) }
                </div>
                <hr/>
                <button onClick={this.context.router.goBack} type='button' className='btn btn-default'>Назад</button>
            </div>
        );
    }
}

ReviewTask.propTypes = {
    task: React.PropTypes.object.isRequired,
};

ReviewTask.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default ReviewTask;