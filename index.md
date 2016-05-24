---
layout: index
title: home
---


[npm package]: https://npmjs.org/package/litejs
[GitHub repo]: https://github.com/litejs/litejs
[RFC 6570]: http://tools.ietf.org/html/rfc6570
[SUIT CSS]: https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md


    @version    0.7.0
    @date       2016-05-23
    @stability  2 - Unstable



LiteJS
======

A small JavaScript framework
for building single-page applications
with declarative programming and less code.

Weighing in at just 23KB (10KB gzipped), it includes

 - routed views
 - reusable templates by custom element tags
 - asynchronous and dynamic code loading
 - translations with instant language switching - no page reload required

No dependencies

See a [working example](https://cdn.rawgit.com/litejs/litejs/master/public/example1.html)
with a [source code](https://github.com/litejs/litejs/blob/master/public/example1.html)
in 60 lines.

It also supports SVG elements,
so it is possible to build full SVG single-page applications.  
See a [example](https://cdn.rawgit.com/litejs/litejs/master/public/svg-example1.html)
with a [source code](https://github.com/litejs/litejs/blob/master/public/svg-example1.html)
in 60 lines.


Templates
---------

It has a template engine
with CSS selectors syntax for describing elements and attributes.

```css
ul
  li Item A
  li Item B
```

becomes

```html
<ul>
  <li>Item A</li>
  <li>Item B</li>
</ul>
```

 - Type selector, attribute selectors, ID selectors, and pseudo-classes
are supported.

```css
a#123.link.bold[href="#A"][title=go] My link
button:disabled
```

becomes

```html
<a id="123" class="link bold" href="#A" title="go">My link</a>
<button disabled="disabled"></button>
```

Child combinators can be used
and you can leave off the tag to get a div.

```css
.my-class
  a>i text
```

becomes

```html
<div class="my-class">
  <a><i>text</i></a>
</div>
```

### Inline templates

```css
ul
  @template row
    li.my-row
      a > b Row
  row.first
  row.last
```

becomes

```html
<ul>
  <li class="my-row first"><a><b>Row</b></a></li>
  <li class="my-row last"><a><b>Row</b></a></li>
</ul>
```

Views
-----

Organize views into a hierarchy with built-in router.


```javascript
View(name, element, parent, contentSelector)
```

 - **name** `String` - A name for a view that is also a route to the view.
   Accepts Level 1 URI Templates [RFC 6570][]
 - **element** `String` or `Function` or `DOM Node` -
   View representation as DOM tree.
   String and Function will be transformed to DOM Node on first call.
 - **parent** `String` - Parent view name.
 - **contentSelector** `String, optional` - A selector to where a child Node will be attached.



## How to use

```
// Optional path for views, default = ""
View.base = "/js/views/"

// Define starting point in DOM
View("body", document.body)

// Create first simple view
View("home", ".home", "body")

// Create another view
View("work", ".work", "body")

// Start
View.main = "home"
history.start(View.route)

// call manualy
View("home").show()
```

Style Guidelines
================

All code in any code-base should look like a single person typed it,
no matter how many people contributed.

    Arguments over style are pointless.
    There should be a style guide, and you should follow it.
    -- Rebecca Murphey


General Style Guide
-------------------

 - Indent with tabs, align with spaces.
 - Use no more than 5 levels of indentation.
   If you need more you should fix your code.
 - Limit lines to 80 characters.
   Break longer statements into sensible chunks,
   unless exceeding 80 columns significantly increases readability
   and does not hide information.
   However, never break user-visible strings such as printk messages,
   because that breaks the ability to grep for them.
 - Use double quotes, unless there are less escaping with single quotes.
 - Use UNIX-style newlines `\n`,
   and a newline character as the last character of a file.
 - Do not include trailing whitespace on any lines.
   Do not indent empty lines.
 - Do not use spaces in file and directory names.
   Consider substituting a hyphen `-` where you would normally use spaces.


JavaScript Style Guide
----------------------

 - Use comma first style of variable declaration,
   uninitialized variables at the beginning on one line.
 - Use a leading dot when making long method chains.
 - Do not add semicolons at the end of each line.  
   Semicolon is statement separator not statement terminator,
   use it before `[`, `{` or `/` in the beginning of line.
 - Do not use `that` to refer to an outer `this`.  
   Use the name of the class instead (with first char lowercased).
 - Curly braces belong on the same line as the thing that necessitates them.
 - One space before `{`, after `;` in for loops, around binary operators `1 + 2`.
 - No space between unary operator and variable `i++`.
 - Indent the `switch` and its subordinate `case` in the same level
   instead of double-indenting the `case` statements.
 - Use `lowerCamelCase` for method and variable names.
 - Use `UpperCamelCase` for constructor names.
 - Use `CAPITAL_SNAKE_CASE` for symbolic constants.
 - Private methods and properties begin with an underscore `_`.

```javascript
var foo, bar
, MAX_AGE = 120
, baz = "baz"
, quux = 123

function Person(name, sex) {
    var person = this
    person.name = name
    for (var i = 100; --i; ) {
        person.sing(i + " bottles of beer on the wall")
    }
    switch (sex) {
    case "male":
        person.wear("bow tie")
        break
    case "female":
        person.do("makeup")
        break
    default:
        person
        .be("confused")
        .do("makeup")
    }
    ;["healthy", "pretty", "wise"].map(person._setFlags, person)
}
Person.prototype._setFlags = function(flag) {
    this[flag] = true
}
```

 - Pass the scope rather than binding where possible.
 - Accept an optional scope argument in functions that accept a callback.
 - Prefer function declarations to function expressions.  
   Named function declarations are easier to identify in call stacks
   and the whole function is hoisted.
   (Only the reference of a function expression is hoisted)

```
// Bad
var a = function() {}

// Good
function a() {}
```

CSS Style Guide
---------------

 - One selector per line, one rule per line.
 - Large blocks of single declarations can use a single-line format.
   In this case, a space should be included after the opening brace and before the closing brace.
 - Comma-separated property values can be arranged across multiple lines.
 - One space before `{` and after `:`.
 - Related values and vendor-prefixed properties can be aligned with spaces.
 - Opening brace `{` on the same line as last selector.
 - Closing brace `}` on it's own line at same indentation level as selector.
 - A trailing semi-colon `;` after last declaration.
 - Use [SUIT CSS][] naming conventions.  
   Syntax: `[<namespace>-]<ComponentName>[-descendentName][--modifierName]`
 - Use shorthand properties where possible.
 - Do not use ID selectors.
 - Use class names that are as short as possible but as long as necessary.
   E.g. `.nav` not `.navigation`.
 - Break into as many small files as makes sense.
   Use separate files (concatenated by a build step) to help break up code for distinct components.
 - No preprocessor.
 - No Media Queries.


```css
/* icon.css */
.icon {
    width:  16px;
    height: 16px;
    background-image: url(sprite.png);
    box-shadow:
        1px 1px 1px #000,
        2px 2px 1px 1px #ccc inset;

    -webkit-transition: all 4s ease;
       -moz-transition: all 4s ease;
        -ms-transition: all 4s ease;
         -o-transition: all 4s ease;
            transition: all 4s ease;
}

.icon--person   { background-position: -16px   0  ; }
.icon--files    { background-position:   0   -16px; }
.icon--settings { background-position: -16px -16px; }
```


Workflow
--------

 - Rebase before pushing.
 - One commit should do just one thing.
 - Whenever you fix a bug, write a regression test.
   A bug fixed without a regression test is almost certainly going to break again in the future.


Tags
====

Certain tags are used in comments to assist in indexing common issues:

 - TODO    to indicate planned enhancements.
 - FIXME   to mark potential problematic code that requires special
           attention and/or review.
 - BUG     for founded bugs.
 - THANKS  for acknowledgments.

There is a risk that tags accumulate over time; it is advisable to
include the date and the tag owner in the comment to ease tracking.

```
// TODO:2008-12-06:johnc: Add support for negative offsets.
// While it is unlikely that we get a negative offset, it can
// occur if the garbage collector runs out of space.
// THANKS: Ralf Holly - TODO or not TODO [http://www.approxion.com/?p=39]
```


Logging
=======

Please clean up logs when they are no longer helpful.
In particular, logging the same object over and over again is not helpful.
Logs should report what's happening
so that it's easier to track down where a fault occurs.


Setup Git
=========

```sh
git config --global user.name 'Real Name'
git config --global user.email <me>@<email>
# To prevent accidental pushes to branches which you’re not ready to push yet
git config --global push.default tracking
# Do not conflict with compiled files specified in .gitattributes
git config --global merge.ours.driver true
# setup rebase for every tracking branch
git config --global branch.autosetuprebase always
# Store passwords permanently in plaintext to ~/.git-credentials file
git config --global credential.helper store
# ... or cache for an hour
git config --global credential.helper 'cache --timeout=3600'
```


External links
--------------

 - [GitHub repo][]
 - [npm package][]
 - URI Template [RFC 6570][]


### Licence

Copyright (c) 2013-2016 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


