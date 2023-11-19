<script lang="ts">
	import { onDestroy } from "svelte";

    import Dialog from "./Dialog.svelte";
	import { GuessCharacterColor } from "./GuessCharacter";
	import { guesses, guessIsCorrect, postGameDialogIsVisible, targetWord } from "./stores";

	let isPopoverOpen = false;
	let nGuesses = 0;
	let popoverTimeout: NodeJS.Timeout;

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

		navigator.clipboard.writeText(`${nGuesses}/6<br/>${guessEmojis}`).then(() => {
			isPopoverOpen = true;
			clearTimeout(popoverTimeout);
			popoverTimeout = setTimeout(() => isPopoverOpen = false, 3000);
		});
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
	<button on:click={handleClick} class="link-button">
		Copy results
		{#if isPopoverOpen}
			<span class="popover">Copied to clipboard</span>
		{/if}
	</button>
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
		position: relative;

		display: flex;
		justify-content: center;
	}

	.popover {
		top: -140%;
	}
</style>
