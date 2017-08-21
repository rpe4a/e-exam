import React, {Component} from 'react';

class ReviewProperty extends Component {
    render() {
        const {label, name} = this.props;

        return (
            <p><label>{label}: </label> {name}</p>
        );
    }
}

ReviewProperty.propTypes = {
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.oneOfType([React.PropTypes.string,
        React.PropTypes.number,]),
};

export default ReviewProperty;