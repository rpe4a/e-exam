import React, {Component} from 'react'

class TaskQuestionBaseThing extends Component {
    constructor (props) {
        super(props)
        
        this.onChange = this.onChange.bind(this)
    }
    

    onChange(e){
        const {thing, handlers} = this.props;
        if(e.target.checked){
            handlers.checkQuestion(thing)
        }else{
            handlers.uncheckQuestion(thing)
        }
    }

    render () {
        const { style, thing } = this.props;
        return (
            <div style={style} className='form-group padding-l-3'>
                <div className='checkbox'>
                    <label>
                        <input type='checkbox'
                            id={thing.id}
                            name='question'
                            checked={thing.checked}
                            onChange={this.onChange}
                            /><i className='fa fa-question-circle padding-lr-1'></i><span>{thing.name}</span>
                    </label>
                </div>
            </div>

        )
    }
}

TaskQuestionBaseThing.propTypes = {
    thing: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default TaskQuestionBaseThing