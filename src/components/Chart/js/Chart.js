import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import { fromJS } from 'immutable';

import Loader from '../../Loader';
import Message from '../../Message';

echarts.registerMap('world', require('echarts/map/json/world.json'));

const lineBarChart = {
  defaultOpts: fromJS({
    color: [],
    toolbox: {
      left: 'left',
      itemSize: 15,
      feature: {
        dataZoom: {
          yAxisIndex: false,
          show: true,
        },
        restore: {},
      },
    },
    dataZoom: [{
      show: true,
      start: 0,
      end: 100,
      orient: 'horizontal',
      dataBackground: {
        lineStyle: {
          color: '#368493',
        },
        areaStyle: {
          color: '#368493',
        },
      },
      handleStyle: {
        color: '#368493',
      },
      textStyle: {
        color: '#5a5a68',
      },
      borderColor: 'transparent',
      fillerColor: 'rgba(54, 132, 147, 0.1)',
    }],
    legend: {
      data: [],
      right: '1%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '50px',
      top: '40px',
      containLabel: true,
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      boundaryGap: true,
      axisPointer: {
        show: true,
      },
      splitLine: {
        lineStyle: {
          type: 'dotted',
          color: '#F0F0F0',
        },
        show: true,
      },
      axisLabel: {
        inside: false,
        padding: [3, 6, 3, 0],
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      type: 'value',
    },
    textStyle: {
      color: '#5a5a68',
    },
    series: [],
    animationEasing: 'elasticOut',
  }),
  seriesDefault: fromJS({
    data: [],
    type: 'line',
    areaStyle: {},
    smooth: true,
    name: '',
  }),
};

const pieChart = {
  defaultOpts: fromJS({
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'horizontal',
      x: 'left',
      y: 'top',
      data: [],
    },
    color: [],
    series: [],
  }),
  seriesDefault: fromJS({
    type: 'pie',
    center: [
      '50%',
      '55%',
    ],
    radius: [
      '50%',
      '75%',
    ],
    avoidLabelOverlap: false,
    animationType: 'scale',
    animationEasing: 'elasticOut',
    labelLine: {
      normal: {
        show: true,
        smooth: 0.2,
        length: 6,
        length2: 6,
      },
    },
    data: [],
  }),
};

const buildChartOptions = (type, options, series) => {
  let finalOpts = {};

  switch (type) {
  case 'pie': {
    finalOpts = pieChart.defaultOpts.mergeDeep(fromJS(options)).toJS();

    series.forEach((entry) => {
      finalOpts.series.push(pieChart.seriesDefault.mergeDeep(fromJS(entry)).toJS());
    });

    break;
  }
  default: {
    finalOpts = lineBarChart.defaultOpts.mergeDeep(fromJS(options)).toJS();

    series.forEach((entry) => {
      finalOpts.series.push(lineBarChart.seriesDefault.mergeDeep(fromJS(entry)).toJS());
    });

    break;
  }
  }
  return finalOpts;
};

const Chart = (props) => {
  const {
    dataLoaded, hasData, type, option, series, onChange,
  } = props;
  const [tykChartInstance, setTykChartInstance] = useState(null);
  const chartWrapperRef = useRef(null);
  const onResize = () => {
    if (tykChartInstance) {
      tykChartInstance.resize();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  useEffect(() => {
    if (!tykChartInstance) {
      setTykChartInstance(echarts.init(chartWrapperRef.current));
      console.log('init echarts');
    }

    return () => {
      if (tykChartInstance) {
        tykChartInstance.dispose();
      }
    };
  }, [tykChartInstance]);

  useEffect(() => {
    if (tykChartInstance) {
      console.log('add events echarts');
      tykChartInstance.on('dataZoom', (e) => {
        if (onChange) {
          onChange(e);
        }
      });

      tykChartInstance.on('restore', (e) => {
        if (onChange) {
          onChange(e);
        }
      });

      tykChartInstance.on('click', (e) => {
        if (onChange) {
          onChange(e);
        }
      });
    }
  }, [onChange, tykChartInstance]);

  useEffect(() => {
    if (tykChartInstance) {
      console.log('set options');
      tykChartInstance.setOption(buildChartOptions(type, option, series));
      tykChartInstance.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: true,
      });
    }
  }, [option, series, tykChartInstance, type]);

  const getStyle = () => {
    const { style } = props;
    const tempStyle = style || {};

    if (!tempStyle.height) {
      tempStyle.height = '300px';
    }

    return tempStyle;
  };

  const getCssClasses = () => {
    const cssClasses = ['tyk-chart'];

    if (!dataLoaded) {
      cssClasses.push('tyk-chart--loading-chart');
    }

    return cssClasses.join(' ');
  };

  const chartHasData = () => (
    (dataLoaded && (hasData === false || hasData === true)) ? hasData : true
  );

  return (
    <div className={chartHasData() ? '' : 'tyk-chart--no-data'}>
      {
        !dataLoaded
          ? <Loader />
          : null
      }
      <div
        className={getCssClasses()}
        style={getStyle()}
        ref={chartWrapperRef}
      />
      {
        chartHasData()
          ? null
          : (
            <Message theme="info">
              No data to display
            </Message>
          )
      }
    </div>
  );
};

Chart.propTypes = {
  dataLoaded: PropTypes.bool,
  hasData: PropTypes.bool,
  option: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
  style: PropTypes.instanceOf(Object),
  type: PropTypes.string,
  series: PropTypes.instanceOf(Array),
};

// export default class Chart extends Component {
//   static propTypes = {
//     dataLoaded: PropTypes.bool,
//     hasData: PropTypes.bool,
//     option: PropTypes.instanceOf(Object),
//     onChange: PropTypes.func,
//     style: PropTypes.instanceOf(Object),
//     type: PropTypes.string,
//     series: PropTypes.instanceOf(Array),
//   };
//
//   state = {
//     tykChartInstance: null,
//   };
//
//   constructor(props) {
//     super(props);
//
//     this.chartWrapperRef = createRef();
//   }
//
//   componentDidMount() {
//     const {
//       option,
//       onChange,
//       type,
//       series,
//     } = this.props;
//
//     this.defaultOption = {
//       grid: {
//         top: 60,
//         bottom: 60,
//         left: '5%',
//         right: '5%',
//       },
//     };
//
//     window.addEventListener('resize', () => {
//       const {
//         tykChartInstance,
//       } = this.state;
//
//       if (tykChartInstance) {
//         tykChartInstance.resize();
//       }
//     });
//
//     this.setState({
//       tykChartInstance: echarts.init(this.chartWrapperRef.current),
//     }, () => {
//       const {
//         tykChartInstance,
//       } = this.state;
//       tykChartInstance.setOption(buildChartOptions(type, option, series));
//       tykChartInstance.dispatchAction({
//         type: 'takeGlobalCursor',
//         key: 'dataZoomSelect',
//         dataZoomSelectActive: true,
//       });
//
//       tykChartInstance.on('dataZoom', (e) => {
//         if (onChange) {
//           onChange(e);
//         }
//       });
//
//       tykChartInstance.on('restore', (e) => {
//         if (onChange) {
//           onChange(e);
//         }
//       });
//
//       tykChartInstance.on('click', (e) => {
//         if (onChange) {
//           onChange(e);
//         }
//       });
//     });
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('resize');
//   }
//
//   getStyle() {
//     const { style } = this.props;
//     const tempStyle = style || {};
//
//     if (!tempStyle.height) {
//       tempStyle.height = '300px';
//     }
//
//     return tempStyle;
//   }
//
//   getCssClasses() {
//     const { dataLoaded } = this.props;
//     const cssClasses = ['tyk-chart'];
//
//     if (!dataLoaded) {
//       cssClasses.push('tyk-chart--loading-chart');
//     }
//
//     return cssClasses.join(' ');
//   }
//
//   hasData() {
//     const { hasData, dataLoaded } = this.props;
//
//     return (dataLoaded && (hasData === false || hasData === true)) ? hasData : true;
//   }
//
//   render() {
//     const { dataLoaded } = this.props;
//
//     return (
//       <div className={this.hasData() ? '' : 'tyk-chart--no-data'}>
//         {
//           !dataLoaded
//             ? <Loader />
//             : null
//         }
//         <div
//           className={this.getCssClasses()}
//           style={this.getStyle()}
//           ref={this.chartWrapperRef}
//         />
//         {
//           this.hasData()
//             ? null
//             : (
//               <Message theme="info">
//                 No data to display
//               </Message>
//             )
//         }
//       </div>
//     );
//   }
// }

export default Chart;
