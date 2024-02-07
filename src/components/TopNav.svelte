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
    <h1>Kwordle {#if $gameConfig?.gameId}<span>#{$gameConfig?.gameId}</span>{/if}</h1>

    {#if !$createGameDialogIsVisible && $gameConfig === null}<button
        class="link-button"
        on:click={handleNewGameClick}
    >
        New Game
    </button>
    {/if}

    {#if $guessesAreExhausted || $guessIsCorrect}
        <span class="spacer">|</span>
        <button class="link-button" on:click={handleViewResultsClick}>
            View Results
        </button>
    {/if}
</nav>

<style>
    nav {
        display: flex;
        justify-content: center;
        flex-direction: column;

        margin-bottom: 8px;
    }

    nav button {
        white-space: nowrap;
    }

    .spacer {
        margin: 0 4px;
    }
</style>
