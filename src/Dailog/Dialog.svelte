<script lang="ts">
	import DialogAction from "./DialogAction";

	export let actions: DialogAction[] = [];
	export let title: string;
	export let visible: boolean;

	let isDismissed = false;

	const handleClick = () => isDismissed = true;
</script>

{#if visible && !isDismissed}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div on:click={handleClick} on:keypress={handleClick} class="dialog-overlay" role="dialog">
		<dialog on:click={(event) => event.stopPropagation()} on:keypress={(event) => event.stopPropagation()} open>
			<h1>{title}</h1>
			<slot></slot>
			{#if actions.length !== 0}
				<div class="dialog-actions">
					{#each actions as action}
						<button on:click={handleClick} class={action.className}>
							{action.text}
						</button>
					{/each}
				</div>
			{/if}
		</dialog>
	</div>
{/if}

<style>
	dialog {
		border: none;
		border-radius: 4px;
		min-width: 300px;

		display: flex;
		flex-direction: column;
	}

	h1 {
		align-self: center;
		margin-top: 0;
	}

	.dialog-actions {
		margin: 32px 0 0 auto;
	}

	.dialog-overlay {
		background: rgba(0, 0, 0, 0.3);

		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		display: flex;
		align-items: center;
	}
</style>
