// Day component - represents the whole day
Day = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    startAt: React.PropTypes.object.isRequired
  },
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  
  // Loads items from the meetings collection and puts them on this.data.meetings
  getMeteorData() {

    let query = {};
 
    return {
      meetings: meetings.find(query, {sort: {start: 1}}).fetch(),
      currentUser: Meteor.user()
    };
  },

  get24Hours(){

    var output = [];
    for(var i = 0; i < 24; i++) output.push(i);
    return output;
  },
  
  
  renderMeetings() {
    return this.get24Hours().map( (i) => {
           
      return <Hour
        key = {i}
        status={"available"} startAt={this.props.startAt.clone().add(i, 'hour')} />;
    });
  },
 

  render() {
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