<script lang="ts">
    import { gameConfig } from "../stores";
</script>

{#if $gameConfig?.hint !== undefined}
    <div>
        <strong>Hint:</strong>
        {$gameConfig?.hint}
    </div>
{/if}

<style>
    div {
        background: var(--color-light-gray);
        border: 1px solid var(--color-violet);
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--color-darker-gray);
        margin-bottom: 8px;
        max-width: 336px;
        padding: 2px 4px;
        text-align: center;
        font-size: 24px;
        font-weight: 600;
    }
</style>
