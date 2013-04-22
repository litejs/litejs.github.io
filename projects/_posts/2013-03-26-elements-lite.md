---                                                                             
layout: project                                                                 
title: elements-lite
summary: DOM buildel for browser
tags: [litejs]                                                                    
fork: https://github.com/litejs/elements-lite
css:                                                                            
- css/pygments.css                                                              
---                                                                             

[1]: https://raw.github.com/litejs/elements-lite/master/min.js
[2]: https://raw.github.com/litejs/elements-lite/master/elements-lite.js


Elements
========

DOM builder for browser.
Download [compressed][1] 
(2718 bytes or 1202 bytes gzipped)
or [uncompressed][2] source.


### Usage

`<script src=elements-lite.js></script>` should place inside body.

{% highlight javascript %}
{% raw %}
El("div", "test").to(document.body)
//<div>test</div>

El("a", {id:"link", href:"/home"}).append("Home").to(document.body)
//<a id="link" href="/home">Home</a>

El(".custom", "test").to(document.body)
//<div class="custom">test</div>
{% endraw %}
{% endhighlight %}


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)

