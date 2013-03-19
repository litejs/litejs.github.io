---
layout: project
title: liquid-lite
summary: Lite version of Liquid markup template engine writen in javascript
tags: [test]
fork: https://github.com/litejs/liquid-lite
css:
- css/pygments.css
---

[1]: https://github.com/Shopify/liquid/ "Shopify in github"
[2]: https://raw.github.com/litejs/liquid-lite/master/test/test.html "test/test.html"
[3]: https://raw.github.com/litejs/liquid-lite/master/min.js
[4]: https://raw.github.com/litejs/liquid-lite/master/liquid-lite.js
[5]: https://github.com/darthapo/liquid.js
[date-format-lite]: http://www.litejs.com/date-format-lite/

Liquid template engine
======================

This is a not complete port of [Liquid][1] template engine.
Download [compressed][3] 
(993 bytes or 626 bytes gzipped)
or [uncompressed][4] source.
A complete port is available [by darthapo][5].

## When to use liquid-lite

- When you trust your templates


## How to use in browser

{% highlight html %}
{% raw %}
<script src=liquid-lite.min.js></script>

<script id=products type="text/liquid">
<ul class="products">
  {% for product in products %}
    <li>
      <h2>{{ product.title | upcase }}</h2>
      Only {{ product.price }}
      <p>{{ product.description }}</p>
    </li>
  {% endfor %}
</ul>
</script>

<div id=page></div>

<script>
var template = liquid( document.getElementById("products").innerHTML )

var data = { products:
  [ { title: "Product A", price: 1.01, description: "Hello a" }
  , { title: "Product B", price: 1.02, description: "Hello b" }
  , { title: "Product C", price: 1.03, description: "Hello c" }
  ]
}

document.getElementById("page").innerHTML = template(data)
</script>
{% endraw %}
{% endhighlight %}

See [test.html][2] for more examples

## How to use in node.js

npm install liquid-lite

{% highlight javascript %}
{% raw %}
var liquid = require("liquid-lite").liquid

var template = liquid( my_template_string )

var data = { products:
  [ { title: "Product A", price: 1.01, description: "Hello a" }
  , { title: "Product B", price: 1.02, description: "Hello b" }
  , { title: "Product C", price: 1.03, description: "Hello c" }
  ]
}

var output = template(data)
{% endraw %}
{% endhighlight %}

## Currently supported tags

- **if** / **elsif** / **else**  
    {% highlight javascript %}
{% raw %}
    {% if user %}
      Hello {{ user.name }}
    {% endif %}
    {% endraw %}
{% endhighlight %}

- **for**
    {% highlight javascript %}
{% raw %}
    {% for product in products %}
      {{ product.title }}
    {% endfor %}

    {% for i = 3; i > 0; i-- %}
      {{ i }}
    {% endfor %}

    {% for item in ["a", "b", "c"] %}
      {{ item }}
    {% endfor %}
    {% endraw %}
{% endhighlight %}

## Liquid Filters

Standard Filters are not implemented by default 
but you have access to prototypes.
Make as many as you need.

- **date** - reformat a date syntax reference  
    Works well with [date-format-lite][]
    {% highlight javascript %}
{% raw %}
    var item = { "timestamp": 1363770186, "datetime": "2013-03-20T09:03:06Z" }
    {{ timestamp | date:"isoUtcDateTime" }}
    {{ datetime | date:"hh:mm" }}
    {% endraw %}
{% endhighlight %}

- **capitalize** - capitalize words in the input sentence
    {% highlight javascript %}
{% raw %}
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1)
    }
    {% endraw %}
{% endhighlight %}

- **downcase** - convert an input string to lowercase
    {% highlight javascript %}
{% raw %}
    String.prototype.downcase = String.prototype.toLowerCase
    {% endraw %}
{% endhighlight %}

- **upcase** - convert an input string to uppercase
    {% highlight javascript %}
{% raw %}
    String.prototype.upcase = String.prototype.toUpperCase
    {% endraw %}
{% endhighlight %}

- **first** - get the first element of the passed in array
    {% highlight javascript %}
{% raw %}
    Array.prototype.first = function() {
      return this[0]
    }
    {% endraw %}
{% endhighlight %}

- **last** - get the last element of the passed in array
    {% highlight javascript %}
{% raw %}
    Array.prototype.last = function() {
      return this[this.length - 1]
    }
    {% endraw %}
{% endhighlight %}

- **join** - join elements of the array with certain character between them.
    _Native in javascript_

- **sort** - sort elements of the array
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **map** - map/collect an array on a given property
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **size** - return the size of an array or string
    {% highlight javascript %}
{% raw %}
    String.prototype.size = Array.prototype.size = function() {
      return this.length
    }
    {% endraw %}
{% endhighlight %}

- **escape** - escape a string
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **escape_once** - returns an escaped version of html without affecting existing escaped entities
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **strip_html** - strip html from string
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **strip_newlines** - strip all newlines (\n) from string
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **newline_to_br** - replace each newline (\n) with html break
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **replace** - replace each occurrence e.g. {{ 'foofoo' | replace:'foo','bar' }} #=> 'barbar'.
    _Native in javascript_

- **replace_first** - replace the first occurrence e.g. {{ 'barbar' | replace_first:'bar','foo' }} #=> 'foobar'
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **remove** - remove each occurrence e.g. {{ 'foobarfoobar' | remove:'foo' }} #=> 'barbar'
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **remove_first** - remove the first occurrence e.g. {{ 'barbar' | remove_first:'bar' }} #=> 'bar'
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **truncate** - truncate a string down to x characters
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **truncatewords** - truncate a string down to x words
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **prepend** - prepend a string e.g. {{ 'bar' | prepend:'foo' }} #=> 'foobar'
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **append** - append a string e.g. {{ 'foo' | append:'bar' }} #=> 'foobar'
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **minus** - subtraction e.g. {{ 4 | minus:2 }} #=> 2
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **plus** - addition e.g. {{ '1' | plus:'1' }} #=> '11', {{ 1 | plus:1 }} #=> 2
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **times** - multiplication e.g {{ 5 | times:4 }} #=> 20
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **divided_by** - division e.g. {{ 10 | divided_by:2 }} #=> 5
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}

- **split** - split a string on a matching pattern e.g. {{ "a~b" | split:~ }} #=> ['a','b'].
    _Native in javascript_

- **modulo** - remainder, e.g. {{ 3 | modulo:2 }} #=> 1
    {% highlight javascript %}
{% raw %}
		//TODO
    {% endraw %}
{% endhighlight %}


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


