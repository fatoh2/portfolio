import { labels } from "@/content/home";
import { services, type Locale } from "@/content/portfolio";
import { getDictionary } from "@/content/ui";
import { answerLabelsFor, answersFor } from "@/lib/home-answers";
import { AnswerView } from "./answer-view";

const CHIP_ANSWERS = ["q-live", "q-install", "q-services"];

/**
 * Services, process and every answer the question box can give, as visible server-rendered text.
 * The box shows copies of these; without script, the chips link to them.
 */
export function Thread({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.home;
  const answers = answersFor(locale);
  const answerLabels = answerLabelsFor(locale);
  const disciplines = { product: copy.product, automation: copy.ai, reliability: copy.infrastructure };
  const view = (id: string) => {
    const answer = answers.find((candidate) => candidate.id === id)!;
    return <AnswerView key={id} answer={answer} labels={answerLabels} askedIn={locale} withId />;
  };

  return (
    <section className="thread" aria-label={labels.thread[locale]}>
      <section id="services" className="thread-block" aria-labelledby="services-title">
        <h2 id="services-title">{copy.approachTitle}</h2>
        <p className="thread-lead">{copy.approachSummary}</p>
        <div className="thread-services">
          {services.map((service) => (
            <article key={service.id}>
              <p className="thread-kicker">{disciplines[service.id]}</p>
              <h3>{service.title[locale]}</h3>
              <p>{service.summary[locale]}</p>
              <ul className="thread-tools" aria-label={disciplines[service.id]}>
                {service.signals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
              {service.id === "automation" ? (
                <ul className="thread-tools thread-channels" aria-label={labels.channels[locale]}>
                  <li>WhatsApp</li>
                  <li>Instagram</li>
                  <li>Telegram</li>
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <section id="process" className="thread-block" aria-labelledby="process-title">
        <h2 id="process-title">{copy.processTitle}</h2>
        <ol className="thread-steps">
          {dictionary.process.steps.map((step, index) => (
            <li key={step.title}>
              <span className="thread-step" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="thread-block thread-answers" aria-label={labels.ask[locale]}>
        {CHIP_ANSWERS.map(view)}
        <details className="thread-more">
          <summary>{labels.moreAnswers[locale]}</summary>
          {answers.filter((answer) => !CHIP_ANSWERS.includes(answer.id)).map((answer) => view(answer.id))}
        </details>
      </section>
    </section>
  );
}
