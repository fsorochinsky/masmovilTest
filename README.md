docker and docker-compose should be installed 
should be created /var/www/mysqlDocker folder (linked mysql volume)

first start:
 - make up

remove containers:
 - make down
 


links:
 - GET localhost:8000/phones
 
 - PUT localhost:8000/order
   - order should has structure:
      [
       {
         itemId:1,
         count:2
       }
      ]
 
 - GET localhost:8000/orders