# SimpleChatService

A custom, fully client/server chat system for Roblox — built to replace the default Roblox chat with a lightweight, animated, and extensible UI.

**Author:** Mostafa ([@shwaza123aa](https://www.youtube.com/@MostafaTheCreator)) & sulisizer
**First released:** October 9, 2025
**Current version:** v1.1.2
**License:** Mozilla Public License 2.0 (see [LICENSE](./LICENSE))

---

## Features

- **Custom chat window** — slide-in/out animated frame, idle-transparency fading, auto-resizing input box, TopBar integration via Icon.
- **Whisper system** — `/w` and `/whisper` commands, click-to-whisper on player names, whisper mode with live prefix, player-name autocomplete.
- **Command system** — extensible command registry (`/help`, `/clear`, `/time`, `/announce`, `/kick`, `/ban`, `/mute`, and more), with fuzzy search-based suggestions.
- **Emoji system** — large built-in emoji database (faces, people, animals, food, activities, objects, travel, symbols) with keyword search and `:name:` autocomplete.
- **Suggestion UI** — a shared dropdown component (keyboard navigation with Up/Down/Tab/Enter/Escape, hover states, scrollable list) used for both emoji and command autocomplete.
- **Chat tags** — configurable tag system (Owner/Admin/Moderator/VIP/etc.) driven by UserId, Gamepass ownership, or Group rank, with priority ordering and a manual-assignment API.
- **Announcement system** — animated, avatar-and-badge announcement banner with auto-hide.
- **Bubble chat** — TextChatService-based bubble chat wired into message events.
- **Admin tools** — kick/mute/unmute/announce/clear-all commands gated by a configurable admin list.
- **Message filtering** — Roblox `TextService` filtering plus length validation and an optional custom banned-word list.
- **Cooldowns & mute system** — per-player message cooldown and timed mutes, with automatic expiry cleanup.
- **Version checker** — compares the local version against a reference place's name on startup and warns if outdated.
- **HD Admin bridge (optional)** — auto-detects an `HDAdminSetup` module in `ReplicatedStorage` and forwards recognized prefixed commands to it, without hijacking the chat system's own commands.

## Project Structure

```
SimpleChatService/
├── System/                  -- Client-side chat modules
│   ├── ChatConfig.lua
│   ├── ChatUI.lua
│   ├── ChatCommands.lua
│   ├── CommandHandler.lua
│   ├── EmojiHandler.lua
│   ├── SuggestionUI.lua
│   ├── MessageHandler.lua
│   ├── AnnouncementSystem.lua
│   ├── MainClient.lua  -- Client entry point (LocalScript)
│   └── BubbleChat.lua
├── Shared/                  -- Shared client/server modules
│   ├── ChatEvents.lua
│   ├── WhisperManager.lua
│   └── Loader.lua
├── Server/                  -- Server-side modules
│    └── SimpleChatServiceServer.lua         -- Server entry point (Script)
│     ├── ServerConfig.lua
│     ├── MessageFilter.lua
│     ├── PlayerManager.lua
│     ├── AdminCommands.lua
│     └── ChatTagManager.lua
├── EditableModule/
│   └── ChatTagConfig.lua    -- Edit this to configure your own tags/ranks/gamepasses
├── Packs/
│   └── GoodSignal.lua       -- Signal implementation (stravant, MIT)
├── VERSION.lua
```

> Note: this reflects the current script layout; see the roadmap below for the folder reorganization pass.

## Installation

1. Place the `SimpleChatService` folder under `ReplicatedStorage`.
2. Put `ChatSystemServer.lua` in `ServerScriptService` (as a Script).
3. Configure admins, message limits, and mute durations in `Server/ServerConfig.lua`.
4. Configure chat tags, gamepasses, and group ranks in `EditableModule/ChatTagConfig.lua`.
5. (Optional) Drop in an `Icon` module ([TopbarPlus by ForeverHD](https://1foreverhd.github.io/TopbarPlus/)) for the TopBar chat button, or let the bundled one load.

## Configuration Highlights

- **Admins:** `ServerConfig.ADMINS` — keyed by username or UserId.
- **Message limits & cooldown:** `ServerConfig.CHAT_CONFIG`.
- **Tags:** `ChatTagConfig.PredefinedTags`, `GamepassTags`, `GroupTags`, `CustomPlayerTags`.
- **Colors/animation/sizing:** `ChatConfig.CHAT_CONFIG`.

## Credits

- Core system, UI, and architecture: **Mostafa (@shwaza123aa)** & **sulisizer**
- `GoodSignal` signal implementation: **stravant** (MIT Licensed)
- `TopbarPlus`: by `ForeverHD` (https://1foreverhd.github.io/TopbarPlus/)

## Licensing

SimpleChatService is licensed under the **Mozilla Public License 2.0**. Full terms are in [LICENSE](./LICENSE). In short:

- You're free to use and modify SimpleChatService, including in commercial Roblox games.
- If you distribute modified versions of SimpleChatService's own source files, those modified files must remain under MPL 2.0 and keep their license/attribution notices intact — you may not strip the notices out and pass the code off as entirely your own original work.
- Please keep the in-code attribution header intact, or credit "SimpleChatService" (with a link back to this repo) somewhere in your project description.

## Version History

- **v1.1.2** — current release.
- **v1.0.0** — initial public release, October 9, 2025.
