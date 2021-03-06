const NavBar = React.createClass({

  render: function(){
    return(
      <nav className="NavBar">
        <ul id="sidebar" className="nav nav-stacked affix">
          <li><a className="text-center"><i className="fa fa-bars fa-3x" aria-hidden="true"></i></a></li>
          <li>
            <a href="/" className="text-center"><i className="fa fa-home fa-3x" aria-hidden="true"></i>
            <p className="text-center">Home</p>
            </a>
          </li>
          <li>
            <a href="/owner/profile" className="text-center"><i className="fa fa-user fa-3x" aria-hidden="true"></i>
            <p className="text-center">Profile</p>
            </a>
          </li>
          <li>
            <a href="/owner/walks" className="text-center"><i className="fa fa-calendar-o fa-3x" aria-hidden="true"></i>
            <p className="text-center">Scheduled Walks</p>
            </a>
          </li>
          <li>
            <a href="#" className="text-center"><i className="fa fa-money fa-3x" aria-hidden="true"></i>
            <p className="text-center">Payments</p>
            </a>
          </li>
          <li>
            <a href="/owner/logout" className="text-center"><i className="fa fa-sign-out fa-3x" aria-hidden="true"></i>
            <p className="text-center">Log Out</p>
            </a>
          </li>
          <li>
            <a href="#" className="text-center"><i className="fa fa-question-circle fa-3x" aria-hidden="true"></i>
            <p className="text-center">Help</p>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
})

ReactDOM.render(
  <NavBar />,
  document.getElementById('nav')
)
