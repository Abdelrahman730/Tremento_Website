const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./restaurant.db');

const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) {
                console.error('Error running query:', query);
                console.error(err);
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

const setupDatabase = async () => {
    try {
        console.log("Creating tables...");

        await runQuery(`DROP TABLE IF EXISTS Customer`);
        await runQuery(`DROP TABLE IF EXISTS Ingredients`);
        await runQuery(`DROP TABLE IF EXISTS Supplier`);
        await runQuery(`DROP TABLE IF EXISTS Orders`);
        await runQuery(`DROP TABLE IF EXISTS Delivery_Area`);
        await runQuery(`DROP TABLE IF EXISTS Branches`);
        await runQuery(`DROP TABLE IF EXISTS Item`);
        await runQuery(`DROP TABLE IF EXISTS Employee`);
        await runQuery(`DROP TABLE IF EXISTS Supplier_Ingredient`);
        await runQuery(`DROP TABLE IF EXISTS Ingredients_Item`);
        await runQuery(`DROP TABLE IF EXISTS Order_Item`);
        await runQuery(`DROP TABLE IF EXISTS Delivery_boy`);

        await runQuery(`CREATE TABLE Customer (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, 
            FirstName TEXT, 
            LastName TEXT, 
            Password TEXT, 
            Email TEXT, 
            Delivery_area_ID INTEGER, 
            Card_number TEXT, 
            Access_level TEXT, 
            street TEXT, 
            district TEXT, 
            Phone_Number TEXT
        )`);

        await runQuery(`CREATE TABLE Ingredients (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, 
            Price REAL, 
            Quantity INTEGER DEFAULT 0, 
            Name TEXT
        )`);

        await runQuery(`CREATE TABLE Supplier (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, 
            FirstName TEXT, 
            LastName TEXT
        )`);

        await runQuery(`CREATE TABLE Orders (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, 
            Payment_method TEXT, 
            Customer_ID INTEGER,
            Delivery_boy_ID INTEGER, 
            Branch_ID INTEGER, 
            status TEXT, 
            orderDate DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        await runQuery(`CREATE TABLE Delivery_Area (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, 
            district TEXT, 
            Branch_id INTEGER
        )`);

        await runQuery(`CREATE TABLE Branches (
            Branch_id INTEGER PRIMARY KEY AUTOINCREMENT, 
            Branch_Name TEXT, 
            Manager_ID INTEGER, 
            district TEXT
        )`);

        await runQuery(`CREATE TABLE Item (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, 
            Name TEXT, 
            Type TEXT, 
            Price REAL, 
            Chef_ID INTEGER, 
            Branch_id INTEGER
        )`);

        await runQuery(`CREATE TABLE Employee (
            ID INTEGER PRIMARY KEY AUTOINCREMENT, 
            FirstName TEXT, 
            LastName TEXT, 
            Age INTEGER, 
            Type TEXT, 
            Branch_id INTEGER
        )`);

        await runQuery(`CREATE TABLE Supplier_Ingredient (
            Ingredient_id INTEGER, 
            Supplier_id INTEGER
        )`);

        await runQuery(`CREATE TABLE Ingredients_Item (
            Item_id INTEGER, 
            Ingredient_id INTEGER
        )`);

        await runQuery(`CREATE TABLE Order_Item (
            Item_id INTEGER, 
            Order_id INTEGER
        )`);

        await runQuery(`CREATE TABLE Delivery_boy (
            Boy_ID INTEGER PRIMARY KEY, 
            motorcycle_ID INTEGER
        )`);

        console.log("Tables created. Seeding data...");

        // Seed Customers
        const customers = [
            [1, 'Yasmine', 'Yehia', 'Rs12345', 'yasmie_yehia@gmail.com', 2, '4578246328', '0', 'Mohamed-Megahed', 'First'],
            [2, 'Maryam', 'Mohamed', 'Ms123445', 'maryam_mohamed@gmail.com', 1, '4478246328', '0', 'Mohamed-shahen', 'Second'],
            [3, 'Mohamed ', 'Salama', 'Md12345', 'Mohamed_salama@gmail.com', 3, '4578248328', '0', 'Amarart-Elshorta', 'Second'],
            [4, 'Ahmed', 'Yassin', 'Mf12345', 'mohamed_yassin@gmail.com', 1, '4578246329', '1', 'Abaas-Akad', 'Third'],
            [5, 'Shorouk', 'Alalem', 'Mf12D45', 'shorouk_alalem@gmail.com', 2, '4578247329', '1', 'Abaas-Akad', 'Third'],
            [6, 'Abdelrahman', 'Ahmed', 'Ko12345', 'bedo555@gmail.com', 3, '4579056328', '0', 'Khaled-Amad', 'Fourth'],
            [7, 'Ahmed', 'Dahy', 'Dr123445', 'ahmeddahy@gmail.com', 4, '4478245528', '0', 'Rawda-Elmohnds', 'Fifth'],
            [8, 'Kareem', 'Samy', 'Ks12345', 'ksamy22@gmail.com', 5, '4573148328', '0', 'Elrahab', 'First'],
            [9, 'Mohanad', 'Atef', 'MA12345', 'm_atef@hotmail.com', 1, '4578246331', '0', 'Elandals', 'Second'],
            [10, 'Marwan', 'Yasser', 'MY12D45', 'maro2001@gmail.com', 5, '4578247333', '0', 'Gamal-Abdelnasser', 'Third'],
            [11, 'Mohamed', 'Mostafa', 'MM12D45', 'mostafa2022@outlook.com', 2, '4578800333', '0', 'Elsallam', 'Fourth'],
            [12, 'Salma', 'Haddad', 'SH12D45', 'hadad_salma1@gmail.com', 5, '4579247333', '0', 'Syria', 'Fifth'],
            [13, 'Rawan', 'Galal', 'Rg12D45', 'rorogalal70@gmail.com', 1, '4578257223', '0', 'Eltahrer', 'Third'],
            [14, 'Lina', 'Hesham', 'Lh12445', 'Linaaah_h@gmail.com', 5, '4578247333', '0', 'Ahmed-Oraby', 'First'],
            [15, 'Islam', 'Ahmed', 'Ia12W49', 'Ahmed_islam57@gmail.com', 4, '4572147333', '0', 'Sodan', 'Fourth']
        ];
        for (const cust of customers) {
            await runQuery(
                `INSERT OR IGNORE INTO Customer (ID, FirstName, LastName, Password, Email, Delivery_area_ID, Card_number, Access_level, street, district) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                cust
            );
        }

        // Seed Ingredients
        const ingredients = [
            [1, 10, 10, 'Tomato'],
            [2, 10, 10, 'Potato'],
            [3, 170, 20, 'Beef'],
            [4, 70, 20, 'Chicken'],
            [5, 14, 10, 'Pepper'],
            [6, 11, 100, 'Flour'],
            [7, 30, 60, 'Oil'],
            [8, 70, 20, 'Cheese'],
            [9, 19, 20, 'Milk'],
            [10, 5, 10, 'Salt'],
            [11, 20, 10, 'Spices'],
            [12, 60, 20, 'Butter'],
            [13, 2, 30, 'Onion'],
            [14, 5, 30, 'Garlic'],
            [16, 6, 30, 'Noodles'],
            [17, 12, 30, 'Rice'],
            [18, 10, 30, 'Sugar'],
            [19, 6, 40, 'Cucumber'],
            [20, 7, 35, 'Radish'],
            [21, 2, 25, 'Lettuce'],
            [22, 8, 21, 'Carrot'],
            [23, 60, 10, 'Eggs'],
            [24, 30, 5, 'Mozzarella']
        ];
        for (const ing of ingredients) {
            await runQuery(`INSERT OR IGNORE INTO Ingredients (ID, Price, Quantity, Name) VALUES (?,?,?,?)`, ing);
        }

        // Seed Delivery Area
        const areas = [
            [1, 'First', 1],
            [2, 'Second', 2],
            [3, 'Third', 3],
            [4, 'Fourth', 4],
            [5, 'Fifth', 5]
        ];
        for (const area of areas) {
            await runQuery(`INSERT OR IGNORE INTO Delivery_Area (ID, district, Branch_id) VALUES (?,?,?)`, area);
        }

        // Seed Branches
        const branches = [
            [1, 'Tremento-First', 'First', 21],
            [2, 'Tremento-Second', 'Second', 22],
            [3, 'Tremento-Third', 'Third', 23],
            [4, 'Tremento-Fourth', 'Fourth', 24],
            [5, 'Tremento-Fifth', 'Fifth', 25]
        ];
        for (const branch of branches) {
            await runQuery(`INSERT OR IGNORE INTO Branches (Branch_id, Branch_Name, district, Manager_ID) VALUES (?,?,?,?)`, branch);
        }

        // Seed Delivery Boy
        const boys = [
            [11, 1], [12, 2], [13, 3], [14, 4], [15, 5],
            [16, 6], [17, 7], [18, 8], [19, 9], [20, 10]
        ];
        for (const boy of boys) {
            await runQuery(`INSERT OR IGNORE INTO Delivery_boy (Boy_ID, motorcycle_ID) VALUES (?,?)`, boy);
        }

        // Seed Items
        const items = [
            [1, 'Charboiled BBQ', 'meal', 90],
            [2, 'Chicken Buster', 'meal', 65],
            [3, 'Chicken Flick', 'meal', 80],
            [4, 'Chicken Strips', 'meal', 75],
            [5, 'Chicken Velocity', 'meal', 70],
            [6, 'Double Digger', 'meal', 65],
            [7, 'Double Double', 'meal', 120],
            [8, 'Double Jab', 'meal', 100],
            [9, 'Go-to Burger', 'meal', 80],
            [10, 'Shitake Mushroom', 'meal', 75],
            [11, 'The Muscular', 'meal', 80],
            [12, 'The Secret Burger', 'meal', 70],
            [13, 'Super Box', 'meal', 200],
            [14, 'Super Heros', 'meal', 250],
            [15, 'Dinner Box', 'meal', 290],
            [16, 'Coleslaw', 'meal', 20],
            [17, 'Mozzarella Sticks', 'meal', 30],
            [18, 'Onion Rings', 'meal', 25],
            [19, 'Coca Cola Zero', 'drink', 10],
            [20, 'Coca Cola', 'drink', 10],
            [21, 'Fanta Green Apple', 'drink', 10],
            [22, 'Fanta Orange', 'drink', 10],
            [23, 'Sprite', 'drink', 10],
            [24, 'Water', 'drink', 10]
        ];
        for (const item of items) {
            await runQuery(`INSERT INTO Item (ID, Name, Type, Price) VALUES (?,?,?,?)`, item);
        }

        // Seed Employee
        const employees = [
            [1, 'Salma', 'Diaa', 25, 'C', 1],
            [2, 'Kamal', 'Selim', 26, 'C', 2],
            [3, 'Farah', 'Ehab', 27, 'C', 3],
            [4, 'Yousef', 'Yehia', 25, 'C', 4],
            [5, 'Nada', 'Hany', 24, 'C', 5],
            [6, 'Donia', 'Ashraf', 25, 'C', 1],
            [7, 'Abdelrahman', 'Ghareeb', 23, 'C', 2],
            [8, 'Diaa', 'Khaled', 24, 'C', 3],
            [9, 'Antony', 'Emil', 23, 'C', 4],
            [10, 'Amir', 'Mansi', 25, 'C', 5],
            [11, 'Ahmed', 'Diaa', 20, 'D', 1],
            [12, 'Mohamed', 'Selim', 21, 'D', 2],
            [13, 'Wael', 'Ehab', 22, 'D', 3],
            [14, 'Hossam', 'Sayed', 23, 'D', 4],
            [15, 'Ahmed', 'Alaa', 23, 'D', 5],
            [16, 'Waleed', 'Ashraf', 25, 'D', 1],
            [17, 'Mostafa', 'Ghareeb', 22, 'D', 2],
            [18, 'Beshoy', 'Khaled', 23, 'D', 3],
            [19, 'Fady', 'Emil', 24, 'D', 4],
            [20, 'Andrew', 'Alaa', 20, 'D', 5],
            [21, 'Mohamed', 'Alaa', 28, 'M', 1],
            [22, 'Ahmed', 'Hussien', 30, 'M', 2],
            [23, 'Reda', 'Mohamed', 32, 'M', 3],
            [24, 'Salama', 'Aly', 30, 'M', 4],
            [25, 'Adel', 'Samir', 35, 'M', 5]
        ];
        for (const emp of employees) {
            await runQuery(`INSERT OR IGNORE INTO Employee (ID, FirstName, LastName, Age, Type, Branch_id) VALUES (?,?,?,?,?,?)`, emp);
        }

        // Generate extensive mock data
        console.log("Generating mock data...");
        const statuses = ['Delivered', 'Proccessing', 'Canceled', 'On Delivery'];
        const paymentMethods = ['Online', 'On Deliver'];
        const today = new Date(); // Current date for "today's" orders

        // Create 60 random orders
        for (let i = 1; i <= 60; i++) {
            const customerId = Math.floor(Math.random() * 15) + 1; // 1-15
            const branchId = Math.floor(Math.random() * 5) + 1; // 1-5
            const deliveryBoyId = Math.floor(Math.random() * 10) + 11; // 11-20
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const payment = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

            // Random date within last 30 days
            const date = new Date();
            if (i <= 20) {
                // First 20 are TODAY (to show in dashboard latest orders)
                // Keeping them close to now, slight variations
                // No change to date, uses today
            } else {
                // Others are in the past
                date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            }
            const dateStr = date.toISOString().slice(0, 19).replace('T', ' ');

            // Insert Order
            await runQuery(
                `INSERT INTO Orders (Payment_method, Customer_ID, Delivery_boy_ID, Branch_ID, status, orderDate) VALUES (?,?,?,?,?,?)`,
                [payment, customerId, deliveryBoyId, branchId, status, dateStr]
            );

            // Insert Items for this order (1-5 items per order)
            const itemCount = Math.floor(Math.random() * 5) + 1;

            // Get the order ID of the inserted order. Since we use execute runQuery sequentially, we can get last ID.
            // Easier way: fetch max ID.
            const rows = await new Promise(r => db.all("SELECT seq from sqlite_sequence WHERE name='Orders'", (err, rows) => r(rows)));
            // This might be flaky if sqlite_sequence not updated immediately or if table empty (which it isn't). 
            // Better: "SELECT last_insert_rowid()" inside the SAME connection. But runQuery makes new promises.
            // Actually, `this.lastID` in the run callback is what we need. 
            // I'll assume i corresponds if auto-increment is clean, but let's query MAX(ID).

            const maxRows = await new Promise(r => db.all("SELECT MAX(ID) as id FROM Orders", (err, rows) => r(rows)));
            const orderId = maxRows[0].id;

            for (let j = 0; j < itemCount; j++) {
                const itemId = Math.floor(Math.random() * 24) + 1; // 1-24
                await runQuery(`INSERT INTO Order_Item (Item_id, Order_id) VALUES (?,?)`, [itemId, orderId]);
            }
        }

        console.log("Database seeded successfully with mock data.");

    } catch (err) {
        console.error("Error setting up database:", err);
    } finally {
        db.close();
    }
};

setupDatabase();
