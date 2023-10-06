<script lang="ts">
	import Dialog from "./Dialog.svelte";
	import dictionary from "./dictionary";
	import { createGameDialogIsVisible } from "./stores";
	import WordEncoder from "./WordEncoder";

	let errorMessage = "";
	let link = "";
	let word = "";

	const handleSubmit = (event: Event) => {
		event.preventDefault();

		errorMessage = "";
		link = "";

		const lowerCaseWord = word.toLowerCase();

		if (!/[a-z]{5}/.test(lowerCaseWord)) {
			errorMessage = "Does that look like five letters to you?";
			return;
		}

		if (!dictionary.includes(lowerCaseWord)) {
			errorMessage = "I don't think that's a word.";
			return;
		}

		link = `${window.location.href.split("?")[0]}?id=${WordEncoder.encode(lowerCaseWord)}`;
		// TODO: Auto-copy to clipboard
		// navigator.clipboard.writeText(link).then(() => {
		// 	isCopySuccessVisible = true;
		// 	setTimeout(() => {
		// 		isCopySuccessVisible = false;
		// 	}, 4000);
		// });
	};
</script>

<Dialog isVisibleStore={createGameDialogIsVisible} title="Create a Puzzle">
	<label for="word">Enter a five-letter word</label>
	<div class="input-group">
		<input id="word" autocomplete="off" bind:value={word} maxlength="5">
		<button on:click={handleSubmit}>
			<span class="material-icons">add_link</span>
		</button>
	</div>
	<span class="result" class:error={errorMessage.length > 0}>
		{#if errorMessage.length > 0}
			{errorMessage}
		{:else if link.length > 0}
			<a href={link}>{link}</a>
		{:else}
			&nbsp;
		{/if}
	</span>
</Dialog>

<style>
	button {
		background: none;
		border: 1px solid var(--color-gray);
		border-left: 1px solid transparent;
		border-radius: 0 4px 4px 0;
		margin: 0;
		outline: 1px solid transparent;
		padding: 0 4px;
		transition: all linear 0.1s;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	button:focus {
		border-color: transparent;
		outline-color: var(--color-dark-gray);
	}

	input {
		background: transparent;
		border: 1px solid var(--color-gray);
		border-radius: 4px 0 0 4px;
		font-size: 16px;
		outline: 1px solid transparent;
		padding: 4px;
		transition: all linear 0.1s;
	}

	input:focus {
		border-color: transparent;
		outline-color: var(--color-dark-gray);
	}

	.error {
		color: var(--color-red);
	}

	.input-group {
		display: flex;
		margin: 4px 0 16px 0;
	}

	.result {
		align-self: center;
	}
</style>
