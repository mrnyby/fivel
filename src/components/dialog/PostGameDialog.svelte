<script lang="ts">
    import { onDestroy } from "svelte";

    import { gameCache, gameConfig, guesses, guessIsCorrect, postGameDialogIsVisible } from "../../stores";
    import GuessCharacterColor from "../../util/GuessCharacterColor";
    import Dialog from "./Dialog.svelte";

    let isCopyPopoverOpen = false;
    let copyPopoverTimeout: number;
    let isCopyHtmlPopoverOpen = false;
    let copyHtmlPopoverTimeout: number;

    let nGuesses = 0;
    const unsubscribe = guesses.subscribe((guesses) => {
        nGuesses = guesses.filter((guess) => guess.isSubmitted).length
    });
    onDestroy(unsubscribe);

    const monthList = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const getTimestampString = (timestamp: number) => {
        const date = new Date(timestamp);
        const month = monthList[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `Finished on ${month} ${day}, ${year} at ${hours}:${minutes}`;
    };

    const handleClick = (outputHtml = false) => {
        const separator = outputHtml ? "<br/>" : "\n";

        const gameId = $gameConfig?.gameId;
        let gameIdString = "";
        if (gameId !== undefined) {
            gameIdString = `Game ID: ${gameId}${separator}`;
        }

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

        navigator.clipboard.writeText(`${gameIdString}${nGuesses}/6${separator}${guessEmojis}`).then(() => {
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
    title={$guessIsCorrect ? "Winner!" : "You lost!"}
    titleClass={$guessIsCorrect ? "a-winner-is-you" : ""}
>
    <div class="centered guess-grid">
        {#each $gameConfig?.word ?? "" as character}
            <div class="guess-cell submitted green">{character}</div>
        {/each}
    </div>
    {#if $guessIsCorrect}
        <div class="centered">{nGuesses} out of 6 guesses used</div>
    {:else}
        <div class="centered">Better luck next time.</div>
    {/if}
    {#if $gameCache !== null}
        <div class="centered smol">{getTimestampString($gameCache.timestamp)}</div>
    {/if}
    <div class="buttons centered">
        <button class="link-button" on:click={() => handleClick(true)}>
            Copy HTML results
            {#if isCopyHtmlPopoverOpen}
                <span class="popover">🍎🦚</span>
            {/if}
        </button>
        |
        <button class="link-button" on:click={() => handleClick()}>
            Copy results
            {#if isCopyPopoverOpen}
                <span class="popover">Copied to clipboard</span>
            {/if}
        </button>
</div>
</Dialog>

<style>
    .buttons {
        margin-top: 4px;
    }

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

    .smol {
        font-size: 0.7em;
        opacity: 0.5;
    }
</style>
