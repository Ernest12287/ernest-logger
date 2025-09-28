
# 📦 Ernest-Logger Changelog

## [1.1.0] – 2025-09-28

### ✨ New Features

- **Log Level Filtering**  
  Control verbosity with `level: 'debug' | 'info' | 'warn' | 'error'`.  
  Only logs at or above the selected level will be shown.

- **File Logging Support**  
  Enable persistent logging with `file: true`.  
  Logs are saved to `ernest.log` in the root directory.

- **Custom Log Levels**  
  Define your own emoji-powered log levels via `customLevels`.  
  Example:
  ```js
  customLevels: {
    deploy: { color: 'cyan', emoji: '🚀' },
    audit: { color: 'yellow', emoji: '📋' },
  }
  ```

- **TypeScript Definitions**  
  Added `index.d.ts` for autocomplete and type safety in TypeScript projects.

---

### 🛠 Improvements

- Refactored internal logic for better modularity and future extensibility.
- Enhanced `bigLog()` to support file output when logging is enabled.

---

### 🚫 Contribution Policy Update

To preserve the **uniqueness and superior design** of Ernest-Logger:

* Bug reports and issues are always welcome via [GitHub Issues](https://github.com/Ernest12287/ernest-logger/issues).
* Feature ideas? DM **Pease Ernest** directly:

  * [Telegram](https://t.me/Peaseernest)
  * [WhatsApp Channel](https://whatsapp.com/channel/0029VayK4tyDAWr0jeCZx0i)

⚡ **Pull Requests:**
By default, I don’t accept most PRs — this is a carefully curated project.
But if you’ve got a **truly valuable fix or improvement** (performance boost, bug squash, or something that keeps the zero-bloat vibe), go ahead and open one. I’ll personally review and merge the gems.

This approach keeps Ernest-Logger lean, fun, and consistent — while still leaving room for the community to shine.

---

### 🧠 Maintained By

**Ernest Tech House**  
Built for developers who want their logs to speak louder, look better, and feel alive.

