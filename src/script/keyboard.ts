export class Keyboard {
    #keys: Set<string> = new Set()
    #presseds: Set<string> = new Set()

    #handleKeyDown = (e: KeyboardEvent) => {
        this.#presseds.add(e.code);
        this.#keys.add(e.code);
    };

    #handleKeyUp = (e: KeyboardEvent) => {
        this.#presseds.delete(e.code);
    };

    start() {
        window.addEventListener('keydown', this.#handleKeyDown)
        window.addEventListener('keyup', this.#handleKeyUp)
    }

    stop() {
        window.removeEventListener('keydown', this.#handleKeyDown);
        window.removeEventListener('keyup', this.#handleKeyUp);
        this.#keys.clear();
    }

    isKeydown(code: string) {
        return this.#keys.has(code)
    }
}
