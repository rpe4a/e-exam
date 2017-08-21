import React, {Component} from 'react'

export default (ComposedComponent) => {
    class DirectoryView extends Component {
        constructor(props) {
            super(props);

            this.getCountChildren = this.getCountChildren.bind(this)
            this.getCountThings = this.getCountThings.bind(this)
            this.isDelete = this.isDelete.bind(this)
        }

        getCountChildren() {
            return this.props.node.children ? this.props.node.children.length : 0;
        }

        getCountThings() {
            return this.props.node.things.length;
        }

        isDelete() {
            return this.getCountChildren() <= 0 && this.getCountThings() <= 0;
        }

        render() {

            return (
                <ComposedComponent {...this.props} getCountChildren={this.getCountChildren} getCountThings={this.getCountThings} isDelete={this.isDelete}/>
            )
        }
    }

    DirectoryView.propTypes = {
        node: React.PropTypes.object.isRequired,
        classname: React.PropTypes.string.isRequired,
        toggle: React.PropTypes.func.isRequired,
        handlers: React.PropTypes.objectOf(React.PropTypes.func),
    };

    return DirectoryView;
};