MeetingStates = new Enumeration('MeetingStates', {
  TANTATIVE: { _id: 3, msg: "tentative" }, 
  BOOKED: { _id: 1, msg: "booked" }, 
  CANCELLED: { _id: 2, msg: "cancelled" }
}, { 
  report: function() {
    console.log(this.msg);
  },

  isBooked: function(){
  	return this._id===1;
  }
});

HourStates = new Enumeration('HourStates', {
  BUSY:      { _id: 0, msg: "busy" }, 
  AVAILABLE: {_id: 3, msg: "available"}
}, { 
  report: function() {
    console.log(this.msg);
  }
});