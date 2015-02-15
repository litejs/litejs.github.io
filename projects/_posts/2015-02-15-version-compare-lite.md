---
layout: project
title: version-compare-lite
summary: Compare versions
tags: [litejs]
fork: https://github.com/litejs/version-compare-lite
css:
- /css/pygments.css
---

[Build]:    http://img.shields.io/travis/litejs/version-compare-lite.png
[Coverage]: http://img.shields.io/coveralls/litejs/version-compare-lite.png
[1]: https://travis-ci.org/litejs/version-compare-lite
[2]: https://coveralls.io/r/litejs/version-compare-lite



    @version    0.1.0
    @date       2015-02-14
    @stability  1 - Experimental


Version Compare &ndash; [![Build][]][1] [![Coverage][]][2]
===============

Compare versions.


### Installation

- In browser

```html
{% raw %}
<script src=min.version-compare.js></script>
{% endraw %}
```

- In node.js: `npm install version-compare-lite`

```javascript
{% raw %}
require("version-compare-lite")
{% endraw %}
```

### Usage

```javascript
{% raw %}
// Simple case sensitive example
var a = ["0.1.0", "2.0.0", "1.0.0"];
a.sort(String.versionCompare);
// ["0.1.0", "1.0.0", "2.0.0"]

{% endraw %}
```


External links
--------------

-   [Source-code on Github](https://github.com/litejs/version-compare-lite)
-   [Package on npm](https://npmjs.org/package/version-compare-lite)


Licence
-------

Copyright (c) 2015 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


