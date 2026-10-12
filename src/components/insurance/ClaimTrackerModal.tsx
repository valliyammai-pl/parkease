import React from 'react';
import { InsuranceClaim } from '../../types';
import { Modal } from '../common/Modal';
import { CheckCircle2, Clock, FileText, AlertCircle, Shield } from 'lucide-react';

interface ClaimTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: InsuranceClaim | null;
}

export const ClaimTrackerModal: React.FC<ClaimTrackerModalProps> = ({
  isOpen,
  onClose,
  claim,
}) => {
  if (!claim) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Claim Tracker: #${claim.claimReference}`}
      description={`Policy ${claim.policyNumber} • ${claim.vehicleReg}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Status Highlight Banner */}
        <div className="p-4 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              Current Claim Status
            </span>
            <p className="text-base font-black text-[var(--color-primary)] mt-0.5">
              {claim.status}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-[var(--color-text-muted)]">
              Estimated Claim Value
            </span>
            <p className="text-base font-black text-[var(--color-text)] mt-0.5">
              ₹{claim.estimatedDamage}
            </p>
          </div>
        </div>

        {/* Timeline Progression Tracker */}
        <div>
          <h4 className="text-xs font-bold text-[var(--color-text)] mb-3">
            Claim Audit Timeline
          </h4>
          <div className="space-y-3">
            {claim.timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    step.done
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                  }`}
                >
                  {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[var(--color-text)]">{step.step}</p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">{step.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Incident Summary */}
        <div className="p-4 rounded-xl border border-[var(--color-border)] space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Incident Date:</span>
            <span className="font-semibold text-[var(--color-text)]">{claim.incidentDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">Incident Nature:</span>
            <span className="font-semibold text-[var(--color-text)]">{claim.incidentType}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)] block mb-1">Damage Description:</span>
            <p className="p-2.5 rounded-lg bg-[var(--color-background)] text-[var(--color-text)]">
              {claim.description}
            </p>
          </div>
        </div>

        {/* Uploaded Documents List */}
        <div>
          <h4 className="text-xs font-bold text-[var(--color-text)] mb-2">
            Uploaded Evidence Documents ({claim.documentNames.length})
          </h4>
          <div className="space-y-1.5">
            {claim.documentNames.map((name, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)]"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span className="truncate">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
