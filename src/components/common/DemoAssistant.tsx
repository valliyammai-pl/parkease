import React, { useState } from 'react';
import { MessageSquare, X, Search, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { mockAssistantFaqs } from '../../data/mockAssistant';
import { Link } from 'react-router-dom';

export const DemoAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFaqId, setActiveFaqId] = useState<string | null>(mockAssistantFaqs[0].id);

  const categories = ['All', 'Parking', 'FASTag', 'Insurance', 'EV Charging', 'Services'];

  const filteredFaqs = mockAssistantFaqs.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeFaq = mockAssistantFaqs.find((item) => item.id === activeFaqId);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--color-primary)] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
        aria-label="Open ParkEase Assistant"
        aria-expanded={isOpen}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-accent)]" />
        </span>
        <MessageSquare className="w-4 h-4" />
        <span className="text-xs font-bold tracking-wide">ParkEase Guide</span>
      </button>

      {/* Assistant Modal / Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="ParkEase Assistant"
          className="fixed bottom-22 left-4 sm:left-6 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[580px] z-50 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">ParkEase Guide</h4>
                <p className="text-[11px] text-white/80">Interactive platform FAQ & walkthrough</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-[var(--color-border)] bg-[var(--color-surface-hover)]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Ask about slots, FASTag, claims, EV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar pb-0.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-all ${
                    selectedCategory === cat
                      ? 'bg-[var(--color-primary)] text-white shadow-xs'
                      : 'bg-black/5 text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Body: Question List & Active Answer */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8 text-xs text-[var(--color-text-muted)]">
                <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No matching questions found. Try searching &quot;parking&quot;, &quot;FASTag&quot;, or &quot;claims&quot;.
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isSelected = activeFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl border transition-all ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-accent-subtle)]/30'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaqId(isSelected ? null : faq.id)}
                      className="w-full text-left p-3 flex items-start justify-between gap-2"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-1.5 py-0.5 rounded">
                          {faq.category}
                        </span>
                        <p className="text-xs font-semibold text-[var(--color-text)] mt-1.5">
                          {faq.question}
                        </p>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-[var(--color-text-muted)] shrink-0 transition-transform ${
                          isSelected ? 'rotate-90 text-[var(--color-primary)]' : ''
                        }`}
                      />
                    </button>

                    {isSelected && (
                      <div className="px-3 pb-3 pt-1 text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)]/50 space-y-2.5">
                        <p className="leading-relaxed">{faq.answer}</p>
                        {faq.relatedLink && (
                          <Link
                            to={faq.relatedLink}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 font-bold text-[var(--color-primary)] hover:underline"
                          >
                            <span>Open {faq.category} Page</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2.5 bg-[var(--color-surface-hover)] border-t border-[var(--color-border)] text-center text-[10px] text-[var(--color-text-muted)]">
            Built-in demo assistant • Offline questions logic
          </div>
        </div>
      )}
    </>
  );
};
