---                                                                             
layout: project                                                                 
title: Natural Compare
summary: Compare strings containing a mix of letters and numbers in the way a human being would in sort order.
tags: [string, sort, litejs] 
fork: https://github.com/litejs/natural-compare-lite
css:                                                                            
- css/pygments.css                                                              
---                                                                             

[1]: https://raw.github.com/litejs/natural-compare-lite/master/min.natural-compare.js
[2]: https://raw.github.com/litejs/natural-compare-lite/master/natural-compare.js
[travis-img]: https://travis-ci.org/litejs/natural-compare-lite.png?branch=master
[travis-url]: https://travis-ci.org/litejs/natural-compare-lite


    @version  0.3.2
    @date     2013-07-22


Natural Compare
===============

[![Build Status][travis-img]][travis-url]

Compare strings containing a mix of letters and numbers
in the way a human being would in sort order.
This is described as a "natural ordering".

{% highlight text %}{% raw %}
Standard sorting:   Natural order sorting:
    img1.png            img1.png
    img10.png           img2.png
    img12.png           img10.png
    img2.png            img12.png
{% endraw %}{% endhighlight %}

String.naturalCompare returns a number indicating 
whether a reference string comes before or after or is the same 
as the given string in sort order. 
Use it with builtin sort() function.


{% highlight text %}{% raw %}
ChangeLog
=========

  * Update readme (Lauri Rooden)
  * Add installation instruction to readme (Lauri Rooden)
  * Add version to readme (Lauri Rooden)
  * Minor optimization (Lauri Rooden)

2013-07-11 version v0.3
-----------------------

  * API CHANGE! Use camelcase (Lauri Rooden)
  * Whitespace fixes (Lauri Rooden)
  * Whitespace fixes (Lauri Rooden)
  * Add .travis.yml (Lauri Rooden)
{% endraw %}{% endhighlight %}

Download [compressed][1] 
(359 bytes, 250 bytes gzipped)
or [uncompressed][2] source.



### Installation

- In browser

{% highlight html %}{% raw %}
<script src=min.natural-compare.js></script>
{% endraw %}{% endhighlight %}

- In node.js: `npm install natural-compare-lite`

{% highlight javascript %}{% raw %}
require("natural-compare-lite")
{% endraw %}{% endhighlight %}

### Usage

{% highlight javascript %}{% raw %}
var a = ["z1.doc", "z10.doc", "z17.doc", "z2.doc", "z23.doc", "z3.doc"]
a.sort(String.naturalCompare)
// ["z1.doc", "z2.doc", "z3.doc", "z10.doc", "z17.doc", "z23.doc"]
{% endraw %}{% endhighlight %}

External links
--------------

- [jsperf test](http://jsperf.com/natural-sort-2/5)
- [npmjs.org/package/natural-compare-lite](https://npmjs.org/package/natural-compare-lite)


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


