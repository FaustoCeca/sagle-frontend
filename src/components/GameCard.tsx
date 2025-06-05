import type { Game } from "../types/game";

interface GameCardProps {
    game: Game;
    onVote: (gameId: number) => Promise<void>;
    isVoting: boolean;
    isSagleFetching?: boolean;
    hasVotedToday?: boolean;
    totalVotes: number;
}

const GameCard = ({
    game,
    onVote,
    isVoting,
    isSagleFetching = false,
    hasVotedToday = false,
    totalVotes = 0
}: GameCardProps) => {
    const handleClick = async () => {
        try {
            await onVote(game.id);
        } catch (error) {
            console.error("Error voting for game:", error);
        }
    }

    const votePercentage = totalVotes > 0 ? (game.votes / totalVotes) * 100 : 0;

    console.log('isVoting', isVoting);
    console.log('isSagleFetching', isSagleFetching);

    return (
        <button
            type="button"
            onClick={handleClick}
            // disabled={isVoting || hasVotedToday}
            aria-label={`game-card-${game.id}`}
            style={{
                backgroundImage: `url(${game.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                aspectRatio: '16/9',
                minHeight: '300px',
            }}
            // TODO: trabajar en animacion
            className={`relative w-full cursor-pointer h-full rounded-lg shadow-lg 
                       flex items-end justify-center p-4 pb-8 text-white 
                        transition-transform duration-300
                       ${isVoting || isSagleFetching ? 'opacity-80 cursor-not-allowed' : ''}
                    ${hasVotedToday ? '' : 'hover:scale-105'}
                       `}
        >
            <div
                className={`absolute inset-0 bg-black hover:opacity-60 opacity-30 rounded-lg transition-opacity duration-300
                    ${hasVotedToday && 'opacity-60'}
                    `}
                aria-hidden="true"
            />
            {hasVotedToday && votePercentage > 0 && (
                <div
                    className="absolute inset-y-0 right-0 w-full bg-white/10 backdrop-blur-sm transition-all duration-1000 ease-out"
                    style={{
                        height: `${votePercentage}%`,
                        bottom: 0,
                        top: 'auto'
                    }}
                    role="progressbar"
                    aria-valuenow={votePercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                    {/* Porcentaje de votos */}
                    <span className="absolute top-2 right-2 font-bold text-white text-sm">
                        {Math.round(votePercentage)}%
                    </span>
                </div>
            )}

            <h3 className="text-xl font-bold text-center z-10 pointer-events-none">{game.title}</h3>
            {
                !hasVotedToday &&
                <p className="absolute top-2 left-2 pointer-events-none">
                    {game.birthYear}
                </p>
            }
            {hasVotedToday && (
                <p className="absolute bottom-2 left-2 text-white z-20">
                    {game.votes} votes
                </p>
            )}
            {game.steamLink && (
                <a
                    href={game.steamLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 text-sm text-blue-400 hover:underline"
                >
                    Steam
                </a>
            )}
        </button>
    )
}

export default GameCard;