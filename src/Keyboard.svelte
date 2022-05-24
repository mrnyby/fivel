<script lang="ts">
	import { GuessCharacterColor } from "./GuessCharacter";

	import { guesses, keyColors } from "./stores";

	const handleKeyClick = (event: Event) => {
		const eventElement = event.target as HTMLElement;

		if (!eventElement.matches("button")) {
			return;
		}

		const key = eventElement.dataset.key;
		switch (key) {
			case "enter":
				guesses.submitGuess();
				break;
			case "delete":
				guesses.deleteCharacter();
				break;
			default:
				guesses.addCharacter(key);
		}
	};
</script>

<div class="keyboard" on:click={handleKeyClick}>
	<div class="row">
		{#each [..."qwertyuiop"] as key}
			<button
				class:green={$keyColors[key] === GuessCharacterColor.Green}
				class:yellow={$keyColors[key] === GuessCharacterColor.Yellow}
				data-key={key}
			>
				{key}
			</button>
		{/each}
	</div>
	<div class="row">
		<div class="spacer" />
		{#each [..."asdfghjkl"] as key}
			<button
				class:green={$keyColors[key] === GuessCharacterColor.Green}
				class:yellow={$keyColors[key] === GuessCharacterColor.Yellow}
				data-key={key}
			>
				{key}
			</button>
		{/each}
		<div class="spacer" />
	</div>
	<div class="row">
		<button data-key="enter">enter</button>
		{#each [..."zxcvbnm"] as key}
			<button
				class:green={$keyColors[key] === GuessCharacterColor.Green}
				class:yellow={$keyColors[key] === GuessCharacterColor.Yellow}
				data-key={key}
			>
				{key}
			</button>
		{/each}
		<button data-key="delete">delete</button>
	</div>
</div>

<style>
	button {
		padding: 1em 0.3em;
	}

	button.green {
		background: var(--color-green);
		color: #ffffff;
	}

	button.yellow {
		background: var(--color-yellow);
		color: #ffffff;
	}

	.keyboard {
		max-width: 512px;
		width: 96vw;
	}

	.row {
		display: flex;
		justify-content: space-between;
	}

	.spacer {
		flex: 0.5;
	}
</style>
