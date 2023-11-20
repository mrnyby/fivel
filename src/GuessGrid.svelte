<script lang="ts">
	import { GuessCharacterColor } from "./GuessCharacter";
	import { guesses, guessIsCorrect, nextCharacterIndices, targetWord } from "./stores";
</script>

<div class="guess-grid">
	{#each $guesses as guess, i}
		{#each guess.characters as character, j}
			<div
				class="guess-cell"
				class:first={$targetWord !== "" && i === 0 && j === 0 && character.value === ""}
				class:active={
					$targetWord !== ""
					&& !$guessIsCorrect
					&& $nextCharacterIndices[0] === i
					&& ($nextCharacterIndices[1] === j || character.value !== "")
				}
				class:invalid={!guess.isValid && character.value !== ""}
				class:submitted={guess.isSubmitted}
				class:green={character.color === GuessCharacterColor.Green}
				class:yellow={character.color === GuessCharacterColor.Yellow}
			>
				{character.value}
			</div>
		{/each}
	{/each}
</div>

<style>
	@keyframes blink {
		0% {
			border-color: var(--color-light-gray);
		}

		50% {
			border-color: var(--color-dark-gray);
		}
	}

	.active {
		border-color: var(--color-dark-gray);
	}

	.first {
		animation: blink 1.2s infinite step-end;
	}

	.invalid {
		border-color: var(--color-red);
	}

	.submitted.yellow {
		background: var(--color-yellow);
		border-color: var(--color-yellow);
	}
</style>
