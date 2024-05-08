import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  plan: defineTable({
    storageId: v.union(v.id("_storage"), v.null()),
    nameoftheplace: v.string(),
    userPrompt: v.string(),
    abouttheplace: v.string(),
    adventuresactivitiestodo: v.array(v.string()),
    topplacestovisit: v.array(v.object({
      name: v.string(),
      coordinates: v.object({
        lat: v.float64(),
        lng: v.float64()
      })
    })),
    packingchecklist: v.array(v.string()),
    localcuisinerecommendations: v.array(v.string()),
    userId: v.string(),
    besttimetovisit: v.string(),
    itinerary: v.array(v.object({
      title: v.string(),
      activities: v.object({
        morning: v.array(v.object({
          itineraryItem: v.string(),
          briefDescription: v.string()
        })),
        afternoon: v.array(v.object({
          itineraryItem: v.string(),
          briefDescription: v.string()
        })),
        evening: v.array(v.object({
          itineraryItem: v.string(),
          briefDescription: v.string()
        })),
      })
    })
    )
  }),
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    credits: v.number(),
    freeCredits: v.number(),
  }).index("by_clerk_id", ["userId"])
    .index("by_email", ["email"]),
  payments: defineTable({
    userId: v.string(),
    stripeId: v.string(),
    status: v.string()
  }).index("by_stripe_id", ["stripeId"]),
  expenses: defineTable({
    planId: v.string(),
    userId: v.string(),
    amount: v.number(),
    purpose: v.string(),
    category: v.union(v.literal('food'),
      v.literal('commute'),
      v.literal('shopping'),
      v.literal('gifts'),
      v.literal('accomodations'),
      v.literal('others'),
    ),
    date: v.string()
  }).index("by_planId", ["planId"]),
  invites: defineTable({
    planId: v.id("plan"),
    email: v.string(),
    token: v.string()
  }).index("by_planId_email", ["planId", "email"])
    .index("by_token", ["token"])
    .index("by_planId", ["planId"]),
  access: defineTable({
    planId: v.id("plan"),
    userId: v.string(),
    email: v.string()
  }).index("by_planId", ["planId"])
    .index("by_userId", ["userId"])
    .index("by_planId_userId", ["planId", "userId"]),
});
