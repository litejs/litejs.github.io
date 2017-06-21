---
layout: index
title: home
css:
- /css/pygments.css
---


[LiteJS]: https://www.litejs.com/
[npm package]: https://npmjs.org/package/litejs
[GitHub repo]: https://github.com/litejs/litejs
[RFC 6570]: http://tools.ietf.org/html/rfc6570
[SUIT CSS]: https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md


    @version    17.6.0
    @date       2017-06-21


LiteJS
======

The best way to build fast and powerful web interfaces.

Weighing in at just 26KB (11KB gzipped),
it includes everything you need to build a modern web application:

 - routed views with browser history management
 - reusable templates by custom element tags
 - asynchronous and dynamic code loading
 - translations with instant language switching - no page reload required
<details>
    <summary>.. and more with no dependencies</summary>

 - date parsing and formating [date-format-lite](https://github.com/litejs/date-format-lite)
 - string formating
 - keyboard shortcuts
 - JSON Pointer [RFC 6901] and JSON Merge Patch [RFC 7396] implementation

</details>
<p></p>

See a [working example](https://cdn.rawgit.com/litejs/litejs/master/public/example1.html)
with a [source code](https://github.com/litejs/litejs/blob/master/public/example1.html)
in 80 lines.

It also supports SVG elements,
so it is possible to build full SVG single-page applications.  
See a [example](https://cdn.rawgit.com/litejs/litejs/master/public/svg-example1.html)
with a [source code](https://github.com/litejs/litejs/blob/master/public/svg-example1.html)
in 60 lines.


Overview
--------

In short - an application consists of a presentation layer (UI) and a data layer (Model).


### Presentation layer

Most template engines translates its own custom syntax to HTML string
and then let browsers to parse HTML into a DOM.


    HTML is a markup language for building DOM tree from a string.


LiteJS have a DOM-aware template engine,
that bypasses HTML string part
and turns templates directly to DOM nodes.

Declare elements and attributes with clear, well-indented CSS selectors.


```css
a#123.link.bold[href="#A"] My link
ul
	li Item A
	li Item B
.footer>button:disabled[title=go] Click
```

becomes

```html
<a id="123" class="link bold" href="#A">My link</a>
<ul>
	<li>Item A</li>
	<li>Item B</li>
</ul>
<div class="footer">
	<button disabled="disabled" title="go">Click</button>
</div>
```

 - Type selector, attribute selectors, ID selectors, and pseudo-classes
are supported. Child combinators can be used and you can leave off the tag to get a div.


#### Built-in plugins

Plugins starts with `@` in template files.

 - **@child** - Content will be put there.
 - **@def [route,...] [route|file,...]** - Define routes and required files for them.
 - **@el [name]** - Create a new custom element.
 - **@view [route] [parent]** - Organize views into a hierarchy with built-in router.
    - Accepts Level 1 URI Templates [RFC 6570][].
    - Views starting with `#` are hidden without a route.

```css
@el menu
	ul
		@el row
			li.my-row
				i.icon
				b
					@child
		row.first
			a[href="#home"] Home
		row.last
			a[href="#page/about"] About
	hr

@el footer
	.footer
		hr
		i Bye

@view home #body
	menu
	h1 Home
	footer

@view page/{pageName} #body
	menu
	h1 Welcome to {route.pageName} page!
	section Hello World!
	footer
```

[See it in action](https://cdn.rawgit.com/litejs/litejs/master/public/example2.html)


#### Built-in bindings

Bindings starts with `&` in template files after declaring selector.
Bindings are piece of JavaScript that will be run on rendering.
Bindings ties together UI and Model.


 - **&class: [name], [force]** - Add a class to element.
 - **&txt: [content]** - Add plain text to element.


```css
a[href="#x"]
    &class: "is-selected", Math.random() > .5
    // :: is for one-time binding
    &txt:: this.href
```


### Data layer

To detect and respond to changes LiteJS uses observables.

`Item` is a cached by id and observable Object.

`List` is a cached by name and observable Array of `Item`s,
that can be merged, sorted, filtered, paged and loaded asynchronously.



### Api

Defined global variables

 - El
 - View
 - Fn

```javascript
// Optional path for views, default = ""
View.base = "/js/views/"

// Define starting point in DOM
View("body", document.body)

// Default view
View.main = "home"

// El.data is a root scope for elements, make View visible for templates
El.data.View = View

```


External links
--------------

 - [GitHub repo][]
 - [npm package][]
 - URI Template [RFC 6570][]


### Licence

Copyright (c) 2013-2016 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


