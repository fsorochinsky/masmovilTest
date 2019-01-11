const {expect} = require('chai');
const sinon = require('sinon');
const models = require('../models');

const phoneCtrl = require('../controllers/phone');
const {
  req,
  successResponse,
  tokenErrorResponse
} = require('../testData/phone');

const wrongRequest = {body:{}};
wrongRequest.body = Object.assign({}, req.body);

req.body.token = require('../config/config').token;

describe('check update phones count', () => {
  let stubs;

  before(function () {
    stubs = [
      sinon.stub(models.phone, 'updateItemsCount').callsFake(() => {
        return Promise.resolve();
      })
    ];
  });

  after(function () {
    stubs.forEach((stub) => {
      stub.restore();
    });
  });


  it('should return success', () => {
    return phoneCtrl.updateCounts(req).then((response) => {
      return expect(response).to.be.equal(successResponse);
    })
  });

  it('should return error token error', () => {
    return phoneCtrl.updateCounts(wrongRequest).then((response) => {
      return Promise.reject('should return token error error');
    }).catch((err) => {
      return expect(err).to.deep.equal(tokenErrorResponse);
    })
  });

});