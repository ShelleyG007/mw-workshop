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
          "body": [
            "Your role: an expert inbound travel agent.",
            "The client: a fast speaking International traveller enquiring about a 10-day trip to Cape Town and Kruger. Enthusiastic, but defensive about sharing budget not sure where to go first and worried about safety.",
            "Your job: uncover the true budget range, identify all decision-makers, and establish the emotional motivation using deep listening, backtracking, mirroring & pacing."
          ],
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Uncovered \u201cWhy now?\u201d",
                "Budget clarified smoothly",
                "Identified all decision-makers",
                "Deep listening, Backtracking, Pace and tone matching"
              ]
            }
          ]
        },
        {
          "id": "roleplay2b",
          "kind": "score",
          "title": "Role-play: the Discovery Call \u00b7 Brief 2",
          "body": [
            "Your role: an expert inbound travel agent.",
            "The client: a slow laid back speaking International traveller enquiring about a 15-day trip to Botswana & Kruger. Not clear on travel dates or how many travellers, has budget of R150k. Says he will call you back.",
            "Your job: uncover the true budget range, identify all decision-makers, and establish the emotional motivation using deep listening, backtracking, mirroring & pacing."
          ],
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Uncovered \u201cWhy now?\u201d",
                "Budget clarified smoothly",
                "Identified all decision-makers",
                "Deep listening, Backtracking, Pace and tone matching"
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
          "body": [
            "Your role: an inbound consultant presenting a premium, customised R150,000 itinerary.",
            "The client: an international traveller who loves the plan but says they found a similar route online 15% cheaper, and wants to think it over with their partner.",
            "Your job: defend your premium pricing, match their needs, expose the risks of shopping around, and secure a firm, scheduled date for the next conversation."
          ],
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Avoided panic discounting",
                "Matched needs",
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
          "body": [
            "Your role: an inbound consultant presenting a premium, customised R250,000 itinerary.",
            "The client: an international traveller who believes his partner will object because its to hot in Africa loves the plan but says they found a similar route online 15% cheaper, and wants to think it over with friends.",
            "Your job: defend your premium pricing, match their needs, expose the risks of shopping around, and secure a firm, scheduled date for the next conversation."
          ],
          "fields": [
            {
              "id": "score",
              "type": "score",
              "criteria": [
                "Avoided panic discounting",
                "Matched needs",
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
          "body": [
            "Your role: a confident luxury travel advisor selling a high-margin premium safari package.",
            "The client: a wealthy corporate executive challenging the price: \u201cI can book these identical hotels directly on Booking.com myself.\u201d",
            "Your job: counter the objection without apologising for the price, shifting the conversation from hotel rates to an integrated, safe and stress-free experience."
          ],
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
const MW_LOGO = "data:image/png;base64,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";

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
                    <img src={MW_LOGO} alt="Mark Wyngaard" style={{ height: 46, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }} />
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
                  </div>
                  <div style={{ marginTop: 18, background: "#1F4D78", color: "#ffffff", borderRadius: 8, padding: "12px 16px", textAlign: "center", fontSize: 12.5, letterSpacing: 0.2, WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>
                    +27 62 404 5744 &#160;·&#160; mark@markwyngaard.com &#160;·&#160; www.markwyngaard.com
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
