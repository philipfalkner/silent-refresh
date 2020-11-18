import { OidcClient } from 'oidc-client';
import { IFrameNavigator } from 'oidc-client/src/IFrameNavigator.js';
import oidcSettings from './oidc-settings.js';

const oidcClient = new OidcClient(oidcSettings);
const navigator = new IFrameNavigator();

export default async function silentRefresh () {
  // Prepare the iframe
  var navigatorParams = {
    startUrl: oidcSettings.redirect_uri,
    silentRequestTimeout: 10 * 1000
  };
  var navigatorHandle = await navigator.prepare(navigatorParams);

  // Send a request through the iframe
  var signinRequest = await oidcClient.createSigninRequest({ prompt: 'none' });
  navigatorParams.url = signinRequest.url;
  navigatorParams.id = signinRequest.state.id;
  var navigatorResponse = await navigatorHandle.navigate(navigatorParams);

  // Process the response from the iframe
  var signinResponse = await oidcClient.processSigninResponse(navigatorResponse.url);

  // Return only relevant fields
  return (({ access_token, error, error_description, error_uri, expires_at, id_token, scope }) =>
    ({ access_token, error, error_description, error_uri, expires_at, id_token, scope }))(signinResponse);
}
