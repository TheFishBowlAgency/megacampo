"use client";

import { useAuth, usePreferences, useTranslation } from "@payloadcms/ui";
import { useEffect, useRef, type ReactNode } from "react";

const ADMIN_LANGUAGE_PREFERENCE_KEY = "admin-language";

/**
 * Payload stores admin UI language in a browser cookie (`payload-lng`), so it
 * is shared by whoever uses that browser — not by CMS account.
 *
 * This provider mirrors the language into per-user preferences and restores
 * it when a user logs in, so each account keeps its own admin language.
 */
export function AdminLanguagePreference({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { getPreference, setPreference } = usePreferences();
  const { i18n, switchLanguage } = useTranslation();

  const userId = user && "id" in user ? String(user.id) : null;
  const readyForUserRef = useRef<string | null>(null);
  const lastSavedLangRef = useRef<string | null>(null);

  // Restore this account's preferred language after login / user change.
  useEffect(() => {
    if (!userId) {
      readyForUserRef.current = null;
      lastSavedLangRef.current = null;
      return;
    }

    let cancelled = false;
    readyForUserRef.current = null;

    void (async () => {
      try {
        const pref = await getPreference(ADMIN_LANGUAGE_PREFERENCE_KEY);
        if (cancelled) return;

        if (
          typeof pref === "string" &&
          pref &&
          pref !== i18n.language &&
          switchLanguage
        ) {
          await switchLanguage(pref);
          if (cancelled) return;
          lastSavedLangRef.current = pref;
        } else {
          lastSavedLangRef.current =
            typeof pref === "string" && pref ? pref : i18n.language;
        }
      } catch {
        if (!cancelled) {
          lastSavedLangRef.current = i18n.language;
        }
      } finally {
        if (!cancelled) {
          readyForUserRef.current = userId;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // Only re-run when the logged-in user changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [userId]);

  // Persist intentional language changes for this account.
  useEffect(() => {
    if (!userId) return;
    if (readyForUserRef.current !== userId) return;
    if (lastSavedLangRef.current === i18n.language) return;

    lastSavedLangRef.current = i18n.language;
    void setPreference(ADMIN_LANGUAGE_PREFERENCE_KEY, i18n.language);
  }, [i18n.language, setPreference, userId]);

  return children;
}
