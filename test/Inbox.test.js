const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

console.log(interface);

beforeEach(async () => {
  //let all accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({data: bytecode, arguments: ['Hi there!']})
      .send({from: accounts[0], gas: '1000000'});
      inbox.setProvider(provider);
});

describe("Inbox", () => {

  it('deploys a contract', () => {
      assert.ok(inbox.options.address);
  });

  it('Has a default Message', async () => {
      const message = await inbox.methods.message().call();
      assert.equal(message,'Hi there!');
  });

  it('Sets the correct message', async () => {
    await inbox.methods.setMessage("test").send({from:accounts[0]});
    const message = await inbox.methods.message().call();
    assert.equal(message,'test');

  });
});
