import type { ComponentType } from "react";
import useActionModal, { type FormType } from "../hooks/useActionModal";

interface SetFormModalProps {
    title: string;
    sagaForm?: ComponentType;
    gameForm?: ComponentType;
    categoryForm?: ComponentType;
    perspectiveForm?: ComponentType;
    artStyleForm?: ComponentType;
}

const SetFormModal = ({
    title,
    sagaForm: SagaFormComponent,
    gameForm: GameFormComponent,
    categoryForm: CategoryFormComponent,
    perspectiveForm: PerspectiveFormComponent,
    artStyleForm: ArtStyleFormComponent
}: SetFormModalProps) => {
    const formType = useActionModal(state => state.formType);
    const setFormType = useActionModal(state => state.setFormType);

    return (
        <>
            <h2>
                {title}: {formType}
            </h2>
            <select
                onChange={(e) => setFormType(e.target.value as FormType)}
                value={formType}
                className="mb-4 p-2 border border-gray-300 rounded"
            >
                {
                    SagaFormComponent &&
                    <option value="saga">Saga</option>
                }
                {
                    GameFormComponent &&
                    <option value="game">Game</option>
                }
                {
                    CategoryFormComponent &&
                    <option value="category">Category</option>
                }
                {
                    PerspectiveFormComponent &&
                    <option value="perspective">Perspective</option>
                }
                {
                    ArtStyleFormComponent &&
                    <option value="artStyle">Art Style</option>
                }
            </select>

            {
                formType === "saga" && SagaFormComponent && <SagaFormComponent />
            }
            {
                formType === "game" && GameFormComponent && <GameFormComponent />
            }
            {
                formType === "category" && CategoryFormComponent && <CategoryFormComponent />
            }
            {
                formType === "perspective" && PerspectiveFormComponent && <PerspectiveFormComponent />
            }
            {
                formType === "artStyle" && ArtStyleFormComponent && <ArtStyleFormComponent />
            }
        </>
    )
}

export default SetFormModal;