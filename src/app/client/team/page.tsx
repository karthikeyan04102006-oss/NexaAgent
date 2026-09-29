'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { OrganizationMember, UserRole } from '@/types';
import { INITIAL_MEMBERS, DEMO_ORGANIZATION } from '@/lib/demo-data';
import { Users, UserPlus, Shield, Mail, CheckCircle2, Trash2, Building2 } from 'lucide-react';

export default function ClientTeamPage() {
  const { user } = useAuth();
  const [members, setMembers] = useState<OrganizationMember[]>(INITIAL_MEMBERS);
  const [isInviteOpen, setIsInviteOpen] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteRole, setInviteRole] = useState<UserRole>('user');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const newMember: OrganizationMember = {
      id: `mem_${Math.random().toString(36).substring(2, 9)}`,
      organizationId: DEMO_ORGANIZATION.id,
      userId: `usr_${Math.random().toString(36).substring(2, 9)}`,
      fullName: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'invited',
      lastActive: 'Pending Invite'
    };

    setMembers(prev => [newMember, ...prev]);
    setIsInviteOpen(false);
    setInviteEmail('');
  };

  const handleRemoveMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleChangeRole = (id: string, newRole: UserRole) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, role: newRole } : m));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-800 text-xs font-semibold mb-1 shadow-red-glow">
              <Shield className="w-3.5 h-3.5" />
              <span>Client / Organization Admin</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Users className="w-7 h-7 text-red-500" /> Team Management & Permissions
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Invite organization members, manage roles (`user` vs `client_admin`), and control access policies.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setIsInviteOpen(true)}
            icon={<UserPlus className="w-4 h-4" />}
          >
            Invite Member
          </Button>
        </div>

        {/* TEAM TABLE */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Team Roster</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-800 font-mono uppercase text-zinc-500 text-[10px]">
                <tr>
                  <th className="pb-3">Member</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Last Active</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {members.map(member => (
                  <tr key={member.id} className="hover:bg-zinc-900/40">
                    <td className="py-3.5 font-bold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold text-xs">
                        {member.fullName.charAt(0).toUpperCase()}
                      </div>
                      {member.fullName}
                    </td>
                    <td className="py-3.5 text-zinc-400 font-mono">{member.email}</td>
                    <td className="py-3.5">
                      <select
                        value={member.role}
                        onChange={e => handleChangeRole(member.id, e.target.value as UserRole)}
                        className="bg-zinc-900 border border-zinc-800 text-xs text-white rounded-lg px-2 py-1 focus:outline-none focus:border-red-600 font-semibold"
                      >
                        <option value="user">USER</option>
                        <option value="client_admin">CLIENT ADMIN</option>
                      </select>
                    </td>
                    <td className="py-3.5">
                      {member.status === 'active' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-950 text-amber-400 border border-amber-800 font-medium">
                          Pending Invite
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-zinc-500 font-mono">{member.lastActive}</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* INVITE MODAL */}
        {isInviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-red-glow">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-red-500" /> Invite Team Member
              </h3>

              <form onSubmit={handleInvite} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="teammate@company.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Role Assignment</label>
                  <select
                    value={inviteRole}
                    onChange={e => setInviteRole(e.target.value as UserRole)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                  >
                    <option value="user">USER (Task & Agent execution)</option>
                    <option value="client_admin">CLIENT ADMIN (Organization & Member management)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" type="button" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
                  <Button type="submit" variant="primary">Send Invitation</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
