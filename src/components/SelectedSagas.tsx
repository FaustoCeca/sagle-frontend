import { useMemo } from "react";
import useSagleStore from "../hooks/useSagle";
import useTriedSagasStore from "../hooks/useTriedSagas";
import { artStylesLogic, categoriesLogic, firstGameLogic, gamesLogic, lastGameLogic, multiplayerLogic, perspectivesLogic } from "../logic/gameLogic";
import TableSagaItem from "./TableSagaItem";
import LoadingSpinner from "./LoadingSpinners";
import { getGameYear } from "../utils/getGameYear";

const SelectedSagas = () => {
    const sagle = useSagleStore((state) => state.sagle);
    const triedSagas = useTriedSagasStore((state) => state.triedSagas);
    const memoizedTriedSagas = useMemo(() => triedSagas, [triedSagas]);

    if (!sagle) return <LoadingSpinner className="mt-4" size="large" />

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
                    showImage={true}
                    getDisplayValue={(saga) => saga.title}
                    triedSagas={memoizedTriedSagas}
                />

                <TableSagaItem
                    title="Category"
                    ariaLabel="saga-categories"
                    renderLogic={(saga) => ({
                        state: categoriesLogic(sagle, saga),
                        showArrow: false
                    })}
                    getDisplayValue={(saga) => saga.categories.map(c => c.name).join(", ")}
                    triedSagas={memoizedTriedSagas}
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
                    triedSagas={memoizedTriedSagas}
                />

                <TableSagaItem
                    title="First Game in"
                    ariaLabel="saga-first-game"
                    renderLogic={(saga) => ({
                        // @ts-expect-error error esperado, espera un partial y la logica no puede devolverlo
                        state: firstGameLogic(sagle, saga),
                        showArrow: true,
                        higher: sagle && getGameYear(saga, "first") < getGameYear(sagle, "first"),
                        lower: sagle && getGameYear(saga, "first") > getGameYear(sagle, "first")
                    })}
                    getDisplayValue={(saga) => saga.games.map(g => g.birthYear).sort((a, b) => a - b)[0].toString()}
                    triedSagas={memoizedTriedSagas}
                />

                <TableSagaItem 
                    title="Last Game in"
                    ariaLabel="saga-last-game"
                    renderLogic={(saga) => ({
                        // @ts-expect-error error esperado, espera un partial y la logica no puede devolverlo
                        state: lastGameLogic(sagle, saga),
                        showArrow: true,
                        higher: sagle && getGameYear(saga, "last") < getGameYear(sagle, "last"),
                        lower: sagle && getGameYear(saga, "last") > getGameYear(sagle, "last")
                    })}
                    getDisplayValue={(saga) => saga.games.map(g => g.birthYear).sort((a, b) => a - b)[saga.games.length - 1].toString()}
                    triedSagas={memoizedTriedSagas}
                />

                <TableSagaItem
                    title="Perspectives"
                    ariaLabel="saga-perspectives"
                    renderLogic={(saga) => ({
                        state: perspectivesLogic(sagle, saga),
                        showArrow: false,
                    })}
                    getDisplayValue={(saga) => saga.perspectives.map(p => p.name).join(", ")}
                    triedSagas={memoizedTriedSagas}
                />

                <TableSagaItem
                    title="Art style"
                    ariaLabel="saga-art-style"
                    renderLogic={(saga) => ({
                        state: artStylesLogic(sagle, saga),
                        showArrow: false
                    })}
                    getDisplayValue={(saga) => saga.artStyles.map((artStyle) => artStyle.name).join(", ")}
                    triedSagas={memoizedTriedSagas}
                />

                <TableSagaItem
                    title="Multiplayer"
                    ariaLabel="saga-multiplayer"
                    renderLogic={(saga) => ({
                        state: multiplayerLogic(sagle, saga),
                        showArrow: false
                    })}
                    getDisplayValue={(saga) => saga.hasMultiplayer}
                    triedSagas={memoizedTriedSagas}
                />

            </div>
        </div>
    )
}

export default SelectedSagas;