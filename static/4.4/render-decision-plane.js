const xx = getRandomValues(50);
const y = getRandomValues(50);

const [decisionEta1_5, decisionEta1_10, decisionEta1_50, decisionEta1_100] = getDecisions(details1);

const l = {
    showlegend: true,
};

Plotly.newPlot('decision-1', [trainingSetTrace, decisionEta1_5, decisionEta1_10, decisionEta1_50, decisionEta1_100], l);

Plotly.newPlot('decision-2', [trainingSetTrace, ...getDecisions(details2)], l);

Plotly.newPlot('decision-3', [trainingSetTrace, ...getDecisions(details3)], l);

function getDecisions(details) {
    const decisionEta1_5 = {
        opacity: 0.4,
        color: 'blue',
        type: "mesh3d",
        x: xx,
        y: y,
        z: new Array(50).fill(0).map((_, i) => LinearUnit.linearUnit(...details[4].weights)(xx[i], y[i])),
        name: '第5次迭代'
    };

    const decisionEta1_10 = {
        opacity: 0.4,
        color: 'cyan',
        type: "mesh3d",
        x: xx,
        y: y,
        z: new Array(50).fill(0).map((_, i) => LinearUnit.linearUnit(...details[9].weights)(xx[i], y[i])),
        name: '第10次迭代'
    };

    const decisionEta1_50 = {
        opacity: 0.4,
        color: 'red',
        type: "mesh3d",
        x: xx,
        y: y,
        z: new Array(50).fill(0).map((_, i) => LinearUnit.linearUnit(...details[49].weights)(xx[i], y[i])),
        name: '第50次迭代'
    };

    const decisionEta1_100 = {
        opacity: 0.4,
        color: 'black',
        type: "mesh3d",
        x: xx,
        y: y,
        z: new Array(50).fill(0).map((_, i) => LinearUnit.linearUnit(...details[99].weights)(xx[i], y[i])),
        name: '第100次迭代'
    };
    return [decisionEta1_5, decisionEta1_10, decisionEta1_50, decisionEta1_100];
}

function getRandomValues(n) {
    return new Array(n).fill(0).map(() => -15 + Math.random() * 30);
}

