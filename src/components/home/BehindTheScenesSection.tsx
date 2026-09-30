import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { behindTheScenesItems } from '../../data/siteContent';
import { SectionHeading } from '../common/SectionHeading';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';

export const BehindTheScenesSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-[var(--border-line)]">
      <SectionHeading
        label="Process & Craft"
        title="Behind the Lens"
        subtitle="Quiet dedication to equipment precision, natural lighting mastery, and meticulous fine-art post-production."
      />

      {/* BTS Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {behindTheScenesItems.map((item) => (
          <div key={item.id} className="group">
            <ImageWithSkeleton
              src={item.src}
              alt={item.title}
              aspectRatio="square"
              containerClassName="w-full"
              hoverScale={true}
            />
            <div className="mt-3">
              <span className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-main)]">
                {item.title}
              </span>
              <span className="block text-xs text-[var(--text-muted)] font-normal mt-0.5">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Studio Video Showcase */}
      <div className="relative overflow-hidden bg-black text-white p-8 sm:p-14">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C5A880]">
            Studio Reel &bull; 4K Cinematic
          </span>
          <h3 className="text-3xl sm:text-4xl font-editorial font-normal leading-tight">
            Capturing the pulse of Accra and the serenity of coastal light.
          </h3>
          <p className="text-sm text-[#D4D4D4] font-normal leading-relaxed">
            A 60-second visual meditation on our documentary rhythm, on-location intimacy, and the moments that happen between the frames.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-white text-[#0D0D0D] px-6 py-3 font-semibold hover:bg-[#EAE8E2] transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-[#0D0D0D]" />}
              <span>{isPlaying ? 'Pause Film' : 'Play Showreel'}</span>
            </button>

            {isPlaying && (
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                aria-label="Toggle Sound"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            )}
          </div>
        </div>

        {/* Video simulation with atmospheric poster */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
            alt="Studio reel background"
            className="w-full h-full object-cover filter brightness-75"
          />
        </div>
      </div>
    </section>
  );
};
