CREATE TABLE IF NOT EXISTS slow_burn_orders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  city TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_slow_burn_orders_created_at
ON slow_burn_orders(created_at DESC);
