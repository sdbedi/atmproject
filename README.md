# ATM Project

A simple ATM application powered by the MEAN stack (Mongo/Mongoose, Express, Angular, Node)
You can fetch an account by PIN number; if that account exists, it will be fetched. If not, the app creates one with 10 dollars in starter money. This application comes loaded with two starter accounts: PIN 1234 with a balance of 100 dollars, and PIN 4321 with a balance of 10 dollars.

Once logged in, you can deposit or withdraw cash. You can't take out more money than is in your account; if you try, you'll recieve your entire remaining balance, your account balance will hit 0, and you will not be able to withdraw any more cash.

Steps to use:
1. Install Nodejs and MongoDB on your machine.
2. Clone/download this repo.
3. In your terminal window, navigate to the main folder where this application is installed, and type 'npm install'
4. In a separate terminal window, navigate to the main folder where this application is installed, and type 'mongod &'
5. Type 'npm start'
6. Navigate to localhost:4040 in your browser.

Possible extensibility:
Add numpad.
Add accountname to login fields.
Add hashing function.

