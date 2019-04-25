function lineSimple(dom, xLabel, barData, titleText) {
    option = {
        xAxis: {
            type: 'category',
            data: xLabel
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            itemStyle: {
                normal: {
                    //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                            '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    //以下为是否显示，显示位置和显示格式的设置了
                    label: {
                        show: true,
                        position: 'top',
//                             formatter: '{c}'
                        formatter: '\n{c}'
                    }
                }
            },
                    data: barData,
            type: 'line'
        }]
    };
    var myChart = echarts.init(dom);
    myChart.setOption(option, true)
}