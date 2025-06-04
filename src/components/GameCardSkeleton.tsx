import React from 'react';

interface GameCardSkeletonProps {
  count?: number;
}

const GameCardSkeleton: React.FC<GameCardSkeletonProps> = ({ count = 1 }) => {
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
          className="relative w-full rounded-lg shadow-lg 
                   flex items-end justify-center p-4 pb-8
                   bg-gradient-to-r from-gray-300 to-gray-200 animate-pulse"
        >
          {/* Title skeleton */}
          <div className="z-10 w-3/4 h-6 rounded bg-white/30 animate-pulse"></div>
          
          {/* Birth year skeleton */}
          <div className="absolute top-2 left-2 w-16 h-5 rounded bg-white/30 animate-pulse"></div>
          
          {/* Steam link skeleton */}
          <div className="absolute top-2 right-2 w-14 h-5 rounded bg-white/30 animate-pulse"></div>
        </div>
      ))}
    </>
  );
};

export default GameCardSkeleton;