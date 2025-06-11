import { useMutation } from "@tanstack/react-query";
import { voteGame } from "../actions/voteGame";
import GameCard from "./GameCard";
import { useMemo, useRef } from "react";
import { useGetUser } from "../hooks/useGetUser";
import LoadingSpinner from "./LoadingSpinners";
import GameCardSkeleton from "./GameCardSkeleton";
import { useGetSagle } from "../hooks/useGetSagle";

const VotesSection = () => {
    const { sagle, fetchSagleAgain, isFetching } = useGetSagle();
    const { user, fetchUserAgain } = useGetUser();
    const isProcessingVote = useRef(false);
    const { mutateAsync: vote, isPending: isVoting } = useMutation({
        mutationFn: voteGame,
        onSuccess: () => {
            fetchSagleAgain();
            fetchUserAgain();
        }
    });


    const sortedGames = useMemo(() => {
        // Add safety check to ensure sagle and sagle.games exist
        if (!sagle || !sagle.games) return [];
        return [...sagle.games].sort((a, b) => a.id - b.id);
    }, [sagle?.games]);
    // Notice the [...sagle.games] - this creates a copy of the array before sorting, which is a good practice since sort() mutates the original array.

    const votesArr = sagle?.games.map(game => game.votes) || [];
    const totalVotes = votesArr.reduce((acc, votes) => acc + votes, 0);

    const handleVote = async (gameId: number) => {
        if (user?.hasVotedToday || isProcessingVote.current) {
            console.warn('Vote already cast or in process, ignoring vote attempt.');
            return;
        }


        try {
            // Optimistically update the UI
            // if (sagle && !isProcessingVote.current && !isVoting) {
            //     const optimisticData = {
            //         ...sagle,
            //         games: sagle.games.map(game =>
            //             game.id === gameId
            //                 ? { ...game, votes: game.votes + 1 }
            //                 : game
            //         )
            //     };

            //     // Update the cache immediately for a responsive feel
            //     queryClient.setQueryData(['sagle'], optimisticData);
            // }

            // Then perform the actual API call
            await vote(gameId);
        } catch (error) {
            console.error('Error handling vote:', error);
            // On error, refetch to get the correct data
            fetchSagleAgain();
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-dvh w-full py-8 mt-10"
            style={{
                visibility: user?.hasParticipatedToday ? 'visible' : 'hidden',
            }}

        >
            <h2
                className="text-2xl font-bold text-center mb-4 lg:px-0 px-5 text-white"
                aria-label="congrats-sagle"
            >
                Congrats! You guessed the Sagle of the day: {
                    sagle ?
                        <span>
                            <a
                                href={`${sagle?.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                                aria-label="sagle-link"
                            >
                                {sagle.title}
                            </a>
                        </span> : <span className="inline-flex items-center text-blue-500 hover:text-blue-700">
                            Loading Sagle...
                            <LoadingSpinner size="small" className="ml-2" />
                        </span>}
            </h2>
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