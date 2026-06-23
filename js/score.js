const scale = 3;

// ─── CONFIGURAÇÕES — CLASSIC ──────────────────────────────────
const CLASSIC_LIST_SIZE = 150;   // 👈 Aumente aqui ao adicionar fases Classic
const CLASSIC_BASE_POINTS = 300; // Pontos máximos para o rank 1
const CLASSIC_DECAY = 0.973;     // Queda por rank (menor = mais agressivo)
// ────────────────────────────────────────────────────────────────

// ─── CONFIGURAÇÕES — PLATFORMER ───────────────────────────────
const PLATFORMER_LIST_SIZE = 15;    // 👈 Aumente aqui ao adicionar fases Platformer
const PLATFORMER_BASE_POINTS = 200; // Pontos máximos para o rank 1
const PLATFORMER_DECAY = 0.965;     // Queda por rank (menor = mais agressivo)
// ────────────────────────────────────────────────────────────────

// ─── CONFIGURAÇÕES — CHALLENGE ────────────────────────────────
const CHALLENGE_LIST_SIZE = 50;    // 👈 Aumente aqui ao adicionar fases Challenge
const CHALLENGE_BASE_POINTS = 250; // Pontos máximos para o rank 1
const CHALLENGE_DECAY = 0.960;     // Queda por rank (menor = mais agressivo)
// ────────────────────────────────────────────────────────────────

/**
 * Lógica de pontuação compartilhada pelas três listas.
 * Não precisa mexer aqui — ajuste as constantes acima.
 */
function calculateScore(rank, percent, minPercent, listSize, basePoints, decay) {
    if (rank > listSize) return 0;
    if (rank > Math.floor(listSize / 2) && percent < 100) return 0;

    let score = basePoints * Math.pow(decay, rank - 1);

    // Multiplicador de porcentagem (preservado original)
    score = score * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    score = Math.max(0, score);

    // Penalidade por não completar (preservada original)
    if (percent != 100) {
        return round(score - score / 3);
    }
    return Math.max(round(score), 0);
}

/**
 * Pontuação para fases da lista Classic
 */
export function scoreClassic(rank, percent, minPercent) {
    return calculateScore(
        rank,
        percent,
        minPercent,
        CLASSIC_LIST_SIZE,
        CLASSIC_BASE_POINTS,
        CLASSIC_DECAY,
    );
}

/**
 * Pontuação para fases da lista Platformer
 */
export function scorePlatformer(rank, percent, minPercent) {
    return calculateScore(
        rank,
        percent,
        minPercent,
        PLATFORMER_LIST_SIZE,
        PLATFORMER_BASE_POINTS,
        PLATFORMER_DECAY,
    );
}

/**
 * Pontuação para fases da lista Challenge
 */
export function scoreChallenge(rank, percent, minPercent) {
    return calculateScore(
        rank,
        percent,
        minPercent,
        CHALLENGE_LIST_SIZE,
        CHALLENGE_BASE_POINTS,
        CHALLENGE_DECAY,
    );
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
