# Prompt: Convert Scripture Union PDF (Page 1) directly into `daily-devotion-passages.json`

## Goal
Given the uploaded **2026 Scripture Union QT Passages PDF**, extract the **daily reading schedule from Page 1** and output a JSON file **matching the exact structure** of `daily-devotion-passages.json`.

Reference JSON structure (must match):
- Top-level object with string keys `"0"` through `"11"`
- Each key maps to an array of strings (one string per day)
- Strings use **full English book names** + chapter/verse ranges
- No extra fields, no commentary, no markdown — output **JSON only**

---

## Critical Requirement: FULL YEAR MUST BE COMPLETED

⚠️ The JSON MUST include:
- All 12 months (`"0"` through `"11"`)
- Every single day from January 1 through December 31
- No empty arrays
- No missing months
- No partial output

If any month is incomplete or empty, the output is invalid.

Each month must contain the exact number of entries for 2026:
- January (31)
- February (28)
- March (31)
- April (30)
- May (31)
- June (30)
- July (31)
- August (31)
- September (30)
- October (31)
- November (30)
- December (31)

Total entries across all months must equal **365 passages**.

---

## What to read from the PDF
1. Read **ONLY Page 1** of the PDF (the calendar-like year table titled “2026년 매일성경 읽기표”).
2. Extract the **daily passages** for **January–December** exactly as listed.
3. Ignore:
   - Any content from Pages 2–3
   - Logos, website URLs, and descriptive blurbs
   - Any checkboxes or decorative symbols

---

## Output JSON schema
Create a JSON object with month indexes:
- `"0"` = January
- `"1"` = February
- `"2"` = March
- `"3"` = April
- `"4"` = May
- `"5"` = June
- `"6"` = July
- `"7"` = August
- `"8"` = September
- `"9"` = October
- `"10"` = November
- `"11"` = December

Example shape:
{
  "0": ["Genesis 1:1-13", "..."],
  "1": ["John 1:1-18", "..."],
  ...
  "11": ["Isaiah 43:1-13", "..."]
}

---

## Normalization rules (important)

### 1) Passage strings
Each entry must be a single string:
"<Book Name> <chapter>:<start>-<end>"

Use full English book names (NOT abbreviations):
- Gen → Genesis
- John → John
- 1 Cor → 1 Corinthians
- 2 Cor → 2 Corinthians
- Ps / 시편 → Psalms
- Isa / 사 / 이사야 → Isaiah
- Judg / 삿 / 사사기 → Judges
- James / 약 / 야고보서 → James

Preserve verse ranges exactly as shown.

### 2) Special day notes
If the PDF includes notes like `(부활절)` or `(성탄절)`:
- Remove the note
- Keep only the passage reference

Example:
John 20:1-18(부활절) → "John 20:1-18"

### 3) Multi-part notes
If extra commentary appears (e.g., `+가상칠언`), remove it.

Example:
John 19:28-30+가상칠언 → "John 19:28-30"

### 4) Ordering
- Maintain exact chronological order
- Do not merge, split, or reorder entries

---

## File Output Requirement

The final result must:
1. Be valid, parseable JSON
2. Be saved as a downloadable file named:

daily-devotion-passages.json

Do NOT return markdown.
Do NOT return explanation text.
Return only the JSON content intended for the file.

---

## Validation Checklist (before final answer)

- Keys include ALL "0" through "11"
- Each month contains the exact correct number of entries
- Total entries = 365
- No empty months
- No trailing spaces
- Valid JSON format
