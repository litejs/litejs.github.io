---                                                                             
layout: project                                                                 
title: browser-event-lite
summary: Event helper for browser
tags: ["browser","event","litejs"]
fork: https://github.com/litejs/browser-event-lite
css:                                                                            
- /css/pygments.css                                                              
---                                                                             

[1]: https://raw.github.com/litejs/browser-event-lite/master/min.js
[2]: https://raw.github.com/litejs/browser-event-lite/master/index.js


    @version  0.3.0
    @date     2015-06-01


Event
=====

`Event.Emitter` can be mixed in to any object,
giving the object the ability to emit named events.


Usage
-----

Mix `Event.Emitter` to custom object.

```javascript
{% raw %}
function MyObj(name) {
    this.name = name
}
Object.assign(MyObj.prototype, Event.Emitter)

var obj = new MyObj("obj1")

obj.on("say", function(text) {
    console.log(this.name + " says: " + text)
})

obj.emit("say", "hello world")
{% endraw %}
```

Use in Mediator Pattern.

```javascript
{% raw %}
// Define global mediator

var Mediator = Object.create(Event.Emitter)

// Listen login events in login controller
Mediator.on("login", function(user, pass) {
    // login code
})

// Emit login event from login view
Mediator.emit("login", "username", "secretPassword")

{% endraw %}
```

Attach listeners to DOM events

```javascript
{% raw %}
function hi(){
	alert("Hei")
	// alert just once
	Event.remove(el, "click", hi)
}

var el = document.getElementById("foo")
Event.add(el, "click", hi)
// handle also touch events
Event.touchAsMouse(el)

{% endraw %}
```


### Licence

Copyright (c) 2013-2015 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


