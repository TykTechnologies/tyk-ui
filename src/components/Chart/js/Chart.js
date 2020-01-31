import React, {
  useState, useEffect, useRef, memo,
} from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import { fromJS } from 'immutable';

import debounce from '../../../common/js/utils';
import { usePrevious } from '../../../common/js/hooks';
import Loader from '../../Loader';
import Message from '../../Message';

echarts.registerMap('world', require('echarts/map/json/world.json'));

const Chart = (props) => {
  const {
    areaStyleColors,
    dataLoaded,
    hasData,
    highlight,
    type,
    option,
    series,
    onChange,
    zoomStart,
    zoomEnd,
    title,
    seriesConfig = [],
    noDataComponent = null,
  } = props;
  const [tykChartInstance, setTykChartInstance] = useState(null);
  const chartWrapperRef = useRef(null);
  const onResize = () => {
    if (tykChartInstance) {
      tykChartInstance.resize();
    }
  };

  const lineBarChart = {
    defaultOpts: fromJS({
      title: {
        show: true,
        text: title,
        left: 0,
      },
      color: [],
      toolbox: {
        right: '0',
        orient: 'horizontal',
        itemSize: 15,
        showTitle: true,
        feature: null,
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
          color: '#368493',
        },
        borderColor: 'transparent',
        fillerColor: 'rgba(54, 132, 147, 0.1)',
      }],
      legend: {
        show: false,
        // data: [],
        // right: '1%',
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
          show: true,
          lineStyle: {
            type: 'dotted',
            color: '#F0F0F0',
          },
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
        min: 'dataMin',
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
          show: false,
          // inside: false,
          // padding: [3, 6, 3, 0],
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
      areaStyle: {
        opacity: 1,
        color: areaStyleColors ? new echarts.graphic.LinearGradient(0, 0, 1, 1,
          areaStyleColors.map((color, index) => ({
            offset: index,
            color,
          }))) : [],
      },
      smooth: false,
      symbolSize: 7,
      name: '',
    }),
  };

  const pieChart = {
    defaultOpts: fromJS({
      tooltip: {
        trigger: 'axis',
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

  const geoChart = {
    defaultOpts: fromJS({
      series: [],
    }),
    seriesDefault: fromJS({
      type: 'map',
      data: [],
    }),
  };

  const buildChartOptions = (selectedType, selectedOptions, selectedSeries) => {
    let finalOpts = {};
    switch (selectedType) {
    case 'pie': {
      finalOpts = pieChart.defaultOpts.mergeDeep(fromJS(selectedOptions)).toJS();

      selectedSeries.forEach((entry) => {
        finalOpts.series.push(pieChart.seriesDefault.mergeDeep(fromJS(entry)).toJS());
      });

      break;
    }

    case 'geo': {
      finalOpts = geoChart.defaultOpts.mergeDeep(fromJS(selectedOptions)).toJS();

      selectedSeries.forEach((entry) => {
        finalOpts.series.push(geoChart.seriesDefault.mergeDeep(fromJS(entry)).toJS());
      });

      break;
    }

    default: {
      finalOpts = lineBarChart.defaultOpts.mergeDeep(fromJS(selectedOptions)).toJS();

      selectedSeries.forEach((entry, index) => {
        const seriesData = Object.assign(
          {},
          lineBarChart.seriesDefault.toJS(),
          seriesConfig[index], entry,
        );
        finalOpts.series.push(seriesData);
      });
      break;
    }
    }
    return finalOpts;
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setTykChartInstance(echarts.init(chartWrapperRef.current));
    return () => {
      if (tykChartInstance) {
        tykChartInstance.dispose();
      }
    };
  }, []);

  const eventCallBack = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  useEffect(() => {
    let debouncedMethod;
    if (tykChartInstance) {
      debouncedMethod = debounce(eventCallBack, 500);
      tykChartInstance.on('dataZoom', debouncedMethod);
      tykChartInstance.on('restore', debouncedMethod);
      tykChartInstance.on('click', debouncedMethod);

      tykChartInstance.on('mousemove', (params) => {
        if (params.data) {
          tykChartInstance.getZr().setCursorStyle('pointer');
        }
      });
    }

    return () => {
      if (tykChartInstance) {
        tykChartInstance.off('dataZoom', debouncedMethod);
        tykChartInstance.off('restore', debouncedMethod);
        tykChartInstance.off('click', debouncedMethod);
      }
    };
  }, [eventCallBack, tykChartInstance]);

  const prevOption = usePrevious(option);
  const prevType = usePrevious(type);
  const prevSeries = usePrevious(series);
  useEffect(() => {
    if (
      tykChartInstance
      && (
        !fromJS(prevOption).equals(fromJS(option))
        || (prevType !== type)
        || !fromJS(prevSeries).equals(fromJS(series))
      )
    ) {
      tykChartInstance.clear();
      tykChartInstance.setOption(buildChartOptions(type, option, series));
      tykChartInstance.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: true,
      });
    }
  }, [option, series, type]);

  useEffect(() => {
    if (tykChartInstance && highlight) {
      tykChartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: highlight.seriesIndex,
        dataIndex: highlight.dataIndex,
      });
      tykChartInstance.dispatchAction({
        type: 'showTip',
        seriesIndex: highlight.seriesIndex,
        dataIndex: highlight.dataIndex,
      });
    }
  }, [highlight]);


  useEffect(() => {
    if (tykChartInstance && zoomStart !== -1 && zoomEnd !== -1) {
      tykChartInstance.dispatchAction({
        type: 'dataZoom',
        startValue: zoomStart,
        endValue: zoomEnd,
      });
    }
  }, [zoomStart, zoomEnd]);

  const getStyle = () => {
    const { style } = props;
    const tempStyle = style || {};

    if (!tempStyle.height) {
      tempStyle.height = '300px';
    }

    return tempStyle;
  };

  const chartHasData = () => (
    (dataLoaded && (hasData === false || hasData === true)) ? hasData : true
  );

  const getCssClasses = () => {
    const cssClasses = ['tyk-chart'];

    if (!dataLoaded) {
      cssClasses.push('tyk-chart--loading-chart');
    }

    if (!chartHasData()) {
      cssClasses.push('tyk-chart--no-data');
    }

    return cssClasses.join(' ');
  };

  return (
    <div className="tyk-chart__wrapper">
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
        /* eslint-disable-next-line no-nested-ternary */
        chartHasData()
          ? null
          : noDataComponent
            ? noDataComponent()
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
  areaStyleColors: PropTypes.instanceOf(Array),
  dataLoaded: PropTypes.bool,
  hasData: PropTypes.bool,
  highlight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Array),
  ]),
  noDataComponent: PropTypes.func,
  zoomStart: PropTypes.number,
  zoomEnd: PropTypes.number,
  option: PropTypes.instanceOf(Object),
  onChange: PropTypes.func,
  style: PropTypes.instanceOf(Object),
  type: PropTypes.string,
  title: PropTypes.string,
  series: PropTypes.instanceOf(Array),
  seriesConfig: PropTypes.instanceOf(Object),
};

export default memo(Chart);
