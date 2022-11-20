import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { Loader } from '@components';

import moment from 'moment';

const ChartJS = dynamic(() => import('primereact/chart').then((mod) => mod.Chart), {
  ssr: false,
  loading: () => <Loader />,
});

const chartOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#495057',
      },
      grid: {
        color: '#ebedef',
      },
    },
    y: {
      ticks: {
        color: '#495057',
      },
      grid: {
        color: '#ebedef',
      },
    },
  },
};

const Chart = ({ data = null }) => {
  const [stat, setStat] = useState(null);

  useEffect(() => {
    if (data) {
      const { rates, predictions } = data;

      const labels = Object.keys(rates)
        .concat(Object.keys(predictions))
        .map((el) => moment(el).format('YYYY-MM-DD'));

      const realRates = [...Object.values(rates)].concat(
        Array(labels.length - Object.values(rates).length).map(() => null),
      );
      const predictedRates = Array(labels.length - Object.values(predictions).length)
        .map(() => null)
        .concat(Object.values(predictions));

      const tmp = {
        labels,
        datasets: [
          {
            label: 'Реальный курс',
            fill: false,
            borderColor: '#42A5F5',
            yAxisID: 'y',
            tension: 0.4,
            data: realRates,
          },
          {
            label: 'Прогнозируемый курс',
            fill: false,
            borderColor: '#03C03C',
            yAxisID: 'y',
            tension: 0.4,
            data: predictedRates,
          },
        ],
      };

      setStat(tmp);
    }
  }, [data]);

  return <ChartJS type="line" data={stat || {}} options={chartOptions} />;
};

export { Chart };
