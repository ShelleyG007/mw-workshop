# Getting your app online (no coding needed)

You'll set up two free accounts and copy a few values between them.
Take it slowly, top to bottom. About 20 minutes.

Two things you'll need to copy later, so keep a note open:
  • Supabase URL
  • Supabase anon key

------------------------------------------------------------
## PART 1 — Supabase (this stores everyone's answers)
------------------------------------------------------------
1. Go to supabase.com and sign up (free). Verify your email.
2. Click "New project".
     - Name: mw-workshop
     - Database password: make one up and save it somewhere.
     - Region: pick the closest to South Africa.
     - Click "Create new project" and wait ~2 minutes.
3. On the left, click "SQL Editor" → "New query".
     - Open the file "supabase_setup.sql" from this folder.
     - Copy everything in it, paste into the box, click "Run".
     - It should say Success.
4. On the left, click the gear "Project Settings" → "API".
     - Copy "Project URL"  → paste into your note.
     - Copy "anon public" key → paste into your note.

------------------------------------------------------------
## PART 2 — GitHub (this holds your app files)
------------------------------------------------------------
1. Go to github.com and sign up (free).
2. Top-right "+" → "New repository".
     - Name: mw-workshop
     - Click "Create repository".
3. On the next page, click the link "uploading an existing file".
4. Open this app folder on your computer. Select EVERYTHING in it
   (all the files AND the "src" folder) and drag it into the browser.
   Wait for the uploads to finish, then click "Commit changes".
   (Do not worry about anything called node_modules — it isn't here.)

------------------------------------------------------------
## PART 3 — Vercel (this makes it live on the internet)
------------------------------------------------------------
1. Go to vercel.com → Sign up → choose "Continue with GitHub".
2. Click "Add New..." → "Project".
3. Find "mw-workshop" in the list → click "Import".
4. Open the "Environment Variables" section and add these two
   (type the name, paste the value, click Add, for each):

     Name:  VITE_SUPABASE_URL
     Value: (your Supabase URL from your note)

     Name:  VITE_SUPABASE_ANON_KEY
     Value: (your Supabase anon key from your note)

5. Click "Deploy". Wait ~1 minute.
   You'll get a live link like  mw-workshop.vercel.app  — that's your app.

------------------------------------------------------------
## USING IT
------------------------------------------------------------
• Share the live link + class code  ITSM-01  with participants.
• Mark opens the same link and types  MW-VIEW-01  to reach his dashboard.
• Everyone's answers now sync across all their devices.

------------------------------------------------------------
## CHANGING IT LATER
------------------------------------------------------------
When I send you an updated app file, in GitHub open the "src" folder,
click the file, click the pencil (edit), paste the new version, "Commit".
Vercel updates the live site on its own in about a minute.
The link stays the same and no answers are lost.

------------------------------------------------------------
## IF THE PAGE IS BLANK
------------------------------------------------------------
Almost always the two environment variables. In Vercel:
Project → Settings → Environment Variables. Check both names are spelled
exactly as above and the values have no extra spaces. Then
Deployments → the latest one → "..." → "Redeploy".
