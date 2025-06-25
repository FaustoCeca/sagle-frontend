import useCreateModal from "../hooks/useCreateModal";
import { ArtStyleForm, CategoryForm, GameForm, PerspectiveForm, SagaForm } from "./CreateForms";



const CreateModalContent = () => {
    const formType = useCreateModal(state => state.formType);
    const setFormType = useCreateModal(state => state.setFormType);
    return (
        <>
            <h2>
                Crea un nuevo: {formType}
            </h2>

            <select
                onChange={(e) => setFormType(e.target.value as "saga" | "game" | "category" | "perspective" | "artStyle")}
                value={formType}
                className="mb-4 p-2 border border-gray-300 rounded"
            >
                <option value="saga">
                    Saga
                </option>
                <option value="game">
                    Game
                </option>
                <option value="category">
                    Category
                </option>
                <option value="perspective">
                    Perspective
                </option>
                <option value="artStyle">
                    Art Style
                </option>
            </select>
            {
                formType === "saga" && <SagaForm />
            }
            {
                formType === "game" && <GameForm />
            }
            {
                formType === "category" && <CategoryForm />
            }
            {
                formType === "perspective" && <PerspectiveForm />
            }
            {
                formType === "artStyle" && <ArtStyleForm />
            }
        </>
    )
}

export default CreateModalContent;