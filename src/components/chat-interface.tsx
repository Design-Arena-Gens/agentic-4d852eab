'use client';

import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  id: string;
};

type Insights = {
  summary: string;
  focusMarkets: string[];
  nextSteps: string[];
};

type AgentResponse = {
  success: boolean;
  message: string;
  insights?: Insights;
  warning?: string;
};

const starterPrompts = [
  'Find high-margin buyers for Indian organic spices in Europe.',
  'Draft a sales pitch for exporting engineered wood to the Middle East.',
  'Suggest logistics partners for frozen seafood exports to Japan.',
];

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <p className="text-xs uppercase tracking-wider text-zinc-500">{children}</p>
);

const InsightsPanel = ({ insights }: { insights: Insights | undefined }) => {
  if (!insights) {
    return null;
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <SectionTitle>Quick Summary</SectionTitle>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {insights.summary}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <SectionTitle>Focus Markets</SectionTitle>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-zinc-700 dark:text-zinc-300">
            {insights.focusMarkets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>Immediate Next Steps</SectionTitle>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-zinc-700 dark:text-zinc-300">
            {insights.nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} text-sm leading-6`}
    >
      <div
        className={`max-w-[80%] rounded-2xl border px-4 py-3 shadow-sm ${
          isUser
            ? 'border-blue-200 bg-blue-500 text-white'
            : 'border-zinc-200 bg-white text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100'
        }`}
      >
        {message.content.split('\n').map((line, index) => (
          <p key={index} className={index > 0 ? 'mt-2' : undefined}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      id: 'intro',
      content:
        'Namaste! Main ExportMate AI hoon — aapke export business ke liye 24x7 sales strategist. Mujhe apka product, target market ya koi bhi sawaal batayein aur main turant buyer insights, pitch ideas aur compliance tips share karunga.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [insights, setInsights] = useState<Insights>();
  const [warning, setWarning] = useState<string>();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending]);

  const formattedHistory = useMemo(
    () =>
      messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    [messages],
  );

  const deriveInsights = (message: string): Insights => {
    const sentences = message
      .replace(/\*/g, '')
      .split(/[\n.]/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);

    const summary =
      sentences.slice(0, 2).join('. ') ||
      'Your agent has created a tailored go-to-market path for the buyers you target.';

    const bulletMatches = message
      .split('\n')
      .map((line) => line.replace(/^[-•\d.)\s]+/, '').trim())
      .filter((line) => line.length > 0);

    const focusMarkets = bulletMatches
      .filter((line) => /market|buyer|country|region|import/i.test(line))
      .slice(0, 3);

    const nextSteps = bulletMatches
      .filter((line) => /step|call|follow|send|prepare|draft|schedule|launch|plan/i.test(line))
      .slice(0, 3);

    return {
      summary,
      focusMarkets:
        focusMarkets.length > 0
          ? focusMarkets
          : [
              'Shortlist distributors active in your HS code via trade directories.',
              'Validate demand signals with recent import volume data.',
              'Highlight compliance readiness in your first touch outreach.',
            ],
      nextSteps:
        nextSteps.length > 0
          ? nextSteps
          : [
              'Compile a value-centric line-sheet with FOB pricing.',
              'Craft bilingual outreach messages for high-intent buyers.',
              'Prepare compliance documents (certificates, lab tests, logistics).',
            ],
    };
  };

  const sendPrompt = async (prompt: string) => {
    if (!prompt.trim() || isSending) return;

    const userMessage: Message = {
      role: 'user',
      id: crypto.randomUUID(),
      content: prompt.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setWarning(undefined);
    setIsSending(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...formattedHistory, { role: 'user', content: prompt.trim() }],
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data: AgentResponse = await response.json();
      if (data.warning) {
        setWarning(data.warning);
      }

      if (!data.message) {
        throw new Error('Empty response');
      }

      const agentMessage: Message = {
        role: 'assistant',
        id: crypto.randomUUID(),
        content: data.message,
      };

      setMessages((prev) => [...prev, agentMessage]);
      setInsights(data.insights ?? deriveInsights(data.message));
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          id: crypto.randomUUID(),
          content:
            'Network issue aa rahi hai. Kripya thodi der baad dobara try karein ya apni internet connection check karein.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendPrompt(input);
  };

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-4 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            ExportMate Agent Console
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Buyer discovery, pitches aur compliance coaching ek hi jagah.
          </p>
        </div>
        {isSending && (
          <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            Drafting response…
          </div>
        )}
      </div>

      <InsightsPanel insights={insights} />

      {warning && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-700 dark:border-amber-500/40 dark:bg-amber-900/40 dark:text-amber-200">
          {warning}
        </div>
      )}

      <div
        ref={listRef}
        className="flex h-72 flex-col gap-4 overflow-y-auto rounded-2xl border border-dashed border-zinc-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-2 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
              Agent thinking…
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="prompt" className="text-xs font-medium text-zinc-500">
          What should ExportMate work on?
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="prompt"
            name="prompt"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g. Identify premium tea buyers in Dubai and suggest a WhatsApp sales pitch."
            className="flex-1 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
          />
          <button
            type="submit"
            disabled={isSending}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSending ? 'Sending…' : 'Generate Strategy'}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        <SectionTitle>Need inspiration?</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendPrompt(prompt)}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-600 transition hover:border-blue-400 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:text-blue-300"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
