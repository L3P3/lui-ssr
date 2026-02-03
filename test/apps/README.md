# Test Apps for lui-ssr

This directory contains comprehensive test applications to verify that lui-ssr correctly renders lui applications to HTML.

## Test Coverage

### Basic Components
- **helloworld.js** - Simple "Hello, World!" example using `node_dom` and `init`
- **nested-components.js** - Tests nested component hierarchy with props passing
- **deep-nesting.js** - Tests deeply nested components (3+ levels)
- **children-prop.js** - Tests components that receive and render children
- **mixed-content.js** - Tests mixing inline components with text

### Hooks
- **hook-assert.js** - Tests conditional rendering using `hook_assert`
- **hook-async.js** - Tests async data loading (should return fallback during SSR)
- **hook-dom.js** - Tests wrapping components with `hook_dom`
- **hook-memo.js** - Tests memoized computations with `hook_memo`
- **hook-model.js** - Tests state machine with `hook_model`
- **hook-prev.js** - Tests `hook_prev` (should return initial value)
- **hook-state.js** - Tests component state (should use initial values)
- **hook-static.js** - Tests static values with `hook_static`
- **multiple-hooks.js** - Tests combining multiple hooks in one component

### Node Mapping
- **node-map-numbers.js** - Tests `node_map` with number arrays
- **node-map-strings.js** - Tests `node_map` with string arrays
- **node-map-objects.js** - Tests `node_map` with object arrays (with id property)
- **node-map-props.js** - Tests `node_map` with additional props
- **empty-node-map.js** - Tests `node_map` with empty array

### Special Attributes
- **special-attrs.js** - Tests D (data-*), F (CSS classes), and S (inline styles)
- **style-merging.js** - Tests merging of style string and S object
- **camelCase-attrs.js** - Tests camelCase to kebab-case conversion (htmlFor, tabIndex, etc.)

### HTML Elements & Attributes
- **various-elements.js** - Tests various HTML elements (input, button, select, etc.)
- **void-elements.js** - Tests self-closing/void elements (br, hr, img, input, etc.)
- **numeric-attributes.js** - Tests attributes with numeric values
- **empty-string-attrs.js** - Tests attributes with empty string values
- **attribute-escaping.js** - Tests proper HTML escaping of special characters
- **attribute-quoting.js** - Tests proper quoting of attribute values

### Content Rendering
- **innerHTML-innerText.js** - Tests innerHTML vs innerText behavior and precedence
- **innerHTML-children.js** - Tests that children are ignored when innerHTML/innerText is present

### Templates
- **template.js** - Tests basic template definition and usage with `dom_define`
- **template-inheritance.js** - Tests template extension and inheritance

### Edge Cases
- **edge-cases.js** - Tests false, null, true values, empty arrays, boolean attributes, etc.

### Complex Examples
- **todo.js** - Full TODO app example from lui repository
- **complex-app.js** - Real-world component structure with header, list, and footer

## Running Tests

Run all tests:
```bash
npm test
```

Run a specific test:
```bash
node test/apps.js <test-name>
# Example:
node test/apps.js helloworld
```

## Expected Output

All tests should produce valid HTML output without errors. The test runner (`apps.js`) will display the HTML output for each test file.

## Adding New Tests

When adding a new test:
1. Create a new `.js` file in this directory
2. Follow the naming convention: `feature-description.js`
3. Add a comment at the top describing what the test covers
4. Use the lui API (imported from `lui` global)
5. Call `init()` to render the app
6. Run `npm test` to verify the output is correct
7. Update this README with the new test

## Notes

- During SSR, hooks like `hook_effect` are no-ops
- Async operations (e.g., `hook_async`) return their fallback values
- Event handlers are not rendered to HTML
- The `R` (ref) prop is ignored during SSR
