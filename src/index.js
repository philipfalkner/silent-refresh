import React from 'react';
import { render } from 'react-dom';
import oidcSettings from './oidc-settings.js';
import silentRefresh from './silent-refresh.js';

async function runSilentRefresh () {
  try {
    var result = await silentRefresh();
    alert('Silent refresh result: ' + JSON.stringify(result));
  } catch (e) {
    console.error(e);
    alert('Error: ' + e);
  }
}

render(
  <span>
    <header>
      <h1>OpenID silent refresh using PKCE</h1>
    </header>
    <aside>
      Make sure to <a href={oidcSettings.authority}>sign in to the Identity Provider</a> first.
    </aside>
    <main>
      <h1>Silent refresh</h1>
      <button onClick={() => runSilentRefresh()}>Run</button>
    </main>
  </span>,
  document.getElementById('root')
);
