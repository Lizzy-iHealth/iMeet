// TimeFrame component - represents the whole day

FrameUnit = React.createClass({
  propTypes: {
    // This component display a time label.
    startAt: React.PropTypes.object.isRequired,
  },
  render(){
    return (
      <div>
        <span className= "noUser">
          {this.props.startAt.format("h:mm a")}
        </span>
      </div>
    );
  },
});

TimeFrame = React.createClass({
  propTypes: {
    // This component display the time axis of the calendar, containing 24 FrameUnits, each for an hour
    startAt: React.PropTypes.object.isRequired
  },

  get24Hours(){

    var output = [];
    for(var i = 0; i < 24; i++) output.push(i);
    return output;
  },
  
  
  renderFrameUnits() {
    return this.get24Hours().map( (i) => {
           
      return <FrameUnit
        key = {i}
        startAt={this.props.startAt.clone().add(i, 'hour')} />;
    });
  },
 

  render() {
    //console.log("TimeAxis Render")
    return (
      <div className="dayview">
        <div>
          {this.props.startAt.format("YYYY/MMM")}
        </div>
          {this.renderFrameUnits()}    
      </div>
    );
  }
});