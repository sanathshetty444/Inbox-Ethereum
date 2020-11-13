const assert=require('assert')
const ganache=require('ganache-cli')
const Web3=require('web3') 
// Web is a constructor thats y capital 
// and the remaining are the functions 
const provider = ganache.provider();
const web3 = new Web3(provider);
// Mocha functions
// it = Run a test and make an assertion
// describe= groups together it functions
// beforeEach= execute some general setup code

// --------Demo----------- For --------Mocha----------
// class Car{
//     park(){
//         return 'stopped';
//     }
//     drive(){
//         return 'vroom';
//     }
// }
// let car;
// beforeEach(()=>{
//     car = new Car();
// })

// describe('car',()=>{
//     it('can park',()=>{
        
//         assert.equal(car.park(),'stopped');
//     });
//     it('can drive',()=>{
       
//         assert.equal(car.drive(),'vroom')
//     });
// })

// beforeEach is called before describe method and called before every it function
const {interface,bytecode} = require('../compile')
let accounts;
let inbox;

beforeEach(async()=>{
    // get a list of all accounts
   
    accounts=await web3.eth.getAccounts();

    // Use one of the accounts to deploy the contract

    inbox= await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode, arguments:['Hi there!']})
        .send({from : accounts[0],gas : '1000000'})
    inbox.setProvider(provider);


})
describe('Inbox',()=>{
    it('deploys a contract',()=>{
        assert.ok(inbox.options.address)
    })
    it('has a default message', async()=>{
        const message = await inbox.methods.message().call()
        assert.equal(message,'Hi there!')
        
    })
    it('can change the message',async ()=>{
        await inbox.methods.setMessage('bye').send({from:accounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message,'bye')
    })


}) 