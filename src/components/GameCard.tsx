import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation('votes');

    const handleClick = async () => {
        try {
            await onVote(game.id);
        } catch (error) {
            console.error("Error voting for game:", error);
        }
    }

    const votePercentage = totalVotes > 0 ? (game.votes / totalVotes) * 100 : 0;

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
            className={`group relative w-full cursor-pointer h-full rounded-xl overflow-hidden border border-neon-cyan/30
                flex items-end justify-center p-4 pb-8 text-white
                transition-all duration-300
                ${hasVotedToday ? '' : 'hover:scale-[1.03] hover:border-neon-cyan/80 hover:glow-cyan'}
                ${isVoting ? 'opacity-80 cursor-not-allowed border-neon-cyan glow-cyan' : ''}
                       `}
        >
            <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-t from-black/85 via-black/40 to-black/30 transition-opacity duration-300`}
                aria-hidden="true"
            />
            <div
                className="absolute rounded-xl inset-y-0 right-0 w-full bg-neon-cyan/20 backdrop-blur-sm transition-all duration-1000 ease-out"
                style={{
                    height: `${votePercentage}%`,
                    bottom: 0,
                    top: 'auto',
                }}
                role="progressbar"
                aria-valuenow={votePercentage}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                {/* Porcentaje de votos */}
                {
                    votePercentage > 0 &&
                    <span className="absolute left-2 top-2 font-display text-[10px] text-neon-cyan text-glow-cyan">
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

            <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-center z-10 pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">{game.title}</h3>
            {
                !hasVotedToday &&
                <p className="absolute top-2 left-2 font-display text-[10px] text-arcade-muted pointer-events-none">
                    {game.birthYear}
                </p>
            }

            <p className="absolute bottom-2 left-2 font-display text-[9px] text-neon-cyan z-20">
                {t('votes', { count: game.votes })}
            </p>
            {game.steamLink && (
                <a
                    href={game.steamLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 right-2 text-xs font-semibold text-neon-cyan hover:text-glow-cyan transition z-20"
                >
                    Steam
                </a>
            )}
        </button>
    )
}

export default GameCard;