---                                                                             
layout: project                                                                 
title: browser-keymap-lite
summary: Keyboard shortcuts for browser
tags: [litejs]                                                                    
fork: https://github.com/litejs/browser-keymap-lite
css:                                                                            
- css/pygments.css                                                              
---                                                                             

[1]: https://raw.github.com/litejs/browser-keymap-lite/master/min.js
[2]: https://raw.github.com/litejs/browser-keymap-lite/master/browser-keymap-lite.js


Browser Keymap
==============

Keyboard shortcuts.
Download [compressed][1] 
(889 bytes or 599 bytes gzipped)
or [uncompressed][2] source.


### Usage

{% highlight javascript %}{% raw %}
var keyMap = {
	H: function(event, key) {
		// metacode
		View("help").open()

		// attach subview keymap
		Event.setKeyMap(subViewKeyMap)
	},
	num: function(event, num) {
		alert("number "+num+" pressed")
	}
}
var subViewKeyMap = {
	// override H key - help is already open
	H: function(){},
	esc: function() {
		// metacode
		View("help").close()

		// remove subview keymap
		Event.rmKeyMap(subViewKeyMap)
	},
	// Keypresses are bubbled up to previous view
	bubble: true
}

// attach default keymap
Event.setKeyMap(keyMap)

{% endraw %}{% endhighlight %}


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


