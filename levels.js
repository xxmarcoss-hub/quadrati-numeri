// Tipi di contenuto dei quadrati
const SquareType = {
    NUMBER: 'number',
    OPERATION: 'operation'
};

// Tipi di operazioni
const OperationType = {
    MULTIPLY_2: 'x2',
    MULTIPLY_3: 'x3',
    NEGATE: '+-',
    DIVIDE_2: '/2',
    DIVIDE_3: '/3',
    ABS: '|x|',
    SQUARE: 'x²',
    FLIP: 'flip',
    SUM_DIGITS: 'Σ',
    SIGN: 'sgn',
    FACTORIAL: 'n!',
    POW_2: '2ⁿ',
    POW_3: '3ⁿ',
    MOD_2: '%2',
    MOD_3: '%3',
    MOD_5: '%5',
    MOD_10: '%10',
    SQRT: '√',
    CLONE: '⊕',
    DIVISORS: '÷→'
};

// Operazioni speciali: non si compongono con altre operazioni
const SpecialOperations = [OperationType.ABS, OperationType.SQUARE, OperationType.FLIP, OperationType.SUM_DIGITS, OperationType.SIGN, OperationType.FACTORIAL, OperationType.POW_2, OperationType.POW_3, OperationType.MOD_2, OperationType.MOD_3, OperationType.MOD_5, OperationType.MOD_10, OperationType.SQRT, OperationType.CLONE, OperationType.DIVISORS];

// Categorie di difficoltà per 100 livelli
const DifficultyCategory = {
    TUTORIAL: { name: 'Tutorial', range: [0, 9] },
    EASY: { name: 'Facile', range: [10, 24] },
    MEDIUM: { name: 'Medio', range: [25, 44] },
    HARD: { name: 'Difficile', range: [45, 69] },
    EXPERT: { name: 'Esperto', range: [70, 89] },
    MASTER: { name: 'Maestro', range: [90, 99] }
};

// Funzione helper per ottenere la categoria di difficoltà di un livello
function getLevelDifficulty(levelIndex) {
    for (const [key, cat] of Object.entries(DifficultyCategory)) {
        if (levelIndex >= cat.range[0] && levelIndex <= cat.range[1]) {
            return cat.name;
        }
    }
    return 'Sconosciuto';
}

// 100 livelli generati con difficoltà crescente
const levels = [
    // === TUTORIAL (1-10) ===
    {
        name: "Prima Coppia",
        solution: "3+3 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Due Uguali",
        solution: "4+4 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Somma Base",
        solution: "-18+23=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: 5 },
        ]
    },
    {
        name: "Catena",
        solution: "-16+22=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 22 },
        ]
    },
    {
        name: "Tre Numeri",
        solution: "7+-25=-18, -18+21=3, 3+3 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -25 },
            { type: SquareType.NUMBER, value: 7 },
        ]
    },
    {
        name: "Primi Passi",
        solution: "5+13=18, -14+18=4, 4+4 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: -14 },
            { type: SquareType.NUMBER, value: 5 },
        ]
    },
    {
        name: "Inizio",
        solution: "4+-23=-19, -19+24=5, -15+20=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -23 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 24 },
        ]
    },
    {
        name: "Semplice",
        solution: "-17+21=4, 4+-22=-18, -18+24=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -22 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 24 },
        ]
    },
    {
        name: "Base",
        solution: "-15+16=1, 9+7=16, -13+16=3, 1+2=3, 3+3 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: -15 },
        ]
    },
    {
        name: "Avvio",
        solution: "-13+17=4, 3+-19=-16, 7+13=20, -16+20=4, 4+4 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    // === FACILE (11-25) ===
    {
        name: "Raddoppio",
        solution: "-4×+-=4, -4×+-=4, 4+4 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -4 },
            { type: SquareType.NUMBER, value: -4 },
        ]
    },
    {
        name: "Triplice",
        solution: "-17+22=5, -5×+-=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 22 },
        ]
    },
    {
        name: "Specchio",
        solution: "15×+-=-15, -15+21=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Doppio",
        solution: "-18+22=4, 4×x2=8, -8×+-=8, 8+8 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: -8 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Moltiplicazione",
        solution: "19×+-=-19, 9+-19=-10, -10×+-=10, 10+10 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 19 },
        ]
    },
    {
        name: "Fattore Due",
        solution: "-18+22=4, -12+14=2, 2×x2=4, 4+4 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: 22 },
        ]
    },
    {
        name: "Fattore Tre",
        solution: "19×+-=-19, 7+13=20, -19+20=1, 1+4=5, 5+5 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 7 },
        ]
    },
    {
        name: "Negativo",
        solution: "-24×+-=24, 6+-24=-18, 1+5=6, -18+24=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Inversione",
        solution: "-19+24=5, 3+5=8, -18+10=-8, -8×+-=8, 8+8 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: -18 },
        ]
    },
    {
        name: "Mix Base",
        solution: "-11+13=2, 11+9=20, -18+20=2, 6+2=8, 2+8=10, 10+10 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -11 },
        ]
    },
    {
        name: "Catena Facile",
        solution: "4+13=17, -13×+-=13, 13×+-=-13, -13+17=4, 2×x2=4, 4+4 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: -13 },
        ]
    },
    {
        name: "Somme",
        solution: "-20+28=8, -5×+-=5, 8+17=25, 20×+-=-20, -20+25=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 28 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: 20 },
        ]
    },
    {
        name: "Prodotti",
        solution: "1+4=5, 5×+-=-5, -5×+-=5, -22×+-=22, 1+5=6, -16+22=6, 6+6 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -22 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 1 },
        ]
    },
    {
        name: "Combinazione",
        solution: "4+-20=-16, -18+10=-8, -13+15=2, -16+22=6, -8×+-=8, 6+2=8, 8+8 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Semplice Mix",
        solution: "-7×+-=7, 7+-17=-10, -10×+-=10, 2+20=22, -20+22=2, 2+8=10, 10+10 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -7 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    // === MEDIO (26-45) ===
    {
        name: "Divisione",
        solution: "-18+24=6, 2+-8=-6, -6×|x|=6, 6+6 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: -8 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 24 },
        ]
    },
    {
        name: "Radice",
        solution: "1+-17=-16, -16+17=1, 7+1=8, 8+8 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 17 },
        ]
    },
    {
        name: "Quadrato",
        solution: "-13+12=-1, -1×x3=-3, -3×x²=9, 9+9 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 12 },
        ]
    },
    {
        name: "Assoluto",
        solution: "3+5=8, -12+14=2, 2+8=10, 10+10 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.NUMBER, value: 14 },
        ]
    },
    {
        name: "Catena Media",
        solution: "6+3=9, -24×+-=24, 3+9=12, 24×/2=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Mix Operazioni",
        solution: "-20+25=5, 11+5=16, 6×x2=12, 4+12=16, 16+16 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.NUMBER, value: 6 },
        ]
    },
    {
        name: "Percorso",
        solution: "10+7=17, 4+20=24, 1+6=7, 7+17=24, 24+24 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 6 },
        ]
    },
    {
        name: "Strategia",
        solution: "-29×+-=29, -19+25=6, 7+29=36, 36×√=6, 6+6 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: -29 },
        ]
    },
    {
        name: "Calcolo",
        solution: "10+16=26, -2×+-=2, -20+26=6, 2+6=8, -19+27=8, 8+8 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: -2 },
            { type: SquareType.NUMBER, value: 27 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -20 },
        ]
    },
    {
        name: "Ragionamento",
        solution: "1×x2=2, 2+20=22, -16+22=6, 81×√=9, 3+6=9, 9+9 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 81 },
        ]
    },
    {
        name: "Intermedio",
        solution: "-3×+-=3, 3+-60=-57, 30×/3=10, -57×/3=-19, -19+29=10, 10+10 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 29 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 30 },
            { type: SquareType.NUMBER, value: -3 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: -60 },
        ]
    },
    {
        name: "Bilanciamento",
        solution: "-6×+-=6, 5+-17=-12, 2+6=8, 8+4=12, -12×|x|=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -17 },
        ]
    },
    {
        name: "Equilibrio",
        solution: "2+6=8, -17+20=3, 1+3=4, 8×x2=16, 4+2=6, 10+6=16, 16+16 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 10 },
        ]
    },
    {
        name: "Scelta",
        solution: "576×√=24, 24×/3=8, 7+45=52, 8+52=60, 60×/3=20, 4+20=24, 24+24 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 45 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.NUMBER, value: 576 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Decisione",
        solution: "-18+20=2, 3+11=14, 2+16=18, 18×/3=6, -20+14=-6, -6×+-=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Analisi",
        solution: "1+7=8, 2+6=8, 8×x2=16, 2+-17=-15, -15+16=1, 7+1=8, 8+8 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 7 },
        ]
    },
    {
        name: "Valutazione",
        solution: "63×/3=21, 2+19=21, -15+20=5, -17+21=4, 5+4=9, -20+21=1, 1+8=9, 9+9 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 63 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: -17 },
        ]
    },
    {
        name: "Approccio",
        solution: "7+23=30, 1×x²=1, 30×/3=10, 10+19=29, -9×+-=9, 1+9=10, -19+29=10, 10+10 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -9 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
        ]
    },
    {
        name: "Metodo",
        solution: "9+-22=-13, 3+-7=-4, -4×|x|=4, 6×x2=12, 4+11=15, -13+15=2, 10+2=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -22 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -7 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 11 },
        ]
    },
    {
        name: "Tecnica",
        solution: "3+13=16, 8+-20=-12, -14+16=2, -12×/3=-4, 2×x²=4, -4×x²=16, 4×x²=16, 16+16 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -14 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 13 },
        ]
    },
    // === DIFFICILE (46-70) ===
    {
        name: "Flip",
        solution: "62×flip=26, -20+26=6, 6×/3=2, 10+2=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 62 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
        ]
    },
    {
        name: "Cifre",
        solution: "1+17=18, -15+18=3, 2+14=16, 3+13=16, 16+16 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 17 },
        ]
    },
    {
        name: "Segno",
        solution: "-12×|x|=12, 4+12=16, -19+27=8, 8+16=24, 24+24 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 27 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
        ]
    },
    {
        name: "Complesso",
        solution: "3+6=9, 9+14=23, -18+23=5, 5×x²=25, 25+25 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 14 },
        ]
    },
    {
        name: "Difficile",
        solution: "689×+-=-689, -689×|x|=689, 689×Σ=23, 4+23=27, 27+27 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 27 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 689 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
        ]
    },
    {
        name: "Sfida",
        solution: "-20+29=9, 3+4=7, 7+9=16, 16×x2=32, 8+24=32, 32+32 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 29 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
        ]
    },
    {
        name: "Puzzle",
        solution: "-18+21=3, 10+22=32, 72×/2=36, 3+1=4, 4+32=36, 36+36 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 72 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: -18 },
        ]
    },
    {
        name: "Enigma",
        solution: "10+40=50, 188×/2=94, 50+94=144, 39×Σ=12, 144×√=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 188 },
            { type: SquareType.NUMBER, value: 40 },
            { type: SquareType.NUMBER, value: 39 },
        ]
    },
    {
        name: "Rompicapo",
        solution: "-16+21=5, 4+2=6, 10+6=16, 5+83=88, 88×Σ=16, 16+16 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 83 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 10 },
        ]
    },
    {
        name: "Labirinto",
        solution: "9+8=17, -2×|x|=2, 2+15=17, 7+17=24, 7+17=24, 24+24 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -2 },
            { type: SquareType.NUMBER, value: 7 },
        ]
    },
    {
        name: "Intrico",
        solution: "-49×+-=49, -13+14=1, 1+49=50, 50+100=150, 150×/3=50, 50×/2=25, 25+25 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -49 },
            { type: SquareType.NUMBER, value: 100 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 25 },
        ]
    },
    {
        name: "Nodo",
        solution: "-15+19=4, -81×|x|=81, 81×/3=27, 4+-15=-11, -11+12=1, 1+26=27, 27+27 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 26 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: -81 },
        ]
    },
    {
        name: "Groviglio",
        solution: "3×/3=1, 1+29=30, 1+-13=-12, -12+14=2, 2+30=32, -32×+-=32, 32+32 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -32 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 29 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 14 },
        ]
    },
    {
        name: "Dedalo",
        solution: "2+22=24, 8+27=35, 1+-20=-19, -19+24=5, 1+35=36, 5+31=36, 36+36 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 27 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 31 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 8 },
        ]
    },
    {
        name: "Mistero",
        solution: "2+22=24, 9+24=33, -12×+-=12, 6×/2=3, 3+33=36, 36×/3=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Arcano",
        solution: "5+7=12, 12×/2=6, 6×/3=2, 25×√=5, 2+14=16, 5×x2=10, 10+6=16, 16+16 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
        ]
    },
    {
        name: "Oscuro",
        solution: "2+10=12, 10+12=22, 144×√=12, 6+12=18, 18×/3=6, 6×/3=2, 2+22=24, 24+24 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 144 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.NUMBER, value: 6 },
        ]
    },
    {
        name: "Profondo",
        solution: "1×x²=1, 1+15=16, -15+16=1, -18+19=1, 1+22=23, 1+23=24, 1+24=25, 25+25 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 15 },
        ]
    },
    {
        name: "Arduo",
        solution: "2+42=44, -1×|x|=1, 7+65=72, 1+44=45, 72×flip=27, 9+45=54, 54×/2=27, 27+27 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 65 },
            { type: SquareType.NUMBER, value: -1 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 42 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
        ]
    },
    {
        name: "Impegnativo",
        solution: "8+18=26, 3×x²=9, 2×/2=1, 9+16=25, 1+26=27, 5+27=32, 7+25=32, 32+32 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 7 },
        ]
    },
    {
        name: "Tosto",
        solution: "2×x²=4, 4×x2=8, 8+2=10, 10×/2=5, 4+22=26, -5×+-=5, 5+26=31, 5+31=36, 36+36 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 2 },
        ]
    },
    {
        name: "Duro",
        solution: "-4×|x|=4, -5×x2=-10, 12×+-=-12, 4+-18=-14, -12×+-=12, -10×|x|=10, -14+16=2, 2+10=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.NUMBER, value: -4 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Severo",
        solution: "10×x²=100, 100×Σ=1, -2×x2=-4, -4×x2=-8, -8×x2=-16, -16×+-=16, 1×√=1, 1+15=16, 16+16 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -2 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
        ]
    },
    {
        name: "Rigoroso",
        solution: "8×x3=24, -35×+-=35, 12×/2=6, 6+93=99, 35+99=134, 134×/2=67, 5+67=72, 72×/3=24, 24+24 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -35 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 93 },
        ]
    },
    {
        name: "Esigente",
        solution: "-3×|x|=3, 1+7=8, 8+3=11, 6+3=9, 11+9=20, 25×x²=625, 5+20=25, 625×√=25, 25+25 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: -3 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
        ]
    },
    // === ESPERTO (71-90) ===
    {
        name: "Fattoriale",
        solution: "10+11=21, 3+21=24, 10+-28=-18, 4+-18=-14, -14×|x|=14, 10+14=24, 24+24 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.NUMBER, value: -28 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Potenza",
        solution: "8+-34=-26, 8+-26=-18, 27×flip=72, -18×+-=18, 72×/2=36, 18×x2=36, 36+36 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 27 },
            { type: SquareType.NUMBER, value: -34 },
        ]
    },
    {
        name: "Esponenziale",
        solution: "-17+19=2, -2×|x|=2, 2+62=64, 2+57=59, 1+59=60, 4+60=64, 64+64 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 57 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: -2 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 62 },
        ]
    },
    {
        name: "Esperto",
        solution: "-16×x2=-32, 2+-11=-9, -9×x²=81, -32×+-=32, 32×Σ=5, 5+76=81, 81+81 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 76 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -11 },
        ]
    },
    {
        name: "Maestro",
        solution: "-19+28=9, -11+-89=-100, 1+9=10, 10+-100=-90, -90×+-=90, 1+9=10, 10+90=100, 100+100 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: -89 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 100 },
            { type: SquareType.NUMBER, value: -11 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 28 },
        ]
    },
    {
        name: "Virtuoso",
        solution: "1+12=13, 30×/3=10, -12+13=1, 10+88=98, 1+21=22, 22+98=120, 23+97=120, 120+120 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: 30 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.NUMBER, value: 97 },
            { type: SquareType.NUMBER, value: 88 },
        ]
    },
    {
        name: "Genio",
        solution: "-576×|x|=576, 6+-23=-17, 84×/2=42, -17+20=3, 42×/2=21, 3+21=24, 576×√=24, 24+24 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 84 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: -23 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -576 },
        ]
    },
    {
        name: "Prodigio",
        solution: "5+26=31, 4+25=29, 10+31=41, 7+29=36, 2+41=43, 43×flip=34, 2+34=36, 36+36 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 26 },
        ]
    },
    {
        name: "Campione",
        solution: "2+-51=-49, -55×+-=55, -49×|x|=49, -5×|x|=5, 5+49=54, 6+54=60, 4+60=64, 9+55=64, 64+64 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.NUMBER, value: -51 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -55 },
        ]
    },
    {
        name: "Veterano",
        solution: "4×3ⁿ=81, -6×/2=-3, 5+17=22, -3×+-=3, -19+22=3, 3+21=24, 3+24=27, 27×x3=81, 81+81 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.OPERATION, value: OperationType.POW_3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
        ]
    },
    {
        name: "Elite",
        solution: "2+-98=-96, 5+12=17, -16+17=1, -96×+-=96, 6×/2=3, 3+96=99, 1×flip=100, 1+99=100, 100+100 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -98 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 12 },
        ]
    },
    {
        name: "Supremo",
        solution: "10+12=22, 22+98=120, 194×/2=97, 28×+-=-28, 10+-28=-18, -18+20=2, 2+97=99, 21+99=120, 120+120 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 98 },
            { type: SquareType.NUMBER, value: 194 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 28 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Eccellente",
        solution: "3+13=16, 36×/2=18, 4+2=6, -13+16=3, -16+18=2, 3+6=9, 9+15=24, 6+16=22, 2+22=24, 24+24 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 15 },
        ]
    },
    {
        name: "Brillante",
        solution: "-20+26=6, -17+22=5, 4+22=26, 2×x3=6, 6+20=26, 4+26=30, 6+30=36, 5+26=31, 5+31=36, 36+36 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 26 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: -17 },
        ]
    },
    {
        name: "Luminare",
        solution: "11×+-=-11, -29×x2=-58, -58×+-=58, -15+17=2, -12×|x|=12, 4+2=6, 6+58=64, -11+12=1, 1+63=64, 64+64 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -29 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 63 },
            { type: SquareType.NUMBER, value: 17 },
        ]
    },
    {
        name: "Ultra",
        solution: "-40×/2=-20, 101×Σ=2, 2+18=20, 27×x3=81, -16+20=4, 3+-20=-17, -17+19=2, 4+75=79, 2+79=81, 81+81 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -40 },
            { type: SquareType.NUMBER, value: 75 },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 101 },
            { type: SquareType.NUMBER, value: 27 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
        ]
    },
    {
        name: "Mega",
        solution: "10+-28=-18, -18+23=5, 6+3=9, -2×flip=-200, 5+72=77, 5+77=82, 9+82=91, -200×|x|=200, 200×/2=100, 9+91=100, 100+100 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -2 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: -28 },
            { type: SquareType.NUMBER, value: 72 },
        ]
    },
    {
        name: "Super",
        solution: "-15+16=1, -14+-86=-100, 17×Σ=8, -13×flip=-31, 8+-31=-23, 26+94=120, 1×x3=3, 3+-23=-20, -20+-100=-120, -120×+-=120, 120+120 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: -86 },
            { type: SquareType.NUMBER, value: 94 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: 26 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -14 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: -13 },
        ]
    },
    {
        name: "Iper",
        solution: "-1×+-=1, 2+1=3, 3+5=8, -233×+-=233, 233×+-=-233, -233×+-=233, 233×x3=699, 9+7=16, 8+16=24, 699×Σ=24, 24+24 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -233 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -1 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Massimo",
        solution: "-39×/3=-13, -13+15=2, -13+15=2, 4+60=64, 2+1=3, 3+33=36, 2×n!=2, 64×/2=32, 2×2ⁿ=4, 4+32=36, 36+36 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: -39 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 33 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 60 },
            { type: SquareType.OPERATION, value: OperationType.FACTORIAL },
            { type: SquareType.OPERATION, value: OperationType.POW_2 },
        ]
    },
    // === MAESTRO (91-100) ===
    {
        name: "Finale",
        solution: "5+-24=-19, 16×√=4, -19+24=5, 5+4=9, 3+21=24, 3+16=19, -17+19=2, -13×|x|=13, 2+13=15, 9+15=24, 24+24 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Ultimo",
        solution: "75×/3=25, -18+19=1, 1×n!=1, -16+20=4, 1+22=23, -34×/2=-17, -17+23=6, 6+25=31, 1+31=32, 4+32=36, 36+36 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: -34 },
            { type: SquareType.NUMBER, value: 75 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.FACTORIAL },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.NUMBER, value: 22 },
        ]
    },
    {
        name: "Definitivo",
        solution: "1+42=43, 6+7=13, -11+13=2, 5+-35=-30, -19+20=1, -30×/2=-15, 2+18=20, 1+5=6, 6+42=48, -15+20=5, 5+43=48, 48+48 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -11 },
            { type: SquareType.NUMBER, value: 42 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -35 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 42 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 7 },
        ]
    },
    {
        name: "Leggenda",
        solution: "3+31=34, 5+17=22, 2+-18=-16, -15+17=2, 2+34=36, 12×/2=6, 6+52=58, -16+22=6, 6×2ⁿ=64, 36×√=6, 6+58=64, 64+64 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.POW_2 },
            { type: SquareType.NUMBER, value: 31 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 52 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 5 },
        ]
    },
    {
        name: "Mito",
        solution: "-2×+-=2, 10+49=59, 5+-23=-18, 1+20=21, -18+21=3, -144×/2=-72, -72×|x|=72, 3+59=62, 2+62=64, 6+21=27, -19+27=8, 8+64=72, 72+72 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -23 },
            { type: SquareType.NUMBER, value: 49 },
            { type: SquareType.NUMBER, value: -2 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -144 },
        ]
    },
    {
        name: "Epico",
        solution: "28×Σ=10, 2+10=12, -3×+-=3, 1+12=13, 42×Σ=6, 6+3=9, -15+16=1, 5+13=18, 9+18=27, 7+1=8, 8+73=81, 27×x3=81, 81+81 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 73 },
            { type: SquareType.NUMBER, value: 28 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 42 },
        ]
    },
    {
        name: "Titanico",
        solution: "3+-49=-46, 4+7=11, -17+21=4, 4+94=98, 1×x3=3, 3+-46=-43, 7+-43=-36, 4×3ⁿ=81, 81×√=9, -36×/2=-18, 9+11=20, -18+20=2, 2+98=100, 100+100 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.POW_3 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 100 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 94 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -49 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Colossale",
        solution: "9+1=10, 2+89=91, 10+-23=-13, 3+-24=-21, 7+-21=-14, 29+91=120, -13×+-=13, 100×Σ=1, 5+13=18, -14+18=4, 1+94=95, 4+21=25, 25+95=120, 120+120 spariscono",
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 89 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 94 },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.NUMBER, value: -23 },
            { type: SquareType.NUMBER, value: 100 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 29 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
        ]
    },
    {
        name: "Monumentale",
        solution: "-13+14=1, 10+-32=-22, -15+18=3, -15+18=3, 5+-22=-17, 1+40=41, 81×flip=18, 1+41=42, -17+18=1, 3+14=17, 3×n!=6, 6+1=7, 7+17=24, 42×flip=24, 24+24 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 81 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.OPERATION, value: OperationType.FACTORIAL },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -32 },
            { type: SquareType.NUMBER, value: 40 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 5 },
        ]
    },
    {
        name: "Supremo",
        solution: "2+6=8, 5+17=22, 9+22=31, 41×flip=14, 9+14=23, 5+31=36, -19+23=4, 4+8=12, 12×/2=6, 6+3=9, 2+31=33, 9+21=30, 33×Σ=6, 6+30=36, 36+36 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 41 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 31 },
            { type: SquareType.NUMBER, value: -19 },
        ]
    }
];
