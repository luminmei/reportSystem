function pieSimple(dom, pieData, txt) {
  var option = {
    title: {
      text: txt,
      x: 'center',
      textStyle: {
        color: '#c37e00'
      }
    },
    color: [
      "#9BCA63", "#01AAED", "#FF5722", "#5FB878",'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
      '#FE8463','#FFB800','#FAD860','#F3A43B','#60C0DD',
      '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
    ],
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