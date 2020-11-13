const path = require('path')
const fs = require('fs')
const solc = require('solc')
const InboxPath= path.resolve(__dirname,'Contracts','Inbox.sol')
console.log(InboxPath);
const source=fs.readFileSync(InboxPath,'utf-8')
module.exports=solc.compile(source,1).contracts[':Inbox'];
