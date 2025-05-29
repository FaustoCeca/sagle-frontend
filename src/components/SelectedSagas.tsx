import useSagleStore from "../hooks/useSagle";
import { artStylesLogic, categoriesLogic, firstGameLogic, gamesLogic, multiplayerLogic, perspectivesLogic } from "../logic/gameLogic";
import TableSagaItem from "./TableSagaItem";

const SelectedSagas = () => {
    const sagle = useSagleStore((state) => state.sagle);


    if (!sagle) return <div>Loading...</div>
    console.log("sagle", sagle);

    return (
        <div
            className="flex flex-col items-center justify-center mt-4"
        >
            <div
                className="flex w-full gap-4 items-center"
            >
                <TableSagaItem
                    title="Saga"
                    ariaLabel="selected-sagas"
                    renderLogic={(_) => ({
                        state: "correct",
                        showArrow: false
                    })}
                    getDisplayValue={(saga) => saga.title}
                />

                <TableSagaItem
                    title="Category"
                    ariaLabel="saga-categories"
                    renderLogic={(saga) => ({
                        state: categoriesLogic(sagle, saga),
                        showArrow: false
                    })}
                    getDisplayValue={(saga) => saga.categories.map(c => c.name).join(", ")}
                />

                <TableSagaItem
                    title="Games"
                    ariaLabel="saga-games"
                    renderLogic={(saga) => ({
                        // @ts-expect-error error esperado, espera un partial y la logica no puede devolverlo
                        state: gamesLogic(sagle, saga),
                        showArrow: true,
                        higher: sagle && saga.games.length < sagle.games.length,
                        lower: sagle && saga.games.length > sagle.games.length
                    })}
                    getDisplayValue={(saga) => saga.games.length.toString()}
                />

                <TableSagaItem
                    title="First Game in"
                    ariaLabel="saga-first-game"
                    renderLogic={(saga) => ({
                        // @ts-expect-error error esperado, espera un partial y la logica no puede devolverlo
                        state: firstGameLogic(sagle, saga),
                        showArrow: true,
                        higher: sagle && saga.games[0].birthYear < sagle.games[0].birthYear,
                        lower: sagle && saga.games[0].birthYear > sagle.games[0].birthYear
                    })}
                    getDisplayValue={(saga) => saga.games[0].birthYear.toString()}
                />

                <TableSagaItem
                    title="Perspectives"
                    ariaLabel="saga-perspectives"
                    renderLogic={(saga) => ({
                        state: perspectivesLogic(sagle, saga),
                        showArrow: false,
                    })}
                    getDisplayValue={(saga) => saga.perspectives.map(p => p.name).join(", ")}
                />

                <TableSagaItem
                    title="Art style"
                    ariaLabel="saga-art-style"
                    renderLogic={(saga) => ({
                        state: artStylesLogic(sagle, saga),
                        showArrow: false
                    })}
                    getDisplayValue={(saga) => saga.artStyle.map((artStyle) => artStyle.name).join(", ")}
                />

                <TableSagaItem
                    title="Multiplayer"
                    ariaLabel="saga-multiplayer"
                    renderLogic={(saga) => ({
                        state: multiplayerLogic(sagle, saga),
                        showArrow: false
                    })}
                    getDisplayValue={(saga) => saga.hasMultiplayer}
                />

            </div>
        </div>
    )
}

export default SelectedSagas;