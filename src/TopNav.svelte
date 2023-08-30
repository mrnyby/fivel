<script lang="ts">
	import { createGameDialogIsVisible } from "./stores";

	const handleClick = () => {
		createGameDialogIsVisible.set(true);
	};
</script>

<nav>
	<button title="Create a new game" on:click={handleClick}>New Game</button>
</nav>

<style>
	nav {
		margin-bottom: 16px;
	}

	nav button {
		background: none;
		color: var(--color-dark-gray);
		cursor: pointer;
		font-size: 0.8em;
		margin: 0;
		padding: 0;
		text-decoration: underline;
		text-transform: none;

		display: flex;
		align-items: center;
	}
</style>
