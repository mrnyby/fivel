<script lang="ts">
    import { fade } from "svelte/transition";

    import { gameConfig, guesses, guessIsCorrect, nextCharacterIndices } from "../stores";
    import GuessCharacterColor from "../util/GuessCharacterColor";
</script>

<div class="guess-grid">
    {#each $guesses as guess, i}
        {#each guess.characters as character, j}
            <div
                class="guess-cell"
                class:active={
                    $gameConfig !== null
                    && !$guessIsCorrect
                    && $nextCharacterIndices[0] === i
                    && ($nextCharacterIndices[1] === j || character.value !== "")
                }
                class:invalid={!guess.isValid && character.value !== ""}
                class:submitted={guess.isSubmitted}
                class:green={character.color === GuessCharacterColor.Green}
                class:yellow={character.color === GuessCharacterColor.Yellow}
            >
                {#if character.value === ""}
                    {character.value}
                {:else}
                    <span in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>{character.value}</span>
                {/if}
            </div>
        {/each}
    {/each}
</div>

<style>
    .active {
        border-color: var(--color-gray);
    }

    @media (prefers-color-scheme: dark) {
        .active {
            border-color: var(--color-dark-gray);
        }
    }

    .guess-grid {
        margin-bottom: 8px;
    }

    .invalid {
        border-color: var(--color-red);
    }
</style>
