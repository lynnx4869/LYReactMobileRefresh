# LYReactMobileRefresh
***
+ 基于ReactJs的用于移动设备下拉刷新组件。

> 由于最近在写基于ReactJs框架的微信公众号，需要用到下拉刷新，但是苦于网上找不到好的React Component，所以决定自己动手写一个。

> 一个很简单的只支持移动设备的下拉刷新，还有很多已知或者未知的bug，会慢慢学习，慢慢改进。<p style="text-align: right;">LYninG</p>

### Getting Started
***

+ 该组件基于ReactJs，请先确保您的项目中使用了ReactJs。关于ReactJs，详情请查看其文档：<br>
[http://facebook.github.io/react/](http://facebook.github.io/react/)

+ 您可以直接下载该项目：
`git clone https://github.com/lynnx4869/LYReactMobileRefresh.git`，并将项目中src文件夹下js和css文件拷贝到您的项目，可以直接通过require或import...from方式引用。

+ 推荐使用npm管理包，您可以使用`npm i ly-react-mobile-refresh --save`。

### Some Problems
***

无法直接引用css：

+ 如果您是直接拷贝文件到你的项目，你可以直接通过`<link>`标签的方式在html中直接引用`lyrmrCss.css`文件。

+ 如果您使用npm安装，则需要将上述文件拷贝进您的项目在引用
。
+ 或者您再项目中使用了express框架，则可以在您的express主文件中使用：

```
app.use('/scripts', express.static(__dirname + '/node_modules/ly_react_mobile_refresh/src/css/'));
```

并且在html中使用：

```
<script src="/scripts/lyrmrCss.css"></script>
```

### How to use
***

```
var React = require('react');
var LYReactMobileRefresh = require('ly-react-mobile-refresh');

var your-component = React.createClass({
	refresh: function(callback){
		setTimeout(function(){
			callback();
		}, 5000);
	},

	render: function(){
		return (
			<div>
				<LYReactMobileRefresh refreshing={this.refresh}>
					{your-items}
				</LYReactMobileRefresh>
			</div>
		);
	}
});
	
```

### API
***

+ refreshing：function refreshing(callback)<br>
下拉刷新时执行的方法，通过回调函数停止刷新，必须传入。

+ maxOffset：number<br>
执行刷新所需最大偏移量，默认为60。

+ beforeRefreshText：string<br>
刚刚下拉时显示的文字，默认为下拉即可刷新...。

+ willRefreshText：string<br>
下拉到符合刷新条件时显示的文字，默认为松手即可刷新...。