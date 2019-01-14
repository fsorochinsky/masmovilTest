docker and docker-compose should be installed 
should be created /var/www/mysqlDocker folder (linked mysql volume)

first start:
 - make up

remove containers:
 - make down
 


links:
 - GET localhost:8010/phones
   - request: empty
   - response: 
     
     [
       {
         "id": 1,
         "name": "phone name 0",
         "img": "http://someUrl.com/img/phone0.img",
         "description": "phone description 0",
         "price": 43,
         "count": 0
       },
       {
         "id": 2,
         "name": "phone name 1",
         "img": "http://someUrl.com/img/phone1.img",
         "description": "phone description 1",
         "price": 29,
         "count": 0
       }
     ]
     
 - POST localhost:8010/updatePhoneCounts
   - internal link only for services validated by token
   - request:
     
     [
       {
         phoneId:1,
         count:2
       }
     ]
 
 - PUT localhost:8000/order
   - request:
   
      [
       {
         phoneId:1,
         count:2
       }
      ]
   - response:
     
     {
       "id": 28,
       "status": "success",
       "totalPrice": 163,
       "userId": 1,
       "updatedAt": "2019-01-11T07:55:31.525Z",
       "createdAt": "2019-01-11T07:55:31.525Z",
       "orderItems": [
         {
           "id": 39,
           "orderId": 28,
           "phoneId": 3,
           "count": 1,
           "price": 84,
           "totalPrice": 84,
           "createdAt": "2019-01-11T07:55:31.537Z",
           "updatedAt": "2019-01-11T07:55:31.537Z"
         }
       ]
     }
 
 - GET localhost:8000/orders
   - request: empty
   - response: 
   
     [
       {
         "id": 20,
         "status": "success",
         "totalPrice": 72,
         "userId": 1,
         "createdAt": "2019-01-09T09:11:18.000Z",
         "updatedAt": "2019-01-09T09:11:18.000Z",
         "user": {
           "id": 1,
           "name": "user name",
           "surName": "user surName",
           "email": "test@test.net"
         },
         "orderItems": [
           {
             "id": 23,
             "orderId": 20,
             "phoneId": 1,
             "count": 1,
             "price": 43,
             "totalPrice": 43,
             "createdAt": "2019-01-09T09:11:18.000Z",
             "updatedAt": "2019-01-09T09:11:18.000Z"
           },
           {
             "id": 24,
             "orderId": 20,
             "phoneId": 2,
             "count": 1,
             "price": 29,
             "totalPrice": 29,
             "createdAt": "2019-01-09T09:11:18.000Z",
             "updatedAt": "2019-01-09T09:11:18.000Z"
           }
         ]
       }
     ]
     