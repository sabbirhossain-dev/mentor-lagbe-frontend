"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Check,
  Mail,
  Search,
  Shield,
  ShieldCheck,
  UserCheck,
  UserRound,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";

interface UserRecord {
  _id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  plan?: "free" | "pro";
  createdAt?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await apiFetch<{ success: boolean; users: UserRecord[] }>("/admin/users");
      if (res.success) {
        setUsers(res.users || []);
      }
    } catch (err: any) {
      console.error("Failed to load users:", err);
      toast.error(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: "student" | "tutor" | "admin") => {
    setUpdatingId(userId);
    try {
      const res = await apiFetch<{ success: boolean; message: string }>(
        `/admin/users/${userId}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (res.success) {
        toast.success(`User role updated to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">User Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            View all registered users and assign role permissions (Student, Tutor, Admin).
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 pl-9 rounded-xl border-slate-200"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl bg-slate-100" />
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/70 text-xs font-bold uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4">Plan</th>
                  <th className="px-6 py-4 text-right">Change Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700 text-xs">
                        {(u.name || "U").charAt(0).toUpperCase()}
                      </div>
                      <span>{u.name}</span>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500">{u.email}</td>

                    <td className="px-6 py-4">
                      <Badge
                        className={`capitalize text-xs font-bold py-0.5 px-2.5 ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : u.role === "tutor"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-emerald-100 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {u.role || "student"}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant="secondary"
                        className="capitalize text-xs font-semibold bg-slate-100"
                      >
                        {u.plan || "free"}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <select
                          disabled={updatingId === u._id}
                          value={u.role || "student"}
                          onChange={(e) =>
                            handleRoleChange(u._id, e.target.value as "student" | "tutor" | "admin")
                          }
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="student">Student</option>
                          <option value="tutor">Tutor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <Users size={42} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-800">No users found</h3>
            <p className="mt-1 text-xs text-slate-500">No registered users matched your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
