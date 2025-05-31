import type { Saga } from "../types/game";


export const Sagas: Saga[] = [
    {
        id: 1,
        title: "The Legend of Zelda",
        isTheSagle: true,
        lastTimeBeingSagle: new Date("2023-10-01"),
        categories: [
        {
            id: 1,
            name: "Action",
            sagas: [],
        },
        {
            id: 2,
            name: "Sci-Fi",
            sagas: [],
        },
        ],
        games: [
        {
            id: 1,
            title: "The Legend of Zelda: Breath of the Wild",
            birthYear: 2007,
            imageUrl: "https://example.com",
            sagaId: 1,
            saga: {} as Saga,
            votes: 100,
            createdAt: new Date("2023-10-01"),
        },
        {
            id: 5,
            title: "The Legend of Zelda: Ocarina of Time",
            birthYear: 1998,
            imageUrl: "https://example.com",
            sagaId: 1,
            saga: {} as Saga,
            votes: 300,
            createdAt: new Date("2023-10-01"),
        },
        ],
        perspectives: [
        {
            id: 2,
            name: "Third person",
            sagas: [],
        },
        ],
        link: "wikipedia.org/wiki/The_Legend_of_Zelda",
        createdAt: new Date("2023-10-01"),
        artStyle: [
        {
            id: 1,
            name: "Cartoon",
            sagas: [],
        },
        ],
        hasMultiplayer: "No",
    },
    {
        id: 2,
        title: "Final Fantasy",
        isTheSagle: false,
        lastTimeBeingSagle: new Date("2025-05-17"),
        categories: [
        {
            id: 3,
            name: "RPG",
            sagas: [],
        },
        {
            id: 2,
            name: "Adventure",
            sagas: [],
        },
        ],
        games: [
        {
            id: 2,
            title: "Final Fantasy VII",
            birthYear: 1997,
            imageUrl: "https://example.com",
            sagaId: 2,
            saga: {} as Saga,
            votes: 200,
            createdAt: new Date("2023-09-15"),
        },
        {
            id: 6,
            title: "Final Fantasy X",
            birthYear: 2001,
            imageUrl: "https://example.com",
            sagaId: 2,
            saga: {} as Saga,
            votes: 180,
            createdAt: new Date("2023-09-15"),
        },
        ],
        perspectives: [
        {
            id: 1,
            name: "Third Person",
            sagas: [],
        },
        {
            id: 3,
            name: "Top down",
            sagas: [],
        },
        ],
        link: "wikipedia.org/wiki/Final_Fantasy",
        createdAt: new Date("2023-09-15"),
        artStyle: [
        {
            id: 2,
            name: "Anime",
            sagas: [],
        },
        ],
        hasMultiplayer: "some",
    },
    {
        id: 3,
        title: "Halo",
        isTheSagle: false,
        lastTimeBeingSagle: new Date("2023-08-20"),
        categories: [
        {
            id: 4,
            name: "Shooter",
            sagas: [],
        },
        {
            id: 1,
            name: "Action",
            sagas: [],
        },
        ],
        games: [
        {
            id: 3,
            title: "Halo: Combat Evolved",
            birthYear: 2001,
            imageUrl: "https://example.com",
            sagaId: 3,
            saga: {} as Saga,
            votes: 150,
            createdAt: new Date("2023-08-20"),
        },
        {
            id: 7,
            title: "Halo 3",
            birthYear: 2007,
            imageUrl: "https://example.com",
            sagaId: 3,
            saga: {} as Saga,
            votes: 220,
            createdAt: new Date("2023-08-20"),
        },
        ],
        perspectives: [
        {
            id: 1,
            name: "First person",
            sagas: [],
        },
        ],
        artStyle: [
        {
            id: 3,
            name: "Realistic",
            sagas: [],
        },
        ],
        hasMultiplayer: "yes",
        link: "wikipedia.org/wiki/Halo_(franchise)",
        createdAt: new Date("2023-08-20"),
    },
    {
        id: 4,
        title: "Call of Duty",
        isTheSagle: false,
        categories: [
        {
            id: 4,
            name: "Shooter",
            sagas: [],
        },
        ],
        lastTimeBeingSagle: new Date("2023-07-10"),
        games: [
        {
            id: 4,
            title: "Call of Duty: Modern Warfare",
            birthYear: 2019,
            imageUrl: "https://example.com",
            sagaId: 4,
            saga: {} as Saga,
            votes: 250,
            createdAt: new Date("2023-07-10"),
        },
        {
            id: 8,
            title: "Call of Duty: Warzone",
            birthYear: 2020,
            imageUrl: "https://example.com",
            sagaId: 4,
            saga: {} as Saga,
            votes: 350,
            createdAt: new Date("2023-07-10"),
        },
        ],
        perspectives: [
        {
            id: 1,
            name: "First person",
            sagas: [],
        },
        ],
        link: "wikipedia.org/wiki/Call_of_Duty",
        createdAt: new Date("2023-07-10"),
        artStyle: [
        {
            id: 3,
            name: "Realistic",
            sagas: [],
        },
        ],
        hasMultiplayer: "yes",
    },
    {
        id: 5,
        title: "Mass Effect",
        isTheSagle: false,
        lastTimeBeingSagle: new Date("2023-06-01"),
        categories: [
        {
            id: 3,
            name: "RPG",
            sagas: [],
        },
        {
            id: 1,
            name: "Shooter",
            sagas: [],
        },
        ],
        games: [
        {
            id: 9,
            title: "Mass Effect 2",
            birthYear: 2010,
            imageUrl: "https://example.com",
            sagaId: 5,
            saga: {} as Saga,
            votes: 400,
            createdAt: new Date("2023-06-01"),
        },
        {
            id: 10,
            title: "Mass Effect 3",
            birthYear: 2012,
            imageUrl: "https://example.com",
            sagaId: 5,
            saga: {} as Saga,
            votes: 500,
            createdAt: new Date("2023-06-01"),
        },
        ],
        perspectives: [
        {
            id: 2,
            name: "Third person",
            sagas: [],
        },
        ],
        link: "wikipedia.org/wiki/Mass_Effect",
        createdAt: new Date("2023-06-01"),
        artStyle: [
        {
            id: 3,
            name: "Realistic",
            sagas: [],
        },
        ],
        hasMultiplayer: "some",
    }
]

export const Perspectives = [
    {
        id: 1,
        name: "First person",
        sagas: [],
    },
    {
        id: 2,
        name: "Third person",
        sagas: [],
    },
    {
        id: 3,
        name: "Top down",
        sagas: [],
    },
    {
        id: 4,
        name: "Side scroller",
        sagas: [],
    }
]

export const Categories = [
    {
        id: 1,
        name: "Action",
        sagas: [],
    },
    {
        id: 2,
        name: "Adventure",
        sagas: [],
    },
    {
        id: 3,
        name: "RPG",
        sagas: [],
    },
    {
        id: 4,
        name: "Shooter",
        sagas: [],
    },
]

export const Games = [
    {
        id: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        birthYear: 2017,
        imageUrl: "https://example.com",
        sagaId: 1,
        saga: Sagas[0],
        votes: 100,
        createdAt: new Date("2023-10-01"),
    },
    {
        id: 2,
        title: "Final Fantasy VII",
        birthYear: 1997,
        imageUrl: "https://example.com",
        sagaId: 2,
        saga: Sagas[1],
        votes: 200,
        createdAt: new Date("2023-09-15"),
    },
    {
        id: 3,
        title: "Halo: Combat Evolved",
        birthYear: 2001,
        imageUrl: "https://example.com",
        sagaId: 3,
        saga: Sagas[2],
        votes: 150,
        createdAt: new Date("2023-08-20"),
    },
    {
        id: 4,
        title: "Call of Duty: Modern Warfare",
        birthYear: 2019,
        imageUrl: "https://example.com",
        sagaId: 4,
        saga: Sagas[3],
        votes: 250,
        createdAt: new Date("2023-07-10"),
    },
    {
        id: 5,
        title: "The Legend of Zelda: Ocarina of Time",
        birthYear: 1998,
        imageUrl: "https://example.com",
        sagaId: 1,
        saga: Sagas[0],
        votes: 300,
        createdAt: new Date("2023-10-01"),
    },
    {
        id: 6,
        title: "Final Fantasy X",
        birthYear: 2001,
        imageUrl: "https://example.com",
        sagaId: 2,
        saga: Sagas[1],
        votes: 180,
        createdAt: new Date("2023-09-15"),
    },
    {
        id: 7,
        title: "Halo 3",
        birthYear: 2007,
        imageUrl: "https://example.com",
        sagaId: 3,
        saga: Sagas[2],
        votes: 220,
        createdAt: new Date("2023-08-20"),
    },
    {
        id: 8,
        title: "Call of Duty: Warzone",
        birthYear: 2020,
        imageUrl: "https://example.com",
        sagaId: 4,
        saga: Sagas[3],
        votes: 350,
        createdAt: new Date("2023-07-10"),
    },
]
