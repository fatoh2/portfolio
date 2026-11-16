import type { Locale } from "@/content/portfolio";
import type { Answer, AnswerLabels } from "@/lib/home-answers";
import { TrackedAnchor } from "../tracked-link";

/**
 * One answer, with no hooks: the server renders it into the thread, and the question box renders the
 * unknown answer with the same markup. `id` is left off when the box shows a copy.
 */
export function AnswerView({
  answer,
  labels,
  askedIn,
  withId = false,
}: {
  answer: Answer;
  labels: AnswerLabels;
  askedIn: Locale;
  withId?: boolean;
}) {
  const titleId = withId ? `${answer.id}-title` : undefined;
  return (
    <article className="answer" id={withId ? answer.id : undefined} data-answer={answer.intent} aria-labelledby={titleId}>
      <h3 id={titleId} tabIndex={-1} data-answer-heading="">
        {answer.heading}
      </h3>
      <p className="answer-text">{answer.text}</p>
      {answer.items.length ? (
        <ul className="answer-items">
          {answer.items.map((item) => (
            <li key={item.slug}>
              <a href={item.href} data-sheet={item.slug}>
                <bdi>{item.title}</bdi>
                <span className="answer-item-status">{labels.statuses[item.status]}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      {answer.link || answer.whatsappHref ? (
        <p className="answer-links">
          {answer.link ? <a href={answer.link.href}>{answer.link.label}</a> : null}
          {answer.whatsappHref ? (
            <TrackedAnchor
              href={answer.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="answer-whatsapp"
              data-track="whatsapp_click"
              eventName="whatsapp_click"
              eventData={{ placement: "answer" }}
            >
              {labels.sendOnWhatsApp}
            </TrackedAnchor>
          ) : null}
        </p>
      ) : null}
      <dl className="answer-fields">
        <div>
          <dt>{labels.fields.language}</dt>
          <dd data-field="language">{labels.languages[askedIn]}</dd>
        </div>
        <div>
          <dt>{labels.fields.understood}</dt>
          <dd>{answer.heading}</dd>
        </div>
        <div>
          <dt>{labels.fields.source}</dt>
          <dd>{answer.sourceLabel}</dd>
        </div>
        <div>
          <dt>{labels.fields.takeover}</dt>
          <dd>{answer.handoff ? labels.takeover.yes : labels.takeover.no}</dd>
        </div>
      </dl>
    </article>
  );
}
