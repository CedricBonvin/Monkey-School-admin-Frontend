<template>
	<div id="nav">
		<div>
			<h1>Monkey-School</h1>
		</div>
		<div class="boxLink">
			<router-link to="/">Home</router-link> |
			<router-link to="/Admin">Admin</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name : "header"
	}
</script>

<style lang="scss" scoped>
#nav {
	padding: 30px;
	background: gray;
	display: flex;
	justify-content: space-between;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
		color: #42b983;
		}
	}
	h1{
		font-size: 1.5em;
		color: white;
	}
	.boxLink{
		display: flex;
		align-items: center;
	}
}

</style>