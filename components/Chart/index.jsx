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
      const { rates, base } = data;

      const tmp = {
        labels: Object.keys(rates).map((el) => moment(el).format('DD.MM')),
        datasets: [
          {
            label: base,
            fill: false,
            borderColor: '#42A5F5',
            yAxisID: 'y',
            tension: 0.4,
            data: Object.values(rates),
          },
        ],
      };

      setStat(tmp);
    }
  }, [data]);

  return <ChartJS type="line" data={stat || {}} options={chartOptions} />;
};

export { Chart };
