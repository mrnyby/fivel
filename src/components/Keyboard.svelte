<script lang="ts">
    import { guesses, keyColors } from "../stores";
    import GuessCharacterColor from "../util/GuessCharacterColor";

    const handleKeyClick = (event: Event) => {
        const eventElement = event.target as HTMLElement;

        if (!eventElement.matches("button")) {
            return;
        }

        const key = eventElement.dataset.key;
        switch (key) {
            case "delete":
                guesses.deleteCharacter();
                break;
            case "enter":
                guesses.submitGuess();
                break;
            default:
                if (key !== undefined) {
                    guesses.addCharacter(key);
                }
        }
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div class="keyboard" on:click={handleKeyClick}>
    <div class="row">
        {#each [..."qwertyuiop"] as key}
            <button
                class:gray={$keyColors.get(key) === GuessCharacterColor.Gray}
                class:green={$keyColors.get(key) === GuessCharacterColor.Green}
                class:yellow={$keyColors.get(key) === GuessCharacterColor.Yellow}
                data-key={key}
            >
                {key}
            </button>
        {/each}
    </div>
    <div class="row">
        <div class="spacer"></div>
        {#each [..."asdfghjkl"] as key}
            <button
                class:gray={$keyColors.get(key) === GuessCharacterColor.Gray}
                class:green={$keyColors.get(key) === GuessCharacterColor.Green}
                class:yellow={$keyColors.get(key) === GuessCharacterColor.Yellow}
                data-key={key}
            >
                {key}
            </button>
        {/each}
        <div class="spacer"></div>
    </div>
    <div class="row">
        <button data-key="enter">enter</button>
        {#each [..."zxcvbnm"] as key}
            <button
                class:gray={$keyColors.get(key) === GuessCharacterColor.Gray}
                class:green={$keyColors.get(key) === GuessCharacterColor.Green}
                class:yellow={$keyColors.get(key) === GuessCharacterColor.Yellow}
                data-key={key}
            >
                {key}
            </button>
        {/each}
        <button data-key="delete">delete</button>
    </div>
</div>

<style>
    button {
        background: var(--color-light-gray);
        color: var(--color-darker-gray);
        padding: 1em 0.3em;
    }

    button.gray {
        background: var(--color-gray);
        color: #ffffff;
    }

    button.green {
        background: var(--color-green);
        color: #ffffff;
    }

    button.yellow {
        background: var(--color-yellow);
        color: #ffffff;
    }

    @media (prefers-color-scheme: dark) {
        button {
            background: var(--color-gray);
        }

        button.gray {
            background: var(--color-darker-gray);
        }
    }

    .keyboard {
        max-width: 512px;
        touch-action: manipulation;
        width: 96vw;
    }

    .row {
        display: flex;
        justify-content: space-between;
    }

    .spacer {
        flex: 0.5;
    }
</style>
