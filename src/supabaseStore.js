// Saves participant answers and Mark's assessments to Supabase (shared,
// across all devices). Per-device bits (theme, current login) stay in the
// browser. Same four methods the app already expects.
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const local = {
  get: (k) => { try { return localStorage.getItem("mw:" + k); } catch (e) { return null; } },
  set: (k, v) => { try { localStorage.setItem("mw:" + k, v); } catch (e) {} },
  del: (k) => { try { localStorage.removeItem("mw:" + k); } catch (e) {} },
};

export const store = {
  async get(key, shared = false) {
    if (!shared) return local.get(key);
    const { data } = await supabase.from("kv").select("value").eq("k", key).maybeSingle();
    return data ? data.value : null;
  },
  async set(key, value, shared = false) {
    if (!shared) { local.set(key, value); return; }
    await supabase.from("kv").upsert({ k: key, value, updated_at: new Date().toISOString() });
  },
  async list(prefix, shared = false) {
    if (!shared) return [];
    const { data } = await supabase.from("kv").select("k").like("k", prefix + "%");
    return data ? data.map((r) => r.k) : [];
  },
  async del(key, shared = false) {
    if (!shared) { local.del(key); return; }
    await supabase.from("kv").delete().eq("k", key);
  },
};
