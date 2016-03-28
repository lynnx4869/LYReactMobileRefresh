var React = require('react');

var LYReactMobileRefresh = React.createClass({
	displayName: 'LYReactMobileRefresh',

	startY: 0,
	endY: 0,

	propTypes: {
	    refreshing: React.PropTypes.func.isRequired,
	    maxOffset: React.PropTypes.number
	},

	getDefaultProps: function(){
	    return {
	        refreshing: function(){},
	        maxOffset: 60
	    };
	},

	getInitialState: function(){
	    return {
	        title: '下拉即可刷新...',
	        isRefresh: false
	    };
	},

	componentDidMount: function(){
		var refreshLoading = document.getElementById('refreshLoading');
		refreshLoading.style.display = "none";
		
		var refreshLists = document.getElementById('refreshLists');
		refreshLists.addEventListener('touchstart', this.touchStart, false);
		refreshLists.addEventListener('touchmove', this.touchMove, false);
		refreshLists.addEventListener('touchend', this.touchEnd, false);
	},

	touchStart: function(e){
		var touch = e.touches[0];
		if(window.pageYOffset == 0 && !this.state.isRefresh){
			this.startY = touch.pageY;
		}

		e.preventDefault()
	},

	touchMove: function(e){
		if(window.pageYOffset == 0 && !this.state.isRefresh){
			var touch = e.touches[0];
			this.endY = touch.pageY;

			var offset = this.endY - this.startY;

			if(offset > 0){
				var refreshTitle = document.getElementById('refreshTitle');
				refreshTitle.style.display = "block";
				refreshTitle.style.height = offset + "px";
				refreshTitle.style.lineHeight = offset + "px";

				if(offset < this.props.maxOffset){
					this.setState({
						title: '下拉即可刷新...'
					});
				}else{
					this.setState({
						title: '松手即可刷新...'
					});
				}
			}
		}
	},

	touchEnd: function(e){
		if(window.pageYOffset == 0 && !this.state.isRefresh){
			var touch = e.changedTouches[0];
			this.endY = touch.pageY;
			if(this.endY - this.startY > this.props.maxOffset){
				var refreshTitle = document.getElementById('refreshTitle');
				refreshTitle.style.height = "5rem";
				refreshTitle.style.lineHeight = "5rem";
				this.setState({
					title: '',//React.createElement(LYCubeGrid, null),
					isRefresh: true
				});

				var refreshLoading = document.getElementById('refreshLoading');
				refreshLoading.style.display = "block";

				var that = this;
				this.props.refreshing(function(){
					that.refreshEnd();
				});
			}
		}
		
	},

	refreshEnd: function(){
		var refreshTitle = document.getElementById('refreshTitle');
		refreshTitle.style.display = "none";
		refreshTitle.style.height = "0px";
		refreshTitle.style.lineHeight = "0px";
		this.setState({
			title: '下拉即可刷新...',
			isRefresh: false
		});

		var refreshLoading = document.getElementById('refreshLoading');
		refreshLoading.style.display = "none";
	},

	render: function() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ id: 'refreshTitle', className: 'refreshTitle' },
				this.state.title,
				React.createElement(
					'div',
					{ id: 'refreshLoading' },
					React.createElement(
						"div",
						{ className: "sk-cube-grid" },
						React.createElement("div", { className: "sk-cube sk-cube1" }),
						React.createElement("div", { className: "sk-cube sk-cube2" }),
						React.createElement("div", { className: "sk-cube sk-cube3" }),
						React.createElement("div", { className: "sk-cube sk-cube4" }),
						React.createElement("div", { className: "sk-cube sk-cube5" }),
						React.createElement("div", { className: "sk-cube sk-cube6" }),
						React.createElement("div", { className: "sk-cube sk-cube7" }),
						React.createElement("div", { className: "sk-cube sk-cube8" }),
						React.createElement("div", { className: "sk-cube sk-cube9" })
					)
				)
			),
			React.createElement(
				'div',
				{ id: 'refreshLists' },
				this.props.children
			)
		);
	}

});

module.exports = LYReactMobileRefresh;