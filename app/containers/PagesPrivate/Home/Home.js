import React from 'react';
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
import { data1 } from './sampleData';
import Liberacao from './Liberacao';
import styles from './fluidChart-jss';

const Home = props => {
  const title = brand.name + ' - Admin';
  const description = brand.desc;

  const { classes } = props;

  return (
    <>
      <Liberacao />
      <PapperBlock title="Blank Page" desc="Some text description">
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
              data={data1}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <XAxis dataKey="name" tickLine={false} />
              <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <CartesianAxis vertical={false} />
              <Tooltip />
              <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
              <Line type="monotone" dataKey="pv" strokeWidth={5} stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" strokeWidth={5} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </PapperBlock>
    </>
  );
};

export default withStyles(styles)(Home);
