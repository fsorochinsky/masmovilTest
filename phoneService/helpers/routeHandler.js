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
      if (e.messages) {
        return res.json(e.messages);
      }

      return res.json('server error');
    });
  }
}

module.exports = {
  handle: handle
};