'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { OrganizationMember, UserRole } from '@/types';
import { INITIAL_MEMBERS, DEMO_ORGANIZATION } from '@/lib/demo-data';
import { Users, UserPlus, Shield, Trash2 } from 'lucide-react';

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
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E3EC] pb-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest font-semibold text-[#A78BFA] mb-2">
              ORGANIZATION
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#17151C]">
              Team Members
            </h1>
            <p className="text-sm text-[#696572] mt-1">
              Manage organization members and access roles.
            </p>
          </div>

          <Button
            onClick={() => setIsInviteOpen(true)}
            variant="primary"
            icon={<UserPlus className="w-4 h-4" />}
          >
            Invite Member
          </Button>
        </div>

        {/* TEAM TABLE */}
        <div className="bg-[#FFFFFF] border border-[#E7E3EC] p-6 space-y-6 rounded-lg shadow-subtle">
          <div className="flex justify-between items-center border-b border-[#E7E3EC] pb-4">
            <h3 className="text-base font-bold text-[#17151C]">Members ({members.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#E7E3EC] font-mono uppercase text-[#96919F] text-[10px] tracking-widest">
                <tr>
                  <th className="pb-3">Member</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Last Active</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E3EC]">
                {members.map(member => (
                  <tr key={member.id} className="hover:bg-[#FAF9FC]">
                    <td className="py-4 text-xs text-[#17151C] font-semibold flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#17151C] text-[#FAF9FC] rounded-full flex items-center justify-center font-bold text-xs">
                        {member.fullName.charAt(0).toUpperCase()}
                      </div>
                      {member.fullName}
                    </td>
                    <td className="py-4 text-[#696572] font-mono">{member.email}</td>
                    <td className="py-4">
                      <select
                        value={member.role}
                        onChange={e => handleChangeRole(member.id, e.target.value as UserRole)}
                        className="bg-[#FAF9FC] border border-[#E7E3EC] text-xs text-[#17151C] px-2.5 py-1 focus:outline-none focus:border-[#A78BFA] font-mono uppercase tracking-wider rounded"
                      >
                        <option value="user">User</option>
                        <option value="client_admin">Client Admin</option>
                      </select>
                    </td>
                    <td className="py-4">
                      {member.status === 'active' ? (
                        <span className="px-2.5 py-0.5 text-[10px] bg-[#FAF9FC] text-[#17151C] border border-[#E7E3EC] font-mono uppercase tracking-wider font-semibold rounded">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-[10px] bg-rose-50 text-rose-700 border border-rose-200 font-mono uppercase tracking-wider font-semibold rounded">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-[#96919F] font-mono text-[11px]">{member.lastActive}</td>
                    <td className="py-4 text-right">
                      <Button
                        variant="danger"
                        size="icon"
                        onClick={() => handleRemoveMember(member.id)}
                        title="Remove member"
                        aria-label="Remove member"
                        className="w-7 h-7 p-0 ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* INVITE MODAL */}
        {isInviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
            <div className="bg-[#FFFFFF] border border-[#E7E3EC] rounded-lg max-w-md w-full p-6 space-y-4 shadow-editorial text-[#17151C]">
              <div className="border-b border-[#E7E3EC] pb-3">
                <h3 className="text-base font-bold">Invite Member</h3>
              </div>

              <form onSubmit={handleInvite} className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-semibold text-[#17151C] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="teammate@company.com"
                    className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md focus:border-[#A78BFA] px-3 py-2 text-xs text-[#17151C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17151C] mb-1">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={e => setInviteRole(e.target.value as UserRole)}
                    className="w-full bg-[#FAF9FC] border border-[#E7E3EC] rounded-md focus:border-[#A78BFA] px-3 py-2 text-xs text-[#17151C] focus:outline-none font-mono"
                  >
                    <option value="user">User</option>
                    <option value="client_admin">Client Admin</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" type="button" onClick={() => setIsInviteOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Send Invite
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

