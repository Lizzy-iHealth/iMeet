Hour = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    startAt: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      displayPopup: false
    }
  },

  deleteMeeting() {
    //Tasks.remove(this.props.task._id);
    //Meteor.call("removeTask", this.props.meeting._id);
    Meteor.call("removeMeeting", this.props.meeting._id);
  },
  rejectMeeting() {
    //Tasks.remove(this.props.task._id);
    //Meteor.call("removeTask", this.props.meeting._id);
    Meteor.call("rejectMeeting", this.props.meeting._id);
  },
  acceptMeeting() {
    //Tasks.remove(this.props.task._id);
    //Meteor.call("removeTask", this.props.meeting._id);

    Meteor.call("acceptMeeting", this.props.meeting._id);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextState.displayPopup || nextProps.meeting!==this.props.meeting) return true;

    if (nextProps.meeting ===null) return false;
    if (!this.props.meeting) return true;
    return MeetingStates.from(nextProps.meeting.statusId) !== MeetingStates.from(this.props.meeting.statusId);
  },

  displayPopup:function(){
    this.setState({
      displayPopup : true
    });
  },

  createMeeting: function(event){


    event.preventDefault();
 
    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();
 
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";


    totalUserNumber = 3;

    let numOfAttandants = totalUserNumber;
    let statusId = (numOfAttandants===1? MeetingStates.BOOKED.id():MeetingStates.TANTATIVE.id());
    meetInfo = {
      text : text,
      startAt : this.props.startAt.toDate().getTime(),
      numOfAttandants: numOfAttandants,
      attandants:[this.props.currentUser._id],
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
          //add buttons for tantative meeting:
          MeetingStates.from(meeting.statusId) === MeetingStates.BOOKED?'':(
          <div>
          <button className="delete" onClick={this.rejectMeeting}>&times;</button>
          { // accept button if not accepted yet
            meeting.attandants.indexOf(this.props.currentUser._id) === -1 ? (<button className="accept" onClick={this.acceptMeeting}>&#10004;</button>) : ''}
          </div>)
        }
        </div>
    )
    
  },


  renderAvailable(){
    return this.state.displayPopup? (
      <form className="new-task" onSubmit={this.createMeeting} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new meeting" />
      </form> 
      ):(
        <div className = "available">
          <button className="new" onClick={this.displayPopup}>
            +
          </button>

          <span className="text">
            {this.props.startAt.format("DD,HH:MM:SS")}
          </span>
            
        </div>
    )
  },

  render() {
    console.log("HourRender");
    return   this.props.meeting ? this.renderMeeting(this.props.meeting): this.renderAvailable() ;
  },
});