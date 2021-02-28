function unpack(rows, key) {
    return rows.map(function (row) { return row[key]; });
}

function getRandomValue() {
    return -100 + Math.random() * 200;
}

const traceOptions = {
    mode: 'markers',
    marker: {
        size: 1,
        line: {
            color: 'blue',
            width: 1
        },
        opacity: 0.8
    },
    type: 'scatter3d'
}

var trainingSetData = LinearUnit.generateTrainingSet(500).map(o => ({
    x1: o.x[0],
    x2: o.x[1],
    t: o.t
}));

window.trainingSetData = trainingSetData;

var trainingSetTrace = {
    ...traceOptions,
    marker: {
        size: 2,
        line: {
            color: 'green',
            width: 1.5
        },
        opacity: 1
    },
    x: unpack(trainingSetData, 'x1'), y: unpack(trainingSetData, 'x2'), z: unpack(trainingSetData, 't'),
    name: 'z = x_1 + 2 x_2'
};

var z0 = {
    type: 'mesh3d',
    x: [-100, -100, 100, 100],
    y: [-100, 100, -100, 100],
    z: [0, 0, 0, 0],
    opacity: 0.5,
    color: 'red',
    name: 'z = 0'
}

var x0 = {
    ...traceOptions,
    x: new Array(800).fill(0),
    y: new Array(800).fill(0).map(getRandomValue),
    z: new Array(800).fill(0).map(getRandomValue),
    name: 'x = 0'
}

var y0 = {
    ...traceOptions,
    x: new Array(800).fill(0).map(getRandomValue),
    y: new Array(800).fill(0),
    z: new Array(800).fill(0).map(getRandomValue),
    name: 'y = 0'
}

const x = new Array(800).fill(0).map(getRandomValue);

var zx = {
    ...traceOptions,
    x: x,
    y: new Array(800).fill(0),
    z: x,
    name: 'z = x_1'
}

var z2y = {
    ...traceOptions,
    x: new Array(800).fill(0),
    y: x,
    z: x.map(y => y * 2),
    name: 'z = 2 x_2'
}

var data = [trainingSetTrace, z0, x0, y0, zx, z2y];
var layout = {
    shapes: [
    ],
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
    },
    scene: {
        xaxis: {
            title: {
                text: 'x1'
            },
        },

        yaxis: {
            title: {
                text: 'x2'
            }
        },

        zaxis: {
            title: {
                text: 'target value'
            }
        }
    }
};

Plotly.newPlot('myDiv', data, layout);
