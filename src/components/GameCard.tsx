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

    console.log('game', votePercentage);

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isVoting || hasVotedToday}
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
            // ${isVoting ? 'opacity-80 cursor-not-allowed' : ''}
            //    ${isVoting || isSagleFetching || !isSagleFetched ? 'opacity-80 cursor-not-allowed' : ''}
            className={`relative w-full cursor-pointer h-full rounded-lg shadow-lg 
                flex items-end justify-center p-4 pb-8 text-white 
                transition-transform duration-300
                ${hasVotedToday ? '' : 'hover:scale-105'}
                ${isVoting ? 'opacity-80 cursor-not-allowed ring-2 ring-blue-500 ring-opacity-75' : ''}
                       `}
        >
            <div
                className={`absolute inset-0 bg-black opacity-50 rounded-lg transition-opacity duration-300`}
                aria-hidden="true"
            />
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
                {
                    votePercentage > 0 &&
                    <span className={`absolute left-2 top-2 font-bold text-white text-sm
                            `}>
                        {Math.round(votePercentage)}%
                    </span>
                }
            </div>

            {isVoting && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/40 backdrop-blur-sm rounded-lg">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
                        <p className="font-bold text-lg text-white">Voting...</p>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-bold text-center z-10 pointer-events-none">{game.title}</h3>
            {
                !hasVotedToday &&
                <p className="absolute top-2 left-2 pointer-events-none">
                    {game.birthYear}
                </p>
            }

            <p className="absolute bottom-2 left-2 text-white z-20">
                {game.votes} votes
            </p>
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