# lui-ssr

[lui](https://github.com/L3P3/lui) is working great, but [some people](https://github.com/odincat) want to use it with SSR. This module allows you to do that! 🎉

## Demo

TODO list: [lui (original)](http://l3p3.de/dev/lui/todo-legacy.html) vs [lui-ssr (SSR)](http://l3p3.de/dev/lui/todo-legacy-static.html)

Check out the page source to see the difference.

## Usage

Import this module into your server or build script and give it the source of your lui application. It will return a string that you can send to the client.

```js
import lui_ssr from 'lui-ssr';

const app_src = fs.readFileSync('./app.js', 'utf8');

const html = lui_ssr(app_src)();

assert(html === '<h1>Hello World!</h1>');
```

Notice the extra `()` at the end of the function call. This is because lui-ssr returns a function that you can call with an optional mock `window` object. This is useful for run-time constants and dynamic data without recompiling every time.

Use the returned HTML as the "placeholder" in your lui root element and keep everything else as it is.

When the actual application in the browser is run, lui will (later) re-use the generated elements.

## What is SSR and why?

SSR stands for Server-Side Rendering. It is a technique to render a web application on the server and send the result to the client. This is useful for a number of reasons:

- SEO: Search engines sometimes can't run JavaScript, so they can't see your content. SSR allows you to send the content to these crawlers.
- Performance: The user doesn't have to wait for the JavaScript to load and run before they can see the content.
- Accessibility: Some users might not be able to run JavaScript, so they can't use your application. SSR allows them to see the initial content at least.
- Showing off: You can show off your fancy server-side skills to your "friends" and enemies.

## Caveats

- This module is quite simple and might not work with really hacky lui applications. ([minicraft](https://l3p3.de/minicraft) works, see its page source) If you find a bug, please open an issue or a pull request anyway.

- Only applications having a separate lui script tag are supported. When your app has lui compiled in, you need to import from `lui/link` in it instead of `lui`. You can set up an alias for that. Should work. 🤞

- The app is run in a sandboxed VM with a 100ms timeout to prevent infinite loops from freezing the server. Most browser globals (setTimeout, localStorage, etc.) are mocked as no-ops or return null. This is fine for most applications, but if the app comes from some user, you are doomed and probably fired.

- There is no lui design rules enforcement at all. Most bugs are undefined behaviour. If your app works with lui.dev.js without errors, it should work here too.

## Testing

lui-ssr has a comprehensive test suite with 35+ test applications covering:
- All lui hooks (state, memo, model, async, etc.)
- Component nesting and composition
- Special attributes (data-*, classes, styles)
- HTML element rendering and escaping
- Template system and inheritance
- Edge cases and real-world scenarios

Run the tests:
```bash
npm test
```

See [test/apps/README.md](test/apps/README.md) for detailed test coverage.

## Technical details

This wrapper only executes as much as is needed to generate the initial HTML by providing a mock lui interface to the app. `hook_effect`s are ignored, `hook_memo`s just pass-through and so on. When you hold up to my lui rules, you should be fine.
