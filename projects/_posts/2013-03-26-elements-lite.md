---                                                                             
layout: project                                                                 
title: elements-lite
summary: DOM buildel for browser
tags: ["browser","elements","DOM","litejs"]
fork: https://github.com/litejs/elements-lite
css:                                                                            
- /css/pygments.css                                                              
---                                                                             
[1]: https://secure.travis-ci.org/litejs/elements-lite.png
[2]: https://travis-ci.org/litejs/elements-lite
[3]: https://coveralls.io/repos/litejs/elements-lite/badge.png
[4]: https://coveralls.io/r/litejs/elements-lite


    @version    0.6.5
    @date       2015-05-02
    @stability  1 - Experimental


Elements &ndash; [![Build][1]][2] [![Coverage][3]][4]
========

Syntax follows CSS Selectors where possible.

Usage
-----

`<script src=elements-lite.js></script>` should place inside body.

### Create elements one by one

```javascript
{% raw %}
El("div", "test").to(document.body)
//<div>test</div>

El("a#link[href='/home']", "Home").to(document.body)
//<a id="link" href="/home">Home</a>

El("a", {id:"link", href:"/home"}).append("Home").to(document.body)
//<a id="link" href="/home">Home</a>

El(".custom", "test").to(document.body)
//<div class="custom">test</div>
{% endraw %}
```


### Templates

It is a template engine inspired by Haml
but uses CSS selectors like syntax for describing elements and attributes.


#### Tags

By default, text at the start of a line (or after only white space) represents an html tag. 
Indented tags are nested, creating the tree like structure of html.


```html
{% raw %}
ul
  li Item A
  li Item B
{% endraw %}
```

becomes

```html
{% raw %}
<ul>
  <li>Item A</li>
  <li>Item B</li>
</ul>
{% endraw %}
```

From CSS Class selectors, ID selectors, Pseudo-classes selectors
and Attribute selectors are supported.

```html
{% raw %}
a#123.link.bold[href="#A"][title=go] link
button:disabled
{% endraw %}
```

becomes

```html
{% raw %}
<a id="123" class="link bold" href="#A" title="go">link</a>
<button disabled="disabled"></button>
{% endraw %}
```


To save space you can use an inline syntax for nested tags.

```html
{% raw %}
a>i text
{% endraw %}
```

becomes

```html
{% raw %}
<a><i>text</i></a>
{% endraw %}
```

#### Inline templates

```html
{% raw %}
ul.list
  @template my-row
    li.my-row > b row
  my-row
  my-row
  / Comment
{% endraw %}
```

becomes

```html
{% raw %}
<ul class="list">
  <li class="my-row"><b>row</b></li>
  <li class="my-row"><b>row</b></li>
</ul>
{% endraw %}
```

#### Data bindings

```html
{% raw %}
ul[data-bind="class: 'red', list.count > 5; each: row in list"]
  li[data-bind="txt: row"]
{% endraw %}
```

.. is equal to

```html
{% raw %}
ul &class: "red", list.count > 5; each: row in list
  li[data-bind="txt: row"]
{% endraw %}
```

Add custom bindings

```javascript
{% raw %}
El.bindings.enabled = function(node, data, enabled) {
    node.disabled = !enabled
}
{% endraw %}
```

```html
{% raw %}
ul &enabled: list.count > 5
  li[data-bind="txt: row"]
{% endraw %}
```


Browser Support
---------------

It should work IE6 and up but automated testing is currently broken.



External links
--------------

-   [Source-code on Github](https://github.com/litejs/elements-lite)
-   [Package on npm](https://npmjs.org/package/elements-lite)



### Licence

Copyright (c) 2012-2015 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


