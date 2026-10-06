# Panda `polyfill: true` breaks Vite `url()` rebasing in `@import`ed CSS

`src/index.css` imports `src/vendor/css/lib.css`, which loads a font with `url(../fonts/lib.woff2)`.

```sh
npm install
npm run build             # polyfill: false
grep -o '@font-face{[^}]*}' dist/assets/*.css
# src:url(data:font/woff2;base64,...)  <- resolved and inlined

npm run build:polyfill    # polyfill: true
grep -o '@font-face{[^}]*}' dist/assets/*.css
# src:url(../fonts/lib.woff2)          <- not rebased; Vite warns it didn't resolve
```

`npm run dev:polyfill` shows the same thing in the dev server: the font request 404s.

The polyfill branch in `@pandacss/postcss` re-parses the stylesheet from a string, so every node's `source.input.file` becomes `src/index.css`, and Vite's `vite-url-rewrite` plugin resolves the imported sheet's `url()`s against the wrong file.
