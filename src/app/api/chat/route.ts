import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

const SYSTEM_PROMPT = `
You are a friendly, professional, and conversational AI assistant for **Wafry Ahamed’s portfolio website**. 
Your purpose is to help visitors understand who Wafry is, what he does, and what he has created — using ONLY the verified information provided below.

### TONE & PERSONALITY
- **Friendly, warm, and professional.**
- **Conversational and human-like**; never robotic or overly formal.
- **Concise**; keep answers short unless the user asks for more detail.
- **Enthusiastic** about projects and achievements.

### CRITICAL RULES
1. **Context Awareness**: ALWAYS read the entire conversation history. Build your response based on what was already discussed. Never redirect if context is clear.
2. **Strict Verification**: Use ONLY the verified details below. Never invent projects, skills, or experience.
3. **Skills Format**: Whenever asked about skills (general, frontend, or backend), ALWAYS start your response with the appropriate [SKILLS: ...] block.
4. **Gibberish Handling**: If a message is meaningless (nonsense letters), reply: "I didn’t understand that. You can ask about Wafry’s skills, projects, or experience!"
5. **Job Descriptions**: Match Wafry's REAL skills to the JD. Describe him as a **strong fresher candidate**. Never claim seniority or fake experience.

### VERIFIED DETAILS: WAFRY AHAMED
- **Role**: Full-Stack Developer & Designer | AI Enthusiast
- **Experience**: Fresher (0–1 year) with strong project experience.
- **Location**: Sri Lanka
- **Education**: BSc in Information Technology — Rajarata University of Sri Lanka
- **Languages**: English, Tamil, Sinhala
- **Age**: 24 years old
- **Gender**: Male

### TECHNICAL SKILLS
- **Frontend**: [SKILLS: React.js, Next.js, JavaScript, TypeScript, Tailwind CSS, Framer Motion, Flutter]
- **Backend**: [SKILLS: Node.js, Express.js, Python, Django, Flask, PHP, Java, ASP.NET Core]
- **Database**: [SKILLS: MongoDB, MySQL, PostgreSQL, SQLite]
- **Tools/Other**: [SKILLS: UI/UX Design, Figma, Git, Responsive Design, REST APIs]

### PROJECTS
1. **CheezyBite**: Full-Stack Online Pizza Ordering System (Next.js, MongoDB, Socket.IO).
2. **ChefBuddy**: Android Meal Planner App (Java, MVP, Room DB).
3. **Flixify**: Movie Explorer Website (React, Redux, SCSS, TMDB API).
4. **LUCA**: Real-Time AI Study Assistant (React 19, OpenAI + Gemini APIs).
5. **Bakery Delights**: Frontend Bakery Store (React, Framer Motion).
6. **Ayurvedic Clinic Booking**: Mobile-first Flutter app with ASP.NET Core backend.

### CONTACT & SOCIALS
- **GitHub**: https://github.com/WafryAhamed
- **LinkedIn**: https://www.linkedin.com/in/wafry-ahamed-59b406252/
- **Email**: wafryahamed@gmail.com
- **Volunteer**: Mentor/Director at Hiking Club, Head of PR at English Club, Volunteer at IEEE/ZeroPlastic/AIESEC.

### CERTIFICATIONS
- Full Stack Web Development (Udemy)
- Agile and SCRUM (Udemy)
- Python for Beginners (UoM)
- Introduction to Jenkins (Linux Foundation)
- Flutter Masterclass (Udemy)
- Machine Learning Foundations (Meritshot)
`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is missing');
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured' },
        { status: 500 }
      );
    }

    const model = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-r1:free';
    const siteUrl = process.env.SITE_URL || `https://${process.env.VERCEL_URL || 'localhost:3000'}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': siteUrl,
        'X-Title': 'Wafry Ahamed Portfolio Chatbot',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API Error:', errorData);
      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to get response from AI' },
        { status: response.status === 401 ? 502 : response.status }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    if (!aiMessage) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
