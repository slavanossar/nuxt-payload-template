import { hash } from "ohash";
import { print } from "graphql";
import { ref, useCookie, useNuxtApp, useAsyncData, useLazyAsyncData } from "#imports";
import NuxtApollo from "#build/apollo";
export function useAsyncQuery(...args) {
  const { key, initialCache, fn } = prep(...args);
  return useAsyncData(key, fn, { initialCache });
}
export function useLazyAsyncQuery(...args) {
  const { key, initialCache, fn } = prep(...args);
  return useLazyAsyncData(key, fn, { initialCache });
}
const prep = (...args) => {
  const { clients } = useApollo();
  const query = args?.[0]?.query || args?.[0];
  const initialCache = args?.[0]?.cache ?? true;
  let clientId = args?.[0]?.clientId || typeof args?.[1] === "string" && args?.[1] || "default";
  const variables = args?.[0]?.variables || typeof args?.[1] !== "string" && args?.[1] || void 0;
  if (clientId !== "default" && !Object.keys(clients).includes(clientId)) {
    console.log(`[@nuxtjs/apollo] Apollo client \`${clientId}\` not found. Falling back to \`default\`.`);
    clientId = "default";
  }
  const key = args?.[0]?.key || hash({ query: print(query), variables, clientId });
  const fn = () => clients?.[clientId].query({ query, variables, fetchPolicy: "no-cache" }).then((r) => r.data);
  return { key, query, initialCache, clientId, variables, fn };
};
export const useApollo = () => {
  const nuxtApp = useNuxtApp();
  const getToken = async (client) => {
    const conf = NuxtApollo?.clients?.[client || "default"];
    const token = ref();
    await nuxtApp.callHook("apollo:auth", { token, client });
    if (token.value) {
      return token.value;
    }
    const tokenName = conf?.tokenName;
    return conf?.tokenStorage === "cookie" ? useCookie(tokenName).value : process.client && localStorage.getItem(tokenName) || void 0;
  };
  const updateAuth = async ({ token, client, mode, skipResetStore }) => {
    client = client || "default";
    const conf = NuxtApollo?.clients?.[client];
    const tokenName = client && conf?.tokenName;
    if (conf?.tokenStorage === "cookie") {
      const cookieOpts = client && conf?.cookieAttributes || NuxtApollo?.cookieAttributes;
      const cookie = useCookie(tokenName, cookieOpts);
      if (!cookie.value && mode === "logout") {
        return;
      }
      cookie.value = mode === "login" && token || void 0;
    } else if (process.client && conf?.tokenStorage === "localStorage") {
      if (mode === "login" && token) {
        localStorage.setItem(tokenName, token);
      } else if (mode === "logout") {
        localStorage.removeItem(tokenName);
      }
    }
    if (nuxtApp._apolloWsClients[client]) {
      nuxtApp._apolloWsClients[client].restart();
    }
    if (skipResetStore) {
      return;
    }
    await nuxtApp?._apolloClients?.[client].resetStore().catch((e) => console.log("%cError on cache reset", "color: orange;", e.message));
  };
  return {
    getToken,
    clients: nuxtApp?._apolloClients,
    onLogin: (token, client, skipResetStore) => updateAuth({ token, client, skipResetStore, mode: "login" }),
    onLogout: (client, skipResetStore) => updateAuth({ client, skipResetStore, mode: "logout" })
  };
};
