import type { Saga } from "../../types/game";
import { Sagas } from "../mocks"

export const getSagle = async (): Promise<Saga> => {
    const sagle = Sagas.find((s) => s.isTheSagle);

    if (!sagle) {
        throw new Error("Sagle not found");
    }

    return Promise.resolve(sagle);
}