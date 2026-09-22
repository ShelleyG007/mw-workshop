import { useState, useEffect, useRef, useCallback } from "react";
import { Sun, Moon, ChevronRight, Check, Users, LogOut, RefreshCw, ArrowLeft, Calculator, Printer, ClipboardCheck } from "lucide-react";

/* ============================================================
   COURSE CONTENT  (Mark's current wording — working draft)
   The ONE place the wording lives. To update the course, edit
   here. To add another course later, add a new object to
   COURSES and point a class code at it below.

   Section "kind" decides how a section renders:
     (default)  fields    — labelled short/long answer boxes
     "calc"     the live Pipeline / Targets & Ratios calculator
     "diary"    the day planner grid
     "choice"   a self-check: pick one option (saved to Mark)
     "score"    a role-play self-scorecard (1–5 per line + note)
   Every kind still saves to Mark exactly like a normal answer.
   ============================================================ */
const INBOUND_TRAVEL = {
  "id": "inbound-travel",
  "title": "Inbound Travel Sales Mastery",
  "subtitle": "Your live workshop workbook",
  "motto": "Information without implementation is just information.",
  "weeks": [
    {
      "id": "w1",
      "title": "Building Our Foundations",
      "intro": "Goal setting, diary discipline and the math of success.",
      "sections": [
        {
          "id": "w1-obj",
          "title": "By the end of this week",
          "body": [
            "Calculate our closing ratios, lead to quote, quote to sale.",
            "Structure your day, hour by hour therefore increased productivity & sales.",
            "See procrastination for what it is: a gap in your plan, not a flaw in you.",
            "Effective prioritising."
          ],
          "fields": []
        },
        {
          "id": "pipeline-math",
          "kind": "calc",
          "title": "Module 1.1 \u00b7 The Pipeline Math",
          "body": [
            "To hit your financial targets you must know your own closing ratios. Fill in the blanks using your historical data, or the industry benchmarks in brackets if you don't have your own yet."
          ],
          "fields": [
            {
              "id": "calc",
              "type": "calc"
            }
          ]
        },
        {
          "id": "time-block",
          "title": "Module 1.2 \u00b7 Time & Diary Management",
          "body": [
            "The most successful people are also the most productive! We have all heard the saying, \u201cfail to plan, plan to fail\u201d.",
            "Time & diary management will increase your productivity between 20% to 50%.",
            "First, we need to acknowledge what is stealing our time.",
            "With discipline comes structure, with structure comes freedom.",
            "Recognise what is stealing your time:",
            "Acknowledge what is stealing your time is the first step towards eliminating procrastination.",
            "If you do not have each task or meeting time lined in our diary, how will you tell where your pro-activeness towards your goals/targets will fit in to your day?",
            "This is where procrastination comes in! If we do not have a plan for the day ahead we will ponder on which task to do first and let's face it, we all guilty of doing the easy tasks first and end up transferring those tasks to the next day over & over again.",
            "Most people write their to do lists in their diary. Your diary is not called a to do list is it?",
            "Your diary is action orientated and only time lined tasks, appointments, meetings or personal time should be listed.",
            "You need to work with a to do list on one side and a diary on the other. You should be planning your day in advance before you leave the office. Have a look at your do to list for the next day and prioritise in order in your diary.",
            "Chunking Down:",
            "You need to chunk down how long you would need to complete each task (always allow a little more time) and diarise accordingly. We are taking one step back to take three steps forward. People say to me, \u201cI don't have the time to plan\u201d, I say you do not MAKE the time to plan!",
            "Now take the most important task and bring it to one side. (this does not mean the other tasks are not important it just helps us to focus on one thing at a time).",
            "Do you think professional sports people focus on a World cup or do they look at it game by game?",
            "Chunking down allows you to focus on what is in front of you while eliminating being overwhelmed.",
            "A house gets built one brick at a time!",
            "Chunking down is to look at the task at hand and look at how many elements make up that task.",
            "Now that we know the elements required to complete the task we need to diarise accordingly to achieve our task at the desired date & time.",
            "I.e.; You have a task which needs to be completed by day 5 and there are 5 elements to do to complete the task by day 5. Diarise 1 every day to complete by day 5."
          ],
          "fields": [
            {
              "id": "procrastination",
              "label": "What do you acknowledge in regard to procrastination?",
              "type": "long"
            },
            {
              "id": "todo",
              "label": "Create a to do list for the next 5 days",
              "type": "long",
              "rows": 12
            },
            {
              "id": "prioritise",
              "label": "Now prioritise from most to least important",
              "type": "numbered",
              "count": 12
            },
            {
              "id": "chunk",
              "label": "Chunk down your first task below (Element 1, Element 2, etc.)",
              "type": "long",
              "rows": 12
            }
          ]
        },
        {
          "id": "diary",
          "kind": "diary",
          "title": "Your 5-Day Diary",
          "body": [
            "Complete your diary below for the next 5 days with all the appointments, meetings or personal time in the specific times as booked. We can now identify the time we have available to be Pro-Active (towards our goals/big picture) and fulfil other duties. Having a plan leaves no time for procrastination.",
            "Once you have all the elements clearly defined you need to diarise with a specific time and day.",
            "There is no grey area here, it is black or white!"
          ],
          "fields": [
            {
              "id": "grid",
              "type": "diary"
            }
          ]
        },
        {
          "id": "commit1",
          "title": "My commitment this week",
          "body": "Information without implementation is just information. Write the one action you will take this week, then report back next session.",
          "fields": [
            {
              "id": "commit",
              "label": "This week I will\u2026",
              "type": "long"
            }
          ]
        }
      ]
    },
    {
      "id": "w2",
      "title": "Lead Qualifying & Rapport",
      "intro": "Prospect vs suspect, deep listening, backtracking, mirroring and pacing.",
      "sections": [
        {
          "id": "w2-obj",
          "title": "By the end of this week",
          "body": [
            "Tell a real prospect from a time-waster inside the first conversation.",
            "Qualify every lead on affordability, timeline, authority and motivation.",
            "Build rapport with your customers, meaning more sales!",
            "Confirm the client's need in their own words before you quote."
          ],
          "fields": []
        },
        {
          "id": "prospect-suspect",
          "title": "Module 2.1 \u00b7 Prospect vs Suspect",
          "body": [
            "A prospect has budget clarity, a real timeline, responds within 24 hours, and the decision-makers are present. A suspect is vague, ghosts you, and is just looking. If a lead fails 3 of those 4 within 72 hours, move them to nurture.",
            "Qualify on emotional motivation, why Africa, and why now."
          ],
          "fields": []
        },
        {
          "id": "rapport",
          "title": "Module 2.2 \u00b7 Building Rapport",
          "body": [
            "What is Rapport & why is it so important in Sales.",
            "Sales are built on our ability to build relationships with customers and for this we need rapport. This is more than small talk. It is more like a common understanding between 2 or more people.",
            "By establishing good rapport at the outset we can gain commitment from the other party, conscious or unconscious, to trust the process even when they do not fully understand how the process works and what the ultimate outcome will be.",
            "Surprisingly, we make most business decisions based on rapport rather than technical merit. You are more likely to buy from, agree with, or support someone you can relate to than someone you can't.",
            "People buy people!",
            "Rapport is the ability to relate to others in a way that creates trust and understanding. It is the ability to see the other's point of view and get them to understand yours. You don't have to agree with their point of view or even like it. It makes any form of communication easier.",
            "Have you ever had an experience where you were chatting with a person you had just met and you felt as if you had met them before or that you had known them your whole life?",
            "Have you ever formed an instantaneous connection with another person for no particular reason other than you felt that they were your kind of person?",
            "The chances are that you can answer Yes to at least one of these questions and if you can then you have experienced rapport.",
            "To build strong customer relationships you must be in rapport.",
            "PEOPLE LIKE PEOPLE LIKE THEMSELVES!",
            "The different ways of building rapport can be grouped under these headings:",
            "Deep Listening",
            "Backtracking",
            "Mirroring",
            "Pacing",
            "Deep Listening:",
            "Most people do not listen at a very deep level, regardless of the context. There are three levels of active listening. What distinguishes them is where you focus as you listen to the person you're with.",
            "Level I: Internal Listening. At Level I, our awareness is not focused on our customers, but rather on ourselves and our own agenda. Essentially, it's all about you. In Level I listening, you're physically present, but emotionally elsewhere, immersed in the self-absorbed chatter of your inner monologue. You might be wondering whether you left the coffee pot on, what's next on your 'to do' list. Whatever it is, you are the focus of your attention, not your customer. There are times when this superficial level of listening may be appropriate, but certainly not in the context of establishing a relationship.",
            "Level II: Focused Listening. At Level II, you become very intensely focused on and fully aware of the other person; you listen sharply not only on their words, but how they say them, and what they don't say. Level II listen is the level of collaboration and empathy. Effective communication starts here.",
            "Level III: Global Listening. As in Level II listening, Level III is also completely focused on the other person, but also includes a wider breadth. In addition to hearing your customer's spoken words, you're also tuned in to her non-verbal communication cues like energy level, inflections and tone of voice. You sense a push to avoid a painful topic, or alluding to some unspoken issue, and you have a sense of what that might be. As a Sales person, when you drop down into Level III listening, you become a successful sales star!",
            "Listening at deeper levels is an art. Too often, when we communicate with another person, our own mind is preoccupied with our own thoughts, agendas, and assumptions. The quality and depth of our listening can have a profound impact in our conversations and indeed, the quality of all our relationships.",
            "Backtracking:",
            "Backtracking involves repeating or summarising what another person has just said to you, either the last few words, sentences word-for-word or a summary of information. It's a powerful technique to pace others and assures them that you have been listening attentively and have heard what they said. In this way, backtracking is an effective strategy for building trust and rapport. Backtracking is not paraphrasing; it's critical that you use the same key words in the same tones as were originally stated. When you substitute somebody else's words for your own, even in the spirit of goodwill, you diminish the importance of their own words and assume that your words carry the same meaning for them; very often, they do not. Backtracking has the added benefits of giving you time to consider what you're going to say next.",
            "In a fast-paced world with so much competing for our attention, deep listening skills are an increasingly rare commodity. Human beings have an innate desire to be appreciated, validated, and understood. When people talk about themselves and someone listens with intent, it makes them feel important and connects them to you. Deep listening isn't a skill we're born with, it can be learned, but it does require practice, discipline, and intent.",
            "\u201cNo one has ever listened to me before like you do.\u201d So said a potential client who is pouring the heart out on why they would like this holiday of a lifetime.",
            "Do we have some magical gift that allows us to repeatedly get responses like this from our customers? No, we simply build such a deep level of rapport that people truly feel heard and experience a sense of security.",
            "Mirroring & Pacing:",
            "Pacing and Mirroring Speed (Tempo):",
            "Telephonic pacing and mirroring is a communication technique where a salesperson subtly matches a caller's vocal traits and emotional tone to build fast rapport, reduce tension, and establish trust.",
            "Matching how fast or slow a customer speaks prevents frustration and helps them process information comfortably.",
            "Holidays in Africa are uniquely emotional, high-value, and often perceived as a \u201cbucket-list\u201d or logistically complex undertaking. Because travelers are investing significant time and money into an unfamiliar continent, pacing and mirroring are critical trust-building tools that bridge the cultural and geographical gap right over the phone.",
            "Here are practical examples of how to apply pacing and mirroring across different dimensions of a phone call.",
            "1. The High-Energy \u201cBucket List\u201d Adventurer",
            "This caller is bursting with excitement about wildlife, photography, and tick-box experiences. They speak quickly and use highly visual, cinematic language.",
            "The Caller: \u201cOh my gosh, I've wanted to see the Great Migration my entire life! I want to be right there in the Serengeti, seeing the wildebeest cross the river, taking tons of photos, just experiencing the raw wildness of Africa!\u201d",
            "The Strategy: Match their fast tempo and infectious enthusiasm. Mirror their visual, high-impact vocabulary (Great Migration, raw wildness, experience).",
            "2. The Anxious, Detail-Oriented \u201cFirst-Timer\u201d",
            "This caller is likely booking a family holiday and is deeply concerned about logistics, malaria, safety, and comfort. They speak slowly, hesitantly, and focus on practicalities.",
            "The Caller: \u201cUm, hello... we are looking at South Africa for the kids, but... well, I'm just a bit worried about the safety. And the malaria tablets. Is a safari really safe for an eight-year-old? We want to see animals, but comfort and safety are our top priorities.\u201d",
            "The Strategy: Drop your volume slightly, slow your pace to match their cautious rhythm, and use reassuring, protective language. Never dismiss their fears; mirror their focus on safety and comfort.",
            "3. The Ultra-Luxury \u201cExclusive\u201d Honeymooner",
            "This caller speaks with a calm, measured, sophisticated tone. They are looking for exclusivity, romance, and flawless service, and they use refined language.",
            "The Caller: \u201cGood afternoon. My fianc\u00e9e and I are planning our honeymoon for next September. We are looking for something truly exceptional, very private, intimate, with top-tier service. Perhaps a combination of a luxury lodge and a vineyard.\u201d",
            "The Strategy: Adopt a polished, calm, and professional cadence. Eliminate casual slang (like \u201csuper cool\u201d or \u201cawesome\u201d). Mirror their sophisticated vocabulary (exceptional, private, intimate, luxury).",
            "4. The Laid-Back \u201cAuthentic\u201d Backpacker / Eco-Traveler",
            "This caller has a relaxed, easygoing voice. They care about sustainability, local culture, conservation, and \u201cgetting off the beaten track.\u201d They dislike corporate-sounding sales pitches.",
            "The Caller: \u201cHey there, yeah, just looking to do a trip to Namibia. Nothing too touristy or flashy, you know? Just want to rent a 4x4, sleep under the stars, see the dunes, and support the local communities if we can.\u201d",
            "The Strategy: Match their relaxed, conversational pace. Drop formal corporate jargon. Mirror their eco-conscious, grounded language (off the beaten track, under the stars, local communities)."
          ],
          "fields": []
        },
        {
          "id": "backtracking",
          "title": "The Backtracking Framework",
          "body": [
            "Never send a quote without repeating the client's needs back to them in their own words. Here is the structure in action:"
          ],
          "fields": [
            {
              "id": "summary",
              "label": "Draft a backtracking summary for your most recent enquiry",
              "type": "long",
              "rows": 6
            }
          ]
        },
        {
          "id": "roleplay2",
          "kind": "score",
          "title": "Role-play: the Discovery Call \u00b7 Brief 1",
          "body": "You are the travel designer qualifying an enthusiastic but budget-defensive traveller. Score yourself honestly after the role-play.",
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Uncovered \u201cWhy now?\u201d",
                "Budget clarified smoothly",
                "Identified all decision-makers",
                "Deep listening, backtracking, pace and tone matching"
              ]
            }
          ]
        },
        {
          "id": "roleplay2b",
          "kind": "score",
          "title": "Role-play: the Discovery Call \u00b7 Brief 2",
          "body": "You are the travel designer qualifying a slow, laid-back traveller enquiring about a 15-day Botswana and Kruger trip. He is vague on dates and traveller numbers, has a budget of about R150k, and says he will call you back. Score yourself honestly after the role-play.",
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Uncovered \u201cWhy now?\u201d",
                "Budget clarified smoothly",
                "Identified all decision-makers",
                "Deep listening, backtracking, pace and tone matching"
              ]
            }
          ]
        },
        {
          "id": "commit2",
          "title": "My commitment this week",
          "fields": [
            {
              "id": "commit",
              "label": "This week I will\u2026",
              "type": "long"
            }
          ]
        }
      ]
    },
    {
      "id": "w3",
      "title": "Pipeline & Closing Mastery",
      "intro": "Closing naturally by matching the need, and reframing local objections.",
      "sections": [
        {
          "id": "w3-obj",
          "title": "By the end of this week",
          "body": [
            "Close naturally by matching the need, not dumping your toolbox.",
            "Reframe the four objections that costs us the most bookings."
          ],
          "fields": []
        },
        {
          "id": "objections",
          "title": "Module 3.1 \u00b7 The Objection Reframing Playbook",
          "body": [
            "Do not dump your toolbox. An itinerary tailored to the client's core need is a natural close. Use your deep listening skills to match the clients needs.",
            "Dumping your toolbox means throwing every lodge, itinerary, and activity you know at a client instead of listening to what they actually want. In South African inbound travel, this overwhelms international guests, dilutes your value as an expert, and ultimately kills the sale.",
            "Matching client needs ensures you sell the right experience, build trust, and secure high-value bookings.",
            "3 Examples of Needs-Matching vs. Toolbox Dumping",
            "1. The Multi-Generational Family",
            "The \u201cToolbox Dump\u201d Mistake: Sending a generic 10-day itinerary that includes a walking safari in Kruger, a packed winelands wine-tasting route, and a shark cage diving excursion in Gansbaai.",
            "Why it fails: Toddlers can't go on walking safaris, grandparents might struggle with intense boat rides, and kids will get bored at wineries.",
            "The Needs-Matched Solution: Proposing a malaria-free, family-friendly private reserve in the Eastern Cape (with junior tracker programs) paired with a relaxed stay at a Garden Route resort featuring a private chef and accessible activities.",
            "2. The Ultra-Luxury Honeymooners",
            "The \u201cToolbox Dump\u201d Mistake: Listing five different 5-star lodges across Madikwe, Sabi Sands, and Phinda, while bragging about every luxury transfer option, helicopter flip, and spa treatment available in South Africa.",
            "Why it fails: It forces the clients to do the hard work of choosing. It feels transactional rather than romantic and curated.",
            "The Needs-Matched Solution: Selecting one ultimate destination, like a specific ultra-luxury lodge in the Sabi Sand that offers private plunge pools and romantic star-bed sleepouts, paired with a boutique hotel in Franschhoek, focusing strictly on privacy and exclusivity.",
            "3. The Budget-Conscious Adventure Backpackers",
            "The \u201cToolbox Dump\u201d Mistake: Pitching a standard fly-in safari to a luxury lodge because \u201cit's the best way to see the Big Five,\u201d followed by a list of high-end car rentals and internal commercial flights.",
            "Why it fails: It completely blows their budget, making them feel misunderstood. They will likely ghost you and book via an automated online platform instead.",
            "The Needs-Matched Solution: Designing a self-drive or Baz Bus itinerary along the Wild Coast and Oudtshoorn, featuring eco-lodges, sea kayaking, and a self-drive safari in Addo Elephant National Park.",
            "Why Matching Needs is Critical in Inbound Travel",
            "When objections come, reframe rather than discount.",
            "1. The \u201cI need to talk to my partner\u201d delay",
            "The trap: Saying \u201cNo problem, let me know what they think!\u201d and losing all momentum.",
            "The reframe: Validate the need for consensus while booking a firm follow-up window with both partners.",
            "2. Over-researching & over-analysing (TripAdvisor, blogs)",
            "The trap: Arguing with a forum review or getting defensive.",
            "The reframe: Pivot from product supplier to trusted, on-the-ground local advisor.",
            "3. Safety & logistic anxiety (driving on the left, flights with kids)",
            "The trap: Minimising their fears with a simple \u201cDon't worry, it's fine.\u201d",
            "The reframe: Share structured, operational safety protocols and private transit alternatives.",
            "4. The itinerary \u201cshopping around\u201d (price matching)",
            "The trap: Discounting immediately and cutting into your margin.",
            "The reframe: Highlight the hidden costs, operational liabilities and your exclusive on-the-ground support."
          ],
          "fields": []
        },
        {
          "id": "roleplay3",
          "kind": "score",
          "title": "Role-play: the Itinerary Review \u00b7 Brief 1",
          "body": "You presented a premium itinerary against a cheaper online quote, with a partner delay in play. Score yourself after the role-play.",
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Avoided panic discounting",
                "Uncovered hidden competitor gaps",
                "Handled the partner objection",
                "Maintained premium authority",
                "Secured a firm next step"
              ]
            }
          ]
        },
        {
          "id": "roleplay3b",
          "kind": "score",
          "title": "Role-play: the Itinerary Review \u00b7 Brief 2",
          "body": "You are presenting a premium, customised R250,000 itinerary. The client loves the plan but thinks their partner will object that Africa is too hot, says they found a similar route online 15% cheaper, and wants to think it over with friends. Score yourself after the role-play.",
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Avoided panic discounting",
                "Uncovered hidden competitor gaps",
                "Handled the partner objection",
                "Maintained premium authority",
                "Secured a firm next step"
              ]
            }
          ]
        },
        {
          "id": "commit3",
          "title": "My commitment this week",
          "fields": [
            {
              "id": "commit",
              "label": "This week I will\u2026",
              "type": "long"
            }
          ]
        }
      ]
    },
    {
      "id": "w4",
      "title": "Mental Mastery & Follow-Up",
      "intro": "Selling premium value, resilience and high-conversion follow-up.",
      "sections": [
        {
          "id": "w4-obj",
          "title": "By the end of this week",
          "body": [
            "Stop projecting your own limiting beliefs onto potential buyers.",
            "Sell premium access, convenience and peace of mind, not beds and transfers.",
            "Run a follow-up sequence that adds value instead of nagging."
          ],
          "fields": []
        },
        {
          "id": "mirror-check",
          "kind": "choice",
          "title": "Module 4.1 \u00b7 The Psychological Mirror",
          "body": [
            "Answer honestly. This is where you find out if you're projecting your own financial habits onto your clients.",
            "When I quote a room night at R25,000 (about $1,400), my immediate internal thought is:"
          ],
          "fields": [
            {
              "id": "thought",
              "type": "choice",
              "options": [
                "\u201cThat's incredible value for a high-end luxury safari experience.\u201d",
                "\u201cThat's insane money, I need a cheaper alternative in case they push back.\u201d"
              ]
            }
          ]
        },
        {
          "id": "mirror",
          "title": "Module 4.1 \u00b7 Rewrite Your Value",
          "body": [
            "Rewrite your value proposition. Stop saying \u201cI book hotels and safaris.\u201d Model: \u201cI design secure, end-to-end luxury travel experiences for families who want Southern Africa without any logistical stress.\u201d"
          ],
          "fields": [
            {
              "id": "valueprop",
              "label": "Rewrite your value proposition",
              "type": "long"
            },
            {
              "id": "beliefs",
              "label": "Write your 3 top limiting beliefs below",
              "type": "long"
            },
            {
              "id": "reframe",
              "label": "Now re-frame those limiting beliefs positively",
              "type": "long"
            },
            {
              "id": "writeclient",
              "label": "Write to a client who has ONE of your 3 limiting beliefs above and reframe to overcome this client's limiting beliefs",
              "type": "long",
              "rows": 6
            }
          ]
        },
        {
          "id": "followup",
          "title": "Module 4.2 \u00b7 The High-Conversion Follow-Up",
          "body": [
            "Replace \u201cJust checking in to see if you've decided\u201d with a sequence that adds value at every touch.",
            "Day 2 after the proposal: Value add",
            "Day 5 after the proposal: Urgency & scarcity"
          ],
          "fields": [
            {
              "id": "day2",
              "label": "Draft your own Day 2 value-add message for a live client",
              "type": "long",
              "rows": 6
            }
          ]
        },
        {
          "id": "roleplay4",
          "kind": "score",
          "title": "Role-play: the Ultimate Premium Pitch",
          "body": "You are selling a high-margin package to an executive who says they can book the same hotels themselves. Score yourself after the role-play.",
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Protected the margin with confidence",
                "Shifted price to peace of mind",
                "Avoided clich\u00e9 sales pitches",
                "Secured firm next steps"
              ]
            }
          ]
        },
        {
          "id": "actionplan",
          "title": "My 90-Day Action Plan",
          "body": [
            "Information without implementation is just information. This is your commitment to yourself. Fill it in on the final session and keep it where you'll see it every day."
          ],
          "fields": [
            {
              "id": "learned",
              "label": "Name 3 things you have learned from this workshop",
              "type": "long"
            },
            {
              "id": "implement",
              "label": "Now list how you intend to implement each of those 3 above",
              "type": "long"
            },
            {
              "id": "target",
              "label": "What is your monthly target?",
              "type": "short"
            },
            {
              "id": "currentavg",
              "label": "Write down your current sales per month average (YTD)",
              "type": "short"
            },
            {
              "id": "shortfall",
              "label": "What is your shortfall if any?",
              "type": "short"
            },
            {
              "id": "habits",
              "label": "What 3 new activities are you going to implement on a daily basis to increase your sales?",
              "type": "long"
            },
            {
              "id": "routine",
              "label": "When a proposal goes out, I will follow up on:",
              "type": "long"
            }
          ]
        },
        {
          "id": "checkin90",
          "title": "My 90-Day Check-In",
          "body": [
            "My accountability 90 day check-in. Come back to this 90 days after the workshop and fill it in honestly."
          ],
          "fields": [
            {
              "id": "implemented",
              "label": "Name 3 things you have implemented in the last 90 days",
              "type": "long"
            },
            {
              "id": "changes",
              "label": "What changes have you seen improved?",
              "type": "long"
            },
            {
              "id": "avgsales",
              "label": "My average monthly sales over the last 90 days are?",
              "type": "short"
            }
          ]
        }
      ]
    }
  ]
};

const COURSES = { "inbound-travel": INBOUND_TRAVEL };

/* Mark issues a class code to each cohort. Add a line per cohort.
   Any code not listed still works and defaults to the inbound course. */
const CLASSES = {
  "ITSM-01": { course: "inbound-travel", label: "Inbound Travel · Cohort 1", facilitatorCode: "MW-VIEW-01" },
};

/* Mark's single master facilitator login. Entering this in the class-code box
   opens the cohort manager, where he can view any cohort and create new ones.
   Students never see it. */
const MASTER_FACILITATOR_CODE = "MW-VIEW-01";
const COHORT_PREFIX = "ITSM-";

/* Runtime cohort registry: the seeded cohort(s) above plus any Mark has created
   (loaded from Supabase at runtime). All the resolver helpers read from this. */
const COHORTS = { ...CLASSES };

/* Ratio dropdown options: 10% to 100% in 5% steps (matches the sheet). */
const RATIOS = Array.from({ length: 19 }, (_, i) => 0.1 + i * 0.05);

/* ============================================================
   Storage layer. Artifact key-value store with in-memory
   fallback. Swap for Supabase when deploying to your own host.
   ============================================================ */
import { store } from "./supabaseStore.js";

const sanitizeCode = (s) => (s || "").trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
const recordKey = (code, pid) => `resp:${code}:${pid}`;
const assessKey = (code, pid) => `assess:${code}:${pid}`;
const courseForCode = (code) => COURSES[(COHORTS[code] && COHORTS[code].course) || "inbound-travel"];
const labelForCode = (code) => (COHORTS[code] && COHORTS[code].label) || code;
function facilitatorClassFor(code) {
  for (const classCode of Object.keys(CLASSES)) {
    const fc = CLASSES[classCode].facilitatorCode;
    if (fc && sanitizeCode(fc) === code) return classCode;
  }
  return null;
}

/* ---- cohorts: Mark creates these himself; the list lives in Supabase ---- */
const COHORTS_KEY = "cohorts";
const cohortNum = (code) => { const m = String(code).match(/(\d+)\s*$/); return m ? parseInt(m[1], 10) : 0; };
function nextCohortCode() {
  let max = 0;
  Object.keys(COHORTS).forEach((c) => { if (c.startsWith(COHORT_PREFIX)) max = Math.max(max, cohortNum(c)); });
  return COHORT_PREFIX + String(max + 1).padStart(2, "0");
}
async function loadCohorts() {
  try {
    const raw = await store.get(COHORTS_KEY, true);
    const list = raw ? JSON.parse(raw) : [];
    list.forEach((c) => { if (c && c.code) COHORTS[c.code] = { course: c.course || "inbound-travel", label: c.label || c.code }; });
    return list;
  } catch (e) { return []; }
}
async function addCohort() {
  const raw = await store.get(COHORTS_KEY, true);
  const list = raw ? JSON.parse(raw) : [];
  list.forEach((c) => { if (c && c.code) COHORTS[c.code] = { course: c.course || "inbound-travel", label: c.label || c.code }; });
  const code = nextCohortCode();
  const cohort = { code, course: "inbound-travel", label: "Inbound Travel · Cohort " + cohortNum(code), createdAt: Date.now() };
  await store.set(COHORTS_KEY, JSON.stringify([...list, cohort]), true);
  COHORTS[code] = { course: cohort.course, label: cohort.label };
  return cohort;
}

/* ---- numbers ---- */
const rnd = (n) => Math.round(n);
const rup = (n) => Math.ceil(n - 1e-9);
const safe = (n) => (isFinite(n) ? n : 0);
function fmtR(n) {
  const v = Math.round(safe(n));
  return "R" + v.toLocaleString("en-ZA").replace(/,/g, " ");
}
function fmtPct(x) { return Math.round(safe(x) * 100) + "%"; }

/* Full Targets & Ratios computation, mirroring the spreadsheet. */
function computeCalc(v) {
  const target = +v.target || 0, avg = +v.avg || 0, leadsDay = +v.leadsDay || 0;
  const ltq = +v.ltq || 0, qtc = +v.qtc || 0, days = +v.days || 0;
  const aLtq = +v.aLtq || ltq, aQtc = +v.aQtc || qtc;
  const leadsMonth = rnd(leadsDay * days);
  const quotesCur = rup(leadsMonth * ltq), quotesAft = rup(leadsMonth * aLtq);
  const bookCur = rup(quotesCur * qtc), bookAft = rup(quotesAft * aQtc);
  const salesCur = bookCur * avg, salesAft = bookAft * avg;
  const extra = salesAft - salesCur;
  const extraPct = salesCur ? (salesAft - salesCur) / salesCur : 0;
  const bookNeeded = avg ? rup(target / avg) : 0;
  const qNeedCur = qtc ? rup(bookNeeded / qtc) : 0, qNeedAft = aQtc ? rup(bookNeeded / aQtc) : 0;
  const lNeedCur = ltq ? rup(qNeedCur / ltq) : 0, lNeedAft = aLtq ? rup(qNeedAft / aLtq) : 0;
  const dailyCur = days ? rup(lNeedCur / days) : 0, dailyAft = days ? rup(lNeedAft / days) : 0;
  return {
    leadsMonth, quotesCur, quotesAft, bookCur, bookAft, salesCur, salesAft, extra, extraPct,
    bookNeeded, dailyCur, dailyAft, fewer: dailyCur - dailyAft,
  };
}

/* ---- answered / counting ---- */
function fieldAnswered(f, raw) {
  if (raw == null || raw === "") return false;
  if (f.type === "calc") {
    try { const v = JSON.parse(raw); return !!(v.target && v.avg); } catch (e) { return false; }
  }
  if (f.type === "diary") {
    try { const v = JSON.parse(raw); return Object.values(v).some((x) => String(x).trim()); } catch (e) { return false; }
  }
  if (f.type === "score") {
    try { const v = JSON.parse(raw); return Object.values(v).some((x) => x && x.score); } catch (e) { return false; }
  }
  return String(raw).trim() !== "";
}
function countFields(course) {
  return course.weeks.reduce((n, w) => n + w.sections.reduce((m, s) => m + s.fields.filter((f) => f.type !== "score").length, 0), 0);
}
function countAnswered(course, answers) {
  let n = 0;
  course.weeks.forEach((w) => w.sections.forEach((s) => s.fields.forEach((f) => {
    if (fieldAnswered(f, answers[`${w.id}.${s.id}.${f.id}`])) n++;
  })));
  return n;
}

/* ============================================================
   Styles + theme  (Mark's blue)
   ============================================================ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
.tw-light{
  --bg:#F5F9FC; --surface:#FFFFFF; --surface2:#EEF4FA; --ink:#1B2E3D; --muted:#5C7183;
  --accent:#86B4D9; --accent-strong:#2E5F84; --accent-ink:#2E5F84; --accent-soft:#DCEBF6;
  --on-accent:#12303F; --line:#DCE6EF; --shadow:rgba(20,50,80,.08);
}
.tw-dark{
  --bg:#0E1922; --surface:#16232E; --surface2:#1C2C39; --ink:#E7EEF4; --muted:#9BB0C0;
  --accent:#7FB2D8; --accent-strong:#8FC0E4; --accent-ink:#A9CEE6; --accent-soft:#17313F;
  --on-accent:#0C1E2A; --line:#263A49; --shadow:rgba(0,0,0,.35);
}
.tw-root{ background:var(--bg); color:var(--ink); min-height:100vh;
  font-family:'Inter',ui-sans-serif,system-ui,-apple-system,sans-serif; transition:background .25s,color .25s; }
.tw-serif{ font-family:'Fraunces','Iowan Old Style',Georgia,serif; }
.tw-wrap{ max-width:820px; margin:0 auto; padding:20px 18px 96px; }
.tw-eyebrow{ color:var(--accent-ink); font-weight:600; font-size:12px; letter-spacing:.14em; text-transform:uppercase; }
.tw-card{ background:var(--surface); border:1px solid var(--line); border-radius:16px; box-shadow:0 1px 3px var(--shadow); }
.tw-btn{ font:inherit; font-weight:600; border-radius:11px; padding:11px 18px; border:1px solid var(--line);
  background:var(--surface); color:var(--ink); cursor:pointer; transition:transform .06s, background .2s, border-color .2s; }
.tw-btn:active{ transform:translateY(1px); }
.tw-btn:disabled{ opacity:.45; cursor:not-allowed; }
.tw-primary{ background:var(--accent); border-color:var(--accent); color:var(--on-accent); }
.tw-ghost{ background:transparent; border-color:transparent; color:var(--muted); padding:8px 12px; }
.tw-ghost:hover{ color:var(--ink); }
.tw-input, .tw-area{ width:100%; box-sizing:border-box; font:inherit; color:var(--ink); background:var(--surface2);
  border:1px solid var(--line); border-radius:11px; padding:12px 13px; outline:none; transition:border-color .15s, box-shadow .15s; }
.tw-input:focus, .tw-area:focus{ border-color:var(--accent-strong); box-shadow:0 0 0 3px var(--accent-soft); }
.tw-area{ min-height:96px; resize:vertical; line-height:1.5; }
.tw-label{ font-weight:600; font-size:14px; margin-bottom:7px; display:block; }
.tw-muted{ color:var(--muted); }
.tw-chip{ display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600;
  padding:5px 10px; border-radius:999px; background:var(--accent-soft); color:var(--accent-ink); }
.tw-weeks{ display:flex; gap:8px; overflow-x:auto; padding:4px 2px 8px; -webkit-overflow-scrolling:touch; }
.tw-week{ flex:0 0 auto; padding:9px 14px; border-radius:999px; border:1px solid var(--line);
  background:var(--surface); color:var(--muted); font-weight:600; font-size:13px; cursor:pointer; white-space:nowrap; }
.tw-week.on{ background:var(--accent); border-color:var(--accent); color:var(--on-accent); }
.tw-week.done{ border-color:var(--accent-strong); color:var(--accent-ink); }
.tw-bar{ height:5px; border-radius:999px; background:var(--surface2); overflow:hidden; }
.tw-bar > i{ display:block; height:100%; background:var(--accent-strong); border-radius:999px; transition:width .4s ease; }
.tw-row{ display:flex; align-items:center; justify-content:space-between; gap:12px; }
.tw-iconbtn{ display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px;
  border-radius:11px; border:1px solid var(--line); background:var(--surface); color:var(--ink); cursor:pointer; }
.tw-listitem{ text-align:left; width:100%; background:var(--surface); border:1px solid var(--line);
  border-radius:13px; padding:14px 15px; cursor:pointer; transition:border-color .15s; }
.tw-listitem:hover{ border-color:var(--accent-strong); }
.tw-fade{ animation:twf .3s ease; }
@keyframes twf{ from{ opacity:0; transform:translateY(4px);} to{ opacity:1; transform:none;} }
.tw-tbl{ width:100%; border-collapse:collapse; font-size:14px; }
.tw-tbl th{ background:var(--accent-strong); color:#fff; text-align:left; padding:8px 10px; font-weight:600; font-size:13px; }
.tw-tbl td{ border-bottom:1px solid var(--line); padding:7px 10px; vertical-align:middle; }
.tw-tbl tr:nth-child(even) td{ background:var(--surface2); }
.tw-calcgrid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.tw-stat{ background:var(--accent-soft); border:1px solid var(--line); border-radius:12px; padding:12px 14px; }
.tw-stat b{ font-size:22px; color:var(--accent-ink); display:block; }
.tw-scoredots{ display:flex; gap:6px; }
.tw-dot{ width:34px; height:34px; border-radius:9px; border:1px solid var(--line); background:var(--surface2);
  color:var(--muted); font-weight:600; cursor:pointer; display:grid; place-items:center; }
.tw-dot.on{ background:var(--accent); border-color:var(--accent); color:var(--on-accent); }
.tw-opt{ display:block; width:100%; text-align:left; border:1px solid var(--line); background:var(--surface2);
  border-radius:11px; padding:12px 14px; margin-bottom:8px; cursor:pointer; font:inherit; color:var(--ink); }
.tw-opt.on{ border-color:var(--accent-strong); background:var(--accent-soft); box-shadow:0 0 0 2px var(--accent-soft); }
.tw-seg{ display:flex; background:var(--surface2); border-radius:12px; padding:4px; gap:4px; margin-bottom:16px; }
.tw-seg button{ flex:1; font:inherit; font-weight:600; font-size:14px; border:none; border-radius:9px;
  padding:9px; background:transparent; color:var(--muted); cursor:pointer; }
.tw-seg button.on{ background:var(--surface); color:var(--ink); box-shadow:0 1px 2px var(--shadow); }
@media print{
  .tw-noprint{ display:none !important; }
  .tw-root{ background:#fff; color:#000; }
  .tw-wrap{ max-width:none; padding:0; }
  .tw-card{ box-shadow:none; border:1px solid #ccc; break-inside:avoid; }
}
@media (max-width:640px){ .tw-calcgrid{ grid-template-columns:1fr; } }
@media (prefers-reduced-motion: reduce){ .tw-fade{ animation:none; } .tw-bar > i{ transition:none; } }
`;

/* ============================================================
   Small shared bits
   ============================================================ */
function TopBar({ theme, toggleTheme, right }) {
  return (
    <div className="tw-row tw-noprint" style={{ marginBottom: 18 }}>
      <div className="tw-row" style={{ gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--accent)", display: "grid", placeItems: "center", color: "var(--on-accent)", fontWeight: 700 }} className="tw-serif">M</div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>MW Coaching</div>
      </div>
      <div className="tw-row" style={{ gap: 8 }}>
        {right}
        <button className="tw-iconbtn" onClick={toggleTheme} aria-label="Toggle light or dark theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Welcome + Entry
   ============================================================ */
function Welcome({ theme, toggleTheme, onStart }) {
  const points = [
    "Work through it live during your Zoom sessions.",
    "Your answers save on their own as you type.",
    "Mark sees them in his dashboard, by week.",
  ];
  return (
    <div className="tw-root">
      <div className="tw-wrap" style={{ maxWidth: 460 }}>
        <TopBar theme={theme} toggleTheme={toggleTheme} />
        <div style={{ marginTop: 34 }}>
          <div className="tw-eyebrow">Live workshop workbook</div>
          <h1 className="tw-serif" style={{ fontSize: 36, lineHeight: 1.08, margin: "10px 0 12px", fontWeight: 600 }}>
            Inbound Travel<br />Sales Mastery
          </h1>
          <p className="tw-muted" style={{ margin: "0 0 24px", fontSize: 15.5, lineHeight: 1.55 }}>
            Your companion for the four-week workshop. Read each section, type your answers, and they go straight to your coach.
          </p>
          <div className="tw-card" style={{ padding: 6, marginBottom: 24 }}>
            {points.map((t, i) => (
              <div key={i} className="tw-row" style={{ gap: 12, padding: "13px 14px", borderBottom: i < points.length - 1 ? "1px solid var(--line)" : "none", justifyContent: "flex-start" }}>
                <span style={{ flex: "0 0 auto", width: 26, height: 26, borderRadius: 8, background: "var(--accent-soft)", color: "var(--accent-ink)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>{i + 1}</span>
                <span style={{ fontSize: 14.5 }}>{t}</span>
              </div>
            ))}
          </div>
          <button className="tw-btn tw-primary" style={{ width: "100%" }} onClick={onStart}>Get started</button>
        </div>
      </div>
    </div>
  );
}

function Entry({ theme, toggleTheme, onEnter }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [checking, setChecking] = useState(false);
  useEffect(() => { loadCohorts(); }, []); // warm the cohort list while they type
  async function go() {
    const c = sanitizeCode(code);
    if (!c) return setErr("Enter the code you were given.");
    if (c === sanitizeCode(MASTER_FACILITATOR_CODE)) { onEnter({ role: "facilitator", code: null, name: "Facilitator" }); return; }
    const fClass = facilitatorClassFor(c);
    if (fClass) { onEnter({ role: "facilitator", code: fClass, name: "Facilitator" }); return; }
    if (!name.trim()) return setErr("Enter your name so Mark knows whose answers these are.");
    // Participant: the code must be a cohort Mark has created. Re-check against
    // Supabase before rejecting, so a not-yet-loaded list can't lock anyone out.
    setErr("");
    let known = !!COHORTS[c];
    if (!known) { setChecking(true); await loadCohorts(); known = !!COHORTS[c]; setChecking(false); }
    if (!known) return setErr("That code isn't active. Check it with Mark.");
    onEnter({ role: "participant", code: c, name: name.trim() });
  }
  return (
    <div className="tw-root">
      <div className="tw-wrap" style={{ maxWidth: 460 }}>
        <TopBar theme={theme} toggleTheme={toggleTheme} />
        <div style={{ marginTop: 26, marginBottom: 22 }}>
          <div className="tw-eyebrow">Live workshop</div>
          <h1 className="tw-serif" style={{ fontSize: 34, lineHeight: 1.1, margin: "8px 0 6px", fontWeight: 600 }}>
            Inbound Travel<br />Sales Mastery
          </h1>
          <p className="tw-muted" style={{ margin: 0 }}>Sign in to your workbook. Your answers save straight to Mark.</p>
        </div>
        <div className="tw-card" style={{ padding: 18 }}>
          <label className="tw-label">Your name</label>
          <input className="tw-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sarah Adams" style={{ marginBottom: 14 }} />
          <label className="tw-label">Class code</label>
          <input className="tw-input" value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") go(); }} placeholder="e.g. ITSM-01" style={{ textTransform: "uppercase" }} />
          {err && <p style={{ color: "#D9534F", fontSize: 13, marginTop: 14, marginBottom: 0 }}>{err}</p>}
          <button className="tw-btn tw-primary" style={{ width: "100%", marginTop: 18 }} onClick={go} disabled={checking}>{checking ? "Checking\u2026" : "Open my workbook"}</button>
        </div>
        <p className="tw-muted" style={{ fontSize: 12.5, textAlign: "center", marginTop: 18 }}>
          Information without implementation is just information.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Special field renderers (participant)
   ============================================================ */
function CalcField({ value, onChange }) {
  let v = {};
  try { v = value ? JSON.parse(value) : {}; } catch (e) { v = {}; }
  const set = (k, val) => onChange(JSON.stringify({ ...v, [k]: val }));
  const r = computeCalc(v);
  const numInput = (k, ph) => (
    <input className="tw-input" inputMode="numeric" value={v[k] ?? ""} placeholder={ph}
      onChange={(e) => set(k, e.target.value.replace(/[^0-9.]/g, ""))} />
  );
  const ratioSel = (k, fallback) => (
    <select className="tw-input" value={v[k] ?? fallback ?? ""} onChange={(e) => set(k, e.target.value)}>
      <option value="">—</option>
      {RATIOS.map((x) => <option key={x} value={x}>{Math.round(x * 100)}%</option>)}
    </select>
  );
  return (
    <div>
      <div className="tw-calcgrid">
        <div><label className="tw-label">Monthly sales / commission target (R)</label>{numInput("target", "e.g. 60000")}</div>
        <div><label className="tw-label">Average booking value (R)</label>{numInput("avg", "e.g. 15000")}</div>
        <div><label className="tw-label">Leads per day now</label>{numInput("leadsDay", "e.g. 3")}</div>
        <div><label className="tw-label">Working days per month</label>{numInput("days", "e.g. 20")}</div>
        <div><label className="tw-label">Current lead-to-quote ratio</label>{ratioSel("ltq")}</div>
        <div><label className="tw-label">Current quote-to-close ratio</label>{ratioSel("qtc")}</div>
        <div><label className="tw-label">Target lead-to-quote (after workshop)</label>{ratioSel("aLtq")}</div>
        <div><label className="tw-label">Target quote-to-close (after workshop)</label>{ratioSel("aQtc")}</div>
      </div>

      <h4 style={{ margin: "18px 0 8px", fontSize: 14 }}>Your sales: current vs after workshop</h4>
      <p className="tw-muted" style={{ fontSize: 12.5, margin: "0 0 10px" }}>Lead volume stays the same. This is what sharper ratios are worth.</p>
      <div style={{ overflowX: "auto" }}>
        <table className="tw-tbl">
          <thead><tr><th>Per month</th><th>Current</th><th>After</th></tr></thead>
          <tbody>
            <tr><td>Leads</td><td>{r.leadsMonth}</td><td>{r.leadsMonth}</td></tr>
            <tr><td>Quotes</td><td>{r.quotesCur}</td><td>{r.quotesAft}</td></tr>
            <tr><td>Bookings</td><td>{r.bookCur}</td><td>{r.bookAft}</td></tr>
            <tr><td>Monthly sales</td><td>{fmtR(r.salesCur)}</td><td>{fmtR(r.salesAft)}</td></tr>
          </tbody>
        </table>
      </div>
      <div className="tw-calcgrid" style={{ marginTop: 12 }}>
        <div className="tw-stat"><b>{fmtR(r.extra)}</b><span className="tw-muted" style={{ fontSize: 12.5 }}>Extra sales per month</span></div>
        <div className="tw-stat"><b>{fmtPct(r.extraPct)}</b><span className="tw-muted" style={{ fontSize: 12.5 }}>Uplift on current sales</span></div>
      </div>

      <h4 style={{ margin: "18px 0 8px", fontSize: 14 }}>What you need to hit target</h4>
      <div style={{ overflowX: "auto" }}>
        <table className="tw-tbl">
          <thead><tr><th></th><th>Current</th><th>After</th></tr></thead>
          <tbody>
            <tr><td>Bookings needed / month</td><td>{r.bookNeeded}</td><td>{r.bookNeeded}</td></tr>
            <tr><td>Daily lead target</td><td>{r.dailyCur}</td><td>{r.dailyAft}</td></tr>
          </tbody>
        </table>
      </div>
      <div className="tw-stat" style={{ marginTop: 12 }}>
        <b>{r.fewer} fewer leads a day</b>
        <span className="tw-muted" style={{ fontSize: 12.5 }}>What the workshop saves you in daily hustle to hit the same target</span>
      </div>
    </div>
  );
}

const DIARY_SLOTS = ["07h00 \u2013 07h30","07h30 \u2013 08h00","08h00 \u2013 08h30","08h30 \u2013 09h00","09h00 \u2013 09h30","09h30 \u2013 10h00","10h00 \u2013 10h30","10h30 \u2013 11h00","11h00 \u2013 11h30","11h30 \u2013 12h00","12h00 \u2013 12h30","12h30 \u2013 13h00","13h00 \u2013 13h30","13h30 \u2013 14h00","14h00 \u2013 14h30","14h30 \u2013 15h00","15h00 \u2013 15h30","15h30 \u2013 16h00","16h00 \u2013 16h30","16h30 \u2013 17h00","17h00 \u2013 17h30","17h30 \u2013 18h00"];
const DIARY_DAYS = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
function DiaryField({ value, onChange }) {
  let v = {};
  try { v = value ? JSON.parse(value) : {}; } catch (e) { v = {}; }
  const [day, setDay] = useState("Day 1");
  const dayData = (v[day] && typeof v[day] === "object") ? v[day] : {};
  const set = (slot, val) => onChange(JSON.stringify({ ...v, [day]: { ...dayData, [slot]: val } }));
  const dayHasData = (d) => v[d] && typeof v[d] === "object" && Object.values(v[d]).some((x) => String(x).trim());
  return (
    <div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {DIARY_DAYS.map((d) => (
          <button key={d} type="button" className="tw-seg" onClick={() => setDay(d)}
            style={day === d
              ? { background: "var(--accent-strong)", borderColor: "var(--accent-strong)", color: "#fff" }
              : (dayHasData(d) ? { borderColor: "var(--accent-strong)" } : undefined)}>
            {d}
          </button>
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="tw-tbl">
          <thead><tr><th style={{ width: 130 }}>Time</th><th>Task</th></tr></thead>
          <tbody>
            {DIARY_SLOTS.map((sl) => (
              <tr key={sl}>
                <td style={{ whiteSpace: "nowrap", fontWeight: 600 }}>{sl}</td>
                <td style={{ padding: 4 }}>
                  <input className="tw-input" style={{ padding: "7px 10px" }} value={dayData[sl] || ""} onChange={(e) => set(sl, e.target.value)} placeholder="…" />
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ fontWeight: 600 }}>Notes</td>
              <td style={{ padding: 4 }}><input className="tw-input" style={{ padding: "7px 10px" }} value={dayData["notes"] || ""} onChange={(e) => set("notes", e.target.value)} placeholder="…" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChoiceField({ field, value, onChange }) {
  return (
    <div>
      {field.options.map((opt, i) => (
        <button key={i} type="button" className={`tw-opt ${value === opt ? "on" : ""}`} onClick={() => onChange(opt)}>{opt}</button>
      ))}
    </div>
  );
}

function ScoreField({ field, value, onChange }) {
  let v = {};
  try { v = value ? JSON.parse(value) : {}; } catch (e) { v = {}; }
  const set = (crit, patch) => onChange(JSON.stringify({ ...v, [crit]: { ...(v[crit] || {}), ...patch } }));
  return (
    <div>
      {field.criteria.map((crit, i) => {
        const cur = v[crit] || {};
        return (
          <div key={i} style={{ marginBottom: 14, paddingBottom: 12, borderBottom: i < field.criteria.length - 1 ? "1px solid var(--line)" : "none" }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{crit}</div>
            <div className="tw-scoredots" style={{ marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" className={`tw-dot ${cur.score === n ? "on" : ""}`} onClick={() => set(crit, { score: n })}>{n}</button>
              ))}
            </div>
            <input className="tw-input" style={{ padding: "8px 11px" }} placeholder="Notes to work on (optional)" value={cur.note || ""} onChange={(e) => set(crit, { note: e.target.value })} />
          </div>
        );
      })}
      <p className="tw-muted" style={{ fontSize: 12, margin: 0 }}>Score yourself 1 (low) to 5 (strong).</p>
    </div>
  );
}

function NumberedField({ value, onChange, count }) {
  let v = {}; try { v = value ? JSON.parse(value) : {}; } catch (e) { v = {}; }
  const set = (n, val) => onChange(JSON.stringify({ ...v, [n]: val }));
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 24, textAlign: "right", fontWeight: 600, opacity: 0.6 }}>{n}.</span>
          <input className="tw-input" style={{ flex: 1, padding: "7px 10px" }} value={v[n] || ""} onChange={(e) => set(n, e.target.value)} />
        </div>
      ))}
    </div>
  );
}

function Field({ f, value, onChange }) {
  if (f.type === "calc") return <CalcField value={value} onChange={onChange} />;
  if (f.type === "diary") return <DiaryField value={value} onChange={onChange} />;
  if (f.type === "choice") return <ChoiceField field={f} value={value} onChange={onChange} />;
  if (f.type === "score") return (
    <div>
      <p className="tw-muted" style={{ fontSize: 13, margin: "0 0 6px", fontWeight: 600 }}>Your facilitator will score this role-play on:</p>
      <ul style={{ margin: 0, paddingLeft: 18 }}>{f.criteria.map((c, ci) => <li key={ci} className="tw-muted" style={{ fontSize: 13.5, marginBottom: 3, lineHeight: 1.5 }}>{c}</li>)}</ul>
    </div>
  );
  if (f.type === "numbered") return (<><label className="tw-label">{f.label}</label><NumberedField value={value} onChange={onChange} count={f.count || 12} /></>);
  return (
    <>
      <label className="tw-label">{f.label}</label>
      {f.type === "short"
        ? <input className="tw-input" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Type your answer" />
        : <textarea className="tw-area" rows={f.rows || undefined} style={f.rows ? { minHeight: (f.rows * 1.6) + "em" } : undefined} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="Type your answer" />}
    </>
  );
}

/* ============================================================
   Shared course rendering (used by the participant workbook and
   by Mark's read/write sandbox). Answers are fully controlled by
   the parent, so the same screen works saved or unsaved.
   ============================================================ */
function CourseContent({ course, answers, onChange, wi, setWi, codeLabel, welcomeName, statusChip }) {
  const total = countFields(course);
  const answered = countAnswered(course, answers);
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const week = course.weeks[wi];
  const weekDone = (w) => w.sections.every((s) => s.fields.every((f) => fieldAnswered(f, answers[`${w.id}.${s.id}.${f.id}`])));
  return (
    <>
      <div style={{ marginBottom: 14 }}>
        <div className="tw-eyebrow">{codeLabel}</div>
        <h1 className="tw-serif" style={{ fontSize: 27, margin: "6px 0 2px", fontWeight: 600 }}>{course.title}</h1>
        <div className="tw-row">
          <span className="tw-muted" style={{ fontSize: 13.5 }}>{welcomeName ? "Welcome, " + welcomeName : ""}</span>
          <span className="tw-muted" style={{ fontSize: 13 }}>{answered} of {total} answered</span>
        </div>
        <div className="tw-bar" style={{ marginTop: 8 }}><i style={{ width: pct + "%" }} /></div>
      </div>
      <div className="tw-weeks">
        {course.weeks.map((w, i) => (
          <button key={w.id} className={`tw-week ${i === wi ? "on" : ""} ${weekDone(w) ? "done" : ""}`} onClick={() => setWi(i)}>
            {weekDone(w) && i !== wi ? <Check size={13} style={{ marginRight: 5, verticalAlign: "-2px" }} /> : null}
            Week {i + 1}
          </button>
        ))}
      </div>
      <div className="tw-fade" key={week.id}>
        <div style={{ margin: "14px 2px 16px" }}>
          <h2 className="tw-serif" style={{ fontSize: 21, margin: "0 0 4px", fontWeight: 600 }}>{week.title}</h2>
          <p className="tw-muted" style={{ margin: 0, fontSize: 14 }}>{week.intro}</p>
        </div>
        {week.sections.map((s) => (
          <div key={s.id} className="tw-card" style={{ padding: 18, marginBottom: 14 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 16.5, fontWeight: 600 }}>{s.title}</h3>
            {s.body && (Array.isArray(s.body)
              ? s.body.map((para, bi) => <p key={bi} className="tw-muted" style={{ margin: "0 0 11px", fontSize: 14, lineHeight: 1.6 }}>{para}</p>)
              : <p className="tw-muted" style={{ margin: "0 0 15px", fontSize: 14, lineHeight: 1.55 }}>{s.body}</p>)}
            {s.fields.map((f) => (
              <div key={f.id} style={{ marginBottom: 14 }}>
                <Field f={f} value={answers[`${week.id}.${s.id}.${f.id}`]} onChange={(val) => onChange(`${week.id}.${s.id}.${f.id}`, val)} />
              </div>
            ))}
          </div>
        ))}
        <div className="tw-row" style={{ marginTop: 18 }}>
          <button className="tw-btn" disabled={wi === 0} onClick={() => setWi(Math.max(0, wi - 1))}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowLeft size={16} /> Previous</span>
          </button>
          <span className="tw-chip">{statusChip}</span>
          <button className="tw-btn tw-primary" disabled={wi === course.weeks.length - 1} onClick={() => setWi(Math.min(course.weeks.length - 1, wi + 1))}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>Next <ChevronRight size={16} /></span>
          </button>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   Participant workbook
   ============================================================ */
function Workbook({ session, theme, toggleTheme, onLeave }) {
  const course = courseForCode(session.code);
  const [answers, setAnswers] = useState({});
  const [wi, setWi] = useState(0);
  const [status, setStatus] = useState("idle");
  const [loaded, setLoaded] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    (async () => {
      const raw = await store.get(recordKey(session.code, session.pid), true);
      if (raw) { try { const rec = JSON.parse(raw); setAnswers(rec.answers || {}); } catch (e) {} }
      setLoaded(true);
    })();
  }, [session.code, session.pid]);

  const persist = useCallback(async (next) => {
    setStatus("saving");
    const rec = { pid: session.pid, name: session.name, updatedAt: Date.now(), answers: next };
    await store.set(recordKey(session.code, session.pid), JSON.stringify(rec), true);
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 1400);
  }, [session]);

  function onChange(fieldKey, value) {
    setAnswers((prev) => {
      const next = { ...prev, [fieldKey]: value };
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => persist(next), 900);
      return next;
    });
  }

  const total = countFields(course);
  const answered = countAnswered(course, answers);
  const pct = total ? Math.round((answered / total) * 100) : 0;
  const week = course.weeks[wi];
  const weekDone = (w) => w.sections.every((s) => s.fields.every((f) => fieldAnswered(f, answers[`${w.id}.${s.id}.${f.id}`])));

  return (
    <div className="tw-root">
      <div className="tw-wrap">
        <TopBar theme={theme} toggleTheme={toggleTheme}
          right={<button className="tw-ghost tw-btn" onClick={onLeave}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LogOut size={15} /> Leave</span></button>} />
<CourseContent
          course={course}
          answers={answers}
          onChange={onChange}
          wi={wi}
          setWi={setWi}
          codeLabel="Live workshop"
          welcomeName={session.name.split(" ")[0]}
          statusChip={status === "saving" ? "Saving…" : status === "saved" ? <><Check size={13} /> Saved for Mark</> : "Saves as you type"}
        />
      </div>
    </div>
  );
}

/* ============================================================
   Facilitator: read one participant's answer nicely
   ============================================================ */
function ReadValue({ f, raw }) {
  if (f.type === "calc") {
    let v = {}; try { v = JSON.parse(raw); } catch (e) {}
    const r = computeCalc(v);
    return (
      <div className="tw-muted" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
        Target {fmtR(v.target)} · avg booking {fmtR(v.avg)} · {v.leadsDay || 0} leads/day · ratios {fmtPct(+v.ltq || 0)}→{fmtPct(+v.aLtq || +v.ltq || 0)} and {fmtPct(+v.qtc || 0)}→{fmtPct(+v.aQtc || +v.qtc || 0)}.
        <br /><b>Current sales {fmtR(r.salesCur)} → after {fmtR(r.salesAft)}</b> ({fmtR(r.extra)}, {fmtPct(r.extraPct)}). {r.fewer} fewer leads/day needed.
      </div>
    );
  }
  if (f.type === "numbered") {
    let v = {}; try { v = JSON.parse(raw); } catch (e) {}
    const rows = Object.entries(v).filter(([k, val]) => String(val).trim());
    if (!rows.length) return <div className="tw-muted" style={{ fontSize: 13.5 }}>\u2014</div>;
    return <div className="tw-muted" style={{ fontSize: 13.5 }}>{rows.map(([k, val]) => <div key={k}>{k}. {val}</div>)}</div>;
  }
  if (f.type === "diary") {
    let v = {}; try { v = JSON.parse(raw); } catch (e) {}
    const days = [];
    Object.entries(v).forEach(([day, data]) => {
      if (data && typeof data === "object") {
        const filled = Object.entries(data).filter(([k, val]) => String(val).trim());
        if (filled.length) days.push([day, filled]);
      }
    });
    if (!days.length) return <div className="tw-muted" style={{ fontSize: 13.5 }}>—</div>;
    return (
      <div className="tw-muted" style={{ fontSize: 13.5 }}>
        {days.map(([day, filled]) => (
          <div key={day} style={{ marginBottom: 6 }}>
            <b>{day}</b>
            {filled.map(([k, val]) => <div key={k}>{k === "notes" ? "Notes" : k}: {val}</div>)}
          </div>
        ))}
      </div>
    );
  }
  if (f.type === "choice") return <div style={{ fontSize: 14 }}>{raw}</div>;
  if (f.type === "score") {
    let v = {}; try { v = JSON.parse(raw); } catch (e) {}
    return (
      <div style={{ fontSize: 13.5 }}>
        {Object.entries(v).map(([crit, val]) => (
          <div key={crit} style={{ marginBottom: 3 }}><b>{val.score || "–"}/5</b> {crit}{val.note ? <span className="tw-muted"> — {val.note}</span> : null}</div>
        ))}
      </div>
    );
  }
  return <div style={{ whiteSpace: "pre-wrap", fontSize: 14 }}>{raw}</div>;
}

/* ============================================================
   Facilitator dashboard  (answers + private assessment + report)
   ============================================================ */
function Dashboard({ session, theme, toggleTheme, onLeave }) {
  const course = courseForCode(session.code);
  const [people, setPeople] = useState([]);
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("answers"); // answers | assess | report
  const [assess, setAssess] = useState({ weeks: {}, scores: {}, overall: "", company: "", manager: "", date: "", recommendation: "" });
  const [aStatus, setAStatus] = useState("idle");
  const aTimer = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    const keys = await store.list(`resp:${session.code}:`, true);
    const recs = [];
    for (const k of keys) {
      const raw = await store.get(k, true);
      if (!raw) continue;
      try { recs.push(JSON.parse(raw)); } catch (e) {}
    }
    recs.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    setPeople(recs);
    setLoading(false);
  }, [session.code]);
  useEffect(() => { load(); }, [load]);

  // load this participant's assessment when opened
  useEffect(() => {
    if (!sel) return;
    setTab("answers");
    (async () => {
      const raw = await store.get(assessKey(session.code, sel.pid), true);
      const blank = { weeks: {}, overall: "", company: "", manager: "", date: "", recommendation: "" };
      if (raw) { try { setAssess({ ...blank, ...JSON.parse(raw) }); } catch (e) { setAssess(blank); } }
      else setAssess(blank);
    })();
  }, [sel, session.code]);

  const saveAssess = useCallback(async (next) => {
    if (!sel) return;
    setAStatus("saving");
    await store.set(assessKey(session.code, sel.pid), JSON.stringify(next), true);
    setAStatus("saved");
    setTimeout(() => setAStatus("idle"), 1400);
  }, [sel, session.code]);

  function setScore(sid, crit, patch) {
    const cur = (assess.scores && assess.scores[sid]) || {};
    editAssess({ scores: { [sid]: { ...cur, [crit]: { ...(cur[crit] || {}), ...patch } } } });
  }

  function editAssess(patch) {
    setAssess((prev) => {
      const next = { ...prev, ...patch, weeks: { ...prev.weeks, ...(patch.weeks || {}) }, scores: { ...prev.scores, ...(patch.scores || {}) } };
      if (aTimer.current) clearTimeout(aTimer.current);
      aTimer.current = setTimeout(() => saveAssess(next), 900);
      return next;
    });
  }

  const total = countFields(course);

  return (
    <div className="tw-root">
      <div className="tw-wrap">
        <TopBar theme={theme} toggleTheme={toggleTheme}
          right={<button className="tw-ghost tw-btn" onClick={onLeave}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowLeft size={15} /> Back</span></button>} />

        {!sel && (
          <>
            <div className="tw-row" style={{ marginBottom: 14 }}>
              <div>
                <div className="tw-eyebrow">Facilitator view</div>
                <h1 className="tw-serif" style={{ fontSize: 26, margin: "6px 0 2px", fontWeight: 600 }}>{labelForCode(session.code)}</h1>
                <p className="tw-muted" style={{ margin: 0, fontSize: 13.5 }}>{people.length} {people.length === 1 ? "participant" : "participants"} signed in</p>
              </div>
              <button className="tw-iconbtn" onClick={load} aria-label="Refresh"><RefreshCw size={18} /></button>
            </div>
            {loading ? (
              <div className="tw-card tw-muted" style={{ padding: 22, textAlign: "center" }}>Loading answers…</div>
            ) : people.length === 0 ? (
              <div className="tw-card" style={{ padding: 24, textAlign: "center" }}>
                <Users size={26} style={{ color: "var(--accent-strong)" }} />
                <p style={{ margin: "10px 0 4px", fontWeight: 600 }}>No participants yet</p>
                <p className="tw-muted" style={{ margin: 0, fontSize: 14 }}>Share the class code <b>{session.code}</b>. Answers land here as they type. Tap refresh to update.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {people.map((p) => {
                  const done = countAnswered(course, p.answers || {});
                  const pct = total ? Math.round((done / total) * 100) : 0;
                  return (
                    <button key={p.pid} className="tw-listitem" onClick={() => setSel(p)}>
                      <div className="tw-row"><span style={{ fontWeight: 600 }}>{p.name}</span><span className="tw-chip">{pct}%</span></div>
                      <div className="tw-bar" style={{ marginTop: 10 }}><i style={{ width: pct + "%" }} /></div>
                      <div className="tw-muted" style={{ fontSize: 12, marginTop: 8 }}>{done} of {total} answered</div>
                    </button>
                  );
                })}
              </div>
            )}
            <p className="tw-muted" style={{ fontSize: 12, textAlign: "center", marginTop: 20 }}>Answers refresh when you tap the refresh button.</p>
          </>
        )}

        {sel && (
          <div className="tw-fade">
            <button className="tw-ghost tw-btn tw-noprint" onClick={() => setSel(null)} style={{ marginBottom: 8, paddingLeft: 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowLeft size={16} /> All participants</span>
            </button>
            <h1 className="tw-serif" style={{ fontSize: 24, margin: "0 0 14px", fontWeight: 600 }}>{sel.name}</h1>

            <div className="tw-seg tw-noprint">
              <button className={tab === "answers" ? "on" : ""} onClick={() => setTab("answers")}>Their answers</button>
              <button className={tab === "assess" ? "on" : ""} onClick={() => setTab("assess")}>My assessment</button>
              <button className={tab === "report" ? "on" : ""} onClick={() => setTab("report")}>Report</button>
            </div>

            {/* ---- their answers ---- */}
            {tab === "answers" && course.weeks.map((w) => {
              const rows = [];
              w.sections.forEach((s) => s.fields.forEach((f) => {
                const raw = (sel.answers || {})[`${w.id}.${s.id}.${f.id}`];
                if (fieldAnswered(f, raw)) rows.push({ f, label: f.label || s.title, raw });
              }));
              if (!rows.length) return null;
              return (
                <div key={w.id} style={{ marginBottom: 18 }}>
                  <div className="tw-eyebrow" style={{ marginBottom: 8 }}>{w.title}</div>
                  {rows.map((r, i) => (
                    <div key={i} className="tw-card" style={{ padding: 14, marginBottom: 10 }}>
                      <div className="tw-muted" style={{ fontSize: 12.5, marginBottom: 5 }}>{r.label}</div>
                      <ReadValue f={r.f} raw={r.raw} />
                    </div>
                  ))}
                </div>
              );
            })}

            {/* ---- Mark's private assessment ---- */}
            {tab === "assess" && (
              <div>
                <p className="tw-muted" style={{ fontSize: 13.5, marginTop: 0 }}>Private to you. Participants never see this. Everything here flows into the management report on the next tab.</p>
                <div className="tw-card" style={{ padding: 16, marginBottom: 12 }}>
                  <label className="tw-label">Report details</label>
                  <div className="tw-calcgrid">
                    <div><input className="tw-input" placeholder="Company / organisation" value={assess.company || ""} onChange={(e) => editAssess({ company: e.target.value })} /></div>
                    <div><input className="tw-input" placeholder="Attention (manager, optional)" value={assess.manager || ""} onChange={(e) => editAssess({ manager: e.target.value })} /></div>
                    <div><input className="tw-input" placeholder="Date (e.g. 15 March 2026)" value={assess.date || ""} onChange={(e) => editAssess({ date: e.target.value })} /></div>
                  </div>
                </div>
                {course.weeks.map((w, i) => (
                  <div key={w.id} className="tw-card" style={{ padding: 16, marginBottom: 12 }}>
                    <label className="tw-label">Module {i + 1}: {w.title}</label>
                    <textarea className="tw-area" placeholder="How did they do in this module?" value={assess.weeks[w.id] || ""}
                      onChange={(e) => editAssess({ weeks: { [w.id]: e.target.value } })} />
                  </div>
                ))}
                {course.weeks.some((w) => w.sections.some((se) => se.kind === "score")) && (
                  <label className="tw-label" style={{ display: "block", margin: "6px 2px 8px" }}>Role-play scores</label>
                )}
                {course.weeks.map((w) => w.sections.filter((se) => se.kind === "score").map((se) => {
                  const crits = (se.fields[0] && se.fields[0].criteria) || [];
                  return (
                    <div key={se.id} className="tw-card" style={{ padding: 16, marginBottom: 12 }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 10 }}>{se.title}</div>
                      {crits.map((crit, ci) => {
                        const cur = ((assess.scores || {})[se.id] || {})[crit] || {};
                        return (
                          <div key={ci} style={{ marginBottom: 12, paddingBottom: 10, borderBottom: ci < crits.length - 1 ? "1px solid var(--line)" : "none" }}>
                            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{crit}</div>
                            <div className="tw-scoredots" style={{ marginBottom: 8 }}>
                              {[1, 2, 3, 4, 5].map((n) => (
                                <button key={n} type="button" className={`tw-dot ${cur.score === n ? "on" : ""}`} onClick={() => setScore(se.id, crit, { score: n })}>{n}</button>
                              ))}
                            </div>
                            <input className="tw-input" style={{ padding: "8px 11px" }} placeholder="Notes (optional)" value={cur.note || ""} onChange={(e) => setScore(se.id, crit, { note: e.target.value })} />
                          </div>
                        );
                      })}
                    </div>
                  );
                }))}
                <div className="tw-card" style={{ padding: 16, marginBottom: 12, borderColor: "var(--accent-strong)" }}>
                  <label className="tw-label">Overall assessment</label>
                  <textarea className="tw-area" placeholder="Your overall view of this participant across the course." value={assess.overall || ""}
                    onChange={(e) => editAssess({ overall: e.target.value })} />
                </div>
                <div className="tw-card" style={{ padding: 16, marginBottom: 12 }}>
                  <label className="tw-label">Recommendation / next steps (optional)</label>
                  <textarea className="tw-area" placeholder="What you would suggest for this person going forward." value={assess.recommendation || ""}
                    onChange={(e) => editAssess({ recommendation: e.target.value })} />
                </div>
                <span className="tw-chip">{aStatus === "saving" ? "Saving…" : aStatus === "saved" ? <><Check size={13} /> Saved</> : "Saves as you type"}</span>
              </div>
            )}

            {/* ---- printable report for management ---- */}
            {tab === "report" && (() => {
              const totalF = countFields(course);
              const done = countAnswered(course, sel.answers || {});
              const pct = totalF ? Math.round((done / totalF) * 100) : 0;
              return (
              <div>
                <button className="tw-btn tw-primary tw-noprint" style={{ marginBottom: 14 }} onClick={() => window.print()}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Printer size={16} /> Print / save as PDF</span>
                </button>
                <div className="tw-card" style={{ padding: 26 }}>
                  {/* header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "3px solid var(--accent)", paddingBottom: 12, marginBottom: 16 }}>
                    <div className="tw-serif" style={{ width: 40, height: 40, borderRadius: 10, background: "var(--accent)", color: "var(--on-accent)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 20 }}>M</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "var(--accent-ink)" }}>MW COACHING</div>
                      <div className="tw-muted" style={{ fontSize: 12 }}>Mark Wyngaard · Head Coach</div>
                    </div>
                  </div>

                  <div className="tw-eyebrow">Participant Feedback Report</div>
                  <h2 className="tw-serif" style={{ fontSize: 24, margin: "6px 0 10px", fontWeight: 600 }}>{sel.name}</h2>

                  {/* meta */}
                  <div style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 16 }}>
                    {assess.company ? <div><b>Prepared for:</b> {assess.company}</div> : null}
                    {assess.manager ? <div><b>Attention:</b> {assess.manager}</div> : null}
                    <div><b>Programme:</b> {course.title}</div>
                    <div><b>Cohort:</b> {labelForCode(session.code)}</div>
                    {assess.date ? <div><b>Date:</b> {assess.date}</div> : null}
                    <div><b>Engagement:</b> completed {done} of {totalF} workbook sections ({pct}%)</div>
                  </div>

                  <p style={{ fontSize: 14, lineHeight: 1.6, margin: "0 0 18px" }}>
                    The following summarises {sel.name.split(" ")[0]}'s participation and development across the four-week Inbound Travel Sales Mastery programme, module by module, with an overall assessment and recommendation.
                  </p>

                  {/* module feedback */}
                  {course.weeks.map((w, i) => (
                    <div key={w.id} style={{ marginBottom: 13, breakInside: "avoid" }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--accent-ink)", marginBottom: 3 }}>Module {i + 1}: {w.title}</div>
                      <div style={{ fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>{assess.weeks[w.id] || <span className="tw-muted">No specific notes recorded for this module.</span>}</div>
                    </div>
                  ))}

                  {course.weeks.map((w) => w.sections.filter((se) => se.kind === "score")).flat().some((se) => Object.values((assess.scores || {})[se.id] || {}).some((x) => x && x.score)) && (
                    <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)", breakInside: "avoid" }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--accent-ink)", marginBottom: 6 }}>Role-play scores</div>
                      {course.weeks.map((w) => w.sections.filter((se) => se.kind === "score").map((se) => {
                        const sc = (assess.scores || {})[se.id] || {};
                        const rows = ((se.fields[0] && se.fields[0].criteria) || []).filter((c) => sc[c] && sc[c].score);
                        if (!rows.length) return null;
                        return (
                          <div key={se.id} style={{ marginBottom: 9, breakInside: "avoid" }}>
                            <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 2 }}>{se.title}</div>
                            {rows.map((c, ci) => (
                              <div key={ci} style={{ fontSize: 13.5, display: "flex", justifyContent: "space-between", gap: 12 }}>
                                <span>{c}{sc[c].note ? " \u2014 " + sc[c].note : ""}</span><span style={{ fontWeight: 600 }}>{sc[c].score}/5</span>
                              </div>
                            ))}
                          </div>
                        );
                      }))}
                    </div>
                  )}

                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)", breakInside: "avoid" }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--accent-ink)", marginBottom: 3 }}>Overall assessment</div>
                    <div style={{ fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>{assess.overall || <span className="tw-muted">—</span>}</div>
                  </div>

                  {assess.recommendation ? (
                    <div style={{ marginTop: 14, breakInside: "avoid" }}>
                      <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--accent-ink)", marginBottom: 3 }}>Recommendation &amp; next steps</div>
                      <div style={{ fontSize: 14, whiteSpace: "pre-wrap", lineHeight: 1.55 }}>{assess.recommendation}</div>
                    </div>
                  ) : null}

                  {/* sign-off */}
                  <div style={{ marginTop: 22, paddingTop: 14, borderTop: "1px solid var(--line)", fontSize: 13 }}>
                    <div style={{ fontWeight: 600 }}>Mark Wyngaard</div>
                    <div className="tw-muted">Head Coach, MW Coaching</div>
                    <div className="tw-muted">062 404 5744 · mark@markwyngaard.com · www.markwyngaard.com</div>
                  </div>
                </div>
                <p className="tw-muted tw-noprint" style={{ fontSize: 12, marginTop: 12 }}>Fill in the company, attention and date on the “My assessment” tab so the report is addressed correctly before you send it.</p>
              </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Root
   ============================================================ */
/* ============================================================
   Facilitator home: cohort manager (master login).
   Lists every cohort, opens one into the existing Dashboard,
   and creates new cohorts with an auto-generated code.
   ============================================================ */
function FacilitatorHome({ session, theme, toggleTheme, onLeave }) {
  const [cohorts, setCohorts] = useState([]);
  const [active, setActive] = useState(session.code || null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [justAdded, setJustAdded] = useState("");
  const [view, setView] = useState("cohorts"); // "cohorts" | "material"
  const [sandboxAnswers, setSandboxAnswers] = useState({});
  const [sandboxWi, setSandboxWi] = useState(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    await loadCohorts();
    const list = Object.keys(COHORTS).map((code) => ({ code, label: COHORTS[code].label || code }));
    list.sort((a, b) => cohortNum(a.code) - cohortNum(b.code) || a.code.localeCompare(b.code));
    setCohorts(list);
    setLoading(false);
  }, []);
  useEffect(() => { refresh(); }, [refresh]);

  async function onAdd() {
    setAdding(true);
    try {
      const c = await addCohort();
      setJustAdded(c.code);
      await refresh();
      setTimeout(() => setJustAdded(""), 6000);
    } finally { setAdding(false); }
  }

  if (active) {
    return <Dashboard session={{ ...session, code: active }} theme={theme} toggleTheme={toggleTheme} onLeave={() => setActive(null)} />;
  }

  return (
    <div className="tw-root">
      <div className="tw-wrap">
        <TopBar theme={theme} toggleTheme={toggleTheme}
          right={<button className="tw-ghost tw-btn" onClick={onLeave}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LogOut size={15} /> Sign out</span></button>} />
        <div className="tw-weeks" style={{ marginBottom: 16 }}>
          <button className={`tw-week ${view === "cohorts" ? "on" : ""}`} onClick={() => setView("cohorts")}>Cohorts</button>
          <button className={`tw-week ${view === "material" ? "on" : ""}`} onClick={() => setView("material")}>Course material</button>
        </div>

        {view === "cohorts" ? (
          <>
        <div className="tw-row" style={{ marginBottom: 14 }}>
          <div>
            <div className="tw-eyebrow">Facilitator</div>
            <h1 className="tw-serif" style={{ fontSize: 26, margin: "6px 0 2px", fontWeight: 600 }}>Your cohorts</h1>
            <p className="tw-muted" style={{ margin: 0, fontSize: 13.5 }}>Open a cohort to see its responses, or start a new one.</p>
          </div>
          <button className="tw-iconbtn" onClick={refresh} aria-label="Refresh"><RefreshCw size={18} /></button>
        </div>

        {justAdded && (
          <div className="tw-card" style={{ padding: 14, marginBottom: 12, borderColor: "var(--accent-strong)" }}>
            <p style={{ margin: 0, fontWeight: 600 }}>New cohort created: {justAdded}</p>
            <p className="tw-muted" style={{ margin: "4px 0 0", fontSize: 13.5 }}>Share this code with that group. It is their sign-in code.</p>
          </div>
        )}

        {loading ? (
          <div className="tw-card tw-muted" style={{ padding: 22, textAlign: "center" }}>Loading cohorts…</div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {cohorts.map((c) => (
              <button key={c.code} className="tw-listitem" onClick={() => setActive(c.code)}>
                <div className="tw-row"><span style={{ fontWeight: 600 }}>{c.label}</span><span className="tw-chip">{c.code}</span></div>
                <div className="tw-muted" style={{ fontSize: 12, marginTop: 8 }}>Tap to view responses</div>
              </button>
            ))}
          </div>
        )}

        <button className="tw-btn tw-primary" style={{ width: "100%", marginTop: 16 }} onClick={onAdd} disabled={adding || loading}>
          {adding ? "Creating…" : "+ New cohort"}
        </button>
        <p className="tw-muted" style={{ fontSize: 12, textAlign: "center", marginTop: 12 }}>
          Each new cohort gets the next code automatically. Students never see this screen.
        </p>
          </>
        ) : (
          <>
            <div className="tw-card" style={{ padding: "11px 14px", marginBottom: 14, borderColor: "var(--accent-strong)" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13.5 }}>Course material (sandbox)</p>
              <p className="tw-muted" style={{ margin: "3px 0 0", fontSize: 12.5 }}>Exactly what participants see. Try anything you like, nothing here is saved.</p>
            </div>
            <CourseContent
              course={COURSES["inbound-travel"]}
              answers={sandboxAnswers}
              onChange={(k, val) => setSandboxAnswers((prev) => ({ ...prev, [k]: val }))}
              wi={sandboxWi}
              setWi={setSandboxWi}
              codeLabel="Course material"
              welcomeName={null}
              statusChip="Nothing is saved"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [screen, setScreen] = useState("welcome"); // welcome | entry | app
  const [session, setSession] = useState(null);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    (async () => {
      const t = await store.get("theme");
      if (t) setTheme(t);
      loadCohorts();
      const s = await store.get("session");
      if (s) { try { const parsed = JSON.parse(s); setSession(parsed); setScreen("app"); } catch (e) {} }
    })();
  }, []);
  useEffect(() => { store.set("theme", theme); }, [theme]);

  function enter(sess) {
    const withPid = sess.role === "participant"
      ? { ...sess, pid: sanitizeCode(sess.name).slice(0, 24) || "P" + Date.now() }
      : sess;
    setSession(withPid);
    store.set("session", JSON.stringify(withPid));
    setScreen("app");
  }
  function leave() {
    setSession(null);
    store.del("session");
    setScreen("entry");
  }

  return (
    <div className={theme === "dark" ? "tw-dark" : "tw-light"}>
      <style>{CSS}</style>
      {screen === "welcome" && <Welcome theme={theme} toggleTheme={toggleTheme} onStart={() => setScreen("entry")} />}
      {screen === "entry" && <Entry theme={theme} toggleTheme={toggleTheme} onEnter={enter} />}
      {screen === "app" && session && session.role === "facilitator" && <FacilitatorHome session={session} theme={theme} toggleTheme={toggleTheme} onLeave={leave} />}
      {screen === "app" && session && session.role === "participant" && <Workbook session={session} theme={theme} toggleTheme={toggleTheme} onLeave={leave} />}
    </div>
  );
}
