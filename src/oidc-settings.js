import { OidcClientSettings } from 'oidc-client';

export default new OidcClientSettings({
  authority: 'https://localhost:44300',
  client_id: 'atc',
  response_type: 'code',
  scope: 'openid',
  redirect_uri: `${window.location.origin}/signin-oidc-silent.html`,
});
