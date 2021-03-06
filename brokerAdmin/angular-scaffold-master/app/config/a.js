! function(e, t) {
	function n(e) {
		var t = e.length,
			n = ct.type(e);
		return ct.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
	}

	function i(e) {
		var t = kt[e] = {};
		return ct.each(e.match(pt) || [], function(e, n) {
			t[n] = !0
		}), t
	}

	function r(e, n, i, r) {
		if (ct.acceptData(e)) {
			var o, a, s = ct.expando,
				l = e.nodeType,
				u = l ? ct.cache : e,
				c = l ? e[s] : e[s] && s;
			if (c && u[c] && (r || u[c].data) || i !== t || "string" != typeof n) return c || (c = l ? e[s] = tt.pop() || ct.guid++ : s), u[c] || (u[c] = l ? {} : {
				toJSON: ct.noop
			}), ("object" == typeof n || "function" == typeof n) && (r ? u[c] = ct.extend(u[c], n) : u[c].data = ct.extend(u[c].data, n)), a = u[c], r || (a.data || (a.data = {}), a = a.data), i !== t && (a[ct.camelCase(n)] = i), "string" == typeof n ? (o = a[n], null == o && (o = a[ct.camelCase(n)])) : o = a, o
		}
	}

	function o(e, t, n) {
		if (ct.acceptData(e)) {
			var i, r, o = e.nodeType,
				a = o ? ct.cache : e,
				l = o ? e[ct.expando] : ct.expando;
			if (a[l]) {
				if (t && (i = n ? a[l] : a[l].data)) {
					ct.isArray(t) ? t = t.concat(ct.map(t, ct.camelCase)) : t in i ? t = [t] : (t = ct.camelCase(t), t = t in i ? [t] : t.split(" ")), r = t.length;
					for (; r--;) delete i[t[r]];
					if (n ? !s(i) : !ct.isEmptyObject(i)) return
				}(n || (delete a[l].data, s(a[l]))) && (o ? ct.cleanData([e], !0) : ct.support.deleteExpando || a != a.window ? delete a[l] : a[l] = null)
			}
		}
	}

	function a(e, n, i) {
		if (i === t && 1 === e.nodeType) {
			var r = "data-" + n.replace(Lt, "-$1").toLowerCase();
			if (i = e.getAttribute(r), "string" == typeof i) {
				try {
					i = "true" === i ? !0 : "false" === i ? !1 : "null" === i ? null : +i + "" === i ? +i : Et.test(i) ? ct.parseJSON(i) : i
				} catch (o) {}
				ct.data(e, n, i)
			} else i = t
		}
		return i
	}

	function s(e) {
		var t;
		for (t in e)
			if (("data" !== t || !ct.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}

	function l() {
		return !0
	}

	function u() {
		return !1
	}

	function c() {
		try {
			return J.activeElement
		} catch (e) {}
	}

	function d(e, t) {
		do e = e[t]; while (e && 1 !== e.nodeType);
		return e
	}

	function p(e, t, n) {
		if (ct.isFunction(t)) return ct.grep(e, function(e, i) {
			return !!t.call(e, i, e) !== n
		});
		if (t.nodeType) return ct.grep(e, function(e) {
			return e === t !== n
		});
		if ("string" == typeof t) {
			if (Rt.test(t)) return ct.filter(t, e, n);
			t = ct.filter(t, e)
		}
		return ct.grep(e, function(e) {
			return ct.inArray(e, t) >= 0 !== n
		})
	}

	function f(e) {
		var t = Vt.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement)
			for (; t.length;) n.createElement(t.pop());
		return n
	}

	function h(e, t) {
		return ct.nodeName(e, "table") && ct.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}

	function g(e) {
		return e.type = (null !== ct.find.attr(e, "type")) + "/" + e.type, e
	}

	function m(e) {
		var t = on.exec(e.type);
		return t ? e.type = t[1] : e.removeAttribute("type"), e
	}

	function v(e, t) {
		for (var n, i = 0; null != (n = e[i]); i++) ct._data(n, "globalEval", !t || ct._data(t[i], "globalEval"))
	}

	function y(e, t) {
		if (1 === t.nodeType && ct.hasData(e)) {
			var n, i, r, o = ct._data(e),
				a = ct._data(t, o),
				s = o.events;
			if (s) {
				delete a.handle, a.events = {};
				for (n in s)
					for (i = 0, r = s[n].length; r > i; i++) ct.event.add(t, n, s[n][i])
			}
			a.data && (a.data = ct.extend({}, a.data))
		}
	}

	function w(e, t) {
		var n, i, r;
		if (1 === t.nodeType) {
			if (n = t.nodeName.toLowerCase(), !ct.support.noCloneEvent && t[ct.expando]) {
				r = ct._data(t);
				for (i in r.events) ct.removeEvent(t, i, r.handle);
				t.removeAttribute(ct.expando)
			}
			"script" === n && t.text !== e.text ? (g(t).text = e.text, m(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ct.support.html5Clone && e.innerHTML && !ct.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tn.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
		}
	}

	function b(e, n) {
		var i, r, o = 0,
			a = typeof e.getElementsByTagName !== Y ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== Y ? e.querySelectorAll(n || "*") : t;
		if (!a)
			for (a = [], i = e.childNodes || e; null != (r = i[o]); o++)!n || ct.nodeName(r, n) ? a.push(r) : ct.merge(a, b(r, n));
		return n === t || n && ct.nodeName(e, n) ? ct.merge([e], a) : a
	}

	function x(e) {
		tn.test(e.type) && (e.defaultChecked = e.checked)
	}

	function T(e, t) {
		if (t in e) return t;
		for (var n = t.charAt(0).toUpperCase() + t.slice(1), i = t, r = kn.length; r--;)
			if (t = kn[r] + n, t in e) return t;
		return i
	}

	function S(e, t) {
		return e = t || e, "none" === ct.css(e, "display") || !ct.contains(e.ownerDocument, e)
	}

	function C(e, t) {
		for (var n, i, r, o = [], a = 0, s = e.length; s > a; a++) i = e[a], i.style && (o[a] = ct._data(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && S(i) && (o[a] = ct._data(i, "olddisplay", N(i.nodeName)))) : o[a] || (r = S(i), (n && "none" !== n || !r) && ct._data(i, "olddisplay", r ? n : ct.css(i, "display"))));
		for (a = 0; s > a; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
		return e
	}

	function k(e, t, n) {
		var i = yn.exec(t);
		return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
	}

	function E(e, t, n, i, r) {
		for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += ct.css(e, n + Cn[o], !0, r)), i ? ("content" === n && (a -= ct.css(e, "padding" + Cn[o], !0, r)), "margin" !== n && (a -= ct.css(e, "border" + Cn[o] + "Width", !0, r))) : (a += ct.css(e, "padding" + Cn[o], !0, r), "padding" !== n && (a += ct.css(e, "border" + Cn[o] + "Width", !0, r)));
		return a
	}

	function L(e, t, n) {
		var i = !0,
			r = "width" === t ? e.offsetWidth : e.offsetHeight,
			o = dn(e),
			a = ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, o);
		if (0 >= r || null == r) {
			if (r = pn(e, t, o), (0 > r || null == r) && (r = e.style[t]), wn.test(r)) return r;
			i = a && (ct.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
		}
		return r + E(e, t, n || (a ? "border" : "content"), i, o) + "px"
	}

	function N(e) {
		var t = J,
			n = xn[e];
		return n || (n = M(e, t), "none" !== n && n || (cn = (cn || ct("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (cn[0].contentWindow || cn[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = M(e, t), cn.detach()), xn[e] = n), n
	}

	function M(e, t) {
		var n = ct(t.createElement(e)).appendTo(t.body),
			i = ct.css(n[0], "display");
		return n.remove(), i
	}

	function A(e, t, n, i) {
		var r;
		if (ct.isArray(t)) ct.each(t, function(t, r) {
			n || Ln.test(e) ? i(e, r) : A(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
		});
		else if (n || "object" !== ct.type(t)) i(e, t);
		else
			for (r in t) A(e + "[" + r + "]", t[r], n, i)
	}

	function D(e) {
		return function(t, n) {
			"string" != typeof t && (n = t, t = "*");
			var i, r = 0,
				o = t.toLowerCase().match(pt) || [];
			if (ct.isFunction(n))
				for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
		}
	}

	function P(e, t, n, i) {
		function r(s) {
			var l;
			return o[s] = !0, ct.each(e[s] || [], function(e, s) {
				var u = s(t, n, i);
				return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), r(u), !1)
			}), l
		}
		var o = {}, a = e === $n;
		return r(t.dataTypes[0]) || !o["*"] && r("*")
	}

	function _(e, n) {
		var i, r, o = ct.ajaxSettings.flatOptions || {};
		for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
		return i && ct.extend(!0, e, i), e
	}

	function H(e, n, i) {
		for (var r, o, a, s, l = e.contents, u = e.dataTypes;
			"*" === u[0];) u.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
		if (o)
			for (s in l)
				if (l[s] && l[s].test(o)) {
					u.unshift(s);
					break
				}
		if (u[0] in i) a = u[0];
		else {
			for (s in i) {
				if (!u[0] || e.converters[s + " " + u[0]]) {
					a = s;
					break
				}
				r || (r = s)
			}
			a = a || r
		}
		return a ? (a !== u[0] && u.unshift(a), i[a]) : void 0
	}

	function j(e, t, n, i) {
		var r, o, a, s, l, u = {}, c = e.dataTypes.slice();
		if (c[1])
			for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
		for (o = c.shift(); o;)
			if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())
				if ("*" === o) o = l;
				else
		if ("*" !== l && l !== o) {
			if (a = u[l + " " + o] || u["* " + o], !a)
				for (r in u)
					if (s = r.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
						a === !0 ? a = u[r] : u[r] !== !0 && (o = s[0], c.unshift(s[1]));
						break
					}
			if (a !== !0)
				if (a && e["throws"]) t = a(t);
				else try {
					t = a(t)
				} catch (d) {
					return {
						state: "parsererror",
						error: a ? d : "No conversion from " + l + " to " + o
					}
				}
		}
		return {
			state: "success",
			data: t
		}
	}

	function W() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}

	function F() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}

	function O() {
		return setTimeout(function() {
			Zn = t
		}), Zn = ct.now()
	}

	function I(e, t, n) {
		for (var i, r = (oi[t] || []).concat(oi["*"]), o = 0, a = r.length; a > o; o++)
			if (i = r[o].call(n, t, e)) return i
	}

	function B(e, t, n) {
		var i, r, o = 0,
			a = ri.length,
			s = ct.Deferred().always(function() {
				delete l.elem
			}),
			l = function() {
				if (r) return !1;
				for (var t = Zn || O(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, o = 1 - i, a = 0, l = u.tweens.length; l > a; a++) u.tweens[a].run(o);
				return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1)
			}, u = s.promise({
				elem: e,
				props: ct.extend({}, t),
				opts: ct.extend(!0, {
					specialEasing: {}
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: Zn || O(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var i = ct.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
					return u.tweens.push(i), i
				},
				stop: function(t) {
					var n = 0,
						i = t ? u.tweens.length : 0;
					if (r) return this;
					for (r = !0; i > n; n++) u.tweens[n].run(1);
					return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
				}
			}),
			c = u.props;
		for (z(c, u.opts.specialEasing); a > o; o++)
			if (i = ri[o].call(u, e, c, u.opts)) return i;
		return ct.map(c, I, u), ct.isFunction(u.opts.start) && u.opts.start.call(e, u), ct.fx.timer(ct.extend(l, {
			elem: e,
			anim: u,
			queue: u.opts.queue
		})), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
	}

	function z(e, t) {
		var n, i, r, o, a;
		for (n in e)
			if (i = ct.camelCase(n), r = t[i], o = e[n], ct.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = ct.cssHooks[i], a && "expand" in a) {
				o = a.expand(o), delete e[i];
				for (n in o) n in e || (e[n] = o[n], t[n] = r)
			} else t[i] = r
	}

	function R(e, t, n) {
		var i, r, o, a, s, l, u = this,
			c = {}, d = e.style,
			p = e.nodeType && S(e),
			f = ct._data(e, "fxshow");
		n.queue || (s = ct._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function() {
			s.unqueued || l()
		}), s.unqueued++, u.always(function() {
			u.always(function() {
				s.unqueued--, ct.queue(e, "fx").length || s.empty.fire()
			})
		})), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === ct.css(e, "display") && "none" === ct.css(e, "float") && (ct.support.inlineBlockNeedsLayout && "inline" !== N(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", ct.support.shrinkWrapBlocks || u.always(function() {
			d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
		}));
		for (i in t)
			if (r = t[i], ti.exec(r)) {
				if (delete t[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) continue;
				c[i] = f && f[i] || ct.style(e, i)
			}
		if (!ct.isEmptyObject(c)) {
			f ? "hidden" in f && (p = f.hidden) : f = ct._data(e, "fxshow", {}), o && (f.hidden = !p), p ? ct(e).show() : u.done(function() {
				ct(e).hide()
			}), u.done(function() {
				var t;
				ct._removeData(e, "fxshow");
				for (t in c) ct.style(e, t, c[t])
			});
			for (i in c) a = I(p ? f[i] : 0, i, u), i in f || (f[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
		}
	}

	function q(e, t, n, i, r) {
		return new q.prototype.init(e, t, n, i, r)
	}

	function $(e, t) {
		var n, i = {
				height: e
			}, r = 0;
		for (t = t ? 1 : 0; 4 > r; r += 2 - t) n = Cn[r], i["margin" + n] = i["padding" + n] = e;
		return t && (i.opacity = i.width = e), i
	}

	function G(e) {
		return ct.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
	}
	var V, X, Y = typeof t,
		U = e.location,
		J = e.document,
		K = J.documentElement,
		Q = e.jQuery,
		Z = e.$,
		et = {}, tt = [],
		nt = "1.10.2",
		it = tt.concat,
		rt = tt.push,
		ot = tt.slice,
		at = tt.indexOf,
		st = et.toString,
		lt = et.hasOwnProperty,
		ut = nt.trim,
		ct = function(e, t) {
			return new ct.fn.init(e, t, X)
		}, dt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		pt = /\S+/g,
		ft = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		ht = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		gt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		mt = /^[\],:{}\s]*$/,
		vt = /(?:^|:|,)(?:\s*\[)+/g,
		yt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		wt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		bt = /^-ms-/,
		xt = /-([\da-z])/gi,
		Tt = function(e, t) {
			return t.toUpperCase()
		}, St = function(e) {
			(J.addEventListener || "load" === e.type || "complete" === J.readyState) && (Ct(), ct.ready())
		}, Ct = function() {
			J.addEventListener ? (J.removeEventListener("DOMContentLoaded", St, !1), e.removeEventListener("load", St, !1)) : (J.detachEvent("onreadystatechange", St), e.detachEvent("onload", St))
		};
	ct.fn = ct.prototype = {
		jquery: nt,
		constructor: ct,
		init: function(e, n, i) {
			var r, o;
			if (!e) return this;
			if ("string" == typeof e) {
				if (r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ht.exec(e), !r || !r[1] && n) return !n || n.jquery ? (n || i).find(e) : this.constructor(n).find(e);
				if (r[1]) {
					if (n = n instanceof ct ? n[0] : n, ct.merge(this, ct.parseHTML(r[1], n && n.nodeType ? n.ownerDocument || n : J, !0)), gt.test(r[1]) && ct.isPlainObject(n))
						for (r in n) ct.isFunction(this[r]) ? this[r](n[r]) : this.attr(r, n[r]);
					return this
				}
				if (o = J.getElementById(r[2]), o && o.parentNode) {
					if (o.id !== r[2]) return i.find(e);
					this.length = 1, this[0] = o
				}
				return this.context = J, this.selector = e, this
			}
			return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ct.isFunction(e) ? i.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ct.makeArray(e, this))
		},
		selector: "",
		length: 0,
		toArray: function() {
			return ot.call(this)
		},
		get: function(e) {
			return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
		},
		pushStack: function(e) {
			var t = ct.merge(this.constructor(), e);
			return t.prevObject = this, t.context = this.context, t
		},
		each: function(e, t) {
			return ct.each(this, e, t)
		},
		ready: function(e) {
			return ct.ready.promise().done(e), this
		},
		slice: function() {
			return this.pushStack(ot.apply(this, arguments))
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		eq: function(e) {
			var t = this.length,
				n = +e + (0 > e ? t : 0);
			return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
		},
		map: function(e) {
			return this.pushStack(ct.map(this, function(t, n) {
				return e.call(t, n, t)
			}))
		},
		end: function() {
			return this.prevObject || this.constructor(null)
		},
		push: rt,
		sort: [].sort,
		splice: [].splice
	}, ct.fn.init.prototype = ct.fn, ct.extend = ct.fn.extend = function() {
		var e, n, i, r, o, a, s = arguments[0] || {}, l = 1,
			u = arguments.length,
			c = !1;
		for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, l = 2), "object" == typeof s || ct.isFunction(s) || (s = {}), u === l && (s = this, --l); u > l; l++)
			if (null != (o = arguments[l]))
				for (r in o) e = s[r], i = o[r], s !== i && (c && i && (ct.isPlainObject(i) || (n = ct.isArray(i))) ? (n ? (n = !1, a = e && ct.isArray(e) ? e : []) : a = e && ct.isPlainObject(e) ? e : {}, s[r] = ct.extend(c, a, i)) : i !== t && (s[r] = i));
		return s
	}, ct.extend({
		expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
		noConflict: function(t) {
			return e.$ === ct && (e.$ = Z), t && e.jQuery === ct && (e.jQuery = Q), ct
		},
		isReady: !1,
		readyWait: 1,
		holdReady: function(e) {
			e ? ct.readyWait++ : ct.ready(!0)
		},
		ready: function(e) {
			if (e === !0 ? !--ct.readyWait : !ct.isReady) {
				if (!J.body) return setTimeout(ct.ready);
				ct.isReady = !0, e !== !0 && --ct.readyWait > 0 || (V.resolveWith(J, [ct]), ct.fn.trigger && ct(J).trigger("ready").off("ready"))
			}
		},
		isFunction: function(e) {
			return "function" === ct.type(e)
		},
		isArray: Array.isArray || function(e) {
			return "array" === ct.type(e)
		},
		isWindow: function(e) {
			return null != e && e == e.window
		},
		isNumeric: function(e) {
			return !isNaN(parseFloat(e)) && isFinite(e)
		},
		type: function(e) {
			return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? et[st.call(e)] || "object" : typeof e
		},
		isPlainObject: function(e) {
			var n;
			if (!e || "object" !== ct.type(e) || e.nodeType || ct.isWindow(e)) return !1;
			try {
				if (e.constructor && !lt.call(e, "constructor") && !lt.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (i) {
				return !1
			}
			if (ct.support.ownLast)
				for (n in e) return lt.call(e, n);
			for (n in e);
			return n === t || lt.call(e, n)
		},
		isEmptyObject: function(e) {
			var t;
			for (t in e) return !1;
			return !0
		},
		error: function(e) {
			throw new Error(e)
		},
		parseHTML: function(e, t, n) {
			if (!e || "string" != typeof e) return null;
			"boolean" == typeof t && (n = t, t = !1), t = t || J;
			var i = gt.exec(e),
				r = !n && [];
			return i ? [t.createElement(i[1])] : (i = ct.buildFragment([e], t, r), r && ct(r).remove(), ct.merge([], i.childNodes))
		},
		parseJSON: function(t) {
			return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t : "string" == typeof t && (t = ct.trim(t), t && mt.test(t.replace(yt, "@").replace(wt, "]").replace(vt, ""))) ? new Function("return " + t)() : void ct.error("Invalid JSON: " + t)
		},
		parseXML: function(n) {
			var i, r;
			if (!n || "string" != typeof n) return null;
			try {
				e.DOMParser ? (r = new DOMParser, i = r.parseFromString(n, "text/xml")) : (i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(n))
			} catch (o) {
				i = t
			}
			return i && i.documentElement && !i.getElementsByTagName("parsererror").length || ct.error("Invalid XML: " + n), i
		},
		noop: function() {},
		globalEval: function(t) {
			t && ct.trim(t) && (e.execScript || function(t) {
				e.eval.call(e, t)
			})(t)
		},
		camelCase: function(e) {
			return e.replace(bt, "ms-").replace(xt, Tt)
		},
		nodeName: function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function(e, t, i) {
			var r, o = 0,
				a = e.length,
				s = n(e);
			if (i) {
				if (s)
					for (; a > o && (r = t.apply(e[o], i), r !== !1); o++);
				else
					for (o in e)
						if (r = t.apply(e[o], i), r === !1) break
			} else if (s)
				for (; a > o && (r = t.call(e[o], o, e[o]), r !== !1); o++);
			else
				for (o in e)
					if (r = t.call(e[o], o, e[o]), r === !1) break; return e
		},
		trim: ut && !ut.call("﻿ ") ? function(e) {
			return null == e ? "" : ut.call(e)
		} : function(e) {
			return null == e ? "" : (e + "").replace(ft, "")
		},
		makeArray: function(e, t) {
			var i = t || [];
			return null != e && (n(Object(e)) ? ct.merge(i, "string" == typeof e ? [e] : e) : rt.call(i, e)), i
		},
		inArray: function(e, t, n) {
			var i;
			if (t) {
				if (at) return at.call(t, e, n);
				for (i = t.length, n = n ? 0 > n ? Math.max(0, i + n) : n : 0; i > n; n++)
					if (n in t && t[n] === e) return n
			}
			return -1
		},
		merge: function(e, n) {
			var i = n.length,
				r = e.length,
				o = 0;
			if ("number" == typeof i)
				for (; i > o; o++) e[r++] = n[o];
			else
				for (; n[o] !== t;) e[r++] = n[o++];
			return e.length = r, e
		},
		grep: function(e, t, n) {
			var i, r = [],
				o = 0,
				a = e.length;
			for (n = !! n; a > o; o++) i = !! t(e[o], o), n !== i && r.push(e[o]);
			return r
		},
		map: function(e, t, i) {
			var r, o = 0,
				a = e.length,
				s = n(e),
				l = [];
			if (s)
				for (; a > o; o++) r = t(e[o], o, i), null != r && (l[l.length] = r);
			else
				for (o in e) r = t(e[o], o, i), null != r && (l[l.length] = r);
			return it.apply([], l)
		},
		guid: 1,
		proxy: function(e, n) {
			var i, r, o;
			return "string" == typeof n && (o = e[n], n = e, e = o), ct.isFunction(e) ? (i = ot.call(arguments, 2), r = function() {
				return e.apply(n || this, i.concat(ot.call(arguments)))
			}, r.guid = e.guid = e.guid || ct.guid++, r) : t
		},
		access: function(e, n, i, r, o, a, s) {
			var l = 0,
				u = e.length,
				c = null == i;
			if ("object" === ct.type(i)) {
				o = !0;
				for (l in i) ct.access(e, n, l, i[l], !0, a, s)
			} else if (r !== t && (o = !0, ct.isFunction(r) || (s = !0), c && (s ? (n.call(e, r), n = null) : (c = n, n = function(e, t, n) {
				return c.call(ct(e), n)
			})), n))
				for (; u > l; l++) n(e[l], i, s ? r : r.call(e[l], l, n(e[l], i)));
			return o ? e : c ? n.call(e) : u ? n(e[0], i) : a
		},
		now: function() {
			return (new Date).getTime()
		},
		swap: function(e, t, n, i) {
			var r, o, a = {};
			for (o in t) a[o] = e.style[o], e.style[o] = t[o];
			r = n.apply(e, i || []);
			for (o in t) e.style[o] = a[o];
			return r
		}
	}), ct.ready.promise = function(t) {
		if (!V)
			if (V = ct.Deferred(), "complete" === J.readyState) setTimeout(ct.ready);
			else
		if (J.addEventListener) J.addEventListener("DOMContentLoaded", St, !1), e.addEventListener("load", St, !1);
		else {
			J.attachEvent("onreadystatechange", St), e.attachEvent("onload", St);
			var n = !1;
			try {
				n = null == e.frameElement && J.documentElement
			} catch (i) {}
			n && n.doScroll && ! function r() {
				if (!ct.isReady) {
					try {
						n.doScroll("left")
					} catch (e) {
						return setTimeout(r, 50)
					}
					Ct(), ct.ready()
				}
			}()
		}
		return V.promise(t)
	}, ct.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
		et["[object " + t + "]"] = t.toLowerCase()
	}), X = ct(J),
	function(e, t) {
		function n(e, t, n, i) {
			var r, o, a, s, l, u, c, d, h, g;
			if ((t ? t.ownerDocument || t : B) !== P && D(t), t = t || P, n = n || [], !e || "string" != typeof e) return n;
			if (1 !== (s = t.nodeType) && 9 !== s) return [];
			if (H && !i) {
				if (r = wt.exec(e))
					if (a = r[1]) {
						if (9 === s) {
							if (o = t.getElementById(a), !o || !o.parentNode) return n;
							if (o.id === a) return n.push(o), n
						} else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && O(t, o) && o.id === a) return n.push(o), n
					} else {
						if (r[2]) return et.apply(n, t.getElementsByTagName(e)), n;
						if ((a = r[3]) && S.getElementsByClassName && t.getElementsByClassName) return et.apply(n, t.getElementsByClassName(a)), n
					}
				if (S.qsa && (!j || !j.test(e))) {
					if (d = c = I, h = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
						for (u = p(e), (c = t.getAttribute("id")) ? d = c.replace(Tt, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", l = u.length; l--;) u[l] = d + f(u[l]);
						h = ft.test(e) && t.parentNode || t, g = u.join(",")
					}
					if (g) try {
						return et.apply(n, h.querySelectorAll(g)), n
					} catch (m) {} finally {
						c || t.removeAttribute("id")
					}
				}
			}
			return x(e.replace(ut, "$1"), t, n, i)
		}

		function i() {
			function e(n, i) {
				return t.push(n += " ") > k.cacheLength && delete e[t.shift()], e[n] = i
			}
			var t = [];
			return e
		}

		function r(e) {
			return e[I] = !0, e
		}

		function o(e) {
			var t = P.createElement("div");
			try {
				return !!e(t)
			} catch (n) {
				return !1
			} finally {
				t.parentNode && t.parentNode.removeChild(t), t = null
			}
		}

		function a(e, t) {
			for (var n = e.split("|"), i = e.length; i--;) k.attrHandle[n[i]] = t
		}

		function s(e, t) {
			var n = t && e,
				i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
			if (i) return i;
			if (n)
				for (; n = n.nextSibling;)
					if (n === t) return -1;
			return e ? 1 : -1
		}

		function l(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return "input" === n && t.type === e
			}
		}

		function u(e) {
			return function(t) {
				var n = t.nodeName.toLowerCase();
				return ("input" === n || "button" === n) && t.type === e
			}
		}

		function c(e) {
			return r(function(t) {
				return t = +t, r(function(n, i) {
					for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
				})
			})
		}

		function d() {}

		function p(e, t) {
			var i, r, o, a, s, l, u, c = $[e + " "];
			if (c) return t ? 0 : c.slice(0);
			for (s = e, l = [], u = k.preFilter; s;) {
				(!i || (r = dt.exec(s))) && (r && (s = s.slice(r[0].length) || s), l.push(o = [])), i = !1, (r = pt.exec(s)) && (i = r.shift(), o.push({
					value: i,
					type: r[0].replace(ut, " ")
				}), s = s.slice(i.length));
				for (a in k.filter)!(r = vt[a].exec(s)) || u[a] && !(r = u[a](r)) || (i = r.shift(), o.push({
					value: i,
					type: a,
					matches: r
				}), s = s.slice(i.length));
				if (!i) break
			}
			return t ? s.length : s ? n.error(e) : $(e, l).slice(0)
		}

		function f(e) {
			for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
			return i
		}

		function h(e, t, n) {
			var i = t.dir,
				r = n && "parentNode" === i,
				o = R++;
			return t.first ? function(t, n, o) {
				for (; t = t[i];)
					if (1 === t.nodeType || r) return e(t, n, o)
			} : function(t, n, a) {
				var s, l, u, c = z + " " + o;
				if (a) {
					for (; t = t[i];)
						if ((1 === t.nodeType || r) && e(t, n, a)) return !0
				} else
					for (; t = t[i];)
						if (1 === t.nodeType || r)
							if (u = t[I] || (t[I] = {}), (l = u[i]) && l[0] === c) {
								if ((s = l[1]) === !0 || s === C) return s === !0
							} else if (l = u[i] = [c], l[1] = e(t, n, a) || C, l[1] === !0) return !0
			}
		}

		function g(e) {
			return e.length > 1 ? function(t, n, i) {
				for (var r = e.length; r--;)
					if (!e[r](t, n, i)) return !1;
				return !0
			} : e[0]
		}

		function m(e, t, n, i, r) {
			for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(o = e[s]) && (!n || n(o, i, r)) && (a.push(o), u && t.push(s));
			return a
		}

		function v(e, t, n, i, o, a) {
			return i && !i[I] && (i = v(i)), o && !o[I] && (o = v(o, a)), r(function(r, a, s, l) {
				var u, c, d, p = [],
					f = [],
					h = a.length,
					g = r || b(t || "*", s.nodeType ? [s] : s, []),
					v = !e || !r && t ? g : m(g, p, e, s, l),
					y = n ? o || (r ? e : h || i) ? [] : a : v;
				if (n && n(v, y, s, l), i)
					for (u = m(y, f), i(u, [], s, l), c = u.length; c--;)(d = u[c]) && (y[f[c]] = !(v[f[c]] = d));
				if (r) {
					if (o || e) {
						if (o) {
							for (u = [], c = y.length; c--;)(d = y[c]) && u.push(v[c] = d);
							o(null, y = [], u, l)
						}
						for (c = y.length; c--;)(d = y[c]) && (u = o ? nt.call(r, d) : p[c]) > -1 && (r[u] = !(a[u] = d))
					}
				} else y = m(y === a ? y.splice(h, y.length) : y), o ? o(null, a, y, l) : et.apply(a, y)
			})
		}

		function y(e) {
			for (var t, n, i, r = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, l = h(function(e) {
					return e === t
				}, a, !0), u = h(function(e) {
					return nt.call(t, e) > -1
				}, a, !0), c = [
					function(e, n, i) {
						return !o && (i || n !== M) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i))
					}
				]; r > s; s++)
				if (n = k.relative[e[s].type]) c = [h(g(c), n)];
				else {
					if (n = k.filter[e[s].type].apply(null, e[s].matches), n[I]) {
						for (i = ++s; r > i && !k.relative[e[i].type]; i++);
						return v(s > 1 && g(c), s > 1 && f(e.slice(0, s - 1).concat({
							value: " " === e[s - 2].type ? "*" : ""
						})).replace(ut, "$1"), n, i > s && y(e.slice(s, i)), r > i && y(e = e.slice(i)), r > i && f(e))
					}
					c.push(n)
				}
			return g(c)
		}

		function w(e, t) {
			var i = 0,
				o = t.length > 0,
				a = e.length > 0,
				s = function(r, s, l, u, c) {
					var d, p, f, h = [],
						g = 0,
						v = "0",
						y = r && [],
						w = null != c,
						b = M,
						x = r || a && k.find.TAG("*", c && s.parentNode || s),
						T = z += null == b ? 1 : Math.random() || .1;
					for (w && (M = s !== P && s, C = i); null != (d = x[v]); v++) {
						if (a && d) {
							for (p = 0; f = e[p++];)
								if (f(d, s, l)) {
									u.push(d);
									break
								}
							w && (z = T, C = ++i)
						}
						o && ((d = !f && d) && g--, r && y.push(d))
					}
					if (g += v, o && v !== g) {
						for (p = 0; f = t[p++];) f(y, h, s, l);
						if (r) {
							if (g > 0)
								for (; v--;) y[v] || h[v] || (h[v] = Q.call(u));
							h = m(h)
						}
						et.apply(u, h), w && !r && h.length > 0 && g + t.length > 1 && n.uniqueSort(u)
					}
					return w && (z = T, M = b), y
				};
			return o ? r(s) : s
		}

		function b(e, t, i) {
			for (var r = 0, o = t.length; o > r; r++) n(e, t[r], i);
			return i
		}

		function x(e, t, n, i) {
			var r, o, a, s, l, u = p(e);
			if (!i && 1 === u.length) {
				if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && S.getById && 9 === t.nodeType && H && k.relative[o[1].type]) {
					if (t = (k.find.ID(a.matches[0].replace(St, Ct), t) || [])[0], !t) return n;
					e = e.slice(o.shift().value.length)
				}
				for (r = vt.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !k.relative[s = a.type]);)
					if ((l = k.find[s]) && (i = l(a.matches[0].replace(St, Ct), ft.test(o[0].type) && t.parentNode || t))) {
						if (o.splice(r, 1), e = i.length && f(o), !e) return et.apply(n, i), n;
						break
					}
			}
			return N(e, u)(i, t, !H, n, ft.test(e)), n
		}
		var T, S, C, k, E, L, N, M, A, D, P, _, H, j, W, F, O, I = "sizzle" + -new Date,
			B = e.document,
			z = 0,
			R = 0,
			q = i(),
			$ = i(),
			G = i(),
			V = !1,
			X = function(e, t) {
				return e === t ? (V = !0, 0) : 0
			}, Y = typeof t,
			U = 1 << 31,
			J = {}.hasOwnProperty,
			K = [],
			Q = K.pop,
			Z = K.push,
			et = K.push,
			tt = K.slice,
			nt = K.indexOf || function(e) {
				for (var t = 0, n = this.length; n > t; t++)
					if (this[t] === e) return t;
				return -1
			}, it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			rt = "[\\x20\\t\\r\\n\\f]",
			ot = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			at = ot.replace("w", "w#"),
			st = "\\[" + rt + "*(" + ot + ")" + rt + "*(?:([*^$|!~]?=)" + rt + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + at + ")|)|)" + rt + "*\\]",
			lt = ":(" + ot + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + st.replace(3, 8) + ")*)|.*)\\)|)",
			ut = new RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"),
			dt = new RegExp("^" + rt + "*," + rt + "*"),
			pt = new RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"),
			ft = new RegExp(rt + "*[+~]"),
			ht = new RegExp("=" + rt + "*([^\\]'\"]*)" + rt + "*\\]", "g"),
			gt = new RegExp(lt),
			mt = new RegExp("^" + at + "$"),
			vt = {
				ID: new RegExp("^#(" + ot + ")"),
				CLASS: new RegExp("^\\.(" + ot + ")"),
				TAG: new RegExp("^(" + ot.replace("w", "w*") + ")"),
				ATTR: new RegExp("^" + st),
				PSEUDO: new RegExp("^" + lt),
				CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
				bool: new RegExp("^(?:" + it + ")$", "i"),
				needsContext: new RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
			}, yt = /^[^{]+\{\s*\[native \w/,
			wt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			bt = /^(?:input|select|textarea|button)$/i,
			xt = /^h\d$/i,
			Tt = /'|\\/g,
			St = new RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"),
			Ct = function(e, t, n) {
				var i = "0x" + t - 65536;
				return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
			};
		try {
			et.apply(K = tt.call(B.childNodes), B.childNodes), K[B.childNodes.length].nodeType
		} catch (kt) {
			et = {
				apply: K.length ? function(e, t) {
					Z.apply(e, tt.call(t))
				} : function(e, t) {
					for (var n = e.length, i = 0; e[n++] = t[i++];);
					e.length = n - 1
				}
			}
		}
		L = n.isXML = function(e) {
			var t = e && (e.ownerDocument || e).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		}, S = n.support = {}, D = n.setDocument = function(e) {
			var t = e ? e.ownerDocument || e : B,
				n = t.defaultView;
			return t !== P && 9 === t.nodeType && t.documentElement ? (P = t, _ = t.documentElement, H = !L(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function() {
				D()
			}), S.attributes = o(function(e) {
				return e.className = "i", !e.getAttribute("className")
			}), S.getElementsByTagName = o(function(e) {
				return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
			}), S.getElementsByClassName = o(function(e) {
				return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
			}), S.getById = o(function(e) {
				return _.appendChild(e).id = I, !t.getElementsByName || !t.getElementsByName(I).length
			}), S.getById ? (k.find.ID = function(e, t) {
				if (typeof t.getElementById !== Y && H) {
					var n = t.getElementById(e);
					return n && n.parentNode ? [n] : []
				}
			}, k.filter.ID = function(e) {
				var t = e.replace(St, Ct);
				return function(e) {
					return e.getAttribute("id") === t
				}
			}) : (delete k.find.ID, k.filter.ID = function(e) {
				var t = e.replace(St, Ct);
				return function(e) {
					var n = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
					return n && n.value === t
				}
			}), k.find.TAG = S.getElementsByTagName ? function(e, t) {
				return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
			} : function(e, t) {
				var n, i = [],
					r = 0,
					o = t.getElementsByTagName(e);
				if ("*" === e) {
					for (; n = o[r++];) 1 === n.nodeType && i.push(n);
					return i
				}
				return o
			}, k.find.CLASS = S.getElementsByClassName && function(e, t) {
				return typeof t.getElementsByClassName !== Y && H ? t.getElementsByClassName(e) : void 0
			}, W = [], j = [], (S.qsa = yt.test(t.querySelectorAll)) && (o(function(e) {
				e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || j.push("\\[" + rt + "*(?:value|" + it + ")"), e.querySelectorAll(":checked").length || j.push(":checked")
			}), o(function(e) {
				var n = t.createElement("input");
				n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && j.push("[*^$]=" + rt + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || j.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), j.push(",.*:")
			})), (S.matchesSelector = yt.test(F = _.webkitMatchesSelector || _.mozMatchesSelector || _.oMatchesSelector || _.msMatchesSelector)) && o(function(e) {
				S.disconnectedMatch = F.call(e, "div"), F.call(e, "[s!='']:x"), W.push("!=", lt)
			}), j = j.length && new RegExp(j.join("|")), W = W.length && new RegExp(W.join("|")), O = yt.test(_.contains) || _.compareDocumentPosition ? function(e, t) {
				var n = 9 === e.nodeType ? e.documentElement : e,
					i = t && t.parentNode;
				return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
			} : function(e, t) {
				if (t)
					for (; t = t.parentNode;)
						if (t === e) return !0;
				return !1
			}, X = _.compareDocumentPosition ? function(e, n) {
				if (e === n) return V = !0, 0;
				var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
				return i ? 1 & i || !S.sortDetached && n.compareDocumentPosition(e) === i ? e === t || O(B, e) ? -1 : n === t || O(B, n) ? 1 : A ? nt.call(A, e) - nt.call(A, n) : 0 : 4 & i ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
			} : function(e, n) {
				var i, r = 0,
					o = e.parentNode,
					a = n.parentNode,
					l = [e],
					u = [n];
				if (e === n) return V = !0, 0;
				if (!o || !a) return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : A ? nt.call(A, e) - nt.call(A, n) : 0;
				if (o === a) return s(e, n);
				for (i = e; i = i.parentNode;) l.unshift(i);
				for (i = n; i = i.parentNode;) u.unshift(i);
				for (; l[r] === u[r];) r++;
				return r ? s(l[r], u[r]) : l[r] === B ? -1 : u[r] === B ? 1 : 0
			}, t) : P
		}, n.matches = function(e, t) {
			return n(e, null, null, t)
		}, n.matchesSelector = function(e, t) {
			if ((e.ownerDocument || e) !== P && D(e), t = t.replace(ht, "='$1']"), !(!S.matchesSelector || !H || W && W.test(t) || j && j.test(t))) try {
				var i = F.call(e, t);
				if (i || S.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
			} catch (r) {}
			return n(t, P, null, [e]).length > 0
		}, n.contains = function(e, t) {
			return (e.ownerDocument || e) !== P && D(e), O(e, t)
		}, n.attr = function(e, n) {
			(e.ownerDocument || e) !== P && D(e);
			var i = k.attrHandle[n.toLowerCase()],
				r = i && J.call(k.attrHandle, n.toLowerCase()) ? i(e, n, !H) : t;
			return r === t ? S.attributes || !H ? e.getAttribute(n) : (r = e.getAttributeNode(n)) && r.specified ? r.value : null : r
		}, n.error = function(e) {
			throw new Error("Syntax error, unrecognized expression: " + e)
		}, n.uniqueSort = function(e) {
			var t, n = [],
				i = 0,
				r = 0;
			if (V = !S.detectDuplicates, A = !S.sortStable && e.slice(0), e.sort(X), V) {
				for (; t = e[r++];) t === e[r] && (i = n.push(r));
				for (; i--;) e.splice(n[i], 1)
			}
			return e
		}, E = n.getText = function(e) {
			var t, n = "",
				i = 0,
				r = e.nodeType;
			if (r) {
				if (1 === r || 9 === r || 11 === r) {
					if ("string" == typeof e.textContent) return e.textContent;
					for (e = e.firstChild; e; e = e.nextSibling) n += E(e)
				} else if (3 === r || 4 === r) return e.nodeValue
			} else
				for (; t = e[i]; i++) n += E(t);
			return n
		}, k = n.selectors = {
			cacheLength: 50,
			createPseudo: r,
			match: vt,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function(e) {
					return e[1] = e[1].replace(St, Ct), e[3] = (e[4] || e[5] || "").replace(St, Ct), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
				},
				CHILD: function(e) {
					return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e
				},
				PSEUDO: function(e) {
					var n, i = !e[5] && e[2];
					return vt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : i && gt.test(i) && (n = p(i, !0)) && (n = i.indexOf(")", i.length - n) - i.length) && (e[0] = e[0].slice(0, n), e[2] = i.slice(0, n)), e.slice(0, 3))
				}
			},
			filter: {
				TAG: function(e) {
					var t = e.replace(St, Ct).toLowerCase();
					return "*" === e ? function() {
						return !0
					} : function(e) {
						return e.nodeName && e.nodeName.toLowerCase() === t
					}
				},
				CLASS: function(e) {
					var t = q[e + " "];
					return t || (t = new RegExp("(^|" + rt + ")" + e + "(" + rt + "|$)")) && q(e, function(e) {
						return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
					})
				},
				ATTR: function(e, t, i) {
					return function(r) {
						var o = n.attr(r, e);
						return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === i : "!=" === t ? o !== i : "^=" === t ? i && 0 === o.indexOf(i) : "*=" === t ? i && o.indexOf(i) > -1 : "$=" === t ? i && o.slice(-i.length) === i : "~=" === t ? (" " + o + " ").indexOf(i) > -1 : "|=" === t ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
					}
				},
				CHILD: function(e, t, n, i, r) {
					var o = "nth" !== e.slice(0, 3),
						a = "last" !== e.slice(-4),
						s = "of-type" === t;
					return 1 === i && 0 === r ? function(e) {
						return !!e.parentNode
					} : function(t, n, l) {
						var u, c, d, p, f, h, g = o !== a ? "nextSibling" : "previousSibling",
							m = t.parentNode,
							v = s && t.nodeName.toLowerCase(),
							y = !l && !s;
						if (m) {
							if (o) {
								for (; g;) {
									for (d = t; d = d[g];)
										if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
									h = g = "only" === e && !h && "nextSibling"
								}
								return !0
							}
							if (h = [a ? m.firstChild : m.lastChild], a && y) {
								for (c = m[I] || (m[I] = {}), u = c[e] || [], f = u[0] === z && u[1], p = u[0] === z && u[2], d = f && m.childNodes[f]; d = ++f && d && d[g] || (p = f = 0) || h.pop();)
									if (1 === d.nodeType && ++p && d === t) {
										c[e] = [z, f, p];
										break
									}
							} else if (y && (u = (t[I] || (t[I] = {}))[e]) && u[0] === z) p = u[1];
							else
								for (;
									(d = ++f && d && d[g] || (p = f = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++p || (y && ((d[I] || (d[I] = {}))[e] = [z, p]), d !== t)););
							return p -= r, p === i || p % i === 0 && p / i >= 0
						}
					}
				},
				PSEUDO: function(e, t) {
					var i, o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
					return o[I] ? o(t) : o.length > 1 ? (i = [e, e, "", t], k.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function(e, n) {
						for (var i, r = o(e, t), a = r.length; a--;) i = nt.call(e, r[a]), e[i] = !(n[i] = r[a])
					}) : function(e) {
						return o(e, 0, i)
					}) : o
				}
			},
			pseudos: {
				not: r(function(e) {
					var t = [],
						n = [],
						i = N(e.replace(ut, "$1"));
					return i[I] ? r(function(e, t, n, r) {
						for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
					}) : function(e, r, o) {
						return t[0] = e, i(t, null, o, n), !n.pop()
					}
				}),
				has: r(function(e) {
					return function(t) {
						return n(e, t).length > 0
					}
				}),
				contains: r(function(e) {
					return function(t) {
						return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
					}
				}),
				lang: r(function(e) {
					return mt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(St, Ct).toLowerCase(),
					function(t) {
						var n;
						do
							if (n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
						return !1
					}
				}),
				target: function(t) {
					var n = e.location && e.location.hash;
					return n && n.slice(1) === t.id
				},
				root: function(e) {
					return e === _
				},
				focus: function(e) {
					return e === P.activeElement && (!P.hasFocus || P.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
				},
				enabled: function(e) {
					return e.disabled === !1
				},
				disabled: function(e) {
					return e.disabled === !0
				},
				checked: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && !! e.checked || "option" === t && !! e.selected
				},
				selected: function(e) {
					return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
				},
				empty: function(e) {
					for (e = e.firstChild; e; e = e.nextSibling)
						if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
					return !0
				},
				parent: function(e) {
					return !k.pseudos.empty(e)
				},
				header: function(e) {
					return xt.test(e.nodeName)
				},
				input: function(e) {
					return bt.test(e.nodeName)
				},
				button: function(e) {
					var t = e.nodeName.toLowerCase();
					return "input" === t && "button" === e.type || "button" === t
				},
				text: function(e) {
					var t;
					return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
				},
				first: c(function() {
					return [0]
				}),
				last: c(function(e, t) {
					return [t - 1]
				}),
				eq: c(function(e, t, n) {
					return [0 > n ? n + t : n]
				}),
				even: c(function(e, t) {
					for (var n = 0; t > n; n += 2) e.push(n);
					return e
				}),
				odd: c(function(e, t) {
					for (var n = 1; t > n; n += 2) e.push(n);
					return e
				}),
				lt: c(function(e, t, n) {
					for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
					return e
				}),
				gt: c(function(e, t, n) {
					for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
					return e
				})
			}
		}, k.pseudos.nth = k.pseudos.eq;
		for (T in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}) k.pseudos[T] = l(T);
		for (T in {
			submit: !0,
			reset: !0
		}) k.pseudos[T] = u(T);
		d.prototype = k.filters = k.pseudos, k.setFilters = new d, N = n.compile = function(e, t) {
			var n, i = [],
				r = [],
				o = G[e + " "];
			if (!o) {
				for (t || (t = p(e)), n = t.length; n--;) o = y(t[n]), o[I] ? i.push(o) : r.push(o);
				o = G(e, w(r, i))
			}
			return o
		}, S.sortStable = I.split("").sort(X).join("") === I, S.detectDuplicates = V, D(), S.sortDetached = o(function(e) {
			return 1 & e.compareDocumentPosition(P.createElement("div"))
		}), o(function(e) {
			return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
		}) || a("type|href|height|width", function(e, t, n) {
			return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
		}), S.attributes && o(function(e) {
			return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
		}) || a("value", function(e, t, n) {
			return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
		}), o(function(e) {
			return null == e.getAttribute("disabled")
		}) || a(it, function(e, t, n) {
			var i;
			return n ? void 0 : (i = e.getAttributeNode(t)) && i.specified ? i.value : e[t] === !0 ? t.toLowerCase() : null
		}), ct.find = n, ct.expr = n.selectors, ct.expr[":"] = ct.expr.pseudos, ct.unique = n.uniqueSort, ct.text = n.getText, ct.isXMLDoc = n.isXML, ct.contains = n.contains
	}(e);
	var kt = {};
	ct.Callbacks = function(e) {
		e = "string" == typeof e ? kt[e] || i(e) : ct.extend({}, e);
		var n, r, o, a, s, l, u = [],
			c = !e.once && [],
			d = function(t) {
				for (r = e.memory && t, o = !0, s = l || 0, l = 0, a = u.length, n = !0; u && a > s; s++)
					if (u[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
						r = !1;
						break
					}
				n = !1, u && (c ? c.length && d(c.shift()) : r ? u = [] : p.disable())
			}, p = {
				add: function() {
					if (u) {
						var t = u.length;
						! function i(t) {
							ct.each(t, function(t, n) {
								var r = ct.type(n);
								"function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && i(n)
							})
						}(arguments), n ? a = u.length : r && (l = t, d(r))
					}
					return this
				},
				remove: function() {
					return u && ct.each(arguments, function(e, t) {
						for (var i;
							(i = ct.inArray(t, u, i)) > -1;) u.splice(i, 1), n && (a >= i && a--, s >= i && s--)
					}), this
				},
				has: function(e) {
					return e ? ct.inArray(e, u) > -1 : !(!u || !u.length)
				},
				empty: function() {
					return u = [], a = 0, this
				},
				disable: function() {
					return u = c = r = t, this
				},
				disabled: function() {
					return !u
				},
				lock: function() {
					return c = t, r || p.disable(), this
				},
				locked: function() {
					return !c
				},
				fireWith: function(e, t) {
					return !u || o && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], n ? c.push(t) : d(t)), this
				},
				fire: function() {
					return p.fireWith(this, arguments), this
				},
				fired: function() {
					return !!o
				}
			};
		return p
	}, ct.extend({
		Deferred: function(e) {
			var t = [
				["resolve", "done", ct.Callbacks("once memory"), "resolved"],
				["reject", "fail", ct.Callbacks("once memory"), "rejected"],
				["notify", "progress", ct.Callbacks("memory")]
			],
				n = "pending",
				i = {
					state: function() {
						return n
					},
					always: function() {
						return r.done(arguments).fail(arguments), this
					},
					then: function() {
						var e = arguments;
						return ct.Deferred(function(n) {
							ct.each(t, function(t, o) {
								var a = o[0],
									s = ct.isFunction(e[t]) && e[t];
								r[o[1]](function() {
									var e = s && s.apply(this, arguments);
									e && ct.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === i ? n.promise() : this, s ? [e] : arguments)
								})
							}), e = null
						}).promise()
					},
					promise: function(e) {
						return null != e ? ct.extend(e, i) : i
					}
				}, r = {};
			return i.pipe = i.then, ct.each(t, function(e, o) {
				var a = o[2],
					s = o[3];
				i[o[1]] = a.add, s && a.add(function() {
					n = s
				}, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function() {
					return r[o[0] + "With"](this === r ? i : this, arguments), this
				}, r[o[0] + "With"] = a.fireWith
			}), i.promise(r), e && e.call(r, r), r
		},
		when: function(e) {
			var t, n, i, r = 0,
				o = ot.call(arguments),
				a = o.length,
				s = 1 !== a || e && ct.isFunction(e.promise) ? a : 0,
				l = 1 === s ? e : ct.Deferred(),
				u = function(e, n, i) {
					return function(r) {
						n[e] = this, i[e] = arguments.length > 1 ? ot.call(arguments) : r, i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
					}
				};
			if (a > 1)
				for (t = new Array(a), n = new Array(a), i = new Array(a); a > r; r++) o[r] && ct.isFunction(o[r].promise) ? o[r].promise().done(u(r, i, o)).fail(l.reject).progress(u(r, n, t)) : --s;
			return s || l.resolveWith(i, o), l.promise()
		}
	}), ct.support = function(t) {
		var n, i, r, o, a, s, l, u, c, d = J.createElement("div");
		if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*") || [], i = d.getElementsByTagName("a")[0], !i || !i.style || !n.length) return t;
		o = J.createElement("select"), s = o.appendChild(J.createElement("option")), r = d.getElementsByTagName("input")[0], i.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== d.className, t.leadingWhitespace = 3 === d.firstChild.nodeType, t.tbody = !d.getElementsByTagName("tbody").length, t.htmlSerialize = !! d.getElementsByTagName("link").length, t.style = /top/.test(i.getAttribute("style")), t.hrefNormalized = "/a" === i.getAttribute("href"), t.opacity = /^0.5/.test(i.style.opacity), t.cssFloat = !! i.style.cssFloat, t.checkOn = !! r.value, t.optSelected = s.selected, t.enctype = !! J.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== J.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, r.checked = !0, t.noCloneChecked = r.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
		try {
			delete d.test
		} catch (p) {
			t.deleteExpando = !1
		}
		r = J.createElement("input"), r.setAttribute("value", ""), t.input = "" === r.getAttribute("value"), r.value = "t", r.setAttribute("type", "radio"), t.radioValue = "t" === r.value, r.setAttribute("checked", "t"), r.setAttribute("name", "t"), a = J.createDocumentFragment(), a.appendChild(r), t.appendChecked = r.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function() {
			t.noCloneEvent = !1
		}), d.cloneNode(!0).click());
		for (c in {
			submit: !0,
			change: !0,
			focusin: !0
		}) d.setAttribute(l = "on" + c, "t"), t[c + "Bubbles"] = l in e || d.attributes[l].expando === !1;
		d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip;
		for (c in ct(t)) break;
		return t.ownLast = "0" !== c, ct(function() {
			var n, i, r, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				a = J.getElementsByTagName("body")[0];
			a && (n = J.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", r = d.getElementsByTagName("td"), r[0].style.cssText = "padding:0;margin:0;border:0;display:none", u = 0 === r[0].offsetHeight, r[0].style.display = "", r[1].style.display = "none", t.reliableHiddenOffsets = u && 0 === r[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ct.swap(a, null != a.style.zoom ? {
				zoom: 1
			} : {}, function() {
				t.boxSizing = 4 === d.offsetWidth
			}), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || {
				width: "4px"
			}).width, i = d.appendChild(J.createElement("div")), i.style.cssText = d.style.cssText = o, i.style.marginRight = i.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight)), typeof d.style.zoom !== Y && (d.innerHTML = "", d.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = d = r = i = null)
		}), n = o = a = s = i = r = null, t
	}({});
	var Et = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
		Lt = /([A-Z])/g;
	ct.extend({
		cache: {},
		noData: {
			applet: !0,
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function(e) {
			return e = e.nodeType ? ct.cache[e[ct.expando]] : e[ct.expando], !! e && !s(e)
		},
		data: function(e, t, n) {
			return r(e, t, n)
		},
		removeData: function(e, t) {
			return o(e, t)
		},
		_data: function(e, t, n) {
			return r(e, t, n, !0)
		},
		_removeData: function(e, t) {
			return o(e, t, !0)
		},
		acceptData: function(e) {
			if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
			var t = e.nodeName && ct.noData[e.nodeName.toLowerCase()];
			return !t || t !== !0 && e.getAttribute("classid") === t
		}
	}), ct.fn.extend({
		data: function(e, n) {
			var i, r, o = null,
				s = 0,
				l = this[0];
			if (e === t) {
				if (this.length && (o = ct.data(l), 1 === l.nodeType && !ct._data(l, "parsedAttrs"))) {
					for (i = l.attributes; s < i.length; s++) r = i[s].name, 0 === r.indexOf("data-") && (r = ct.camelCase(r.slice(5)), a(l, r, o[r]));
					ct._data(l, "parsedAttrs", !0)
				}
				return o
			}
			return "object" == typeof e ? this.each(function() {
				ct.data(this, e)
			}) : arguments.length > 1 ? this.each(function() {
				ct.data(this, e, n)
			}) : l ? a(l, e, ct.data(l, e)) : null
		},
		removeData: function(e) {
			return this.each(function() {
				ct.removeData(this, e)
			})
		}
	}), ct.extend({
		queue: function(e, t, n) {
			var i;
			return e ? (t = (t || "fx") + "queue", i = ct._data(e, t), n && (!i || ct.isArray(n) ? i = ct._data(e, t, ct.makeArray(n)) : i.push(n)), i || []) : void 0
		},
		dequeue: function(e, t) {
			t = t || "fx";
			var n = ct.queue(e, t),
				i = n.length,
				r = n.shift(),
				o = ct._queueHooks(e, t),
				a = function() {
					ct.dequeue(e, t)
				};
			"inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
		},
		_queueHooks: function(e, t) {
			var n = t + "queueHooks";
			return ct._data(e, n) || ct._data(e, n, {
				empty: ct.Callbacks("once memory").add(function() {
					ct._removeData(e, t + "queue"), ct._removeData(e, n)
				})
			})
		}
	}), ct.fn.extend({
		queue: function(e, n) {
			var i = 2;
			return "string" != typeof e && (n = e, e = "fx", i--), arguments.length < i ? ct.queue(this[0], e) : n === t ? this : this.each(function() {
				var t = ct.queue(this, e, n);
				ct._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ct.dequeue(this, e)
			})
		},
		dequeue: function(e) {
			return this.each(function() {
				ct.dequeue(this, e)
			})
		},
		delay: function(e, t) {
			return e = ct.fx ? ct.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
				var i = setTimeout(t, e);
				n.stop = function() {
					clearTimeout(i)
				}
			})
		},
		clearQueue: function(e) {
			return this.queue(e || "fx", [])
		},
		promise: function(e, n) {
			var i, r = 1,
				o = ct.Deferred(),
				a = this,
				s = this.length,
				l = function() {
					--r || o.resolveWith(a, [a])
				};
			for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) i = ct._data(a[s], e + "queueHooks"), i && i.empty && (r++, i.empty.add(l));
			return l(), o.promise(n)
		}
	});
	var Nt, Mt, At = /[\t\r\n\f]/g,
		Dt = /\r/g,
		Pt = /^(?:input|select|textarea|button|object)$/i,
		_t = /^(?:a|area)$/i,
		Ht = /^(?:checked|selected)$/i,
		jt = ct.support.getSetAttribute,
		Wt = ct.support.input;
	ct.fn.extend({
		attr: function(e, t) {
			return ct.access(this, ct.attr, e, t, arguments.length > 1)
		},
		removeAttr: function(e) {
			return this.each(function() {
				ct.removeAttr(this, e)
			})
		},
		prop: function(e, t) {
			return ct.access(this, ct.prop, e, t, arguments.length > 1)
		},
		removeProp: function(e) {
			return e = ct.propFix[e] || e, this.each(function() {
				try {
					this[e] = t, delete this[e]
				} catch (n) {}
			})
		},
		addClass: function(e) {
			var t, n, i, r, o, a = 0,
				s = this.length,
				l = "string" == typeof e && e;
			if (ct.isFunction(e)) return this.each(function(t) {
				ct(this).addClass(e.call(this, t, this.className))
			});
			if (l)
				for (t = (e || "").match(pt) || []; s > a; a++)
					if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : " ")) {
						for (o = 0; r = t[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
						n.className = ct.trim(i)
					}
			return this
		},
		removeClass: function(e) {
			var t, n, i, r, o, a = 0,
				s = this.length,
				l = 0 === arguments.length || "string" == typeof e && e;
			if (ct.isFunction(e)) return this.each(function(t) {
				ct(this).removeClass(e.call(this, t, this.className))
			});
			if (l)
				for (t = (e || "").match(pt) || []; s > a; a++)
					if (n = this[a], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(At, " ") : "")) {
						for (o = 0; r = t[o++];)
							for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
						n.className = e ? ct.trim(i) : ""
					}
			return this
		},
		toggleClass: function(e, t) {
			var n = typeof e;
			return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ct.isFunction(e) ? function(n) {
				ct(this).toggleClass(e.call(this, n, this.className, t), t)
			} : function() {
				if ("string" === n)
					for (var t, i = 0, r = ct(this), o = e.match(pt) || []; t = o[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
				else(n === Y || "boolean" === n) && (this.className && ct._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ct._data(this, "__className__") || "")
			})
		},
		hasClass: function(e) {
			for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
				if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(At, " ").indexOf(t) >= 0) return !0;
			return !1
		},
		val: function(e) {
			var n, i, r, o = this[0]; {
				if (arguments.length) return r = ct.isFunction(e), this.each(function(n) {
					var o;
					1 === this.nodeType && (o = r ? e.call(this, n, ct(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ct.isArray(o) && (o = ct.map(o, function(e) {
						return null == e ? "" : e + ""
					})), i = ct.valHooks[this.type] || ct.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, o, "value") !== t || (this.value = o))
				});
				if (o) return i = ct.valHooks[o.type] || ct.valHooks[o.nodeName.toLowerCase()], i && "get" in i && (n = i.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(Dt, "") : null == n ? "" : n)
			}
		}
	}), ct.extend({
		valHooks: {
			option: {
				get: function(e) {
					var t = ct.find.attr(e, "value");
					return null != t ? t : e.text
				}
			},
			select: {
				get: function(e) {
					for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, l = 0 > r ? s : o ? r : 0; s > l; l++)
						if (n = i[l], !(!n.selected && l !== r || (ct.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ct.nodeName(n.parentNode, "optgroup"))) {
							if (t = ct(n).val(), o) return t;
							a.push(t)
						}
					return a
				},
				set: function(e, t) {
					for (var n, i, r = e.options, o = ct.makeArray(t), a = r.length; a--;) i = r[a], (i.selected = ct.inArray(ct(i).val(), o) >= 0) && (n = !0);
					return n || (e.selectedIndex = -1), o
				}
			}
		},
		attr: function(e, n, i) {
			var r, o, a = e.nodeType;
			if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === Y ? ct.prop(e, n, i) : (1 === a && ct.isXMLDoc(e) || (n = n.toLowerCase(), r = ct.attrHooks[n] || (ct.expr.match.bool.test(n) ? Mt : Nt)), i === t ? r && "get" in r && null !== (o = r.get(e, n)) ? o : (o = ct.find.attr(e, n), null == o ? t : o) : null !== i ? r && "set" in r && (o = r.set(e, i, n)) !== t ? o : (e.setAttribute(n, i + ""), i) : void ct.removeAttr(e, n))
		},
		removeAttr: function(e, t) {
			var n, i, r = 0,
				o = t && t.match(pt);
			if (o && 1 === e.nodeType)
				for (; n = o[r++];) i = ct.propFix[n] || n, ct.expr.match.bool.test(n) ? Wt && jt || !Ht.test(n) ? e[i] = !1 : e[ct.camelCase("default-" + n)] = e[i] = !1 : ct.attr(e, n, ""), e.removeAttribute(jt ? n : i)
		},
		attrHooks: {
			type: {
				set: function(e, t) {
					if (!ct.support.radioValue && "radio" === t && ct.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			}
		},
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
		prop: function(e, n, i) {
			var r, o, a, s = e.nodeType;
			if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !ct.isXMLDoc(e), a && (n = ct.propFix[n] || n, o = ct.propHooks[n]), i !== t ? o && "set" in o && (r = o.set(e, i, n)) !== t ? r : e[n] = i : o && "get" in o && null !== (r = o.get(e, n)) ? r : e[n]
		},
		propHooks: {
			tabIndex: {
				get: function(e) {
					var t = ct.find.attr(e, "tabindex");
					return t ? parseInt(t, 10) : Pt.test(e.nodeName) || _t.test(e.nodeName) && e.href ? 0 : -1
				}
			}
		}
	}), Mt = {
		set: function(e, t, n) {
			return t === !1 ? ct.removeAttr(e, n) : Wt && jt || !Ht.test(n) ? e.setAttribute(!jt && ct.propFix[n] || n, n) : e[ct.camelCase("default-" + n)] = e[n] = !0, n
		}
	}, ct.each(ct.expr.match.bool.source.match(/\w+/g), function(e, n) {
		var i = ct.expr.attrHandle[n] || ct.find.attr;
		ct.expr.attrHandle[n] = Wt && jt || !Ht.test(n) ? function(e, n, r) {
			var o = ct.expr.attrHandle[n],
				a = r ? t : (ct.expr.attrHandle[n] = t) != i(e, n, r) ? n.toLowerCase() : null;
			return ct.expr.attrHandle[n] = o, a
		} : function(e, n, i) {
			return i ? t : e[ct.camelCase("default-" + n)] ? n.toLowerCase() : null
		}
	}), Wt && jt || (ct.attrHooks.value = {
		set: function(e, t, n) {
			return ct.nodeName(e, "input") ? void(e.defaultValue = t) : Nt && Nt.set(e, t, n)
		}
	}), jt || (Nt = {
		set: function(e, n, i) {
			var r = e.getAttributeNode(i);
			return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(i)), r.value = n += "", "value" === i || n === e.getAttribute(i) ? n : t
		}
	}, ct.expr.attrHandle.id = ct.expr.attrHandle.name = ct.expr.attrHandle.coords = function(e, n, i) {
		var r;
		return i ? t : (r = e.getAttributeNode(n)) && "" !== r.value ? r.value : null
	}, ct.valHooks.button = {
		get: function(e, n) {
			var i = e.getAttributeNode(n);
			return i && i.specified ? i.value : t
		},
		set: Nt.set
	}, ct.attrHooks.contenteditable = {
		set: function(e, t, n) {
			Nt.set(e, "" === t ? !1 : t, n)
		}
	}, ct.each(["width", "height"], function(e, t) {
		ct.attrHooks[t] = {
			set: function(e, n) {
				return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
			}
		}
	})), ct.support.hrefNormalized || ct.each(["href", "src"], function(e, t) {
		ct.propHooks[t] = {
			get: function(e) {
				return e.getAttribute(t, 4)
			}
		}
	}), ct.support.style || (ct.attrHooks.style = {
		get: function(e) {
			return e.style.cssText || t
		},
		set: function(e, t) {
			return e.style.cssText = t + ""
		}
	}), ct.support.optSelected || (ct.propHooks.selected = {
		get: function(e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	}), ct.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
		ct.propFix[this.toLowerCase()] = this
	}), ct.support.enctype || (ct.propFix.enctype = "encoding"), ct.each(["radio", "checkbox"], function() {
		ct.valHooks[this] = {
			set: function(e, t) {
				return ct.isArray(t) ? e.checked = ct.inArray(ct(e).val(), t) >= 0 : void 0
			}
		}, ct.support.checkOn || (ct.valHooks[this].get = function(e) {
			return null === e.getAttribute("value") ? "on" : e.value
		})
	});
	var Ft = /^(?:input|select|textarea)$/i,
		Ot = /^key/,
		It = /^(?:mouse|contextmenu)|click/,
		Bt = /^(?:focusinfocus|focusoutblur)$/,
		zt = /^([^.]*)(?:\.(.+)|)$/;
	ct.event = {
		global: {},
		add: function(e, n, i, r, o) {
			var a, s, l, u, c, d, p, f, h, g, m, v = ct._data(e);
			if (v) {
				for (i.handler && (u = i, i = u.handler, o = u.selector), i.guid || (i.guid = ct.guid++), (s = v.events) || (s = v.events = {}), (d = v.handle) || (d = v.handle = function(e) {
					return typeof ct === Y || e && ct.event.triggered === e.type ? t : ct.event.dispatch.apply(d.elem, arguments)
				}, d.elem = e), n = (n || "").match(pt) || [""], l = n.length; l--;) a = zt.exec(n[l]) || [], h = m = a[1], g = (a[2] || "").split(".").sort(), h && (c = ct.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = ct.event.special[h] || {}, p = ct.extend({
					type: h,
					origType: m,
					data: r,
					handler: i,
					guid: i.guid,
					selector: o,
					needsContext: o && ct.expr.match.needsContext.test(o),
					namespace: g.join(".")
				}, u), (f = s[h]) || (f = s[h] = [], f.delegateCount = 0, c.setup && c.setup.call(e, r, g, d) !== !1 || (e.addEventListener ? e.addEventListener(h, d, !1) : e.attachEvent && e.attachEvent("on" + h, d))), c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = i.guid)), o ? f.splice(f.delegateCount++, 0, p) : f.push(p), ct.event.global[h] = !0);
				e = null
			}
		},
		remove: function(e, t, n, i, r) {
			var o, a, s, l, u, c, d, p, f, h, g, m = ct.hasData(e) && ct._data(e);
			if (m && (c = m.events)) {
				for (t = (t || "").match(pt) || [""], u = t.length; u--;)
					if (s = zt.exec(t[u]) || [], f = g = s[1], h = (s[2] || "").split(".").sort(), f) {
						for (d = ct.event.special[f] || {}, f = (i ? d.delegateType : d.bindType) || f, p = c[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = p.length; o--;) a = p[o], !r && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || i && i !== a.selector && ("**" !== i || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, d.remove && d.remove.call(e, a));
						l && !p.length && (d.teardown && d.teardown.call(e, h, m.handle) !== !1 || ct.removeEvent(e, f, m.handle), delete c[f])
					} else
						for (f in c) ct.event.remove(e, f + t[u], n, i, !0);
				ct.isEmptyObject(c) && (delete m.handle, ct._removeData(e, "events"))
			}
		},
		trigger: function(n, i, r, o) {
			var a, s, l, u, c, d, p, f = [r || J],
				h = lt.call(n, "type") ? n.type : n,
				g = lt.call(n, "namespace") ? n.namespace.split(".") : [];
			if (l = d = r = r || J, 3 !== r.nodeType && 8 !== r.nodeType && !Bt.test(h + ct.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), h = g.shift(), g.sort()), s = h.indexOf(":") < 0 && "on" + h, n = n[ct.expando] ? n : new ct.Event(h, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = r), i = null == i ? [n] : ct.makeArray(i, [n]), c = ct.event.special[h] || {}, o || !c.trigger || c.trigger.apply(r, i) !== !1)) {
				if (!o && !c.noBubble && !ct.isWindow(r)) {
					for (u = c.delegateType || h, Bt.test(u + h) || (l = l.parentNode); l; l = l.parentNode) f.push(l), d = l;
					d === (r.ownerDocument || J) && f.push(d.defaultView || d.parentWindow || e)
				}
				for (p = 0;
					(l = f[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? u : c.bindType || h, a = (ct._data(l, "events") || {})[n.type] && ct._data(l, "handle"), a && a.apply(l, i), a = s && l[s], a && ct.acceptData(l) && a.apply && a.apply(l, i) === !1 && n.preventDefault();
				if (n.type = h, !o && !n.isDefaultPrevented() && (!c._default || c._default.apply(f.pop(), i) === !1) && ct.acceptData(r) && s && r[h] && !ct.isWindow(r)) {
					d = r[s], d && (r[s] = null), ct.event.triggered = h;
					try {
						r[h]()
					} catch (m) {}
					ct.event.triggered = t, d && (r[s] = d)
				}
				return n.result
			}
		},
		dispatch: function(e) {
			e = ct.event.fix(e);
			var n, i, r, o, a, s = [],
				l = ot.call(arguments),
				u = (ct._data(this, "events") || {})[e.type] || [],
				c = ct.event.special[e.type] || {};
			if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
				for (s = ct.event.handlers.call(this, e, u), n = 0;
					(o = s[n++]) && !e.isPropagationStopped();)
					for (e.currentTarget = o.elem, a = 0;
						(r = o.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, i = ((ct.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
				return c.postDispatch && c.postDispatch.call(this, e), e.result
			}
		},
		handlers: function(e, n) {
			var i, r, o, a, s = [],
				l = n.delegateCount,
				u = e.target;
			if (l && u.nodeType && (!e.button || "click" !== e.type))
				for (; u != this; u = u.parentNode || this)
					if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
						for (o = [], a = 0; l > a; a++) r = n[a], i = r.selector + " ", o[i] === t && (o[i] = r.needsContext ? ct(i, this).index(u) >= 0 : ct.find(i, this, null, [u]).length), o[i] && o.push(r);
						o.length && s.push({
							elem: u,
							handlers: o
						})
					}
			return l < n.length && s.push({
				elem: this,
				handlers: n.slice(l)
			}), s
		},
		fix: function(e) {
			if (e[ct.expando]) return e;
			var t, n, i, r = e.type,
				o = e,
				a = this.fixHooks[r];
			for (a || (this.fixHooks[r] = a = It.test(r) ? this.mouseHooks : Ot.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new ct.Event(o), t = i.length; t--;) n = i[t], e[n] = o[n];
			return e.target || (e.target = o.srcElement || J), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, a.filter ? a.filter(e, o) : e
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function(e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function(e, n) {
				var i, r, o, a = n.button,
					s = n.fromElement;
				return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || J, o = r.documentElement, i = r.body, e.pageX = n.clientX + (o && o.scrollLeft || i && i.scrollLeft || 0) - (o && o.clientLeft || i && i.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || i && i.scrollTop || 0) - (o && o.clientTop || i && i.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function() {
					if (this !== c() && this.focus) try {
						return this.focus(), !1
					} catch (e) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					return this === c() && this.blur ? (this.blur(), !1) : void 0
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function() {
					return ct.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
				},
				_default: function(e) {
					return ct.nodeName(e.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function(e) {
					e.result !== t && (e.originalEvent.returnValue = e.result)
				}
			}
		},
		simulate: function(e, t, n, i) {
			var r = ct.extend(new ct.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			i ? ct.event.trigger(r, null, t) : ct.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
		}
	}, ct.removeEvent = J.removeEventListener ? function(e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	} : function(e, t, n) {
		var i = "on" + t;
		e.detachEvent && (typeof e[i] === Y && (e[i] = null), e.detachEvent(i, n))
	}, ct.Event = function(e, t) {
		return this instanceof ct.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? l : u) : this.type = e, t && ct.extend(this, t), this.timeStamp = e && e.timeStamp || ct.now(), void(this[ct.expando] = !0)) : new ct.Event(e, t)
	}, ct.Event.prototype = {
		isDefaultPrevented: u,
		isPropagationStopped: u,
		isImmediatePropagationStopped: u,
		preventDefault: function() {
			var e = this.originalEvent;
			this.isDefaultPrevented = l, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation: function() {
			var e = this.originalEvent;
			this.isPropagationStopped = l, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = l, this.stopPropagation()
		}
	}, ct.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function(e, t) {
		ct.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function(e) {
				var n, i = this,
					r = e.relatedTarget,
					o = e.handleObj;
				return (!r || r !== i && !ct.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), ct.support.submitBubbles || (ct.event.special.submit = {
		setup: function() {
			return ct.nodeName(this, "form") ? !1 : void ct.event.add(this, "click._submit keypress._submit", function(e) {
				var n = e.target,
					i = ct.nodeName(n, "input") || ct.nodeName(n, "button") ? n.form : t;
				i && !ct._data(i, "submitBubbles") && (ct.event.add(i, "submit._submit", function(e) {
					e._submit_bubble = !0
				}), ct._data(i, "submitBubbles", !0))
			})
		},
		postDispatch: function(e) {
			e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ct.event.simulate("submit", this.parentNode, e, !0))
		},
		teardown: function() {
			return ct.nodeName(this, "form") ? !1 : void ct.event.remove(this, "._submit")
		}
	}), ct.support.changeBubbles || (ct.event.special.change = {
		setup: function() {
			return Ft.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ct.event.add(this, "propertychange._change", function(e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), ct.event.add(this, "click._change", function(e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1), ct.event.simulate("change", this, e, !0)
			})), !1) : void ct.event.add(this, "beforeactivate._change", function(e) {
				var t = e.target;
				Ft.test(t.nodeName) && !ct._data(t, "changeBubbles") && (ct.event.add(t, "change._change", function(e) {
					!this.parentNode || e.isSimulated || e.isTrigger || ct.event.simulate("change", this.parentNode, e, !0)
				}), ct._data(t, "changeBubbles", !0))
			})
		},
		handle: function(e) {
			var t = e.target;
			return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
		},
		teardown: function() {
			return ct.event.remove(this, "._change"), !Ft.test(this.nodeName)
		}
	}), ct.support.focusinBubbles || ct.each({
		focus: "focusin",
		blur: "focusout"
	}, function(e, t) {
		var n = 0,
			i = function(e) {
				ct.event.simulate(t, e.target, ct.event.fix(e), !0)
			};
		ct.event.special[t] = {
			setup: function() {
				0 === n++ && J.addEventListener(e, i, !0)
			},
			teardown: function() {
				0 === --n && J.removeEventListener(e, i, !0)
			}
		}
	}), ct.fn.extend({
		on: function(e, n, i, r, o) {
			var a, s;
			if ("object" == typeof e) {
				"string" != typeof n && (i = i || n, n = t);
				for (a in e) this.on(a, n, i, e[a], o);
				return this
			}
			if (null == i && null == r ? (r = n, i = n = t) : null == r && ("string" == typeof n ? (r = i, i = t) : (r = i, i = n, n = t)), r === !1) r = u;
			else if (!r) return this;
			return 1 === o && (s = r, r = function(e) {
				return ct().off(e), s.apply(this, arguments)
			}, r.guid = s.guid || (s.guid = ct.guid++)), this.each(function() {
				ct.event.add(this, e, r, i, n)
			})
		},
		one: function(e, t, n, i) {
			return this.on(e, t, n, i, 1)
		},
		off: function(e, n, i) {
			var r, o;
			if (e && e.preventDefault && e.handleObj) return r = e.handleObj, ct(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
			if ("object" == typeof e) {
				for (o in e) this.off(o, n, e[o]);
				return this
			}
			return (n === !1 || "function" == typeof n) && (i = n, n = t), i === !1 && (i = u), this.each(function() {
				ct.event.remove(this, e, i, n)
			})
		},
		trigger: function(e, t) {
			return this.each(function() {
				ct.event.trigger(e, t, this)
			})
		},
		triggerHandler: function(e, t) {
			var n = this[0];
			return n ? ct.event.trigger(e, t, n, !0) : void 0
		}
	});
	var Rt = /^.[^:#\[\.,]*$/,
		qt = /^(?:parents|prev(?:Until|All))/,
		$t = ct.expr.match.needsContext,
		Gt = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	ct.fn.extend({
		find: function(e) {
			var t, n = [],
				i = this,
				r = i.length;
			if ("string" != typeof e) return this.pushStack(ct(e).filter(function() {
				for (t = 0; r > t; t++)
					if (ct.contains(i[t], this)) return !0
			}));
			for (t = 0; r > t; t++) ct.find(e, i[t], n);
			return n = this.pushStack(r > 1 ? ct.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
		},
		has: function(e) {
			var t, n = ct(e, this),
				i = n.length;
			return this.filter(function() {
				for (t = 0; i > t; t++)
					if (ct.contains(this, n[t])) return !0
			})
		},
		not: function(e) {
			return this.pushStack(p(this, e || [], !0))
		},
		filter: function(e) {
			return this.pushStack(p(this, e || [], !1))
		},
		is: function(e) {
			return !!p(this, "string" == typeof e && $t.test(e) ? ct(e) : e || [], !1).length
		},
		closest: function(e, t) {
			for (var n, i = 0, r = this.length, o = [], a = $t.test(e) || "string" != typeof e ? ct(e, t || this.context) : 0; r > i; i++)
				for (n = this[i]; n && n !== t; n = n.parentNode)
					if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ct.find.matchesSelector(n, e))) {
						n = o.push(n);
						break
					}
			return this.pushStack(o.length > 1 ? ct.unique(o) : o)
		},
		index: function(e) {
			return e ? "string" == typeof e ? ct.inArray(this[0], ct(e)) : ct.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function(e, t) {
			var n = "string" == typeof e ? ct(e, t) : ct.makeArray(e && e.nodeType ? [e] : e),
				i = ct.merge(this.get(), n);
			return this.pushStack(ct.unique(i))
		},
		addBack: function(e) {
			return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
		}
	}), ct.each({
		parent: function(e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function(e) {
			return ct.dir(e, "parentNode")
		},
		parentsUntil: function(e, t, n) {
			return ct.dir(e, "parentNode", n)
		},
		next: function(e) {
			return d(e, "nextSibling")
		},
		prev: function(e) {
			return d(e, "previousSibling")
		},
		nextAll: function(e) {
			return ct.dir(e, "nextSibling")
		},
		prevAll: function(e) {
			return ct.dir(e, "previousSibling")
		},
		nextUntil: function(e, t, n) {
			return ct.dir(e, "nextSibling", n)
		},
		prevUntil: function(e, t, n) {
			return ct.dir(e, "previousSibling", n)
		},
		siblings: function(e) {
			return ct.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function(e) {
			return ct.sibling(e.firstChild)
		},
		contents: function(e) {
			return ct.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ct.merge([], e.childNodes)
		}
	}, function(e, t) {
		ct.fn[e] = function(n, i) {
			var r = ct.map(this, t, n);
			return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = ct.filter(i, r)), this.length > 1 && (Gt[e] || (r = ct.unique(r)), qt.test(e) && (r = r.reverse())), this.pushStack(r)
		}
	}), ct.extend({
		filter: function(e, t, n) {
			var i = t[0];
			return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? ct.find.matchesSelector(i, e) ? [i] : [] : ct.find.matches(e, ct.grep(t, function(e) {
				return 1 === e.nodeType
			}))
		},
		dir: function(e, n, i) {
			for (var r = [], o = e[n]; o && 9 !== o.nodeType && (i === t || 1 !== o.nodeType || !ct(o).is(i));) 1 === o.nodeType && r.push(o), o = o[n];
			return r
		},
		sibling: function(e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	var Vt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		Xt = / jQuery\d+="(?:null|\d+)"/g,
		Yt = new RegExp("<(?:" + Vt + ")[\\s/>]", "i"),
		Ut = /^\s+/,
		Jt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		Kt = /<([\w:]+)/,
		Qt = /<tbody/i,
		Zt = /<|&#?\w+;/,
		en = /<(?:script|style|link)/i,
		tn = /^(?:checkbox|radio)$/i,
		nn = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rn = /^$|\/(?:java|ecma)script/i,
		on = /^true\/(.*)/,
		an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		sn = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: ct.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
		}, ln = f(J),
		un = ln.appendChild(J.createElement("div"));
	sn.optgroup = sn.option, sn.tbody = sn.tfoot = sn.colgroup = sn.caption = sn.thead, sn.th = sn.td, ct.fn.extend({
		text: function(e) {
			return ct.access(this, function(e) {
				return e === t ? ct.text(this) : this.empty().append((this[0] && this[0].ownerDocument || J).createTextNode(e))
			}, null, e, arguments.length)
		},
		append: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = h(this, e);
					t.appendChild(e)
				}
			})
		},
		prepend: function() {
			return this.domManip(arguments, function(e) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = h(this, e);
					t.insertBefore(e, t.firstChild)
				}
			})
		},
		before: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(e) {
				this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		remove: function(e, t) {
			for (var n, i = e ? ct.filter(e, this) : this, r = 0; null != (n = i[r]); r++) t || 1 !== n.nodeType || ct.cleanData(b(n)), n.parentNode && (t && ct.contains(n.ownerDocument, n) && v(b(n, "script")), n.parentNode.removeChild(n));
			return this
		},
		empty: function() {
			for (var e, t = 0; null != (e = this[t]); t++) {
				for (1 === e.nodeType && ct.cleanData(b(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
				e.options && ct.nodeName(e, "select") && (e.options.length = 0)
			}
			return this
		},
		clone: function(e, t) {
			return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
				return ct.clone(this, e, t)
			})
		},
		html: function(e) {
			return ct.access(this, function(e) {
				var n = this[0] || {}, i = 0,
					r = this.length;
				if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Xt, "") : t;
				if (!("string" != typeof e || en.test(e) || !ct.support.htmlSerialize && Yt.test(e) || !ct.support.leadingWhitespace && Ut.test(e) || sn[(Kt.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(Jt, "<$1></$2>");
					try {
						for (; r > i; i++) n = this[i] || {}, 1 === n.nodeType && (ct.cleanData(b(n, !1)), n.innerHTML = e);
						n = 0
					} catch (o) {}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function() {
			var e = ct.map(this, function(e) {
				return [e.nextSibling, e.parentNode]
			}),
				t = 0;
			return this.domManip(arguments, function(n) {
				var i = e[t++],
					r = e[t++];
				r && (i && i.parentNode !== r && (i = this.nextSibling), ct(this).remove(), r.insertBefore(n, i))
			}, !0), t ? this : this.remove()
		},
		detach: function(e) {
			return this.remove(e, !0)
		},
		domManip: function(e, t, n) {
			e = it.apply([], e);
			var i, r, o, a, s, l, u = 0,
				c = this.length,
				d = this,
				p = c - 1,
				f = e[0],
				h = ct.isFunction(f);
			if (h || !(1 >= c || "string" != typeof f || ct.support.checkClone) && nn.test(f)) return this.each(function(i) {
				var r = d.eq(i);
				h && (e[0] = f.call(this, i, r.html())), r.domManip(e, t, n)
			});
			if (c && (l = ct.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = l.firstChild, 1 === l.childNodes.length && (l = i), i)) {
				for (a = ct.map(b(l, "script"), g), o = a.length; c > u; u++) r = l, u !== p && (r = ct.clone(r, !0, !0), o && ct.merge(a, b(r, "script"))), t.call(this[u], r, u);
				if (o)
					for (s = a[a.length - 1].ownerDocument, ct.map(a, m), u = 0; o > u; u++) r = a[u], rn.test(r.type || "") && !ct._data(r, "globalEval") && ct.contains(s, r) && (r.src ? ct._evalUrl(r.src) : ct.globalEval((r.text || r.textContent || r.innerHTML || "").replace(an, "")));
				l = i = null
			}
			return this
		}
	}), ct.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function(e, t) {
		ct.fn[e] = function(e) {
			for (var n, i = 0, r = [], o = ct(e), a = o.length - 1; a >= i; i++) n = i === a ? this : this.clone(!0), ct(o[i])[t](n), rt.apply(r, n.get());
			return this.pushStack(r)
		}
	}), ct.extend({
		clone: function(e, t, n) {
			var i, r, o, a, s, l = ct.contains(e.ownerDocument, e);
			if (ct.support.html5Clone || ct.isXMLDoc(e) || !Yt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (un.innerHTML = e.outerHTML, un.removeChild(o = un.firstChild)), !(ct.support.noCloneEvent && ct.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ct.isXMLDoc(e)))
				for (i = b(o), s = b(e), a = 0; null != (r = s[a]); ++a) i[a] && w(r, i[a]);
			if (t)
				if (n)
					for (s = s || b(e), i = i || b(o), a = 0; null != (r = s[a]); a++) y(r, i[a]);
				else y(e, o);
			return i = b(o, "script"), i.length > 0 && v(i, !l && b(e, "script")), i = s = r = null, o
		},
		buildFragment: function(e, t, n, i) {
			for (var r, o, a, s, l, u, c, d = e.length, p = f(t), h = [], g = 0; d > g; g++)
				if (o = e[g], o || 0 === o)
					if ("object" === ct.type(o)) ct.merge(h, o.nodeType ? [o] : o);
					else
			if (Zt.test(o)) {
				for (s = s || p.appendChild(t.createElement("div")), l = (Kt.exec(o) || ["", ""])[1].toLowerCase(), c = sn[l] || sn._default, s.innerHTML = c[1] + o.replace(Jt, "<$1></$2>") + c[2], r = c[0]; r--;) s = s.lastChild;
				if (!ct.support.leadingWhitespace && Ut.test(o) && h.push(t.createTextNode(Ut.exec(o)[0])), !ct.support.tbody)
					for (o = "table" !== l || Qt.test(o) ? "<table>" !== c[1] || Qt.test(o) ? 0 : s : s.firstChild, r = o && o.childNodes.length; r--;) ct.nodeName(u = o.childNodes[r], "tbody") && !u.childNodes.length && o.removeChild(u);
				for (ct.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
				s = p.lastChild
			} else h.push(t.createTextNode(o));
			for (s && p.removeChild(s), ct.support.appendChecked || ct.grep(b(h, "input"), x), g = 0; o = h[g++];)
				if ((!i || -1 === ct.inArray(o, i)) && (a = ct.contains(o.ownerDocument, o), s = b(p.appendChild(o), "script"), a && v(s), n))
					for (r = 0; o = s[r++];) rn.test(o.type || "") && n.push(o);
			return s = null, p
		},
		cleanData: function(e, t) {
			for (var n, i, r, o, a = 0, s = ct.expando, l = ct.cache, u = ct.support.deleteExpando, c = ct.event.special; null != (n = e[a]); a++)
				if ((t || ct.acceptData(n)) && (r = n[s], o = r && l[r])) {
					if (o.events)
						for (i in o.events) c[i] ? ct.event.remove(n, i) : ct.removeEvent(n, i, o.handle);
					l[r] && (delete l[r], u ? delete n[s] : typeof n.removeAttribute !== Y ? n.removeAttribute(s) : n[s] = null, tt.push(r))
				}
		},
		_evalUrl: function(e) {
			return ct.ajax({
				url: e,
				type: "GET",
				dataType: "script",
				async: !1,
				global: !1,
				"throws": !0
			})
		}
	}), ct.fn.extend({
		wrapAll: function(e) {
			if (ct.isFunction(e)) return this.each(function(t) {
				ct(this).wrapAll(e.call(this, t))
			});
			if (this[0]) {
				var t = ct(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function(e) {
			return this.each(ct.isFunction(e) ? function(t) {
				ct(this).wrapInner(e.call(this, t))
			} : function() {
				var t = ct(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function(e) {
			var t = ct.isFunction(e);
			return this.each(function(n) {
				ct(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function() {
			return this.parent().each(function() {
				ct.nodeName(this, "body") || ct(this).replaceWith(this.childNodes)
			}).end()
		}
	});
	var cn, dn, pn, fn = /alpha\([^)]*\)/i,
		hn = /opacity\s*=\s*([^)]*)/,
		gn = /^(top|right|bottom|left)$/,
		mn = /^(none|table(?!-c[ea]).+)/,
		vn = /^margin/,
		yn = new RegExp("^(" + dt + ")(.*)$", "i"),
		wn = new RegExp("^(" + dt + ")(?!px)[a-z%]+$", "i"),
		bn = new RegExp("^([+-])=(" + dt + ")", "i"),
		xn = {
			BODY: "block"
		}, Tn = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		}, Sn = {
			letterSpacing: 0,
			fontWeight: 400
		}, Cn = ["Top", "Right", "Bottom", "Left"],
		kn = ["Webkit", "O", "Moz", "ms"];
	ct.fn.extend({
		css: function(e, n) {
			return ct.access(this, function(e, n, i) {
				var r, o, a = {}, s = 0;
				if (ct.isArray(n)) {
					for (o = dn(e), r = n.length; r > s; s++) a[n[s]] = ct.css(e, n[s], !1, o);
					return a
				}
				return i !== t ? ct.style(e, n, i) : ct.css(e, n)
			}, e, n, arguments.length > 1)
		},
		show: function() {
			return C(this, !0)
		},
		hide: function() {
			return C(this)
		},
		toggle: function(e) {
			return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
				S(this) ? ct(this).show() : ct(this).hide()
			})
		}
	}), ct.extend({
		cssHooks: {
			opacity: {
				get: function(e, t) {
					if (t) {
						var n = pn(e, "opacity");
						return "" === n ? "1" : n
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": ct.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function(e, n, i, r) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, a, s, l = ct.camelCase(n),
					u = e.style;
				if (n = ct.cssProps[l] || (ct.cssProps[l] = T(u, l)), s = ct.cssHooks[n] || ct.cssHooks[l], i === t) return s && "get" in s && (o = s.get(e, !1, r)) !== t ? o : u[n];
				if (a = typeof i, "string" === a && (o = bn.exec(i)) && (i = (o[1] + 1) * o[2] + parseFloat(ct.css(e, n)), a = "number"), !(null == i || "number" === a && isNaN(i) || ("number" !== a || ct.cssNumber[l] || (i += "px"), ct.support.clearCloneStyle || "" !== i || 0 !== n.indexOf("background") || (u[n] = "inherit"), s && "set" in s && (i = s.set(e, i, r)) === t))) try {
					u[n] = i
				} catch (c) {}
			}
		},
		css: function(e, n, i, r) {
			var o, a, s, l = ct.camelCase(n);
			return n = ct.cssProps[l] || (ct.cssProps[l] = T(e.style, l)), s = ct.cssHooks[n] || ct.cssHooks[l], s && "get" in s && (a = s.get(e, !0, i)), a === t && (a = pn(e, n, r)), "normal" === a && n in Sn && (a = Sn[n]), "" === i || i ? (o = parseFloat(a), i === !0 || ct.isNumeric(o) ? o || 0 : a) : a
		}
	}), e.getComputedStyle ? (dn = function(t) {
		return e.getComputedStyle(t, null)
	}, pn = function(e, n, i) {
		var r, o, a, s = i || dn(e),
			l = s ? s.getPropertyValue(n) || s[n] : t,
			u = e.style;
		return s && ("" !== l || ct.contains(e.ownerDocument, e) || (l = ct.style(e, n)), wn.test(l) && vn.test(n) && (r = u.width, o = u.minWidth, a = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = s.width, u.width = r, u.minWidth = o, u.maxWidth = a)), l
	}) : J.documentElement.currentStyle && (dn = function(e) {
		return e.currentStyle
	}, pn = function(e, n, i) {
		var r, o, a, s = i || dn(e),
			l = s ? s[n] : t,
			u = e.style;
		return null == l && u && u[n] && (l = u[n]), wn.test(l) && !gn.test(n) && (r = u.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em" : l, l = u.pixelLeft + "px", u.left = r, a && (o.left = a)), "" === l ? "auto" : l
	}), ct.each(["height", "width"], function(e, t) {
		ct.cssHooks[t] = {
			get: function(e, n, i) {
				return n ? 0 === e.offsetWidth && mn.test(ct.css(e, "display")) ? ct.swap(e, Tn, function() {
					return L(e, t, i)
				}) : L(e, t, i) : void 0
			},
			set: function(e, n, i) {
				var r = i && dn(e);
				return k(e, n, i ? E(e, t, i, ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, r), r) : 0)
			}
		}
	}), ct.support.opacity || (ct.cssHooks.opacity = {
		get: function(e, t) {
			return hn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
		},
		set: function(e, t) {
			var n = e.style,
				i = e.currentStyle,
				r = ct.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				o = i && i.filter || n.filter || "";
			n.zoom = 1, (t >= 1 || "" === t) && "" === ct.trim(o.replace(fn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || i && !i.filter) || (n.filter = fn.test(o) ? o.replace(fn, r) : o + " " + r)
		}
	}), ct(function() {
		ct.support.reliableMarginRight || (ct.cssHooks.marginRight = {
			get: function(e, t) {
				return t ? ct.swap(e, {
					display: "inline-block"
				}, pn, [e, "marginRight"]) : void 0
			}
		}), !ct.support.pixelPosition && ct.fn.position && ct.each(["top", "left"], function(e, t) {
			ct.cssHooks[t] = {
				get: function(e, n) {
					return n ? (n = pn(e, t), wn.test(n) ? ct(e).position()[t] + "px" : n) : void 0
				}
			}
		})
	}), ct.expr && ct.expr.filters && (ct.expr.filters.hidden = function(e) {
		return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !ct.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ct.css(e, "display"))
	}, ct.expr.filters.visible = function(e) {
		return !ct.expr.filters.hidden(e)
	}), ct.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function(e, t) {
		ct.cssHooks[e + t] = {
			expand: function(n) {
				for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + Cn[i] + t] = o[i] || o[i - 2] || o[0];
				return r
			}
		}, vn.test(e) || (ct.cssHooks[e + t].set = k)
	});
	var En = /%20/g,
		Ln = /\[\]$/,
		Nn = /\r?\n/g,
		Mn = /^(?:submit|button|image|reset|file)$/i,
		An = /^(?:input|select|textarea|keygen)/i;
	ct.fn.extend({
		serialize: function() {
			return ct.param(this.serializeArray())
		},
		serializeArray: function() {
			return this.map(function() {
				var e = ct.prop(this, "elements");
				return e ? ct.makeArray(e) : this
			}).filter(function() {
				var e = this.type;
				return this.name && !ct(this).is(":disabled") && An.test(this.nodeName) && !Mn.test(e) && (this.checked || !tn.test(e))
			}).map(function(e, t) {
				var n = ct(this).val();
				return null == n ? null : ct.isArray(n) ? ct.map(n, function(e) {
					return {
						name: t.name,
						value: e.replace(Nn, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Nn, "\r\n")
				}
			}).get()
		}
	}), ct.param = function(e, n) {
		var i, r = [],
			o = function(e, t) {
				t = ct.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
			};
		if (n === t && (n = ct.ajaxSettings && ct.ajaxSettings.traditional), ct.isArray(e) || e.jquery && !ct.isPlainObject(e)) ct.each(e, function() {
			o(this.name, this.value)
		});
		else
			for (i in e) A(i, e[i], n, o);
		return r.join("&").replace(En, "+")
	}, ct.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
		ct.fn[t] = function(e, n) {
			return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}
	}), ct.fn.extend({
		hover: function(e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		},
		bind: function(e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function(e, t) {
			return this.off(e, null, t)
		},
		delegate: function(e, t, n, i) {
			return this.on(t, e, n, i)
		},
		undelegate: function(e, t, n) {
			return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
		}
	});
	var Dn, Pn, _n = ct.now(),
		Hn = /\?/,
		jn = /#.*$/,
		Wn = /([?&])_=[^&]*/,
		Fn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		On = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		In = /^(?:GET|HEAD)$/,
		Bn = /^\/\//,
		zn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
		Rn = ct.fn.load,
		qn = {}, $n = {}, Gn = "*/".concat("*");
	try {
		Pn = U.href
	} catch (Vn) {
		Pn = J.createElement("a"), Pn.href = "", Pn = Pn.href
	}
	Dn = zn.exec(Pn.toLowerCase()) || [], ct.fn.load = function(e, n, i) {
		if ("string" != typeof e && Rn) return Rn.apply(this, arguments);
		var r, o, a, s = this,
			l = e.indexOf(" ");
		return l >= 0 && (r = e.slice(l, e.length), e = e.slice(0, l)), ct.isFunction(n) ? (i = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ct.ajax({
			url: e,
			type: a,
			dataType: "html",
			data: n
		}).done(function(e) {
			o = arguments, s.html(r ? ct("<div>").append(ct.parseHTML(e)).find(r) : e)
		}).complete(i && function(e, t) {
			s.each(i, o || [e.responseText, t, e])
		}), this
	}, ct.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
		ct.fn[t] = function(e) {
			return this.on(t, e)
		}
	}), ct.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: Pn,
			type: "GET",
			isLocal: On.test(Dn[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Gn,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": ct.parseJSON,
				"text xml": ct.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function(e, t) {
			return t ? _(_(e, ct.ajaxSettings), t) : _(ct.ajaxSettings, e)
		},
		ajaxPrefilter: D(qn),
		ajaxTransport: D($n),
		ajax: function(e, n) {
			function i(e, n, i, r) {
				var o, d, y, w, x, S = n;
				2 !== b && (b = 2, l && clearTimeout(l), c = t, s = r || "", T.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, i && (w = H(p, T, i)), w = j(p, w, T, o), o ? (p.ifModified && (x = T.getResponseHeader("Last-Modified"), x && (ct.lastModified[a] = x), x = T.getResponseHeader("etag"), x && (ct.etag[a] = x)), 204 === e || "HEAD" === p.type ? S = "nocontent" : 304 === e ? S = "notmodified" : (S = w.state, d = w.data, y = w.error, o = !y)) : (y = S, (e || !S) && (S = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || S) + "", o ? g.resolveWith(f, [d, S, T]) : g.rejectWith(f, [T, S, y]), T.statusCode(v), v = t, u && h.trigger(o ? "ajaxSuccess" : "ajaxError", [T, p, o ? d : y]), m.fireWith(f, [T, S]), u && (h.trigger("ajaxComplete", [T, p]), --ct.active || ct.event.trigger("ajaxStop")))
			}
			"object" == typeof e && (n = e, e = t), n = n || {};
			var r, o, a, s, l, u, c, d, p = ct.ajaxSetup({}, n),
				f = p.context || p,
				h = p.context && (f.nodeType || f.jquery) ? ct(f) : ct.event,
				g = ct.Deferred(),
				m = ct.Callbacks("once memory"),
				v = p.statusCode || {}, y = {}, w = {}, b = 0,
				x = "canceled",
				T = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (2 === b) {
							if (!d)
								for (d = {}; t = Fn.exec(s);) d[t[1].toLowerCase()] = t[2];
							t = d[e.toLowerCase()]
						}
						return null == t ? null : t
					},
					getAllResponseHeaders: function() {
						return 2 === b ? s : null
					},
					setRequestHeader: function(e, t) {
						var n = e.toLowerCase();
						return b || (e = w[n] = w[n] || e, y[e] = t), this
					},
					overrideMimeType: function(e) {
						return b || (p.mimeType = e), this
					},
					statusCode: function(e) {
						var t;
						if (e)
							if (2 > b)
								for (t in e) v[t] = [v[t], e[t]];
							else T.always(e[T.status]);
						return this
					},
					abort: function(e) {
						var t = e || x;
						return c && c.abort(t), i(0, t), this
					}
				};
			if (g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, p.url = ((e || p.url || Pn) + "").replace(jn, "").replace(Bn, Dn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ct.trim(p.dataType || "*").toLowerCase().match(pt) || [""], null == p.crossDomain && (r = zn.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === Dn[1] && r[2] === Dn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Dn[3] || ("http:" === Dn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = ct.param(p.data, p.traditional)), P(qn, p, n, T), 2 === b) return T;
			u = p.global, u && 0 === ct.active++ && ct.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !In.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (Hn.test(a) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = Wn.test(a) ? a.replace(Wn, "$1_=" + _n++) : a + (Hn.test(a) ? "&" : "?") + "_=" + _n++)), p.ifModified && (ct.lastModified[a] && T.setRequestHeader("If-Modified-Since", ct.lastModified[a]), ct.etag[a] && T.setRequestHeader("If-None-Match", ct.etag[a])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType), T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Gn + "; q=0.01" : "") : p.accepts["*"]);
			for (o in p.headers) T.setRequestHeader(o, p.headers[o]);
			if (p.beforeSend && (p.beforeSend.call(f, T, p) === !1 || 2 === b)) return T.abort();
			x = "abort";
			for (o in {
				success: 1,
				error: 1,
				complete: 1
			}) T[o](p[o]);
			if (c = P($n, p, n, T)) {
				T.readyState = 1, u && h.trigger("ajaxSend", [T, p]), p.async && p.timeout > 0 && (l = setTimeout(function() {
					T.abort("timeout")
				}, p.timeout));
				try {
					b = 1, c.send(y, i)
				} catch (S) {
					if (!(2 > b)) throw S;
					i(-1, S)
				}
			} else i(-1, "No Transport");
			return T
		},
		getJSON: function(e, t, n) {
			return ct.get(e, t, n, "json")
		},
		getScript: function(e, n) {
			return ct.get(e, t, n, "script")
		}
	}), ct.each(["get", "post"], function(e, n) {
		ct[n] = function(e, i, r, o) {
			return ct.isFunction(i) && (o = o || r, r = i, i = t), ct.ajax({
				url: e,
				type: n,
				dataType: o,
				data: i,
				success: r
			})
		}
	}), ct.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function(e) {
				return ct.globalEval(e), e
			}
		}
	}), ct.ajaxPrefilter("script", function(e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), ct.ajaxTransport("script", function(e) {
		if (e.crossDomain) {
			var n, i = J.head || ct("head")[0] || J.documentElement;
			return {
				send: function(t, r) {
					n = J.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
						(t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || r(200, "success"))
					}, i.insertBefore(n, i.firstChild)
				},
				abort: function() {
					n && n.onload(t, !0)
				}
			}
		}
	});
	var Xn = [],
		Yn = /(=)\?(?=&|$)|\?\?/;
	ct.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var e = Xn.pop() || ct.expando + "_" + _n++;
			return this[e] = !0, e
		}
	}), ct.ajaxPrefilter("json jsonp", function(n, i, r) {
		var o, a, s, l = n.jsonp !== !1 && (Yn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Yn.test(n.data) && "data");
		return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ct.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Yn, "$1" + o) : n.jsonp !== !1 && (n.url += (Hn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
			return s || ct.error(o + " was not called"), s[0]
		}, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
			s = arguments
		}, r.always(function() {
			e[o] = a, n[o] && (n.jsonpCallback = i.jsonpCallback, Xn.push(o)), s && ct.isFunction(a) && a(s[0]), s = a = t
		}), "script") : void 0
	});
	var Un, Jn, Kn = 0,
		Qn = e.ActiveXObject && function() {
			var e;
			for (e in Un) Un[e](t, !0)
		};
	ct.ajaxSettings.xhr = e.ActiveXObject ? function() {
		return !this.isLocal && W() || F()
	} : W, Jn = ct.ajaxSettings.xhr(), ct.support.cors = !! Jn && "withCredentials" in Jn, Jn = ct.support.ajax = !! Jn, Jn && ct.ajaxTransport(function(n) {
		if (!n.crossDomain || ct.support.cors) {
			var i;
			return {
				send: function(r, o) {
					var a, s, l = n.xhr();
					if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields)
						for (s in n.xhrFields) l[s] = n.xhrFields[s];
					n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), n.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (s in r) l.setRequestHeader(s, r[s])
					} catch (u) {}
					l.send(n.hasContent && n.data || null), i = function(e, r) {
						var s, u, c, d;
						try {
							if (i && (r || 4 === l.readyState))
								if (i = t, a && (l.onreadystatechange = ct.noop, Qn && delete Un[a]), r) 4 !== l.readyState && l.abort();
								else {
									d = {}, s = l.status, u = l.getAllResponseHeaders(), "string" == typeof l.responseText && (d.text = l.responseText);
									try {
										c = l.statusText
									} catch (p) {
										c = ""
									}
									s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
								}
						} catch (f) {
							r || o(-1, f)
						}
						d && o(s, c, d, u)
					}, n.async ? 4 === l.readyState ? setTimeout(i) : (a = ++Kn, Qn && (Un || (Un = {}, ct(e).unload(Qn)), Un[a] = i), l.onreadystatechange = i) : i()
				},
				abort: function() {
					i && i(t, !0)
				}
			}
		}
	});
	var Zn, ei, ti = /^(?:toggle|show|hide)$/,
		ni = new RegExp("^(?:([+-])=|)(" + dt + ")([a-z%]*)$", "i"),
		ii = /queueHooks$/,
		ri = [R],
		oi = {
			"*": [
				function(e, t) {
					var n = this.createTween(e, t),
						i = n.cur(),
						r = ni.exec(t),
						o = r && r[3] || (ct.cssNumber[e] ? "" : "px"),
						a = (ct.cssNumber[e] || "px" !== o && +i) && ni.exec(ct.css(n.elem, e)),
						s = 1,
						l = 20;
					if (a && a[3] !== o) {
						o = o || a[3], r = r || [], a = +i || 1;
						do s = s || ".5", a /= s, ct.style(n.elem, e, a + o); while (s !== (s = n.cur() / i) && 1 !== s && --l)
					}
					return r && (a = n.start = +a || +i || 0, n.unit = o, n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), n
				}
			]
		};
	ct.Animation = ct.extend(B, {
		tweener: function(e, t) {
			ct.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
			for (var n, i = 0, r = e.length; r > i; i++) n = e[i], oi[n] = oi[n] || [], oi[n].unshift(t)
		},
		prefilter: function(e, t) {
			t ? ri.unshift(e) : ri.push(e)
		}
	}), ct.Tween = q, q.prototype = {
		constructor: q,
		init: function(e, t, n, i, r, o) {
			this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (ct.cssNumber[n] ? "" : "px")
		},
		cur: function() {
			var e = q.propHooks[this.prop];
			return e && e.get ? e.get(this) : q.propHooks._default.get(this)
		},
		run: function(e) {
			var t, n = q.propHooks[this.prop];
			return this.pos = t = this.options.duration ? ct.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : q.propHooks._default.set(this), this
		}
	}, q.prototype.init.prototype = q.prototype, q.propHooks = {
		_default: {
			get: function(e) {
				var t;
				return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ct.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
			},
			set: function(e) {
				ct.fx.step[e.prop] ? ct.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ct.cssProps[e.prop]] || ct.cssHooks[e.prop]) ? ct.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
			}
		}
	}, q.propHooks.scrollTop = q.propHooks.scrollLeft = {
		set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
		}
	}, ct.each(["toggle", "show", "hide"], function(e, t) {
		var n = ct.fn[t];
		ct.fn[t] = function(e, i, r) {
			return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate($(t, !0), e, i, r)
		}
	}), ct.fn.extend({
		fadeTo: function(e, t, n, i) {
			return this.filter(S).css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, i)
		},
		animate: function(e, t, n, i) {
			var r = ct.isEmptyObject(e),
				o = ct.speed(t, n, i),
				a = function() {
					var t = B(this, ct.extend({}, e), o);
					(r || ct._data(this, "finish")) && t.stop(!0)
				};
			return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
		},
		stop: function(e, n, i) {
			var r = function(e) {
				var t = e.stop;
				delete e.stop, t(i)
			};
			return "string" != typeof e && (i = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
				var t = !0,
					n = null != e && e + "queueHooks",
					o = ct.timers,
					a = ct._data(this);
				if (n) a[n] && a[n].stop && r(a[n]);
				else
					for (n in a) a[n] && a[n].stop && ii.test(n) && r(a[n]);
				for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(i), t = !1, o.splice(n, 1));
				(t || !i) && ct.dequeue(this, e)
			})
		},
		finish: function(e) {
			return e !== !1 && (e = e || "fx"), this.each(function() {
				var t, n = ct._data(this),
					i = n[e + "queue"],
					r = n[e + "queueHooks"],
					o = ct.timers,
					a = i ? i.length : 0;
				for (n.finish = !0, ct.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
				for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
				delete n.finish
			})
		}
	}), ct.each({
		slideDown: $("show"),
		slideUp: $("hide"),
		slideToggle: $("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function(e, t) {
		ct.fn[e] = function(e, n, i) {
			return this.animate(t, e, n, i)
		}
	}), ct.speed = function(e, t, n) {
		var i = e && "object" == typeof e ? ct.extend({}, e) : {
			complete: n || !n && t || ct.isFunction(e) && e,
			duration: e,
			easing: n && t || t && !ct.isFunction(t) && t
		};
		return i.duration = ct.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ct.fx.speeds ? ct.fx.speeds[i.duration] : ct.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
			ct.isFunction(i.old) && i.old.call(this), i.queue && ct.dequeue(this, i.queue)
		}, i
	}, ct.easing = {
		linear: function(e) {
			return e
		},
		swing: function(e) {
			return .5 - Math.cos(e * Math.PI) / 2
		}
	}, ct.timers = [], ct.fx = q.prototype.init, ct.fx.tick = function() {
		var e, n = ct.timers,
			i = 0;
		for (Zn = ct.now(); i < n.length; i++) e = n[i], e() || n[i] !== e || n.splice(i--, 1);
		n.length || ct.fx.stop(), Zn = t
	}, ct.fx.timer = function(e) {
		e() && ct.timers.push(e) && ct.fx.start()
	}, ct.fx.interval = 13, ct.fx.start = function() {
		ei || (ei = setInterval(ct.fx.tick, ct.fx.interval))
	}, ct.fx.stop = function() {
		clearInterval(ei), ei = null
	}, ct.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	}, ct.fx.step = {}, ct.expr && ct.expr.filters && (ct.expr.filters.animated = function(e) {
		return ct.grep(ct.timers, function(t) {
			return e === t.elem
		}).length
	}), ct.fn.offset = function(e) {
		if (arguments.length) return e === t ? this : this.each(function(t) {
			ct.offset.setOffset(this, e, t)
		});
		var n, i, r = {
				top: 0,
				left: 0
			}, o = this[0],
			a = o && o.ownerDocument;
		if (a) return n = a.documentElement, ct.contains(n, o) ? (typeof o.getBoundingClientRect !== Y && (r = o.getBoundingClientRect()), i = G(a), {
			top: r.top + (i.pageYOffset || n.scrollTop) - (n.clientTop || 0),
			left: r.left + (i.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
		}) : r
	}, ct.offset = {
		setOffset: function(e, t, n) {
			var i = ct.css(e, "position");
			"static" === i && (e.style.position = "relative");
			var r, o, a = ct(e),
				s = a.offset(),
				l = ct.css(e, "top"),
				u = ct.css(e, "left"),
				c = ("absolute" === i || "fixed" === i) && ct.inArray("auto", [l, u]) > -1,
				d = {}, p = {};
			c ? (p = a.position(), r = p.top, o = p.left) : (r = parseFloat(l) || 0, o = parseFloat(u) || 0), ct.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (d.top = t.top - s.top + r), null != t.left && (d.left = t.left - s.left + o), "using" in t ? t.using.call(e, d) : a.css(d)
		}
	}, ct.fn.extend({
		position: function() {
			if (this[0]) {
				var e, t, n = {
						top: 0,
						left: 0
					}, i = this[0];
				return "fixed" === ct.css(i, "position") ? t = i.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ct.nodeName(e[0], "html") || (n = e.offset()), n.top += ct.css(e[0], "borderTopWidth", !0), n.left += ct.css(e[0], "borderLeftWidth", !0)), {
					top: t.top - n.top - ct.css(i, "marginTop", !0),
					left: t.left - n.left - ct.css(i, "marginLeft", !0)
				}
			}
		},
		offsetParent: function() {
			return this.map(function() {
				for (var e = this.offsetParent || K; e && !ct.nodeName(e, "html") && "static" === ct.css(e, "position");) e = e.offsetParent;
				return e || K
			})
		}
	}), ct.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function(e, n) {
		var i = /Y/.test(n);
		ct.fn[e] = function(r) {
			return ct.access(this, function(e, r, o) {
				var a = G(e);
				return o === t ? a ? n in a ? a[n] : a.document.documentElement[r] : e[r] : void(a ? a.scrollTo(i ? ct(a).scrollLeft() : o, i ? o : ct(a).scrollTop()) : e[r] = o)
			}, e, r, arguments.length, null)
		}
	}), ct.each({
		Height: "height",
		Width: "width"
	}, function(e, n) {
		ct.each({
			padding: "inner" + e,
			content: n,
			"": "outer" + e
		}, function(i, r) {
			ct.fn[r] = function(r, o) {
				var a = arguments.length && (i || "boolean" != typeof r),
					s = i || (r === !0 || o === !0 ? "margin" : "border");
				return ct.access(this, function(n, i, r) {
					var o;
					return ct.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : r === t ? ct.css(n, i, s) : ct.style(n, i, r, s)
				}, n, a ? r : t, a, null)
			}
		})
	}), ct.fn.size = function() {
		return this.length
	}, ct.fn.andSelf = ct.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ct : (e.jQuery = e.$ = ct, "function" == typeof define && define.amd && define("jquery", [], function() {
		return ct
	}))
}(window),
function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
	function t(e) {
		return s.raw ? e : encodeURIComponent(e)
	}

	function n(e) {
		return s.raw ? e : decodeURIComponent(e)
	}

	function i(e) {
		return t(s.json ? JSON.stringify(e) : String(e))
	}

	function r(e) {
		0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
		try {
			return e = decodeURIComponent(e.replace(a, " ")), s.json ? JSON.parse(e) : e
		} catch (t) {}
	}

	function o(t, n) {
		var i = s.raw ? t : r(t);
		return e.isFunction(n) ? n(i) : i
	}
	var a = /\+/g,
		s = e.cookie = function(r, a, l) {
			if (void 0 !== a && !e.isFunction(a)) {
				if (l = e.extend({}, s.defaults, l), "number" == typeof l.expires) {
					var u = l.expires,
						c = l.expires = new Date;
					c.setTime(+c + 864e5 * u)
				}
				return document.cookie = [t(r), "=", i(a), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
			}
			for (var d = r ? void 0 : {}, p = document.cookie ? document.cookie.split("; ") : [], f = 0, h = p.length; h > f; f++) {
				var g = p[f].split("="),
					m = n(g.shift()),
					v = g.join("=");
				if (r && r === m) {
					d = o(v, a);
					break
				}
				r || void 0 === (v = o(v)) || (d[m] = v)
			}
			return d
		};
	s.defaults = {}, e.removeCookie = function(t, n) {
		return void 0 === e.cookie(t) ? !1 : (e.cookie(t, "", e.extend({}, n, {
			expires: -1
		})), !e.cookie(t))
	}
});
var Swiper = function(e, t) {
	"use strict";

	function n(e, t) {
		return document.querySelectorAll ? (t || document).querySelectorAll(e) : jQuery(e, t)
	}

	function i(e) {
		return "[object Array]" === Object.prototype.toString.apply(e) ? !0 : !1
	}

	function r() {
		var e = D - H;
		return t.freeMode && (e = D - H), t.slidesPerView > N.slides.length && !t.centeredSlides && (e = 0), 0 > e && (e = 0), e
	}

	function o() {
		function e(e) {
			var n = new Image;
			n.onload = function() {
				"undefined" != typeof N && null !== N && (void 0 !== N.imagesLoaded && N.imagesLoaded++, N.imagesLoaded === N.imagesToLoad.length && (N.reInit(), t.onImagesReady && N.fireCallback(t.onImagesReady, N)))
			}, n.src = e
		}
		var i = N.h.addEventListener,
			r = "wrapper" === t.eventTarget ? N.wrapper : N.container;
		if (N.browser.ie10 || N.browser.ie11 ? (i(r, N.touchEvents.touchStart, g), i(document, N.touchEvents.touchMove, m), i(document, N.touchEvents.touchEnd, v)) : (N.support.touch && (i(r, "touchstart", g), i(r, "touchmove", m), i(r, "touchend", v)), t.simulateTouch && (i(r, "mousedown", g), i(document, "mousemove", m), i(document, "mouseup", v))), t.autoResize && i(window, "resize", N.resizeFix), a(), N._wheelEvent = !1, t.mousewheelControl) {
			if (void 0 !== document.onmousewheel && (N._wheelEvent = "mousewheel"), !N._wheelEvent) try {
				new WheelEvent("wheel"), N._wheelEvent = "wheel"
			} catch (o) {}
			N._wheelEvent || (N._wheelEvent = "DOMMouseScroll"), N._wheelEvent && i(N.container, N._wheelEvent, u)
		}
		if (t.keyboardControl && i(document, "keydown", l), t.updateOnImagesReady) {
			N.imagesToLoad = n("img", N.container);
			for (var s = 0; s < N.imagesToLoad.length; s++) e(N.imagesToLoad[s].getAttribute("src"))
		}
	}

	function a() {
		var e, i = N.h.addEventListener;
		if (t.preventLinks) {
			var r = n("a", N.container);
			for (e = 0; e < r.length; e++) i(r[e], "click", f)
		}
		if (t.releaseFormElements) {
			var o = n("input, textarea, select", N.container);
			for (e = 0; e < o.length; e++) i(o[e], N.touchEvents.touchStart, h, !0)
		}
		if (t.onSlideClick)
			for (e = 0; e < N.slides.length; e++) i(N.slides[e], "click", c);
		if (t.onSlideTouch)
			for (e = 0; e < N.slides.length; e++) i(N.slides[e], N.touchEvents.touchStart, d)
	}

	function s() {
		var e, i = N.h.removeEventListener;
		if (t.onSlideClick)
			for (e = 0; e < N.slides.length; e++) i(N.slides[e], "click", c);
		if (t.onSlideTouch)
			for (e = 0; e < N.slides.length; e++) i(N.slides[e], N.touchEvents.touchStart, d);
		if (t.releaseFormElements) {
			var r = n("input, textarea, select", N.container);
			for (e = 0; e < r.length; e++) i(r[e], N.touchEvents.touchStart, h, !0)
		}
		if (t.preventLinks) {
			var o = n("a", N.container);
			for (e = 0; e < o.length; e++) i(o[e], "click", f)
		}
	}

	function l(e) {
		var t = e.keyCode || e.charCode;
		if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey)) {
			if (37 === t || 39 === t || 38 === t || 40 === t) {
				for (var n = !1, i = N.h.getOffset(N.container), r = N.h.windowScroll().left, o = N.h.windowScroll().top, a = N.h.windowWidth(), s = N.h.windowHeight(), l = [
						[i.left, i.top],
						[i.left + N.width, i.top],
						[i.left, i.top + N.height],
						[i.left + N.width, i.top + N.height]
					], u = 0; u < l.length; u++) {
					var c = l[u];
					c[0] >= r && c[0] <= r + a && c[1] >= o && c[1] <= o + s && (n = !0)
				}
				if (!n) return
			}
			O ? ((37 === t || 39 === t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 39 === t && N.swipeNext(), 37 === t && N.swipePrev()) : ((38 === t || 40 === t) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && N.swipeNext(), 38 === t && N.swipePrev())
		}
	}

	function u(e) {
		var n = N._wheelEvent,
			i = 0;
		if (e.detail) i = -e.detail;
		else if ("mousewheel" === n)
			if (t.mousewheelControlForceToAxis)
				if (O) {
					if (!(Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
					i = e.wheelDeltaX
				} else {
					if (!(Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
					i = e.wheelDeltaY
				} else i = e.wheelDelta;
				else
		if ("DOMMouseScroll" === n) i = -e.detail;
		else if ("wheel" === n)
			if (t.mousewheelControlForceToAxis)
				if (O) {
					if (!(Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
					i = -e.deltaX
				} else {
					if (!(Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
					i = -e.deltaY
				} else i = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX : -e.deltaY;
		if (t.freeMode) {
			var o = N.getWrapperTranslate() + i;
			if (o > 0 && (o = 0), o < -r() && (o = -r()), N.setWrapperTransition(0), N.setWrapperTranslate(o), N.updateActiveSlide(o), 0 === o || o === -r()) return
		} else(new Date).getTime() - V > 60 && (0 > i ? N.swipeNext() : N.swipePrev()), V = (new Date).getTime();
		return t.autoplay && N.stopAutoplay(!0), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
	}

	function c(e) {
		N.allowSlideClick && (p(e), N.fireCallback(t.onSlideClick, N, e))
	}

	function d(e) {
		p(e), N.fireCallback(t.onSlideTouch, N, e)
	}

	function p(e) {
		if (e.currentTarget) N.clickedSlide = e.currentTarget;
		else {
			var n = e.srcElement;
			do {
				if (n.className.indexOf(t.slideClass) > -1) break;
				n = n.parentNode
			} while (n);
			N.clickedSlide = n
		}
		N.clickedSlideIndex = N.slides.indexOf(N.clickedSlide), N.clickedSlideLoopIndex = N.clickedSlideIndex - (N.loopedSlides || 0)
	}

	function f(e) {
		return N.allowLinks ? void 0 : (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.preventLinksPropagation && "stopPropagation" in e && e.stopPropagation(), !1)
	}

	function h(e) {
		return e.stopPropagation ? e.stopPropagation() : e.returnValue = !1, !1
	}

	function g(e) {
		if (t.preventLinks && (N.allowLinks = !0), N.isTouched || t.onlyExternal) return !1;
		var n = e.target || e.srcElement;
		document.activeElement && document.activeElement !== n && document.activeElement.blur();
		var i = "input select textarea".split(" ");
		if (t.noSwiping && n && y(n)) return !1;
		if (Q = !1, N.isTouched = !0, K = "touchstart" === e.type, !K && "which" in e && 3 === e.which) return !1;
		if (!K || 1 === e.targetTouches.length) {
			N.callPlugins("onTouchStartBegin"), !K && !N.isAndroid && i.indexOf(n.tagName.toLowerCase()) < 0 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
			var r = K ? e.targetTouches[0].pageX : e.pageX || e.clientX,
				o = K ? e.targetTouches[0].pageY : e.pageY || e.clientY;
			N.touches.startX = N.touches.currentX = r, N.touches.startY = N.touches.currentY = o, N.touches.start = N.touches.current = O ? r : o, N.setWrapperTransition(0), N.positions.start = N.positions.current = N.getWrapperTranslate(), N.setWrapperTranslate(N.positions.start), N.times.start = (new Date).getTime(), _ = void 0, t.moveStartThreshold > 0 && (Y = !1), t.onTouchStart && N.fireCallback(t.onTouchStart, N, e), N.callPlugins("onTouchStartEnd")
		}
	}

	function m(e) {
		if (N.isTouched && !t.onlyExternal && (!K || "mousemove" !== e.type)) {
			var n = K ? e.targetTouches[0].pageX : e.pageX || e.clientX,
				i = K ? e.targetTouches[0].pageY : e.pageY || e.clientY;
			if ("undefined" == typeof _ && O && (_ = !! (_ || Math.abs(i - N.touches.startY) > Math.abs(n - N.touches.startX))), "undefined" != typeof _ || O || (_ = !! (_ || Math.abs(i - N.touches.startY) < Math.abs(n - N.touches.startX))), _) return void(N.isTouched = !1);
			if (O) {
				if (!t.swipeToNext && n < N.touches.startX || !t.swipeToPrev && n > N.touches.startX) return
			} else if (!t.swipeToNext && i < N.touches.startY || !t.swipeToPrev && i > N.touches.startY) return;
			if (e.assignedToSwiper) return void(N.isTouched = !1);
			if (e.assignedToSwiper = !0, t.preventLinks && (N.allowLinks = !1), t.onSlideClick && (N.allowSlideClick = !1), t.autoplay && N.stopAutoplay(!0), !K || 1 === e.touches.length) {
				if (N.isMoved || (N.callPlugins("onTouchMoveStart"), t.loop && (N.fixLoop(), N.positions.start = N.getWrapperTranslate()), t.onTouchMoveStart && N.fireCallback(t.onTouchMoveStart, N)), N.isMoved = !0, e.preventDefault ? e.preventDefault() : e.returnValue = !1, N.touches.current = O ? n : i, N.positions.current = (N.touches.current - N.touches.start) * t.touchRatio + N.positions.start, N.positions.current > 0 && t.onResistanceBefore && N.fireCallback(t.onResistanceBefore, N, N.positions.current), N.positions.current < -r() && t.onResistanceAfter && N.fireCallback(t.onResistanceAfter, N, Math.abs(N.positions.current + r())), t.resistance && "100%" !== t.resistance) {
					var o;
					if (N.positions.current > 0 && (o = 1 - N.positions.current / H / 2, N.positions.current = .5 > o ? H / 2 : N.positions.current * o), N.positions.current < -r()) {
						var a = (N.touches.current - N.touches.start) * t.touchRatio + (r() + N.positions.start);
						o = (H + a) / H;
						var s = N.positions.current - a * (1 - o) / 2,
							l = -r() - H / 2;
						N.positions.current = l > s || 0 >= o ? l : s
					}
				}
				if (t.resistance && "100%" === t.resistance && (N.positions.current > 0 && (!t.freeMode || t.freeModeFluid) && (N.positions.current = 0), N.positions.current < -r() && (!t.freeMode || t.freeModeFluid) && (N.positions.current = -r())), !t.followFinger) return;
				if (t.moveStartThreshold)
					if (Math.abs(N.touches.current - N.touches.start) > t.moveStartThreshold || Y) {
						if (!Y) return Y = !0, void(N.touches.start = N.touches.current);
						N.setWrapperTranslate(N.positions.current)
					} else N.positions.current = N.positions.start;
					else N.setWrapperTranslate(N.positions.current);
				return (t.freeMode || t.watchActiveIndex) && N.updateActiveSlide(N.positions.current), t.grabCursor && (N.container.style.cursor = "move", N.container.style.cursor = "grabbing", N.container.style.cursor = "-moz-grabbin", N.container.style.cursor = "-webkit-grabbing"), U || (U = N.touches.current), J || (J = (new Date).getTime()), N.velocity = (N.touches.current - U) / ((new Date).getTime() - J) / 2, Math.abs(N.touches.current - U) < 2 && (N.velocity = 0), U = N.touches.current, J = (new Date).getTime(), N.callPlugins("onTouchMoveEnd"), t.onTouchMove && N.fireCallback(t.onTouchMove, N, e), !1
			}
		}
	}

	function v(e) {
		if (_ && N.swipeReset(), !t.onlyExternal && N.isTouched) {
			N.isTouched = !1, t.grabCursor && (N.container.style.cursor = "move", N.container.style.cursor = "grab", N.container.style.cursor = "-moz-grab", N.container.style.cursor = "-webkit-grab"), N.positions.current || 0 === N.positions.current || (N.positions.current = N.positions.start), t.followFinger && N.setWrapperTranslate(N.positions.current), N.times.end = (new Date).getTime(), N.touches.diff = N.touches.current - N.touches.start, N.touches.abs = Math.abs(N.touches.diff), N.positions.diff = N.positions.current - N.positions.start, N.positions.abs = Math.abs(N.positions.diff);
			var n = N.positions.diff,
				i = N.positions.abs,
				o = N.times.end - N.times.start;
			5 > i && 300 > o && N.allowLinks === !1 && (t.freeMode || 0 === i || N.swipeReset(), t.preventLinks && (N.allowLinks = !0), t.onSlideClick && (N.allowSlideClick = !0)), setTimeout(function() {
				"undefined" != typeof N && null !== N && (t.preventLinks && (N.allowLinks = !0), t.onSlideClick && (N.allowSlideClick = !0))
			}, 100);
			var a = r();
			if (!N.isMoved && t.freeMode) return N.isMoved = !1, t.onTouchEnd && N.fireCallback(t.onTouchEnd, N, e), void N.callPlugins("onTouchEnd");
			if (!N.isMoved || N.positions.current > 0 || N.positions.current < -a) return N.swipeReset(), t.onTouchEnd && N.fireCallback(t.onTouchEnd, N, e), void N.callPlugins("onTouchEnd");
			if (N.isMoved = !1, t.freeMode) {
				if (t.freeModeFluid) {
					var s, l = 1e3 * t.momentumRatio,
						u = N.velocity * l,
						c = N.positions.current + u,
						d = !1,
						p = 20 * Math.abs(N.velocity) * t.momentumBounceRatio; - a > c && (t.momentumBounce && N.support.transitions ? (-p > c + a && (c = -a - p), s = -a, d = !0, Q = !0) : c = -a), c > 0 && (t.momentumBounce && N.support.transitions ? (c > p && (c = p), s = 0, d = !0, Q = !0) : c = 0), 0 !== N.velocity && (l = Math.abs((c - N.positions.current) / N.velocity)), N.setWrapperTranslate(c), N.setWrapperTransition(l), t.momentumBounce && d && N.wrapperTransitionEnd(function() {
							Q && (t.onMomentumBounce && N.fireCallback(t.onMomentumBounce, N), N.callPlugins("onMomentumBounce"), N.setWrapperTranslate(s), N.setWrapperTransition(300))
						}), N.updateActiveSlide(c)
				}
				return (!t.freeModeFluid || o >= 300) && N.updateActiveSlide(N.positions.current), t.onTouchEnd && N.fireCallback(t.onTouchEnd, N, e), void N.callPlugins("onTouchEnd")
			}
			P = 0 > n ? "toNext" : "toPrev", "toNext" === P && 300 >= o && (30 > i || !t.shortSwipes ? N.swipeReset() : N.swipeNext(!0)), "toPrev" === P && 300 >= o && (30 > i || !t.shortSwipes ? N.swipeReset() : N.swipePrev(!0));
			var f = 0;
			if ("auto" === t.slidesPerView) {
				for (var h, g = Math.abs(N.getWrapperTranslate()), m = 0, v = 0; v < N.slides.length; v++)
					if (h = O ? N.slides[v].getWidth(!0, t.roundLengths) : N.slides[v].getHeight(!0, t.roundLengths), m += h, m > g) {
						f = h;
						break
					}
				f > H && (f = H)
			} else f = A * t.slidesPerView;
			"toNext" === P && o > 300 && (i >= f * t.longSwipesRatio ? N.swipeNext(!0) : N.swipeReset()), "toPrev" === P && o > 300 && (i >= f * t.longSwipesRatio ? N.swipePrev(!0) : N.swipeReset()), t.onTouchEnd && N.fireCallback(t.onTouchEnd, N, e), N.callPlugins("onTouchEnd")
		}
	}

	function y(e) {
		var n = !1;
		do e.className.indexOf(t.noSwipingClass) > -1 && (n = !0), e = e.parentElement; while (!n && e.parentElement && -1 === e.className.indexOf(t.wrapperClass));
		return !n && e.className.indexOf(t.wrapperClass) > -1 && e.className.indexOf(t.noSwipingClass) > -1 && (n = !0), n
	}

	function w(e, t) {
		var n, i = document.createElement("div");
		return i.innerHTML = t, n = i.firstChild, n.className += " " + e, n.outerHTML
	}

	function b(e, n, i) {
		function r() {
			var o = +new Date,
				d = o - a;
			s += l * d / (1e3 / 60), c = "toNext" === u ? s > e : e > s, c ? (N.setWrapperTranslate(Math.ceil(s)), N._DOMAnimating = !0, window.setTimeout(function() {
				r()
			}, 1e3 / 60)) : (t.onSlideChangeEnd && ("to" === n ? i.runCallbacks === !0 && N.fireCallback(t.onSlideChangeEnd, N, u) : N.fireCallback(t.onSlideChangeEnd, N, u)), N.setWrapperTranslate(e), N._DOMAnimating = !1)
		}
		var o = "to" === n && i.speed >= 0 ? i.speed : t.speed,
			a = +new Date;
		if (N.support.transitions || !t.DOMAnimation) N.setWrapperTranslate(e), N.setWrapperTransition(o);
		else {
			var s = N.getWrapperTranslate(),
				l = Math.ceil((e - s) / o * (1e3 / 60)),
				u = s > e ? "toNext" : "toPrev",
				c = "toNext" === u ? s > e : e > s;
			if (N._DOMAnimating) return;
			r()
		}
		N.updateActiveSlide(e), t.onSlideNext && "next" === n && N.fireCallback(t.onSlideNext, N, e), t.onSlidePrev && "prev" === n && N.fireCallback(t.onSlidePrev, N, e), t.onSlideReset && "reset" === n && N.fireCallback(t.onSlideReset, N, e), ("next" === n || "prev" === n || "to" === n && i.runCallbacks === !0) && x(n)
	}

	function x(e) {
		if (N.callPlugins("onSlideChangeStart"), t.onSlideChangeStart)
			if (t.queueStartCallbacks && N.support.transitions) {
				if (N._queueStartCallbacks) return;
				N._queueStartCallbacks = !0, N.fireCallback(t.onSlideChangeStart, N, e), N.wrapperTransitionEnd(function() {
					N._queueStartCallbacks = !1
				})
			} else N.fireCallback(t.onSlideChangeStart, N, e);
		if (t.onSlideChangeEnd)
			if (N.support.transitions)
				if (t.queueEndCallbacks) {
					if (N._queueEndCallbacks) return;
					N._queueEndCallbacks = !0, N.wrapperTransitionEnd(function(n) {
						N.fireCallback(t.onSlideChangeEnd, n, e)
					})
				} else N.wrapperTransitionEnd(function(n) {
					N.fireCallback(t.onSlideChangeEnd, n, e)
				});
				else t.DOMAnimation || setTimeout(function() {
					N.fireCallback(t.onSlideChangeEnd, N, e)
				}, 10)
	}

	function T() {
		var e = N.paginationButtons;
		if (e)
			for (var t = 0; t < e.length; t++) N.h.removeEventListener(e[t], "click", C)
	}

	function S() {
		var e = N.paginationButtons;
		if (e)
			for (var t = 0; t < e.length; t++) N.h.addEventListener(e[t], "click", C)
	}

	function C(e) {
		for (var n, i = e.target || e.srcElement, r = N.paginationButtons, o = 0; o < r.length; o++) i === r[o] && (n = o);
		t.autoplay && N.stopAutoplay(!0), N.swipeTo(n)
	}

	function k() {
		Z = setTimeout(function() {
			t.loop ? (N.fixLoop(), N.swipeNext(!0)) : N.swipeNext(!0) || (t.autoplayStopOnLast ? (clearTimeout(Z), Z = void 0) : N.swipeTo(0)), N.wrapperTransitionEnd(function() {
				"undefined" != typeof Z && k()
			})
		}, t.autoplay)
	}

	function E() {
		N.calcSlides(), t.loader.slides.length > 0 && 0 === N.slides.length && N.loadSlides(), t.loop && N.createLoop(), N.init(), o(), t.pagination && N.createPagination(!0), t.loop || t.initialSlide > 0 ? N.swipeTo(t.initialSlide, 0, !1) : N.updateActiveSlide(0), t.autoplay && N.startAutoplay(), N.centerIndex = N.activeIndex, t.onSwiperCreated && N.fireCallback(t.onSwiperCreated, N), N.callPlugins("onSwiperCreated")
	}
	if (!document.body.outerHTML && document.body.__defineGetter__ && HTMLElement) {
		var L = HTMLElement.prototype;
		L.__defineGetter__ && L.__defineGetter__("outerHTML", function() {
			return (new XMLSerializer).serializeToString(this)
		})
	}
	if (window.getComputedStyle || (window.getComputedStyle = function(e) {
		return this.el = e, this.getPropertyValue = function(t) {
			var n = /(\-([a-z]){1})/g;
			return "float" === t && (t = "styleFloat"), n.test(t) && (t = t.replace(n, function() {
				return arguments[2].toUpperCase()
			})), e.currentStyle[t] ? e.currentStyle[t] : null
		}, this
	}), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
		for (var n = t || 0, i = this.length; i > n; n++)
			if (this[n] === e) return n;
		return -1
	}), (document.querySelectorAll || window.jQuery) && "undefined" != typeof e && (e.nodeType || 0 !== n(e).length)) {
		var N = this;
		N.touches = {
			start: 0,
			startX: 0,
			startY: 0,
			current: 0,
			currentX: 0,
			currentY: 0,
			diff: 0,
			abs: 0
		}, N.positions = {
			start: 0,
			abs: 0,
			diff: 0,
			current: 0
		}, N.times = {
			start: 0,
			end: 0
		}, N.id = (new Date).getTime(), N.container = e.nodeType ? e : n(e)[0], N.isTouched = !1, N.isMoved = !1, N.activeIndex = 0, N.centerIndex = 0, N.activeLoaderIndex = 0, N.activeLoopIndex = 0, N.previousIndex = null, N.velocity = 0, N.snapGrid = [], N.slidesGrid = [], N.imagesToLoad = [], N.imagesLoaded = 0, N.wrapperLeft = 0, N.wrapperRight = 0, N.wrapperTop = 0, N.wrapperBottom = 0, N.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") >= 0;
		var M, A, D, P, _, H, j = {
				eventTarget: "wrapper",
				mode: "horizontal",
				touchRatio: 1,
				speed: 300,
				freeMode: !1,
				freeModeFluid: !1,
				momentumRatio: 1,
				momentumBounce: !0,
				momentumBounceRatio: 1,
				slidesPerView: 1,
				slidesPerGroup: 1,
				slidesPerViewFit: !0,
				simulateTouch: !0,
				followFinger: !0,
				shortSwipes: !0,
				longSwipesRatio: .5,
				moveStartThreshold: !1,
				onlyExternal: !1,
				createPagination: !0,
				pagination: !1,
				paginationElement: "span",
				paginationClickable: !1,
				paginationAsRange: !0,
				resistance: !0,
				scrollContainer: !1,
				preventLinks: !0,
				preventLinksPropagation: !1,
				noSwiping: !1,
				noSwipingClass: "swiper-no-swiping",
				initialSlide: 0,
				keyboardControl: !1,
				mousewheelControl: !1,
				mousewheelControlForceToAxis: !1,
				useCSS3Transforms: !0,
				autoplay: !1,
				autoplayDisableOnInteraction: !0,
				autoplayStopOnLast: !1,
				loop: !1,
				loopAdditionalSlides: 0,
				roundLengths: !1,
				calculateHeight: !1,
				cssWidthAndHeight: !1,
				updateOnImagesReady: !0,
				releaseFormElements: !0,
				watchActiveIndex: !1,
				visibilityFullFit: !1,
				offsetPxBefore: 0,
				offsetPxAfter: 0,
				offsetSlidesBefore: 0,
				offsetSlidesAfter: 0,
				centeredSlides: !1,
				queueStartCallbacks: !1,
				queueEndCallbacks: !1,
				autoResize: !0,
				resizeReInit: !1,
				DOMAnimation: !0,
				loader: {
					slides: [],
					slidesHTMLType: "inner",
					surroundGroups: 1,
					logic: "reload",
					loadAllSlides: !1
				},
				swipeToPrev: !0,
				swipeToNext: !0,
				slideElement: "div",
				slideClass: "swiper-slide",
				slideActiveClass: "swiper-slide-active",
				slideVisibleClass: "swiper-slide-visible",
				slideDuplicateClass: "swiper-slide-duplicate",
				wrapperClass: "swiper-wrapper",
				paginationElementClass: "swiper-pagination-switch",
				paginationActiveClass: "swiper-active-switch",
				paginationVisibleClass: "swiper-visible-switch"
			};
		t = t || {};
		for (var W in j)
			if (W in t && "object" == typeof t[W])
				for (var F in j[W]) F in t[W] || (t[W][F] = j[W][F]);
			else W in t || (t[W] = j[W]);
		N.params = t, t.scrollContainer && (t.freeMode = !0, t.freeModeFluid = !0), t.loop && (t.resistance = "100%");
		var O = "horizontal" === t.mode,
			I = ["mousedown", "mousemove", "mouseup"];
		N.browser.ie10 && (I = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), N.browser.ie11 && (I = ["pointerdown", "pointermove", "pointerup"]), N.touchEvents = {
			touchStart: N.support.touch || !t.simulateTouch ? "touchstart" : I[0],
			touchMove: N.support.touch || !t.simulateTouch ? "touchmove" : I[1],
			touchEnd: N.support.touch || !t.simulateTouch ? "touchend" : I[2]
		};
		for (var B = N.container.childNodes.length - 1; B >= 0; B--)
			if (N.container.childNodes[B].className)
				for (var z = N.container.childNodes[B].className.split(/\s+/), R = 0; R < z.length; R++) z[R] === t.wrapperClass && (M = N.container.childNodes[B]);
		N.wrapper = M, N._extendSwiperSlide = function(e) {
			return e.append = function() {
				return t.loop ? e.insertAfter(N.slides.length - N.loopedSlides) : (N.wrapper.appendChild(e), N.reInit()), e
			}, e.prepend = function() {
				return t.loop ? (N.wrapper.insertBefore(e, N.slides[N.loopedSlides]), N.removeLoopedSlides(), N.calcSlides(), N.createLoop()) : N.wrapper.insertBefore(e, N.wrapper.firstChild), N.reInit(), e
			}, e.insertAfter = function(n) {
				if ("undefined" == typeof n) return !1;
				var i;
				return t.loop ? (i = N.slides[n + 1 + N.loopedSlides], i ? N.wrapper.insertBefore(e, i) : N.wrapper.appendChild(e), N.removeLoopedSlides(), N.calcSlides(), N.createLoop()) : (i = N.slides[n + 1], N.wrapper.insertBefore(e, i)), N.reInit(), e
			}, e.clone = function() {
				return N._extendSwiperSlide(e.cloneNode(!0))
			}, e.remove = function() {
				N.wrapper.removeChild(e), N.reInit()
			}, e.html = function(t) {
				return "undefined" == typeof t ? e.innerHTML : (e.innerHTML = t, e)
			}, e.index = function() {
				for (var t, n = N.slides.length - 1; n >= 0; n--) e === N.slides[n] && (t = n);
				return t
			}, e.isActive = function() {
				return e.index() === N.activeIndex ? !0 : !1
			}, e.swiperSlideDataStorage || (e.swiperSlideDataStorage = {}), e.getData = function(t) {
				return e.swiperSlideDataStorage[t]
			}, e.setData = function(t, n) {
				return e.swiperSlideDataStorage[t] = n, e
			}, e.data = function(t, n) {
				return "undefined" == typeof n ? e.getAttribute("data-" + t) : (e.setAttribute("data-" + t, n), e)
			}, e.getWidth = function(t, n) {
				return N.h.getWidth(e, t, n)
			}, e.getHeight = function(t, n) {
				return N.h.getHeight(e, t, n)
			}, e.getOffset = function() {
				return N.h.getOffset(e)
			}, e
		}, N.calcSlides = function(e) {
			var n = N.slides ? N.slides.length : !1;
			N.slides = [], N.displaySlides = [];
			for (var i = 0; i < N.wrapper.childNodes.length; i++)
				if (N.wrapper.childNodes[i].className)
					for (var r = N.wrapper.childNodes[i].className, o = r.split(/\s+/), l = 0; l < o.length; l++) o[l] === t.slideClass && N.slides.push(N.wrapper.childNodes[i]);
			for (i = N.slides.length - 1; i >= 0; i--) N._extendSwiperSlide(N.slides[i]);
			n !== !1 && (n !== N.slides.length || e) && (s(), a(), N.updateActiveSlide(), N.params.pagination && N.createPagination(), N.callPlugins("numberOfSlidesChanged"))
		}, N.createSlide = function(e, n, i) {
			n = n || N.params.slideClass, i = i || t.slideElement;
			var r = document.createElement(i);
			return r.innerHTML = e || "", r.className = n, N._extendSwiperSlide(r)
		}, N.appendSlide = function(e, t, n) {
			return e ? e.nodeType ? N._extendSwiperSlide(e).append() : N.createSlide(e, t, n).append() : void 0
		}, N.prependSlide = function(e, t, n) {
			return e ? e.nodeType ? N._extendSwiperSlide(e).prepend() : N.createSlide(e, t, n).prepend() : void 0
		}, N.insertSlideAfter = function(e, t, n, i) {
			return "undefined" == typeof e ? !1 : t.nodeType ? N._extendSwiperSlide(t).insertAfter(e) : N.createSlide(t, n, i).insertAfter(e)
		}, N.removeSlide = function(e) {
			if (N.slides[e]) {
				if (t.loop) {
					if (!N.slides[e + N.loopedSlides]) return !1;
					N.slides[e + N.loopedSlides].remove(), N.removeLoopedSlides(), N.calcSlides(), N.createLoop()
				} else N.slides[e].remove();
				return !0
			}
			return !1
		}, N.removeLastSlide = function() {
			return N.slides.length > 0 ? (t.loop ? (N.slides[N.slides.length - 1 - N.loopedSlides].remove(), N.removeLoopedSlides(), N.calcSlides(), N.createLoop()) : N.slides[N.slides.length - 1].remove(), !0) : !1
		}, N.removeAllSlides = function() {
			for (var e = N.slides.length - 1; e >= 0; e--) N.slides[e].remove()
		}, N.getSlide = function(e) {
			return N.slides[e]
		}, N.getLastSlide = function() {
			return N.slides[N.slides.length - 1]
		}, N.getFirstSlide = function() {
			return N.slides[0]
		}, N.activeSlide = function() {
			return N.slides[N.activeIndex]
		}, N.fireCallback = function() {
			var e = arguments[0];
			if ("[object Array]" === Object.prototype.toString.call(e))
				for (var n = 0; n < e.length; n++) "function" == typeof e[n] && e[n](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
			else "[object String]" === Object.prototype.toString.call(e) ? t["on" + e] && N.fireCallback(t["on" + e], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) : e(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
		}, N.addCallback = function(e, t) {
			var n, r = this;
			return r.params["on" + e] ? i(this.params["on" + e]) ? this.params["on" + e].push(t) : "function" == typeof this.params["on" + e] ? (n = this.params["on" + e], this.params["on" + e] = [], this.params["on" + e].push(n), this.params["on" + e].push(t)) : void 0 : (this.params["on" + e] = [], this.params["on" + e].push(t))
		}, N.removeCallbacks = function(e) {
			N.params["on" + e] && (N.params["on" + e] = null)
		};
		var q = [];
		for (var $ in N.plugins)
			if (t[$]) {
				var G = N.plugins[$](N, t[$]);
				G && q.push(G)
			}
		N.callPlugins = function(e, t) {
			t || (t = {});
			for (var n = 0; n < q.length; n++) e in q[n] && q[n][e](t)
		}, !N.browser.ie10 && !N.browser.ie11 || t.onlyExternal || N.wrapper.classList.add("swiper-wp8-" + (O ? "horizontal" : "vertical")), t.freeMode && (N.container.className += " swiper-free-mode"), N.initialized = !1, N.init = function(e, n) {
			var i = N.h.getWidth(N.container, !1, t.roundLengths),
				r = N.h.getHeight(N.container, !1, t.roundLengths);
			if (i !== N.width || r !== N.height || e) {
				N.width = i, N.height = r;
				var o, a, s, l, u, c, d;
				H = O ? i : r;
				var p = N.wrapper;
				if (e && N.calcSlides(n), "auto" === t.slidesPerView) {
					var f = 0,
						h = 0;
					t.slidesOffset > 0 && (p.style.paddingLeft = "", p.style.paddingRight = "", p.style.paddingTop = "", p.style.paddingBottom = ""), p.style.width = "", p.style.height = "", t.offsetPxBefore > 0 && (O ? N.wrapperLeft = t.offsetPxBefore : N.wrapperTop = t.offsetPxBefore), t.offsetPxAfter > 0 && (O ? N.wrapperRight = t.offsetPxAfter : N.wrapperBottom = t.offsetPxAfter), t.centeredSlides && (O ? (N.wrapperLeft = (H - this.slides[0].getWidth(!0, t.roundLengths)) / 2, N.wrapperRight = (H - N.slides[N.slides.length - 1].getWidth(!0, t.roundLengths)) / 2) : (N.wrapperTop = (H - N.slides[0].getHeight(!0, t.roundLengths)) / 2, N.wrapperBottom = (H - N.slides[N.slides.length - 1].getHeight(!0, t.roundLengths)) / 2)), O ? (N.wrapperLeft >= 0 && (p.style.paddingLeft = N.wrapperLeft + "px"), N.wrapperRight >= 0 && (p.style.paddingRight = N.wrapperRight + "px")) : (N.wrapperTop >= 0 && (p.style.paddingTop = N.wrapperTop + "px"), N.wrapperBottom >= 0 && (p.style.paddingBottom = N.wrapperBottom + "px")), c = 0;
					var g = 0;
					for (N.snapGrid = [], N.slidesGrid = [], s = 0, d = 0; d < N.slides.length; d++) {
						o = N.slides[d].getWidth(!0, t.roundLengths), a = N.slides[d].getHeight(!0, t.roundLengths), t.calculateHeight && (s = Math.max(s, a));
						var m = O ? o : a;
						if (t.centeredSlides) {
							var v = d === N.slides.length - 1 ? 0 : N.slides[d + 1].getWidth(!0, t.roundLengths),
								y = d === N.slides.length - 1 ? 0 : N.slides[d + 1].getHeight(!0, t.roundLengths),
								w = O ? v : y;
							if (m > H) {
								if (t.slidesPerViewFit) N.snapGrid.push(c + N.wrapperLeft), N.snapGrid.push(c + m - H + N.wrapperLeft);
								else
									for (var b = 0; b <= Math.floor(m / (H + N.wrapperLeft)); b++) N.snapGrid.push(0 === b ? c + N.wrapperLeft : c + N.wrapperLeft + H * b);
								N.slidesGrid.push(c + N.wrapperLeft)
							} else N.snapGrid.push(g), N.slidesGrid.push(g);
							g += m / 2 + w / 2
						} else {
							if (m > H)
								if (t.slidesPerViewFit) N.snapGrid.push(c), N.snapGrid.push(c + m - H);
								else
							if (0 !== H)
								for (var x = 0; x <= Math.floor(m / H); x++) N.snapGrid.push(c + H * x);
							else N.snapGrid.push(c);
							else N.snapGrid.push(c);
							N.slidesGrid.push(c)
						}
						c += m, f += o, h += a
					}
					t.calculateHeight && (N.height = s), O ? (D = f + N.wrapperRight + N.wrapperLeft, p.style.width = f + "px", p.style.height = N.height + "px") : (D = h + N.wrapperTop + N.wrapperBottom, p.style.width = N.width + "px", p.style.height = h + "px")
				} else if (t.scrollContainer) p.style.width = "", p.style.height = "", l = N.slides[0].getWidth(!0, t.roundLengths), u = N.slides[0].getHeight(!0, t.roundLengths), D = O ? l : u, p.style.width = l + "px", p.style.height = u + "px", A = O ? l : u;
				else {
					if (t.calculateHeight) {
						for (s = 0, u = 0, O || (N.container.style.height = ""), p.style.height = "", d = 0; d < N.slides.length; d++) N.slides[d].style.height = "", s = Math.max(N.slides[d].getHeight(!0), s), O || (u += N.slides[d].getHeight(!0));
						a = s, N.height = a, O ? u = a : (H = a, N.container.style.height = H + "px")
					} else a = O ? N.height : N.height / t.slidesPerView, t.roundLengths && (a = Math.ceil(a)), u = O ? N.height : N.slides.length * a;
					for (o = O ? N.width / t.slidesPerView : N.width, t.roundLengths && (o = Math.ceil(o)), l = O ? N.slides.length * o : N.width, A = O ? o : a, t.offsetSlidesBefore > 0 && (O ? N.wrapperLeft = A * t.offsetSlidesBefore : N.wrapperTop = A * t.offsetSlidesBefore), t.offsetSlidesAfter > 0 && (O ? N.wrapperRight = A * t.offsetSlidesAfter : N.wrapperBottom = A * t.offsetSlidesAfter), t.offsetPxBefore > 0 && (O ? N.wrapperLeft = t.offsetPxBefore : N.wrapperTop = t.offsetPxBefore), t.offsetPxAfter > 0 && (O ? N.wrapperRight = t.offsetPxAfter : N.wrapperBottom = t.offsetPxAfter), t.centeredSlides && (O ? (N.wrapperLeft = (H - A) / 2, N.wrapperRight = (H - A) / 2) : (N.wrapperTop = (H - A) / 2, N.wrapperBottom = (H - A) / 2)), O ? (N.wrapperLeft > 0 && (p.style.paddingLeft = N.wrapperLeft + "px"), N.wrapperRight > 0 && (p.style.paddingRight = N.wrapperRight + "px")) : (N.wrapperTop > 0 && (p.style.paddingTop = N.wrapperTop + "px"), N.wrapperBottom > 0 && (p.style.paddingBottom = N.wrapperBottom + "px")), D = O ? l + N.wrapperRight + N.wrapperLeft : u + N.wrapperTop + N.wrapperBottom, parseFloat(l) > 0 && (!t.cssWidthAndHeight || "height" === t.cssWidthAndHeight) && (p.style.width = l + "px"), parseFloat(u) > 0 && (!t.cssWidthAndHeight || "width" === t.cssWidthAndHeight) && (p.style.height = u + "px"), c = 0, N.snapGrid = [], N.slidesGrid = [], d = 0; d < N.slides.length; d++) N.snapGrid.push(c), N.slidesGrid.push(c), c += A, parseFloat(o) > 0 && (!t.cssWidthAndHeight || "height" === t.cssWidthAndHeight) && (N.slides[d].style.width = o + "px"), parseFloat(a) > 0 && (!t.cssWidthAndHeight || "width" === t.cssWidthAndHeight) && (N.slides[d].style.height = a + "px")
				}
				N.initialized ? (N.callPlugins("onInit"), t.onInit && N.fireCallback(t.onInit, N)) : (N.callPlugins("onFirstInit"), t.onFirstInit && N.fireCallback(t.onFirstInit, N)), N.initialized = !0
			}
		}, N.reInit = function(e) {
			N.init(!0, e)
		}, N.resizeFix = function(e) {
			N.callPlugins("beforeResizeFix"), N.init(t.resizeReInit || e), t.freeMode ? N.getWrapperTranslate() < -r() && (N.setWrapperTransition(0), N.setWrapperTranslate(-r())) : (N.swipeTo(t.loop ? N.activeLoopIndex : N.activeIndex, 0, !1), t.autoplay && (N.support.transitions && "undefined" != typeof Z ? "undefined" != typeof Z && (clearTimeout(Z), Z = void 0, N.startAutoplay()) : "undefined" != typeof et && (clearInterval(et), et = void 0, N.startAutoplay()))), N.callPlugins("afterResizeFix")
		}, N.destroy = function() {
			var e = N.h.removeEventListener,
				n = "wrapper" === t.eventTarget ? N.wrapper : N.container;
			N.browser.ie10 || N.browser.ie11 ? (e(n, N.touchEvents.touchStart, g), e(document, N.touchEvents.touchMove, m), e(document, N.touchEvents.touchEnd, v)) : (N.support.touch && (e(n, "touchstart", g), e(n, "touchmove", m), e(n, "touchend", v)), t.simulateTouch && (e(n, "mousedown", g), e(document, "mousemove", m), e(document, "mouseup", v))), t.autoResize && e(window, "resize", N.resizeFix), s(), t.paginationClickable && T(), t.mousewheelControl && N._wheelEvent && e(N.container, N._wheelEvent, u), t.keyboardControl && e(document, "keydown", l), t.autoplay && N.stopAutoplay(), N.callPlugins("onDestroy"), N = null
		}, N.disableKeyboardControl = function() {
			t.keyboardControl = !1, N.h.removeEventListener(document, "keydown", l)
		}, N.enableKeyboardControl = function() {
			t.keyboardControl = !0, N.h.addEventListener(document, "keydown", l)
		};
		var V = (new Date).getTime();
		if (N.disableMousewheelControl = function() {
			return N._wheelEvent ? (t.mousewheelControl = !1, N.h.removeEventListener(N.container, N._wheelEvent, u), !0) : !1
		}, N.enableMousewheelControl = function() {
			return N._wheelEvent ? (t.mousewheelControl = !0, N.h.addEventListener(N.container, N._wheelEvent, u), !0) : !1
		}, t.grabCursor) {
			var X = N.container.style;
			X.cursor = "move", X.cursor = "grab", X.cursor = "-moz-grab", X.cursor = "-webkit-grab"
		}
		N.allowSlideClick = !0, N.allowLinks = !0;
		var Y, U, J, K = !1,
			Q = !0;
		N.swipeNext = function(e) {
			!e && t.loop && N.fixLoop(), !e && t.autoplay && N.stopAutoplay(!0), N.callPlugins("onSwipeNext");
			var n = N.getWrapperTranslate(),
				i = n;
			if ("auto" === t.slidesPerView) {
				for (var o = 0; o < N.snapGrid.length; o++)
					if (-n >= N.snapGrid[o] && -n < N.snapGrid[o + 1]) {
						i = -N.snapGrid[o + 1];
						break
					}
			} else {
				var a = A * t.slidesPerGroup;
				i = -(Math.floor(Math.abs(n) / Math.floor(a)) * a + a)
			}
			return i < -r() && (i = -r()), i === n ? !1 : (b(i, "next"), !0)
		}, N.swipePrev = function(e) {
			!e && t.loop && N.fixLoop(), !e && t.autoplay && N.stopAutoplay(!0), N.callPlugins("onSwipePrev");
			var n, i = Math.ceil(N.getWrapperTranslate());
			if ("auto" === t.slidesPerView) {
				n = 0;
				for (var r = 1; r < N.snapGrid.length; r++) {
					if (-i === N.snapGrid[r]) {
						n = -N.snapGrid[r - 1];
						break
					}
					if (-i > N.snapGrid[r] && -i < N.snapGrid[r + 1]) {
						n = -N.snapGrid[r];
						break
					}
				}
			} else {
				var o = A * t.slidesPerGroup;
				n = -(Math.ceil(-i / o) - 1) * o
			}
			return n > 0 && (n = 0), n === i ? !1 : (b(n, "prev"), !0)
		}, N.swipeReset = function() {
			N.callPlugins("onSwipeReset"); {
				var e, n = N.getWrapperTranslate(),
					i = A * t.slidesPerGroup; - r()
			}
			if ("auto" === t.slidesPerView) {
				e = 0;
				for (var o = 0; o < N.snapGrid.length; o++) {
					if (-n === N.snapGrid[o]) return;
					if (-n >= N.snapGrid[o] && -n < N.snapGrid[o + 1]) {
						e = N.positions.diff > 0 ? -N.snapGrid[o + 1] : -N.snapGrid[o];
						break
					}
				} - n >= N.snapGrid[N.snapGrid.length - 1] && (e = -N.snapGrid[N.snapGrid.length - 1]), n <= -r() && (e = -r())
			} else e = 0 > n ? Math.round(n / i) * i : 0, n <= -r() && (e = -r());
			return t.scrollContainer && (e = 0 > n ? n : 0), e < -r() && (e = -r()), t.scrollContainer && H > A && (e = 0), e === n ? !1 : (b(e, "reset"), !0)
		}, N.swipeTo = function(e, n, i) {
			e = parseInt(e, 10), N.callPlugins("onSwipeTo", {
				index: e,
				speed: n
			}), t.loop && (e += N.loopedSlides);
			var o = N.getWrapperTranslate();
			if (!(e > N.slides.length - 1 || 0 > e)) {
				var a;
				return a = "auto" === t.slidesPerView ? -N.slidesGrid[e] : -e * A, a < -r() && (a = -r()), a === o ? !1 : (i = i === !1 ? !1 : !0, b(a, "to", {
					index: e,
					speed: n,
					runCallbacks: i
				}), !0)
			}
		}, N._queueStartCallbacks = !1, N._queueEndCallbacks = !1, N.updateActiveSlide = function(e) {
			if (N.initialized && 0 !== N.slides.length) {
				N.previousIndex = N.activeIndex, "undefined" == typeof e && (e = N.getWrapperTranslate()), e > 0 && (e = 0);
				var n;
				if ("auto" === t.slidesPerView) {
					if (N.activeIndex = N.slidesGrid.indexOf(-e), N.activeIndex < 0) {
						for (n = 0; n < N.slidesGrid.length - 1 && !(-e > N.slidesGrid[n] && -e < N.slidesGrid[n + 1]); n++);
						var i = Math.abs(N.slidesGrid[n] + e),
							r = Math.abs(N.slidesGrid[n + 1] + e);
						N.activeIndex = r >= i ? n : n + 1
					}
				} else N.activeIndex = Math[t.visibilityFullFit ? "ceil" : "round"](-e / A); if (N.activeIndex === N.slides.length && (N.activeIndex = N.slides.length - 1), N.activeIndex < 0 && (N.activeIndex = 0), N.slides[N.activeIndex]) {
					if (N.calcVisibleSlides(e), N.support.classList) {
						var o;
						for (n = 0; n < N.slides.length; n++) o = N.slides[n], o.classList.remove(t.slideActiveClass), N.visibleSlides.indexOf(o) >= 0 ? o.classList.add(t.slideVisibleClass) : o.classList.remove(t.slideVisibleClass);
						N.slides[N.activeIndex].classList.add(t.slideActiveClass)
					} else {
						var a = new RegExp("\\s*" + t.slideActiveClass),
							s = new RegExp("\\s*" + t.slideVisibleClass);
						for (n = 0; n < N.slides.length; n++) N.slides[n].className = N.slides[n].className.replace(a, "").replace(s, ""), N.visibleSlides.indexOf(N.slides[n]) >= 0 && (N.slides[n].className += " " + t.slideVisibleClass);
						N.slides[N.activeIndex].className += " " + t.slideActiveClass
					} if (t.loop) {
						var l = N.loopedSlides;
						N.activeLoopIndex = N.activeIndex - l, N.activeLoopIndex >= N.slides.length - 2 * l && (N.activeLoopIndex = N.slides.length - 2 * l - N.activeLoopIndex), N.activeLoopIndex < 0 && (N.activeLoopIndex = N.slides.length - 2 * l + N.activeLoopIndex), N.activeLoopIndex < 0 && (N.activeLoopIndex = 0)
					} else N.activeLoopIndex = N.activeIndex;
					t.pagination && N.updatePagination(e)
				}
			}
		}, N.createPagination = function(e) {
			if (t.paginationClickable && N.paginationButtons && T(), N.paginationContainer = t.pagination.nodeType ? t.pagination : n(t.pagination)[0], t.createPagination) {
				var i = "",
					r = N.slides.length,
					o = r;
				t.loop && (o -= 2 * N.loopedSlides);
				for (var a = 0; o > a; a++) i += "<" + t.paginationElement + ' class="' + t.paginationElementClass + '"></' + t.paginationElement + ">";
				N.paginationContainer.innerHTML = i
			}
			N.paginationButtons = n("." + t.paginationElementClass, N.paginationContainer), e || N.updatePagination(), N.callPlugins("onCreatePagination"), t.paginationClickable && S()
		}, N.updatePagination = function(e) {
			if (t.pagination && !(N.slides.length < 1)) {
				var i = n("." + t.paginationActiveClass, N.paginationContainer);
				if (i) {
					var r = N.paginationButtons;
					if (0 !== r.length) {
						for (var o = 0; o < r.length; o++) r[o].className = t.paginationElementClass;
						var a = t.loop ? N.loopedSlides : 0;
						if (t.paginationAsRange) {
							N.visibleSlides || N.calcVisibleSlides(e);
							var s, l = [];
							for (s = 0; s < N.visibleSlides.length; s++) {
								var u = N.slides.indexOf(N.visibleSlides[s]) - a;
								t.loop && 0 > u && (u = N.slides.length - 2 * N.loopedSlides + u), t.loop && u >= N.slides.length - 2 * N.loopedSlides && (u = N.slides.length - 2 * N.loopedSlides - u, u = Math.abs(u)), l.push(u)
							}
							for (s = 0; s < l.length; s++) r[l[s]] && (r[l[s]].className += " " + t.paginationVisibleClass);
							t.loop ? void 0 !== r[N.activeLoopIndex] && (r[N.activeLoopIndex].className += " " + t.paginationActiveClass) : r[N.activeIndex].className += " " + t.paginationActiveClass
						} else t.loop ? r[N.activeLoopIndex] && (r[N.activeLoopIndex].className += " " + t.paginationActiveClass + " " + t.paginationVisibleClass) : r[N.activeIndex].className += " " + t.paginationActiveClass + " " + t.paginationVisibleClass
					}
				}
			}
		}, N.calcVisibleSlides = function(e) {
			var n = [],
				i = 0,
				r = 0,
				o = 0;
			O && N.wrapperLeft > 0 && (e += N.wrapperLeft), !O && N.wrapperTop > 0 && (e += N.wrapperTop);
			for (var a = 0; a < N.slides.length; a++) {
				i += r, r = "auto" === t.slidesPerView ? O ? N.h.getWidth(N.slides[a], !0, t.roundLengths) : N.h.getHeight(N.slides[a], !0, t.roundLengths) : A, o = i + r;
				var s = !1;
				t.visibilityFullFit ? (i >= -e && -e + H >= o && (s = !0), -e >= i && o >= -e + H && (s = !0)) : (o > -e && -e + H >= o && (s = !0), i >= -e && -e + H > i && (s = !0), -e > i && o > -e + H && (s = !0)), s && n.push(N.slides[a])
			}
			0 === n.length && (n = [N.slides[N.activeIndex]]), N.visibleSlides = n
		};
		var Z, et;
		N.startAutoplay = function() {
			if (N.support.transitions) {
				if ("undefined" != typeof Z) return !1;
				if (!t.autoplay) return;
				N.callPlugins("onAutoplayStart"), t.onAutoplayStart && N.fireCallback(t.onAutoplayStart, N), k()
			} else {
				if ("undefined" != typeof et) return !1;
				if (!t.autoplay) return;
				N.callPlugins("onAutoplayStart"), t.onAutoplayStart && N.fireCallback(t.onAutoplayStart, N), et = setInterval(function() {
					t.loop ? (N.fixLoop(), N.swipeNext(!0)) : N.swipeNext(!0) || (t.autoplayStopOnLast ? (clearInterval(et), et = void 0) : N.swipeTo(0))
				}, t.autoplay)
			}
		}, N.stopAutoplay = function(e) {
			if (N.support.transitions) {
				if (!Z) return;
				Z && clearTimeout(Z), Z = void 0, e && !t.autoplayDisableOnInteraction && N.wrapperTransitionEnd(function() {
					k()
				}), N.callPlugins("onAutoplayStop"), t.onAutoplayStop && N.fireCallback(t.onAutoplayStop, N)
			} else et && clearInterval(et), et = void 0, N.callPlugins("onAutoplayStop"), t.onAutoplayStop && N.fireCallback(t.onAutoplayStop, N)
		}, N.loopCreated = !1, N.removeLoopedSlides = function() {
			if (N.loopCreated)
				for (var e = 0; e < N.slides.length; e++) N.slides[e].getData("looped") === !0 && N.wrapper.removeChild(N.slides[e])
		}, N.createLoop = function() {
			if (0 !== N.slides.length) {
				N.loopedSlides = "auto" === t.slidesPerView ? t.loopedSlides || 1 : t.slidesPerView + t.loopAdditionalSlides, N.loopedSlides > N.slides.length && (N.loopedSlides = N.slides.length);
				var e, n = "",
					i = "",
					r = "",
					o = N.slides.length,
					a = Math.floor(N.loopedSlides / o),
					s = N.loopedSlides % o;
				for (e = 0; a * o > e; e++) {
					var l = e;
					if (e >= o) {
						var u = Math.floor(e / o);
						l = e - o * u
					}
					r += N.slides[l].outerHTML
				}
				for (e = 0; s > e; e++) i += w(t.slideDuplicateClass, N.slides[e].outerHTML);
				for (e = o - s; o > e; e++) n += w(t.slideDuplicateClass, N.slides[e].outerHTML);
				var c = n + r + M.innerHTML + r + i;
				for (M.innerHTML = c, N.loopCreated = !0, N.calcSlides(), e = 0; e < N.slides.length; e++)(e < N.loopedSlides || e >= N.slides.length - N.loopedSlides) && N.slides[e].setData("looped", !0);
				N.callPlugins("onCreateLoop")
			}
		}, N.fixLoop = function() {
			var e;
			N.activeIndex < N.loopedSlides ? (e = N.slides.length - 3 * N.loopedSlides + N.activeIndex, N.swipeTo(e, 0, !1)) : ("auto" === t.slidesPerView && N.activeIndex >= 2 * N.loopedSlides || N.activeIndex > N.slides.length - 2 * t.slidesPerView) && (e = -N.slides.length + N.activeIndex + N.loopedSlides, N.swipeTo(e, 0, !1))
		}, N.loadSlides = function() {
			var e = "";
			N.activeLoaderIndex = 0;
			for (var n = t.loader.slides, i = t.loader.loadAllSlides ? n.length : t.slidesPerView * (1 + t.loader.surroundGroups), r = 0; i > r; r++) e += "outer" === t.loader.slidesHTMLType ? n[r] : "<" + t.slideElement + ' class="' + t.slideClass + '" data-swiperindex="' + r + '">' + n[r] + "</" + t.slideElement + ">";
			N.wrapper.innerHTML = e, N.calcSlides(!0), t.loader.loadAllSlides || N.wrapperTransitionEnd(N.reloadSlides, !0)
		}, N.reloadSlides = function() {
			var e = t.loader.slides,
				n = parseInt(N.activeSlide().data("swiperindex"), 10);
			if (!(0 > n || n > e.length - 1)) {
				N.activeLoaderIndex = n;
				var i = Math.max(0, n - t.slidesPerView * t.loader.surroundGroups),
					r = Math.min(n + t.slidesPerView * (1 + t.loader.surroundGroups) - 1, e.length - 1);
				if (n > 0) {
					var o = -A * (n - i);
					N.setWrapperTranslate(o), N.setWrapperTransition(0)
				}
				var a;
				if ("reload" === t.loader.logic) {
					N.wrapper.innerHTML = "";
					var s = "";
					for (a = i; r >= a; a++) s += "outer" === t.loader.slidesHTMLType ? e[a] : "<" + t.slideElement + ' class="' + t.slideClass + '" data-swiperindex="' + a + '">' + e[a] + "</" + t.slideElement + ">";
					N.wrapper.innerHTML = s
				} else {
					var l = 1e3,
						u = 0;
					for (a = 0; a < N.slides.length; a++) {
						var c = N.slides[a].data("swiperindex");
						i > c || c > r ? N.wrapper.removeChild(N.slides[a]) : (l = Math.min(c, l), u = Math.max(c, u))
					}
					for (a = i; r >= a; a++) {
						var d;
						l > a && (d = document.createElement(t.slideElement), d.className = t.slideClass, d.setAttribute("data-swiperindex", a), d.innerHTML = e[a], N.wrapper.insertBefore(d, N.wrapper.firstChild)), a > u && (d = document.createElement(t.slideElement), d.className = t.slideClass, d.setAttribute("data-swiperindex", a), d.innerHTML = e[a], N.wrapper.appendChild(d))
					}
				}
				N.reInit(!0)
			}
		}, E()
	}
};
Swiper.prototype = {
	plugins: {},
	wrapperTransitionEnd: function(e, t) {
		"use strict";

		function n(s) {
			if (s.target === o && (e(r), r.params.queueEndCallbacks && (r._queueEndCallbacks = !1), !t))
				for (i = 0; i < a.length; i++) r.h.removeEventListener(o, a[i], n)
		}
		var i, r = this,
			o = r.wrapper,
			a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
		if (e)
			for (i = 0; i < a.length; i++) r.h.addEventListener(o, a[i], n)
	},
	getWrapperTranslate: function(e) {
		"use strict";
		var t, n, i, r, o = this.wrapper;
		return "undefined" == typeof e && (e = "horizontal" === this.params.mode ? "x" : "y"), this.support.transforms && this.params.useCSS3Transforms ? (i = window.getComputedStyle(o, null), window.WebKitCSSMatrix ? r = new WebKitCSSMatrix("none" === i.webkitTransform ? "" : i.webkitTransform) : (r = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = r.toString().split(",")), "x" === e && (n = window.WebKitCSSMatrix ? r.m41 : parseFloat(16 === t.length ? t[12] : t[4])), "y" === e && (n = window.WebKitCSSMatrix ? r.m42 : parseFloat(16 === t.length ? t[13] : t[5]))) : ("x" === e && (n = parseFloat(o.style.left, 10) || 0), "y" === e && (n = parseFloat(o.style.top, 10) || 0)), n || 0
	},
	setWrapperTranslate: function(e, t, n) {
		"use strict";
		var i, r = this.wrapper.style,
			o = {
				x: 0,
				y: 0,
				z: 0
			};
		3 === arguments.length ? (o.x = e, o.y = t, o.z = n) : ("undefined" == typeof t && (t = "horizontal" === this.params.mode ? "x" : "y"), o[t] = e), this.support.transforms && this.params.useCSS3Transforms ? (i = this.support.transforms3d ? "translate3d(" + o.x + "px, " + o.y + "px, " + o.z + "px)" : "translate(" + o.x + "px, " + o.y + "px)", r.webkitTransform = r.MsTransform = r.msTransform = r.MozTransform = r.OTransform = r.transform = i) : (r.left = o.x + "px", r.top = o.y + "px"), this.callPlugins("onSetWrapperTransform", o), this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, o)
	},
	setWrapperTransition: function(e) {
		"use strict";
		var t = this.wrapper.style;
		t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e / 1e3 + "s", this.callPlugins("onSetWrapperTransition", {
			duration: e
		}), this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, e)
	},
	h: {
		getWidth: function(e, t, n) {
			"use strict";
			var i = window.getComputedStyle(e, null).getPropertyValue("width"),
				r = parseFloat(i);
			return (isNaN(r) || i.indexOf("%") > 0 || 0 > r) && (r = e.offsetWidth - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-right"))), t && (r += parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-right"))), n ? Math.ceil(r) : r
		},
		getHeight: function(e, t, n) {
			"use strict";
			if (t) return e.offsetHeight;
			var i = window.getComputedStyle(e, null).getPropertyValue("height"),
				r = parseFloat(i);
			return (isNaN(r) || i.indexOf("%") > 0 || 0 > r) && (r = e.offsetHeight - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-bottom"))), t && (r += parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-bottom"))), n ? Math.ceil(r) : r
		},
		getOffset: function(e) {
			"use strict";
			var t = e.getBoundingClientRect(),
				n = document.body,
				i = e.clientTop || n.clientTop || 0,
				r = e.clientLeft || n.clientLeft || 0,
				o = window.pageYOffset || e.scrollTop,
				a = window.pageXOffset || e.scrollLeft;
			return document.documentElement && !window.pageYOffset && (o = document.documentElement.scrollTop, a = document.documentElement.scrollLeft), {
				top: t.top + o - i,
				left: t.left + a - r
			}
		},
		windowWidth: function() {
			"use strict";
			return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : void 0
		},
		windowHeight: function() {
			"use strict";
			return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : void 0
		},
		windowScroll: function() {
			"use strict";
			return "undefined" != typeof pageYOffset ? {
				left: window.pageXOffset,
				top: window.pageYOffset
			} : document.documentElement ? {
				left: document.documentElement.scrollLeft,
				top: document.documentElement.scrollTop
			} : void 0
		},
		addEventListener: function(e, t, n, i) {
			"use strict";
			"undefined" == typeof i && (i = !1), e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent && e.attachEvent("on" + t, n)
		},
		removeEventListener: function(e, t, n, i) {
			"use strict";
			"undefined" == typeof i && (i = !1), e.removeEventListener ? e.removeEventListener(t, n, i) : e.detachEvent && e.detachEvent("on" + t, n)
		}
	},
	setTransform: function(e, t) {
		"use strict";
		var n = e.style;
		n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = t
	},
	setTranslate: function(e, t) {
		"use strict";
		var n = e.style,
			i = {
				x: t.x || 0,
				y: t.y || 0,
				z: t.z || 0
			}, r = this.support.transforms3d ? "translate3d(" + i.x + "px," + i.y + "px," + i.z + "px)" : "translate(" + i.x + "px," + i.y + "px)";
		n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = r, this.support.transforms || (n.left = i.x + "px", n.top = i.y + "px")
	},
	setTransition: function(e, t) {
		"use strict";
		var n = e.style;
		n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = t + "ms"
	},
	support: {
		touch: window.Modernizr && Modernizr.touch === !0 || function() {
			"use strict";
			return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
		}(),
		transforms3d: window.Modernizr && Modernizr.csstransforms3d === !0 || function() {
			"use strict";
			var e = document.createElement("div").style;
			return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
		}(),
		transforms: window.Modernizr && Modernizr.csstransforms === !0 || function() {
			"use strict";
			var e = document.createElement("div").style;
			return "transform" in e || "WebkitTransform" in e || "MozTransform" in e || "msTransform" in e || "MsTransform" in e || "OTransform" in e
		}(),
		transitions: window.Modernizr && Modernizr.csstransitions === !0 || function() {
			"use strict";
			var e = document.createElement("div").style;
			return "transition" in e || "WebkitTransition" in e || "MozTransition" in e || "msTransition" in e || "MsTransition" in e || "OTransition" in e
		}(),
		classList: function() {
			"use strict";
			var e = document.createElement("div");
			return "classList" in e
		}()
	},
	browser: {
		ie8: function() {
			"use strict";
			var e = -1;
			if ("Microsoft Internet Explorer" === navigator.appName) {
				var t = navigator.userAgent,
					n = new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);
				null !== n.exec(t) && (e = parseFloat(RegExp.$1))
			}
			return -1 !== e && 9 > e
		}(),
		ie10: window.navigator.msPointerEnabled,
		ie11: window.navigator.pointerEnabled
	}
}, (window.jQuery || window.Zepto) && ! function(e) {
	"use strict";
	e.fn.swiper = function(t) {
		var n;
		return this.each(function(i) {
			var r = e(this);
			if (!r.data("swiper")) {
				var o = new Swiper(r[0], t);
				i || (n = o), r.data("swiper", o)
			}
		}), n
	}
}(window.jQuery || window.Zepto), "undefined" != typeof module && (module.exports = Swiper), "function" == typeof define && define.amd && define([], function() {
	"use strict";
	return Swiper
}),
function(e) {
	e.prototype.plugins.hashNav = function(e, t) {
		"use strict";

		function n() {
			document.location.hash = e.activeSlide().getAttribute("data-hash") || ""
		}

		function i(t) {
			var n = document.location.hash.replace("#", "");
			if (n)
				for (var i = t ? e.params.speed : 0, r = 0, o = e.slides.length; o > r; r++) {
					var a = e.slides[r],
						s = a.getAttribute("data-hash");
					if (s === n && a.getData("looped") !== !0) {
						var l = a.index();
						e.params.loop && (l -= e.loopedSlides), e.swipeTo(l, i)
					}
				}
		}
		"horizontal" === e.params.mode;
		if (t) return {
			onSwiperCreated: function() {
				i()
			},
			onSlideChangeStart: function() {
				n(!0)
			},
			onSwipeReset: function() {
				n(!0)
			}
		}
	}
}(Swiper), Swiper.prototype.plugins.progress = function(e) {
	function t() {
		for (var t = 0; t < e.slides.length; t++) {
			var n = e.slides[t];
			n.progressSlideSize = r ? e.h.getWidth(n) : e.h.getHeight(n), n.progressSlideOffset = "offsetLeft" in n ? r ? n.offsetLeft : n.offsetTop : r ? n.getOffset().left - e.h.getOffset(e.container).left : n.getOffset().top - e.h.getOffset(e.container).top
		}
		i = r ? e.h.getWidth(e.wrapper) + e.wrapperLeft + e.wrapperRight - e.width : e.h.getHeight(e.wrapper) + e.wrapperTop + e.wrapperBottom - e.height
	}

	function n(t) {
		var n, t = t || {
				x: 0,
				y: 0,
				z: 0
			};
		n = 1 == e.params.centeredSlides ? r ? -t.x + e.width / 2 : -t.y + e.height / 2 : r ? -t.x : -t.y;
		for (var o = 0; o < e.slides.length; o++) {
			var a = e.slides[o],
				s = 1 == e.params.centeredSlides ? a.progressSlideSize / 2 : 0,
				l = (n - a.progressSlideOffset - s) / a.progressSlideSize;
			a.progress = l
		}
		e.progress = r ? -t.x / i : -t.y / i, e.params.onProgressChange && e.fireCallback(e.params.onProgressChange, e)
	}
	var i, r = "horizontal" == e.params.mode,
		o = {
			onFirstInit: function() {
				t(), n({
					x: e.getWrapperTranslate("x"),
					y: e.getWrapperTranslate("y")
				})
			},
			onInit: function() {
				t()
			},
			onSetWrapperTransform: function(e) {
				n(e)
			}
		};
	return o
}, Swiper.prototype.plugins.tdFlow = function(e, t) {
	function n() {
		s = !0, r = e.slides;
		for (var t = 0; t < r.length; t++) e.setTransition(r[t], 0);
		if (l) {
			o = e.h.getWidth(e.wrapper), a = o / r.length;
			for (var t = 0; t < r.length; t++) r[t].swiperSlideOffset = r[t].offsetLeft
		} else {
			o = e.h.getHeight(e.wrapper), a = o / r.length;
			for (var t = 0; t < r.length; t++) r[t].swiperSlideOffset = r[t].offsetTop
		}
	}

	function i(n) {
		if (s) {
			for (var n = n || {
				x: 0,
				y: 0,
				z: 0
			}, i = l ? -n.x + e.width / 2 : -n.y + e.height / 2, r = l ? t.rotate : -t.rotate, o = t.depth, u = 0; u < e.slides.length; u++) {
				var c = e.slides[u].swiperSlideOffset,
					d = (i - c - a / 2) / a * t.modifier,
					p = l ? r * d : 0,
					f = l ? 0 : r * d,
					h = -o * Math.abs(d),
					g = l ? 0 : t.stretch * d,
					m = l ? t.stretch * d : 0;
				Math.abs(m) < .001 && (m = 0), Math.abs(g) < .001 && (g = 0), Math.abs(h) < .001 && (h = 0), Math.abs(p) < .001 && (p = 0), Math.abs(f) < .001 && (f = 0);
				var v = "translate3d(" + m + "px," + g + "px," + h + "px)  rotateX(" + f + "deg) rotateY(" + p + "deg)";
				if (e.setTransform(e.slides[u], v), e.slides[u].style.zIndex = -Math.abs(Math.round(d)) + 1, t.shadows) {
					var y = e.slides[u].querySelector(l ? ".swiper-slide-shadow-left" : ".swiper-slide-shadow-top"),
						w = e.slides[u].querySelector(l ? ".swiper-slide-shadow-right" : ".swiper-slide-shadow-bottom");
					w.style.opacity = -d > 0 ? -d : 0, y.style.opacity = d > 0 ? d : 0
				}
			}
			if (e.browser.ie10 || e.browser.ie11) {
				var b = e.wrapper.style;
				b.perspectiveOrigin = i + "px 50%"
			}
		}
	}
	if (e.support.transforms3d) {
		var r, o, a, s, l = "horizontal" == e.params.mode;
		if (t) {
			var u = {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				shadows: !0
			};
			t = t || {};
			for (var c in u) c in t || (t[c] = u[c]);
			var d = {
				onFirstInit: function() {
					if (r = e.slides, t.shadows) {
						var o = document.createElement("div"),
							a = document.createElement("div");
						o.className = l ? "swiper-slide-shadow-left" : "swiper-slide-shadow-top", a.className = l ? "swiper-slide-shadow-right" : "swiper-slide-shadow-bottom";
						for (var s = 0; s < r.length; s++) r[s].appendChild(o.cloneNode()), r[s].appendChild(a.cloneNode())
					}
					n(), i({
						x: e.getWrapperTranslate("x"),
						y: e.getWrapperTranslate("y"),
						z: e.getWrapperTranslate("z")
					})
				},
				onInit: function() {
					n(), i({
						x: e.getWrapperTranslate("x"),
						y: e.getWrapperTranslate("y"),
						z: e.getWrapperTranslate("z")
					})
				},
				onSetWrapperTransform: function(e) {
					i(e)
				},
				onSetWrapperTransition: function(n) {
					for (var i = 0; i < e.slides.length; i++) e.setTransition(e.slides[i], n.duration), l && t.shadows ? (e.setTransition(e.slides[i].querySelector(".swiper-slide-shadow-left"), n.duration), e.setTransition(e.slides[i].querySelector(".swiper-slide-shadow-right"), n.duration)) : t.shadows && (e.setTransition(e.slides[i].querySelector(".swiper-slide-shadow-top"), n.duration), e.setTransition(e.slides[i].querySelector(".swiper-slide-shadow-bottom"), n.duration))
				}
			};
			return d
		}
	}
};
var Share = Share || {};
! function() {
	var e = {
		defaultData: {
			imgUrl: "",
			imgWidth: "640",
			imgHeight: "640",
			link: location.href.split("#")[0] || "",
			title: (document.getElementsByTagName("title")[0].innerHTML || "").replace(/&nbsp;/g, " "),
			desc: this.title,
			appid: ""
		},
		customData: {},
		callback: [],
		isInit: !1,
		init: function() {
			var e = this;
			return this.isInit ? !1 : (this.isInit = !0, void(navigator.userAgent.match(/micromessenger/gi) && document.addEventListener("WeixinJSBridgeReady", function() {
				WeixinJSBridge.on("menu:share:appmessage", function(t) {
					e.shareToChat(t)
				}), WeixinJSBridge.on("menu:share:timeline", function(t) {
					e.shareToMoments(t)
				}), WeixinJSBridge.on("menu:share:weibo", function(t) {
					e.shareToWeiBo(t)
				})
			}, !1)))
		},
		setData: function(e, t) {
			var n = this.customData;
			if ("object" == typeof e)
				for (i in e) n[i] = e[i];
			else n[e] = t
		},
		getData: function() {
			var e = this.defaultData,
				t = this.customData,
				n = {};
			for (i in e) n[i] = e[i];
			for (i in t) n[i] = t[i];
			return n
		},
		addCallback: function(e) {
			"function" == typeof e && this.callback.push(e)
		},
		fireCallback: function(e) {
			for (var t = this.callback, n = 0, i = t.length; i > n; ++n) t[n].call(this, e)
		},
		shareToChat: function() {
			var e = this.getData();
			WeixinJSBridge.invoke("sendAppMessage", {
				appid: e.appid || "",
				img_url: e.imgUrl || "",
				img_width: e.imgWidth || "",
				img_height: e.imgHeight || "",
				link: e.link || "",
				desc: e.desc || "",
				title: e.title || ""
			}, function() {}), this.fireCallback("Chat")
		},
		shareToMoments: function() {
			var e = this.getData();
			WeixinJSBridge.invoke("shareTimeline", {
				img_url: e.imgUrl || "",
				img_width: e.imgWidth || "",
				img_height: e.imgHeight || "",
				link: e.link || "",
				desc: e.desc || "",
				title: e.title || ""
			}, function() {}), this.fireCallback("Moments")
		},
		shareToWeiBo: function() {
			var e = this.getData();
			WeixinJSBridge.invoke("shareWeibo", {
				content: e.desc || "",
				url: e.url || ""
			}, function() {}), this.fireCallback("WeiBo")
		}
	};
	window.Share.WeChat = {
		setData: function(t, n) {
			e.setData(t, n)
		},
		getData: function() {
			return e.getData()
		},
		addCallback: function(t) {
			e.addCallback(t)
		}
	}, e.init()
}(), ! function(e) {
	e.fn.coffee = function(t) {
		function n() {
			var t = a(6, p.steamMaxSize),
				n = o(1, p.steamsFontFamily),
				i = "#" + o(6, "0123456789ABCDEF"),
				r = a(20, 40),
				l = a(-90, 89),
				u = s(.4, 1),
				d = ":rotate(" + l + "deg) scale(" + u + ");",
				h = "-webkit-transform" + d + "transform" + d,
				g = e('<span class="coffee-steam">' + o(1, p.steams) + "</span>"),
				m = a(0, 40);
			g.css({
				position: "absolute",
				left: r,
				top: p.steamHeight,
				"font-size:": t + "px",
				color: i,
				"font-family": n,
				display: "block",
				opacity: 1
			}).attr("style", g.attr("style") + h), g.appendTo(f), g.animate({
				top: a(p.steamHeight / 2, 0),
				left: m,
				opacity: 0
			}, a(p.steamFlyTime / 2, 1.2 * p.steamFlyTime), c, function() {
				g.remove(), g = null
			})
		}

		function r() {
			var e = a(0, 40);
			f.animate({
				left: e
			}, a(1e3, 3e3), c)
		}

		function o(e, t) {
			var n = "",
				r = t.length - 1,
				o = 0;
			for (e = e || 1, i = 0; e > i; i++) o = a(0, r - 1), n += t.slice(o, o + 1);
			return n
		}

		function a(e, t) {
			var n = t - e,
				i = e + Math.round(Math.random() * n);
			return parseInt(i)
		}

		function s(e, t) {
			var n = t - e,
				i = e + Math.round(Math.random() * n);
			return parseFloat(i)
		}
		var l = null,
			u = null,
			c = "swing",
			d = e(this),
			p = e.extend({}, e.fn.coffee.defaults, t),
			f = e('<div class="coffee-steam-box"></div>');
		return f.css({
			height: p.steamHeight,
			width: p.steamWidth,
			left: 20,
			top: -40,
			position: "absolute",
			overflow: "hidden",
			"z-index": 0
		}), f.appendTo(d), e.fn.coffee.stop = function() {
			clearInterval(l), clearInterval(u)
		}, e.fn.coffee.start = function() {
			l = setInterval(function() {
				n()
			}, a(p.steamInterval / 2, 2 * p.steamInterval)), u = setInterval(function() {
				r()
			}, a(100, 1e3) + a(1e3, 3e3))
		}, d
	}, e.fn.coffee.defaults = {
		steams: ["jQuery", "HTML5"],
		steamsFontFamily: ["Verdana", "Geneva", "Comic Sans MS", "MS Serif", "Lucida Sans Unicode", "Times New Roman", "Trebuchet MS", "Arial", "Courier New", "Georgia"],
		steamFlyTime: 5e3,
		steamInterval: 1e3,
		steamMaxSize: 10,
		steamHeight: 200,
		steamWidth: 300
	}, e.fn.coffee.version = "2.0.0"
}(jQuery), ! function() {
	var e = {
		_audioNode: null,
		_audio: null,
		_audio_val: !0,
		_videoNode: null,
		audio_init: function() {
			if (this._audioNode = $(".js-audio"), this._audioNode.length > 0) {
				var e = {
					autoplay: !0,
					controls: !1,
					loop: !0,
					preload: "auto",
					src: this._audioNode.data("src")
				};
				this._audio = new Audio;
				for (var t in e) e.hasOwnProperty(t) && t in this._audio && (this._audio[t] = e[t])
			}
		},
		audio_addEvent: function() {
			if (this._audioNode.length > 0) {
				var t = this._audioNode.find(".js-music-btn"),
					n = this,
					i = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
					r = i ? "touchstart" : "click";
				$(this._audioNode).on(r, function() {
					n.audio_contorl()
				}), $(this._audio).on("play", function() {
					e._audio_val = !1, t.removeClass("ui-music-off"), $.fn.coffee.start()
				}), $(this._audio).on("pause", function() {
					e._audio_val = !0, t.addClass("ui-music-off"), $.fn.coffee.stop()
				})
			}
		},
		audio_contorl: function() {
			e._audio_val ? e.audio_play() : e.audio_stop()
		},
		audio_play: function() {
			e._audio_val = !1, e._audio && e._audio.play()
		},
		audio_stop: function() {
			e._audio_val = !0, e._audio && e._audio.pause()
		},
		video_init: function() {
			this._videoNode = $(".js-video"), this._videoNode.each(function() {
				var e = $(this),
					t = {
						controls: "controls",
						preload: "none",
						width: e.attr("data-width"),
						height: e.attr("data-height"),
						src: e.attr("data-src")
					}, n = $('<video class="f-hide"></video>'),
					i = n[0],
					r = $(this).find(".img");
				for (var o in t) t.hasOwnProperty(o) && o in i && (i[o] = t[o]);
				this.appendChild(i), n.on("play", function() {
					r.hide(), n.removeClass("f-hide")
				}), n.on("pause", function() {
					r.show(), n.addClass("f-hide")
				})
			})
		},
		media_control: function() {
			var t = $("video");
			this._audio && t.length > 0 && ($(this._audio).on("play", function() {
				t.each(function() {
					this.paused || this.pause()
				})
			}), t.on("play", function() {
				e._audio_val || e.audio_contorl()
			}), t.on("pause", function() {
				e._audio_val && e.audio_contorl()
			}))
		},
		media_init: function() {
			this.audio_init(), this.video_init(), this.audio_addEvent(), this.media_control()
		}
	};
	window.Media = e
}(), ! function(e) {
	e.prototype.plugins.shadow = function(e) {
		"use strict";

		function t() {
			for (var t = 0, i = e.slides.length; i > t; ++t) e.slides[t].style.zIndex = 20 + t;
			e.addCallback("ProgressChange", function(e) {
				for (var t = e.slides, i = 0, r = t.length; r > i; ++i) {
					var o, a, s = t[i],
						l = s.progress;
					l > 0 ? (o = l * e.width, a = 0) : (o = 0, a = 1 - Math.min(Math.abs(l), 1)), s.style.boxShadow = "0px 0px 10px rgba(0,0,0," + a + ")", e.setTransform(s, n ? "translate3d(" + .7 * o + "px,0,0)" : "translate3d(0," + o + "px,0)")
				}
			})
		}
		var n = "horizontal" === e.params.mode;
		return {
			onInit: function() {
				t()
			},
			onTouchStartBegin: function() {
				for (var t = 0; t < e.slides.length; ++t) e.setTransition(e.slides[t], 0)
			},
			onSetWrapperTransition: function(t) {
				for (var n = t.duration, i = 0; i < e.slides.length; ++i) e.setTransition(e.slides[i], n)
			}
		}
	}
}(Swiper), ! function() {
	function e() {
		this.$loading = $(".js-loading"), this.$container = $(".js-power-scroll-container"), this.$power = this.$container.find(".js-power-scroll"), this.$coffee = this.$container.find(".js-coffee"), this.$arrow = this.$container.find(".js-arrow"), this.$lazy = this.$container.find(".js-lazy-scroll"), this.coffeeAnimation = '<img src="/Mobile/Tpl/Public/slider/images/audio.png?v201412020049"/>', this.isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()), this.eventName = this.isMobile ? "touchstart" : "click"
	}
	e.prototype.init = function() {
		this.coffee(), window.Media.media_init(), $(window).on("beforeunload", function() {
			window.Media.audio_stop()
		}), $(window).on("touchmove", function(e) {
			e.preventDefault()
		}), this.loading()
	}, e.prototype.coffee = function() {
		this.$coffee.coffee({
			steams: [this.coffeeAnimation, this.coffeeAnimation],
			steamHeight: 100,
			steamWidth: 80
		})
	}, e.prototype.loading = function() {
		var e = this,
			t = 8e3,
			n = +new Date,
			i = !1,
			r = function() {
				if (!i) {
					i = !0;
					var t = 400,
						r = +new Date,
						o = r - n;
					t = o > t ? 0 : t - o, setTimeout(function() {
						e.$loading.fadeOut(), e.loaded()
					}, t)
				}
			};
		this.lazyLoad(), $(r), setTimeout(r, t)
	}, e.prototype.lazyLoad = function() {
		this.$lazy.each(function(e, t) {
			var n = $(t),
				i = n.data("src");
			n.attr("style", "background-image:url(" + i + ");")
		})
	}, e.prototype.loaded = function() {
		this.initSwiper(), this.initAnimation && this.initAnimation(), this.swiper.fireCallback("FirstInit", this.swiper), this.show(), this.showArrow(), this.resize(), this.addLoadingBG()
	}, e.prototype.initSwiper = function() {
		var e, t = this,
			n = {
				mode: "vertical",
				roundLengths: !0,
				loop: !1,
				longSwipesRatio: .3,
				autoResize: !1,
				mousewheelControl: !this.isMobile,
				hashNav: !1,
				progress: !0,
				shadow: !1
			}, i = this.$power.data("options"),
			r = function() {
				return e = $.extend(n, i), e.tdFlow && (e.tdFlow = $.extend({
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					shadows: !0
				}, e.tdFlow)), e.tdFlow && (e.shadow = !1), e
			};
		e = r(), this.swiper = this.$power.swiper(e), "horizontal" === e.mode ? this.swiper.addCallback("SlideChangeStart", function() {
			var e = !1;
			return function() {
				e || (t.showTimeout && window.clearTimeout(t.showTimeout), t.$arrow.hide(), e = !0)
			}
		}()) : this.$arrow.bind("click", function() {
			t.swiper.swipeNext()
		}), this.$arrow.html("horizontal" === e.mode ? '<img src="/Mobile/Tpl/Public/slider/images/arrow-left.png?v201412020049" alt="滑动提示">' : '<a href="javascript:;"><img src="/Mobile/Tpl/Public/slider/images/arrow-up.png?v201412020049" alt="滑动提示"></a>'), this.$arrow.addClass("horizontal" === e.mode ? "ui-left-arrow" : "ui-up-arrow ")
	}, e.prototype.show = function() {
		this.$container.css("visibility", "visible")
	}, e.prototype.showArrow = function() {
		var e = this;
		this.showTimeout = window.setTimeout(function() {
			e.$arrow.show()
		}, 500)
	}, e.prototype.resize = function() {
		var e = this,
			t = $(window),
			n = $("body"),
			i = $("<div/>"),
			r = $("<div/>"),
			o = $("<div/>"),
			a = ($("<div/>"), !1),
			s = !1;
		t.resize(function() {
			var l = 640,
				u = .54,
				c = t.width(),
				d = t.height(),
				p = Math.min(c, d),
				f = Math.max(c, d);
			f == l && l > p && Math.floor(p / f * 100) < Math.floor(100 * u) ? (a || (i.attr("style", "box-sizing: border-box;overflow: visible;position: fixed;top: 0;left: 0;bottom: 0px;right: 0;width: 100%;height: 100%;background-color: #000;opacity: .8;filter: alpha(opacity=80);z-index: 1140;"), r.attr("style", "box-sizing: border-box;overflow: visible;position: fixed;top: 0;left: 0;bottom: 0px;right: 0;width: 100%;height: 100%;z-index: 1150;"), o.addClass("text-center font-size-28 c-white").attr("style", "width:10em;height:10em;position:absolute;top:20%;left:0;right:0;margin:0 auto;"), o.append('<i class="fa fa-4x fa-mobile"></i><br/><span>请将屏幕竖向浏览</span>'), r.append(o), a = !0), n.append(i).append(r)) : (i.remove(), r.remove()), !s && 640 == p && f > 640 && (s = !0, n.height(f), e.swiper.resizeFix())
		}).trigger("resize")
	}, e.prototype.addLoadingBG = function() {
		var e = "background-color:#FFFFFF;-webkit-background-size: initial;-moz-background-size: initial;background-size: initial; background-color: #fff; visibility: visible;";
		this.$container.attr("style", e)
	}, window.MobileSlider = e
}();