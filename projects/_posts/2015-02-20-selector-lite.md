---
layout: project
title: selector-lite
summary: A small pure-JavaScript CSS selector engine
tags: ["browser","css","selector","matches","closest","litejs"]
fork: https://github.com/litejs/selector-lite
css:
- /css/pygments.css
---
[npm package]: https://npmjs.org/package/selector-lite
[GitHub repo]: https://github.com/litejs/selector-lite


    @version    0.1.0
    @date       2015-02-19
    @stability  2 - Unstable


Selector lite
=============

A small pure-JavaScript CSS selector engine.

 -  no library dependencies
 -  CSS 3 Selector support

Examples
--------

```javascript
{% raw %}
var selector = require("selector-lite")

// Can be used to implement browser built-in functions.

function getElementById(id) {
    return selector.find(this, "#" + id, true)
}
function getElementsByTagName(tag) {
    return selector.find(this, tag)
}
function getElementsByClassName: (sel) {
    return selector.find(this, "." + sel.replace(/\s+/g, "."))
}
function querySelector(sel) {
    return selector.find(this, sel, true)
}
function querySelectorAll(sel) {
    return selector.find(this, sel)
}
{% endraw %}
```

Methods
-------

-   selector.`find(node, selector, returnFirstMatch)` - Find matching elements like querySelector.
-   selector.`matches(node, selector)` - Returns a Boolean indicating whether or not
    the element would be selected by the specified selector string.
-   selector.`closest(selector)` - Returns the Element, descendant of this element
    (or this element itself), that is the closest ancestor of the elements
    selected by the selectors given in parameter.
-   selector.`next(selector)` - Retrieves the next sibling that matches selector.
-   selector.`prev(selector)` - Retrieves the preceding sibling that matches selector.


Custom selectors
----------------

Custom selector can be added to selector.selectorMap,
where method shortcuts are available (m->matches, c->closest, n->next, p->prev).

-   `_` - node.
-   `v` - part between `()` in `:nth-child(2n+1)`.
-   `a` and `b` can be used as temp variables.

```javascript
{% raw %}
// Add `:input` selector
selector.selectorMap.input = "_.tagName=='INPUT'"

// Add `:val()` selector
selector.selectorMap.val = "_.value==v"
{% endraw %}
```

### Note

-  Working tests are currently in `dom-lite` repo
   as moving them is pain. Will do later.

Coding Style Guidelines
-----------------------

-   Use tabs for indentation, align with spaces
-   Use lowerCamelCase for method and variable names
-   Use UpperCamelCase for constructor names
-   Commit files with Unix-style line endings
-   Do not use spaces in file and directory names
    Consider substituting a dash (-) where you would normally use spaces.
-   Rebase before pushing
-   Fix tests before push or pull request


External links
--------------

-   [GitHub repo][]
-   [npm package][]
-   [DOM spec](https://dom.spec.whatwg.org/)
-   [Selectors Level 3](http://www.w3.org/TR/selectors/)



### Licence

Copyright (c) 2015 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)

