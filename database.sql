/*DROP DATABASE Restaurant_Reservation_System;
Create Database Restaurant_Reservation_System;


use Restaurant_Reservation_System;


CREATE TABLE Customer (ID INT PRIMARY KEY AUTO_INCREMENT, FirstName VARCHAR(50) , LastName VARCHAR(50) , 
				 Password varchar(20) , Email varchar(50) ,Delivery_area_ID int , Card_number varchar(50) ,Access_level varchar(50)  , street varchar(50) , district varchar(50) , Phone_Number varchar(50) );
    
          
CREATE TABLE Ingredients (ID INT  PRIMARY KEY AUTO_INCREMENT, Price DOUBLE , Quantity Int  default 0 , Name VARCHAR(50)  );


CREATE TABLE Supplier (ID INT  PRIMARY KEY AUTO_INCREMENT , FirstName VARCHAR(50) , LastName VARCHAR(50)  );


CREATE TABLE Orders (ID INT PRIMARY KEY AUTO_INCREMENT,  Payment_method varchar(50), Customer_ID INT ,
                    Delivery_boy_ID INT , Branch_ID int , status varchar(50) , orderDate TIMESTAMP DEFAULT now() );
                    
                     
CREATE TABLE Delivery_Area (ID INT PRIMARY KEY AUTO_INCREMENT, district varchar(200) , Branch_id int );
 
CREATE TABLE Branches (Branch_id INT  PRIMARY KEY AUTO_INCREMENT, Branch_Name VARCHAR(50) , Manager_ID int, district varchar(200));

CREATE TABLE Item (ID INT  PRIMARY KEY AUTO_INCREMENT, Name varchar (50) , Type VARCHAR(50) , Price double , Chef_ID int  ,Branch_id int );

CREATE TABLE Employee (ID INT PRIMARY KEY AUTO_INCREMENT, FirstName varchar(50), LastName varchar(50),Age  INT , Type varchar(50)  ,Branch_id int);

CREATE TABLE Supplier_Ingredient (  Ingredient_id int , Supplier_id int );

CREATE TABLE Ingredients_Item ( Item_id int, Ingredient_id int );

CREATE TABLE Order_Item (  Item_id int , Order_id int );

create table Delivery_boy(Boy_ID int primary key, motorcycle_ID int);

SET GLOBAL FOREIGN_KEY_CHECKS=0;



Insert into Customer (ID , FirstName  , LastName  , Password  , Email ,Delivery_area_ID  , Card_number ,Access_level , street, district) Values 
(1, 'Yasmine', 'Yehia', 'Rs12345', 'yasmie_yehia@gmail.com', 2, '4578246328', 0, 'Mohamed-Megahed','First'), 
(2, 'Maryam', 'Mohamed', 'Ms123445', 'maryam_mohamed@gmail.com', 1, '4478246328', 0,'Mohamed-shahen','Second'),
(3, 'Mohamed ', 'Salama', 'Md12345', 'Mohamed_salama@gmail.com', 3, '4578248328', 0,'Amarart-Elshorta','Second'),
(4, 'Ahmed','Yassin', 'Mf12345', 'mohamed_yassin@gmail.com', 1, '4578246329', 1,'Abaas-Akad','Third'),
(5, 'Shorouk','Alalem', 'Mf12D45', 'shorouk_alalem@gmail.com', 2, '4578247329', 1,'Abaas-Akad','Third'),
(6, 'Abdelrahman', 'Ahmed', 'Ko12345', 'bedo555@gmail.com', 3, '4579056328', 0,'Khaled-Amad','Fourth'),
(7, 'Ahmed', 'Dahy', 'Dr123445', 'ahmeddahy@gmail.com', 4, '4478245528', 0,'Rawda-Elmohnds','Fifth'),
(8, 'Kareem', 'Samy', 'Ks12345', 'ksamy22@gmail.com', 5, '4573148328', 0,'Elrahab','First'),
(9, 'Mohanad','Atef', 'MA12345', 'm_atef@hotmail.com', 1, '4578246331', 0,'Elandals','Second'),
(10, 'Marwan','Yasser', 'MY12D45', 'maro2001@gmail.com', 5, '4578247333', 0,'Gamal-Abdelnasser','Third'),
(11, 'Mohamed','Mostafa', 'MM12D45', 'mostafa2022@outlook.com', 2, '4578800333', 0,'Elsallam','Fourth'),
(12, 'Salma','Haddad', 'SH12D45', 'hadad_salma1@gmail.com', 5, '4579247333', 0,'Syria','Fifth'),
(13, 'Rawan','Galal', 'Rg12D45', 'rorogalal70@gmail.com', 1, '4578257223', 0,'Eltahrer','Third'),
(14, 'Lina','Hesham', 'Lh12445', 'Linaaah_h@gmail.com', 5, '4578247333', 0,'Ahmed-Oraby','First'),
(15, 'Islam','Ahmed', 'Ia12W49', 'Ahmed_islam57@gmail.com', 4, '4572147333', 0,'Sodan','Fourth');



INsert into Ingredients (ID , Price  , Quantity , Name ) values
(1, 10 , 10 , 'Tomato' ),
(2, 10 , 10 , 'Potato' ),
(3, 170 , 20 , 'Beef' ),
(4, 70 , 20 , 'Chicken' ),
(5, 14 , 10 , 'Pepper' ),
(6, 11 , 100 , 'Flour' ),
(7, 30 , 60 , 'Oil' ),
(8, 70 , 20 , 'Cheese' ),
(9, 19 , 20 , 'Milk' ),
(10, 5 , 10 , 'Salt' ),
(11, 20 , 10 , 'Spices' ),
(12, 60 , 20 , 'Butter' ),
(13, 2 , 30 , 'Onion' ),
(14, 5 , 30 , 'Garlic' ),
(16, 6 , 30 , 'Noodles' ),
(17, 12 , 30 , 'Rice' ),
(18, 10 , 30 , 'Sugar' ),
(19, 6, 40, 'Cucumber'),
(20, 7, 35, 'Radish'),
(21, 2, 25, 'Lettuce'),
(22, 8, 21, 'Carrot'),
(23, 60, 10, 'Eggs'),
(24, 30, 5, 'Mozzarella');

Insert into  Supplier (ID , FirstName  , LastName  ) values 
(1 , 'Mohamed'  , 'ALy'  ),
(2 , 'Mohanned'  , 'Kroulus'  ),
(4 , 'Mohamed'  , 'Khaled'  ),
(5 , 'Rawan'  , 'Abdelkhaleiq' ),
(6 , 'Ahmed'  , 'Taha' ),
(7 , 'Nehal'  , 'Fooda' ),
(8, 'Alaa'  , 'Tarek' );


 Insert into Delivery_Area (ID ,district  , Branch_id  ) values
(1 ,  'First', 1  ),
(2 ,  'Second', 2  ),
(3 ,  'Third', 3  ),
(4 ,  'Fourth', 4  ),
(5,  'Fifth', 5);

Insert into Branches (Branch_id, Branch_Name , district) values 
(1, 'Tremento First','First'),
(2, 'Tremento Second',  'Second'),
(3, 'Tremento Third',  'Third'),
(4, 'Tremento Fourth', 'Fourth'),
(5, 'Tremento Fifth',  'Fifth');


UPDATE Branches SET Branch_Name = 'Tremento-First', Manager_ID = 21  where Branch_id =1;
UPDATE Branches SET Branch_Name = 'Tremento-Second', Manager_ID = 22  where Branch_id =2;
UPDATE Branches SET Branch_Name = 'Tremento-Third' , Manager_ID = 23 where Branch_id =3;
UPDATE Branches SET Branch_Name = 'Tremento-Fourth', Manager_ID = 24 where Branch_id =4;
UPDATE Branches SET Branch_Name = 'Tremento-Fifth', Manager_ID = 25 where Branch_id =5;

Insert into Delivery_boy(Boy_ID , motorcycle_ID ) values 
(11, 1),
(12, 2),
(13, 3),
(14, 4),
(15, 5),
(16, 6),
(17, 7),
(18, 8),
(19, 9),
(20, 10);


Insert into Item (Name, Type  , Price    ) values 
('Charboiled BBQ', 'meal'  , 90 ),
( 'Chicken Buster', 'meal'  , 65  ),
('Chicken Flick', 'meal'  , 80 ),
('Chicken Strips', 'meal'  , 75  ), 
('Chicken Velocity', 'meal'  , 70  ),
('Double Digger', 'meal'  , 65  ),
('Double Double', 'meal'  , 120   ),
('Double Jab', 'meal'  , 100   ),
('Go-to Burger', 'meal'  , 80  ),
('Shitake Mushroom', 'meal'  , 75   ),
('The Muscular', 'meal'  , 80   ),
('The Secret Burger', 'meal'  , 70  ),
( 'Super Box', 'meal'  , 200  ),
('Super Heros', 'meal'  , 250 ),
('Dinner Box', 'meal', 290  ),
('Coleslaw', 'meal'  , 20 ),
('Mozzarella Sticks', 'meal'  , 30 ),
('Onion Rings', 'meal'  ,25  ),
('Coca Cola Zero', 'drink', 10 ),
('Coca Cola', 'drink'  , 10   ),
('Fanta Green Apple', 'drink'  , 10 ),
('Fanta Orange', 'drink'  ,10 ),
('Sprite', 'drink', 10 ),
('Water', 'drink', 10 );


Insert into Employee (ID , FirstName , LastName ,Age   , Type    ,Branch_id   ) values
(1, 'Salma', 'Diaa', 25, 'C', 1), 
(2, 'Kamal', 'Selim', 26, 'C', 2), 
(3, 'Farah', 'Ehab', 27, 'C', 3), 
(4, 'Yousef', 'Yehia', 25, 'C', 4), 
(5, 'Nada', 'Hany', 24, 'C', 5),
(6, 'Donia', 'Ashraf', 25, 'C', 1),
 (7, 'Abdelrahman', 'Ghareeb', 23, 'C', 2), 
 (8, 'Diaa', 'Khaled', 24, 'C', 3), 
 (9, 'Antony', 'Emil', 23, 'C', 4),
 (10, 'Amir', 'Mansi', 25, 'C', 5),
 (11, 'Ahmed', 'Diaa', 20, 'D', 1), 
 (12, 'Mohamed', 'Selim', 21, 'D', 2),
 (13, 'Wael', 'Ehab', 22, 'D', 3), 
 (14, 'Hossam', 'Sayed', 23, 'D', 4), 
 (15, 'Ahmed', 'Alaa', 23, 'D', 5),
 (16, 'Waleed', 'Ashraf', 25, 'D', 1), 
 (17, 'Mostafa', 'Ghareeb', 22, 'D', 2),
 (18, 'Beshoy', 'Khaled', 23, 'D', 3), 
 (19, 'Fady', 'Emil', 24, 'D', 4), 
 (20, 'Andrew', 'Alaa', 20, 'D', 5),
 (21, 'Mohamed', 'Alaa', 28, 'M', 1),
 (22, 'Ahmed', 'Hussien', 30, 'M', 2),
 (23, 'Reda', 'Mohamed', 32, 'M', 3), 
 (24, 'Salama', 'Aly', 30, 'M', 4),
 (25, 'Adel', 'Samir', 35, 'M', 5);


Insert into Orders (ID, Payment_method, Customer_ID, Delivery_boy_ID, Branch_ID, status) values
(1, 'Online', 1, 12, 2, 'Delivered'),
(2, 'Online', 5, 12, 2, 'Delivered'),
(3, 'On Deliver', 2, 16, 1, 'Canceled'),
(4, 'Online', 7, 19, 4, 'Delivered'),
(5, 'On Deliver', 6, 16, 1, 'Delivered'),
(6, 'Online', 8, 13, 3, 'On Delivery'),
(7, 'On Deliver', 2, 13, 3, 'On Delivery');

Insert into Order_Item (Item_id, Order_id) values (1,1), (1,2), (1,3), (2,2), (2,3);
Insert into Order_Item (Item_id, Order_id) values (4, 5), (4,4), (6,4), (6,5), (10, 7);
Insert into Order_Item (Item_id, Order_id) values (1, 5), (2,4), (4,4), (4,5);


ALTER TABLE Customer
ADD CONSTRAINT Customer_fk1
FOREIGN KEY (Delivery_area_ID) REFERENCES Delivery_Area (ID);


ALTER TABLE Orders
ADD CONSTRAINT Orders_fk1
FOREIGN KEY (Customer_ID) REFERENCES  Customer (ID);
 

 
ALTER TABLE Item
ADD CONSTRAINT Item_fk1
FOREIGN KEY (Chef_ID) REFERENCES  Employee (ID);





ALTER TABLE Branches
ADD CONSTRAINT Branches_fk1
FOREIGN KEY (Manager_ID) REFERENCES  Employee (ID);


ALTER TABLE Employee
ADD CONSTRAINT Employee_fk1
FOREIGN KEY (Branch_id) REFERENCES  Branches (Branch_id);


ALTER TABLE Supplier_Ingredient
ADD CONSTRAINT Supplier_Ingredient_fk1
FOREIGN KEY (Supplier_id) REFERENCES  Supplier (ID);

ALTER TABLE Supplier_Ingredient
ADD CONSTRAINT Supplier_Ingredient_fk2
FOREIGN KEY (Ingredient_id) REFERENCES  Ingredients (ID);


ALTER TABLE Ingredients_Item
ADD CONSTRAINT Ingredients_Item_fk1
FOREIGN KEY (Ingredient_id) REFERENCES  Ingredients (ID);

ALTER TABLE Ingredients_Item
ADD CONSTRAINT Ingredients_Itemt_fk2
FOREIGN KEY (Item_id) REFERENCES  Ingredients (ID);


ALTER TABLE Order_Item
ADD CONSTRAINT Order_Item_fk1
FOREIGN KEY (Item_id) REFERENCES  Item (ID);

ALTER TABLE Order_Item
ADD CONSTRAINT Order_Item_fk2
FOREIGN KEY (Order_id) REFERENCES  Orders (ID);

*/

/*
select * from item;

select * from Ingredients;

select * from customer;

*/


-- Yasmeen 
-- CREATE TABLE Order_Item (  Item_id int , Order_id int );
-- CREATE TABLE Orders (ID INT PRIMARY KEY AUTO_INCREMENT,  Payment_method varchar(50), Customer_ID INT ,
--    Delivery_boy_ID INT , Branch_ID int , status varchar(50)  );


-- select * from Order_Item;
-- Order price
/*select Order_Item.Order_id , sum(Item.Price) as orderPrice
from Order_Item , Item
where Order_Item.Item_id = Item.ID
group by Order_Item.Order_id
order by Order_Item.Order_id;
*/

/*
-- Orders summary
select status, count(ID)
from Orders
group by status; */

-- CREATE TABLE Order_Item (  Item_id int , Order_id int )
/* Best-Selling items*/

/*
select Item_id , count(Item_id) as totalPurchases
from Order_Item
group by Item_id
order by totalPurchases desc
limit 5;


select sum(Item.Price) as totalRevenue
from Order_Item , Item
where Order_Item.Item_id = Item.ID;

select count(ID)
from Orders
where status = 'On Delivery';


select Order_Item.Item_id, Item.Name , Item.Type ,Item.Price ,count(Order_Item.Item_id) as totalPurchases, (Item.Price * count(Order_Item.Item_id)) as totalRevenue
from Order_Item, Item
where Item.ID = Order_Item.Item_id
group by Item_id
order by totalPurchases desc
limit 5;*/

use Restaurant_Reservation_System;

select c.firstName , o.Payment_method , o.orderDate , o.status from orders as o , customer as c where DATE(o.orderDate) = CURDATE() and o.Customer_ID = c.ID;