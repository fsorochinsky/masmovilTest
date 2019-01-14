function handle(method) {
  return function (req, res) {
    return method(req).then((data) => {
      return res.json(data);
    }).catch((e) => {
      console.log('url -', req.originalUrl, 'error::', e);

      res.status(400);
      /**
       *  custom e.messages example:
       *  [
       *    {
       *      identificatorName: value,
       *      message: message
       *    }
       *  ]
       */

      // handle custom error from service
      let message = e.messages || e.response.data ? e.response.data : undefined;

      if (message) {
        return res.json(message);
      }

      return res.json('server error');
    });
  }
}

module.exports = {
  handle: handle
};