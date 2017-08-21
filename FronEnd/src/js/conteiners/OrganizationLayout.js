import React, {Component} from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

class OrganizationLayout extends Component {
    render() {

        return (
            <div>
                <Breadcrumbs routes={this.props.routes} />     
                {this.props.children}
            </div>
        );
    }
}

export default OrganizationLayout;