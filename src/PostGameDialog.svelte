<script lang="ts">
	import { onDestroy } from "svelte";

    import Dialog from "./Dialog.svelte";
	import { GuessCharacterColor } from "./GuessCharacter";
	import { guesses, guessIsCorrect, postGameDialogIsVisible, targetWord } from "./stores";

	let nGuesses = 0;
	const unsubscribe = guesses.subscribe((guesses) => {
		nGuesses = guesses.filter((guess) => guess.isSubmitted).length
	});
	onDestroy(unsubscribe);

	const handleClick = () => {
		const guessEmojis = $guesses
			.filter((guess) => guess.isSubmitted)
			.map((guess) => {
				return guess.characters
					.map((character) => {
						switch (character.color) {
							case GuessCharacterColor.Gray:
								return "⬜";
							case GuessCharacterColor.Green:
								return "🟩";
							case GuessCharacterColor.Yellow:
								return "🟨";
						}
					})
					.join("");
			})
			.join("<br/>");
		navigator.clipboard.writeText(`${nGuesses}/6<br/>${guessEmojis}`);
	};
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
		<span class="centered">{nGuesses} out of 6 guesses used.</span>
	{:else}
		<span class="centered">Better luck next time.</span>
	{/if}
	<button on:click={handleClick} class="centered link-button">Copy results</button>
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

	.link-button {
		margin-top: 8px;
	}
</style>
