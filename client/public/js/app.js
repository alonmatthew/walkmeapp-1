const Dashboard = React.createClass({

  getInitialState: function() {
    return {
      userStatus: false
    }
  },

  componentWillMount: function() {

    const statusRoute = '/owner/status'
    const sendSearch = fetch(statusRoute, {credentials: 'same-origin'})

    var self = this

    function setUserStatus(data) {
      data.json().then((jsonData) => {
        console.log(jsonData)
        self.setState({
          userStatus: jsonData.status
        })
      })
    }

    sendSearch.then(setUserStatus)

  },

  render: function() {
    return(
      <div>
        <NavBar userStatus={this.state.userStatus}/>
        <Jumbotron />
        <About />
        <HowItWorks />
        <Footer />
      </div>

    )
  }
})

const NavBar = React.createClass({

  render: function() {
    var navbar;
    const isLoggedIn = this.props.userStatus
    if(!!isLoggedIn) {
          navbar =
                <ButtonToolbar>
                  <div className="btn-group text-center pull-right">
                    <button className="btn text-center"><a href="/walker/profile">Profile</a></button><br />
                    <button className="btn text-center"><a href="/owner/profile">Profile</a></button><br />
                  </div>
                </ButtonToolbar>
    } else {
          navbar =
                  <div className="pull-right">
                    <div className="btn-group text-center">
                      <button className="btn"><a href="/walker/login">Login as walker</a></button>
                      <button className="btn"><a href="/owner/login">Login as owner</a></button>
                    </div>
                    <div className="text-center">
                      <a href="/owner/signup">Sign up as owner</a>
                       <a href="/walker/signup">Sign up as walker</a><br />
                    </div>
                  </div>
      }

    return(
      <div>
        {navbar}
      </div>
    )
  }
})

const JumbotronStyle = {
  marginTop: '5%',
  backgroundImage: 'url(./images/giphy.gif)',
  backgroundSize: 'cover',
  color: '#ffffff',
  height: '400px',
}

const Jumbotron = React.createClass({
  render: function(){
    return(
    <div className="jumbotron" style={JumbotronStyle} id="map">
      <div className="container">
        <h1 className="text-center">Find a Walker Now.</h1>
        <p className="text-center">Find a walker on-demand.</p>
      </div>
    </div>
    )
  }
})

const About = React.createClass({
  render: function(){
    return(
      <div className="container">
        <div>
          <h1 className="text-center">Make dogs all over the US happy!</h1>
          <h4 className="text-center">Walk Me is app about matching dog owners with their pawfect dog walker for on-demand walking! Reach out to walkers in your community for their support in helping you and your pup!</h4>
        </div>
      </div>
    )
  }
})

const HowItWorksStyle = {
  backgroundColor: '#f17f29',
  color: '#ffffff',
}


const HowItWorks = React.createClass({
  render: function(){
    return(
      <div style={HowItWorksStyle}>
        <h1 className="text-center">How it works!</h1>
        <h4 className="text-center">Create an account an instantly connect!</h4>
      </div>
    )
  }
})

const Footer = React.createClass({
  render: function(){
    return(
      <div>
        <h6 className="text-center">© 2017 Walk Me App. All rights reserved.</h6>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
