function datasetEncode(dom, data, txt) {
    var option = {
        dataset: {
            source: data
            // [
            //     ['score', 'amount', 'product'],
            //     [89.3, 58212, 'Matcha Latte'],
            //     [57.1, 78254, 'Milk Tea'],
            //     [74.4, 41032, 'Cheese Cocoa'],
            //     [50.1, 12755, 'Cheese Brownie']
            // ]
        },
        grid: {containLabel: true},
        xAxis: {name: data[0][1]},
        yAxis: {type: 'category'},
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            text: ['High Num', 'Low Num'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#E15457','#D7DA8B']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: data[0][1],
                    // Map the "product" column to Y axis
                    y: data[0][2]
                }
            }
        ]
    };
    var myChart = echarts.init(dom);
    myChart.setOption(option, true);
}