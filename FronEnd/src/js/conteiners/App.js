import React, {Component} from 'react'
import NavigationBar  from '../components/NavigationBar';
import FlashMessagesList from '../components/FlashMessagesList'
import MainContainer from '../components/MainContainer'


class App extends Component {
    render() {
        return (
            <MainContainer>
                <NavigationBar />
                <FlashMessagesList />
                {this.props.children}
            </MainContainer>
        )
    }
}

export default App