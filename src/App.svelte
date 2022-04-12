<script lang="ts">
	import GuessGrid from "./GuessGrid.svelte";
	import Keyboard from "./Keyboard.svelte";
</script>

<main>
	<GuessGrid />
	<Keyboard />
</main>

<style>
	main {
		box-sizing: border-box;
		height: 100vh;
		padding: 32px;

		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
