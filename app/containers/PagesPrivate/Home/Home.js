import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'api/dummy/brand';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  CartesianAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  data1, data2, data3, data4, data5, data6, data7, data8, data9
} from './sampleData';
import Liberacao from './Liberacao';
import styles from './fluidChart-jss';

import { liberacoesTurno } from '../../../services/LiberacaoService';

const Home = props => {
  const title = brand.name + ' - Admin';
  const description = brand.desc;

  const { classes, dispatch } = props;

  const [dataTurno, setDataTurno] = useState([]);

  const loadLiberacoesTurno = async () => {
    const total = await liberacoesTurno(dispatch);
    setDataTurno(total);
  };
  useEffect(() => {
    loadLiberacoesTurno();
  }, []);

  return (
    <>
      <PapperBlock title="Liberações" desc="Gráfico da quantidade de liberações da última semana">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.chartFluid}>
          <ResponsiveContainer>
            <LineChart
              width={800}
              height={450}
              data={dataTurno}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis dataKey="dia" tickLine={false} />
              <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <CartesianAxis vertical={false} />
              <Tooltip />
              <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
              <Line type="monotone" dataKey="m" strokeWidth={5} stroke="#82ca9d" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="t" strokeWidth={5} stroke="#ffe050" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="n" strokeWidth={5} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </PapperBlock>
    </>
  );
};

export default withStyles(styles)(Home);
