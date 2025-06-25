import { useGetArtStyles } from "../../hooks/useGetArtStyles";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useGetPerspectives } from "../../hooks/useGetPerspectives";
import useHowToPlayModal from "../../hooks/useHowToPlayModal";
import BaseModal from "./BaseModal";

const HowToPlayModal = () => {
    const closeModal = useHowToPlayModal(state => state.closeModal);
    const { categories } = useGetCategories();
    const { perspectives } = useGetPerspectives();
    const { artStyles } = useGetArtStyles();

    return (
        <BaseModal
            onClose={closeModal}
        >
            <div className="flex flex-col">
                <h2 className="text-4xl font-bold mb-4">How to Play</h2>
                <p className="text-lg mb-4">
                    Guess today's saga between the most famous sagas in videogame industry! It changes every 24h.
                </p>
                <p className="text-lg mb-4">
                    When you type the name of a saga, you will see a list of suggestions. Click on the one you think is correct. And this will reveal its properties. The color of the square will indicate if you are correct, incorrect or partial:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li className="text-lg">Green: Correct saga</li>
                    <li className="text-lg">Red: Incorrect saga</li>
                    <li className="text-lg">Yellow: Partial match (some properties match)</li>
                </ul>
                <h3
                    className="text-2xl font-bold mb-4"
                >
                    Properties
                </h3>
                <p
                    className="text-lg mb-4"
                >
                    Here are the properties you can see:
                </p>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        Categories: the categories of the saga, what it is about.
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            Posible values:
                        </span>
                        {" "}
                        <i>

                            {
                                categories.map((category) => category.name).join(", ")
                            }
                        </i>
                    </p>
                </div>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        Games: the games that are part of the saga.
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            Posible values:
                        </span>
                        <span>
                            {" "}<i>Starting from 2 to infinity number of games. (We only a accept principal games and spin-offs that feels like a these ones, not DLCs or 4-6 hours spin-offs)</i>
                        </span>
                    </p>
                </div>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        First Game in: the year of the first game in the saga.
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            Posible values:
                        </span>
                        <span>
                            {" "}<i>Any year from 1950 to the current year</i>
                        </span>
                    </p>
                </div>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        Perspectives: the perspectives of the saga, how it is played.
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            Posible values:
                        </span>
                        <span>
                            {" "}
                            <i>
                                {
                                    perspectives.map((perspective) => perspective.name).join(", ")
                                }
                            </i>
                        </span>
                    </p>
                </div>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        Art styles: the art styles of the saga, how it looks.
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            Posible values:
                        </span>
                        {" "}
                        <i>
                            {
                                artStyles.map((artStyle) => artStyle.name).join(", ")
                            }
                        </i>
                    </p>
                </div>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        Multiplayer: if the saga has multiplayer or not.
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            Posible values:
                        </span>
                        <span>
                            {" "}<i>Yes, no or some (
                                if some games have multiplayer and some don't, it will be "some"
                                )</i>
                        </span>
                        <span>
                            {" "}
                            <i>
                                (We only accept multiplayer if it is online and pvp or pve mode, not if it is just a leaderboard or a co-op mode in a single player game)
                            </i>
                        </span>
                    </p>
                </div>
            </div>
        </BaseModal>
    )
}

export default HowToPlayModal;