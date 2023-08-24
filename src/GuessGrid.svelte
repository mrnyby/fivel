<script lang="ts">
	import { GuessCharacterColor } from "./GuessCharacter";
	import { guesses } from "./stores";
</script>

<div class="guess-grid">
	{#each $guesses as guess}
		{#each guess.characters as character}
			<div
				class="guess-cell"
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
	.invalid {
		border-color: var(--color-red);
	}

	.submitted.yellow {
		background: var(--color-yellow);
		border-color: var(--color-yellow);
	}
</style>
