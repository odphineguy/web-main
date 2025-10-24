"use client";
export default function ReceiptScanner() {
  return (
    <div className="relative w-64 h-96 rounded-xl border border-gray-300 shadow-lg overflow-hidden bg-white mx-auto">
      {/* Receipt background */}
      <div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: "url('/images/portfolio/receipt.png')" }}
      />

      {/* Scanner box frame */}
      <div className="absolute inset-4 rounded-lg border border-gray-300/80 bg-transparent shadow-inner overflow-hidden">
        {/* Thicker corner accents */}
        <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-4 border-t-4 border-gray-400/90 rounded-tl" />
        <span className="pointer-events-none absolute right-0 top-0 h-7 w-7 border-r-4 border-t-4 border-gray-400/90 rounded-tr" />
        <span className="pointer-events-none absolute left-0 bottom-0 h-7 w-7 border-l-4 border-b-4 border-gray-400/90 rounded-bl" />
        <span className="pointer-events-none absolute right-0 bottom-0 h-7 w-7 border-r-4 border-b-4 border-gray-400/90 rounded-br" />

        {/* Glowing scan line inside the frame */}
        <div
          className="absolute top-[-20%] left-0 w-full h-12 animate-scan 
                       bg-gradient-to-b from-green-400/0 via-green-400/50 to-green-400/0
                       shadow-[0_0_20px_5px_rgba(34,197,94,0.5)]"
        />
      </div>
    </div>
  );
}


