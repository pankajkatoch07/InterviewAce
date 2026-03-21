# How to Get Your Groq API Key

## Step 1: Create Groq Account
1. Go to https://console.groq.com/keys
2. Sign up or log in with your account
3. You'll see your API keys page

## Step 2: Create a New API Key
1. Click **"Create New API Key"** button
2. Give it a name like "InterviewAce"
3. Copy the key that appears (looks like: `gsk_xxxxxxxxxxxxx...`)

## Step 3: Update Your .env File
1. Open `backend/.env`
2. Replace `YOUR_ACTUAL_GROQ_API_KEY_HERE` with your actual API key
3. Example:
```env
GROQ_API_KEY=gsk_abc123def456...
```

## Step 4: Save and Restart Backend
```bash
npm run dev
```

You should see:
```
Using Groq model: llama-3.1-8b-instant
Server running on http://localhost:5000
```

## Available Models

Once you have a valid API key, you can try these models:

```env
# Fast and lightweight (recommended for most use cases)
GROQ_MODEL=llama-3.1-8b-instant

# More powerful but slower
GROQ_MODEL=llama-3.1-70b-versatile

# For specific tasks
GROQ_MODEL=mixtral-8x7b-32768
```

**Check all available models:** https://console.groq.com/docs/models

## Troubleshooting

### Still getting "model_not_found" error?
- Verify your API key is correct
- Check that you copied the entire key
- Make sure there are no extra spaces

### Getting "invalid_request_error"?
- The model might be deprecated
- Try a different model from the list above
- Update `GROQ_MODEL` in `.env`

### Getting rate limited?
- Free tier has usage limits
- Wait a few minutes and try again
- Consider upgrading your plan

---

**Important:** Keep your API key private! Never commit it to GitHub. ✅
