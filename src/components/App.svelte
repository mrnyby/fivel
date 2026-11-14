<script lang="ts">
    import { activeCharacterIndex, gameCache, guesses } from "../stores";
    import CreateGameDialog from "./dialog/CreateGameDialog.svelte";
    import PostGameDialog from "./dialog/PostGameDialog.svelte";
    import GuessGrid from "./GuessGrid.svelte";
    import Hint from "./Hint.svelte";
    import Keyboard from "./Keyboard.svelte";
    import TopNav from "./TopNav.svelte";

    $gameCache.guesses.forEach(guess => {
        [...guess].forEach(guessCharacter => guesses.setCharacter(guessCharacter));
        guesses.submitGuess(true);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;
        switch (key) {
            case "Backspace":
                guesses.deleteCharacter();
                break;
            case "ArrowLeft":
                activeCharacterIndex.decrement();
                break;
            case "ArrowRight":
                activeCharacterIndex.increment();
                break;
            case "Enter":
                guesses.submitGuess();
                break;
            default:
                if (/^[a-z]$/i.test(key)) {
                    guesses.setCharacter(key);
                }
        }
    };
</script>

<!-- svelte-ignore a11y-autofocus a11y-no-noninteractive-element-interactions a11y-no-noninteractive-tabindex -->
<main autofocus tabindex="0" on:keydown={handleKeyDown}>
    <TopNav />
    <GuessGrid />
    <div class="spacer"></div>
    <Hint />
    <Keyboard />
    <CreateGameDialog />
    <PostGameDialog />
</main>

<style>
    main {
        box-sizing: border-box;
        height: 100%;
        padding: 8px;
        position: relative;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .spacer {
        flex-grow: 0.1;
    }

    @media (max-width: 800px) {
        main {
            justify-content: initial;
        }

        .spacer {
            flex-grow: 1;
        }
    }
</style>
