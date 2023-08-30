<script lang="ts">
	import { createGameDialogIsVisible } from "./stores";

	const handleClick = () => {
		createGameDialogIsVisible.set(true);
	};
</script>

<nav>
	<button title="Create a new game" on:click={handleClick}>
		<span class="material-icons">add</span>
	</button>
</nav>

<style>
	nav {
		align-self: flex-start;
		margin-bottom: 16px;
		max-width: 512px;
	}

	nav button {
		background: none;
		margin: 0;
		padding: 0;
	}

	nav button span {
		font-size: 2em;
	}
</style>
