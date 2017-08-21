import React, {Component} from 'react';
/*import classnames from 'classnames';*/

class FlashMessage extends Component {
    constructor (props) {
        super(props)
        
        this.onClick = this.onClick.bind(this)
    }
    
    onClick(){
        this.props.deleteFlashMessage(this.props.message)
    }

    render() { 

        const {id, type, text} = this.props.message;

        return (
            <div id={id} className={`alert alert-${type}`}>
                <button onClick={this.onClick} className='close'><i className='fa fa-times'></i></button>
                {text}
            </div>
        )
    }
}

FlashMessage.propTypes = {
    message: React.PropTypes.object.isRequired,
    /*deleteFlashMessage: React.PropTypes.func.isRequired,*/
};

export default FlashMessage