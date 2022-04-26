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

	/*
	 * Apple thinks Safari's own UI elements should count as part of the height of the page content. That's pretty dumb.
	 *
	 * https://www.bram.us/2020/05/06/100vh-in-safari-on-ios/
	 */
	@supports(-webkit-touch-callout: none) {
		main {
			height: -webkit-fill-available;
		}
	}
</style>
