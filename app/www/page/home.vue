<template>
	<div id="home">
		<city></city>
	</div>
</template>

<script>
	import city from './city.vue'
	export default {
		name: 'home',
		components: {
			city,
		},
	}
</script>

<style lang="stylus">
	#home
		height 100%
</style>