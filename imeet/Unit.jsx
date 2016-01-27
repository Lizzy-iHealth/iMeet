Unit = React.createClass({
  propTypes: {
    // This component is wrapper component for Hour to reduce unnecessary rendering caused by data change (eg: attandants added to meeting but still tantative)
    startAt: React.PropTypes.object.isRequired

  },

    // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {

    let query = {};
    let m = meetings.find({startAt: this.props.startAt.toDate().getTime()}).fetch();

    return {
      meeting: m.count===0? null:m[0],
      currentUser: Meteor.user()
    };

  },

  render() {
    //console.log("UnitRender");
    return   <Hour
        key = {this.props.key}
        startAt={this.props.startAt}
        meeting = {this.data.meeting}
        currentUser = {this.data.currentUser} />;
  }
});