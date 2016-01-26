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
  getInitialState: function() {
    
    return {status:HourStates.AVAILABLE};
  },

  deleteThisTask() {
    //Tasks.remove(this.props.task._id);
    //Meteor.call("removeTask", this.props.meeting._id);
    this.setState({status : HourStates.AVAILABLE});
  },

  createMeeting: function(){

    meetInfo = {
      text : "No Title",
      startAt : this.props.startAt.toDate().getTime(),
      numOfAttandants: 2,
      attandants:[this.data.currentUser],
    };
    Meteor.call("addMeeting", meetInfo);
  },

  renderMeeting(meeting){
    return <Meeting
        key={meeting._id}
        meeting={meeting}/>;
    
  },

  renderAvailable(){

  },

  render() {

    // Give tasks a different className according to different status
    // so that we can style them nicely in CSS
    const hourClassName = this.state.status.msg;

    return (
      <div className={hourClassName}>

      //{ this.state.status === HourStates.BUSY? this.renderMeeting(this.data.meeting):''}
      { this.data.meeting ? this.renderMeeting(this.data.meeting):''}
        
        <input
          type="button"
          readOnly={true}
          onClick={this.createMeeting} />

        <span className="text">
        {this.state.status.msg + this.props.startAt.format("DD,HH:MM:SS")}
        </span>
      </div>
    );
  }
});