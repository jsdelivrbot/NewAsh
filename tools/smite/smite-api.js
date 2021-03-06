var request = require('fetch').fetchUrl;
var moment = require('moment');
var md5 = require('md5');
var c = require('./constants');

module.exports = class API {

  constructor(devId, authKey, format, lang) {
    (!devId) ? console.log('Error: No devId specified.') : this.devId = devId;
    (!authKey) ? console.log('Error: No authKey specified.') : this.authKey = authKey;
    (!format) ? this.format = 'Json' : (this.format = c[format]);
    (!lang) ? this.lang = '11' : (this.lang = c[lang]);
  }

  getFormat(send) {
    send(this.format);
  }

  getLanguage(send) {
    send(this.lang);
  }

  setLanguage(lang) {
    this.lang = c[lang];
  }

  setFormat(format) {
    this.format = c[format];
  }

  getPlayer(session, platform, player, send) {
    var method = 'getplayer';
    var url = this.urlBuilder(session, platform, method, player);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getPlayerStatus(session, platform, player, send) {
    var method = 'getplayerstatus';
    var url = this.urlBuilder(session, platform, method, player);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getMatchHistory(session, platform, player, send) {
    var method = 'getmatchhistory';
    var url = this.urlBuilder(session, platform, method, player);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getMatchDetails(session, platform, match_id, send) {
    var method = 'getmatchdetails';
    var url = this.urlBuilder(session, platform, method, null, null, match_id);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getChampions(session, platform, send) {
    var method = 'getchampions';
    var url = this.urlBuilder(session, platform, method, null, this.lang);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getChampionRanks(session, platform, player, send) {
    var method = 'getchampionranks';
    var url = this.urlBuilder(session, platform, method, player);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getChampionSkins(session, champ_id, send) {
    var method = 'getchampionskins';
    var url = this.urlBuilder(session, method, null, this.lang, null, champ_id);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  //Currently returns an empty object. Don't know why.
  getChampionRecommendedItems(session, champ_id, send) {
    var method = 'getchampionrecommendeditems';
    var url = this.urlBuilder(session, method, null, this.lang, null, champ_id);
    request(url, function(err, res, body) {
      if(!err) {
        var bodyParsed = JSON.parse(body);
        send(err, bodyParsed);
      }
    });
  }

  getDemoDetails(session, match_id, send) {
    var method = 'getdemodetails';
    var url = this.urlBuilder(session, method, null, null, match_id);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getQueueStats(session, platform, player, queue, send) {
    var method = 'getqueuestats';
    var url = this.urlBuilder(session, platform, method, player, null, null, null, queue);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getItems(session, platform, send) {
    var method = 'getitems';
    var url = this.urlBuilder(session, platform, method, null, this.lang);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getDataUsed(session, platform, send) {
    var method = 'getdataused';
    var url = this.urlBuilder(session, platform, method);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getPlayerLoadouts(session, platform, player, send) {
    var method = 'getplayerloadouts';
    var url = this.urlBuilder(session, platform, method, player);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getIdsByQueue(session, day, hour, queue, send) {
    var method = 'getmatchidsbyqueue';
    var url = this.urlBuilder(session, 'PC', method, null, null, null, null, queue, null, null, day, hour);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  getServerStatus(session, send) {
    var method = 'gethirezserverstatus';
    var baseURL = c.PC + '/' + method + this.format + '/' + this.devId + '/' +
                  this.getSignature(method) + '/' + this.timeStamp();
    this.makeRequest(baseURL, (err, data) => {
      send(err, data);
    });
  }

  getLeagueLeaderboard(session, send) {
    var method = 'getleagueleaderboard';
    var url = this.urlBuilder(session, method);
    this.makeRequest(url, (err, data) => {
      send(err, data);
    });
  }

  connect(platform, send) {
    var url = c[platform] + '/' + 'createsession' + this.format + '/' +
              this.devId + '/' + this.getSignature('createsession')
              + '/' + this.timeStamp();
    this.makeRequest(url, (err, data) => {
      send(err, data.session_id);
    });
  }

  makeRequest(url, send) {
    request(url, function(err, res, body) {
      if(!err) {
        try {
          var bodyParsed = JSON.parse(body);
        } catch(e) {
          var bodyParsed = { error: 'Paladins API down.' };
        }
        send(err, bodyParsed);
      } else {
        console.log(err);
      }
    });
  }

  urlBuilder(session, platform, method, player, lang, match_id, champ_id, queue, tier, season, day, hour) {
    var baseURL = c[platform] + '/' + method + this.format + '/' + this.devId + '/' +
                  this.getSignature(method) + '/' + session + '/' + this.timeStamp();

    (player) ? baseURL += ('/' + player) : null;
    (champ_id) ? baseURL += ('/' + champ_id) : null;
    (lang) ? baseURL += ('/' + lang) : null;
    (match_id) ? baseURL += ('/' + match_id) : null;
    (queue) ? baseURL += ('/' + queue) : null;
    (tier) ? baseURL += ('/' + tier) : null;
    (season) ? baseURL += ('/' + season) : null;
    (day) ? baseURL += ('/' + day) : null;
    (hour) ? baseURL += ('/' + hour) : null;
    return baseURL;
  }

  timeStamp() {
    return moment().utc().format('YYYYMMDDHHmmss');
  }

  getSignature(method) {
    return md5(this.devId + method + this.authKey + this.timeStamp());
  }

};
