/* =========================================================
   SPORTS JOURNAL — SUPABASE
========================================================= */

const SUPABASE_URL =
  "https://jcpzuqkijttfruxwovvg.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_eCoFlQRFrPw_HtN2-95ZIQ_ai5VQDua";


window.sportsJournalDb =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );