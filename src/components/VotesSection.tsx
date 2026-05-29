import { useMutation } from "@tanstack/react-query";
import { voteGame } from "../actions/voteGame";
import GameCard from "./GameCard";
import { useGetUser } from "../hooks/useGetUser";
import LoadingSpinner from "./LoadingSpinners";
import GameCardSkeleton from "./GameCardSkeleton";
import { useGetSagle } from "../hooks/useGetSagle";
import { useTranslation } from "react-i18next";

const VotesSection = () => {
    const { sagle, fetchSagleAgain, isFetching } = useGetSagle();
    const { user, fetchUserAgain } = useGetUser();
    const { mutateAsync: vote, isPending: isVoting } = useMutation({
        mutationFn: voteGame,
        onSuccess: () => {
            fetchSagleAgain();
            fetchUserAgain();
        }
    });
    const {t} = useTranslation('votes');


    // Copy before sorting — sort() mutates in place, and sagle.games is cached query data.
    const sortedGames = sagle?.games ? [...sagle.games].sort((a, b) => a.id - b.id) : [];

    const votesArr = sagle?.games.map(game => game.votes) || [];
    const totalVotes = votesArr.reduce((acc, votes) => acc + votes, 0);

    const handleVote = async (gameId: number) => {
        // BUG-16: guard against missing user and use the real in-flight state
        // (isVoting) instead of a ref that was never set.
        if (user?.hasVotedToday || isVoting) {
            console.warn('Vote already cast or in process, ignoring vote attempt.');
            return;
        }

        try {
            await vote(gameId);
        } catch (error) {
            console.error('Error handling vote:', error);
            fetchSagleAgain();
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-dvh w-full "
            style={{
                display: user?.hasParticipatedToday ? 'flex' : 'none',
            }}
        >
            <h2
                className="font-heading uppercase tracking-wide text-3xl font-bold text-center mb-4 lg:px-0 px-5 text-neon-green text-glow-pink"
                aria-label="congrats-sagle"
            >
                {t("congrats")} {
                    sagle ?
                        <span>
                            <a
                                href={`${sagle?.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neon-cyan text-glow-cyan underline decoration-neon-cyan/40 underline-offset-4 hover:decoration-neon-cyan transition"
                                aria-label="sagle-link"
                            >
                                {sagle.title}
                            </a>
                        </span> : <span className="inline-flex items-center text-neon-cyan">
                            {t("loading")}
                            <LoadingSpinner size="small" className="ml-2" />
                        </span>}
            </h2>
            <p
                className="text-lg text-center mb-6 lg:px-0 px-5 text-arcade-muted"
                aria-label="vote-instructions"
            >
                {t("congratsDescription")}
            </p>
            <div
                className="flex items-center justify-center w-full max-w-3xl"
            >
                {
                    sagle ?
                        <div
                            className="mt-6 w-full grid-votes px-8 lg:px-0 gap-4"
                        >
                            {
                                sortedGames.map((game) => (
                                    <GameCard
                                        key={game.id}
                                        game={game}
                                        aria-label={`game-card-${game.id}`}
                                        onVote={handleVote}
                                        isVoting={isVoting}
                                        isSagleFetching={isFetching}
                                        // isSagleFetched={isFetched}
                                        hasVotedToday={user?.hasVotedToday}
                                        totalVotes={totalVotes}
                                    />
                                ))
                            }
                        </div> :
                        <div className="mt-6 w-full grid-votes items-center" aria-label="loading-games">
                            <GameCardSkeleton count={3} />
                        </div>
                }
            </div>
        </div>
    )
}

export default VotesSection;