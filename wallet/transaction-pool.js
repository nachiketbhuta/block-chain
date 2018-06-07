const Transaction = require('./transaction');

class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    updateOrAddTransaction (transaction) {
        let transactionWithId = this.transactions.find((a) => {
            return  a.id === transaction.id;
        });

        if (transactionWithId) {
        this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        } 
        else {
            this.transactions.push(transaction);
        } 
    }

    existingTransaction(address) {
        return this.transactions.find((a) => {
            return a.input.address === address;
        });
    }

    validTransactions() {
        return this.transactions.filter(transaction => {
            const outputTotal = this.transactions.outputs.reduce((total, output) => total + output.total, 0);

            if (transaction.input.amount !== outputTotal) {
                console.log(`Invalid transaction from ${transaction.input.address}`);
                return;
            }

            if (!Transaction.verifyTransaction(transaction)) {
                console.log(`Invalid signature from ${transaction.input.address}`);
                return;
            }

            return transaction;
        });
    }

    clear() {
        this.transactions = [];
    }
}

module.exports = TransactionPool;