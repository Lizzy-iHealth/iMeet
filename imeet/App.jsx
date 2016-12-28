// App component - represents the whole app
App = React.createClass({


  getInitialState() {
    today = moment();
    firstSunday = today.startOf('week');
    return { startAt: firstSunday };
  },

  getWeekDays(){
    return [0,1,2,3,4,5,6];
  },

  renderTimeFrame() {
           
    return <TimeFrame startAt={this.state.startAt}  />;
    
  },

  renderDays() {
    return this.getWeekDays().map( (i) => {
           
      return <Day
        key = {i}
        startAt = {this.state.startAt.clone().add(i, 'day')}  />;
    });
  },
  
  render() {
    console.log("AppRender");
    return (
      <div className="container">
        <header>
          <h1>My Calendar</h1>
          <AccountsUIWrapper />

        </header>
 
        <div>
          {this.renderTimeFrame()}
          {this.renderDays()}
          
        </div>
      </div>
    );
  }
});