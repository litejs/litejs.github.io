---                                                                             
layout: project                                                                 
title: browser-event-lite
summary: Event helper for browser
tags: [litejs]                                                                    
fork: https://github.com/litejs/browser-event-lite
css:                                                                            
- css/pygments.css                                                              
---                                                                             

[1]: https://raw.github.com/litejs/browser-event-lite/master/min.js
[2]: https://raw.github.com/litejs/browser-event-lite/master/browser-event-lite.js


Event
=====

Browser event helper.
Download [compressed][1] 
(1488 bytes or 657 bytes gzipped)
or [uncompressed][2] source.


### Usage

{% highlight javascript %}
{% raw %}
function hi(){
	alert("Hei")	
	// alert just once
	Event.remove(el, "click", hi)
}

Event.add(el, "click", hi)
// handle also touch events
Event.touch_as_mouse(el) 
{% endraw %}
{% endhighlight %}


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


