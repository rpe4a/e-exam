import React, {Component} from 'react'

class AlertsCollection extends Component {
    render() {

        let {alerts} = this.props;
         
        if(alerts.length === 0 || !alerts[0])
            return <div></div>;

        alerts = this.props.alerts.map((a, i) => {
            return (
                <li key={i}>
                    <p>{a}</p>
                </li>
            )
        })

        return (
            <div className={this.props.styles}>
                <h4><strong>{this.props.header}: </strong></h4>
                <ul>
                    {alerts}
                </ul>
            </div>
        )
    }
}

AlertsCollection.propTypes = {
    alerts: React.PropTypes.array.isRequired,
    styles: React.PropTypes.string.isRequired,
    header: React.PropTypes.string,
};

AlertsCollection.defaultProps = {
    header: 'Замечания'
}

export default AlertsCollection