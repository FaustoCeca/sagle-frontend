import { useMutation } from "@tanstack/react-query";
import { voteGame } from "../actions/voteGame";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useSagleStore from "../hooks/useSagle";
import GameCard from "./GameCard";
import { useMemo } from "react";

const VotesSection = () => {
    const sagle = useSagleStore((state) => state.sagle);
    const user = useCurrentUser(state => state.user);
    const { mutateAsync: vote, isPending: isVoting } = useMutation({
        mutationFn: voteGame,
        // TODO: implementar
        //         onSuccess: () => {
        //     toast.success('Vote registered successfully!');
        // },
        // onError: (error) => {
        //     toast.error('Failed to register vote');
        //     console.error('Error voting:', error);
        // }
    });

    const sortedGames = useMemo(() =>
        sagle?.games.sort((a, b) => a.id - b.id) || [],
        [sagle?.games]
    );

    console.log('sagle', sagle?.games);

    const votesArr = sagle?.games.map(game => game.votes) || [];
    const totalVotes = votesArr.reduce((acc, votes) => acc + votes, 0);

    const handleVote = async (gameId: number) => {
        if (user?.hasVotedToday) {
            // toast.error('You have already voted today!');
            return;
        }

        try {
            await vote(gameId);
        } catch (error) {
            console.error('Error handling vote:', error);
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-dvh w-full py-8"
        >
            <h2
                className="text-2xl font-bold text-center mb-4"
                aria-label="congrats-sagle"
            >
                Congrats! You guessed the Sagle of the day: <span>
                    <a
                        href={`${sagle?.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="sagle-link"
                    >
                        {sagle?.title}
                    </a>
                </span>
            </h2>
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
                            hasVotedToday={user?.hasVotedToday}
                            totalVotes={totalVotes}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default VotesSection;