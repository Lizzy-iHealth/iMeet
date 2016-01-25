Hour = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    startAt: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {status: HourStates.AVAILABLE};
  },

  deleteThisTask() {
    //Tasks.remove(this.props.task._id);
    Meteor.call("removeTask", this.props.meeting._id);
  },

  createMeeting: function(){
    this.setState({status : HourStates.BUSY});
  },


  render() {

    // Give tasks a different className according to different status
    // so that we can style them nicely in CSS
    const hourClassName = "available"

    return (
      <div className={hourClassName}>

      { this.state.status === HourStates.BUSY? (
        <button className="reject" onClick={this.deleteThisTask}>
          &times;
        </button>
        ) : ''
      }
 
        <input
          type="button"
          readOnly={true}
          onClick={this.createMeeting} />

        <span className="text">
        {this.state.status.msg}
        </span>
      </div>
    );
  }
});