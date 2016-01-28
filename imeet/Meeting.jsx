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
    //const meetingClassName = MeetingStates.from(this.props.meeting.statusId).msg;
    //MeetingStates.from(this.props.meeting.statusId).report();
    console.log("renderMeeing")
    return (
      <div>
        <span >
          {this.props.meeting.text} 
        </span>
      </div>
    );
  },



});