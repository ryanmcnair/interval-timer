import React from 'react';
import { Button } from 'reactstrap';

export default class Timer extends React.Component {
  state = {
    rounds: null,
    restTime: null,
    workTime: null,
    currentTime: null,
    currentRound: null,
    isWork: true,
    isRunning: false,
  };

  handleInputChange = (e) => {
    switch (e.target.id) {
      case 'rounds':
        this.setState({
          rounds: e.target.value,
          currentRound: e.target.value,
        });
        break;
      case 'workTime':
        this.setState({ workTime: e.target.value });
        this.setState({ currentTime: e.target.value });
        break;
      case 'restTime':
        this.setState({ restTime: e.target.value });
        break;
      default:
        this.manageInterval(e.target.id);
        break;
    }
  };

  manageInterval = (cmd) => {
    const {
      rounds,
      restTime,
      workTime,
    } = this.state;
    if (
      cmd === 'start' && this.state.currentTime >= 0 && workTime > 0 && restTime > 0 && rounds > 0 && !this.state.isRunning
    ) {
      this.setState({ isRunning: true });
      if (this.state.isWork) {
        this.setState({ currentSetType: 'Work' });
      }
      this.timer = setInterval(() => {
        if (this.state.currentTime === 0) {
          if (this.state.isWork) {
            this.setState({ currentSetType: 'Rest' });
            this.setState({ currentTime: restTime });
          } else {
            this.setState({ currentSetType: 'Work' });
            this.setState({ currentTime: workTime });
            this.setState({ currentRound: this.state.currentRound - 1 });
            if (this.state.currentRound === 0) {
              clearInterval(this.timer);
              // fixes bug when rounds equals zero it resets state but it needs to get state again
              this.setState({
                rounds: this.state.rounds,
                restTime: this.state.restTime,
                workTime: this.state.workTime,
                currentRound: this.state.rounds,
                currentSetType: null,
                isRunning: false,
              });
            }
          }
          this.setState({ isWork: !this.state.isWork });
          return;
        }
        this.setState({ currentTime: this.state.currentTime - 1 });
      }, 1000);
    } else if (cmd === 'stop') {
      this.setState({
        isRunning: false,
      });
      clearInterval(this.timer);
    } else if (cmd === 'reset') {
      this.setState({
        rounds: null,
        restTime: null,
        workTime: null,
        currentTime: null,
        currentRound: null,
        currentSetType: null,
        isRunning: false,
      });
      clearInterval(this.timer);
    }
  };

  render() {
    return (
      <div>
      <div>
        <h2>Timer Display</h2>
        <div>Rounds: {this.state.rounds}</div>
        <div>Work Time: {this.state.workTime}</div>
        <div>Rest Time: {this.state.restTime}</div>
      </div>
      <div>
        <div> Current Round: {this.state.rounds}</div>
        <div> {this.state.currentSetType}</div>
        <div> Current Time: {this.state.currentTime}</div>
      </div>
      <div>
        <div>
          <label htmlFor="rounds">Rounds:</label>
          <input
            onChange={this.handleInputChange}
            type="number"
            id="rounds"
            name="rounds"
            min="1"
            max="15"
          />
        </div>
        <div>
          <label htmlFor="workTime">Work Time (sec):</label>
          <input
            onChange={this.handleInputChange}
            type="number"
            id="workTime"
            name="workTime"
            min="1"
            max="360"
          />
        </div>
        <div>
          <label htmlFor="restTime">Rest Time (sec):</label>
          <input
            onChange={this.handleInputChange}
            type="number"
            id="restTime"
            name="restTime"
            min="1"
            max="360"
          />
        </div>
        <Button id="start" color="success" onClick={this.handleInputChange}>
          Start
        </Button>
        <Button id="stop" color="danger" onClick={this.handleInputChange}>
          Stop
        </Button>
        <Button id="reset" color="warning" onClick={this.handleInputChange}>
          Reset
        </Button>
      </div>
    </div>

    );
  }
}
