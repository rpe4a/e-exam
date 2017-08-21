import React, {Component} from 'react';
import Subscription from '../components/Subscription';
import FiltratingInput from '../components/FiltratingInput';

class UserSubscription extends Component {
    constructor (props) {
        super(props)

        this.state = {
            userSubscription: props.userSubscription
        }
        this.FilterSubscription = this.FilterSubscription.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({userSubscription: nextProps.userSubscription})
    }

    FilterSubscription(subscription){
        this.setState({userSubscription: subscription})
    }

    render() {
        const {userSubscription} = this.state;
        
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <form className='form-inline'>
                        <FiltratingInput items={this.props.userSubscription} field='name' placeholder='Поиск по подпискам' onChange={this.FilterSubscription}/>
                    </form>
                </div>
                <ul className='list-group'>
                    {userSubscription.map((s, i) => {
                        return <Subscription key={i} subscription={s} addFlashMessage={this.props.addFlashMessage} unSubscription={this.props.unSubscription} deleteSubscription={this.props.deleteSubscription} />
                    }) }
                </ul>
            </div>
        );
    }
}

UserSubscription.propTypes = {
    userSubscription: React.PropTypes.array.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    unSubscription: React.PropTypes.func.isRequired,
    deleteSubscription: React.PropTypes.func.isRequired,
}

export default UserSubscription;