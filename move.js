/* Math a Day — "we've moved" helper, shared by every Math a Day app.
 *   <script src="move.js" data-to="https://equamon.mathaday.app" data-from="acemath.blvckghozt.workers.dev"></script>
 * Load it first in <head>, before the app's own scripts.
 * Old address (a host listed in data-from):
 *   - nothing saved in this browser -> go straight to the new address (same path, query and #page)
 *   - something saved -> a banner; one tap moves this tab to the new address carrying every
 *     localStorage item of this site in the #fragment (fragments are never sent to any server).
 * New address:
 *   - takes #__move=… only when the visitor really came from an old address (document.referrer),
 *     keeps anything already saved here (never overwrites), then drops the fragment from the
 *     address bar and history before the app starts.                                          */
(function () {
  'use strict';
  var me = document.currentScript;
  if (!me || !me.dataset.to) return;
  var TO = new URL(me.dataset.to).origin;
  var FROM = (me.dataset.from || '').split(',').map(function (h) { return h.trim(); }).filter(Boolean);
  var store = (function () { try { var s = window.localStorage; s.length; return s; } catch (e) { return null; } })();
  var KEY = '#__move=';

  function items() {
    var o = {};
    if (!store) return o;
    for (var i = 0; i < store.length; i++) { var k = store.key(i); if (k !== '__moved') o[k] = store.getItem(k); }
    return o;
  }

  if (FROM.indexOf(location.hostname) >= 0) leave();
  else if (location.origin === TO && location.hash.indexOf(KEY) === 0) arrive();

  /* ---------- old address ---------- */
  function leave() {
    var dest = TO + location.pathname + location.search + location.hash;
    var data = items();
    if (!Object.keys(data).length || (store && store.getItem('__moved'))) { location.replace(dest); return; }
    var go = function () {
      try { store.setItem('__moved', TO); } catch (e) { /* */ }
      location.replace(TO + location.pathname + location.search + KEY + encodeURIComponent(JSON.stringify(data)));
    };
    var ink = '#4b3a7a', frame = function (w) { return 'box-shadow:0 -' + w + 'px 0 ' + ink + ',0 ' + w + 'px 0 ' + ink + ',-' + w + 'px 0 0 ' + ink + ',' + w + 'px 0 0 ' + ink; };
    var box = document.createElement('div');
    box.setAttribute('style', 'position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:16px;background:rgba(40,30,70,.55);font:16px/1.5 system-ui,"Segoe UI",sans-serif');
    box.innerHTML = '<div style="max-width:420px;width:100%;background:#fffaf3;color:#3a2f5b;padding:22px;text-align:center;' + frame(4) + '">' +
      '<div style="font-size:2.4rem">🏠</div><h2 style="margin:6px 0">เว็บย้ายบ้านแล้ว!</h2>' +
      '<p style="margin:0 0 6px">ที่อยู่ใหม่: <b>' + TO.replace(/^https?:\/\//, '') + '</b></p>' +
      '<p style="margin:0 0 14px;font-size:.9rem;opacity:.8">กดปุ่มด้านล่าง ข้อมูลที่บันทึกไว้ในเครื่องนี้จะย้ายไปด้วย</p>' +
      '<button type="button" id="__mvGo" style="font:inherit;font-weight:700;color:#fff;background:#8a6cf0;border:0;padding:12px 20px;cursor:pointer;' + frame(3) + '">ย้ายข้อมูลและไปเว็บใหม่</button>' +
      '<p style="margin:12px 0 0;font-size:.8rem"><a href="' + dest + '" style="color:#7b6f99">ไปเว็บใหม่โดยไม่ย้ายข้อมูล</a></p></div>';
    box.addEventListener('click', function (e) { if (e.target.id === '__mvGo') go(); });
    var put = function () { document.body.appendChild(box); };
    if (document.body) put(); else document.addEventListener('DOMContentLoaded', put);
  }

  /* ---------- new address ---------- */
  function arrive() {
    var raw = location.hash.slice(KEY.length);
    history.replaceState(null, '', location.pathname + location.search);      // drop the data from the address bar
    var ref = '';
    try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) { /* */ }
    if (FROM.indexOf(ref) < 0 || !store) return;                                // only from the old address
    var data;
    try { data = JSON.parse(decodeURIComponent(raw)); } catch (e) { return; }
    if (!data || typeof data !== 'object') return;
    var n = 0;
    Object.keys(data).forEach(function (k) {
      if (typeof data[k] !== 'string' || k === '__moved') return;
      try { if (store.getItem(k) === null) { store.setItem(k, data[k]); n++; } } catch (e) { /* */ }
    });
    try { sessionStorage.setItem('__movedIn', String(n)); } catch (e) { /* */ }
  }
})();
