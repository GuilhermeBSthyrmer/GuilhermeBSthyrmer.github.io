// Tira as capturas de tela dos projetos, direto dos sites publicados.
// Uso: npm run capturas   (depois converta para .webp com ffmpeg, ver README)
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const BASE = 'https://guilhermebsthyrmer.github.io';
const PROJETOS = [
  // Põe a agulha no disco e volta ao topo (o clique rola a página até o botão).
  { id: 'agulha-discos', espera: 3500, antes: async (p) => { await p.click('[data-ouvir]'); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1600); } },
  { id: 'ceu-clima', espera: 4000 },
  { id: 'trocado-financas', espera: 2500 },
  { id: 'balcao-atendimento-site', espera: 7500 },
  { id: 'afiliado-pro-site', espera: 4500 },
];
const TAMANHOS = [
  { nome: 'desktop', viewport: { width: 1440, height: 900 }, isMobile: false },
  { nome: 'celular', viewport: { width: 390, height: 844 }, isMobile: true },
];

await mkdir('tools/brutas', { recursive: true });
const navegador = await chromium.launch();
for (const t of TAMANHOS) {
  const ctx = await navegador.newContext({ viewport: t.viewport, isMobile: t.isMobile, hasTouch: t.isMobile, deviceScaleFactor: 1, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo', colorScheme: 'light' });
  for (const p of PROJETOS) {
    const pagina = await ctx.newPage();
    await pagina.goto(`${BASE}/${p.id}/`, { waitUntil: 'networkidle' });
    await pagina.waitForTimeout(p.espera);
    if (p.antes && t.nome === 'desktop') await p.antes(pagina);
    await pagina.screenshot({ path: `tools/brutas/${p.id}-${t.nome}.png` });
    await pagina.close();
    console.log(`ok ${p.id} ${t.nome}`);
  }
  await ctx.close();
}
await navegador.close();
