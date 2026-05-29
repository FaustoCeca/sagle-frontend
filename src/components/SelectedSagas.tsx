import { useGetAttempts } from "../hooks/useGetAttempts";
import TableSagaItem from "./TableSagaItem";
import LoadingSpinner from "./LoadingSpinners";
import type { Saga } from "../types/game";
import { useTranslation } from "react-i18next";

interface SelectedSagasProps {
    sagle: Saga | null;
}

const SelectedSagas = ({ sagle }: SelectedSagasProps) => {
    const { attempts } = useGetAttempts();
    const { t } = useTranslation('game');

    if (!sagle) return <LoadingSpinner className="mt-4" size="large" />;
    return (
        <>
            <div
                className="flex flex-col items-center justify-center mt-6 lg:w-auto w-full mb-12 animate-rise"
            >
                <div
                    className="w-full max-w-[95vw] overflow-x-auto hide-scrollbar glass border border-neon-pink/30 glow-pink rounded-2xl p-4 lg:p-6"
                >
                    <div className="flex flex-nowrap gap-6 lg:gap-10 min-w-max">

                        <TableSagaItem
                            title="Saga"
                            ariaLabel="selected-sagas"
                            showImage={true}
                            attempts={attempts}
                        />

                        <TableSagaItem
                            title={t("categories")}
                            ariaLabel="saga-categories"
                            attempts={attempts}
                            getField={(attempt) => attempt.categories}
                        />

                        <TableSagaItem
                            title={t("games")}
                            ariaLabel="saga-games"
                            attempts={attempts}
                            getField={(attempt) => attempt.games}
                        />

                        <TableSagaItem
                            title={t("firstGame")}
                            ariaLabel="saga-first-game"
                            attempts={attempts}
                            getField={(attempt) => attempt.firstGame}
                        />

                        <TableSagaItem
                            title={t("lastGame")}
                            ariaLabel="saga-last-game"
                            attempts={attempts}
                            getField={(attempt) => attempt.lastGame}
                        />

                        <TableSagaItem
                            title={t("perspectives")}
                            ariaLabel="saga-perspectives"
                            attempts={attempts}
                            getField={(attempt) => attempt.perspectives}
                        />

                        <TableSagaItem
                            title={t("artStyles")}
                            ariaLabel="saga-art-style"
                            attempts={attempts}
                            getField={(attempt) => attempt.artStyles}
                        />

                        <TableSagaItem
                            title={t("multiplayer")}
                            ariaLabel="saga-multiplayer"
                            attempts={attempts}
                            getField={(attempt) => attempt.multiplayer}
                        />
                    </div>
                </div>
            </div>
            <p
                className="text-center mt-3 lg:hidden block text-xs uppercase tracking-widest text-arcade-muted animate-pulse"
            >
                ← {t("scrollHorizontally")} →
            </p>
        </>

    )
}

export default SelectedSagas;
