import * as React from 'react';
import * as ReactDOM from 'react-dom';

import MostActiveContacts from './MostActiveContacts';
import { MostActiveContactsProps } from './MostActiveContacts';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { ThemeProvider } from 'styled-components';
import * as Theme from './Theme';
injectTapEventPlugin();

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props: MostActiveContactsProps = {
    data: [{
        avatar: 'http://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg',
        name: 'Wife',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }, {
        avatar: 'http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg',
        name: 'Darrell Carter',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }, {
        avatar: 'https://blog.linkedin.com/content/dam/blog/en-us/corporate/bl' +
        'og/2014/07/Anais_Saint-Jude_L4388_SQ.jpg.jpeg',
        name: 'Flenn Allen',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }, {
        avatar: 'http://www.realtimearts.net/data/images/art/46/4640_profile_nilssonpolias.jpg',
        name: 'Louis Graves',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }, {
        avatar: 'https://www.trickscity.com/wp-content/uploads/2016/11/' +
        'cute-girls-profile-pictures-for-facebook-with-apple-I-phone.jpg',
        name: 'Elijah Tucker',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }, {
        avatar: 'http://vivaglammagazine.com/wp-content/uploads/2016/08/These-are-the-World%E2%80%99s-Most-' +
        'Beautiful-Women-According-to-the-Golden-Ratio-viva-glam-magazine-amber-heard.png',
        name: 'Hunter Sanders',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }, {
        avatar: 'https://s-media-cache-ak0.pinimg.com/236x/43/10/1f/43101f35ebdb370624f233e15f1d1043.jpg',
        name: 'Meghan Wilson',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }, {
        avatar: 'https://lh3.googleusercontent.com/' +
        '7zKEoX1p5xhFQ16RejGFEZbHtu0XWpKyrAvjdtIZ2AwnOWE5vXN-qxwrfISurxaQGss=w300',
        name: 'Arron Hicks',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }, {
        avatar: 'http://i.dailymail.co.uk/i/pix/2014/10/16/1413432185738_wps_11_Kite5_jpg_face_shapes.jpg',
        name: 'Danny Daniels',
        bar: {
          lastCommunication: 1498978434,
          calls: 2,
          lastCall: 1498978434,
          im: 20,
          lastIM: 1498978414,
          mails: 10,
          lastMail: 1498978394,
        }
      }],
    contactFilter: 1,
    onSortOptionSelect: () => null,
  }

  ReactDOM.render(
    <ThemeProvider theme={Theme}>
      <MuiThemeProvider>
        <MostActiveContacts {...props}/>
      </MuiThemeProvider>
    </ThemeProvider>,
    div);
});
