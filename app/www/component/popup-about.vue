<template>
	<popup
	v-model="showAbout"
	height="100%"
	width="100%"
	:show-mask="false"
	id="popup-about"
	>
		<x-header
		title="关于"
		:leftOptions="{showBack: false}"
		class="about"
		>
		<span slot="left" @click="showAbout=false">关闭</span>
		</x-header>

		<div class="content">
			<p>如果你喜欢这个软件，不妨赏我杯咖啡喝～</p>
			<img src="../img/pay.jpg">
		</div>

	</popup>
</template>

<script>
	import {
		Popup, XHeader
	} from 'vux'
	export default {
		name: 'about',
		components: {
			Popup, XHeader
		},
		props: {
			value: {
				type: Boolean,
				default: false,
			}
		},
		watch: {
			value: function(val){
				this.showAbout = val
			},
			showAbout: function(val){
				this.$emit('input',val)
			},
		},
		data (){
			return {
				showAbout: false,//
			}
		},
	}
</script>

<style lang="stylus">
	#popup-about
		.content
			padding 20px
			text-align center
			p
				margin-bottom 20px
				color #777
				line-height 1.2
			img
				display block
				width 250px
				margin 0 auto
</style>