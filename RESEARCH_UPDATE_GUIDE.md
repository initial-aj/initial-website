# Research Articles Update Guide

## 📋 How to Update Research Articles

### Quick Steps:
1. Open `/app/insights/page.tsx` in VS Code
2. Find the `researchPapers` array (line ~33)
3. Add new articles or update existing ones
4. Commit and push to production

---

## 📝 Article Template

Copy this template to add a new research paper:

```javascript
{
  id: 11, // Increment the ID
  title: "Your Article Title Here",
  source: "Source Name (e.g., a16z Crypto)",
  author: "Author Name(s)",
  publishDate: "2024-01-20", // Format: YYYY-MM-DD
  category: "Category Name", // See categories below
  summary: "Brief summary of the article. 2-3 sentences explaining what the research covers and why it's important.",
  url: "https://link-to-article.com",
},
```

---

## 🏷️ Available Categories:

- AI & Infrastructure
- Bitcoin & Layer 2
- DeFi & Security
- DeFi & Staking
- Infrastructure
- RWA & Tokenization
- Infrastructure & Privacy
- DeFi & Trading
- Infrastructure & UX

**Note:** You can create new categories, but remember to update the filter list if you do.

---

## 🔍 Recommended Sources to Check:

### Top Crypto Research Firms:
- **a16z Crypto**: https://a16zcrypto.com/
- **Paradigm**: https://www.paradigm.xyz/
- **Pantera Capital**: https://panteracapital.com/blockchain-letter/
- **Multicoin Capital**: https://multicoin.capital/
- **Galaxy Digital**: https://www.galaxy.com/research/
- **Messari**: https://messari.io/research
- **Delphi Digital**: https://members.delphidigital.io/
- **Bankless**: https://www.bankless.com/
- **Coinbase Research**: https://www.coinbase.com/institutional/research-insights

---

## ⏰ Update Schedule:

**Recommended:** Every 2 weeks (bi-weekly)

The GitHub Action reminder is set to run every 2 weeks on Monday at 9 AM UTC.

---

## 📊 Best Practices:

1. **Keep 8-12 articles** on the page at a time
2. **Remove outdated content** (older than 3-6 months)
3. **Prioritize quality** over quantity
4. **Ensure variety** in topics and sources
5. **Verify links** work before publishing
6. **Check dates** are formatted correctly (YYYY-MM-DD)

---

## 🚀 After Updating:

1. Save the file
2. Test locally: `npm run dev`
3. Build: `npm run build`
4. Commit: `git add . && git commit -m "Update research articles"`
5. Push: `git push origin master`

---

## 📧 Need Help?

If you want to automate this process further, consider:
- Setting up a CMS (Content Management System)
- Using RSS feeds with automation
- Creating an admin dashboard

Contact your developer for these advanced options.
