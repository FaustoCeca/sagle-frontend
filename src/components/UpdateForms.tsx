import { FormProvider, useForm } from "react-hook-form";
import { useGetSagas } from "../hooks/useGetSagas";
import { useState } from "react";
import { type Game, type Saga } from "../types/game";
import MultipleSelects from "./MultipleSelects";
import { useFile } from "../hooks/useFile";
import DragFiles from "./DragFiles";
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetArtStyles } from "../hooks/useGetArtStyles";
import { useGetPerspectives } from "../hooks/useGetPerspectives";
import type { SagaDto } from "../types/dtos";
import { updateGame, updateSaga } from "../actions/updaters";
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

export const SagaForm = () => {
  const { sagas } = useGetSagas();
  const [currentSaga, setCurrentSaga] = useState<Saga | null>(null);
  const addFile = useFile(state => state.addFile);
  const file = useFile(state => state.file);
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
  const { handleSubmit, reset, register, formState: { isSubmitting } } = methods;
  const { categories } = useGetCategories();
  const { perspectives } = useGetPerspectives();
  const { artStyles } = useGetArtStyles();
  const closeModal = useActionModal(state => state.closeModal);

  const onSubmit = async (data: SagaDto) => {
    const updatedSaga: SagaDto = {
      ...currentSaga,
      title: data.title,
      categories: data.categories,
      perspectives: data.perspectives,
      artStyles: data.artStyles,
      hasMultiplayer: data.hasMultiplayer,
      link: data.link,
      imageUrl: file ? null : currentSaga?.imageUrl // If a new file is uploaded, set imageUrl to null
    }

    try {
      if (!currentSaga) {
        console.error("No saga selected for update.");
        return;
      }

      await updateSaga(currentSaga.id, updatedSaga, file);
      reset();
      closeModal();
    } catch (error) {
      console.error("Error updating saga:", error);
    }
  }

  const onChangeSaga = (sagaId: number) => {
    const selectedSaga = sagas.find(saga => saga.id === sagaId);

    if (!selectedSaga) {
      console.error("Saga not found:", sagaId);
      return;
    }

    setCurrentSaga(selectedSaga);
    reset({
      title: selectedSaga.title,
      categories: selectedSaga.categories.map(category => category.id),
      perspectives: selectedSaga.perspectives.map(perspective => perspective.id),
      artStyles: selectedSaga.artStyles.map(artStyle => artStyle.id),
      imageUrl: selectedSaga.imageUrl,
      hasMultiplayer: selectedSaga.hasMultiplayer,
      link: selectedSaga.link
    });
  }

  return (
    <FormProvider {...methods} >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >

        <h2>
          Saga a actualizar
        </h2>
        <select
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={
            (e) => onChangeSaga(Number(e.target.value))
          }
          value={currentSaga ? currentSaga.id : ""}
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
        {
          currentSaga && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  {...register("title")}
                  className="mb-2 p-2 border border-gray-300 rounded"
                  defaultValue={currentSaga.title}
                  type="text"
                />
              </div>
              <MultipleSelects
                name="categories"
                label="Categorías"
                options={categories.map(category => ({
                  id: category.id,
                  name: category.name
                }))}
                loading={false}
                error={null}
                required
              />
              <MultipleSelects
                name="perspectives"
                label="Perspectivas"
                options={perspectives.map(perspective => ({
                  id: perspective.id,
                  name: perspective.name
                }))}
                loading={false}
                error={null}
                required
              />
              <MultipleSelects
                name="artStyles"
                label="Estilos de arte"
                options={artStyles.map(artStyle => ({
                  id: artStyle.id,
                  name: artStyle.name
                }))}
                loading={false}
                error={null}
                required
              />
              <div>
                <p>
                  Imagen
                </p>
                <img
                  src={currentSaga.imageUrl}
                  alt="Imagen de la saga"
                />
                <p>
                  Nueva imagen
                </p>
                <DragFiles
                  onChange={() => addFile}
                />
              </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enlace
                </label>
                <input
                  value={currentSaga.link}
                  {...register("link")}
                  className="mb-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded"
                disabled={isSubmitting}
              >
                Actualizar Saga
              </button>
            </>
          )
        }
      </form>
    </FormProvider>
  )
}

export const GameForm = () => {
  const { sagas } = useGetSagas();
  const games = sagas.flatMap(saga => saga.games);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const addFile = useFile(state => state.addFile);
  const file = useFile(state => state.file);
  const methods = useForm<GameFormProps>({
    defaultValues: {
      title: '',
      birthYear: new Date().getFullYear(),
      imageUrl: null,
      sagaId: 0,
      steamLink: ''
    }
  });
  const { handleSubmit, reset, register, formState: { isSubmitting } } = methods;
  const closeModal = useActionModal(state => state.closeModal);

  const onChangeGame = (gameId: number) => {
    const selectedGame = games.find(game => game.id === gameId);

    if (!selectedGame) {
      return;
    }

    setCurrentGame(selectedGame);
    reset({
      title: selectedGame.title,
      birthYear: selectedGame.birthYear,
      imageUrl: selectedGame.imageUrl,
      sagaId: selectedGame.sagaId,
      steamLink: selectedGame.steamLink || ''
    });
  }

  const onSubmit = async (data: GameFormProps) => {
    if (!currentGame) {
      console.error("No game selected for update.");
      return;
    }

    const updatedGame: GameFormProps = {
      ...currentGame,
      title: data.title,
      birthYear: data.birthYear,
      imageUrl: file ? null : currentGame.imageUrl, // If a new file is uploaded, set imageUrl to null
      sagaId: data.sagaId,
      steamLink: data.steamLink
    }

    try {
      await updateGame(currentGame.id, updatedGame, file);
      reset();
      closeModal(); 
    } catch (error) {
      console.error("Error updating game:", error);
    }
  }

  // console.log("Current game:", currentGame);

  return (
    <FormProvider
      {...methods}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4"
      >
        <p>
          Juego a actualizar
        </p>
        <select
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={
            (e) => onChangeGame(Number(e.target.value))
          }
          value={currentGame ? currentGame.id : ""}
        >
          <option value="" disabled>
            Selecciona un juego
          </option>
          {
            games.map((game, index) => (
              <option key={index} value={game.id}>
                {game.title} ({game.id})
              </option>
            ))
          }
        </select>
        {
          currentGame && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  {...register("title")}
                  className="mb-2 p-2 border border-gray-300 rounded"
                  defaultValue={currentGame.title}
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Año de salida
                </label>
                <input
                  {...register("birthYear", { valueAsNumber: true })}
                  className="mb-2 p-2 border border-gray-300 rounded"
                  defaultValue={currentGame.birthYear}
                  type="number"
                />
              </div>
              <div>
                <p>
                  Imagen
                </p>
                <img
                  src={currentGame.imageUrl}
                  alt="Imagen de la saga"
                />
                <p>
                  Nueva imagen
                </p>
                <DragFiles
                  onChange={() => addFile}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enlace de Steam
                </label>
                <input
                  defaultValue={currentGame.steamLink || ""}
                  {...register("steamLink")}
                  className="mb-2 p-2 border border-gray-300 rounded w-full"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                >
                  Saga a la que pertenece
                </label>
                <select
                  {...register("sagaId", {valueAsNumber: true})}
                  className="mb-2 p-2 border border-gray-300 rounded w-full"
                  defaultValue={currentGame.sagaId}
                >
                  <option 
                    key={currentGame.sagaId}
                    value={currentGame.sagaId}
                  >
                    {sagas.find(saga => saga.id === currentGame.sagaId)?.title || "Selecciona una saga"}
                  </option>
                  {
                    sagas
                    .filter(saga => saga.id !== currentGame.sagaId)
                    .map(saga => (
                      <option key={saga.id} value={saga.id}>
                        {saga.title} ({saga.id})
                      </option>
                    ))
                  }
                </select>
              </div>
            </>
          )
        }
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Actualizar Juego
        </button>
      </form>
    </FormProvider>
  )
}