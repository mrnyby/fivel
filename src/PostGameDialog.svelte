<script lang="ts">
    import Dialog from "./Dialog.svelte";
	import { GameStatus } from "./GameStatus";
	import { gameStatus, guesses, guessIsCorrect } from "./stores";
</script>

<Dialog visible={$gameStatus === GameStatus.Post} title={$guessIsCorrect ? "Winner!" : "Loser!"}>
	{#if $guessIsCorrect}
		<span class="centered">{$guesses.filter((guess) => guess.isSubmitted).length} out of 6 guesses used.</span>
	{:else}
		<span class="centered">Better luck next time.</span>
	{/if}
</Dialog>

<style>
	.centered {
		align-self: center;
	}
</style>
