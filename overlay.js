(() => {
  if (globalThis.__auditTimestampLoaded) return;
  globalThis.__auditTimestampLoaded = true;
  let host, timer;
  function remove() {
    clearInterval(timer);
    timer = undefined;
    host?.remove();
    host = undefined;
  }
  browser.runtime.onMessage.addListener(message => {
    if (message.type !== 'audit-timestamp') return;
    remove();
    if (!message.show) return Promise.resolve({ visible: false });
    host = document.createElement('div');
    const position = ['top-right','top-left','bottom-right','bottom-left'].includes(message.position) ? message.position : 'bottom-right';
    const [vertical, horizontal] = position.split('-');
    host.style.cssText = `all:initial!important;position:fixed!important;${vertical}:16px!important;${horizontal}:16px!important;z-index:2147483647!important;pointer-events:none!important;display:block!important;max-width:calc(100vw - 32px)!important;`;
    const root = host.attachShadow({ mode: 'closed' });
    const style = document.createElement('style');
    style.textContent = `:host{color-scheme:light}.stamp{box-sizing:border-box;padding:12px 16px;border:1px solid #62718a;border-radius:8px;background:#111c2f;color:#fff;box-shadow:0 3px 14px #0004;font:13px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace;font-variant-numeric:tabular-nums;max-width:100%;overflow-wrap:anywhere}.label{font:600 10px/1.5 system-ui;letter-spacing:1.1px;color:#b6c9ed;margin-bottom:4px}.utc{color:#b6c9ed}`;
    const box = document.createElement('div');
    box.className = 'stamp';
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = `AUDIT TIMESTAMP · ${message.freeze ? 'FROZEN' : 'LIVE'}`;
    const local = document.createElement('div');
    const utc = document.createElement('div');
    utc.className = 'utc';
    box.append(label, local, utc);
    root.append(style, box);
    document.documentElement.append(host);
    function render() {
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const offset = -now.getTimezoneOffset();
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      local.textContent = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${zone} (UTC${offset < 0 ? '-' : '+'}${pad(Math.floor(Math.abs(offset)/60))}:${pad(Math.abs(offset)%60)})`;
      utc.textContent = `${now.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '')} UTC`;
    }
    render();
    if (!message.freeze) timer = setInterval(render, 1000);
    return Promise.resolve({ visible: true });
  });
})();
