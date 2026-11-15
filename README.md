# guilhermebsthyrmer.github.io

My portfolio hub: https://guilhermebsthyrmer.github.io

One page, one full-width band per project, each in the colours of its own world:

| Project | What it is | Live | Code |
|---|---|---|---|
| Agulha Discos | Record store that works like a 1960s radiogram (Web Audio, CSS 3D) | [open](https://guilhermebsthyrmer.github.io/agulha-discos/) | [repo](https://github.com/GuilhermeBSthyrmer/agulha-discos) |
| Céu | Weather app whose background is the city's sky right now | [open](https://guilhermebsthyrmer.github.io/ceu-clima/) | [repo](https://github.com/GuilhermeBSthyrmer/ceu-clima) |
| Trocado | Personal finance tracker with hand-drawn SVG charts | [open](https://guilhermebsthyrmer.github.io/trocado-financas/) | [repo](https://github.com/GuilhermeBSthyrmer/trocado-financas) |
| Balcão | Landing page for a multi-tenant WhatsApp receptionist bot | [open](https://guilhermebsthyrmer.github.io/balcao-atendimento-site/) | [bot](https://github.com/GuilhermeBSthyrmer/whatsapp-atendimento-bot) · [page](https://github.com/GuilhermeBSthyrmer/balcao-atendimento-site) |
| Afiliado Pro | Landing page for a desktop app that reposts affiliate offers | [open](https://guilhermebsthyrmer.github.io/afiliado-pro-site/) | [page](https://github.com/GuilhermeBSthyrmer/afiliado-pro-site) |
| agente-linux | Linux inventory and CIS-inspired compliance agent in Go, reporting over mTLS | — | [repo](https://github.com/GuilhermeBSthyrmer/agente-linux) |

## Running it

Plain HTML and CSS, no JavaScript and no build step. A strict Content-Security-Policy forbids inline scripts and styles.

```bash
npm ci
npm start          # static server on http://localhost:4180
npx playwright install chromium
npm test           # Playwright, desktop and phone viewports
```

`npm run capturas` retakes the screenshots of the published sites into `tools/brutas/`; convert them with
`ffmpeg -i in.png -c:v libwebp -quality 82 img/out.webp`.

CI runs the Playwright suite and Lighthouse (accessibility and best practices must stay above 90); CodeQL scans the repo.

## License

MIT
