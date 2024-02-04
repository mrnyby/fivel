<script lang="ts">
    import {
        createGameDialogIsVisible,
        gameConfig,
        guessesAreExhausted,
        guessIsCorrect,
        postGameDialogIsVisible,
    } from "../stores";

    const handleNewGameClick = () => {
        createGameDialogIsVisible.set(true);
    };

    const handleViewResultsClick = () => {
        postGameDialogIsVisible.set(true);
    };
</script>

<nav>
    <button
        class="link-button"
        class:a-winner-is-you={!$createGameDialogIsVisible && $gameConfig === null}
        on:click={handleNewGameClick}
    >
        New Game
    </button>
    {#if $guessesAreExhausted || $guessIsCorrect}
        <span class="spacer">|</span>
        <button class="link-button" on:click={handleViewResultsClick}>
            View Results
        </button>
    {/if}
</nav>
{#if $gameConfig?.hint !== undefined}
    <div class="hint">
        <strong>Hint:</strong>
        {$gameConfig.hint}
    </div>
{/if}

<style>
    nav {
        display: flex;
        justify-content: center;

        margin-bottom: 8px;
    }

    nav button {
        white-space: nowrap;
    }

    nav button.a-winner-is-you {
        text-decoration: none;
    }

    .hint {
        background: var(--color-translucent-green);
        border: 1px solid var(--color-green);
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--color-green);
        margin-bottom: 8px;
        max-width: 336px;
        padding: 2px 4px;
        text-align: center;
    }

    .spacer {
        margin: 0 4px;
    }
</style>
