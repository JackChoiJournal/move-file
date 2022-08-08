const {app} = require('electron');

/**
 * Close the appplication when all the windows are closed.
 */
app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/**
 * Security configuration when a new webContents is created.
 */
app.on('web-contents-created', (event, contents) => {
    // Prevent the creation of webViews
    contents.on('will-attach-webview', (event, webPreferences, params) => {
        // Strip away preload scripts if unused or verify their location is legitimate
        delete webPreferences.preload;
        delete webPreferences.preloadURL;
        delete webPreferences.enableBlinkFeatures;

        // Disable insecurity config
        webPreferences.nodeIntegration = false;
        webPreferences.nodeIntegrationInWorker = false;
        webPreferences.allowRunningInsecureContent = false;
        webPreferences.experimentalFeatures = false;
        webPreferences.enableRemoteModule = false;
        // Enable security config
        webPreferences.webSecurity = true;
        webPreferences.contextIsolation = true;

        // Prevent creating webView
        event.preventDefault();
    });

    // Prevent navigating to other origin.
    contents.on('will-navigate', (event, navigationUrl) => {
        event.preventDefault();
    });

    // Prevent creating new window.
    contents.setWindowOpenHandler(({url}) => {
        return {action: 'deny'};
    });
});
