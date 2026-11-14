<script lang="ts">
    import { fade } from "svelte/transition";

    import { FADE_PARAMS } from "../constants";
    import { activeCharacterIndex, gameConfig, guesses, guessIsCorrect, nextGuessIndex } from "../stores";
    import GuessCharacterColor from "../util/GuessCharacterColor";

    const handleCellClick = (event: Event) => {
        const eventElement = event.currentTarget as HTMLElement;

        if (parseInt(eventElement.dataset.guessIndex ?? "") !== $nextGuessIndex) {
            return;
        }

        $activeCharacterIndex = parseInt(eventElement.dataset.characterIndex ?? "");
    };
</script>

<div class="guess-grid">
    {#each $guesses as guess, i}
        {#each guess.characters as character, j}
            <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
            <div
                on:click={handleCellClick}
                data-guess-index={i}
                data-character-index={j}
                class="guess-cell"
                class:active={
                    $gameConfig !== null
                    && !$guessIsCorrect
                    && $nextGuessIndex === i
                    && $activeCharacterIndex === j
                }
                class:invalid={!guess.isValid && character.value !== ""}
                class:submitted={guess.isSubmitted}
                class:green={character.color === GuessCharacterColor.Green}
                class:yellow={character.color === GuessCharacterColor.Yellow}
            >
                {#if character.value === ""}
                    {character.value}
                {:else}
                    <span in:fade={FADE_PARAMS} out:fade={FADE_PARAMS}>{character.value}</span>
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
