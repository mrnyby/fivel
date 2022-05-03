<script lang="ts">
	import { guesses } from "./stores";

	const handleKeyClick = (event: Event) => {
		const eventElement = event.target as HTMLElement;
		if (eventElement.matches("button")) {
			const key = eventElement.dataset.key;

			switch (key) {
				case "ENTER":
					guesses.submitGuess();
					break;
				case "DELETE":
					guesses.deleteCharacter();
					break;
				default:
					guesses.addCharacter(key);
			}
		}
	};
</script>

<div class="keyboard" on:click={handleKeyClick}>
	<div class="row">
		<button data-key="Q">Q</button>
		<button data-key="W">W</button>
		<button data-key="E">E</button>
		<button data-key="R">R</button>
		<button data-key="T">T</button>
		<button data-key="Y">Y</button>
		<button data-key="U">U</button>
		<button data-key="I">I</button>
		<button data-key="O">O</button>
		<button data-key="P">P</button>
	</div>
	<div class="row">
		<div class="spacer" />
		<button data-key="A">A</button>
		<button data-key="S">S</button>
		<button data-key="D">D</button>
		<button data-key="F">F</button>
		<button data-key="G">G</button>
		<button data-key="H">H</button>
		<button data-key="J">J</button>
		<button data-key="K">K</button>
		<button data-key="L">L</button>
		<div class="spacer" />
	</div>
	<div class="row">
		<button data-key="ENTER">ENTER</button>
		<button data-key="Z">Z</button>
		<button data-key="X">X</button>
		<button data-key="C">C</button>
		<button data-key="V">V</button>
		<button data-key="B">B</button>
		<button data-key="N">N</button>
		<button data-key="M">M</button>
		<button data-key="DELETE">DELETE</button>
	</div>
</div>

<style>
	button {
		background: var(--color-light-gray);
		border: none;
		border-radius: 4px;
		color: var(--color-dark-gray);
		flex: 1;
		font-size: 0.9em;
		font-weight: bold;
		margin: 0.1em;
		padding: 1em 0.3em;
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
