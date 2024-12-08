<script lang="ts">
    import type { Writable } from "svelte/store";
    import { fade } from "svelte/transition";

    export let isVisibleStore: Writable<boolean>;
    export let title: string;
    export let titleClass = "";

    const handleClick = () => {
        isVisibleStore.set(false);
    };
</script>

{#if $isVisibleStore}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
        on:click={handleClick}
        on:keypress={handleClick}
        in:fade={{ duration: 100 }}
        out:fade={{ duration: 100 }}
        class="scrim"
        role="dialog"
    >
        <dialog on:click={(event) => event.stopPropagation()} on:keypress={(event) => event.stopPropagation()} open>
            <button on:click={handleClick}>
                <span class="material-icons">close</span>
            </button>
            <h1 class={titleClass}>{title}</h1>
            <slot></slot>
        </dialog>
    </div>
{/if}

<style>
    button {
        background: none;

        position: absolute;
        top: 0;
        right: -8px;
    }

    dialog {
        display: flex;
        flex-direction: column;

        position: absolute;
        top: 30%;
    }

    .scrim {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background: rgba(0, 0, 0, 0.4);
    }

    @media (prefers-color-scheme: dark) {
        .scrim {
            background: rgba(0, 0, 0, 0.7);
        }
    }
</style>
