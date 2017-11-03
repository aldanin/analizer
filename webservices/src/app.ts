import * as config from 'config';
import * as request from 'request';

import * as express from 'express';
import * as path from 'path';

import Framework from './lib/famework';
import LoginEndpoint from './endpoints/login-endpoint';
import LogoutEndpoint from './endpoints/logout-endpoint';
import OperationsEndpoint from './endpoints/operations-endpoint';
import TargetsEndpoint from './endpoints/targets-endpoint';
import ResourcesEndpoint from './endpoints/resources-endpoint';
import AgentsEndpoint from './endpoints/agents-endpoint';
import IMEndpoint from './endpoints/im-endpoint';
import EmailsEndpoint from './endpoints/emails-endpoint';
import BrowserEndpoint from './endpoints/browser-endpoint';
import ContactsEndpoint from './endpoints/contacts-endpoint';
import LocationsEndpoint from './endpoints/locations-endpoint';
import ImagesEndpoint from './endpoints/images-endpoint';
import SummeryEndpoint from './endpoints/summary-endpoint';

import FilesEndpoint from './endpoints/files-endpoint';

import FetchAllTagsEndpoint from './endpoints/fetch-all-tags-endpoint';
import TagsEndpoint from './endpoints/tags-endpoint';
import AddTagsEndpoint from './endpoints/add-tags-endpoint';
import DeleteTagsEndpoint from './endpoints/delete-tags-endpoint';
import MarkerEndpoint from './endpoints/marker-endpoint';
import AddMarkerEndpoint from './endpoints/add-marker-endpoint';
import DeleteMarkerEndpoint from './endpoints/delete-marker-endpoint';

let fw = Framework({
  serviceName: config.serviceName,
  port: config.port,
  logLevel: 0,
  authSecret: config.authSecret
});

fw.post('/user/login', LoginEndpoint);
fw.get('/user/logout', LogoutEndpoint);

fw.get('/management/operations', (OperationsEndpoint));
fw.get('/management/targets', (TargetsEndpoint));
fw.get('/management/resources', (ResourcesEndpoint));
fw.get('/management/agents', (AgentsEndpoint));

fw.get('/appdata/:resourceId/im', (IMEndpoint));
fw.get('/appdata/:resourceId/emails', (EmailsEndpoint));
fw.get('/appdata/:resourceId/browser/:type', (BrowserEndpoint));
fw.get('/appdata/:resourceId/contacts', (ContactsEndpoint));
fw.get('/appdata/:resourceId/locations', (LocationsEndpoint));
fw.get('/appdata/:resourceId/images/:type', (ImagesEndpoint));
fw.get('/appdata/:resourceId/summery', (SummeryEndpoint));
fw.get('/appdata/:resourceId/file/:objectId', (FilesEndpoint));

fw.get('/tags', (FetchAllTagsEndpoint));
fw.get('/tags/:resourceId?/:productType?/:productId?', (TagsEndpoint));
fw.post('/tags/:resourceId/:productType/:productId/:tag', (AddTagsEndpoint));
fw.delete('/tags/:resourceId/:productType/:productId/:tag', (DeleteTagsEndpoint));

fw.get('/marker/:resourceId/:productType/:productId/:type', (MarkerEndpoint));
fw.post('/marker/:resourceId/:productType/:productId/:type', (AddMarkerEndpoint));
fw.delete('/marker/:resourceId/:productType/:productId/:type', (DeleteMarkerEndpoint));

// Proxy requests from gis client to tile server
fw.getEngine().use('/gis/:z/:x/:y.png', (req, res) => {
  let tileUri = config.gis.address;

  for (let param in req.params) {
    tileUri = tileUri.replace(`{${param}}`, req.params[param]);
  }

  request(tileUri).pipe(res);
});

if (process.env.NODE_ENV === 'production') {
  fw.getEngine().use(express.static(path.join(__dirname, 'public')));

  fw.getEngine().get('*', function (req: any, res: any) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

fw.listen();