<div class="keyboard">
    <div class="row">
        <button>Q</button>
        <button>W</button>
        <button>E</button>
        <button>R</button>
        <button>T</button>
        <button>Y</button>
        <button>U</button>
        <button>I</button>
        <button>O</button>
        <button>P</button>
    </div>
    <div class="row">
        <div class="spacer" />
        <button>A</button>
        <button>S</button>
        <button>D</button>
        <button>F</button>
        <button>G</button>
        <button>H</button>
        <button>J</button>
        <button>K</button>
        <button>L</button>
        <div class="spacer" />
    </div>
    <div class="row">
        <button>ENTER</button>
        <button>Z</button>
        <button>X</button>
        <button>C</button>
        <button>V</button>
        <button>B</button>
        <button>N</button>
        <button>M</button>
        <button>DELETE</button>
    </div>
</div>

<style>
    button {
        background: var(--color-light-gray);
        border: none;
        border-radius: 4px;
        flex: 1;
        font-size: 0.9em;
        font-weight: bold;
        margin: 4px;
        padding: 16px 8px;
    }

    .keyboard {
        width: 500px;
    }

    .row {
        display: flex;
        justify-content: space-between;
    }

    .spacer {
        flex: 0.5;
    }
</style>
