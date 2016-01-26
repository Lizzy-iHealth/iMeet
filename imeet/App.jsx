// App component - represents the whole app
App = React.createClass({
  propTypes: {
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
  
  getDefaultProps: function () {
    today = moment();
    firstSunday = today.startOf('week');
    return { startAt: firstSunday };
  },

  getWeekDays(){
    return [0,1,2,3,4,5,6];
  },

  renderDays() {
    return this.getWeekDays().map( (i) => {
           
      return <Day
        key = {i}
        startAt = {this.props.startAt.clone().add(i, 'day')}  />;
    });
  },
  
  render() {
    return (
      <div className="container">
        <header>
          <h1>My Calendar</h1>
          <AccountsUIWrapper />
          
          {this.data.currentUser ?
            <form className="new-Meeting" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new meetings" />
            </form> : ''
          }

        </header>
 
        <ul>
          {this.renderDays()}
        </ul>
      </div>
    );
  }
});