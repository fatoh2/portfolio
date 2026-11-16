import { ArrowUp } from "lucide-react";
import { profile, t, type Locale } from "@/content/portfolio";
import { getDictionary } from "@/content/ui";
import { TrackedAnchor } from "./tracked-link";

/** The footer both homepages use. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  return (
    <footer className="site-footer">
      <div>
        <strong>Fathallah Haj</strong>
        <span>{dictionary.home.signature}</span>
      </div>
      <div className="footer-links">
        {profile.contactLinks.slice(2).map((link) => (
          <TrackedAnchor
            key={link.href}
            href={link.href}
            target={link.kind === "social" ? "_blank" : undefined}
            rel={link.kind === "social" ? "noreferrer" : undefined}
            eventName={link.kind === "resume" ? "resume_download" : "social_click"}
            // Two fields per event on this plan: the event name already says it is the résumé.
            eventData={link.kind === "resume" ? { placement: "footer", locale } : { target: link.kind, locale }}
          >
            {t(link.label, locale)}
          </TrackedAnchor>
        ))}
        <a href="#top" className="to-top" title={dictionary.footer.top}>
          <ArrowUp aria-hidden="true" size={18} />
        </a>
      </div>
    </footer>
  );
}
