import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'api/dummy/brand';

class Home extends React.Component {
  render() {
    const title = brand.name + ' - Admin';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        Home
      </div>
    );
  }
}

export default Home;
