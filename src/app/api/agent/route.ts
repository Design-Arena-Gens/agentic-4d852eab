import { NextResponse } from "next/server";
import OpenAI from "openai";

type MessagePayload = {
  role: "user" | "assistant";
  content: string;
};

const systemPrompt = `
You are ExportMate AI, a bilingual (Hindi-English) sales strategist for Indian exporters.
Objectives:
- Understand the product, target buyers, trade lanes, certifications, pricing, and logistics constraints.
- Produce structured guidance with bullet points, sales copy ideas, buyer qualification questions, and compliance reminders.
- Suggest realistic next actions tailored to SMEs, including WhatsApp/email outreach scripts.
- Use a friendly, encouraging tone mixing professional English with supporting Hindi phrases.
- If details are missing, highlight the assumptions.
Constraints:
- Keep answers under 350 words.
- Organize content with clear sub-headings and short bullets.
- Provide numeric insights (pricing bands, lead times) when reasonable.
- Always close with a 2-step action plan.
`;

const fallbackInsights = {
  summary:
    "Based on a quick rule-based estimate, focus on markets with stable demand, mid-sized distributors, and value-added packaging to stand out.",
  focusMarkets: [
    "Dubai (re-export hub with high premium demand)",
    "Singapore (gateway for ASEAN buyers)",
    "Rotterdam (EU entry point, strong compliance culture)",
  ],
  nextSteps: [
    "Build a concise product line-sheet with FOB pricing & MOQ.",
    "Shortlist buyers via trade associations & LinkedIn groups.",
    "Prepare compliance kit (certifications, lab tests, logistics).",
  ],
};

function buildFallbackMessage(prompt: string) {
  return `OPENAI_API_KEY missing: serving smart fallback.

📦 *Opportunity Snapshot*
- Product focus: ${prompt.slice(0, 120)}…
- Buyer profile: Mid-sized importers valuing reliable supply & compliance.
- Pitch hook: Emphasise Indian origin, quality control, and ready paperwork.

🧭 *Market Moves*
1. Identify top 25 prospects via Alibaba Verified Buyers + trade directories.
2. Craft bilingual WhatsApp intro: “Namaste {{buyer_name}}, hum ${prompt
    .split(" ")
    .slice(0, 5)
    .join(" ")} exporters hain. Ready compliance + competitive FOB. Shall we schedule a quick pricing walkthrough?”
3. Offer sampler packs with clear Incoterms (FOB Nhava Sheva / CIF Jebel Ali).

✅ *Compliance Checklist*
- Ensure HS code alignment, country-specific labelling, and phytosanitary docs if agri.
- Lock in freight quote + insurance before quoting landed price.

🚀 *Action Plan*
Step 1: Finalise product dossier (spec sheet, MOQ, lead time) by tomorrow.
Step 2: Launch outreach sprint to 15 priority buyers with personalised trade stats.`;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { messages?: MessagePayload[] };
    const messages = payload.messages ?? [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Kripya apna product ya market requirement ek sentence mein share karein. Uske baad main aapko detailed go-to-market plan dunga.",
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: true,
          message: buildFallbackMessage(messages[messages.length - 1].content),
          insights: fallbackInsights,
          warning:
            "Live OpenAI integration is inactive. Aapko philhaal heuristic-based plan mil raha hai. OPENAI_API_KEY set karke realtime intelligence unlock karein.",
        },
        { status: 200 },
      );
    }

    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      max_output_tokens: 900,
      input: [
        { role: "system", content: systemPrompt },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    });

    const textOutput = response.output_text;

    return NextResponse.json(
      {
        success: true,
        message: textOutput,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Agent error", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Server side error aa gaya. Team ko notify kar diya gaya hai. Thodi der baad fir try karein.",
      },
      { status: 500 },
    );
  }
}
