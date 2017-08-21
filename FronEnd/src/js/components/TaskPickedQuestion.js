import React, {Component} from 'react'

class TestPickedQuestion extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        if (e.target.checked) {
            this.props.onCheckVariantQuestion(this.props.question)
        } else {
            this.props.onUnCheckVariantQuestion(this.props.question)
        }
    }

    render() {
        const { question, checked } = this.props;
        return (
            <div className='form-group'>
                <div className='checkbox'>
                    <label>
                        <input type='checkbox'
                            id={question.id}
                            name='question'
                            checked={checked}
                            onChange={this.onChange}
                            /><i className='fa fa-question-circle padding-lr-1'></i><span>{question.name}</span>
                    </label>
                </div>
            </div>

        )
    }
}

TestPickedQuestion.propTypes = {
    question: React.PropTypes.object.isRequired,
    checked: React.PropTypes.bool.isRequired,
    onCheckVariantQuestion: React.PropTypes.func.isRequired,
    onUnCheckVariantQuestion: React.PropTypes.func.isRequired,
}

export default TestPickedQuestion