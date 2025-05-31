import type { Saga } from "../types/game";

export const categoriesLogic = (sagle: Saga, saga: Saga) => {
    if (!sagle) return "incorrect";

    const sagleCategories = sagle.categories.map(c => c.name);
    const triedCategories = saga.categories.map(c => c.name);

    const hasAllCategories = sagleCategories.every(category =>
        triedCategories.includes(category)
    );

    const hasAtLeastOneCategory = sagleCategories.some(category =>
        triedCategories.includes(category)
    );

    if (hasAllCategories && sagleCategories.length === triedCategories.length) {
        return "correct";
    } else if (hasAtLeastOneCategory) {
        return "partial";
    }
    return "incorrect";
}

export const gamesLogic = (sagle: Saga, saga: Saga) => {
    if (!sagle) return "incorrect";

    const sagleGames = sagle.games.length;
    const triedGames = saga.games.length;

    if (sagleGames === triedGames) {
        return "correct";
    } else if (sagleGames > triedGames) {
        return "incorrect";
    }
}

export const firstGameLogic = (sagle: Saga, saga: Saga) => {
    if (!sagle) return "incorrect";

    const sagleFirstGame = sagle.games[0].birthYear;
    const triedFirstGame = saga.games[0].birthYear;

    if (sagleFirstGame === triedFirstGame) {
        return "correct";
    } else if (sagleFirstGame > triedFirstGame) {
        return "incorrect";
    }
}

export const lastGameLogic = (sagle: Saga, saga: Saga) => {
    if (!sagle) return "incorrect";

    const sagleLastGame = sagle.games[sagle.games.length - 1].birthYear;
    const triedLastGame = saga.games[saga.games.length - 1].birthYear;

    if (sagleLastGame === triedLastGame) {
        return "correct";
    } else if (sagleLastGame < triedLastGame) {
        return "incorrect";
    }
}

export const perspectivesLogic = (sagle: Saga, saga: Saga) => {
    if (!sagle) return "incorrect";

    const saglePerspectives = sagle.perspectives.map(p => p.id);
    const triedPerspectives = saga.perspectives.map(p => p.id);

    const hasAllPerspectives = saglePerspectives.every(perspective =>
        triedPerspectives.includes(perspective)
    );

    const hasAtLeastOnePerspective = saglePerspectives.some(perspective =>
        triedPerspectives.includes(perspective)
    );

    if (hasAllPerspectives && saglePerspectives.length === triedPerspectives.length) {
        return "correct";
    } else if (hasAtLeastOnePerspective) {
        return "partial";
    }

    return "incorrect";
}

export const artStylesLogic = (sagle: Saga, saga: Saga) => {
    if (!sagle) return "incorrect";

    const sagleArtStyles = sagle.artStyles.map(a => a.id);
    const triedArtStyles = saga.artStyles.map(a => a.id);

    const hasAllArtStyles = sagleArtStyles.every(artStyle =>
        triedArtStyles.includes(artStyle)
    );

    const hasAtLeastOneArtStyle = sagleArtStyles.some(artStyle =>
        triedArtStyles.includes(artStyle)
    );

    if (hasAllArtStyles && sagleArtStyles.length === triedArtStyles.length) {
        return "correct";
    } else if (hasAtLeastOneArtStyle) {
        return "partial";
    }

    return "incorrect";
}

export const multiplayerLogic = (sagle: Saga, saga: Saga) => {
    if (!sagle) return "incorrect";

    const sagleMultiplayer = sagle.hasMultiplayer;
    const triedMultiplayer = saga.hasMultiplayer;

    if (sagleMultiplayer === triedMultiplayer) {
        return "correct";
    } else if (sagleMultiplayer && !triedMultiplayer) {
        return "incorrect";
    } else {
        return "incorrect";
    }
}