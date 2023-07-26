# lui-ssr

[lui](https://github.com/L3P3/lui) is working great, but [some people](https://github.com/odincat) want to use it with SSR. This module allows you to do that! 🎉

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

- This module is quite simple and might not work with hacky lui applications. If you find a bug, please open an issue or a pull request anyway.

- Only applications having a seperate lui script tag are supported. When your app has lui compiled in, you need to import from `lui/link` in it instead of `lui`. You can set up an alias for that. Should work. 🤞

- The provided app is run synchronously without any sandboxing whatsoever. There is not even a try-catch around it. This is fine for most applications, but if the app comes from some user, you are doomed and probably fired.

- There is no error handling at all. Any bug is undefined behaviour. If your app works with lui.dev.js without errors, it should work here too.

## Technical details

This wrapper only executes as much as is needed to generate the initial HTML by providing a mock lui interface to the app. `hook_effect`s are ignored, `hook_memo`s just pass-through and so on. When you hold up to my lui rules, you should be fine.
