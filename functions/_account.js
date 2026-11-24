// Math a Day account (account.mathaday.app): who is signed in on this request?
// The sign-in cookie lives on .mathaday.app, so the browser sends it here too; only that cookie is passed on.
export async function account(request, env) {
  const m = (request.headers.get('cookie') || '').match(/(?:^|;\s*)mad_sid=([a-f0-9]{64})/);
  if (!m) return null;
  try {
    const r = await fetch((env.ACCOUNT_URL || 'https://account.mathaday.app') + '/api/me', { headers: { cookie: 'mad_sid=' + m[1] } });
    return r.ok ? await r.json() : null;
  } catch { return null; }
}
