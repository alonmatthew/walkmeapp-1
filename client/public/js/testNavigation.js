var Layout = React.createClass({
    componentDidMount() {
        $('.ui.sidebar').sidebar({
            transition: 'overlay'
        });
    },

    toggleSidebar: function () {
        $('.ui.sidebar').sidebar('toggle');
    },

    render: function () {
		return (
        	<div id="layout">
        		<div className="ui inverted left vertical sidebar menu">
            		<a className="item">Item 1</a>
                	<a className="item">Item 2</a>
                	<a className="item">Item 3</a>
				</div>
            	<div className="pusher">
            		<div className="ui top fixed menu">
                		<a className="item" onClick={this.toggleSidebar}>
                    		<i className="sidebar icon"></i>
                    	</a>
                	</div>
                	<div className="ui segment">
                		{this.props.children}
                	</div>
            	</div>
        	</div>
		);
    }
});

var Content = React.createClass({
    render: function () {
        return (
        	<div id="content">
            	<p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
                <p>14</p>
                <p>15</p>
                <p>16</p>
                <p>17</p>
                <p>18</p>
                <p>19</p>
                <p>20</p>
                <p>21</p>
                <p>22</p>
                <p>23</p>
                <p>24</p>
                <p>25</p>
                <p>26</p>
                <p>27</p>
                <p>28</p>
                <p>29</p>
                <p>30</p>
                <p>31</p>
                <p>32</p>
                <p>33</p>
                <p>34</p>
                <p>35</p>
                <p>36</p>
                <p>37</p>
                <p>38</p>
                <p>39</p>
                <p>40</p>
			</div>
        );
    }
});

ReactDOM.render(
	<Layout>
  <Content />
  </ Layout>,
    document.getElementById('nav')
);
