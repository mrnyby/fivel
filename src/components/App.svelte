<script lang="ts">
    import { get } from "svelte/store";

    import { gameCache, guesses } from "../stores";
    import CreateGameDialog from "./dialog/CreateGameDialog.svelte";
    import PostGameDialog from "./dialog/PostGameDialog.svelte";
    import GuessGrid from "./GuessGrid.svelte";
    import Hint from "./Hint.svelte";
    import Keyboard from "./Keyboard.svelte";
    import TopNav from "./TopNav.svelte";

    get(gameCache).guesses.forEach(guess => {
        [...guess].forEach(guessCharacter => guesses.addCharacter(guessCharacter));
        guesses.submitGuess(true);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
        const key = event.key;
        switch (key) {
            case "Enter":
                guesses.submitGuess();
                break;
            case "Backspace":
                guesses.deleteCharacter();
                break;
            default:
                if (/^[a-z]$/i.test(key)) {
                    guesses.addCharacter(key);
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
        min-height: 100vh;
        padding: 8px;
        position: relative;

        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .spacer {
        flex-grow: 1;
    }
</style>
