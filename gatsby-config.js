module.exports = {
  siteMetadata: {
    title: 'New Covenant Baptist Church',
    address: {
      name: 'University Lutheran Church',
      streetAddress: '1604 NE 50th St',
      unit: 'Room 202',
      city: 'Seattle',
      state: 'WA',
      zipCode: 98105
    },
    phone: '(206) 240-9648',
    email: 'stephenjungncbc@gmail.com',
    serviceTime: '12:30',
    instagram: 'ncbcseattle'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    'gatsby-transformer-remark'
  ]
};
