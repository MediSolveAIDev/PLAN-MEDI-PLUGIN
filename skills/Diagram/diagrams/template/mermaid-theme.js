/**
 * Mermaid 공통 테마 설정 및 후처리 모듈
 *
 * 사용법:
 *   import { initMermaid, classDefs, postProcess } from './mermaid-theme.js';
 */

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

// ── 공통 classDef & linkStyle ────────────────────────────────────────
export const classDefs = `
    classDef startEnd fill:#ffffff,stroke:#339af0,stroke-width:2px,color:#339af0
    classDef process fill:#ffffff,stroke:#2f9e44,stroke-width:2px,color:#2f9e44
    classDef decision fill:#ffffff,stroke:#f08c00,stroke-width:2px,color:#f08c00
    classDef exception fill:#ffffff,stroke:#e03131,stroke-width:2px,color:#e03131
    classDef complete fill:#ffffff,stroke:#7048e8,stroke-width:2px,color:#7048e8
    linkStyle default stroke:#adb5bd,stroke-width:1.5px`;

// ── Mermaid 초기화 ───────────────────────────────────────────────────
export function initMermaid() {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
            fontFamily: 'OngleafParkDahyun, sans-serif',
            primaryColor: '#ffffff',
            lineColor: '#adb5bd',
            fontSize: '18px',
            edgeLabelBackground: 'transparent',
        },
        flowchart: {
            curve: 'basis',
            padding: 20,
            nodeSpacing: 30,
            rankSpacing: 50,
        },
    });
}

// ── Mermaid 렌더 실행 ────────────────────────────────────────────────
export async function renderMermaid() {
    await mermaid.run();
}

// ── 후처리: 다이아몬드 둥글게 + 라벨 배경 제거 + 화살표 색상 통일 ──
export function postProcess() {
    roundDiamondCorners();
    removeEdgeLabelBackgrounds();
    softenArrowColors();
}

// ── 내부 함수 ────────────────────────────────────────────────────────

function roundDiamondCorners() {
    document.querySelectorAll('.node polygon').forEach(poly => {
        const pointsAttr = poly.getAttribute('points');
        if (!pointsAttr) return;

        const pts = pointsAttr.trim().split(/[\s,]+/);
        const coords = [];
        for (let i = 0; i < pts.length; i += 2) {
            coords.push([parseFloat(pts[i]), parseFloat(pts[i + 1])]);
        }
        if (coords.length < 4) return;

        const r = 8;
        let d = '';
        for (let i = 0; i < coords.length; i++) {
            const curr = coords[i];
            const prev = coords[(i - 1 + coords.length) % coords.length];
            const next = coords[(i + 1) % coords.length];

            const dx1 = curr[0] - prev[0], dy1 = curr[1] - prev[1];
            const dx2 = next[0] - curr[0], dy2 = next[1] - curr[1];
            const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            const ratio = Math.min(r, len1 / 3, len2 / 3);
            const sx = curr[0] - (dx1 / len1) * ratio;
            const sy = curr[1] - (dy1 / len1) * ratio;
            const ex = curr[0] + (dx2 / len2) * ratio;
            const ey = curr[1] + (dy2 / len2) * ratio;

            if (i === 0) d += `M ${sx},${sy} `;
            else d += `L ${sx},${sy} `;
            d += `Q ${curr[0]},${curr[1]} ${ex},${ey} `;
        }
        d += 'Z';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        for (const attr of poly.attributes) {
            if (attr.name !== 'points') {
                path.setAttribute(attr.name, attr.value);
            }
        }
        poly.parentNode.replaceChild(path, poly);
    });
}

function removeEdgeLabelBackgrounds() {
    document.querySelectorAll('.edgeLabel rect').forEach(rect => {
        rect.setAttribute('fill', 'transparent');
        rect.setAttribute('stroke', 'none');
        rect.style.fill = 'transparent';
    });
    document.querySelectorAll('.edgeLabel .label').forEach(label => {
        label.style.background = 'transparent';
    });
    document.querySelectorAll('.edgeLabel foreignObject div').forEach(div => {
        div.style.background = 'transparent';
    });
    document.querySelectorAll('.edgeLabel span').forEach(span => {
        span.style.background = 'transparent';
        span.style.color = '#868e96';
        span.style.fontSize = '14px';
    });
}

function softenArrowColors() {
    document.querySelectorAll('.flowchart-link').forEach(link => {
        link.style.stroke = '#adb5bd';
    });
    document.querySelectorAll('marker path').forEach(marker => {
        marker.style.fill = '#adb5bd';
        marker.style.stroke = '#adb5bd';
    });
}
