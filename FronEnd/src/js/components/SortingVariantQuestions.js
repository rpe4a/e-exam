import React, {Component} from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import classnames from 'classnames';

const SortableItem = SortableElement(({value, index}) => <li className='list-group-item'><strong>{index+1})</strong> {value.name}</li>);

const SortableList = SortableContainer(({items, isHidden}) => {
        return (
            <ul className={classnames('list-group', {'hidden': isHidden})}>
                {items.map((value, index) =>
                    <SortableItem key={`item-${index}`} index={index} value={value} />
                )}
            </ul>
    )
 
});

class SortingVariantQuestions extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            questions: [...props.questions],
            isHidden: props.isHidden,
        }

        this.onSortEnd = this.onSortEnd.bind(this)
    }

    onSortEnd({oldIndex, newIndex}){
        if(this.props.handler && oldIndex !== newIndex)
            this.props.handler(arrayMove(this.state.questions, oldIndex, newIndex)); 
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isHidden: nextProps.isHidden, questions: [...nextProps.questions]})
    }

    render () {
        const {questions, isHidden} = this.state;

        if(questions.length < 0){
            return (<ul></ul>)
        }
        return (
            <SortableList items={questions} isHidden={isHidden} onSortEnd={this.onSortEnd} />
        )
    }
}

SortingVariantQuestions.propTypes = {
    questions: React.PropTypes.array.isRequired,
    isHidden: React.PropTypes.bool.isRequired,
    handler: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func,
    ]),
}

export default SortingVariantQuestions