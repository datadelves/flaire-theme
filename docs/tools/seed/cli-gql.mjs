// Admin GraphQL through the Shopify CLI (`shopify store execute`), for a store where no custom app can be
// installed (for example a dev store in another organization). Authenticate once with your own staff login:
//   shopify store auth --store your-store.myshopify.com --scopes <the scopes listed in seed.mjs>
// then pass --via-cli to seed.mjs or order-collections.mjs instead of a token.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const quote = (a) => (/[\s"&|<>^]/.test(a) ? `"${a.replace(/"/g, '\\"')}"` : a);

// Returns the GraphQL response ({ data, errors }), like the JSON body of a direct Admin API call.
export function cliGql(store, version, query, variables = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'flaire-gql-'));
  const q = path.join(dir, 'query.graphql'); const v = path.join(dir, 'variables.json');
  fs.writeFileSync(q, query); fs.writeFileSync(v, JSON.stringify(variables));
  const args = ['shopify', 'store', 'execute', '--store', store, '--version', version, '--query-file', q, '--variable-file', v, '--allow-mutations', '--json', '--no-input', '--no-color'];
  const r = spawnSync(args.map(quote).join(' '), { shell: true, encoding: 'utf8', maxBuffer: 64 << 20 });
  fs.rmSync(dir, { recursive: true, force: true });
  // --json prints one-line progress events, then the response data pretty-printed (or { "error": ... })
  const parse = (text) => {
    const body = (text || '').split(/\r?\n/).filter((l) => !/^\{"type":"(progress|diagnostic)"/.test(l)).join('\n');
    const start = body.search(/^\{/m);
    try { return start < 0 ? null : JSON.parse(body.slice(start)); } catch { return null; }
  };
  const json = parse(r.stdout) || parse(r.stderr);
  if (!json) throw new Error(`shopify store execute failed (exit ${r.status}): ${(r.stderr || r.stdout || '').trim().slice(0, 600)}`);
  if (json.error) return { errors: [json.error] };
  return { data: json };
}
