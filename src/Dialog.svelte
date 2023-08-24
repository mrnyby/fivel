<script lang="ts">
	export let title: string;
	export let visible: boolean;

	let isDismissed = false;

	const handleClick = () => isDismissed = true;
</script>

{#if visible && !isDismissed}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div on:click={handleClick} on:keypress={handleClick} class="dialog-overlay" role="dialog">
		<dialog on:click={(event) => event.stopPropagation()} on:keypress={(event) => event.stopPropagation()} open>
			<button on:click={handleClick}>
				<span class="material-icons">close</span>
			</button>
			<h1>{title}</h1>
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
