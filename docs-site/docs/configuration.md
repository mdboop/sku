# Configuration

## clientEntry

type `string`

Default: `./src/client.js`

The client entry point to the app. The client entry is the file that executes your browser code.

Each `route` can also specify a client entry, if none is specified the `clientEntry` is used. See [`routes`](#routes) for more info.

## renderEntry

type `string`

**Only for static apps and libraries**

Default: `./src/render.js`

The render entry file to the app. This file should export the required functions for static rendering. See [static-rendering](./docs/static-rendering.md) for more info.

## serverEntry

type `string`

**Only for SSR apps**

Default: `./src/server.js`

The entry file for the server.

## libraryEntry

type `string`

**Only for libraries**

The entry file for the library. If set, sku will assume the project is a library. Must export its API from this file.

Example:

```js
export default () => {
  console.log('Hello from my library!');
};
```

## routes

type `Array<string>`

**Only for static apps**

Default: `['/']`

An array of routes for the app. Each route must specify a name and a route corresponding to the path it is hosted under. Each route may also have a custom client entry, which can help with bundle splitting. See [static-rendering](./docs/static-rendering) for more info.

Example:

```js
const config = {
  routes: [{ name: 'home', route: '/' }]
};
```

## sites

type `Array<string>`

Default: `[]`

An array of sites the app supports. These usually correspond to each domain the app is hosted under. See [static-rendering](./static-rendering.md) for more info.

## environments

type `Array<string>`

Default: `[]`

An array of environments the app supports. Apps should have one environment for local development plus one for each environment they're deployed to. Use this value to drive app config (e.g. `analyticsEnabled` or `apiEndpoint`). See [static-rendering](./static-rendering.md) for more info.

## transformOutputPath

type `function`

**Only for static apps**

Default: `({ environment = '', site = '', route = '' }) => path.join(environment, site, route)`

This function returns the output path within [`target`](#target) for each rendered page. Generally, this value should be sufficient. If you think you need to modify this setting, please reach out to the `sku-support` group first to discuss.

## srcPaths

type `Array<string>`

Default: `['./src']`

An array of directories holding your apps source code.

## compilePackages

type `Array<string>`

Default: `[]`

An array of `node_modules` to be compiled as if they were part of your source code. This allows the use of packages that make use of CSS Modules or TypeScript without having them be pre compiled. Ideally, this setting should only be used for internally controlled packages.

## hosts

type `Array<string>`

Default: `['localhost']`

An array of custom hosts the app can be served off when running `sku start`. You must have configured your hosts file to point to localhost as well.

## port

type `number`

Default: `8080`

The port the app is hosted on when running `sku start`.

## serverPort

type `number`

**Only for SSR apps**

Default: `8181`

The port the server is hosted on when running `sku start-ssr`.

## target

type `string`

Default: `dist`

The directory to build your assets into when running `sku build` or `sku build-ssr`

## setupTests

type `string`

Point to a JS file that will run before your tests to setup the testing environment.

## storybookPort

type `number`

Default: `8081`

The port to host storybook on when running `sku storybook`.

## initialPath

type `string`

Default: `routes[0].route`

The browser URL to open when running `sku start` or `sku start-ssr`. It will default to the first `route` in the [`routes`](#routes) array.

## public

type `string`

Default: `public`

A folder of public assets to be copied into the `target` directory after `sku build` or `sku build-ssr`.

> Caution: All assets should ideally be imported through the source code to ensure they are named correctly for long term caching. You may run into caching issues using this option. It may be removed in future.

## publicPath

type `string`

Default: `/`

The URL all the static assets of the app are accessible under.

## polyfills

type `Array<string>`

Default: `[]`

An array of polyfills to be included into all client entry points.

## libraryName

type `string`

**Only for libraries**

The global name of the library. Will be added to the `window` object under `window[libraryName]`.

## supportedBrowsers

type `browserslist-query`

Default: [browserslist-config-seek](https://github.com/seek-oss/browserslist-config-seek)

The [`browserslist`](https://github.com/browserslist/browserslist) query describing the apps browser support policy.

## dangerouslySetWebpackConfig

type `function`

This function provides a way to override the webpack config after sku has created it. As sku creates two webpack configs (`client` & `server|render`) this function will actually run twice, if you only need to modify one, then you can check `config.name`.

Ideally, this setting is not needed and only used for experimenting/debugging. If you require webpack features not currently supported by sku please speak to the `sku-support` group.

Reliance on this setting will cause issues when upgrading sku as any custom settings may break at anytime. You've been warned!

Example:

```js
const config = {
  dangerouslySetWebpackConfig: skuWebpackConfig => ({
    ...skuWebpackConfig,
    someOtherConfig: 'dangerousValue'
  })
};
```

## dangerouslySetJestConfig

type `function`

Similar to `dangerouslySetWebpackConfig` but for [jest](https://jestjs.io/docs/en/configuration) config. Make sure [`setupTests`](#setuptests) definitely doesn't cover your needs before using.

Please speak with the `sku-support` group before using.

Example:

```js
const config = {
  dangerouslySetJestConfig: skuJestConfig => ({
    ...skuJestConfig,
    someOtherConfig: 'dangerousValue'
  })
};
```

## dangerouslySetESLintConfig

type `function`

Similar to `dangerouslySetWebpackConfig` but for [eslint](https://eslint.org/) config.

Example:

```js
const config = {
  dangerouslySetESLintConfig: skuEslintConfig => ({
    ...skuEslintConfig,
    someOtherConfig: 'dangerousValue'
  })
};
```

## sourceMapsProd

type `boolean`

By default source maps will be generated only for development builds.
Set to `true` to enable source maps in production.

Example:

```js
const config = {
  sourceMapsProd: true
};
```