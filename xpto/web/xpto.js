"use strict"

const MON_HW = document.getElementById('canvas').getContext('2d')
const MON_WIDTH = 160
const MON_HEIGHT = 144
const XPTO_BG = "black"
const XPTO_FG = "white"
const XPTO_CHAR_PADDING_X = 6
const XPTO_CHAR_PADDING_Y = 9
const XPTO_CURSOR_INITIAL_X = 1
const XPTO_CURSOR_INITIAL_Y = 1

var TERMINAL = {
    "CURSOR_BLINK": true,
    "CURSOR_X": XPTO_CURSOR_INITIAL_X,
    "CURSOR_Y": XPTO_CURSOR_INITIAL_Y,
    "CAPS_LOCK": false

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
    // Character Map
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
        ">": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        "0": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "1": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "2": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "3": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "4": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "5": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "6": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "7": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "8": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "9": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        ",": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        ".": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        ";": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        ":": [ // The same of above but with CAPS_LOCK = true
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        "-": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        "=": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
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
        "[": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        "]": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 0],
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
        "C": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "D": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "E": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "F": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "G": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "H": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "I": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],

        ],
        "J": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "K": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 1, 0, 0],
            [0, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "L": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "M": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 1, 0, 1, 1],
            [0, 1, 0, 1, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],

        ],
        "N": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 0, 1, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "O": [
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
        "P": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "Q": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],

        ],
        "R": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 1, 0, 0, 0],
            [0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "S": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "T": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "U": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "V": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "W": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 1, 0, 1],
            [0, 1, 1, 0, 1, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],

        ],
        "X": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0],

        ],
        "Y": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 1],
            [0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],

        ],
        "Z": [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],

        ],
    }
    // Verifica se o caracter existe na tabela interna
    const char = (JSON.stringify(table).indexOf(chr) > -1 ? table[chr] : null)
    // console.info(char, table[chr], chr, JSON.stringify(table).indexOf(chr))
    if (char !== null) {
        if (TERMINAL["CURSOR_X"] < 154) {
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
            // console.log(`Line overflow: ${TERMINAL["CURSOR_X"]}`)
            null
        }
    } else {
        console.log(`${chr} not found in table`)
    }
}

const drawString = (x, y, str) => {
    TERMINAL["CURSOR_BLINK"] = false
    // console.info(x, y, str)
    for (let i = 0; i < str.length; i++) {
        // console.info(str.length)
        // console.info((x + i), y, str)
        drawChar((x + (i * XPTO_CHAR_PADDING_X)), y, str.charAt(i))
    }
    TERMINAL["CURSOR_X"] = x + (str.length * XPTO_CHAR_PADDING_X)
    TERMINAL["CURSOR_BLINK"] = true
}

const print = (x, y, str) => {
    TERMINAL["CURSOR_BLINK"] = false
    // console.info(x, y, str)
    for (let i = 0; i < str.length; i++) {
        // console.info(str.length)
        // console.info((x + i), y, str)
        drawChar((x + (i * XPTO_CHAR_PADDING_X)), y, str.charAt(i))
    }
    TERMINAL["CURSOR_X"] = x + (str.length * XPTO_CHAR_PADDING_X)
    TERMINAL["CURSOR_BLINK"] = true
}

const printLine = (x, y, str) => {
    TERMINAL["CURSOR_BLINK"] = false
    // console.info(x, y, str)
    for (let i = 0; i < str.length; i++) {
        // console.info(str.length)
        // console.info((x + i), y, str)
        drawChar((x + (i * XPTO_CHAR_PADDING_X)), y, str.charAt(i))
    }
    TERMINAL["CURSOR_X"] = x + (str.length * XPTO_CHAR_PADDING_X)
    TERMINAL["CURSOR_Y"] = XPTO_CHAR_PADDING_Y
    TERMINAL["CURSOR_BLINK"] = true
}

const drawPs1 = () => {
    TERMINAL["CURSOR_X"] = XPTO_CURSOR_INITIAL_X
    drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], ">")
    TERMINAL["CURSOR_X"] = XPTO_CURSOR_INITIAL_X + XPTO_CHAR_PADDING_X
}

const clearScreen = () => {
    MON_HW.fillStyle = XPTO_BG
    MON_HW.fillRect(0, 0, MON_WIDTH, MON_HEIGHT);
    TERMINAL["CURSOR_X"] = XPTO_CURSOR_INITIAL_X
    TERMINAL["CURSOR_Y"] = XPTO_CURSOR_INITIAL_Y
}

const inputTerminal = (charCode) => {
    TERMINAL["CURSOR_BLINK"] = false
    // if (TERMINAL["CURSOR_X"] < 24) {
    if (charCode == 8) {
        // console.log("Backspace")
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], " ")
        TERMINAL["CURSOR_X"] = TERMINAL["CURSOR_X"] - XPTO_CHAR_PADDING_X
    } else if (charCode === 13) {
        // Enter
        // console.log("Pressed [Enter] - Newline")
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], " ")
        TERMINAL["CURSOR_Y"] = TERMINAL["CURSOR_Y"] + XPTO_CHAR_PADDING_Y
        drawPs1()

    } else if (charCode == 20) {
        // Caps lock
        console.log("Caps Lock Pressed")

    } else if (charCode == 27) {
        // Esc
        clearScreen()
        startTerminal()
    } else if (charCode === 32) {
        // Spacebar
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], " ")
        TERMINAL["CURSOR_X"] = TERMINAL["CURSOR_X"] + XPTO_CHAR_PADDING_X
    } else if (charCode === 173) {
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], "-")
        TERMINAL["CURSOR_X"] = TERMINAL["CURSOR_X"] + XPTO_CHAR_PADDING_X
    } else if (charCode === 188) {
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], ",")
        TERMINAL["CURSOR_X"] = TERMINAL["CURSOR_X"] + XPTO_CHAR_PADDING_X
    } else if (charCode === 190) {
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], ".")
        TERMINAL["CURSOR_X"] = TERMINAL["CURSOR_X"] + XPTO_CHAR_PADDING_X
    } else if (charCode > 47 && charCode < 91) {
        const charStr = String.fromCharCode(charCode)
        drawChar(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], charStr)
        TERMINAL["CURSOR_X"] = TERMINAL["CURSOR_X"] + XPTO_CHAR_PADDING_X

    } else {
        console.info(charCode)
    }
    // }
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
        }
    }, 500)
}

const startupMessage = () => {
    const machineBanner = " -- XPTO COMPUTER 2020 --"
    const systemMessage = "SYSTEM CHECKING: OK"
    const userMessage = "TYPE [ESC] TO CLEAR"
    drawString(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], machineBanner)
    TERMINAL["CURSOR_Y"] = XPTO_CHAR_PADDING_Y * 2
    TERMINAL["CURSOR_X"] = XPTO_CURSOR_INITIAL_X
    drawString(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], systemMessage)
    TERMINAL["CURSOR_Y"] = XPTO_CHAR_PADDING_Y * 3
    TERMINAL["CURSOR_X"] = XPTO_CURSOR_INITIAL_X
    drawString(TERMINAL["CURSOR_X"], TERMINAL["CURSOR_Y"], userMessage)
    inputTerminal(13)
}

const startTerminal = () => {
    drawPs1()

}

const bootXptoOS = () => {
    clearScreen()
    startupMessage()
    startTerminal()
}

const bootXptoMachine = () => {
    document.onkeydown = (evt) => {
        evt = evt || window.event
        var charCode = evt.keyCode || evt.which
        inputTerminal(charCode)
    }
    bootXptoOS()
    setTimeout(() => {
        drawCursor()
    }, 200)

}

document.querySelector('button#reboot').addEventListener('click', bootXptoOS)

bootXptoMachine()

// Next Step: https://www.hellorust.com/talks/