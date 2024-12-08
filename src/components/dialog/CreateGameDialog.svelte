<script lang="ts">
    import { fade } from "svelte/transition";

    import { FADE_PARAMS } from "../../constants";
    import dictionary from "../../dictionary";
    import { createGameDialogIsVisible } from "../../stores";
    import GameConfig from "../../util/GameConfig";
    import Dialog from "./Dialog.svelte";

    let errorMessage = "";
    let gameId = "";
    let hint = "";
    let isPopoverOpen = false;
    let link = "";
    let popoverTimeout: number;
    let word = "";

    const handleSubmit = () => {
        errorMessage = "";
        link = "";

        const lowerCaseWord = word.toLowerCase();

        if (!/[a-z]{5}/.test(lowerCaseWord)) {
            errorMessage = "Does that look like five letters to you?";
            return;
        }

        if (!dictionary.includes(lowerCaseWord)) {
            errorMessage = "I don't think that's a word.";
            return;
        }

        const gameConfig = new GameConfig(
            lowerCaseWord,
            // If gameId/hint aren't set, pass them in as undefined to save URL space when encoding this GameConfig
            gameId === "" ? undefined : gameId,
            hint === "" ? undefined : hint
        );
        link = `${window.location.href.split("?")[0]}?f=${gameConfig.serialize()}`;

        navigator.clipboard.writeText(link).then(() => {
            isPopoverOpen = true;
            clearTimeout(popoverTimeout);
            popoverTimeout = setTimeout(() => isPopoverOpen = false, 3000);
        });
    };
</script>

<Dialog isVisibleStore={createGameDialogIsVisible} title="Create a Puzzle">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="word">Enter a five-letter word, then share the link!</label>
        <div class="action-input">
            <input bind:value={word} id="word" autocomplete="off" maxlength="5">
            <button type="submit">
                <span class="material-icons">add_link</span>
                {#if isPopoverOpen}
                    <span in:fade={FADE_PARAMS} out:fade={FADE_PARAMS} class="popover">
                        Copied to clipboard
                    </span>
                {/if}
            </button>
        </div>
        <details class="small-text">
            <summary>Advanced Options</summary>
            <input bind:value={hint} class="small-text" placeholder="Hint" autocomplete="off">
            <input bind:value={gameId} class="small-text" placeholder="Game ID" autocomplete="off">
        </details>
    </form>
    <span class="result" class:error={errorMessage.length > 0}>
        {#if errorMessage.length > 0}
            <span in:fade={FADE_PARAMS}>{errorMessage}</span>
        {:else if link.length > 0}
            <a in:fade={FADE_PARAMS} class="small-text" href={link}>{link}</a>
        {:else}
            &nbsp;
        {/if}
    </span>
</Dialog>

<style>
    a {
        display: block;
        max-width: 256px;
        word-break: break-all;
    }

    button {
        background: none;
        border: 1px solid var(--color-gray);
        border-left: 1px solid transparent;
        border-radius: 0 4px 4px 0;
        margin: 0;
        outline: 1px solid transparent;
        padding: 0 4px;
        position: relative;
        transition: all linear 200ms;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:focus {
        border-color: transparent;
        outline-color: var(--color-foreground);
    }

    details {
        margin-bottom: 16px;
    }

    details input {
        box-sizing: border-box;
        display: block;
        margin-top: 8px;
        width: 100%;
    }

    input {
        background: transparent;
        border: 1px solid var(--color-gray);
        border-radius: 4px;
        color: var(--color-foreground);
        font-size: 16px;
        outline: 1px solid transparent;
        padding: 4px;
        transition: all linear 200ms;
    }

    input:focus {
        border-color: transparent;
        outline-color: var(--color-foreground);
    }

    summary {
        cursor: pointer;
        list-style: none;
        text-align: center;
        text-decoration: underline;
    }

    summary::-webkit-details-marker {
        display: none;
    }

    .action-input {
        display: flex;
        margin: 4px 0 16px 0;
    }

    .action-input input {
        border-radius: 4px 0 0 4px;
    }

    .error {
        color: var(--color-red);
    }

    .result {
        align-self: center;
    }

    .small-text {
        font-size: 0.8em;
    }
</style>
