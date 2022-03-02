function init(isIndex) {
    let navbar = document.getElementById("navbar");
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Dark mode
        navbar.classList.add("navbar-dark");
        navbar.classList.add("bg-dark");
    } else {
        // Light mode ew
        navbar.classList.add("navbar-light");
        navbar.classList.add("bg-light");
    }
    if (isIndex) {
        document.onmousemove = mouseMove;
        document.onscroll = updateNavBar;
        triangles();
    }
}

function loadFooter() {
    let body = document.getElementById("footer").innerHTML = `

    `;
}

let allTriangles = [];
let time = 0;
let canvas = document.getElementById("back");
let ctx;
if (canvas != null) {
    ctx = canvas.getContext("2d");
}
let mainCanvas = document.getElementById("main_canvas");
let ctxMain = mainCanvas.getContext("2d");
let navbarAll = document.getElementById("navbar");
let navbar = navbarAll.style;
let mouse = Infinity;


/**
 * Triangle class for triangle things
 */
class Tri {
    /**
     * Make a triangle with specified points and "trajectory"
     * @param {number[][]} points three points of the triangle
     * @param {number[]} trajectory 4 numbers that determine the trajectory of the triangle
     * @param {string} fill Fill colour for that triangle
     */
    constructor(points, trajectory, fill) {
        this.points = points;
        this.trajectory = trajectory;
        this.fill = fill;
    }
    /**
     * Update the triangle position based on the time. Calls `this.draw` once updated
     */
    update() {
        let saved = this.points;
        let translate = [
            this.trajectory[0] * Math.sin(time) + this.trajectory[1] * Math.sin(2 * time) + this.trajectory[2] * Math.sin(3 * time) + this.trajectory[3] * Math.sin(4 * time),
            this.trajectory[0] * Math.cos(time) + this.trajectory[1] * Math.cos(2 * time) + this.trajectory[2] * Math.cos(3 * time) + this.trajectory[3] * Math.cos(4 * time)
        ];
        this.points = [
            [this.points[0][0] + translate[0], this.points[0][1] + translate[1]],
            [this.points[1][0] + translate[0], this.points[1][1] + translate[1]],
            [this.points[2][0] + translate[0], this.points[2][1] + translate[1]]
        ];
        this.draw();
        this.points = saved;
    }
    /**
     * draw the triangle at the current time to the canvas
     */
    draw() {
        // Draw triangle on top
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.moveTo(this.points[0][0], this.points[0][1]);
        ctx.lineTo(this.points[1][0], this.points[1][1]);
        ctx.lineTo(this.points[2][0], this.points[2][1]);
        ctx.lineTo(this.points[0][0], this.points[0][1]);
        ctx.closePath();
        ctx.fill();
        // Draw drop shadow behind existing pixels
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "rgba(255, 168, 211, 90%)";
        ctx.beginPath();
        ctx.moveTo(this.points[0][0] + 0.4067 * 5, this.points[0][1] + 0.9135 * 5);
        ctx.lineTo(this.points[1][0] + 0.4067 * 5, this.points[1][1] + 0.9135 * 5);
        ctx.lineTo(this.points[2][0] + 0.4067 * 5, this.points[2][1] + 0.9135 * 5);
        ctx.lineTo(this.points[0][0] + 0.4067 * 5, this.points[0][1] + 0.9135 * 5);
        ctx.closePath();
        ctx.fill();
    }
}

/**
 * Initial function to resize canvases, and populate with triangles
 */
function triangles() {
    navbar.opacity = "0";
    // Hero thing time
    let heroDiv = document.getElementById("hero_div");
    canvas.width = heroDiv.clientWidth;
    canvas.height = heroDiv.clientHeight;

    let area = heroDiv.clientWidth * heroDiv.clientHeight / 1000;
    let scale = Math.min(40, 0.012 * area + 26);
    let padding = Math.min(50, 0.046 * area + 3.8);
    for (let i = 0; i < Math.min(0.015 * area + 4.3, 0.001 * area + 19); i++) {
        let p0 = [Math.random() * (canvas.width - padding * 2) + padding, Math.random() * (canvas.height - padding * 3) + padding];
        let theta1 = Math.random() * 2 + 0.7;
        let theta2 = Math.random() * 2 - 1;
        let a = scale * (Math.random() + 1.5);
        let b = scale * (Math.random() + 1.5);

        let triangle = new Tri(
            [
                p0,
                [p0[0] + a * Math.cos(theta2), p0[1] + a * Math.sin(theta2)],
                [p0[0] + b * Math.cos(theta1 + theta2), p0[1] + b * Math.sin(theta1 + theta2)]
            ], [
                ((Math.random() ** 2) * 2 - 1) * 10,
                ((Math.random() ** 2) * 2 - 1) * 10,
                ((Math.random() ** 2) * 2 - 1) * 10,
                ((Math.random() ** 2) * 2 - 1) * 10
            ],
            "hsl(" + Math.random() * 290 + " , " + (Math.random() * 35 + 60) + "% , " + (Math.random() * 10 + 60) + "%)"
        );

        triangle.draw(ctx);
        allTriangles.push(triangle);
    }
}

function updateAllTris() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allTriangles.map(
        function (t) { t.update(); }
    );
    time += 0.005;
}

function mouseMove(e) {
    mouse = e.pageY - scrollY;
    updateNavBar();
}

function updateNavBar() {
    if ((mouse <= navbarAll.clientHeight) || ((scrollY / innerHeight) > 0.2)) {
        navbar.opacity = "1";
    } else {
        navbar.opacity = "0";
    }
}

if (ctx != null) {
    setInterval(updateAllTris, 100);
}

/**
 * Loads the flavour list into the right place
 * @param {HTMLDivElement} elem
 */
function flavourList(elem) {
    let flavours = [
        ["Pure", "The base flavour of fck"],
        ["Counting", "For maths based coding"]
    ];
    let contents = `<p>We currently have ` + flavours.length + ` flavours. If you want to doenload or have a deeper look at any of the flavours, click on the name:</p><ul>`;
    for (let i = 0; i < flavours.length; i++) {
        contents += `<li><a href="flavours.html#` + flavours[i][0].toLowerCase() + `"><b>` + flavours[i][0] + `</b></a><br>` + flavours[i][1] + `</li>`;
    }
    elem.innerHTML = contents + `</ul>`;
}

/**
 * Fills in all the lists of features for the different flavour
 * @param {HTMLDivElement} elem
 */
function flavourDetailLists(elem) {
    function itemise(c) {
        return `<div class="col"><ul><li>` + c + `</li></ul></div>`
    }
    // [name, description, types, functions, constants]
    let contents = [
        [
            "Counting",
            "Counting is for anyone interested in maths. It includes matrix and vector extensions along with functions for real and complex analysis.",
            ["Vector", "Matrix", "Complex"],
            ["Gamma function", "Digamma function", "Polygamma function", "Reimann-Zeta function", "Generalised harmonic series", "Binomial coefficients", "Polylogarithmic function", "Hyperbolic functions", "Complex-valued trigonometric functions", "Beta function", "Product function", "Chebyshev polynomials of the first kind", "Permutation signature"],
            ["Phi or golden ratio", "Euler-Mascheroni constant", "Catalan's constant", "Wierstrass' constant", "Gelfond's constant", "Sierpinsky's constant", "Gauss' constant", "Golden angle", "Twin primes constant", "Plastic constant", "Magic angle"]
        ]
    ]
    contents.forEach(function (v) {
        let inner = `<div class="py-3"><div class="row py-2"><h2 id="` + v[0].toLowerCase() + `">` + v[0] + `</h2></div><div class="row"><p>` + v[1] + `</p><p>
                        <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#countingC" aria-expanded="false" aria-controls="` + v[0].toLowerCase() + `C">See the full features</button></p><div class="collapse" id="` + v[0].toLowerCase() + `C"><h4>Types</h4><div class="row">`;
        v[2].forEach(function (t) {
            inner += itemise(t);
        });
        inner += `</div><h4>Functions</h4><div class="row">`;
        v[3].forEach(function (t) {
            inner += itemise(t);
        });
        inner += `</div><h4>Functions</h4><div class="row">`;
        v[4].forEach(function (t) {
            inner += itemise(t);
        });
        inner += `</div></div></div></div>`;
        elem.innerHTML += inner;
    })

}
