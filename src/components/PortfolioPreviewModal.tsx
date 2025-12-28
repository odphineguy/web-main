"use client";

import { useState } from "react";
import { X, Loader2, ExternalLink } from "lucide-react";

interface PortfolioPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  siteUrl: string;
}

export default function PortfolioPreviewModal({
  isOpen,
  onClose,
  projectName,
  siteUrl,
}: PortfolioPreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
        <h2 className="text-xl font-semibold text-white">{projectName}</h2>
        <div className="flex items-center gap-4">
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Open in new tab
          </a>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Close preview"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="flex-1 relative">
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              <p className="text-neutral-400">Loading preview...</p>
            </div>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
            <div className="flex flex-col items-center gap-4 text-center px-6">
              <p className="text-neutral-400">
                This site cannot be displayed in a preview.
              </p>
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Open site in new tab
              </a>
            </div>
          </div>
        )}

        <iframe
          src={siteUrl}
          className="w-full h-full border-0"
          title={`Preview of ${projectName}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </div>
    </div>
  );
}
