import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleCallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function ScheduleCallButton({ className, ...props }: ScheduleCallButtonProps) {
  return (
    <button
      className={cn(
        "group flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full pl-6 pr-1.5 py-1.5 transition-all duration-300 shadow-lg hover:shadow-orange-500/25",
        className
      )}
      {...props}
    >
      <span className="text-sm font-bold tracking-widest uppercase">SCHEDULE A CALL</span>
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black transition-transform duration-300 group-hover:translate-x-1">
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </div>
    </button>
  );
}
