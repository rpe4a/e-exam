import React, {Component} from 'react'
import {taskTypes}  from '../utils/constants';

class ExamTaskBaseThing extends Component {
    constructor (props) {
        super(props)
        
        this.onChange = this.onChange.bind(this)
    }
    

    onChange(e){
        const {thing, handlers} = this.props;
        if(e.target.checked){
            handlers.checkTask(thing)
        }else{
            handlers.uncheckTask(thing)
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
                            />{(thing.type == taskTypes.test) ? <i title='Тест' className='fa fa-align-justify padding-lr-1'></i> :
                                                  <i title='Свободная форма ответа' className='fa fa-pencil-square-o padding-lr-1'></i>}<span>{thing.name}</span>
                    </label>
                </div>
            </div>

        )
    }
}

ExamTaskBaseThing.propTypes = {
    thing: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    handlers: React.PropTypes.objectOf(React.PropTypes.func),
}

export default ExamTaskBaseThing