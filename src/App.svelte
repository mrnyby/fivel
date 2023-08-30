<script lang="ts">
	import CreateGameDialog from "./CreateGameDialog.svelte";
	import GuessGrid from "./GuessGrid.svelte";
	import Keyboard from "./Keyboard.svelte";
	import PostGameDialog from "./PostGameDialog.svelte";
    import TopNav from "./TopNav.svelte";
</script>

<main>
	<TopNav />
	<GuessGrid />
	<div class="spacer"></div>
	<Keyboard />
	<CreateGameDialog />
	<PostGameDialog />
</main>

<style>
	main {
		box-sizing: border-box;
		height: 100%;
		padding: 16px;

		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.spacer {
		flex-grow: 1;
	}
</style>
