import React, {Component} from 'react';
import classnames from 'classnames';

class Directory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({ visible: !this.state.visible });
    }

    render() {
        let childNodes, classObj, things, style;
        const {node, DynamicThingComponent,  DynamicDirectoryViewComponent, handlers} = this.props;

        if (node.children != null) {
            childNodes = node.children.map((node) => {
                return <li key={node.id}>
                            <Directory node={node} 
                                       DynamicThingComponent={DynamicThingComponent} 
                                       DynamicDirectoryViewComponent={DynamicDirectoryViewComponent} 
                                       handlers= {handlers}/>
                      </li>
            });

            classObj = {
                togglable: true,
                'togglable-down': this.state.visible,
                'togglable-up': !this.state.visible
            };
        }

        if (node.things.length > 0) {
            classObj = {
                togglable: true,
                'togglable-down': this.state.visible,
                'togglable-up': !this.state.visible
            };
        }

        if (!this.state.visible) {
            style = { display: 'none' };
        }

        things = node.things.map((t, i) => {
            return <DynamicThingComponent key={i} style={style} thing={t} {...this.props}/>
        })

        return (
            <div className='row'>
                <div  className='col-md-12'>
                    <DynamicDirectoryViewComponent toggle={this.toggle} classname={classnames(classObj)} {...this.props}/>
                    {things}
                    <ul className='ul-style-none' style={style}>
                        {childNodes}
                    </ul>
                </div>
            </div>
        );
    }
}

Directory.propTypes = {
    node: React.PropTypes.object,
    handlers: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
    DynamicThingComponent: React.PropTypes.func.isRequired,
    DynamicDirectoryViewComponent: React.PropTypes.func.isRequired,
};

export default Directory;