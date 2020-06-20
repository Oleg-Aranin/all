//=======================================================================
let linerScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 600])
    .clamp(true)


console.log(linerScale(0))
console.log(linerScale(50))
console.log(linerScale(105))

console.log(linerScale.invert(300))

//========================================================================
let timeScale = d3.scaleTime()
    .domain([new Date(2019, 0, 1), new Date()])
    .range([0, 100])

console.log(timeScale(new Date(2019, 0, 15)))
console.log(timeScale(new Date(2019, 3, 15)))
console.log(timeScale(new Date()))

console.log(timeScale.invert(100))

//====================================================================
let quantizeScale = d3.scaleQuantize()
    .domain([0, 100])
    .range(['red', 'white', 'green'])

console.log(quantizeScale(55))
console.log(quantizeScale(22))
console.log(quantizeScale(99))

console.log(quantizeScale.invertExtent('red'))
console.log(quantizeScale.invertExtent('white'))

//====================================================================
let ordinalScale = d3.scaleOrdinal()
    .domain(['poor', 'good', 'great'])
    .range(['red', 'white', 'green'])

console.log(ordinalScale('good'))
console.log(ordinalScale('great'))
console.log(ordinalScale('poor'))
//====================================================================
d3.json("data.json")
    .then( function(data) {
        console.log(data)
    })

const getData = async () => {
    const data = await d3.json("data/data.json");
    console.log(data)
}

getData()

d3.csv('data/data.csv', function (data) {
    console.log(data)
})

d3.tsv('data/data.tsv', function (data) {
    console.log(data)
})

//============================================================================
const getData = async () => {
    const data = await d3.json("data/data.json");
    let min = d3.min(data, function (d) {
        return d.age
    })
    console.log(min)
    let max = d3.max(data, function (d) {
        return d.age
    })
    console.log(max)

    let extent = d3.extent(data, function (d) {
        return d.age
    })
    console.log(extent)
}

getData()

//============================================================================
const getData = async () => {
    const data = await d3.json("data/data.json");

    let extent = d3.extent(data, function (d) {
        return d.age
    })
    console.log(extent)

    let scale = d3.scaleLinear()
        .domain(extent)
        .range([0, 600])

    console.log(scale(38))

    let ages = d3.set(data, function (d) {
        return d.age
    })
    console.log(ages.values())
}

getData()
//===========================================================================
let link = d3.select('a')
console.log(link.nodes())

let linkAll = d3.selectAll('a')
console.log(linkAll.nodes())

let div = d3.select('div')
console.log(div.nodes())

let divLinks = div.selectAll('a')
console.log(divLinks.nodes())

console.log(d3.selectAll('div a').nodes())

console.log(d3.selectAll('.action').nodes())

console.log(d3.selectAll('.title').nodes())

console.log(d3.selectAll('a:nth-child(2)').nodes())

console.log(d3.selectAll(document.links).nodes())
console.log(d3.selectAll(document.links).size())
//=================================================================================
let secondLink = d3.selectAll('a:nth-child(2)')
console.log(secondLink.attr('href'))
secondLink.attr('href', 'http://google.com')
console.log(secondLink.nodes())

d3.selectAll('a:nth-child(1)')
    .attr('href', 'http://google.com')

d3.selectAll('a:nth-child(1)')
    .style('color', 'red')

d3.selectAll('a:nth-child(3)')
    .attr('href', 'http://google.com')
    .style('color', 'green')

d3.selectAll('a:nth-child(2)')
    .attr('href', 'http://google.com')
    .classed('red', true)
    .text('Inventory')
    .html('<b>SALE</b>')
//================================================================================

d3.select('.title')
    .append('button')
    .html('Save <b>SALE</b>')

d3.select('.title')
    .insert('button', 'a:first-child')
    .html('Save <b>SALE</b>')

d3.select('.title')
    .insert('button', 'a:nth-child(2)')
    .html('Save <b>SALE</b>')

d3.select('.action').remove()

d3.select('.title')
    .append('div')
    .style('color', 'red')
    .html('Save <b>SALE</b>')
    .append('button')
    .style('display', 'block')
    .text('submit')

//==========================================================================
let scores = [
    {name: 'Alice', score: 96},
    {name: 'Billy', score: 83},
    {name: 'Cindy', score: 91},
    {name: 'David', score: 96},
    {name: 'Emily', score: 88}
]


let update = d3.select('.chart')
    .selectAll('div')
    .data(scores, function (d) {
        return d ? d.name : this.innerText
    })
    .style('color', 'blue')

let enter = update.enter()
    .append('div')
    .text(d => d.name)
    .style('color', 'green')

update.exit().remove()

update.merge(enter)
    .style('width', d => d.score + 'px')
    .style('height', '50px')
    .style('background', 'lightgreen')
    .style('border', '1px solid black')
    .style('text-transform', 'uppercase')
//==============================================================================
let scores = [
    {name: 'Alice', score: 96},
    {name: 'Billy', score: 83},
    {name: 'Cindy', score: 91},
    {name: 'David', score: 96},
    {name: 'Emily', score: 88}
]


let bar = d3.select('.chart')
    .append('svg')
    .attr('width', 225)
    .attr('height', 300)
    .selectAll('g')
    .data(scores)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 33})`)

bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')

bar.append('text')
    .attr('y', 20)
    .text(d => d.name)
//============================================================================
let scores = [
    {name: 'Alice', score: 96},
    {name: 'Billy', score: 83},
    {name: 'Cindy', score: 91},
    {name: 'David', score: 96},
    {name: 'Emily', score: 88}
]


let bar = d3.select('.chart')
    .append('svg')
    .attr('width', 225)
    .attr('height', 300)
    .selectAll('g')
    .data(scores)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 33})`)

bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function() {
        d3.select(this).classed('barOn', true)
    })
    .on('mouseout', function() {
        d3.select(this).classed('barOn', false)
    })

bar.append('text')
    .attr('y', 20)
    .text(d => d.name)
//=============================================================================
let scores = [
    {name: 'Alice', score: 96},
    {name: 'Billy', score: 83},
    {name: 'Cindy', score: 91},
    {name: 'David', score: 96},
    {name: 'Emily', score: 88}
]


let bar = d3.select('.chart')
    .append('svg')
    .attr('width', 225)
    .attr('height', 300)
    .selectAll('g')
    .data(scores)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 33})`)

bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function(d, i, elements) {
        d3.select(this).style('transform', 'scaleX(2)')
        d3.selectAll(elements)
            .filter(':not(:hover)')
            .style('fill-opacity', 0.5)
    })
    .on('mouseout', function(d, i, elements) {
        d3.select(this).style('transform', 'scaleX(1)')
        d3.selectAll(elements)
            .style('fill-opacity', 1)
    })

bar.append('text')
    .attr('y', 20)
    .text(d => d.name)
//============================================================================
let scores = [
    {name: 'Alice', score: 96},
    {name: 'Billy', score: 83},
    {name: 'Cindy', score: 91},
    {name: 'David', score: 96},
    {name: 'Emily', score: 88}
]


let bar = d3.select('.chart')
    .append('svg')
    .attr('width', 225)
    .attr('height', 300)
    .selectAll('g')
    .data(scores)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 33})`)

function scaleBar(selection, scale) {
    selection.style('transform', `scaleX(${scale})`)
}

function setFill(selection, color) {
    selection.style('fill', color)
}

function fade(selection, opacity) {
    selection.style('fill-opacity', opacity)
}

bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function(d, i, elements) {
        d3.select(this)
            .call(scaleBar, 1.5)
            .call(setFill, 'orange')

        d3.selectAll(elements)
            .filter(':not(:hover)')
            .call(fade, 0.5)
    })
    .on('mouseout', function(d, i, elements) {
        d3.select(this).call(scaleBar, 1)
        d3.selectAll(elements)
            .call(fade, 1)
            .call(setFill, 'lightgreen')
    })

bar.append('text')
    .attr('y', 20)
    .text(d => d.name)
//=========================================================================
let margin = {top: 10, right: 20, bottom: 25, left: 25}
let width = 425 - margin.left - margin.right
let height = 625 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('rect')
    .attr('width', width / 2)
    .attr('height', height)
    .style('fill', 'lightgreen')
    .style('stroke', 'green')

svg.append('rect')
    .attr('x', width / 2)
    .attr('width', width / 2)
    .attr('height', height)
    .style('fill', 'lightgreen')
    .style('stroke', 'green')
//==============================================  axis  =================================
let margin = {top: 10, right: 20, bottom: 30, left: 40}
let width = 425 - margin.left - margin.right
let height = 625 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'lightgreen')
    .style('stroke', 'green')

let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])
// let yAxis = d3.axisLeft(yScale).ticks(5)  // or '.2s' 's' '%'
// let yAxis = d3.axisLeft(yScale).tickValues([8, 19, 43, 77])
let yAxis = d3.axisLeft(yScale)
svg.call(yAxis)

let xScale = d3.scaleTime()
    .domain([new Date(2016, 0, 1), new Date(2016, 1,1)])
    .range([0, width])

let xAxis = d3.axisBottom(xScale)
    .ticks(5) // (d3.timeMinute.every(45))
    // .tickSize(20)
    .tickSizeInner(10)
    .tickSizeOuter(20)
    .tickPadding(15)

svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

//===========================================  resize  ===============================
let margin = {top: 10, right: 20, bottom: 30, left: 40}
let width = 400 - margin.left - margin.right
let height = 600 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'lightgreen')
    .style('stroke', 'green')

let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])
let yAxis = d3.axisLeft(yScale)
svg.call(yAxis)

let xScale = d3.scaleTime()
    .domain([new Date(2016, 0, 1, 6), new Date(2016, 0,1, 9)])
    .range([0, width])

let xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickSize(10)
    .tickPadding(5)

svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)

function responsivefy(svg) {
    let container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize)

    d3.select(window).on('resize.' + container.attr('id'), resize)

    function resize() {
        let targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
    }
}
//======================================================================
let margin = {top: 10, right: 20, bottom: 60, left: 30}
let width = 400 - margin.left - margin.right
let height = 565 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let data = [
    {score:63, subject: 'математика'},
    {score:82, subject: 'география'},
    {score:74, subject: 'чтение'},
    {score:97, subject: 'русский язык'},
    {score:52, subject: 'физика'}
]


let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])
let yAxis = d3.axisLeft(yScale)
svg.call(yAxis)

let xScale = d3.scaleBand()
// .padding(0.2)
    .paddingInner(0.2)
    .paddingOuter(0.5)
    .align(0)
    .domain(data.map(d => d.subject))
    .range([0, width])

let xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickSize(10)
    .tickPadding(5)

svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('transform', 'rotate(-45)')

svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.subject))
    .attr('y', d => yScale(d.score))
    .attr('width', d => xScale.bandwidth())
    .attr('height', d => height - yScale(d.score))
    .style('fill', 'steelBlue')


function responsivefy(svg) {
    let container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize)

    d3.select(window).on('resize.' + container.attr('id'), resize)

    function resize() {
        let targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
    }
}
//======================================================================================
let margin = {top: 10, right: 20, bottom: 30, left: 30}
let width = 400 - margin.left - margin.right
let height = 565 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

const getData = async () => {
    const data = await d3.json("data/data-1.json");
    let yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.expectancy))
        .range([height, 0])
        .nice()
    let yAxis = d3.axisLeft(yScale)
    svg.call(yAxis)

    let xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.cost))
        .range([0, width])
        .nice()

    let xAxis = d3.axisBottom(xScale)
        .ticks(5)
    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis)

    let rScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.population)])
        .range([0, 40])

    let circles = svg
        .selectAll('.ball')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'ball')
        .attr('transform', d => {
            return `translate(${xScale(d.cost)}, ${yScale(d.expectancy)})`
        })

    circles
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', d => rScale(d.population))
        .style('fill-opacity', 0.5)
        .style('fill', 'steelblue')

    circles
        .append('text')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('y', 4)
        .text(d => d.code)
}

getData()


function responsivefy(svg) {
    let container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize)

    d3.select(window).on('resize.' + container.attr('id'), resize)

    function resize() {
        let targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
    }
}
//============================================  line  ============================================
let margin = {top: 10, right: 20, bottom: 30, left: 30}
let width = 400 - margin.left - margin.right
let height = 565 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

const getData = async () => {
    const data = await d3.json("data/data.json");

    let parseTime = d3.timeParse('%Y/%m/%d')

    data.forEach(company => {
        company.values.forEach(d => {
            d.date = parseTime(d.date)
            d.close = +d.close
        })
    })

    let xScale = d3.scaleTime()
        .domain([
            d3.min(data, co => d3.min(co.values, d => d.date)),
            d3.max(data, co => d3.max(co.values, d => d.date))
        ])
        .range([0, width])

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(5))

    let yScale = d3.scaleLinear()
        .domain([
            d3.min(data, co => d3.min(co.values, d => d.close)),
            d3.max(data, co => d3.max(co.values, d => d.close))
        ])
        .range([height, 0])

    svg
        .append('g')
        .call(d3.axisLeft(yScale))

    let line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5))

    svg
        .selectAll('.line')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('stroke-width', 2)
        .style('fill', 'none')

}

getData()


function responsivefy(svg) {
    let container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize)

    d3.select(window).on('resize.' + container.attr('id'), resize)

    function resize() {
        let targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
    }
}
//========================================  area  ==============================================

let margin = {top: 10, right: 20, bottom: 30, left: 30}
let width = 400 - margin.left - margin.right
let height = 565 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

const getData = async () => {
    const data = await d3.json("data/data.json");

    let parseTime = d3.timeParse('%Y/%m/%d')

    data.forEach(company => {
        company.values.forEach(d => {
            d.date = parseTime(d.date)
            d.close = +d.close
        })
    })

    let xScale = d3.scaleTime()
        .domain([
            d3.min(data, co => d3.min(co.values, d => d.date)),
            d3.max(data, co => d3.max(co.values, d => d.date))
        ])
        .range([0, width])

    svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).ticks(5))

    let yScale = d3.scaleLinear()
        .domain([
            d3.min(data, co => d3.min(co.values, d => d.close)),
            d3.max(data, co => d3.max(co.values, d => d.close))
        ])
        .range([height, 0])

    svg
        .append('g')
        .call(d3.axisLeft(yScale))

    let area = d3.area()
        .x(d => xScale(d.date))
        .y0(yScale(yScale.domain()[0]))
        .y1(d => yScale(d.close))
        .curve(d3.curveCatmullRom.alpha(0.5))

    svg
        .selectAll('.area')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'area')
        .attr('d', d => area(d.values))
        .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('stroke-width', 2)
        .style('fill', (d, i) => ['#FF9900', '#3369E8'][i])
        .style('fill-opacity', 0.5)



}

getData()


function responsivefy(svg) {
    let container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize)

    d3.select(window).on('resize.' + container.attr('id'), resize)

    function resize() {
        let targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
    }
}
//======================================  animate  =============================
d3.select('#block')
    .transition()
    .duration(1000)
    .delay(750)
    .ease(d3.easeBounceOut)
    // .ease(d3.easeCubicOut)
    // .ease(d3.easeElasticOut)
    .style('width', '400px')
    .transition()
    .duration(600)
    .ease(d3.easeBounceOut)
    .style('height', '600px')
    .duration(2000)
    .ease(d3.easeQuadOut)
    .style('background-color', 'purple')
//==================================  reuse transition  ============================
let t = d3.transition()
    .delay(1000)
    .duration(1000)

function go() {
    d3.selectAll('.block')
        .transition(t)
        .style('width', '400px')

    d3.select('.a')
        .transition(t)
        .style('background-color', 'orange')

    d3.select('.b')
        .transition(t)
        .style('background-color', 'blue')
}

function configure(t, delay, duration) {
    return t.delay(delay).delay(duration)
}

function goNow() {
    d3.selectAll('.block')
        .transition()
        .call(configure, 1000, 1000)
        .style('height', '300px')
}

//===============================  animate with the general update pattern ====================
let data = [
    {name: 'Alice', math: 37, science: 62, language: 54},
    {name: 'Billy', math: null, science: 34, language: 85},
    {name: 'Cindy', math: 86, science: 48, language: null},
    {name: 'David', math: 44, science: null, language: 65},
    {name: 'Emily', math: 59, science: 73, language: 29}
]
let margin = {top: 10, right: 10, bottom: 30, left: 30}
let width = 400 - margin.left - margin.right
let height = 535 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let xScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.2)

svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))

let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])


svg
    .append('g')
    .call(d3.axisLeft(yScale))

function render(subject = 'math') {
    let t = d3.transition().duration(1500)

    let update = svg.selectAll('rect')
        .data(data.filter(d => d[subject]), d => d.name)

    update.exit()
        .transition(t)
        .attr('y', height)
        .attr('height', 0)
        .remove()

    update
        .transition(t)
        .delay(1000)
        .attr('y', d => yScale(d[subject]))
        .attr('height', d => height - yScale(d[subject]))

    update
        .enter()
        .append('rect')
        .attr('y', height)
        .attr('height', 0)
        .attr('x', d => xScale(d.name))
        .attr('width', d => xScale.bandwidth())
        .transition(t)
        .delay(update.exit().size() ? 2000 : 0)
        .attr('y', d => yScale(d[subject]))
        .attr('height', d => height - yScale(d[subject]))

}
render()

function responsivefy(svg) {
    let container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize)

    d3.select(window).on('resize.' + container.attr('id'), resize)

    function resize() {
        let targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
    }
}
//================================================  animate chart axis============
let data = [
    {name: 'Alice', math: 37, science: 62, language: 54},
    {name: 'Billy', math: null, science: 34, language: 85},
    {name: 'Cindy', math: 86, science: 48, language: null},
    {name: 'David', math: 144, science: null, language: 65},
    {name: 'Emily', math: 59, science: 55, language: 29}
]
let margin = {top: 10, right: 10, bottom: 30, left: 30}
let width = 400 - margin.left - margin.right
let height = 535 - margin.top - margin.bottom

let svg = d3.select('.chart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

let xScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, width])
    .padding(0.2)

svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))

let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0])


let yAxis = svg
    .append('g')
    .call(d3.axisLeft(yScale))

function render(subject = 'math') {
    let t = d3.transition().duration(1500)

    let update = svg.selectAll('rect')
        .data(data.filter(d => d[subject]), d => d.name)

    update.exit()
        .transition(t)
        .attr('y', height)
        .attr('height', 0)
        .remove()

    yScale.domain([0, d3.max(data, d => d[subject])])
    yAxis
        .transition(t)
        .delay(1000)
        .call(d3.axisLeft(yScale))

    update
        .transition(t)
        .delay(1000)
        .attr('y', d => yScale(d[subject]))
        .attr('height', d => height - yScale(d[subject]))

    update
        .enter()
        .append('rect')
        .attr('y', height)
        .attr('height', 0)
        .attr('x', d => xScale(d.name))
        .attr('width', d => xScale.bandwidth())
        .transition(t)
        .delay(update.exit().size() ? 2000 : 0)
        .attr('y', d => yScale(d[subject]))
        .attr('height', d => height - yScale(d[subject]))

}
render()

function responsivefy(svg) {
    let container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style('width')),
        height = parseInt(svg.style('height')),
        aspect = width / height

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMid')
        .call(resize)

    d3.select(window).on('resize.' + container.attr('id'), resize)

    function resize() {
        let targetWidth = parseInt(container.style('width'))
        svg.attr('width', targetWidth)
        svg.attr('height', Math.round(targetWidth / aspect))
    }
}
