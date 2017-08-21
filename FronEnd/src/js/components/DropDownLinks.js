import React, {Component} from 'react'
import classnames from 'classnames';
import { Link } from 'react-router';

class DropDownLinks extends Component {
    render() {
        const {text, links, disabled, headerStyle, buttonStyle} = this.props;

        return (
            <div className={classnames('btn-group', headerStyle) }>
                <button type='button' className={classnames('btn dropdown-toggle', buttonStyle) } disabled={disabled} data-toggle='dropdown'>{text} <span className='caret'></span></button>
                <ul className='dropdown-menu' role='menu'>
                    {links.map((l, i) => {
                        return <li key={i}>
                            <Link to={l.href}>{l.text}</Link>
                        </li>
                    }) }
                </ul>
            </div>
        )
    }
}

DropDownLinks.propTypes = {
    text: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    links: React.PropTypes.array.isRequired,
    headerStyle: React.PropTypes.string,
    buttonStyle: React.PropTypes.string,
}

DropDownLinks.getDefaultProps = {
    disabled: false
}

export default DropDownLinks