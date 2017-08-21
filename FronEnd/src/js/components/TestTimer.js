import React, {Component} from 'react';

let offset = null, interval = null, timeLeft = null;

let SecondsTohhmmss = function (totalSeconds) {
    let hours = (Math.floor(totalSeconds / 3600)).toFixed();
    let minutes = (Math.floor((totalSeconds - (hours * 3600)) / 60)).toFixed();
    let seconds = (totalSeconds - (hours * 3600) - (minutes * 60)).toFixed();

    // round seconds
    seconds = (Math.round(seconds * 100) / 100).toFixed()

    let result = (hours < 10 ? '0' + hours : hours);
    result += ':' + (minutes < 10 ? '0' + minutes : minutes);
    result += ':' + (seconds < 10 ? '0' + seconds : seconds);
    return result;
}

class TestTimer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clock: 0,
            time: SecondsTohhmmss((props.timeTestInterval - (Date.now() - props.startTestTime)) / 1000)
        }

        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.play();
    }

    componentWillUnmount() {
        if (interval) {
            clearInterval(interval)
            interval = null
        }
    }

    play() {
        offset = Date.now();


        timeLeft = offset - this.props.startTestTime;
        /*offset = this.props.startTestTime > 0 ? offset - this.props.startTestTime : offset;*/
        interval = setInterval(this.update, 1000);
    }

    update() {
        let clock = this.state.clock;
        clock += this.calculateOffset();

        let time = (this.props.timeTestInterval - timeLeft - clock) / 1000;

        if (time <= 0)
            this.props.TimeOut();

        time = SecondsTohhmmss(time);
        this.setState({ time: time, clock: clock });

        /* this.props.GetElapsedTime(this.state.clock);*/

    }

    calculateOffset() {
        let now = offset + 1000;
        let newOffset = now - offset;
        offset = now;
        return newOffset;
    }

    render() {
        /*console.log('Timer');*/

        return (
            <b>{this.state.time}</b>
        );
    }
}

TestTimer.propTypes = {
    timeTestInterval: React.PropTypes.number.isRequired,
    startTestTime: React.PropTypes.number,
    /*elapsedTime: React.PropTypes.number,*/
    /*GetElapsedTime: React.PropTypes.func.isRequired,*/
    TimeOut: React.PropTypes.func.isRequired,
}

export default TestTimer;