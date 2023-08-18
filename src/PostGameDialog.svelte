<script lang="ts">
    import Dialog from "./Dailog/Dialog.svelte";
    import DialogAction from "./Dailog/DialogAction";
	import { GameStatus } from "./GameStatus";
	import { gameStatus, guesses } from "./stores";

	let actions = [
		new DialogAction("okay"),
		new DialogAction("thank you", "primary"),
	];

	let guessIsCorrect = $guesses.find(guess => guess.isCorrect()) !== undefined;
</script>

<Dialog visible={$gameStatus === GameStatus.Post} title={guessIsCorrect ? "Nice!" : "Yikes!"} actions={actions}>
	{#if guessIsCorrect}
		<span>Winner!</span>
	{:else}
		<span class="centered">You lost.</span>
	{/if}
</Dialog>

<style>
	.centered {
		align-self: center;
	}
</style>
