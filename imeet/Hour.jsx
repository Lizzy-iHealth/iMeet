Hour = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    startAt: React.PropTypes.object.isRequired,
    status: React.PropTypes.object.isRequired
  },

  deleteThisTask() {
    //Tasks.remove(this.props.task._id);
    Meteor.call("removeTask", this.props.meeting._id);
  },

  createMeeting(){

  },

  render() {

    // Give tasks a different className according to different status
    // so that we can style them nicely in CSS
    const hourClassName = "available"

    return (
      <div className={hourClassName}>

      { this.props.status === "tentative" ? (
        <button className="reject" onClick={this.deleteThisTask}>
          &times;
        </button>
        ) : ''
      }
 
        <input
          type="hidden"
          readOnly={true}
          onClick={this.createMeeting} />

        <span className="text">
        </span>
      </div>
    );
  }
});