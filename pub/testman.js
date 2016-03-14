


/*
* @version    0.4.0
* @date       2016-03-14
* @stability  2 - Unstable
* @author     Lauri Rooden <lauri@rooden.ee>
* @license    MIT License
*/


!function(exports) {
	var doneTick, started
	, totalCases = 0
	, failedCases = 0
	, totalAsserts = 0
	, passedAsserts = 0
	, toString = Object.prototype.toString
	, bold  = '\u001b[1m'
	, red   = '\u001b[31m'
	, green = '\u001b[32m'
	, reset = '\u001b[0m'
	, proc = typeof process == "undefined" ? { argv: [] } : process
	, Fn = exports.Fn || require("./lib/functional-lite.js").Fn
	, color = proc.stdout && proc.stdout.isTTY && proc.argv.indexOf("--no-color") == -1


	if (!color) {
		bold = red = green = reset = ""
	}

	describe.result = ""

	function print(str) {
		describe.result += str + "\n"
		console.log(str)
	}

	function This() {
		return this
	}

	function type(obj) {
		// Standard clearly states that NaN is a number
		// but it is not useful for testing.
		return (
			obj == null || obj != obj ? "" + obj : toString.call(obj).slice(8, -1)
		).toLowerCase()
	}

	function deepEqual(actual, expected, circArr) {
		if (actual === expected) return true

		// null == undefined
		if (actual == null && actual == expected) return true

		var key, keysA, keysB, len
		, actualType = type(actual)

		if (
			actualType != type(expected) ||
			actual.constructor !== expected.constructor ||
			(actualType == "date" && +actual !== +expected) ||
			typeof actual != "object"
		) {
			return false
		}

		if (!circArr) {
			circArr = []
		}


		key = circArr.indexOf(actual)
		if (key > -1) return circArr[key + 1] === expected
		circArr.push(actual, expected)

		keysA = Object.keys(actual)
		len = keysA.length
		if (actualType == "array" || actualType == "arguments") {
			if (actual.length !== expected.length) return false
		} else {
			keysB = Object.keys(expected)
			if (len != keysB.length || !deepEqual(keysA.sort(), keysB.sort(), circArr)) return false
		}
		for (; len--; ) {
			key = keysA[len]
			if (!deepEqual(actual[key], expected[key], circArr)) return false
		}
		return true
	}

	function AssertionError(message, _stackStart) {
		this.name = "AssertionError"
		this.message = message
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, _stackStart || AssertionError)
		} else {
			this.stack = this.toString() + "\n" + (new Error()).stack
		}
	}
	AssertionError.prototype = Object.create(Error.prototype)


	function describe(name) {
		return new TestSuite(name)
	}

	function TestSuite(name) {
		var testSuite = this

		if (!started) {
			started = +new Date()
			print("TAP version 13")
		}

		testSuite.name  = name || "{unnamed test suite}"
		testSuite.cases = []

		print("# " + testSuite.name)

		return testSuite
	}



	TestSuite.prototype = {
		_test: This,
		describe: describe,
		it: function(name, options) {
			return this.test("it " + name, null, options)
		},
		test: function(name, next, options) {
			var testSuite = this
			, testCase = new TestCase(name, options, testSuite)


			if (next) next(testCase)

			return testCase
		},
		done: function(next) {
			if (this.done_) return
			this.done_ = +new Date()

			print("1.." + totalCases)
			print("#" + (failedCases ? "" : green + bold) + " pass  " + (totalCases - failedCases)
				+ "/" + totalCases
				+ " [" + passedAsserts + "/" + totalAsserts + "]"
				+ " in " + (this.done_ - started) + " ms"
				+ reset)

			failedCases && print("#" + red + bold + " fail  " + failedCases
				+ " [" + (totalAsserts - passedAsserts) + "]"
				+ reset)

			if (typeof next == "function") next()
			/*
			* FAILED tests 1, 3, 6
			* Failed 3/6 tests, 50.00% okay
			* PASS 1 test executed in 0.023s, 1 passed, 0 failed, 0 dubious, 0 skipped.
			*/
			if (proc.exit) proc.exit()
		}
	}

	function TestCase(name, options, testSuite) {
		var testCase = this
		totalCases++
		testCase.name = totalCases + " - " + (name || "{unnamed test case}")
		testCase.options = options || {}
		testCase.failed = []
		testCase.passedAsserts = 0
		testCase.totalAsserts = 0

		testSuite.cases.push( testCase )

		if (testCase.options.skip) {
			testCase.ok = testCase.equal = testCase.type = testCase.run = This
		}

		;["describe", "it", "test", "done"].forEach(function(name) {
			testCase[name] = function() {
				testCase.end()
				return testSuite[name].apply(testSuite, arguments)
			}
		})

		clearTimeout(doneTick)
		doneTick = setTimeout(done, 50)

		function done() {
			if (testCase.ok == describe.it.ok) testSuite.done()
			else testCase.run(done)
		}

		return testCase
	}

	function stringify(item, tmp) {
		if (item && typeof item == "object") {
			if (item.constructor == Object) {
				tmp = Object.keys(item).slice(0, 5).map(function(key) {
					return key + ":" + stringify(item[key])
				})
				return "{" + (item.length > 5 ? tmp + ",..." : tmp) + "}"
			}
			if (Array.isArray(item)) {
				tmp = item.slice(0, 5).map(stringify)
				return "[" + (item.length > 5 ? tmp + ",..." : tmp) + "]"
			}
			if (item instanceof Date) {
				return item.toJSON()
			}
			return toString.call(item).slice(8, -1) + "(" + item.toString() + ")"
		}
		return JSON.stringify(item)
	}

	TestCase.prototype = describe.it = describe.assert = {
		wait: Fn.hold,
		ok: function ok(value, message, _stackStart) {
			var testCase = this
			totalAsserts++
			testCase.totalAsserts++
			try {
				if (typeof value == "function") {
					value = value.call(testCase)
				}
				if (!value) {
					if (!message) {
						message = "Should be truthy: " + stringify(value)
					} else if (Array.isArray(message)) {
						message = stringify(message[0]) + " " + message[1] + " " + stringify(message[2])
					}
					message = message + " #" + (testCase.passedAsserts + testCase.failed.length + 1)
					throw new AssertionError(message, _stackStart || ok)
				}
				passedAsserts++
				testCase.passedAsserts++
			} catch(e) {
				testCase.failed.push(testCase.options.noStack ? e.message : e.stack)
			}
			return testCase
		},
		notOk: function notOk(value, message) {
			return this.ok(
				!value,
				message || "Should be falsy: " + stringify(value),
				notOk
			)
		},
		equal: function equal(actual, expected, message) {
			return this.ok(
				deepEqual(actual, expected),
				message || [actual, "==", expected],
				equal
			)
		},
		notEqual: function notEqual(actual, expected, message) {
			return this.ok(
				!deepEqual(actual, expected),
				message || [actual, "!=", expected],
				notEqual
			)
		},
		strictEqual: function strictEqual(actual, expected, message) {
			return this.ok(
				actual === expected,
				message || [actual, "===", expected],
				strictEqual
			)
		},
		notStrictEqual: function notStrictEqual(actual, expected, message) {
			return this.ok(
				actual !== expected,
				message || [actual, "!==", expected],
				notStrictEqual
			)
		},
		throws: function throws(fn, message) {
			var actual = false
			, expected = true
			try {
				fn()
			} catch(e) {
				actual = true
			}
			return this.ok(actual, message || "throws", throws)
		},
		plan: function(num) {
			this.planned = num
			return this
		},
		end: function() {
			var testCase = this

			if (testCase.ended) return

			testCase.ended = new Date()

			if (testCase.options.skip) {
				return print("ok " + testCase.name + " # skip - " + testCase.options.skip)
			}

			if (testCase.planned != void 0) {
				testCase.equal(testCase.planned, testCase.totalAsserts, null, "planned")
			}

			testCase.name += " [" + testCase.passedAsserts + "/" + testCase.totalAsserts + "]"

			if (testCase.failed.length) {
				failedCases++
				print("not ok " + testCase.name + "\n---\n" + testCase.failed.join("\n") + "\n---")
			} else {
				print("ok " + testCase.name)
			}
		},
		run: function(fn) {
			fn.call(this)
			return this
		},
		anyOf: function anyOf(a, b) {
			return this.ok(
				Array.isArray(b) && b.indexOf(a) != -1,
				"should be one of '" + b + "', got " + a,
				anyOf
			)
		},
		type: function assertType(thing, expected) {
			var t = type(thing)
			return this.ok(
				t === expected,
				"type should be " + expected + ", got " + t,
				assertType
			)
		}
	}

	TestCase.prototype.deepEqual = TestCase.prototype.equal
	TestCase.prototype.notDeepEqual = TestCase.prototype.notEqual

	exports.describe = describe.describe = describe

	var testPoint
	exports.test = function(name, next) {
		if (!testPoint) testPoint = describe()
		return testPoint = testPoint.test(name, next)
	}

}(this)


/*
* http://sourceforge.net/projects/portableapps/files/
*/


!function(describe) {

	describe.GLOBAL = {}

	describe.it.goTo = function(route) {
		location.href = "#" + route
		setTimeout(this.wait(), 60)
		return this
	}

	describe.it.resizeTo = function(width, height) {
		document.documentElement.style.width = width
		document.documentElement.style.height = height
		M.emit.call(window, "resize")
		return this
	}

	describe.it.waitTill = function(actual, options) {
		var result
		, count = 30
		, resume = this.wait()

		if (options.timeout) {
			count = 0 | (options.timeout / 50)
		}

		this.ok(function() {
			return !!result
		}, options || "Function returns something")
		test()

		return this

		function test() {
			result = actual()
			if (!result && count--) return setTimeout(test, 50)
			resume()
		}
	}
	describe.it.viewOpen = function(actual, options) {
		return this.waitTill(function() {
			return View(actual).open
		}, options || "View "+actual+" should be open")
	}
	describe.it.waitSelector = function(actual, options) {
		return this.waitTill(function() {
			return document.body.find.call(document.documentElement, actual)
		}, options || "Selector "+actual+" should be in dom")
	}
	describe.it.countSelectors = function(actual, expected, options) {
		this.waitSelector(actual, options)
		this.ok(function() {
			var nodes = document.body.findAll(actual)
			, count = nodes && nodes.length
			return count === expected
		}, options || "Number of matches for " + actual + " should be " + expected)
		return this
	}
	describe.it.haveText = function(actual, expected, options) {
		this.waitSelector(actual, options)
		this.waitTill(function() {
			var node = document.body.find(actual)
			, txt = node && node[node.tagName == "INPUT" ? "val" : "txt"]().trim()
			return txt === expected
		}, options || actual + " should have text: " + expected)
		return this
	}
	describe.it.fill = function(actual, expected, options) {
		this.waitSelector(actual, options)
		this.ok(function() {
			var node = document.body.find(actual)
			, val = node && node.val(expected)
			return val === expected
		}, options || actual + " should have value " + expected)
		return this
	}
	describe.it.click = function(actual, expected, options) {
		this.waitSelector(actual, options)
		this.ok(function() {
			var ev
			, node = document.body.find(actual)
			, attr = {
				pointerX: 0, pointerY: 0, button: 0,
				ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
				bubbles: true, cancelable: true
			}

			if (node) {
				if (node.dispatchEvent) {
					ev = document.createEvent("MouseEvents")
					ev.initMouseEvent("click", true, true, document.defaultView, attr.button,
						attr.pointerX, attr.pointerY, attr.pointerX, attr.pointerY,
						attr.ctrlKey, attr.altKey, attr.shiftKey, attr.metaKey,
						attr.button, node)
					node.dispatchEvent(ev)
				} else if (node.click) {
					node.click()
				} else if (node.fireEvent) {
					node.fireEvent("onclick")
				} else if (typeof node.onclick == "function") {
					node.onclick()
				}
			}
			return !!node
		}, options || actual + " should be clickable")
		return this
	}
	describe.it.collectCssUsage = function(options) {
		options = options || {}
		var selectors = describe.GLOBAL.selectorsUsage = {}
		, styleSheets = document.styleSheets
		, styleSheetsCount = styleSheets.length
		, ignoreFiles = options.ignoreFiles
		, ignoreSelectors = options.ignoreSelectors
		, cleanSelectorRe = /:(?:focus|active|hover|unknown|:[-\w]+)\b/g

		while (styleSheetsCount--) {
			parseStyleSheet(styleSheets[styleSheetsCount])
		}

		function parseStyleSheet(styleSheet) {
			var rule
			, rules = styleSheet.cssRules || styleSheet.rules
			, rulesCount = rules.length
			, fileName = styleSheet.href

			// In IE7 fileName already is relative
			if (/^\w+:\/\//.test(fileName)) {
				fileName = relative(location.href.replace(/\/[^\/]*$/, ""), styleSheet.href||"")
			}

			if (ignoreFiles && ignoreFiles.indexOf(fileName) > -1) return

			// IE 8
			if (styleSheet.imports) {
				for (var i = styleSheet.imports.length; i--; ) {
					parseStyleSheet(styleSheet.imports[i])
				}
			}

			while (rulesCount--) {
				rule = rules[rulesCount]
				if (rule.styleSheet) {
					parseStyleSheet(rule.styleSheet)
				} else if (rule.selectorText) {
					rule.selectorText.split(/\s*,\s*/).each(function(sel) {
						sel = sel.replace(cleanSelectorRe, "").toLowerCase()
						if (!sel || ignoreSelectors && ignoreSelectors.indexOf(sel) > -1) {
							return
						}
						selectors[sel] = selectors[sel] || {files: [], count: 0}
						if (selectors[sel].files.indexOf(fileName + ":" + rulesCount) == -1) {
							selectors[sel].files.unshift(fileName + ":" + rulesCount)
						}
					})
				} else {
					//console.log("bad rule", rule)
				}
			}
		}
		View.on("show", count)
		View.on("ping", count)
		function count() {
			var sel
			, arr = Object.keys(selectors)
			, len = arr.length

			while (sel = arr[--len]) {
				selectors[sel].count += document.body.findAll.call(document.documentElement, sel).length
			}
		}
		return this
	}

	describe.it.assertCssUsage = function(options) {
		options = options || {}
		var assert = this.test(options.message || "it should use all css rules")

		var sel
		, selectors = describe.GLOBAL.selectorsUsage
		, arr = Object.keys(selectors)
		, len = arr.length

		assert.plan(len)
		assert.options.noStack = true

		while (sel = arr[--len]) {
			assert.ok(selectors[sel].count, "Unused rule '" + sel + "' in " + selectors[sel].files)
		}
		return assert
	}

	describe.it.collectViewsUsage = function() {
		var viewsUsage = describe.GLOBAL.viewsUsage = {}

		View.on("show", function(route) {
			var view = View.views[route]

			do {
				viewsUsage[route] = viewsUsage[route] || 0
				viewsUsage[route]++
			} while (route = (view = view.parent || {}).route)
		})
		return this
	}

	describe.it.assertViewsUsage = function() {
		var assert = this.it("should use all views")
		var route
		, routes = Object.keys(View.views)
		, len = routes.length
		, viewsUsage = describe.GLOBAL.viewsUsage

		assert.plan(len)
		assert.options.noStack = true

		while (route = routes[--len]) {
			assert.ok(viewsUsage[route], "Unused view " + route)
		}
		return assert
	}

	function clear(path) {
		if (typeof path != "string") {
			throw new TypeError("Path must be a string. Received " + typeof path)
		}
		return path.replace(/\/+$/, "")
	}
	var normalizeRe = /^\.\/|(?:^\/\.\.|\/)(\/)|\/(?:[^\/]*\/\.)?\.(\/|$)/

	function normalize(path) {
		for (; path != (path = path.replace(normalizeRe, "$1$2")); );
		return path
	}

	function relative(from, to) {
		from = normalize(clear(from))
		to = normalize(clear(to))

		if (from === to) return ""

		from = from.split("/")
		to = to.split("/")

		for (var i = common = from.length; i--; ) {
			if (from[i] !== to[i]) common = i
			from[i] = ".."
		}

		return from.slice(common).concat(to.slice(common)).join("/")
	}

	function isVisible(node) {
		var style = window.getComputedStyle ? window.getComputedStyle(node, null) : node.currentStyle
	}

	describe.it.isVisible = function(actual, expected, options) {
		var node = actual
		, visible = node.offsetHeight != 0
	}

}(describe)

