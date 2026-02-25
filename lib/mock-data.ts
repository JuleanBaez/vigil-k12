export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  date: string
}

export const suggestions = [
  {
    icon: "lightbulb",
    title: "Brainstorm ideas",
    subtitle: "for a creative project",
  },
  {
    icon: "code",
    title: "Help me write code",
    subtitle: "in Python or JavaScript",
  },
  {
    icon: "pen",
    title: "Draft an email",
    subtitle: "for a professional setting",
  },
  {
    icon: "compass",
    title: "Plan a trip",
    subtitle: "to an exciting destination",
  },
]

export const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "React Server Components",
    date: "Today",
    messages: [
      {
        id: "1a",
        role: "user",
        content: "Explain React Server Components and how they differ from Client Components.",
      },
      {
        id: "1b",
        role: "assistant",
        content: `**React Server Components (RSCs)** are a paradigm that allows components to run exclusively on the server. Here's how they differ from Client Components:

## Server Components
- Render on the server only
- Can directly access databases, file systems, and other server resources
- Don't add to the JavaScript bundle sent to the client
- Cannot use hooks like \`useState\` or \`useEffect\`
- Cannot use browser APIs

## Client Components
- Render on both the server (SSR) and the client
- Can use React hooks and browser APIs
- Add to the client JavaScript bundle
- Declared with the \`"use client"\` directive

## Key Benefits of RSCs
1. **Reduced Bundle Size** — Server Components don't ship JavaScript to the client
2. **Direct Backend Access** — Query databases without an API layer
3. **Automatic Code Splitting** — Only Client Components are bundled
4. **Improved Performance** — Less JavaScript means faster page loads

In **Next.js App Router**, all components are Server Components by default. You opt into client rendering with \`"use client"\` at the top of a file.`,
      },
    ],
  },
  {
    id: "2",
    title: "Python Data Analysis",
    date: "Today",
    messages: [
      {
        id: "2a",
        role: "user",
        content: "Write a Python script to analyze a CSV file and create a summary.",
      },
      {
        id: "2b",
        role: "assistant",
        content: `Here's a Python script that reads a CSV file and generates a comprehensive summary:

\`\`\`python
import pandas as pd

def analyze_csv(file_path):
    # Read the CSV file
    df = pd.read_csv(file_path)
    
    print("=" * 50)
    print("DATASET SUMMARY")
    print("=" * 50)
    
    # Basic info
    print(f"\\nRows: {len(df)}")
    print(f"Columns: {len(df.columns)}")
    print(f"\\nColumn Names: {list(df.columns)}")
    
    # Data types
    print("\\nData Types:")
    print(df.dtypes.to_string())
    
    # Missing values
    missing = df.isnull().sum()
    if missing.any():
        print("\\nMissing Values:")
        print(missing[missing > 0].to_string())
    
    # Numeric summary
    print("\\nNumeric Summary:")
    print(df.describe().to_string())
    
    return df

# Usage
df = analyze_csv("your_data.csv")
\`\`\`

This script gives you row/column counts, data types, missing values, and statistical summaries for all numeric columns. You can extend it with visualizations using **matplotlib** or **seaborn**.`,
      },
    ],
  },
  {
    id: "3",
    title: "Meal Prep for the Week",
    date: "Yesterday",
    messages: [
      {
        id: "3a",
        role: "user",
        content: "Help me plan healthy meals for the week that are easy to prep.",
      },
      {
        id: "3b",
        role: "assistant",
        content: `Here's a simple and balanced **weekly meal prep plan** that focuses on easy preparation:

## Prep Day (Sunday) — ~2 hours

### Proteins
- **Baked chicken thighs** (season with garlic, paprika, salt & pepper)
- **Hard-boiled eggs** (1 dozen)
- **Black bean mix** (sautéed with onion, cumin, and lime)

### Grains & Carbs
- **Brown rice** (large batch in rice cooker)
- **Roasted sweet potatoes** (cubed, tossed in olive oil)

### Vegetables
- **Roasted broccoli & bell peppers**
- **Fresh salad mix** (stored with paper towels to stay crisp)

---

## Daily Meals

| Day | Lunch | Dinner |
|-----|-------|--------|
| Mon | Chicken + rice + broccoli | Black bean bowl + sweet potato |
| Tue | Egg salad wrap | Chicken stir-fry with veggies |
| Wed | Black bean rice bowl | Chicken + roasted veggies |
| Thu | Sweet potato & egg bowl | Leftover stir-fry |
| Fri | Chicken salad | Cook fresh or eat out |

This plan is **budget-friendly** (~$40-50/week) and provides roughly **1,800-2,200 calories/day** depending on portions.`,
      },
    ],
  },
  {
    id: "4",
    title: "Travel Tips for Japan",
    date: "Previous 7 Days",
    messages: [
      {
        id: "4a",
        role: "user",
        content: "I'm planning a two-week trip to Japan. What should I know?",
      },
      {
        id: "4b",
        role: "assistant",
        content: `Great choice! Here are my top tips for a **two-week Japan trip**:

## Getting Around
- Get a **Japan Rail Pass** (14-day pass ~$420) — covers bullet trains nationwide
- Use **Suica/Pasmo IC cards** for local trains and convenience store purchases
- Download **Google Maps** offline — it's incredibly accurate for Japan transit

## Budget
- Expect to spend **$100-150/day** (mid-range)
- Convenience store meals are surprisingly excellent and affordable (~$5-8)
- Many places are **cash-only** — withdraw yen from 7-Eleven ATMs

## Must-Do Experiences
1. **Tokyo** — Shibuya crossing, Tsukiji outer market, Akihabara
2. **Kyoto** — Fushimi Inari, Arashiyama bamboo grove
3. **Osaka** — Dotonbori street food, Osaka Castle
4. **Day trip** — Hiroshima + Miyajima Island

## Etiquette
- No tipping (it can be considered rude)
- Stand on the left side of escalators (in Tokyo)
- Remove shoes when entering homes and some restaurants
- Speak quietly on trains

Japan is one of the safest and most well-organized countries for tourists. You'll have an amazing time!`,
      },
    ],
  },
]
