import * as _nuxt_schema from '@nuxt/schema';
import { ClientOptions } from 'graphql-ws';
import { HttpOptions, DefaultOptions, InMemoryCacheConfig } from '@apollo/client';
import { CookieOptions } from 'nuxt/dist/app/composables';
import { ErrorResponse } from '@apollo/client/link/error';
export { ErrorResponse } from '@apollo/client/link/error';

type CookieAttributes = Omit< CookieOptions, 'encode' | 'decode' | 'expires' | 'default'>;

type ClientConfig = {
  /**
   * The GraphQL endpoint.
   * @type {string}
   */
  httpEndpoint: string;

  /**
   * Provide a GraphQL endpoint to be used client-side. Overrides `httpEndpoint`.
   * @type {string}
   **/
  browserHttpEndpoint?: string;

  /**
   * Provide additional configuration for the `HttpLink`.
   * See https://www.apollographql.com/docs/link/links/http.html#options
   * @type {HttpOptions}
   **/
  httpLinkOptions?: Omit<HttpOptions, 'uri'>;

  /**
   * Provide additional configuration for the `GraphQLWsLink`.
   * See https://github.com/enisdenjo/graphql-ws/blob/master/docs/interfaces/client.ClientOptions.md
   **/
  wsLinkOptions?: Omit<ClientOptions, 'url' | 'connectionParams'>;

  /**
   * Specify a websocket endpoint to be used for subscriptions.
   * The `wss` protocol is recommended in production.
   * @type {string}
   **/
  wsEndpoint?: string;

  // Enable Automatic Query persisting with Apollo Engine
  // persisting?: boolean

  /**
   * Specify if the client should solely use WebSocket.
   * requires `wsEndpoint`.
   * @type {boolean}
   * @default false
   **/
  websocketsOnly?: boolean;

  /**
   * Specify if the client should be able to connect to the Apollo Client Devtools in production mode.
   * @type {boolean}
   * @default false
   **/
  connectToDevTools?: boolean;

  /**
   * Configure default options to be applied to the apollo client.
   **/
  defaultOptions?: DefaultOptions;

  /**
   * Configure the in-memory cache.
   **/
  inMemoryCacheOptions?: InMemoryCacheConfig;

  /**
   * Specify the name under which the token will be stored.
   * as in either a cookie or localStorage.
   * @type {string}
   * @default "apollo:<client-name>.token"
   */
  tokenName?: string;

  /**
   * Specify if the auth token should be stored in `cookie` or `localStorage`.
   * `Cookie` storage is required for SSR.
   * @type {string}
   * @default "cookie"
   **/
  tokenStorage?: 'cookie' | 'localStorage';

  /**
   * Specify the Authentication scheme.
   * @type {string}
   * @default "Bearer"
   **/
  authType?: string;

  /**
   * Name of the Authentication token header.
   * @type {string}
   * @default "Authorization"
   */
  authHeader?: string;

  /**
   * Configuration for the auth cookie.
   **/
  cookieAttributes?: CookieAttributes;
};

interface NuxtApolloConfig<T = ClientConfig> {
  /**
   * Determine if vue-apollo composables should be automatically imported.
   * @type {boolean}
   * @default true
   **/
  autoImports?: boolean;

  /**
   * Configuration of the Apollo clients.
   **/
  clients?: Record< string, T extends boolean ? string | ClientConfig : ClientConfig >;

  /**
   * Default options to be applied to all Apollo clients.
   * This is useful for setting global defaults, and is overridden by `defaultOptions` passed directly to clients.
   **/
  defaultOptions?: DefaultOptions;

  /**
   * Pass cookies from the browser to the GraphQL API in SSR mode.
   *
   * @type boolean
   * @default true
   * */
  proxyCookies?: boolean;

  /**
   * Specify the Authentication scheme.
   * @type {string}
   * @default 'Bearer'
   **/
  authType?: string;

  /**
   * Name of the Authentication token header.
   * @type {string}
   * @default "Authorization"
   */
  authHeader?: string;

  /**
   * Specify if the auth token should be stored in `cookie` or `localStorage`.
   * `Cookie` storage is required for SSR.
   * @type {string}
   * @default "cookie"
   **/
  tokenStorage?: 'cookie' | 'localStorage';

  /**
   * Configuration for the auth cookie.
   **/
  cookieAttributes?: CookieAttributes;
}

interface ModuleHooks {
    'apollo:auth': (params: {
        token: string;
        client: string;
    }) => void;
    'apollo:error': (error: ErrorResponse) => void;
}
declare type ModuleOptions = NuxtApolloConfig;
declare const _default: _nuxt_schema.NuxtModule<NuxtApolloConfig<any>>;

declare const defineApolloClient: (config: ClientConfig) => ClientConfig;
declare module '@nuxt/schema' {
    interface RuntimeConfig {
        apollo: NuxtApolloConfig<any>;
        public: {
            apollo: NuxtApolloConfig<any>;
        };
    }
    interface NuxtHooks {
        'apollo:auth': (params: {
            token: string;
            client: string;
        }) => void;
        'apollo:error': (error: ErrorResponse) => void;
    }
}

export { ClientConfig, ModuleHooks, ModuleOptions, _default as default, defineApolloClient };
