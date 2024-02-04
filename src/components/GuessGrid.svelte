<script lang="ts">
    import { gameConfig, guesses, guessIsCorrect, nextCharacterIndices } from "../stores";
    import { GuessCharacterColor } from "../util/GuessCharacter";
</script>

<div class="guess-grid">
    {#each $guesses as guess, i}
        {#each guess.characters as character, j}
            <div
                class="guess-cell"
                class:first={$gameConfig !== null && i === 0 && j === 0 && character.value === ""}
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
            border-color: var(--color-gray);
        }
    }

    @keyframes blink-dark {
        0% {
            border-color: var(--color-light-gray);
        }

        50% {
            border-color: var(--color-dark-gray);
        }
    }

    .active {
        border-color: var(--color-gray);
    }

    .first {
        animation: blink 1.2s infinite step-end;
    }

    @media (prefers-color-scheme: dark) {
        .active {
            border-color: var(--color-dark-gray);
        }

        .first {
            animation: blink-dark 1.2s infinite step-end;
        }
    }

    .guess-grid {
        margin-bottom: 8px;
    }

    .invalid {
        border-color: var(--color-red);
    }

    .submitted.yellow {
        background: var(--color-yellow);
        border-color: var(--color-yellow);
    }
</style>
