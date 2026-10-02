# Audit Timestamp — Firefox extension

![Audit Timestamp](icons/icon-128.png)

Version 1.0.2. Add local time and UTC to webpages for audit screenshots.

## Install for immediate use
1. Extract the ZIP if needed.
2. In Firefox open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on…** and select `manifest.json` in this folder.
4. Open a regular website, click Firefox’s Extensions (puzzle piece) button, then **Audit Timestamp**. Optionally pin it to the toolbar.
5. Choose a corner, optionally select **Freeze time when shown**, then click **Show / update timestamp**. Close the popup and take your screenshot.

**Hide timestamp** removes it. Reloading or navigating to a new page removes it too; show it again as needed. Frozen timestamps are explicitly labeled FROZEN. Both local time (with timezone and UTC offset) and UTC are displayed, including seconds.

Temporary installation lasts until Firefox restarts. Normal permanent installation requires Mozilla signing; this ZIP is unsigned. Signing instructions: https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/

## Scope
- No network requests, external libraries, saved history, or broad website permissions. Runs only when invoked on the active tab.
- Uses the computer’s clock, not a trusted timestamp authority; the overlay is a visual annotation, not tamper-proof evidence.
- Firefox internal pages, the built-in PDF viewer, Mozilla’s add-ons site, and other protected pages block injection.
- Positioned within the webpage. Browser chrome and content in fullscreen/top-layer elements may cover it. Use a visible-area or operating-system screenshot; full-page capture behavior varies by screenshot tool.

Source files are included; no build step required.

## Packaging

From the repository root, run:

```sh
zip -r audit-timestamp-1.0.2.zip manifest.json popup.html popup.js overlay.js icons
```

The resulting ZIP contains `manifest.json` at its root and can be submitted to Mozilla Add-ons.

## License

No license has been selected yet.
