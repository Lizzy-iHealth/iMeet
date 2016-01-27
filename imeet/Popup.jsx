Popup = React.createClass({
  propTypes: {
    display: React.PropTypes.bool.isRequired
  },

  
  render() {
    console.log("PopupRender");
    return this.props.display ?   
      (<div className="container">
        <header>
          <h1>Input Meeting Info</h1>
        </header>
      </div>) : false;

  }
});