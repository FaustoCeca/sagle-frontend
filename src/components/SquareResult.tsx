interface SquareResultProps {
  title: string | string[];
  showArrow: boolean;
  higher?: boolean;
  lower?: boolean;
  state?: "correct" | "incorrect" | "partial";
}

const SquareResult = ({title, showArrow, state, higher, lower}: SquareResultProps) => {
  return (
    <div
      className={`border border-gray-300 text-white p-1 flex items-center justify-center mb-2 min-w-[90px] max-w-[110px] min-h-[80px]
          ${state === "correct" ? "bg-green-500" : state === "partial" ? "bg-yellow-500" : "bg-red-500"}
        `}
    >
      <span
        className="text-center text-base font-semibold"
      >
        {title}
      </span>
      {
        showArrow && (
          <span
            className={`ml-2`}
          >
            {
              higher && "↑" 
            }
            {
              lower && "↓"
            }
          </span>
        )
      }
    </div>
  )
}

export default SquareResult;