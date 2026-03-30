'use client';

import { useState } from 'react';
import type { Capsule } from '@/lib/api';
import { archiveCapsule, unarchiveCapsule, deleteCapsule, resendCapsuleDelivery, trackEvent } from '@/lib/api';

interface Props {
  initialCapsules: Capsule[];
  userId: string;
  messages: {
    archive: string;
    unarchive: string;
    delete: string;
    resend: string;
    resendSuccess: string;
    resendDuplicate: string;
    statusArchived: string;
    deliveryFailed: string;
    deliveryAttempts: string;
    showArchived: string;
    hideArchived: string;
  };
}

export default function CapsuleList({ initialCapsules, userId, messages }: Props) {
  const [capsules, setCapsules] = useState<Capsule[]>(initialCapsules);
  const [showArchived, setShowArchived] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const flash = (id: string, msg: string) => {
    setFeedback((f) => ({ ...f, [id]: msg }));
    setTimeout(() => setFeedback((f) => { const n = { ...f }; delete n[id]; return n; }), 3000);
  };

  const handleArchive = async (id: string) => {
    const updated = await archiveCapsule(id, userId);
    setCapsules((cs) => cs.map((c) => (c._id === id ? updated : c)));
    trackEvent('capsule.archived', { userId, capsuleId: id });
  };

  const handleUnarchive = async (id: string) => {
    const updated = await unarchiveCapsule(id, userId);
    setCapsules((cs) => cs.map((c) => (c._id === id ? updated : c)));
    trackEvent('capsule.unarchived', { userId, capsuleId: id });
  };

  const handleDelete = async (id: string) => {
    await deleteCapsule(id, userId);
    setCapsules((cs) => cs.filter((c) => c._id !== id));
    trackEvent('capsule.deleted', { userId, capsuleId: id });
  };

  const handleResend = async (id: string) => {
    const { alreadySent } = await resendCapsuleDelivery(id, userId);
    flash(id, alreadySent ? messages.resendDuplicate : messages.resendSuccess);
    if (!alreadySent) trackEvent('delivery.resent', { userId, capsuleId: id });
  };

  const visible = showArchived ? capsules : capsules.filter((c) => c.status !== 'ARCHIVED');

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setShowArchived((v) => !v)}
        className="text-sm text-slate-500 underline"
      >
        {showArchived ? messages.hideArchived : messages.showArchived}
      </button>

      {visible.map((capsule) => (
        <div
          key={capsule._id}
          className="rounded-lg border border-slate-200 bg-white p-4 space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-900">{capsule.title}</span>
            <span className="text-xs text-slate-400">{capsule.status}</span>
          </div>

          {capsule.lastDeliveryError && (
            <p className="text-xs text-red-600">
              {messages.deliveryFailed}: {capsule.lastDeliveryError}
              {' '}({messages.deliveryAttempts}: {capsule.deliveryAttempts})
            </p>
          )}

          {feedback[capsule._id] && (
            <p className="text-xs text-green-600">{feedback[capsule._id]}</p>
          )}

          <div className="flex gap-2 flex-wrap">
            {capsule.status === 'ARCHIVED' ? (
              <button
                type="button"
                onClick={() => handleUnarchive(capsule._id)}
                className="text-xs rounded bg-slate-100 px-2 py-1 hover:bg-slate-200"
              >
                {messages.unarchive}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleArchive(capsule._id)}
                className="text-xs rounded bg-slate-100 px-2 py-1 hover:bg-slate-200"
              >
                {messages.archive}
              </button>
            )}

            <button
              type="button"
              onClick={() => handleDelete(capsule._id)}
              className="text-xs rounded bg-red-50 px-2 py-1 text-red-600 hover:bg-red-100"
            >
              {messages.delete}
            </button>

            {(capsule.status === 'SEALED' || capsule.status === 'UNLOCKED') && (
              <button
                type="button"
                onClick={() => handleResend(capsule._id)}
                className="text-xs rounded bg-blue-50 px-2 py-1 text-blue-600 hover:bg-blue-100"
              >
                {messages.resend}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
