"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CreditCard,
  DollarSign,
  Download,
  Receipt,
  Search,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";

interface PaymentRecord {
  _id: string;
  userEmail: string;
  userName: string;
  userRole: string;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  paymentStatus: string;
  paidAt: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await apiFetch<{ success: boolean; transactions: PaymentRecord[] }>(
          "/admin/transactions"
        );
        if (res.success) {
          setTransactions(res.transactions || []);
        }
      } catch (err: any) {
        console.error("Failed to load transactions:", err);
        toast.error(err.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalVolume = transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Payment Transactions
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Audit Stripe Pro Plan subscription payments and billing transaction IDs.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 px-5 py-3 text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            Total Revenue
          </p>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
            ${totalVolume.toFixed(2)} USD
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
            ))}
          </div>
        ) : transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Subscription Plan</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 dark:text-white">{tx.userName || "Subscriber"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{tx.userEmail}</p>
                    </td>

                    <td className="px-6 py-4">
                      <Badge className="bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 capitalize font-bold">
                        {tx.planName || "Pro Plan"}
                      </Badge>
                      <span className="block text-xs text-slate-400 capitalize mt-0.5">
                        Role: {tx.userRole}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-black text-slate-900 dark:text-white">
                      ${Number(tx.amount).toFixed(2)} {tx.currency?.toUpperCase() || "USD"}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-slate-600 dark:text-slate-300">
                      {tx.transactionId || "tx_simulated"}
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(tx.paidAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Badge className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold uppercase text-[10px]">
                        {tx.paymentStatus || "PAID"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <Receipt size={42} className="mx-auto text-slate-300 dark:text-slate-700" />
            <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-200">No transactions recorded yet</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              When users purchase Pro upgrades via Stripe, transactions will be logged here automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
