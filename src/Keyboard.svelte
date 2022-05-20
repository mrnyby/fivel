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
		<button data-key="q">Q</button>
		<button data-key="w">W</button>
		<button data-key="e">E</button>
		<button data-key="r">R</button>
		<button data-key="t">T</button>
		<button data-key="y">Y</button>
		<button data-key="u">U</button>
		<button data-key="i">I</button>
		<button data-key="o">O</button>
		<button data-key="p">P</button>
	</div>
	<div class="row">
		<div class="spacer" />
		<button data-key="a">A</button>
		<button data-key="s">S</button>
		<button data-key="d">D</button>
		<button data-key="f">F</button>
		<button data-key="g">G</button>
		<button data-key="h">H</button>
		<button data-key="j">J</button>
		<button data-key="k">K</button>
		<button data-key="l">L</button>
		<div class="spacer" />
	</div>
	<div class="row">
		<button data-key="ENTER">ENTER</button>
		<button data-key="z">Z</button>
		<button data-key="x">X</button>
		<button data-key="c">C</button>
		<button data-key="v">V</button>
		<button data-key="b">B</button>
		<button data-key="n">N</button>
		<button data-key="m">M</button>
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
