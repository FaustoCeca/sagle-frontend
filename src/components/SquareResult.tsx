interface SquareResultProps {
  title: string | string[];
  showArrow: boolean;
  higher?: boolean;
  lower?: boolean;
  state?: "correct" | "incorrect" | "partial";
}

const STATE_STYLES: Record<NonNullable<SquareResultProps["state"]>, string> = {
  correct: "bg-neon-green/15 border-neon-green/70 text-neon-green glow-green",
  partial: "bg-neon-yellow/15 border-neon-yellow/70 text-neon-yellow glow-yellow",
  incorrect: "bg-neon-red/12 border-neon-red/60 text-neon-red glow-red",
};

const SquareResult = ({ title, showArrow, state, higher, lower }: SquareResultProps) => {
  const stateStyle = STATE_STYLES[state ?? "incorrect"];

  return (
    <div
      className={`relative rounded-lg border-2 backdrop-blur-sm p-1.5 flex items-center justify-center mb-2 gap-1 min-w-[110px] max-w-[120px] min-h-[110px] ${stateStyle}`}
    >
      <span className="text-center text-sm font-semibold leading-tight tracking-wide drop-shadow-[0_0_6px_currentColor]">
        {title}
      </span>
      {showArrow && (
        <span className="text-lg font-bold leading-none drop-shadow-[0_0_8px_currentColor]" aria-hidden="true">
          {higher && "↑"}
          {lower && "↓"}
        </span>
      )}
    </div>
  );
};

export default SquareResult;
