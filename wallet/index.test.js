const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Blockchain = require('../blockchain');

describe('Wallet', () => {
    let wallet, tp, bc;

    beforeEach(() => {
        bc = new Blockchain();
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('creating a transaction', () => {
        let transaction, sendAmount, recipient;

        beforeEach(() => {
            sendAmount = 50;
            recipient = 'r4nd0m-4ddr355';
            transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
        });

        describe('doing the same transaction', () => {        
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, bc, tp);
            });
    
            it ('doubles the `sendAmount` subtracted from wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - sendAmount * 2);
            });
    
            it ('clones the `sendAmount` output for recipient', () => {
                expect(transaction.outputs.filter(output => output.address === recipient)
                .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            });
        });  
    });
});