<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {


		},
		methods: {

		}
	}
</script>
<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* width: 100vw;
		height: 100vh; */
		width: 100%;
		height: 100%;
		background-color: #020308;
		overflow: hidden;
	}

	.dv-scroll-board .rows .row-item {
		height: 25px !important;
		line-height: 25px !important;
	}
</style>
