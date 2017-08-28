<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	// import {
	// 	XHeader, ViewBox
	// } from 'vux'
	export default {
		name: 'app',
		data (){
			return {
				name: 'hwind'
			}
		},
	}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';
</style>

<style lang="stylus">
	html, body
		height 100%
		width 100%
	#app
		height 100%
</style>