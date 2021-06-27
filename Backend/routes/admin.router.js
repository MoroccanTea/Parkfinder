const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const User = require('../models/user.model');
const Parking = require('../models/parking.model');
const Reservation = require('../models/reservation.model');
const mongoose = require('mongoose');


AdminBro.registerAdapter(AdminBroMongoose);


const locale = {
  translations: {
    labels: {
      loginWelcome: 'Parkfinder Admin Panel',
    },
    messages: {
      loginWelcome: 'Hello, please login in order to manage the Parkfinder app.',
    },
  },
};

const adminBro = new AdminBro({
  rootPath: '/admin',
  locale,
  dashboard:{ component: AdminBro.bundle('../dashboardModules/Dashboard') },
  resources: [
    {
      resource: User,
      options: {
        properties: {
          Password: {
            isVisible: false,
          }
        },
        navigation:{
          icon: 'User',
          name: null,
          },
      },
      
    },
    {
      resource: Parking,
      options: {
        properties: {
          Description: {
            type: 'richtext',
          }
        },
        navigation:{
          icon: 'Location',
          name: null,
          },
      }
    },
    {
      resource: Reservation,
      options: {
        navigation:{
          icon: 'Ticket',
          name: null,
          },
      }
    }
  ],
  branding: {
    companyName: 'Parkfinder',
    logo: 'https://www.parkfinder.tk/images/parkfinder-contrast.png',
    softwareBrothers: false,
    favicon: "https://parkfinder.tk/images/fleche.ico",
    theme:{
      colors:{
        primary100: '#f2ca00',
        primary60: '#000',
        primary20: '#fff',
        hoverBg: '#000',
      },
      font: '\'Poppins\', sans-serif',
    }
  }
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@parkinder.tk',
  password: process.env.ADMIN_PASSWORD || 'Sofitel69',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'some-super-sensitive-password',
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;

  }
});


module.exports = router;