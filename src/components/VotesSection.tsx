import { useMutation } from "@tanstack/react-query";
import { voteGame } from "../actions/voteGame";
import GameCard from "./GameCard";
import { useMemo } from "react";
import { useGetUser } from "../hooks/useGetUser";
import LoadingSpinner from "./LoadingSpinners";
import GameCardSkeleton from "./GameCardSkeleton";
import { useGetSagle } from "../hooks/useGetSagle";

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

    const sortedGames = useMemo(() =>
        sagle?.games.sort((a, b) => a.id - b.id) || [],
        [sagle?.games]
    );

    const votesArr = sagle?.games.map(game => game.votes) || [];
    const totalVotes = votesArr.reduce((acc, votes) => acc + votes, 0);

    // console.log('sagle', sagle);
    // console.log('is Voting', isVoting);
    // console.log('is Sagle loading', isFetching);

    const handleVote = async (gameId: number) => {
        // if (user?.hasVotedToday) {
        //     // toast.error('You have already voted today!');
        //     return;
        // }

        try {
            await vote(gameId);
        } catch (error) {
            console.error('Error handling vote:', error);
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
                className="text-2xl font-bold text-center mb-4"
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
                            className="mt-6 w-full grid-votes"
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