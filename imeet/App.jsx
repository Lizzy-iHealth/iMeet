// App component - represents the whole app
App = React.createClass({
  propTypes: {
    startAt: React.PropTypes.object.isRequired
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
    console.log("AppRender");
    return (
      <div className="container">
        <header>
          <h1>My Calendar</h1>
          <AccountsUIWrapper />

        </header>
 
        <div>
          {this.renderDays()}
        </div>
      </div>
    );
  }
});