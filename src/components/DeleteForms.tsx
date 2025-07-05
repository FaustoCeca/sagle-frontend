import { useGetSagas } from '../hooks/useGetSagas';
import { FormProvider, useForm } from 'react-hook-form';
import { deleteArtStyle, deleteCategory, deleteGame, deletePerspective, deleteSaga } from '../actions/deleters';
import { useGetCategories } from '../hooks/useGetCategories';
import { useGetPerspectives } from '../hooks/useGetPerspectives';
import { useGetArtStyles } from '../hooks/useGetArtStyles';
import useActionModal from '../hooks/useActionModal';

type DeleteProps = {
    id: number;
}

export const SagaForm = () => {
    const { sagas } = useGetSagas();
    const methods = useForm<DeleteProps>();
    const { handleSubmit, register, reset, formState: { isSubmitting } } = methods;
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: DeleteProps) => {
        if (!data.id) {
            console.error("No saga ID provided for deletion");
            return;
        }

        try {
            await deleteSaga(data.id);
            reset();
            closeModal();
        } catch (error) {
            console.error("Error deleting saga:", error);
        }
    }

    return (
        <FormProvider {...methods}>
            <form>
                <h2 className="text-2xl font-bold mb-4">Delete Saga</h2>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">Saga a eliminar</label>
                    <select
                        className="mb-4 p-2 border border-gray-300 rounded"
                        {...register("id", { required: true, valueAsNumber: true })}
                        id="id"
                    >
                        <option value="" disabled>
                            Selecciona una saga
                        </option>
                        {
                            sagas.map(saga => (
                                <option key={saga.id} value={saga.id}>
                                    {saga.title} ({saga.id})
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    Delete Saga
                </button>
            </form>
        </FormProvider>
    )
}

export const GameForm = () => {
    const { sagas } = useGetSagas();
    const games = sagas.flatMap(saga => saga.games);
    const methods = useForm<DeleteProps>();
    const { handleSubmit, register, reset, formState: { isSubmitting } } = methods;
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: DeleteProps) => {
        if (!data.id) {
            console.error("No game ID provided for deletion");
            return;
        }

        try {
            await deleteGame(data.id);
            reset();
            closeModal();
        } catch (error) {
            console.error("Error deleting game:", error);
        }
    }

    return (
        <FormProvider {...methods}>
            <form>
                <h2 className="text-2xl font-bold mb-4">Delete Saga</h2>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">Saga a eliminar</label>
                    <select
                        className="mb-4 p-2 border border-gray-300 rounded"
                        {...register("id", { required: true, valueAsNumber: true })}
                        id="id"
                    >
                        <option value="" disabled>
                            Selecciona un juego
                        </option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id}>
                                    {game.title} ({game.id})
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    Delete Game
                </button>
            </form>
        </FormProvider>
    )
}

export const CategoryForm = () => {
    const { categories } = useGetCategories();
    const methods = useForm<DeleteProps>();
    const { handleSubmit, register, reset, formState: { isSubmitting } } = methods;
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: DeleteProps) => {
        if (!data.id) {
            console.error("No category ID provided for deletion");
            return;
        }

        try {
            await deleteCategory(data.id);
            reset();
            closeModal();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    return (
        <FormProvider {...methods}>
            <form>
                <h2 className="text-2xl font-bold mb-4">Delete Category</h2>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">Category a eliminar</label>
                    <select
                        className="mb-4 p-2 border border-gray-300 rounded"
                        {...register("id", { required: true, valueAsNumber: true })}
                        id="id"
                    >
                        <option value="" disabled>
                            Selecciona una categoria
                        </option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name} ({category.id})
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    Delete Category
                </button>
            </form>
        </FormProvider>
    )
}

export const PerspectiveForm = () => {
    const { perspectives } = useGetPerspectives();
    const methods = useForm<DeleteProps>();
    const { handleSubmit, register, reset, formState: { isSubmitting } } = methods;
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: DeleteProps) => {
        if (!data.id) {
            console.error("No perspective ID provided for deletion");
            return;
        }

        try {
            await deletePerspective(data.id);
            reset();
            closeModal();
        } catch (error) {
            console.error("Error deleting perspective:", error);
        }
    }

    return (
        <FormProvider {...methods}>
            <form>
                <h2 className="text-2xl font-bold mb-4">Delete Perspective</h2>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">Perspective a eliminar</label>
                    <select
                        className="mb-4 p-2 border border-gray-300 rounded"
                        {...register("id", { required: true, valueAsNumber: true })}
                        id="id"
                    >
                        <option value="" disabled>
                            Selecciona una perspectiva
                        </option>
                        {
                            perspectives.map(perspective => (
                                <option key={perspective.id} value={perspective.id}>
                                    {perspective.name} ({perspective.id})
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    Delete Perspective
                </button>
            </form>
        </FormProvider>
    )
}

export const ArtStylesForm = () => {
    const { artStyles } = useGetArtStyles();
    const methods = useForm<DeleteProps>();
    const { handleSubmit, register, reset, formState: { isSubmitting } } = methods;
    const closeModal = useActionModal(state => state.closeModal);

    const onSubmit = async (data: DeleteProps) => {
        if (!data.id) {
            console.error("No art style ID provided for deletion");
            return;
        }

        try {
            await deleteArtStyle(data.id);
            reset();
            closeModal();
        } catch (error) {
            console.error("Error deleting art style:", error);
        }
    }

    return (
        <FormProvider {...methods}>
            <form>
                <h2 className="text-2xl font-bold mb-4">Delete Art Style</h2>
                <div className="mb-4">
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">Art Style a eliminar</label>
                    <select
                        className="mb-4 p-2 border border-gray-300 rounded"
                        {...register("id", { required: true, valueAsNumber: true })}
                        id="id"
                    >
                        <option value="" disabled>
                            Selecciona un estilo de arte
                        </option>
                        {
                            artStyles.map(artStyle => (
                                <option key={artStyle.id} value={artStyle.id}>
                                    {artStyle.name} ({artStyle.id})
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    Delete Art Style
                </button>
            </form>
        </FormProvider>
    )
}
