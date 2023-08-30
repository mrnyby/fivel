<script lang="ts">
    import Dialog from "./Dialog.svelte";
	import { guesses, guessIsCorrect, postGameDialogIsVisible, targetWord } from "./stores";
</script>

<Dialog
	isVisibleStore={postGameDialogIsVisible}
	title={$guessIsCorrect ? "Winner!" : "Loser!"}
	titleClass={$guessIsCorrect ? "a-winner-is-you" : ""}
>
	{#if $guessIsCorrect}
		<div class="centered guess-grid">
			{#each $targetWord as character}
				<div class="guess-cell submitted green">{character}</div>
			{/each}
		</div>
		<span class="centered">{$guesses.filter((guess) => guess.isSubmitted).length} out of 6 guesses used.</span>
	{:else}
		<span class="centered">Better luck next time.</span>
	{/if}
</Dialog>

<style>
	.centered {
		align-self: center;
	}

	.guess-cell {
		font-size: 16px;
		height: 32px;
	}

	.guess-grid {
		gap: 2px;
		grid-template-columns: repeat(5, 32px);

		margin-bottom: 16px;
	}
</style>
