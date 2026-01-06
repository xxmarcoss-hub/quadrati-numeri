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
        maxValue: 3,
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Due Uguali",
        solution: "4+4 spariscono",
        maxValue: 4,
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Somma Base",
        solution: "4+1=5, 5+5 spariscono",
        maxValue: 5,
        squares: [
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Catena",
        solution: "2+4=6, 6+6 spariscono",
        maxValue: 6,
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
        ]
    },
    {
        name: "Tre Numeri",
        solution: "-16+19=3, 1+2=3, 3+3 spariscono",
        maxValue: 19,
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -16 },
        ]
    },
    {
        name: "Primi Passi",
        solution: "3+-21=-18, -18+22=4, 4+4 spariscono",
        maxValue: 22,
        squares: [
            { type: SquareType.NUMBER, value: -21 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Inizio",
        solution: "-17+22=5, -13+14=1, 4+1=5, 5+5 spariscono",
        maxValue: 22,
        squares: [
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 14 },
        ]
    },
    {
        name: "Semplice",
        solution: "-13+15=2, 2+3=5, 1+5=6, 6+6 spariscono",
        maxValue: 16,
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 15 },
        ]
    },
    {
        name: "Base",
        solution: "2+14=16, 1+-22=-21, 8+-21=-13, -13+16=3, 3+3 spariscono",
        maxValue: 22,
        squares: [
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -22 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 1 },
        ]
    },
    {
        name: "Avvio",
        solution: "1+20=21, 1+-22=-21, 4+-21=-17, -17+21=4, 4+4 spariscono",
        maxValue: 22,
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -22 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    // === FACILE (11-25) ===
    {
        name: "Raddoppio",
        solution: "1×x3=3, 3+1=4, 4+4 spariscono",
        maxValue: 4,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Triplice",
        solution: "4+17=21, -16+21=5, 5+5 spariscono",
        maxValue: 17,
        squares: [
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
        ]
    },
    {
        name: "Specchio",
        solution: "-5×+-=5, 5+1=6, 6+6 spariscono",
        maxValue: 6,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 1 },
        ]
    },
    {
        name: "Doppio",
        solution: "14×x2=28, 1+-21=-20, -20+28=8, 8+8 spariscono",
        maxValue: 28,
        squares: [
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.NUMBER, value: -21 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 8 },
        ]
    },
    {
        name: "Moltiplicazione",
        solution: "4+5=9, 6+4=10, 9+1=10, 10+10 spariscono",
        maxValue: 6,
        squares: [
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Fattore Due",
        solution: "-19+22=3, 3+1=4, -4×+-=4, 4+4 spariscono",
        maxValue: 23,
        squares: [
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -4 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Fattore Tre",
        solution: "1+-6=-5, -5×+-=5, 5×+-=-5, -5×+-=5, 5+5 spariscono",
        maxValue: 6,
        squares: [
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Negativo",
        solution: "-19+25=6, -14+15=1, 3+1=4, 2+4=6, 6+6 spariscono",
        maxValue: 25,
        squares: [
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -14 },
            { type: SquareType.NUMBER, value: 2 },
        ]
    },
    {
        name: "Inversione",
        solution: "-4×+-=4, 7+-15=-8, 4×x2=8, -8×+-=8, 8+8 spariscono",
        maxValue: 15,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: -4 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Mix Base",
        solution: "-3×+-=3, 7×+-=-7, -7×+-=7, 7+3=10, -10×+-=10, 10+10 spariscono",
        maxValue: 10,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -10 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: -3 },
        ]
    },
    {
        name: "Catena Facile",
        solution: "4×x2=8, 8+15=23, 3+-7=-4, -4×+-=4, -19+23=4, 4+4 spariscono",
        maxValue: 19,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -7 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Somme",
        solution: "10+3=13, 18×+-=-18, -18+13=-5, -5×+-=5, -5×+-=5, 5+5 spariscono",
        maxValue: 18,
        squares: [
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Prodotti",
        solution: "-13×+-=13, 5+13=18, -17+24=7, 2×x3=6, 7+18=25, -19+25=6, 6+6 spariscono",
        maxValue: 24,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 24 },
        ]
    },
    {
        name: "Combinazione",
        solution: "1+5=6, -20×+-=20, 6+20=26, -6×x3=-18, 6+2=8, -18+26=8, 8+8 spariscono",
        maxValue: 20,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.NUMBER, value: 6 },
        ]
    },
    {
        name: "Semplice Mix",
        solution: "-18+19=1, -13+14=1, 1+15=16, 1+9=10, -13+16=3, 3+7=10, 10+10 spariscono",
        maxValue: 34,
        squares: [
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 14 },
        ]
    },
    // === MEDIO (26-45) ===
    {
        name: "Divisione",
        solution: "2×/2=1, -19+24=5, 5+1=6, 6+6 spariscono",
        maxValue: 24,
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 2 },
        ]
    },
    {
        name: "Radice",
        solution: "7+1=8, -12+14=2, 6+2=8, 8+8 spariscono",
        maxValue: 14,
        squares: [
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 14 },
        ]
    },
    {
        name: "Quadrato",
        solution: "6+3=9, -15+12=-3, -3×x²=9, 9+9 spariscono",
        maxValue: 15,
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 12 },
        ]
    },
    {
        name: "Assoluto",
        solution: "-17+21=4, 6+4=10, 4+6=10, 10+10 spariscono",
        maxValue: 21,
        squares: [
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 21 },
        ]
    },
    {
        name: "Catena Media",
        solution: "3+-27=-24, -24×+-=24, 1+11=12, 24×/2=12, 12+12 spariscono",
        maxValue: 27,
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -27 },
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
        ]
    },
    {
        name: "Mix Operazioni",
        solution: "7+1=8, 11+5=16, 4+8=12, 4+12=16, 16+16 spariscono",
        maxValue: 12,
        squares: [
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Percorso",
        solution: "-20+23=3, 5+12=17, 4+17=21, 3+21=24, 24+24 spariscono",
        maxValue: 40,
        squares: [
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.NUMBER, value: 23 },
        ]
    },
    {
        name: "Strategia",
        solution: "5+13=18, -17+18=1, 1+5=6, 5+1=6, 6+6 spariscono",
        maxValue: 17,
        squares: [
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 1 },
        ]
    },
    {
        name: "Calcolo",
        solution: "3+-21=-18, -18+16=-2, -2×|x|=2, 2+6=8, 5+3=8, 8+8 spariscono",
        maxValue: 21,
        squares: [
            { type: SquareType.NUMBER, value: -21 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Ragionamento",
        solution: "-17+19=2, -16+19=3, 2×x2=4, 3+2=5, 4+5=9, 9+9 spariscono",
        maxValue: 19,
        squares: [
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 19 },
        ]
    },
    {
        name: "Intermedio",
        solution: "30×/3=10, -20+30=10, 10+-35=-25, 5+-25=-20, -20+30=10, 10+10 spariscono",
        maxValue: 35,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -35 },
            { type: SquareType.NUMBER, value: 30 },
            { type: SquareType.NUMBER, value: 30 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 30 },
        ]
    },
    {
        name: "Bilanciamento",
        solution: "1×√=1, -9×|x|=9, 1+11=12, 1×x3=3, 3+9=12, 12+12 spariscono",
        maxValue: 11,
        squares: [
            { type: SquareType.NUMBER, value: -9 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 1 },
        ]
    },
    {
        name: "Equilibrio",
        solution: "-128×x2=-256, 3+5=8, 8+7=15, -256×+-=256, 1+15=16, 256×√=16, 16+16 spariscono",
        maxValue: 256,
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -128 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Scelta",
        solution: "9+-47=-38, 1+9=10, 4+-38=-34, 10+-34=-24, -24×|x|=24, 3+21=24, 24+24 spariscono",
        maxValue: 47,
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -47 },
        ]
    },
    {
        name: "Decisione",
        solution: "100×√=10, 2+5=7, 6+3=9, 7+10=17, 9+17=26, -20+26=6, 6+6 spariscono",
        maxValue: 100,
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 100 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 2 },
        ]
    },
    {
        name: "Analisi",
        solution: "-4×+-=4, 1+4=5, 5+-13=-8, 12×x2=24, 24×/3=8, -8×+-=8, 8+8 spariscono",
        maxValue: 13,
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: -4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Valutazione",
        solution: "69×/3=23, 1+2=3, -1×x²=1, 6+3=9, 1+23=24, 24×/3=8, 8+1=9, 9+9 spariscono",
        maxValue: 69,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 69 },
            { type: SquareType.NUMBER, value: -1 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 6 },
        ]
    },
    {
        name: "Approccio",
        solution: "-18+21=3, 3+-13=-10, 10×x2=20, 20×/2=10, -10×|x|=10, 10×x3=30, 30×/3=10, 10+10 spariscono",
        maxValue: 21,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 10 },
        ]
    },
    {
        name: "Metodo",
        solution: "6+1=7, 2+61=63, 7+-24=-17, 63×/3=21, -17+21=4, 24×/2=12, 4×x3=12, 12+12 spariscono",
        maxValue: 67,
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 61 },
            { type: SquareType.NUMBER, value: 2 },
        ]
    },
    {
        name: "Tecnica",
        solution: "-14+15=1, 529×√=23, 1+23=24, -51×/3=-17, -17+24=7, -16×+-=16, 9+7=16, 16+16 spariscono",
        maxValue: 529,
        squares: [
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: -51 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: -14 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 529 },
            { type: SquareType.NUMBER, value: 9 },
        ]
    },
    // === DIFFICILE (46-70) ===
    {
        name: "Flip",
        solution: "6+12=18, 18×/3=6, 6×x2=12, 6×x2=12, 12+12 spariscono",
        maxValue: 18,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 12 },
        ]
    },
    {
        name: "Cifre",
        solution: "-31×flip=-13, -13+17=4, -4×x²=16, 4+12=16, 16+16 spariscono",
        maxValue: 31,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: -31 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: -4 },
        ]
    },
    {
        name: "Segno",
        solution: "-18+19=1, -11+13=2, 1+23=24, 2+22=24, 24+24 spariscono",
        maxValue: 42,
        squares: [
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: -11 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: 22 },
        ]
    },
    {
        name: "Complesso",
        solution: "18×/2=9, 9+-27=-18, -18×|x|=18, 7+18=25, 25+25 spariscono",
        maxValue: 27,
        squares: [
            { type: SquareType.NUMBER, value: -27 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
        ]
    },
    {
        name: "Difficile",
        solution: "-81×x2=-162, -162×+-=162, 162×/2=81, 81×/3=27, 27+27 spariscono",
        maxValue: 81,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -81 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 27 },
        ]
    },
    {
        name: "Sfida",
        solution: "7+16=23, -5×+-=5, 6+21=27, 5+27=32, 23×flip=32, 32+32 spariscono",
        maxValue: 21,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -5 },
        ]
    },
    {
        name: "Puzzle",
        solution: "5+10=15, 15×Σ=6, 3+20=23, 7+23=30, 6+30=36, 36+36 spariscono",
        maxValue: 36,
        squares: [
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
        ]
    },
    {
        name: "Enigma",
        solution: "36×/3=12, 69×Σ=15, -7×+-=7, 15×/3=5, 7+5=12, 12+12 spariscono",
        maxValue: 69,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -7 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 69 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
        ]
    },
    {
        name: "Rompicapo",
        solution: "-2×|x|=2, 2+28=30, 2+30=32, 1+15=16, 32×/2=16, 16+16 spariscono",
        maxValue: 28,
        squares: [
            { type: SquareType.NUMBER, value: 28 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -2 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 15 },
        ]
    },
    {
        name: "Labirinto",
        solution: "-20+30=10, 2+7=9, 10+9=19, -24×+-=24, 5+19=24, 24+24 spariscono",
        maxValue: 30,
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 30 },
        ]
    },
    {
        name: "Intrico",
        solution: "7+32=39, 4+39=43, 52×flip=25, 43×Σ=7, 81×flip=18, 7+18=25, 25+25 spariscono",
        maxValue: 88,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 52 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 81 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 32 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Nodo",
        solution: "7+19=26, -20+21=1, 8+1=9, 9+14=23, 4+23=27, 1+26=27, 27+27 spariscono",
        maxValue: 26,
        squares: [
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 8 },
        ]
    },
    {
        name: "Groviglio",
        solution: "-13+15=2, 2+6=8, -24×+-=24, -15+19=4, 4+28=32, 8+24=32, 32+32 spariscono",
        maxValue: 47,
        squares: [
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 28 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Dedalo",
        solution: "2+26=28, 66×/2=33, -19+22=3, -20+28=8, 3+33=36, 8+28=36, 36+36 spariscono",
        maxValue: 122,
        squares: [
            { type: SquareType.NUMBER, value: 26 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 66 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 28 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -19 },
        ]
    },
    {
        name: "Mistero",
        solution: "-17+19=2, 2+5=7, 7+3=10, 10+2=12, 30×/3=10, 10+2=12, 12+12 spariscono",
        maxValue: 30,
        squares: [
            { type: SquareType.NUMBER, value: 30 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 2 },
        ]
    },
    {
        name: "Arcano",
        solution: "-20+29=9, -12+13=1, 1+9=10, 2+14=16, 4+-24=-20, -20+26=6, 10+6=16, 16+16 spariscono",
        maxValue: 33,
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 29 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.NUMBER, value: 26 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.NUMBER, value: -24 },
        ]
    },
    {
        name: "Oscuro",
        solution: "3+1=4, 4+-11=-7, 2+-26=-24, -24×|x|=24, -7×+-=7, 7+3=10, 10+14=24, 24+24 spariscono",
        maxValue: 26,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -26 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -11 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Profondo",
        solution: "8+2=10, 10+-25=-15, 4+48=52, 52×flip=25, -15+20=5, 5+10=15, 10+15=25, 25+25 spariscono",
        maxValue: 48,
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 48 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: -25 },
        ]
    },
    {
        name: "Arduo",
        solution: "1+2=3, 324×√=18, 3+10=13, 10+13=23, 18×x3=54, 4+23=27, 54×/2=27, 27+27 spariscono",
        maxValue: 324,
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 324 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
        ]
    },
    {
        name: "Impegnativo",
        solution: "16×√=4, -15+19=4, -15+20=5, 4+5=9, 361×√=19, 9+19=28, 4+28=32, 32+32 spariscono",
        maxValue: 361,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 361 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: 32 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 20 },
        ]
    },
    {
        name: "Tosto",
        solution: "4+-31=-27, 9+-27=-18, -18+25=7, 7+9=16, 7+16=23, -17+23=6, 6×x²=36, -36×|x|=36, 36+36 spariscono",
        maxValue: 180,
        squares: [
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: -31 },
            { type: SquareType.NUMBER, value: -36 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 9 },
        ]
    },
    {
        name: "Duro",
        solution: "7+-27=-20, -19+23=4, 5+1=6, 9×√=3, -20+25=5, 3+5=8, 6×x2=12, 8+4=12, 12+12 spariscono",
        maxValue: 135,
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: -27 },
        ]
    },
    {
        name: "Severo",
        solution: "-20+24=4, 6+-14=-8, -8×+-=8, 4+9=13, 5+13=18, 18×/3=6, 6+10=16, 8×x2=16, 16+16 spariscono",
        maxValue: 120,
        squares: [
            { type: SquareType.NUMBER, value: -14 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
        ]
    },
    {
        name: "Rigoroso",
        solution: "6+-23=-17, -17+15=-2, 10+-36=-26, -2×|x|=2, 2+-26=-24, 2+6=8, 8×x3=24, -24×|x|=24, 24+24 spariscono",
        maxValue: 36,
        squares: [
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -36 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -23 },
        ]
    },
    {
        name: "Esigente",
        solution: "9+13=22, 7+3=10, 10+7=17, -15×/3=-5, -5×|x|=5, -14+17=3, 5×x²=25, 3+22=25, 25+25 spariscono",
        maxValue: 75,
        squares: [
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -14 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: 7 },
        ]
    },
    // === ESPERTO (71-90) ===
    {
        name: "Fattoriale",
        solution: "74×x3=222, 2+5=7, 222×x2=444, 7+17=24, 444×x2=888, 888×Σ=24, 24+24 spariscono",
        maxValue: 131,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: 74 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
        ]
    },
    {
        name: "Potenza",
        solution: "-13+16=3, 49×flip=94, 3+94=97, 1+10=11, 11+97=108, 108×/3=36, 36+36 spariscono",
        maxValue: 61,
        squares: [
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 49 },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: -13 },
        ]
    },
    {
        name: "Esponenziale",
        solution: "24×/3=8, 4+5=9, 8+47=55, 29×x2=58, 9+55=64, 6+58=64, 64+64 spariscono",
        maxValue: 81,
        squares: [
            { type: SquareType.NUMBER, value: 29 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 47 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 5 },
        ]
    },
    {
        name: "Esperto",
        solution: "-17×+-=17, 1+17=18, 2+79=81, 18×x²=324, 324×√=18, 18×flip=81, 81+81 spariscono",
        maxValue: 81,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 79 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
        ]
    },
    {
        name: "Maestro",
        solution: "-48×/3=-16, -21×|x|=21, -92×|x|=92, 8+92=100, -16+21=5, 5+91=96, 4+96=100, 100+100 spariscono",
        maxValue: 92,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: -48 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: -92 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 91 },
            { type: SquareType.NUMBER, value: -21 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
        ]
    },
    {
        name: "Virtuoso",
        solution: "-20+27=7, -92×|x|=92, 3+91=94, 7+9=16, 10+16=26, 28+92=120, 26+94=120, 120+120 spariscono",
        maxValue: 112,
        squares: [
            { type: SquareType.NUMBER, value: 28 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 27 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -92 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 91 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Genio",
        solution: "-13×+-=13, 6+18=24, -12+13=1, 1×√=1, 1×√=1, 1×n!=1, 1+23=24, 24+24 spariscono",
        maxValue: 24,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.FACTORIAL },
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: -12 },
        ]
    },
    {
        name: "Prodigio",
        solution: "6+3=9, 8+3=11, 11+1=12, 9+-21=-12, -12×|x|=12, 12×x3=36, 12×x3=36, 36+36 spariscono",
        maxValue: 24,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: -21 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
        ]
    },
    {
        name: "Campione",
        solution: "-69×/3=-23, 6+1=7, -23×|x|=23, -20+23=3, 6+3=9, 9+55=64, 1+56=57, 7+57=64, 64+64 spariscono",
        maxValue: 69,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 55 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 56 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -69 },
            { type: SquareType.NUMBER, value: 1 },
        ]
    },
    {
        name: "Veterano",
        solution: "-15+16=1, -17+22=5, 3+72=75, 34×x2=68, 7+68=75, 6+75=81, 5+1=6, 6+75=81, 81+81 spariscono",
        maxValue: 360,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: 34 },
            { type: SquareType.NUMBER, value: 72 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 16 },
        ]
    },
    {
        name: "Elite",
        solution: "1×x²=1, 4+-17=-13, 1+-13=-12, 4+-12=-8, 8+92=100, 1+91=92, -8×+-=8, 8+92=100, 100+100 spariscono",
        maxValue: 460,
        squares: [
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 92 },
            { type: SquareType.NUMBER, value: 91 },
            { type: SquareType.NUMBER, value: 4 },
        ]
    },
    {
        name: "Supremo",
        solution: "20+100=120, 361×√=19, 10+-28=-18, -18+19=1, 400×√=20, 1×x²=1, 1+20=21, 21×flip=120, 120+120 spariscono",
        maxValue: 2000,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.NUMBER, value: 400 },
            { type: SquareType.NUMBER, value: -28 },
            { type: SquareType.NUMBER, value: 361 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 100 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
        ]
    },
    {
        name: "Eccellente",
        solution: "3+5=8, 1+8=9, 2+19=21, 21×/3=7, 5+1=6, 6+-30=-24, 7+9=16, -24×+-=24, 8+16=24, 24+24 spariscono",
        maxValue: 150,
        squares: [
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: -30 },
            { type: SquareType.NUMBER, value: 5 },
        ]
    },
    {
        name: "Brillante",
        solution: "-14×|x|=14, 2+14=16, -40×/2=-20, -6×x3=-18, 6+22=28, -20+30=10, 10+16=26, -18+26=8, 8+28=36, 36+36 spariscono",
        maxValue: 200,
        squares: [
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.NUMBER, value: 30 },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: -40 },
            { type: SquareType.NUMBER, value: -14 },
        ]
    },
    {
        name: "Luminare",
        solution: "4×/2=2, 6×x3=18, 4+2=6, 6+18=24, -9×x2=-18, 2+83=85, -18+24=6, 85×flip=58, 6+58=64, 64+64 spariscono",
        maxValue: 415,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 64 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 83 },
            { type: SquareType.NUMBER, value: -9 },
        ]
    },
    {
        name: "Ultra",
        solution: "6+1=7, 10+54=64, -19+21=2, 1+9=10, 2+78=80, 7+64=71, -1×|x|=1, 10+71=81, 1+80=81, 81+81 spariscono",
        maxValue: 390,
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 78 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 54 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -1 },
            { type: SquareType.NUMBER, value: 1 },
        ]
    },
    {
        name: "Mega",
        solution: "6+-19=-13, 1+23=24, 7+83=90, 5+-21=-16, 24×/3=8, -13+15=2, 6+-16=-10, 8+90=98, 2+98=100, -10×x²=100, 100+100 spariscono",
        maxValue: 415,
        squares: [
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -21 },
            { type: SquareType.NUMBER, value: 83 },
            { type: SquareType.NUMBER, value: 5 },
        ]
    },
    {
        name: "Super",
        solution: "2+-95=-93, 8+1=9, -20+-100=-120, 9+12=21, -18+21=3, -120×+-=120, 3×x2=6, -93×|x|=93, 6+93=99, 21+99=120, 120+120 spariscono",
        maxValue: 500,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: -95 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -100 },
            { type: SquareType.NUMBER, value: 21 },
        ]
    },
    {
        name: "Iper",
        solution: "7×x3=21, -19+21=2, -19+25=6, -3×+-=3, 2+6=8, -17+21=4, 3+5=8, 8+4=12, 8+12=20, 4+20=24, 24+24 spariscono",
        maxValue: 125,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: -3 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 24 },
        ]
    },
    {
        name: "Massimo",
        solution: "338×x2=676, 18×x2=36, -24×+-=24, -17+24=7, -3×/3=-1, -1×x3=-3, -3×|x|=3, 676×√=26, 3+26=29, 7+29=36, 36+36 spariscono",
        maxValue: 1690,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: 18 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 338 },
            { type: SquareType.NUMBER, value: -3 },
        ]
    },
    // === MAESTRO (91-100) ===
    {
        name: "Finale",
        solution: "2+24=26, 2+26=28, 9+-24=-15, -15+17=2, 3+2=5, -19+28=9, 10+9=19, -48×+-=48, 5+19=24, 48×/2=24, 24+24 spariscono",
        maxValue: 240,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -24 },
            { type: SquareType.NUMBER, value: -48 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 24 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 2 },
        ]
    },
    {
        name: "Ultimo",
        solution: "3+4=7, 19×flip=91, 71×+-=-71, -71×flip=-17, 784×√=28, 1+7=8, -17×|x|=17, 8+28=36, 17+91=108, 108×/3=36, 36+36 spariscono",
        maxValue: 3920,
        squares: [
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.NUMBER, value: 19 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 784 },
            { type: SquareType.NUMBER, value: 71 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 3 },
        ]
    },
    {
        name: "Definitivo",
        solution: "1+4=5, -31×x2=-62, -15+21=6, 6+23=29, -20+29=9, 5+-62=-57, 9+-57=-48, -48×|x|=48, 5+2=7, 3+38=41, 7+41=48, 48+48 spariscono",
        maxValue: 190,
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -15 },
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -31 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 38 },
            { type: SquareType.NUMBER, value: 2 },
        ]
    },
    {
        name: "Leggenda",
        solution: "-44×|x|=44, -19+21=2, 4×x3=12, 3+2=5, 6+12=18, 1×flip=10, -14+18=4, 10+44=54, 5+4=9, 10+54=64, 9+55=64, 64+64 spariscono",
        maxValue: 275,
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 55 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -44 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -14 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
        ]
    },
    {
        name: "Mito",
        solution: "-27×x²=729, 729×√=27, -18+16=-2, -2×/2=-1, -1×x2=-2, 20×x3=60, -2×+-=2, 27×/3=9, 9+1=10, 2+60=62, 10+62=72, 36×x2=72, 72+72 spariscono",
        maxValue: 180,
        squares: [
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.NUMBER, value: 16 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.NUMBER, value: -27 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.SQRT },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
        ]
    },
    {
        name: "Epico",
        solution: "8+12=20, 3+1=4, 1+67=68, 4+68=72, 6+4=10, 72×flip=27, -19+20=1, 27×x3=81, 4+1=5, -66×|x|=66, 10+66=76, 5+76=81, 81+81 spariscono",
        maxValue: 335,
        squares: [
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -66 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 67 },
        ]
    },
    {
        name: "Titanico",
        solution: "-18+26=8, 8+22=30, -20+21=1, -20+30=10, 9+13=22, -190×/2=-95, -95×|x|=95, 1+95=96, 3+78=81, 9+81=90, 22×Σ=4, 10+90=100, 4+96=100, 100+100 spariscono",
        maxValue: 950,
        squares: [
            { type: SquareType.NUMBER, value: -190 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.NUMBER, value: 26 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 78 },
            { type: SquareType.NUMBER, value: -18 },
        ]
    },
    {
        name: "Colossale",
        solution: "5+-25=-20, -200×/2=-100, -20+-100=-120, -120×|x|=120, 1+5=6, 3+-20=-17, 2×flip=20, -17+20=3, 3+14=17, -194×/2=-97, 6+17=23, -97×|x|=97, 23+97=120, 120+120 spariscono",
        maxValue: 1000,
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: -25 },
            { type: SquareType.NUMBER, value: -194 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -200 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 14 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.OPERATION, value: OperationType.DIVIDE_2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -20 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
        ]
    },
    {
        name: "Monumentale",
        solution: "13×+-=-13, -17+22=5, -13×x2=-26, 9+5=14, 6+1=7, -13+14=1, 1+22=23, 1+23=24, 3+7=10, 2+-26=-24, 10+12=22, 9+-24=-15, -15+17=2, 2+22=24, 24+24 spariscono",
        maxValue: 110,
        squares: [
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: -13 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.NUMBER, value: 22 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 13 },
            { type: SquareType.NUMBER, value: -17 },
        ]
    },
    {
        name: "Supremo",
        solution: "-19+23=4, -18+25=7, 3+1=4, 4+23=27, 3+-17=-14, 5+21=26, 1+4=5, 5+26=31, 12×flip=21, 7+27=34, -16+21=5, -14+16=2, 2+34=36, 5+31=36, 36+36 spariscono",
        maxValue: 125,
        squares: [
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: -19 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: -17 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.NUMBER, value: 25 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -18 },
            { type: SquareType.NUMBER, value: -16 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 23 },
            { type: SquareType.NUMBER, value: 16 },
        ]
    }
];
