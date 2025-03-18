import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { formatAmount, formatDateTime } from "@/lib/utils";
  
  interface Receipt {
    id: string;
    name: string;
    amount: number;
    date: string;
    category: string;
  }
  
  interface ReceiptTransactionTableProps {
    receipts: Receipt[];
  }
  
  const ReceiptTransactionTable = ({ receipts = [] }: ReceiptTransactionTableProps) => {
    return (
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">Receipt Name</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Date</TableHead>
            <TableHead className="px-2 max-md:hidden">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receipts.length > 0 ? (
            receipts.map((r) => (
              <TableRow key={r.id} className="border-b">
                <TableCell className="max-w-[250px] pl-2 pr-10">
                  <h1 className="text-14 truncate font-semibold text-[#344054]">{r.name}</h1>
                </TableCell>
  
                <TableCell className="pl-2 pr-10 font-semibold text-[#039855]">
                  {formatAmount(r.amount)}
                </TableCell>
  
                <TableCell className="min-w-32 pl-2 pr-10">
                  {formatDateTime(new Date(r.date)).dateTime}
                </TableCell>
  
                <TableCell className="pl-2 pr-10 max-md:hidden">
                  {r.category}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No receipts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };
  
  export default ReceiptTransactionTable;
  