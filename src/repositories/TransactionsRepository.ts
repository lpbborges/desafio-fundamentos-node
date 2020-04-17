import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): object {
    return {
      transactions: this.transactions,
      balance: this.getBalance(),
    };
  }

  public getBalance(): Balance {
    const sum = (value: number, currentValue: number): number =>
      value + currentValue;

    const totalIncomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transactions => transactions.value)
      .reduce(sum, 0);

    const totalOutcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transactions => transactions.value)
      .reduce(sum, 0);

    const totalBalance = this.transactions
      .map(transactions =>
        transactions.type === 'outcome'
          ? -transactions.value
          : transactions.value,
      )
      .reduce(sum, 0);

    const balance = {
      income: totalIncomes,
      outcome: totalOutcomes,
      total: totalBalance,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
