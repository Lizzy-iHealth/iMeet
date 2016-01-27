// TimeFrame component - represents the whole day

FrameUnit = React.createClass({
  propTypes: {
    // This component gets the Meeting to display through a React prop.
    // We can use propTypes to indicate it is required
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
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    startAt: React.PropTypes.object.isRequired
  },
  // This mixin makes the getMeteorData method work

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
    console.log("DayRender")
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