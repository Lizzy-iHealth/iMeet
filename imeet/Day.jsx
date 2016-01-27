// Day component - represents the whole day
Day = React.createClass({
  propTypes: {
    // This component render a day label and 24 Unit components
    startAt: React.PropTypes.object.isRequired
  },
  // This mixin makes the getMeteorData method work

  get24Hours(){

    var output = [];
    for(var i = 0; i < 24; i++) output.push(i);
    return output;
  },
  
  
  renderMeetings() {
    return this.get24Hours().map( (i) => {
           
      return <Unit
        key = {i}
        startAt={this.props.startAt.clone().add(i, 'hour')} />;
    });
  },
 

  render() {
    //console.log("DayRender")
    return (
      <div className="dayview">
        <div>
          {this.props.startAt.format("dddd (DD)")}
        </div>
          {this.renderMeetings()}
        
      </div>
    );
  }
});