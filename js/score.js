// ─── CONFIGURAÇÕES AJUSTÁVEIS ────────────────────────────────
const LIST_SIZE = 75;    // 👈 Aumente aqui ao adicionar fases
const BASE_POINTS = 500; // Pontos máximos para o rank 1
const DECAY = 0.964;     // Queda por rank (menor = mais agressivo)
// ─────────────────────────────────────────────────────────────

const scale = 3;

export function score(rank, percent, minPercent) {
    if (rank > LIST_SIZE) return 0;
    if (rank > Math.floor(LIST_SIZE / 2) && percent < 100) return 0;

    // Nova fórmula exponencial
    let score = BASE_POINTS * Math.pow(DECAY, rank - 1);

    // Multiplicador de porcentagem (preservado original)
    score = score * ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    score = Math.max(0, score);

    // Penalidade por não completar (preservada original)
    if (percent != 100) {
        return round(score - score / 3);
    }
    return Math.max(round(score), 0);
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
