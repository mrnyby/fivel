<script lang="ts">
	import { createGameDialogIsVisible, targetWord } from "./stores";

	const handleClick = () => {
		createGameDialogIsVisible.set(true);
	};
</script>

<nav>
	<button class:a-winner-is-you={!$createGameDialogIsVisible && $targetWord === ""} title="Create a new game" on:click={handleClick}>New Game</button>
</nav>

<style>
	nav {
		margin-bottom: 16px;
	}

	nav button {
		background: none;
		cursor: pointer;
		font-size: 0.8em;
		margin: 0;
		padding: 0;
		text-decoration: underline;
		text-transform: none;

		display: flex;
		align-items: center;
	}

	nav button.a-winner-is-you {
		text-decoration: none;
	}
</style>
