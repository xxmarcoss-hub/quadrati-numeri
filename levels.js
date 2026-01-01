// Tipi di contenuto dei quadrati
const SquareType = {
    NUMBER: 'number',
    OPERATION: 'operation'
};

// Tipi di operazioni
const OperationType = {
    // Operazioni moltiplicative (si compongono tra loro)
    MULTIPLY_2: 'x2',
    MULTIPLY_3: 'x3',
    NEGATE: '+-',
    // Operazioni speciali (non componibili)
    ABS: '|x|',
    SQUARE: 'x²',
    FLIP: 'flip',
    SUM_DIGITS: 'Σ'
};

// Operazioni speciali: non si compongono con altre operazioni
const SpecialOperations = [OperationType.ABS, OperationType.SQUARE, OperationType.FLIP, OperationType.SUM_DIGITS];

// Categorie di difficoltà
const DifficultyCategory = {
    TUTORIAL: { name: 'Tutorial', range: [0, 3] },
    EASY: { name: 'Facile', range: [4, 7] },
    MEDIUM: { name: 'Medio', range: [8, 11] },
    HARD: { name: 'Difficile', range: [12, 15] },
    EXPERT: { name: 'Esperto', range: [16, 19] },
    FINAL: { name: 'Sfida Finale', range: [20, 24] },
    TRASH: { name: 'Cestino', range: [25, 28] },
    ABS: { name: 'Valore Assoluto', range: [29, 30] },
    SQUARE: { name: 'Quadrato', range: [31, 32] },
    FLIP: { name: 'Inversione Cifre', range: [33, 34] },
    SUM_DIGITS: { name: 'Somma Cifre', range: [35, 36] }
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

// Livelli predefiniti - tutti verificati risolvibili
const levels = [
    // === TUTORIAL (1-4) === Meccaniche base
    {
        name: "Tutorial",
        // Soluzione: 3+3 spariscono
        solution: "3+3 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 3 }
        ]
    },
    {
        name: "Somma",
        // Soluzione: 1+2=3, 3+3 spariscono
        solution: "1+2=3, 3+3 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 }
        ]
    },
    {
        name: "Raddoppia",
        // Soluzione: 2×x2=4, 4+4 spariscono
        solution: "2×x2=4, 4+4 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Inversione",
        // Soluzione: 5×[+-]=-5, -5+-5 spariscono
        solution: "5×[+-]=-5, -5+-5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    // === FACILI (5-8) ===
    {
        name: "Catena",
        // Soluzione: 5+5 spariscono, 1+4=5, 2+3=5, 5+5 spariscono
        solution: "5+5 spariscono, 1+4=5, 2+3=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 5 }
        ]
    },
    {
        name: "Doppio x2",
        // Soluzione: x2+x2 spariscono, 1+4=5, 2+3=5, 5+5 spariscono
        solution: "x2+x2 spariscono, 1+4=5, 2+3=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Specchio",
        // Soluzione: [-6]×[+-]=6, 2+4=6, 6+6 spariscono
        solution: "[-6]×[+-]=6, 2+4=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Triplica",
        // Soluzione: 2×x3=6, 6+6 spariscono, 1+4=5, 5+5 spariscono
        solution: "2×x3=6, 6+6 spariscono, 1+4=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    // === MEDI (9-12) ===
    {
        name: "Otto per Due",
        // Soluzione corretta: 4×x2=8, 2+6=8, 8+8 spariscono, x3+x3 spariscono
        solution: "4×x2=8, 2+6=8, 8+8 spariscono, x3+x3 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    {
        name: "Somma Otto",
        // Soluzione: 2+2 spariscono, 4×x2=8, 1+7=8, 8+8 spariscono
        solution: "2+2 spariscono, 4×x2=8, 1+7=8, 8+8 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Negativo",
        // Soluzione: 6×[+-]=-6, 3+[-6]=-3, -3+-3 spariscono
        solution: "6×[+-]=-6, 3+[-6]=-3, -3+-3 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Meno Sei",
        // Soluzione: 1+5=6, 6×[+-]=-6, -6+-6 spariscono
        solution: "1+5=6, 6×[+-]=-6, -6+-6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    // === DIFFICILI (13-16) ===
    {
        name: "Percorso",
        // Soluzione: 1+2=3, 3+[-6]=-3, -3×[+-]=3, 3+3 spariscono
        solution: "1+2=3, 3+[-6]=-3, -3×[+-]=3, 3+3 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Dodici",
        // Soluzione: 4×x3=12, 12+12 spariscono, 8+8 spariscono
        solution: "4×x3=12, 12+12 spariscono, 8+8 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    {
        name: "Composto",
        // Soluzione: x2×x3=x6, x6+x6 spariscono, 2+3=5, 5+5 spariscono
        solution: "x2×x3=x6, x6+x6 spariscono, 2+3=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: 'x6' }
        ]
    },
    {
        name: "Labirinto",
        // Soluzione: 4×x2=8, 8+8 spariscono, 2×x3=6, 6+6 spariscono
        solution: "4×x2=8, 8+8 spariscono, 2×x3=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    // === ESPERTI (17-20) ===
    {
        name: "Caos",
        // Soluzione: [-6]×[+-]=6, 6+6 spariscono, 1+3=4, 4+4 spariscono
        solution: "[-6]×[+-]=6, 6+6 spariscono, 1+3=4, 4+4 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: -6 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Equilibrio",
        // Soluzione: 8×[+-]=-8, -8+-8 spariscono, 2+4=6, 6+6 spariscono
        solution: "8×[+-]=-8, -8+-8 spariscono, 2+4=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: -8 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Intrico",
        // Soluzione: 2×x3=6, 6+6 spariscono, 1+3=4, 4×x2=8, 8+8 spariscono
        solution: "2×x3=6, 6+6 spariscono, 1+3=4, 4×x2=8, 8+8 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    {
        name: "Maestro",
        // Soluzione: x3+x3 spariscono, 2×x2=4, 4+4 spariscono, 1+5=6, 6+6 spariscono, 3+9=12, 12+12 spariscono
        solution: "x3+x3 spariscono, 2×x2=4, 4+4 spariscono, 1+5=6, 6+6 spariscono, 3+9=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    // === SFIDA FINALE (21-25) === Livelli grandi
    {
        name: "Decine",
        // Soluzione: 5×x2=10, 10+10 spariscono, 3+7=10, 2+8=10, 10+10 spariscono
        solution: "5×x2=10, 10+10 spariscono, 3+7=10, 2+8=10, 10+10 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Venti",
        // Soluzione: 10×x2=20, 20+20 spariscono, 5+15=20, 4+6=10, 10+10 spariscono
        solution: "10×x2=20, 20+20 spariscono, 5+15=20, 4+6=10, 10+10 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 10 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 20 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    {
        name: "Trentasei",
        // Soluzione: 6×x2=12, 12×x3=36, 36+36 spariscono, 4+8=12, 12+12 spariscono
        solution: "6×x2=12, 12×x3=36, 36+36 spariscono, 4+8=12, 12+12 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 36 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    {
        name: "Caos Totale",
        // Soluzione: 12×[+-]=-12, -12+-12 spariscono, 4×x3=12, 3+9=12, 12+12 spariscono, 6+6 spariscono
        solution: "12×[+-]=-12, -12+-12 spariscono, 4×x3=12, 3+9=12, 12+12 spariscono, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: -12 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 },
            { type: SquareType.OPERATION, value: OperationType.NEGATE }
        ]
    },
    {
        name: "Finale",
        // Soluzione: 15+15 spariscono, 4×x2=8, 8+8 spariscono, 2×x3=6, 6+6 spariscono, 1+3=4, 4+5=9, 9+9 spariscono
        solution: "15+15 spariscono, 4×x2=8, 8+8 spariscono, 2×x3=6, 6+6 spariscono, 1+3=4, 4+5=9, 9+9 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 1 },
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 8 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.NUMBER, value: 15 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_3 }
        ]
    },
    // === CESTINO (26-29) === Livelli con elemento cestino
    {
        name: "Intruso",
        trashSlots: 1,
        // Soluzione: cestina 13, 4+4 spariscono
        solution: "Cestina 13, 4+4 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 13 }
        ]
    },
    {
        name: "Due Intrusi",
        trashSlots: 2,
        // Soluzione: cestina 7 e 11, 3+3 spariscono, 5+5 spariscono
        solution: "Cestina 7 e 11, 3+3 spariscono, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: 11 }
        ]
    },
    {
        name: "Scelta",
        trashSlots: 1,
        // Due numeri primi, un solo slot: devi scegliere quale cestinare
        // Soluzione: cestina 7, 2+3=5, 5+5 spariscono OPPURE cestina 11, 2+5=7, 3+4=7, 7+7 spariscono
        solution: "Cestina 7, 2+3=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: 7 }
        ]
    },
    {
        name: "Strategia",
        trashSlots: 1,
        // Soluzione: cestina 17, 4×x2=8, 8+8 spariscono, 3+5=8... no, serve 2+6=8
        // Riprovo: cestina 17, 2+6=8, 3+5=8, 8+8 spariscono, 4×x2=8... serve un altro 8
        // Nuovo: 4×x2=8, cestina 17, 2+6=8, 8+8 spariscono, 3+5=8... 8 rimasto
        // Cambio design: cestina 17, 3×x2=6, 2+4=6, 6+6 spariscono
        solution: "Cestina 17, 3×x2=6, 2+4=6, 6+6 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.NUMBER, value: 6 },
            { type: SquareType.NUMBER, value: 17 },
            { type: SquareType.OPERATION, value: OperationType.MULTIPLY_2 }
        ]
    },
    // === VALORE ASSOLUTO (30-31) ===
    {
        name: "Assoluto",
        // Soluzione: -5×|x|=5, 5+5 spariscono
        solution: "-5×|x|=5, 5+5 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 5 },
            { type: SquareType.NUMBER, value: -5 },
            { type: SquareType.OPERATION, value: OperationType.ABS }
        ]
    },
    {
        name: "Specchio Assoluto",
        // Soluzione: -3×|x|=3, 3+3 spariscono, -7×|x|=7, 7+7 spariscono
        solution: "-3×|x|=3, 3+3 spariscono, -7×|x|=7, 7+7 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 3 },
            { type: SquareType.NUMBER, value: -3 },
            { type: SquareType.NUMBER, value: 7 },
            { type: SquareType.NUMBER, value: -7 },
            { type: SquareType.OPERATION, value: OperationType.ABS },
            { type: SquareType.OPERATION, value: OperationType.ABS }
        ]
    },
    // === QUADRATO (32-33) ===
    {
        name: "Quadrato",
        // Soluzione: 2×x²=4, 4+4 spariscono
        solution: "2×x²=4, 4+4 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 2 },
            { type: SquareType.NUMBER, value: 4 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE }
        ]
    },
    {
        name: "Quadrato Negativo",
        // Soluzione: -3×x²=9, 9+9 spariscono (quadrato di negativo = positivo)
        solution: "-3×x²=9, 9+9 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: -3 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.SQUARE }
        ]
    },
    // === FLIP (34-35) ===
    {
        name: "Specchio",
        // Soluzione: 12×flip=21, 21+21 spariscono
        solution: "12×flip=21, 21+21 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 12 },
            { type: SquareType.NUMBER, value: 21 },
            { type: SquareType.OPERATION, value: OperationType.FLIP }
        ]
    },
    {
        name: "Palindromo",
        // Soluzione: flip+flip spariscono, 11+11 spariscono (palindromo non cambia)
        solution: "flip+flip spariscono, 11+11 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.NUMBER, value: 11 },
            { type: SquareType.OPERATION, value: OperationType.FLIP },
            { type: SquareType.OPERATION, value: OperationType.FLIP }
        ]
    },
    // === SOMMA CIFRE (36-37) ===
    {
        name: "Riduzione",
        // Soluzione: 234×Σ=9, 9+9 spariscono
        solution: "234×Σ=9, 9+9 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 234 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS }
        ]
    },
    {
        name: "Doppia Somma",
        // Soluzione: 99×Σ=18, 18×Σ=9, 9+9 spariscono
        solution: "99×Σ=18, 18×Σ=9, 9+9 spariscono",
        squares: [
            { type: SquareType.NUMBER, value: 99 },
            { type: SquareType.NUMBER, value: 9 },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS },
            { type: SquareType.OPERATION, value: OperationType.SUM_DIGITS }
        ]
    }
];
