const Dashboard = React.createClass({
  render: function() {
    return (
      <div>
        <PostForm />
      </div>
    )
  }
})

const PostForm = React.createClass({
  render: function() {
    return(
      <div>
        <form method="POST" action="/owner/post">
          Notes to the walker: <input name="content" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
})

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
)
