
function pieDoughunt(dom, pieData, titleText) {
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
      formatter: "{a} <br/>{b}: {c} ({d}%)"
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
    series: [
      {
        name: '类型',
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: pieData
      }
    ]
  };
  var myChart = echarts.init(dom);
  myChart.setOption(option, true)
}