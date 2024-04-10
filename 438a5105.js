const a = document.getElementById("blob-follow");
if (a !== null) {
    const e = n => {
            n.classList.remove("hide")
        },
        t = n => {
            n.classList.add("hide")
        },
        l = ({
            clientX: n,
            clientY: i
        }) => {
            isNaN(n) || isNaN(i) || a.animate({
                left: `${n}px`,
                top: `${i}px`
            }, {
                duration: 3e3,
                fill: "forwards"
            })
        },
        h = n => {
            const {
                clientX: i,
                clientY: o
            } = n;
            a.animate({
                left: `${i}px`,
                top: `${o}px`
            }, {
                duration: 0,
                fill: "forwards"
            }), e(a)
        };
    document.body.onpointermove = l, document.body.onscroll = l, document.body.addEventListener("pointerenter", h), document.body.addEventListener("pointerleave", n => {
        t(a)
    })
}
const c = document.getElementById("scrollCoffee");
if (c) {
    let e = function() {
        window.scrollY > 4e3 ? (c.classList.add("show"), c.classList.remove("hide")) : (c.classList.add("hide"), c.classList.remove("show"))
    };
    window.addEventListener("scroll", e), e()
}
const b = () => document.querySelectorAll(".card-text").forEach(e => {
    const t = e.offsetHeight / parseInt(e.style.lineHeight);
    e.style.lineClamp = Math.floor(t), e.style.webkitLineClamp = Math.floor(t), e.style.height = Math.floor(t) * parseInt(e.style.lineHeight) + "px"
});
b();
const r = document.querySelectorAll(".image-lazy-load");
for (let e = 0; e < r.length; ++e) {
    const t = r[e].querySelector("img");
    r[e].classList.add("not-loaded");
    const l = () => {
        r[e].classList.remove("not-loaded"), r[e].classList.add("loaded")
    };
    t.complete ? l() : t.addEventListener("load", l)
}
const m = [document.getElementById("prev"), document.getElementById("next")];
if (m[0] && m[1]) {
    const e = [m[0].href, m[1].href];
    document.onkeydown = t => {
        switch (t.keyCode) {
            case 37:
                {
                    window.location = e[0];
                    break
                }
            case 39:
                {
                    window.location = e[1];
                    break
                }
        }
    }
}
class x extends HTMLElement {
    constructor() {
        if (super(), !this.dataset.sidebar) {
            let t = function() {
                window.scrollY > 250 || window.innerWidth >= 1132 ? l.classList.add("show") : l.classList.remove("show")
            };
            const l = document.getElementById("pagination");
            window.addEventListener("scroll", t), t()
        }
    }
}
customElements.define("pagination-div", x);
const I = new IntersectionObserver(e => {
    e.forEach(t => {
        t.isIntersecting ? t.target.classList.add("scroll-show-show") : t.boundingClientRect.top > 0 && t.target.classList.remove("scroll-show-show")
    })
});
document.querySelectorAll(".scroll-show").forEach(e => {
    e.classList.add("scroll-show-hidden"), I.observe(e)
});
const w = document.getElementById("scrollButton");

function p() {
    window.scrollY > 250 ? w.classList.add("show") : w.classList.remove("show")
}
window.addEventListener("scroll", p);
p();
class S extends HTMLElement {
    constructor() {
        if (super(), this.dataset.headings) {
            const t = JSON.parse(this.dataset.headings),
                l = t.map(o => ({
                    slug: o.slug,
                    el: document.getElementById(`sidebar-section-${o.slug}`)
                }));
            let h = [];
            t.map(o => document.getElementById(o.slug)).forEach(o => {
                h.push(o)
            });
            const n = 60 / 100,
                i = () => {
                    const o = h.map(s => ({
                            height: s.getBoundingClientRect().y - window.innerHeight * (1 - n),
                            id: s.id
                        })),
                        f = (s, g, y) => {
                            [
                                ["add", g],
                                ["remove", y]
                            ].forEach(([E, L]) => {
                                L.forEach(v => {
                                    s.classList[E](v)
                                })
                            })
                        },
                        d = (s, g) => {
                            g ? f(s, ["text-gray-400", "bg-zinc-800", "rounded-md", "cursor-default", "pl-[0.5rem]", "ml-[-0.5rem]"], ["text-gray-600"]) : f(s, ["text-gray-600"], ["text-gray-400", "bg-zinc-800", "rounded-md", "cursor-default", "pl-[0.5rem]", "ml-[-0.5rem]"])
                        },
                        u = o.findIndex(s => s.height > 0) - 1;
                    l.forEach(s => {
                        switch (u) {
                            case -2:
                                {
                                    o[o.length - 1].height < 0 && (s.slug == o[o.length - 1].id ? d(s.el, !0) : d(s.el, !1));
                                    break
                                }
                            case -1:
                                {
                                    d(s.el, !1);
                                    break
                                }
                            default:
                                s.slug == o[u].id ? d(s.el, !0) : d(s.el, !1)
                        }
                    })
                };
            document.addEventListener("scroll", i), i()
        }
    }
}
customElements.define("toc-sidebar", S);
