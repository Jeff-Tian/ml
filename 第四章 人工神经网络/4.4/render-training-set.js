const getTargetDiv = () => document.querySelector('#trainingSet')

const renderTrainingSet = () => {
    const targetSet = getTargetDiv();
    const table = document.createElement('table')
    const head = table.createTHead()
    const headRow = head.insertRow()
    const x1Element = document.createElement('th')
    const x1text = document.createTextNode("x1")
    x1Element.appendChild(x1text)

    const x2Element = document.createElement('th')
    const x2text = document.createTextNode("x2")
    x2Element.appendChild(x2text)

    const tElement = document.createElement("th")
    const tText = document.createTextNode("目标值")
    tElement.appendChild(tText)

    const tfElement = document.createElement("th")
    const tfText = document.createTextNode("> 2 ?")
    tfElement.appendChild(tfText)

    headRow.appendChild(x1Element)
    headRow.appendChild(x2Element)
    headRow.appendChild(tElement)
    headRow.appendChild(tfElement)

    const body = table.createTBody()

    for (var i = 0; i < window.trainingSetData.length; i++) {
        const { x1, x2, t } = window.trainingSetData[i]
        const row = body.insertRow()
        const x1Cell = document.createElement('td');
        const x1Data = document.createTextNode(x1)
        x1Cell.appendChild(x1Data)

        const x2Cell = document.createElement('td')
        const x2Data = document.createTextNode(x2)
        x2Cell.appendChild(x2Data)

        const tCell = document.createElement('td')
        const tData = document.createTextNode(t)
        tCell.appendChild(tData);

        const tfCell = document.createElement("td")
        const tfData = document.createTextNode(t > 2 ? "T" : "F")
        tfCell.appendChild(tfData);

        row.appendChild(x1Cell)
        row.appendChild(x2Cell)
        row.appendChild(tCell)
        row.appendChild(tfCell)
    }

    targetSet.appendChild(table);
}

document.addEventListener('DOMContentLoaded', (event) => {
    renderTrainingSet()
});