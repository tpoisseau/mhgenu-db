import './set_map_json.mjs';
import App from 'u-http-server';

import {
  questLevelsByHub,
  findArmorPiecesByHubLevelsAndHunterType,
  findWeaponsByHubLevelsAndHunterType
} from './requests.mjs';

const app = new App();

app
  .use(({request}) => console.log(request.url))
  .use(({response}) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
  })
  .use("POST", /.*/, ctx => new Promise((resolve, reject) => {
    let body = '';
    ctx.request.on('data', chunk => body += chunk.toString());
    ctx.request.on('end', () => resolve(ctx.text = body));
    ctx.request.on('error', reject);
  }))
  .use("POST", /.*/, (ctx, text) => ctx.json = JSON.parse(text))
  .get('/quests/:hub', ({params: {hub}}) => questLevelsByHub.all({hub}))
  .post('/search/armor', ctx => {
    const {Village, Guild, Arena, Permit, HunterType: ht, Pieces} = ctx.json;
    
    const HunterType = {'Blademaster': 0, 'Gunner': 1}[ht];
    
    return findArmorPiecesByHubLevelsAndHunterType({Village, Guild, Arena, Permit, HunterType, Pieces});
  })
  .post('/search/weapon', ctx => {
    const {Village, Guild, Arena, Permit, HunterType: ht, Weapons} = ctx.json;
  
    const HunterType = {'Blademaster': 0, 'Gunner': 1}[ht];
  
    return findWeaponsByHubLevelsAndHunterType({Village, Guild, Arena, Permit, HunterType, Weapons});
  })
;

app.init()
  .then(app => app.applyOnClientError())
  .then(app => app.listen(3001))
  .then(info => console.log('server listening on', info))
  .catch(console.error);