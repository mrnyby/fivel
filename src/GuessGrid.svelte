<script lang="ts">
	import { onDestroy } from 'svelte';
	import { currentGuess, pastGuesses } from './stores';

	let guessCount: number;
	const unsubscribe = pastGuesses.subscribe(guesses => guessCount = guesses.length);

	onDestroy(unsubscribe);
</script>

<div class="guess-grid">
	<!-- Past guesses -->
	{#each $pastGuesses as guess}
		{#each guess as character}
			<div class="guess-cell">{character}</div>
		{/each}
	{/each}
	<!-- Current guess -->
	{#each { length: 5 } as _, i}
		<div class="guess-cell">{$currentGuess.charAt(i)}</div>
	{/each}
	<!-- Remaining guesses -->
	{#each { length: 6 - guessCount } as _}
		{#each { length: 5 } as _}
			<div class="guess-cell"></div>
		{/each}
	{/each}
</div>

<style>
	.guess-cell {
		border: 2px solid var(--color-light-gray);
		border-radius: 4px;
		box-sizing: border-box;
		height: 64px;
	}

	.guess-grid {
		display: grid;
		grid-template-columns: repeat(5, 64px);
		gap: 4px;
	}
</style>
