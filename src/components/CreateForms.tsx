import { FormProvider, useForm } from "react-hook-form";
import type { CategoryDto, GameDto, PerspectiveDto, SagaDto } from "../types/dtos";
import DragFiles from "./DragFiles";
import { useFile } from "../hooks/useFile";
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetPerspectives } from "../hooks/useGetPerspectives";
import { useGetArtStyles } from "../hooks/useGetArtStyles";
import { useGetSagas } from "../hooks/useGetSagas";
import MultipleSelects from "./MultipleSelects";
import type { ArtStyles, Category, Perspective } from "../types/game";
import { createArt, createCategory, createGame, createPerspectives, createSaga } from "../actions/creaters";
import useActionModal from "../hooks/useActionModal";

type SagaFormProps = {
    title: string;
    categories: number[];
    perspectives: number[];
    artStyles: number[];
    imageUrl: any;
    hasMultiplayer: string;
    link: string;
}

type GameFormProps = {
    title: string;
    birthYear: number;
    imageUrl: any;
    sagaId: number;
    steamLink?: string;
}

type CategoryFormProps = {
    name: string;
}

type PerspectiveFormProps = {
    name: string;
}

type ArtStyleFormProps = {
    name: string;
}

export const SagaForm = () => {
    const methods = useForm<SagaFormProps>({
        defaultValues: {
            title: '',
            categories: [],
            perspectives: [],
            artStyles: [],
            hasMultiplayer: 'no',
            link: ''
        }
    });
    const { handleSubmit, reset, register, formState: {isSubmitting} } = methods;
    const addFile = useFile(state => state.addFile);
    const file = useFile(state => state.file);
    const removeFile = useFile(state => state.removeFile);
    const { categories, error: categoriesError, isLoading: loadingCategories } = useGetCategories();
    const { perspectives, error: perspectivesError, isLoading: loadingPerspectives } = useGetPerspectives();
    const { artStyles, error: artStylesError, isLoading: loadingArtStyles } = useGetArtStyles();
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: SagaDto) => {
        const sagaData: SagaDto = {
            ...data,
            imageUrl: null // This will be set after file upload
        }

        if (!file) {
            console.error('No file selected');
            return;
        }

        try {
            // console.log("Submitting game data:", sagaData);
            await createSaga(sagaData, file);
            removeFile();
            reset();
            closeModal(); // Close the modal after submission
        } catch (error) {
            console.error('Error uploading game:', error);
        }
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        {...methods.register("title", { required: true })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <MultipleSelects 
                    name="categories"
                    label="Categories (Ctrl/Cmd + Click para selección múltiple)"
                    options={categories.map((category: Category) => ({
                        id: category.id,
                        name: category.name
                    }))}
                    loading={loadingCategories}
                    error={categoriesError ? "Error loading categories" : null}
                    required
                />

                <MultipleSelects 
                    name="perspectives"
                    label="Perspectives (Ctrl/Cmd + Click para selección múltiple)"
                    options={perspectives.map((perspective: Perspective) => ({
                        id: perspective.id,
                        name: perspective.name
                    }))}
                    loading={loadingPerspectives}
                    error={perspectivesError ? "Error loading perspectives" : null}
                    required
                />

                <MultipleSelects 
                    name="artStyles"
                    label="Art Styles (Ctrl/Cmd + Click para selección múltiple)"
                    options={artStyles.map((artStyle: ArtStyles) => ({
                        id: artStyle.id,
                        name: artStyle.name
                    }))}
                    loading={loadingArtStyles}
                    error={artStylesError ? "Error loading art styles" : null}
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Has Multiplayer
                    </label>
                    <select
                        {...register("hasMultiplayer")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Some">Some</option>
                    </select>
                </div>
                <DragFiles onChange={() => addFile} />
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Wiki link
                    </label>
                    <input
                        type="url"
                        {...register("link", { required: true })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={isSubmitting}
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    )
}


export const GameForm = () => {
    const methods = useForm<GameFormProps>({
        defaultValues: {
            title: '',
            birthYear: new Date().getFullYear(),
            imageUrl: null,
            sagaId: 0,
            steamLink: ''
        }
    });
    const addFile = useFile(state => state.addFile);
    const file = useFile(state => state.file);
    const removeFile = useFile(state => state.removeFile);
    const {sagas, error, isLoading} = useGetSagas();
    const { handleSubmit, reset, formState: {isSubmitting} } = methods;
    const closeModal = useActionModal(state => state.closeModal);


    const onSubmit = async (data: GameDto) => {
        const gameData: GameDto = {
            ...data,
            imageUrl: null // This will be set after file upload
        }

        if (!file) {
            console.error('No file selected');
            return;
        }

        try {
            // console.log("Submitting game data:", gameData);
            await createGame(gameData, file);
            removeFile();
            reset();
            closeModal();
        } catch (error) {
            console.error('Error uploading game:', error);
        }
    }

    console.log("Sagas:", sagas);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        {...methods.register("title", { required: true })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Birth Year
                    </label>
                    <input
                        type="number"
                        {...methods.register("birthYear", { required: true, min: 1900, max: new Date().getFullYear() })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <DragFiles onChange={() => addFile} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Saga
                    </label>
                    <select
                        {...methods.register("sagaId")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select a saga</option>
                        {
                            isLoading ? (
                                <option value="">Loading sagas...</option>
                            ) : error ? (
                                <option value="">Error loading sagas</option>
                            ) : (
                                sagas.map((saga: { id: number; title: string }) => (
                                    <option key={saga.id} value={saga.id}>
                                        {saga.title}
                                    </option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Steam Link (optional)
                    </label>
                    <input
                        type="url"
                        {...methods.register("steamLink")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={isSubmitting}
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    )
}

export const CategoryForm = () => {
    const methods = useForm<CategoryFormProps>({
        defaultValues: {
            name: ''
        }
    });
    const { handleSubmit, reset } = methods;
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: CategoryDto) => {
        await createCategory(data);
        reset(); // Reset the form after submission
        closeModal(); // Close the modal after submission
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        {...methods.register("name", { required: true })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    )
}

export const PerspectiveForm = () => {
    const methods = useForm<PerspectiveFormProps>({
        defaultValues: {
            name: ''
        }
    });
    const { handleSubmit, reset, register } = methods;
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: PerspectiveDto) => {
        await createPerspectives(data);
        reset(); // Reset the form after submission
        closeModal(); // Close the modal after submission
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    )
}

export const ArtStyleForm = () => {
    const methods = useForm<ArtStyleFormProps>({
        defaultValues: {
            name: ''
        }
    });
    const { handleSubmit, reset } = methods;
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: CategoryDto) => {
        await createArt(data);
        reset(); // Reset the form after submission
        closeModal(); // Close the modal after submission
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        {...methods.register("name", { required: true })}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </FormProvider>
    )
}