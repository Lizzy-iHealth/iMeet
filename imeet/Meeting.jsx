Meeting = React.createClass({
  propTypes: {
    // This component gets the Meeting to display through a React prop.
    // We can use propTypes to indicate it is required
    meeting: React.PropTypes.object.isRequired
  },
  
  deleteThisMeeting() {
    //Meetings.remove(this.props.Meeting._id);
    Meteor.call("removeMeeting", this.props.meeting._id);
  },

  
  render(){
    return (
      <div>

        <span className="text">
          <strong>{this.props.meeting.username}</strong>: {this.props.meeting.text} : {moment(this.props.meeting.startAt).format("DD,hh")}
        </span>
      </div>
    );
  },



});