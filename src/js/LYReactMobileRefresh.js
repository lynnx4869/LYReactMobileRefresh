var React = require('react');
//var LYCubeGrid = require('./LYCubeGrid.js');

var LYReactMobileRefresh = React.createClass({
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
					title: '刷新中...',//React.createElement(LYCubeGrid, null),
					isRefresh: true
				});

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
	},

	render: function() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ id: 'refreshTitle', className: 'refreshTitle' },
				this.state.title
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