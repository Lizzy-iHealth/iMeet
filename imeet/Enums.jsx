MeetingStates = new Enumeration('MeetingStates', {
  TANTATIVE:      { _id: 0, msg: "tentative" }, 
  BOOKED: { _id: 1, msg: "booked" }, 
  CANCELLED: { _id: 2, msg: "cancelled" }
}, { 
  report: function() {
    console.log(this.msg);
  }
});

HourStates = new Enumeration('HourStates', {
  TANTATIVE:      { _id: 0, msg: "tentative" }, 
  BOOKED: { _id: 1, msg: "booked" }, 
  CANCELLED: { _id: 2, msg: "cancelled" },
  AVAILABLE: {_id: 3, msg: "available"}
}, { 
  report: function() {
    console.log(this.msg);
  }
});