import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "./bindings.server";

const orderSchema = z.object({
  name: z.string().trim().min(2).max(120),
  contact: z.string().trim().min(5).max(200),
  city: z.string().trim().min(2).max(120),
  note: z.string().trim().max(800).optional().default(""),
});

export const submitOrder = createServerFn({ method: "POST" })
  .validator(orderSchema)
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) {
      throw new Error("Сервис заказов временно недоступен");
    }

    const id = crypto.randomUUID();
    await DB.prepare(
      `INSERT INTO slow_burn_orders (id, name, contact, city, note, created_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`,
    )
      .bind(id, data.name, data.contact, data.city, data.note)
      .run();

    return { ok: true, id };
  });
