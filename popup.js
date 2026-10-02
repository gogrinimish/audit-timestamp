async function update(show) {
  const status = document.getElementById('status');
  try {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['overlay.js']
    });
    await browser.tabs.sendMessage(tab.id, {
      type: 'audit-timestamp', show,
      position: document.getElementById('position').value,
      freeze: document.getElementById('freeze').checked
    });
    status.textContent = show ? 'Timestamp ready. Close this panel and take your screenshot.' : 'Timestamp hidden.';
  } catch (error) {
    status.textContent = 'Cannot add an overlay here. Try a regular website; Firefox internal pages, PDFs, and some protected sites block extensions.';
  }
}
document.getElementById('show').addEventListener('click', () => update(true));
document.getElementById('hide').addEventListener('click', () => update(false));
