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
        background: var(--color-translucent-green);
        border: 1px solid var(--color-green);
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--color-green);
        margin-bottom: 8px;
        max-width: 336px;
        padding: 2px 4px;
        text-align: center;
    }
</style>
