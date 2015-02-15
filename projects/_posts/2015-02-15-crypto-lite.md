---                                                                             
layout: project                                                                 
title: crypto-lite
summary: Standard and secure cryptographic algorithms for browser
tags: [litejs]                                                                    
fork: https://github.com/litejs/crypto-lite
css:                                                                            
- /css/pygments.css                                                              
---                                                                             

[Build]:    http://img.shields.io/travis/litejs/crypto-lite.png
[Coverage]: http://img.shields.io/coveralls/litejs/crypto-lite.png
[1]: https://travis-ci.org/litejs/crypto-lite
[2]: https://coveralls.io/r/litejs/crypto-lite
[4]: http://nodejs.org/api/crypto.html


    @version    0.0.7
    @date       2014-09-04
    @stability  1 - Experimental


Standard cryptographic algorithms &ndash; [![Build][]][1] [![Coverage][]][2]
=================================

Lite version of sha1, sha256, hmac, pbkdf2 writen in javascript.


## How to use in browser

```html
{% raw %}
<script src=crypto-lite.js></script>

<script>
crypto.sha1("secret")
// e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4
crypto.sha256("secret")
// 2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b
crypto.hmac("sha1", "key", "message")
// 2088df74d5f2146b48146caf4965377e9d0be3a4
crypto.hmac("sha256", "key", "message")
// 6e9ef29b75fffc5b7abae527d58fdadb2fe42e7219011976917343065f58ed4a
crypto.pbkdf2Sync("password", "salt", 1, 20)
// 0c60c80f961f0e71f3a9b524af6012062fe037a6
</script>
{% endraw %}
```


## How to use in node.js

Although it should work in node.js, you should [use native][4] api there.

npm install crypto-lite

```javascript
{% raw %}
var crypto = require("crypto-lite").crypto

{% endraw %}
```


External links
--------------

-   [Source-code on Github](https://github.com/litejs/crypto-lite)
-   [Package on npm](https://npmjs.org/package/crypto-lite)


### Licence

Copyright (c) 2014 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)

