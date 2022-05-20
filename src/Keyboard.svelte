<script lang="ts">
	import { guesses } from "./stores";

	const handleKeyClick = (event: Event) => {
		const eventElement = event.target as HTMLElement;
		if (eventElement.matches("button")) {
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
		}
	};
</script>

<div class=keyboard on:click={handleKeyClick}>
	<div class=row>
		<button data-key=q>q</button>
		<button data-key=w>w</button>
		<button data-key=e>e</button>
		<button data-key=r>r</button>
		<button data-key=t>t</button>
		<button data-key=y>y</button>
		<button data-key=u>u</button>
		<button data-key=i>i</button>
		<button data-key=o>o</button>
		<button data-key=p>p</button>
	</div>
	<div class=row>
		<div class=spacer />
		<button data-key=a>a</button>
		<button data-key=s>s</button>
		<button data-key=d>d</button>
		<button data-key=f>f</button>
		<button data-key=g>g</button>
		<button data-key=h>h</button>
		<button data-key=j>j</button>
		<button data-key=k>k</button>
		<button data-key=l>l</button>
		<div class=spacer />
	</div>
	<div class=row>
		<button data-key=enter>enter</button>
		<button data-key=z>z</button>
		<button data-key=x>x</button>
		<button data-key=c>c</button>
		<button data-key=v>v</button>
		<button data-key=b>b</button>
		<button data-key=n>n</button>
		<button data-key=m>m</button>
		<button data-key=delete>delete</button>
	</div>
</div>

<style>
	button {
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
