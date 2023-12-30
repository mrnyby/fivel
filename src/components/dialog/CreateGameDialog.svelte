<script lang="ts">
    import dictionary from "../../dictionary";
    import { createGameDialogIsVisible } from "../../stores";
    import WordEncoder from "../../util/WordEncoder";
    import Dialog from "./Dialog.svelte";

    let errorMessage = "";
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

        link = `${window.location.href.split("?")[0]}?id=${WordEncoder.encode(lowerCaseWord)}`;
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
        <div class="input-group">
            <input id="word" autocomplete="off" bind:value={word} maxlength="5">
            <button type="submit">
                <span class="material-icons">add_link</span>
                {#if isPopoverOpen}
                    <span class="popover">Copied to clipboard</span>
                {/if}
            </button>
        </div>
    </form>
    <span class="result" class:error={errorMessage.length > 0}>
        {#if errorMessage.length > 0}
            {errorMessage}
        {:else if link.length > 0}
            <a href={link}>{link}</a>
        {:else}
            &nbsp;
        {/if}
    </span>
</Dialog>

<style>
    button {
        background: none;
        border: 1px solid var(--color-gray);
        border-left: 1px solid transparent;
        border-radius: 0 4px 4px 0;
        margin: 0;
        outline: 1px solid transparent;
        padding: 0 4px;
        position: relative;
        transition: all linear 0.1s;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    button:focus {
        border-color: transparent;
        outline-color: var(--color-foreground);
    }

    input {
        background: transparent;
        border: 1px solid var(--color-gray);
        border-radius: 4px 0 0 4px;
        color: var(--color-foreground);
        font-size: 16px;
        outline: 1px solid transparent;
        padding: 4px;
        transition: all linear 0.1s;
    }

    input:focus {
        border-color: transparent;
        outline-color: var(--color-foreground);
    }

    .error {
        color: var(--color-red);
    }

    .input-group {
        display: flex;
        margin: 4px 0 16px 0;
    }

    .result {
        align-self: center;
    }
</style>
