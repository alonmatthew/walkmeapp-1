const Dashboard = React.createClass({

  getInitialState: function() {
    return {
      isOwnerLoggedIn: fetch('/owner/status', {credentials: 'same-origin'})
        .then((data) => { data.json()
          .then(json => console.log(json) )
        })
    }
  },

  render: function() {
    return(
      <NavBar isLoggedIn={this.state.isOwnerLoggedIn}/>
    )
  }
})

const NavBar = React.createClass({


  render: function() {
    var navbar;
    const isLoggedIn = this.props.isOwnerLoggedIn
    if(!!isLoggedIn) {
          navbar = <div>
                    <a href="/walker/profile">Profile</a>
                    <a href="/owner/profile">Profile</a>
                  </div>
    } else {
          navbar = <div>
                    <a href="/owner/signup">Sign up as owner</a>
                    <a href="/walker/signup">Sign up as walker</a><br />
                    <a href="/walker/login">Login as walker</a>
                    <a href="/owner/login">Login as owner</a>
                  </div>
      }

    return(
      <div>
        {navbar}
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
