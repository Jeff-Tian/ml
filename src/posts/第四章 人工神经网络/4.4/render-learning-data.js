const trainingData = window.trainingSetData.map(item => ({
    x: [item.x1, item.x2],
    t: item.t
}));

const eta1 = 0.15
const eta2 = 0.1
const eta3 = 0.05

const details1 = LinearUnit.learn([1, 1], eta1, trainingData)
const details2 = LinearUnit.learn([1, 1], eta2, trainingData)
const details3 = LinearUnit.learn([1, 1], eta3, trainingData)

Plotly.newPlot('error-plot', [getSeries(details1, '\\eta = ' + eta1), getSeries(details2, '\\eta = ' + eta2), getSeries(details3, '\\eta = ' + eta3)], { margin: { t: 0 } });

function getSeries(detail, name) {
    return { x: detail.map(d => d.iter), y: detail.map(d => d.e), name };
}

window.details1 = details1
window.details2 = details2
window.details3 = details3