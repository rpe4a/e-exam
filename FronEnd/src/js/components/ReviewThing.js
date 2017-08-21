import React, {Component} from 'react';
import PreLoader from '../components/PreLoader';
import ReviewProperty from '../components/ReviewProperty';
import ReviewQuestionsVariant from '../components/ReviewQuestionsVariant';
import { Link } from 'react-router';

const typeChildrenReview ={
    tasks: 'tasks',
    variants: 'variants',
    answers: 'answers'
}

class ReviewThing extends Component {
    constructor(props){
        super(props)

        this._getPropViews = this._getPropViews.bind(this)
        this._getEdiLink = this._getEdiLink.bind(this)
    }

    _getPropViews(){
        const {thing, properties, ChangePropName} = this.props;
        let props = [], index = 0;
        for (let a in properties) {
            if (properties.hasOwnProperty(a)) {
                if(!Array.isArray(thing[a]))
                    props.push(<ReviewProperty key={index++} label={properties[a]} name={ChangePropName ? ChangePropName(a) : thing[a]}/>)
            }
        }
        return props;

    }

    _getEdiLink(){
        let editUrl = '', {children, thing} = this.props;
        switch (children) {
            case typeChildrenReview.tasks:
                editUrl = `/organization/exambase/mergeexam/${thing.id}`
                break;
            case typeChildrenReview.variants:
                editUrl = `/organization/taskbase/mergetask/${thing.id}`
                break;
            case typeChildrenReview.answers:
                editUrl = `/organization/questionbase/mergequestion/${thing.id}`
                break;
        }

        return <Link to={editUrl} className='btn btn-primary '>Редактировать</Link>
    }

    rawMarkup(text) {
        return { __html: text };
    }

    render() {
        const {properties, DynamicChildrenView, thing, children} = this.props;
        if (thing.isFetching)
            return <PreLoader />

        return (
            <div >
                {this._getPropViews()}
                <hr/>
                <h4><strong>Описание: </strong></h4>
                <div dangerouslySetInnerHTML={this.rawMarkup(thing.description) }></div>
                <hr/>
                <h4><strong>{properties[children]}: </strong></h4>
                <div>
                    {thing[children].map((t, index) => {
                        switch (children) {
                            case typeChildrenReview.tasks:
                                return <DynamicChildrenView key={index} task={t}/>
                            case typeChildrenReview.variants:
                                return <DynamicChildrenView key={index} variant={t} DinamicVariantQiestionView={ReviewQuestionsVariant}/>
                            case typeChildrenReview.answers:
                                return <DynamicChildrenView key={index} answer={t} index={index} type={thing.type}/>
                        }
                    }) }
                </div>
                <hr/>
                {this._getEdiLink()}
                <button onClick={this.context.router.goBack} type='button' className='btn btn-default margin-l-1'>Назад</button>
            </div>
        );
    }
}

ReviewThing.propTypes = {
    thing: React.PropTypes.object.isRequired,
    properties: React.PropTypes.object.isRequired,
    children: React.PropTypes.string.isRequired,
    DynamicChildrenView: React.PropTypes.func.isRequired,
    ChangePropName: React.PropTypes.func,
};

ReviewThing.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default ReviewThing;