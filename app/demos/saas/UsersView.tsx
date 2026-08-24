"use client";

import { useMemo, useState } from "react";
import { INITIAL_USERS, type DemoUser, type UserRole } from "./data";

const ROLES: UserRole[] = ["Admin", "Editor", "Viewer"];

function StatusBadge({ status }: { status: DemoUser["status"] }) {
  const styles: Record<DemoUser["status"], string> = {
    Active: "bg-pos-500/15 text-pos-500 border-pos-500/25",
    Pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Suspended: "bg-graphite-500/15 text-graphite-300 border-graphite-600/60",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active"
            ? "bg-pos-500"
            : status === "Pending"
              ? "bg-amber-400"
              : "bg-graphite-400"
        }`}
      />
      {status}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-metric-400/25 bg-metric-400/15 font-mono text-xs text-metric-300">
      {initials}
    </span>
  );
}

export default function UsersView() {
  const [users, setUsers] = useState<DemoUser[]>(INITIAL_USERS);
  const [query, setQuery] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("Editor");
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [users, query]);

  const changeRole = (id: string, role: UserRole): void => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    const user = users.find((u) => u.id === id);
    if (user) setNotice(`${user.name}’s role updated to ${role}`);
  };

  const submitInvite = (e: React.FormEvent): void => {
    e.preventDefault();
    const name = inviteName.trim();
    const handle = inviteEmail.trim().toLowerCase().replace(/[^a-z0-9.-]/g, "");
    if (!name || !handle) return;
    const next: DemoUser = {
      id: `u-${String(users.length + 1).padStart(2, "0")}-inv`,
      name,
      email: `${handle}@inkflow-demo.io`,
      role: inviteRole,
      lastActive: "Invite sent",
      status: "Pending",
    };
    setUsers((prev) => [next, ...prev]);
    setNotice(`Invite sent to ${next.email}`);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Editor");
    setInviteOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <svg
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden
          >
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L17 17" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full rounded-lg border border-graphite-700 bg-graphite-900/60 py-2 pl-9 pr-3 text-sm text-graphite-50 placeholder:text-graphite-500 focus:border-metric-400/50 focus:outline-none"
          />
        </div>
        <button
          onClick={() => setInviteOpen((v) => !v)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-metric-400 px-4 py-2 text-sm font-medium text-graphite-950 transition-colors hover:bg-metric-300"
        >
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M8 3v10M3 8h10" />
          </svg>
          Invite user
        </button>
      </div>

      {/* invite form */}
      {inviteOpen && (
        <form
          onSubmit={submitInvite}
          className="rounded-2xl border border-metric-400/25 bg-metric-400/5 p-4 sm:p-5"
        >
          <p className="mb-3 text-sm font-medium text-graphite-50">
            Invite a teammate to Inkflow
          </p>
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
            <input
              type="text"
              required
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="Full name"
              className="rounded-lg border border-graphite-700 bg-graphite-900/60 px-3 py-2 text-sm text-graphite-50 placeholder:text-graphite-500 focus:border-metric-400/50 focus:outline-none"
            />
            <div className="flex items-center rounded-lg border border-graphite-700 bg-graphite-900/60 focus-within:border-metric-400/50">
              <input
                type="text"
                required
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="email"
                className="w-full min-w-0 bg-transparent px-3 py-2 text-sm text-graphite-50 placeholder:text-graphite-500 focus:outline-none"
              />
              <span className="pr-3 font-mono text-xs text-graphite-300">
                @inkflow-demo.io
              </span>
            </div>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as UserRole)}
              className="rounded-lg border border-graphite-700 bg-graphite-900/60 px-3 py-2 text-sm text-graphite-50 focus:border-metric-400/50 focus:outline-none"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg bg-metric-400 px-4 py-2 text-sm font-medium text-graphite-950 transition-colors hover:bg-metric-300"
            >
              Send invite
            </button>
          </div>
        </form>
      )}

      {/* notice */}
      {notice && (
        <div className="flex items-center justify-between rounded-lg border border-metric-400/25 bg-metric-400/15 px-4 py-2.5 text-sm text-metric-300">
          <span className="flex items-center gap-2">
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 8.5l3.5 3.5L13 5" />
            </svg>
            <span>{notice}</span>
          </span>
          <button
            onClick={() => setNotice(null)}
            className="text-metric-400/60 transition-colors hover:text-metric-300"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* table */}
      <div className="overflow-hidden rounded-2xl border border-graphite-700 bg-graphite-900/40">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-graphite-700 text-left text-xs uppercase tracking-wider text-graphite-300">
                <th className="px-4 py-3 font-medium sm:px-5">User</th>
                <th className="px-4 py-3 font-medium sm:px-5">Role</th>
                <th className="px-4 py-3 font-medium sm:px-5">Last active</th>
                <th className="px-4 py-3 font-medium sm:px-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-graphite-700/60 transition-colors last:border-0 hover:bg-graphite-800/40"
                >
                  <td className="px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} />
                      <div>
                        <p className="font-medium text-graphite-50">{u.name}</p>
                        <p className="font-mono text-xs text-graphite-300">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-5">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        changeRole(u.id, e.target.value as UserRole)
                      }
                      className="rounded-lg border border-graphite-700 bg-graphite-900/60 px-2.5 py-1.5 text-xs text-graphite-50 transition-colors hover:border-graphite-600 focus:border-metric-400/50 focus:outline-none"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-graphite-300 sm:px-5">
                    {u.lastActive}
                  </td>
                  <td className="px-4 py-3 sm:px-5">
                    <StatusBadge status={u.status} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center">
                    <p className="text-graphite-300">
                      No users match{" "}
                      <span className="font-mono text-graphite-50">
                        &ldquo;{query}&rdquo;
                      </span>
                    </p>
                    <button
                      onClick={() => setQuery("")}
                      className="mt-2 text-sm text-metric-400 transition-colors hover:text-metric-300"
                    >
                      Clear search
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-graphite-300">
        {filtered.length} of {users.length} users shown · role changes apply
        instantly in this demo
      </p>
    </div>
  );
}
