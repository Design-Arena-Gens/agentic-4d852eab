import { ChatInterface } from "@/components/chat-interface";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  Handshake,
  ShieldCheck,
  Ship,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Smart Buyer Targeting",
      description:
        "AI-driven prospect lists based on HS codes, trade data, aur cultural fit — seed funding ke bina bhi high-intent leads milte hain.",
      icon: Globe2,
    },
    {
      title: "Sales Collateral in Minutes",
      description:
        "WhatsApp scripts, bilingual pitch decks aur pricing comparables auto-generate hote hain aapke product specs ke basis par.",
      icon: TrendingUp,
    },
    {
      title: "Compliance Radar",
      description:
        "Country-specific certifications, labelling aur documentation par real-time alerts taa ki shipment kabhi hold na ho.",
      icon: ShieldCheck,
    },
  ];

  const workflow = [
    {
      label: "01. Discover",
      title: "Buyer Personas & Market Intel",
      description:
        "HS code insights, import volumes aur competitor pricing ka instant breakdown. Agent aapko bata deta hai ki kaunse regions mein abhi demand peak par hai.",
    },
    {
      label: "02. Pitch",
      title: "Personalised Pitch Automation",
      description:
        "Email + WhatsApp + LinkedIn ke liye hyper-local messaging templates. Har buyer ko aligned compliance assurances aur pricing anchors milte hain.",
    },
    {
      label: "03. Close",
      title: "Negotiation & Logistics",
      description:
        "Agent landed cost calculator, Incoterms guidance aur freight partner suggestions deta hai to close deals swiftly.",
    },
  ];

  const proofPoints = [
    {
      title: "14%",
      description: "Avg. uplift in enquiry-to-order conversions within 30 days.",
    },
    {
      title: "18 hrs",
      description: "Manual research time saved per buyer persona sprint.",
    },
    {
      title: "24x7",
      description: "Agent availability across time zones for real-time follow-ups.",
    },
  ];

  const complianceChecklist = [
    "Auto HS code recommendations with export incentives mapping.",
    "Documentation tracker (FSSAI, CE, ISO, phytosanitary, fumigation).",
    "Country-specific labelling + packaging advisories.",
    "Risk alerts for dual-use, sanctions aur anti-dumping duties.",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-sky-50 pb-24 text-zinc-900">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%)]" />
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Ship className="h-6 w-6 text-blue-600" />
            ExportMate AI
          </div>
          <Link
            href="#demo"
            className="group inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-600 shadow-sm backdrop-blur transition hover:border-blue-400 hover:text-blue-700"
          >
            Try Live Agent
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-wider text-zinc-600 shadow-sm backdrop-blur">
              High Velocity Export Sales Agent
              <BadgeCheck className="h-4 w-4 text-emerald-500" />
            </span>
            <h1 className="text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl lg:text-6xl">
              Bharat ke exporters ke liye
              <span className="text-blue-600"> AI Sales Partner</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">
              ExportMate AI aapke product ko seedha right buyers tak pahuchata
              hai. Yeh agent market intelligence, personalised outreach aur
              compliance coaching ko ek smart workflow mein combine karta hai —
              taki aap deal closing par focus kar saken.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700"
              >
                Launch Sales Agent
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:hello@exportmate.ai?subject=ExportMate%20Demo%20Request"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-blue-400 hover:text-blue-600"
              >
                Request Strategy Call
                <Handshake className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {proofPoints.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur"
                >
                  <p className="text-3xl font-semibold text-blue-600">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="demo" className="lg:sticky lg:top-16">
            <ChatInterface />
          </div>
        </div>
      </header>

      <section className="mx-auto mt-4 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white/80 p-10 shadow-xl backdrop-blur">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Why exporters trust ExportMate?
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-500">
            Har module real trade playbooks par trained hai — cold chain se
            lekar engineering goods tak. Agent har response mein actionable
            prompts deta hai, so you move from lead scouting to buyer
            conversation in hours, not weeks.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-4 rounded-2xl border border-white/80 bg-gradient-to-br from-white via-sky-50 to-white p-6 shadow-sm"
              >
                <feature.icon className="h-10 w-10 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Fast-track Workflow
            </span>
            <h2 className="text-3xl font-semibold text-zinc-900">
              Export-ready playbooks delivered step-by-step.
            </h2>
            <p className="text-sm text-zinc-600">
              AI agent har stage par action items deta hai: research, outreach,
              compliance aur ops coordination. Saath hi aapki team ke liye
              bilingual briefs generate karta hai so nothing gets lost in
              translation.
            </p>
            <ul className="space-y-4">
              {workflow.map((item) => (
                <li
                  key={item.label}
                  className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-xl backdrop-blur">
            <div className="flex items-center gap-3 rounded-2xl border border-blue-200/70 bg-blue-50/80 p-4 text-sm text-blue-700">
              <ShieldCheck className="h-5 w-5" />
              Compliance Copilot ensures koi shipment paperwork miss na ho.
            </div>
            <h3 className="text-xl font-semibold text-zinc-900">
              Compliance & Risk Radar
            </h3>
            <ul className="space-y-3 text-sm text-zinc-600">
              {complianceChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl bg-zinc-100/80 p-3 dark:bg-zinc-900/40"
                >
                  <BadgeCheck className="mt-1 h-4 w-4 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-500 p-10 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              “Humari chai exports ke liye agent ne 12 din mein buyer pipeline
              set kar di!” — Suraj, Assam-based SME
            </h2>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              Customer Wins
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-6">
              <p className="text-sm">
                “Europe ke buyers ko nurture karna ab simple hai. ExportMate ne
                PO negotiation steps bhi suggest kiye.”
              </p>
              <p className="mt-4 text-xs uppercase tracking-wide text-white/70">
                Stainless Steel Fabricator · Rajkot
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-6">
              <p className="text-sm">
                “Agent ne hamare ready-to-eat meals ke liye GCC compliant labels
                aur cold chain SOPs design kar diye.”
              </p>
              <p className="mt-4 text-xs uppercase tracking-wide text-white/70">
                Food Exporter · Mumbai
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-6">
              <p className="text-sm">
                “LinkedIn outreach scripts ne 3 new distributors onboard kiye,
                within 21 days.”
              </p>
              <p className="mt-4 text-xs uppercase tracking-wide text-white/70">
                Handicrafts Collective · Jaipur
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white/90 p-10 text-center shadow-xl backdrop-blur">
          <Ship className="mx-auto h-10 w-10 text-blue-600" />
          <h2 className="mt-6 text-3xl font-semibold text-zinc-900">
            Ready to accelerate exports?
          </h2>
          <p className="mt-3 text-sm text-zinc-600">
            ExportMate ko apni team ka growth teammate banayein. Hum aapke
            product, buyers aur compliance needs ko samajhkar ek personalised
            go-live sprint design karte hain.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="#demo"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700"
            >
              Chat With ExportMate
            </Link>
            <a
              href="https://cal.com/exportmate/strategy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-blue-400 hover:text-blue-600"
            >
              Book Strategy Workshop
            </a>
          </div>
        </div>
      </section>

      <footer className="mt-20 border-t border-zinc-200 bg-white/70 py-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} ExportMate AI · Built for Indian export
        champions. Crafted with ❤️ in Bharat.
      </footer>
    </div>
  );
}
