import { test, expect } from '@playwright/test';

const PROJETOS = [
  { id: 'agulha', nome: 'Agulha Discos', codigo: 'agulha-discos' },
  { id: 'ceu', nome: 'Céu', codigo: 'ceu-clima' },
  { id: 'trocado', nome: 'Trocado', codigo: 'trocado-financas' },
  { id: 'balcao', nome: 'Balcão', codigo: 'whatsapp-atendimento-bot' },
  { id: 'afiliado', nome: 'Afiliado Pro', codigo: 'afiliado-pro-site' },
  { id: 'agente', nome: 'agente-linux', codigo: 'agente-linux' },
];

test.beforeEach(async ({ page }) => {
  const erros = [];
  page.on('pageerror', (e) => erros.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()); });
  // Fontes e o selo do CI vêm de fora; nos testes, o site precisa funcionar sem eles.
  await page.route(/^https:\/\/(fonts\.(googleapis|gstatic)\.com|github\.com)\//, (r) => r.abort());
  page.erros = erros;
  await page.goto('/');
});

test('abre com o nome e a frase', async ({ page }) => {
  await expect(page).toHaveTitle('Guilherme · Portfólio');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Guilherme');
  await expect(page.locator('.abertura__frase')).toBeVisible();
});

for (const p of PROJETOS) {
  test(`faixa do projeto ${p.nome}`, async ({ page }) => {
    const faixa = page.locator(`#${p.id}`);
    await expect(faixa.getByRole('heading', { level: 2 })).toHaveText(p.nome);
    await expect(faixa.locator(`a[href="https://github.com/GuilhermeBSthyrmer/${p.codigo}"]`)).toHaveCount(1);
    await expect(faixa.locator('.faixa__provas li')).toHaveCount(3);
    for (const img of await faixa.locator('img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveAttribute('alt', /\S/);
      await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  });
}

test('todos os links internos apontam para uma seção que existe', async ({ page }) => {
  const alvos = await page.$$eval('a[href^="#"]', (as) => as.map((a) => a.getAttribute('href').slice(1)));
  expect(alvos.length).toBeGreaterThan(5);
  for (const id of alvos) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
});

test('nenhuma rolagem horizontal', async ({ page }) => {
  const largura = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(largura).toBeLessThanOrEqual(0);
});

test('sem estilo embutido e sem erros no console', async ({ page }) => {
  await expect(page.locator('[style]')).toHaveCount(0);
  await expect(page.locator('script')).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  expect(page.erros.filter((e) => !/ERR_FAILED|net::/.test(e))).toEqual([]);
});
