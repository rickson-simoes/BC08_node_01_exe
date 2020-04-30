import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionTDO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions
      .filter(val => val.type === 'income')
      .map(f => f.value)
      .reduce((a, b) => a + b, 0);

    const outcomeSum = this.transactions
      .filter(val => val.type === 'outcome')
      .map(f => f.value)
      .reduce((a, b) => a + b, 0);

    const valAvailable = incomeSum - outcomeSum;

    return { income: incomeSum, outcome: outcomeSum, total: valAvailable };
  }

  public create({ title, value, type }: TransactionTDO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
