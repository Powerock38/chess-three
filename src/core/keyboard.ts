const keys = {
    up: " ",
    down: "Shift",
    forward: "z",
    backward: "s",
    left: "q",
    right: "d",
}

export const CONTROLS: { [key: string]: boolean } = {}
for (const key in keys) {
    CONTROLS[key] = false
}

export function initKeyboard() {

    function initEvent(event: "keyup" | "keydown", bool: boolean) {
        document.addEventListener(event, (e) => {
            const action = Object.entries(keys).find(([_, key]) => key === e.key)?.[0]
            if (action) {
                e.preventDefault()
                CONTROLS[action] = bool
            }
        })
    }

    initEvent("keydown", true)
    initEvent("keyup", false)


}

