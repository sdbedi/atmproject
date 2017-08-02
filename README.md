# ATM Project

A simple ATM application powered by the MEAN stack (Mongo/Mongoose, Express, Angular, Node)
You can fetch an account by PIN number; if that account exists, it will be fetched. If not, the app creates one with 10 dollars in starter money.

Once logged in, you can deposit or withdraw cash. You can't take out more money than is in your account; if you try, you'll recieve your entire remaining balance, your account balance will hit ), and you will not be able to withdraw any more cash.

Steps to use.
1.Clone/download repo.
2. Type 'npm install'
3. Type Mongod &
4. Type npm start
5. Navigate to localhost:4040 in your browser.
