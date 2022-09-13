import type { OperationVariables, QueryOptions } from '@apollo/client';
import type { AsyncData } from 'nuxt/dist/app/composables';
declare type TQuery<T> = QueryOptions<OperationVariables, T>['query'];
declare type TVariables<T> = QueryOptions<OperationVariables, T>['variables'];
declare type TAsyncQuery<T> = {
    query: TQuery<T>;
    variables?: TVariables<T>;
    key?: string;
    cache?: boolean;
    clientId?: string;
};
export declare function useAsyncQuery<T>(opts: TAsyncQuery<T>): AsyncData<T, Error>;
export declare function useAsyncQuery<T>(query: TQuery<T>, clientId?: string): AsyncData<T, Error>;
export declare function useAsyncQuery<T>(query: TQuery<T>, variables?: TVariables<T>, clientId?: string): AsyncData<T, Error>;
export declare function useLazyAsyncQuery<T>(opts: TAsyncQuery<T>): AsyncData<T, Error>;
export declare function useLazyAsyncQuery<T>(query: TQuery<T>, clientId?: string): AsyncData<T, Error>;
export declare function useLazyAsyncQuery<T>(query: TQuery<T>, variables?: TVariables<T>, clientId?: string): AsyncData<T, Error>;
export declare const useApollo: () => {
    /**
     * Retrieve the auth token for the specified client. Adheres to the `apollo:auth` hook.
     *
     * @param {string} client The client who's token to retrieve. Defaults to `default`.
     */
    getToken: (client?: string) => Promise<any>;
    /**
     * Access the configured apollo clients.
     */
    clients: any;
    /**
     * Apply auth token to the specified Apollo client, and optionally reset it's cache.
     *
     * @param {string} token The token to be applied.
     * @param {string} client - Name of the Apollo client. Defaults to `default`.
     * @param {boolean} skipResetStore - If `true`, the cache will not be reset.
     * */
    onLogin: (token?: string, client?: string, skipResetStore?: boolean) => Promise<void>;
    /**
     * Remove the auth token from the Apollo client, and optionally reset it's cache.
     *
     * @param {string} client - Name of the Apollo client. Defaults to `default`.
     * @param {boolean} skipResetStore - If `true`, the cache will not be reset.
     * */
    onLogout: (client?: string, skipResetStore?: boolean) => Promise<void>;
};
export {};
