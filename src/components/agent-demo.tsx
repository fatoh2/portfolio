"use client";

import { RotateCcw, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/content/portfolio";
import { reply, type DemoHandoff, type DemoIntent, type DemoReply } from "@/lib/agent-demo";

export type AgentDemoCopy = {
  title: string;
  intro: string;
  placeholder: string;
  send: string;
  reset: string;
  note: string;
  prompts: readonly string[];
  you: string;
  agent: string;
  why: string;
  source: string;
  handoff: string;
  intents: Record<DemoIntent, string>;
  handoffs: Record<DemoHandoff, string>;
};

type Message =
  | { id: number; role: "customer"; text: string }
  | { id: number; role: "agent"; text: string; meta: DemoReply };

export function AgentDemo({ locale, copy }: { locale: Locale; copy: AgentDemoCopy }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const counter = useRef(0);

  useEffect(() => {
    const thread = threadRef.current;
    if (thread) thread.scrollTop = thread.scrollHeight;
  }, [messages, thinking]);

  function send(text: string) {
    const value = text.trim();
    if (!value || thinking) return;
    const id = ++counter.current;
    setMessages((current) => [...current, { id, role: "customer", text: value }]);
    setDraft("");
    setThinking(true);
    window.setTimeout(() => {
      const meta = reply(value, locale);
      setMessages((current) => [...current, { id: ++counter.current, role: "agent", text: meta.text, meta }]);
      setThinking(false);
    }, 650);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    send(draft);
  }

  return (
    <div className="agent-demo" data-agent-demo>
      <div className="agent-demo-phone">
        <div className="agent-demo-head">
          <span className="agent-demo-avatar" aria-hidden="true">ن</span>
          <div>
            <strong>{copy.agent}</strong>
            <small>local-rules · demo catalog</small>
          </div>
          <button type="button" className="agent-demo-reset" onClick={() => setMessages([])} aria-label={copy.reset}>
            <RotateCcw aria-hidden="true" size={16} />
          </button>
        </div>
        <div className="agent-demo-thread" ref={threadRef} aria-live="polite">
          {messages.length === 0 ? (
            <div className="agent-demo-prompts">
              {copy.prompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => send(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}
          {messages.map((message) =>
            message.role === "customer" ? (
              <div key={message.id} className="agent-demo-bubble customer" dir="auto">
                <span className="sr-only">{copy.you}: </span>
                {message.text}
              </div>
            ) : (
              <div key={message.id} className="agent-demo-turn">
                <div className="agent-demo-bubble agent" dir="auto">
                  <span className="sr-only">{copy.agent}: </span>
                  {message.text}
                </div>
                <ul className="agent-demo-why" aria-label={copy.why}>
                  <li>{copy.intents[message.meta.intent]}</li>
                  {message.meta.source ? (
                    <li className="is-source">
                      {copy.source}: {message.meta.source.label[locale]}
                    </li>
                  ) : null}
                  {message.meta.handoff ? (
                    <li className="is-handoff">
                      {copy.handoff}: {copy.handoffs[message.meta.handoff]}
                    </li>
                  ) : null}
                </ul>
              </div>
            ),
          )}
          {thinking ? (
            <div className="agent-demo-bubble agent agent-demo-typing" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          ) : null}
        </div>
        <form className="agent-demo-compose" onSubmit={submit}>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
            maxLength={240}
            dir="auto"
          />
          <button type="submit" aria-label={copy.send} disabled={!draft.trim() || thinking}>
            <SendHorizontal aria-hidden="true" size={18} />
          </button>
        </form>
      </div>
      <p className="agent-demo-note">{copy.note}</p>
    </div>
  );
}
