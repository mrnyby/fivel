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

<style>
    nav {
        display: flex;
        margin-bottom: 16px;
    }

    nav button {
        display: flex;
        align-items: center;
        white-space: nowrap;
    }

    nav button.a-winner-is-you {
        text-decoration: none;
    }

    .spacer {
        margin: 0 4px;
    }
</style>
