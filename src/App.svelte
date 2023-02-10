<script lang="ts">
	import GuessGrid from "./GuessGrid.svelte";
	import Keyboard from "./Keyboard.svelte";
	import PostGameDialog from "./PostGameDialog.svelte";
	import PreGameDialog from "./PreGameDialog.svelte";
</script>

<main>
	<GuessGrid />
	<Keyboard />
	<PreGameDialog />
	<PostGameDialog />
</main>

<style>
	main {
		box-sizing: border-box;
		height: 100%;
		padding: 32px;

		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
