import { Client, Account } from "appwrite";
const client = new Client();
const account = new Account(client);
client
    .setEndpoint('http://192.168.245.176/v1') // Your API Endpoint
    .setProject('62c0ed43b8cd2bb72563') // Your project ID
    
;

// const promise = account.create('[USER_ID]', 'email@example.com', 'password');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });
export {account, client}