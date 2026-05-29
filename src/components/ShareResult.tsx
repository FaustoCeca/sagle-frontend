import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGetAttempts } from "../hooks/useGetAttempts";
import { useGetUser } from "../hooks/useGetUser";
import { buildShareText } from "../utils/buildShareResult";

const SITE_URL = "https://thesagle.com";

/** Copies text to the clipboard, falling back to a hidden textarea on browsers
 * without the async Clipboard API (or in non-secure contexts). */
const copyToClipboard = async (text: string): Promise<void> => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch {
    /* fall through to the legacy path */
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
};

/**
 * The growth engine of Wordle-style games: once the player solves today's
 * Sagle, let them share their emoji grid + streak. Uses the native share sheet
 * on mobile and copies to the clipboard on desktop.
 */
const ShareResult = () => {
  const { t } = useTranslation("game");
  const { attempts } = useGetAttempts();
  const { user } = useGetUser();
  const [copied, setCopied] = useState(false);

  // Only show after the player has solved today's Sagle.
  if (!user?.hasParticipatedToday || attempts.length === 0) return null;

  const guesses = attempts.length;
  const shareText = buildShareText({
    attempts,
    solvedLine: t("shareSolved", { count: guesses }),
    streak: user.streak ?? 0,
    url: SITE_URL,
  });

  const handleShare = async () => {
    // Mobile: native share sheet. Desktop / unsupported: clipboard + feedback.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch (err) {
        // User dismissed the sheet → do nothing. Any other error → clipboard.
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    await copyToClipboard(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center mt-2 mb-10 animate-rise">
      <div className="glass-strong border border-neon-green/40 glow-green rounded-2xl px-6 py-5 flex flex-col items-center gap-4 max-w-md text-center">
        <h3 className="font-heading uppercase tracking-wider text-neon-green drop-shadow-[0_0_8px_currentColor] text-lg">
          {t("shareHeading")}
        </h3>
        <button
          onClick={handleShare}
          aria-label="share-result"
          className="btn-arcade cursor-pointer flex items-center gap-2 px-7 py-3 rounded-lg"
        >
          {copied ? <Check size={20} aria-hidden="true" /> : <Share2 size={20} aria-hidden="true" />}
          <span>{copied ? t("shareCopied") : t("shareButton")}</span>
        </button>
      </div>
    </div>
  );
};

export default ShareResult;
