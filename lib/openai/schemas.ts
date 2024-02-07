export const batch1Schema = {
    type: "object",
    properties: {
        nameoftheplace: {
            type: "string",
            description: "Name of the user input place or location",
        },
        abouttheplace: {
            type: "string",
            description: "about the place in atleast 50 words",
        },
        besttimetovisit: {
            type: "string",
            description: "Best time to visit",
        },

    },
    "required": [
        "nameoftheplace",
        "abouttheplace",
        "besttimetovisit"
    ],
};

export const batch2Schema = {
    type: "object",
    properties: {
        thingstodo: {
            type: "array",
            description: "Different adventure activities to do",
            items: { type: "string" },
        },
        localcuisinerecommendations: {
            type: "array",
            description: "Local Cuisine Recommendations",
            items: { type: "string" },
        },
        packingchecklist: {
            type: "array",
            description: "Packing Checklist",
            items: { type: "string" },
        },
    },
    "required": [
        "thingstodo",
        "localcuisinerecommendations",
        "packingchecklist"
    ],
};

export const batch3Schema = {
    type: "object",
    properties: {
        itinerary: {
            type: "array",
            description: "Itinerary for the specified number of days in array format",
            items: {
                type: "object",
                properties: {
                    title: { type: "string", description: "Day title" },
                    activities: {
                        type: "object",
                        properties: {
                            morning: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        itineraryItem: { type: "string", description: "About the itinerary item" },
                                        briefDescription: { type: "string", description: "Elaborate about the place suggested" }
                                    },
                                    required: ["itineraryItem", "briefDescription"],
                                },
                            },
                            afternoon: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        itineraryItem: { type: "string", description: "About the itinerary item" },
                                        briefDescription: { type: "string", description: "Elaborate about the place suggested" }
                                    },
                                    required: ["itineraryItem", "briefDescription"],
                                },
                            },
                            evening: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        itineraryItem: { type: "string", description: "About the itinerary item" },
                                        briefDescription: { type: "string", description: "Elaborate about the place suggested" }
                                    },
                                    required: ["itineraryItem", "briefDescription"],
                                },
                            },
                        },
                        required: ["morning", "afternoon", "evening"],
                    },
                },
                required: ["title", "activities"],
            },
        },
        topplacestovisit: {
            type: "array",
            description: "Top places to visit along with their coordinates, atelast top 5, can be more",
            items: {
                type: "object",
                properties: {
                    name: { type: "string", description: "Name of the place" },
                    coordinates: {
                        type: "object",
                        properties: {
                            lat: { type: "number", description: "Latitude" },
                            lng: { type: "number", description: "Longitude" },
                        },
                        required: ["lat", "lng"],
                    },
                },
                required: ["name", "coordinates"],
            },
        },
    },
    "required": [
        "itinerary",
        "topplacestovisit"
    ],
};