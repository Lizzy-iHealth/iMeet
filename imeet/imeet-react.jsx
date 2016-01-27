meetings = new Mongo.Collection("meetings");


if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  Meteor.subscribe("meetings");

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    React.render(<App />, document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  // Only publish meetings that are public or belong to the current user
  Meteor.publish("meetings", function () {
    return meetings.find();
  });

}


Meteor.methods({
  addMeeting(meetInfo) {
    // Make sure the user is logged in before inserting a meeting
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
    meetings.insert({
      text: meetInfo.text,
      startAt: meetInfo.startAt,
      //createdAt: meetInfo.createdAt,
      owner: Meteor.userId(),
      username: Meteor.user().username,
      attandants: meetInfo.attandants,
      numOfAttandants: meetInfo.numOfAttandants,
      statusId:meetInfo.statusId,

    });
  },

  rejectMeeting(meetingId) {
    
    // Make sure the user is logged in before rejecting a meeting
    if (! Meteor.userId()) {
      
      throw new Meteor.Error("not-authorized");
    }
    const meeting = meetings.findOne(meetingId);
    meetings.remove(meetingId);
  },

  //TODO: for owner to remove booked meeting
  removeMeeting(meetingId) {
  	const meeting = meetings.findOne(meetingId);
    // Make sure only owner can remove booked meeting
  	if (meeting.owner !== Meteor.userId()) {

      throw new Meteor.Error("not-authorized");
    }

    meetings.remove(meetingId);
  },

  acceptMeeting(meetingId) {
    // Make sure the user is logged in before accepting a meeting
    if (! Meteor.userId()) {
      
      throw new Meteor.Error("not-authorized");
    }
    var meeting = meetings.findOne(meetingId);

    const userId = Meteor.userId();

    if( meeting.attandants.indexOf(userId) == -1){
      meeting.attandants.push(userId);
      if(meeting.attandants.length === meeting.numOfAttandants){

          meetings.update(meetingId, {$set:{attandants: meeting.attandants, statusId: MeetingStates.BOOKED.id()}});
      }else{
          meetings.update(meetingId, {$set:{attandants: meeting.attandants}});
      }
      //console.log("accept");
    }

  }



});
