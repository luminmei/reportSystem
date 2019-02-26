
function pieRoseType(dom, pieData, titleText) {
  var option = {
    title: {
      text: titleText,
      x: 'center',
      textStyle: {
        color: 'orange'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
      right:'15px',
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ['pie']
        },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    series: [
      {
        name: '类型',
        type: 'pie',
        radius: [30, 130],
        center: ['50%', '50%'],
        roseType: 'area',
        data: pieData
      }
    ]
  }
  var myChart = echarts.init(dom);
  myChart.setOption(option, true)
}

