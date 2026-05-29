import { useGetArtStyles } from "../../hooks/useGetArtStyles";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useGetPerspectives } from "../../hooks/useGetPerspectives";
import useHowToPlayModal from "../../hooks/useHowToPlayModal";
import BaseModal from "./BaseModal";
import { useTranslation } from 'react-i18next';


const HowToPlayModal = () => {
    const {t} = useTranslation('modals');
    const closeModal = useHowToPlayModal(state => state.closeModal);
    const { categories } = useGetCategories();
    const { perspectives } = useGetPerspectives();
    const { artStyles } = useGetArtStyles();

    return (
        <BaseModal
            onClose={closeModal}
        >
            <div className="flex flex-col">
                <h2 className="font-heading uppercase tracking-wide text-3xl lg:text-4xl font-bold mb-4 text-neon-cyan text-glow-cyan">
                    {t("howModal")}
                </h2>
                <p className="text-lg mb-4">
                    {t("howModalTitle")}
                </p>
                <p className="text-lg mb-4">
                    {t("howModalDescription")}
                </p>
                <ul className="list-none pl-0 mb-4 flex flex-col gap-2">
                    <li className="text-lg flex items-center gap-3"><span className="inline-block w-4 h-4 rounded-sm bg-neon-green glow-green shrink-0" />{t("howModalCorrect")}</li>
                    <li className="text-lg flex items-center gap-3"><span className="inline-block w-4 h-4 rounded-sm bg-neon-red glow-red shrink-0" />{t("howModalIncorrect")}</li>
                    <li className="text-lg flex items-center gap-3"><span className="inline-block w-4 h-4 rounded-sm bg-neon-yellow glow-yellow shrink-0" />{t("howModalPartial")}</li>
                </ul>
                <p
                    className="text-lg mb-4 font-semibold"
                >
                    {t("howModalProperties")}
                </p>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        {t("howModalCategories")}
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            {t("howModalPossibleValues")}
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
                        {t("howModalGames")}
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            {t("howModalPossibleValues")}
                        </span>
                        <span>
                            {" "}<i>
                                {t("howModalGamesExplanation")}
                            </i>
                        </span>
                    </p>
                </div>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        {t("howModalFirstGame")}
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            {t("howModalPossibleValues")}
                        </span>
                        <span>
                            {" "}<i>{t("howModalFirstGameExplanation")}</i>
                        </span>
                    </p>
                </div>
                <div>
                    <span
                        className="text-lg font-bold text-cyan-500"
                    >
                        {t("howModalPerspective")}
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            {t("howModalPossibleValues")}
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
                        {t("howModalArtStyle")}
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            {t("howModalPossibleValues")}
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
                        {t("howModalMultiplayer")}
                    </span>
                    <p>
                        <span className="text-cyan-500">
                            {t("howModalPossibleValues")}
                        </span>
                        <span>
                            {" "}<i>{t("howModalMultiplayerExplanation")}</i>
                        </span>
                    </p>
                </div>
            </div>
        </BaseModal>
    )
}

export default HowToPlayModal;