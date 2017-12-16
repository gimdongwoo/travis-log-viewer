import RestClient from './restClient';

function getBuild(token, repoId) {
  return new Promise((resolve, reject) => {
    const restClient = new RestClient();
    restClient.get(
      'https://api.travis-ci.com/repo/' + repoId + '/builds',
      null,
      {
        Authorization: 'token ' + token,
        'Travis-API-Version': 3
      }
    ).then((results) => {
      if (results && typeof results !== 'object') results = JSON.parse(results);

      if (results && results.builds && Array.isArray(results.builds)) {
        return resolve(results.builds[0]);
      }
      console.error('builds scheme error');
      return reject('builds scheme error');
    }, reject);
  });
}

function getJob(token, build) {
  return new Promise((resolve, reject) => {
    const restClient = new RestClient();
    restClient.get(
      'https://api.travis-ci.com/build/' + build.id,
      null,
      {
        Authorization: 'token ' + token,
        'Travis-API-Version': 3
      }
    ).then((results) => {
      if (results && typeof results !== 'object') results = JSON.parse(results);

      if (results && results.jobs && Array.isArray(results.jobs)) {
        return resolve(results.jobs[0]);
      }
      console.error('build scheme error');
      return reject('build scheme error');
    }, reject);
  });
}

function getLog(token, job) {
  return new Promise((resolve, reject) => {
    const restClient = new RestClient();
    restClient.get(
      'https://api.travis-ci.com/job/' + job.id + '/log',
      null,
      {
        Authorization: 'token ' + token,
        'Travis-API-Version': 3
      }
    ).then((results) => {
      if (results && typeof results !== 'object') results = JSON.parse(results);

      if (results) {
        return resolve(results);
      }
      console.error('job scheme error');
      return reject('job scheme error');
    }, reject);
  });
}

export default function log(req, res, token, repoId) {
  getBuild(token, repoId).then((build) => {
    return getJob(token, build);
  }).then((job) => {
    return getLog(token, job);
  }).then((log) => {
    res.header('Content-Type', 'text/plain');
    res.status(200).send(log.content).end();
  }).catch((error) => {
    res.header('Content-Type', 'application/json');
    res.status(500).json(error).end();
  });
}
