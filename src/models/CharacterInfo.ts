import { z } from "zod";

export const characterSchema = z.object({
    charactersName: z.string().min(1, "Name is required"),
    playersName: z.string().min(1, "Name is required"),
    class: z.string().min(1, "Invalid class"),
    race: z.string().min(1, "Invalid race"),
    alignment: z.string().min(1, "Invalid alignment"),
    background: z.string().min(1, "Invalid background"),
});

export type CharacterInfo = z.infer<typeof characterSchema>;
