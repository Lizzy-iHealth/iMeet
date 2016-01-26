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
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      attandants: meetInfo.attandants,
      numOfAttandants: meetInfo.numOfAttandants,
      statusId:meetInfo.statusId,

    });
  },
 
  removeMeeting(meetingId) {
  	const meeting = meetings.findOne(meetingId);
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
      newAttandants = meeting.attandants.push(userId);
      if(newAttandants.length === meeting.numOfAttandants){

          meetings.update(meetingId, {$set:{attandants: newAttandants, statusId: MeetingStates.BOOKED.id()}});
      }else{
          meetings.update(meetingId, {$set:{attandants: newAttandants}});
      }
      console.log("accept");
    }

  }



});
