# F.T.T.U Manufacturing Agent

The founder's private tool for getting F.T.T.U made. It is separate from the F.T.T.U showroom site and does one job: manufacturing. Marketing is handled by a separate marketing agent.

It looks at every F.T.T.U product three ways and answers the five W's — who, what, when, where, why — plus the money for each:

1. **Printful** — print-on-demand. Your artwork on their shoes and jackets, made only when someone buys. Nothing up front. The safest start.
2. **Zellerfeld** — 3D-printed. Your own shoe shape, printed one pair at a time after each sale. No molds. Needs a printable 3D file first.
3. **A factory** — your exact design, built from a tech pack. Paid samples, a minimum order and molds for every size. The most expensive, and the only way to get the real construction.

## The two pages

- **`index.html` — the agent.** Type what you want to make. The agent asks one question if it needs to, then recommends a way, shortlists real partners, estimates how ready you are, and gives one next step. It can write quote requests with a copy button. Four cards: the chat, the top match, the shortlist (readiness gauge plus all three ways — tap one to see its 5 W's), and the details.
- **`guide.html` — the playbook.** The same information to read yourself: can you make it yourself, the three ways side by side, every product through all three, every part of every product, who can help, the path in order, the rules and five videos.

## Files

```
fttu-manufacturing-agent/
├── index.html          The agent
├── guide.html          The playbook
├── api/
│   └── chat.js         Vercel serverless function — holds your Anthropic API key, calls Claude
├── assets/
│   └── engine-bg.jpg   Agent background
├── css/
│   ├── agent.css       Agent styles
│   ├── guide.css       Playbook styles
│   └── lightbox.css    Full-screen image viewer
└── js/
    ├── data.js         THE data: three ways, partners, products, parts, rules, path, videos
    ├── catalog.js      The F.T.T.U designs and image links (copied from the showroom repo)
    ├── agent.js        Agent behavior
    ├── guide.js        Playbook behavior
    └── lightbox.js     Full-screen image viewer
```

## Putting it online (Vercel)

1. Create a new GitHub repository named `fttu-manufacturing-agent` and add these files.
2. In Vercel, import that repository as a **new project** (separate from the showroom).
3. In the project's **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` with your key.
4. Redeploy. The agent answers once the key is set.

The playbook works anywhere, even opened straight from your computer. The agent's chat needs the Vercel backend; opened from your computer it explains that instead of answering.

## Keeping it honest

Every partner in `js/data.js` has a `checked` line (what was confirmed, September 2026) and a `caveat` line (what wasn't). Keep both honest when you edit. The agent only knows what's in `data.js` and `catalog.js` — add a partner there and the agent and the playbook both learn it.

The only confirmed dollar figures are Printful's bomber jacket base price (about $48.95–$60), Printful's bulk discount from 25 pairs, and one factory's published cost for custom sneaker sole molds ($2,000–$4,000 per size). Everything else needs a quote, and the agent is told never to invent one.

Images load from the F.T.T.U Supabase bucket, including the `breakdowns/` folder of exploded views. Every image is an AI concept render.

The backend uses the `claude-sonnet-5` model.
