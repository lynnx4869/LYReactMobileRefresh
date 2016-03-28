var React = require('react');

var LYCubeGrid = React.createClass({
	render: function() {
		return React.createElement(
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
		);
	}
});

module.export = LYCubeGrid;