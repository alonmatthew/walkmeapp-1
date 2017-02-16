
const Dashboard = React.createClass({

  getInitialState: function() {
    return {
      userStatus: false,
      user: {}
    }
  },

  componentWillMount: function() {

    const statusRoute = '/owner/status'
    const sendSearch = fetch(statusRoute, {credentials: 'same-origin'})
    const sendUserSearch = fetch(statusRoute, {credentials: 'same-origin'})

    var self = this

    function setUserStatus(data) {
      data.json().then((jsonData) => {
        console.log(jsonData)
        self.setState({
          userStatus: jsonData.status
        })
      })
    }

    function setUser(data) {
      data.json().then((jsonData) => {
        console.log(jsonData)
        self.setState({
          user: jsonData.user
        })
      })
    }

    sendSearch.then(setUserStatus)
    sendUserSearch.then(setUser)

  },

  render: function() {
    return(
      <div>
        <NavBar userStatus={this.state.userStatus} user={this.state.user}/>
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
    const user = this.props.user
    if(!!isLoggedIn) {
          navbar =
              <div className='text-center' style={{'marginTop':'1em','marginBottom':'1em' }}>
                { !user.local.owner ? (
                    <a className="btn btn-primary btn-lg" style={{'marginRight':'1em'}} href ="/walker/profile" role="button">Back to Profile</a> ) :
                    ( <a className="btn btn-primary btn-lg" style={{'marginRight':'1em'}} href="/owner/profile" role="button">Back to Profile</a>)
                }
                 { !user.local.owner ? (
                     <a className="btn btn-primary btn-lg" href ="/walker/logout" role="button">Log Out</a> ) :
                     ( <a className="btn btn-primary btn-lg" href="/owner/logout" role="button">Log Out</a>)
                 }
                </div>
        } else {
          navbar =
          navbar =
                <div className='text-center' style={{'marginTop':'1em','marginBottom':'1em' }}>

                    <a className="btn btn-primary btn-lg" style={{'marginRight':'1em'}} href="/walker/login" role="button">Login as walker</a>
                   <a className="btn btn-primary btn-lg" href="/owner/login" role="button">Login as owner</a><br />
                   <a style={{'marginRight':'4em'}} href="/walker/signup">Sign up as a walker</a>
                   <a href="/owner/signup" >Sign up as an owner</a>

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
        <h1 className='text-center' style={{'marginTop':'1em'}}>Find a Walker Now.</h1>
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
        <h4 className="text-center">Create an account and instantly connect!</h4>
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
