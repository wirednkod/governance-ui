// Must be loaded before anything else
// See https://polkadot.js.org/docs/api/FAQ/#since-upgrading-to-the-7x-series-typescript-augmentation-is-missing
import '@polkadot/api-augment';
import '@polkadot/types-augment';

import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import WalletProvider from './contexts/Wallets';
import AccountProvider from './contexts/Account';
import ApiProvider from './contexts/Api';
import Header from './components/Header';
import NotificationProvider from './contexts/Notification';
import NotificationBox from './components/NotificationBox';
import { registerServiceWorker } from './utils/service-worker';
import { UIProvider } from './ui/nextui';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <React.StrictMode>
      <UIProvider>
        <main>
          <ErrorBoundary>
            <NotificationProvider>
              <ApiProvider>
                <WalletProvider>
                  <AccountProvider>
                    <NotificationBox />
                    <Header />
                    <App />
                  </AccountProvider>
                </WalletProvider>
              </ApiProvider>
            </NotificationProvider>
          </ErrorBoundary>
        </main>
      </UIProvider>
    </React.StrictMode>
  );

  registerServiceWorker().catch(() =>
    console.warn(
      "Browser doesn't support ServiceWorker; App won't be available offline"
    )
  );
}

window.addEventListener('unhandledrejection', function (event) {
  console.error(
    `Unhandled promise rejection for ${event.promise}: ${event.reason}`
  );
});
