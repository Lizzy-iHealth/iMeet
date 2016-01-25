// App component - represents the whole app
App = React.createClass({

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
  
  renderMeetings() {
    return this.data.meetings.map((meeting) => {
           
      return <Meeting
        key={meeting._id}
        meeting={meeting}/>;
    });
  },
 
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();
  
 
    Meteor.call("addMeeting", text);
 
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
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
          {this.renderMeetings()}
        </ul>
      </div>
    );
  }
});