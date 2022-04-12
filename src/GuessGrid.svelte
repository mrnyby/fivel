<script lang="ts">
    let guesses = Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => ""));

    console.log(guesses);
</script>

<div class="guess-grid">
    {#each guesses as guess}
        {#each guess as character}
            <div class="guess-cell">{character}</div>
        {/each}
    {/each}
</div>

<style>
    .guess-cell {
        border: 2px solid var(--color-light-gray);
        border-radius: 4px;
        box-sizing: border-box;
        height: 64px;
    }

    .guess-grid {
        display: grid;
        grid-template-columns: repeat(5, 64px);
        gap: 4px;
    }
</style>
