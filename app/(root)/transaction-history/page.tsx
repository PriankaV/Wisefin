import HeaderBox from '@/components/HeaderBox';
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import ReceiptTransactionTable from '@/components/ReceiptTransactionTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount } from '@/lib/utils';
import React from 'react';

const TransactionHistory = async ({ searchParams: { id, page }}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;
  
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });

  // Hardcoded transaction data
  const hardcodedTransactions = [
    {
      id: 'txn_001',
      name: 'Grocery Store Purchase',
      amount: 45.23,
      status: 'Completed',
      date: '2025-04-15',
      channel: 'Debit Card',
      category: 'Groceries',
    },
    {
      id: 'txn_002',
      name: 'Online Subscription',
      amount: 12.99,
      status: 'Completed',
      date: '2025-04-14',
      channel: 'Online',
      category: 'Entertainment',
    },
    {
      id: 'txn_003',
      name: 'Utility Bill Payment',
      amount: 75.00,
      status: 'Pending',
      date: '2025-04-13',
      channel: 'ACH',
      category: 'Utilities',
    },
    {
      id: 'txn_004',
      name: 'Coffee Shop',
      amount: 5.50,
      status: 'Completed',
      date: '2025-04-12',
      channel: 'Debit Card',
      category: 'Dining',
    },
    {
      id: 'txn_005',
      name: 'Gas Station',
      amount: 30.00,
      status: 'Completed',
      date: '2025-04-11',
      channel: 'Debit Card',
      category: 'Transportation',
    },
  ];

  const rowsPerPage = 10;
  const totalPages = Math.ceil(hardcodedTransactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = hardcodedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const receiptTransactions = account?.receipts || []; // Keep this as is for receipts

  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox 
          title="Receipt & Transaction History"
          subtext="View scanned receipts and past transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">{account?.data.name}</h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">{formatAmount(account?.data.currentBalance)}</p>
          </div>
        </div>

        <ReceiptTransactionTable receipts={receiptTransactions} />

        <TransactionsTable transactions={currentTransactions} />
      </div>
    </div>
  );
};

export default TransactionHistory;