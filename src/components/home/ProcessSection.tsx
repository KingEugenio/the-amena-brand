import React, { useState } from 'react';
import { processSteps } from '../../data/siteContent';
import { SectionHeading } from '../common/SectionHeading';
import { Check } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = processSteps[activeStepIndex];

  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-[var(--border-line)]">
      <SectionHeading
        label="My Approach"
        title="Understand. Create. Refine. Deliver."
        subtitle="Every project starts with understanding the idea behind the work. I take time to understand your message, audience, and objectives before translating them into visuals. I believe good creative work should not only look good—it should communicate, connect, and serve a purpose."
      />

      {/* Step Numbers Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[var(--border-line)] mb-12">
        {processSteps.map((step, idx) => {
          const isActive = activeStepIndex === idx;
          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStepIndex(idx)}
              className={`text-left py-4 px-2 sm:px-4 border-b-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-[var(--text-main)] text-[var(--text-main)] font-semibold'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <span className="block text-xs font-mono tracking-widest">{step.number}</span>
              <span className="block text-xs sm:text-sm font-editorial uppercase tracking-wider mt-1 truncate">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Content Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[var(--card-bg)] border border-[var(--border-line)] p-8 sm:p-14">
        <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-[var(--border-line)] pb-8 lg:pb-0 lg:pr-8">
          <span className="text-4xl sm:text-6xl font-editorial font-light text-[var(--primary-accent)]">
            {currentStep.number}
          </span>
          <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)]">
            {currentStep.title}
          </h3>
          <p className="text-xs uppercase tracking-widest font-mono text-[var(--text-muted)]">
            {currentStep.subtitle}
          </p>
        </div>

        <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
          <p className="text-base sm:text-lg text-[var(--text-main)] font-normal leading-relaxed">
            {currentStep.description}
          </p>

          <div className="space-y-3 pt-4">
            <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-mono block">
              Key Milestones in this Phase:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStep.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)] font-normal">
                  <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
