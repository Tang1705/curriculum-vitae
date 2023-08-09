(function () {
    function b(a, b, e, f) {
        var c = (a.className || "").split(/\s+/g);
        "" === c[0] && c.shift();
        var d = c.indexOf(b);
        0 > d && e && c.push(b);
        0 <= d && f && c.splice(d, 1);
        a.className = c.join(" ");
        return 0 <= d
    }

    if (!("classList" in document.createElement("div"))) {
        var e = {
            add: function (a) {
                b(this.element, a, !0, !1)
            }, contains: function (a) {
                return b(this.element, a, !1, !1)
            }, remove: function (a) {
                b(this.element, a, !1, !0)
            }, toggle: function (a) {
                b(this.element, a, !0, !0)
            }
        };
        Object.defineProperty(HTMLElement.prototype, "classList", {
            get: function () {
                if (this._classList) return this._classList;
                var a = Object.create(e, {element: {value: this, writable: !1, enumerable: !0}});
                Object.defineProperty(this, "_classList", {value: a, writable: !1, enumerable: !1});
                return a
            }, enumerable: !0
        })
    }
})();

(function () {/*
 pdf2htmlEX.js: Core UI functions for pdf2htmlEX
 Copyright 2012,2013 Lu Wang <coolwanglu@gmail.com> and other contributors
 https://github.com/pdf2htmlEX/pdf2htmlEX/blob/master/share/LICENSE
*/
    var pdf2htmlEX = window.pdf2htmlEX = window.pdf2htmlEX || {}, CSS_CLASS_NAMES = {
        page_frame: "pf",
        page_content_box: "pc",
        page_data: "pi",
        background_image: "bi",
        link: "l",
        input_radio: "ir",
        __dummy__: "no comma"
    }, DEFAULT_CONFIG = {
        container_id: "page-container",
        sidebar_id: "sidebar",
        outline_id: "outline",
        loading_indicator_cls: "loading-indicator",
        preload_pages: 3,
        render_timeout: 100,
        scale_step: 0.9,
        key_handler: !0,
        hashchange_handler: !0,
        view_history_handler: !0,
        __dummy__: "no comma"
    }, EPS = 1E-6;

    function invert(a) {
        var b = a[0] * a[3] - a[1] * a[2];
        return [a[3] / b, -a[1] / b, -a[2] / b, a[0] / b, (a[2] * a[5] - a[3] * a[4]) / b, (a[1] * a[4] - a[0] * a[5]) / b]
    }

    function transform(a, b) {
        return [a[0] * b[0] + a[2] * b[1] + a[4], a[1] * b[0] + a[3] * b[1] + a[5]]
    }

    function get_page_number(a) {
        return parseInt(a.getAttribute("data-page-no"), 16)
    }

    function disable_dragstart(a) {
        for (var b = 0, c = a.length; b < c; ++b) a[b].addEventListener("dragstart", function () {
            return !1
        }, !1)
    }

    function clone_and_extend_objs(a) {
        for (var b = {}, c = 0, e = arguments.length; c < e; ++c) {
            var h = arguments[c], d;
            for (d in h) h.hasOwnProperty(d) && (b[d] = h[d])
        }
        return b
    }

    function Page(a) {
        if (a) {
            this.shown = this.loaded = !1;
            this.page = a;
            this.num = get_page_number(a);
            this.original_height = a.clientHeight;
            this.original_width = a.clientWidth;
            var b = a.getElementsByClassName(CSS_CLASS_NAMES.page_content_box)[0];
            b && (this.content_box = b, this.original_scale = this.cur_scale = this.original_height / b.clientHeight, this.page_data = JSON.parse(a.getElementsByClassName(CSS_CLASS_NAMES.page_data)[0].getAttribute("data-data")), this.ctm = this.page_data.ctm, this.ictm = invert(this.ctm), this.loaded = !0)
        }
    }

    Page.prototype = {
        hide: function () {
            this.loaded && this.shown && (this.content_box.classList.remove("opened"), this.shown = !1)
        }, show: function () {
            this.loaded && !this.shown && (this.content_box.classList.add("opened"), this.shown = !0)
        }, rescale: function (a) {
            this.cur_scale = 0 === a ? this.original_scale : a;
            this.loaded && (a = this.content_box.style, a.msTransform = a.webkitTransform = a.transform = "scale(" + this.cur_scale.toFixed(3) + ")");
            a = this.page.style;
            a.height = this.original_height * this.cur_scale + "px";
            a.width = this.original_width * this.cur_scale +
                "px"
        }, view_position: function () {
            var a = this.page, b = a.parentNode;
            return [b.scrollLeft - a.offsetLeft - a.clientLeft, b.scrollTop - a.offsetTop - a.clientTop]
        }, height: function () {
            return this.page.clientHeight
        }, width: function () {
            return this.page.clientWidth
        }
    };

})();
