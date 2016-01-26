Hour = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    startAt: React.PropTypes.object.isRequired

  },

    // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {

    let query = {};
    let m = meetings.find({startAt: this.props.startAt.toDate().getTime()}).fetch();

    return {
      meeting: m.count===0? null:m[0],
      currentUser: Meteor.user()
    };

  },

  deleteMeeting() {
    //Tasks.remove(this.props.task._id);
    //Meteor.call("removeTask", this.props.meeting._id);
    Meteor.call("removeMeeting", this.data.meeting._id);
  },

  acceptMeeting() {
    //Tasks.remove(this.props.task._id);
    //Meteor.call("removeTask", this.props.meeting._id);

    Meteor.call("acceptMeeting", this.data.meeting._id);
  },

  createMeeting: function(text){

    totalUserNumber = 2;

    let numOfAttandants = totalUserNumber;
    let statusId = (numOfAttandants===1? MeetingStates.BOOKED.id():MeetingStates.TANTATIVE.id());
    meetInfo = {
      text : "No Title",
      startAt : this.props.startAt.toDate().getTime(),
      numOfAttandants: numOfAttandants,
      attandants:[this.data.currentUser._id],
      statusId: statusId,
    };


    Meteor.call("addMeeting", meetInfo);
  },

  renderMeeting(meeting){
    return (
        <div>
        <Meeting 
        key={meeting._id} 
        meeting={meeting}/>
        {
          //add button for tantative meeting:
          MeetingStates.from(meeting.statusId).isBooked()?'':(
            <div>
          <button className="delete" onClick={this.deleteMeeting}>
            &times;
          </button>

          <button className="accept" onClick={this.acceptMeeting}>
            &#10004;
          </button>
          </div>)
        }
        </div>
    )
    
  },

  renderAvailable(){
    return (
        <div className = "available">
        <input
          type="button"
          readOnly={true}
          onClick={this.createMeeting} />

        <span className="text">
        {this.props.startAt.format("DD,HH:MM:SS")}
        </span>
        </div>
      );
  },

  render() {
    return   this.data.meeting ? this.renderMeeting(this.data.meeting): this.renderAvailable() ;
  },
});