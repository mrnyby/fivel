<script lang="ts">
    import { GameStatus } from "./GameStatus";
	import { gameStatus, guesses } from "./stores";
</script>

{#if $gameStatus === GameStatus.Post}
	<div class=dialog-overlay>
		<dialog open>
			{#if $guesses.find(guess => guess.isCorrect()) !== undefined}
				<h1>Nice!</h1>
				<span>Winner!</span>
			{:else}
				<h1>Yikes!</h1>
				<span>Loser.</span>
			{/if}
		</dialog>
	</div>
{/if}
