interface GameCardSkeletonProps {
  count?: number;
}

const GameCardSkeleton = ({ count = 1 }: GameCardSkeletonProps) => {
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          aria-label="loading-game-card"
          style={{
            aspectRatio: '16/9',
            minHeight: '300px',
          }}
          className="relative w-full rounded-xl border border-neon-cyan/20
                   flex items-end justify-center p-4 pb-8
                   bg-gradient-to-br from-arcade-bg to-[#11122a] animate-pulse"
        >
          {/* Title skeleton */}
          <div className="z-10 w-3/4 h-6 rounded bg-neon-cyan/10 animate-pulse"></div>

          {/* Birth year skeleton */}
          <div className="absolute top-2 left-2 w-16 h-5 rounded bg-neon-cyan/10 animate-pulse"></div>

          {/* Steam link skeleton */}
          <div className="absolute top-2 right-2 w-14 h-5 rounded bg-neon-cyan/10 animate-pulse"></div>
        </div>
      ))}
    </>
  );
};

export default GameCardSkeleton;