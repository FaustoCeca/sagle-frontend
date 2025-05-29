import { FormProvider, useForm } from "react-hook-form";
import { createPerspectives } from "../actions/createPerspective";
import type { CategoryDto, GameDto, PerspectiveDto, SagaDto } from "../types/dtos";
import useCreateModal from "../hooks/useCreateModal";
import { createCategory } from "../actions/createCategory";
import { createArt } from "../actions/createArt";
import { createGame } from "../actions/createGame";
import DragFiles from "./DragFiles";
import { useFile } from "../hooks/useFile";
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetPerspectives } from "../hooks/useGetPerspectives";
import { useGetArtStyles } from "../hooks/useGetArtStyles";
import { createSaga } from "../actions/createSaga";
import { useGetSagas } from "../hooks/useGetSagas";

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
    saga: any;
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
    const { handleSubmit, reset, register, watch } = methods;
    const addFile = useFile(state => state.addFile);
    const file = useFile(state => state.file);
    const removeFile = useFile(state => state.removeFile);
    const { categories, error: categoriesError, isLoading: loadingCategories } = useGetCategories();
    const { perspectives, error: perspectivesError, isLoading: loadingPerspectives } = useGetPerspectives();
    const { artStyles, error: artStylesError, isLoading: loadingArtStyles } = useGetArtStyles();

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

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Categories (Ctrl/Cmd + Click para selección múltiple)
                    </label>
                    <select
                        multiple
                        {...register("categories")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {
                            loadingCategories ? (
                                <option value="">Loading categories...</option>
                            ) : categoriesError ? (
                                <option value="">Error loading categories</option>
                            ) : (
                                categories.map((category: {
                                    id: number;
                                    name: string;
                                }) => (
                                    <option 
                                        key={category.id} 
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Perspectives (Ctrl/Cmd + Click para selección múltiple)
                    </label>
                    <select
                        multiple
                        {...register("perspectives")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {
                            loadingPerspectives ? (
                                <option value="">Loading perspectives...</option>
                            ) : perspectivesError ? (
                                <option value="">Error loading perspectives</option>
                            ) : (
                                perspectives.map((perspective: {
                                    id: number;
                                    name: string;
                                }) => (
                                    <option key={perspective.id} value={perspective.id}>
                                        {perspective.name}
                                    </option>
                                ))
                            )
                        }
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Art Styles (Ctrl/Cmd + Click para selección múltiple)
                    </label>
                    <select
                        multiple
                        {...register("artStyles")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {
                            loadingArtStyles ? (
                                <option value="">Loading art styles...</option>
                            ) : artStylesError ? (
                                <option value="">Error loading art styles</option>
                            ) : (
                                artStyles.map((artStyle: {
                                    id: number;
                                    name: string;
                                }) => (
                                    <option key={artStyle.id} value={artStyle.id}>
                                        {artStyle.name}
                                    </option>
                                ))
                            )
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Has Multiplayer
                    </label>
                    <select
                        {...register("hasMultiplayer")}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="some">Some</option>
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
            saga: null,
            steamLink: ''
        }
    });
    const addFile = useFile(state => state.addFile);
    const file = useFile(state => state.file);
    const removeFile = useFile(state => state.removeFile);
    const {sagas, error, isLoading} = useGetSagas();
    const { handleSubmit, reset } = methods;

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
            reset();
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
                        {...methods.register("saga")}
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
    const closeModal = useCreateModal(state => state.closeModal);

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
    const closeModal = useCreateModal(state => state.closeModal);

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
    const closeModal = useCreateModal(state => state.closeModal);

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