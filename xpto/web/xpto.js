"use strict"

const MON_HW = document.getElementById('canvas').getContext('2d')
const MON_WIDTH = 160
const MON_HEIGHT = 144
const XPTO_BG = "black"
const XPTO_FG = "white"
const XPTO_CHAR_PADDING_X = 6
const XPTO_CHAR_PADDING_Y = 9
const XPTO_CURSOR_INITIAL_X = 5
const XPTO_CURSOR_INITIAL_Y = 5

var TERMINAL = {
    "CURSOR_BLINK": true,
    "CURSOR_X": XPTO_CURSOR_INITIAL_X,
    "CURSOR_Y": XPTO_CURSOR_INITIAL_Y,
    "CAPS_LOCK": false

}

const clearScreen = () => {
    MON_HW.fillStyle = XPTO_BG
    MON_HW.fillRect(0, 0, MON_WIDTH, MON_HEIGHT);
    TERMINAL["CURSOR_X"] = XPTO_CURSOR_INITIAL_X
    TERMINAL["CURSOR_Y"] = XPTO_CURSOR_INITIAL_Y
}

const drawPixelFg = (x, y) => {
    MON_HW.fillStyle = XPTO_FG
    MON_HW.fillRect(x, y, 1, 1);
}

const drawPixelBg = (x, y) => {
    MON_HW.fillStyle = XPTO_BG
    MON_HW.fillRect(x, y, 1, 1);
}

const drawChar = (x, y, chr) => {
    const table = {
        " ": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        "_": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        "A": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],

        "B": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],

        "0": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        ":": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],

    }
    // Verifica se o caracter existe na tabela interna
    const char = (JSON.stringify(table).indexOf(chr) > -1 ? table[chr] : null)
    if (char !== null) {
        // Percorre bits da letra (linhas)
        for (let line = 0; line < XPTO_CHAR_PADDING_Y; line++) {
            // Percorre bits da letra (colunas)
            for (let col = 0; col < XPTO_CHAR_PADDING_X; col++) {
                if (table[chr][line][col] === 1) {
                    drawPixelFg((x + col), (y + line))
                } else {
                    drawPixelBg((x + col), (y + line))
                }
            }
        }
    } else {
        console.log(`${chr} not found in table`)
    }
}

const drawString = (x, y, str) => {
    console.info(x, y, str)
    for (let i = 0; i < str.length; i++) {
        console.info(str.length)
        console.info((x + i), y, str)
        drawChar((x + (i * XPTO_CHAR_PADDING_X)), y, str.charAt(i))
    }
}

const inputTerminal = (charCode) => {
    TERMINAL["CURSOR_BLINK"] = false
    console.info(charCode)
    if (charCode == 8) {
        // console.log("Backspace")
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], " ")
        TERMINAL["CURSOR_X"] = TERMINAL["CURSOR_X"] - XPTO_CHAR_PADDING_X

    } else if (charCode === 13) {
        console.log("Pressed [Enter] - Newline")
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], " ")
        TERMINAL["CURSOR_Y"] = TERMINAL["CURSOR_Y"] + XPTO_CHAR_PADDING_Y
        TERMINAL["CURSOR_X"] = XPTO_CURSOR_INITIAL_X

    } else if (charCode == 20) {
        console.log("Caps Lock Pressed")

    } else if (charCode == 27) {
        // Esc pressed
        clearScreen()
    } else {
        const charStr = String.fromCharCode(charCode)
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], charStr)
        TERMINAL["CURSOR_X"] = TERMINAL["CURSOR_X"] + XPTO_CHAR_PADDING_X
    }
    setTimeout(() => {
        TERMINAL["CURSOR_BLINK"] = true
    }, 200)
}

const drawCursor = () => {
    let cursorIsPrinted = false
    setInterval(() => {
        if (TERMINAL["CURSOR_BLINK"] === true) {
            if (cursorIsPrinted === true) {
                drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], "_");
                cursorIsPrinted = false
            } else {
                drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], " ");
                cursorIsPrinted = true
            }
            // console.log(cursorBlink)
        }
    }, 500)
}

const startTerminal = () => {
    drawCursor()
    document.onkeydown = (evt) => {
        evt = evt || window.event
        var charCode = evt.keyCode || evt.which
        inputTerminal(charCode)
    }



}

const bootXpto = () => {
    startTerminal()
    clearScreen()
}



bootXpto()
