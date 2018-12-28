const {expect} = require('chai');
const moxios = require('moxios');
const sinon = require('sinon');
const models = require('../models');

const phoneServerUrl = require('../config/config').phoneServerUrl;
const orderCtrl = require('../controllers/order');
const {
  req,
  wrongItemIdReq,
  wrongItemIdErrorResponse,
  createdOrderWithItemsResponse,
  phoneList,
  wrongItemCountReq,
  wrongItemCountErrorResponse,
  updatedRowsResponse,
  createdOrderResponse,
  createdOrderItemsResponse
} = require('../testData/order');


describe('check create order', () => {
  let stubs;

  before(function () {
    stubs = [
      sinon.stub(models.phone, 'updateItemsCount').callsFake(()=>{
        return Promise.resolve(updatedRowsResponse);
      }),
      sinon.stub(models.order, 'create').callsFake(()=>{
        return Promise.resolve(createdOrderResponse);
      }),
      sinon.stub(models.orderItem, 'bulkCreate').callsFake(()=>{
        return Promise.resolve(createdOrderItemsResponse);
      })
    ];

    moxios.stubRequest(phoneServerUrl + '/phones', {
      status: 200,
      response: phoneList
    });

    moxios.install()
  });

  after(function () {
    stubs.forEach((stub)=>{
      stub.restore();
    });

    moxios.uninstall()
  });



  it('should return created order with items', () => {
    return orderCtrl.create(req).then((orderWithItems)=>{
      return expect(orderWithItems).to.deep.equal(createdOrderWithItemsResponse);
    })
  });

  it('should return error on wrong item id', () => {
    return orderCtrl.create(wrongItemIdReq).then((response) => {
      return Promise.reject('should return error');
    }).catch((err) => {
      return expect(err).to.deep.equal(wrongItemIdErrorResponse);
    })
  });

  it('should return error on wrong item count', () => {
    return orderCtrl.create(wrongItemCountReq).then((response) => {
      return Promise.reject('should return error');
    }).catch((err) => {
      return expect(err).to.deep.equal(wrongItemCountErrorResponse);
    })
  });
});