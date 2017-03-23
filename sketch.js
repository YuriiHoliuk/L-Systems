var systems = {
    koch_curve: {
        axiom: 'F',
        rules: [{
            a: 'F',
            b: 'F+F-F-F+F'
        }],
        turtle: function() {
            background(51);
            translate(5, height - 5);
            stroke(255, 200, 100);

            len *= 0.67;
            for (var i = 0; i < string.length; i++) {
                if (string[i] == 'F') {
                    line(0, 0, len, 0);
                    translate(len, 0);
                } else if (string[i] == '+') {
                    rotate(-angle);
                } else if (string[i] == '-') {
                    rotate(angle);
                }
            }
        },
        len: 75,
        angle: Math.PI / 2
    },
    sierpinski_triangle: {
        axiom: 'F-G-G',
        rules: [{
                a: 'F',
                b: 'F-G+F+G-F'
            },
            {
                a: 'G',
                b: 'GG'
            }
        ],
        turtle: function() {
            background(51);
            translate(50, height - 50);
            stroke(255, 100, 200);

            len *= 0.5;

            for (var i = 0; i < string.length; i++) {
                if (string[i] == 'F' || string[i] == 'G') {
                    line(0, 0, 0, -len);
                    translate(0, -len);
                } else if (string[i] == '+') {
                    rotate(-angle);
                } else if (string[i] == '-') {
                    rotate(angle);
                }
            }

        },
        len: 1800,
        angle: 2 * Math.PI / 3
    },
    dragon_curve: {
        axiom: 'FX',
        rules: [{
                a: 'X',
                b: 'X+YF+'
            },
            {
                a: 'Y',
                b: '-FX-Y'
            }
        ],
        turtle: function() {
            background(51);
            translate(240, 500);
            stroke(150, 200, 255);

            for (var i = 0; i < string.length; i++) {
                if (string[i] == 'F') {
                    line(0, 0, 0, -len);
                    translate(0, -len);
                } else if (string[i] == '+') {
                    rotate(-angle);
                } else if (string[i] == '-') {
                    rotate(angle);
                }
            }
        },
        len: 5,
        angle: Math.PI / 2
    },
    fractal_plant: {
        axiom: 'X',
        rules: [{
                a: 'X',
                b: 'F-[[X]+X]+F[+FX]-X'
            },
            {
                a: 'F',
                b: 'FF'
            }
        ],
        len: 200,
        angle: 0.436332313,
        turtle: function() {
            background(51);
            translate(100, height - 30);
            stroke(100, 255, 110);

            len *= 0.6;

            for (var i = 0; i < string.length; i++) {
                if (string[i] == 'F') {
                    // line(0, 0, 0, -len);
                    // translate(0, -len);
                    line(0, 0, len * Math.sin(angle), -len * Math.cos(angle));
                    translate(len * Math.sin(angle), -len * Math.cos(angle));
                } else if (string[i] == '+') {
                    rotate(angle);
                } else if (string[i] == '-') {
                    rotate(-angle);
                } else if (string[i] == '[') {
                    push();
                } else if (string[i] == ']') {
                    pop();
                }
            }
        }
    }

};

// var currentSystem = systems.koch_curve; //Why it doesent work?

var currentSystem = document.querySelector('.system').value;

var axiom = systems[currentSystem].axiom;
var string = axiom;
var rules = systems[currentSystem].rules;
var turtle = systems[currentSystem].turtle;
var len = systems[currentSystem].len;
var angle = systems[currentSystem].angle;

function setSystem() {
    currentSystem = document.querySelector('.system').value;

    axiom = systems[currentSystem].axiom;
    string = axiom;
    rules = systems[currentSystem].rules;
    turtle = systems[currentSystem].turtle;
    len = systems[currentSystem].len;
    angle = systems[currentSystem].angle;

    background(51);
    $('.string').text(axiom);
    turtle(axiom);
}

function generate() {
    var newString = '';

    for (var i = 0; i < string.length; i++) {
        var current = string[i];
        var found = false;
        for (var j = 0; j < rules.length; j++) {
            if (current == rules[j].a) {
                found = true;
                newString += rules[j].b;
                break;
            }
        }
        if (!found) {
            newString += current
        }
    }

    string = newString;
    $('.string').text(string);
    turtle(string);
}


function setup() {
    createCanvas(1000, 1000);
    background(51);

    var button = createButton('Generate').addClass('generate');
    button.mousePressed(generate);
    document.querySelector('.system').addEventListener('change', setSystem);

    createP(axiom).addClass('string');
    turtle(axiom);
}