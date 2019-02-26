function pieSimple(dom, pieData, txt) {
  var option = {
    title: {
      text: txt,
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
    series: [
      {
        name: '类型',
        type: 'pie',
        radius: '45%',
        center: ['55%', '50%'],
        data: pieData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  var myChart = echarts.init(dom);
  myChart.setOption(option, true);
}