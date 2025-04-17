import HeaderBox from '@/components/HeaderBox';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import ReceiptScanner from '@/components/ReceiptScanner';
import Chatbox from '@/components/Chatbox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  });

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

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={hardcodedTransactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />

        {/* Receipt Scanner Section */}
        <div className="mt-6">
          <ReceiptScanner />
        </div>

        {/* Chatbox Section */}
        <div className="mt-6">
          <Chatbox />
        </div>
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={hardcodedTransactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;