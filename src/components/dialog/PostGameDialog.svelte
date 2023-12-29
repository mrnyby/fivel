<script lang="ts">
    import { onDestroy } from "svelte";

    import { guesses, guessIsCorrect, postGameDialogIsVisible, targetWord } from "../../stores";
    import { GuessCharacterColor } from "../../util/GuessCharacter";
    import Dialog from "./Dialog.svelte";

    let nGuesses = 0;

    let isCopyPopoverOpen = false;
    let copyPopoverTimeout: NodeJS.Timeout;
    let isCopyHtmlPopoverOpen = false;
    let copyHtmlPopoverTimeout: NodeJS.Timeout;

    const unsubscribe = guesses.subscribe((guesses) => {
        nGuesses = guesses.filter((guess) => guess.isSubmitted).length
    });
    onDestroy(unsubscribe);

    const handleCopyClick = () => handleClick();

    const handleCopyHtmlClick = () => handleClick(true);

    const handleClick = (outputHtml = false) => {
        const separator = outputHtml ? "<br/>" : "\n";

        const guessEmojis = $guesses
            .filter((guess) => guess.isSubmitted)
            .map((guess) => {
                return guess.characters
                    .map((character) => {
                        switch (character.color) {
                            case GuessCharacterColor.Gray:
                                return "⬜";
                            case GuessCharacterColor.Green:
                                return "🟩";
                            case GuessCharacterColor.Yellow:
                                return "🟨";
                        }
                    })
                    .join("");
            })
            .join(separator);

        navigator.clipboard.writeText(`${nGuesses}/6${separator}${guessEmojis}`).then(() => {
            if (outputHtml) {
                isCopyHtmlPopoverOpen = true;
                clearTimeout(copyHtmlPopoverTimeout);
                copyHtmlPopoverTimeout = setTimeout(() => isCopyHtmlPopoverOpen = false, 3000);
            } else {
                isCopyPopoverOpen = true;
                clearTimeout(copyPopoverTimeout);
                copyPopoverTimeout = setTimeout(() => isCopyPopoverOpen = false, 3000);
            }
        });
    };
</script>

<Dialog
    isVisibleStore={postGameDialogIsVisible}
    title={$guessIsCorrect ? "Winner!" : "Loser!"}
    titleClass={$guessIsCorrect ? "a-winner-is-you" : ""}
>
    {#if $guessIsCorrect}
        <div class="centered guess-grid">
            {#each $targetWord as character}
                <div class="guess-cell submitted green">{character}</div>
            {/each}
        </div>
        <span class="centered">{nGuesses} out of 6 guesses used.</span>
    {:else}
        <span class="centered">Better luck next time.</span>
    {/if}
    <div class="centered">
        <button class="link-button" on:click={handleCopyClick}>
            Copy results
            {#if isCopyPopoverOpen}
                <span class="popover">Copied to clipboard</span>
            {/if}
        </button>
        |
        <button class="link-button" on:click={handleCopyHtmlClick}>
            Copy HTML results
            {#if isCopyHtmlPopoverOpen}
                <span class="popover">🍎🦚</span>
            {/if}
        </button>
</div>
</Dialog>

<style>
    .centered {
        align-self: center;
    }

    .guess-cell {
        font-size: 16px;
        height: 32px;
    }

    .guess-grid {
        gap: 2px;
        grid-template-columns: repeat(5, 32px);

        margin-bottom: 16px;
    }

    .link-button {
        margin-top: 8px;
        position: relative;

        display: inline-flex;
        justify-content: center;
    }

    .popover {
        top: -140%;
    }
</style>
