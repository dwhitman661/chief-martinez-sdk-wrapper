(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ChiefMartinezSDK = {}));
})(this, (function (exports) { 'use strict';

  var Rt$1 = Object.defineProperty;
  var Et$1 = (e, t, r) => t in e ? Rt$1(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
  var x = (e, t, r) => Et$1(e, typeof t != "symbol" ? t + "" : t, r);
  var Re$1 = /* @__PURE__ */ ((e) => (e.Chat = "lk.chat", e.Speak = "did.speak", e.Interrupt = "did.interrupt", e.SttLanguage = "did.stt-language", e.Presentation = "did.presentation", e))(Re$1 || {}), L$1 = /* @__PURE__ */ ((e) => (e.Functional = "Functional", e.TextOnly = "TextOnly", e.Maintenance = "Maintenance", e.Playground = "Playground", e.DirectPlayback = "DirectPlayback", e.Off = "Off", e))(L$1 || {}), F = /* @__PURE__ */ ((e) => (e.Embed = "embed", e.Query = "query", e.Partial = "partial", e.Answer = "answer", e.Transcribe = "transcribe", e.Complete = "done", e))(F || {}), ne$1 = /* @__PURE__ */ ((e) => (e.Clip = "clip", e.Talk = "talk", e.Expressive = "expressive", e.Image = "image", e))(ne$1 || {}), C$1 = /* @__PURE__ */ ((e) => (e.Start = "START", e.Stop = "STOP", e))(C$1 || {}), ge$1 = /* @__PURE__ */ ((e) => (e.Strong = "STRONG", e.Weak = "WEAK", e.Unknown = "UNKNOWN", e))(ge$1 || {}), we$2 = /* @__PURE__ */ ((e) => (e.Idle = "IDLE", e.Loading = "LOADING", e.Talking = "TALKING", e.ToolActive = "TOOL_ACTIVE", e))(we$2 || {}), k = /* @__PURE__ */ ((e) => (e.ChatAnswer = "chat/answer", e.ChatPartial = "chat/partial", e.ChatAudioTranscribed = "chat/audio-transcribed", e.StreamDone = "stream/done", e.StreamStarted = "stream/started", e.StreamFailed = "stream/error", e.StreamReady = "stream/ready", e.StreamInterrupt = "stream/interrupt", e.StreamVideoCreated = "stream-video/started", e.StreamVideoDone = "stream-video/done", e.StreamVideoError = "stream-video/error", e.StreamVideoRejected = "stream-video/rejected", e.ToolCallStarted = "tool-call/started", e.ToolCallDone = "tool-call/done", e.ToolCallError = "tool-call/error", e.TurnStarted = "turn/started", e.TurnEnded = "turn/ended", e))(k || {}), Be$1 = /* @__PURE__ */ ((e) => (e.Started = "tool-call/started", e.Done = "tool-call/done", e.Error = "tool-call/error", e))(Be$1 || {}), R$1 = /* @__PURE__ */ ((e) => (e.New = "new", e.Fail = "fail", e.Connected = "connected", e.Connecting = "connecting", e.Closed = "closed", e.Completed = "completed", e.Disconnecting = "disconnecting", e.Disconnected = "disconnected", e))(R$1 || {}), H$1 = /* @__PURE__ */ ((e) => (e.Legacy = "legacy", e.Fluent = "fluent", e))(H$1 || {}), he$1 = /* @__PURE__ */ ((e) => (e.Ok = "ok", e.UnknownError = "unknown_error", e.NetworkIssue = "network_issue", e.MessageLimit = "message_limit", e.TimeLimit = "time_limit", e.Inactivity = "inactivity", e.EndedByAgent = "ended_by_agent", e))(he$1 || {}), Ve$1 = /* @__PURE__ */ ((e) => (e.Livekit = "livekit", e))(Ve$1 || {});
  const Jn$1 = (...e) => {
  }, mt$1 = (e) => new Promise((t) => setTimeout(t, e)), Z$1 = (e = 16) => {
    const t = new Uint8Array(e);
    return globalThis.crypto.getRandomValues(t), Array.from(t, (r) => r.toString(16).padStart(2, "0")).join("").slice(0, 13);
  };
  function $e$1(e) {
    if (e !== void 0)
      return window.localStorage.setItem("did_external_key_id", e), e;
    let t = window.localStorage.getItem("did_external_key_id");
    if (!t) {
      let r = Z$1();
      window.localStorage.setItem("did_external_key_id", r), t = r;
    }
    return t;
  }
  let gt$1;
  function Ae$2() {
    return gt$1 ?? (gt$1 = Z$1());
  }
  function At$1() {
    gt$1 = Z$1();
  }
  function ht$1(e, t) {
    if (e.type === "bearer")
      return `Bearer ${e.token}~${Ae$2()}`;
    if (e.type === "basic")
      return `Basic ${"token" in e ? e.token : btoa(`${e.username}:${e.password}`)}~${Ae$2()}`;
    if (e.type === "key")
      return `Client-Key ${e.clientKey}.${$e$1(t)}_${Ae$2()}`;
    throw new Error(`Unknown auth type: ${e}`);
  }
  const Pt$1 = 45 * 1e3, bt$1 = "X-Playground-Chat", We$1 = 2e3, ke$1 = "https://api.d-id.com", xt$1 = "wss://notifications.d-id.com", Lt$1 = "79f81a83a67430be2bc0fd61042b8faa";
  let q$1 = class q extends Error {
    /**
     * Creates an SDK error. The SDK builds these itself; applications normally only catch them.
     *
     * @param message - Human-readable description of the failure, used as the `Error` message.
     * @param kind - Stable machine-readable code for the failure.
     * @param originalError - The underlying error or value this one wraps, when there is one.
     */
    constructor(t, r = "Error", a) {
      super(t), this.kind = r, this.originalError = a, Object.setPrototypeOf(this, new.target.prototype);
    }
    /**
     * Serializes the error into the JSON-safe {@link ErrorJson} payload for logging or reporting.
     *
     * The payload always carries {@link BaseError.kind | kind} and the message. The cause's message
     * is added only when {@link BaseError.originalError | originalError} is an `Error` and says
     * something the message does not, truncated to 256 characters; any other cause is dropped.
     * Subclasses extend the payload with the fields listed on their own pages.
     *
     * @returns The error as plain, JSON-serializable data.
     * @example An HttpError from a request that was refused
     * ```json
     * {
     *     "kind": "HttpError",
     *     "code": "InsufficientCreditsError",
     *     "message": "Account has insufficient credits",
     *     "httpStatus": 402,
     *     "endpoint": "/agt_x/chat/cht_y",
     *     "method": "POST"
     * }
     * ```
     * @example A NetworkError from a request that never left the browser
     * ```json
     * {
     *     "kind": "NetworkError",
     *     "message": "Network request failed",
     *     "cause": "Failed to fetch",
     *     "endpoint": "/agt_x/chat/cht_y",
     *     "method": "POST",
     *     "durationMs": 12,
     *     "online": false,
     *     "visibility": "visible"
     * }
     * ```
     */
    toJson() {
      const t = this.originalError instanceof Error ? this.originalError.message.slice(0, 256) : void 0;
      return {
        kind: this.kind,
        message: this.message,
        ...t && t !== this.message ? { cause: t } : {}
      };
    }
  };
  let jt$1 = class jt extends q$1 {
    /**
     * Builds the error from the attempt that failed.
     * @internal The SDK builds this itself; applications catch the error rather than construct it.
     */
    constructor(r, a) {
      super(`Failed to create ${a ? "persistent " : ""}chat, mode: ${r}`, "ChatCreationFailed");
      /**
       * Always `'ChatCreationFailed'`. Branch on it to tell this failure from the other SDK errors.
       */
      x(this, "kind", "ChatCreationFailed");
    }
  };
  let Bt$1 = class Bt extends q$1 {
    /**
     * Builds the error from the mode the session ended up in.
     * @internal The SDK builds this itself; applications catch the error rather than construct it.
     */
    constructor(r) {
      super(`Chat mode downgraded to ${r}`, "ChatModeDowngraded");
      /**
       * Always `'ChatModeDowngraded'`. Branch on it to tell this failure from the other SDK errors.
       */
      x(this, "kind", "ChatModeDowngraded");
    }
  };
  function $t$1(e) {
    try {
      const t = JSON.parse(e);
      if (t && typeof t == "object" && typeof t.kind == "string")
        return t;
    } catch {
    }
  }
  let Ne$1 = class Ne extends q$1 {
    /**
     * Builds the error from the failing response.
     * @internal The SDK builds this itself; applications catch the error rather than construct it.
     */
    constructor(r, a, o = {}) {
      const s = $t$1(a);
      super(((s == null ? void 0 : s.description) ?? a).slice(0, 256), "HttpError");
      /**
       * Always `'HttpError'`. Branch on it to tell this failure from the other SDK errors.
       */
      x(this, "kind", "HttpError");
      /**
       * The Agents API's own classification of the failure — the `kind` from D-ID's
       * `{ kind, description }` error body — and `'HttpError'` when the response was not that
       * envelope.
       *
       * An account out of credits comes back as `'InsufficientCreditsError'`, for instance. It is a
       * plain `string` because the set is the API's, not the SDK's, and grows without an SDK release.
       * Use {@link HttpError.status | status} for the transport-level branch, this for the API-level
       * one, and {@link BaseError.kind | kind} to tell an `HttpError` from the SDK's other errors.
       */
      x(this, "code");
      /**
       * HTTP status code of the response, such as `401`, `404` or `500`.
       */
      x(this, "status");
      /**
       * Path of the request that failed, relative to the API client's base path — for example
       * `/agt_x/chat/cht_y` for a message sent to a chat.
       *
       * Absent when the error was constructed without call context. {@link NetworkError.endpoint}
       * is the same value on a transport failure.
       */
      x(this, "endpoint");
      /**
       * HTTP method of the request that failed, such as `GET` or `POST`.
       *
       * Absent when the error was constructed without call context.
       */
      x(this, "method");
      this.code = (s == null ? void 0 : s.kind) ?? "HttpError", this.status = r, this.endpoint = o.endpoint, this.method = o.method;
    }
    /**
     * Serializes the error, adding the failing call to what
     * {@link BaseError.toJson | BaseError.toJson()} already returns.
     *
     * Adds {@link HttpError.code | code}, `httpStatus` from {@link HttpError.status | status}, and
     * `endpoint` and `method` when the call context is known. The raw `status` property is
     * serialized as `httpStatus`.
     *
     * @returns The error as plain, JSON-serializable data.
     */
    toJson() {
      return {
        ...super.toJson(),
        code: this.code,
        httpStatus: this.status,
        ...this.endpoint ? { endpoint: this.endpoint } : {},
        ...this.method ? { method: this.method } : {}
      };
    }
  };
  let Nt$1 = class Nt extends q$1 {
    /**
     * Wraps a rejected `fetch` together with what was known about the call.
     * @internal The SDK builds this itself; applications catch the error rather than construct it.
     */
    constructor(r, a = {}) {
      super("Network request failed", "NetworkError", r);
      /**
       * Always `'NetworkError'`. Branch on it to tell this failure from the other SDK errors.
       */
      x(this, "kind", "NetworkError");
      /**
       * Path of the request that failed, relative to the API client's base path — for example
       * `/agt_x/chat/cht_y`.
       */
      x(this, "endpoint");
      /**
       * HTTP method of the request that failed, such as `GET` or `POST`.
       */
      x(this, "method");
      /**
       * How long the request ran before it failed, in milliseconds.
       *
       * A value close to zero usually means the request never left the browser; a large one points
       * at a connection that was established and then lost.
       */
      x(this, "durationMs");
      /**
       * The browser's `navigator.onLine` at the moment of the failure — `false` when the device
       * reported itself offline.
       */
      x(this, "online");
      /**
       * The page's `document.visibilityState` at the moment of the failure.
       *
       * `'hidden'` means the tab was in the background, where browsers throttle or suspend network
       * activity.
       */
      x(this, "visibility");
      this.endpoint = a.endpoint, this.method = a.method, this.durationMs = a.durationMs, this.online = a.online, this.visibility = a.visibility;
    }
    /**
     * Serializes the error, adding the captured context to what
     * {@link BaseError.toJson | BaseError.toJson()} already returns.
     *
     * Each of `endpoint`, `method`, `durationMs`, `online` and `visibility` is included only when it
     * was captured.
     *
     * @returns The error as plain, JSON-serializable data.
     */
    toJson() {
      return {
        ...super.toJson(),
        ...this.endpoint ? { endpoint: this.endpoint } : {},
        ...this.method ? { method: this.method } : {},
        ...this.durationMs !== void 0 ? { durationMs: this.durationMs } : {},
        ...this.online !== void 0 ? { online: this.online } : {},
        ...this.visibility ? { visibility: this.visibility } : {}
      };
    }
  };
  let pt$1 = class pt extends q$1 {
    /**
     * Wraps a streaming failure.
     * @internal The SDK builds this itself; applications catch the error rather than construct it.
     */
    constructor(r, a) {
      super(r, "StreamError", a);
      /**
       * Always `'StreamError'`. Branch on it to tell this failure from the other SDK errors.
       */
      x(this, "kind", "StreamError");
    }
  };
  let I$1 = class I extends q$1 {
    /**
     * Builds a validation failure. The SDK does this itself before it performs a request.
     *
     * @param message - What was wrong with the call, such as `'Message cannot be empty'`.
     * @param key - Name of the field the failure is about. The SDK's own validations leave it
     * unset.
     */
    constructor(r, a) {
      super(r, "ValidationError");
      /**
       * Always `'ValidationError'`. Branch on it to tell this failure from the other SDK errors.
       */
      x(this, "kind", "ValidationError");
      this.key = a;
    }
  };
  let Ot$1 = class Ot extends q$1 {
    /**
     * Wraps a web socket failure, built from the socket's `error` event.
     * @internal The SDK builds this itself; applications catch the error rather than construct it.
     */
    constructor(r) {
      super(r, "WSError");
      /**
       * Always `'WSError'` — note the capitalization, which does not match the class name.
       */
      x(this, "kind", "WSError");
    }
  };
  const wt$1 = (e) => e.type, zt$1 = (e) => e.type === ne$1.Expressive ? "v4" : e.type === ne$1.Clip ? "v3-pro" : e.type === ne$1.Image ? "image" : "v2", Ue$1 = (e) => e === ne$1.Expressive || e === ne$1.Image, Pe$1 = (e) => [L$1.TextOnly, L$1.Playground, L$1.Maintenance].includes(e), te$1 = (e) => e && [L$1.DirectPlayback, L$1.Off].includes(e), Ke$1 = /\[!\[([^\[\]]*)\]\(([^)\s]+)\)\]\(([^)\s]+)\)/g, qe$1 = /!\[([^\[\]]*)\]\(([^)\s]+)\)/g, Ft$1 = [".mp4", ".webm", ".mkv", ".mov", ".m4v", ".ogv"];
  function Vt$1(e) {
    const t = e.split("?")[0].split("#")[0].toLowerCase();
    return Ft$1.some((r) => t.endsWith(r));
  }
  const Ge$1 = new RegExp("(?<!!)\\[([^\\[\\]]+)\\]\\(([^)\\s]+)\\)", "g"), Xe = /<a\s+href="([^"]*)"[^>]*?>([^<]*)<\/a>/gi;
  function yt$1(e) {
    if (e.length === 0)
      return [];
    const t = [];
    let r;
    for (Ke$1.lastIndex = 0; (r = Ke$1.exec(e)) !== null; )
      t.push({
        index: r.index,
        length: r[0].length,
        part: { type: "video", src: r[3], alt: r[1], thumbnail: r[2] }
      });
    for (qe$1.lastIndex = 0; (r = qe$1.exec(e)) !== null; )
      if (!t.some((i) => r.index >= i.index && r.index < i.index + i.length)) {
        const i = r[2], u = r[1];
        let n;
        Vt$1(i) ? n = { type: "video", src: i, alt: u } : (n = { type: "image", src: i, alt: u }, i.toLowerCase().endsWith(".gif") && (n.mimeType = "image/gif")), t.push({ index: r.index, length: r[0].length, part: n });
      }
    for (Ge$1.lastIndex = 0; (r = Ge$1.exec(e)) !== null; )
      t.some((i) => r.index >= i.index && r.index < i.index + i.length) || t.push({
        index: r.index,
        length: r[0].length,
        part: { type: "link", href: r[2], label: r[1] }
      });
    for (Xe.lastIndex = 0; (r = Xe.exec(e)) !== null; )
      t.some((i) => r.index >= i.index && r.index < i.index + i.length) || t.push({
        index: r.index,
        length: r[0].length,
        part: { type: "link", href: r[1], label: r[2] }
      });
    if (t.length === 0)
      return [{ type: "text", text: e }];
    t.sort((s, i) => s.index - i.index);
    const a = [];
    let o = 0;
    for (const s of t)
      s.index > o && a.push({ type: "text", text: e.slice(o, s.index) }), a.push(s.part), o = s.index + s.length;
    return o < e.length && a.push({ type: "text", text: e.slice(o) }), a;
  }
  let Ye$1 = "", be$2 = [];
  function pe$1(e) {
    return e === Ye$1 || (Ye$1 = e, be$2 = yt$1(e)), be$2;
  }
  function Ut$1(e, t) {
    let r;
    return {
      promise: new Promise((o, s) => {
        r = setTimeout(() => s(new Error(t)), e);
      }),
      clear: () => clearTimeout(r)
    };
  }
  async function Oe$1(e, t) {
    const r = {
      limit: (t == null ? void 0 : t.limit) ?? 3,
      delayMs: (t == null ? void 0 : t.delayMs) ?? 0,
      timeout: (t == null ? void 0 : t.timeout) ?? 3e4,
      timeoutErrorMessage: (t == null ? void 0 : t.timeoutErrorMessage) || "Timeout error",
      shouldRetryFn: (t == null ? void 0 : t.shouldRetryFn) ?? (() => true),
      onRetry: (t == null ? void 0 : t.onRetry) ?? (() => {
      })
    };
    let a;
    for (let o = 1; o <= r.limit; o++)
      try {
        if (!r.timeout)
          return await e();
        const { promise: s, clear: i } = Ut$1(r.timeout, r.timeoutErrorMessage), u = e().finally(i);
        return await Promise.race([u, s]);
      } catch (s) {
        if (a = s, !r.shouldRetryFn(s) || o >= r.limit)
          throw s;
        await mt$1(r.delayMs), await r.onRetry(s);
      }
    throw a;
  }
  let Qe$1 = class Qe {
    constructor(t) {
      x(this, "status", 429);
      this.response = t;
    }
  };
  const Jt$1 = (e) => Oe$1(e, {
    limit: 3,
    delayMs: 1e3,
    timeout: 0,
    shouldRetryFn: (t) => t.status === 429
  });
  function vt$1(e, t = ke$1, r, a) {
    const o = async (s, i) => {
      const { skipErrorHandler: u, ...n } = i || {}, d = n.method ?? "GET", h = performance.now();
      let f;
      try {
        f = await Jt$1(async () => {
          const g = await fetch(t + (s != null && s.startsWith("/") ? s : `/${s}`), {
            ...n,
            headers: {
              ...n.headers,
              Authorization: ht$1(e, a),
              "Content-Type": "application/json"
            }
          });
          if (g.status === 429)
            throw new Qe$1(g);
          return g;
        });
      } catch (g) {
        if (g instanceof Qe$1)
          f = g.response;
        else {
          if ((g == null ? void 0 : g.name) === "AbortError")
            throw g;
          const p = new Nt$1(g, {
            endpoint: s,
            method: d,
            durationMs: Math.round(performance.now() - h),
            online: typeof navigator < "u" ? navigator.onLine : void 0,
            visibility: typeof document < "u" ? document.visibilityState : void 0
          });
          throw u || r == null || r(p, { endpoint: s, method: d }), p;
        }
      }
      if (!f.ok) {
        const g = await f.text().catch(() => `Failed to fetch with status ${f.status}`), l = new Ne$1(f.status, g, { endpoint: s, method: d });
        throw u || r == null || r(l, { endpoint: s, method: d }), l;
      }
      return f.json();
    };
    return {
      get(s, i) {
        return o(s, { ...i, method: "GET" });
      },
      post(s, i, u) {
        return o(s, { ...u, body: JSON.stringify(i), method: "POST" });
      },
      delete(s, i, u) {
        return o(s, { ...u, body: JSON.stringify(i), method: "DELETE" });
      },
      patch(s, i, u) {
        return o(s, { ...u, body: JSON.stringify(i), method: "PATCH" });
      }
    };
  }
  function Ht$1(e, t = ke$1, r, a) {
    const o = vt$1(e, `${t}/agents`, r, a);
    return {
      getRuntimeById(s, i) {
        return o.get(`/${s}/runtime`, i);
      },
      newChat(s, i, u) {
        return o.post(`/${s}/chat`, i, u);
      },
      chat(s, i, u, n) {
        return o.post(`/${s}/chat/${i}`, u, n);
      },
      createRating(s, i, u, n) {
        return o.post(`/${s}/chat/${i}/ratings`, u, n);
      },
      updateRating(s, i, u, n, d) {
        return o.patch(`/${s}/chat/${i}/ratings/${u}`, n, d);
      },
      deleteRating(s, i, u, n) {
        return o.delete(`/${s}/chat/${i}/ratings/${u}`, n);
      },
      submitFeedback(s, i, u, n) {
        return o.post(`/${s}/chat/${i}/feedback`, u, n);
      },
      getSttToken(s, i) {
        return o.get(`/${s}/stt-token`, i);
      }
    };
  }
  function Wt$1(e) {
    var o, s;
    const t = () => /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop", r = () => {
      const i = navigator.platform;
      return i.toLowerCase().includes("win") ? "Windows" : i.toLowerCase().includes("mac") ? "Mac OS X" : i.toLowerCase().includes("linux") ? "Linux" : "Unknown";
    }, a = e.avatar;
    return {
      $os: `${r()}`,
      isMobile: `${t() == "Mobile"}`,
      browser: navigator.userAgent,
      origin: window.location.origin,
      agentType: wt$1(a),
      agentVoice: {
        language: (s = (o = e.avatar) == null ? void 0 : o.voice) == null ? void 0 : s.language
      }
    };
  }
  function Kt$1(e) {
    var t;
    return {
      agentType: wt$1(e.avatar),
      presenterType: zt$1(e.avatar),
      owner_id: e.owner_id ?? "",
      starterQuestionsCount: (t = e.starter_message) == null ? void 0 : t.length,
      agentId: e.id,
      agentName: e.name
    };
  }
  const qt$1 = (e) => {
    try {
      return String((e == null ? void 0 : e.message) ?? e ?? "").slice(0, 256);
    } catch {
      return "Unknown error";
    }
  }, Gt$1 = (e) => e.reduce((t, r) => t + r, 0), Ze$1 = (e) => Gt$1(e) / e.length, et$1 = (e) => Math.min(...e), tt$1 = (e) => Math.max(...e), De$1 = (e, t = 0) => {
    const r = 10 ** t;
    return Math.round(e * r) / r;
  }, Xt$1 = (e, t) => {
    const r = [...e].sort((a, o) => a - o);
    return r[Math.min(r.length - 1, Math.floor(t * (r.length - 1)))];
  }, Yt$1 = (e) => Xt$1(e, 0.5), Qt$1 = (e, t) => {
    try {
      return e();
    } catch {
      return t;
    }
  };
  function nt$1(e, t, r) {
    var u, n;
    const { event: a, ...o } = e, { language: s } = ((u = t == null ? void 0 : t.avatar) == null ? void 0 : u.voice) || {};
    return {
      ...o,
      script: { ...o.script, provider: { ...(n = o == null ? void 0 : o.script) == null ? void 0 : n.provider, language: s } },
      ...r
    };
  }
  function rt$1(e) {
    "requestIdleCallback" in window ? requestIdleCallback(e, { timeout: 2e3 }) : setTimeout(e, 0);
  }
  function xe$1(e) {
    return e instanceof q$1 ? e.toJson() : { kind: "UnknownError", message: qt$1(e) || "UnknownError" };
  }
  const Zt$1 = "3.0.3", en$1 = "https://api-js.mixpanel.com/track/?verbose=1&ip=1", St$1 = 50, Q$1 = [];
  let Le$1 = false;
  async function Ct$1(e) {
    const t = await fetch(en$1, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ data: JSON.stringify(e) })
    });
    if (!t.ok)
      throw new Error(`Mixpanel responded with ${t.status}`);
  }
  function tn$1(e) {
    Q$1.push(e), Q$1.splice(St$1);
  }
  function ze$1() {
    if (Le$1 || !Q$1.length)
      return;
    Le$1 = true;
    const e = Q$1.splice(0, Q$1.length);
    Ct$1(e).catch(() => {
      Q$1.unshift(...e), Q$1.splice(St$1);
    }).finally(() => {
      Le$1 = false;
    });
  }
  typeof window < "u" && typeof window.addEventListener == "function" && (window.addEventListener("online", ze$1), typeof document < "u" && document.addEventListener("visibilitychange", () => {
    document.visibilityState === "visible" && ze$1();
  }));
  function nn$1(e) {
    const t = window != null && window.hasOwnProperty("DID_AGENTS_API") ? "agents-ui" : "agents-sdk", r = {};
    return {
      token: e.token || "testKey",
      distinct_id: $e$1(e.externalId),
      agentId: e.agentId,
      additionalProperties: {
        id: $e$1(e.externalId),
        ...e.mixpanelAdditionalProperties || {}
      },
      isEnabled: e.isEnabled ?? true,
      getRandom: Z$1,
      enrich(a) {
        this.additionalProperties = { ...this.additionalProperties, ...a };
      },
      async track(a, o, s) {
        if (!this.isEnabled)
          return Promise.resolve();
        const { audioPath: i, ...u } = o || {}, n = s || Date.now(), d = {
          event: a,
          properties: {
            ...this.additionalProperties,
            ...u,
            agentId: this.agentId,
            source: t,
            emittedBy: "agents-sdk",
            sdkVersion: Zt$1,
            token: this.token,
            time: n,
            $insert_id: this.getRandom(),
            origin: window.location.href,
            "Screen Height": window.screen.height || window.innerHeight,
            "Screen Width": window.screen.width || window.innerWidth,
            "User Agent": navigator.userAgent
          }
        };
        return ze$1(), Ct$1([d]).catch(() => tn$1(d)), Promise.resolve();
      },
      linkTrack(a, o, s, i) {
        r[a] || (r[a] = { events: {}, resolvedDependencies: [] }), i.includes(s) || i.push(s);
        const u = r[a];
        if (u.events[s] = { props: o }, u.resolvedDependencies.push(s), i.every(
          (d) => u.resolvedDependencies.includes(d)
        )) {
          const d = i.reduce((h, f) => u.events[f] ? { ...h, ...u.events[f].props } : h, {});
          this.track(a, d), u.resolvedDependencies = u.resolvedDependencies.filter(
            (h) => !i.includes(h)
          ), i.forEach((h) => {
            delete u.events[h];
          });
        }
      }
    };
  }
  function Je$1() {
    let e = 0;
    return {
      reset: () => e = 0,
      update: () => e = Date.now(),
      get: (t = false) => t ? Date.now() - e : e
    };
  }
  const K$1 = Je$1(), Fe$1 = Je$1(), at$1 = Je$1();
  function Mt$1(e) {
    return e === L$1.Playground ? { headers: { [bt$1]: "true" } } : {};
  }
  async function Dt$1(e, t, r, a, o = false, s) {
    return s ? { chat: s, chatMode: a } : (te$1(a) || (s = await t.newChat(e.id, { persist: o }, Mt$1(a)), r.track("agent-chat", {
      event: "created",
      chatId: s.id,
      mode: a
    })), { chat: s, chatMode: (s == null ? void 0 : s.chat_mode) ?? a });
  }
  function rn$1(e) {
    return !e || e.length === 0 ? [] : e.map(
      (t) => Array.isArray(t.parts) && t.parts.length > 0 ? t : { ...t, parts: yt$1(typeof t.content == "string" ? t.content : "") }
    );
  }
  function an$1(e) {
    return new Promise((t, r) => {
      const { callbacks: a, host: o, auth: s, externalId: i } = e, { onMessage: u = null, onOpen: n = null, onClose: d = null, onError: h = null } = a || {}, f = new WebSocket(`${o}?authorization=${encodeURIComponent(ht$1(s, i))}`);
      f.onmessage = u, f.onclose = d, f.onerror = (g) => {
        console.error(g), h == null || h("Websocket failed to connect", g), r(g);
      }, f.onopen = (g) => {
        n == null || n(g), t(f);
      };
    });
  }
  async function sn$1(e) {
    const { retries: t = 1 } = e;
    let r = null;
    for (let a = 0; (r == null ? void 0 : r.readyState) !== WebSocket.OPEN; a++)
      try {
        r = await an$1(e);
      } catch (o) {
        if (a === t)
          throw o;
        await mt$1(a * 500);
      }
    return r;
  }
  async function on$1(e, t, r, a) {
    const o = r != null && r.onMessage ? [r.onMessage] : [], s = await sn$1({
      auth: e,
      host: t,
      externalId: a,
      callbacks: {
        onError: (i) => {
          var u;
          return (u = r.onError) == null ? void 0 : u.call(r, new Ot$1(i));
        },
        onMessage(i) {
          const u = JSON.parse(i.data);
          o.forEach((n) => n(u.event, u));
        }
      }
    });
    return {
      socket: s,
      disconnect: () => s.close(),
      subscribeToEvents: (i) => o.push(i)
    };
  }
  const cn$1 = {
    manual: he$1.Ok,
    inactivity: he$1.Inactivity,
    peer_disconnected: he$1.NetworkIssue,
    shutdown: he$1.UnknownError
  };
  function dn$2(e) {
    return cn$1[e.close_reason] ?? e.close_reason;
  }
  const un$2 = [
    k.StreamVideoDone,
    k.StreamVideoError,
    k.StreamVideoRejected
  ], it$1 = [k.StreamFailed, k.StreamVideoError, k.StreamVideoRejected];
  function st$1(e) {
    if (e.answer !== void 0)
      return e.answer;
    let t = 0, r = "";
    for (; t in e; )
      r += e[t++];
    return r;
  }
  function ln$2(e, t, r) {
    if (!e.content)
      return;
    const a = {
      id: e.id || `user-${Date.now()}`,
      role: e.role,
      content: e.content,
      parts: pe$1(e.content),
      createdAt: e.created_at || (/* @__PURE__ */ new Date()).toISOString(),
      transcribed: true
    };
    t.messages.push(a), r == null || r([...t.messages], "user");
  }
  function fn$2(e, t, r, a, o, s, i) {
    if (e === F.Transcribe && t.content) {
      ln$2(t, a, o);
      return;
    }
    if (!(e === F.Partial || e === F.Answer))
      return;
    const u = a.messages[a.messages.length - 1];
    if (e === F.Answer && (u == null ? void 0 : u.role) === "user" && i === "partial")
      return;
    const d = i === "answer";
    let h;
    if ((u == null ? void 0 : u.role) === "assistant" && !d)
      h = u;
    else if (!u || u.role === "user" || d)
      d && s(), h = {
        id: t.id || `assistant-${Date.now()}`,
        role: t.role || "assistant",
        // Starts empty so the content-change check below fires for this message's first chat
        // event. Seeding it with `data.content` made that check a no-op, so a message carried
        // by a single partial (e.g. a worker `say` greeting) never reached `onNewMessage`.
        content: "",
        parts: [],
        createdAt: t.created_at || (/* @__PURE__ */ new Date()).toISOString()
      }, a.messages.push(h);
    else
      return;
    const { content: f, sequence: g } = t;
    if (e === F.Partial)
      r[g] = f;
    else {
      const p = st$1(r);
      !!(f && f.length < p.length) && (h.interrupted = true), r.answer = f;
    }
    const l = st$1(r);
    (h.content !== l || e === F.Answer) && (h.content = l, h.parts = pe$1(l), o == null || o([...a.messages], e));
  }
  function mn$2(e, t, r, a, o) {
    const s = {}, i = () => {
      for (const d of Object.keys(s))
        delete s[d];
    };
    let u = null;
    const n = (d, h) => {
      var f, g;
      h === "user" && i(), (g = (f = r.callbacks).onNewMessage) == null || g.call(f, d, h);
    };
    return {
      clearQueue: i,
      onMessage: (d, h) => {
        var f, g, l;
        if ("content" in h) {
          const p = d === k.ChatAnswer ? F.Answer : d === k.ChatAudioTranscribed ? F.Transcribe : d;
          fn$2(
            p,
            h,
            s,
            t,
            n,
            i,
            u
          ), p === F.Partial ? u = "partial" : p === F.Answer && (u = "answer", i()), p === F.Answer && e.track("agent-message-received", {
            content: h.content,
            messages: t.messages.length,
            mode: t.chatMode
          });
        } else {
          const p = k;
          if (d = d, d === p.StreamVideoCreated) {
            const D = nt$1(h, a, { mode: t.chatMode });
            if (e.linkTrack("agent-video", D, p.StreamVideoCreated, ["start"]), h.sentiment) {
              const S = t.messages[t.messages.length - 1];
              if ((S == null ? void 0 : S.role) === "assistant") {
                const P = { ...S, sentiment: h.sentiment };
                t.messages[t.messages.length - 1] = P, n == null || n([...t.messages], u ?? "answer");
              }
            }
          }
          if (un$2.includes(d)) {
            const D = d.split("/")[1], S = nt$1(h, a, { mode: t.chatMode });
            it$1.includes(d) ? e.track("agent-video", { ...S, event: D }) : e.linkTrack("agent-video", { ...S, event: D }, d, ["done"]);
          }
          it$1.includes(d) && ((l = (g = r.callbacks).onError) == null || l.call(g, new pt$1(`Stream failed with event ${d}`), {
            streamId: (f = t.streamingManager) == null ? void 0 : f.streamId
          })), h.event === p.StreamDone && o(dn$2(h));
        }
      }
    };
  }
  function gn$2(e, t, r, a) {
    const o = vt$1(e, `${t}/agents/${r}`, a);
    return {
      createStream(s, i) {
        return o.post("/streams", s, { signal: i });
      },
      startConnection(s, i, u, n) {
        return o.post(
          `/streams/${s}/sdp`,
          {
            session_id: u,
            answer: i
          },
          { signal: n }
        );
      },
      addIceCandidate(s, i, u, n) {
        return o.post(
          `/streams/${s}/ice`,
          {
            session_id: u,
            ...i
          },
          { signal: n }
        );
      },
      async sendStreamRequest(s, i, u) {
        const n = await o.post(`/streams/${s}`, {
          session_id: i,
          ...u
        });
        return {
          status: n.status,
          sessionId: n.session_id,
          duration: n.duration,
          videoId: n.video_id
        };
      },
      close(s, i) {
        return o.delete(`/streams/${s}`, { session_id: i }, { skipErrorHandler: true });
      }
    };
  }
  const hn$2 = (e, t) => (r, a) => e && console.log(`[${t}] ${r}`, a ?? ""), pn$2 = 45;
  function wn$1(e) {
    const t = e.map((n) => n.av).filter((n) => !!n && n.audioPlayout > 0 && n.videoPlayout > 0);
    if (t.length < 2)
      return null;
    const r = t[0].localTs, a = t[t.length - 1].localTs - r, o = t.map((n) => n.audioPlayout - n.videoPlayout), s = o.filter(
      (n) => n > pn$2 || n < -100
    ), i = t.filter((n) => n.localTs - r >= Math.min(5e3, a / 2)), u = (i.length ? i : t).map((n) => n.audioPlayout - n.videoPlayout);
    return {
      sampleCount: t.length,
      durationMs: De$1(a),
      desyncDurationMs: De$1(a * (s.length / o.length)),
      maxOffsetMs: De$1(o.reduce((n, d) => Math.abs(d) > Math.abs(n) ? d : n)),
      residualOffsetMs: De$1(Yt$1(u))
    };
  }
  function yn$2(e, t, r) {
    const a = (t.timestamp - e.timestamp) / 1e3;
    return {
      duration: a,
      bytesReceived: t.bytesReceived - e.bytesReceived,
      bitrate: Math.round((t.bytesReceived - e.bytesReceived) * 8 / a),
      packetsReceived: t.packetsReceived - e.packetsReceived,
      packetsLost: t.packetsLost - e.packetsLost,
      framesDropped: t.framesDropped - e.framesDropped,
      framesDecoded: t.framesDecoded - e.framesDecoded,
      jitter: t.jitter,
      avgJitterDelayInInterval: (t.jitterBufferDelay - e.jitterBufferDelay) / (t.jitterBufferEmittedCount - e.jitterBufferEmittedCount),
      jitterBufferEmittedCount: t.jitterBufferEmittedCount - e.jitterBufferEmittedCount,
      jitterBufferDelay: (t.jitterBufferDelay - e.jitterBufferDelay) / a,
      framesPerSecond: t.framesPerSecond,
      freezeCount: t.freezeCount - e.freezeCount,
      freezeDuration: t.freezeDuration - e.freezeDuration,
      lowFpsCount: r
    };
  }
  function vn$2(e) {
    return e.filter(
      (t) => t.freezeCount > 0 || t.framesPerSecond < 21 || t.framesDropped > 0 || t.packetsLost > 0
    ).map((t) => {
      const { timestamp: r, ...a } = t, o = [];
      return t.freezeCount > 0 && o.push("freeze"), t.framesPerSecond < 21 && o.push("low fps"), t.framesDropped > 0 && o.push("frames dropped"), t.packetsLost > 0 && o.push("packet loss"), {
        ...a,
        causes: o
      };
    });
  }
  function Sn$2(e) {
    var n;
    let t = "", r = 0, a = null, o = null;
    const s = /* @__PURE__ */ new Map();
    for (const d of e.values())
      if (d)
        if (d.type === "codec" && ((n = d.mimeType) != null && n.startsWith("video")))
          s.set(d.id, d.mimeType.split("/")[1]);
        else if (d.type === "candidate-pair") {
          const h = d, f = h.currentRoundTripTime ?? 0;
          f > 0 && (h.nominated === true || r === 0) && (r = f);
        } else d.type === "inbound-rtp" && d.kind === "video" ? a = d : d.type === "inbound-rtp" && d.kind === "audio" && (o = d);
    if (!a)
      return {};
    const i = a;
    i.codecId && s.has(i.codecId) ? t = s.get(i.codecId) : s.size > 0 && (t = s.values().next().value ?? "");
    const u = {
      codec: t,
      rtt: r,
      timestamp: i.timestamp,
      bytesReceived: i.bytesReceived,
      packetsReceived: i.packetsReceived,
      packetsLost: i.packetsLost,
      framesDropped: i.framesDropped,
      framesDecoded: i.framesDecoded,
      jitter: i.jitter,
      jitterBufferDelay: i.jitterBufferDelay,
      jitterBufferEmittedCount: i.jitterBufferEmittedCount,
      avgJitterDelayInInterval: i.jitterBufferDelay / i.jitterBufferEmittedCount,
      frameWidth: i.frameWidth,
      frameHeight: i.frameHeight,
      framesPerSecond: i.framesPerSecond,
      freezeCount: i.freezeCount,
      freezeDuration: i.totalFreezesDuration
    };
    return o && (u.av = {
      audioPlayout: o.estimatedPlayoutTimestamp ?? 0,
      videoPlayout: i.estimatedPlayoutTimestamp ?? 0,
      localTs: i.timestamp
    }), u;
  }
  function ot$1(e, t, r) {
    if (e.length === 0)
      return null;
    const a = e.map((n, d) => d === 0 ? r ? {
      timestamp: n.timestamp,
      duration: 0,
      rtt: n.rtt,
      bytesReceived: n.bytesReceived - r.bytesReceived,
      bitrate: (n.bytesReceived - r.bytesReceived) * 8 / (t / 1e3),
      packetsReceived: n.packetsReceived - r.packetsReceived,
      packetsLost: n.packetsLost - r.packetsLost,
      framesDropped: n.framesDropped - r.framesDropped,
      framesDecoded: n.framesDecoded - r.framesDecoded,
      jitter: n.jitter,
      jitterBufferDelay: n.jitterBufferDelay - r.jitterBufferDelay,
      jitterBufferEmittedCount: n.jitterBufferEmittedCount - r.jitterBufferEmittedCount,
      avgJitterDelayInInterval: (n.jitterBufferDelay - r.jitterBufferDelay) / (n.jitterBufferEmittedCount - r.jitterBufferEmittedCount),
      framesPerSecond: n.framesPerSecond,
      freezeCount: n.freezeCount - r.freezeCount,
      freezeDuration: n.freezeDuration - r.freezeDuration
    } : {
      timestamp: n.timestamp,
      rtt: n.rtt,
      duration: 0,
      bytesReceived: n.bytesReceived,
      bitrate: n.bytesReceived * 8 / (t / 1e3),
      packetsReceived: n.packetsReceived,
      packetsLost: n.packetsLost,
      framesDropped: n.framesDropped,
      framesDecoded: n.framesDecoded,
      jitter: n.jitter,
      jitterBufferDelay: n.jitterBufferDelay,
      jitterBufferEmittedCount: n.jitterBufferEmittedCount,
      avgJitterDelayInInterval: n.jitterBufferDelay / n.jitterBufferEmittedCount,
      framesPerSecond: n.framesPerSecond,
      freezeCount: n.freezeCount,
      freezeDuration: n.freezeDuration
    } : {
      timestamp: n.timestamp,
      duration: t * d / 1e3,
      rtt: n.rtt,
      bytesReceived: n.bytesReceived - e[d - 1].bytesReceived,
      bitrate: (n.bytesReceived - e[d - 1].bytesReceived) * 8 / (t / 1e3),
      packetsReceived: n.packetsReceived - e[d - 1].packetsReceived,
      packetsLost: n.packetsLost - e[d - 1].packetsLost,
      framesDropped: n.framesDropped - e[d - 1].framesDropped,
      framesDecoded: n.framesDecoded - e[d - 1].framesDecoded,
      jitter: n.jitter,
      jitterBufferDelay: n.jitterBufferDelay - e[d - 1].jitterBufferDelay,
      jitterBufferEmittedCount: n.jitterBufferEmittedCount - e[d - 1].jitterBufferEmittedCount,
      avgJitterDelayInInterval: (n.jitterBufferDelay - e[d - 1].jitterBufferDelay) / (n.jitterBufferEmittedCount - e[d - 1].jitterBufferEmittedCount),
      framesPerSecond: n.framesPerSecond,
      freezeCount: n.freezeCount - e[d - 1].freezeCount,
      freezeDuration: n.freezeDuration - e[d - 1].freezeDuration
    }), o = vn$2(a), s = o.reduce((n, d) => n + (d.causes.includes("low fps") ? 1 : 0), 0), i = a.filter((n) => !!n.avgJitterDelayInInterval).map((n) => n.avgJitterDelayInInterval), u = a.filter((n) => !!n.rtt).map((n) => n.rtt);
    return {
      webRTCStats: {
        anomalies: o,
        avSync: Qt$1(() => wn$1(e), null),
        minRtt: et$1(u),
        avgRtt: Ze$1(u),
        maxRtt: tt$1(u),
        aggregateReport: yn$2(e[0], e[e.length - 1], s),
        minJitterDelayInInterval: et$1(i),
        maxJitterDelayInInterval: tt$1(i),
        avgJitterDelayInInterval: Ze$1(i)
      },
      codec: e[0].codec,
      resolution: `${e[0].frameWidth}x${e[0].frameHeight}`
    };
  }
  function It$1(e, t) {
    for (const r of e.values())
      if ((r == null ? void 0 : r.type) === "inbound-rtp" && r.kind === t)
        return r;
    return null;
  }
  const me = 10;
  function Wn$1(e, t) {
    let r = false, a = false, o = null, s = 0, i = 0, u = {};
    async function n() {
      if (r) {
        try {
          const d = await e();
          if (!d) {
            o = setTimeout(n, me);
            return;
          }
          const h = It$1(d, "audio");
          if (!h) {
            o = setTimeout(n, me);
            return;
          }
          const f = h.totalAudioEnergy ?? 0, g = h.totalSamplesReceived ?? 0;
          if (!a) {
            s = f, i = g, a = !0, o = setTimeout(n, me);
            return;
          }
          const l = f - s, p = g - i;
          if (s = f, i = g, p > 0 && l > 0) {
            r = !1, t(u);
            return;
          }
        } catch {
        }
        r && (o = setTimeout(n, me));
      }
    }
    return {
      arm(d = {}) {
        u = d, r = true, a = false, performance.now(), o !== null && clearTimeout(o), o = setTimeout(n, me);
      },
      destroy() {
        r = false, o !== null && (clearTimeout(o), o = null);
      }
    };
  }
  const Ie$1 = 100, Cn$2 = Math.max(Math.ceil(400 / Ie$1), 1), Mn$1 = 0.25, Dn$1 = 0.28;
  function In$1() {
    let e = 0, t, r, a = 0;
    return (o) => {
      const s = It$1(o, "video");
      if (!s)
        return { isReceiving: false, avgJitterDelayInInterval: a };
      const i = s.jitterBufferDelay, u = s.jitterBufferEmittedCount;
      if (r && u > r) {
        const h = i - t, f = u - r;
        a = h / f;
      }
      t = i, r = u;
      const n = s.framesDecoded, d = n - e > 0;
      return e = n, { isReceiving: d, avgJitterDelayInInterval: a, freezeCount: s.freezeCount };
    };
  }
  function Rn$1(e, t, r, a, o) {
    let s = null, i = [], u, n = 0, d = false, h = ge$1.Unknown, f = ge$1.Unknown, g = 0, l = 0;
    const p = In$1();
    async function D() {
      const S = await e();
      if (!S)
        return;
      const { isReceiving: P, avgJitterDelayInInterval: U, freezeCount: j } = p(S), re = Sn$2(S);
      if (P)
        n = 0, g = j - l, f = U < Mn$1 ? ge$1.Strong : U > Dn$1 && g > 1 ? ge$1.Weak : h, f !== h && (o == null || o(f), h = f, l += g, g = 0), d || (a == null || a(C$1.Start), u = i[i.length - 1], i = [], d = true), i.push(re);
      else if (d && (n++, n >= Cn$2)) {
        const ae = ot$1(i, Ie$1, u);
        a == null || a(C$1.Stop, ae ?? void 0), t() || r(), l = j, d = false;
      }
    }
    return {
      start: () => {
        s || (s = setInterval(D, Ie$1));
      },
      stop: () => {
        s && (clearInterval(s), s = null);
      },
      getReport: () => ot$1(i, Ie$1, u)
    };
  }
  const En$1 = () => {
    const e = globalThis, t = e.RTCPeerConnection || e.webkitRTCPeerConnection || e.mozRTCPeerConnection;
    if (!t)
      throw new Error("RTCPeerConnection is not available in this environment");
    return t.bind(e);
  };
  function ct$1(e) {
    switch (e) {
      case "connected":
        return R$1.Connected;
      case "checking":
        return R$1.Connecting;
      case "failed":
        return R$1.Fail;
      case "new":
        return R$1.New;
      case "closed":
        return R$1.Closed;
      case "disconnected":
        return R$1.Disconnected;
      case "completed":
        return R$1.Completed;
      default:
        return R$1.New;
    }
  }
  const kn$1 = (e) => (t) => {
    const [r, a = ""] = t.split(/:(.+)/);
    try {
      const o = JSON.parse(a);
      return e("parsed data channel message", { subject: r, data: o }), { subject: r, data: o };
    } catch (o) {
      return e("Failed to parse data channel message, returning data as string", { subject: r, rawData: a, error: o }), { subject: r, data: a };
    }
  };
  function Tn$1({
    statsSignal: e,
    dataChannelSignal: t,
    onVideoStateChange: r,
    report: a,
    log: o
  }) {
    e === C$1.Start && t === C$1.Start ? (o("CALLBACK: onVideoStateChange(Start)"), r == null || r(C$1.Start)) : e === C$1.Stop && t === C$1.Stop && (o("CALLBACK: onVideoStateChange(Stop)"), r == null || r(C$1.Stop, a));
  }
  function _n$1({
    statsSignal: e,
    dataChannelSignal: t,
    onVideoStateChange: r,
    onAgentActivityStateChange: a,
    report: o,
    log: s
  }) {
    e === C$1.Start ? (s("CALLBACK: onVideoStateChange(Start)"), r == null || r(C$1.Start)) : e === C$1.Stop && (s("CALLBACK: onVideoStateChange(Stop)"), r == null || r(C$1.Stop, o)), t === C$1.Start ? a == null || a(we$2.Talking) : t === C$1.Stop && (a == null || a(we$2.Idle));
  }
  function dt$1({
    statsSignal: e,
    dataChannelSignal: t,
    onVideoStateChange: r,
    onAgentActivityStateChange: a,
    streamType: o,
    report: s,
    log: i
  }) {
    o === H$1.Legacy ? Tn$1({ statsSignal: e, dataChannelSignal: t, onVideoStateChange: r, report: s, log: i }) : o === H$1.Fluent && _n$1({
      statsSignal: e,
      dataChannelSignal: t,
      onVideoStateChange: r,
      onAgentActivityStateChange: a,
      report: s,
      log: i
    });
  }
  async function An$2(e, t, { debug: r = false, callbacks: a, auth: o, baseURL: s = ke$1, analytics: i }, u) {
    var fe;
    const n = hn$2(r, "WebRTCStreamingManager"), d = kn$1(n);
    let h = false, f = false, g = C$1.Stop, l = C$1.Stop;
    const { startConnection: p, sendStreamRequest: D, close: S, createStream: P, addIceCandidate: U } = gn$2(
      o,
      s,
      e,
      a.onError
    ), {
      id: j,
      offer: re,
      ice_servers: ae,
      session_id: O,
      fluent: ee,
      interrupt_enabled: ye
    } = await P(t, u);
    if (!O)
      throw new Error("Could not create session_id");
    (fe = a.onStreamCreated) == null || fe.call(a, { streamId: j, sessionId: O, agentId: e });
    const ie = (y) => {
      var v;
      return (v = a.onError) == null ? void 0 : v.call(a, y, { streamId: j });
    }, T = new (En$1())({ iceServers: ae }), G = T.createDataChannel("JanusDataChannel"), B = ee ? H$1.Fluent : H$1.Legacy;
    i.enrich({
      "stream-type": B
    });
    const X = t.stream_warmup && !ee, ve = () => h, se = () => {
      var y;
      h = true, f && (n("CALLBACK: onConnectionStateChange(Connected)"), (y = a.onConnectionStateChange) == null || y.call(a, R$1.Connected));
    }, Y = Rn$1(
      () => T.getStats(),
      ve,
      se,
      (y, v) => dt$1({
        statsSignal: l = y,
        dataChannelSignal: B === H$1.Legacy ? g : void 0,
        onVideoStateChange: a.onVideoStateChange,
        onAgentActivityStateChange: a.onAgentActivityStateChange,
        report: v,
        streamType: B,
        log: n
      }),
      (y) => {
        var v;
        return (v = a.onConnectivityStateChange) == null ? void 0 : v.call(a, y);
      }
    );
    Y.start(), T.onicecandidate = (y) => {
      n("peerConnection.onicecandidate", y);
      try {
        y.candidate && y.candidate.sdpMid && y.candidate.sdpMLineIndex !== null ? U(
          j,
          {
            candidate: y.candidate.candidate,
            sdpMid: y.candidate.sdpMid,
            sdpMLineIndex: y.candidate.sdpMLineIndex
          },
          O,
          u
        ) : U(j, { candidate: null }, O, u);
      } catch (v) {
        ie(v);
      }
    }, G.onopen = () => {
      f = true, (!X || h) && se();
    };
    let V = null;
    const oe = (y) => {
      var v;
      V = y, (v = a.onVideoIdChange) == null || v.call(a, y);
    };
    function Se(y, v) {
      if (y === k.StreamStarted && typeof v == "object" && "metadata" in v) {
        const c = v.metadata;
        oe(c.videoId);
      }
      y === k.StreamDone && oe(null), g = y === k.StreamStarted ? C$1.Start : C$1.Stop, dt$1({
        statsSignal: B === H$1.Legacy ? l : void 0,
        dataChannelSignal: g,
        onVideoStateChange: a.onVideoStateChange,
        onAgentActivityStateChange: a.onAgentActivityStateChange,
        streamType: B,
        log: n
      });
    }
    function ce(y, v) {
      var m;
      const c = typeof v == "string" ? v : v == null ? void 0 : v.metadata;
      c && i.enrich({ streamMetadata: c }), (m = a.onStreamReady) == null || m.call(a);
    }
    const de = {
      [k.StreamStarted]: Se,
      [k.StreamDone]: Se,
      [k.StreamReady]: ce
    };
    G.onmessage = (y) => {
      var m;
      const { subject: v, data: c } = d(y.data);
      (m = de[v]) == null || m.call(de, v, c);
    }, T.oniceconnectionstatechange = () => {
      var v;
      n("peerConnection.oniceconnectionstatechange => " + T.iceConnectionState);
      const y = ct$1(T.iceConnectionState);
      y !== R$1.Connected && ((v = a.onConnectionStateChange) == null || v.call(a, y, `webrtc:ice-${T.iceConnectionState}`));
    }, T.ontrack = (y) => {
      var v;
      n("peerConnection.ontrack", y), n("CALLBACK: onSrcObjectReady"), (v = a.onSrcObjectReady) == null || v.call(a, y.streams[0]);
    }, await T.setRemoteDescription(re), n("set remote description OK");
    const ue = await T.createAnswer();
    n("create answer OK"), await T.setLocalDescription(ue), n("set local description OK"), await p(j, ue, O, u), n("start connection OK");
    async function le(y, v) {
      if (!h || G.readyState !== "open") {
        n("Data channel is not ready for sending messages"), ie(new pt$1("Data channel is not ready for sending messages"));
        return;
      }
      try {
        G.send(v);
      } catch (c) {
        n("Error sending data channel message", c), ie(c);
      }
    }
    return {
      /**
       * Method to send request to server to get clip or talk depend on you payload
       * @param payload
       */
      speak(y) {
        return D(j, O, y);
      },
      /**
       * Method to close RTC connection
       */
      async disconnect() {
        var y;
        if (j) {
          const v = ct$1(T.iceConnectionState);
          if (T) {
            if (v === R$1.New) {
              Y.stop();
              return;
            }
            T.close(), T.oniceconnectionstatechange = null, T.onnegotiationneeded = null, T.onicecandidate = null, T.ontrack = null;
          }
          try {
            v === R$1.Connected && await S(j, O);
          } catch (c) {
            n("Error on close stream connection", c);
          }
          (y = a.onAgentActivityStateChange) == null || y.call(a, we$2.Idle), Y.stop();
        }
      },
      sendDataChannelMessage: le,
      /**
       * Session identifier information, should be returned in the body of all streaming requests
       */
      sessionId: O,
      /**
       * Id of current RTC stream
       */
      streamId: j,
      streamType: B,
      interruptAvailable: ye ?? false,
      isInterruptible: true,
      interrupt(y) {
        if (!ye || B !== H$1.Fluent || !V || !h || G.readyState !== "open")
          return false;
        const v = {
          type: k.StreamInterrupt,
          videoId: V,
          timestamp: Date.now()
        };
        return le(Re$1.Interrupt, JSON.stringify(v)), true;
      }
    };
  }
  var Ee$2 = /* @__PURE__ */ ((e) => (e.V1 = "v1", e.V2 = "v2", e))(Ee$2 || {});
  async function Pn(e, t, r, a) {
    const o = e.id;
    switch (t.version) {
      case "v1": {
        const { version: s, ...i } = t;
        return An$2(o, i, r, a);
      }
      case "v2": {
        const { version: s, ...i } = t;
        switch (i.transport.provider) {
          case Ve$1.Livekit:
            const { createLiveKitStreamingManager: u } = await Promise.resolve().then(function () { return livekitManagerCWngBsPu; });
            return u(o, i, r);
          default:
            throw new Error(`Unsupported transport provider: ${i.transport.provider}`);
        }
      }
      default:
        throw new Error(`Invalid stream version: ${t.version}`);
    }
  }
  const bn$1 = "cht";
  function xn$1(e) {
    return {
      transport: {
        provider: Ve$1.Livekit
      },
      ...(e == null ? void 0 : e.persistentChat) !== void 0 && { chat_persist: e.persistentChat }
    };
  }
  function Ln$1(e) {
    var o, s;
    const { streamOptions: t } = e ?? {}, r = ((s = (o = e == null ? void 0 : e.analytics) == null ? void 0 : o.additionalProperties) == null ? void 0 : s.plan) !== void 0 ? {
      plan: e.analytics.additionalProperties.plan
    } : void 0;
    return { ...{
      session_timeout: t == null ? void 0 : t.sessionTimeout,
      stream_warmup: t == null ? void 0 : t.streamWarmup,
      compatibility_mode: t == null ? void 0 : t.compatibilityMode,
      fluent: t == null ? void 0 : t.fluent
    }, ...r && { end_user_data: r } };
  }
  function jn$1(e, t) {
    return Ue$1(e.avatar.type) ? { version: Ee$2.V2, ...xn$1(t) } : { version: Ee$2.V1, ...Ln$1(t) };
  }
  function Bn$1(e, t, r) {
    r.track("agent-connection-state-change", { state: e, ...t && { reason: t } });
  }
  function $n$1(e, t, r, a, o) {
    o === H$1.Fluent ? Nn$1(e, t, r, a, o) : On$1(e, t, r, a, o);
  }
  function Nn$1(e, t, r, a, o) {
    e === C$1.Start ? a.track("stream-session", { event: "start", "stream-type": o }) : e === C$1.Stop && a.track("stream-session", {
      event: "stop",
      "stream-type": o,
      ...r
    });
  }
  function ut$1(e, t, r, a, o) {
    e === C$1.Start ? r.linkTrack("agent-video", { event: "start", ...o, "stream-type": a }, "start", [
      k.StreamVideoCreated
    ]) : e === C$1.Stop && r.linkTrack(
      "agent-video",
      {
        event: "stop",
        "stream-type": a
      },
      "done",
      [k.StreamVideoDone]
    );
  }
  function On$1(e, t, r, a, o) {
    e === C$1.Start ? a.linkTrack(
      "agent-video",
      { event: "start", latency: K$1.get(true), "stream-type": o },
      "start",
      [k.StreamVideoCreated]
    ) : e === C$1.Stop && a.linkTrack(
      "agent-video",
      {
        event: "stop",
        "stream-type": o,
        ...r
      },
      "done",
      [k.StreamVideoDone]
    );
  }
  function zn$1(e, t, r) {
    const a = {
      call_id: t.callId,
      name: t.name
    };
    if (e === Be$1.Started) {
      r.track("agent-tool-call", { ...a, event: "started" });
      return;
    }
    const o = t;
    r.track("agent-tool-call", {
      ...a,
      event: e === Be$1.Done ? "done" : "error",
      duration_ms: o.durationMs,
      extra_keys: o.extra ? Object.keys(o.extra).length : 0
    });
  }
  function lt$1(e, t, r, a) {
    return K$1.reset(), at$1.update(), new Promise(async (o, s) => {
      try {
        let i, u = !1;
        const n = jn$1(e, t);
        r.enrich({
          "stream-version": n.version.toString()
        });
        let d = null;
        const h = n.version === Ee$2.V2;
        i = await Pn(
          e,
          n,
          {
            ...t,
            analytics: r,
            callbacks: {
              ...t.callbacks,
              onConnectionStateChange: (f, g) => {
                var l, p;
                (p = (l = t.callbacks).onConnectionStateChange) == null || p.call(l, f, g), Bn$1(f, g, r), f === R$1.Connected && (i ? o(i) : u = !0);
              },
              onVideoStateChange: (f, g) => {
                var l, p;
                (p = (l = t.callbacks).onVideoStateChange) == null || p.call(l, f), $n$1(
                  f,
                  e,
                  g,
                  r,
                  i.streamType
                );
              },
              onAgentActivityStateChange: (f) => {
                var g, l;
                (l = (g = t.callbacks).onAgentActivityStateChange) == null || l.call(g, f), f === we$2.Talking ? (Fe$1.update(), d = (p) => {
                  ut$1(
                    C$1.Start,
                    e,
                    r,
                    i.streamType,
                    p
                  ), d = null;
                }, h || d({ latency: K$1.get(!0) })) : (Fe$1.reset(), d = null, ut$1(
                  C$1.Stop,
                  e,
                  r,
                  i.streamType
                ));
              },
              onFirstAudioDetected: (f) => {
                d == null || d(f);
              },
              onStreamReady: () => {
                const f = at$1.get(!0);
                r.track("agent-chat", { event: "ready", latency: f });
              },
              onToolEvent: ((f, g) => {
                var l, p;
                (p = (l = t.callbacks).onToolEvent) == null || p.call(l, f, g), zn$1(f, g, r);
              })
            }
          },
          a
        ), u && o(i);
      } catch (i) {
        s(i);
      }
    });
  }
  async function Fn$1(e, t, r, a, o) {
    var h, f;
    const s = async () => {
      if (Ue$1(e.avatar.type)) {
        const g = await lt$1(e, t, a), l = `${bn$1}_${g.sessionId}`, p = (/* @__PURE__ */ new Date()).toISOString();
        return { chatResult: {
          chatMode: L$1.Functional,
          chat: {
            id: l,
            agent_id: e.id,
            owner_id: e.owner_id ?? "",
            created: p,
            modified: p,
            agent_id__created_at: p,
            agent_id__modified_at: p,
            chat_mode: L$1.Functional,
            messages: []
          }
        }, streamingManager: g };
      } else {
        const g = new AbortController(), l = g.signal;
        let p;
        try {
          const D = Dt$1(
            e,
            r,
            a,
            t.mode,
            t.persistentChat,
            o
          ), S = lt$1(e, t, a, l).then((j) => (p = j, j)), [P, U] = await Promise.all([D, S]);
          return { chatResult: P, streamingManager: U };
        } catch (D) {
          throw g.abort(), p && await p.disconnect().catch(() => {
          }), D;
        }
      }
    }, { chatResult: i, streamingManager: u } = await s(), { chat: n, chatMode: d } = i;
    return d && t.mode !== void 0 && d !== t.mode && d !== L$1.Functional ? ((f = (h = t.callbacks).onError) == null || f.call(h, new Bt$1(d)), u == null || u.disconnect(), { chat: n }) : { chat: n, streamingManager: u };
  }
  const je$1 = "ChatMode.Off and ChatMode.DirectPlayback are not supported for Expressive agents", ft$1 = "callbacks.onSrcObjectReady is required in every chat mode that streams video; it is optional only in ChatMode.TextOnly, ChatMode.Playground and ChatMode.Maintenance", Vn$1 = [R$1.Disconnected, R$1.Closed, R$1.Fail];
  async function Kn$1(e, t) {
    var ue, le, fe, y, v;
    const r = { ...t.callbacks };
    let a = true;
    const o = ((ue = t.analytics) == null ? void 0 : ue.mixpanelKey) || Lt$1, s = t.wsURL || xt$1, i = t.baseURL || ke$1, u = t.mode || L$1.Functional;
    if (!r.onSrcObjectReady && !Pe$1(u))
      throw new I$1(ft$1);
    const n = {
      messages: [],
      chatMode: u
    }, d = nn$1({
      token: o,
      agentId: e,
      isEnabled: (le = t.analytics) == null ? void 0 : le.enabled,
      externalId: t.externalId,
      mixpanelAdditionalProperties: (fe = t.analytics) == null ? void 0 : fe.additionalProperties
    }), h = Date.now();
    rt$1(() => {
      d.track("agent-sdk", { event: "init" }, h);
    });
    let f = R$1.New, g;
    const l = {
      ...r,
      onError(c, m) {
        var w;
        d.track("agent-error", { error: xe$1(c) }), (w = r.onError) == null || w.call(r, c, m);
      },
      onConnectionStateChange(c, m) {
        var w;
        f = c, (w = r.onConnectionStateChange) == null || w.call(r, c, m);
      },
      onStreamCreated(c) {
        var m;
        g = c, (m = r.onStreamCreated) == null || m.call(r, c);
      }
    }, p = { ...t, callbacks: l }, D = Ht$1(p.auth, i, l.onError, p.externalId), S = await D.getRuntimeById(e);
    p.debug = p.debug || ((y = S == null ? void 0 : S.advanced_settings) == null ? void 0 : y.ui_debug_mode);
    const P = Ue$1(S.avatar.type);
    if (P && te$1(u))
      throw new I$1(je$1);
    P && Promise.resolve().then(function () { return livekitManagerCWngBsPu; }).then(({ preloadLiveKit: c }) => c()).catch(() => {
    }), d.enrich(Kt$1(S));
    const { onMessage: U, clearQueue: j } = mn$2(d, n, p, S, (c) => {
      var m, w;
      (m = n.socketManager) == null || m.disconnect(), (w = l.onConnectionStateChange) == null || w.call(l, R$1.Disconnected, c);
    });
    n.messages = rn$1(p.initialMessages), n.messages.length && ((v = l.onNewMessage) == null || v.call(l, [...n.messages], "answer"));
    const re = (c) => d.enrich({ videoId: c }), ae = (c) => {
      var z;
      const m = (c == null ? void 0 : c.type) ?? "click", w = n.streamingManager;
      if (!(w != null && w.interruptAvailable) || !w.isInterruptible || !w.interrupt(m))
        return;
      d.track("agent-video-interrupt", {
        type: m,
        video_duration_to_interrupt: Fe$1.get(true),
        message_duration_to_interrupt: K$1.get(true)
      });
      const E = n.messages[n.messages.length - 1];
      E && (E.interrupted = true, (z = l.onNewMessage) == null || z.call(l, [...n.messages], "answer"));
    }, O = /* @__PURE__ */ new Map();
    function ee(c) {
      return async (m) => {
        const w = O.get(c);
        if (!w)
          throw new Error(`No handler registered for client tool: ${c}`);
        const M = JSON.parse(m.payload);
        return w(M);
      };
    }
    function ye() {
      var c, m, w, M;
      for (const [E] of O)
        (m = (c = n.streamingManager) == null ? void 0 : c.unregisterRpcMethod) == null || m.call(c, E), (M = (w = n.streamingManager) == null ? void 0 : w.registerRpcMethod) == null || M.call(w, E, ee(E));
    }
    function ie(c, m) {
      var M, E;
      if (!P)
        throw new I$1("registerClientTool is only available on Expressive (V4) agents");
      const w = !O.has(c);
      O.set(c, m), w && ((E = (M = n.streamingManager) == null ? void 0 : M.registerRpcMethod) == null || E.call(M, c, ee(c)));
    }
    function T(c) {
      var m, w;
      O.delete(c), (w = (m = n.streamingManager) == null ? void 0 : m.unregisterRpcMethod) == null || w.call(m, c);
    }
    const G = Date.now();
    rt$1(() => {
      d.track("agent-sdk", { event: "loaded", ...Wt$1(S) }, G);
    });
    let B, X = false;
    function ve(c) {
      return X = false, B = Promise.resolve().then(c).finally(() => {
        B = void 0;
      }), B;
    }
    function se(c) {
      return B || ve(() => Y(c));
    }
    async function Y(c) {
      var J, Te, _e, $;
      if (X)
        return;
      n.streamingManager && await V(), At$1(), (J = l.onConnectionStateChange) == null || J.call(l, R$1.Connecting), K$1.reset(), c && !a && (delete n.chat, (Te = l.onNewMessage) == null || Te.call(l, [...n.messages], "answer"));
      const m = oe(n.chatMode) ? on$1(
        p.auth,
        s,
        { onMessage: U, onError: l.onError },
        p.externalId
      ) : Promise.resolve(void 0), w = Oe$1(
        () => Fn$1(
          S,
          {
            ...p,
            mode: n.chatMode,
            callbacks: {
              ...l,
              onVideoIdChange: re,
              onMessage: U
            },
            rpcMethods: new Map([...O.keys()].map((N) => [N, ee(N)]))
          },
          D,
          d,
          n.chat
        ),
        {
          limit: 3,
          timeout: Pt$1,
          timeoutErrorMessage: "Timeout initializing the stream",
          shouldRetryFn: (N) => !(N instanceof Ne$1 && (N.status === 429 || N.code === "InsufficientCreditsError" || N.code === "AgentUpgradingError")),
          delayMs: 1e3
        }
      ).catch(async (N) => {
        var Ce;
        throw m.then((W) => W == null ? void 0 : W.disconnect()).catch(() => {
        }), N instanceof Ne$1 && N.code === "AgentUpgradingError" || await ce(L$1.Maintenance), (Ce = l.onConnectionStateChange) == null || Ce.call(l, R$1.Fail), N;
      }), M = (_e = n.chat) == null ? void 0 : _e.id, [E, { streamingManager: z, chat: _ }] = await Promise.all([m, w]), b = !!_ && _.id !== M;
      if (_ && b && (($ = l.onNewChat) == null || $.call(l, _.id)), n.streamingManager = z, n.socketManager = E, n.chat = _, X) {
        await V();
        return;
      }
      ye(), a = false, d.enrich({
        chatId: _ == null ? void 0 : _.id,
        streamId: z == null ? void 0 : z.streamId,
        mode: n.chatMode
      });
      const A = (b ? _ == null ? void 0 : _.chat_mode : void 0) ?? n.chatMode;
      if (P && te$1(A)) {
        console.warn(`[AgentManager] Ignoring chat mode "${A}": ${je$1}`);
        return;
      }
      await ce(A);
    }
    async function V() {
      var c, m, w;
      (c = n.socketManager) == null || c.disconnect(), await ((m = n.streamingManager) == null ? void 0 : m.disconnect()), delete n.streamingManager, delete n.socketManager, g = void 0, (w = l.onConnectionStateChange) == null || w.call(l, R$1.Disconnected);
    }
    function oe(c) {
      return !P && c !== L$1.DirectPlayback;
    }
    function Se(c) {
      const m = !te$1(c);
      return (!oe(c) || !!n.socketManager) && (!m || !!n.chat);
    }
    async function ce(c) {
      var m;
      if (c !== n.chatMode) {
        d.track("agent-mode-change", { mode: c }), n.chatMode = c;
        const w = !!n.streamingManager || !!n.socketManager;
        (c !== L$1.Functional || w && !Se(c)) && await V(), (m = l.onModeChange) == null || m.call(l, c);
      }
    }
    async function de(c) {
      if (P && te$1(c))
        throw new I$1(je$1);
      await ce(c);
    }
    return {
      agent: S,
      getStreamType: () => {
        var c;
        return (c = n.streamingManager) == null ? void 0 : c.streamType;
      },
      isInterruptAvailable: () => {
        var c;
        return ((c = n.streamingManager) == null ? void 0 : c.interruptAvailable) ?? false;
      },
      // A copy: the same array instance is held by `agent.starter_message`, and handing it out
      // made `manager.starterMessages` an alias the application could write through.
      starterMessages: [...S.starter_message ?? []],
      getSttToken: () => D.getSttToken(S.id),
      getChatMode: () => n.chatMode,
      getConnectionState: () => f,
      getSessionInfo: () => g,
      changeMode: de,
      enrichAnalytics: (c) => d.enrich(c),
      async connect() {
        if (!l.onSrcObjectReady && !Pe$1(n.chatMode))
          throw new I$1(ft$1);
        if (B)
          return X = false, B;
        if (n.streamingManager && !Vn$1.includes(f))
          throw new I$1("Already connected; call disconnect() first");
        await se(true), n.streamingManager && d.track("agent-chat", {
          event: "connect",
          mode: n.chatMode
        });
      },
      async reconnect() {
        if (B)
          throw new I$1("A connect() is in flight; wait for it before calling reconnect()");
        return ve(async () => {
          const c = n.streamingManager;
          let m;
          if (P && (c != null && c.reconnect))
            try {
              await c.reconnect();
            } catch (w) {
              const M = xe$1(w);
              m = M.code ?? M.kind, await V(), await Y(false);
            }
          else
            await V(), await Y(false);
          d.track("agent-chat", {
            event: "reconnect",
            mode: n.chatMode,
            // A mid-flight disconnect, or a server mode that tore the session down, leaves
            // nothing connected.
            success: !!n.streamingManager,
            ...m && { fallbackReason: m }
          });
        });
      },
      async disconnect() {
        B && (X = true), await V(), d.track("agent-chat", {
          event: "disconnect",
          mode: n.chatMode
        });
      },
      publishMicrophoneStream(c) {
        var m;
        return (m = n.streamingManager) != null && m.publishMicrophoneStream ? n.streamingManager.publishMicrophoneStream(c) : Promise.reject(
          new I$1(
            "publishMicrophoneStream is only available on Expressive (V4) agents, after connect()"
          )
        );
      },
      setSttLanguage(c) {
        return !P || !n.streamingManager ? Promise.reject(
          new I$1("setSttLanguage is only available on Expressive (V4) agents, after connect()")
        ) : (d.track("agent-stt-language-change", { language: c }), n.streamingManager.sendDataChannelMessage(
          Re$1.SttLanguage,
          JSON.stringify({ language: c })
        ));
      },
      sendDataChannelMessage(c, m) {
        return !P || !n.streamingManager ? Promise.reject(
          new I$1(
            "sendDataChannelMessage is only available on Expressive (V4) agents, after connect()"
          )
        ) : (d.track("agent-data-message", { topic: c }), n.streamingManager.sendDataChannelMessage(c, JSON.stringify(m)));
      },
      unpublishMicrophoneStream() {
        var c;
        return (c = n.streamingManager) != null && c.unpublishMicrophoneStream ? n.streamingManager.unpublishMicrophoneStream() : Promise.resolve();
      },
      replaceMicrophoneTrack(c) {
        var m;
        return (m = n.streamingManager) != null && m.replaceMicrophoneTrack ? n.streamingManager.replaceMicrophoneTrack(c) : Promise.reject(
          new I$1(
            "replaceMicrophoneTrack is only available on Expressive (V4) agents, after connect()"
          )
        );
      },
      publishCameraStream(c) {
        var m;
        return (m = n.streamingManager) != null && m.publishCameraStream ? n.streamingManager.publishCameraStream(c) : Promise.reject(
          new I$1(
            "publishCameraStream is only available on Expressive (V4) agents, after connect()"
          )
        );
      },
      unpublishCameraStream() {
        var c;
        return (c = n.streamingManager) != null && c.unpublishCameraStream ? n.streamingManager.unpublishCameraStream() : Promise.resolve();
      },
      async chat(c) {
        var E, z, _;
        const m = () => {
          if (te$1(n.chatMode))
            throw new I$1(`${n.chatMode} is enabled, chat is disabled`);
          if (c.length >= We$1)
            throw new I$1(`Message cannot be more than ${We$1} characters`);
          if (c.length === 0)
            throw new I$1("Message cannot be empty");
          if (n.chatMode === L$1.Maintenance)
            throw new I$1("Chat is in maintenance mode");
          if (![L$1.TextOnly, L$1.Playground].includes(n.chatMode)) {
            if (!n.streamingManager)
              throw new I$1("Streaming manager is not initialized");
            if (!n.chat)
              throw new I$1("Chat is not initialized");
          }
        }, w = async () => {
          var b;
          if (!n.chat) {
            const A = await Dt$1(
              S,
              D,
              d,
              n.chatMode,
              p.persistentChat
            );
            if (!A.chat)
              throw new jt$1(n.chatMode, !!p.persistentChat);
            n.chat = A.chat, (b = l.onNewChat) == null || b.call(l, n.chat.id);
          }
          return n.chat.id;
        }, M = async (b, A) => {
          const J = n.chatMode === L$1.Playground;
          return Oe$1(P && !J ? async () => {
            var $;
            return await (($ = n.streamingManager) == null ? void 0 : $.sendDataChannelMessage(
              Re$1.Chat,
              c
            )), Promise.resolve({});
          } : async () => {
            var $, N;
            return D.chat(
              S.id,
              A,
              {
                chatMode: n.chatMode,
                streamId: ($ = n.streamingManager) == null ? void 0 : $.streamId,
                sessionId: (N = n.streamingManager) == null ? void 0 : N.sessionId,
                messages: b.map(({ matches: Ce, createdAt: W, ...Me }) => ({
                  ...Me,
                  // A restored `initialMessages` row may carry no timestamp; the API requires one.
                  created_at: W ?? (/* @__PURE__ */ new Date()).toISOString()
                }))
              },
              {
                ...Mt$1(n.chatMode),
                skipErrorHandler: !0
              }
            );
          }, {
            limit: 2,
            shouldRetryFn: ($) => {
              var W, Me, He;
              const N = (W = $ == null ? void 0 : $.message) == null ? void 0 : W.includes("missing or invalid session_id");
              return !((Me = $ == null ? void 0 : $.message) == null ? void 0 : Me.includes("Stream Error")) && !N ? ((He = l.onError) == null || He.call(l, $), false) : true;
            },
            onRetry: async () => {
              await V(), await se(false);
            }
          });
        };
        try {
          j(), m(), n.messages.push({
            id: Z$1(),
            role: "user",
            content: c,
            parts: pe$1(c),
            createdAt: new Date(K$1.update()).toISOString()
          }), (E = l.onNewMessage) == null || E.call(l, [...n.messages], "user");
          const b = await w(), A = await M([...n.messages], b);
          return A.result && n.messages.push({
            id: Z$1(),
            role: "assistant",
            content: A.result,
            parts: pe$1(A.result),
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            context: A.context,
            matches: A.matches
          }), d.track("agent-message-send", {
            event: "success",
            messages: n.messages.length + 1
          }), A.result && ((z = l.onNewMessage) == null || z.call(l, [...n.messages], "answer"), d.track("agent-message-received", {
            latency: K$1.get(!0),
            messages: n.messages.length
          })), A;
        } catch (b) {
          throw ((_ = n.messages[n.messages.length - 1]) == null ? void 0 : _.role) === "assistant" && n.messages.pop(), d.track("agent-message-send", {
            event: "error",
            messages: n.messages.length,
            error: xe$1(b)
          }), b;
        }
      },
      async rate(c, m, w) {
        var z, _, b, A;
        const M = n.messages.find((J) => J.id === c);
        if (n.chat) {
          if (!M)
            throw new I$1("Message not found");
        } else throw new I$1("Chat is not initialized");
        const E = ((z = M.matches) == null ? void 0 : z.map((J) => [J.document_id, J.id])) ?? [];
        return d.track("agent-rate", {
          event: w ? "update" : "create",
          thumb: m === 1 ? "up" : "down",
          knowledge_id: ((_ = S.knowledge) == null ? void 0 : _.id) ?? "",
          matches: E,
          score: m
        }), w ? D.updateRating(S.id, n.chat.id, w, {
          knowledge_id: ((b = S.knowledge) == null ? void 0 : b.id) ?? "",
          message_id: c,
          matches: E,
          score: m
        }) : D.createRating(S.id, n.chat.id, {
          knowledge_id: ((A = S.knowledge) == null ? void 0 : A.id) ?? "",
          message_id: c,
          matches: E,
          score: m
        });
      },
      async deleteRate(c) {
        if (!n.chat)
          throw new I$1("Chat is not initialized");
        return d.track("agent-rate-delete", { type: "text" }), D.deleteRating(S.id, n.chat.id, c);
      },
      async submitFeedback(c, m) {
        if (!n.chat)
          throw new I$1("Chat is not initialized");
        return d.track("agent-feedback", { rating: c, hasAnswer: !!m }), D.submitFeedback(S.id, n.chat.id, { rating: c, answer: m });
      },
      async speak(c) {
        var _, b;
        function m() {
          return typeof c == "string" ? {
            type: "text",
            input: c,
            ssml: false
          } : c.type === "text" && !c.provider ? {
            type: "text",
            input: c.input,
            ssml: c.ssml,
            should_queue_speaks: c.should_queue_speaks,
            sentiment: c.sentiment
          } : c;
        }
        const w = Pe$1(n.chatMode);
        if (!w && !n.streamingManager)
          throw new I$1("Please connect to the agent first");
        const M = m();
        d.track("agent-speak", M), K$1.update(), n.messages && M.type === "text" && (n.messages.push({
          id: Z$1(),
          role: "assistant",
          content: M.input,
          parts: pe$1(M.input),
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }), (_ = l.onNewMessage) == null || _.call(l, [...n.messages], "answer"));
        const E = { duration: 0, videoId: "", status: "success" };
        return w || !n.streamingManager ? E : await n.streamingManager.speak({
          script: M,
          metadata: { chat_id: (b = n.chat) == null ? void 0 : b.id, agent_id: S.id }
        }) ?? E;
      },
      interrupt: ae,
      registerClientTool: ie,
      unregisterClientTool: T
    };
  }

  async function createDirectPlaybackAgent(
    agentId,
    clientKey,
    videoElement,
    options = {}
  ) {
    if (!agentId || !clientKey) {
      throw new Error('D-ID DirectPlayback wrapper: agentId and clientKey are required.');
    }

    if (!(videoElement instanceof HTMLVideoElement)) {
      throw new Error('D-ID DirectPlayback wrapper: videoElement must be an HTMLVideoElement.');
    }

    const streamOptions = options.streamOptions || {};

    const agentManager = await Kn$1(agentId, {
      auth: {
        type: 'key',
        clientKey: clientKey
      },

      mode: L$1.DirectPlayback,

      streamOptions,

      callbacks: {
        onSrcObjectReady(value) {
          console.log('[FireLine Prep] D-ID onSrcObjectReady fired');

          videoElement.srcObject = value;

          console.log('[FireLine Prep] Chief video stream attached');

          videoElement.play().catch(() => {
            console.warn(
              'D-ID DirectPlayback wrapper: video playback was blocked by the browser.'
            );
          });
        },

        ...(options.callbacks || {})
      }
    });

    await agentManager.connect();

    return agentManager;
  }

  async function speakText(agentManager, text) {
    if (!agentManager) {
      throw new Error('D-ID DirectPlayback wrapper: agentManager is required.');
    }

    const trimmed = (text || '').trim();

    if (!trimmed) {
      return;
    }

    await agentManager.speak({
      type: 'text',
      input: trimmed
    });
  }

  function un$1() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    } catch {
      return "";
    }
  }
  function dn$1() {
    if (typeof navigator > "u")
      return "";
    const r = navigator.userAgent ?? "", l = (navigator.platform ?? "").toLowerCase();
    let s = "Unknown";
    /android/i.test(r) ? s = "Android" : /iphone|ipad|ipod/i.test(r) ? s = "iOS" : l.includes("win") ? s = "Windows" : l.includes("mac") ? s = "Mac OS X" : l.includes("linux") && (s = "Linux");
    const i = s === "Android" || s === "iOS" || /Mobi/i.test(r);
    return `${s}, ${i ? "Mobile" : "Desktop"}`;
  }
  function ln$1() {
    const r = {}, l = un$1();
    l && (r.timezone = l);
    const s = dn$1();
    return s && (r.device = s), r;
  }
  function pn$1(r, l, s, i) {
    const I = vt$1(r, `${l}/v2/agents/${s}`, i);
    return {
      async createStream(g) {
        return I.post("/sessions", g);
      }
    };
  }
  const fn$1 = {
    [k.ChatAnswer]: F.Answer,
    [k.ChatPartial]: F.Partial
  }, ye$1 = 2e4, hn$1 = [];
  let te;
  function be$1() {
    return te ?? (te = Promise.resolve().then(function () { return livekitClient_esmQkbCKsng; }).catch(() => {
      throw te = void 0, new Error(
        "LiveKit client is required for this streaming manager. Please install it using: npm install livekit-client"
      );
    })), te;
  }
  function yn$1() {
    be$1().catch(() => {
    });
  }
  const gn$1 = {
    excellent: ge$1.Strong,
    good: ge$1.Strong,
    poor: ge$1.Weak,
    lost: ge$1.Unknown,
    unknown: ge$1.Unknown
  }, j$1 = (r = "Stream Error") => new pt$1(r), mn$1 = new TextDecoder();
  function Cn$1(r) {
    return {
      callId: r.call_id,
      name: r.name,
      input: r.input,
      ...r.output !== void 0 ? { output: r.output } : {},
      // The server omits `interruptible` on some started events, and `executionMode` is
      // normalized exactly as `RunningToolCall.executionMode` is, so the two agree about the call.
      interruptible: r.interruptible === true,
      executionMode: r.execution_mode === "async" ? "async" : "blocking",
      ...r.turn_id !== void 0 ? { turnId: r.turn_id } : {},
      timestamp: r.timestamp
    };
  }
  function we$1(r) {
    return {
      callId: r.call_id,
      name: r.name,
      input: r.input,
      output: r.output,
      durationMs: r.duration_ms,
      extra: r.extra,
      timestamp: r.timestamp
    };
  }
  function Sn$1(r) {
    var s;
    const l = (s = r.extra) == null ? void 0 : s.error;
    return typeof (l == null ? void 0 : l.message) == "string" && l.message ? l.message : typeof r.output == "string" && r.output ? r.output : void 0;
  }
  function vn$1(r) {
    const l = Sn$1(r);
    return {
      ...we$1(r),
      output: r.output,
      ...l !== void 0 ? { error: l } : {}
    };
  }
  function Ae$1(r, l) {
    return async (s) => {
      try {
        return await l(s);
      } catch (i) {
        throw i instanceof r ? i : new r(
          r.ErrorCode.APPLICATION_ERROR,
          (i == null ? void 0 : i.message) || "Client tool failed"
        );
      }
    };
  }
  function Ee$1(r, l, s) {
    var i, I;
    throw l("Failed to connect to LiveKit room:", r), (i = s.onConnectionStateChange) == null || i.call(s, R$1.Fail, "internal:init-error"), (I = s.onError) == null || I.call(s, r, {}), r;
  }
  async function An$1(r, l, s) {
    var he;
    const i = hn$2(s.debug || false, "LiveKitStreamingManager"), { Room: I, RoomEvent: g, ConnectionState: M, RpcError: ie, Track: oe } = await be$1(), { callbacks: t, auth: Re, baseURL: Pe, analytics: re } = s;
    let c = null, y = false;
    const ae = H$1.Fluent;
    let R = null;
    const P = { isPublishing: false, publication: null }, W = { isPublishing: false, publication: null };
    let m = null, v = null, N = null, D = false;
    c = new I({
      adaptiveStream: false,
      // Must be false to use mediaStreamTrack directly
      dynacast: true
    });
    for (const [e, n] of s.rpcMethods ?? [])
      c.registerRpcMethod(e, Ae$1(ie, n));
    let b = null, L = we$2.Idle, q = true;
    const T = /* @__PURE__ */ new Map();
    let K = null, H = null;
    const Le = pn$1(Re, Pe || ke$1, r, t.onError);
    let k$1, _, x, ce = true;
    try {
      const e = await Le.createStream({
        transport: l.transport,
        chat_persist: l.chat_persist ?? !1,
        verbose: s.verbose ?? !1
      }), { id: n, session_token: o, session_url: a, interrupt_enabled: d } = e;
      (he = t.onStreamCreated) == null || he.call(t, { sessionId: n, streamId: n, agentId: r }), k$1 = n, _ = o, x = a, ce = d ?? !0, await c.prepareConnection(x, _);
    } catch (e) {
      Ee$1(e, i, t);
    }
    if (!x || !_ || !k$1)
      return Promise.reject(new Error("Failed to initialize LiveKit stream"));
    const F$1 = (e) => {
      var n;
      return (n = t.onError) == null ? void 0 : n.call(t, e, { sessionId: k$1 });
    };
    c.on(g.ConnectionStateChanged, ke).on(g.ConnectionQualityChanged, _e).on(g.ParticipantConnected, xe).on(g.ParticipantDisconnected, $e).on(g.TrackSubscribed, Ke).on(g.TrackUnsubscribed, Fe).on(g.DataReceived, Be).on(g.MediaDevicesError, Je).on(g.TranscriptionReceived, Ie).on(g.EncryptionError, Qe).on(g.TrackSubscriptionFailed, We);
    function Ie(e, n) {
      n != null && n.isLocal && K$1.update();
    }
    async function Me() {
      const e = ln$1();
      if (!(!c || Object.keys(e).length === 0))
        try {
          await c.localParticipant.setAttributes(e);
        } catch (n) {
          i("Failed to set user context attributes", n);
        }
    }
    try {
      await c.connect(x, _), i("LiveKit room joined successfully"), Me(), b = setTimeout(() => {
        i(
          `Track subscription timeout - no track subscribed within ${ye$1 / 1e3} seconds after connect`
        ), b = null;
        const e = j$1("Track subscription timeout");
        re.track("connectivity-error", {
          error: xe$1(e),
          sessionId: k$1
        }), F$1(e), ee("internal:track-subscription-timeout");
      }, ye$1);
    } catch (e) {
      Ee$1(e, i, t);
    }
    re.enrich({
      "stream-type": ae
    });
    function ke(e) {
      var n, o, a, d;
      switch (i("Connection state changed:", e), e) {
        case M.Connecting:
          i("CALLBACK: onConnectionStateChange(Connecting)"), (n = t.onConnectionStateChange) == null || n.call(t, R$1.Connecting, "livekit:connecting");
          break;
        case M.Connected:
          i("LiveKit room connected successfully"), y = true;
          break;
        case M.Disconnected:
          i("LiveKit room disconnected"), y = false, D = false, P.publication = null, W.publication = null, (o = t.onConnectionStateChange) == null || o.call(
            t,
            R$1.Disconnected,
            H ?? "livekit:disconnected"
          );
          break;
        case M.Reconnecting:
          i("LiveKit room reconnecting..."), (a = t.onConnectionStateChange) == null || a.call(t, R$1.Connecting, "livekit:reconnecting");
          break;
        case M.SignalReconnecting:
          i("LiveKit room signal reconnecting..."), (d = t.onConnectionStateChange) == null || d.call(t, R$1.Connecting, "livekit:signal-reconnecting");
          break;
      }
    }
    function _e(e, n) {
      var o;
      i("Connection quality:", e), n != null && n.isLocal && ((o = t.onConnectivityStateChange) == null || o.call(t, gn$1[e]));
    }
    function xe(e) {
      i("Participant connected:", e.identity);
    }
    function $e(e) {
      i("Participant disconnected:", e.identity), ee("livekit:participant-disconnected");
    }
    function De() {
      var e;
      N !== C$1.Start && (i("CALLBACK: onVideoStateChange(Start)"), N = C$1.Start, (e = t.onVideoStateChange) == null || e.call(t, C$1.Start));
    }
    function se(e) {
      var n;
      N !== C$1.Stop && (i("CALLBACK: onVideoStateChange(Stop)"), N = C$1.Stop, (n = t.onVideoStateChange) == null || n.call(t, C$1.Stop, e));
    }
    function Ke(e, n, o) {
      var d, p, u;
      i(`Track subscribed: ${e.kind} from ${o.identity}`);
      const a = e.mediaStreamTrack;
      if (!a) {
        i(`No mediaStreamTrack available for ${e.kind}`);
        return;
      }
      R ? (R.addTrack(a), i(`Added ${e.kind} track to shared MediaStream`)) : (R = new MediaStream([a]), i(`Created shared MediaStream with ${e.kind} track`)), e.kind === "audio" && (v = Wn$1(
        () => e.getRTCStatsReport(),
        ({ sttLatency: h, serviceLatency: C }) => {
          var ge, me, Ce;
          const V = K$1.get(!0);
          let O = 0;
          if (h) {
            const Se = ((me = (ge = m == null ? void 0 : m.getReport()) == null ? void 0 : ge.webRTCStats) == null ? void 0 : me.avgRtt) ?? 0;
            O = Se > 0 ? Math.round(Se * 1e3) : 0;
          }
          const $ = V > 0 ? V + (h ?? 0) + O : void 0, A = $ !== void 0 && C !== void 0 ? $ - C : void 0;
          (Ce = t.onFirstAudioDetected) == null || Ce.call(t, { latency: $, networkLatency: A });
        }
      )), e.kind === "video" && ((d = t.onStreamReady) == null || d.call(t), i("CALLBACK: onSrcObjectReady"), (p = t.onSrcObjectReady) == null || p.call(t, R), D || (D = true, i("CALLBACK: onConnectionStateChange(Connected)"), (u = t.onConnectionStateChange) == null || u.call(t, R$1.Connected, "livekit:track-subscribed")), m = Rn$1(
        () => e.getRTCStatsReport(),
        () => y,
        Jn$1,
        (h, C) => {
          i(`Video state change: ${h}`), h === C$1.Start ? (b && (clearTimeout(b), b = null, i("Track subscription timeout cleared")), De()) : h === C$1.Stop && se(C);
        }
      ), m.start());
    }
    function Fe(e, n, o) {
      i(`Track unsubscribed: ${e.kind} from ${o.identity}`), e.kind === "audio" && (v == null || v.destroy(), v = null), e.kind === "video" && (se((m == null ? void 0 : m.getReport()) ?? void 0), m == null || m.stop(), m = null);
    }
    function ue(e, n) {
      var a;
      const o = fn$1[e];
      o && ((a = t.onMessage) == null || a.call(t, o, { event: o, ...n }));
    }
    function G(e, n) {
      var o, a, d, p;
      if (e === k.ToolCallStarted) {
        const u = Cn$1(n);
        T.set(u.callId, {
          call: {
            callId: u.callId,
            name: u.name,
            executionMode: u.executionMode
          },
          interruptible: u.interruptible,
          turnId: u.turnId ?? K
        }), z(), B(), L = we$2.ToolActive, (o = t.onAgentActivityStateChange) == null || o.call(t, we$2.ToolActive), (a = t.onToolEvent) == null || a.call(t, Be$1.Started, u);
        return;
      }
      if (e === k.ToolCallDone) {
        const u = we$1(n);
        de(u.callId), (d = t.onToolEvent) == null || d.call(t, Be$1.Done, u);
        return;
      }
      if (e === k.ToolCallError) {
        const u = vn$1(n);
        de(u.callId), (p = t.onToolEvent) == null || p.call(t, Be$1.Error, u);
      }
    }
    function de(e) {
      T.delete(e) && (z(), B());
    }
    function Ve(e) {
      let n = false;
      for (const [o, a] of T)
        a.call.executionMode === "blocking" && (e !== null && a.turnId !== null && a.turnId !== e || (T.delete(o), n = true));
      n && (z(), B());
    }
    function z() {
      var n;
      const e = ![...T.values()].some(({ call: o }) => o.executionMode === "blocking");
      e !== q && (q = e, (n = t.onInterruptibleChange) == null || n.call(t, e));
    }
    function B() {
      var e;
      (e = t.onRunningToolCallsChange) == null || e.call(
        t,
        T.size === 0 ? hn$1 : [...T.values()].map(({ call: n }) => n)
      );
    }
    function Oe(e, n) {
      var o, a, d;
      if (e === k.StreamVideoCreated) {
        L = we$2.Talking, (o = t.onAgentActivityStateChange) == null || o.call(t, we$2.Talking), v == null || v.arm({
          sttLatency: (a = n == null ? void 0 : n.stt) == null ? void 0 : a.latency,
          serviceLatency: n == null ? void 0 : n.serviceLatency
        });
        return;
      }
      if (T.size > 0) {
        L !== we$2.ToolActive && (L = we$2.ToolActive, (d = t.onAgentActivityStateChange) == null || d.call(t, we$2.ToolActive));
        return;
      }
    }
    function J(e, n) {
      var p, u, h, C;
      const o = ((u = (p = m == null ? void 0 : m.getReport()) == null ? void 0 : p.webRTCStats) == null ? void 0 : u.avgRtt) ?? 0, a = o > 0 ? Math.round(o / 2 * 1e3) : 0, d = { ...n, downstreamNetworkLatency: a };
      s.debug && ((h = n == null ? void 0 : n.metadata) != null && h.sentiment) && (d.sentiment = {
        id: n.metadata.sentiment.id,
        name: n.metadata.sentiment.sentiment
      }), (C = t.onMessage) == null || C.call(t, e, d), Oe(e, n);
    }
    function Ue(e, n) {
      var o;
      (o = t.onMessage) == null || o.call(t, F.Transcribe, { event: F.Transcribe, ...n }), queueMicrotask(() => {
        var a;
        (a = t.onAgentActivityStateChange) == null || a.call(t, we$2.Loading);
      });
    }
    function je(e, n) {
      var o;
      K = (n == null ? void 0 : n.turn_id) ?? null, L = we$2.Loading, (o = t.onAgentActivityStateChange) == null || o.call(t, we$2.Loading);
    }
    function Ne(e, n) {
      var a;
      const o = (n == null ? void 0 : n.turn_id) ?? null;
      K !== null && o !== null && o < K || (Ve(o), L = we$2.Idle, (a = t.onAgentActivityStateChange) == null || a.call(t, we$2.Idle));
    }
    function le(e, n) {
      H = (n == null ? void 0 : n.reason) ?? null;
    }
    const ze = {
      [k.ChatAnswer]: ue,
      [k.ChatPartial]: ue,
      [k.ToolCallStarted]: G,
      [k.ToolCallDone]: G,
      [k.ToolCallError]: G,
      [k.StreamVideoCreated]: J,
      [k.StreamVideoDone]: J,
      [k.StreamVideoError]: J,
      [k.StreamVideoRejected]: J,
      [k.ChatAudioTranscribed]: Ue,
      [k.TurnStarted]: je,
      [k.TurnEnded]: Ne,
      [k.StreamDone]: le,
      [k.StreamFailed]: le
    };
    function Be(e, n, o, a) {
      const d = mn$1.decode(e);
      let p;
      try {
        p = JSON.parse(d);
      } catch (C) {
        i("Failed to parse data channel message:", C);
        return;
      }
      const u = a || p.subject;
      if (i("Data received:", { subject: u, data: p }), !u) return;
      const h = ze[u];
      if (h)
        try {
          h(u, p);
        } catch (C) {
          console.warn("[LiveKitStreamingManager] Data channel handler failed", { subject: u, error: C });
        }
    }
    function Je(e) {
      i("Media devices error:", e), F$1(j$1());
    }
    function Qe(e) {
      i("Encryption error:", e), F$1(j$1());
    }
    function We(e, n, o) {
      i("Track subscription failed:", { trackSid: e, participant: n, reason: o });
    }
    function qe(e, n, o) {
      for (const [a, d] of o)
        if (d.source === n && d.track) {
          const p = d.track.mediaStreamTrack;
          if (p === e || (p == null ? void 0 : p.id) === e.id)
            return d;
        }
      return null;
    }
    async function pe(e, n, o, a, d, p) {
      var V, O, $;
      if (!y || !c)
        throw i(`Room is not connected, cannot publish ${a} stream`), new Error("Room is not connected");
      if (e.isPublishing) {
        i(`${a} publish already in progress, skipping`);
        return;
      }
      const u = o(n);
      if (u.length === 0)
        throw new Error(`No ${a} track found in the provided MediaStream`);
      const h = u[0], C = qe(h, a, d());
      if (C) {
        i(`${a} track is already published, skipping`, {
          trackId: h.id,
          publishedTrackId: (O = (V = C.track) == null ? void 0 : V.mediaStreamTrack) == null ? void 0 : O.id
        }), e.publication = C;
        return;
      }
      if (($ = e.publication) != null && $.track) {
        const A = e.publication.track.mediaStreamTrack;
        A !== h && (A == null ? void 0 : A.id) !== h.id && (i(`Unpublishing existing ${a} track before publishing new one`), await p());
      }
      i(`Publishing ${a} track from provided MediaStream`, { trackId: h.id }), e.isPublishing = true;
      try {
        e.publication = await c.localParticipant.publishTrack(h, { source: a }), i(`${a} track published successfully`, { trackSid: e.publication.trackSid });
      } catch (A) {
        throw i(`Failed to publish ${a} track:`, A), A;
      } finally {
        e.isPublishing = false;
      }
    }
    async function fe(e, n) {
      if (!(!e.publication || !e.publication.track))
        try {
          c && (await c.localParticipant.unpublishTrack(e.publication.track, !1), i(`${n} track unpublished`));
        } catch (o) {
          i(`Error unpublishing ${n} track:`, o);
        } finally {
          e.publication = null;
        }
    }
    async function He(e) {
      return pe(
        P,
        e,
        (n) => n.getAudioTracks(),
        oe.Source.Microphone,
        () => c.localParticipant.audioTrackPublications,
        X
      );
    }
    async function X() {
      return fe(P, "Microphone");
    }
    async function Ge(e) {
      if (!y || !c)
        throw i("Cannot replace microphone track: room is not connected"), new Error("Room is not connected");
      if (e.kind !== "audio")
        throw i("Cannot replace microphone track: not an audio track", { kind: e.kind }), new Error("Microphone track must be an audio track");
      if (P.isPublishing)
        throw i("Cannot replace microphone track: publish in progress"), new Error("Microphone publish in progress");
      const n = P.publication;
      if (!n || !n.track)
        throw i("Cannot replace microphone track: no publication to replace"), new Error("No microphone publication to replace");
      try {
        P.isPublishing = !0, await n.track.replaceTrack(e), i("Microphone track replaced", { trackId: e.id, trackSid: n.trackSid });
      } finally {
        P.isPublishing = false;
      }
    }
    async function Xe(e) {
      return pe(
        W,
        e,
        (n) => n.getVideoTracks(),
        oe.Source.Camera,
        () => c.localParticipant.videoTrackPublications,
        Z
      );
    }
    async function Z() {
      return fe(W, "Camera");
    }
    function Ze() {
      R && (R.getTracks().forEach((e) => e.stop()), R = null);
    }
    async function Y(e, n) {
      if (!y || !c) {
        i("Room is not connected for sending messages"), F$1(j$1());
        return;
      }
      try {
        await c.localParticipant.sendText(n, { topic: e }), i("Message sent successfully:", n);
      } catch (o) {
        i("Failed to send message:", o), F$1(j$1());
      }
    }
    async function ee(e) {
      var n, o;
      b && (clearTimeout(b), b = null), v == null || v.destroy(), v = null, c && ((n = t.onConnectionStateChange) == null || n.call(t, R$1.Disconnecting, e), await Promise.all([X(), Z()]), await c.disconnect()), Ze(), y = false, D = false, T.size > 0 && (T.clear(), z(), B()), K = null, (o = t.onAgentActivityStateChange) == null || o.call(t, we$2.Idle), L = we$2.Idle;
    }
    return {
      speak(e) {
        const n = typeof e == "string" ? e : JSON.stringify(e);
        return Y(Re$1.Speak, n);
      },
      disconnect: () => ee("user:disconnect"),
      async reconnect() {
        var e, n;
        if ((c == null ? void 0 : c.state) === M.Connected) {
          i("Room is already connected");
          return;
        }
        if (!c || !x || !_)
          throw i("Cannot reconnect: missing room, URL or token"), new Error("Cannot reconnect: session not available");
        i("Reconnecting to LiveKit room, state:", c.state), D = false, H = null, (e = t.onConnectionStateChange) == null || e.call(t, R$1.Connecting, "user:reconnect");
        try {
          if (await c.connect(x, _), i("Room reconnected"), y = !0, c.remoteParticipants.size === 0) {
            if (i("Waiting for agent to join..."), !await new Promise((a) => {
              const d = setTimeout(() => {
                c == null || c.off(g.ParticipantConnected, p), a(!1);
              }, 5e3), p = () => {
                clearTimeout(d), c == null || c.off(g.ParticipantConnected, p), a(!0);
              };
              c == null || c.on(g.ParticipantConnected, p);
            }))
              throw i("Agent did not join within timeout"), await c.disconnect(), new Error("Agent did not rejoin the room");
            i("Agent joined, reconnection successful");
          }
        } catch (o) {
          throw i("Failed to reconnect:", o), (n = t.onConnectionStateChange) == null || n.call(t, R$1.Fail, "user:reconnect-failed"), o;
        }
      },
      sendDataChannelMessage: Y,
      publishMicrophoneStream: He,
      unpublishMicrophoneStream: X,
      replaceMicrophoneTrack: Ge,
      publishCameraStream: Xe,
      unpublishCameraStream: Z,
      interrupt(e) {
        return e === "text" || !y || !c ? false : (Y(Re$1.Interrupt, ""), true);
      },
      registerRpcMethod(e, n) {
        c == null || c.registerRpcMethod(e, Ae$1(ie, n));
      },
      unregisterRpcMethod(e) {
        c == null || c.unregisterRpcMethod(e);
      },
      sessionId: k$1,
      streamId: k$1,
      streamType: ae,
      interruptAvailable: ce,
      // A getter, not a snapshot: currentInterruptible changes as blocking tool calls come and go.
      get isInterruptible() {
        return q;
      }
    };
  }

  var livekitManagerCWngBsPu = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createLiveKitStreamingManager: An$1,
    preloadLiveKit: yn$1
  });

  function Hc(i, e) {
    return e.forEach(function(t) {
      t && typeof t != "string" && !Array.isArray(t) && Object.keys(t).forEach(function(n) {
        if (n !== "default" && !(n in i)) {
          var s = Object.getOwnPropertyDescriptor(t, n);
          Object.defineProperty(i, n, s.get ? s : { enumerable: true, get: function() {
            return t[n];
          } });
        }
      });
    }), Object.freeze(i);
  }
  var Kc = Object.defineProperty, Gc = (i, e, t) => e in i ? Kc(i, e, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: t
  }) : i[e] = t, ur = (i, e, t) => Gc(i, typeof e != "symbol" ? e + "" : e, t);
  class ce {
    constructor() {
      ur(this, "_locking"), ur(this, "_locks"), this._locking = Promise.resolve(), this._locks = 0;
    }
    isLocked() {
      return this._locks > 0;
    }
    lock() {
      this._locks += 1;
      let e;
      const t = new Promise((s) => e = () => {
        this._locks -= 1, s();
      }), n = this._locking.then(() => e);
      return this._locking = this._locking.then(() => t), n;
    }
  }
  function $(i, e) {
    if (!i)
      throw new Error(e);
  }
  const Jc = 34028234663852886e22, zc = -34028234663852886e22, Yc = 4294967295, Qc = 2147483647, Xc = -2147483648;
  function On(i) {
    if (typeof i != "number") throw new Error("invalid int 32: " + typeof i);
    if (!Number.isInteger(i) || i > Qc || i < Xc) throw new Error("invalid int 32: " + i);
  }
  function $i(i) {
    if (typeof i != "number") throw new Error("invalid uint 32: " + typeof i);
    if (!Number.isInteger(i) || i > Yc || i < 0) throw new Error("invalid uint 32: " + i);
  }
  function Oa(i) {
    if (typeof i != "number") throw new Error("invalid float 32: " + typeof i);
    if (Number.isFinite(i) && (i > Jc || i < zc))
      throw new Error("invalid float 32: " + i);
  }
  const Ma = Symbol("@bufbuild/protobuf/enum-type");
  function $c(i) {
    const e = i[Ma];
    return $(e, "missing enum type on enum object"), e;
  }
  function Da(i, e, t, n) {
    i[Ma] = Aa(e, t.map((s) => ({
      no: s.no,
      name: s.name,
      localName: i[s.no]
    })));
  }
  function Aa(i, e, t) {
    const n = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null), r = [];
    for (const a of e) {
      const o = xa(a);
      r.push(o), n[a.name] = o, s[a.no] = o;
    }
    return {
      typeName: i,
      values: r,
      // We do not surface options at this time
      // options: opt?.options ?? Object.create(null),
      findName(a) {
        return n[a];
      },
      findNumber(a) {
        return s[a];
      }
    };
  }
  function Zc(i, e, t) {
    const n = {};
    for (const s of e) {
      const r = xa(s);
      n[r.localName] = r.no, n[r.no] = r.localName;
    }
    return Da(n, i, e), n;
  }
  function xa(i) {
    return "localName" in i ? i : Object.assign(Object.assign({}, i), {
      localName: i.name
    });
  }
  class Os {
    /**
     * Compare with a message of the same type.
     * Note that this function disregards extensions and unknown fields.
     */
    equals(e) {
      return this.getType().runtime.util.equals(this.getType(), this, e);
    }
    /**
     * Create a deep copy.
     */
    clone() {
      return this.getType().runtime.util.clone(this);
    }
    /**
     * Parse from binary data, merging fields.
     *
     * Repeated fields are appended. Map entries are added, overwriting
     * existing keys.
     *
     * If a message field is already present, it will be merged with the
     * new data.
     */
    fromBinary(e, t) {
      const n = this.getType(), s = n.runtime.bin, r = s.makeReadOptions(t);
      return s.readMessage(this, r.readerFactory(e), e.byteLength, r), this;
    }
    /**
     * Parse a message from a JSON value.
     */
    fromJson(e, t) {
      const n = this.getType(), s = n.runtime.json, r = s.makeReadOptions(t);
      return s.readMessage(n, e, r, this), this;
    }
    /**
     * Parse a message from a JSON string.
     */
    fromJsonString(e, t) {
      let n;
      try {
        n = JSON.parse(e);
      } catch (s) {
        throw new Error("cannot decode ".concat(this.getType().typeName, " from JSON: ").concat(s instanceof Error ? s.message : String(s)));
      }
      return this.fromJson(n, t);
    }
    /**
     * Serialize the message to binary data.
     */
    toBinary(e) {
      const t = this.getType(), n = t.runtime.bin, s = n.makeWriteOptions(e), r = s.writerFactory();
      return n.writeMessage(this, r, s), r.finish();
    }
    /**
     * Serialize the message to a JSON value, a JavaScript value that can be
     * passed to JSON.stringify().
     */
    toJson(e) {
      const t = this.getType(), n = t.runtime.json, s = n.makeWriteOptions(e);
      return n.writeMessage(this, s);
    }
    /**
     * Serialize the message to a JSON string.
     */
    toJsonString(e) {
      var t;
      const n = this.toJson(e);
      return JSON.stringify(n, null, (t = e == null ? void 0 : e.prettySpaces) !== null && t !== void 0 ? t : 0);
    }
    /**
     * Override for serialization behavior. This will be invoked when calling
     * JSON.stringify on this message (i.e. JSON.stringify(msg)).
     *
     * Note that this will not serialize google.protobuf.Any with a packed
     * message because the protobuf JSON format specifies that it needs to be
     * unpacked, and this is only possible with a type registry to look up the
     * message type.  As a result, attempting to serialize a message with this
     * type will throw an Error.
     *
     * This method is protected because you should not need to invoke it
     * directly -- instead use JSON.stringify or toJsonString for
     * stringified JSON.  Alternatively, if actual JSON is desired, you should
     * use toJson.
     */
    toJSON() {
      return this.toJson({
        emitDefaultValues: true
      });
    }
    /**
     * Retrieve the MessageType of this message - a singleton that represents
     * the protobuf message declaration and provides metadata for reflection-
     * based operations.
     */
    getType() {
      return Object.getPrototypeOf(this).constructor;
    }
  }
  function ed(i, e, t, n) {
    var s;
    const r = (s = n == null ? void 0 : n.localName) !== null && s !== void 0 ? s : e.substring(e.lastIndexOf(".") + 1), a = {
      [r]: function(o) {
        i.util.initFields(this), i.util.initPartial(o, this);
      }
    }[r];
    return Object.setPrototypeOf(a.prototype, new Os()), Object.assign(a, {
      runtime: i,
      typeName: e,
      fields: i.util.newFieldList(t),
      fromBinary(o, d) {
        return new a().fromBinary(o, d);
      },
      fromJson(o, d) {
        return new a().fromJson(o, d);
      },
      fromJsonString(o, d) {
        return new a().fromJsonString(o, d);
      },
      equals(o, d) {
        return i.util.equals(a, o, d);
      }
    }), a;
  }
  function td() {
    let i = 0, e = 0;
    for (let n = 0; n < 28; n += 7) {
      let s = this.buf[this.pos++];
      if (i |= (s & 127) << n, (s & 128) == 0)
        return this.assertBounds(), [i, e];
    }
    let t = this.buf[this.pos++];
    if (i |= (t & 15) << 28, e = (t & 112) >> 4, (t & 128) == 0)
      return this.assertBounds(), [i, e];
    for (let n = 3; n <= 31; n += 7) {
      let s = this.buf[this.pos++];
      if (e |= (s & 127) << n, (s & 128) == 0)
        return this.assertBounds(), [i, e];
    }
    throw new Error("invalid varint");
  }
  function Oi(i, e, t) {
    for (let r = 0; r < 28; r = r + 7) {
      const a = i >>> r, o = !(!(a >>> 7) && e == 0), d = (o ? a | 128 : a) & 255;
      if (t.push(d), !o)
        return;
    }
    const n = i >>> 28 & 15 | (e & 7) << 4, s = e >> 3 != 0;
    if (t.push((s ? n | 128 : n) & 255), !!s) {
      for (let r = 3; r < 31; r = r + 7) {
        const a = e >>> r, o = !!(a >>> 7), d = (o ? a | 128 : a) & 255;
        if (t.push(d), !o)
          return;
      }
      t.push(e >>> 31 & 1);
    }
  }
  const Mn = 4294967296;
  function hr(i) {
    const e = i[0] === "-";
    e && (i = i.slice(1));
    const t = 1e6;
    let n = 0, s = 0;
    function r(a, o) {
      const d = Number(i.slice(a, o));
      s *= t, n = n * t + d, n >= Mn && (s = s + (n / Mn | 0), n = n % Mn);
    }
    return r(-24, -18), r(-18, -12), r(-12, -6), r(-6), e ? La(n, s) : Ms(n, s);
  }
  function nd(i, e) {
    let t = Ms(i, e);
    const n = t.hi & 2147483648;
    n && (t = La(t.lo, t.hi));
    const s = Na(t.lo, t.hi);
    return n ? "-" + s : s;
  }
  function Na(i, e) {
    if ({
      lo: i,
      hi: e
    } = id(i, e), e <= 2097151)
      return String(Mn * e + i);
    const t = i & 16777215, n = (i >>> 24 | e << 8) & 16777215, s = e >> 16 & 65535;
    let r = t + n * 6777216 + s * 6710656, a = n + s * 8147497, o = s * 2;
    const d = 1e7;
    return r >= d && (a += Math.floor(r / d), r %= d), a >= d && (o += Math.floor(a / d), a %= d), o.toString() + fr(a) + fr(r);
  }
  function id(i, e) {
    return {
      lo: i >>> 0,
      hi: e >>> 0
    };
  }
  function Ms(i, e) {
    return {
      lo: i | 0,
      hi: e | 0
    };
  }
  function La(i, e) {
    return e = ~e, i ? i = ~i + 1 : e += 1, Ms(i, e);
  }
  const fr = (i) => {
    const e = String(i);
    return "0000000".slice(e.length) + e;
  };
  function mr(i, e) {
    if (i >= 0) {
      for (; i > 127; )
        e.push(i & 127 | 128), i = i >>> 7;
      e.push(i);
    } else {
      for (let t = 0; t < 9; t++)
        e.push(i & 127 | 128), i = i >> 7;
      e.push(1);
    }
  }
  function sd() {
    let i = this.buf[this.pos++], e = i & 127;
    if ((i & 128) == 0)
      return this.assertBounds(), e;
    if (i = this.buf[this.pos++], e |= (i & 127) << 7, (i & 128) == 0)
      return this.assertBounds(), e;
    if (i = this.buf[this.pos++], e |= (i & 127) << 14, (i & 128) == 0)
      return this.assertBounds(), e;
    if (i = this.buf[this.pos++], e |= (i & 127) << 21, (i & 128) == 0)
      return this.assertBounds(), e;
    i = this.buf[this.pos++], e |= (i & 15) << 28;
    for (let t = 5; (i & 128) !== 0 && t < 10; t++) i = this.buf[this.pos++];
    if ((i & 128) != 0) throw new Error("invalid varint");
    return this.assertBounds(), e >>> 0;
  }
  function rd() {
    const i = new DataView(new ArrayBuffer(8));
    if (typeof BigInt == "function" && typeof i.getBigInt64 == "function" && typeof i.getBigUint64 == "function" && typeof i.setBigInt64 == "function" && typeof i.setBigUint64 == "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
      const s = BigInt("-9223372036854775808"), r = BigInt("9223372036854775807"), a = BigInt("0"), o = BigInt("18446744073709551615");
      return {
        zero: BigInt(0),
        supported: true,
        parse(d) {
          const c = typeof d == "bigint" ? d : BigInt(d);
          if (c > r || c < s)
            throw new Error("int64 invalid: ".concat(d));
          return c;
        },
        uParse(d) {
          const c = typeof d == "bigint" ? d : BigInt(d);
          if (c > o || c < a)
            throw new Error("uint64 invalid: ".concat(d));
          return c;
        },
        enc(d) {
          return i.setBigInt64(0, this.parse(d), true), {
            lo: i.getInt32(0, true),
            hi: i.getInt32(4, true)
          };
        },
        uEnc(d) {
          return i.setBigInt64(0, this.uParse(d), true), {
            lo: i.getInt32(0, true),
            hi: i.getInt32(4, true)
          };
        },
        dec(d, c) {
          return i.setInt32(0, d, true), i.setInt32(4, c, true), i.getBigInt64(0, true);
        },
        uDec(d, c) {
          return i.setInt32(0, d, true), i.setInt32(4, c, true), i.getBigUint64(0, true);
        }
      };
    }
    const t = (s) => $(/^-?[0-9]+$/.test(s), "int64 invalid: ".concat(s)), n = (s) => $(/^[0-9]+$/.test(s), "uint64 invalid: ".concat(s));
    return {
      zero: "0",
      supported: false,
      parse(s) {
        return typeof s != "string" && (s = s.toString()), t(s), s;
      },
      uParse(s) {
        return typeof s != "string" && (s = s.toString()), n(s), s;
      },
      enc(s) {
        return typeof s != "string" && (s = s.toString()), t(s), hr(s);
      },
      uEnc(s) {
        return typeof s != "string" && (s = s.toString()), n(s), hr(s);
      },
      dec(s, r) {
        return nd(s, r);
      },
      uDec(s, r) {
        return Na(s, r);
      }
    };
  }
  const Y = rd();
  var E;
  (function(i) {
    i[i.DOUBLE = 1] = "DOUBLE", i[i.FLOAT = 2] = "FLOAT", i[i.INT64 = 3] = "INT64", i[i.UINT64 = 4] = "UINT64", i[i.INT32 = 5] = "INT32", i[i.FIXED64 = 6] = "FIXED64", i[i.FIXED32 = 7] = "FIXED32", i[i.BOOL = 8] = "BOOL", i[i.STRING = 9] = "STRING", i[i.BYTES = 12] = "BYTES", i[i.UINT32 = 13] = "UINT32", i[i.SFIXED32 = 15] = "SFIXED32", i[i.SFIXED64 = 16] = "SFIXED64", i[i.SINT32 = 17] = "SINT32", i[i.SINT64 = 18] = "SINT64";
  })(E || (E = {}));
  var ft;
  (function(i) {
    i[i.BIGINT = 0] = "BIGINT", i[i.STRING = 1] = "STRING";
  })(ft || (ft = {}));
  function rt(i, e, t) {
    if (e === t)
      return true;
    if (i == E.BYTES) {
      if (!(e instanceof Uint8Array) || !(t instanceof Uint8Array) || e.length !== t.length)
        return false;
      for (let n = 0; n < e.length; n++)
        if (e[n] !== t[n])
          return false;
      return true;
    }
    switch (i) {
      case E.UINT64:
      case E.FIXED64:
      case E.INT64:
      case E.SFIXED64:
      case E.SINT64:
        return e == t;
    }
    return false;
  }
  function Kt(i, e) {
    switch (i) {
      case E.BOOL:
        return false;
      case E.UINT64:
      case E.FIXED64:
      case E.INT64:
      case E.SFIXED64:
      case E.SINT64:
        return e == 0 ? Y.zero : "0";
      case E.DOUBLE:
      case E.FLOAT:
        return 0;
      case E.BYTES:
        return new Uint8Array(0);
      case E.STRING:
        return "";
      default:
        return 0;
    }
  }
  function Ua(i, e) {
    switch (i) {
      case E.BOOL:
        return e === false;
      case E.STRING:
        return e === "";
      case E.BYTES:
        return e instanceof Uint8Array && !e.byteLength;
      default:
        return e == 0;
    }
  }
  var ne;
  (function(i) {
    i[i.Varint = 0] = "Varint", i[i.Bit64 = 1] = "Bit64", i[i.LengthDelimited = 2] = "LengthDelimited", i[i.StartGroup = 3] = "StartGroup", i[i.EndGroup = 4] = "EndGroup", i[i.Bit32 = 5] = "Bit32";
  })(ne || (ne = {}));
  class ad {
    constructor(e) {
      this.stack = [], this.textEncoder = e ?? new TextEncoder(), this.chunks = [], this.buf = [];
    }
    /**
     * Return all bytes written and reset this writer.
     */
    finish() {
      this.chunks.push(new Uint8Array(this.buf));
      let e = 0;
      for (let s = 0; s < this.chunks.length; s++) e += this.chunks[s].length;
      let t = new Uint8Array(e), n = 0;
      for (let s = 0; s < this.chunks.length; s++)
        t.set(this.chunks[s], n), n += this.chunks[s].length;
      return this.chunks = [], t;
    }
    /**
     * Start a new fork for length-delimited data like a message
     * or a packed repeated field.
     *
     * Must be joined later with `join()`.
     */
    fork() {
      return this.stack.push({
        chunks: this.chunks,
        buf: this.buf
      }), this.chunks = [], this.buf = [], this;
    }
    /**
     * Join the last fork. Write its length and bytes, then
     * return to the previous state.
     */
    join() {
      let e = this.finish(), t = this.stack.pop();
      if (!t) throw new Error("invalid state, fork stack empty");
      return this.chunks = t.chunks, this.buf = t.buf, this.uint32(e.byteLength), this.raw(e);
    }
    /**
     * Writes a tag (field number and wire type).
     *
     * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
     *
     * Generated code should compute the tag ahead of time and call `uint32()`.
     */
    tag(e, t) {
      return this.uint32((e << 3 | t) >>> 0);
    }
    /**
     * Write a chunk of raw bytes.
     */
    raw(e) {
      return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(e), this;
    }
    /**
     * Write a `uint32` value, an unsigned 32 bit varint.
     */
    uint32(e) {
      for ($i(e); e > 127; )
        this.buf.push(e & 127 | 128), e = e >>> 7;
      return this.buf.push(e), this;
    }
    /**
     * Write a `int32` value, a signed 32 bit varint.
     */
    int32(e) {
      return On(e), mr(e, this.buf), this;
    }
    /**
     * Write a `bool` value, a variant.
     */
    bool(e) {
      return this.buf.push(e ? 1 : 0), this;
    }
    /**
     * Write a `bytes` value, length-delimited arbitrary data.
     */
    bytes(e) {
      return this.uint32(e.byteLength), this.raw(e);
    }
    /**
     * Write a `string` value, length-delimited data converted to UTF-8 text.
     */
    string(e) {
      let t = this.textEncoder.encode(e);
      return this.uint32(t.byteLength), this.raw(t);
    }
    /**
     * Write a `float` value, 32-bit floating point number.
     */
    float(e) {
      Oa(e);
      let t = new Uint8Array(4);
      return new DataView(t.buffer).setFloat32(0, e, true), this.raw(t);
    }
    /**
     * Write a `double` value, a 64-bit floating point number.
     */
    double(e) {
      let t = new Uint8Array(8);
      return new DataView(t.buffer).setFloat64(0, e, true), this.raw(t);
    }
    /**
     * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
     */
    fixed32(e) {
      $i(e);
      let t = new Uint8Array(4);
      return new DataView(t.buffer).setUint32(0, e, true), this.raw(t);
    }
    /**
     * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
     */
    sfixed32(e) {
      On(e);
      let t = new Uint8Array(4);
      return new DataView(t.buffer).setInt32(0, e, true), this.raw(t);
    }
    /**
     * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
     */
    sint32(e) {
      return On(e), e = (e << 1 ^ e >> 31) >>> 0, mr(e, this.buf), this;
    }
    /**
     * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
     */
    sfixed64(e) {
      let t = new Uint8Array(8), n = new DataView(t.buffer), s = Y.enc(e);
      return n.setInt32(0, s.lo, true), n.setInt32(4, s.hi, true), this.raw(t);
    }
    /**
     * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
     */
    fixed64(e) {
      let t = new Uint8Array(8), n = new DataView(t.buffer), s = Y.uEnc(e);
      return n.setInt32(0, s.lo, true), n.setInt32(4, s.hi, true), this.raw(t);
    }
    /**
     * Write a `int64` value, a signed 64-bit varint.
     */
    int64(e) {
      let t = Y.enc(e);
      return Oi(t.lo, t.hi, this.buf), this;
    }
    /**
     * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64(e) {
      let t = Y.enc(e), n = t.hi >> 31, s = t.lo << 1 ^ n, r = (t.hi << 1 | t.lo >>> 31) ^ n;
      return Oi(s, r, this.buf), this;
    }
    /**
     * Write a `uint64` value, an unsigned 64-bit varint.
     */
    uint64(e) {
      let t = Y.uEnc(e);
      return Oi(t.lo, t.hi, this.buf), this;
    }
  }
  class od {
    constructor(e, t) {
      this.varint64 = td, this.uint32 = sd, this.buf = e, this.len = e.length, this.pos = 0, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength), this.textDecoder = t ?? new TextDecoder();
    }
    /**
     * Reads a tag - field number and wire type.
     */
    tag() {
      let e = this.uint32(), t = e >>> 3, n = e & 7;
      if (t <= 0 || n < 0 || n > 5) throw new Error("illegal tag: field no " + t + " wire type " + n);
      return [t, n];
    }
    /**
     * Skip one element and return the skipped data.
     *
     * When skipping StartGroup, provide the tags field number to check for
     * matching field number in the EndGroup tag.
     */
    skip(e, t) {
      let n = this.pos;
      switch (e) {
        case ne.Varint:
          for (; this.buf[this.pos++] & 128; )
            ;
          break;
        // eslint-disable-next-line
        // @ts-ignore TS7029: Fallthrough case in switch
        case ne.Bit64:
          this.pos += 4;
        // eslint-disable-next-line
        // @ts-ignore TS7029: Fallthrough case in switch
        case ne.Bit32:
          this.pos += 4;
          break;
        case ne.LengthDelimited:
          let s = this.uint32();
          this.pos += s;
          break;
        case ne.StartGroup:
          for (; ; ) {
            const [r, a] = this.tag();
            if (a === ne.EndGroup) {
              if (t !== void 0 && r !== t)
                throw new Error("invalid end group tag");
              break;
            }
            this.skip(a, r);
          }
          break;
        default:
          throw new Error("cant skip wire type " + e);
      }
      return this.assertBounds(), this.buf.subarray(n, this.pos);
    }
    /**
     * Throws error if position in byte array is out of range.
     */
    assertBounds() {
      if (this.pos > this.len) throw new RangeError("premature EOF");
    }
    /**
     * Read a `int32` field, a signed 32 bit varint.
     */
    int32() {
      return this.uint32() | 0;
    }
    /**
     * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
     */
    sint32() {
      let e = this.uint32();
      return e >>> 1 ^ -(e & 1);
    }
    /**
     * Read a `int64` field, a signed 64-bit varint.
     */
    int64() {
      return Y.dec(...this.varint64());
    }
    /**
     * Read a `uint64` field, an unsigned 64-bit varint.
     */
    uint64() {
      return Y.uDec(...this.varint64());
    }
    /**
     * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64() {
      let [e, t] = this.varint64(), n = -(e & 1);
      return e = (e >>> 1 | (t & 1) << 31) ^ n, t = t >>> 1 ^ n, Y.dec(e, t);
    }
    /**
     * Read a `bool` field, a variant.
     */
    bool() {
      let [e, t] = this.varint64();
      return e !== 0 || t !== 0;
    }
    /**
     * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
     */
    fixed32() {
      return this.view.getUint32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
     */
    sfixed32() {
      return this.view.getInt32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
     */
    fixed64() {
      return Y.uDec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
     */
    sfixed64() {
      return Y.dec(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `float` field, 32-bit floating point number.
     */
    float() {
      return this.view.getFloat32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `double` field, a 64-bit floating point number.
     */
    double() {
      return this.view.getFloat64((this.pos += 8) - 8, true);
    }
    /**
     * Read a `bytes` field, length-delimited arbitrary data.
     */
    bytes() {
      let e = this.uint32(), t = this.pos;
      return this.pos += e, this.assertBounds(), this.buf.subarray(t, t + e);
    }
    /**
     * Read a `string` field, length-delimited data converted to UTF-8 text.
     */
    string() {
      return this.textDecoder.decode(this.bytes());
    }
  }
  function cd(i, e, t, n) {
    let s;
    return {
      typeName: e,
      extendee: t,
      get field() {
        if (!s) {
          const r = typeof n == "function" ? n() : n;
          r.name = e.split(".").pop(), r.jsonName = "[".concat(e, "]"), s = i.util.newFieldList([r]).list()[0];
        }
        return s;
      },
      runtime: i
    };
  }
  function Fa(i) {
    const e = i.field.localName, t = /* @__PURE__ */ Object.create(null);
    return t[e] = dd(i), [t, () => t[e]];
  }
  function dd(i) {
    const e = i.field;
    if (e.repeated)
      return [];
    if (e.default !== void 0)
      return e.default;
    switch (e.kind) {
      case "enum":
        return e.T.values[0].no;
      case "scalar":
        return Kt(e.T, e.L);
      case "message":
        const t = e.T, n = new t();
        return t.fieldWrapper ? t.fieldWrapper.unwrapField(n) : n;
      case "map":
        throw "map fields are not allowed to be extensions";
    }
  }
  function ld(i, e) {
    if (!e.repeated && (e.kind == "enum" || e.kind == "scalar")) {
      for (let t = i.length - 1; t >= 0; --t)
        if (i[t].no == e.no)
          return [i[t]];
      return [];
    }
    return i.filter((t) => t.no === e.no);
  }
  let it = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), ii = [];
  for (let i = 0; i < it.length; i++) ii[it[i].charCodeAt(0)] = i;
  ii[45] = it.indexOf("+");
  ii[95] = it.indexOf("/");
  const Ba = {
    /**
     * Decodes a base64 string to a byte array.
     *
     * - ignores white-space, including line breaks and tabs
     * - allows inner padding (can decode concatenated base64 strings)
     * - does not require padding
     * - understands base64url encoding:
     *   "-" instead of "+",
     *   "_" instead of "/",
     *   no padding
     */
    dec(i) {
      let e = i.length * 3 / 4;
      i[i.length - 2] == "=" ? e -= 2 : i[i.length - 1] == "=" && (e -= 1);
      let t = new Uint8Array(e), n = 0, s = 0, r, a = 0;
      for (let o = 0; o < i.length; o++) {
        if (r = ii[i.charCodeAt(o)], r === void 0)
          switch (i[o]) {
            // @ts-ignore TS7029: Fallthrough case in switch
            case "=":
              s = 0;
            // reset state when padding found
            // @ts-ignore TS7029: Fallthrough case in switch
            case `
`:
            case "\r":
            case "	":
            case " ":
              continue;
            // skip white-space, and padding
            default:
              throw Error("invalid base64 string.");
          }
        switch (s) {
          case 0:
            a = r, s = 1;
            break;
          case 1:
            t[n++] = a << 2 | (r & 48) >> 4, a = r, s = 2;
            break;
          case 2:
            t[n++] = (a & 15) << 4 | (r & 60) >> 2, a = r, s = 3;
            break;
          case 3:
            t[n++] = (a & 3) << 6 | r, s = 0;
            break;
        }
      }
      if (s == 1) throw Error("invalid base64 string.");
      return t.subarray(0, n);
    },
    /**
     * Encode a byte array to a base64 string.
     */
    enc(i) {
      let e = "", t = 0, n, s = 0;
      for (let r = 0; r < i.length; r++)
        switch (n = i[r], t) {
          case 0:
            e += it[n >> 2], s = (n & 3) << 4, t = 1;
            break;
          case 1:
            e += it[s | n >> 4], s = (n & 15) << 2, t = 2;
            break;
          case 2:
            e += it[s | n >> 6], e += it[n & 63], t = 0;
            break;
        }
      return t && (e += it[s], e += "=", t == 1 && (e += "=")), e;
    }
  };
  function ud(i, e, t) {
    qa(e, i);
    const n = e.runtime.bin.makeReadOptions(t), s = ld(i.getType().runtime.bin.listUnknownFields(i), e.field), [r, a] = Fa(e);
    for (const o of s)
      e.runtime.bin.readField(r, n.readerFactory(o.data), e.field, o.wireType, n);
    return a();
  }
  function hd(i, e, t, n) {
    qa(e, i);
    const s = e.runtime.bin.makeReadOptions(n), r = e.runtime.bin.makeWriteOptions(n);
    if (ja(i, e)) {
      const c = i.getType().runtime.bin.listUnknownFields(i).filter((l) => l.no != e.field.no);
      i.getType().runtime.bin.discardUnknownFields(i);
      for (const l of c)
        i.getType().runtime.bin.onUnknownField(i, l.no, l.wireType, l.data);
    }
    const a = r.writerFactory();
    let o = e.field;
    !o.opt && !o.repeated && (o.kind == "enum" || o.kind == "scalar") && (o = Object.assign(Object.assign({}, e.field), {
      opt: true
    })), e.runtime.bin.writeField(o, t, a, r);
    const d = s.readerFactory(a.finish());
    for (; d.pos < d.len; ) {
      const [c, l] = d.tag(), u = d.skip(l, c);
      i.getType().runtime.bin.onUnknownField(i, c, l, u);
    }
  }
  function ja(i, e) {
    const t = i.getType();
    return e.extendee.typeName === t.typeName && !!t.runtime.bin.listUnknownFields(i).find((n) => n.no == e.field.no);
  }
  function qa(i, e) {
    $(i.extendee.typeName == e.getType().typeName, "extension ".concat(i.typeName, " can only be applied to message ").concat(i.extendee.typeName));
  }
  function Va(i, e) {
    const t = i.localName;
    if (i.repeated)
      return e[t].length > 0;
    if (i.oneof)
      return e[i.oneof.localName].case === t;
    switch (i.kind) {
      case "enum":
      case "scalar":
        return i.opt || i.req ? e[t] !== void 0 : i.kind == "enum" ? e[t] !== i.T.values[0].no : !Ua(i.T, e[t]);
      case "message":
        return e[t] !== void 0;
      case "map":
        return Object.keys(e[t]).length > 0;
    }
  }
  function pr(i, e) {
    const t = i.localName, n = !i.opt && !i.req;
    if (i.repeated)
      e[t] = [];
    else if (i.oneof)
      e[i.oneof.localName] = {
        case: void 0
      };
    else
      switch (i.kind) {
        case "map":
          e[t] = {};
          break;
        case "enum":
          e[t] = n ? i.T.values[0].no : void 0;
          break;
        case "scalar":
          e[t] = n ? Kt(i.T, i.L) : void 0;
          break;
        case "message":
          e[t] = void 0;
          break;
      }
  }
  function st(i, e) {
    if (i === null || typeof i != "object" || !Object.getOwnPropertyNames(Os.prototype).every((n) => n in i && typeof i[n] == "function"))
      return false;
    const t = i.getType();
    return t === null || typeof t != "function" || !("typeName" in t) || typeof t.typeName != "string" ? false : e === void 0 ? true : t.typeName == e.typeName;
  }
  function Wa(i, e) {
    return st(e) || !i.fieldWrapper ? e : i.fieldWrapper.wrapField(e);
  }
  E.DOUBLE, E.FLOAT, E.INT64, E.UINT64, E.INT32, E.UINT32, E.BOOL, E.STRING, E.BYTES;
  const gr = {
    ignoreUnknownFields: false
  }, vr = {
    emitDefaultValues: false,
    enumAsInteger: false,
    useProtoFieldName: false,
    prettySpaces: 0
  };
  function fd(i) {
    return i ? Object.assign(Object.assign({}, gr), i) : gr;
  }
  function md(i) {
    return i ? Object.assign(Object.assign({}, vr), i) : vr;
  }
  const Wn = Symbol(), Dn = Symbol();
  function pd() {
    return {
      makeReadOptions: fd,
      makeWriteOptions: md,
      readMessage(i, e, t, n) {
        if (e == null || Array.isArray(e) || typeof e != "object")
          throw new Error("cannot decode message ".concat(i.typeName, " from JSON: ").concat(Ge(e)));
        n = n ?? new i();
        const s = /* @__PURE__ */ new Map(), r = t.typeRegistry;
        for (const [a, o] of Object.entries(e)) {
          const d = i.fields.findJsonName(a);
          if (d) {
            if (d.oneof) {
              if (o === null && d.kind == "scalar")
                continue;
              const c = s.get(d.oneof);
              if (c !== void 0)
                throw new Error("cannot decode message ".concat(i.typeName, ' from JSON: multiple keys for oneof "').concat(d.oneof.name, '" present: "').concat(c, '", "').concat(a, '"'));
              s.set(d.oneof, a);
            }
            br(n, o, d, t, i);
          } else {
            let c = false;
            if (r != null && r.findExtension && a.startsWith("[") && a.endsWith("]")) {
              const l = r.findExtension(a.substring(1, a.length - 1));
              if (l && l.extendee.typeName == i.typeName) {
                c = true;
                const [u, h] = Fa(l);
                br(u, o, l.field, t, l), hd(n, l, h(), t);
              }
            }
            if (!c && !t.ignoreUnknownFields)
              throw new Error("cannot decode message ".concat(i.typeName, ' from JSON: key "').concat(a, '" is unknown'));
          }
        }
        return n;
      },
      writeMessage(i, e) {
        const t = i.getType(), n = {};
        let s;
        try {
          for (s of t.fields.byNumber()) {
            if (!Va(s, i)) {
              if (s.req)
                throw "required field not set";
              if (!e.emitDefaultValues || !vd(s))
                continue;
            }
            const a = s.oneof ? i[s.oneof.localName].value : i[s.localName], o = yr(s, a, e);
            o !== void 0 && (n[e.useProtoFieldName ? s.name : s.jsonName] = o);
          }
          const r = e.typeRegistry;
          if (r != null && r.findExtensionFor)
            for (const a of t.runtime.bin.listUnknownFields(i)) {
              const o = r.findExtensionFor(t.typeName, a.no);
              if (o && ja(i, o)) {
                const d = ud(i, o, e), c = yr(o.field, d, e);
                c !== void 0 && (n[o.field.jsonName] = c);
              }
            }
        } catch (r) {
          const a = s ? "cannot encode field ".concat(t.typeName, ".").concat(s.name, " to JSON") : "cannot encode message ".concat(t.typeName, " to JSON"), o = r instanceof Error ? r.message : String(r);
          throw new Error(a + (o.length > 0 ? ": ".concat(o) : ""));
        }
        return n;
      },
      readScalar(i, e, t) {
        return rn(i, e, t ?? ft.BIGINT, true);
      },
      writeScalar(i, e, t) {
        if (e !== void 0 && (t || Ua(i, e)))
          return An(i, e);
      },
      debug: Ge
    };
  }
  function Ge(i) {
    if (i === null)
      return "null";
    switch (typeof i) {
      case "object":
        return Array.isArray(i) ? "array" : "object";
      case "string":
        return i.length > 100 ? "string" : '"'.concat(i.split('"').join('\\"'), '"');
      default:
        return String(i);
    }
  }
  function br(i, e, t, n, s) {
    let r = t.localName;
    if (t.repeated) {
      if ($(t.kind != "map"), e === null)
        return;
      if (!Array.isArray(e))
        throw new Error("cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(Ge(e)));
      const a = i[r];
      for (const o of e) {
        if (o === null)
          throw new Error("cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(Ge(o)));
        switch (t.kind) {
          case "message":
            a.push(t.T.fromJson(o, n));
            break;
          case "enum":
            const d = Mi(t.T, o, n.ignoreUnknownFields, true);
            d !== Dn && a.push(d);
            break;
          case "scalar":
            try {
              a.push(rn(t.T, o, t.L, !0));
            } catch (c) {
              let l = "cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(Ge(o));
              throw c instanceof Error && c.message.length > 0 && (l += ": ".concat(c.message)), new Error(l);
            }
            break;
        }
      }
    } else if (t.kind == "map") {
      if (e === null)
        return;
      if (typeof e != "object" || Array.isArray(e))
        throw new Error("cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(Ge(e)));
      const a = i[r];
      for (const [o, d] of Object.entries(e)) {
        if (d === null)
          throw new Error("cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: map value null"));
        let c;
        try {
          c = gd(t.K, o);
        } catch (l) {
          let u = "cannot decode map key for field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(Ge(e));
          throw l instanceof Error && l.message.length > 0 && (u += ": ".concat(l.message)), new Error(u);
        }
        switch (t.V.kind) {
          case "message":
            a[c] = t.V.T.fromJson(d, n);
            break;
          case "enum":
            const l = Mi(t.V.T, d, n.ignoreUnknownFields, true);
            l !== Dn && (a[c] = l);
            break;
          case "scalar":
            try {
              a[c] = rn(t.V.T, d, ft.BIGINT, !0);
            } catch (u) {
              let h = "cannot decode map value for field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(Ge(e));
              throw u instanceof Error && u.message.length > 0 && (h += ": ".concat(u.message)), new Error(h);
            }
            break;
        }
      }
    } else
      switch (t.oneof && (i = i[t.oneof.localName] = {
        case: r
      }, r = "value"), t.kind) {
        case "message":
          const a = t.T;
          if (e === null && a.typeName != "google.protobuf.Value")
            return;
          let o = i[r];
          st(o) ? o.fromJson(e, n) : (i[r] = o = a.fromJson(e, n), a.fieldWrapper && !t.oneof && (i[r] = a.fieldWrapper.unwrapField(o)));
          break;
        case "enum":
          const d = Mi(t.T, e, n.ignoreUnknownFields, false);
          switch (d) {
            case Wn:
              pr(t, i);
              break;
            case Dn:
              break;
            default:
              i[r] = d;
              break;
          }
          break;
        case "scalar":
          try {
            const c = rn(t.T, e, t.L, !1);
            switch (c) {
              case Wn:
                pr(t, i);
                break;
              default:
                i[r] = c;
                break;
            }
          } catch (c) {
            let l = "cannot decode field ".concat(s.typeName, ".").concat(t.name, " from JSON: ").concat(Ge(e));
            throw c instanceof Error && c.message.length > 0 && (l += ": ".concat(c.message)), new Error(l);
          }
          break;
      }
  }
  function gd(i, e) {
    if (i === E.BOOL)
      switch (e) {
        case "true":
          e = true;
          break;
        case "false":
          e = false;
          break;
      }
    return rn(i, e, ft.BIGINT, true).toString();
  }
  function rn(i, e, t, n) {
    if (e === null)
      return n ? Kt(i, t) : Wn;
    switch (i) {
      // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
      // Either numbers or strings are accepted. Exponent notation is also accepted.
      case E.DOUBLE:
      case E.FLOAT:
        if (e === "NaN") return Number.NaN;
        if (e === "Infinity") return Number.POSITIVE_INFINITY;
        if (e === "-Infinity") return Number.NEGATIVE_INFINITY;
        if (e === "" || typeof e == "string" && e.trim().length !== e.length || typeof e != "string" && typeof e != "number")
          break;
        const s = Number(e);
        if (Number.isNaN(s) || !Number.isFinite(s))
          break;
        return i == E.FLOAT && Oa(s), s;
      // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
      case E.INT32:
      case E.FIXED32:
      case E.SFIXED32:
      case E.SINT32:
      case E.UINT32:
        let r;
        if (typeof e == "number" ? r = e : typeof e == "string" && e.length > 0 && e.trim().length === e.length && (r = Number(e)), r === void 0) break;
        return i == E.UINT32 || i == E.FIXED32 ? $i(r) : On(r), r;
      // int64, fixed64, uint64: JSON value will be a decimal string. Either numbers or strings are accepted.
      case E.INT64:
      case E.SFIXED64:
      case E.SINT64:
        if (typeof e != "number" && typeof e != "string") break;
        const a = Y.parse(e);
        return t ? a.toString() : a;
      case E.FIXED64:
      case E.UINT64:
        if (typeof e != "number" && typeof e != "string") break;
        const o = Y.uParse(e);
        return t ? o.toString() : o;
      // bool:
      case E.BOOL:
        if (typeof e != "boolean") break;
        return e;
      // string:
      case E.STRING:
        if (typeof e != "string")
          break;
        try {
          encodeURIComponent(e);
        } catch {
          throw new Error("invalid UTF8");
        }
        return e;
      // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
      // Either standard or URL-safe base64 encoding with/without paddings are accepted.
      case E.BYTES:
        if (e === "") return new Uint8Array(0);
        if (typeof e != "string") break;
        return Ba.dec(e);
    }
    throw new Error();
  }
  function Mi(i, e, t, n) {
    if (e === null)
      return i.typeName == "google.protobuf.NullValue" ? 0 : n ? i.values[0].no : Wn;
    switch (typeof e) {
      case "number":
        if (Number.isInteger(e))
          return e;
        break;
      case "string":
        const s = i.findName(e);
        if (s !== void 0)
          return s.no;
        if (t)
          return Dn;
        break;
    }
    throw new Error("cannot decode enum ".concat(i.typeName, " from JSON: ").concat(Ge(e)));
  }
  function vd(i) {
    return i.repeated || i.kind == "map" ? true : !(i.oneof || i.kind == "message" || i.opt || i.req);
  }
  function yr(i, e, t) {
    if (i.kind == "map") {
      $(typeof e == "object" && e != null);
      const n = {}, s = Object.entries(e);
      switch (i.V.kind) {
        case "scalar":
          for (const [a, o] of s)
            n[a.toString()] = An(i.V.T, o);
          break;
        case "message":
          for (const [a, o] of s)
            n[a.toString()] = o.toJson(t);
          break;
        case "enum":
          const r = i.V.T;
          for (const [a, o] of s)
            n[a.toString()] = Di(r, o, t.enumAsInteger);
          break;
      }
      return t.emitDefaultValues || s.length > 0 ? n : void 0;
    }
    if (i.repeated) {
      $(Array.isArray(e));
      const n = [];
      switch (i.kind) {
        case "scalar":
          for (let s = 0; s < e.length; s++)
            n.push(An(i.T, e[s]));
          break;
        case "enum":
          for (let s = 0; s < e.length; s++)
            n.push(Di(i.T, e[s], t.enumAsInteger));
          break;
        case "message":
          for (let s = 0; s < e.length; s++)
            n.push(e[s].toJson(t));
          break;
      }
      return t.emitDefaultValues || n.length > 0 ? n : void 0;
    }
    switch (i.kind) {
      case "scalar":
        return An(i.T, e);
      case "enum":
        return Di(i.T, e, t.enumAsInteger);
      case "message":
        return Wa(i.T, e).toJson(t);
    }
  }
  function Di(i, e, t) {
    var n;
    if ($(typeof e == "number"), i.typeName == "google.protobuf.NullValue")
      return null;
    if (t)
      return e;
    const s = i.findNumber(e);
    return (n = s == null ? void 0 : s.name) !== null && n !== void 0 ? n : e;
  }
  function An(i, e) {
    switch (i) {
      // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
      case E.INT32:
      case E.SFIXED32:
      case E.SINT32:
      case E.FIXED32:
      case E.UINT32:
        return $(typeof e == "number"), e;
      // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
      // Either numbers or strings are accepted. Exponent notation is also accepted.
      case E.FLOAT:
      // assertFloat32(value);
      case E.DOUBLE:
        return $(typeof e == "number"), Number.isNaN(e) ? "NaN" : e === Number.POSITIVE_INFINITY ? "Infinity" : e === Number.NEGATIVE_INFINITY ? "-Infinity" : e;
      // string:
      case E.STRING:
        return $(typeof e == "string"), e;
      // bool:
      case E.BOOL:
        return $(typeof e == "boolean"), e;
      // JSON value will be a decimal string. Either numbers or strings are accepted.
      case E.UINT64:
      case E.FIXED64:
      case E.INT64:
      case E.SFIXED64:
      case E.SINT64:
        return $(typeof e == "bigint" || typeof e == "string" || typeof e == "number"), e.toString();
      // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
      // Either standard or URL-safe base64 encoding with/without paddings are accepted.
      case E.BYTES:
        return $(e instanceof Uint8Array), Ba.enc(e);
    }
  }
  const xt = Symbol("@bufbuild/protobuf/unknown-fields"), kr = {
    readUnknownFields: true,
    readerFactory: (i) => new od(i)
  }, Tr = {
    writeUnknownFields: true,
    writerFactory: () => new ad()
  };
  function bd(i) {
    return i ? Object.assign(Object.assign({}, kr), i) : kr;
  }
  function yd(i) {
    return i ? Object.assign(Object.assign({}, Tr), i) : Tr;
  }
  function kd() {
    return {
      makeReadOptions: bd,
      makeWriteOptions: yd,
      listUnknownFields(i) {
        var e;
        return (e = i[xt]) !== null && e !== void 0 ? e : [];
      },
      discardUnknownFields(i) {
        delete i[xt];
      },
      writeUnknownFields(i, e) {
        const n = i[xt];
        if (n)
          for (const s of n)
            e.tag(s.no, s.wireType).raw(s.data);
      },
      onUnknownField(i, e, t, n) {
        const s = i;
        Array.isArray(s[xt]) || (s[xt] = []), s[xt].push({
          no: e,
          wireType: t,
          data: n
        });
      },
      readMessage(i, e, t, n, s) {
        const r = i.getType(), a = s ? e.len : e.pos + t;
        let o, d;
        for (; e.pos < a && ([o, d] = e.tag(), !(s === true && d == ne.EndGroup)); ) {
          const c = r.fields.find(o);
          if (!c) {
            const l = e.skip(d, o);
            n.readUnknownFields && this.onUnknownField(i, o, d, l);
            continue;
          }
          Sr(i, e, c, d, n);
        }
        if (s && // eslint-disable-line @typescript-eslint/strict-boolean-expressions
        (d != ne.EndGroup || o !== t))
          throw new Error("invalid end group tag");
      },
      readField: Sr,
      writeMessage(i, e, t) {
        const n = i.getType();
        for (const s of n.fields.byNumber()) {
          if (!Va(s, i)) {
            if (s.req)
              throw new Error("cannot encode field ".concat(n.typeName, ".").concat(s.name, " to binary: required field not set"));
            continue;
          }
          const r = s.oneof ? i[s.oneof.localName].value : i[s.localName];
          Cr(s, r, e, t);
        }
        return t.writeUnknownFields && this.writeUnknownFields(i, e), e;
      },
      writeField(i, e, t, n) {
        e !== void 0 && Cr(i, e, t, n);
      }
    };
  }
  function Sr(i, e, t, n, s) {
    let {
      repeated: r,
      localName: a
    } = t;
    switch (t.oneof && (i = i[t.oneof.localName], i.case != a && delete i.value, i.case = a, a = "value"), t.kind) {
      case "scalar":
      case "enum":
        const o = t.kind == "enum" ? E.INT32 : t.T;
        let d = Hn;
        if (t.kind == "scalar" && t.L > 0 && (d = Sd), r) {
          let h = i[a];
          if (n == ne.LengthDelimited && o != E.STRING && o != E.BYTES) {
            let v = e.uint32() + e.pos;
            for (; e.pos < v; )
              h.push(d(e, o));
          } else
            h.push(d(e, o));
        } else
          i[a] = d(e, o);
        break;
      case "message":
        const c = t.T;
        r ? i[a].push(xn(e, new c(), s, t)) : st(i[a]) ? xn(e, i[a], s, t) : (i[a] = xn(e, new c(), s, t), c.fieldWrapper && !t.oneof && !t.repeated && (i[a] = c.fieldWrapper.unwrapField(i[a])));
        break;
      case "map":
        let [l, u] = Td(t, e, s);
        i[a][l] = u;
        break;
    }
  }
  function xn(i, e, t, n) {
    const s = e.getType().runtime.bin, r = n == null ? void 0 : n.delimited;
    return s.readMessage(
      e,
      i,
      r ? n.no : i.uint32(),
      // eslint-disable-line @typescript-eslint/strict-boolean-expressions
      t,
      r
    ), e;
  }
  function Td(i, e, t) {
    const n = e.uint32(), s = e.pos + n;
    let r, a;
    for (; e.pos < s; ) {
      const [o] = e.tag();
      switch (o) {
        case 1:
          r = Hn(e, i.K);
          break;
        case 2:
          switch (i.V.kind) {
            case "scalar":
              a = Hn(e, i.V.T);
              break;
            case "enum":
              a = e.int32();
              break;
            case "message":
              a = xn(e, new i.V.T(), t, void 0);
              break;
          }
          break;
      }
    }
    if (r === void 0 && (r = Kt(i.K, ft.BIGINT)), typeof r != "string" && typeof r != "number" && (r = r.toString()), a === void 0)
      switch (i.V.kind) {
        case "scalar":
          a = Kt(i.V.T, ft.BIGINT);
          break;
        case "enum":
          a = i.V.T.values[0].no;
          break;
        case "message":
          a = new i.V.T();
          break;
      }
    return [r, a];
  }
  function Sd(i, e) {
    const t = Hn(i, e);
    return typeof t == "bigint" ? t.toString() : t;
  }
  function Hn(i, e) {
    switch (e) {
      case E.STRING:
        return i.string();
      case E.BOOL:
        return i.bool();
      case E.DOUBLE:
        return i.double();
      case E.FLOAT:
        return i.float();
      case E.INT32:
        return i.int32();
      case E.INT64:
        return i.int64();
      case E.UINT64:
        return i.uint64();
      case E.FIXED64:
        return i.fixed64();
      case E.BYTES:
        return i.bytes();
      case E.FIXED32:
        return i.fixed32();
      case E.SFIXED32:
        return i.sfixed32();
      case E.SFIXED64:
        return i.sfixed64();
      case E.SINT64:
        return i.sint64();
      case E.UINT32:
        return i.uint32();
      case E.SINT32:
        return i.sint32();
    }
  }
  function Cr(i, e, t, n) {
    $(e !== void 0);
    const s = i.repeated;
    switch (i.kind) {
      case "scalar":
      case "enum":
        let r = i.kind == "enum" ? E.INT32 : i.T;
        if (s)
          if ($(Array.isArray(e)), i.packed)
            Ed(t, r, i.no, e);
          else
            for (const a of e)
              an(t, r, i.no, a);
        else
          an(t, r, i.no, e);
        break;
      case "message":
        if (s) {
          $(Array.isArray(e));
          for (const a of e)
            Er(t, n, i, a);
        } else
          Er(t, n, i, e);
        break;
      case "map":
        $(typeof e == "object" && e != null);
        for (const [a, o] of Object.entries(e))
          Cd(t, n, i, a, o);
        break;
    }
  }
  function Cd(i, e, t, n, s) {
    i.tag(t.no, ne.LengthDelimited), i.fork();
    let r = n;
    switch (t.K) {
      case E.INT32:
      case E.FIXED32:
      case E.UINT32:
      case E.SFIXED32:
      case E.SINT32:
        r = Number.parseInt(n);
        break;
      case E.BOOL:
        $(n == "true" || n == "false"), r = n == "true";
        break;
    }
    switch (an(i, t.K, 1, r), t.V.kind) {
      case "scalar":
        an(i, t.V.T, 2, s);
        break;
      case "enum":
        an(i, E.INT32, 2, s);
        break;
      case "message":
        $(s !== void 0), i.tag(2, ne.LengthDelimited).bytes(s.toBinary(e));
        break;
    }
    i.join();
  }
  function Er(i, e, t, n) {
    const s = Wa(t.T, n);
    t.delimited ? i.tag(t.no, ne.StartGroup).raw(s.toBinary(e)).tag(t.no, ne.EndGroup) : i.tag(t.no, ne.LengthDelimited).bytes(s.toBinary(e));
  }
  function an(i, e, t, n) {
    $(n !== void 0);
    let [s, r] = Ha(e);
    i.tag(t, s)[r](n);
  }
  function Ed(i, e, t, n) {
    if (!n.length)
      return;
    i.tag(t, ne.LengthDelimited).fork();
    let [, s] = Ha(e);
    for (let r = 0; r < n.length; r++)
      i[s](n[r]);
    i.join();
  }
  function Ha(i) {
    let e = ne.Varint;
    switch (i) {
      case E.BYTES:
      case E.STRING:
        e = ne.LengthDelimited;
        break;
      case E.DOUBLE:
      case E.FIXED64:
      case E.SFIXED64:
        e = ne.Bit64;
        break;
      case E.FIXED32:
      case E.SFIXED32:
      case E.FLOAT:
        e = ne.Bit32;
        break;
    }
    const t = E[i].toLowerCase();
    return [e, t];
  }
  function wd() {
    return {
      setEnumType: Da,
      initPartial(i, e) {
        if (i === void 0)
          return;
        const t = e.getType();
        for (const n of t.fields.byMember()) {
          const s = n.localName, r = e, a = i;
          if (a[s] != null)
            switch (n.kind) {
              case "oneof":
                const o = a[s].case;
                if (o === void 0)
                  continue;
                const d = n.findField(o);
                let c = a[s].value;
                d && d.kind == "message" && !st(c, d.T) ? c = new d.T(c) : d && d.kind === "scalar" && d.T === E.BYTES && (c = Qt(c)), r[s] = {
                  case: o,
                  value: c
                };
                break;
              case "scalar":
              case "enum":
                let l = a[s];
                n.T === E.BYTES && (l = n.repeated ? l.map(Qt) : Qt(l)), r[s] = l;
                break;
              case "map":
                switch (n.V.kind) {
                  case "scalar":
                  case "enum":
                    if (n.V.T === E.BYTES)
                      for (const [f, v] of Object.entries(a[s]))
                        r[s][f] = Qt(v);
                    else
                      Object.assign(r[s], a[s]);
                    break;
                  case "message":
                    const h = n.V.T;
                    for (const f of Object.keys(a[s])) {
                      let v = a[s][f];
                      h.fieldWrapper || (v = new h(v)), r[s][f] = v;
                    }
                    break;
                }
                break;
              case "message":
                const u = n.T;
                if (n.repeated)
                  r[s] = a[s].map((h) => st(h, u) ? h : new u(h));
                else {
                  const h = a[s];
                  u.fieldWrapper ? /* We can't use BytesValue.typeName as that will create a circular import */ u.typeName === "google.protobuf.BytesValue" ? r[s] = Qt(h) : r[s] = h : r[s] = st(h, u) ? h : new u(h);
                }
                break;
            }
        }
      },
      // TODO use isFieldSet() here to support future field presence
      equals(i, e, t) {
        return e === t ? true : !e || !t ? false : i.fields.byMember().every((n) => {
          const s = e[n.localName], r = t[n.localName];
          if (n.repeated) {
            if (s.length !== r.length)
              return false;
            switch (n.kind) {
              case "message":
                return s.every((a, o) => n.T.equals(a, r[o]));
              case "scalar":
                return s.every((a, o) => rt(n.T, a, r[o]));
              case "enum":
                return s.every((a, o) => rt(E.INT32, a, r[o]));
            }
            throw new Error("repeated cannot contain ".concat(n.kind));
          }
          switch (n.kind) {
            case "message":
              let a = s, o = r;
              return n.T.fieldWrapper && (a !== void 0 && !st(a) && (a = n.T.fieldWrapper.wrapField(a)), o !== void 0 && !st(o) && (o = n.T.fieldWrapper.wrapField(o))), n.T.equals(a, o);
            case "enum":
              return rt(E.INT32, s, r);
            case "scalar":
              return rt(n.T, s, r);
            case "oneof":
              if (s.case !== r.case)
                return false;
              const d = n.findField(s.case);
              if (d === void 0)
                return true;
              switch (d.kind) {
                case "message":
                  return d.T.equals(s.value, r.value);
                case "enum":
                  return rt(E.INT32, s.value, r.value);
                case "scalar":
                  return rt(d.T, s.value, r.value);
              }
              throw new Error("oneof cannot contain ".concat(d.kind));
            case "map":
              const c = Object.keys(s).concat(Object.keys(r));
              switch (n.V.kind) {
                case "message":
                  const l = n.V.T;
                  return c.every((h) => l.equals(s[h], r[h]));
                case "enum":
                  return c.every((h) => rt(E.INT32, s[h], r[h]));
                case "scalar":
                  const u = n.V.T;
                  return c.every((h) => rt(u, s[h], r[h]));
              }
              break;
          }
        });
      },
      // TODO use isFieldSet() here to support future field presence
      clone(i) {
        const e = i.getType(), t = new e(), n = t;
        for (const s of e.fields.byMember()) {
          const r = i[s.localName];
          let a;
          if (s.repeated)
            a = r.map(_n);
          else if (s.kind == "map") {
            a = n[s.localName];
            for (const [o, d] of Object.entries(r))
              a[o] = _n(d);
          } else s.kind == "oneof" ? a = s.findField(r.case) ? {
            case: r.case,
            value: _n(r.value)
          } : {
            case: void 0
          } : a = _n(r);
          n[s.localName] = a;
        }
        for (const s of e.runtime.bin.listUnknownFields(i))
          e.runtime.bin.onUnknownField(n, s.no, s.wireType, s.data);
        return t;
      }
    };
  }
  function _n(i) {
    if (i === void 0)
      return i;
    if (st(i))
      return i.clone();
    if (i instanceof Uint8Array) {
      const e = new Uint8Array(i.byteLength);
      return e.set(i), e;
    }
    return i;
  }
  function Qt(i) {
    return i instanceof Uint8Array ? i : new Uint8Array(i);
  }
  function Pd(i, e, t) {
    return {
      syntax: i,
      json: pd(),
      bin: kd(),
      util: Object.assign(Object.assign({}, wd()), {
        newFieldList: e,
        initFields: t
      }),
      makeMessageType(n, s, r) {
        return ed(this, n, s, r);
      },
      makeEnum: Zc,
      makeEnumType: Aa,
      getEnumType: $c,
      makeExtension(n, s, r) {
        return cd(this, n, s, r);
      }
    };
  }
  class _d {
    constructor(e, t) {
      this._fields = e, this._normalizer = t;
    }
    findJsonName(e) {
      if (!this.jsonNames) {
        const t = {};
        for (const n of this.list())
          t[n.jsonName] = t[n.name] = n;
        this.jsonNames = t;
      }
      return this.jsonNames[e];
    }
    find(e) {
      if (!this.numbers) {
        const t = {};
        for (const n of this.list())
          t[n.no] = n;
        this.numbers = t;
      }
      return this.numbers[e];
    }
    list() {
      return this.all || (this.all = this._normalizer(this._fields)), this.all;
    }
    byNumber() {
      return this.numbersAsc || (this.numbersAsc = this.list().concat().sort((e, t) => e.no - t.no)), this.numbersAsc;
    }
    byMember() {
      if (!this.members) {
        this.members = [];
        const e = this.members;
        let t;
        for (const n of this.list())
          n.oneof ? n.oneof !== t && (t = n.oneof, e.push(t)) : e.push(n);
      }
      return this.members;
    }
  }
  function Ka(i, e) {
    const t = Ga(i);
    return e ? t : Ad(Dd(t));
  }
  function Rd(i) {
    return Ka(i, false);
  }
  const Id = Ga;
  function Ga(i) {
    let e = false;
    const t = [];
    for (let n = 0; n < i.length; n++) {
      let s = i.charAt(n);
      switch (s) {
        case "_":
          e = true;
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          t.push(s), e = false;
          break;
        default:
          e && (e = false, s = s.toUpperCase()), t.push(s);
          break;
      }
    }
    return t.join("");
  }
  const Od = /* @__PURE__ */ new Set([
    // names reserved by JavaScript
    "constructor",
    "toString",
    "toJSON",
    "valueOf"
  ]), Md = /* @__PURE__ */ new Set([
    // names reserved by the runtime
    "getType",
    "clone",
    "equals",
    "fromBinary",
    "fromJson",
    "fromJsonString",
    "toBinary",
    "toJson",
    "toJsonString",
    // names reserved by the runtime for the future
    "toObject"
  ]), Ja = (i) => "".concat(i, "$"), Dd = (i) => Md.has(i) ? Ja(i) : i, Ad = (i) => Od.has(i) ? Ja(i) : i;
  class xd {
    constructor(e) {
      this.kind = "oneof", this.repeated = false, this.packed = false, this.opt = false, this.req = false, this.default = void 0, this.fields = [], this.name = e, this.localName = Rd(e);
    }
    addField(e) {
      $(e.oneof === this, "field ".concat(e.name, " not one of ").concat(this.name)), this.fields.push(e);
    }
    findField(e) {
      if (!this._lookup) {
        this._lookup = /* @__PURE__ */ Object.create(null);
        for (let t = 0; t < this.fields.length; t++)
          this._lookup[this.fields[t].localName] = this.fields[t];
      }
      return this._lookup[e];
    }
  }
  function Nd(i, e) {
    var t, n, s, r, a, o;
    const d = [];
    let c;
    for (const l of typeof i == "function" ? i() : i) {
      const u = l;
      if (u.localName = Ka(l.name, l.oneof !== void 0), u.jsonName = (t = l.jsonName) !== null && t !== void 0 ? t : Id(l.name), u.repeated = (n = l.repeated) !== null && n !== void 0 ? n : false, l.kind == "scalar" && (u.L = (s = l.L) !== null && s !== void 0 ? s : ft.BIGINT), u.delimited = (r = l.delimited) !== null && r !== void 0 ? r : false, u.req = (a = l.req) !== null && a !== void 0 ? a : false, u.opt = (o = l.opt) !== null && o !== void 0 ? o : false, l.packed === void 0 && (u.packed = l.kind == "enum" || l.kind == "scalar" && l.T != E.BYTES && l.T != E.STRING), l.oneof !== void 0) {
        const h = typeof l.oneof == "string" ? l.oneof : l.oneof.name;
        (!c || c.name != h) && (c = new xd(h)), u.oneof = c, c.addField(u);
      }
      d.push(u);
    }
    return d;
  }
  const p = Pd(
    "proto3",
    (i) => new _d(i, (e) => Nd(e)),
    // TODO merge with proto2 and initExtensionField, also see initPartial, equals, clone
    (i) => {
      for (const e of i.getType().fields.byMember()) {
        if (e.opt)
          continue;
        const t = e.localName, n = i;
        if (e.repeated) {
          n[t] = [];
          continue;
        }
        switch (e.kind) {
          case "oneof":
            n[t] = {
              case: void 0
            };
            break;
          case "enum":
            n[t] = 0;
            break;
          case "map":
            n[t] = {};
            break;
          case "scalar":
            n[t] = Kt(e.T, e.L);
            break;
        }
      }
    }
  );
  class ke extends Os {
    constructor(e) {
      super(), this.seconds = Y.zero, this.nanos = 0, p.util.initPartial(e, this);
    }
    fromJson(e, t) {
      if (typeof e != "string")
        throw new Error("cannot decode google.protobuf.Timestamp from JSON: ".concat(p.json.debug(e)));
      const n = e.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
      if (!n)
        throw new Error("cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string");
      const s = Date.parse(n[1] + "-" + n[2] + "-" + n[3] + "T" + n[4] + ":" + n[5] + ":" + n[6] + (n[8] ? n[8] : "Z"));
      if (Number.isNaN(s))
        throw new Error("cannot decode google.protobuf.Timestamp from JSON: invalid RFC 3339 string");
      if (s < Date.parse("0001-01-01T00:00:00Z") || s > Date.parse("9999-12-31T23:59:59Z"))
        throw new Error("cannot decode message google.protobuf.Timestamp from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive");
      return this.seconds = Y.parse(s / 1e3), this.nanos = 0, n[7] && (this.nanos = parseInt("1" + n[7] + "0".repeat(9 - n[7].length)) - 1e9), this;
    }
    toJson(e) {
      const t = Number(this.seconds) * 1e3;
      if (t < Date.parse("0001-01-01T00:00:00Z") || t > Date.parse("9999-12-31T23:59:59Z"))
        throw new Error("cannot encode google.protobuf.Timestamp to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive");
      if (this.nanos < 0)
        throw new Error("cannot encode google.protobuf.Timestamp to JSON: nanos must not be negative");
      let n = "Z";
      if (this.nanos > 0) {
        const s = (this.nanos + 1e9).toString().substring(1);
        s.substring(3) === "000000" ? n = "." + s.substring(0, 3) + "Z" : s.substring(6) === "000" ? n = "." + s.substring(0, 6) + "Z" : n = "." + s + "Z";
      }
      return new Date(t).toISOString().replace(".000Z", n);
    }
    toDate() {
      return new Date(Number(this.seconds) * 1e3 + Math.ceil(this.nanos / 1e6));
    }
    static now() {
      return ke.fromDate(/* @__PURE__ */ new Date());
    }
    static fromDate(e) {
      const t = e.getTime();
      return new ke({
        seconds: Y.parse(Math.floor(t / 1e3)),
        nanos: t % 1e3 * 1e6
      });
    }
    static fromBinary(e, t) {
      return new ke().fromBinary(e, t);
    }
    static fromJson(e, t) {
      return new ke().fromJson(e, t);
    }
    static fromJsonString(e, t) {
      return new ke().fromJsonString(e, t);
    }
    static equals(e, t) {
      return p.util.equals(ke, e, t);
    }
  }
  ke.runtime = p;
  ke.typeName = "google.protobuf.Timestamp";
  ke.fields = p.util.newFieldList(() => [{
    no: 1,
    name: "seconds",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 2,
    name: "nanos",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }]);
  const Ld = /* @__PURE__ */ p.makeMessageType("livekit.MetricsBatch", () => [{
    no: 1,
    name: "timestamp_ms",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 2,
    name: "normalized_timestamp",
    kind: "message",
    T: ke
  }, {
    no: 3,
    name: "str_data",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 4,
    name: "time_series",
    kind: "message",
    T: Ud,
    repeated: true
  }, {
    no: 5,
    name: "events",
    kind: "message",
    T: Bd,
    repeated: true
  }]), Ud = /* @__PURE__ */ p.makeMessageType("livekit.TimeSeriesMetric", () => [{
    no: 1,
    name: "label",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 2,
    name: "participant_identity",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 3,
    name: "track_sid",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 4,
    name: "samples",
    kind: "message",
    T: Fd,
    repeated: true
  }, {
    no: 5,
    name: "rid",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), Fd = /* @__PURE__ */ p.makeMessageType("livekit.MetricSample", () => [{
    no: 1,
    name: "timestamp_ms",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 2,
    name: "normalized_timestamp",
    kind: "message",
    T: ke
  }, {
    no: 3,
    name: "value",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }]), Bd = /* @__PURE__ */ p.makeMessageType("livekit.EventMetric", () => [{
    no: 1,
    name: "label",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 2,
    name: "participant_identity",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 3,
    name: "track_sid",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 4,
    name: "start_timestamp_ms",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 5,
    name: "end_timestamp_ms",
    kind: "scalar",
    T: 3,
    opt: true
  }, {
    no: 6,
    name: "normalized_start_timestamp",
    kind: "message",
    T: ke
  }, {
    no: 7,
    name: "normalized_end_timestamp",
    kind: "message",
    T: ke,
    opt: true
  }, {
    no: 8,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 9,
    name: "rid",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), jd = /* @__PURE__ */ p.makeEnum("livekit.AudioCodec", [{
    no: 0,
    name: "DEFAULT_AC"
  }, {
    no: 1,
    name: "OPUS"
  }, {
    no: 2,
    name: "AAC"
  }, {
    no: 3,
    name: "AC_MP3"
  }]), qd = /* @__PURE__ */ p.makeEnum("livekit.VideoCodec", [{
    no: 0,
    name: "DEFAULT_VC"
  }, {
    no: 1,
    name: "H264_BASELINE"
  }, {
    no: 2,
    name: "H264_MAIN"
  }, {
    no: 3,
    name: "H264_HIGH"
  }, {
    no: 4,
    name: "VP8"
  }]), Vd = /* @__PURE__ */ p.makeEnum("livekit.ImageCodec", [{
    no: 0,
    name: "IC_DEFAULT"
  }, {
    no: 1,
    name: "IC_JPEG"
  }]), za = /* @__PURE__ */ p.makeEnum("livekit.BackupCodecPolicy", [{
    no: 0,
    name: "PREFER_REGRESSION"
  }, {
    no: 1,
    name: "SIMULCAST"
  }, {
    no: 2,
    name: "REGRESSION"
  }]), Ne = /* @__PURE__ */ p.makeEnum("livekit.TrackType", [{
    no: 0,
    name: "AUDIO"
  }, {
    no: 1,
    name: "VIDEO"
  }, {
    no: 2,
    name: "DATA"
  }]), ie = /* @__PURE__ */ p.makeEnum("livekit.TrackSource", [{
    no: 0,
    name: "UNKNOWN"
  }, {
    no: 1,
    name: "CAMERA"
  }, {
    no: 2,
    name: "MICROPHONE"
  }, {
    no: 3,
    name: "SCREEN_SHARE"
  }, {
    no: 4,
    name: "SCREEN_SHARE_AUDIO"
  }]), Ds = /* @__PURE__ */ p.makeEnum("livekit.VideoQuality", [{
    no: 0,
    name: "LOW"
  }, {
    no: 1,
    name: "MEDIUM"
  }, {
    no: 2,
    name: "HIGH"
  }, {
    no: 3,
    name: "OFF"
  }]), nn = /* @__PURE__ */ p.makeEnum("livekit.ConnectionQuality", [{
    no: 0,
    name: "POOR"
  }, {
    no: 1,
    name: "GOOD"
  }, {
    no: 2,
    name: "EXCELLENT"
  }, {
    no: 3,
    name: "LOST"
  }]), hn = /* @__PURE__ */ p.makeEnum("livekit.ClientConfigSetting", [{
    no: 0,
    name: "UNSET"
  }, {
    no: 1,
    name: "DISABLED"
  }, {
    no: 2,
    name: "ENABLED"
  }]), qe = /* @__PURE__ */ p.makeEnum("livekit.DisconnectReason", [{
    no: 0,
    name: "UNKNOWN_REASON"
  }, {
    no: 1,
    name: "CLIENT_INITIATED"
  }, {
    no: 2,
    name: "DUPLICATE_IDENTITY"
  }, {
    no: 3,
    name: "SERVER_SHUTDOWN"
  }, {
    no: 4,
    name: "PARTICIPANT_REMOVED"
  }, {
    no: 5,
    name: "ROOM_DELETED"
  }, {
    no: 6,
    name: "STATE_MISMATCH"
  }, {
    no: 7,
    name: "JOIN_FAILURE"
  }, {
    no: 8,
    name: "MIGRATION"
  }, {
    no: 9,
    name: "SIGNAL_CLOSE"
  }, {
    no: 10,
    name: "ROOM_CLOSED"
  }, {
    no: 11,
    name: "USER_UNAVAILABLE"
  }, {
    no: 12,
    name: "USER_REJECTED"
  }, {
    no: 13,
    name: "SIP_TRUNK_FAILURE"
  }, {
    no: 14,
    name: "CONNECTION_TIMEOUT"
  }, {
    no: 15,
    name: "MEDIA_FAILURE"
  }, {
    no: 16,
    name: "AGENT_ERROR"
  }]), vt = /* @__PURE__ */ p.makeEnum("livekit.ReconnectReason", [{
    no: 0,
    name: "RR_UNKNOWN"
  }, {
    no: 1,
    name: "RR_SIGNAL_DISCONNECTED"
  }, {
    no: 2,
    name: "RR_PUBLISHER_FAILED"
  }, {
    no: 3,
    name: "RR_SUBSCRIBER_FAILED"
  }, {
    no: 4,
    name: "RR_SWITCH_CANDIDATE"
  }]), Wd = /* @__PURE__ */ p.makeEnum("livekit.SubscriptionError", [{
    no: 0,
    name: "SE_UNKNOWN"
  }, {
    no: 1,
    name: "SE_CODEC_UNSUPPORTED"
  }, {
    no: 2,
    name: "SE_TRACK_NOTFOUND"
  }]), ae = /* @__PURE__ */ p.makeEnum("livekit.AudioTrackFeature", [{
    no: 0,
    name: "TF_STEREO"
  }, {
    no: 1,
    name: "TF_NO_DTX"
  }, {
    no: 2,
    name: "TF_AUTO_GAIN_CONTROL"
  }, {
    no: 3,
    name: "TF_ECHO_CANCELLATION"
  }, {
    no: 4,
    name: "TF_NOISE_SUPPRESSION"
  }, {
    no: 5,
    name: "TF_ENHANCED_NOISE_CANCELLATION"
  }, {
    no: 6,
    name: "TF_PRECONNECT_BUFFER"
  }]), Ya = /* @__PURE__ */ p.makeEnum("livekit.PacketTrailerFeature", [{
    no: 0,
    name: "PTF_USER_TIMESTAMP"
  }, {
    no: 1,
    name: "PTF_FRAME_ID"
  }]), si = /* @__PURE__ */ p.makeMessageType("livekit.Room", () => [{
    no: 1,
    name: "sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "empty_timeout",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 14,
    name: "departure_timeout",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 4,
    name: "max_participants",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 5,
    name: "creation_time",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 15,
    name: "creation_time_ms",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 6,
    name: "turn_password",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 7,
    name: "enabled_codecs",
    kind: "message",
    T: Kn,
    repeated: true
  }, {
    no: 8,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 9,
    name: "num_participants",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 11,
    name: "num_publishers",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 10,
    name: "active_recording",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 13,
    name: "version",
    kind: "message",
    T: co
  }]), Kn = /* @__PURE__ */ p.makeMessageType("livekit.Codec", () => [{
    no: 1,
    name: "mime",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "fmtp_line",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Hd = /* @__PURE__ */ p.makeMessageType("livekit.ParticipantPermission", () => [{
    no: 1,
    name: "can_subscribe",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 2,
    name: "can_publish",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 3,
    name: "can_publish_data",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 9,
    name: "can_publish_sources",
    kind: "enum",
    T: p.getEnumType(ie),
    repeated: true
  }, {
    no: 7,
    name: "hidden",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 8,
    name: "recorder",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 10,
    name: "can_update_metadata",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 11,
    name: "agent",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 12,
    name: "can_subscribe_metrics",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 13,
    name: "can_manage_agent_session",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), Ot = /* @__PURE__ */ p.makeMessageType("livekit.ParticipantInfo", () => [{
    no: 1,
    name: "sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "identity",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "state",
    kind: "enum",
    T: p.getEnumType(Ft)
  }, {
    no: 4,
    name: "tracks",
    kind: "message",
    T: Lt,
    repeated: true
  }, {
    no: 5,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 6,
    name: "joined_at",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 17,
    name: "joined_at_ms",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 9,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 10,
    name: "version",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 11,
    name: "permission",
    kind: "message",
    T: Hd
  }, {
    no: 12,
    name: "region",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 13,
    name: "is_publisher",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 14,
    name: "kind",
    kind: "enum",
    T: p.getEnumType(fn)
  }, {
    no: 15,
    name: "attributes",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }, {
    no: 16,
    name: "disconnect_reason",
    kind: "enum",
    T: p.getEnumType(qe)
  }, {
    no: 18,
    name: "kind_details",
    kind: "enum",
    T: p.getEnumType(Kd),
    repeated: true
  }, {
    no: 19,
    name: "data_tracks",
    kind: "message",
    T: ri,
    repeated: true
  }, {
    no: 20,
    name: "client_protocol",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }]), Ft = /* @__PURE__ */ p.makeEnum("livekit.ParticipantInfo.State", [{
    no: 0,
    name: "JOINING"
  }, {
    no: 1,
    name: "JOINED"
  }, {
    no: 2,
    name: "ACTIVE"
  }, {
    no: 3,
    name: "DISCONNECTED"
  }]), fn = /* @__PURE__ */ p.makeEnum("livekit.ParticipantInfo.Kind", [{
    no: 0,
    name: "STANDARD"
  }, {
    no: 1,
    name: "INGRESS"
  }, {
    no: 2,
    name: "EGRESS"
  }, {
    no: 3,
    name: "SIP"
  }, {
    no: 4,
    name: "AGENT"
  }, {
    no: 7,
    name: "CONNECTOR"
  }, {
    no: 8,
    name: "BRIDGE"
  }]), Kd = /* @__PURE__ */ p.makeEnum("livekit.ParticipantInfo.KindDetail", [{
    no: 0,
    name: "CLOUD_AGENT"
  }, {
    no: 1,
    name: "FORWARDED"
  }, {
    no: 2,
    name: "CONNECTOR_WHATSAPP"
  }, {
    no: 3,
    name: "CONNECTOR_TWILIO"
  }, {
    no: 4,
    name: "BRIDGE_RTSP"
  }]), J = /* @__PURE__ */ p.makeEnum("livekit.Encryption.Type", [{
    no: 0,
    name: "NONE"
  }, {
    no: 1,
    name: "GCM"
  }, {
    no: 2,
    name: "CUSTOM"
  }]), Gd = /* @__PURE__ */ p.makeMessageType("livekit.SimulcastCodecInfo", () => [{
    no: 1,
    name: "mime_type",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "mid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "cid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "layers",
    kind: "message",
    T: ut,
    repeated: true
  }, {
    no: 5,
    name: "video_layer_mode",
    kind: "enum",
    T: p.getEnumType(Qa)
  }, {
    no: 6,
    name: "sdp_cid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Lt = /* @__PURE__ */ p.makeMessageType("livekit.TrackInfo", () => [{
    no: 1,
    name: "sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "type",
    kind: "enum",
    T: p.getEnumType(Ne)
  }, {
    no: 3,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 5,
    name: "width",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 6,
    name: "height",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 7,
    name: "simulcast",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 8,
    name: "disable_dtx",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 9,
    name: "source",
    kind: "enum",
    T: p.getEnumType(ie)
  }, {
    no: 10,
    name: "layers",
    kind: "message",
    T: ut,
    repeated: true
  }, {
    no: 11,
    name: "mime_type",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 12,
    name: "mid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 13,
    name: "codecs",
    kind: "message",
    T: Gd,
    repeated: true
  }, {
    no: 14,
    name: "stereo",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 15,
    name: "disable_red",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 16,
    name: "encryption",
    kind: "enum",
    T: p.getEnumType(J)
  }, {
    no: 17,
    name: "stream",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 18,
    name: "version",
    kind: "message",
    T: co
  }, {
    no: 19,
    name: "audio_features",
    kind: "enum",
    T: p.getEnumType(ae),
    repeated: true
  }, {
    no: 20,
    name: "backup_codec_policy",
    kind: "enum",
    T: p.getEnumType(za)
  }, {
    no: 21,
    name: "packet_trailer_features",
    kind: "enum",
    T: p.getEnumType(Ya),
    repeated: true
  }]), ri = /* @__PURE__ */ p.makeMessageType("livekit.DataTrackInfo", () => [{
    no: 1,
    name: "pub_handle",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 2,
    name: "sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "encryption",
    kind: "enum",
    T: p.getEnumType(J)
  }]), Jd = /* @__PURE__ */ p.makeMessageType("livekit.DataTrackSubscriptionOptions", () => [{
    no: 1,
    name: "target_fps",
    kind: "scalar",
    T: 13,
    opt: true
  }]), ut = /* @__PURE__ */ p.makeMessageType("livekit.VideoLayer", () => [{
    no: 1,
    name: "quality",
    kind: "enum",
    T: p.getEnumType(Ds)
  }, {
    no: 2,
    name: "width",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 3,
    name: "height",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 4,
    name: "bitrate",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 5,
    name: "ssrc",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 6,
    name: "spatial_layer",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 7,
    name: "rid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 8,
    name: "repair_ssrc",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), Qa = /* @__PURE__ */ p.makeEnum("livekit.VideoLayer.Mode", [{
    no: 0,
    name: "MODE_UNUSED"
  }, {
    no: 1,
    name: "ONE_SPATIAL_LAYER_PER_STREAM"
  }, {
    no: 2,
    name: "MULTIPLE_SPATIAL_LAYERS_PER_STREAM"
  }, {
    no: 3,
    name: "ONE_SPATIAL_LAYER_PER_STREAM_INCOMPLETE_RTCP_SR"
  }]), ge = /* @__PURE__ */ p.makeMessageType("livekit.DataPacket", () => [{
    no: 1,
    name: "kind",
    kind: "enum",
    T: p.getEnumType(Et)
  }, {
    no: 4,
    name: "participant_identity",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "destination_identities",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 2,
    name: "user",
    kind: "message",
    T: As,
    oneof: "value"
  }, {
    no: 3,
    name: "speaker",
    kind: "message",
    T: zd,
    oneof: "value"
  }, {
    no: 6,
    name: "sip_dtmf",
    kind: "message",
    T: eo,
    oneof: "value"
  }, {
    no: 7,
    name: "transcription",
    kind: "message",
    T: Yd,
    oneof: "value"
  }, {
    no: 8,
    name: "metrics",
    kind: "message",
    T: Ld,
    oneof: "value"
  }, {
    no: 9,
    name: "chat_message",
    kind: "message",
    T: Gn,
    oneof: "value"
  }, {
    no: 10,
    name: "rpc_request",
    kind: "message",
    T: xs,
    oneof: "value"
  }, {
    no: 11,
    name: "rpc_ack",
    kind: "message",
    T: Ns,
    oneof: "value"
  }, {
    no: 12,
    name: "rpc_response",
    kind: "message",
    T: Ls,
    oneof: "value"
  }, {
    no: 13,
    name: "stream_header",
    kind: "message",
    T: Jn,
    oneof: "value"
  }, {
    no: 14,
    name: "stream_chunk",
    kind: "message",
    T: zn,
    oneof: "value"
  }, {
    no: 15,
    name: "stream_trailer",
    kind: "message",
    T: Yn,
    oneof: "value"
  }, {
    no: 18,
    name: "encrypted_packet",
    kind: "message",
    T: Xa,
    oneof: "value"
  }, {
    no: 16,
    name: "sequence",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 17,
    name: "participant_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Et = /* @__PURE__ */ p.makeEnum("livekit.DataPacket.Kind", [{
    no: 0,
    name: "RELIABLE"
  }, {
    no: 1,
    name: "LOSSY"
  }]), Xa = /* @__PURE__ */ p.makeMessageType("livekit.EncryptedPacket", () => [{
    no: 1,
    name: "encryption_type",
    kind: "enum",
    T: p.getEnumType(J)
  }, {
    no: 2,
    name: "iv",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }, {
    no: 3,
    name: "key_index",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 4,
    name: "encrypted_value",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }]), $a = /* @__PURE__ */ p.makeMessageType("livekit.EncryptedPacketPayload", () => [{
    no: 1,
    name: "user",
    kind: "message",
    T: As,
    oneof: "value"
  }, {
    no: 3,
    name: "chat_message",
    kind: "message",
    T: Gn,
    oneof: "value"
  }, {
    no: 4,
    name: "rpc_request",
    kind: "message",
    T: xs,
    oneof: "value"
  }, {
    no: 5,
    name: "rpc_ack",
    kind: "message",
    T: Ns,
    oneof: "value"
  }, {
    no: 6,
    name: "rpc_response",
    kind: "message",
    T: Ls,
    oneof: "value"
  }, {
    no: 7,
    name: "stream_header",
    kind: "message",
    T: Jn,
    oneof: "value"
  }, {
    no: 8,
    name: "stream_chunk",
    kind: "message",
    T: zn,
    oneof: "value"
  }, {
    no: 9,
    name: "stream_trailer",
    kind: "message",
    T: Yn,
    oneof: "value"
  }]), zd = /* @__PURE__ */ p.makeMessageType("livekit.ActiveSpeakerUpdate", () => [{
    no: 1,
    name: "speakers",
    kind: "message",
    T: Za,
    repeated: true
  }]), Za = /* @__PURE__ */ p.makeMessageType("livekit.SpeakerInfo", () => [{
    no: 1,
    name: "sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "level",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }, {
    no: 3,
    name: "active",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), As = /* @__PURE__ */ p.makeMessageType("livekit.UserPacket", () => [{
    no: 1,
    name: "participant_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "participant_identity",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "payload",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }, {
    no: 3,
    name: "destination_sids",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 6,
    name: "destination_identities",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 4,
    name: "topic",
    kind: "scalar",
    T: 9,
    opt: true
  }, {
    no: 8,
    name: "id",
    kind: "scalar",
    T: 9,
    opt: true
  }, {
    no: 9,
    name: "start_time",
    kind: "scalar",
    T: 4,
    opt: true
  }, {
    no: 10,
    name: "end_time",
    kind: "scalar",
    T: 4,
    opt: true
  }, {
    no: 11,
    name: "nonce",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }]), eo = /* @__PURE__ */ p.makeMessageType("livekit.SipDTMF", () => [{
    no: 3,
    name: "code",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 4,
    name: "digit",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Yd = /* @__PURE__ */ p.makeMessageType("livekit.Transcription", () => [{
    no: 2,
    name: "transcribed_participant_identity",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "track_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "segments",
    kind: "message",
    T: Qd,
    repeated: true
  }]), Qd = /* @__PURE__ */ p.makeMessageType("livekit.TranscriptionSegment", () => [{
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "text",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "start_time",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  }, {
    no: 4,
    name: "end_time",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  }, {
    no: 5,
    name: "final",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 6,
    name: "language",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Gn = /* @__PURE__ */ p.makeMessageType("livekit.ChatMessage", () => [{
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "timestamp",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 3,
    name: "edit_timestamp",
    kind: "scalar",
    T: 3,
    opt: true
  }, {
    no: 4,
    name: "message",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "deleted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 6,
    name: "generated",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), xs = /* @__PURE__ */ p.makeMessageType("livekit.RpcRequest", () => [{
    no: 1,
    name: "id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "method",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "payload",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "response_timeout_ms",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 5,
    name: "version",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 6,
    name: "compressed_payload",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }]), Ns = /* @__PURE__ */ p.makeMessageType("livekit.RpcAck", () => [{
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Ls = /* @__PURE__ */ p.makeMessageType("livekit.RpcResponse", () => [{
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "payload",
    kind: "scalar",
    T: 9,
    oneof: "value"
  }, {
    no: 3,
    name: "error",
    kind: "message",
    T: to,
    oneof: "value"
  }, {
    no: 4,
    name: "compressed_payload",
    kind: "scalar",
    T: 12,
    oneof: "value"
  }]), to = /* @__PURE__ */ p.makeMessageType("livekit.RpcError", () => [{
    no: 1,
    name: "code",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 2,
    name: "message",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "data",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), no = /* @__PURE__ */ p.makeMessageType("livekit.ParticipantTracks", () => [{
    no: 1,
    name: "participant_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "track_sids",
    kind: "scalar",
    T: 9,
    repeated: true
  }]), io = /* @__PURE__ */ p.makeMessageType("livekit.ServerInfo", () => [{
    no: 1,
    name: "edition",
    kind: "enum",
    T: p.getEnumType(so)
  }, {
    no: 2,
    name: "version",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "protocol",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 4,
    name: "region",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "node_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 6,
    name: "debug_info",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 7,
    name: "agent_protocol",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }]), so = /* @__PURE__ */ p.makeEnum("livekit.ServerInfo.Edition", [{
    no: 0,
    name: "Standard"
  }, {
    no: 1,
    name: "Cloud"
  }]), ro = /* @__PURE__ */ p.makeMessageType("livekit.ClientInfo", () => [{
    no: 1,
    name: "sdk",
    kind: "enum",
    T: p.getEnumType(ao)
  }, {
    no: 2,
    name: "version",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "protocol",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 4,
    name: "os",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "os_version",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 6,
    name: "device_model",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 7,
    name: "browser",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 8,
    name: "browser_version",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 9,
    name: "address",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 10,
    name: "network",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 11,
    name: "other_sdks",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 12,
    name: "client_protocol",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }]), ao = /* @__PURE__ */ p.makeEnum("livekit.ClientInfo.SDK", [{
    no: 0,
    name: "UNKNOWN"
  }, {
    no: 1,
    name: "JS"
  }, {
    no: 2,
    name: "SWIFT"
  }, {
    no: 3,
    name: "ANDROID"
  }, {
    no: 4,
    name: "FLUTTER"
  }, {
    no: 5,
    name: "GO"
  }, {
    no: 6,
    name: "UNITY"
  }, {
    no: 7,
    name: "REACT_NATIVE"
  }, {
    no: 8,
    name: "RUST"
  }, {
    no: 9,
    name: "PYTHON"
  }, {
    no: 10,
    name: "CPP"
  }, {
    no: 11,
    name: "UNITY_WEB"
  }, {
    no: 12,
    name: "NODE"
  }, {
    no: 13,
    name: "UNREAL"
  }, {
    no: 14,
    name: "ESP32"
  }]), oo = /* @__PURE__ */ p.makeMessageType("livekit.ClientConfiguration", () => [{
    no: 1,
    name: "video",
    kind: "message",
    T: wr
  }, {
    no: 2,
    name: "screen",
    kind: "message",
    T: wr
  }, {
    no: 3,
    name: "resume_connection",
    kind: "enum",
    T: p.getEnumType(hn)
  }, {
    no: 4,
    name: "disabled_codecs",
    kind: "message",
    T: Xd
  }, {
    no: 5,
    name: "force_relay",
    kind: "enum",
    T: p.getEnumType(hn)
  }]), wr = /* @__PURE__ */ p.makeMessageType("livekit.VideoConfiguration", () => [{
    no: 1,
    name: "hardware_encoder",
    kind: "enum",
    T: p.getEnumType(hn)
  }]), Xd = /* @__PURE__ */ p.makeMessageType("livekit.DisabledCodecs", () => [{
    no: 1,
    name: "codecs",
    kind: "message",
    T: Kn,
    repeated: true
  }, {
    no: 2,
    name: "publish",
    kind: "message",
    T: Kn,
    repeated: true
  }]), co = /* @__PURE__ */ p.makeMessageType("livekit.TimedVersion", () => [{
    no: 1,
    name: "unix_micro",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 2,
    name: "ticks",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }]), Zi = /* @__PURE__ */ p.makeEnum("livekit.DataStream.OperationType", [{
    no: 0,
    name: "CREATE"
  }, {
    no: 1,
    name: "UPDATE"
  }, {
    no: 2,
    name: "DELETE"
  }, {
    no: 3,
    name: "REACTION"
  }]), lo = /* @__PURE__ */ p.makeMessageType("livekit.DataStream.TextHeader", () => [{
    no: 1,
    name: "operation_type",
    kind: "enum",
    T: p.getEnumType(Zi)
  }, {
    no: 2,
    name: "version",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 3,
    name: "reply_to_stream_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "attached_stream_ids",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 5,
    name: "generated",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }], {
    localName: "DataStream_TextHeader"
  }), uo = /* @__PURE__ */ p.makeMessageType("livekit.DataStream.ByteHeader", () => [{
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }], {
    localName: "DataStream_ByteHeader"
  }), Jn = /* @__PURE__ */ p.makeMessageType("livekit.DataStream.Header", () => [{
    no: 1,
    name: "stream_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "timestamp",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 3,
    name: "topic",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "mime_type",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "total_length",
    kind: "scalar",
    T: 4,
    opt: true
  }, {
    no: 7,
    name: "encryption_type",
    kind: "enum",
    T: p.getEnumType(J)
  }, {
    no: 8,
    name: "attributes",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }, {
    no: 9,
    name: "text_header",
    kind: "message",
    T: lo,
    oneof: "content_header"
  }, {
    no: 10,
    name: "byte_header",
    kind: "message",
    T: uo,
    oneof: "content_header"
  }], {
    localName: "DataStream_Header"
  }), zn = /* @__PURE__ */ p.makeMessageType("livekit.DataStream.Chunk", () => [{
    no: 1,
    name: "stream_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "chunk_index",
    kind: "scalar",
    T: 4
    /* ScalarType.UINT64 */
  }, {
    no: 3,
    name: "content",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }, {
    no: 4,
    name: "version",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 5,
    name: "iv",
    kind: "scalar",
    T: 12,
    opt: true
  }], {
    localName: "DataStream_Chunk"
  }), Yn = /* @__PURE__ */ p.makeMessageType("livekit.DataStream.Trailer", () => [{
    no: 1,
    name: "stream_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "reason",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "attributes",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }], {
    localName: "DataStream_Trailer"
  }), $d = /* @__PURE__ */ p.makeMessageType("livekit.FilterParams", () => [{
    no: 1,
    name: "include_events",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 2,
    name: "exclude_events",
    kind: "scalar",
    T: 9,
    repeated: true
  }]), Zd = /* @__PURE__ */ p.makeMessageType("livekit.WebhookConfig", () => [{
    no: 1,
    name: "url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "signing_key",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "filter_params",
    kind: "message",
    T: $d
  }]), el = /* @__PURE__ */ p.makeMessageType("livekit.SubscribedAudioCodec", () => [{
    no: 1,
    name: "codec",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), tl = /* @__PURE__ */ p.makeEnum("livekit.JobRestartPolicy", [{
    no: 0,
    name: "JRP_ON_FAILURE"
  }, {
    no: 1,
    name: "JRP_NEVER"
  }]), es = /* @__PURE__ */ p.makeMessageType("livekit.RoomAgentDispatch", () => [{
    no: 1,
    name: "agent_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "restart_policy",
    kind: "enum",
    T: p.getEnumType(tl)
  }]), Le = /* @__PURE__ */ p.makeEnum("livekit.SignalTarget", [{
    no: 0,
    name: "PUBLISHER"
  }, {
    no: 1,
    name: "SUBSCRIBER"
  }]), ts = /* @__PURE__ */ p.makeEnum("livekit.StreamState", [{
    no: 0,
    name: "ACTIVE"
  }, {
    no: 1,
    name: "PAUSED"
  }]), nl = /* @__PURE__ */ p.makeEnum("livekit.CandidateProtocol", [{
    no: 0,
    name: "UDP"
  }, {
    no: 1,
    name: "TCP"
  }, {
    no: 2,
    name: "TLS"
  }]), il = /* @__PURE__ */ p.makeMessageType("livekit.SignalRequest", () => [{
    no: 1,
    name: "offer",
    kind: "message",
    T: mt,
    oneof: "message"
  }, {
    no: 2,
    name: "answer",
    kind: "message",
    T: mt,
    oneof: "message"
  }, {
    no: 3,
    name: "trickle",
    kind: "message",
    T: ai,
    oneof: "message"
  }, {
    no: 4,
    name: "add_track",
    kind: "message",
    T: mn,
    oneof: "message"
  }, {
    no: 5,
    name: "mute",
    kind: "message",
    T: oi,
    oneof: "message"
  }, {
    no: 6,
    name: "subscription",
    kind: "message",
    T: ci,
    oneof: "message"
  }, {
    no: 7,
    name: "track_setting",
    kind: "message",
    T: mo,
    oneof: "message"
  }, {
    no: 8,
    name: "leave",
    kind: "message",
    T: di,
    oneof: "message"
  }, {
    no: 10,
    name: "update_layers",
    kind: "message",
    T: go,
    oneof: "message"
  }, {
    no: 11,
    name: "subscription_permission",
    kind: "message",
    T: yo,
    oneof: "message"
  }, {
    no: 12,
    name: "sync_state",
    kind: "message",
    T: Hs,
    oneof: "message"
  }, {
    no: 13,
    name: "simulate",
    kind: "message",
    T: Ke,
    oneof: "message"
  }, {
    no: 14,
    name: "ping",
    kind: "scalar",
    T: 3,
    oneof: "message"
  }, {
    no: 15,
    name: "update_metadata",
    kind: "message",
    T: Vs,
    oneof: "message"
  }, {
    no: 16,
    name: "ping_req",
    kind: "message",
    T: So,
    oneof: "message"
  }, {
    no: 17,
    name: "update_audio_track",
    kind: "message",
    T: qs,
    oneof: "message"
  }, {
    no: 18,
    name: "update_video_track",
    kind: "message",
    T: po,
    oneof: "message"
  }, {
    no: 19,
    name: "publish_data_track_request",
    kind: "message",
    T: Us,
    oneof: "message"
  }, {
    no: 20,
    name: "unpublish_data_track_request",
    kind: "message",
    T: Bs,
    oneof: "message"
  }, {
    no: 21,
    name: "update_data_subscription",
    kind: "message",
    T: ho,
    oneof: "message"
  }]), Pr = /* @__PURE__ */ p.makeMessageType("livekit.SignalResponse", () => [{
    no: 1,
    name: "join",
    kind: "message",
    T: ol,
    oneof: "message"
  }, {
    no: 2,
    name: "answer",
    kind: "message",
    T: mt,
    oneof: "message"
  }, {
    no: 3,
    name: "offer",
    kind: "message",
    T: mt,
    oneof: "message"
  }, {
    no: 4,
    name: "trickle",
    kind: "message",
    T: ai,
    oneof: "message"
  }, {
    no: 5,
    name: "update",
    kind: "message",
    T: ll,
    oneof: "message"
  }, {
    no: 6,
    name: "track_published",
    kind: "message",
    T: js,
    oneof: "message"
  }, {
    no: 8,
    name: "leave",
    kind: "message",
    T: di,
    oneof: "message"
  }, {
    no: 9,
    name: "mute",
    kind: "message",
    T: oi,
    oneof: "message"
  }, {
    no: 10,
    name: "speakers_changed",
    kind: "message",
    T: ul,
    oneof: "message"
  }, {
    no: 11,
    name: "room_update",
    kind: "message",
    T: hl,
    oneof: "message"
  }, {
    no: 12,
    name: "connection_quality",
    kind: "message",
    T: ml,
    oneof: "message"
  }, {
    no: 13,
    name: "stream_state_update",
    kind: "message",
    T: gl,
    oneof: "message"
  }, {
    no: 14,
    name: "subscribed_quality_update",
    kind: "message",
    T: bl,
    oneof: "message"
  }, {
    no: 15,
    name: "subscription_permission_update",
    kind: "message",
    T: kl,
    oneof: "message"
  }, {
    no: 16,
    name: "refresh_token",
    kind: "scalar",
    T: 9,
    oneof: "message"
  }, {
    no: 17,
    name: "track_unpublished",
    kind: "message",
    T: dl,
    oneof: "message"
  }, {
    no: 18,
    name: "pong",
    kind: "scalar",
    T: 3,
    oneof: "message"
  }, {
    no: 19,
    name: "reconnect",
    kind: "message",
    T: cl,
    oneof: "message"
  }, {
    no: 20,
    name: "pong_resp",
    kind: "message",
    T: Sl,
    oneof: "message"
  }, {
    no: 21,
    name: "subscription_response",
    kind: "message",
    T: wl,
    oneof: "message"
  }, {
    no: 22,
    name: "request_response",
    kind: "message",
    T: Pl,
    oneof: "message"
  }, {
    no: 23,
    name: "track_subscribed",
    kind: "message",
    T: _l,
    oneof: "message"
  }, {
    no: 24,
    name: "room_moved",
    kind: "message",
    T: Tl,
    oneof: "message"
  }, {
    no: 25,
    name: "media_sections_requirement",
    kind: "message",
    T: Ol,
    oneof: "message"
  }, {
    no: 26,
    name: "subscribed_audio_codec_update",
    kind: "message",
    T: yl,
    oneof: "message"
  }, {
    no: 27,
    name: "publish_data_track_response",
    kind: "message",
    T: Fs,
    oneof: "message"
  }, {
    no: 28,
    name: "unpublish_data_track_response",
    kind: "message",
    T: sl,
    oneof: "message"
  }, {
    no: 29,
    name: "data_track_subscriber_handles",
    kind: "message",
    T: rl,
    oneof: "message"
  }]), ns = /* @__PURE__ */ p.makeMessageType("livekit.SimulcastCodec", () => [{
    no: 1,
    name: "codec",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "cid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "layers",
    kind: "message",
    T: ut,
    repeated: true
  }, {
    no: 5,
    name: "video_layer_mode",
    kind: "enum",
    T: p.getEnumType(Qa)
  }]), mn = /* @__PURE__ */ p.makeMessageType("livekit.AddTrackRequest", () => [{
    no: 1,
    name: "cid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "type",
    kind: "enum",
    T: p.getEnumType(Ne)
  }, {
    no: 4,
    name: "width",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 5,
    name: "height",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 6,
    name: "muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 7,
    name: "disable_dtx",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 8,
    name: "source",
    kind: "enum",
    T: p.getEnumType(ie)
  }, {
    no: 9,
    name: "layers",
    kind: "message",
    T: ut,
    repeated: true
  }, {
    no: 10,
    name: "simulcast_codecs",
    kind: "message",
    T: ns,
    repeated: true
  }, {
    no: 11,
    name: "sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 12,
    name: "stereo",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 13,
    name: "disable_red",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 14,
    name: "encryption",
    kind: "enum",
    T: p.getEnumType(J)
  }, {
    no: 15,
    name: "stream",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 16,
    name: "backup_codec_policy",
    kind: "enum",
    T: p.getEnumType(za)
  }, {
    no: 17,
    name: "audio_features",
    kind: "enum",
    T: p.getEnumType(ae),
    repeated: true
  }, {
    no: 18,
    name: "packet_trailer_features",
    kind: "enum",
    T: p.getEnumType(Ya),
    repeated: true
  }]), Us = /* @__PURE__ */ p.makeMessageType("livekit.PublishDataTrackRequest", () => [{
    no: 1,
    name: "pub_handle",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 2,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "encryption",
    kind: "enum",
    T: p.getEnumType(J)
  }]), Fs = /* @__PURE__ */ p.makeMessageType("livekit.PublishDataTrackResponse", () => [{
    no: 1,
    name: "info",
    kind: "message",
    T: ri
  }]), Bs = /* @__PURE__ */ p.makeMessageType("livekit.UnpublishDataTrackRequest", () => [{
    no: 1,
    name: "pub_handle",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), sl = /* @__PURE__ */ p.makeMessageType("livekit.UnpublishDataTrackResponse", () => [{
    no: 1,
    name: "info",
    kind: "message",
    T: ri
  }]), rl = /* @__PURE__ */ p.makeMessageType("livekit.DataTrackSubscriberHandles", () => [{
    no: 1,
    name: "sub_handles",
    kind: "map",
    K: 13,
    V: {
      kind: "message",
      T: al
    }
  }]), al = /* @__PURE__ */ p.makeMessageType("livekit.DataTrackSubscriberHandles.PublishedDataTrack", () => [{
    no: 1,
    name: "publisher_identity",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "publisher_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }], {
    localName: "DataTrackSubscriberHandles_PublishedDataTrack"
  }), ai = /* @__PURE__ */ p.makeMessageType("livekit.TrickleRequest", () => [{
    no: 1,
    name: "candidateInit",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "target",
    kind: "enum",
    T: p.getEnumType(Le)
  }, {
    no: 3,
    name: "final",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), oi = /* @__PURE__ */ p.makeMessageType("livekit.MuteTrackRequest", () => [{
    no: 1,
    name: "sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "muted",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), ol = /* @__PURE__ */ p.makeMessageType("livekit.JoinResponse", () => [{
    no: 1,
    name: "room",
    kind: "message",
    T: si
  }, {
    no: 2,
    name: "participant",
    kind: "message",
    T: Ot
  }, {
    no: 3,
    name: "other_participants",
    kind: "message",
    T: Ot,
    repeated: true
  }, {
    no: 4,
    name: "server_version",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "ice_servers",
    kind: "message",
    T: vo,
    repeated: true
  }, {
    no: 6,
    name: "subscriber_primary",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 7,
    name: "alternative_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 8,
    name: "client_configuration",
    kind: "message",
    T: oo
  }, {
    no: 9,
    name: "server_region",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 10,
    name: "ping_timeout",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 11,
    name: "ping_interval",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 12,
    name: "server_info",
    kind: "message",
    T: io
  }, {
    no: 13,
    name: "sif_trailer",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }, {
    no: 14,
    name: "enabled_publish_codecs",
    kind: "message",
    T: Kn,
    repeated: true
  }, {
    no: 15,
    name: "fast_publish",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), cl = /* @__PURE__ */ p.makeMessageType("livekit.ReconnectResponse", () => [{
    no: 1,
    name: "ice_servers",
    kind: "message",
    T: vo,
    repeated: true
  }, {
    no: 2,
    name: "client_configuration",
    kind: "message",
    T: oo
  }, {
    no: 3,
    name: "server_info",
    kind: "message",
    T: io
  }, {
    no: 4,
    name: "last_message_seq",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), js = /* @__PURE__ */ p.makeMessageType("livekit.TrackPublishedResponse", () => [{
    no: 1,
    name: "cid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "track",
    kind: "message",
    T: Lt
  }]), dl = /* @__PURE__ */ p.makeMessageType("livekit.TrackUnpublishedResponse", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), mt = /* @__PURE__ */ p.makeMessageType("livekit.SessionDescription", () => [{
    no: 1,
    name: "type",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "sdp",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "id",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 4,
    name: "mid_to_track_id",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }]), ll = /* @__PURE__ */ p.makeMessageType("livekit.ParticipantUpdate", () => [{
    no: 1,
    name: "participants",
    kind: "message",
    T: Ot,
    repeated: true
  }]), ci = /* @__PURE__ */ p.makeMessageType("livekit.UpdateSubscription", () => [{
    no: 1,
    name: "track_sids",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 2,
    name: "subscribe",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 3,
    name: "participant_tracks",
    kind: "message",
    T: no,
    repeated: true
  }]), ho = /* @__PURE__ */ p.makeMessageType("livekit.UpdateDataSubscription", () => [{
    no: 1,
    name: "updates",
    kind: "message",
    T: fo,
    repeated: true
  }]), fo = /* @__PURE__ */ p.makeMessageType("livekit.UpdateDataSubscription.Update", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "subscribe",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 3,
    name: "options",
    kind: "message",
    T: Jd
  }], {
    localName: "UpdateDataSubscription_Update"
  }), mo = /* @__PURE__ */ p.makeMessageType("livekit.UpdateTrackSettings", () => [{
    no: 1,
    name: "track_sids",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 3,
    name: "disabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 4,
    name: "quality",
    kind: "enum",
    T: p.getEnumType(Ds)
  }, {
    no: 5,
    name: "width",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 6,
    name: "height",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 7,
    name: "fps",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 8,
    name: "priority",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), qs = /* @__PURE__ */ p.makeMessageType("livekit.UpdateLocalAudioTrack", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "features",
    kind: "enum",
    T: p.getEnumType(ae),
    repeated: true
  }]), po = /* @__PURE__ */ p.makeMessageType("livekit.UpdateLocalVideoTrack", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "width",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 3,
    name: "height",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), di = /* @__PURE__ */ p.makeMessageType("livekit.LeaveRequest", () => [{
    no: 1,
    name: "can_reconnect",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 2,
    name: "reason",
    kind: "enum",
    T: p.getEnumType(qe)
  }, {
    no: 3,
    name: "action",
    kind: "enum",
    T: p.getEnumType(Bt)
  }, {
    no: 4,
    name: "regions",
    kind: "message",
    T: Cl
  }]), Bt = /* @__PURE__ */ p.makeEnum("livekit.LeaveRequest.Action", [{
    no: 0,
    name: "DISCONNECT"
  }, {
    no: 1,
    name: "RESUME"
  }, {
    no: 2,
    name: "RECONNECT"
  }]), go = /* @__PURE__ */ p.makeMessageType("livekit.UpdateVideoLayers", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "layers",
    kind: "message",
    T: ut,
    repeated: true
  }]), Vs = /* @__PURE__ */ p.makeMessageType("livekit.UpdateParticipantMetadata", () => [{
    no: 1,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "attributes",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }, {
    no: 4,
    name: "request_id",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), vo = /* @__PURE__ */ p.makeMessageType("livekit.ICEServer", () => [{
    no: 1,
    name: "urls",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 2,
    name: "username",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "credential",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), ul = /* @__PURE__ */ p.makeMessageType("livekit.SpeakersChanged", () => [{
    no: 1,
    name: "speakers",
    kind: "message",
    T: Za,
    repeated: true
  }]), hl = /* @__PURE__ */ p.makeMessageType("livekit.RoomUpdate", () => [{
    no: 1,
    name: "room",
    kind: "message",
    T: si
  }]), fl = /* @__PURE__ */ p.makeMessageType("livekit.ConnectionQualityInfo", () => [{
    no: 1,
    name: "participant_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "quality",
    kind: "enum",
    T: p.getEnumType(nn)
  }, {
    no: 3,
    name: "score",
    kind: "scalar",
    T: 2
    /* ScalarType.FLOAT */
  }]), ml = /* @__PURE__ */ p.makeMessageType("livekit.ConnectionQualityUpdate", () => [{
    no: 1,
    name: "updates",
    kind: "message",
    T: fl,
    repeated: true
  }]), pl = /* @__PURE__ */ p.makeMessageType("livekit.StreamStateInfo", () => [{
    no: 1,
    name: "participant_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "state",
    kind: "enum",
    T: p.getEnumType(ts)
  }]), gl = /* @__PURE__ */ p.makeMessageType("livekit.StreamStateUpdate", () => [{
    no: 1,
    name: "stream_states",
    kind: "message",
    T: pl,
    repeated: true
  }]), Ws = /* @__PURE__ */ p.makeMessageType("livekit.SubscribedQuality", () => [{
    no: 1,
    name: "quality",
    kind: "enum",
    T: p.getEnumType(Ds)
  }, {
    no: 2,
    name: "enabled",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), vl = /* @__PURE__ */ p.makeMessageType("livekit.SubscribedCodec", () => [{
    no: 1,
    name: "codec",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "qualities",
    kind: "message",
    T: Ws,
    repeated: true
  }]), bl = /* @__PURE__ */ p.makeMessageType("livekit.SubscribedQualityUpdate", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "subscribed_qualities",
    kind: "message",
    T: Ws,
    repeated: true
  }, {
    no: 3,
    name: "subscribed_codecs",
    kind: "message",
    T: vl,
    repeated: true
  }]), yl = /* @__PURE__ */ p.makeMessageType("livekit.SubscribedAudioCodecUpdate", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "subscribed_audio_codecs",
    kind: "message",
    T: el,
    repeated: true
  }]), bo = /* @__PURE__ */ p.makeMessageType("livekit.TrackPermission", () => [{
    no: 1,
    name: "participant_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "all_tracks",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 3,
    name: "track_sids",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 4,
    name: "participant_identity",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), yo = /* @__PURE__ */ p.makeMessageType("livekit.SubscriptionPermission", () => [{
    no: 1,
    name: "all_participants",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 2,
    name: "track_permissions",
    kind: "message",
    T: bo,
    repeated: true
  }]), kl = /* @__PURE__ */ p.makeMessageType("livekit.SubscriptionPermissionUpdate", () => [{
    no: 1,
    name: "participant_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "allowed",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }]), Tl = /* @__PURE__ */ p.makeMessageType("livekit.RoomMovedResponse", () => [{
    no: 1,
    name: "room",
    kind: "message",
    T: si
  }, {
    no: 2,
    name: "token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "participant",
    kind: "message",
    T: Ot
  }, {
    no: 4,
    name: "other_participants",
    kind: "message",
    T: Ot,
    repeated: true
  }]), Hs = /* @__PURE__ */ p.makeMessageType("livekit.SyncState", () => [{
    no: 1,
    name: "answer",
    kind: "message",
    T: mt
  }, {
    no: 2,
    name: "subscription",
    kind: "message",
    T: ci
  }, {
    no: 3,
    name: "publish_tracks",
    kind: "message",
    T: js,
    repeated: true
  }, {
    no: 4,
    name: "data_channels",
    kind: "message",
    T: To,
    repeated: true
  }, {
    no: 5,
    name: "offer",
    kind: "message",
    T: mt
  }, {
    no: 6,
    name: "track_sids_disabled",
    kind: "scalar",
    T: 9,
    repeated: true
  }, {
    no: 7,
    name: "datachannel_receive_states",
    kind: "message",
    T: ko,
    repeated: true
  }, {
    no: 8,
    name: "publish_data_tracks",
    kind: "message",
    T: Fs,
    repeated: true
  }]), ko = /* @__PURE__ */ p.makeMessageType("livekit.DataChannelReceiveState", () => [{
    no: 1,
    name: "publisher_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "last_seq",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), To = /* @__PURE__ */ p.makeMessageType("livekit.DataChannelInfo", () => [{
    no: 1,
    name: "label",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "id",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 3,
    name: "target",
    kind: "enum",
    T: p.getEnumType(Le)
  }]), Ke = /* @__PURE__ */ p.makeMessageType("livekit.SimulateScenario", () => [{
    no: 1,
    name: "speaker_update",
    kind: "scalar",
    T: 5,
    oneof: "scenario"
  }, {
    no: 2,
    name: "node_failure",
    kind: "scalar",
    T: 8,
    oneof: "scenario"
  }, {
    no: 3,
    name: "migration",
    kind: "scalar",
    T: 8,
    oneof: "scenario"
  }, {
    no: 4,
    name: "server_leave",
    kind: "scalar",
    T: 8,
    oneof: "scenario"
  }, {
    no: 5,
    name: "switch_candidate_protocol",
    kind: "enum",
    T: p.getEnumType(nl),
    oneof: "scenario"
  }, {
    no: 6,
    name: "subscriber_bandwidth",
    kind: "scalar",
    T: 3,
    oneof: "scenario"
  }, {
    no: 7,
    name: "disconnect_signal_on_resume",
    kind: "scalar",
    T: 8,
    oneof: "scenario"
  }, {
    no: 8,
    name: "disconnect_signal_on_resume_no_messages",
    kind: "scalar",
    T: 8,
    oneof: "scenario"
  }, {
    no: 9,
    name: "leave_request_full_reconnect",
    kind: "scalar",
    T: 8,
    oneof: "scenario"
  }]), So = /* @__PURE__ */ p.makeMessageType("livekit.Ping", () => [{
    no: 1,
    name: "timestamp",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 2,
    name: "rtt",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }]), Sl = /* @__PURE__ */ p.makeMessageType("livekit.Pong", () => [{
    no: 1,
    name: "last_ping_timestamp",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }, {
    no: 2,
    name: "timestamp",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }]), Cl = /* @__PURE__ */ p.makeMessageType("livekit.RegionSettings", () => [{
    no: 1,
    name: "regions",
    kind: "message",
    T: El,
    repeated: true
  }]), El = /* @__PURE__ */ p.makeMessageType("livekit.RegionInfo", () => [{
    no: 1,
    name: "region",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "distance",
    kind: "scalar",
    T: 3
    /* ScalarType.INT64 */
  }]), wl = /* @__PURE__ */ p.makeMessageType("livekit.SubscriptionResponse", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "err",
    kind: "enum",
    T: p.getEnumType(Wd)
  }]), Pl = /* @__PURE__ */ p.makeMessageType("livekit.RequestResponse", () => [{
    no: 1,
    name: "request_id",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 2,
    name: "reason",
    kind: "enum",
    T: p.getEnumType(yt)
  }, {
    no: 3,
    name: "message",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "trickle",
    kind: "message",
    T: ai,
    oneof: "request"
  }, {
    no: 5,
    name: "add_track",
    kind: "message",
    T: mn,
    oneof: "request"
  }, {
    no: 6,
    name: "mute",
    kind: "message",
    T: oi,
    oneof: "request"
  }, {
    no: 7,
    name: "update_metadata",
    kind: "message",
    T: Vs,
    oneof: "request"
  }, {
    no: 8,
    name: "update_audio_track",
    kind: "message",
    T: qs,
    oneof: "request"
  }, {
    no: 9,
    name: "update_video_track",
    kind: "message",
    T: po,
    oneof: "request"
  }, {
    no: 10,
    name: "publish_data_track",
    kind: "message",
    T: Us,
    oneof: "request"
  }, {
    no: 11,
    name: "unpublish_data_track",
    kind: "message",
    T: Bs,
    oneof: "request"
  }]), yt = /* @__PURE__ */ p.makeEnum("livekit.RequestResponse.Reason", [{
    no: 0,
    name: "OK"
  }, {
    no: 1,
    name: "NOT_FOUND"
  }, {
    no: 2,
    name: "NOT_ALLOWED"
  }, {
    no: 3,
    name: "LIMIT_EXCEEDED"
  }, {
    no: 4,
    name: "QUEUED"
  }, {
    no: 5,
    name: "UNSUPPORTED_TYPE"
  }, {
    no: 6,
    name: "UNCLASSIFIED_ERROR"
  }, {
    no: 7,
    name: "INVALID_HANDLE"
  }, {
    no: 8,
    name: "INVALID_NAME"
  }, {
    no: 9,
    name: "DUPLICATE_HANDLE"
  }, {
    no: 10,
    name: "DUPLICATE_NAME"
  }]), _l = /* @__PURE__ */ p.makeMessageType("livekit.TrackSubscribed", () => [{
    no: 1,
    name: "track_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Co = /* @__PURE__ */ p.makeMessageType("livekit.ConnectionSettings", () => [{
    no: 1,
    name: "auto_subscribe",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 2,
    name: "adaptive_stream",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 3,
    name: "subscriber_allow_pause",
    kind: "scalar",
    T: 8,
    opt: true
  }, {
    no: 4,
    name: "disable_ice_lite",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 5,
    name: "auto_subscribe_data_track",
    kind: "scalar",
    T: 8,
    opt: true
  }]), Rl = /* @__PURE__ */ p.makeMessageType("livekit.JoinRequest", () => [{
    no: 1,
    name: "client_info",
    kind: "message",
    T: ro
  }, {
    no: 2,
    name: "connection_settings",
    kind: "message",
    T: Co
  }, {
    no: 3,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "participant_attributes",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }, {
    no: 5,
    name: "add_track_requests",
    kind: "message",
    T: mn,
    repeated: true
  }, {
    no: 6,
    name: "publisher_offer",
    kind: "message",
    T: mt
  }, {
    no: 7,
    name: "reconnect",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 8,
    name: "reconnect_reason",
    kind: "enum",
    T: p.getEnumType(vt)
  }, {
    no: 9,
    name: "participant_sid",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 10,
    name: "sync_state",
    kind: "message",
    T: Hs
  }]), Il = /* @__PURE__ */ p.makeMessageType("livekit.WrappedJoinRequest", () => [{
    no: 1,
    name: "compression",
    kind: "enum",
    T: p.getEnumType(is)
  }, {
    no: 2,
    name: "join_request",
    kind: "scalar",
    T: 12
    /* ScalarType.BYTES */
  }]), is = /* @__PURE__ */ p.makeEnum("livekit.WrappedJoinRequest.Compression", [{
    no: 0,
    name: "NONE"
  }, {
    no: 1,
    name: "GZIP"
  }]), Ol = /* @__PURE__ */ p.makeMessageType("livekit.MediaSectionsRequirement", () => [{
    no: 1,
    name: "num_audios",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 2,
    name: "num_videos",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }]), Eo = /* @__PURE__ */ p.makeEnum("livekit.EncodingOptionsPreset", [{
    no: 0,
    name: "H264_720P_30"
  }, {
    no: 1,
    name: "H264_720P_60"
  }, {
    no: 2,
    name: "H264_1080P_30"
  }, {
    no: 3,
    name: "H264_1080P_60"
  }, {
    no: 4,
    name: "PORTRAIT_H264_720P_30"
  }, {
    no: 5,
    name: "PORTRAIT_H264_720P_60"
  }, {
    no: 6,
    name: "PORTRAIT_H264_1080P_30"
  }, {
    no: 7,
    name: "PORTRAIT_H264_1080P_60"
  }]), Ml = /* @__PURE__ */ p.makeEnum("livekit.EncodedFileType", [{
    no: 0,
    name: "DEFAULT_FILETYPE"
  }, {
    no: 1,
    name: "MP4"
  }, {
    no: 2,
    name: "OGG"
  }, {
    no: 3,
    name: "MP3"
  }]), Dl = /* @__PURE__ */ p.makeEnum("livekit.StreamProtocol", [{
    no: 0,
    name: "DEFAULT_PROTOCOL"
  }, {
    no: 1,
    name: "RTMP"
  }, {
    no: 2,
    name: "SRT"
  }, {
    no: 3,
    name: "WEBSOCKET"
  }]), Al = /* @__PURE__ */ p.makeEnum("livekit.SegmentedFileProtocol", [{
    no: 0,
    name: "DEFAULT_SEGMENTED_FILE_PROTOCOL"
  }, {
    no: 1,
    name: "HLS_PROTOCOL"
  }]), xl = /* @__PURE__ */ p.makeEnum("livekit.SegmentedFileSuffix", [{
    no: 0,
    name: "INDEX"
  }, {
    no: 1,
    name: "TIMESTAMP"
  }]), Nl = /* @__PURE__ */ p.makeEnum("livekit.ImageFileSuffix", [{
    no: 0,
    name: "IMAGE_SUFFIX_INDEX"
  }, {
    no: 1,
    name: "IMAGE_SUFFIX_TIMESTAMP"
  }, {
    no: 2,
    name: "IMAGE_SUFFIX_NONE_OVERWRITE"
  }]), Ll = /* @__PURE__ */ p.makeEnum("livekit.AudioMixing", [{
    no: 0,
    name: "DEFAULT_MIXING"
  }, {
    no: 1,
    name: "DUAL_CHANNEL_AGENT"
  }, {
    no: 2,
    name: "DUAL_CHANNEL_ALTERNATE"
  }]), wo = /* @__PURE__ */ p.makeMessageType("livekit.EncodingOptions", () => [{
    no: 1,
    name: "width",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 2,
    name: "height",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 3,
    name: "depth",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 4,
    name: "framerate",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 5,
    name: "audio_codec",
    kind: "enum",
    T: p.getEnumType(jd)
  }, {
    no: 6,
    name: "audio_bitrate",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 7,
    name: "audio_frequency",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 8,
    name: "video_codec",
    kind: "enum",
    T: p.getEnumType(qd)
  }, {
    no: 9,
    name: "video_bitrate",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 10,
    name: "key_frame_interval",
    kind: "scalar",
    T: 1
    /* ScalarType.DOUBLE */
  }, {
    no: 11,
    name: "audio_quality",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 12,
    name: "video_quality",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }]), _r = /* @__PURE__ */ p.makeMessageType("livekit.StreamOutput", () => [{
    no: 1,
    name: "protocol",
    kind: "enum",
    T: p.getEnumType(Dl)
  }, {
    no: 2,
    name: "urls",
    kind: "scalar",
    T: 9,
    repeated: true
  }]), ss = /* @__PURE__ */ p.makeMessageType("livekit.SegmentedFileOutput", () => [{
    no: 1,
    name: "protocol",
    kind: "enum",
    T: p.getEnumType(Al)
  }, {
    no: 2,
    name: "filename_prefix",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "playlist_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 11,
    name: "live_playlist_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "segment_duration",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 10,
    name: "filename_suffix",
    kind: "enum",
    T: p.getEnumType(xl)
  }, {
    no: 8,
    name: "disable_manifest",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 5,
    name: "s3",
    kind: "message",
    T: li,
    oneof: "output"
  }, {
    no: 6,
    name: "gcp",
    kind: "message",
    T: ui,
    oneof: "output"
  }, {
    no: 7,
    name: "azure",
    kind: "message",
    T: hi,
    oneof: "output"
  }, {
    no: 9,
    name: "aliOSS",
    kind: "message",
    T: fi,
    oneof: "output"
  }]), Ul = /* @__PURE__ */ p.makeMessageType("livekit.ImageOutput", () => [{
    no: 1,
    name: "capture_interval",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 2,
    name: "width",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 3,
    name: "height",
    kind: "scalar",
    T: 5
    /* ScalarType.INT32 */
  }, {
    no: 4,
    name: "filename_prefix",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "filename_suffix",
    kind: "enum",
    T: p.getEnumType(Nl)
  }, {
    no: 6,
    name: "image_codec",
    kind: "enum",
    T: p.getEnumType(Vd)
  }, {
    no: 7,
    name: "disable_manifest",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 8,
    name: "s3",
    kind: "message",
    T: li,
    oneof: "output"
  }, {
    no: 9,
    name: "gcp",
    kind: "message",
    T: ui,
    oneof: "output"
  }, {
    no: 10,
    name: "azure",
    kind: "message",
    T: hi,
    oneof: "output"
  }, {
    no: 11,
    name: "aliOSS",
    kind: "message",
    T: fi,
    oneof: "output"
  }]), li = /* @__PURE__ */ p.makeMessageType("livekit.S3Upload", () => [{
    no: 1,
    name: "access_key",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "secret",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 11,
    name: "session_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 12,
    name: "assume_role_arn",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 13,
    name: "assume_role_external_id",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "region",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "endpoint",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "bucket",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 6,
    name: "force_path_style",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 7,
    name: "metadata",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }, {
    no: 8,
    name: "tagging",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 9,
    name: "content_disposition",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 10,
    name: "proxy",
    kind: "message",
    T: Po
  }]), ui = /* @__PURE__ */ p.makeMessageType("livekit.GCPUpload", () => [{
    no: 1,
    name: "credentials",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "bucket",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "proxy",
    kind: "message",
    T: Po
  }]), hi = /* @__PURE__ */ p.makeMessageType("livekit.AzureBlobUpload", () => [{
    no: 1,
    name: "account_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "account_key",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "container_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), fi = /* @__PURE__ */ p.makeMessageType("livekit.AliOSSUpload", () => [{
    no: 1,
    name: "access_key",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "secret",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "region",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 4,
    name: "endpoint",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "bucket",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Po = /* @__PURE__ */ p.makeMessageType("livekit.ProxyConfig", () => [{
    no: 1,
    name: "url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "username",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "password",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]), Fl = /* @__PURE__ */ p.makeMessageType("livekit.AutoParticipantEgress", () => [{
    no: 1,
    name: "preset",
    kind: "enum",
    T: p.getEnumType(Eo),
    oneof: "options"
  }, {
    no: 2,
    name: "advanced",
    kind: "message",
    T: wo,
    oneof: "options"
  }, {
    no: 3,
    name: "file_outputs",
    kind: "message",
    T: rs,
    repeated: true
  }, {
    no: 4,
    name: "segment_outputs",
    kind: "message",
    T: ss,
    repeated: true
  }]), Bl = /* @__PURE__ */ p.makeMessageType("livekit.AutoTrackEgress", () => [{
    no: 1,
    name: "filepath",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "disable_manifest",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 2,
    name: "s3",
    kind: "message",
    T: li,
    oneof: "output"
  }, {
    no: 3,
    name: "gcp",
    kind: "message",
    T: ui,
    oneof: "output"
  }, {
    no: 4,
    name: "azure",
    kind: "message",
    T: hi,
    oneof: "output"
  }, {
    no: 6,
    name: "aliOSS",
    kind: "message",
    T: fi,
    oneof: "output"
  }]), jl = /* @__PURE__ */ p.makeMessageType("livekit.RoomCompositeEgressRequest", () => [{
    no: 1,
    name: "room_name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "layout",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 3,
    name: "audio_only",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 15,
    name: "audio_mixing",
    kind: "enum",
    T: p.getEnumType(Ll)
  }, {
    no: 4,
    name: "video_only",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 5,
    name: "custom_base_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 6,
    name: "file",
    kind: "message",
    T: rs,
    oneof: "output"
  }, {
    no: 7,
    name: "stream",
    kind: "message",
    T: _r,
    oneof: "output"
  }, {
    no: 10,
    name: "segments",
    kind: "message",
    T: ss,
    oneof: "output"
  }, {
    no: 8,
    name: "preset",
    kind: "enum",
    T: p.getEnumType(Eo),
    oneof: "options"
  }, {
    no: 9,
    name: "advanced",
    kind: "message",
    T: wo,
    oneof: "options"
  }, {
    no: 11,
    name: "file_outputs",
    kind: "message",
    T: rs,
    repeated: true
  }, {
    no: 12,
    name: "stream_outputs",
    kind: "message",
    T: _r,
    repeated: true
  }, {
    no: 13,
    name: "segment_outputs",
    kind: "message",
    T: ss,
    repeated: true
  }, {
    no: 14,
    name: "image_outputs",
    kind: "message",
    T: Ul,
    repeated: true
  }, {
    no: 16,
    name: "webhooks",
    kind: "message",
    T: Zd,
    repeated: true
  }]), rs = /* @__PURE__ */ p.makeMessageType("livekit.EncodedFileOutput", () => [{
    no: 1,
    name: "file_type",
    kind: "enum",
    T: p.getEnumType(Ml)
  }, {
    no: 2,
    name: "filepath",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 6,
    name: "disable_manifest",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 3,
    name: "s3",
    kind: "message",
    T: li,
    oneof: "output"
  }, {
    no: 4,
    name: "gcp",
    kind: "message",
    T: ui,
    oneof: "output"
  }, {
    no: 5,
    name: "azure",
    kind: "message",
    T: hi,
    oneof: "output"
  }, {
    no: 7,
    name: "aliOSS",
    kind: "message",
    T: fi,
    oneof: "output"
  }]), ql = /* @__PURE__ */ p.makeMessageType("livekit.RoomEgress", () => [{
    no: 1,
    name: "room",
    kind: "message",
    T: jl
  }, {
    no: 3,
    name: "participant",
    kind: "message",
    T: Fl
  }, {
    no: 2,
    name: "tracks",
    kind: "message",
    T: Bl
  }]), Qn = /* @__PURE__ */ p.makeMessageType("livekit.RoomConfiguration", () => [{
    no: 1,
    name: "name",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "empty_timeout",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 3,
    name: "departure_timeout",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 4,
    name: "max_participants",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 11,
    name: "metadata",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 5,
    name: "egress",
    kind: "message",
    T: ql
  }, {
    no: 7,
    name: "min_playout_delay",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 8,
    name: "max_playout_delay",
    kind: "scalar",
    T: 13
    /* ScalarType.UINT32 */
  }, {
    no: 9,
    name: "sync_streams",
    kind: "scalar",
    T: 8
    /* ScalarType.BOOL */
  }, {
    no: 10,
    name: "agents",
    kind: "message",
    T: es,
    repeated: true
  }, {
    no: 12,
    name: "tags",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }]), Vl = /* @__PURE__ */ p.makeMessageType("livekit.TokenSourceRequest", () => [{
    no: 1,
    name: "room_name",
    kind: "scalar",
    T: 9,
    opt: true
  }, {
    no: 2,
    name: "participant_name",
    kind: "scalar",
    T: 9,
    opt: true
  }, {
    no: 3,
    name: "participant_identity",
    kind: "scalar",
    T: 9,
    opt: true
  }, {
    no: 4,
    name: "participant_metadata",
    kind: "scalar",
    T: 9,
    opt: true
  }, {
    no: 5,
    name: "participant_attributes",
    kind: "map",
    K: 9,
    V: {
      kind: "scalar",
      T: 9
      /* ScalarType.STRING */
    }
  }, {
    no: 6,
    name: "room_config",
    kind: "message",
    T: Qn,
    opt: true
  }]), _o = /* @__PURE__ */ p.makeMessageType("livekit.TokenSourceResponse", () => [{
    no: 1,
    name: "server_url",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }, {
    no: 2,
    name: "participant_token",
    kind: "scalar",
    T: 9
    /* ScalarType.STRING */
  }]);
  function Wl(i) {
    return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
  }
  var Nn = { exports: {} }, Hl = Nn.exports, Rr;
  function Kl() {
    return Rr || (Rr = 1, (function(i) {
      (function(e, t) {
        i.exports ? i.exports = t() : e.log = t();
      })(Hl, function() {
        var e = function() {
        }, t = "undefined", n = typeof window !== t && typeof window.navigator !== t && /Trident\/|MSIE /.test(window.navigator.userAgent), s = ["trace", "debug", "info", "warn", "error"], r = {}, a = null;
        function o(g, T) {
          var k = g[T];
          if (typeof k.bind == "function")
            return k.bind(g);
          try {
            return Function.prototype.bind.call(k, g);
          } catch {
            return function() {
              return Function.prototype.apply.apply(k, [g, arguments]);
            };
          }
        }
        function d() {
          console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
        }
        function c(g) {
          return g === "debug" && (g = "log"), typeof console === t ? false : g === "trace" && n ? d : console[g] !== void 0 ? o(console, g) : console.log !== void 0 ? o(console, "log") : e;
        }
        function l() {
          for (var g = this.getLevel(), T = 0; T < s.length; T++) {
            var k = s[T];
            this[k] = T < g ? e : this.methodFactory(k, g, this.name);
          }
          if (this.log = this.debug, typeof console === t && g < this.levels.SILENT)
            return "No console available for logging";
        }
        function u(g) {
          return function() {
            typeof console !== t && (l.call(this), this[g].apply(this, arguments));
          };
        }
        function h(g, T, k) {
          return c(g) || u.apply(this, arguments);
        }
        function f(g, T) {
          var k = this, w, O, b, y = "loglevel";
          typeof g == "string" ? y += ":" + g : typeof g == "symbol" && (y = void 0);
          function S(A) {
            var F = (s[A] || "silent").toUpperCase();
            if (!(typeof window === t || !y)) {
              try {
                window.localStorage[y] = F;
                return;
              } catch {
              }
              try {
                window.document.cookie = encodeURIComponent(y) + "=" + F + ";";
              } catch {
              }
            }
          }
          function M() {
            var A;
            if (!(typeof window === t || !y)) {
              try {
                A = window.localStorage[y];
              } catch {
              }
              if (typeof A === t)
                try {
                  var F = window.document.cookie, te = encodeURIComponent(y), de = F.indexOf(te + "=");
                  de !== -1 && (A = /^([^;]+)/.exec(F.slice(de + te.length + 1))[1]);
                } catch {
                }
              return k.levels[A] === void 0 && (A = void 0), A;
            }
          }
          function D() {
            if (!(typeof window === t || !y)) {
              try {
                window.localStorage.removeItem(y);
              } catch {
              }
              try {
                window.document.cookie = encodeURIComponent(y) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
              } catch {
              }
            }
          }
          function x(A) {
            var F = A;
            if (typeof F == "string" && k.levels[F.toUpperCase()] !== void 0 && (F = k.levels[F.toUpperCase()]), typeof F == "number" && F >= 0 && F <= k.levels.SILENT)
              return F;
            throw new TypeError("log.setLevel() called with invalid level: " + A);
          }
          k.name = g, k.levels = {
            TRACE: 0,
            DEBUG: 1,
            INFO: 2,
            WARN: 3,
            ERROR: 4,
            SILENT: 5
          }, k.methodFactory = T || h, k.getLevel = function() {
            return b ?? O ?? w;
          }, k.setLevel = function(A, F) {
            return b = x(A), F !== false && S(b), l.call(k);
          }, k.setDefaultLevel = function(A) {
            O = x(A), M() || k.setLevel(A, false);
          }, k.resetLevel = function() {
            b = null, D(), l.call(k);
          }, k.enableAll = function(A) {
            k.setLevel(k.levels.TRACE, A);
          }, k.disableAll = function(A) {
            k.setLevel(k.levels.SILENT, A);
          }, k.rebuild = function() {
            if (a !== k && (w = x(a.getLevel())), l.call(k), a === k)
              for (var A in r)
                r[A].rebuild();
          }, w = x(a ? a.getLevel() : "WARN");
          var N = M();
          N != null && (b = x(N)), l.call(k);
        }
        a = new f(), a.getLogger = function(T) {
          if (typeof T != "symbol" && typeof T != "string" || T === "")
            throw new TypeError("You must supply a name when creating a logger.");
          var k = r[T];
          return k || (k = r[T] = new f(T, a.methodFactory)), k;
        };
        var v = typeof window !== t ? window.log : void 0;
        return a.noConflict = function() {
          return typeof window !== t && window.log === a && (window.log = v), a;
        }, a.getLoggers = function() {
          return r;
        }, a.default = a, a;
      });
    })(Nn)), Nn.exports;
  }
  var wn = Kl(), pn;
  (function(i) {
    i[i.trace = 0] = "trace", i[i.debug = 1] = "debug", i[i.info = 2] = "info", i[i.warn = 3] = "warn", i[i.error = 4] = "error", i[i.silent = 5] = "silent";
  })(pn || (pn = {}));
  var fe;
  (function(i) {
    i.Default = "livekit", i.Room = "livekit-room", i.TokenSource = "livekit-token-source", i.Participant = "livekit-participant", i.Track = "livekit-track", i.Publication = "livekit-track-publication", i.Engine = "livekit-engine", i.Signal = "livekit-signal", i.PCManager = "livekit-pc-manager", i.PCTransport = "livekit-pc-transport", i.E2EE = "lk-e2ee", i.DataTracks = "livekit-data-tracks";
  })(fe || (fe = {}));
  let U = wn.getLogger("livekit");
  const Ro = Object.values(fe).map((i) => wn.getLogger(i));
  U.setDefaultLevel(pn.info);
  function Ee(i) {
    const e = wn.getLogger(i);
    return e.setDefaultLevel(U.getLevel()), e;
  }
  function pm(i, e) {
    if (e)
      wn.getLogger(e).setLevel(i);
    else
      for (const t of Ro)
        t.setLevel(i);
  }
  function gm(i, e) {
    (e ? [e] : Ro).forEach((n) => {
      const s = n.methodFactory;
      n.methodFactory = (r, a, o) => {
        const d = s(r, a, o), c = pn[r], l = c >= a && c < pn.silent;
        return (u, h) => {
          h ? d(u, h) : d(u), l && i(c, u, h);
        };
      }, n.setLevel(n.getLevel());
    });
  }
  const Gl = wn.getLogger("lk-e2ee"), Xt = 7e3, Jl = [0, 300, 4 * 300, 9 * 300, 16 * 300, Xt, Xt, Xt, Xt, Xt];
  class zl {
    constructor(e) {
      this._retryDelays = e !== void 0 ? [...e] : Jl;
    }
    nextRetryDelayInMs(e) {
      if (e.retryCount >= this._retryDelays.length) return null;
      const t = this._retryDelays[e.retryCount];
      return e.retryCount <= 1 ? t : t + Math.random() * 1e3;
    }
  }
  function Ks(i, e) {
    var t = {};
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && e.indexOf(n) < 0 && (t[n] = i[n]);
    if (i != null && typeof Object.getOwnPropertySymbols == "function")
      for (var s = 0, n = Object.getOwnPropertySymbols(i); s < n.length; s++)
        e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(i, n[s]) && (t[n[s]] = i[n[s]]);
    return t;
  }
  function m(i, e, t, n) {
    function s(r) {
      return r instanceof t ? r : new t(function(a) {
        a(r);
      });
    }
    return new (t || (t = Promise))(function(r, a) {
      function o(l) {
        try {
          c(n.next(l));
        } catch (u) {
          a(u);
        }
      }
      function d(l) {
        try {
          c(n.throw(l));
        } catch (u) {
          a(u);
        }
      }
      function c(l) {
        l.done ? r(l.value) : s(l.value).then(o, d);
      }
      c((n = n.apply(i, e || [])).next());
    });
  }
  function Ir(i) {
    var e = typeof Symbol == "function" && Symbol.iterator, t = e && i[e], n = 0;
    if (t) return t.call(i);
    if (i && typeof i.length == "number") return {
      next: function() {
        return i && n >= i.length && (i = void 0), { value: i && i[n++], done: !i };
      }
    };
    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function Gt(i) {
    return this instanceof Gt ? (this.v = i, this) : new Gt(i);
  }
  function Yl(i, e, t) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var n = t.apply(i, e || []), s, r = [];
    return s = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), o("next"), o("throw"), o("return", a), s[Symbol.asyncIterator] = function() {
      return this;
    }, s;
    function a(f) {
      return function(v) {
        return Promise.resolve(v).then(f, u);
      };
    }
    function o(f, v) {
      n[f] && (s[f] = function(g) {
        return new Promise(function(T, k) {
          r.push([f, g, T, k]) > 1 || d(f, g);
        });
      }, v && (s[f] = v(s[f])));
    }
    function d(f, v) {
      try {
        c(n[f](v));
      } catch (g) {
        h(r[0][3], g);
      }
    }
    function c(f) {
      f.value instanceof Gt ? Promise.resolve(f.value.v).then(l, u) : h(r[0][2], f);
    }
    function l(f) {
      d("next", f);
    }
    function u(f) {
      d("throw", f);
    }
    function h(f, v) {
      f(v), r.shift(), r.length && d(r[0][0], r[0][1]);
    }
  }
  function Ql(i) {
    var e, t;
    return e = {}, n("next"), n("throw", function(s) {
      throw s;
    }), n("return"), e[Symbol.iterator] = function() {
      return this;
    }, e;
    function n(s, r) {
      e[s] = i[s] ? function(a) {
        return (t = !t) ? { value: Gt(i[s](a)), done: false } : r ? r(a) : a;
      } : r;
    }
  }
  function Ue(i) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var e = i[Symbol.asyncIterator], t;
    return e ? e.call(i) : (i = typeof Ir == "function" ? Ir(i) : i[Symbol.iterator](), t = {}, n("next"), n("throw"), n("return"), t[Symbol.asyncIterator] = function() {
      return this;
    }, t);
    function n(r) {
      t[r] = i[r] && function(a) {
        return new Promise(function(o, d) {
          a = i[r](a), s(o, d, a.done, a.value);
        });
      };
    }
    function s(r, a, o, d) {
      Promise.resolve(d).then(function(c) {
        r({ value: c, done: o });
      }, a);
    }
  }
  var Rn = { exports: {} }, Or;
  function Xl() {
    if (Or) return Rn.exports;
    Or = 1;
    var i = typeof Reflect == "object" ? Reflect : null, e = i && typeof i.apply == "function" ? i.apply : function(y, S, M) {
      return Function.prototype.apply.call(y, S, M);
    }, t;
    i && typeof i.ownKeys == "function" ? t = i.ownKeys : Object.getOwnPropertySymbols ? t = function(y) {
      return Object.getOwnPropertyNames(y).concat(Object.getOwnPropertySymbols(y));
    } : t = function(y) {
      return Object.getOwnPropertyNames(y);
    };
    function n(b) {
      console && console.warn && console.warn(b);
    }
    var s = Number.isNaN || function(y) {
      return y !== y;
    };
    function r() {
      r.init.call(this);
    }
    Rn.exports = r, Rn.exports.once = k, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._eventsCount = 0, r.prototype._maxListeners = void 0;
    var a = 10;
    function o(b) {
      if (typeof b != "function")
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof b);
    }
    Object.defineProperty(r, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return a;
      },
      set: function(b) {
        if (typeof b != "number" || b < 0 || s(b))
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + b + ".");
        a = b;
      }
    }), r.init = function() {
      (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    }, r.prototype.setMaxListeners = function(y) {
      if (typeof y != "number" || y < 0 || s(y))
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + y + ".");
      return this._maxListeners = y, this;
    };
    function d(b) {
      return b._maxListeners === void 0 ? r.defaultMaxListeners : b._maxListeners;
    }
    r.prototype.getMaxListeners = function() {
      return d(this);
    }, r.prototype.emit = function(y) {
      for (var S = [], M = 1; M < arguments.length; M++) S.push(arguments[M]);
      var D = y === "error", x = this._events;
      if (x !== void 0) D = D && x.error === void 0;
      else if (!D) return false;
      if (D) {
        var N;
        if (S.length > 0 && (N = S[0]), N instanceof Error)
          throw N;
        var A = new Error("Unhandled error." + (N ? " (" + N.message + ")" : ""));
        throw A.context = N, A;
      }
      var F = x[y];
      if (F === void 0) return false;
      if (typeof F == "function")
        e(F, this, S);
      else
        for (var te = F.length, de = v(F, te), M = 0; M < te; ++M) e(de[M], this, S);
      return true;
    };
    function c(b, y, S, M) {
      var D, x, N;
      if (o(S), x = b._events, x === void 0 ? (x = b._events = /* @__PURE__ */ Object.create(null), b._eventsCount = 0) : (x.newListener !== void 0 && (b.emit("newListener", y, S.listener ? S.listener : S), x = b._events), N = x[y]), N === void 0)
        N = x[y] = S, ++b._eventsCount;
      else if (typeof N == "function" ? N = x[y] = M ? [S, N] : [N, S] : M ? N.unshift(S) : N.push(S), D = d(b), D > 0 && N.length > D && !N.warned) {
        N.warned = true;
        var A = new Error("Possible EventEmitter memory leak detected. " + N.length + " " + String(y) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        A.name = "MaxListenersExceededWarning", A.emitter = b, A.type = y, A.count = N.length, n(A);
      }
      return b;
    }
    r.prototype.addListener = function(y, S) {
      return c(this, y, S, false);
    }, r.prototype.on = r.prototype.addListener, r.prototype.prependListener = function(y, S) {
      return c(this, y, S, true);
    };
    function l() {
      if (!this.fired)
        return this.target.removeListener(this.type, this.wrapFn), this.fired = true, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
    }
    function u(b, y, S) {
      var M = {
        fired: false,
        wrapFn: void 0,
        target: b,
        type: y,
        listener: S
      }, D = l.bind(M);
      return D.listener = S, M.wrapFn = D, D;
    }
    r.prototype.once = function(y, S) {
      return o(S), this.on(y, u(this, y, S)), this;
    }, r.prototype.prependOnceListener = function(y, S) {
      return o(S), this.prependListener(y, u(this, y, S)), this;
    }, r.prototype.removeListener = function(y, S) {
      var M, D, x, N, A;
      if (o(S), D = this._events, D === void 0) return this;
      if (M = D[y], M === void 0) return this;
      if (M === S || M.listener === S)
        --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete D[y], D.removeListener && this.emit("removeListener", y, M.listener || S));
      else if (typeof M != "function") {
        for (x = -1, N = M.length - 1; N >= 0; N--)
          if (M[N] === S || M[N].listener === S) {
            A = M[N].listener, x = N;
            break;
          }
        if (x < 0) return this;
        x === 0 ? M.shift() : g(M, x), M.length === 1 && (D[y] = M[0]), D.removeListener !== void 0 && this.emit("removeListener", y, A || S);
      }
      return this;
    }, r.prototype.off = r.prototype.removeListener, r.prototype.removeAllListeners = function(y) {
      var S, M, D;
      if (M = this._events, M === void 0) return this;
      if (M.removeListener === void 0)
        return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : M[y] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete M[y]), this;
      if (arguments.length === 0) {
        var x = Object.keys(M), N;
        for (D = 0; D < x.length; ++D)
          N = x[D], N !== "removeListener" && this.removeAllListeners(N);
        return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
      }
      if (S = M[y], typeof S == "function")
        this.removeListener(y, S);
      else if (S !== void 0)
        for (D = S.length - 1; D >= 0; D--)
          this.removeListener(y, S[D]);
      return this;
    };
    function h(b, y, S) {
      var M = b._events;
      if (M === void 0) return [];
      var D = M[y];
      return D === void 0 ? [] : typeof D == "function" ? S ? [D.listener || D] : [D] : S ? T(D) : v(D, D.length);
    }
    r.prototype.listeners = function(y) {
      return h(this, y, true);
    }, r.prototype.rawListeners = function(y) {
      return h(this, y, false);
    }, r.listenerCount = function(b, y) {
      return typeof b.listenerCount == "function" ? b.listenerCount(y) : f.call(b, y);
    }, r.prototype.listenerCount = f;
    function f(b) {
      var y = this._events;
      if (y !== void 0) {
        var S = y[b];
        if (typeof S == "function")
          return 1;
        if (S !== void 0)
          return S.length;
      }
      return 0;
    }
    r.prototype.eventNames = function() {
      return this._eventsCount > 0 ? t(this._events) : [];
    };
    function v(b, y) {
      for (var S = new Array(y), M = 0; M < y; ++M) S[M] = b[M];
      return S;
    }
    function g(b, y) {
      for (; y + 1 < b.length; y++) b[y] = b[y + 1];
      b.pop();
    }
    function T(b) {
      for (var y = new Array(b.length), S = 0; S < y.length; ++S)
        y[S] = b[S].listener || b[S];
      return y;
    }
    function k(b, y) {
      return new Promise(function(S, M) {
        function D(N) {
          b.removeListener(y, x), M(N);
        }
        function x() {
          typeof b.removeListener == "function" && b.removeListener("error", D), S([].slice.call(arguments));
        }
        O(b, y, x, {
          once: true
        }), y !== "error" && w(b, D, {
          once: true
        });
      });
    }
    function w(b, y, S) {
      typeof b.on == "function" && O(b, "error", y, S);
    }
    function O(b, y, S, M) {
      if (typeof b.on == "function")
        M.once ? b.once(y, S) : b.on(y, S);
      else if (typeof b.addEventListener == "function")
        b.addEventListener(y, function D(x) {
          M.once && b.removeEventListener(y, D), S(x);
        });
      else
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof b);
    }
    return Rn.exports;
  }
  var Ie = Xl();
  let Io = true, Oo = true;
  function sn(i, e, t) {
    const n = i.match(e);
    return n && n.length >= t && parseFloat(n[t], 10);
  }
  function At(i, e, t) {
    if (!i.RTCPeerConnection)
      return;
    if (!Object.getOwnPropertyDescriptor(EventTarget.prototype, "addEventListener").writable) {
      Gs("Unable to polyfill events");
      return;
    }
    const s = i.RTCPeerConnection.prototype, r = s.addEventListener;
    s.addEventListener = function(o, d) {
      if (o !== e)
        return r.apply(this, arguments);
      const c = (l) => {
        const u = t(l);
        u && (d.handleEvent ? d.handleEvent(u) : d(u));
      };
      return this._eventMap = this._eventMap || {}, this._eventMap[e] || (this._eventMap[e] = /* @__PURE__ */ new Map()), this._eventMap[e].set(d, c), r.apply(this, [o, c]);
    };
    const a = s.removeEventListener;
    s.removeEventListener = function(o, d) {
      if (o !== e || !this._eventMap || !this._eventMap[e])
        return a.apply(this, arguments);
      if (!this._eventMap[e].has(d))
        return a.apply(this, arguments);
      const c = this._eventMap[e].get(d);
      return this._eventMap[e].delete(d), this._eventMap[e].size === 0 && delete this._eventMap[e], Object.keys(this._eventMap).length === 0 && delete this._eventMap, a.apply(this, [o, c]);
    }, Object.defineProperty(s, "on" + e, {
      get() {
        return this["_on" + e];
      },
      set(o) {
        this["_on" + e] && (this.removeEventListener(e, this["_on" + e]), delete this["_on" + e]), o && this.addEventListener(e, this["_on" + e] = o);
      },
      enumerable: true,
      configurable: true
    });
  }
  function $l(i) {
    return typeof i != "boolean" ? new Error("Argument type: " + typeof i + ". Please use a boolean.") : (Io = i, i ? "adapter.js logging disabled" : "adapter.js logging enabled");
  }
  function Zl(i) {
    return typeof i != "boolean" ? new Error("Argument type: " + typeof i + ". Please use a boolean.") : (Oo = !i, "adapter.js deprecation warnings " + (i ? "disabled" : "enabled"));
  }
  function Gs() {
    if (typeof window == "object") {
      if (Io)
        return;
      typeof console < "u" && typeof console.log == "function" && console.log.apply(console, arguments);
    }
  }
  function Js(i, e) {
    Oo && console.warn(i + " is deprecated, please use " + e + " instead.");
  }
  function eu(i) {
    const e = {
      browser: null,
      version: null
    };
    if (typeof i > "u" || !i.navigator || !i.navigator.userAgent)
      return e.browser = "Not a browser.", e;
    const {
      navigator: t
    } = i;
    if (t.userAgentData && t.userAgentData.brands) {
      const n = t.userAgentData.brands.find((s) => s.brand === "Chromium");
      if (n)
        return {
          browser: "chrome",
          version: parseInt(n.version, 10)
        };
    }
    if (t.mozGetUserMedia)
      e.browser = "firefox", e.version = parseInt(sn(t.userAgent, /Firefox\/(\d+)\./, 1));
    else if (t.webkitGetUserMedia || i.isSecureContext === false && i.webkitRTCPeerConnection)
      e.browser = "chrome", e.version = parseInt(sn(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)) || null;
    else if (i.RTCPeerConnection && t.userAgent.match(/AppleWebKit\/(\d+)\./))
      e.browser = "safari", e.version = parseInt(sn(t.userAgent, /AppleWebKit\/(\d+)\./, 1)), e.supportsUnifiedPlan = i.RTCRtpTransceiver && "currentDirection" in i.RTCRtpTransceiver.prototype, e._safariVersion = sn(t.userAgent, /Version\/(\d+(\.?\d+))/, 1);
    else
      return e.browser = "Not a supported browser.", e;
    return e;
  }
  function Mr(i) {
    return Object.prototype.toString.call(i) === "[object Object]";
  }
  function Mo(i) {
    return Mr(i) ? Object.keys(i).reduce(function(e, t) {
      const n = Mr(i[t]), s = n ? Mo(i[t]) : i[t], r = n && !Object.keys(s).length;
      return s === void 0 || r ? e : Object.assign(e, {
        [t]: s
      });
    }, {}) : i;
  }
  function as(i, e, t) {
    !e || t.has(e.id) || (t.set(e.id, e), Object.keys(e).forEach((n) => {
      n.endsWith("Id") ? as(i, i.get(e[n]), t) : n.endsWith("Ids") && e[n].forEach((s) => {
        as(i, i.get(s), t);
      });
    }));
  }
  function Dr(i, e, t) {
    const n = t ? "outbound-rtp" : "inbound-rtp", s = /* @__PURE__ */ new Map();
    if (e === null)
      return s;
    const r = [];
    return i.forEach((a) => {
      a.type === "track" && a.trackIdentifier === e.id && r.push(a);
    }), r.forEach((a) => {
      i.forEach((o) => {
        o.type === n && o.trackId === a.id && as(i, o, s);
      });
    }), s;
  }
  const Ar = Gs;
  function Do(i, e) {
    const t = i && i.navigator;
    if (!t.mediaDevices)
      return;
    const n = function(o) {
      if (typeof o != "object" || o.mandatory || o.optional)
        return o;
      const d = {};
      return Object.keys(o).forEach((c) => {
        if (c === "require" || c === "advanced" || c === "mediaSource")
          return;
        const l = typeof o[c] == "object" ? o[c] : {
          ideal: o[c]
        };
        l.exact !== void 0 && typeof l.exact == "number" && (l.min = l.max = l.exact);
        const u = function(h, f) {
          return h ? h + f.charAt(0).toUpperCase() + f.slice(1) : f === "deviceId" ? "sourceId" : f;
        };
        if (l.ideal !== void 0) {
          d.optional = d.optional || [];
          let h = {};
          typeof l.ideal == "number" ? (h[u("min", c)] = l.ideal, d.optional.push(h), h = {}, h[u("max", c)] = l.ideal, d.optional.push(h)) : (h[u("", c)] = l.ideal, d.optional.push(h));
        }
        l.exact !== void 0 && typeof l.exact != "number" ? (d.mandatory = d.mandatory || {}, d.mandatory[u("", c)] = l.exact) : ["min", "max"].forEach((h) => {
          l[h] !== void 0 && (d.mandatory = d.mandatory || {}, d.mandatory[u(h, c)] = l[h]);
        });
      }), o.advanced && (d.optional = (d.optional || []).concat(o.advanced)), d;
    }, s = function(o, d) {
      if (e.version >= 61)
        return d(o);
      if (o = JSON.parse(JSON.stringify(o)), o && typeof o.audio == "object") {
        const c = function(l, u, h) {
          u in l && !(h in l) && (l[h] = l[u], delete l[u]);
        };
        o = JSON.parse(JSON.stringify(o)), c(o.audio, "autoGainControl", "googAutoGainControl"), c(o.audio, "noiseSuppression", "googNoiseSuppression"), o.audio = n(o.audio);
      }
      if (o && typeof o.video == "object") {
        let c = o.video.facingMode;
        c = c && (typeof c == "object" ? c : {
          ideal: c
        });
        const l = e.version < 66;
        if (c && (c.exact === "user" || c.exact === "environment" || c.ideal === "user" || c.ideal === "environment") && !(t.mediaDevices.getSupportedConstraints && t.mediaDevices.getSupportedConstraints().facingMode && !l)) {
          delete o.video.facingMode;
          let u;
          if (c.exact === "environment" || c.ideal === "environment" ? u = ["back", "rear"] : (c.exact === "user" || c.ideal === "user") && (u = ["front"]), u)
            return t.mediaDevices.enumerateDevices().then((h) => {
              h = h.filter((v) => v.kind === "videoinput");
              let f = h.find((v) => u.some((g) => v.label.toLowerCase().includes(g)));
              return !f && h.length && u.includes("back") && (f = h[h.length - 1]), f && (o.video.deviceId = c.exact ? {
                exact: f.deviceId
              } : {
                ideal: f.deviceId
              }), o.video = n(o.video), Ar("chrome: " + JSON.stringify(o)), d(o);
            });
        }
        o.video = n(o.video);
      }
      return Ar("chrome: " + JSON.stringify(o)), d(o);
    }, r = function(o) {
      return e.version >= 64 ? o : {
        name: {
          PermissionDeniedError: "NotAllowedError",
          PermissionDismissedError: "NotAllowedError",
          InvalidStateError: "NotAllowedError",
          DevicesNotFoundError: "NotFoundError",
          ConstraintNotSatisfiedError: "OverconstrainedError",
          TrackStartError: "NotReadableError",
          MediaDeviceFailedDueToShutdown: "NotAllowedError",
          MediaDeviceKillSwitchOn: "NotAllowedError",
          TabCaptureError: "AbortError",
          ScreenCaptureError: "AbortError",
          DeviceCaptureError: "AbortError"
        }[o.name] || o.name,
        message: o.message,
        constraint: o.constraint || o.constraintName,
        toString() {
          return this.name + (this.message && ": ") + this.message;
        }
      };
    }, a = function(o, d, c) {
      s(o, (l) => {
        t.webkitGetUserMedia(l, d, (u) => {
          c && c(r(u));
        });
      });
    };
    if (t.getUserMedia = a.bind(t), t.mediaDevices.getUserMedia) {
      const o = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
      t.mediaDevices.getUserMedia = function(d) {
        return s(d, (c) => o(c).then((l) => {
          if (c.audio && !l.getAudioTracks().length || c.video && !l.getVideoTracks().length)
            throw l.getTracks().forEach((u) => {
              u.stop();
            }), new DOMException("", "NotFoundError");
          return l;
        }, (l) => Promise.reject(r(l))));
      };
    }
  }
  function Ao(i) {
    i.MediaStream = i.MediaStream || i.webkitMediaStream;
  }
  function xo(i, e) {
    if (!(e.version > 102))
      if (typeof i == "object" && i.RTCPeerConnection && !("ontrack" in i.RTCPeerConnection.prototype)) {
        Object.defineProperty(i.RTCPeerConnection.prototype, "ontrack", {
          get() {
            return this._ontrack;
          },
          set(n) {
            this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = n);
          },
          enumerable: true,
          configurable: true
        });
        const t = i.RTCPeerConnection.prototype.setRemoteDescription;
        i.RTCPeerConnection.prototype.setRemoteDescription = function() {
          return this._ontrackpoly || (this._ontrackpoly = (s) => {
            s.stream.addEventListener("addtrack", (r) => {
              let a;
              i.RTCPeerConnection.prototype.getReceivers ? a = this.getReceivers().find((d) => d.track && d.track.id === r.track.id) : a = {
                track: r.track
              };
              const o = new Event("track");
              o.track = r.track, o.receiver = a, o.transceiver = {
                receiver: a
              }, o.streams = [s.stream], this.dispatchEvent(o);
            }), s.stream.getTracks().forEach((r) => {
              let a;
              i.RTCPeerConnection.prototype.getReceivers ? a = this.getReceivers().find((d) => d.track && d.track.id === r.id) : a = {
                track: r
              };
              const o = new Event("track");
              o.track = r, o.receiver = a, o.transceiver = {
                receiver: a
              }, o.streams = [s.stream], this.dispatchEvent(o);
            });
          }, this.addEventListener("addstream", this._ontrackpoly)), t.apply(this, arguments);
        };
      } else
        At(i, "track", (t) => (t.transceiver || Object.defineProperty(t, "transceiver", {
          value: {
            receiver: t.receiver
          }
        }), t));
  }
  function No(i) {
    if (typeof i == "object" && i.RTCPeerConnection && !("getSenders" in i.RTCPeerConnection.prototype) && "createDTMFSender" in i.RTCPeerConnection.prototype) {
      const e = function(s, r) {
        return {
          track: r,
          get dtmf() {
            return this._dtmf === void 0 && (r.kind === "audio" ? this._dtmf = s.createDTMFSender(r) : this._dtmf = null), this._dtmf;
          },
          _pc: s
        };
      };
      if (!i.RTCPeerConnection.prototype.getSenders) {
        i.RTCPeerConnection.prototype.getSenders = function() {
          return this._senders = this._senders || [], this._senders.slice();
        };
        const s = i.RTCPeerConnection.prototype.addTrack;
        i.RTCPeerConnection.prototype.addTrack = function(o, d) {
          let c = s.apply(this, arguments);
          return c || (c = e(this, o), this._senders.push(c)), c;
        };
        const r = i.RTCPeerConnection.prototype.removeTrack;
        i.RTCPeerConnection.prototype.removeTrack = function(o) {
          r.apply(this, arguments);
          const d = this._senders.indexOf(o);
          d !== -1 && this._senders.splice(d, 1);
        };
      }
      const t = i.RTCPeerConnection.prototype.addStream;
      i.RTCPeerConnection.prototype.addStream = function(r) {
        this._senders = this._senders || [], t.apply(this, [r]), r.getTracks().forEach((a) => {
          this._senders.push(e(this, a));
        });
      };
      const n = i.RTCPeerConnection.prototype.removeStream;
      i.RTCPeerConnection.prototype.removeStream = function(r) {
        this._senders = this._senders || [], n.apply(this, [r]), r.getTracks().forEach((a) => {
          const o = this._senders.find((d) => d.track === a);
          o && this._senders.splice(this._senders.indexOf(o), 1);
        });
      };
    } else if (typeof i == "object" && i.RTCPeerConnection && "getSenders" in i.RTCPeerConnection.prototype && "createDTMFSender" in i.RTCPeerConnection.prototype && i.RTCRtpSender && !("dtmf" in i.RTCRtpSender.prototype)) {
      const e = i.RTCPeerConnection.prototype.getSenders;
      i.RTCPeerConnection.prototype.getSenders = function() {
        const n = e.apply(this, []);
        return n.forEach((s) => s._pc = this), n;
      }, Object.defineProperty(i.RTCRtpSender.prototype, "dtmf", {
        get() {
          return this._dtmf === void 0 && (this.track.kind === "audio" ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
        }
      });
    }
  }
  function Lo(i, e) {
    if (e.version >= 67 || !(typeof i == "object" && i.RTCPeerConnection && i.RTCRtpSender && i.RTCRtpReceiver))
      return;
    if (!("getStats" in i.RTCRtpSender.prototype)) {
      const n = i.RTCPeerConnection.prototype.getSenders;
      n && (i.RTCPeerConnection.prototype.getSenders = function() {
        const a = n.apply(this, []);
        return a.forEach((o) => o._pc = this), a;
      });
      const s = i.RTCPeerConnection.prototype.addTrack;
      s && (i.RTCPeerConnection.prototype.addTrack = function() {
        const a = s.apply(this, arguments);
        return a._pc = this, a;
      }), i.RTCRtpSender.prototype.getStats = function() {
        const a = this;
        return this._pc.getStats().then((o) => (
          /* Note: this will include stats of all senders that
           *   send a track with the same id as sender.track as
           *   it is not possible to identify the RTCRtpSender.
           */
          Dr(o, a.track, true)
        ));
      };
    }
    if (!("getStats" in i.RTCRtpReceiver.prototype)) {
      const n = i.RTCPeerConnection.prototype.getReceivers;
      n && (i.RTCPeerConnection.prototype.getReceivers = function() {
        const r = n.apply(this, []);
        return r.forEach((a) => a._pc = this), r;
      }), At(i, "track", (s) => (s.receiver._pc = s.srcElement, s)), i.RTCRtpReceiver.prototype.getStats = function() {
        const r = this;
        return this._pc.getStats().then((a) => Dr(a, r.track, false));
      };
    }
    if (!("getStats" in i.RTCRtpSender.prototype && "getStats" in i.RTCRtpReceiver.prototype))
      return;
    const t = i.RTCPeerConnection.prototype.getStats;
    i.RTCPeerConnection.prototype.getStats = function() {
      if (arguments.length > 0 && arguments[0] instanceof i.MediaStreamTrack) {
        const s = arguments[0];
        let r, a, o;
        return this.getSenders().forEach((d) => {
          d.track === s && (r ? o = true : r = d);
        }), this.getReceivers().forEach((d) => (d.track === s && (a ? o = true : a = d), d.track === s)), o || r && a ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : r ? r.getStats() : a ? a.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
      }
      return t.apply(this, arguments);
    };
  }
  function Uo(i) {
    i.RTCPeerConnection.prototype.getLocalStreams = function() {
      return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map((a) => this._shimmedLocalStreams[a][0]);
    };
    const e = i.RTCPeerConnection.prototype.addTrack;
    i.RTCPeerConnection.prototype.addTrack = function(a, o) {
      if (!o)
        return e.apply(this, arguments);
      this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      const d = e.apply(this, arguments);
      return this._shimmedLocalStreams[o.id] ? this._shimmedLocalStreams[o.id].indexOf(d) === -1 && this._shimmedLocalStreams[o.id].push(d) : this._shimmedLocalStreams[o.id] = [o, d], d;
    };
    const t = i.RTCPeerConnection.prototype.addStream;
    i.RTCPeerConnection.prototype.addStream = function(a) {
      this._shimmedLocalStreams = this._shimmedLocalStreams || {}, a.getTracks().forEach((c) => {
        if (this.getSenders().find((u) => u.track === c))
          throw new DOMException("Track already exists.", "InvalidAccessError");
      });
      const o = this.getSenders();
      t.apply(this, arguments);
      const d = this.getSenders().filter((c) => o.indexOf(c) === -1);
      this._shimmedLocalStreams[a.id] = [a].concat(d);
    };
    const n = i.RTCPeerConnection.prototype.removeStream;
    i.RTCPeerConnection.prototype.removeStream = function(a) {
      return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[a.id], n.apply(this, arguments);
    };
    const s = i.RTCPeerConnection.prototype.removeTrack;
    i.RTCPeerConnection.prototype.removeTrack = function(a) {
      return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, a && Object.keys(this._shimmedLocalStreams).forEach((o) => {
        const d = this._shimmedLocalStreams[o].indexOf(a);
        d !== -1 && this._shimmedLocalStreams[o].splice(d, 1), this._shimmedLocalStreams[o].length === 1 && delete this._shimmedLocalStreams[o];
      }), s.apply(this, arguments);
    };
  }
  function Fo(i, e) {
    if (!i.RTCPeerConnection)
      return;
    if (i.RTCPeerConnection.prototype.addTrack && e.version >= 65)
      return Uo(i);
    const t = i.RTCPeerConnection.prototype.getLocalStreams;
    i.RTCPeerConnection.prototype.getLocalStreams = function() {
      const l = t.apply(this);
      return this._reverseStreams = this._reverseStreams || {}, l.map((u) => this._reverseStreams[u.id]);
    };
    const n = i.RTCPeerConnection.prototype.addStream;
    i.RTCPeerConnection.prototype.addStream = function(l) {
      if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, l.getTracks().forEach((u) => {
        if (this.getSenders().find((f) => f.track === u))
          throw new DOMException("Track already exists.", "InvalidAccessError");
      }), !this._reverseStreams[l.id]) {
        const u = new i.MediaStream(l.getTracks());
        this._streams[l.id] = u, this._reverseStreams[u.id] = l, l = u;
      }
      n.apply(this, [l]);
    };
    const s = i.RTCPeerConnection.prototype.removeStream;
    i.RTCPeerConnection.prototype.removeStream = function(l) {
      this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, s.apply(this, [this._streams[l.id] || l]), delete this._reverseStreams[this._streams[l.id] ? this._streams[l.id].id : l.id], delete this._streams[l.id];
    }, i.RTCPeerConnection.prototype.addTrack = function(l, u) {
      if (this.signalingState === "closed")
        throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
      const h = [].slice.call(arguments, 1);
      if (h.length !== 1 || !h[0].getTracks().find((g) => g === l))
        throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
      if (this.getSenders().find((g) => g.track === l))
        throw new DOMException("Track already exists.", "InvalidAccessError");
      this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
      const v = this._streams[u.id];
      if (v)
        v.addTrack(l), Promise.resolve().then(() => {
          this.dispatchEvent(new Event("negotiationneeded"));
        });
      else {
        const g = new i.MediaStream([l]);
        this._streams[u.id] = g, this._reverseStreams[g.id] = u, this.addStream(g);
      }
      return this.getSenders().find((g) => g.track === l);
    };
    function r(c, l) {
      let u = l.sdp;
      return Object.keys(c._reverseStreams || []).forEach((h) => {
        const f = c._reverseStreams[h], v = c._streams[f.id];
        u = u.replace(new RegExp(v.id, "g"), f.id);
      }), new RTCSessionDescription({
        type: l.type,
        sdp: u
      });
    }
    function a(c, l) {
      let u = l.sdp;
      return Object.keys(c._reverseStreams || []).forEach((h) => {
        const f = c._reverseStreams[h], v = c._streams[f.id];
        u = u.replace(new RegExp(f.id, "g"), v.id);
      }), new RTCSessionDescription({
        type: l.type,
        sdp: u
      });
    }
    ["createOffer", "createAnswer"].forEach(function(c) {
      const l = i.RTCPeerConnection.prototype[c], u = {
        [c]() {
          const h = arguments;
          return arguments.length && typeof arguments[0] == "function" ? l.apply(this, [(v) => {
            const g = r(this, v);
            h[0].apply(null, [g]);
          }, (v) => {
            h[1] && h[1].apply(null, v);
          }, arguments[2]]) : l.apply(this, arguments).then((v) => r(this, v));
        }
      };
      i.RTCPeerConnection.prototype[c] = u[c];
    });
    const o = i.RTCPeerConnection.prototype.setLocalDescription;
    i.RTCPeerConnection.prototype.setLocalDescription = function() {
      return !arguments.length || !arguments[0].type ? o.apply(this, arguments) : (arguments[0] = a(this, arguments[0]), o.apply(this, arguments));
    };
    const d = Object.getOwnPropertyDescriptor(i.RTCPeerConnection.prototype, "localDescription");
    Object.defineProperty(i.RTCPeerConnection.prototype, "localDescription", {
      get() {
        const c = d.get.apply(this);
        return c.type === "" ? c : r(this, c);
      }
    }), i.RTCPeerConnection.prototype.removeTrack = function(l) {
      if (this.signalingState === "closed")
        throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
      if (!l._pc)
        throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
      if (!(l._pc === this))
        throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
      this._streams = this._streams || {};
      let h;
      Object.keys(this._streams).forEach((f) => {
        this._streams[f].getTracks().find((g) => l.track === g) && (h = this._streams[f]);
      }), h && (h.getTracks().length === 1 ? this.removeStream(this._reverseStreams[h.id]) : h.removeTrack(l.track), this.dispatchEvent(new Event("negotiationneeded")));
    };
  }
  function os(i, e) {
    !i.RTCPeerConnection && i.webkitRTCPeerConnection && (i.RTCPeerConnection = i.webkitRTCPeerConnection), i.RTCPeerConnection && e.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
      const n = i.RTCPeerConnection.prototype[t], s = {
        [t]() {
          return arguments[0] = new (t === "addIceCandidate" ? i.RTCIceCandidate : i.RTCSessionDescription)(arguments[0]), n.apply(this, arguments);
        }
      };
      i.RTCPeerConnection.prototype[t] = s[t];
    });
  }
  function Bo(i, e) {
    e.version > 102 || At(i, "negotiationneeded", (t) => {
      const n = t.target;
      if (!((e.version < 72 || n.getConfiguration && n.getConfiguration().sdpSemantics === "plan-b") && n.signalingState !== "stable"))
        return t;
    });
  }
  var xr = /* @__PURE__ */ Object.freeze({ __proto__: null, fixNegotiationNeeded: Bo, shimAddTrackRemoveTrack: Fo, shimAddTrackRemoveTrackWithNative: Uo, shimGetSendersWithDtmf: No, shimGetUserMedia: Do, shimMediaStream: Ao, shimOnTrack: xo, shimPeerConnection: os, shimSenderReceiverGetStats: Lo });
  function jo(i, e) {
    const t = i && i.navigator, n = i && i.MediaStreamTrack;
    if (t.getUserMedia = function(s, r, a) {
      Js("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), t.mediaDevices.getUserMedia(s).then(r, a);
    }, !(e.version > 55 && "autoGainControl" in t.mediaDevices.getSupportedConstraints())) {
      const s = function(a, o, d) {
        o in a && !(d in a) && (a[d] = a[o], delete a[o]);
      }, r = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
      if (t.mediaDevices.getUserMedia = function(a) {
        return typeof a == "object" && typeof a.audio == "object" && (a = JSON.parse(JSON.stringify(a)), s(a.audio, "autoGainControl", "mozAutoGainControl"), s(a.audio, "noiseSuppression", "mozNoiseSuppression")), r(a);
      }, n && n.prototype.getSettings) {
        const a = n.prototype.getSettings;
        n.prototype.getSettings = function() {
          const o = a.apply(this, arguments);
          return s(o, "mozAutoGainControl", "autoGainControl"), s(o, "mozNoiseSuppression", "noiseSuppression"), o;
        };
      }
      if (n && n.prototype.applyConstraints) {
        const a = n.prototype.applyConstraints;
        n.prototype.applyConstraints = function(o) {
          return this.kind === "audio" && typeof o == "object" && (o = JSON.parse(JSON.stringify(o)), s(o, "autoGainControl", "mozAutoGainControl"), s(o, "noiseSuppression", "mozNoiseSuppression")), a.apply(this, [o]);
        };
      }
    }
  }
  function tu(i, e) {
    i.navigator.mediaDevices && "getDisplayMedia" in i.navigator.mediaDevices || i.navigator.mediaDevices && (i.navigator.mediaDevices.getDisplayMedia = function(n) {
      if (!(n && n.video)) {
        const s = new DOMException("getDisplayMedia without video constraints is undefined");
        return s.name = "NotFoundError", s.code = 8, Promise.reject(s);
      }
      return n.video === true ? n.video = {
        mediaSource: e
      } : n.video.mediaSource = e, i.navigator.mediaDevices.getUserMedia(n);
    });
  }
  function qo(i) {
    typeof i == "object" && i.RTCTrackEvent && "receiver" in i.RTCTrackEvent.prototype && !("transceiver" in i.RTCTrackEvent.prototype) && Object.defineProperty(i.RTCTrackEvent.prototype, "transceiver", {
      get() {
        return {
          receiver: this.receiver
        };
      }
    });
  }
  function cs(i, e) {
    typeof i != "object" || !(i.RTCPeerConnection || i.mozRTCPeerConnection) || (!i.RTCPeerConnection && i.mozRTCPeerConnection && (i.RTCPeerConnection = i.mozRTCPeerConnection), e.version < 53 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
      const n = i.RTCPeerConnection.prototype[t], s = {
        [t]() {
          return arguments[0] = new (t === "addIceCandidate" ? i.RTCIceCandidate : i.RTCSessionDescription)(arguments[0]), n.apply(this, arguments);
        }
      };
      i.RTCPeerConnection.prototype[t] = s[t];
    }));
  }
  function Vo(i, e) {
    if (typeof i != "object" || !(i.RTCPeerConnection || i.mozRTCPeerConnection) || e.version >= 151)
      return;
    const t = {
      inboundrtp: "inbound-rtp",
      outboundrtp: "outbound-rtp",
      candidatepair: "candidate-pair",
      localcandidate: "local-candidate",
      remotecandidate: "remote-candidate"
    }, n = i.RTCPeerConnection.prototype.getStats;
    i.RTCPeerConnection.prototype.getStats = function() {
      const [r, a, o] = arguments;
      return this.signalingState === "closed" ? Promise.resolve(/* @__PURE__ */ new Map()) : n.apply(this, [r || null]).then((d) => {
        if (e.version < 53 && !a)
          try {
            d.forEach((c) => {
              c.type = t[c.type] || c.type;
            });
          } catch (c) {
            if (c.name !== "TypeError")
              throw c;
            d.forEach((l, u) => {
              d.set(u, Object.assign({}, l, {
                type: t[l.type] || l.type
              }));
            });
          }
        return d;
      }).then(a, o);
    };
  }
  function Wo(i) {
    if (!(typeof i == "object" && i.RTCPeerConnection && i.RTCRtpSender) || i.RTCRtpSender && "getStats" in i.RTCRtpSender.prototype)
      return;
    const e = i.RTCPeerConnection.prototype.getSenders;
    e && (i.RTCPeerConnection.prototype.getSenders = function() {
      const s = e.apply(this, []);
      return s.forEach((r) => r._pc = this), s;
    });
    const t = i.RTCPeerConnection.prototype.addTrack;
    t && (i.RTCPeerConnection.prototype.addTrack = function() {
      const s = t.apply(this, arguments);
      return s._pc = this, s;
    }), i.RTCRtpSender.prototype.getStats = function() {
      return this.track ? this._pc.getStats(this.track) : Promise.resolve(/* @__PURE__ */ new Map());
    };
  }
  function Ho(i) {
    if (!(typeof i == "object" && i.RTCPeerConnection && i.RTCRtpSender) || i.RTCRtpSender && "getStats" in i.RTCRtpReceiver.prototype)
      return;
    const e = i.RTCPeerConnection.prototype.getReceivers;
    e && (i.RTCPeerConnection.prototype.getReceivers = function() {
      const n = e.apply(this, []);
      return n.forEach((s) => s._pc = this), n;
    }), At(i, "track", (t) => (t.receiver._pc = t.srcElement, t)), i.RTCRtpReceiver.prototype.getStats = function() {
      return this._pc.getStats(this.track);
    };
  }
  function Ko(i) {
    !i.RTCPeerConnection || "removeStream" in i.RTCPeerConnection.prototype || (i.RTCPeerConnection.prototype.removeStream = function(t) {
      Js("removeStream", "removeTrack"), this.getSenders().forEach((n) => {
        n.track && t.getTracks().includes(n.track) && this.removeTrack(n);
      });
    });
  }
  function Go(i) {
    i.DataChannel && !i.RTCDataChannel && (i.RTCDataChannel = i.DataChannel);
  }
  function Jo(i) {
    if (!(typeof i == "object" && i.RTCPeerConnection))
      return;
    const e = i.RTCPeerConnection.prototype.addTransceiver;
    e && (i.RTCPeerConnection.prototype.addTransceiver = function() {
      this.setParametersPromises = [];
      let n = arguments[1] && arguments[1].sendEncodings;
      n === void 0 && (n = []), n = [...n];
      const s = n.length > 0;
      s && n.forEach((a) => {
        if ("rid" in a && !/^[a-z0-9]{0,16}$/i.test(a.rid))
          throw new TypeError("Invalid RID value provided.");
        if ("scaleResolutionDownBy" in a && !(parseFloat(a.scaleResolutionDownBy) >= 1))
          throw new RangeError("scale_resolution_down_by must be >= 1.0");
        if ("maxFramerate" in a && !(parseFloat(a.maxFramerate) >= 0))
          throw new RangeError("max_framerate must be >= 0.0");
      });
      const r = e.apply(this, arguments);
      if (s) {
        const {
          sender: a
        } = r, o = a.getParameters();
        (!("encodings" in o) || // Avoid being fooled by patched getParameters() below.
        o.encodings.length === 1 && Object.keys(o.encodings[0]).length === 0) && (o.encodings = n, a.sendEncodings = n, this.setParametersPromises.push(a.setParameters(o).then(() => {
          delete a.sendEncodings;
        }).catch(() => {
          delete a.sendEncodings;
        })));
      }
      return r;
    });
  }
  function zo(i) {
    if (!(typeof i == "object" && i.RTCRtpSender))
      return;
    const e = i.RTCRtpSender.prototype.getParameters;
    e && (i.RTCRtpSender.prototype.getParameters = function() {
      const n = e.apply(this, arguments);
      return "encodings" in n || (n.encodings = [].concat(this.sendEncodings || [{}])), n;
    });
  }
  function Yo(i) {
    if (!(typeof i == "object" && i.RTCPeerConnection))
      return;
    const e = i.RTCPeerConnection.prototype.createOffer;
    i.RTCPeerConnection.prototype.createOffer = function() {
      return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => e.apply(this, arguments)).finally(() => {
        this.setParametersPromises = [];
      }) : e.apply(this, arguments);
    };
  }
  function Qo(i) {
    if (!(typeof i == "object" && i.RTCPeerConnection))
      return;
    const e = i.RTCPeerConnection.prototype.createAnswer;
    i.RTCPeerConnection.prototype.createAnswer = function() {
      return this.setParametersPromises && this.setParametersPromises.length ? Promise.all(this.setParametersPromises).then(() => e.apply(this, arguments)).finally(() => {
        this.setParametersPromises = [];
      }) : e.apply(this, arguments);
    };
  }
  var Nr = /* @__PURE__ */ Object.freeze({ __proto__: null, shimAddTransceiver: Jo, shimCreateAnswer: Qo, shimCreateOffer: Yo, shimGetDisplayMedia: tu, shimGetParameters: zo, shimGetStats: Vo, shimGetUserMedia: jo, shimOnTrack: qo, shimPeerConnection: cs, shimRTCDataChannel: Go, shimReceiverGetStats: Ho, shimRemoveStream: Ko, shimSenderGetStats: Wo });
  function Xo(i) {
    if (!(typeof i != "object" || !i.RTCPeerConnection)) {
      if ("getLocalStreams" in i.RTCPeerConnection.prototype || (i.RTCPeerConnection.prototype.getLocalStreams = function() {
        return this._localStreams || (this._localStreams = []), this._localStreams;
      }), !("addStream" in i.RTCPeerConnection.prototype)) {
        const e = i.RTCPeerConnection.prototype.addTrack;
        i.RTCPeerConnection.prototype.addStream = function(n) {
          this._localStreams || (this._localStreams = []), this._localStreams.includes(n) || this._localStreams.push(n), n.getAudioTracks().forEach((s) => e.call(this, s, n)), n.getVideoTracks().forEach((s) => e.call(this, s, n));
        }, i.RTCPeerConnection.prototype.addTrack = function(n) {
          for (var s = arguments.length, r = new Array(s > 1 ? s - 1 : 0), a = 1; a < s; a++)
            r[a - 1] = arguments[a];
          return r && r.forEach((o) => {
            this._localStreams ? this._localStreams.includes(o) || this._localStreams.push(o) : this._localStreams = [o];
          }), e.apply(this, arguments);
        };
      }
      "removeStream" in i.RTCPeerConnection.prototype || (i.RTCPeerConnection.prototype.removeStream = function(t) {
        this._localStreams || (this._localStreams = []);
        const n = this._localStreams.indexOf(t);
        if (n === -1)
          return;
        this._localStreams.splice(n, 1);
        const s = t.getTracks();
        this.getSenders().forEach((r) => {
          s.includes(r.track) && this.removeTrack(r);
        });
      });
    }
  }
  function $o(i) {
    if (!(typeof i != "object" || !i.RTCPeerConnection) && ("getRemoteStreams" in i.RTCPeerConnection.prototype || (i.RTCPeerConnection.prototype.getRemoteStreams = function() {
      return this._remoteStreams ? this._remoteStreams : [];
    }), !("onaddstream" in i.RTCPeerConnection.prototype))) {
      Object.defineProperty(i.RTCPeerConnection.prototype, "onaddstream", {
        get() {
          return this._onaddstream;
        },
        set(t) {
          this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = t), this.addEventListener("track", this._onaddstreampoly = (n) => {
            n.streams.forEach((s) => {
              if (this._remoteStreams || (this._remoteStreams = []), this._remoteStreams.includes(s))
                return;
              this._remoteStreams.push(s);
              const r = new Event("addstream");
              r.stream = s, this.dispatchEvent(r);
            });
          });
        }
      });
      const e = i.RTCPeerConnection.prototype.setRemoteDescription;
      i.RTCPeerConnection.prototype.setRemoteDescription = function() {
        const n = this;
        return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(s) {
          s.streams.forEach((r) => {
            if (n._remoteStreams || (n._remoteStreams = []), n._remoteStreams.indexOf(r) >= 0)
              return;
            n._remoteStreams.push(r);
            const a = new Event("addstream");
            a.stream = r, n.dispatchEvent(a);
          });
        }), e.apply(n, arguments);
      };
    }
  }
  function Zo(i) {
    if (typeof i != "object" || !i.RTCPeerConnection)
      return;
    const e = i.RTCPeerConnection.prototype, t = e.createOffer, n = e.createAnswer, s = e.setLocalDescription, r = e.setRemoteDescription, a = e.addIceCandidate;
    e.createOffer = function(c, l) {
      const u = arguments.length >= 2 ? arguments[2] : arguments[0], h = t.apply(this, [u]);
      return l ? (h.then(c, l), Promise.resolve()) : h;
    }, e.createAnswer = function(c, l) {
      const u = arguments.length >= 2 ? arguments[2] : arguments[0], h = n.apply(this, [u]);
      return l ? (h.then(c, l), Promise.resolve()) : h;
    };
    let o = function(d, c, l) {
      const u = s.apply(this, [d]);
      return l ? (u.then(c, l), Promise.resolve()) : u;
    };
    e.setLocalDescription = o, o = function(d, c, l) {
      const u = r.apply(this, [d]);
      return l ? (u.then(c, l), Promise.resolve()) : u;
    }, e.setRemoteDescription = o, o = function(d, c, l) {
      const u = a.apply(this, [d]);
      return l ? (u.then(c, l), Promise.resolve()) : u;
    }, e.addIceCandidate = o;
  }
  function ec(i) {
    const e = i && i.navigator;
    if (e.mediaDevices && e.mediaDevices.getUserMedia) {
      const t = e.mediaDevices, n = t.getUserMedia.bind(t);
      e.mediaDevices.getUserMedia = (s) => n(tc(s));
    }
    !e.getUserMedia && e.mediaDevices && e.mediaDevices.getUserMedia && (e.getUserMedia = (function(n, s, r) {
      e.mediaDevices.getUserMedia(n).then(s, r);
    }).bind(e));
  }
  function tc(i) {
    return i && i.video !== void 0 ? Object.assign({}, i, {
      video: Mo(i.video)
    }) : i;
  }
  function nc(i) {
    if (!i.RTCPeerConnection)
      return;
    const e = i.RTCPeerConnection;
    i.RTCPeerConnection = function(n, s) {
      if (n && n.iceServers) {
        const r = [];
        for (let a = 0; a < n.iceServers.length; a++) {
          let o = n.iceServers[a];
          o.urls === void 0 && o.url ? (Js("RTCIceServer.url", "RTCIceServer.urls"), o = JSON.parse(JSON.stringify(o)), o.urls = o.url, delete o.url, r.push(o)) : r.push(n.iceServers[a]);
        }
        n.iceServers = r;
      }
      return new e(n, s);
    }, i.RTCPeerConnection.prototype = e.prototype, "generateCertificate" in e && Object.defineProperty(i.RTCPeerConnection, "generateCertificate", {
      get() {
        return e.generateCertificate;
      }
    });
  }
  function ic(i) {
    typeof i == "object" && i.RTCTrackEvent && "receiver" in i.RTCTrackEvent.prototype && !("transceiver" in i.RTCTrackEvent.prototype) && Object.defineProperty(i.RTCTrackEvent.prototype, "transceiver", {
      get() {
        return {
          receiver: this.receiver
        };
      }
    });
  }
  function sc(i) {
    const e = i.RTCPeerConnection.prototype.createOffer;
    i.RTCPeerConnection.prototype.createOffer = function(n) {
      if (n) {
        typeof n.offerToReceiveAudio < "u" && (n.offerToReceiveAudio = !!n.offerToReceiveAudio);
        const s = this.getTransceivers().find((a) => a.receiver.track.kind === "audio");
        n.offerToReceiveAudio === false && s ? s.direction === "sendrecv" ? s.setDirection ? s.setDirection("sendonly") : s.direction = "sendonly" : s.direction === "recvonly" && (s.setDirection ? s.setDirection("inactive") : s.direction = "inactive") : n.offerToReceiveAudio === true && !s && this.addTransceiver("audio", {
          direction: "recvonly"
        }), typeof n.offerToReceiveVideo < "u" && (n.offerToReceiveVideo = !!n.offerToReceiveVideo);
        const r = this.getTransceivers().find((a) => a.receiver.track.kind === "video");
        n.offerToReceiveVideo === false && r ? r.direction === "sendrecv" ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly" : r.direction === "recvonly" && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : n.offerToReceiveVideo === true && !r && this.addTransceiver("video", {
          direction: "recvonly"
        });
      }
      return e.apply(this, arguments);
    };
  }
  function rc(i) {
    typeof i != "object" || i.AudioContext || (i.AudioContext = i.webkitAudioContext);
  }
  var Lr = /* @__PURE__ */ Object.freeze({ __proto__: null, shimAudioContext: rc, shimCallbacksAPI: Zo, shimConstraints: tc, shimCreateOfferLegacy: sc, shimGetUserMedia: ec, shimLocalStreamsAPI: Xo, shimRTCIceServerUrls: nc, shimRemoteStreamsAPI: $o, shimTrackEventTransceiver: ic }), Ai = { exports: {} }, Ur;
  function nu() {
    return Ur || (Ur = 1, (function(i) {
      const e = {};
      e.generateIdentifier = function() {
        return Math.random().toString(36).substring(2, 12);
      }, e.localCName = e.generateIdentifier(), e.splitLines = function(t) {
        return t.trim().split(`
`).map((n) => n.trim());
      }, e.splitSections = function(t) {
        return t.split(`
m=`).map((s, r) => (r > 0 ? "m=" + s : s).trim() + `\r
`);
      }, e.getDescription = function(t) {
        const n = e.splitSections(t);
        return n && n[0];
      }, e.getMediaSections = function(t) {
        const n = e.splitSections(t);
        return n.shift(), n;
      }, e.matchPrefix = function(t, n) {
        return e.splitLines(t).filter((s) => s.indexOf(n) === 0);
      }, e.parseCandidate = function(t) {
        let n;
        t.indexOf("a=candidate:") === 0 ? n = t.substring(12).split(" ") : n = t.substring(10).split(" ");
        const s = {
          foundation: n[0],
          component: {
            1: "rtp",
            2: "rtcp"
          }[n[1]] || n[1],
          protocol: n[2].toLowerCase(),
          priority: parseInt(n[3], 10),
          ip: n[4],
          address: n[4],
          // address is an alias for ip.
          port: parseInt(n[5], 10),
          // skip parts[6] == 'typ'
          type: n[7]
        };
        for (let r = 8; r < n.length; r += 2)
          switch (n[r]) {
            case "raddr":
              s.relatedAddress = n[r + 1];
              break;
            case "rport":
              s.relatedPort = parseInt(n[r + 1], 10);
              break;
            case "tcptype":
              s.tcpType = n[r + 1];
              break;
            case "ufrag":
              s.ufrag = n[r + 1], s.usernameFragment = n[r + 1];
              break;
            default:
              s[n[r]] === void 0 && (s[n[r]] = n[r + 1]);
              break;
          }
        return s;
      }, e.writeCandidate = function(t) {
        const n = [];
        n.push(t.foundation);
        const s = t.component;
        s === "rtp" ? n.push(1) : s === "rtcp" ? n.push(2) : n.push(s), n.push(t.protocol.toUpperCase()), n.push(t.priority), n.push(t.address || t.ip), n.push(t.port);
        const r = t.type;
        return n.push("typ"), n.push(r), r !== "host" && t.relatedAddress && t.relatedPort !== void 0 && (n.push("raddr"), n.push(t.relatedAddress), n.push("rport"), n.push(t.relatedPort)), t.tcpType && t.protocol.toLowerCase() === "tcp" && (n.push("tcptype"), n.push(t.tcpType)), (t.usernameFragment || t.ufrag) && (n.push("ufrag"), n.push(t.usernameFragment || t.ufrag)), "candidate:" + n.join(" ");
      }, e.parseIceOptions = function(t) {
        return t.substring(14).split(" ");
      }, e.parseRtpMap = function(t) {
        let n = t.substring(9).split(" ");
        const s = {
          payloadType: parseInt(n.shift(), 10)
          // was: id
        };
        return n = n[0].split("/"), s.name = n[0], s.clockRate = parseInt(n[1], 10), s.channels = n.length === 3 ? parseInt(n[2], 10) : 1, s.numChannels = s.channels, s;
      }, e.writeRtpMap = function(t) {
        let n = t.payloadType;
        t.preferredPayloadType !== void 0 && (n = t.preferredPayloadType);
        const s = t.channels || t.numChannels || 1;
        return "a=rtpmap:" + n + " " + t.name + "/" + t.clockRate + (s !== 1 ? "/" + s : "") + `\r
`;
      }, e.parseExtmap = function(t) {
        const n = t.substring(9).split(" ");
        return {
          id: parseInt(n[0], 10),
          direction: n[0].indexOf("/") > 0 ? n[0].split("/")[1] : "sendrecv",
          uri: n[1],
          attributes: n.slice(2).join(" ")
        };
      }, e.writeExtmap = function(t) {
        return "a=extmap:" + (t.id || t.preferredId) + (t.direction && t.direction !== "sendrecv" ? "/" + t.direction : "") + " " + t.uri + (t.attributes ? " " + t.attributes : "") + `\r
`;
      }, e.parseFmtp = function(t) {
        const n = {};
        let s;
        const r = t.substring(t.indexOf(" ") + 1).split(";");
        for (let a = 0; a < r.length; a++)
          s = r[a].trim().split("="), n[s[0].trim()] = s[1];
        return n;
      }, e.writeFmtp = function(t) {
        let n = "", s = t.payloadType;
        if (t.preferredPayloadType !== void 0 && (s = t.preferredPayloadType), t.parameters && Object.keys(t.parameters).length) {
          const r = [];
          Object.keys(t.parameters).forEach((a) => {
            t.parameters[a] !== void 0 ? r.push(a + "=" + t.parameters[a]) : r.push(a);
          }), n += "a=fmtp:" + s + " " + r.join(";") + `\r
`;
        }
        return n;
      }, e.parseRtcpFb = function(t) {
        const n = t.substring(t.indexOf(" ") + 1).split(" ");
        return {
          type: n.shift(),
          parameter: n.join(" ")
        };
      }, e.writeRtcpFb = function(t) {
        let n = "", s = t.payloadType;
        return t.preferredPayloadType !== void 0 && (s = t.preferredPayloadType), t.rtcpFeedback && t.rtcpFeedback.length && t.rtcpFeedback.forEach((r) => {
          n += "a=rtcp-fb:" + s + " " + r.type + (r.parameter && r.parameter.length ? " " + r.parameter : "") + `\r
`;
        }), n;
      }, e.parseSsrcMedia = function(t) {
        const n = t.indexOf(" "), s = {
          ssrc: parseInt(t.substring(7, n), 10)
        }, r = t.indexOf(":", n);
        return r > -1 ? (s.attribute = t.substring(n + 1, r), s.value = t.substring(r + 1)) : s.attribute = t.substring(n + 1), s;
      }, e.parseSsrcGroup = function(t) {
        const n = t.substring(13).split(" ");
        return {
          semantics: n.shift(),
          ssrcs: n.map((s) => parseInt(s, 10))
        };
      }, e.getMid = function(t) {
        const n = e.matchPrefix(t, "a=mid:")[0];
        if (n)
          return n.substring(6);
      }, e.parseFingerprint = function(t) {
        const n = t.substring(14).split(" ");
        return {
          algorithm: n[0].toLowerCase(),
          // algorithm is case-sensitive in Edge.
          value: n[1].toUpperCase()
          // the definition is upper-case in RFC 4572.
        };
      }, e.getDtlsParameters = function(t, n) {
        return {
          role: "auto",
          fingerprints: e.matchPrefix(t + n, "a=fingerprint:").map(e.parseFingerprint)
        };
      }, e.writeDtlsParameters = function(t, n) {
        let s = "a=setup:" + n + `\r
`;
        return t.fingerprints.forEach((r) => {
          s += "a=fingerprint:" + r.algorithm + " " + r.value + `\r
`;
        }), s;
      }, e.parseCryptoLine = function(t) {
        const n = t.substring(9).split(" ");
        return {
          tag: parseInt(n[0], 10),
          cryptoSuite: n[1],
          keyParams: n[2],
          sessionParams: n.slice(3)
        };
      }, e.writeCryptoLine = function(t) {
        return "a=crypto:" + t.tag + " " + t.cryptoSuite + " " + (typeof t.keyParams == "object" ? e.writeCryptoKeyParams(t.keyParams) : t.keyParams) + (t.sessionParams ? " " + t.sessionParams.join(" ") : "") + `\r
`;
      }, e.parseCryptoKeyParams = function(t) {
        if (t.indexOf("inline:") !== 0)
          return null;
        const n = t.substring(7).split("|");
        return {
          keyMethod: "inline",
          keySalt: n[0],
          lifeTime: n[1],
          mkiValue: n[2] ? n[2].split(":")[0] : void 0,
          mkiLength: n[2] ? n[2].split(":")[1] : void 0
        };
      }, e.writeCryptoKeyParams = function(t) {
        return t.keyMethod + ":" + t.keySalt + (t.lifeTime ? "|" + t.lifeTime : "") + (t.mkiValue && t.mkiLength ? "|" + t.mkiValue + ":" + t.mkiLength : "");
      }, e.getCryptoParameters = function(t, n) {
        return e.matchPrefix(t + n, "a=crypto:").map(e.parseCryptoLine);
      }, e.getIceParameters = function(t, n) {
        const s = e.matchPrefix(t + n, "a=ice-ufrag:")[0], r = e.matchPrefix(t + n, "a=ice-pwd:")[0];
        return s && r ? {
          usernameFragment: s.substring(12),
          password: r.substring(10)
        } : null;
      }, e.writeIceParameters = function(t) {
        let n = "a=ice-ufrag:" + t.usernameFragment + `\r
a=ice-pwd:` + t.password + `\r
`;
        return t.iceLite && (n += `a=ice-lite\r
`), n;
      }, e.parseRtpParameters = function(t) {
        const n = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: [],
          rtcp: []
        }, r = e.splitLines(t)[0].split(" ");
        n.profile = r[2];
        for (let o = 3; o < r.length; o++) {
          const d = r[o], c = e.matchPrefix(t, "a=rtpmap:" + d + " ")[0];
          if (c) {
            const l = e.parseRtpMap(c), u = e.matchPrefix(t, "a=fmtp:" + d + " ");
            switch (l.parameters = u.length ? e.parseFmtp(u[0]) : {}, l.rtcpFeedback = e.matchPrefix(t, "a=rtcp-fb:" + d + " ").map(e.parseRtcpFb), n.codecs.push(l), l.name.toUpperCase()) {
              case "RED":
              case "ULPFEC":
                n.fecMechanisms.push(l.name.toUpperCase());
                break;
            }
          }
        }
        e.matchPrefix(t, "a=extmap:").forEach((o) => {
          n.headerExtensions.push(e.parseExtmap(o));
        });
        const a = e.matchPrefix(t, "a=rtcp-fb:* ").map(e.parseRtcpFb);
        return n.codecs.forEach((o) => {
          a.forEach((d) => {
            o.rtcpFeedback.find((l) => l.type === d.type && l.parameter === d.parameter) || o.rtcpFeedback.push(d);
          });
        }), n;
      }, e.writeRtpDescription = function(t, n) {
        let s = "";
        s += "m=" + t + " ", s += n.codecs.length > 0 ? "9" : "0", s += " " + (n.profile || "UDP/TLS/RTP/SAVPF") + " ", s += n.codecs.map((a) => a.preferredPayloadType !== void 0 ? a.preferredPayloadType : a.payloadType).join(" ") + `\r
`, s += `c=IN IP4 0.0.0.0\r
`, s += `a=rtcp:9 IN IP4 0.0.0.0\r
`, n.codecs.forEach((a) => {
          s += e.writeRtpMap(a), s += e.writeFmtp(a), s += e.writeRtcpFb(a);
        });
        let r = 0;
        return n.codecs.forEach((a) => {
          a.maxptime > r && (r = a.maxptime);
        }), r > 0 && (s += "a=maxptime:" + r + `\r
`), n.headerExtensions && n.headerExtensions.forEach((a) => {
          s += e.writeExtmap(a);
        }), s;
      }, e.parseRtpEncodingParameters = function(t) {
        const n = [], s = e.parseRtpParameters(t), r = s.fecMechanisms.indexOf("RED") !== -1, a = s.fecMechanisms.indexOf("ULPFEC") !== -1, o = e.matchPrefix(t, "a=ssrc:").map((h) => e.parseSsrcMedia(h)).filter((h) => h.attribute === "cname"), d = o.length > 0 && o[0].ssrc;
        let c;
        const l = e.matchPrefix(t, "a=ssrc-group:FID").map((h) => h.substring(17).split(" ").map((v) => parseInt(v, 10)));
        l.length > 0 && l[0].length > 1 && l[0][0] === d && (c = l[0][1]), s.codecs.forEach((h) => {
          if (h.name.toUpperCase() === "RTX" && h.parameters.apt) {
            let f = {
              ssrc: d,
              codecPayloadType: parseInt(h.parameters.apt, 10)
            };
            d && c && (f.rtx = {
              ssrc: c
            }), n.push(f), r && (f = JSON.parse(JSON.stringify(f)), f.fec = {
              ssrc: d,
              mechanism: a ? "red+ulpfec" : "red"
            }, n.push(f));
          }
        }), n.length === 0 && d && n.push({
          ssrc: d
        });
        let u = e.matchPrefix(t, "b=");
        return u.length && (u[0].indexOf("b=TIAS:") === 0 ? u = parseInt(u[0].substring(7), 10) : u[0].indexOf("b=AS:") === 0 ? u = parseInt(u[0].substring(5), 10) * 1e3 * 0.95 - 2e3 * 8 : u = void 0, n.forEach((h) => {
          h.maxBitrate = u;
        })), n;
      }, e.parseRtcpParameters = function(t) {
        const n = {}, s = e.matchPrefix(t, "a=ssrc:").map((o) => e.parseSsrcMedia(o)).filter((o) => o.attribute === "cname")[0];
        s && (n.cname = s.value, n.ssrc = s.ssrc);
        const r = e.matchPrefix(t, "a=rtcp-rsize");
        n.reducedSize = r.length > 0, n.compound = r.length === 0;
        const a = e.matchPrefix(t, "a=rtcp-mux");
        return n.mux = a.length > 0, n;
      }, e.writeRtcpParameters = function(t) {
        let n = "";
        return t.reducedSize && (n += `a=rtcp-rsize\r
`), t.mux && (n += `a=rtcp-mux\r
`), t.ssrc !== void 0 && t.cname && (n += "a=ssrc:" + t.ssrc + " cname:" + t.cname + `\r
`), n;
      }, e.parseMsid = function(t) {
        let n;
        const s = e.matchPrefix(t, "a=msid:");
        if (s.length === 1)
          return n = s[0].substring(7).split(" "), {
            stream: n[0],
            track: n[1]
          };
        const r = e.matchPrefix(t, "a=ssrc:").map((a) => e.parseSsrcMedia(a)).filter((a) => a.attribute === "msid");
        if (r.length > 0)
          return n = r[0].value.split(" "), {
            stream: n[0],
            track: n[1]
          };
      }, e.parseSctpDescription = function(t) {
        const n = e.parseMLine(t), s = e.matchPrefix(t, "a=max-message-size:");
        let r;
        s.length > 0 && (r = parseInt(s[0].substring(19), 10)), isNaN(r) && (r = 65536);
        const a = e.matchPrefix(t, "a=sctp-port:");
        if (a.length > 0)
          return {
            port: parseInt(a[0].substring(12), 10),
            protocol: n.fmt,
            maxMessageSize: r
          };
        const o = e.matchPrefix(t, "a=sctpmap:");
        if (o.length > 0) {
          const d = o[0].substring(10).split(" ");
          return {
            port: parseInt(d[0], 10),
            protocol: d[1],
            maxMessageSize: r
          };
        }
      }, e.writeSctpDescription = function(t, n) {
        let s = [];
        return t.protocol !== "DTLS/SCTP" ? s = ["m=" + t.kind + " 9 " + t.protocol + " " + n.protocol + `\r
`, `c=IN IP4 0.0.0.0\r
`, "a=sctp-port:" + n.port + `\r
`] : s = ["m=" + t.kind + " 9 " + t.protocol + " " + n.port + `\r
`, `c=IN IP4 0.0.0.0\r
`, "a=sctpmap:" + n.port + " " + n.protocol + ` 65535\r
`], n.maxMessageSize !== void 0 && s.push("a=max-message-size:" + n.maxMessageSize + `\r
`), s.join("");
      }, e.generateSessionId = function() {
        return Math.random().toString().substr(2, 22);
      }, e.writeSessionBoilerplate = function(t, n, s) {
        let r;
        const a = n !== void 0 ? n : 2;
        return t ? r = t : r = e.generateSessionId(), `v=0\r
o=` + (s || "thisisadapterortc") + " " + r + " " + a + ` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`;
      }, e.getDirection = function(t, n) {
        const s = e.splitLines(t);
        for (let r = 0; r < s.length; r++)
          switch (s[r]) {
            case "a=sendrecv":
            case "a=sendonly":
            case "a=recvonly":
            case "a=inactive":
              return s[r].substring(2);
          }
        return n ? e.getDirection(n) : "sendrecv";
      }, e.getKind = function(t) {
        return e.splitLines(t)[0].split(" ")[0].substring(2);
      }, e.isRejected = function(t) {
        return t.split(" ", 2)[1] === "0";
      }, e.parseMLine = function(t) {
        const s = e.splitLines(t)[0].substring(2).split(" ");
        return {
          kind: s[0],
          port: parseInt(s[1], 10),
          protocol: s[2],
          fmt: s.slice(3).join(" ")
        };
      }, e.parseOLine = function(t) {
        const s = e.matchPrefix(t, "o=")[0].substring(2).split(" ");
        return {
          username: s[0],
          sessionId: s[1],
          sessionVersion: parseInt(s[2], 10),
          netType: s[3],
          addressType: s[4],
          address: s[5]
        };
      }, e.isValidSDP = function(t) {
        if (typeof t != "string" || t.length === 0)
          return false;
        const n = e.splitLines(t);
        for (let s = 0; s < n.length; s++)
          if (n[s].length < 2 || n[s].charAt(1) !== "=")
            return false;
        return true;
      }, i.exports = e;
    })(Ai)), Ai.exports;
  }
  var ac = nu(), jt = /* @__PURE__ */ Wl(ac), iu = /* @__PURE__ */ Hc({ __proto__: null, default: jt }, [ac]);
  function Ln(i) {
    if (!i.RTCIceCandidate || i.RTCIceCandidate && "foundation" in i.RTCIceCandidate.prototype)
      return;
    const e = i.RTCIceCandidate;
    i.RTCIceCandidate = function(n) {
      if (typeof n == "object" && n.candidate && n.candidate.indexOf("a=") === 0 && (n = JSON.parse(JSON.stringify(n)), n.candidate = n.candidate.substring(2)), n.candidate && n.candidate.length) {
        const s = new e(n), r = jt.parseCandidate(n.candidate);
        for (const a in r)
          a in s || Object.defineProperty(s, a, {
            value: r[a]
          });
        return s.toJSON = function() {
          return {
            candidate: s.candidate,
            sdpMid: s.sdpMid,
            sdpMLineIndex: s.sdpMLineIndex,
            usernameFragment: s.usernameFragment
          };
        }, s;
      }
      return new e(n);
    }, i.RTCIceCandidate.prototype = e.prototype, At(i, "icecandidate", (t) => (t.candidate && Object.defineProperty(t, "candidate", {
      value: new i.RTCIceCandidate(t.candidate),
      writable: "false"
    }), t));
  }
  function ds(i) {
    !i.RTCIceCandidate || i.RTCIceCandidate && "relayProtocol" in i.RTCIceCandidate.prototype || At(i, "icecandidate", (e) => {
      if (e.candidate) {
        const t = jt.parseCandidate(e.candidate.candidate);
        t.type === "relay" && (e.candidate.relayProtocol = {
          0: "tls",
          1: "tcp",
          2: "udp"
        }[t.priority >> 24]);
      }
      return e;
    });
  }
  function Un(i, e) {
    if (!i.RTCPeerConnection)
      return;
    "sctp" in i.RTCPeerConnection.prototype || Object.defineProperty(i.RTCPeerConnection.prototype, "sctp", {
      get() {
        return typeof this._sctp > "u" ? null : this._sctp;
      }
    });
    const t = function(o) {
      if (!o || !o.sdp)
        return false;
      const d = jt.splitSections(o.sdp);
      return d.shift(), d.some((c) => {
        const l = jt.parseMLine(c);
        return l && l.kind === "application" && l.protocol.indexOf("SCTP") !== -1;
      });
    }, n = function(o) {
      const d = o.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
      if (d === null || d.length < 2)
        return -1;
      const c = parseInt(d[1], 10);
      return c !== c ? -1 : c;
    }, s = function(o) {
      let d = 65536;
      return e.browser === "firefox" && (e.version < 57 ? o === -1 ? d = 16384 : d = 2147483637 : e.version < 60 ? d = e.version === 57 ? 65535 : 65536 : d = 2147483637), d;
    }, r = function(o, d) {
      let c = 65536;
      e.browser === "firefox" && e.version === 57 && (c = 65535);
      const l = jt.matchPrefix(o.sdp, "a=max-message-size:");
      return l.length > 0 ? c = parseInt(l[0].substring(19), 10) : e.browser === "firefox" && d !== -1 && (c = 2147483637), c;
    }, a = i.RTCPeerConnection.prototype.setRemoteDescription;
    i.RTCPeerConnection.prototype.setRemoteDescription = function() {
      if (this._sctp = null, e.browser === "chrome" && e.version >= 76) {
        const {
          sdpSemantics: d
        } = this.getConfiguration();
        d === "plan-b" && Object.defineProperty(this, "sctp", {
          get() {
            return typeof this._sctp > "u" ? null : this._sctp;
          },
          enumerable: true,
          configurable: true
        });
      }
      if (t(arguments[0])) {
        const d = n(arguments[0]), c = s(d), l = r(arguments[0], d);
        let u;
        c === 0 && l === 0 ? u = Number.POSITIVE_INFINITY : c === 0 || l === 0 ? u = Math.max(c, l) : u = Math.min(c, l);
        const h = {};
        Object.defineProperty(h, "maxMessageSize", {
          get() {
            return u;
          }
        }), this._sctp = h;
      }
      return a.apply(this, arguments);
    };
  }
  function Fn(i, e) {
    if (!(i.RTCPeerConnection && "createDataChannel" in i.RTCPeerConnection.prototype) || e.browser === "chrome" && e.version > 149 || e.browser === "firefox" && e.version > 60)
      return;
    function t(s, r) {
      const a = s.send;
      s.send = function() {
        const d = arguments[0], c = d.length || d.size || d.byteLength;
        if (s.readyState === "open" && r.sctp && c > r.sctp.maxMessageSize)
          throw new TypeError("Message too large (can send a maximum of " + r.sctp.maxMessageSize + " bytes)");
        return a.apply(s, arguments);
      };
    }
    const n = i.RTCPeerConnection.prototype.createDataChannel;
    i.RTCPeerConnection.prototype.createDataChannel = function() {
      const r = n.apply(this, arguments);
      return t(r, this), r;
    }, At(i, "datachannel", (s) => (t(s.channel, s.target), s));
  }
  function ls(i) {
    if (!i.RTCPeerConnection || "connectionState" in i.RTCPeerConnection.prototype)
      return;
    const e = i.RTCPeerConnection.prototype;
    Object.defineProperty(e, "connectionState", {
      get() {
        return {
          completed: "connected",
          checking: "connecting"
        }[this.iceConnectionState] || this.iceConnectionState;
      },
      enumerable: true,
      configurable: true
    }), Object.defineProperty(e, "onconnectionstatechange", {
      get() {
        return this._onconnectionstatechange || null;
      },
      set(t) {
        this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), t && this.addEventListener("connectionstatechange", this._onconnectionstatechange = t);
      },
      enumerable: true,
      configurable: true
    }), ["setLocalDescription", "setRemoteDescription"].forEach((t) => {
      const n = e[t];
      e[t] = function() {
        return this._connectionstatechangepoly || (this._connectionstatechangepoly = (s) => {
          const r = s.target;
          if (r._lastConnectionState !== r.connectionState) {
            r._lastConnectionState = r.connectionState;
            const a = new Event("connectionstatechange", s);
            r.dispatchEvent(a);
          }
          return s;
        }, this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this, arguments);
      };
    });
  }
  function us(i, e) {
    if (!i.RTCPeerConnection || e.browser === "chrome" && e.version >= 71 || e.browser === "safari" && e._safariVersion >= 13.1)
      return;
    const t = i.RTCPeerConnection.prototype.setRemoteDescription;
    i.RTCPeerConnection.prototype.setRemoteDescription = function(s) {
      if (s && s.sdp && s.sdp.indexOf(`
a=extmap-allow-mixed`) !== -1) {
        const r = s.sdp.split(`
`).filter((a) => a.trim() !== "a=extmap-allow-mixed").join(`
`);
        i.RTCSessionDescription && s instanceof i.RTCSessionDescription ? arguments[0] = new i.RTCSessionDescription({
          type: s.type,
          sdp: r
        }) : s.sdp = r;
      }
      return t.apply(this, arguments);
    };
  }
  function Bn(i, e) {
    if (!(i.RTCPeerConnection && i.RTCPeerConnection.prototype))
      return;
    const t = i.RTCPeerConnection.prototype.addIceCandidate;
    !t || t.length === 0 || (i.RTCPeerConnection.prototype.addIceCandidate = function() {
      return arguments[0] ? (e.browser === "chrome" && e.version < 78 || e.browser === "firefox" && e.version < 68 || e.browser === "safari") && arguments[0] && arguments[0].candidate === "" ? Promise.resolve() : t.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
    });
  }
  function jn(i, e) {
    if (!(i.RTCPeerConnection && i.RTCPeerConnection.prototype))
      return;
    const t = i.RTCPeerConnection.prototype.setLocalDescription;
    !t || t.length === 0 || (i.RTCPeerConnection.prototype.setLocalDescription = function() {
      let s = arguments[0] || {};
      if (typeof s != "object" || s.type && s.sdp)
        return t.apply(this, arguments);
      if (s = {
        type: s.type,
        sdp: s.sdp
      }, !s.type)
        switch (this.signalingState) {
          case "stable":
          case "have-local-offer":
          case "have-remote-pranswer":
            s.type = "offer";
            break;
          default:
            s.type = "answer";
            break;
        }
      return s.sdp || s.type !== "offer" && s.type !== "answer" ? t.apply(this, [s]) : (s.type === "offer" ? this.createOffer : this.createAnswer).apply(this).then((a) => t.apply(this, [a]));
    });
  }
  var su = /* @__PURE__ */ Object.freeze({ __proto__: null, removeExtmapAllowMixed: us, shimAddIceCandidateNullOrEmpty: Bn, shimConnectionState: ls, shimMaxMessageSize: Un, shimParameterlessSetLocalDescription: jn, shimRTCIceCandidate: Ln, shimRTCIceCandidateRelayProtocol: ds, shimSendThrowTypeError: Fn });
  function ru() {
    let {
      window: i
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      shimChrome: true,
      shimFirefox: true,
      shimSafari: true
    };
    const t = Gs, n = eu(i), s = {
      browserDetails: n,
      commonShim: su,
      extractVersion: sn,
      disableLog: $l,
      disableWarnings: Zl,
      // Expose sdp as a convenience. For production apps include directly.
      sdp: iu
    };
    switch (n.browser) {
      case "chrome":
        if (!xr || !os || !e.shimChrome)
          return t("Chrome shim is not included in this adapter release."), s;
        if (n.version === null)
          return t("Chrome shim can not determine version, not shimming."), s;
        t("adapter.js shimming chrome."), s.browserShim = xr, Bn(i, n), jn(i), Do(i, n), Ao(i), os(i, n), xo(i, n), Fo(i, n), No(i), Lo(i, n), Bo(i, n), Ln(i), ds(i), ls(i), Un(i, n), Fn(i, n), us(i, n);
        break;
      case "firefox":
        if (!Nr || !cs || !e.shimFirefox)
          return t("Firefox shim is not included in this adapter release."), s;
        t("adapter.js shimming firefox."), s.browserShim = Nr, Bn(i, n), jn(i), jo(i, n), cs(i, n), Vo(i, n), qo(i), Ko(i), Wo(i), Ho(i), Go(i), Jo(i), zo(i), Yo(i), Qo(i), Ln(i), ls(i), Un(i, n), Fn(i, n);
        break;
      case "safari":
        if (!Lr || !e.shimSafari)
          return t("Safari shim is not included in this adapter release."), s;
        t("adapter.js shimming safari."), s.browserShim = Lr, Bn(i, n), jn(i), nc(i), sc(i), Zo(i), Xo(i), $o(i), ic(i), ec(i), rc(i), Ln(i), ds(i), Un(i, n), Fn(i, n), us(i, n);
        break;
      default:
        t("Unsupported browser!");
        break;
    }
    return s;
  }
  ru({
    window: typeof window > "u" ? void 0 : window
  });
  var hs, oc;
  class ue extends (oc = Promise) {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(e) {
      super(e);
    }
    catch(e) {
      return super.catch(e);
    }
    static reject(e) {
      return super.reject(e);
    }
    static all(e) {
      return super.all(e);
    }
    static race(e) {
      return super.race(e);
    }
  }
  hs = ue;
  ue.resolve = (i) => Reflect.get(oc, "resolve", hs).call(hs, i);
  const au = /version\/(\d+(\.?_?\d+)+)/i;
  let xi;
  function Ce(i) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (typeof i > "u" && typeof navigator > "u")
      return;
    const t = (i ?? navigator.userAgent).toLowerCase();
    if (xi === void 0 || e) {
      const n = ou.find((s) => {
        let {
          test: r
        } = s;
        return r.test(t);
      });
      xi = n == null ? void 0 : n.describe(t);
    }
    return xi;
  }
  const ou = [
    {
      test: /firefox|iceweasel|fxios/i,
      describe(i) {
        return {
          name: "Firefox",
          version: qn(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, i),
          os: i.toLowerCase().includes("fxios") ? "iOS" : void 0,
          osVersion: Ni(i)
        };
      }
    },
    {
      test: /chrom|crios|crmo/i,
      describe(i) {
        return {
          name: "Chrome",
          version: qn(/(?:chrome|chromium|crios|crmo)\/(\d+(\.?_?\d+)+)/i, i),
          os: i.toLowerCase().includes("crios") ? "iOS" : void 0,
          osVersion: Ni(i)
        };
      }
    },
    /* Safari */
    {
      test: /safari|applewebkit/i,
      describe(i) {
        return {
          name: "Safari",
          version: qn(au, i),
          os: i.includes("mobile/") ? "iOS" : "macOS",
          osVersion: Ni(i)
        };
      }
    }
  ];
  function qn(i, e) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    const n = e.match(i);
    return n && n.length >= t && n[t] || "";
  }
  function Ni(i) {
    return i.includes("mac os") ? qn(/\(.+?(\d+_\d+(:?_\d+)?)/, i, 1).replace(/_/g, ".") : void 0;
  }
  var cu = "2.18.4";
  const du = cu, lu = 16;
  class We extends Error {
    constructor(e, t, n) {
      super(t || "an error has occurred"), this.name = "LiveKitError", this.code = e, typeof (n == null ? void 0 : n.cause) < "u" && (this.cause = n == null ? void 0 : n.cause);
    }
  }
  class Oe extends We {
  }
  class vm extends We {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "Simulated failure";
      super(-1, e), this.name = "simulated";
    }
  }
  var G;
  (function(i) {
    i[i.NotAllowed = 0] = "NotAllowed", i[i.ServerUnreachable = 1] = "ServerUnreachable", i[i.InternalError = 2] = "InternalError", i[i.Cancelled = 3] = "Cancelled", i[i.LeaveRequest = 4] = "LeaveRequest", i[i.Timeout = 5] = "Timeout", i[i.WebSocket = 6] = "WebSocket", i[i.ServiceNotFound = 7] = "ServiceNotFound";
  })(G || (G = {}));
  class L extends Oe {
    constructor(e, t, n, s) {
      super(1, e), this.name = "ConnectionError", this.status = n, this.reason = t, this.context = s, this.reasonName = G[t];
    }
    static notAllowed(e, t, n) {
      return new L(e, G.NotAllowed, t, n);
    }
    static timeout(e) {
      return new L(e, G.Timeout);
    }
    static leaveRequest(e, t) {
      return new L(e, G.LeaveRequest, void 0, t);
    }
    static internal(e, t) {
      return new L(e, G.InternalError, void 0, t);
    }
    static cancelled(e) {
      return new L(e, G.Cancelled);
    }
    static serverUnreachable(e, t) {
      return new L(e, G.ServerUnreachable, t);
    }
    static websocket(e, t, n) {
      return new L(e, G.WebSocket, t, n);
    }
    static serviceNotFound(e, t) {
      return new L(e, G.ServiceNotFound, void 0, t);
    }
  }
  class mi extends We {
    constructor(e) {
      super(21, e ?? "device is unsupported"), this.name = "DeviceUnsupportedError";
    }
  }
  class Je extends We {
    constructor(e) {
      super(20, e ?? "track is invalid"), this.name = "TrackInvalidError";
    }
  }
  class uu extends We {
    constructor(e) {
      super(10, e ?? "unsupported server"), this.name = "UnsupportedServer";
    }
  }
  class Q extends We {
    constructor(e) {
      super(12, e ?? "unexpected connection state"), this.name = "UnexpectedConnectionState";
    }
  }
  class wt extends We {
    constructor(e) {
      super(13, e ?? "unable to negotiate"), this.name = "NegotiationError";
    }
  }
  class bm extends We {
    constructor(e) {
      super(14, e ?? "unable to publish data"), this.name = "PublishDataError";
    }
  }
  class Fr extends We {
    constructor(e, t) {
      super(15, e), this.name = "PublishTrackError", this.status = t;
    }
  }
  class Br extends Oe {
    constructor(e, t) {
      super(15, e), this.name = "SignalRequestError", this.reason = t, this.reasonName = typeof t == "string" ? t : yt[t];
    }
  }
  var pe;
  (function(i) {
    i[i.AlreadyOpened = 0] = "AlreadyOpened", i[i.AbnormalEnd = 1] = "AbnormalEnd", i[i.DecodeFailed = 2] = "DecodeFailed", i[i.LengthExceeded = 3] = "LengthExceeded", i[i.Incomplete = 4] = "Incomplete", i[i.HandlerAlreadyRegistered = 7] = "HandlerAlreadyRegistered", i[i.EncryptionTypeMismatch = 8] = "EncryptionTypeMismatch";
  })(pe || (pe = {}));
  class Re extends Oe {
    constructor(e, t) {
      super(16, e), this.name = "DataStreamError", this.reason = t, this.reasonName = pe[t];
    }
  }
  class Nt extends We {
    constructor(e) {
      super(18, e), this.name = "SignalReconnectError";
    }
  }
  var Xn;
  (function(i) {
    i.PermissionDenied = "PermissionDenied", i.NotFound = "NotFound", i.DeviceInUse = "DeviceInUse", i.Other = "Other";
  })(Xn || (Xn = {}));
  (function(i) {
    function e(t) {
      if (t && "name" in t)
        return t.name === "NotFoundError" || t.name === "DevicesNotFoundError" ? i.NotFound : t.name === "NotAllowedError" || t.name === "PermissionDeniedError" ? i.PermissionDenied : t.name === "NotReadableError" || t.name === "TrackStartError" ? i.DeviceInUse : i.Other;
    }
    i.getFailure = e;
  })(Xn || (Xn = {}));
  class se {
  }
  se.setTimeout = function() {
    return setTimeout(...arguments);
  };
  se.setInterval = // eslint-disable-next-line @typescript-eslint/no-implied-eval
  function() {
    return setInterval(...arguments);
  };
  se.clearTimeout = function() {
    return clearTimeout(...arguments);
  };
  se.clearInterval = function() {
    return clearInterval(...arguments);
  };
  var P;
  (function(i) {
    i.Connected = "connected", i.Reconnecting = "reconnecting", i.SignalReconnecting = "signalReconnecting", i.Reconnected = "reconnected", i.Disconnected = "disconnected", i.ConnectionStateChanged = "connectionStateChanged", i.Moved = "moved", i.MediaDevicesChanged = "mediaDevicesChanged", i.ParticipantConnected = "participantConnected", i.ParticipantDisconnected = "participantDisconnected", i.TrackPublished = "trackPublished", i.TrackSubscribed = "trackSubscribed", i.TrackSubscriptionFailed = "trackSubscriptionFailed", i.TrackUnpublished = "trackUnpublished", i.TrackUnsubscribed = "trackUnsubscribed", i.TrackMuted = "trackMuted", i.TrackUnmuted = "trackUnmuted", i.LocalTrackPublished = "localTrackPublished", i.LocalTrackUnpublished = "localTrackUnpublished", i.LocalAudioSilenceDetected = "localAudioSilenceDetected", i.ActiveSpeakersChanged = "activeSpeakersChanged", i.ParticipantMetadataChanged = "participantMetadataChanged", i.ParticipantNameChanged = "participantNameChanged", i.ParticipantAttributesChanged = "participantAttributesChanged", i.ParticipantActive = "participantActive", i.RoomMetadataChanged = "roomMetadataChanged", i.DataReceived = "dataReceived", i.SipDTMFReceived = "sipDTMFReceived", i.TranscriptionReceived = "transcriptionReceived", i.ConnectionQualityChanged = "connectionQualityChanged", i.TrackStreamStateChanged = "trackStreamStateChanged", i.TrackSubscriptionPermissionChanged = "trackSubscriptionPermissionChanged", i.TrackSubscriptionStatusChanged = "trackSubscriptionStatusChanged", i.AudioPlaybackStatusChanged = "audioPlaybackChanged", i.VideoPlaybackStatusChanged = "videoPlaybackChanged", i.MediaDevicesError = "mediaDevicesError", i.ParticipantPermissionsChanged = "participantPermissionsChanged", i.SignalConnected = "signalConnected", i.RecordingStatusChanged = "recordingStatusChanged", i.ParticipantEncryptionStatusChanged = "participantEncryptionStatusChanged", i.EncryptionError = "encryptionError", i.DCBufferStatusChanged = "dcBufferStatusChanged", i.ActiveDeviceChanged = "activeDeviceChanged", i.ChatMessage = "chatMessage", i.LocalTrackSubscribed = "localTrackSubscribed", i.MetricsReceived = "metricsReceived", i.DataTrackPublished = "dataTrackPublished", i.DataTrackUnpublished = "dataTrackUnpublished", i.LocalDataTrackPublished = "localDataTrackPublished", i.LocalDataTrackUnpublished = "localDataTrackUnpublished";
  })(P || (P = {}));
  var I;
  (function(i) {
    i.TrackPublished = "trackPublished", i.TrackSubscribed = "trackSubscribed", i.TrackSubscriptionFailed = "trackSubscriptionFailed", i.TrackUnpublished = "trackUnpublished", i.TrackUnsubscribed = "trackUnsubscribed", i.TrackMuted = "trackMuted", i.TrackUnmuted = "trackUnmuted", i.LocalTrackPublished = "localTrackPublished", i.LocalTrackUnpublished = "localTrackUnpublished", i.LocalTrackCpuConstrained = "localTrackCpuConstrained", i.LocalSenderCreated = "localSenderCreated", i.ParticipantMetadataChanged = "participantMetadataChanged", i.ParticipantNameChanged = "participantNameChanged", i.DataReceived = "dataReceived", i.SipDTMFReceived = "sipDTMFReceived", i.TranscriptionReceived = "transcriptionReceived", i.IsSpeakingChanged = "isSpeakingChanged", i.ConnectionQualityChanged = "connectionQualityChanged", i.TrackStreamStateChanged = "trackStreamStateChanged", i.TrackSubscriptionPermissionChanged = "trackSubscriptionPermissionChanged", i.TrackSubscriptionStatusChanged = "trackSubscriptionStatusChanged", i.TrackCpuConstrained = "trackCpuConstrained", i.MediaDevicesError = "mediaDevicesError", i.AudioStreamAcquired = "audioStreamAcquired", i.ParticipantPermissionsChanged = "participantPermissionsChanged", i.PCTrackAdded = "pcTrackAdded", i.AttributesChanged = "attributesChanged", i.LocalTrackSubscribed = "localTrackSubscribed", i.ChatMessage = "chatMessage", i.Active = "active";
  })(I || (I = {}));
  var _;
  (function(i) {
    i.TransportsCreated = "transportsCreated", i.Connected = "connected", i.Disconnected = "disconnected", i.Resuming = "resuming", i.Resumed = "resumed", i.Restarting = "restarting", i.Restarted = "restarted", i.SignalResumed = "signalResumed", i.SignalRestarted = "signalRestarted", i.Closing = "closing", i.MediaTrackAdded = "mediaTrackAdded", i.ActiveSpeakersUpdate = "activeSpeakersUpdate", i.DataPacketReceived = "dataPacketReceived", i.RTPVideoMapUpdate = "rtpVideoMapUpdate", i.DCBufferStatusChanged = "dcBufferStatusChanged", i.ParticipantUpdate = "participantUpdate", i.RoomUpdate = "roomUpdate", i.SpeakersChanged = "speakersChanged", i.StreamStateChanged = "streamStateChanged", i.ConnectionQualityUpdate = "connectionQualityUpdate", i.SubscriptionError = "subscriptionError", i.SubscriptionPermissionUpdate = "subscriptionPermissionUpdate", i.RemoteMute = "remoteMute", i.SubscribedQualityUpdate = "subscribedQualityUpdate", i.LocalTrackUnpublished = "localTrackUnpublished", i.LocalTrackSubscribed = "localTrackSubscribed", i.Offline = "offline", i.SignalRequestResponse = "signalRequestResponse", i.SignalConnected = "signalConnected", i.RoomMoved = "roomMoved", i.PublishDataTrackResponse = "publishDataTrackResponse", i.UnPublishDataTrackResponse = "unPublishDataTrackResponse", i.DataTrackSubscriberHandles = "dataTrackSubscriberHandles", i.DataTrackPacketReceived = "dataTrackPacketReceived", i.Joined = "joined";
  })(_ || (_ = {}));
  var R;
  (function(i) {
    i.Message = "message", i.Muted = "muted", i.Unmuted = "unmuted", i.Restarted = "restarted", i.Ended = "ended", i.Subscribed = "subscribed", i.Unsubscribed = "unsubscribed", i.CpuConstrained = "cpuConstrained", i.UpdateSettings = "updateSettings", i.UpdateSubscription = "updateSubscription", i.AudioPlaybackStarted = "audioPlaybackStarted", i.AudioPlaybackFailed = "audioPlaybackFailed", i.AudioSilenceDetected = "audioSilenceDetected", i.VisibilityChanged = "visibilityChanged", i.VideoDimensionsChanged = "videoDimensionsChanged", i.VideoPlaybackStarted = "videoPlaybackStarted", i.VideoPlaybackFailed = "videoPlaybackFailed", i.ElementAttached = "elementAttached", i.ElementDetached = "elementDetached", i.UpstreamPaused = "upstreamPaused", i.UpstreamResumed = "upstreamResumed", i.SubscriptionPermissionChanged = "subscriptionPermissionChanged", i.SubscriptionStatusChanged = "subscriptionStatusChanged", i.SubscriptionFailed = "subscriptionFailed", i.TrackProcessorUpdate = "trackProcessorUpdate", i.AudioTrackFeatureUpdate = "audioTrackFeatureUpdate", i.TranscriptionReceived = "transcriptionReceived", i.TimeSyncUpdate = "timeSyncUpdate", i.PreConnectBufferFlushed = "preConnectBufferFlushed";
  })(R || (R = {}));
  function hu(i) {
    return typeof i > "u" ? i : typeof structuredClone == "function" ? typeof i == "object" && i !== null ? structuredClone(Object.assign({}, i)) : structuredClone(i) : JSON.parse(JSON.stringify(i));
  }
  class H {
    constructor(e, t, n, s, r) {
      if (typeof e == "object")
        this.width = e.width, this.height = e.height, this.aspectRatio = e.aspectRatio, this.encoding = {
          maxBitrate: e.maxBitrate,
          maxFramerate: e.maxFramerate,
          priority: e.priority
        };
      else if (t !== void 0 && n !== void 0)
        this.width = e, this.height = t, this.aspectRatio = e / t, this.encoding = {
          maxBitrate: n,
          maxFramerate: s,
          priority: r
        };
      else
        throw new TypeError("Unsupported options: provide at least width, height and maxBitrate");
    }
    get resolution() {
      return {
        width: this.width,
        height: this.height,
        frameRate: this.encoding.maxFramerate,
        aspectRatio: this.aspectRatio
      };
    }
  }
  const fu = ["opus", "red"], mu = ["vp8", "h264"], pu = ["vp8", "h264", "vp9", "av1", "h265"];
  function gu(i) {
    return !!mu.find((e) => e === i);
  }
  const vu = gu;
  var jr;
  (function(i) {
    i[i.PREFER_REGRESSION = 0] = "PREFER_REGRESSION", i[i.SIMULCAST = 1] = "SIMULCAST", i[i.REGRESSION = 2] = "REGRESSION";
  })(jr || (jr = {}));
  var fs;
  (function(i) {
    i.telephone = {
      maxBitrate: 12e3
    }, i.speech = {
      maxBitrate: 24e3
    }, i.music = {
      maxBitrate: 48e3
    }, i.musicStereo = {
      maxBitrate: 64e3
    }, i.musicHighQuality = {
      maxBitrate: 96e3
    }, i.musicHighQualityStereo = {
      maxBitrate: 128e3
    };
  })(fs || (fs = {}));
  const gn = {
    h90: new H(160, 90, 9e4, 20),
    h180: new H(320, 180, 16e4, 20),
    h216: new H(384, 216, 18e4, 20),
    h360: new H(640, 360, 45e4, 20),
    h540: new H(960, 540, 8e5, 25),
    h720: new H(1280, 720, 17e5, 30),
    h1080: new H(1920, 1080, 3e6, 30),
    h1440: new H(2560, 1440, 5e6, 30),
    h2160: new H(3840, 2160, 8e6, 30)
  }, ms = {
    h120: new H(160, 120, 7e4, 20),
    h180: new H(240, 180, 125e3, 20),
    h240: new H(320, 240, 14e4, 20),
    h360: new H(480, 360, 33e4, 20),
    h480: new H(640, 480, 5e5, 20),
    h540: new H(720, 540, 6e5, 25),
    h720: new H(960, 720, 13e5, 30),
    h1080: new H(1440, 1080, 23e5, 30),
    h1440: new H(1920, 1440, 38e5, 30)
  }, pi = {
    h360fps3: new H(640, 360, 2e5, 3, "medium"),
    h360fps15: new H(640, 360, 4e5, 15, "medium"),
    h720fps5: new H(1280, 720, 8e5, 5, "medium"),
    h720fps15: new H(1280, 720, 15e5, 15, "medium"),
    h720fps30: new H(1280, 720, 2e6, 30, "medium"),
    h1080fps15: new H(1920, 1080, 25e5, 15, "medium"),
    h1080fps30: new H(1920, 1080, 5e6, 30, "medium"),
    // original resolution, without resizing
    original: new H(0, 0, 7e6, 30, "medium")
  };
  function cc(i, e, t) {
    var n, s, r, a;
    const {
      optionsWithoutProcessor: o,
      audioProcessor: d,
      videoProcessor: c
    } = uc(i ?? {}), l = e == null ? void 0 : e.processor, u = t == null ? void 0 : t.processor, h = o ?? {};
    return h.audio === true && (h.audio = {}), h.video === true && (h.video = {}), h.audio && (ps(h.audio, e), (n = (r = h.audio).deviceId) !== null && n !== void 0 || (r.deviceId = {
      ideal: "default"
    }), (d || l) && (h.audio.processor = d ?? l)), h.video && (ps(h.video, t), (s = (a = h.video).deviceId) !== null && s !== void 0 || (a.deviceId = {
      ideal: "default"
    }), (c || u) && (h.video.processor = c ?? u)), h;
  }
  function ps(i, e) {
    return Object.keys(e).forEach((t) => {
      i[t] === void 0 && (i[t] = e[t]);
    }), i;
  }
  function zs(i) {
    var e, t, n, s;
    const r = {};
    if (i.video)
      if (typeof i.video == "object") {
        const a = {}, o = a, d = i.video;
        Object.keys(d).forEach((c) => {
          switch (c) {
            case "resolution":
              ps(o, d.resolution);
              break;
            default:
              o[c] = d[c];
          }
        }), r.video = a, (e = (n = r.video).deviceId) !== null && e !== void 0 || (n.deviceId = {
          ideal: "default"
        });
      } else
        r.video = i.video ? {
          deviceId: {
            ideal: "default"
          }
        } : false;
    else
      r.video = false;
    return i.audio ? typeof i.audio == "object" ? (r.audio = i.audio, (t = (s = r.audio).deviceId) !== null && t !== void 0 || (s.deviceId = {
      ideal: "default"
    })) : r.audio = {
      deviceId: {
        ideal: "default"
      }
    } : r.audio = false, r;
  }
  function dc(i) {
    return m(this, arguments, void 0, function(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 200;
      return (function* () {
        const n = Ys();
        if (n) {
          const s = n.createAnalyser();
          s.fftSize = 2048;
          const r = s.frequencyBinCount, a = new Uint8Array(r);
          n.createMediaStreamSource(new MediaStream([e.mediaStreamTrack])).connect(s), yield he(t), s.getByteTimeDomainData(a);
          const d = a.some((c) => c !== 128 && c !== 0);
          return n.close(), !d;
        }
        return false;
      })();
    });
  }
  function Ys() {
    var i;
    const e = (
      // @ts-ignore
      typeof window < "u" && (window.AudioContext || window.webkitAudioContext)
    );
    if (e) {
      const t = new e({
        latencyHint: "interactive"
      });
      if (t.state === "suspended" && typeof window < "u" && (!((i = window.document) === null || i === void 0) && i.body)) {
        const n = () => m(this, void 0, void 0, function* () {
          var s;
          try {
            t.state === "suspended" && (yield t.resume());
          } catch (r) {
            console.warn("Error trying to auto-resume audio context", r);
          } finally {
            (s = window.document.body) === null || s === void 0 || s.removeEventListener("click", n);
          }
        });
        t.addEventListener("statechange", () => {
          var s;
          t.state === "closed" && ((s = window.document.body) === null || s === void 0 || s.removeEventListener("click", n));
        }), window.document.body.addEventListener("click", n);
      }
      return t;
    }
  }
  function bu(i) {
    return i === "audioinput" ? C.Source.Microphone : i === "videoinput" ? C.Source.Camera : C.Source.Unknown;
  }
  function gs(i) {
    return i === C.Source.Microphone ? "audioinput" : i === C.Source.Camera ? "videoinput" : void 0;
  }
  function lc(i) {
    var e, t;
    let n = (e = i.video) !== null && e !== void 0 ? e : true;
    return i.resolution && i.resolution.width > 0 && i.resolution.height > 0 && (n = typeof n == "boolean" ? {} : n, Dt() ? n = Object.assign(Object.assign({}, n), {
      width: {
        max: i.resolution.width
      },
      height: {
        max: i.resolution.height
      },
      frameRate: i.resolution.frameRate
    }) : n = Object.assign(Object.assign({}, n), {
      width: {
        ideal: i.resolution.width
      },
      height: {
        ideal: i.resolution.height
      },
      frameRate: i.resolution.frameRate
    })), {
      audio: (t = i.audio) !== null && t !== void 0 ? t : false,
      video: n,
      // @ts-expect-error support for experimental display media features
      controller: i.controller,
      selfBrowserSurface: i.selfBrowserSurface,
      surfaceSwitching: i.surfaceSwitching,
      systemAudio: i.systemAudio,
      preferCurrentTab: i.preferCurrentTab
    };
  }
  function on(i) {
    return i.split("/")[1].toLowerCase();
  }
  function yu(i) {
    const e = [];
    return i.forEach((t) => {
      t.track !== void 0 && e.push(new js({
        cid: t.track.mediaStreamID,
        track: t.trackInfo
      }));
    }), e;
  }
  function j(i) {
    return "mediaStreamTrack" in i ? {
      trackID: i.sid,
      source: i.source,
      muted: i.isMuted,
      enabled: i.mediaStreamTrack.enabled,
      kind: i.kind,
      streamID: i.mediaStreamID,
      streamTrackID: i.mediaStreamTrack.id
    } : {
      trackID: i.trackSid,
      enabled: i.isEnabled,
      muted: i.isMuted,
      trackInfo: Object.assign({
        mimeType: i.mimeType,
        name: i.trackName,
        encrypted: i.isEncrypted,
        kind: i.kind,
        source: i.source
      }, i.track ? j(i.track) : {})
    };
  }
  function ku() {
    return typeof RTCRtpReceiver < "u" && "getSynchronizationSources" in RTCRtpReceiver;
  }
  function Tu(i, e) {
    var t;
    i === void 0 && (i = {}), e === void 0 && (e = {});
    const n = [...Object.keys(e), ...Object.keys(i)], s = {};
    for (const r of n)
      i[r] !== e[r] && (s[r] = (t = e[r]) !== null && t !== void 0 ? t : "");
    return s;
  }
  function uc(i) {
    const e = Object.assign({}, i);
    let t, n;
    return typeof e.audio == "object" && e.audio.processor && (t = e.audio.processor, e.audio = Object.assign(Object.assign({}, e.audio), {
      processor: void 0
    })), typeof e.video == "object" && e.video.processor && (n = e.video.processor, e.video = Object.assign(Object.assign({}, e.video), {
      processor: void 0
    })), {
      audioProcessor: t,
      videoProcessor: n,
      optionsWithoutProcessor: hu(e)
    };
  }
  function Su(i) {
    switch (i) {
      case ie.CAMERA:
        return C.Source.Camera;
      case ie.MICROPHONE:
        return C.Source.Microphone;
      case ie.SCREEN_SHARE:
        return C.Source.ScreenShare;
      case ie.SCREEN_SHARE_AUDIO:
        return C.Source.ScreenShareAudio;
      default:
        return C.Source.Unknown;
    }
  }
  function qr(i, e) {
    return i.width * i.height < e.width * e.height;
  }
  function Cu(i, e) {
    var t;
    return (t = i.layers) === null || t === void 0 ? void 0 : t.find((n) => n.quality === e);
  }
  const Eu = 5e3, $t = [];
  var we;
  (function(i) {
    i[i.LOW = 0] = "LOW", i[i.MEDIUM = 1] = "MEDIUM", i[i.HIGH = 2] = "HIGH";
  })(we || (we = {}));
  class C extends Ie.EventEmitter {
    /**
     * indicates current state of stream, it'll indicate `paused` if the track
     * has been paused by congestion controller
     */
    get streamState() {
      return this._streamState;
    }
    /** @internal */
    setStreamState(e) {
      this._streamState = e;
    }
    constructor(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var s;
      super(), this.attachedElements = [], this.isMuted = false, this._streamState = C.StreamState.Active, this.isInBackground = false, this._currentBitrate = 0, this.log = U, this.appVisibilityChangedListener = () => {
        this.backgroundTimeout && clearTimeout(this.backgroundTimeout), document.visibilityState === "hidden" ? this.backgroundTimeout = setTimeout(() => this.handleAppVisibilityChanged(), Eu) : this.handleAppVisibilityChanged();
      }, this.log = Ee((s = n.loggerName) !== null && s !== void 0 ? s : fe.Track), this.loggerContextCb = n.loggerContextCb, this.setMaxListeners(100), this.kind = t, this._mediaStreamTrack = e, this._mediaStreamID = e.id, this.source = C.Source.Unknown;
    }
    get logContext() {
      var e;
      return Object.assign(Object.assign({}, (e = this.loggerContextCb) === null || e === void 0 ? void 0 : e.call(this)), j(this));
    }
    /** current receive bits per second */
    get currentBitrate() {
      return this._currentBitrate;
    }
    get mediaStreamTrack() {
      return this._mediaStreamTrack;
    }
    /**
     * @internal
     * used for keep mediaStream's first id, since it's id might change
     * if we disable/enable a track
     */
    get mediaStreamID() {
      return this._mediaStreamID;
    }
    attach(e) {
      let t = "audio";
      this.kind === C.Kind.Video && (t = "video"), this.attachedElements.length === 0 && this.kind === C.Kind.Video && this.addAppVisibilityListener(), e || (t === "audio" && ($t.forEach((r) => {
        r.parentElement === null && !e && (e = r);
      }), e && $t.splice($t.indexOf(e), 1)), e || (e = document.createElement(t))), this.attachedElements.includes(e) || this.attachedElements.push(e), Ut(this.mediaStreamTrack, e);
      const n = e.srcObject.getTracks(), s = n.some((r) => r.kind === "audio");
      return e.play().then(() => {
        this.emit(s ? R.AudioPlaybackStarted : R.VideoPlaybackStarted);
      }).catch((r) => {
        r.name === "NotAllowedError" ? this.emit(s ? R.AudioPlaybackFailed : R.VideoPlaybackFailed, r) : r.name === "AbortError" ? U.debug("".concat(s ? "audio" : "video", " playback aborted, likely due to new play request")) : U.warn("could not playback ".concat(s ? "audio" : "video"), r), s && e && n.some((a) => a.kind === "video") && r.name === "NotAllowedError" && (e.muted = true, e.play().catch(() => {
        }));
      }), this.emit(R.ElementAttached, e), e;
    }
    detach(e) {
      try {
        if (e) {
          qt(this.mediaStreamTrack, e);
          const n = this.attachedElements.indexOf(e);
          return n >= 0 && (this.attachedElements.splice(n, 1), this.recycleElement(e), this.emit(R.ElementDetached, e)), e;
        }
        const t = [];
        return this.attachedElements.forEach((n) => {
          qt(this.mediaStreamTrack, n), t.push(n), this.recycleElement(n), this.emit(R.ElementDetached, n);
        }), this.attachedElements = [], t;
      } finally {
        this.attachedElements.length === 0 && this.removeAppVisibilityListener();
      }
    }
    stop() {
      this.stopMonitor(), this._mediaStreamTrack.stop();
    }
    enable() {
      this._mediaStreamTrack.enabled = true;
    }
    disable() {
      this._mediaStreamTrack.enabled = false;
    }
    /* @internal */
    stopMonitor() {
      this.monitorInterval && clearInterval(this.monitorInterval), this.timeSyncHandle && cancelAnimationFrame(this.timeSyncHandle);
    }
    /** @internal */
    updateLoggerOptions(e) {
      e.loggerName && (this.log = Ee(e.loggerName)), e.loggerContextCb && (this.loggerContextCb = e.loggerContextCb);
    }
    recycleElement(e) {
      if (e instanceof HTMLAudioElement) {
        let t = true;
        e.pause(), $t.forEach((n) => {
          n.parentElement || (t = false);
        }), t && $t.push(e);
      }
    }
    handleAppVisibilityChanged() {
      return m(this, void 0, void 0, function* () {
        this.isInBackground = document.visibilityState === "hidden", !this.isInBackground && this.kind === C.Kind.Video && setTimeout(() => this.attachedElements.forEach((e) => e.play().catch(() => {
        })), 0);
      });
    }
    addAppVisibilityListener() {
      Te() ? (this.isInBackground = document.visibilityState === "hidden", document.addEventListener("visibilitychange", this.appVisibilityChangedListener)) : this.isInBackground = false;
    }
    removeAppVisibilityListener() {
      Te() && document.removeEventListener("visibilitychange", this.appVisibilityChangedListener);
    }
  }
  function Ut(i, e) {
    let t;
    e.srcObject instanceof MediaStream ? t = e.srcObject : t = new MediaStream();
    let n;
    i.kind === "audio" ? n = t.getAudioTracks() : n = t.getVideoTracks(), n.includes(i) || (n.forEach((s) => {
      t.removeTrack(s);
    }), t.addTrack(i)), (!Dt() || !(e instanceof HTMLVideoElement)) && (e.autoplay = true), e.muted = t.getAudioTracks().length === 0, e instanceof HTMLVideoElement && (e.playsInline = true), e.srcObject !== t && (e.srcObject = t, (Dt() || Mt()) && e instanceof HTMLVideoElement && setTimeout(() => {
      e.srcObject = t, e.play().catch(() => {
      });
    }, 0));
  }
  function qt(i, e) {
    if (e.srcObject instanceof MediaStream) {
      const t = e.srcObject;
      t.removeTrack(i), t.getTracks().length > 0 ? e.srcObject = t : e.srcObject = null;
    }
  }
  (function(i) {
    let e;
    (function(c) {
      c.Audio = "audio", c.Video = "video", c.Unknown = "unknown";
    })(e = i.Kind || (i.Kind = {}));
    let t;
    (function(c) {
      c.Camera = "camera", c.Microphone = "microphone", c.ScreenShare = "screen_share", c.ScreenShareAudio = "screen_share_audio", c.Unknown = "unknown";
    })(t = i.Source || (i.Source = {}));
    let n;
    (function(c) {
      c.Active = "active", c.Paused = "paused", c.Unknown = "unknown";
    })(n = i.StreamState || (i.StreamState = {}));
    function s(c) {
      switch (c) {
        case e.Audio:
          return Ne.AUDIO;
        case e.Video:
          return Ne.VIDEO;
        default:
          return Ne.DATA;
      }
    }
    i.kindToProto = s;
    function r(c) {
      switch (c) {
        case Ne.AUDIO:
          return e.Audio;
        case Ne.VIDEO:
          return e.Video;
        default:
          return e.Unknown;
      }
    }
    i.kindFromProto = r;
    function a(c) {
      switch (c) {
        case t.Camera:
          return ie.CAMERA;
        case t.Microphone:
          return ie.MICROPHONE;
        case t.ScreenShare:
          return ie.SCREEN_SHARE;
        case t.ScreenShareAudio:
          return ie.SCREEN_SHARE_AUDIO;
        default:
          return ie.UNKNOWN;
      }
    }
    i.sourceToProto = a;
    function o(c) {
      switch (c) {
        case ie.CAMERA:
          return t.Camera;
        case ie.MICROPHONE:
          return t.Microphone;
        case ie.SCREEN_SHARE:
          return t.ScreenShare;
        case ie.SCREEN_SHARE_AUDIO:
          return t.ScreenShareAudio;
        default:
          return t.Unknown;
      }
    }
    i.sourceFromProto = o;
    function d(c) {
      switch (c) {
        case ts.ACTIVE:
          return n.Active;
        case ts.PAUSED:
          return n.Paused;
        default:
          return n.Unknown;
      }
    }
    i.streamStateFromProto = d;
  })(C || (C = {}));
  const wu = "|", Vr = "https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension";
  function Pu(i) {
    const e = i.split(wu);
    return e.length > 1 ? [e[0], i.substr(e[0].length + 1)] : [i, ""];
  }
  function he(i) {
    return new ue((e) => se.setTimeout(e, i));
  }
  function $n() {
    return "addTransceiver" in RTCPeerConnection.prototype;
  }
  function vs() {
    return "addTrack" in RTCPeerConnection.prototype;
  }
  function ym() {
    return typeof ResizeObserver !== void 0 && typeof IntersectionObserver !== void 0;
  }
  function km() {
    return $n();
  }
  function _u() {
    if (!("getCapabilities" in RTCRtpSender) || Dt() || Mt())
      return false;
    const i = RTCRtpSender.getCapabilities("video");
    let e = false;
    if (i) {
      for (const t of i.codecs)
        if (t.mimeType.toLowerCase() === "video/av1") {
          e = true;
          break;
        }
    }
    return e;
  }
  function Ru() {
    if (!("getCapabilities" in RTCRtpSender) || Mt())
      return false;
    if (Dt()) {
      const t = Ce();
      if (t != null && t.version && Qe(t.version, "16") < 0 || (t == null ? void 0 : t.os) === "iOS" && (t != null && t.osVersion) && Qe(t.osVersion, "16") < 0)
        return false;
    }
    const i = RTCRtpSender.getCapabilities("video");
    let e = false;
    if (i) {
      for (const t of i.codecs)
        if (t.mimeType.toLowerCase() === "video/vp9") {
          e = true;
          break;
        }
    }
    return e;
  }
  function Fe(i) {
    return i === "av1" || i === "vp9";
  }
  function Zn(i) {
    return !document || vn() ? false : (i || (i = document.createElement("audio")), "setSinkId" in i);
  }
  function Tm() {
    return Zn();
  }
  function Iu() {
    return typeof RTCPeerConnection > "u" ? false : $n() || vs();
  }
  function Mt() {
    var i;
    return ((i = Ce()) === null || i === void 0 ? void 0 : i.name) === "Firefox";
  }
  function Wr() {
    const i = Ce();
    return !!i && i.name === "Chrome" && i.os !== "iOS";
  }
  function Dt() {
    var i;
    return ((i = Ce()) === null || i === void 0 ? void 0 : i.name) === "Safari";
  }
  function vn() {
    const i = Ce();
    return (i == null ? void 0 : i.name) === "Safari" || (i == null ? void 0 : i.os) === "iOS";
  }
  function hc() {
    const i = Ce();
    return (i == null ? void 0 : i.name) === "Safari" && i.version.startsWith("17.") || (i == null ? void 0 : i.os) === "iOS" && !!(i != null && i.osVersion) && Qe(i.osVersion, "17") >= 0;
  }
  function Ou(i) {
    return i || (i = Ce()), (i == null ? void 0 : i.name) === "Safari" && Qe(i.version, "18.3") > 0 || (i == null ? void 0 : i.os) === "iOS" && !!(i != null && i.osVersion) && Qe(i.osVersion, "18.3") > 0;
  }
  function fc() {
    var i, e;
    return Te() ? (
      // @ts-expect-error `userAgentData` is not yet part of typescript
      (e = (i = navigator.userAgentData) === null || i === void 0 ? void 0 : i.mobile) !== null && e !== void 0 ? e : /Tablet|iPad|Mobile|Android|BlackBerry/.test(navigator.userAgent)
    ) : false;
  }
  function Mu() {
    const i = Ce(), e = "17.2";
    if (i)
      return i.name !== "Safari" && i.os !== "iOS" || i.os === "iOS" && i.osVersion && Qe(i.osVersion, e) >= 0 ? true : i.name === "Safari" && Qe(i.version, e) >= 0;
  }
  function Te() {
    return typeof document < "u";
  }
  function Ye() {
    return navigator.product == "ReactNative";
  }
  function Jt(i) {
    return i.hostname.endsWith(".livekit.cloud") || i.hostname.endsWith(".livekit.run");
  }
  function Li(i) {
    return Jt(i) ? i.hostname.split(".")[0] : null;
  }
  function mc() {
    if (global && global.LiveKitReactNativeGlobal)
      return global.LiveKitReactNativeGlobal;
  }
  function pc() {
    if (!Ye())
      return;
    let i = mc();
    if (i)
      return i.platform;
  }
  function Hr() {
    if (Te())
      return window.devicePixelRatio;
    if (Ye()) {
      let i = mc();
      if (i)
        return i.devicePixelRatio;
    }
    return 1;
  }
  function Qe(i, e) {
    const t = i.split("."), n = e.split("."), s = Math.min(t.length, n.length);
    for (let r = 0; r < s; ++r) {
      const a = parseInt(t[r], 10), o = parseInt(n[r], 10);
      if (a > o) return 1;
      if (a < o) return -1;
      if (r === s - 1 && a === o) return 0;
    }
    return i === "" && e !== "" ? -1 : e === "" ? 1 : t.length == n.length ? 0 : t.length < n.length ? -1 : 1;
  }
  function Du(i) {
    for (const e of i)
      e.target.handleResize(e);
  }
  function Au(i) {
    for (const e of i)
      e.target.handleVisibilityChanged(e);
  }
  let Ui = null;
  const Kr = () => (Ui || (Ui = new ResizeObserver(Du)), Ui);
  let Fi = null;
  const Gr = () => (Fi || (Fi = new IntersectionObserver(Au, {
    root: null,
    rootMargin: "0px"
  })), Fi);
  function xu() {
    var i;
    const e = new ro({
      sdk: ao.JS,
      protocol: lu,
      version: du
    });
    return Ye() && (e.os = (i = pc()) !== null && i !== void 0 ? i : ""), e;
  }
  let Bi;
  function Sm() {
    return Bi || (Bi = bs()), Bi.clone();
  }
  function bs() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 16, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 16, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
    const s = document.createElement("canvas");
    s.width = i, s.height = e;
    const r = s.getContext("2d");
    r == null || r.fillRect(0, 0, s.width, s.height), n && r && (r.beginPath(), r.arc(i / 2, e / 2, 50, 0, Math.PI * 2, true), r.closePath(), r.fillStyle = "grey", r.fill());
    const a = s.captureStream(), [o] = a.getTracks();
    if (!o)
      throw Error("Could not get empty media stream video track");
    return o.enabled = t, o;
  }
  let Zt;
  function ji() {
    if (!Zt) {
      const i = new AudioContext(), e = i.createOscillator(), t = i.createGain();
      t.gain.setValueAtTime(0, 0);
      const n = i.createMediaStreamDestination();
      if (e.connect(t), t.connect(n), e.start(), [Zt] = n.stream.getAudioTracks(), !Zt)
        throw Error("Could not get empty media stream audio track");
      Zt.enabled = false;
    }
    return Zt.clone();
  }
  class Se {
    get isResolved() {
      return this._isResolved;
    }
    constructor(e, t) {
      this._isResolved = false, this.onFinally = t, this.promise = new Promise((n, s) => m(this, void 0, void 0, function* () {
        this.resolve = n, this.reject = s, e && (yield e(n, s));
      })).finally(() => {
        var n;
        this._isResolved = true, (n = this.onFinally) === null || n === void 0 || n.call(this);
      });
    }
  }
  function Cm(i, e) {
    const t = Object.assign({
      cloneTrack: false,
      fftSize: 2048,
      smoothingTimeConstant: 0.8,
      minDecibels: -100,
      maxDecibels: -80
    }, e), n = Ys();
    if (!n)
      throw new Error("Audio Context not supported on this browser");
    const s = t.cloneTrack ? i.mediaStreamTrack.clone() : i.mediaStreamTrack, r = n.createMediaStreamSource(new MediaStream([s])), a = n.createAnalyser();
    a.minDecibels = t.minDecibels, a.maxDecibels = t.maxDecibels, a.fftSize = t.fftSize, a.smoothingTimeConstant = t.smoothingTimeConstant, r.connect(a);
    const o = new Uint8Array(a.frequencyBinCount);
    return {
      calculateVolume: () => {
        a.getByteFrequencyData(o);
        let l = 0;
        for (const h of o)
          l += Math.pow(h / 255, 2);
        return Math.sqrt(l / o.length);
      },
      analyser: a,
      cleanup: () => m(this, void 0, void 0, function* () {
        yield n.close(), t.cloneTrack && s.stop();
      })
    };
  }
  function Em(i) {
    return fu.includes(i);
  }
  function Nu(i) {
    return pu.includes(i);
  }
  function Pt(i) {
    if (typeof i == "string" || typeof i == "number")
      return i;
    if (Array.isArray(i))
      return i[0];
    if (i.exact !== void 0)
      return Array.isArray(i.exact) ? i.exact[0] : i.exact;
    if (i.ideal !== void 0)
      return Array.isArray(i.ideal) ? i.ideal[0] : i.ideal;
    throw Error("could not unwrap constraint");
  }
  function Lu(i) {
    return i.startsWith("http") ? i.replace(/^(http)/, "ws") : i;
  }
  function bn(i) {
    return i.startsWith("ws") ? i.replace(/^(ws)/, "http") : i;
  }
  function Uu(i, e) {
    return i.segments.map((t) => {
      let {
        id: n,
        text: s,
        language: r,
        startTime: a,
        endTime: o,
        final: d
      } = t;
      var c;
      const l = (c = e.get(n)) !== null && c !== void 0 ? c : Date.now(), u = Date.now();
      return d ? e.delete(n) : e.set(n, l), {
        id: n,
        text: s,
        startTime: Number.parseInt(a.toString()),
        endTime: Number.parseInt(o.toString()),
        final: d,
        language: r,
        firstReceivedTime: l,
        lastReceivedTime: u
      };
    });
  }
  function Fu(i) {
    const {
      id: e,
      timestamp: t,
      message: n,
      editTimestamp: s
    } = i;
    return {
      id: e,
      timestamp: Number.parseInt(t.toString()),
      editTimestamp: s ? Number.parseInt(s.toString()) : void 0,
      message: n
    };
  }
  function Jr(i) {
    switch (i.reason) {
      case G.LeaveRequest:
        return i.context;
      case G.Cancelled:
        return qe.CLIENT_INITIATED;
      case G.NotAllowed:
        return qe.USER_REJECTED;
      case G.ServerUnreachable:
        return qe.JOIN_FAILURE;
      default:
        return qe.UNKNOWN_REASON;
    }
  }
  function Vn(i) {
    return i !== void 0 ? Number(i) : void 0;
  }
  function bt(i) {
    return i !== void 0 ? BigInt(i) : void 0;
  }
  function _t(i) {
    return !!i && !(i instanceof MediaStreamTrack) && i.isLocal;
  }
  function ze(i) {
    return !!i && i.kind == C.Kind.Audio;
  }
  function pt(i) {
    return !!i && i.kind == C.Kind.Video;
  }
  function at(i) {
    return _t(i) && pt(i);
  }
  function et(i) {
    return _t(i) && ze(i);
  }
  function ys(i) {
    return !!i && !i.isLocal;
  }
  function Bu(i) {
    return !!i && !i.isLocal;
  }
  function qi(i) {
    return ys(i) && pt(i);
  }
  function ju(i) {
    return i.isLocal;
  }
  function wm(i) {
    return !i.isLocal;
  }
  function qu(i, e) {
    const t = [];
    let n = new TextEncoder().encode(i);
    for (; n.length > e; ) {
      let s = e;
      for (; s > 0; ) {
        const r = n[s];
        if (r !== void 0 && (r & 192) !== 128)
          break;
        s--;
      }
      t.push(n.slice(0, s)), n = n.slice(s);
    }
    return n.length > 0 && t.push(n), t;
  }
  function Vu(i) {
    var e;
    const t = i.get("Cache-Control");
    if (t) {
      const n = (e = t.match(/(?:^|[,\s])max-age=(\d+)/)) === null || e === void 0 ? void 0 : e[1];
      if (n)
        return parseInt(n, 10);
    }
  }
  function ks() {
    return typeof CompressionStream < "u";
  }
  function Wu(i, e) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    const n = Hu(i, e);
    return t ? n : Qs(n, "v1");
  }
  function Hu(i, e) {
    const t = new URL(Lu(i));
    return e.forEach((n, s) => {
      t.searchParams.set(s, n);
    }), Qs(t, "rtc");
  }
  function Ku(i) {
    const e = new URL(bn(i));
    return Qs(e, "validate");
  }
  function gc(i) {
    return i.endsWith("/") ? i : "".concat(i, "/");
  }
  function Qs(i, e) {
    return i.pathname = "".concat(gc(i.pathname)).concat(e), i;
  }
  function zr(i) {
    if (typeof i == "string")
      return Pr.fromJson(JSON.parse(i), {
        ignoreUnknownFields: true
      });
    if (i instanceof ArrayBuffer)
      return Pr.fromBinary(new Uint8Array(i));
    throw new Error("could not decode websocket message: ".concat(typeof i));
  }
  function Gu(i) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Unknown reason";
    if (!(i instanceof AbortSignal))
      return e;
    const t = i.reason;
    switch (typeof t) {
      case "string":
        return t;
      case "object":
        return t instanceof Error ? t.message : e;
      default:
        return "toString" in t ? t.toString() : e;
    }
  }
  const vc = "AES-GCM", Ju = 10, en = "lk_e2ee", zu = "LKFrameEncryptionKey", Yu = {
    sharedKey: false,
    ratchetSalt: zu,
    ratchetWindowSize: 8,
    failureTolerance: Ju,
    keyringSize: 16,
    keySize: 128
  };
  var ht;
  (function(i) {
    i.SetKey = "setKey", i.RatchetRequest = "ratchetRequest", i.KeyRatcheted = "keyRatcheted";
  })(ht || (ht = {}));
  var Yr;
  (function(i) {
    i.KeyRatcheted = "keyRatcheted";
  })(Yr || (Yr = {}));
  var dt;
  (function(i) {
    i.ParticipantEncryptionStatusChanged = "participantEncryptionStatusChanged", i.EncryptionError = "encryptionError";
  })(dt || (dt = {}));
  var Qr;
  (function(i) {
    i.Error = "cryptorError";
  })(Qr || (Qr = {}));
  function Qu() {
    return Xu() || Ts();
  }
  function Ts() {
    return typeof window.RTCRtpScriptTransform < "u";
  }
  function Xu() {
    return typeof window.RTCRtpSender < "u" && // @ts-ignore
    typeof window.RTCRtpSender.prototype.createEncodedStreams < "u";
  }
  function Pm(i) {
    return "type" in i;
  }
  function _m(i) {
    return m(this, arguments, void 0, function(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        name: vc
      }, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "encrypt";
      return (function* () {
        return crypto.subtle.importKey("raw", e, t, false, n === "derive" ? ["deriveBits", "deriveKey"] : ["encrypt", "decrypt"]);
      })();
    });
  }
  function $u(i) {
    return m(this, void 0, void 0, function* () {
      let e = new TextEncoder();
      return yield crypto.subtle.importKey("raw", e.encode(i), {
        name: "PBKDF2"
      }, false, ["deriveBits", "deriveKey"]);
    });
  }
  function Zu(i) {
    return m(this, void 0, void 0, function* () {
      return yield crypto.subtle.importKey("raw", i, "HKDF", false, ["deriveBits", "deriveKey"]);
    });
  }
  function bc(i, e) {
    const n = new TextEncoder().encode(e);
    switch (i) {
      case "HKDF":
        return {
          name: "HKDF",
          salt: n,
          hash: "SHA-256",
          info: new ArrayBuffer(128)
        };
      case "PBKDF2":
        return {
          name: "PBKDF2",
          salt: n,
          hash: "SHA-256",
          iterations: 1e5
        };
      default:
        throw new Error("algorithm ".concat(i, " is currently unsupported"));
    }
  }
  function Rm(i, e) {
    return m(this, void 0, void 0, function* () {
      const t = bc(i.algorithm.name, e.ratchetSalt), n = yield crypto.subtle.deriveKey(t, i, {
        name: vc,
        length: e.keySize
      }, false, ["encrypt", "decrypt"]);
      return {
        material: i,
        encryptionKey: n
      };
    });
  }
  function Im() {
    return window.crypto.getRandomValues(new Uint8Array(32));
  }
  function Om(i, e) {
    return m(this, void 0, void 0, function* () {
      const t = bc(i.algorithm.name, e);
      return crypto.subtle.deriveBits(t, i, 256);
    });
  }
  function Mm(i) {
    for (var e = 0; e < i.length - 3; e++)
      if (i[e] == 0 && i[e + 1] == 0 && i[e + 2] == 3) return true;
    return false;
  }
  function Dm(i) {
    const e = [];
    for (var t = i.length, n = 0; n < i.length; )
      t - n >= 3 && !i[n] && !i[n + 1] && i[n + 2] == 3 ? (e.push(i[n++]), e.push(i[n++]), n++) : e.push(i[n++]);
    return new Uint8Array(e);
  }
  const eh = 2, Xr = 3;
  function Am(i) {
    const e = [];
    for (var t = 0, n = 0; n < i.length; ++n) {
      var s = i[n];
      s <= Xr && t >= eh && (e.push(Xr), t = 0), e.push(s), s == 0 ? ++t : t = 0;
    }
    return new Uint8Array(e);
  }
  function th(i) {
    var e, t, n, s, r;
    if (((e = i.value) === null || e === void 0 ? void 0 : e.case) !== "sipDtmf" && ((t = i.value) === null || t === void 0 ? void 0 : t.case) !== "metrics" && ((n = i.value) === null || n === void 0 ? void 0 : n.case) !== "speaker" && ((s = i.value) === null || s === void 0 ? void 0 : s.case) !== "transcription" && ((r = i.value) === null || r === void 0 ? void 0 : r.case) !== "encryptedPacket")
      return new $a({
        value: i.value
      });
  }
  class nh extends Ie.EventEmitter {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      super(), this.latestManuallySetKeyIndex = 0, this.onKeyRatcheted = (t, n, s) => {
        U.debug("key ratcheted event received", {
          ratchetResult: t,
          participantId: n,
          keyIndex: s
        });
      }, this.keyInfoMap = /* @__PURE__ */ new Map(), this.options = Object.assign(Object.assign({}, Yu), e), this.on(ht.KeyRatcheted, this.onKeyRatcheted);
    }
    /**
     * callback to invoke once a key has been set for a participant
     * @param key
     * @param participantIdentity
     * @param keyIndex
     */
    onSetEncryptionKey(e, t, n) {
      const s = {
        key: e,
        participantIdentity: t,
        keyIndex: n
      };
      if (!this.options.sharedKey && !t)
        throw new Error("participant identity needs to be passed for encryption key if sharedKey option is false");
      this.keyInfoMap.set("".concat(t ?? "shared", "-").concat(n ?? 0), s), n !== void 0 && (this.latestManuallySetKeyIndex = n), this.emit(ht.SetKey, s, n !== void 0);
    }
    getKeys() {
      return Array.from(this.keyInfoMap.values());
    }
    getLatestManuallySetKeyIndex() {
      return this.latestManuallySetKeyIndex;
    }
    getOptions() {
      return this.options;
    }
    ratchetKey(e, t) {
      this.emit(ht.RatchetRequest, e, t);
    }
  }
  class xm extends nh {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      const t = Object.assign(Object.assign({}, e), {
        sharedKey: true,
        // for a shared key provider failing to decrypt for a specific participant
        // should not mark the key as invalid, so we accept wrong keys forever
        // and won't try to auto-ratchet
        ratchetWindowSize: 0,
        failureTolerance: -1
      });
      super(t);
    }
    /**
     * Accepts a passphrase that's used to create the crypto keys.
     * When passing in a string, PBKDF2 is used. (recommended for maximum compatibility across SDKs)
     * When passing in an ArrayBuffer of cryptographically random numbers, HKDF is used.
     *
     * Note: Not all client SDKS support HKDF.
     * @param key
     */
    setKey(e) {
      return m(this, void 0, void 0, function* () {
        const t = typeof e == "string" ? yield $u(e) : yield Zu(e);
        this.onSetEncryptionKey(t);
      });
    }
  }
  var Ss;
  (function(i) {
    i[i.InvalidKey = 0] = "InvalidKey", i[i.MissingKey = 1] = "MissingKey", i[i.InternalError = 2] = "InternalError";
  })(Ss || (Ss = {}));
  class Nm extends We {
    constructor(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ss.InternalError, n = arguments.length > 2 ? arguments[2] : void 0;
      super(40, e), this.reason = t, this.participantIdentity = n;
    }
  }
  class ih extends Ie.EventEmitter {
    constructor(e, t) {
      super(), this.decryptDataRequests = /* @__PURE__ */ new Map(), this.encryptDataRequests = /* @__PURE__ */ new Map(), this.onWorkerMessage = (n) => {
        var s, r;
        const {
          kind: a,
          data: o
        } = n.data;
        switch (a) {
          case "error":
            if (U.error(o.error.message), o.uuid) {
              const l = this.decryptDataRequests.get(o.uuid);
              if (l != null && l.reject) {
                l.reject(o.error);
                break;
              }
              const u = this.encryptDataRequests.get(o.uuid);
              if (u != null && u.reject) {
                u.reject(o.error);
                break;
              }
            }
            this.emit(dt.EncryptionError, o.error, o.participantIdentity);
            break;
          case "initAck":
            o.enabled && this.keyProvider.getKeys().forEach((l) => {
              this.postKey(l, false);
            });
            break;
          case "enable":
            if (o.enabled && this.keyProvider.getKeys().forEach((l) => {
              this.postKey(l, false);
            }), this.encryptionEnabled !== o.enabled && o.participantIdentity === ((s = this.room) === null || s === void 0 ? void 0 : s.localParticipant.identity))
              this.emit(dt.ParticipantEncryptionStatusChanged, o.enabled, this.room.localParticipant), this.encryptionEnabled = o.enabled;
            else if (o.participantIdentity) {
              const l = (r = this.room) === null || r === void 0 ? void 0 : r.getParticipantByIdentity(o.participantIdentity);
              if (!l)
                throw TypeError("couldn't set encryption status, participant not found".concat(o.participantIdentity));
              this.emit(dt.ParticipantEncryptionStatusChanged, o.enabled, l);
            }
            break;
          case "ratchetKey":
            this.keyProvider.emit(ht.KeyRatcheted, o.ratchetResult, o.participantIdentity, o.keyIndex);
            break;
          case "decryptDataResponse":
            const d = this.decryptDataRequests.get(o.uuid);
            d != null && d.resolve && d.resolve(o);
            break;
          case "encryptDataResponse":
            const c = this.encryptDataRequests.get(o.uuid);
            c != null && c.resolve && c.resolve(o);
            break;
        }
      }, this.onWorkerError = (n) => {
        U.error("e2ee worker encountered an error:", {
          error: n.error
        }), this.emit(dt.EncryptionError, n.error, void 0);
      }, this.keyProvider = e.keyProvider, this.worker = e.worker, this.encryptionEnabled = false, this.dataChannelEncryptionEnabled = t;
    }
    get isEnabled() {
      return this.encryptionEnabled;
    }
    get isDataChannelEncryptionEnabled() {
      return this.isEnabled && this.dataChannelEncryptionEnabled;
    }
    /**
     * @internal
     */
    setup(e) {
      if (!Qu())
        throw new mi("tried to setup end-to-end encryption on an unsupported browser");
      if (U.info("setting up e2ee"), e !== this.room) {
        this.room = e, this.setupEventListeners(e, this.keyProvider);
        const t = {
          kind: "init",
          data: {
            keyProviderOptions: this.keyProvider.getOptions(),
            loglevel: Gl.getLevel()
          }
        };
        this.worker && (U.info("initializing worker", {
          worker: this.worker
        }), this.worker.onmessage = this.onWorkerMessage, this.worker.onerror = this.onWorkerError, this.worker.postMessage(t));
      }
    }
    /**
     * @internal
     */
    setParticipantCryptorEnabled(e, t) {
      U.debug("set e2ee to ".concat(e, " for participant ").concat(t)), this.postEnable(e, t);
    }
    /**
     * @internal
     */
    setSifTrailer(e) {
      !e || e.length === 0 ? U.warn("ignoring server sent trailer as it's empty") : this.postSifTrailer(e);
    }
    setupEngine(e) {
      e.on(_.RTPVideoMapUpdate, (t) => {
        this.postRTPMap(t);
      });
    }
    setupEventListeners(e, t) {
      e.on(P.TrackPublished, (n, s) => this.setParticipantCryptorEnabled(n.trackInfo.encryption !== J.NONE, s.identity)), e.on(P.ConnectionStateChanged, (n) => {
        n === W.Connected && e.remoteParticipants.forEach((s) => {
          s.trackPublications.forEach((r) => {
            this.setParticipantCryptorEnabled(r.trackInfo.encryption !== J.NONE, s.identity);
          });
        });
      }).on(P.TrackUnsubscribed, (n, s, r) => {
        var a;
        const o = {
          kind: "removeTransform",
          data: {
            participantIdentity: r.identity,
            trackId: n.mediaStreamID
          }
        };
        (a = this.worker) === null || a === void 0 || a.postMessage(o);
      }).on(P.TrackSubscribed, (n, s, r) => {
        this.setupE2EEReceiver(n, r.identity, s.trackInfo);
      }).on(P.SignalConnected, () => {
        if (!this.room)
          throw new TypeError("expected room to be present on signal connect");
        const n = t.getLatestManuallySetKeyIndex();
        t.getKeys().forEach((s) => {
          var r;
          this.postKey(s, n === ((r = s.keyIndex) !== null && r !== void 0 ? r : 0));
        }), this.setParticipantCryptorEnabled(this.room.localParticipant.isE2EEEnabled, this.room.localParticipant.identity);
      }), e.localParticipant.on(I.LocalSenderCreated, (n, s) => m(this, void 0, void 0, function* () {
        this.setupE2EESender(s, n);
      })), e.localParticipant.on(I.LocalTrackPublished, (n) => {
        if (!pt(n.track) || !vn())
          return;
        const s = {
          kind: "updateCodec",
          data: {
            trackId: n.track.mediaStreamID,
            codec: on(n.trackInfo.codecs[0].mimeType),
            participantIdentity: this.room.localParticipant.identity
          }
        };
        this.worker.postMessage(s);
      }), t.on(ht.SetKey, (n, s) => this.postKey(n, s ?? true)).on(ht.RatchetRequest, (n, s) => this.postRatchetRequest(n, s));
    }
    encryptData(e) {
      return m(this, void 0, void 0, function* () {
        if (!this.worker)
          throw Error("could not encrypt data, worker is missing");
        const t = crypto.randomUUID(), n = {
          kind: "encryptDataRequest",
          data: {
            uuid: t,
            payload: e,
            participantIdentity: this.room.localParticipant.identity
          }
        }, s = new Se();
        return s.onFinally = () => {
          this.encryptDataRequests.delete(t);
        }, this.encryptDataRequests.set(t, s), this.worker.postMessage(n), s.promise;
      });
    }
    handleEncryptedData(e, t, n, s) {
      if (!this.worker)
        throw Error("could not handle encrypted data, worker is missing");
      const r = crypto.randomUUID(), a = {
        kind: "decryptDataRequest",
        data: {
          uuid: r,
          payload: e,
          iv: t,
          participantIdentity: n,
          keyIndex: s
        }
      }, o = new Se();
      return o.onFinally = () => {
        this.decryptDataRequests.delete(r);
      }, this.decryptDataRequests.set(r, o), this.worker.postMessage(a), o.promise;
    }
    postRatchetRequest(e, t) {
      if (!this.worker)
        throw Error("could not ratchet key, worker is missing");
      const n = {
        kind: "ratchetRequest",
        data: {
          participantIdentity: e,
          keyIndex: t
        }
      };
      this.worker.postMessage(n);
    }
    postKey(e, t) {
      let {
        key: n,
        participantIdentity: s,
        keyIndex: r
      } = e;
      var a;
      if (!this.worker)
        throw Error("could not set key, worker is missing");
      const o = {
        kind: "setKey",
        data: {
          participantIdentity: s,
          isPublisher: s === ((a = this.room) === null || a === void 0 ? void 0 : a.localParticipant.identity),
          key: n,
          keyIndex: r,
          updateCurrentKeyIndex: t
        }
      };
      this.worker.postMessage(o);
    }
    postEnable(e, t) {
      if (this.worker) {
        const n = {
          kind: "enable",
          data: {
            enabled: e,
            participantIdentity: t
          }
        };
        this.worker.postMessage(n);
      } else
        throw new ReferenceError("failed to enable e2ee, worker is not ready");
    }
    postRTPMap(e) {
      var t;
      if (!this.worker)
        throw TypeError("could not post rtp map, worker is missing");
      if (!(!((t = this.room) === null || t === void 0) && t.localParticipant.identity))
        throw TypeError("could not post rtp map, local participant identity is missing");
      const n = {
        kind: "setRTPMap",
        data: {
          map: e,
          participantIdentity: this.room.localParticipant.identity
        }
      };
      this.worker.postMessage(n);
    }
    postSifTrailer(e) {
      if (!this.worker)
        throw Error("could not post SIF trailer, worker is missing");
      const t = {
        kind: "setSifTrailer",
        data: {
          trailer: e
        }
      };
      this.worker.postMessage(t);
    }
    setupE2EEReceiver(e, t, n) {
      if (e.receiver) {
        if (!(n != null && n.mimeType) || n.mimeType === "")
          throw new TypeError("MimeType missing from trackInfo, cannot set up E2EE cryptor");
        this.handleReceiver(e.receiver, e.mediaStreamID, t, e.kind === "video" ? on(n.mimeType) : void 0);
      }
    }
    setupE2EESender(e, t) {
      if (!_t(e) || !t) {
        t || U.warn("early return because sender is not ready");
        return;
      }
      this.handleSender(t, e.mediaStreamID, void 0);
    }
    /**
     * Handles the given {@code RTCRtpReceiver} by creating a {@code TransformStream} which will inject
     * a frame decoder.
     *
     */
    handleReceiver(e, t, n, s) {
      return m(this, void 0, void 0, function* () {
        if (this.worker) {
          if (Ts() && // Chrome occasionally throws an `InvalidState` error when using script transforms directly after introducing this API in 141.
          // Disabling it for Chrome based browsers until the API has stabilized
          !Wr()) {
            const r = {
              kind: "decode",
              participantIdentity: n,
              trackId: t,
              codec: s
            };
            e.transform = new RTCRtpScriptTransform(this.worker, r);
          } else {
            if (en in e && s) {
              const d = {
                kind: "updateCodec",
                data: {
                  trackId: t,
                  codec: s,
                  participantIdentity: n
                }
              };
              this.worker.postMessage(d);
              return;
            }
            let r = e.writableStream, a = e.readableStream;
            if (!r || !a) {
              const d = e.createEncodedStreams();
              e.writableStream = d.writable, r = d.writable, e.readableStream = d.readable, a = d.readable;
            }
            const o = {
              kind: "decode",
              data: {
                readableStream: a,
                writableStream: r,
                trackId: t,
                codec: s,
                participantIdentity: n,
                isReuse: en in e
              }
            };
            this.worker.postMessage(o, [a, r]);
          }
          e[en] = true;
        }
      });
    }
    /**
     * Handles the given {@code RTCRtpSender} by creating a {@code TransformStream} which will inject
     * a frame encoder.
     *
     */
    handleSender(e, t, n) {
      var s;
      if (!(en in e || !this.worker)) {
        if (!(!((s = this.room) === null || s === void 0) && s.localParticipant.identity) || this.room.localParticipant.identity === "")
          throw TypeError("local identity needs to be known in order to set up encrypted sender");
        if (Ts() && // Chrome occasionally throws an `InvalidState` error when using script transforms directly after introducing this API in 141.
        // Disabling it for Chrome based browsers until the API has stabilized
        !Wr()) {
          U.info("initialize script transform");
          const r = {
            kind: "encode",
            participantIdentity: this.room.localParticipant.identity,
            trackId: t,
            codec: n
          };
          e.transform = new RTCRtpScriptTransform(this.worker, r);
        } else {
          U.info("initialize encoded streams");
          const r = e.createEncodedStreams(), a = {
            kind: "encode",
            data: {
              readableStream: r.readable,
              writableStream: r.writable,
              codec: n,
              trackId: t,
              participantIdentity: this.room.localParticipant.identity,
              isReuse: false
            }
          };
          this.worker.postMessage(a, [r.readable, r.writable]);
        }
        e[en] = true;
      }
    }
  }
  const sh = 500, rh = 15e3;
  class Vt {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
      this.failedConnectionAttempts = /* @__PURE__ */ new Map(), this.backOffPromises = /* @__PURE__ */ new Map();
    }
    static getInstance() {
      return this._instance || (this._instance = new Vt()), this._instance;
    }
    addFailedConnectionAttempt(e) {
      var t;
      const n = new URL(e), s = Li(n);
      if (!s)
        return;
      let r = (t = this.failedConnectionAttempts.get(s)) !== null && t !== void 0 ? t : 0;
      this.failedConnectionAttempts.set(s, r + 1), this.backOffPromises.set(s, he(Math.min(sh * Math.pow(2, r), rh)));
    }
    getBackOffPromise(e) {
      const t = new URL(e), n = t && Li(t);
      return n && this.backOffPromises.get(n) || Promise.resolve();
    }
    resetFailedConnectionAttempts(e) {
      const t = new URL(e), n = t && Li(t);
      n && (this.failedConnectionAttempts.set(n, 0), this.backOffPromises.set(n, Promise.resolve()));
    }
    resetAll() {
      this.backOffPromises.clear(), this.failedConnectionAttempts.clear();
    }
  }
  Vt._instance = null;
  const Vi = "default";
  class oe {
    constructor() {
      this._previousDevices = [];
    }
    static getInstance() {
      return this.instance === void 0 && (this.instance = new oe()), this.instance;
    }
    get previousDevices() {
      return this._previousDevices;
    }
    getDevices(e) {
      return m(this, arguments, void 0, function(t) {
        var n = this;
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return (function* () {
          var r;
          if (((r = oe.userMediaPromiseMap) === null || r === void 0 ? void 0 : r.size) > 0) {
            U.debug("awaiting getUserMedia promise");
            try {
              t ? yield oe.userMediaPromiseMap.get(t) : yield Promise.all(oe.userMediaPromiseMap.values());
            } catch {
              U.warn("error waiting for media permissons");
            }
          }
          let a = yield navigator.mediaDevices.enumerateDevices();
          if (s && // for safari we need to skip this check, as otherwise it will re-acquire user media and fail on iOS https://bugs.webkit.org/show_bug.cgi?id=179363
          !(Dt() && n.hasDeviceInUse(t)) && (a.filter((d) => d.kind === t).length === 0 || a.some((d) => {
            const c = d.label === "", l = t ? d.kind === t : true;
            return c && l;
          }))) {
            const d = {
              video: t !== "audioinput" && t !== "audiooutput",
              audio: t !== "videoinput" && {
                deviceId: {
                  ideal: "default"
                }
              }
            }, c = yield navigator.mediaDevices.getUserMedia(d);
            a = yield navigator.mediaDevices.enumerateDevices(), c.getTracks().forEach((l) => {
              l.stop();
            });
          }
          return n._previousDevices = a, t && (a = a.filter((o) => o.kind === t)), a;
        })();
      });
    }
    normalizeDeviceId(e, t, n) {
      return m(this, void 0, void 0, function* () {
        if (t !== Vi)
          return t;
        const s = yield this.getDevices(e), r = s.find((o) => o.deviceId === Vi);
        if (!r) {
          U.warn("could not reliably determine default device");
          return;
        }
        const a = s.find((o) => o.deviceId !== Vi && o.groupId === (n ?? r.groupId));
        if (!a) {
          U.warn("could not reliably determine default device");
          return;
        }
        return a == null ? void 0 : a.deviceId;
      });
    }
    hasDeviceInUse(e) {
      return e ? oe.userMediaPromiseMap.has(e) : oe.userMediaPromiseMap.size > 0;
    }
  }
  oe.mediaDeviceKinds = ["audioinput", "audiooutput", "videoinput"];
  oe.userMediaPromiseMap = /* @__PURE__ */ new Map();
  const Xs = 65535, yc = 4294967295;
  class Ve {
    static u16(e) {
      return new Ve(e, Xs);
    }
    static u32(e) {
      return new Ve(e, yc);
    }
    constructor(e, t) {
      if (this.value = e, e < 0)
        throw new Error("WrapAroundUnsignedInt: cannot faithfully represent an integer smaller than 0");
      if (t > Number.MAX_SAFE_INTEGER)
        throw new Error("WrapAroundUnsignedInt: cannot faithfully represent an integer bigger than MAX_SAFE_INTEGER.");
      this.maxSize = t, this.clamp();
    }
    /** Manually clamp the given containing value according to the wrap around max size bounds. Use
     * this after out of bounds modification to the contained value by external code. */
    clamp() {
      for (; this.value > this.maxSize; )
        this.value -= this.maxSize + 1;
      for (; this.value < 0; )
        this.value += this.maxSize + 1;
    }
    clone() {
      return new Ve(this.value, this.maxSize);
    }
    /** When called, maps the containing value to a new containing value. After mapping, the wrap
     * around external max size bounds are applied. Note that this is a mutative operation. */
    update(e) {
      this.value = e(this.value), this.clamp();
    }
    /** Increments the given `n` to the inner value. Note that this is a mutative operation. */
    increment() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
      this.update((t) => t + e);
    }
    /** Decrements the given `n` from the inner value. Note that this is a mutative operation. */
    decrement() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
      this.update((t) => t - e);
    }
    getThenIncrement() {
      const e = this.value;
      return this.increment(), new Ve(e, this.maxSize);
    }
    /** Returns true if {@link this} is before the passed other {@link WrapAroundUnsignedInt}. */
    isBefore(e) {
      const t = this.value >>> 0, s = (e.value >>> 0) - t >>> 0;
      return s !== 0 && s < this.maxSize + 1;
    }
  }
  class Wt {
    static fromRtpTicks(e) {
      return new Wt(e, 9e4);
    }
    /** Generates a timestamp initialized to a non cryptographically secure random value, so that
     * different streams are more difficult to correlate in packet capture. */
    static rtpRandom() {
      const e = Math.round(Math.random() * yc);
      return Wt.fromRtpTicks(e);
    }
    constructor(e, t) {
      this.timestamp = Ve.u32(e), this.rateInHz = t;
    }
    asTicks() {
      return this.timestamp.value;
    }
    clone() {
      return new Wt(this.timestamp.value, this.rateInHz);
    }
    wrappingAdd(e) {
      this.timestamp.increment(e);
    }
    /** Returns true if {@link this} is before the passed other {@link DataTrackTimestamp}. */
    isBefore(e) {
      return this.timestamp.isBefore(e.timestamp);
    }
  }
  class kt {
    constructor(e, t, n) {
      this.epoch = t, this.base = n, this.previous = n.clone(), this.rateInHz = e;
    }
    static startingNow(e, t) {
      return new kt(t, /* @__PURE__ */ new Date(), e);
    }
    static startingAtTime(e, t, n) {
      return new kt(n, e, t);
    }
    static rtpStartingNow(e) {
      return kt.startingNow(e, 9e4);
    }
    static rtpStartingAtTime(e, t) {
      return kt.startingAtTime(e, t, 9e4);
    }
    now() {
      return this.at(/* @__PURE__ */ new Date());
    }
    at(e) {
      let t = e.getTime() - this.epoch.getTime(), n = kt.durationInMsToTicks(t, this.rateInHz), s = this.base.clone();
      return s.wrappingAdd(n), s.isBefore(this.previous) && (s = this.previous), this.previous = s.clone(), s.clone();
    }
    /** Convert a duration since the epoch into clock ticks. */
    static durationInMsToTicks(e, t) {
      let s = (e * 1e6 * t + 5e8) / 1e9;
      return Math.round(s);
    }
  }
  function $s(i) {
    if (i instanceof DataView)
      return i;
    if (i instanceof ArrayBuffer)
      return new DataView(i);
    if (i instanceof Uint8Array)
      return new DataView(i.buffer, i.byteOffset, i.byteLength);
    throw new Error("Error coercing ".concat(i, " to DataView - input was not DataView, ArrayBuffer, or Uint8Array."));
  }
  var Rt;
  (function(i) {
    i[i.Reserved = 0] = "Reserved", i[i.TooLarge = 1] = "TooLarge";
  })(Rt || (Rt = {}));
  class zt extends Oe {
    constructor(e, t) {
      super(19, e), this.name = "DataTrackHandleError", this.reason = t, this.reasonName = Rt[t];
    }
    isReason(e) {
      return this.reason === e;
    }
    static tooLarge() {
      return new zt("Value too large to be a valid track handle", Rt.TooLarge);
    }
    static reserved(e) {
      return new zt("0x".concat(e.toString(16), " is a reserved value."), Rt.Reserved);
    }
  }
  const ah = {
    fromNumber(i) {
      if (i === 0)
        throw zt.reserved(i);
      if (i > Xs)
        throw zt.tooLarge();
      return i;
    }
  };
  class oh {
    constructor() {
      this.value = 0;
    }
    /** Returns a unique track handle for the next publication, if one can be obtained. */
    get() {
      return this.value += 1, this.value > Xs ? null : this.value;
    }
  }
  const ei = {
    from(i) {
      return {
        sid: i.sid,
        pubHandle: i.pubHandle,
        name: i.name,
        usesE2ee: i.encryption !== J.NONE
      };
    },
    toProtobuf(i) {
      return new ri({
        sid: i.sid,
        pubHandle: i.pubHandle,
        name: i.name,
        encryption: i.usesE2ee ? J.GCM : J.NONE
      });
    }
  };
  var cn;
  (function(i) {
    i[i.WAITING = 0] = "WAITING", i[i.RUNNING = 1] = "RUNNING", i[i.COMPLETED = 2] = "COMPLETED";
  })(cn || (cn = {}));
  class ch {
    constructor() {
      this.pendingTasks = /* @__PURE__ */ new Map(), this.taskMutex = new ce(), this.nextTaskIndex = 0;
    }
    run(e) {
      return m(this, void 0, void 0, function* () {
        const t = {
          id: this.nextTaskIndex++,
          enqueuedAt: Date.now(),
          status: cn.WAITING
        };
        this.pendingTasks.set(t.id, t);
        const n = yield this.taskMutex.lock();
        try {
          return t.executedAt = Date.now(), t.status = cn.RUNNING, yield e();
        } finally {
          t.status = cn.COMPLETED, this.pendingTasks.delete(t.id), n();
        }
      });
    }
    flush() {
      return m(this, void 0, void 0, function* () {
        return this.run(() => m(this, void 0, void 0, function* () {
        }));
      });
    }
    snapshot() {
      return Array.from(this.pendingTasks.values());
    }
  }
  class dh {
    get readyState() {
      return this.ws.readyState;
    }
    constructor(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var n, s;
      if (!((n = t.signal) === null || n === void 0) && n.aborted)
        throw new DOMException("This operation was aborted", "AbortError");
      this.url = e;
      const r = new WebSocket(e, (s = t.protocols) !== null && s !== void 0 ? s : []);
      r.binaryType = "arraybuffer", this.ws = r;
      const a = function() {
        let {
          closeCode: o,
          reason: d
        } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return r.close(o, d);
      };
      this.opened = new ue((o, d) => {
        const c = () => {
          d(L.websocket("Encountered websocket error during connection establishment"));
        };
        r.onopen = () => {
          o({
            readable: new ReadableStream({
              start(l) {
                r.onmessage = (u) => {
                  let {
                    data: h
                  } = u;
                  return l.enqueue(h);
                }, r.onerror = (u) => l.error(u);
              },
              cancel: a
            }),
            writable: new WritableStream({
              write(l) {
                r.send(l);
              },
              abort() {
                r.close();
              },
              close: a
            }),
            protocol: r.protocol,
            extensions: r.extensions
          }), r.removeEventListener("error", c);
        }, r.addEventListener("error", c);
      }), this.closed = new ue((o, d) => {
        const c = () => m(this, void 0, void 0, function* () {
          const l = new ue((h) => {
            r.readyState !== WebSocket.CLOSED && r.addEventListener("close", (f) => {
              h(f);
            }, {
              once: true
            });
          }), u = yield ue.race([he(250), l]);
          u ? o(u) : d(L.websocket("Encountered unspecified websocket error without a timely close event"));
        });
        r.onclose = (l) => {
          let {
            code: u,
            reason: h
          } = l;
          o({
            closeCode: u,
            reason: h
          }), r.removeEventListener("error", c);
        }, r.addEventListener("error", c);
      }), t.signal && (t.signal.onabort = () => r.close()), this.close = a;
    }
  }
  const lh = ["syncState", "trickle", "offer", "answer", "simulate", "leave"];
  function uh(i) {
    const e = lh.indexOf(i.case) >= 0;
    return U.trace("request allowed to bypass queue:", {
      canPass: e,
      req: i
    }), e;
  }
  var K;
  (function(i) {
    i[i.CONNECTING = 0] = "CONNECTING", i[i.CONNECTED = 1] = "CONNECTED", i[i.RECONNECTING = 2] = "RECONNECTING", i[i.DISCONNECTING = 3] = "DISCONNECTING", i[i.DISCONNECTED = 4] = "DISCONNECTED";
  })(K || (K = {}));
  const hh = 250;
  class Zs {
    get currentState() {
      return this.state;
    }
    get isDisconnected() {
      return this.state === K.DISCONNECTING || this.state === K.DISCONNECTED;
    }
    get isEstablishingConnection() {
      return this.state === K.CONNECTING || this.state === K.RECONNECTING;
    }
    getNextRequestId() {
      return this._requestId += 1, this._requestId;
    }
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var n;
      this.rtt = 0, this.state = K.DISCONNECTED, this.log = U, this._requestId = 0, this.useV0SignalPath = false, this.resetCallbacks = () => {
        this.onAnswer = void 0, this.onLeave = void 0, this.onLocalTrackPublished = void 0, this.onLocalTrackUnpublished = void 0, this.onNegotiateRequested = void 0, this.onOffer = void 0, this.onRemoteMuteChanged = void 0, this.onSubscribedQualityUpdate = void 0, this.onTokenRefresh = void 0, this.onTrickle = void 0, this.onClose = void 0, this.onMediaSectionsRequirement = void 0;
      }, this.log = Ee((n = t.loggerName) !== null && n !== void 0 ? n : fe.Signal), this.loggerContextCb = t.loggerContextCb, this.useJSON = e, this.requestQueue = new ch(), this.queuedRequests = [], this.closingLock = new ce(), this.connectionLock = new ce(), this.state = K.DISCONNECTED;
    }
    get logContext() {
      var e, t;
      return (t = (e = this.loggerContextCb) === null || e === void 0 ? void 0 : e.call(this)) !== null && t !== void 0 ? t : {};
    }
    join(e, t, n, s) {
      return m(this, arguments, void 0, function(r, a, o, d) {
        var c = this;
        let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false, u = arguments.length > 5 ? arguments[5] : void 0;
        return (function* () {
          return c.state = K.CONNECTING, c.options = o, yield c.connect(r, a, o, d, l, u);
        })();
      });
    }
    reconnect(e, t, n, s) {
      return m(this, void 0, void 0, function* () {
        if (!this.options) {
          this.log.warn("attempted to reconnect without signal options being set, ignoring", this.logContext);
          return;
        }
        return this.state = K.RECONNECTING, this.clearPingInterval(), yield this.connect(e, t, Object.assign(Object.assign({}, this.options), {
          reconnect: true,
          sid: n,
          reconnectReason: s
        }), void 0, this.useV0SignalPath);
      });
    }
    connect(e, t, n, s) {
      return m(this, arguments, void 0, function(r, a, o, d) {
        var c = this;
        let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false, u = arguments.length > 5 ? arguments[5] : void 0;
        return (function* () {
          const h = yield c.connectionLock.lock();
          c.connectOptions = o, c.useV0SignalPath = l;
          const f = xu(), v = l ? fh(a, f, o) : yield mh(a, f, o, u), g = Wu(r, v, l).toString(), T = Ku(g).toString();
          return new Promise((k, w) => m(c, void 0, void 0, function* () {
            var O, b;
            try {
              let y = !1;
              const S = (A) => m(this, void 0, void 0, function* () {
                if (y)
                  return;
                y = !0;
                const F = A instanceof Event ? A.currentTarget : A, te = Gu(F, "Abort handler called");
                this.streamWriter && !this.isDisconnected ? this.sendLeave().then(() => this.close(te)).catch((de) => {
                  this.log.error(de), this.close();
                }) : this.close(), M(), w(L.cancelled(te));
              });
              d == null || d.addEventListener("abort", S);
              const M = () => {
                clearTimeout(D), d == null || d.removeEventListener("abort", S);
              }, D = setTimeout(() => {
                S(L.timeout("room connection has timed out (signal)"));
              }, o.websocketTimeout), x = (A, F) => {
                this.handleSignalConnected(A, D, F);
              }, N = new URL(g);
              N.searchParams.has("access_token") && N.searchParams.set("access_token", "<redacted>"), this.log.debug("connecting to ".concat(N), Object.assign({
                reconnect: o.reconnect,
                reconnectReason: o.reconnectReason
              }, this.logContext)), this.ws && (yield this.close(!1)), this.ws = new dh(g);
              try {
                this.ws.closed.then((me) => {
                  var Xe;
                  this.isEstablishingConnection && w(L.internal("Websocket got closed during a (re)connection attempt: ".concat(me.reason))), me.closeCode !== 1e3 && (this.log.warn("websocket closed", Object.assign(Object.assign({}, this.logContext), {
                    reason: me.reason,
                    code: me.closeCode,
                    wasClean: me.closeCode === 1e3,
                    state: this.state
                  })), this.state === K.CONNECTED && this.handleOnClose((Xe = me.reason) !== null && Xe !== void 0 ? Xe : "Unexpected WS error"));
                }).catch((me) => {
                  this.isEstablishingConnection && w(L.internal("Websocket error during a (re)connection attempt: ".concat(me)));
                });
                const A = yield this.ws.opened.catch((me) => m(this, void 0, void 0, function* () {
                  if (this.state !== K.CONNECTED) {
                    this.state = K.DISCONNECTED, clearTimeout(D);
                    const Xe = yield this.handleConnectionError(me, T);
                    w(Xe);
                    return;
                  }
                  this.handleWSError(me), w(me);
                }));
                if (clearTimeout(D), !A)
                  return;
                const F = A.readable.getReader();
                this.streamWriter = A.writable.getWriter();
                const te = yield F.read();
                if (F.releaseLock(), !te.value)
                  throw L.internal("no message received as first message");
                const de = zr(te.value), He = this.validateFirstMessage(de, (O = o.reconnect) !== null && O !== void 0 ? O : !1);
                if (!He.isValid) {
                  w(He.error);
                  return;
                }
                ((b = de.message) === null || b === void 0 ? void 0 : b.case) === "join" && (this.pingTimeoutDuration = de.message.value.pingTimeout, this.pingIntervalDuration = de.message.value.pingInterval, this.pingTimeoutDuration && this.pingTimeoutDuration > 0 && this.log.debug("ping config", Object.assign(Object.assign({}, this.logContext), {
                  timeout: this.pingTimeoutDuration,
                  interval: this.pingIntervalDuration
                })), this.onJoined && this.onJoined(de.message.value));
                const Pn = He.shouldProcessFirstMessage ? de : void 0;
                x(A, Pn), k(He.response);
              } catch (A) {
                w(A);
              } finally {
                M();
              }
            } finally {
              h();
            }
          }));
        })();
      });
    }
    startReadingLoop(e, t) {
      return m(this, void 0, void 0, function* () {
        for (t && this.handleSignalResponse(t); ; ) {
          this.signalLatency && (yield he(this.signalLatency));
          const {
            done: n,
            value: s
          } = yield e.read();
          if (n)
            break;
          const r = zr(s);
          this.handleSignalResponse(r);
        }
      });
    }
    close() {
      return m(this, arguments, void 0, function() {
        var e = this;
        let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Close method called on signal client";
        return (function* () {
          if ([K.DISCONNECTING || K.DISCONNECTED].includes(e.state)) {
            e.log.debug("ignoring signal close as it's already in disconnecting state");
            return;
          }
          const s = yield e.closingLock.lock();
          try {
            if (e.clearPingInterval(), t && (e.state = K.DISCONNECTING), e.ws) {
              e.ws.close({
                closeCode: 1e3,
                reason: n
              });
              const r = e.ws.closed;
              e.ws = void 0, e.streamWriter = void 0, yield Promise.race([r, he(hh)]);
            }
          } catch (r) {
            e.log.debug("websocket error while closing", Object.assign(Object.assign({}, e.logContext), {
              error: r
            }));
          } finally {
            t && (e.state = K.DISCONNECTED), s();
          }
        })();
      });
    }
    // initial offer after joining
    sendOffer(e, t) {
      this.log.debug("sending offer", Object.assign(Object.assign({}, this.logContext), {
        offerSdp: e.sdp
      })), this.sendRequest({
        case: "offer",
        value: Tt(e, t)
      });
    }
    // answer a server-initiated offer
    sendAnswer(e, t) {
      return this.log.debug("sending answer", Object.assign(Object.assign({}, this.logContext), {
        answerSdp: e.sdp
      })), this.sendRequest({
        case: "answer",
        value: Tt(e, t)
      });
    }
    sendIceCandidate(e, t) {
      return this.log.debug("sending ice candidate", Object.assign(Object.assign({}, this.logContext), {
        candidate: e
      })), this.sendRequest({
        case: "trickle",
        value: new ai({
          candidateInit: JSON.stringify(e),
          target: t
        })
      });
    }
    sendMuteTrack(e, t) {
      return this.sendRequest({
        case: "mute",
        value: new oi({
          sid: e,
          muted: t
        })
      });
    }
    sendAddTrack(e) {
      return this.sendRequest({
        case: "addTrack",
        value: e
      });
    }
    sendUpdateLocalMetadata(e, t) {
      return m(this, arguments, void 0, function(n, s) {
        var r = this;
        let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return (function* () {
          const o = r.getNextRequestId();
          return yield r.sendRequest({
            case: "updateMetadata",
            value: new Vs({
              requestId: o,
              metadata: n,
              name: s,
              attributes: a
            })
          }), o;
        })();
      });
    }
    sendUpdateTrackSettings(e) {
      this.sendRequest({
        case: "trackSetting",
        value: e
      });
    }
    sendUpdateSubscription(e) {
      return this.sendRequest({
        case: "subscription",
        value: e
      });
    }
    sendSyncState(e) {
      return this.sendRequest({
        case: "syncState",
        value: e
      });
    }
    sendUpdateVideoLayers(e, t) {
      return this.sendRequest({
        case: "updateLayers",
        value: new go({
          trackSid: e,
          layers: t
        })
      });
    }
    sendUpdateSubscriptionPermissions(e, t) {
      return this.sendRequest({
        case: "subscriptionPermission",
        value: new yo({
          allParticipants: e,
          trackPermissions: t
        })
      });
    }
    sendSimulateScenario(e) {
      return this.sendRequest({
        case: "simulate",
        value: e
      });
    }
    sendPing() {
      return Promise.all([this.sendRequest({
        case: "ping",
        value: Y.parse(Date.now())
      }), this.sendRequest({
        case: "pingReq",
        value: new So({
          timestamp: Y.parse(Date.now()),
          rtt: Y.parse(this.rtt)
        })
      })]);
    }
    sendUpdateLocalAudioTrack(e, t) {
      return this.sendRequest({
        case: "updateAudioTrack",
        value: new qs({
          trackSid: e,
          features: t
        })
      });
    }
    sendLeave() {
      return this.sendRequest({
        case: "leave",
        value: new di({
          reason: qe.CLIENT_INITIATED,
          // server doesn't process this field, keeping it here to indicate the intent of a full disconnect
          action: Bt.DISCONNECT
        })
      });
    }
    sendPublishDataTrackRequest(e, t, n) {
      return this.sendRequest({
        case: "publishDataTrackRequest",
        value: new Us({
          pubHandle: e,
          name: t,
          encryption: n ? J.GCM : J.NONE
        })
      });
    }
    sendUnPublishDataTrackRequest(e) {
      return this.sendRequest({
        case: "unpublishDataTrackRequest",
        value: new Bs({
          pubHandle: e
        })
      });
    }
    sendUpdateDataSubscription(e, t) {
      return this.sendRequest({
        case: "updateDataSubscription",
        value: new ho({
          // FIXME: consider refactoring to allow caller to pass an array of events through
          updates: [new fo({
            trackSid: e,
            subscribe: t
          })]
        })
      });
    }
    sendRequest(e) {
      return m(this, arguments, void 0, function(t) {
        var n = this;
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        return (function* () {
          if (!s && !uh(t) && n.state === K.RECONNECTING) {
            n.queuedRequests.push(() => m(n, void 0, void 0, function* () {
              yield this.sendRequest(t, true);
            }));
            return;
          }
          if (s || (yield n.requestQueue.flush()), n.signalLatency && (yield he(n.signalLatency)), n.isDisconnected) {
            n.log.debug("skipping signal request (type: ".concat(t.case, ") - SignalClient disconnected"));
            return;
          }
          if (!n.streamWriter) {
            n.log.error("cannot send signal request before connected, type: ".concat(t == null ? void 0 : t.case), n.logContext);
            return;
          }
          const a = new il({
            message: t
          });
          try {
            n.useJSON ? yield n.streamWriter.write(a.toJsonString()) : yield n.streamWriter.write(a.toBinary());
          } catch (o) {
            n.log.error("error sending signal message", Object.assign(Object.assign({}, n.logContext), {
              error: o
            }));
          }
        })();
      });
    }
    handleSignalResponse(e) {
      var t, n;
      const s = e.message;
      if (s == null) {
        this.log.debug("received unsupported message", this.logContext);
        return;
      }
      let r = false;
      if (s.case === "answer") {
        const a = $r(s.value);
        this.onAnswer && this.onAnswer(a, s.value.id, s.value.midToTrackId);
      } else if (s.case === "offer") {
        const a = $r(s.value);
        this.onOffer && this.onOffer(a, s.value.id, s.value.midToTrackId);
      } else if (s.case === "trickle") {
        const a = JSON.parse(s.value.candidateInit);
        this.onTrickle && this.onTrickle(a, s.value.target);
      } else s.case === "update" ? this.onParticipantUpdate && this.onParticipantUpdate((t = s.value.participants) !== null && t !== void 0 ? t : []) : s.case === "trackPublished" ? this.onLocalTrackPublished && this.onLocalTrackPublished(s.value) : s.case === "speakersChanged" ? this.onSpeakersChanged && this.onSpeakersChanged((n = s.value.speakers) !== null && n !== void 0 ? n : []) : s.case === "leave" ? this.onLeave && this.onLeave(s.value) : s.case === "mute" ? this.onRemoteMuteChanged && this.onRemoteMuteChanged(s.value.sid, s.value.muted) : s.case === "roomUpdate" ? this.onRoomUpdate && s.value.room && this.onRoomUpdate(s.value.room) : s.case === "connectionQuality" ? this.onConnectionQuality && this.onConnectionQuality(s.value) : s.case === "streamStateUpdate" ? this.onStreamStateUpdate && this.onStreamStateUpdate(s.value) : s.case === "subscribedQualityUpdate" ? this.onSubscribedQualityUpdate && this.onSubscribedQualityUpdate(s.value) : s.case === "subscriptionPermissionUpdate" ? this.onSubscriptionPermissionUpdate && this.onSubscriptionPermissionUpdate(s.value) : s.case === "refreshToken" ? this.onTokenRefresh && this.onTokenRefresh(s.value) : s.case === "trackUnpublished" ? this.onLocalTrackUnpublished && this.onLocalTrackUnpublished(s.value) : s.case === "subscriptionResponse" ? this.onSubscriptionError && this.onSubscriptionError(s.value) : s.case === "pong" || (s.case === "pongResp" ? (this.rtt = Date.now() - Number.parseInt(s.value.lastPingTimestamp.toString()), this.resetPingTimeout(), r = true) : s.case === "requestResponse" ? this.onRequestResponse && this.onRequestResponse(s.value) : s.case === "trackSubscribed" ? this.onLocalTrackSubscribed && this.onLocalTrackSubscribed(s.value.trackSid) : s.case === "roomMoved" ? (this.onTokenRefresh && this.onTokenRefresh(s.value.token), this.onRoomMoved && this.onRoomMoved(s.value)) : s.case === "mediaSectionsRequirement" ? this.onMediaSectionsRequirement && this.onMediaSectionsRequirement(s.value) : s.case === "publishDataTrackResponse" ? this.onPublishDataTrackResponse && this.onPublishDataTrackResponse(s.value) : s.case === "unpublishDataTrackResponse" ? this.onUnPublishDataTrackResponse && this.onUnPublishDataTrackResponse(s.value) : s.case === "dataTrackSubscriberHandles" ? this.onDataTrackSubscriberHandles && this.onDataTrackSubscriberHandles(s.value) : this.log.debug("unsupported message", Object.assign(Object.assign({}, this.logContext), {
        msgCase: s.case
      })));
      r || this.resetPingTimeout();
    }
    setReconnected() {
      for (; this.queuedRequests.length > 0; ) {
        const e = this.queuedRequests.shift();
        e && this.requestQueue.run(e);
      }
    }
    handleOnClose(e) {
      return m(this, void 0, void 0, function* () {
        if (this.state === K.DISCONNECTED) return;
        const t = this.onClose;
        yield this.close(void 0, e), this.log.debug("websocket connection closed: ".concat(e), Object.assign(Object.assign({}, this.logContext), {
          reason: e
        })), t && t(e);
      });
    }
    handleWSError(e) {
      this.log.error("websocket error", Object.assign(Object.assign({}, this.logContext), {
        error: e
      }));
    }
    /**
     * Resets the ping timeout and starts a new timeout.
     * Call this after receiving a pong message
     */
    resetPingTimeout() {
      if (this.clearPingTimeout(), !this.pingTimeoutDuration) {
        this.log.warn("ping timeout duration not set", this.logContext);
        return;
      }
      this.pingTimeout = se.setTimeout(() => {
        this.log.warn("ping timeout triggered. last pong received at: ".concat(new Date(Date.now() - this.pingTimeoutDuration * 1e3).toUTCString()), this.logContext), this.handleOnClose("ping timeout");
      }, this.pingTimeoutDuration * 1e3);
    }
    /**
     * Clears ping timeout (does not start a new timeout)
     */
    clearPingTimeout() {
      this.pingTimeout && se.clearTimeout(this.pingTimeout);
    }
    startPingInterval() {
      if (this.clearPingInterval(), this.resetPingTimeout(), !this.pingIntervalDuration) {
        this.log.warn("ping interval duration not set", this.logContext);
        return;
      }
      this.log.debug("start ping interval", this.logContext), this.pingInterval = se.setInterval(() => {
        this.sendPing();
      }, this.pingIntervalDuration * 1e3);
    }
    clearPingInterval() {
      this.log.debug("clearing ping interval", this.logContext), this.clearPingTimeout(), this.pingInterval && se.clearInterval(this.pingInterval);
    }
    /**
     * Handles the successful connection to the signal server
     * @param connection The WebSocket connection
     * @param timeoutHandle The timeout handle to clear
     * @param firstMessage Optional first message to process
     * @internal
     */
    handleSignalConnected(e, t, n) {
      this.state = K.CONNECTED, clearTimeout(t), this.startPingInterval(), this.startReadingLoop(e.readable.getReader(), n);
    }
    /**
     * Validates the first message received from the signal server
     * @param firstSignalResponse The first signal response received
     * @param isReconnect Whether this is a reconnection attempt
     * @returns Validation result with response or error
     * @internal
     */
    validateFirstMessage(e, t) {
      var n, s, r, a, o;
      return ((n = e.message) === null || n === void 0 ? void 0 : n.case) === "join" ? {
        isValid: true,
        response: e.message.value
      } : this.state === K.RECONNECTING && ((s = e.message) === null || s === void 0 ? void 0 : s.case) !== "leave" ? ((r = e.message) === null || r === void 0 ? void 0 : r.case) === "reconnect" ? {
        isValid: true,
        response: e.message.value
      } : (this.log.debug("declaring signal reconnected without reconnect response received", this.logContext), {
        isValid: true,
        response: void 0,
        shouldProcessFirstMessage: true
      }) : this.isEstablishingConnection && ((a = e.message) === null || a === void 0 ? void 0 : a.case) === "leave" ? {
        isValid: false,
        error: L.leaveRequest("Received leave request while trying to (re)connect", e.message.value.reason)
      } : t ? {
        isValid: false,
        error: L.internal("Unexpected first message")
      } : {
        isValid: false,
        error: L.internal("did not receive join response, got ".concat((o = e.message) === null || o === void 0 ? void 0 : o.case, " instead"))
      };
    }
    /**
     * Handles WebSocket connection errors by validating with the server
     * @param reason The error that occurred
     * @param validateUrl The URL to validate the connection with
     * @returns A ConnectionError with appropriate reason and status
     * @internal
     */
    handleConnectionError(e, t) {
      return m(this, void 0, void 0, function* () {
        try {
          const n = yield fetch(t);
          switch (n.status) {
            case 404:
              return L.serviceNotFound("v1 RTC path not found. Consider upgrading your LiveKit server version", "v0-rtc");
            case 401:
            case 403:
              const s = yield n.text();
              return L.notAllowed(s, n.status);
            default:
              break;
          }
          return e instanceof L ? e : L.internal("Encountered unknown websocket error during connection: ".concat(e), {
            status: n.status,
            statusText: n.statusText
          });
        } catch (n) {
          return n instanceof L ? n : L.serverUnreachable(n instanceof Error ? n.message : "server was not reachable");
        }
      });
    }
  }
  function $r(i) {
    const e = {
      type: "offer",
      sdp: i.sdp
    };
    switch (i.type) {
      case "answer":
      case "offer":
      case "pranswer":
      case "rollback":
        e.type = i.type;
        break;
    }
    return e;
  }
  function Tt(i, e) {
    return new mt({
      sdp: i.sdp,
      type: i.type,
      id: e
    });
  }
  function fh(i, e, t) {
    var n;
    const s = new URLSearchParams();
    return s.set("access_token", i), t.reconnect && (s.set("reconnect", "1"), t.sid && s.set("sid", t.sid)), s.set("auto_subscribe", t.autoSubscribe ? "1" : "0"), s.set("sdk", Ye() ? "reactnative" : "js"), s.set("version", e.version), s.set("protocol", e.protocol.toString()), e.deviceModel && s.set("device_model", e.deviceModel), e.os && s.set("os", e.os), e.osVersion && s.set("os_version", e.osVersion), e.browser && s.set("browser", e.browser), e.browserVersion && s.set("browser_version", e.browserVersion), t.adaptiveStream && s.set("adaptive_stream", "1"), t.reconnectReason && s.set("reconnect_reason", t.reconnectReason.toString()), !((n = navigator.connection) === null || n === void 0) && n.type && s.set("network", navigator.connection.type), s;
  }
  function mh(i, e, t, n) {
    return m(this, void 0, void 0, function* () {
      const s = new URLSearchParams();
      s.set("access_token", i);
      const r = new Rl({
        clientInfo: e,
        connectionSettings: new Co({
          autoSubscribe: !!t.autoSubscribe,
          adaptiveStream: !!t.adaptiveStream
        }),
        reconnect: !!t.reconnect,
        participantSid: t.sid ? t.sid : void 0,
        publisherOffer: n
      });
      t.reconnectReason && (r.reconnectReason = t.reconnectReason);
      const a = r.toBinary();
      let o, d;
      if (ks()) {
        const h = new CompressionStream("gzip"), f = h.writable.getWriter();
        f.write(new Uint8Array(a)), f.close();
        const v = [], g = h.readable.getReader();
        for (; ; ) {
          const {
            done: O,
            value: b
          } = yield g.read();
          if (O) break;
          v.push(b);
        }
        const T = v.reduce((O, b) => O + b.length, 0), k = new Uint8Array(T);
        let w = 0;
        for (const O of v)
          k.set(O, w), w += O.length;
        o = k, d = is.GZIP;
      } else
        o = a, d = is.NONE;
      const l = new Il({
        joinRequest: o,
        compression: d
      }).toBinary(), u = (h) => {
        const f = Array.from(h, (v) => String.fromCodePoint(v)).join("");
        return btoa(f);
      };
      return s.set("join_request", u(l).replace(/\+/g, "-").replace(/\//g, "_")), s;
    });
  }
  class Zr {
    constructor() {
      this.buffer = [], this._totalSize = 0;
    }
    push(e) {
      this.buffer.push(e), this._totalSize += e.data.byteLength;
    }
    pop() {
      const e = this.buffer.shift();
      return e && (this._totalSize -= e.data.byteLength), e;
    }
    getAll() {
      return this.buffer.slice();
    }
    popToSequence(e) {
      for (; this.buffer.length > 0 && this.buffer[0].sequence <= e; )
        this.pop();
    }
    alignBufferedAmount(e) {
      for (; this.buffer.length > 0; ) {
        const t = this.buffer[0];
        if (this._totalSize - t.data.byteLength <= e)
          break;
        this.pop();
      }
    }
    get length() {
      return this.buffer.length;
    }
  }
  class ph {
    /**
     * @param ttl ttl of the key (ms)
     */
    constructor(e) {
      this._map = /* @__PURE__ */ new Map(), this._lastCleanup = 0, this.ttl = e;
    }
    set(e, t) {
      const n = Date.now();
      n - this._lastCleanup > this.ttl / 2 && this.cleanup();
      const s = n + this.ttl;
      return this._map.set(e, {
        value: t,
        expiresAt: s
      }), this;
    }
    get(e) {
      const t = this._map.get(e);
      if (t) {
        if (t.expiresAt < Date.now()) {
          this._map.delete(e);
          return;
        }
        return t.value;
      }
    }
    has(e) {
      const t = this._map.get(e);
      return t ? t.expiresAt < Date.now() ? (this._map.delete(e), false) : true : false;
    }
    delete(e) {
      return this._map.delete(e);
    }
    clear() {
      this._map.clear();
    }
    cleanup() {
      const e = Date.now();
      for (const [t, n] of this._map.entries())
        n.expiresAt < e && this._map.delete(t);
      this._lastCleanup = e;
    }
    get size() {
      return this.cleanup(), this._map.size;
    }
    forEach(e) {
      this.cleanup();
      for (const [t, n] of this._map.entries())
        n.expiresAt >= Date.now() && e(n.value, t, this.asValueMap());
    }
    map(e) {
      this.cleanup();
      const t = [], n = this.asValueMap();
      for (const [s, r] of n.entries())
        t.push(e(r, s, n));
      return t;
    }
    asValueMap() {
      const e = /* @__PURE__ */ new Map();
      for (const [t, n] of this._map.entries())
        n.expiresAt >= Date.now() && e.set(t, n.value);
      return e;
    }
  }
  var Me = {}, Wi = {}, Hi = { exports: {} }, ea;
  function er() {
    if (ea) return Hi.exports;
    ea = 1;
    var i = Hi.exports = {
      v: [{
        name: "version",
        reg: /^(\d*)$/
      }],
      o: [{
        // o=- 20518 0 IN IP4 203.0.113.1
        // NB: sessionId will be a String in most cases because it is huge
        name: "origin",
        reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
        names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
        format: "%s %s %d %s IP%d %s"
      }],
      // default parsing of these only (though some of these feel outdated)
      s: [{
        name: "name"
      }],
      i: [{
        name: "description"
      }],
      u: [{
        name: "uri"
      }],
      e: [{
        name: "email"
      }],
      p: [{
        name: "phone"
      }],
      z: [{
        name: "timezones"
      }],
      // TODO: this one can actually be parsed properly...
      r: [{
        name: "repeats"
      }],
      // TODO: this one can also be parsed properly
      // k: [{}], // outdated thing ignored
      t: [{
        // t=0 0
        name: "timing",
        reg: /^(\d*) (\d*)/,
        names: ["start", "stop"],
        format: "%d %d"
      }],
      c: [{
        // c=IN IP4 10.47.197.26
        name: "connection",
        reg: /^IN IP(\d) (\S*)/,
        names: ["version", "ip"],
        format: "IN IP%d %s"
      }],
      b: [{
        // b=AS:4000
        push: "bandwidth",
        reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
        names: ["type", "limit"],
        format: "%s:%s"
      }],
      m: [{
        // m=video 51744 RTP/AVP 126 97 98 34 31
        // NB: special - pushes to session
        // TODO: rtp/fmtp should be filtered by the payloads found here?
        reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
        names: ["type", "port", "protocol", "payloads"],
        format: "%s %d %s %s"
      }],
      a: [
        {
          // a=rtpmap:110 opus/48000/2
          push: "rtp",
          reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
          names: ["payload", "codec", "rate", "encoding"],
          format: function(e) {
            return e.encoding ? "rtpmap:%d %s/%s/%s" : e.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
          }
        },
        {
          // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
          // a=fmtp:111 minptime=10; useinbandfec=1
          push: "fmtp",
          reg: /^fmtp:(\d*) ([\S| ]*)/,
          names: ["payload", "config"],
          format: "fmtp:%d %s"
        },
        {
          // a=control:streamid=0
          name: "control",
          reg: /^control:(.*)/,
          format: "control:%s"
        },
        {
          // a=rtcp:65179 IN IP4 193.84.77.194
          name: "rtcp",
          reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
          names: ["port", "netType", "ipVer", "address"],
          format: function(e) {
            return e.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
          }
        },
        {
          // a=rtcp-fb:98 trr-int 100
          push: "rtcpFbTrrInt",
          reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
          names: ["payload", "value"],
          format: "rtcp-fb:%s trr-int %d"
        },
        {
          // a=rtcp-fb:98 nack rpsi
          push: "rtcpFb",
          reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
          names: ["payload", "type", "subtype"],
          format: function(e) {
            return e.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
          }
        },
        {
          // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
          // a=extmap:1/recvonly URI-gps-string
          // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
          push: "ext",
          reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
          names: ["value", "direction", "encrypt-uri", "uri", "config"],
          format: function(e) {
            return "extmap:%d" + (e.direction ? "/%s" : "%v") + (e["encrypt-uri"] ? " %s" : "%v") + " %s" + (e.config ? " %s" : "");
          }
        },
        {
          // a=extmap-allow-mixed
          name: "extmapAllowMixed",
          reg: /^(extmap-allow-mixed)/
        },
        {
          // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
          push: "crypto",
          reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
          names: ["id", "suite", "config", "sessionConfig"],
          format: function(e) {
            return e.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
          }
        },
        {
          // a=setup:actpass
          name: "setup",
          reg: /^setup:(\w*)/,
          format: "setup:%s"
        },
        {
          // a=connection:new
          name: "connectionType",
          reg: /^connection:(new|existing)/,
          format: "connection:%s"
        },
        {
          // a=mid:1
          name: "mid",
          reg: /^mid:([^\s]*)/,
          format: "mid:%s"
        },
        {
          // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
          name: "msid",
          reg: /^msid:(.*)/,
          format: "msid:%s"
        },
        {
          // a=ptime:20
          name: "ptime",
          reg: /^ptime:(\d*(?:\.\d*)*)/,
          format: "ptime:%d"
        },
        {
          // a=maxptime:60
          name: "maxptime",
          reg: /^maxptime:(\d*(?:\.\d*)*)/,
          format: "maxptime:%d"
        },
        {
          // a=sendrecv
          name: "direction",
          reg: /^(sendrecv|recvonly|sendonly|inactive)/
        },
        {
          // a=ice-lite
          name: "icelite",
          reg: /^(ice-lite)/
        },
        {
          // a=ice-ufrag:F7gI
          name: "iceUfrag",
          reg: /^ice-ufrag:(\S*)/,
          format: "ice-ufrag:%s"
        },
        {
          // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
          name: "icePwd",
          reg: /^ice-pwd:(\S*)/,
          format: "ice-pwd:%s"
        },
        {
          // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
          name: "fingerprint",
          reg: /^fingerprint:(\S*) (\S*)/,
          names: ["type", "hash"],
          format: "fingerprint:%s %s"
        },
        {
          // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
          // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
          // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
          // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
          // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
          push: "candidates",
          reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
          names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
          format: function(e) {
            var t = "candidate:%s %d %s %d %s %d typ %s";
            return t += e.raddr != null ? " raddr %s rport %d" : "%v%v", t += e.tcptype != null ? " tcptype %s" : "%v", e.generation != null && (t += " generation %d"), t += e["network-id"] != null ? " network-id %d" : "%v", t += e["network-cost"] != null ? " network-cost %d" : "%v", t;
          }
        },
        {
          // a=end-of-candidates (keep after the candidates line for readability)
          name: "endOfCandidates",
          reg: /^(end-of-candidates)/
        },
        {
          // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
          name: "remoteCandidates",
          reg: /^remote-candidates:(.*)/,
          format: "remote-candidates:%s"
        },
        {
          // a=ice-options:google-ice
          name: "iceOptions",
          reg: /^ice-options:(\S*)/,
          format: "ice-options:%s"
        },
        {
          // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
          push: "ssrcs",
          reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
          names: ["id", "attribute", "value"],
          format: function(e) {
            var t = "ssrc:%d";
            return e.attribute != null && (t += " %s", e.value != null && (t += ":%s")), t;
          }
        },
        {
          // a=ssrc-group:FEC 1 2
          // a=ssrc-group:FEC-FR 3004364195 1080772241
          push: "ssrcGroups",
          // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
          reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
          names: ["semantics", "ssrcs"],
          format: "ssrc-group:%s %s"
        },
        {
          // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
          name: "msidSemantic",
          reg: /^msid-semantic:\s?(\w*) (\S*)/,
          names: ["semantic", "token"],
          format: "msid-semantic: %s %s"
          // space after ':' is not accidental
        },
        {
          // a=group:BUNDLE audio video
          push: "groups",
          reg: /^group:(\w*) (.*)/,
          names: ["type", "mids"],
          format: "group:%s %s"
        },
        {
          // a=rtcp-mux
          name: "rtcpMux",
          reg: /^(rtcp-mux)/
        },
        {
          // a=rtcp-rsize
          name: "rtcpRsize",
          reg: /^(rtcp-rsize)/
        },
        {
          // a=sctpmap:5000 webrtc-datachannel 1024
          name: "sctpmap",
          reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
          names: ["sctpmapNumber", "app", "maxMessageSize"],
          format: function(e) {
            return e.maxMessageSize != null ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
          }
        },
        {
          // a=x-google-flag:conference
          name: "xGoogleFlag",
          reg: /^x-google-flag:([^\s]*)/,
          format: "x-google-flag:%s"
        },
        {
          // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
          push: "rids",
          reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
          names: ["id", "direction", "params"],
          format: function(e) {
            return e.params ? "rid:%s %s %s" : "rid:%s %s";
          }
        },
        {
          // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
          // a=imageattr:* send [x=800,y=640] recv *
          // a=imageattr:100 recv [x=320,y=240]
          push: "imageattrs",
          reg: new RegExp(
            // a=imageattr:97
            "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
          ),
          names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
          format: function(e) {
            return "imageattr:%s %s %s" + (e.dir2 ? " %s %s" : "");
          }
        },
        {
          // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
          // a=simulcast:recv 1;4,5 send 6;7
          name: "simulcast",
          reg: new RegExp(
            // a=simulcast:
            "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"
          ),
          names: ["dir1", "list1", "dir2", "list2"],
          format: function(e) {
            return "simulcast:%s %s" + (e.dir2 ? " %s %s" : "");
          }
        },
        {
          // old simulcast draft 03 (implemented by Firefox)
          //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
          // a=simulcast: recv pt=97;98 send pt=97
          // a=simulcast: send rid=5;6;7 paused=6,7
          name: "simulcast_03",
          reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
          names: ["value"],
          format: "simulcast: %s"
        },
        {
          // a=framerate:25
          // a=framerate:29.97
          name: "framerate",
          reg: /^framerate:(\d+(?:$|\.\d+))/,
          format: "framerate:%s"
        },
        {
          // RFC4570
          // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
          name: "sourceFilter",
          reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
          names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
          format: "source-filter: %s %s %s %s %s"
        },
        {
          // a=bundle-only
          name: "bundleOnly",
          reg: /^(bundle-only)/
        },
        {
          // a=label:1
          name: "label",
          reg: /^label:(.+)/,
          format: "label:%s"
        },
        {
          // RFC version 26 for SCTP over DTLS
          // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
          name: "sctpPort",
          reg: /^sctp-port:(\d+)$/,
          format: "sctp-port:%s"
        },
        {
          // RFC version 26 for SCTP over DTLS
          // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
          name: "maxMessageSize",
          reg: /^max-message-size:(\d+)$/,
          format: "max-message-size:%s"
        },
        {
          // RFC7273
          // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
          push: "tsRefClocks",
          reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
          names: ["clksrc", "clksrcExt"],
          format: function(e) {
            return "ts-refclk:%s" + (e.clksrcExt != null ? "=%s" : "");
          }
        },
        {
          // RFC7273
          // a=mediaclk:direct=963214424
          name: "mediaClk",
          reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
          names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"],
          format: function(e) {
            var t = "mediaclk:";
            return t += e.id != null ? "id=%s %s" : "%v%s", t += e.mediaClockValue != null ? "=%s" : "", t += e.rateNumerator != null ? " rate=%s" : "", t += e.rateDenominator != null ? "/%s" : "", t;
          }
        },
        {
          // a=keywds:keywords
          name: "keywords",
          reg: /^keywds:(.+)$/,
          format: "keywds:%s"
        },
        {
          // a=content:main
          name: "content",
          reg: /^content:(.+)/,
          format: "content:%s"
        },
        // BFCP https://tools.ietf.org/html/rfc4583
        {
          // a=floorctrl:c-s
          name: "bfcpFloorCtrl",
          reg: /^floorctrl:(c-only|s-only|c-s)/,
          format: "floorctrl:%s"
        },
        {
          // a=confid:1
          name: "bfcpConfId",
          reg: /^confid:(\d+)/,
          format: "confid:%s"
        },
        {
          // a=userid:1
          name: "bfcpUserId",
          reg: /^userid:(\d+)/,
          format: "userid:%s"
        },
        {
          // a=floorid:1
          name: "bfcpFloorId",
          reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
          names: ["id", "mStream"],
          format: "floorid:%s mstrm:%s"
        },
        {
          // any a= that we don't understand is kept verbatim on media.invalid
          push: "invalid",
          names: ["value"]
        }
      ]
    };
    return Object.keys(i).forEach(function(e) {
      var t = i[e];
      t.forEach(function(n) {
        n.reg || (n.reg = /(.*)/), n.format || (n.format = "%s");
      });
    }), Hi.exports;
  }
  var ta;
  function gh() {
    return ta || (ta = 1, (function(i) {
      var e = function(o) {
        return String(Number(o)) === o ? Number(o) : o;
      }, t = function(o, d, c, l) {
        if (l && !c)
          d[l] = e(o[1]);
        else
          for (var u = 0; u < c.length; u += 1)
            o[u + 1] != null && (d[c[u]] = e(o[u + 1]));
      }, n = function(o, d, c) {
        var l = o.name && o.names;
        o.push && !d[o.push] ? d[o.push] = [] : l && !d[o.name] && (d[o.name] = {});
        var u = o.push ? {} : (
          // blank object that will be pushed
          l ? d[o.name] : d
        );
        t(c.match(o.reg), u, o.names, o.name), o.push && d[o.push].push(u);
      }, s = er(), r = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
      i.parse = function(o) {
        var d = {}, c = [], l = d;
        return o.split(/(\r\n|\r|\n)/).filter(r).forEach(function(u) {
          var h = u[0], f = u.slice(2);
          h === "m" && (c.push({
            rtp: [],
            fmtp: []
          }), l = c[c.length - 1]);
          for (var v = 0; v < (s[h] || []).length; v += 1) {
            var g = s[h][v];
            if (g.reg.test(f))
              return n(g, l, f);
          }
        }), d.media = c, d;
      };
      var a = function(o, d) {
        var c = d.split(/=(.+)/, 2);
        return c.length === 2 ? o[c[0]] = e(c[1]) : c.length === 1 && d.length > 1 && (o[c[0]] = void 0), o;
      };
      i.parseParams = function(o) {
        return o.split(/;\s?/).reduce(a, {});
      }, i.parseFmtpConfig = i.parseParams, i.parsePayloads = function(o) {
        return o.toString().split(" ").map(Number);
      }, i.parseRemoteCandidates = function(o) {
        for (var d = [], c = o.split(" ").map(e), l = 0; l < c.length; l += 3)
          d.push({
            component: c[l],
            ip: c[l + 1],
            port: c[l + 2]
          });
        return d;
      }, i.parseImageAttributes = function(o) {
        return o.split(" ").map(function(d) {
          return d.substring(1, d.length - 1).split(",").reduce(a, {});
        });
      }, i.parseSimulcastStreamList = function(o) {
        return o.split(";").map(function(d) {
          return d.split(",").map(function(c) {
            var l, u = false;
            return c[0] !== "~" ? l = e(c) : (l = e(c.substring(1, c.length)), u = true), {
              scid: l,
              paused: u
            };
          });
        });
      };
    })(Wi)), Wi;
  }
  var Ki, na;
  function vh() {
    if (na) return Ki;
    na = 1;
    var i = er(), e = /%[sdv%]/g, t = function(a) {
      var o = 1, d = arguments, c = d.length;
      return a.replace(e, function(l) {
        if (o >= c)
          return l;
        var u = d[o];
        switch (o += 1, l) {
          case "%%":
            return "%";
          case "%s":
            return String(u);
          case "%d":
            return Number(u);
          case "%v":
            return "";
        }
      });
    }, n = function(a, o, d) {
      var c = o.format instanceof Function ? o.format(o.push ? d : d[o.name]) : o.format, l = [a + "=" + c];
      if (o.names)
        for (var u = 0; u < o.names.length; u += 1) {
          var h = o.names[u];
          o.name ? l.push(d[o.name][h]) : l.push(d[o.names[u]]);
        }
      else
        l.push(d[o.name]);
      return t.apply(null, l);
    }, s = ["v", "o", "s", "i", "u", "e", "p", "c", "b", "t", "r", "z", "a"], r = ["i", "c", "b", "a"];
    return Ki = function(a, o) {
      o = o || {}, a.version == null && (a.version = 0), a.name == null && (a.name = " "), a.media.forEach(function(u) {
        u.payloads == null && (u.payloads = "");
      });
      var d = o.outerOrder || s, c = o.innerOrder || r, l = [];
      return d.forEach(function(u) {
        i[u].forEach(function(h) {
          h.name in a && a[h.name] != null ? l.push(n(u, h, a)) : h.push in a && a[h.push] != null && a[h.push].forEach(function(f) {
            l.push(n(u, h, f));
          });
        });
      }), a.media.forEach(function(u) {
        l.push(n("m", i.m[0], u)), c.forEach(function(h) {
          i[h].forEach(function(f) {
            f.name in u && u[f.name] != null ? l.push(n(h, f, u)) : f.push in u && u[f.push] != null && u[f.push].forEach(function(v) {
              l.push(n(h, f, v));
            });
          });
        });
      }), l.join(`\r
`) + `\r
`;
    }, Ki;
  }
  var ia;
  function bh() {
    if (ia) return Me;
    ia = 1;
    var i = gh(), e = vh(), t = er();
    return Me.grammar = t, Me.write = e, Me.parse = i.parse, Me.parseParams = i.parseParams, Me.parseFmtpConfig = i.parseFmtpConfig, Me.parsePayloads = i.parsePayloads, Me.parseRemoteCandidates = i.parseRemoteCandidates, Me.parseImageAttributes = i.parseImageAttributes, Me.parseSimulcastStreamList = i.parseSimulcastStreamList, Me;
  }
  var Pe = bh();
  function tr(i) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var n, s;
    let r;
    const a = (n = t.isImmediate) !== null && n !== void 0 ? n : false, o = (s = t.callback) !== null && s !== void 0 ? s : false, d = t.maxWait;
    let c = Date.now(), l = [];
    function u() {
      if (d !== void 0) {
        const f = Date.now() - c;
        if (f + e >= d)
          return d - f;
      }
      return e;
    }
    const h = function() {
      for (var f = arguments.length, v = new Array(f), g = 0; g < f; g++)
        v[g] = arguments[g];
      const T = this;
      return new Promise((k, w) => {
        const O = function() {
          if (r = void 0, c = Date.now(), !a) {
            const y = i.apply(T, v);
            o && o(y), l.forEach((S) => {
              let {
                resolve: M
              } = S;
              return M(y);
            }), l = [];
          }
        }, b = a && r === void 0;
        if (r !== void 0 && se.clearTimeout(r), r = se.setTimeout(O, u()), b) {
          const y = i.apply(T, v);
          return o && o(y), k(y);
        }
        l.push({
          resolve: k,
          reject: w
        });
      });
    };
    return h.cancel = function(f) {
      r !== void 0 && se.clearTimeout(r), l.forEach((v) => {
        let {
          reject: g
        } = v;
        return g(f);
      }), l = [];
    }, h;
  }
  const yh = 0.7, kh = 20, It = {
    NegotiationStarted: "negotiationStarted",
    NegotiationComplete: "negotiationComplete",
    RTPVideoPayloadTypes: "rtpVideoPayloadTypes"
  };
  class sa extends Ie.EventEmitter {
    get pc() {
      return this._pc || (this._pc = this.createPC()), this._pc;
    }
    constructor(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var n;
      super(), this.log = U, this.ddExtID = 0, this.latestOfferId = 0, this.pendingCandidates = [], this.restartingIce = false, this.renegotiate = false, this.trackBitrates = [], this.remoteStereoMids = [], this.remoteNackMids = [], this.negotiate = tr((s) => m(this, void 0, void 0, function* () {
        this.emit(It.NegotiationStarted);
        try {
          yield this.createAndSendOffer();
        } catch (r) {
          if (s)
            s(r);
          else
            throw r;
        }
      }), kh), this.close = () => {
        this._pc && (this.pendingInitialOffer = void 0, this._pc.close(), this._pc.onconnectionstatechange = null, this._pc.oniceconnectionstatechange = null, this._pc.onicegatheringstatechange = null, this._pc.ondatachannel = null, this._pc.onnegotiationneeded = null, this._pc.onsignalingstatechange = null, this._pc.onicecandidate = null, this._pc.ondatachannel = null, this._pc.ontrack = null, this._pc.onconnectionstatechange = null, this._pc.oniceconnectionstatechange = null, this._pc = null);
      }, this.log = Ee((n = t.loggerName) !== null && n !== void 0 ? n : fe.PCTransport), this.loggerOptions = t, this.config = e, this._pc = this.createPC(), this.offerLock = new ce();
    }
    createPC() {
      const e = new RTCPeerConnection(this.config);
      return e.onicecandidate = (t) => {
        var n;
        t.candidate && ((n = this.onIceCandidate) === null || n === void 0 || n.call(this, t.candidate));
      }, e.onicecandidateerror = (t) => {
        var n;
        (n = this.onIceCandidateError) === null || n === void 0 || n.call(this, t);
      }, e.oniceconnectionstatechange = () => {
        var t;
        (t = this.onIceConnectionStateChange) === null || t === void 0 || t.call(this, e.iceConnectionState);
      }, e.onsignalingstatechange = () => {
        var t;
        (t = this.onSignalingStatechange) === null || t === void 0 || t.call(this, e.signalingState);
      }, e.onconnectionstatechange = () => {
        var t;
        (t = this.onConnectionStateChange) === null || t === void 0 || t.call(this, e.connectionState);
      }, e.ondatachannel = (t) => {
        var n;
        (n = this.onDataChannel) === null || n === void 0 || n.call(this, t);
      }, e.ontrack = (t) => {
        var n;
        (n = this.onTrack) === null || n === void 0 || n.call(this, t);
      }, e;
    }
    get logContext() {
      var e, t;
      return Object.assign({}, (t = (e = this.loggerOptions).loggerContextCb) === null || t === void 0 ? void 0 : t.call(e));
    }
    get isICEConnected() {
      return this._pc !== null && (this.pc.iceConnectionState === "connected" || this.pc.iceConnectionState === "completed");
    }
    addIceCandidate(e) {
      return m(this, void 0, void 0, function* () {
        if (this.pc.remoteDescription && !this.restartingIce)
          return this.pc.addIceCandidate(e);
        this.pendingCandidates.push(e);
      });
    }
    setRemoteDescription(e, t) {
      return m(this, void 0, void 0, function* () {
        var n, s;
        if (e.type === "answer" && this.latestOfferId > 0 && t > 0 && t !== this.latestOfferId)
          return this.log.warn("ignoring answer for old offer", Object.assign(Object.assign({}, this.logContext), {
            offerId: t,
            latestOfferId: this.latestOfferId
          })), false;
        let r;
        if (e.type === "offer") {
          let {
            stereoMids: a,
            nackMids: o
          } = Th(e);
          this.remoteStereoMids = a, this.remoteNackMids = o;
        } else if (e.type === "answer") {
          if (this.pendingInitialOffer && this._pc) {
            const o = this.pendingInitialOffer;
            this.pendingInitialOffer = void 0;
            const d = Pe.parse((n = o.sdp) !== null && n !== void 0 ? n : "");
            d.media.forEach((c) => {
              In(c);
            }), this.log.debug("setting pending initial offer before processing answer", this.logContext), yield this.setMungedSDP(o, Pe.write(d));
          }
          const a = Pe.parse((s = e.sdp) !== null && s !== void 0 ? s : "");
          a.media.forEach((o) => {
            const d = nr(o.mid);
            o.type === "audio" && this.trackBitrates.some((c) => {
              if (!c.transceiver || d != c.transceiver.mid)
                return false;
              let l = 0;
              if (o.rtp.some((h) => h.codec.toUpperCase() === c.codec.toUpperCase() ? (l = h.payload, true) : false), l === 0)
                return true;
              let u = false;
              for (const h of o.fmtp)
                if (h.payload === l) {
                  h.config = h.config.split(";").filter((f) => !f.includes("maxaveragebitrate")).join(";"), c.maxbr > 0 && (h.config += ";maxaveragebitrate=".concat(c.maxbr * 1e3)), u = true;
                  break;
                }
              return u || c.maxbr > 0 && o.fmtp.push({
                payload: l,
                config: "maxaveragebitrate=".concat(c.maxbr * 1e3)
              }), true;
            });
          }), r = Pe.write(a);
        }
        return yield this.setMungedSDP(e, r, true), this.pendingCandidates.forEach((a) => {
          this.pc.addIceCandidate(a);
        }), this.pendingCandidates = [], this.restartingIce = false, this.renegotiate ? (this.renegotiate = false, yield this.createAndSendOffer()) : e.type === "answer" && (this.emit(It.NegotiationComplete), e.sdp && Pe.parse(e.sdp).media.forEach((o) => {
          o.type === "video" && this.emit(It.RTPVideoPayloadTypes, o.rtp);
        })), true;
      });
    }
    createInitialOffer() {
      return m(this, void 0, void 0, function* () {
        var e;
        const t = yield this.offerLock.lock();
        try {
          if (this.pc.signalingState !== "stable") {
            this.log.warn("signaling state is not stable, cannot create initial offer", this.logContext);
            return;
          }
          const n = this.latestOfferId + 1;
          this.latestOfferId = n;
          const s = yield this.pc.createOffer();
          this.pendingInitialOffer = {
            sdp: s.sdp,
            type: s.type
          };
          const r = Pe.parse((e = s.sdp) !== null && e !== void 0 ? e : "");
          return r.media.forEach((a) => {
            In(a);
          }), s.sdp = Pe.write(r), {
            offer: s,
            offerId: n
          };
        } finally {
          t();
        }
      });
    }
    createAndSendOffer(e) {
      return m(this, void 0, void 0, function* () {
        var t;
        const n = yield this.offerLock.lock();
        try {
          if (this.onOffer === void 0)
            return;
          if (e != null && e.iceRestart && (this.log.debug("restarting ICE", this.logContext), this.restartingIce = !0), this._pc && (this._pc.signalingState === "have-local-offer" || this.pendingInitialOffer)) {
            const o = this._pc.remoteDescription;
            if (e != null && e.iceRestart && o)
              yield this._pc.setRemoteDescription(o);
            else {
              this.renegotiate = !0, this.log.debug("requesting renegotiation", Object.assign({}, this.logContext));
              return;
            }
          } else if (!this._pc || this._pc.signalingState === "closed") {
            this.log.warn("could not createOffer with closed peer connection", this.logContext);
            return;
          }
          this.log.debug("starting to negotiate", this.logContext);
          const s = this.latestOfferId + 1;
          this.latestOfferId = s;
          const r = yield this.pc.createOffer(e);
          this.log.debug("original offer", Object.assign({
            sdp: r.sdp
          }, this.logContext));
          const a = Pe.parse((t = r.sdp) !== null && t !== void 0 ? t : "");
          if (a.media.forEach((o) => {
            In(o), o.type === "audio" ? ra(o, ["all"], []) : o.type === "video" && this.trackBitrates.some((d) => {
              if (!o.msid || !d.cid || !o.msid.includes(d.cid))
                return !1;
              let c = 0;
              if (o.rtp.some((u) => u.codec.toUpperCase() === d.codec.toUpperCase() ? (c = u.payload, !0) : !1), c === 0 || (Fe(d.codec) && !Dt() && this.ensureVideoDDExtensionForSVC(o, a), !Fe(d.codec)))
                return !0;
              const l = Math.round(d.maxbr * yh);
              for (const u of o.fmtp)
                if (u.payload === c) {
                  u.config.includes("x-google-start-bitrate") || (u.config += ";x-google-start-bitrate=".concat(l));
                  break;
                }
              return !0;
            });
          }), this.latestOfferId > s) {
            this.log.warn("latestOfferId mismatch", Object.assign(Object.assign({}, this.logContext), {
              latestOfferId: this.latestOfferId,
              offerId: s
            }));
            return;
          }
          yield this.setMungedSDP(r, Pe.write(a)), this.onOffer(r, this.latestOfferId);
        } finally {
          n();
        }
      });
    }
    createAndSetAnswer() {
      return m(this, void 0, void 0, function* () {
        var e;
        const t = yield this.pc.createAnswer(), n = Pe.parse((e = t.sdp) !== null && e !== void 0 ? e : "");
        return n.media.forEach((s) => {
          In(s), s.type === "audio" && ra(s, this.remoteStereoMids, this.remoteNackMids);
        }), yield this.setMungedSDP(t, Pe.write(n)), t;
      });
    }
    createDataChannel(e, t) {
      return this.pc.createDataChannel(e, t);
    }
    addTransceiver(e, t) {
      return this.pc.addTransceiver(e, t);
    }
    addTransceiverOfKind(e, t) {
      return this.pc.addTransceiver(e, t);
    }
    addTrack(e) {
      if (!this._pc)
        throw new Q("PC closed, cannot add track");
      return this._pc.addTrack(e);
    }
    setTrackCodecBitrate(e) {
      this.trackBitrates.push(e);
    }
    setConfiguration(e) {
      var t;
      if (!this._pc)
        throw new Q("PC closed, cannot configure");
      return (t = this._pc) === null || t === void 0 ? void 0 : t.setConfiguration(e);
    }
    canRemoveTrack() {
      var e;
      return !!(!((e = this._pc) === null || e === void 0) && e.removeTrack);
    }
    removeTrack(e) {
      var t;
      return (t = this._pc) === null || t === void 0 ? void 0 : t.removeTrack(e);
    }
    getConnectionState() {
      var e, t;
      return (t = (e = this._pc) === null || e === void 0 ? void 0 : e.connectionState) !== null && t !== void 0 ? t : "closed";
    }
    getICEConnectionState() {
      var e, t;
      return (t = (e = this._pc) === null || e === void 0 ? void 0 : e.iceConnectionState) !== null && t !== void 0 ? t : "closed";
    }
    getSignallingState() {
      var e, t;
      return (t = (e = this._pc) === null || e === void 0 ? void 0 : e.signalingState) !== null && t !== void 0 ? t : "closed";
    }
    getTransceivers() {
      var e, t;
      return (t = (e = this._pc) === null || e === void 0 ? void 0 : e.getTransceivers()) !== null && t !== void 0 ? t : [];
    }
    getSenders() {
      var e, t;
      return (t = (e = this._pc) === null || e === void 0 ? void 0 : e.getSenders()) !== null && t !== void 0 ? t : [];
    }
    getLocalDescription() {
      var e;
      return (e = this._pc) === null || e === void 0 ? void 0 : e.localDescription;
    }
    getRemoteDescription() {
      var e;
      return (e = this.pc) === null || e === void 0 ? void 0 : e.remoteDescription;
    }
    getStats() {
      return this.pc.getStats();
    }
    getConnectedAddress() {
      return m(this, void 0, void 0, function* () {
        var e;
        if (!this._pc)
          return;
        let t = "";
        const n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
        if ((yield this._pc.getStats()).forEach((o) => {
          switch (o.type) {
            case "transport":
              t = o.selectedCandidatePairId;
              break;
            case "candidate-pair":
              t === "" && o.selected && (t = o.id), n.set(o.id, o);
              break;
            case "remote-candidate":
              s.set(o.id, "".concat(o.address, ":").concat(o.port));
              break;
          }
        }), t === "")
          return;
        const a = (e = n.get(t)) === null || e === void 0 ? void 0 : e.remoteCandidateId;
        if (a !== void 0)
          return s.get(a);
      });
    }
    setMungedSDP(e, t, n) {
      return m(this, void 0, void 0, function* () {
        var s, r;
        if (t) {
          const a = e.sdp;
          e.sdp = t;
          try {
            this.log.debug("setting munged ".concat(n ? "remote" : "local", " description"), this.logContext), n ? yield this.pc.setRemoteDescription(e) : yield this.pc.setLocalDescription(e);
            return;
          } catch (o) {
            this.log.warn("not able to set ".concat(e.type, ", falling back to unmodified sdp"), Object.assign(Object.assign({}, this.logContext), {
              error: o,
              sdp: t
            })), e.sdp = a;
          }
        }
        try {
          n ? yield (s = this._pc) === null || s === void 0 ? void 0 : s.setRemoteDescription(e) : yield (r = this._pc) === null || r === void 0 ? void 0 : r.setLocalDescription(e);
        } catch (a) {
          let o = "unknown error";
          a instanceof Error ? o = a.message : typeof a == "string" && (o = a);
          const d = {
            error: o,
            sdp: e.sdp
          };
          throw !n && this.pc.remoteDescription && (d.remoteSdp = this.pc.remoteDescription), this.log.error("unable to set ".concat(e.type), Object.assign(Object.assign({}, this.logContext), {
            fields: d
          })), new wt(o);
        }
      });
    }
    ensureVideoDDExtensionForSVC(e, t) {
      var n, s;
      if (!((n = e.ext) === null || n === void 0 ? void 0 : n.some((a) => a.uri === Vr))) {
        if (this.ddExtID === 0) {
          let a = 0;
          t.media.forEach((o) => {
            var d;
            o.type === "video" && ((d = o.ext) === null || d === void 0 || d.forEach((c) => {
              c.value > a && (a = c.value);
            }));
          }), this.ddExtID = a + 1;
        }
        (s = e.ext) === null || s === void 0 || s.push({
          value: this.ddExtID,
          uri: Vr
        });
      }
    }
  }
  function ra(i, e, t) {
    const n = nr(i.mid);
    let s = 0;
    i.rtp.some((r) => r.codec === "opus" ? (s = r.payload, true) : false), s > 0 && (i.rtcpFb || (i.rtcpFb = []), t.includes(n) && !i.rtcpFb.some((r) => r.payload === s && r.type === "nack") && i.rtcpFb.push({
      payload: s,
      type: "nack"
    }), (e.includes(n) || e.length === 1 && e[0] === "all") && i.fmtp.some((r) => r.payload === s ? (r.config.includes("stereo=1") || (r.config += ";stereo=1"), true) : false));
  }
  function Th(i) {
    var e;
    const t = [], n = [], s = Pe.parse((e = i.sdp) !== null && e !== void 0 ? e : "");
    let r = 0;
    return s.media.forEach((a) => {
      var o;
      const d = nr(a.mid);
      a.type === "audio" && (a.rtp.some((c) => c.codec === "opus" ? (r = c.payload, true) : false), !((o = a.rtcpFb) === null || o === void 0) && o.some((c) => c.payload === r && c.type === "nack") && n.push(d), a.fmtp.some((c) => c.payload === r ? (c.config.includes("sprop-stereo=1") && t.push(d), true) : false));
    }), {
      stereoMids: t,
      nackMids: n
    };
  }
  function In(i) {
    if (i.connection) {
      const e = i.connection.ip.indexOf(":") >= 0;
      (i.connection.version === 4 && e || i.connection.version === 6 && !e) && (i.connection.ip = "0.0.0.0", i.connection.version = 4);
    }
  }
  function nr(i) {
    return typeof i == "number" ? i.toFixed(0) : i;
  }
  const Cs = "vp8", Sh = {
    audioPreset: fs.music,
    dtx: true,
    red: true,
    forceStereo: false,
    simulcast: true,
    screenShareEncoding: pi.h1080fps15.encoding,
    stopMicTrackOnMute: false,
    videoCodec: Cs,
    backupCodec: true,
    preConnectBuffer: false
  }, kc = {
    deviceId: {
      ideal: "default"
    },
    autoGainControl: true,
    echoCancellation: true,
    noiseSuppression: true,
    voiceIsolation: true
  }, Tc = {
    deviceId: {
      ideal: "default"
    },
    resolution: gn.h720.resolution
  }, Ch = {
    adaptiveStream: false,
    dynacast: false,
    stopLocalTrackOnUnpublish: true,
    reconnectPolicy: new zl(),
    disconnectOnPageLeave: true,
    webAudioMix: false,
    singlePeerConnection: true
  }, ir = {
    autoSubscribe: true,
    maxRetries: 1,
    peerConnectionTimeout: 15e3,
    websocketTimeout: 15e3
  };
  var X;
  (function(i) {
    i[i.NEW = 0] = "NEW", i[i.CONNECTING = 1] = "CONNECTING", i[i.CONNECTED = 2] = "CONNECTED", i[i.FAILED = 3] = "FAILED", i[i.CLOSING = 4] = "CLOSING", i[i.CLOSED = 5] = "CLOSED";
  })(X || (X = {}));
  class aa {
    get needsPublisher() {
      return this.isPublisherConnectionRequired;
    }
    get needsSubscriber() {
      return this.isSubscriberConnectionRequired;
    }
    get currentState() {
      return this.state;
    }
    get mode() {
      return this._mode;
    }
    constructor(e, t, n) {
      var s;
      this.peerConnectionTimeout = ir.peerConnectionTimeout, this.log = U, this.updateState = () => {
        var r, a;
        const o = this.state, d = this.requiredTransports.map((c) => c.getConnectionState());
        d.every((c) => c === "connected") ? this.state = X.CONNECTED : d.some((c) => c === "failed") ? this.state = X.FAILED : d.some((c) => c === "connecting") ? this.state = X.CONNECTING : d.every((c) => c === "closed") ? this.state = X.CLOSED : d.some((c) => c === "closed") ? this.state = X.CLOSING : d.every((c) => c === "new") && (this.state = X.NEW), o !== this.state && (this.log.debug("pc state change: from ".concat(X[o], " to ").concat(X[this.state]), this.logContext), (r = this.onStateChange) === null || r === void 0 || r.call(this, this.state, this.publisher.getConnectionState(), (a = this.subscriber) === null || a === void 0 ? void 0 : a.getConnectionState()));
      }, this.log = Ee((s = t.loggerName) !== null && s !== void 0 ? s : fe.PCManager), this.loggerOptions = t, this.isPublisherConnectionRequired = e !== "subscriber-primary", this.isSubscriberConnectionRequired = e === "subscriber-primary", this.publisher = new sa(n, t), this._mode = e, e !== "publisher-only" && (this.subscriber = new sa(n, t), this.subscriber.onConnectionStateChange = this.updateState, this.subscriber.onIceConnectionStateChange = this.updateState, this.subscriber.onSignalingStatechange = this.updateState, this.subscriber.onIceCandidate = (r) => {
        var a;
        (a = this.onIceCandidate) === null || a === void 0 || a.call(this, r, Le.SUBSCRIBER);
      }, this.subscriber.onDataChannel = (r) => {
        var a;
        (a = this.onDataChannel) === null || a === void 0 || a.call(this, r);
      }, this.subscriber.onTrack = (r) => {
        var a;
        (a = this.onTrack) === null || a === void 0 || a.call(this, r);
      }), this.publisher.onConnectionStateChange = this.updateState, this.publisher.onIceConnectionStateChange = this.updateState, this.publisher.onSignalingStatechange = this.updateState, this.publisher.onIceCandidate = (r) => {
        var a;
        (a = this.onIceCandidate) === null || a === void 0 || a.call(this, r, Le.PUBLISHER);
      }, this.publisher.onTrack = (r) => {
        var a;
        (a = this.onTrack) === null || a === void 0 || a.call(this, r);
      }, this.publisher.onOffer = (r, a) => {
        var o;
        (o = this.onPublisherOffer) === null || o === void 0 || o.call(this, r, a);
      }, this.state = X.NEW, this.connectionLock = new ce(), this.remoteOfferLock = new ce();
    }
    get logContext() {
      var e, t;
      return Object.assign({}, (t = (e = this.loggerOptions).loggerContextCb) === null || t === void 0 ? void 0 : t.call(e));
    }
    requirePublisher() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      this.isPublisherConnectionRequired = e, this.updateState();
    }
    createAndSendPublisherOffer(e) {
      return this.publisher.createAndSendOffer(e);
    }
    setPublisherAnswer(e, t) {
      return this.publisher.setRemoteDescription(e, t);
    }
    removeTrack(e) {
      return this.publisher.removeTrack(e);
    }
    close() {
      return m(this, void 0, void 0, function* () {
        var e;
        if (this.publisher && this.publisher.getSignallingState() !== "closed") {
          const t = this.publisher;
          for (const n of t.getSenders())
            try {
              t.canRemoveTrack() && t.removeTrack(n);
            } catch (s) {
              this.log.warn("could not removeTrack", Object.assign(Object.assign({}, this.logContext), {
                error: s
              }));
            }
        }
        yield Promise.all([this.publisher.close(), (e = this.subscriber) === null || e === void 0 ? void 0 : e.close()]), this.updateState();
      });
    }
    triggerIceRestart() {
      return m(this, void 0, void 0, function* () {
        this.subscriber && (this.subscriber.restartingIce = true), this.needsPublisher && (yield this.createAndSendPublisherOffer({
          iceRestart: true
        }));
      });
    }
    addIceCandidate(e, t) {
      return m(this, void 0, void 0, function* () {
        var n;
        t === Le.PUBLISHER ? yield this.publisher.addIceCandidate(e) : yield (n = this.subscriber) === null || n === void 0 ? void 0 : n.addIceCandidate(e);
      });
    }
    createSubscriberAnswerFromOffer(e, t) {
      return m(this, void 0, void 0, function* () {
        var n, s, r;
        this.log.debug("received server offer", Object.assign(Object.assign({}, this.logContext), {
          RTCSdpType: e.type,
          sdp: e.sdp,
          signalingState: (n = this.subscriber) === null || n === void 0 ? void 0 : n.getSignallingState().toString()
        }));
        const a = yield this.remoteOfferLock.lock();
        try {
          return (yield (s = this.subscriber) === null || s === void 0 ? void 0 : s.setRemoteDescription(e, t)) ? yield (r = this.subscriber) === null || r === void 0 ? void 0 : r.createAndSetAnswer() : void 0;
        } finally {
          a();
        }
      });
    }
    updateConfiguration(e, t) {
      var n;
      this.publisher.setConfiguration(e), (n = this.subscriber) === null || n === void 0 || n.setConfiguration(e), t && this.triggerIceRestart();
    }
    ensurePCTransportConnection(e, t) {
      return m(this, void 0, void 0, function* () {
        var n;
        const s = yield this.connectionLock.lock();
        try {
          this.isPublisherConnectionRequired && this.publisher.getConnectionState() !== "connected" && this.publisher.getConnectionState() !== "connecting" && (this.log.debug("negotiation required, start negotiating", this.logContext), this.publisher.negotiate()), yield Promise.all((n = this.requiredTransports) === null || n === void 0 ? void 0 : n.map((r) => this.ensureTransportConnected(r, e, t)));
        } finally {
          s();
        }
      });
    }
    negotiate(e) {
      return m(this, void 0, void 0, function* () {
        return new ue((t, n) => m(this, void 0, void 0, function* () {
          let s = setTimeout(() => {
            n(new wt("negotiation timed out"));
          }, this.peerConnectionTimeout);
          const r = () => {
            clearTimeout(s), this.publisher.off(It.NegotiationStarted, o), e.signal.removeEventListener("abort", a);
          }, a = () => {
            r(), n(new wt("negotiation aborted"));
          }, o = () => {
            e.signal.aborted || (clearTimeout(s), s = setTimeout(() => {
              r(), n(new wt("negotiation timed out"));
            }, this.peerConnectionTimeout));
          };
          e.signal.addEventListener("abort", a), this.publisher.on(It.NegotiationStarted, o), this.publisher.once(It.NegotiationComplete, () => {
            r(), t();
          }), yield this.publisher.negotiate((d) => {
            r(), d instanceof Error ? n(d) : n(new Error(String(d)));
          });
        }));
      });
    }
    addPublisherTransceiver(e, t) {
      return this.publisher.addTransceiver(e, t);
    }
    addPublisherTransceiverOfKind(e, t) {
      return this.publisher.addTransceiverOfKind(e, t);
    }
    getMidForReceiver(e) {
      const n = (this.subscriber ? this.subscriber.getTransceivers() : this.publisher.getTransceivers()).find((s) => s.receiver === e);
      return n == null ? void 0 : n.mid;
    }
    addPublisherTrack(e) {
      return this.publisher.addTrack(e);
    }
    createPublisherDataChannel(e, t) {
      return this.publisher.createDataChannel(e, t);
    }
    /**
     * Returns the first required transport's address if no explicit target is specified
     */
    getConnectedAddress(e) {
      return e === Le.PUBLISHER ? this.publisher.getConnectedAddress() : e === Le.SUBSCRIBER ? this.publisher.getConnectedAddress() : this.requiredTransports[0].getConnectedAddress();
    }
    get requiredTransports() {
      const e = [];
      return this.isPublisherConnectionRequired && e.push(this.publisher), this.isSubscriberConnectionRequired && this.subscriber && e.push(this.subscriber), e;
    }
    ensureTransportConnected(e, t) {
      return m(this, arguments, void 0, function(n, s) {
        var r = this;
        let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.peerConnectionTimeout;
        return (function* () {
          if (n.getConnectionState() !== "connected")
            return new Promise((d, c) => m(r, void 0, void 0, function* () {
              const l = () => {
                this.log.warn("abort transport connection", this.logContext), se.clearTimeout(u), c(L.cancelled("room connection has been cancelled"));
              };
              s != null && s.signal.aborted && l(), s == null || s.signal.addEventListener("abort", l);
              const u = se.setTimeout(() => {
                s == null || s.signal.removeEventListener("abort", l), c(L.internal("could not establish pc connection"));
              }, a);
              for (; this.state !== X.CONNECTED; )
                if (yield he(50), s != null && s.signal.aborted) {
                  c(L.cancelled("room connection has been cancelled"));
                  return;
                }
              se.clearTimeout(u), s == null || s.signal.removeEventListener("abort", l), d();
            }));
        })();
      });
    }
  }
  const Sc = 5e3, Eh = 3e4;
  class V {
    static fetchRegionSettings(e, t, n) {
      return m(this, void 0, void 0, function* () {
        const s = yield V.fetchLock.lock();
        try {
          const r = yield fetch("".concat(wh(e), "/regions"), {
            headers: {
              authorization: "Bearer ".concat(t)
            },
            signal: n
          });
          if (r.ok) {
            const a = Vu(r.headers), o = a ? a * 1e3 : Sc;
            return {
              regionSettings: yield r.json(),
              updatedAtInMs: Date.now(),
              maxAgeInMs: o
            };
          } else
            throw r.status === 401 ? L.notAllowed("Could not fetch region settings: ".concat(r.statusText), r.status) : L.internal("Could not fetch region settings: ".concat(r.statusText));
        } catch (r) {
          throw r instanceof L ? r : n != null && n.aborted ? L.cancelled("Region fetching was aborted") : L.serverUnreachable("Could not fetch region settings, ".concat(r instanceof Error ? "".concat(r.name, ": ").concat(r.message) : r));
        } finally {
          s();
        }
      });
    }
    static scheduleRefetch(e, t, n) {
      return m(this, void 0, void 0, function* () {
        const s = V.settingsTimeouts.get(e.hostname);
        clearTimeout(s), V.settingsTimeouts.set(e.hostname, setTimeout(() => m(this, void 0, void 0, function* () {
          try {
            const r = yield V.fetchRegionSettings(e, t);
            V.updateCachedRegionSettings(e, t, r);
          } catch (r) {
            if (r instanceof L && r.reason === G.NotAllowed) {
              U.debug("token is not valid, cancelling auto region refresh");
              return;
            }
            U.debug("auto refetching of region settings failed", {
              error: r
            }), V.scheduleRefetch(e, t, n);
          }
        }), n));
      });
    }
    static updateCachedRegionSettings(e, t, n) {
      V.cache.set(e.hostname, n), V.scheduleRefetch(e, t, n.maxAgeInMs);
    }
    static stopRefetch(e) {
      const t = V.settingsTimeouts.get(e);
      t && (clearTimeout(t), V.settingsTimeouts.delete(e));
    }
    static scheduleCleanup(e) {
      let t = V.connectionTrackers.get(e);
      t && (t.cleanupTimeout && clearTimeout(t.cleanupTimeout), t.cleanupTimeout = setTimeout(() => {
        const n = V.connectionTrackers.get(e);
        n && n.connectionCount === 0 && (U.debug("stopping region refetch after disconnect delay", {
          hostname: e
        }), V.stopRefetch(e)), n && (n.cleanupTimeout = void 0);
      }, Eh));
    }
    static cancelCleanup(e) {
      const t = V.connectionTrackers.get(e);
      t != null && t.cleanupTimeout && (clearTimeout(t.cleanupTimeout), t.cleanupTimeout = void 0);
    }
    notifyConnected() {
      const e = this.serverUrl.hostname;
      let t = V.connectionTrackers.get(e);
      t || (t = {
        connectionCount: 0
      }, V.connectionTrackers.set(e, t)), t.connectionCount++, V.cancelCleanup(e);
    }
    notifyDisconnected() {
      const e = this.serverUrl.hostname, t = V.connectionTrackers.get(e);
      t && (t.connectionCount = Math.max(0, t.connectionCount - 1), t.connectionCount === 0 && V.scheduleCleanup(e));
    }
    constructor(e, t) {
      this.attemptedRegions = [], this.serverUrl = new URL(e), this.token = t;
    }
    updateToken(e) {
      this.token = e;
    }
    isCloud() {
      return Jt(this.serverUrl);
    }
    getServerUrl() {
      return this.serverUrl;
    }
    /** @internal */
    fetchRegionSettings(e) {
      return m(this, void 0, void 0, function* () {
        return V.fetchRegionSettings(this.serverUrl, this.token, e);
      });
    }
    getNextBestRegionUrl(e) {
      return m(this, void 0, void 0, function* () {
        if (!this.isCloud())
          throw Error("region availability is only supported for LiveKit Cloud domains");
        let t = V.cache.get(this.serverUrl.hostname);
        (!t || Date.now() - t.updatedAtInMs > t.maxAgeInMs) && (t = yield this.fetchRegionSettings(e), V.updateCachedRegionSettings(this.serverUrl, this.token, t));
        const n = t.regionSettings.regions.filter((s) => !this.attemptedRegions.find((r) => r.url === s.url));
        if (n.length > 0) {
          const s = n[0];
          return this.attemptedRegions.push(s), U.debug("next region: ".concat(s.region)), s.url;
        } else
          return null;
      });
    }
    resetAttempts() {
      this.attemptedRegions = [];
    }
    setServerReportedRegions(e) {
      V.updateCachedRegionSettings(this.serverUrl, this.token, e);
    }
  }
  V.cache = /* @__PURE__ */ new Map();
  V.settingsTimeouts = /* @__PURE__ */ new Map();
  V.connectionTrackers = /* @__PURE__ */ new Map();
  V.fetchLock = new ce();
  function wh(i) {
    return "".concat(i.protocol.replace("ws", "http"), "//").concat(i.host, "/settings");
  }
  class Z extends Error {
    /**
     * Creates an error object with the given code and message, plus an optional data payload.
     *
     * If thrown in an RPC method handler, the error will be sent back to the caller.
     *
     * Error codes 1001-1999 are reserved for built-in errors (see RpcError.ErrorCode for their meanings).
     */
    constructor(e, t, n) {
      super(t), this.code = e, this.message = oa(t, Z.MAX_MESSAGE_BYTES), this.data = n ? oa(n, Z.MAX_DATA_BYTES) : void 0;
    }
    /**
     * @internal
     */
    static fromProto(e) {
      return new Z(e.code, e.message, e.data);
    }
    /**
     * @internal
     */
    toProto() {
      return new to({
        code: this.code,
        message: this.message,
        data: this.data
      });
    }
    /**
     * Creates an error object from the code, with an auto-populated message.
     *
     * @internal
     */
    static builtIn(e, t) {
      return new Z(Z.ErrorCode[e], Z.ErrorMessage[e], t);
    }
  }
  Z.MAX_MESSAGE_BYTES = 256;
  Z.MAX_DATA_BYTES = 15360;
  Z.ErrorCode = {
    APPLICATION_ERROR: 1500,
    CONNECTION_TIMEOUT: 1501,
    RESPONSE_TIMEOUT: 1502,
    RECIPIENT_DISCONNECTED: 1503,
    RESPONSE_PAYLOAD_TOO_LARGE: 1504,
    SEND_FAILED: 1505,
    UNSUPPORTED_METHOD: 1400,
    RECIPIENT_NOT_FOUND: 1401,
    REQUEST_PAYLOAD_TOO_LARGE: 1402,
    UNSUPPORTED_SERVER: 1403,
    UNSUPPORTED_VERSION: 1404
  };
  Z.ErrorMessage = {
    APPLICATION_ERROR: "Application error in method handler",
    CONNECTION_TIMEOUT: "Connection timeout",
    RESPONSE_TIMEOUT: "Response timeout",
    RECIPIENT_DISCONNECTED: "Recipient disconnected",
    RESPONSE_PAYLOAD_TOO_LARGE: "Response payload too large",
    SEND_FAILED: "Failed to send",
    UNSUPPORTED_METHOD: "Method not supported at destination",
    RECIPIENT_NOT_FOUND: "Recipient not found",
    REQUEST_PAYLOAD_TOO_LARGE: "Request payload too large",
    UNSUPPORTED_SERVER: "RPC not supported by server",
    UNSUPPORTED_VERSION: "Unsupported RPC version"
  };
  const Cc = 15360;
  function sr(i) {
    return new TextEncoder().encode(i).length;
  }
  function oa(i, e) {
    if (sr(i) <= e)
      return i;
    let t = 0, n = i.length;
    const s = new TextEncoder();
    for (; t < n; ) {
      const r = Math.floor((t + n + 1) / 2);
      s.encode(i.slice(0, r)).length <= e ? t = r : n = r - 1;
    }
    return i.slice(0, t);
  }
  const rr = 2e3;
  function gi(i, e) {
    if (!e)
      return 0;
    let t, n;
    return "bytesReceived" in i ? (t = i.bytesReceived, n = e.bytesReceived) : "bytesSent" in i && (t = i.bytesSent, n = e.bytesSent), t === void 0 || n === void 0 || i.timestamp === void 0 || e.timestamp === void 0 ? 0 : (t - n) * 8 * 1e3 / (i.timestamp - e.timestamp);
  }
  const ar = typeof MediaRecorder < "u";
  class Ph {
    constructor() {
      throw new Error("MediaRecorder is not available in this environment");
    }
  }
  const _h = ar ? MediaRecorder : Ph;
  class Rh extends _h {
    constructor(e, t) {
      if (!ar)
        throw new Error("MediaRecorder is not available in this environment");
      super(new MediaStream([e.mediaStreamTrack]), t);
      let n, s;
      const r = () => s === void 0, a = () => {
        this.removeEventListener("dataavailable", n), this.removeEventListener("stop", a), this.removeEventListener("error", o), s == null || s.close(), s = void 0;
      }, o = (d) => {
        s == null || s.error(d), this.removeEventListener("dataavailable", n), this.removeEventListener("stop", a), this.removeEventListener("error", o), s = void 0;
      };
      this.byteStream = new ReadableStream({
        start: (d) => {
          s = d, n = (c) => m(this, void 0, void 0, function* () {
            let l;
            if (c.data.arrayBuffer) {
              const u = yield c.data.arrayBuffer();
              l = new Uint8Array(u);
            } else if (c.data.byteArray)
              l = c.data.byteArray;
            else
              throw new Error("no data available!");
            r() || d.enqueue(l);
          }), this.addEventListener("dataavailable", n);
        },
        cancel: () => {
          a();
        }
      }), this.addEventListener("stop", a), this.addEventListener("error", o);
    }
  }
  function Ih() {
    return ar;
  }
  const Oh = 1e3, Mh = 1e4;
  class Ec extends C {
    /** @internal */
    get sender() {
      return this._sender;
    }
    /** @internal */
    set sender(e) {
      this._sender = e;
    }
    get constraints() {
      return this._constraints;
    }
    get hasPreConnectBuffer() {
      return !!this.localTrackRecorder;
    }
    /**
     *
     * @param mediaTrack
     * @param kind
     * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
     * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
     */
    constructor(e, t, n) {
      let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false, r = arguments.length > 4 ? arguments[4] : void 0;
      super(e, t, r), this.manuallyStopped = false, this.pendingDeviceChange = false, this._isUpstreamPaused = false, this.handleTrackMuteEvent = () => this.debouncedTrackMuteHandler().catch(() => this.log.debug("track mute bounce got cancelled by an unmute event", this.logContext)), this.debouncedTrackMuteHandler = tr(() => m(this, void 0, void 0, function* () {
        yield this.pauseUpstream();
      }), 5e3), this.handleTrackUnmuteEvent = () => m(this, void 0, void 0, function* () {
        this.debouncedTrackMuteHandler.cancel("unmute"), yield this.resumeUpstream();
      }), this.handleEnded = () => {
        this.isInBackground && (this.reacquireTrack = true), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent), this.emit(R.Ended, this);
      }, this.reacquireTrack = false, this.providedByUser = s, this.muteLock = new ce(), this.pauseUpstreamLock = new ce(), this.trackChangeLock = new ce(), this.trackChangeLock.lock().then((a) => m(this, void 0, void 0, function* () {
        try {
          yield this.setMediaStreamTrack(e, !0);
        } finally {
          a();
        }
      })), this._constraints = e.getConstraints(), n && (this._constraints = n);
    }
    get id() {
      return this._mediaStreamTrack.id;
    }
    get dimensions() {
      if (this.kind !== C.Kind.Video)
        return;
      const {
        width: e,
        height: t
      } = this._mediaStreamTrack.getSettings();
      if (e && t)
        return {
          width: e,
          height: t
        };
    }
    get isUpstreamPaused() {
      return this._isUpstreamPaused;
    }
    get isUserProvided() {
      return this.providedByUser;
    }
    get mediaStreamTrack() {
      var e, t;
      return (t = (e = this.processor) === null || e === void 0 ? void 0 : e.processedTrack) !== null && t !== void 0 ? t : this._mediaStreamTrack;
    }
    get isLocal() {
      return true;
    }
    /**
     * @internal
     * returns mediaStreamTrack settings of the capturing mediastreamtrack source - ignoring processors
     */
    getSourceTrackSettings() {
      return this._mediaStreamTrack.getSettings();
    }
    setMediaStreamTrack(e, t, n) {
      return m(this, void 0, void 0, function* () {
        var s;
        if (e === this._mediaStreamTrack && !t)
          return;
        this._mediaStreamTrack && (this.attachedElements.forEach((a) => {
          qt(this._mediaStreamTrack, a);
        }), this.debouncedTrackMuteHandler.cancel("new-track"), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent)), this.mediaStream = new MediaStream([e]), e && (e.addEventListener("ended", this.handleEnded), e.addEventListener("mute", this.handleTrackMuteEvent), e.addEventListener("unmute", this.handleTrackUnmuteEvent), this._constraints = e.getConstraints());
        let r;
        if (this.processor && e) {
          if (this.log.debug("restarting processor", this.logContext), this.kind === "unknown")
            throw TypeError("cannot set processor on track of unknown kind");
          this.processorElement && (Ut(e, this.processorElement), this.processorElement.muted = true), yield this.processor.restart({
            track: e,
            kind: this.kind,
            element: this.processorElement
          }), r = this.processor.processedTrack;
        }
        this.sender && ((s = this.sender.transport) === null || s === void 0 ? void 0 : s.state) !== "closed" && (yield this.sender.replaceTrack(r ?? e)), !this.providedByUser && this._mediaStreamTrack !== e && this._mediaStreamTrack.stop(), this._mediaStreamTrack = e, e && (this._mediaStreamTrack.enabled = n ? true : !this.isMuted, yield this.resumeUpstream(), this.attachedElements.forEach((a) => {
          Ut(r ?? e, a);
        }));
      });
    }
    waitForDimensions() {
      return m(this, arguments, void 0, function() {
        var e = this;
        let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Oh;
        return (function* () {
          var n;
          if (e.kind === C.Kind.Audio)
            throw new Error("cannot get dimensions for audio tracks");
          ((n = Ce()) === null || n === void 0 ? void 0 : n.os) === "iOS" && (yield he(10));
          const s = Date.now();
          for (; Date.now() - s < t; ) {
            const r = e.dimensions;
            if (r)
              return r;
            yield he(50);
          }
          throw new Je("unable to get track dimensions after timeout");
        })();
      });
    }
    setDeviceId(e) {
      return m(this, void 0, void 0, function* () {
        return this._constraints.deviceId === e && this._mediaStreamTrack.getSettings().deviceId === Pt(e) ? true : (this._constraints.deviceId = e, this.isMuted ? (this.pendingDeviceChange = true, true) : (yield this.restartTrack(), Pt(e) === this._mediaStreamTrack.getSettings().deviceId));
      });
    }
    /**
     * @returns DeviceID of the device that is currently being used for this track
     */
    getDeviceId() {
      return m(this, arguments, void 0, function() {
        var e = this;
        let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
        return (function* () {
          if (e.source === C.Source.ScreenShare)
            return;
          const {
            deviceId: n,
            groupId: s
          } = e._mediaStreamTrack.getSettings(), r = e.kind === C.Kind.Audio ? "audioinput" : "videoinput";
          return t ? oe.getInstance().normalizeDeviceId(r, n, s) : n;
        })();
      });
    }
    mute() {
      return m(this, void 0, void 0, function* () {
        return this.setTrackMuted(true), this;
      });
    }
    unmute() {
      return m(this, void 0, void 0, function* () {
        return this.setTrackMuted(false), this;
      });
    }
    replaceTrack(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = yield this.trackChangeLock.lock();
        try {
          if (!this.sender)
            throw new Je("unable to replace an unpublished track");
          let s, r;
          return typeof t == "boolean" ? s = t : t !== void 0 && (s = t.userProvidedTrack, r = t.stopProcessor), this.providedByUser = s ?? !0, this.log.debug("replace MediaStreamTrack", this.logContext), yield this.setMediaStreamTrack(e), r && this.processor && (yield this.internalStopProcessor()), this;
        } finally {
          n();
        }
      });
    }
    restart(e, t) {
      return m(this, void 0, void 0, function* () {
        this.manuallyStopped = false;
        const n = yield this.trackChangeLock.lock();
        try {
          e || (e = this._constraints);
          const {
            deviceId: s,
            facingMode: r
          } = e, a = Ks(e, ["deviceId", "facingMode"]);
          this.log.debug("restarting track with constraints", Object.assign(Object.assign({}, this.logContext), {
            constraints: e
          }));
          const o = {
            audio: !1,
            video: !1
          };
          this.kind === C.Kind.Video ? o.video = s || r ? {
            deviceId: s,
            facingMode: r
          } : !0 : o.audio = s ? Object.assign({
            deviceId: s
          }, a) : !0, this.attachedElements.forEach((l) => {
            qt(this.mediaStreamTrack, l);
          }), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.stop();
          const c = (yield navigator.mediaDevices.getUserMedia(o)).getTracks()[0];
          return this.kind === C.Kind.Video && (yield c.applyConstraints(a)), c.addEventListener("ended", this.handleEnded), this.log.debug("re-acquired MediaStreamTrack", this.logContext), yield this.setMediaStreamTrack(c, !1, t), this._constraints = e, this.pendingDeviceChange = !1, this.emit(R.Restarted, this), this.manuallyStopped && (this.log.warn("track was stopped during a restart, stopping restarted track", this.logContext), this.stop()), this;
        } finally {
          n();
        }
      });
    }
    setTrackMuted(e) {
      this.log.debug("setting ".concat(this.kind, " track ").concat(e ? "muted" : "unmuted"), this.logContext), !(this.isMuted === e && this._mediaStreamTrack.enabled !== e) && (this.isMuted = e, this._mediaStreamTrack.enabled = !e, this.emit(e ? R.Muted : R.Unmuted, this));
    }
    get needsReAcquisition() {
      return this._mediaStreamTrack.readyState !== "live" || this._mediaStreamTrack.muted || !this._mediaStreamTrack.enabled || this.reacquireTrack;
    }
    handleAppVisibilityChanged() {
      const e = Object.create(null, {
        handleAppVisibilityChanged: {
          get: () => super.handleAppVisibilityChanged
        }
      });
      return m(this, void 0, void 0, function* () {
        yield e.handleAppVisibilityChanged.call(this), fc() && (this.log.debug("visibility changed, is in Background: ".concat(this.isInBackground), this.logContext), !this.isInBackground && this.needsReAcquisition && !this.isUserProvided && !this.isMuted && (this.log.debug("track needs to be reacquired, restarting ".concat(this.source), this.logContext), yield this.restart(), this.reacquireTrack = false));
      });
    }
    stop() {
      var e;
      this.manuallyStopped = true, super.stop(), this._mediaStreamTrack.removeEventListener("ended", this.handleEnded), this._mediaStreamTrack.removeEventListener("mute", this.handleTrackMuteEvent), this._mediaStreamTrack.removeEventListener("unmute", this.handleTrackUnmuteEvent), (e = this.processor) === null || e === void 0 || e.destroy(), this.processor = void 0;
    }
    /**
     * pauses publishing to the server without disabling the local MediaStreamTrack
     * this is used to display a user's own video locally while pausing publishing to
     * the server.
     * this API is unsupported on Safari < 12 due to a bug
     **/
    pauseUpstream() {
      return m(this, void 0, void 0, function* () {
        var e;
        const t = yield this.pauseUpstreamLock.lock();
        try {
          if (this._isUpstreamPaused === !0)
            return;
          if (!this.sender) {
            this.log.warn("unable to pause upstream for an unpublished track", this.logContext);
            return;
          }
          this._isUpstreamPaused = !0, this.emit(R.UpstreamPaused, this);
          const n = Ce();
          if ((n == null ? void 0 : n.name) === "Safari" && Qe(n.version, "12.0") < 0)
            throw new mi("pauseUpstream is not supported on Safari < 12.");
          ((e = this.sender.transport) === null || e === void 0 ? void 0 : e.state) !== "closed" && (yield this.sender.replaceTrack(null));
        } finally {
          t();
        }
      });
    }
    resumeUpstream() {
      return m(this, void 0, void 0, function* () {
        var e;
        const t = yield this.pauseUpstreamLock.lock();
        try {
          if (this._isUpstreamPaused === !1)
            return;
          if (!this.sender) {
            this.log.warn("unable to resume upstream for an unpublished track", this.logContext);
            return;
          }
          this._isUpstreamPaused = !1, this.emit(R.UpstreamResumed, this), ((e = this.sender.transport) === null || e === void 0 ? void 0 : e.state) !== "closed" && (yield this.sender.replaceTrack(this.mediaStreamTrack));
        } finally {
          t();
        }
      });
    }
    /**
     * Gets the RTCStatsReport for the LocalTrack's underlying RTCRtpSender
     * See https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport
     *
     * @returns Promise<RTCStatsReport> | undefined
     */
    getRTCStatsReport() {
      return m(this, void 0, void 0, function* () {
        var e;
        return !((e = this.sender) === null || e === void 0) && e.getStats ? yield this.sender.getStats() : void 0;
      });
    }
    /**
     * Sets a processor on this track.
     * See https://github.com/livekit/track-processors-js for example usage
     *
     * @param processor
     * @param showProcessedStreamLocally
     * @returns
     */
    setProcessor(e) {
      return m(this, arguments, void 0, function(t) {
        var n = this;
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return (function* () {
          var r;
          const a = yield n.trackChangeLock.lock();
          try {
            n.log.debug("setting up processor", n.logContext);
            const o = document.createElement(n.kind), d = {
              kind: n.kind,
              track: n._mediaStreamTrack,
              element: o,
              audioContext: n.audioContext
            };
            if (yield t.init(d), n.log.debug("processor initialized", n.logContext), n.processor && (yield n.internalStopProcessor()), n.kind === "unknown")
              throw TypeError("cannot set processor on track of unknown kind");
            if (Ut(n._mediaStreamTrack, o), o.muted = !0, o.play().catch((c) => {
              c instanceof DOMException && c.name === "AbortError" ? (n.log.warn("failed to play processor element, retrying", Object.assign(Object.assign({}, n.logContext), {
                error: c
              })), setTimeout(() => {
                o.play().catch((l) => {
                  n.log.error("failed to play processor element", Object.assign(Object.assign({}, n.logContext), {
                    err: l
                  }));
                });
              }, 100)) : n.log.error("failed to play processor element", Object.assign(Object.assign({}, n.logContext), {
                error: c
              }));
            }), n.processor = t, n.processorElement = o, n.processor.processedTrack) {
              for (const c of n.attachedElements)
                c !== n.processorElement && s && (qt(n._mediaStreamTrack, c), Ut(n.processor.processedTrack, c));
              yield (r = n.sender) === null || r === void 0 ? void 0 : r.replaceTrack(n.processor.processedTrack);
            }
            n.emit(R.TrackProcessorUpdate, n.processor);
          } finally {
            a();
          }
        })();
      });
    }
    getProcessor() {
      return this.processor;
    }
    /**
     * Stops the track processor
     * See https://github.com/livekit/track-processors-js for example usage
     *
     */
    stopProcessor() {
      return m(this, arguments, void 0, function() {
        var e = this;
        let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
        return (function* () {
          const n = yield e.trackChangeLock.lock();
          try {
            yield e.internalStopProcessor(t);
          } finally {
            n();
          }
        })();
      });
    }
    /**
     * @internal
     * This method assumes the caller has acquired a trackChangeLock already.
     * The public facing method for stopping the processor is `stopProcessor` and it wraps this method in the trackChangeLock.
     */
    internalStopProcessor() {
      return m(this, arguments, void 0, function() {
        var e = this;
        let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
        return (function* () {
          var n, s;
          e.processor && (e.log.debug("stopping processor", e.logContext), (n = e.processor.processedTrack) === null || n === void 0 || n.stop(), yield e.processor.destroy(), e.processor = void 0, t || ((s = e.processorElement) === null || s === void 0 || s.remove(), e.processorElement = void 0), yield e._mediaStreamTrack.applyConstraints(e._constraints), yield e.setMediaStreamTrack(e._mediaStreamTrack, true), e.emit(R.TrackProcessorUpdate));
        })();
      });
    }
    /** @internal */
    startPreConnectBuffer() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
      if (!Ih()) {
        this.log.warn("MediaRecorder is not available, cannot start preconnect buffer", this.logContext);
        return;
      }
      if (this.localTrackRecorder) {
        this.log.warn("preconnect buffer already started");
        return;
      } else {
        let t = "audio/webm;codecs=opus";
        MediaRecorder.isTypeSupported(t) || (t = "video/mp4"), this.localTrackRecorder = new Rh(this, {
          mimeType: t
        });
      }
      this.localTrackRecorder.start(e), this.autoStopPreConnectBuffer = setTimeout(() => {
        this.log.warn("preconnect buffer timed out, stopping recording automatically", this.logContext), this.stopPreConnectBuffer();
      }, Mh);
    }
    /** @internal */
    stopPreConnectBuffer() {
      clearTimeout(this.autoStopPreConnectBuffer), this.localTrackRecorder && (this.localTrackRecorder.stop(), this.localTrackRecorder = void 0);
    }
    /** @internal */
    getPreConnectBuffer() {
      var e;
      return (e = this.localTrackRecorder) === null || e === void 0 ? void 0 : e.byteStream;
    }
    getPreConnectBufferMimeType() {
      var e;
      return (e = this.localTrackRecorder) === null || e === void 0 ? void 0 : e.mimeType;
    }
  }
  class yn extends Ec {
    /**
     * boolean indicating whether enhanced noise cancellation is currently being used on this track
     */
    get enhancedNoiseCancellation() {
      return this.isKrispNoiseFilterEnabled;
    }
    /**
     *
     * @param mediaTrack
     * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
     * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
     */
    constructor(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, s = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 ? arguments[4] : void 0;
      super(e, C.Kind.Audio, t, n, r), this.stopOnMute = false, this.isKrispNoiseFilterEnabled = false, this.monitorSender = () => m(this, void 0, void 0, function* () {
        if (!this.sender) {
          this._currentBitrate = 0;
          return;
        }
        let a;
        try {
          a = yield this.getSenderStats();
        } catch (o) {
          this.log.error("could not get audio sender stats", Object.assign(Object.assign({}, this.logContext), {
            error: o
          }));
          return;
        }
        a && this.prevStats && (this._currentBitrate = gi(a, this.prevStats)), this.prevStats = a;
      }), this.handleKrispNoiseFilterEnable = () => {
        this.isKrispNoiseFilterEnabled = true, this.log.debug("Krisp noise filter enabled", this.logContext), this.emit(R.AudioTrackFeatureUpdate, this, ae.TF_ENHANCED_NOISE_CANCELLATION, true);
      }, this.handleKrispNoiseFilterDisable = () => {
        this.isKrispNoiseFilterEnabled = false, this.log.debug("Krisp noise filter disabled", this.logContext), this.emit(R.AudioTrackFeatureUpdate, this, ae.TF_ENHANCED_NOISE_CANCELLATION, false);
      }, this.audioContext = s, this.checkForSilence();
    }
    mute() {
      const e = Object.create(null, {
        mute: {
          get: () => super.mute
        }
      });
      return m(this, void 0, void 0, function* () {
        const t = yield this.muteLock.lock();
        try {
          return this.isMuted ? (this.log.debug("Track already muted", this.logContext), this) : (this.source === C.Source.Microphone && this.stopOnMute && !this.isUserProvided && (this.log.debug("stopping mic track", this.logContext), this._mediaStreamTrack.stop()), yield e.mute.call(this), this);
        } finally {
          t();
        }
      });
    }
    unmute() {
      const e = Object.create(null, {
        unmute: {
          get: () => super.unmute
        }
      });
      return m(this, void 0, void 0, function* () {
        const t = yield this.muteLock.lock();
        try {
          return this.isMuted ? (this.source === C.Source.Microphone && (this.stopOnMute || this._mediaStreamTrack.readyState === "ended" || this.pendingDeviceChange) && !this.isUserProvided && (this.log.debug("reacquiring mic track", this.logContext), yield this.restart(void 0, !0)), yield e.unmute.call(this), this) : (this.log.debug("Track already unmuted", this.logContext), this);
        } finally {
          t();
        }
      });
    }
    restartTrack(e) {
      return m(this, void 0, void 0, function* () {
        let t;
        if (e) {
          const n = zs({
            audio: e
          });
          typeof n.audio != "boolean" && (t = n.audio);
        }
        yield this.restart(t);
      });
    }
    restart(e, t) {
      const n = Object.create(null, {
        restart: {
          get: () => super.restart
        }
      });
      return m(this, void 0, void 0, function* () {
        const s = yield n.restart.call(this, e, t);
        return this.checkForSilence(), s;
      });
    }
    /* @internal */
    startMonitor() {
      Te() && (this.monitorInterval || (this.monitorInterval = setInterval(() => {
        this.monitorSender();
      }, rr)));
    }
    setProcessor(e) {
      return m(this, void 0, void 0, function* () {
        var t;
        const n = yield this.trackChangeLock.lock();
        try {
          if (!Ye() && !this.audioContext)
            throw Error("Audio context needs to be set on LocalAudioTrack in order to enable processors");
          this.processor && (yield this.internalStopProcessor());
          const s = {
            kind: this.kind,
            track: this._mediaStreamTrack,
            // RN won't have or use AudioContext
            audioContext: this.audioContext
          };
          this.log.debug("setting up audio processor ".concat(e.name), this.logContext), yield e.init(s), this.processor = e, this.processor.processedTrack && (yield (t = this.sender) === null || t === void 0 ? void 0 : t.replaceTrack(this.processor.processedTrack), this.processor.processedTrack.addEventListener("enable-lk-krisp-noise-filter", this.handleKrispNoiseFilterEnable), this.processor.processedTrack.addEventListener("disable-lk-krisp-noise-filter", this.handleKrispNoiseFilterDisable)), this.emit(R.TrackProcessorUpdate, this.processor);
        } finally {
          n();
        }
      });
    }
    /**
     * @internal
     * @experimental
     */
    setAudioContext(e) {
      this.audioContext = e;
    }
    getSenderStats() {
      return m(this, void 0, void 0, function* () {
        var e;
        if (!(!((e = this.sender) === null || e === void 0) && e.getStats))
          return;
        const t = yield this.sender.getStats();
        let n;
        return t.forEach((s) => {
          s.type === "outbound-rtp" && (n = {
            type: "audio",
            streamId: s.id,
            packetsSent: s.packetsSent,
            packetsLost: s.packetsLost,
            bytesSent: s.bytesSent,
            timestamp: s.timestamp,
            roundTripTime: s.roundTripTime,
            jitter: s.jitter
          });
        }), n;
      });
    }
    checkForSilence() {
      return m(this, void 0, void 0, function* () {
        const e = yield dc(this);
        return e && (this.isMuted || this.log.debug("silence detected on local audio track", this.logContext), this.emit(R.AudioSilenceDetected)), e;
      });
    }
  }
  function Dh(i, e, t) {
    switch (i.kind) {
      case "audio":
        return new yn(i, e, false, void 0, t);
      case "video":
        return new kn(i, e, false, t);
      default:
        throw new Je("unsupported track type: ".concat(i.kind));
    }
  }
  const Ah = Object.values(gn), xh = Object.values(ms), Nh = Object.values(pi), Lh = [gn.h180, gn.h360], Uh = [ms.h180, ms.h360], Fh = (i) => [{
    scaleResolutionDownBy: 2,
    fps: i.encoding.maxFramerate
  }].map((t) => {
    var n, s;
    return new H(Math.floor(i.width / t.scaleResolutionDownBy), Math.floor(i.height / t.scaleResolutionDownBy), Math.max(15e4, Math.floor(i.encoding.maxBitrate / (Math.pow(t.scaleResolutionDownBy, 2) * (((n = i.encoding.maxFramerate) !== null && n !== void 0 ? n : 30) / ((s = t.fps) !== null && s !== void 0 ? s : 30))))), t.fps, i.encoding.priority);
  }), Es = ["q", "h", "f"];
  function ws(i, e, t, n) {
    var s, r;
    let a = n == null ? void 0 : n.videoEncoding;
    i && (a = n == null ? void 0 : n.screenShareEncoding);
    const o = n == null ? void 0 : n.simulcast, d = n == null ? void 0 : n.scalabilityMode, c = n == null ? void 0 : n.videoCodec;
    if (!a && !o && !d || !e || !t)
      return [{}];
    a || (a = jh(i, e, t, c), U.debug("using video encoding", a));
    const l = a.maxFramerate, u = new H(e, t, a.maxBitrate, a.maxFramerate, a.priority);
    if (d && Fe(c)) {
      const v = new wc(d), g = [];
      if (v.spatial > 3)
        throw new Error("unsupported scalabilityMode: ".concat(d));
      const T = Ce();
      if (vn() || // Even tho RN runs M114, it does not produce SVC layers when a single encoding
      // is provided. So we'll use the legacy SVC specification for now.
      // TODO: when we upstream libwebrtc, this will need additional verification
      Ye() || (T == null ? void 0 : T.name) === "Chrome" && Qe(T == null ? void 0 : T.version, "113") < 0) {
        const k = v.suffix == "h" ? 2 : 3, w = Ou(T);
        for (let O = 0; O < v.spatial; O += 1)
          g.push({
            rid: Es[2 - O],
            maxBitrate: a.maxBitrate / Math.pow(k, O),
            maxFramerate: u.encoding.maxFramerate,
            scaleResolutionDownBy: w ? Math.pow(2, O) : void 0
          });
        g[0].scalabilityMode = d;
      } else
        g.push({
          maxBitrate: a.maxBitrate,
          maxFramerate: u.encoding.maxFramerate,
          /* @ts-ignore */
          scalabilityMode: d
        });
      return u.encoding.priority && (g[0].priority = u.encoding.priority, g[0].networkPriority = u.encoding.priority), U.debug("using svc encoding", {
        encodings: g
      }), g;
    }
    if (!o)
      return [a];
    let h = [];
    i ? h = (s = da(n == null ? void 0 : n.screenShareSimulcastLayers)) !== null && s !== void 0 ? s : ca(i, u) : h = (r = da(n == null ? void 0 : n.videoSimulcastLayers)) !== null && r !== void 0 ? r : ca(i, u);
    let f;
    if (h.length > 0) {
      const v = h[0];
      h.length > 1 && ([, f] = h);
      const g = Math.max(e, t);
      if (g >= 960 && f)
        return Gi(e, t, [v, f, u], l);
      if (g >= 480)
        return Gi(e, t, [v, u], l);
    }
    return Gi(e, t, [u]);
  }
  function Bh(i, e, t) {
    var n, s, r, a;
    if (!t.backupCodec || t.backupCodec === true || t.backupCodec.codec === t.videoCodec)
      return;
    e !== t.backupCodec.codec && U.warn("requested a different codec than specified as backup", {
      serverRequested: e,
      backup: t.backupCodec.codec
    }), t.videoCodec = e, t.videoEncoding = t.backupCodec.encoding;
    const o = i.mediaStreamTrack.getSettings(), d = (n = o.width) !== null && n !== void 0 ? n : (s = i.dimensions) === null || s === void 0 ? void 0 : s.width, c = (r = o.height) !== null && r !== void 0 ? r : (a = i.dimensions) === null || a === void 0 ? void 0 : a.height;
    return i.source === C.Source.ScreenShare && t.simulcast && (t.simulcast = false), ws(i.source === C.Source.ScreenShare, d, c, t);
  }
  function jh(i, e, t, n) {
    const s = qh(i, e, t);
    let {
      encoding: r
    } = s[0];
    const a = Math.max(e, t);
    for (let o = 0; o < s.length; o += 1) {
      const d = s[o];
      if (r = d.encoding, d.width >= a)
        break;
    }
    if (n)
      switch (n) {
        case "av1":
        case "h265":
          r = Object.assign({}, r), r.maxBitrate = r.maxBitrate * 0.7;
          break;
        case "vp9":
          r = Object.assign({}, r), r.maxBitrate = r.maxBitrate * 0.85;
          break;
      }
    return r;
  }
  function qh(i, e, t) {
    if (i)
      return Nh;
    const n = e > t ? e / t : t / e;
    return Math.abs(n - 16 / 9) < Math.abs(n - 4 / 3) ? Ah : xh;
  }
  function ca(i, e) {
    if (i)
      return Fh(e);
    const {
      width: t,
      height: n
    } = e, s = t > n ? t / n : n / t;
    return Math.abs(s - 16 / 9) < Math.abs(s - 4 / 3) ? Lh : Uh;
  }
  function Gi(i, e, t, n) {
    const s = [];
    if (t.forEach((r, a) => {
      if (a >= Es.length)
        return;
      const o = Math.min(i, e), c = {
        rid: Es[a],
        scaleResolutionDownBy: Math.max(1, o / Math.min(r.width, r.height)),
        maxBitrate: r.encoding.maxBitrate
      }, l = n && r.encoding.maxFramerate ? Math.min(n, r.encoding.maxFramerate) : r.encoding.maxFramerate;
      l && (c.maxFramerate = l);
      const u = Mt() || a === 0;
      r.encoding.priority && u && (c.priority = r.encoding.priority, c.networkPriority = r.encoding.priority), s.push(c);
    }), Ye() && pc() === "ios") {
      let r;
      s.forEach((o) => {
        r ? o.maxFramerate && o.maxFramerate > r && (r = o.maxFramerate) : r = o.maxFramerate;
      });
      let a = true;
      s.forEach((o) => {
        var d;
        o.maxFramerate != r && (a && (a = false, U.info("Simulcast on iOS React-Native requires all encodings to share the same framerate.")), U.info('Setting framerate of encoding "'.concat((d = o.rid) !== null && d !== void 0 ? d : "", '" to ').concat(r)), o.maxFramerate = r);
      });
    }
    return s;
  }
  function da(i) {
    if (i)
      return i.sort((e, t) => {
        const {
          encoding: n
        } = e, {
          encoding: s
        } = t;
        return n.maxBitrate > s.maxBitrate ? 1 : n.maxBitrate < s.maxBitrate ? -1 : n.maxBitrate === s.maxBitrate && n.maxFramerate && s.maxFramerate ? n.maxFramerate > s.maxFramerate ? 1 : -1 : 0;
      });
  }
  class wc {
    constructor(e) {
      const t = e.match(/^L(\d)T(\d)(h|_KEY|_KEY_SHIFT){0,1}$/);
      if (!t)
        throw new Error("invalid scalability mode");
      if (this.spatial = parseInt(t[1]), this.temporal = parseInt(t[2]), t.length > 3)
        switch (t[3]) {
          case "h":
          case "_KEY":
          case "_KEY_SHIFT":
            this.suffix = t[3];
        }
    }
    toString() {
      var e;
      return "L".concat(this.spatial, "T").concat(this.temporal).concat((e = this.suffix) !== null && e !== void 0 ? e : "");
    }
  }
  function Vh(i) {
    return i.source === C.Source.ScreenShare || i.constraints.height && Pt(i.constraints.height) >= 1080 ? "maintain-resolution" : "balanced";
  }
  const Wh = 5e3;
  class kn extends Ec {
    get sender() {
      return this._sender;
    }
    set sender(e) {
      this._sender = e, this.degradationPreference && this.setDegradationPreference(this.degradationPreference);
    }
    /**
     *
     * @param mediaTrack
     * @param constraints MediaTrackConstraints that are being used when restarting or reacquiring tracks
     * @param userProvidedTrack Signals to the SDK whether or not the mediaTrack should be managed (i.e. released and reacquired) internally by the SDK
     */
    constructor(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true, s = arguments.length > 3 ? arguments[3] : void 0;
      super(e, C.Kind.Video, t, n, s), this.simulcastCodecs = /* @__PURE__ */ new Map(), this.degradationPreference = "balanced", this.isCpuConstrained = false, this.optimizeForPerformance = false, this.monitorSender = () => m(this, void 0, void 0, function* () {
        if (!this.sender) {
          this._currentBitrate = 0;
          return;
        }
        let r;
        try {
          r = yield this.getSenderStats();
        } catch (d) {
          this.log.error("could not get video sender stats", Object.assign(Object.assign({}, this.logContext), {
            error: d
          }));
          return;
        }
        const a = new Map(r.map((d) => [d.rid, d])), o = r.some((d) => d.qualityLimitationReason === "cpu");
        if (o !== this.isCpuConstrained && (this.isCpuConstrained = o, this.isCpuConstrained && this.emit(R.CpuConstrained)), this.prevStats) {
          let d = 0;
          a.forEach((c, l) => {
            var u;
            const h = (u = this.prevStats) === null || u === void 0 ? void 0 : u.get(l);
            d += gi(c, h);
          }), this._currentBitrate = d;
        }
        this.prevStats = a;
      }), this.senderLock = new ce();
    }
    get isSimulcast() {
      return !!(this.sender && this.sender.getParameters().encodings.length > 1);
    }
    /* @internal */
    startMonitor(e) {
      var t;
      if (this.signalClient = e, !Te())
        return;
      const n = (t = this.sender) === null || t === void 0 ? void 0 : t.getParameters();
      n && (this.encodings = n.encodings), !this.monitorInterval && (this.monitorInterval = setInterval(() => {
        this.monitorSender();
      }, rr));
    }
    stop() {
      this._mediaStreamTrack.getConstraints(), this.simulcastCodecs.forEach((e) => {
        e.mediaStreamTrack.stop();
      }), super.stop();
    }
    pauseUpstream() {
      const e = Object.create(null, {
        pauseUpstream: {
          get: () => super.pauseUpstream
        }
      });
      return m(this, void 0, void 0, function* () {
        var t, n, s, r, a;
        yield e.pauseUpstream.call(this);
        try {
          for (var o = !0, d = Ue(this.simulcastCodecs.values()), c; c = yield d.next(), t = c.done, !t; o = !0)
            r = c.value, o = !1, yield (a = r.sender) === null || a === void 0 ? void 0 : a.replaceTrack(null);
        } catch (l) {
          n = {
            error: l
          };
        } finally {
          try {
            !o && !t && (s = d.return) && (yield s.call(d));
          } finally {
            if (n) throw n.error;
          }
        }
      });
    }
    resumeUpstream() {
      const e = Object.create(null, {
        resumeUpstream: {
          get: () => super.resumeUpstream
        }
      });
      return m(this, void 0, void 0, function* () {
        var t, n, s, r, a;
        yield e.resumeUpstream.call(this);
        try {
          for (var o = !0, d = Ue(this.simulcastCodecs.values()), c; c = yield d.next(), t = c.done, !t; o = !0) {
            r = c.value, o = !1;
            const l = r;
            yield (a = l.sender) === null || a === void 0 ? void 0 : a.replaceTrack(l.mediaStreamTrack);
          }
        } catch (l) {
          n = {
            error: l
          };
        } finally {
          try {
            !o && !t && (s = d.return) && (yield s.call(d));
          } finally {
            if (n) throw n.error;
          }
        }
      });
    }
    mute() {
      const e = Object.create(null, {
        mute: {
          get: () => super.mute
        }
      });
      return m(this, void 0, void 0, function* () {
        const t = yield this.muteLock.lock();
        try {
          return this.isMuted ? (this.log.debug("Track already muted", this.logContext), this) : (this.source === C.Source.Camera && !this.isUserProvided && (this.log.debug("stopping camera track", this.logContext), this._mediaStreamTrack.stop()), yield e.mute.call(this), this);
        } finally {
          t();
        }
      });
    }
    unmute() {
      const e = Object.create(null, {
        unmute: {
          get: () => super.unmute
        }
      });
      return m(this, void 0, void 0, function* () {
        const t = yield this.muteLock.lock();
        try {
          return this.isMuted ? (this.source === C.Source.Camera && !this.isUserProvided && (this.log.debug("reacquiring camera track", this.logContext), yield this.restart(void 0, !0)), yield e.unmute.call(this), this) : (this.log.debug("Track already unmuted", this.logContext), this);
        } finally {
          t();
        }
      });
    }
    setTrackMuted(e) {
      super.setTrackMuted(e);
      for (const t of this.simulcastCodecs.values())
        t.mediaStreamTrack.enabled = !e;
    }
    getSenderStats() {
      return m(this, void 0, void 0, function* () {
        var e;
        if (!(!((e = this.sender) === null || e === void 0) && e.getStats))
          return [];
        const t = [], n = yield this.sender.getStats();
        return n.forEach((s) => {
          var r;
          if (s.type === "outbound-rtp") {
            const a = {
              type: "video",
              streamId: s.id,
              frameHeight: s.frameHeight,
              frameWidth: s.frameWidth,
              framesPerSecond: s.framesPerSecond,
              framesSent: s.framesSent,
              firCount: s.firCount,
              pliCount: s.pliCount,
              nackCount: s.nackCount,
              packetsSent: s.packetsSent,
              bytesSent: s.bytesSent,
              qualityLimitationReason: s.qualityLimitationReason,
              qualityLimitationDurations: s.qualityLimitationDurations,
              qualityLimitationResolutionChanges: s.qualityLimitationResolutionChanges,
              rid: (r = s.rid) !== null && r !== void 0 ? r : s.id,
              retransmittedPacketsSent: s.retransmittedPacketsSent,
              targetBitrate: s.targetBitrate,
              timestamp: s.timestamp
            }, o = n.get(s.remoteId);
            o && (a.jitter = o.jitter, a.packetsLost = o.packetsLost, a.roundTripTime = o.roundTripTime), t.push(a);
          }
        }), t.sort((s, r) => {
          var a, o;
          return ((a = r.frameWidth) !== null && a !== void 0 ? a : 0) - ((o = s.frameWidth) !== null && o !== void 0 ? o : 0);
        }), t;
      });
    }
    setPublishingQuality(e) {
      const t = [];
      for (let n = we.LOW; n <= we.HIGH; n += 1)
        t.push(new Ws({
          quality: n,
          enabled: n <= e
        }));
      this.log.debug("setting publishing quality. max quality ".concat(e), this.logContext), this.setPublishingLayers(Fe(this.codec), t);
    }
    restartTrack(e) {
      return m(this, void 0, void 0, function* () {
        var t, n, s, r, a;
        let o;
        if (e) {
          const u = zs({
            video: e
          });
          typeof u.video != "boolean" && (o = u.video);
        }
        yield this.restart(o), this.isCpuConstrained = false;
        try {
          for (var d = !0, c = Ue(this.simulcastCodecs.values()), l; l = yield c.next(), t = l.done, !t; d = !0) {
            r = l.value, d = !1;
            const u = r;
            u.sender && ((a = u.sender.transport) === null || a === void 0 ? void 0 : a.state) !== "closed" && (u.mediaStreamTrack = this.mediaStreamTrack.clone(), yield u.sender.replaceTrack(u.mediaStreamTrack));
          }
        } catch (u) {
          n = {
            error: u
          };
        } finally {
          try {
            !d && !t && (s = c.return) && (yield s.call(c));
          } finally {
            if (n) throw n.error;
          }
        }
      });
    }
    setProcessor(e) {
      const t = Object.create(null, {
        setProcessor: {
          get: () => super.setProcessor
        }
      });
      return m(this, arguments, void 0, function(n) {
        var s = this;
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return (function* () {
          var a, o, d, c, l, u;
          if (yield t.setProcessor.call(s, n, r), !((l = s.processor) === null || l === void 0) && l.processedTrack)
            try {
              for (var h = !0, f = Ue(s.simulcastCodecs.values()), v; v = yield f.next(), a = v.done, !a; h = !0)
                c = v.value, h = !1, yield (u = c.sender) === null || u === void 0 ? void 0 : u.replaceTrack(s.processor.processedTrack);
            } catch (g) {
              o = {
                error: g
              };
            } finally {
              try {
                !h && !a && (d = f.return) && (yield d.call(f));
              } finally {
                if (o) throw o.error;
              }
            }
        })();
      });
    }
    setDegradationPreference(e) {
      return m(this, void 0, void 0, function* () {
        if (this.degradationPreference = e, this.sender)
          try {
            this.log.debug("setting degradationPreference to ".concat(e), this.logContext);
            const t = this.sender.getParameters();
            t.degradationPreference = e, this.sender.setParameters(t);
          } catch (t) {
            this.log.warn("failed to set degradationPreference", Object.assign({
              error: t
            }, this.logContext));
          }
      });
    }
    addSimulcastTrack(e, t) {
      if (this.simulcastCodecs.has(e)) {
        this.log.error("".concat(e, " already added, skipping adding simulcast codec"), this.logContext);
        return;
      }
      const n = {
        codec: e,
        mediaStreamTrack: this.mediaStreamTrack.clone(),
        sender: void 0,
        encodings: t
      };
      return this.simulcastCodecs.set(e, n), n;
    }
    setSimulcastTrackSender(e, t) {
      const n = this.simulcastCodecs.get(e);
      n && (n.sender = t, setTimeout(() => {
        this.subscribedCodecs && this.setPublishingCodecs(this.subscribedCodecs);
      }, Wh));
    }
    /**
     * @internal
     * Sets codecs that should be publishing, returns new codecs that have not yet
     * been published
     */
    setPublishingCodecs(e) {
      return m(this, void 0, void 0, function* () {
        var t, n, s, r, a, o, d;
        if (this.log.debug("setting publishing codecs", Object.assign(Object.assign({}, this.logContext), {
          codecs: e,
          currentCodec: this.codec
        })), !this.codec && e.length > 0)
          return yield this.setPublishingLayers(Fe(e[0].codec), e[0].qualities), [];
        this.subscribedCodecs = e;
        const c = [];
        try {
          for (t = !0, n = Ue(e); s = yield n.next(), r = s.done, !r; t = !0) {
            d = s.value, t = !1;
            const l = d;
            if (!this.codec || this.codec === l.codec)
              yield this.setPublishingLayers(Fe(l.codec), l.qualities);
            else {
              const u = this.simulcastCodecs.get(l.codec);
              if (this.log.debug("try setPublishingCodec for ".concat(l.codec), Object.assign(Object.assign({}, this.logContext), {
                simulcastCodecInfo: u
              })), !u || !u.sender) {
                for (const h of l.qualities)
                  if (h.enabled) {
                    c.push(l.codec);
                    break;
                  }
              } else u.encodings && (this.log.debug("try setPublishingLayersForSender ".concat(l.codec), this.logContext), yield la(u.sender, u.encodings, l.qualities, this.senderLock, Fe(l.codec), this.log, this.logContext));
            }
          }
        } catch (l) {
          a = {
            error: l
          };
        } finally {
          try {
            !t && !r && (o = n.return) && (yield o.call(n));
          } finally {
            if (a) throw a.error;
          }
        }
        return c;
      });
    }
    /**
     * @internal
     * Sets layers that should be publishing
     */
    setPublishingLayers(e, t) {
      return m(this, void 0, void 0, function* () {
        if (this.optimizeForPerformance) {
          this.log.info("skipping setPublishingLayers due to optimized publishing performance", Object.assign(Object.assign({}, this.logContext), {
            qualities: t
          }));
          return;
        }
        this.log.debug("setting publishing layers", Object.assign(Object.assign({}, this.logContext), {
          qualities: t
        })), !(!this.sender || !this.encodings) && (yield la(this.sender, this.encodings, t, this.senderLock, e, this.log, this.logContext));
      });
    }
    /**
     * Designed for lower powered devices, reduces video publishing quality and disables simulcast.
     * @experimental
     */
    prioritizePerformance() {
      return m(this, void 0, void 0, function* () {
        if (!this.sender)
          throw new Error("sender not found");
        const e = yield this.senderLock.lock();
        try {
          this.optimizeForPerformance = !0;
          const t = this.sender.getParameters();
          t.encodings = t.encodings.map((n, s) => {
            var r;
            return Object.assign(Object.assign({}, n), {
              active: s === 0,
              scaleResolutionDownBy: Math.max(1, Math.ceil(((r = this.mediaStreamTrack.getSettings().height) !== null && r !== void 0 ? r : 360) / 360)),
              scalabilityMode: s === 0 && Fe(this.codec) ? "L1T3" : void 0,
              maxFramerate: s === 0 ? 15 : 0,
              maxBitrate: s === 0 ? n.maxBitrate : 0
            });
          }), this.log.debug("setting performance optimised encodings", Object.assign(Object.assign({}, this.logContext), {
            encodings: t.encodings
          })), this.encodings = t.encodings, yield this.sender.setParameters(t);
        } catch (t) {
          this.log.error("failed to set performance optimised encodings", Object.assign(Object.assign({}, this.logContext), {
            error: t
          })), this.optimizeForPerformance = false;
        } finally {
          e();
        }
      });
    }
    handleAppVisibilityChanged() {
      const e = Object.create(null, {
        handleAppVisibilityChanged: {
          get: () => super.handleAppVisibilityChanged
        }
      });
      return m(this, void 0, void 0, function* () {
        yield e.handleAppVisibilityChanged.call(this), fc() && this.isInBackground && this.source === C.Source.Camera && (this._mediaStreamTrack.enabled = false);
      });
    }
  }
  function la(i, e, t, n, s, r, a) {
    return m(this, void 0, void 0, function* () {
      const o = yield n.lock();
      r.debug("setPublishingLayersForSender", Object.assign(Object.assign({}, a), {
        sender: i,
        qualities: t,
        senderEncodings: e
      }));
      try {
        const d = i.getParameters(), {
          encodings: c
        } = d;
        if (!c)
          return;
        if (c.length !== e.length) {
          r.warn("cannot set publishing layers, encodings mismatch", Object.assign(Object.assign({}, a), {
            encodings: c,
            senderEncodings: e
          }));
          return;
        }
        let l = !1;
        !1 && c[0].scalabilityMode || (s && t.some((f) => f.enabled) && t.forEach((f) => f.enabled = !0), c.forEach((h, f) => {
          var v;
          let g = (v = h.rid) !== null && v !== void 0 ? v : "";
          g === "" && (g = "q");
          const T = Pc(g), k = t.find((w) => w.quality === T);
          k && h.active !== k.enabled && (l = !0, h.active = k.enabled, r.debug("setting layer ".concat(k.quality, " to ").concat(h.active ? "enabled" : "disabled"), a), Mt() && (k.enabled ? (h.scaleResolutionDownBy = e[f].scaleResolutionDownBy, h.maxBitrate = e[f].maxBitrate, h.maxFrameRate = e[f].maxFrameRate) : (h.scaleResolutionDownBy = 4, h.maxBitrate = 10, h.maxFrameRate = 2)));
        })), l && (d.encodings = c, r.debug("setting encodings", Object.assign(Object.assign({}, a), {
          encodings: d.encodings
        })), yield i.setParameters(d));
      } finally {
        o();
      }
    });
  }
  function Pc(i) {
    switch (i) {
      case "f":
        return we.HIGH;
      case "h":
        return we.MEDIUM;
      case "q":
        return we.LOW;
      default:
        return we.HIGH;
    }
  }
  function ua(i, e, t, n) {
    if (!t)
      return [new ut({
        quality: we.HIGH,
        width: i,
        height: e,
        bitrate: 0,
        ssrc: 0
      })];
    if (n) {
      const s = t[0].scalabilityMode, r = new wc(s), a = [], o = r.suffix == "h" ? 1.5 : 2, d = r.suffix == "h" ? 2 : 3;
      for (let c = 0; c < r.spatial; c += 1)
        a.push(new ut({
          quality: Math.min(we.HIGH, r.spatial - 1) - c,
          width: Math.ceil(i / Math.pow(o, c)),
          height: Math.ceil(e / Math.pow(o, c)),
          bitrate: t[0].maxBitrate ? Math.ceil(t[0].maxBitrate / Math.pow(d, c)) : 0,
          ssrc: 0
        }));
      return a;
    }
    return t.map((s) => {
      var r, a, o;
      const d = (r = s.scaleResolutionDownBy) !== null && r !== void 0 ? r : 1;
      let c = Pc((a = s.rid) !== null && a !== void 0 ? a : "");
      return new ut({
        quality: c,
        width: Math.ceil(i / d),
        height: Math.ceil(e / d),
        bitrate: (o = s.maxBitrate) !== null && o !== void 0 ? o : 0,
        ssrc: 0
      });
    });
  }
  const ha = "_lossy", fa = "_reliable", ma = "_data_track", Hh = 2 * 1e3, Ji = "leave-reconnect", Kh = 3e4, Gh = 8 * 1024, Jh = 256 * 1024, zh = 3, Yh = 3;
  var _e;
  (function(i) {
    i[i.New = 0] = "New", i[i.Connected = 1] = "Connected", i[i.Disconnected = 2] = "Disconnected", i[i.Reconnecting = 3] = "Reconnecting", i[i.Closed = 4] = "Closed";
  })(_e || (_e = {}));
  var B;
  (function(i) {
    i[i.RELIABLE = 0] = "RELIABLE", i[i.LOSSY = 1] = "LOSSY", i[i.DATA_TRACK_LOSSY = 2] = "DATA_TRACK_LOSSY";
  })(B || (B = {}));
  class Qh extends Ie.EventEmitter {
    get isClosed() {
      return this._isClosed;
    }
    get isNewlyCreated() {
      return this._isNewlyCreated;
    }
    get pendingReconnect() {
      return !!this.reconnectTimeout;
    }
    constructor(e) {
      var t;
      super(), this.options = e, this.rtcConfig = {}, this.peerConnectionTimeout = ir.peerConnectionTimeout, this.fullReconnectOnNext = false, this.latestRemoteOfferId = 0, this.subscriberPrimary = false, this.pcState = _e.New, this._isClosed = true, this._isNewlyCreated = true, this.pendingTrackResolvers = {}, this.reconnectAttempts = 0, this.reconnectStart = 0, this.attemptingReconnect = false, this.joinAttempts = 0, this.maxJoinAttempts = 1, this.shouldFailNext = false, this.shouldFailOnV1Path = false, this.log = U, this.reliableDataSequence = 1, this.reliableMessageBuffer = new Zr(), this.reliableReceivedState = new ph(Kh), this.lossyDataStatCurrentBytes = 0, this.lossyDataStatByterate = 0, this.lossyDataDropCount = 0, this.midToTrackId = {}, this.isWaitingForNetworkReconnect = false, this.handleDataChannel = (n) => m(this, [n], void 0, function(s) {
        var r = this;
        let {
          channel: a
        } = s;
        return (function* () {
          if (!a)
            return;
          let o;
          if (a.label === fa)
            r.reliableDCSub = a, o = r.handleDataMessage;
          else if (a.label === ha)
            r.lossyDCSub = a, o = r.handleDataMessage;
          else if (a.label === ma)
            r.dataTrackDCSub = a, o = r.handleDataTrackMessage;
          else
            return;
          r.log.debug("on data channel ".concat(a.id, ", ").concat(a.label), r.logContext), a.onmessage = o;
        })();
      }), this.handleDataMessage = (n) => m(this, void 0, void 0, function* () {
        var s, r, a, o, d;
        const c = yield this.dataProcessLock.lock();
        try {
          let l;
          if (n.data instanceof ArrayBuffer)
            l = n.data;
          else if (n.data instanceof Blob)
            l = yield n.data.arrayBuffer();
          else {
            this.log.error("unsupported data type", Object.assign(Object.assign({}, this.logContext), {
              data: n.data
            }));
            return;
          }
          const u = ge.fromBinary(new Uint8Array(l));
          if (u.sequence > 0 && u.participantSid !== "") {
            const h = this.reliableReceivedState.get(u.participantSid);
            if (h && u.sequence <= h)
              return;
            this.reliableReceivedState.set(u.participantSid, u.sequence);
          }
          if (((s = u.value) === null || s === void 0 ? void 0 : s.case) === "speaker")
            this.emit(_.ActiveSpeakersUpdate, u.value.value.speakers);
          else if (((r = u.value) === null || r === void 0 ? void 0 : r.case) === "encryptedPacket") {
            if (!this.e2eeManager) {
              this.log.error("Received encrypted packet but E2EE not set up", this.logContext);
              return;
            }
            const h = yield (a = this.e2eeManager) === null || a === void 0 ? void 0 : a.handleEncryptedData(u.value.value.encryptedValue, u.value.value.iv, u.participantIdentity, u.value.value.keyIndex), f = $a.fromBinary(h.payload), v = new ge({
              value: f.value,
              participantIdentity: u.participantIdentity,
              participantSid: u.participantSid
            });
            ((o = v.value) === null || o === void 0 ? void 0 : o.case) === "user" && pa(v, v.value.value), this.emit(_.DataPacketReceived, v, u.value.value.encryptionType);
          } else
            ((d = u.value) === null || d === void 0 ? void 0 : d.case) === "user" && pa(u, u.value.value), this.emit(_.DataPacketReceived, u, J.NONE);
        } finally {
          c();
        }
      }), this.handleDataTrackMessage = (n) => m(this, void 0, void 0, function* () {
        let s;
        if (n.data instanceof ArrayBuffer)
          s = n.data;
        else if (n.data instanceof Blob)
          s = yield n.data.arrayBuffer();
        else {
          this.log.error("unsupported data type", Object.assign(Object.assign({}, this.logContext), {
            data: n.data
          }));
          return;
        }
        this.emit("dataTrackPacketReceived", new Uint8Array(s));
      }), this.handleDataError = (n) => {
        const r = n.currentTarget.maxRetransmits === 0 ? "lossy" : "reliable";
        if (n instanceof ErrorEvent && n.error) {
          const {
            error: a
          } = n.error;
          this.log.error("DataChannel error on ".concat(r, ": ").concat(n.message), Object.assign(Object.assign({}, this.logContext), {
            error: a
          }));
        } else
          this.log.error("Unknown DataChannel error on ".concat(r), Object.assign(Object.assign({}, this.logContext), {
            event: n
          }));
      }, this.handleBufferedAmountLow = (n) => {
        this.updateAndEmitDCBufferStatus(n);
      }, this.handleDisconnect = (n, s) => {
        if (this._isClosed)
          return;
        this.log.warn("".concat(n, " disconnected"), this.logContext), this.reconnectAttempts === 0 && (this.reconnectStart = Date.now());
        const r = (d) => {
          this.log.warn("could not recover connection after ".concat(this.reconnectAttempts, " attempts, ").concat(d, "ms. giving up"), this.logContext), this.emit(_.Disconnected), this.close();
        }, a = Date.now() - this.reconnectStart;
        let o = this.getNextRetryDelay({
          elapsedMs: a,
          retryCount: this.reconnectAttempts
        });
        if (o === null) {
          r(a);
          return;
        }
        n === Ji && (o = 0), this.log.debug("reconnecting in ".concat(o, "ms"), this.logContext), this.clearReconnectTimeout(), this.token && this.regionUrlProvider && this.regionUrlProvider.updateToken(this.token), this.reconnectTimeout = se.setTimeout(() => this.attemptReconnect(s).finally(() => this.reconnectTimeout = void 0), o);
      }, this.waitForRestarted = () => new Promise((n, s) => {
        this.pcState === _e.Connected && n();
        const r = () => {
          this.off(_.Disconnected, a), n();
        }, a = () => {
          this.off(_.Restarted, r), s();
        };
        this.once(_.Restarted, r), this.once(_.Disconnected, a);
      }), this.updateAndEmitDCBufferStatus = (n) => {
        if (n === B.RELIABLE) {
          const r = this.dataChannelForKind(n);
          r && this.reliableMessageBuffer.alignBufferedAmount(r.bufferedAmount);
        }
        const s = this.isBufferStatusLow(n);
        typeof s < "u" && s !== this.dcBufferStatus.get(n) && (this.dcBufferStatus.set(n, s), this.emit(_.DCBufferStatusChanged, s, n));
      }, this.isBufferStatusLow = (n) => {
        const s = this.dataChannelForKind(n);
        if (s)
          return s.bufferedAmount <= s.bufferedAmountLowThreshold;
      }, this.handleBrowserOnLine = () => m(this, void 0, void 0, function* () {
        !this.url || !(yield fetch(bn(this.url), {
          method: "HEAD"
        }).then((s) => s.ok).catch(() => false)) || (this.log.info("detected network reconnected"), // in case the engine is currently reconnecting, attempt a reconnect immediately after the browser state has changed to 'onLine'
        (this.client.currentState === K.RECONNECTING || // also if the browser went offline before and the engine still thinks it's in a connected state, treat it as a network interruption that we haven't noticed yet
        this.isWaitingForNetworkReconnect && this.client.currentState === K.CONNECTED) && (this.clearReconnectTimeout(), this.attemptReconnect(vt.RR_SIGNAL_DISCONNECTED), this.isWaitingForNetworkReconnect = false));
      }), this.handleBrowserOffline = () => m(this, void 0, void 0, function* () {
        if (this.url)
          try {
            yield Promise.race([
              fetch(bn(this.url), {
                method: "HEAD"
              }),
              // if there's no internet connection the fetch rejects immediately, so we only use a short timeout here
              he(4e3).then(() => Promise.reject())
            ]);
          } catch {
            window.navigator.onLine === false && (this.log.info("detected network interruption"), this.isWaitingForNetworkReconnect = true);
          }
      }), this.log = Ee((t = e.loggerName) !== null && t !== void 0 ? t : fe.Engine), this.loggerOptions = {
        loggerName: e.loggerName,
        loggerContextCb: () => this.logContext
      }, this.client = new Zs(void 0, this.loggerOptions), this.client.signalLatency = this.options.expSignalLatency, this.reconnectPolicy = this.options.reconnectPolicy, this.closingLock = new ce(), this.dataProcessLock = new ce(), this.dcBufferStatus = /* @__PURE__ */ new Map([[B.RELIABLE, true], [B.LOSSY, true], [B.DATA_TRACK_LOSSY, true]]), this.client.onParticipantUpdate = (n) => this.emit(_.ParticipantUpdate, n), this.client.onConnectionQuality = (n) => this.emit(_.ConnectionQualityUpdate, n), this.client.onRoomUpdate = (n) => this.emit(_.RoomUpdate, n), this.client.onSubscriptionError = (n) => this.emit(_.SubscriptionError, n), this.client.onSubscriptionPermissionUpdate = (n) => this.emit(_.SubscriptionPermissionUpdate, n), this.client.onSpeakersChanged = (n) => this.emit(_.SpeakersChanged, n), this.client.onStreamStateUpdate = (n) => this.emit(_.StreamStateChanged, n), this.client.onRequestResponse = (n) => this.emit(_.SignalRequestResponse, n), this.client.onParticipantUpdate = (n) => this.emit(_.ParticipantUpdate, n), this.client.onJoined = (n) => this.emit(_.Joined, n);
    }
    /** @internal */
    get logContext() {
      var e, t, n, s, r, a;
      return {
        room: (t = (e = this.latestJoinResponse) === null || e === void 0 ? void 0 : e.room) === null || t === void 0 ? void 0 : t.name,
        roomID: (s = (n = this.latestJoinResponse) === null || n === void 0 ? void 0 : n.room) === null || s === void 0 ? void 0 : s.sid,
        participant: (a = (r = this.latestJoinResponse) === null || r === void 0 ? void 0 : r.participant) === null || a === void 0 ? void 0 : a.identity,
        participantID: this.participantSid
      };
    }
    join(e, t, n, s) {
      return m(this, arguments, void 0, function(r, a, o, d) {
        var c = this;
        let l = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
        return (function* () {
          var u, h, f, v, g, T;
          c._isNewlyCreated = false, c.url = r, c.token = a, c.signalOpts = o, c.maxJoinAttempts = o.maxRetries;
          try {
            c.joinAttempts += 1, c.setupSignalClientCallbacks();
            let k;
            if (!l && ks()) {
              c.pcManager || (yield c.configure(), c.createDataChannels(), c.addMediaSections(zh, Yh));
              const b = yield (u = c.pcManager) === null || u === void 0 ? void 0 : u.publisher.createInitialOffer();
              b && (k = Tt(b.offer, b.offerId));
            }
            if (d != null && d.aborted)
              throw L.cancelled("Connection aborted");
            if (!l && c.shouldFailOnV1Path)
              throw c.shouldFailOnV1Path = !1, L.serviceNotFound("Simulated v1 path failure", "v0-rtc");
            U.warn("joining signal with ", r);
            const w = yield c.client.join(r, a, o, d, l, k);
            c._isClosed = !1, c.latestJoinResponse = w, c.participantSid = (h = w.participant) === null || h === void 0 ? void 0 : h.sid, c.subscriberPrimary = w.subscriberPrimary, !l && ks() ? (f = c.pcManager) === null || f === void 0 || f.updateConfiguration(c.makeRTCConfiguration(w)) : (c.pcManager || (yield c.configure(w, !l)), (!c.subscriberPrimary || w.fastPublish) && c.negotiate().catch((b) => {
              U.error(b, c.logContext);
            })), c.registerOnLineListener(), c.clientConfiguration = w.clientConfiguration, c.emit(_.SignalConnected, w);
            let O = w.serverInfo;
            return O || (O = {
              version: w.serverVersion,
              region: w.serverRegion
            }), c.log.debug("connected to Livekit Server ".concat(Object.entries(O).map((b) => {
              let [y, S] = b;
              return "".concat(y, ": ").concat(S);
            }).join(", ")), {
              room: (v = w.room) === null || v === void 0 ? void 0 : v.name,
              roomSid: (g = w.room) === null || g === void 0 ? void 0 : g.sid,
              identity: (T = w.participant) === null || T === void 0 ? void 0 : T.identity
            }), {
              joinResponse: w,
              serverInfo: O
            };
          } catch (k) {
            if (k instanceof L) {
              if (k.reason === G.ServerUnreachable) {
                if (c.log.warn("Couldn't connect to server, attempt ".concat(c.joinAttempts, " of ").concat(c.maxJoinAttempts), c.logContext), c.joinAttempts < c.maxJoinAttempts)
                  return c.join(r, a, o, d, l);
              } else if (k.reason === G.ServiceNotFound)
                return c.log.warn("Initial connection failed: ".concat(k.message, " – Retrying")), c.pcManager && (c.pcManager.onStateChange = void 0, yield c.cleanupPeerConnections()), c.join(r, a, o, d, true);
            }
            throw k;
          }
        })();
      });
    }
    close() {
      return m(this, void 0, void 0, function* () {
        const e = yield this.closingLock.lock();
        if (this.isClosed) {
          e();
          return;
        }
        try {
          this._isClosed = !0, this.joinAttempts = 0, this.emit(_.Closing), this.removeAllListeners(), this.deregisterOnLineListener(), this.clearPendingReconnect(), this.cleanupLossyDataStats(), yield this.cleanupPeerConnections(), yield this.cleanupClient();
        } finally {
          e();
        }
      });
    }
    cleanupPeerConnections() {
      return m(this, void 0, void 0, function* () {
        var e;
        yield (e = this.pcManager) === null || e === void 0 ? void 0 : e.close(), this.pcManager = void 0;
        const t = (n) => {
          n && (n.close(), n.onbufferedamountlow = null, n.onclose = null, n.onclosing = null, n.onerror = null, n.onmessage = null, n.onopen = null);
        };
        t(this.lossyDC), t(this.lossyDCSub), t(this.reliableDC), t(this.reliableDCSub), t(this.dataTrackDC), t(this.dataTrackDCSub), this.lossyDC = void 0, this.lossyDCSub = void 0, this.reliableDC = void 0, this.reliableDCSub = void 0, this.dataTrackDC = void 0, this.dataTrackDCSub = void 0, this.reliableMessageBuffer = new Zr(), this.reliableDataSequence = 1, this.reliableReceivedState.clear();
      });
    }
    cleanupLossyDataStats() {
      this.lossyDataStatByterate = 0, this.lossyDataStatCurrentBytes = 0, this.lossyDataStatInterval && (clearInterval(this.lossyDataStatInterval), this.lossyDataStatInterval = void 0), this.lossyDataDropCount = 0;
    }
    cleanupClient() {
      return m(this, void 0, void 0, function* () {
        yield this.client.close(), this.client.resetCallbacks();
      });
    }
    addTrack(e) {
      if (this.pendingTrackResolvers[e.cid])
        throw new Je("a track with the same ID has already been published");
      return new Promise((t, n) => {
        const s = setTimeout(() => {
          delete this.pendingTrackResolvers[e.cid], n(L.timeout("publication of local track timed out, no response from server"));
        }, 1e4);
        this.pendingTrackResolvers[e.cid] = {
          resolve: (r) => {
            clearTimeout(s), t(r);
          },
          reject: () => {
            clearTimeout(s), n(new Error("Cancelled publication by calling unpublish"));
          }
        }, this.client.sendAddTrack(e);
      });
    }
    /**
     * Removes sender from PeerConnection, returning true if it was removed successfully
     * and a negotiation is necessary
     * @param sender
     * @returns
     */
    removeTrack(e) {
      if (e.track && this.pendingTrackResolvers[e.track.id]) {
        const {
          reject: t
        } = this.pendingTrackResolvers[e.track.id];
        t && t(), delete this.pendingTrackResolvers[e.track.id];
      }
      try {
        return this.pcManager.removeTrack(e), !0;
      } catch (t) {
        this.log.warn("failed to remove track", Object.assign(Object.assign({}, this.logContext), {
          error: t
        }));
      }
      return false;
    }
    updateMuteStatus(e, t) {
      this.client.sendMuteTrack(e, t);
    }
    get dataSubscriberReadyState() {
      var e;
      return (e = this.reliableDCSub) === null || e === void 0 ? void 0 : e.readyState;
    }
    getConnectedServerAddress() {
      return m(this, void 0, void 0, function* () {
        var e;
        return (e = this.pcManager) === null || e === void 0 ? void 0 : e.getConnectedAddress();
      });
    }
    /* @internal */
    setRegionUrlProvider(e) {
      this.regionUrlProvider = e;
    }
    configure(e, t) {
      return m(this, void 0, void 0, function* () {
        var n;
        if (!(this.pcManager && this.pcManager.currentState !== X.NEW)) {
          if (e) {
            this.participantSid = (n = e.participant) === null || n === void 0 ? void 0 : n.sid;
            const s = this.makeRTCConfiguration(e);
            this.pcManager = new aa(t ? "publisher-only" : e.subscriberPrimary ? "subscriber-primary" : "publisher-primary", this.loggerOptions, s);
          } else {
            const s = this.makeRTCConfiguration();
            this.pcManager = new aa("publisher-only", this.loggerOptions, s);
          }
          this.emit(_.TransportsCreated, this.pcManager.publisher, this.pcManager.subscriber), this.pcManager.onIceCandidate = (s, r) => {
            this.client.sendIceCandidate(s, r);
          }, this.pcManager.onPublisherOffer = (s, r) => {
            this.client.sendOffer(s, r);
          }, this.pcManager.onDataChannel = this.handleDataChannel, this.pcManager.onStateChange = (s, r, a) => m(this, void 0, void 0, function* () {
            if (this.log.debug("primary PC state changed ".concat(s), this.logContext), ["closed", "disconnected", "failed"].includes(r) && (this.publisherConnectionPromise = void 0), s === X.CONNECTED) {
              const c = this.pcState === _e.New;
              this.pcState = _e.Connected, c && this.emit(_.Connected, this.latestJoinResponse);
            } else s === X.FAILED && (this.pcState === _e.Connected || this.pcState === _e.Reconnecting) && (this.pcState = _e.Disconnected, this.handleDisconnect("peerconnection failed", a === "failed" ? vt.RR_SUBSCRIBER_FAILED : vt.RR_PUBLISHER_FAILED));
            const o = this.client.isDisconnected || this.client.currentState === K.RECONNECTING, d = [X.FAILED, X.CLOSING, X.CLOSED].includes(s);
            o && d && !this._isClosed && this.emit(_.Offline);
          }), this.pcManager.onTrack = (s) => {
            s.streams.length !== 0 && this.emit(_.MediaTrackAdded, s.track, s.streams[0], s.receiver);
          };
        }
      });
    }
    setupSignalClientCallbacks() {
      this.client.onAnswer = (e, t, n) => m(this, void 0, void 0, function* () {
        this.pcManager && (this.log.debug("received server answer", Object.assign(Object.assign({}, this.logContext), {
          RTCSdpType: e.type,
          sdp: e.sdp,
          midToTrackId: n
        })), this.midToTrackId = n, yield this.pcManager.setPublisherAnswer(e, t));
      }), this.client.onTrickle = (e, t) => {
        this.pcManager && (this.log.debug("got ICE candidate from peer", Object.assign(Object.assign({}, this.logContext), {
          candidate: e,
          target: t
        })), this.pcManager.addIceCandidate(e, t));
      }, this.client.onOffer = (e, t, n) => m(this, void 0, void 0, function* () {
        if (this.latestRemoteOfferId = t, !this.pcManager)
          return;
        this.midToTrackId = n;
        const s = yield this.pcManager.createSubscriberAnswerFromOffer(e, t);
        s && this.client.sendAnswer(s, t);
      }), this.client.onLocalTrackPublished = (e) => {
        var t;
        if (this.log.debug("received trackPublishedResponse", Object.assign(Object.assign({}, this.logContext), {
          cid: e.cid,
          track: (t = e.track) === null || t === void 0 ? void 0 : t.sid
        })), !this.pendingTrackResolvers[e.cid]) {
          this.log.error("missing track resolver for ".concat(e.cid), Object.assign(Object.assign({}, this.logContext), {
            cid: e.cid
          }));
          return;
        }
        const {
          resolve: n
        } = this.pendingTrackResolvers[e.cid];
        delete this.pendingTrackResolvers[e.cid], n(e.track);
      }, this.client.onLocalTrackUnpublished = (e) => {
        this.emit(_.LocalTrackUnpublished, e);
      }, this.client.onLocalTrackSubscribed = (e) => {
        this.emit(_.LocalTrackSubscribed, e);
      }, this.client.onTokenRefresh = (e) => {
        var t;
        this.token = e, (t = this.regionUrlProvider) === null || t === void 0 || t.updateToken(e);
      }, this.client.onRemoteMuteChanged = (e, t) => {
        this.emit(_.RemoteMute, e, t);
      }, this.client.onSubscribedQualityUpdate = (e) => {
        this.emit(_.SubscribedQualityUpdate, e);
      }, this.client.onRoomMoved = (e) => {
        var t;
        this.participantSid = (t = e.participant) === null || t === void 0 ? void 0 : t.sid, this.latestJoinResponse && (this.latestJoinResponse.room = e.room), this.emit(_.RoomMoved, e);
      }, this.client.onMediaSectionsRequirement = (e) => {
        this.addMediaSections(e.numAudios, e.numVideos), this.negotiate();
      }, this.client.onPublishDataTrackResponse = (e) => {
        this.emit(_.PublishDataTrackResponse, e);
      }, this.client.onUnPublishDataTrackResponse = (e) => {
        this.emit(_.UnPublishDataTrackResponse, e);
      }, this.client.onDataTrackSubscriberHandles = (e) => {
        this.emit(_.DataTrackSubscriberHandles, e);
      }, this.client.onClose = () => {
        this.handleDisconnect("signal", vt.RR_SIGNAL_DISCONNECTED);
      }, this.client.onLeave = (e) => {
        switch (this.log.debug("client leave request", Object.assign(Object.assign({}, this.logContext), {
          reason: e == null ? void 0 : e.reason
        })), e.regions && this.regionUrlProvider && (this.log.debug("updating regions", this.logContext), this.regionUrlProvider.setServerReportedRegions({
          updatedAtInMs: Date.now(),
          maxAgeInMs: Sc,
          regionSettings: e.regions
        })), e.action) {
          case Bt.DISCONNECT:
            this.emit(_.Disconnected, e == null ? void 0 : e.reason), this.close();
            break;
          case Bt.RECONNECT:
            this.fullReconnectOnNext = true, this.handleDisconnect(Ji);
            break;
          case Bt.RESUME:
            this.handleDisconnect(Ji);
        }
      };
    }
    makeRTCConfiguration(e) {
      var t;
      const n = Object.assign({}, this.rtcConfig);
      if (!((t = this.signalOpts) === null || t === void 0) && t.e2eeEnabled && (this.log.debug("E2EE - setting up transports with insertable streams", this.logContext), n.encodedInsertableStreams = true), n.sdpSemantics = "unified-plan", n.continualGatheringPolicy = "gather_continually", !e)
        return n;
      if (e.iceServers && !n.iceServers) {
        const s = [];
        e.iceServers.forEach((r) => {
          const a = {
            urls: r.urls
          };
          r.username && (a.username = r.username), r.credential && (a.credential = r.credential), s.push(a);
        }), n.iceServers = s;
      }
      return e.clientConfiguration && e.clientConfiguration.forceRelay === hn.ENABLED && (n.iceTransportPolicy = "relay"), n;
    }
    addMediaSections(e, t) {
      var n, s;
      const r = {
        direction: "recvonly"
      };
      for (let a = 0; a < e; a++)
        (n = this.pcManager) === null || n === void 0 || n.addPublisherTransceiverOfKind("audio", r);
      for (let a = 0; a < t; a++)
        (s = this.pcManager) === null || s === void 0 || s.addPublisherTransceiverOfKind("video", r);
    }
    createDataChannels() {
      this.pcManager && (this.lossyDC && (this.lossyDC.onmessage = null, this.lossyDC.onerror = null), this.reliableDC && (this.reliableDC.onmessage = null, this.reliableDC.onerror = null), this.dataTrackDC && (this.dataTrackDC.onmessage = null, this.dataTrackDC.onerror = null), this.lossyDC = this.pcManager.createPublisherDataChannel(ha, {
        ordered: false,
        maxRetransmits: 0
      }), this.reliableDC = this.pcManager.createPublisherDataChannel(fa, {
        ordered: true
      }), this.dataTrackDC = this.pcManager.createPublisherDataChannel(ma, {
        ordered: false,
        maxRetransmits: 0
      }), this.lossyDC.onmessage = this.handleDataMessage, this.reliableDC.onmessage = this.handleDataMessage, this.dataTrackDC.onmessage = this.handleDataTrackMessage, this.lossyDC.onerror = this.handleDataError, this.reliableDC.onerror = this.handleDataError, this.dataTrackDC.onerror = this.handleDataError, this.lossyDC.bufferedAmountLowThreshold = 65535, this.reliableDC.bufferedAmountLowThreshold = 65535, this.dataTrackDC.bufferedAmountLowThreshold = 65535, this.lossyDC.onbufferedamountlow = () => this.handleBufferedAmountLow(B.LOSSY), this.reliableDC.onbufferedamountlow = () => this.handleBufferedAmountLow(B.RELIABLE), this.dataTrackDC.onbufferedamountlow = () => this.handleBufferedAmountLow(B.DATA_TRACK_LOSSY), this.cleanupLossyDataStats(), this.lossyDataStatInterval = setInterval(() => {
        this.lossyDataStatByterate = this.lossyDataStatCurrentBytes, this.lossyDataStatCurrentBytes = 0;
        const e = this.dataChannelForKind(B.LOSSY);
        if (e) {
          const t = this.lossyDataStatByterate / 10;
          e.bufferedAmountLowThreshold = Math.min(Math.max(t, Gh), Jh);
        }
      }, 1e3));
    }
    createSender(e, t, n) {
      return m(this, void 0, void 0, function* () {
        if ($n())
          return yield this.createTransceiverRTCRtpSender(e, t, n);
        if (vs())
          return this.log.warn("using add-track fallback", this.logContext), yield this.createRTCRtpSender(e.mediaStreamTrack);
        throw new Q("Required webRTC APIs not supported on this device");
      });
    }
    createSimulcastSender(e, t, n, s) {
      return m(this, void 0, void 0, function* () {
        if ($n())
          return this.createSimulcastTransceiverSender(e, t, n, s);
        if (vs())
          return this.log.debug("using add-track fallback", this.logContext), this.createRTCRtpSender(e.mediaStreamTrack);
        throw new Q("Cannot stream on this device");
      });
    }
    createTransceiverRTCRtpSender(e, t, n) {
      return m(this, void 0, void 0, function* () {
        if (!this.pcManager)
          throw new Q("publisher is closed");
        const s = [];
        e.mediaStream && s.push(e.mediaStream), pt(e) && (e.codec = t.videoCodec);
        const r = {
          direction: "sendonly",
          streams: s
        };
        return n && (r.sendEncodings = n), (yield this.pcManager.addPublisherTransceiver(e.mediaStreamTrack, r)).sender;
      });
    }
    createSimulcastTransceiverSender(e, t, n, s) {
      return m(this, void 0, void 0, function* () {
        if (!this.pcManager)
          throw new Q("publisher is closed");
        const r = {
          direction: "sendonly"
        };
        s && (r.sendEncodings = s);
        const a = yield this.pcManager.addPublisherTransceiver(t.mediaStreamTrack, r);
        if (n.videoCodec)
          return e.setSimulcastTrackSender(n.videoCodec, a.sender), a.sender;
      });
    }
    createRTCRtpSender(e) {
      return m(this, void 0, void 0, function* () {
        if (!this.pcManager)
          throw new Q("publisher is closed");
        return this.pcManager.addPublisherTrack(e);
      });
    }
    attemptReconnect(e) {
      return m(this, void 0, void 0, function* () {
        var t, n, s;
        if (!this._isClosed) {
          if (this.attemptingReconnect) {
            U.warn("already attempting reconnect, returning early", this.logContext);
            return;
          }
          (((t = this.clientConfiguration) === null || t === void 0 ? void 0 : t.resumeConnection) === hn.DISABLED || // signaling state could change to closed due to hardware sleep
          // those connections cannot be resumed
          ((s = (n = this.pcManager) === null || n === void 0 ? void 0 : n.currentState) !== null && s !== void 0 ? s : X.NEW) === X.NEW) && (this.fullReconnectOnNext = true);
          try {
            this.attemptingReconnect = !0, this.fullReconnectOnNext ? yield this.restartConnection() : yield this.resumeConnection(e), this.clearPendingReconnect(), this.fullReconnectOnNext = !1;
          } catch (r) {
            this.reconnectAttempts += 1;
            let a = true;
            r instanceof Q ? (this.log.debug("received unrecoverable error", Object.assign(Object.assign({}, this.logContext), {
              error: r
            })), a = false) : r instanceof Nt || (this.fullReconnectOnNext = true), a ? this.handleDisconnect("reconnect", vt.RR_UNKNOWN) : (this.log.info("could not recover connection after ".concat(this.reconnectAttempts, " attempts, ").concat(Date.now() - this.reconnectStart, "ms. giving up"), this.logContext), this.emit(_.Disconnected), yield this.close());
          } finally {
            this.attemptingReconnect = false;
          }
        }
      });
    }
    getNextRetryDelay(e) {
      try {
        return this.reconnectPolicy.nextRetryDelayInMs(e);
      } catch (t) {
        this.log.warn("encountered error in reconnect policy", Object.assign(Object.assign({}, this.logContext), {
          error: t
        }));
      }
      return null;
    }
    restartConnection(e) {
      return m(this, void 0, void 0, function* () {
        var t, n, s;
        try {
          if (!this.url || !this.token)
            throw new Q("could not reconnect, url or token not saved");
          this.log.info("reconnecting, attempt: ".concat(this.reconnectAttempts), this.logContext), this.emit(_.Restarting), this.client.isDisconnected || (yield this.client.sendLeave()), yield this.cleanupPeerConnections(), yield this.cleanupClient();
          let r;
          try {
            if (!this.signalOpts)
              throw this.log.warn("attempted connection restart, without signal options present", this.logContext), new Nt();
            r = (yield this.join(e ?? this.url, this.token, this.signalOpts, void 0, !this.options.singlePeerConnection)).joinResponse;
          } catch (a) {
            throw a instanceof L && a.reason === G.NotAllowed ? new Q("could not reconnect, token might be expired") : new Nt();
          }
          if (this.shouldFailNext)
            throw this.shouldFailNext = !1, new Error("simulated failure");
          if (this.client.setReconnected(), this.emit(_.SignalRestarted, r), yield this.waitForPCReconnected(), this.client.currentState !== K.CONNECTED)
            throw new Nt("Signal connection got severed during reconnect");
          (t = this.regionUrlProvider) === null || t === void 0 || t.resetAttempts(), this.emit(_.Restarted);
        } catch (r) {
          const a = yield (n = this.regionUrlProvider) === null || n === void 0 ? void 0 : n.getNextBestRegionUrl();
          if (a) {
            yield this.restartConnection(a);
            return;
          } else
            throw (s = this.regionUrlProvider) === null || s === void 0 || s.resetAttempts(), r;
        }
      });
    }
    resumeConnection(e) {
      return m(this, void 0, void 0, function* () {
        var t;
        if (!this.url || !this.token)
          throw new Q("could not reconnect, url or token not saved");
        if (!this.pcManager)
          throw new Q("publisher and subscriber connections unset");
        this.log.info("resuming signal connection, attempt ".concat(this.reconnectAttempts), this.logContext), this.emit(_.Resuming);
        let n;
        try {
          this.setupSignalClientCallbacks(), n = yield this.client.reconnect(this.url, this.token, this.participantSid, e);
        } catch (s) {
          let r = "";
          throw s instanceof Error && (r = s.message, this.log.error(s.message, Object.assign(Object.assign({}, this.logContext), {
            error: s
          }))), s instanceof L && s.reason === G.NotAllowed ? new Q("could not reconnect, token might be expired") : s instanceof L && s.reason === G.LeaveRequest ? s : new Nt(r);
        }
        if (this.emit(_.SignalResumed), n) {
          const s = this.makeRTCConfiguration(n);
          this.pcManager.updateConfiguration(s), this.latestJoinResponse && (this.latestJoinResponse.serverInfo = n.serverInfo);
        } else
          this.log.warn("Did not receive reconnect response", this.logContext);
        if (this.shouldFailNext)
          throw this.shouldFailNext = false, new Error("simulated failure");
        if (yield this.pcManager.triggerIceRestart(), yield this.waitForPCReconnected(), this.client.currentState !== K.CONNECTED)
          throw new Nt("Signal connection got severed during reconnect");
        this.client.setReconnected(), ((t = this.reliableDC) === null || t === void 0 ? void 0 : t.readyState) === "open" && this.reliableDC.id === null && this.createDataChannels(), n != null && n.lastMessageSeq && this.resendReliableMessagesForResume(n.lastMessageSeq), this.emit(_.Resumed);
      });
    }
    waitForPCInitialConnection(e, t) {
      return m(this, void 0, void 0, function* () {
        if (!this.pcManager)
          throw new Q("PC manager is closed");
        yield this.pcManager.ensurePCTransportConnection(t, e);
      });
    }
    waitForPCReconnected() {
      return m(this, void 0, void 0, function* () {
        this.pcState = _e.Reconnecting, this.log.debug("waiting for peer connection to reconnect", this.logContext);
        try {
          if (yield he(Hh), !this.pcManager)
            throw new Q("PC manager is closed");
          yield this.pcManager.ensurePCTransportConnection(void 0, this.peerConnectionTimeout), this.pcState = _e.Connected;
        } catch (e) {
          throw this.pcState = _e.Disconnected, L.internal("could not establish PC connection, ".concat(e.message));
        }
      });
    }
    /** @internal */
    publishRpcResponse(e, t, n, s) {
      return m(this, void 0, void 0, function* () {
        const r = new ge({
          destinationIdentities: [e],
          kind: Et.RELIABLE,
          value: {
            case: "rpcResponse",
            value: new Ls({
              requestId: t,
              value: s ? {
                case: "error",
                value: s.toProto()
              } : {
                case: "payload",
                value: n ?? ""
              }
            })
          }
        });
        yield this.sendDataPacket(r, B.RELIABLE);
      });
    }
    /** @internal */
    publishRpcAck(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = new ge({
          destinationIdentities: [e],
          kind: Et.RELIABLE,
          value: {
            case: "rpcAck",
            value: new Ns({
              requestId: t
            })
          }
        });
        yield this.sendDataPacket(n, B.RELIABLE);
      });
    }
    /* @internal */
    sendDataPacket(e, t) {
      return m(this, void 0, void 0, function* () {
        if (yield this.ensurePublisherConnected(t), this.e2eeManager && this.e2eeManager.isDataChannelEncryptionEnabled) {
          const s = th(e);
          if (s) {
            const r = yield this.e2eeManager.encryptData(s.toBinary());
            e.value = {
              case: "encryptedPacket",
              value: new Xa({
                encryptedValue: r.payload,
                iv: r.iv,
                keyIndex: r.keyIndex
              })
            };
          }
        }
        t === B.RELIABLE && (e.sequence = this.reliableDataSequence, this.reliableDataSequence += 1);
        const n = e.toBinary();
        switch (t) {
          case B.LOSSY:
          case B.DATA_TRACK_LOSSY:
            return this.sendLossyBytes(n, t);
          case B.RELIABLE:
            const s = this.dataChannelForKind(t);
            if (s) {
              if (yield this.waitForBufferStatusLow(t), this.reliableMessageBuffer.push({
                data: n,
                sequence: e.sequence
              }), this.attemptingReconnect)
                return;
              s.send(n);
            }
            this.updateAndEmitDCBufferStatus(t);
            break;
        }
      });
    }
    /* @internal */
    sendLossyBytes(e, t) {
      return m(this, arguments, void 0, function(n, s) {
        var r = this;
        let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "drop";
        return (function* () {
          yield r.ensurePublisherConnected(s);
          const o = r.dataChannelForKind(s);
          if (o) {
            if (!r.isBufferStatusLow(s))
              switch (a) {
                case "wait":
                  yield r.waitForBufferStatusLow(s);
                  break;
                case "drop":
                  r.lossyDataDropCount += 1, r.lossyDataDropCount % 100 === 0 && r.log.warn("dropping lossy data channel messages, total dropped: ".concat(r.lossyDataDropCount), r.logContext);
                  return;
              }
            if (r.lossyDataStatCurrentBytes += n.byteLength, r.attemptingReconnect)
              return;
            o.send(n);
          }
          r.updateAndEmitDCBufferStatus(s);
        })();
      });
    }
    resendReliableMessagesForResume(e) {
      return m(this, void 0, void 0, function* () {
        yield this.ensurePublisherConnected(B.RELIABLE);
        const t = this.dataChannelForKind(B.RELIABLE);
        t && (this.reliableMessageBuffer.popToSequence(e), this.reliableMessageBuffer.getAll().forEach((n) => {
          t.send(n.data);
        })), this.updateAndEmitDCBufferStatus(B.RELIABLE);
      });
    }
    waitForBufferStatusLow(e) {
      return m(this, void 0, void 0, function* () {
        return new ue((t, n) => m(this, void 0, void 0, function* () {
          if (this.isClosed && n(new Q("engine closed")), this.isBufferStatusLow(e))
            t();
          else {
            const s = () => n(new Q("engine closed"));
            this.once(_.Closing, s);
            const r = this.dataChannelForKind(e);
            if (!r) {
              n(new Q("DataChannel not found, kind: ".concat(e)));
              return;
            }
            r.addEventListener("bufferedamountlow", () => {
              this.off(_.Closing, s), t();
            }, {
              once: true
            });
          }
        }));
      });
    }
    /**
     * @internal
     */
    ensureDataTransportConnected(e) {
      return m(this, arguments, void 0, function(t) {
        var n = this;
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.subscriberPrimary;
        return (function* () {
          var r;
          if (!n.pcManager)
            throw new Q("PC manager is closed");
          const a = s ? n.pcManager.subscriber : n.pcManager.publisher, o = s ? "Subscriber" : "Publisher";
          if (!a)
            throw L.internal("".concat(o, " connection not set"));
          let d = false;
          !s && !n.dataChannelForKind(t, s) && (n.createDataChannels(), d = true), !d && !s && !n.pcManager.publisher.isICEConnected && n.pcManager.publisher.getICEConnectionState() !== "checking" && (d = true), d && n.negotiate().catch((u) => {
            U.error(u, n.logContext);
          });
          const c = n.dataChannelForKind(t, s);
          if ((c == null ? void 0 : c.readyState) === "open")
            return;
          const l = (/* @__PURE__ */ new Date()).getTime() + n.peerConnectionTimeout;
          for (; (/* @__PURE__ */ new Date()).getTime() < l; ) {
            if (a.isICEConnected && ((r = n.dataChannelForKind(t, s)) === null || r === void 0 ? void 0 : r.readyState) === "open")
              return;
            yield he(50);
          }
          throw L.internal("could not establish ".concat(o, " connection, state: ").concat(a.getICEConnectionState()));
        })();
      });
    }
    ensurePublisherConnected(e) {
      return m(this, void 0, void 0, function* () {
        this.publisherConnectionPromise || (this.publisherConnectionPromise = this.ensureDataTransportConnected(e, false)), yield this.publisherConnectionPromise;
      });
    }
    /* @internal */
    verifyTransport() {
      return !(!this.pcManager || ![X.CONNECTING, X.CONNECTED].includes(this.pcManager.currentState) || !this.client.ws || this.client.ws.readyState === WebSocket.CLOSED);
    }
    /** @internal */
    negotiate() {
      return m(this, void 0, void 0, function* () {
        return new ue((e, t) => m(this, void 0, void 0, function* () {
          if (!this.pcManager) {
            t(new wt("PC manager is closed"));
            return;
          }
          this.pcManager.requirePublisher(), this.pcManager.publisher.getTransceivers().length == 0 && !this.lossyDC && !this.reliableDC && !this.dataTrackDC && this.createDataChannels();
          const n = new AbortController(), s = () => {
            n.abort(), this.log.debug("engine disconnected while negotiation was ongoing", this.logContext), e();
          };
          this.isClosed && t(new wt("cannot negotiate on closed engine")), this.on(_.Closing, s), this.on(_.Restarting, s), this.pcManager.publisher.once(It.RTPVideoPayloadTypes, (r) => {
            const a = /* @__PURE__ */ new Map();
            r.forEach((o) => {
              const d = o.codec.toLowerCase();
              Nu(d) && a.set(o.payload, d);
            }), this.emit(_.RTPVideoMapUpdate, a);
          });
          try {
            yield this.pcManager.negotiate(n), e();
          } catch (r) {
            if (n.signal.aborted) {
              e();
              return;
            }
            r instanceof wt && (this.fullReconnectOnNext = true), this.handleDisconnect("negotiation", vt.RR_UNKNOWN), r instanceof Error ? t(r) : t(new Error(String(r)));
          } finally {
            this.off(_.Closing, s), this.off(_.Restarting, s);
          }
        }));
      });
    }
    dataChannelForKind(e, t) {
      switch (e) {
        case B.RELIABLE:
          return t ? this.reliableDCSub : this.reliableDC;
        case B.LOSSY:
          return t ? this.lossyDCSub : this.lossyDC;
        case B.DATA_TRACK_LOSSY:
          return t ? this.dataTrackDCSub : this.dataTrackDC;
      }
    }
    /** @internal */
    sendSyncState(e, t, n) {
      var s, r, a, o;
      if (!this.pcManager) {
        this.log.warn("sync state cannot be sent without peer connection setup", this.logContext);
        return;
      }
      const d = this.pcManager.publisher.getLocalDescription(), c = this.pcManager.publisher.getRemoteDescription(), l = (s = this.pcManager.subscriber) === null || s === void 0 ? void 0 : s.getRemoteDescription(), u = (r = this.pcManager.subscriber) === null || r === void 0 ? void 0 : r.getLocalDescription(), h = (o = (a = this.signalOpts) === null || a === void 0 ? void 0 : a.autoSubscribe) !== null && o !== void 0 ? o : true, f = new Array(), v = new Array();
      e.forEach((g) => {
        g.isDesired !== h && f.push(g.trackSid), g.isEnabled || v.push(g.trackSid);
      }), this.client.sendSyncState(new Hs({
        answer: this.pcManager.mode === "publisher-only" ? c ? Tt({
          sdp: c.sdp,
          type: c.type
        }) : void 0 : u ? Tt({
          sdp: u.sdp,
          type: u.type
        }) : void 0,
        offer: this.pcManager.mode === "publisher-only" ? d ? Tt({
          sdp: d.sdp,
          type: d.type
        }) : void 0 : l ? Tt({
          sdp: l.sdp,
          type: l.type
        }) : void 0,
        subscription: new ci({
          trackSids: f,
          subscribe: !h,
          participantTracks: []
        }),
        publishTracks: yu(t),
        dataChannels: this.dataChannelsInfo(),
        trackSidsDisabled: v,
        datachannelReceiveStates: this.reliableReceivedState.map((g, T) => new ko({
          publisherSid: T,
          lastSeq: g
        })),
        publishDataTracks: n.map((g) => new Fs({
          info: ei.toProtobuf(g)
        }))
      }));
    }
    /* @internal */
    failNext() {
      this.shouldFailNext = true;
    }
    /* @internal */
    failNextV1Path() {
      this.shouldFailOnV1Path = true;
    }
    dataChannelsInfo() {
      const e = [], t = (n, s) => {
        (n == null ? void 0 : n.id) !== void 0 && n.id !== null && e.push(new To({
          label: n.label,
          id: n.id,
          target: s
        }));
      };
      return t(this.dataChannelForKind(B.LOSSY), Le.PUBLISHER), t(this.dataChannelForKind(B.RELIABLE), Le.PUBLISHER), t(this.dataChannelForKind(B.LOSSY, true), Le.SUBSCRIBER), t(this.dataChannelForKind(B.RELIABLE, true), Le.SUBSCRIBER), e;
    }
    clearReconnectTimeout() {
      this.reconnectTimeout && se.clearTimeout(this.reconnectTimeout);
    }
    clearPendingReconnect() {
      this.clearReconnectTimeout(), this.reconnectAttempts = 0;
    }
    registerOnLineListener() {
      Te() && (window.addEventListener("online", this.handleBrowserOnLine), window.addEventListener("offline", this.handleBrowserOffline));
    }
    deregisterOnLineListener() {
      Te() && (window.removeEventListener("online", this.handleBrowserOnLine), window.removeEventListener("offline", this.handleBrowserOffline));
    }
    getTrackIdForReceiver(e) {
      var t;
      const n = (t = this.pcManager) === null || t === void 0 ? void 0 : t.getMidForReceiver(e);
      if (n) {
        const s = Object.entries(this.midToTrackId).find((r) => {
          let [a] = r;
          return a === n;
        });
        if (s)
          return s[1];
      }
    }
  }
  function pa(i, e) {
    const t = i.participantIdentity ? i.participantIdentity : e.participantIdentity;
    i.participantIdentity = t, e.participantIdentity = t;
    const n = i.destinationIdentities.length !== 0 ? i.destinationIdentities : e.destinationIdentities;
    i.destinationIdentities = n, e.destinationIdentities = n;
  }
  class _c {
    get info() {
      return this._info;
    }
    /** @internal */
    validateBytesReceived() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (!(typeof this.totalByteSize != "number" || this.totalByteSize === 0)) {
        if (e && this.bytesReceived < this.totalByteSize)
          throw new Re("Not enough chunk(s) received - expected ".concat(this.totalByteSize, " bytes of data total, only received ").concat(this.bytesReceived, " bytes"), pe.Incomplete);
        if (this.bytesReceived > this.totalByteSize)
          throw new Re("Extra chunk(s) received - expected ".concat(this.totalByteSize, " bytes of data total, received ").concat(this.bytesReceived, " bytes"), pe.LengthExceeded);
      }
    }
    constructor(e, t, n) {
      this.reader = t, this.totalByteSize = n, this._info = e, this.bytesReceived = 0;
    }
  }
  class Xh extends _c {
    handleChunkReceived(e) {
      var t;
      this.bytesReceived += e.content.byteLength, this.validateBytesReceived();
      const n = this.totalByteSize ? this.bytesReceived / this.totalByteSize : void 0;
      (t = this.onProgress) === null || t === void 0 || t.call(this, n);
    }
    [Symbol.asyncIterator]() {
      const e = this.reader.getReader();
      e.closed.catch(() => {
      });
      const t = () => {
        e.releaseLock(), this.signal = void 0;
      };
      return {
        next: () => m(this, void 0, void 0, function* () {
          try {
            const n = this.signal;
            if (n != null && n.aborted)
              throw n.reason;
            const s = yield new Promise((r, a) => {
              if (n) {
                const o = () => a(n.reason);
                n.addEventListener("abort", o, {
                  once: !0
                }), e.read().then(r, a).finally(() => {
                  n.removeEventListener("abort", o);
                });
              } else
                e.read().then(r, a);
            });
            return s.done ? (this.validateBytesReceived(!0), {
              done: !0,
              value: void 0
            }) : (this.handleChunkReceived(s.value), {
              done: !1,
              value: s.value.content
            });
          } catch (n) {
            throw t(), n;
          }
        }),
        // note: `return` runs only for premature exits, see:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#errors_during_iteration
        return() {
          return m(this, void 0, void 0, function* () {
            return t(), {
              done: true,
              value: void 0
            };
          });
        }
      };
    }
    /**
     * Injects an AbortSignal, which if aborted, will terminate the currently active
     * stream iteration operation.
     *
     * Note that when using AbortSignal.timeout(...), the timeout applies across
     * the whole iteration operation, not just one individual chunk read.
     */
    withAbortSignal(e) {
      return this.signal = e, this;
    }
    readAll() {
      return m(this, arguments, void 0, function() {
        var e = this;
        let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return (function* () {
          var n, s, r, a;
          let o = /* @__PURE__ */ new Set();
          const d = t.signal ? e.withAbortSignal(t.signal) : e;
          try {
            for (var c = !0, l = Ue(d), u; u = yield l.next(), n = u.done, !n; c = !0) {
              a = u.value, c = !1;
              const h = a;
              o.add(h);
            }
          } catch (h) {
            s = {
              error: h
            };
          } finally {
            try {
              !c && !n && (r = l.return) && (yield r.call(l));
            } finally {
              if (s) throw s.error;
            }
          }
          return Array.from(o);
        })();
      });
    }
  }
  class $h extends _c {
    /**
     * A TextStreamReader instance can be used as an AsyncIterator that returns the entire string
     * that has been received up to the current point in time.
     */
    constructor(e, t, n) {
      super(e, t, n), this.receivedChunks = /* @__PURE__ */ new Map();
    }
    handleChunkReceived(e) {
      var t;
      const n = Vn(e.chunkIndex), s = this.receivedChunks.get(n);
      if (s && s.version > e.version)
        return;
      this.receivedChunks.set(n, e), this.bytesReceived += e.content.byteLength, this.validateBytesReceived();
      const r = this.totalByteSize ? this.bytesReceived / this.totalByteSize : void 0;
      (t = this.onProgress) === null || t === void 0 || t.call(this, r);
    }
    /**
     * Async iterator implementation to allow usage of `for await...of` syntax.
     * Yields structured chunks from the stream.
     *
     */
    [Symbol.asyncIterator]() {
      const e = this.reader.getReader();
      e.closed.catch(() => {
      });
      const t = new TextDecoder("utf-8", {
        fatal: true
      }), n = this.signal, s = () => {
        e.releaseLock(), this.signal = void 0;
      };
      return {
        next: () => m(this, void 0, void 0, function* () {
          try {
            if (n != null && n.aborted)
              throw n.reason;
            const r = yield new Promise((a, o) => {
              if (n) {
                const d = () => o(n.reason);
                n.addEventListener("abort", d, {
                  once: !0
                }), e.read().then(a, o).finally(() => {
                  n.removeEventListener("abort", d);
                });
              } else
                e.read().then(a, o);
            });
            if (r.done)
              return this.validateBytesReceived(!0), {
                done: !0,
                value: void 0
              };
            {
              this.handleChunkReceived(r.value);
              let a;
              try {
                a = t.decode(r.value.content);
              } catch (o) {
                throw new Re("Cannot decode datastream chunk ".concat(r.value.chunkIndex, " as text: ").concat(o), pe.DecodeFailed);
              }
              return {
                done: !1,
                value: a
              };
            }
          } catch (r) {
            throw s(), r;
          }
        }),
        // note: `return` runs only for premature exits, see:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#errors_during_iteration
        return() {
          return m(this, void 0, void 0, function* () {
            return s(), {
              done: true,
              value: void 0
            };
          });
        }
      };
    }
    /**
     * Injects an AbortSignal, which if aborted, will terminate the currently active
     * stream iteration operation.
     *
     * Note that when using AbortSignal.timeout(...), the timeout applies across
     * the whole iteration operation, not just one individual chunk read.
     */
    withAbortSignal(e) {
      return this.signal = e, this;
    }
    readAll() {
      return m(this, arguments, void 0, function() {
        var e = this;
        let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return (function* () {
          var n, s, r, a;
          let o = "";
          const d = t.signal ? e.withAbortSignal(t.signal) : e;
          try {
            for (var c = !0, l = Ue(d), u; u = yield l.next(), n = u.done, !n; c = !0)
              a = u.value, c = !1, o += a;
          } catch (h) {
            s = {
              error: h
            };
          } finally {
            try {
              !c && !n && (r = l.return) && (yield r.call(l));
            } finally {
              if (s) throw s.error;
            }
          }
          return o;
        })();
      });
    }
  }
  class Zh {
    constructor() {
      this.log = U, this.byteStreamControllers = /* @__PURE__ */ new Map(), this.textStreamControllers = /* @__PURE__ */ new Map(), this.byteStreamHandlers = /* @__PURE__ */ new Map(), this.textStreamHandlers = /* @__PURE__ */ new Map(), this.isConnected = false, this.bufferedPackets = [];
    }
    setConnected(e) {
      this.isConnected = e, e && this.flushBufferedPackets();
    }
    flushBufferedPackets() {
      const e = this.bufferedPackets;
      this.bufferedPackets = [];
      for (const {
        packet: t,
        encryptionType: n
      } of e)
        this.handleDataStreamPacket(t, n);
    }
    registerTextStreamHandler(e, t) {
      if (this.textStreamHandlers.has(e))
        throw new Re('A text stream handler for topic "'.concat(e, '" has already been set.'), pe.HandlerAlreadyRegistered);
      this.textStreamHandlers.set(e, t);
    }
    unregisterTextStreamHandler(e) {
      this.textStreamHandlers.delete(e);
    }
    registerByteStreamHandler(e, t) {
      if (this.byteStreamHandlers.has(e))
        throw new Re('A byte stream handler for topic "'.concat(e, '" has already been set.'), pe.HandlerAlreadyRegistered);
      this.byteStreamHandlers.set(e, t);
    }
    unregisterByteStreamHandler(e) {
      this.byteStreamHandlers.delete(e);
    }
    clearControllers() {
      this.byteStreamControllers.clear(), this.textStreamControllers.clear(), this.bufferedPackets = [];
    }
    validateParticipantHasNoActiveDataStreams(e) {
      const t = Array.from(this.textStreamControllers.entries()).filter((s) => s[1].sendingParticipantIdentity === e), n = Array.from(this.byteStreamControllers.entries()).filter((s) => s[1].sendingParticipantIdentity === e);
      if (t.length > 0 || n.length > 0) {
        const s = new Re("Participant ".concat(e, " unexpectedly disconnected in the middle of sending data"), pe.AbnormalEnd);
        for (const [r, a] of n)
          a.controller.error(s), this.byteStreamControllers.delete(r);
        for (const [r, a] of t)
          a.controller.error(s), this.textStreamControllers.delete(r);
      }
    }
    handleDataStreamPacket(e, t) {
      if (!this.isConnected) {
        this.bufferedPackets.push({
          packet: e,
          encryptionType: t
        });
        return;
      }
      switch (e.value.case) {
        case "streamHeader":
          return this.handleStreamHeader(e.value.value, e.participantIdentity, t);
        case "streamChunk":
          return this.handleStreamChunk(e.value.value, t);
        case "streamTrailer":
          return this.handleStreamTrailer(e.value.value, t);
        default:
          throw new Error('DataPacket of value "'.concat(e.value.case, '" is not data stream related!'));
      }
    }
    handleStreamHeader(e, t, n) {
      var s;
      if (e.contentHeader.case === "byteHeader") {
        const r = this.byteStreamHandlers.get(e.topic);
        if (!r) {
          this.log.debug("ignoring incoming byte stream due to no handler for topic", e.topic);
          return;
        }
        let a;
        const o = {
          id: e.streamId,
          name: (s = e.contentHeader.value.name) !== null && s !== void 0 ? s : "unknown",
          mimeType: e.mimeType,
          size: e.totalLength ? Number(e.totalLength) : void 0,
          topic: e.topic,
          timestamp: Vn(e.timestamp),
          attributes: e.attributes,
          encryptionType: n
        }, d = new ReadableStream({
          start: (c) => {
            if (a = c, this.textStreamControllers.has(e.streamId))
              throw new Re("A data stream read is already in progress for a stream with id ".concat(e.streamId, "."), pe.AlreadyOpened);
            this.byteStreamControllers.set(e.streamId, {
              info: o,
              controller: a,
              startTime: Date.now(),
              sendingParticipantIdentity: t
            });
          }
        });
        r(new Xh(o, d, Vn(e.totalLength)), {
          identity: t
        });
      } else if (e.contentHeader.case === "textHeader") {
        const r = this.textStreamHandlers.get(e.topic);
        if (!r) {
          this.log.debug("ignoring incoming text stream due to no handler for topic", e.topic);
          return;
        }
        let a;
        const o = {
          id: e.streamId,
          mimeType: e.mimeType,
          size: e.totalLength ? Number(e.totalLength) : void 0,
          topic: e.topic,
          timestamp: Number(e.timestamp),
          attributes: e.attributes,
          encryptionType: n,
          attachedStreamIds: e.contentHeader.value.attachedStreamIds
        }, d = new ReadableStream({
          start: (c) => {
            if (a = c, this.textStreamControllers.has(e.streamId))
              throw new Re("A data stream read is already in progress for a stream with id ".concat(e.streamId, "."), pe.AlreadyOpened);
            this.textStreamControllers.set(e.streamId, {
              info: o,
              controller: a,
              startTime: Date.now(),
              sendingParticipantIdentity: t
            });
          }
        });
        r(new $h(o, d, Vn(e.totalLength)), {
          identity: t
        });
      }
    }
    handleStreamChunk(e, t) {
      const n = this.byteStreamControllers.get(e.streamId);
      n && (n.info.encryptionType !== t ? (n.controller.error(new Re("Encryption type mismatch for stream ".concat(e.streamId, ". Expected ").concat(t, ", got ").concat(n.info.encryptionType), pe.EncryptionTypeMismatch)), this.byteStreamControllers.delete(e.streamId)) : e.content.length > 0 && n.controller.enqueue(e));
      const s = this.textStreamControllers.get(e.streamId);
      s && (s.info.encryptionType !== t ? (s.controller.error(new Re("Encryption type mismatch for stream ".concat(e.streamId, ". Expected ").concat(t, ", got ").concat(s.info.encryptionType), pe.EncryptionTypeMismatch)), this.textStreamControllers.delete(e.streamId)) : e.content.length > 0 && s.controller.enqueue(e));
    }
    handleStreamTrailer(e, t) {
      const n = this.textStreamControllers.get(e.streamId);
      n && (n.info.encryptionType !== t ? n.controller.error(new Re("Encryption type mismatch for stream ".concat(e.streamId, ". Expected ").concat(t, ", got ").concat(n.info.encryptionType), pe.EncryptionTypeMismatch)) : (n.info.attributes = Object.assign(Object.assign({}, n.info.attributes), e.attributes), n.controller.close(), this.textStreamControllers.delete(e.streamId)));
      const s = this.byteStreamControllers.get(e.streamId);
      s && (s.info.encryptionType !== t ? s.controller.error(new Re("Encryption type mismatch for stream ".concat(e.streamId, ". Expected ").concat(t, ", got ").concat(s.info.encryptionType), pe.EncryptionTypeMismatch)) : (s.info.attributes = Object.assign(Object.assign({}, s.info.attributes), e.attributes), s.controller.close()), this.byteStreamControllers.delete(e.streamId));
    }
  }
  class Rc {
    constructor(e, t, n) {
      this.writableStream = e, this.defaultWriter = e.getWriter(), this.onClose = n, this.info = t;
    }
    write(e) {
      return this.defaultWriter.write(e);
    }
    close() {
      return m(this, void 0, void 0, function* () {
        var e;
        yield this.defaultWriter.close(), this.defaultWriter.releaseLock(), (e = this.onClose) === null || e === void 0 || e.call(this);
      });
    }
  }
  class ef extends Rc {
  }
  class tf extends Rc {
  }
  const ga = 15e3;
  class nf {
    constructor(e, t) {
      this.engine = e, this.log = t;
    }
    setupEngine(e) {
      this.engine = e;
    }
    /** {@inheritDoc LocalParticipant.sendText} */
    sendText(e, t) {
      return m(this, void 0, void 0, function* () {
        var n;
        const s = crypto.randomUUID(), a = new TextEncoder().encode(e).byteLength, o = (n = t == null ? void 0 : t.attachments) === null || n === void 0 ? void 0 : n.map(() => crypto.randomUUID()), d = new Array(o ? o.length + 1 : 1).fill(0), c = (u, h) => {
          var f;
          d[h] = u;
          const v = d.reduce((g, T) => g + T, 0);
          (f = t == null ? void 0 : t.onProgress) === null || f === void 0 || f.call(t, v);
        }, l = yield this.streamText({
          streamId: s,
          totalSize: a,
          destinationIdentities: t == null ? void 0 : t.destinationIdentities,
          topic: t == null ? void 0 : t.topic,
          attachedStreamIds: o,
          attributes: t == null ? void 0 : t.attributes
        });
        return yield l.write(e), c(1, 0), yield l.close(), t != null && t.attachments && o && (yield Promise.all(t.attachments.map((u, h) => m(this, void 0, void 0, function* () {
          return this._sendFile(o[h], u, {
            topic: t.topic,
            mimeType: u.type,
            onProgress: (f) => {
              c(f, h + 1);
            }
          });
        })))), l.info;
      });
    }
    /**
     * @internal
     */
    streamText(e) {
      return m(this, void 0, void 0, function* () {
        var t, n, s;
        const r = (t = e == null ? void 0 : e.streamId) !== null && t !== void 0 ? t : crypto.randomUUID(), a = {
          id: r,
          mimeType: "text/plain",
          timestamp: Date.now(),
          topic: (n = e == null ? void 0 : e.topic) !== null && n !== void 0 ? n : "",
          size: e == null ? void 0 : e.totalSize,
          attributes: e == null ? void 0 : e.attributes,
          encryptionType: !((s = this.engine.e2eeManager) === null || s === void 0) && s.isDataChannelEncryptionEnabled ? J.GCM : J.NONE,
          attachedStreamIds: e == null ? void 0 : e.attachedStreamIds
        }, o = new Jn({
          streamId: r,
          mimeType: a.mimeType,
          topic: a.topic,
          timestamp: bt(a.timestamp),
          totalLength: bt(a.size),
          attributes: a.attributes,
          contentHeader: {
            case: "textHeader",
            value: new lo({
              version: e == null ? void 0 : e.version,
              attachedStreamIds: a.attachedStreamIds,
              replyToStreamId: e == null ? void 0 : e.replyToStreamId,
              operationType: (e == null ? void 0 : e.type) === "update" ? Zi.UPDATE : Zi.CREATE
            })
          }
        }), d = e == null ? void 0 : e.destinationIdentities, c = new ge({
          destinationIdentities: d,
          value: {
            case: "streamHeader",
            value: o
          }
        });
        yield this.engine.sendDataPacket(c, B.RELIABLE);
        let l = 0;
        const u = this.engine, h = new WritableStream({
          // Implement the sink
          write(g) {
            return m(this, void 0, void 0, function* () {
              for (const T of qu(g, ga)) {
                const k = new zn({
                  content: T,
                  streamId: r,
                  chunkIndex: bt(l)
                }), w = new ge({
                  destinationIdentities: d,
                  value: {
                    case: "streamChunk",
                    value: k
                  }
                });
                yield u.sendDataPacket(w, B.RELIABLE), l += 1;
              }
            });
          },
          close() {
            return m(this, void 0, void 0, function* () {
              const g = new Yn({
                streamId: r
              }), T = new ge({
                destinationIdentities: d,
                value: {
                  case: "streamTrailer",
                  value: g
                }
              });
              yield u.sendDataPacket(T, B.RELIABLE);
            });
          },
          abort(g) {
            console.log("Sink error:", g);
          }
        });
        let f = () => m(this, void 0, void 0, function* () {
          yield v.close();
        });
        u.once(_.Closing, f);
        const v = new ef(h, a, () => this.engine.off(_.Closing, f));
        return v;
      });
    }
    sendFile(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = crypto.randomUUID();
        return yield this._sendFile(n, e, t), {
          id: n
        };
      });
    }
    _sendFile(e, t, n) {
      return m(this, void 0, void 0, function* () {
        var s;
        const r = yield this.streamBytes({
          streamId: e,
          totalSize: t.size,
          name: t.name,
          mimeType: (s = n == null ? void 0 : n.mimeType) !== null && s !== void 0 ? s : t.type,
          topic: n == null ? void 0 : n.topic,
          destinationIdentities: n == null ? void 0 : n.destinationIdentities
        }), a = t.stream().getReader();
        for (; ; ) {
          const {
            done: o,
            value: d
          } = yield a.read();
          if (o)
            break;
          yield r.write(d);
        }
        return yield r.close(), r.info;
      });
    }
    streamBytes(e) {
      return m(this, void 0, void 0, function* () {
        var t, n, s, r, a;
        const o = (t = e == null ? void 0 : e.streamId) !== null && t !== void 0 ? t : crypto.randomUUID(), d = e == null ? void 0 : e.destinationIdentities, c = {
          id: o,
          mimeType: (n = e == null ? void 0 : e.mimeType) !== null && n !== void 0 ? n : "application/octet-stream",
          topic: (s = e == null ? void 0 : e.topic) !== null && s !== void 0 ? s : "",
          timestamp: Date.now(),
          attributes: e == null ? void 0 : e.attributes,
          size: e == null ? void 0 : e.totalSize,
          name: (r = e == null ? void 0 : e.name) !== null && r !== void 0 ? r : "unknown",
          encryptionType: !((a = this.engine.e2eeManager) === null || a === void 0) && a.isDataChannelEncryptionEnabled ? J.GCM : J.NONE
        }, l = new Jn({
          totalLength: bt(c.size),
          mimeType: c.mimeType,
          streamId: o,
          topic: c.topic,
          timestamp: bt(Date.now()),
          attributes: c.attributes,
          contentHeader: {
            case: "byteHeader",
            value: new uo({
              name: c.name
            })
          }
        }), u = new ge({
          destinationIdentities: d,
          value: {
            case: "streamHeader",
            value: l
          }
        });
        yield this.engine.sendDataPacket(u, B.RELIABLE);
        let h = 0;
        const f = new ce(), v = this.engine, g = this.log, T = new WritableStream({
          write(w) {
            return m(this, void 0, void 0, function* () {
              const O = yield f.lock();
              let b = 0;
              try {
                for (; b < w.byteLength; ) {
                  const y = w.slice(b, b + ga), S = new ge({
                    destinationIdentities: d,
                    value: {
                      case: "streamChunk",
                      value: new zn({
                        content: y,
                        streamId: o,
                        chunkIndex: bt(h)
                      })
                    }
                  });
                  yield v.sendDataPacket(S, B.RELIABLE), h += 1, b += y.byteLength;
                }
              } finally {
                O();
              }
            });
          },
          close() {
            return m(this, void 0, void 0, function* () {
              const w = new Yn({
                streamId: o
              }), O = new ge({
                destinationIdentities: d,
                value: {
                  case: "streamTrailer",
                  value: w
                }
              });
              yield v.sendDataPacket(O, B.RELIABLE);
            });
          },
          abort(w) {
            g.error("Sink error:", w);
          }
        });
        return new tf(T, c);
      });
    }
  }
  function Ic(i) {
    if (i.length === 0)
      return new AbortController().signal;
    if (i.length === 1)
      return i[0];
    for (const s of i)
      if (s.aborted)
        return s;
    const e = new AbortController(), t = Array(i.length), n = () => {
      for (const s of t)
        s();
    };
    return i.forEach((s, r) => {
      const a = () => {
        e.abort(s.reason), n();
      };
      s.addEventListener("abort", a), t[r] = () => s.removeEventListener("abort", a);
    }), e.signal;
  }
  function Oc(i) {
    const e = new AbortController();
    return setTimeout(() => {
      e.abort(new DOMException("signal timed out after ".concat(i, " ms"), "TimeoutError"));
    }, i), e.signal;
  }
  const ee = 1, $e = 2, va = 4, sf = 8, ba = 0, ya = 12, ka = 5, rf = 7, Ta = 3, af = 3, Sa = 2, Ca = 1, Ea = 0, wa = 3, of = 2, Pa = 2, cf = 1, df = 0;
  var tt;
  (function(i) {
    i[i.TooShort = 0] = "TooShort", i[i.HeaderOverrun = 1] = "HeaderOverrun", i[i.MissingExtWords = 2] = "MissingExtWords", i[i.UnsupportedVersion = 3] = "UnsupportedVersion", i[i.InvalidHandle = 4] = "InvalidHandle", i[i.MalformedExt = 5] = "MalformedExt";
  })(tt || (tt = {}));
  class ve extends Oe {
    constructor(e, t, n) {
      super(19, e, n), this.name = "DataTrackDeserializeError", this.reason = t, this.reasonName = tt[t];
    }
    static tooShort() {
      return new ve("Too short to contain a valid header", tt.TooShort);
    }
    static headerOverrun() {
      return new ve("Header exceeds total packet length", tt.HeaderOverrun);
    }
    static missingExtWords() {
      return new ve("Extension word indicator is missing", tt.MissingExtWords);
    }
    static unsupportedVersion(e) {
      return new ve("Unsupported version ".concat(e), tt.UnsupportedVersion);
    }
    static invalidHandle(e) {
      return new ve("invalid track handle: ".concat(e.message), tt.InvalidHandle, {
        cause: e
      });
    }
    static malformedExt(e) {
      return new ve("Extension with tag ".concat(e, " is malformed"), tt.MalformedExt);
    }
  }
  var dn;
  (function(i) {
    i[i.TooSmallForHeader = 0] = "TooSmallForHeader", i[i.TooSmallForPayload = 1] = "TooSmallForPayload";
  })(dn || (dn = {}));
  class Tn extends Oe {
    constructor(e, t, n) {
      super(19, e, n), this.name = "DataTrackSerializeError", this.reason = t, this.reasonName = dn[t];
    }
    static tooSmallForHeader() {
      return new Tn("Buffer cannot fit header", dn.TooSmallForHeader);
    }
    static tooSmallForPayload() {
      return new Tn("Buffer cannot fit payload", dn.TooSmallForPayload);
    }
  }
  class vi {
    /** Encodes the instance as binary and returns the data as a Uint8Array. */
    toBinary() {
      const e = this.toBinaryLengthBytes(), t = new ArrayBuffer(e), n = new DataView(t), s = this.toBinaryInto(n);
      if (e !== s)
        throw new Error("".concat(this.constructor.name, ".toBinary: written bytes (").concat(s, " bytes) not equal to allocated array buffer length (").concat(e, " bytes)."));
      return new Uint8Array(t);
    }
  }
  var Yt;
  (function(i) {
    i[i.UserTimestamp = 2] = "UserTimestamp", i[i.E2ee = 1] = "E2ee";
  })(Yt || (Yt = {}));
  class Mc extends vi {
  }
  class Be extends Mc {
    constructor(e) {
      super(), this.timestamp = e;
    }
    toBinaryLengthBytes() {
      return ee + ee + Be.lengthBytes;
    }
    toBinaryInto(e) {
      let t = 0;
      e.setUint8(t, Be.tag), t += ee, e.setUint8(t, Be.lengthBytes), t += ee, e.setBigUint64(t, this.timestamp), t += sf;
      const n = this.toBinaryLengthBytes();
      if (t !== n)
        throw new Error("DataTrackUserTimestampExtension.toBinaryInto: Wrote ".concat(t, " bytes but expected length was ").concat(n, " bytes"));
      return t;
    }
    toJSON() {
      return {
        tag: Be.tag,
        lengthBytes: Be.lengthBytes,
        timestamp: this.timestamp
      };
    }
  }
  Be.tag = Yt.UserTimestamp;
  Be.lengthBytes = 8;
  class je extends Mc {
    constructor(e, t) {
      super(), this.keyIndex = e, this.iv = t;
    }
    toBinaryLengthBytes() {
      return ee + ee + je.lengthBytes;
    }
    toBinaryInto(e) {
      let t = 0;
      e.setUint8(t, je.tag), t += ee, e.setUint8(t, je.lengthBytes), t += ee, e.setUint8(t, this.keyIndex), t += ee;
      for (let s = 0; s < this.iv.length; s += 1)
        e.setUint8(t, this.iv[s]), t += ee;
      const n = this.toBinaryLengthBytes();
      if (t !== n)
        throw new Error("DataTrackE2eeExtension.toBinaryInto: Wrote ".concat(t, " bytes but expected length was ").concat(n, " bytes"));
      return t;
    }
    toJSON() {
      return {
        tag: je.tag,
        lengthBytes: je.lengthBytes,
        keyIndex: this.keyIndex,
        iv: this.iv
      };
    }
  }
  je.tag = Yt.E2ee;
  je.lengthBytes = 13;
  class Ht extends vi {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      super(), this.userTimestamp = e.userTimestamp, this.e2ee = e.e2ee;
    }
    toBinaryLengthBytes() {
      let e = 0;
      return this.userTimestamp && (e += this.userTimestamp.toBinaryLengthBytes()), this.e2ee && (e += this.e2ee.toBinaryLengthBytes()), e;
    }
    toBinaryInto(e) {
      let t = 0;
      if (this.e2ee) {
        const s = this.e2ee.toBinaryInto(e);
        t += s;
      }
      if (this.userTimestamp) {
        const s = this.userTimestamp.toBinaryInto(new DataView(e.buffer, e.byteOffset + t));
        t += s;
      }
      const n = this.toBinaryLengthBytes();
      if (t !== n)
        throw new Error("DataTrackExtensions.toBinaryInto: Wrote ".concat(t, " bytes but expected length was ").concat(n, " bytes"));
      return t;
    }
    static fromBinary(e) {
      const t = $s(e);
      let n, s, r = 0;
      for (; t.byteLength - r >= ee + ee; ) {
        const a = t.getUint8(r);
        r += ee;
        const o = t.getUint8(r);
        if (r += ee, a !== df)
          switch (a) {
            case Yt.UserTimestamp:
              if (t.byteLength - r < Be.lengthBytes)
                throw ve.malformedExt(a);
              n = new Be(t.getBigUint64(r)), r += o;
              break;
            case Yt.E2ee:
              if (t.byteLength - r < je.lengthBytes)
                throw ve.malformedExt(a);
              const d = t.getUint8(r), c = new Uint8Array(12);
              for (let l = 0; l < c.length; l += 1) {
                let u = r;
                u += ee, u += l * ee, c[l] = t.getUint8(u);
              }
              s = new je(d, c), r += o;
              break;
            default:
              if (t.byteLength - r < o)
                throw ve.malformedExt(a);
              r += o;
              break;
          }
      }
      return [new Ht({
        userTimestamp: n,
        e2ee: s
      }), t.byteLength];
    }
    toJSON() {
      var e, t, n, s;
      return {
        userTimestamp: (t = (e = this.userTimestamp) === null || e === void 0 ? void 0 : e.toJSON()) !== null && t !== void 0 ? t : null,
        e2ee: (s = (n = this.e2ee) === null || n === void 0 ? void 0 : n.toJSON()) !== null && s !== void 0 ? s : null
      };
    }
  }
  const Dc = {
    from(i) {
      return {
        payload: i.payload,
        extensions: new Ht({
          userTimestamp: i.userTimestamp ? new Be(i.userTimestamp) : void 0
        })
      };
    },
    /** Converts from a DataTrackFrameInternal -> DataTrackFrame. Some internal information is
     * discarded like e2ee encrption extension data. */
    lossyIntoFrame(i) {
      var e;
      return {
        payload: i.payload,
        userTimestamp: (e = i.extensions.userTimestamp) === null || e === void 0 ? void 0 : e.timestamp
      };
    }
  }, Ac = Symbol.for("lk.track"), xc = Symbol.for("lk.data-track");
  class Nc {
    /** @internal */
    constructor(e, t, n) {
      this.trackSymbol = Ac, this.isLocal = false, this.typeSymbol = xc, this.info = e, this.manager = t, this.publisherIdentity = n.publisherIdentity;
    }
    /** Subscribes to the data track to receive frames.
     *
     * # Returns
     *
     * A stream that yields {@link DataTrackFrame}s as they arrive.
     *
     * # Multiple Subscriptions
     *
     * An application may call `subscribe` more than once to process frames in
     * multiple places. For example, one async task might plot values on a graph
     * while another writes them to a file.
     *
     * Internally, only the first call to `subscribe` communicates with the SFU and
     * allocates the resources required to receive frames. Additional subscriptions
     * reuse the same underlying pipeline and do not trigger additional signaling.
     *
     * Note that newly created subscriptions only receive frames published after
     * the initial subscription is established.
     */
    subscribe(e) {
      try {
        const [t] = this.manager.openSubscriptionStream(this.info.sid, e == null ? void 0 : e.signal, e == null ? void 0 : e.bufferSize);
        return t;
      } catch (t) {
        throw t;
      }
    }
  }
  class Sn extends vi {
    constructor(e) {
      var t;
      super(), this.marker = e.marker, this.trackHandle = e.trackHandle, this.sequence = e.sequence, this.frameNumber = e.frameNumber, this.timestamp = e.timestamp, this.extensions = (t = e.extensions) !== null && t !== void 0 ? t : new Ht();
    }
    extensionsMetrics() {
      const e = this.extensions.toBinaryLengthBytes(), t = Math.ceil(e / 4), n = t * 4 - e;
      return {
        lengthBytes: e,
        lengthWords: t,
        paddingLengthBytes: n
      };
    }
    toBinaryLengthBytes() {
      const {
        lengthBytes: e,
        paddingLengthBytes: t
      } = this.extensionsMetrics();
      let n = ya;
      return e > 0 && (n += of + e + t), n;
    }
    toBinaryInto(e) {
      if (e.byteLength < this.toBinaryLengthBytes())
        throw Tn.tooSmallForHeader();
      let t = ba << ka, n;
      switch (this.marker) {
        case z.Inter:
          n = Ea;
          break;
        case z.Final:
          n = Ca;
          break;
        case z.Start:
          n = Sa;
          break;
        case z.Single:
          n = wa;
          break;
      }
      t |= n << Ta;
      const {
        lengthBytes: s,
        lengthWords: r,
        paddingLengthBytes: a
      } = this.extensionsMetrics();
      s > 0 && (t |= 1 << Pa);
      let o = 0;
      if (e.setUint8(o, t), o += ee, e.setUint8(o, 0), o += ee, e.setUint16(o, this.trackHandle), o += $e, e.setUint16(o, this.sequence.value), o += $e, e.setUint16(o, this.frameNumber.value), o += $e, e.setUint32(o, this.timestamp.asTicks()), o += va, s > 0) {
        const c = r - 1;
        e.setUint16(o, c), o += $e;
        const l = this.extensions.toBinaryInto(new DataView(e.buffer, e.byteOffset + o));
        o += l;
        for (let u = 0; u < a; u += 1)
          e.setUint8(o, 0), o += ee;
      }
      const d = this.toBinaryLengthBytes();
      if (o !== d)
        throw new Error("DataTrackPacketHeader.toBinaryInto: Wrote ".concat(o, " bytes but expected length was ").concat(d, " bytes"));
      return d;
    }
    static fromBinary(e) {
      const t = $s(e);
      if (t.byteLength < ya)
        throw ve.tooShort();
      let n = 0;
      const s = t.getUint8(n);
      n += ee;
      const r = s >> ka & rf;
      if (r > ba)
        throw ve.unsupportedVersion(r);
      let a;
      switch (s >> Ta & af) {
        case Sa:
          a = z.Start;
          break;
        case Ca:
          a = z.Final;
          break;
        case wa:
          a = z.Single;
          break;
        case Ea:
        default:
          a = z.Inter;
          break;
      }
      const o = (s >> Pa & cf) > 0;
      n += ee;
      let d;
      try {
        d = ah.fromNumber(t.getUint16(n));
      } catch (f) {
        throw f instanceof zt && (f.isReason(Rt.Reserved) || f.isReason(Rt.TooLarge)) ? ve.invalidHandle(f) : f;
      }
      n += $e;
      const c = Ve.u16(t.getUint16(n));
      n += $e;
      const l = Ve.u16(t.getUint16(n));
      n += $e;
      const u = Wt.fromRtpTicks(t.getUint32(n));
      n += va;
      let h = new Ht();
      if (o) {
        if (t.byteLength - n < $e)
          throw ve.missingExtWords();
        let f = t.getUint16(n);
        n += $e;
        let g = 4 * (f + 1);
        if (n + g > t.byteLength)
          throw ve.headerOverrun();
        let T = new DataView(t.buffer, t.byteOffset + n, g);
        const [k, w] = Ht.fromBinary(T);
        h = k, n += w;
      }
      return [new Sn({
        marker: a,
        trackHandle: d,
        sequence: c,
        frameNumber: l,
        timestamp: u,
        extensions: h
      }), n];
    }
    toJSON() {
      return {
        marker: this.marker,
        trackHandle: this.trackHandle,
        sequence: this.sequence.value,
        frameNumber: this.frameNumber.value,
        timestamp: this.timestamp.asTicks(),
        extensions: this.extensions.toJSON()
      };
    }
  }
  var z;
  (function(i) {
    i[i.Start = 0] = "Start", i[i.Inter = 1] = "Inter", i[i.Final = 2] = "Final", i[i.Single = 3] = "Single";
  })(z || (z = {}));
  class bi extends vi {
    constructor(e, t) {
      super(), this.header = e, this.payload = t;
    }
    toBinaryLengthBytes() {
      return this.header.toBinaryLengthBytes() + this.payload.byteLength;
    }
    toBinaryInto(e) {
      let t = 0;
      const n = this.header.toBinaryInto(e);
      if (t += n, e.byteLength - t < this.payload.byteLength)
        throw Tn.tooSmallForPayload();
      for (let r = 0; r < this.payload.length; r += 1)
        e.setUint8(t, this.payload[r]), t += ee;
      const s = this.toBinaryLengthBytes();
      if (t !== s)
        throw new Error("DataTrackPacket.toBinaryInto: Wrote ".concat(t, " bytes but expected length was ").concat(s, " bytes"));
      return s;
    }
    static fromBinary(e) {
      const t = $s(e), [n, s] = Sn.fromBinary(t), r = t.buffer.slice(t.byteOffset + s, t.byteOffset + t.byteLength);
      return [new bi(n, new Uint8Array(r)), t.byteLength];
    }
    toJSON() {
      return {
        header: this.header.toJSON(),
        payload: this.payload
      };
    }
  }
  const zi = Ee(fe.DataTracks);
  class xe extends Oe {
    constructor(e, t, n, s) {
      super(19, "Frame ".concat(n, " dropped: ").concat(e), s), this.name = "DataTrackDepacketizerDropError", this.reason = t, this.reasonName = St[t], this.frameNumber = n;
    }
    static interrupted(e, t) {
      return new xe("Interrupted by the start of a new frame ".concat(t), St.Interrupted, e);
    }
    static unknownFrame(e) {
      return new xe("Initial packet was never received.", St.UnknownFrame, e);
    }
    static bufferFull(e) {
      return new xe("Reorder buffer is full.", St.BufferFull, e);
    }
    static incomplete(e, t, n) {
      return new xe("Not all packets received before final packet. Received ".concat(t, " packets, expected ").concat(n, " packets."), St.Incomplete, e);
    }
  }
  var St;
  (function(i) {
    i[i.Interrupted = 0] = "Interrupted", i[i.UnknownFrame = 1] = "UnknownFrame", i[i.BufferFull = 2] = "BufferFull", i[i.Incomplete = 3] = "Incomplete";
  })(St || (St = {}));
  class yi {
    constructor() {
      this.partial = null;
    }
    /** Should be repeatedly called with received {@link DataTrackPacket}s - intermediate calls
     * aggregate the packet's state internally, and return null.
     *
     * Once this method is called with the final packet to form a frame, a new {@link DataTrackFrameInternal}
     * is returned.*/
    push(e, t) {
      switch (e.header.marker) {
        case z.Single:
          return this.frameFromSingle(e, t);
        case z.Start:
          return this.beginPartial(e, t);
        case z.Inter:
        case z.Final:
          return this.pushToPartial(e);
      }
    }
    reset() {
      this.partial = null;
    }
    frameFromSingle(e, t) {
      if (e.header.marker !== z.Single)
        throw new Error("Depacketizer.frameFromSingle: packet.header.marker was not FrameMarker.Single, found ".concat(e.header.marker, "."));
      if (this.partial)
        if (t != null && t.errorOnPartialFrames) {
          const n = this.partial.frameNumber;
          throw this.reset(), xe.interrupted(n, e.header.frameNumber.value);
        } else
          zi.warn("Data track frame ".concat(this.partial.frameNumber, " was interrupted by the start of a new frame, dropping."));
      return this.reset(), {
        payload: e.payload,
        extensions: e.header.extensions
      };
    }
    /** Begin assembling a new packet. */
    beginPartial(e, t) {
      if (e.header.marker !== z.Start)
        throw new Error("Depacketizer.beginPartial: packet.header.marker was not FrameMarker.Start, found ".concat(e.header.marker, "."));
      if (this.partial)
        if (t != null && t.errorOnPartialFrames) {
          const s = this.partial.frameNumber;
          throw this.reset(), xe.interrupted(s, e.header.frameNumber.value);
        } else
          zi.warn("Data track frame ".concat(this.partial.frameNumber, " was interrupted by the start of a new frame ").concat(e.header.frameNumber.value, ", dropping."));
      this.reset();
      const n = e.header.sequence;
      return this.partial = {
        frameNumber: e.header.frameNumber.value,
        startSequence: n,
        extensions: e.header.extensions,
        payloads: /* @__PURE__ */ new Map([[n.value, e.payload]])
      }, null;
    }
    /** Push to the existing partial frame. */
    pushToPartial(e) {
      if (e.header.marker !== z.Inter && e.header.marker !== z.Final)
        throw new Error("Depacketizer.pushToPartial: packet.header.marker was not FrameMarker.Inter or FrameMarker.Final, found ".concat(e.header.marker, "."));
      if (!this.partial)
        throw this.reset(), xe.unknownFrame(e.header.frameNumber.value);
      if (e.header.frameNumber.value !== this.partial.frameNumber) {
        const t = this.partial.frameNumber;
        throw this.reset(), xe.interrupted(t, e.header.frameNumber.value);
      }
      if (this.partial.payloads.size >= yi.MAX_BUFFER_PACKETS) {
        const t = this.partial.frameNumber;
        throw this.reset(), xe.bufferFull(t);
      }
      return this.partial.payloads.has(e.header.sequence.value) && zi.warn("Data track frame ".concat(this.partial.frameNumber, " received duplicate packet for sequence ").concat(e.header.sequence.value, ", so replacing with newly received packet.")), this.partial.payloads.set(e.header.sequence.value, e.payload), e.header.marker === z.Final ? this.finalize(this.partial, e.header.sequence.value) : null;
    }
    /** Try to reassemble the complete frame. */
    finalize(e, t) {
      const n = e.payloads.size;
      let s = 0;
      for (const d of e.payloads.values())
        s += d.length;
      const r = new Uint8Array(s);
      let a = e.startSequence.clone(), o = 0;
      for (; ; ) {
        const d = e.payloads.get(a.value);
        if (!d)
          break;
        e.payloads.delete(a.value);
        const c = r.length - o;
        if (d.length > c)
          throw new Error("Depacketizer.finalize: Expected at least ".concat(d.length, " more bytes left in the payload buffer, only got ").concat(c, " bytes."));
        if (r.set(d, o), o += d.length, a.value != t) {
          a.increment();
          continue;
        }
        return this.reset(), {
          payload: r,
          extensions: e.extensions
        };
      }
      throw this.reset(), xe.incomplete(e.frameNumber, n, t - e.startSequence.value + 1);
    }
  }
  yi.MAX_BUFFER_PACKETS = 128;
  var Ct;
  (function(i) {
    i[i.Unpublished = 0] = "Unpublished", i[i.Timeout = 1] = "Timeout", i[i.Disconnected = 2] = "Disconnected", i[i.Cancelled = 4] = "Cancelled";
  })(Ct || (Ct = {}));
  class ye extends Oe {
    constructor(e, t, n) {
      super(22, e, n), this.name = "DataTrackSubscribeError", this.reason = t, this.reasonName = Ct[t];
    }
    static unpublished() {
      return new ye("The track has been unpublished and is no longer available", Ct.Unpublished);
    }
    static timeout() {
      return new ye("Request to subscribe to data track timed-out", Ct.Timeout);
    }
    static disconnected() {
      return new ye("Cannot subscribe to data track when disconnected", Ct.Disconnected);
    }
    // NOTE: this was introduced by web / there isn't a corresponding case in the rust version.
    static cancelled() {
      return new ye("Subscription to data track cancelled by caller", Ct.Cancelled);
    }
  }
  const Yi = Ee(fe.DataTracks);
  class lf {
    /**
     * Creates a new pipeline with the given options.
     */
    constructor(e) {
      var t;
      const n = e.e2eeManager !== null;
      if (e.info.usesE2ee !== n)
        throw new Error("IncomingDataTrackPipeline: DataTrackInfo.usesE2ee must match presence of decryptionProvider");
      const s = new yi();
      this.publisherIdentity = e.publisherIdentity, this.e2eeManager = (t = e.e2eeManager) !== null && t !== void 0 ? t : null, this.depacketizer = s;
    }
    updateE2eeManager(e) {
      this.e2eeManager = e;
    }
    processPacket(e) {
      return m(this, void 0, void 0, function* () {
        const t = this.depacketize(e);
        if (!t)
          return null;
        const n = yield this.decryptIfNeeded(t);
        return n || null;
      });
    }
    /**
     * Depacketize the given frame, log if a drop occurs.
     */
    depacketize(e) {
      let t;
      try {
        t = this.depacketizer.push(e);
      } catch (n) {
        return Yi.warn("Data frame depacketize error: ".concat(n)), null;
      }
      return t;
    }
    /**
     * Decrypt the frame's payload if E2EE is enabled for this track.
     */
    decryptIfNeeded(e) {
      return m(this, void 0, void 0, function* () {
        var t, n;
        const s = this.e2eeManager;
        if (!s)
          return e;
        const r = (n = (t = e.extensions) === null || t === void 0 ? void 0 : t.e2ee) !== null && n !== void 0 ? n : null;
        if (!r)
          return Yi.error("Missing E2EE meta"), null;
        let a;
        try {
          a = yield s.handleEncryptedData(e.payload, r.iv, this.publisherIdentity, r.keyIndex);
        } catch (o) {
          return Yi.error("Error decrypting packet: ".concat(o)), null;
        }
        return e.payload = a.payload, e;
      });
    }
  }
  const le = Ee(fe.DataTracks), uf = 1e4, hf = 16;
  class ff extends Ie.EventEmitter {
    constructor(e) {
      var t;
      super(), this.descriptors = /* @__PURE__ */ new Map(), this.subscriptionHandles = /* @__PURE__ */ new Map(), this.e2eeManager = (t = e == null ? void 0 : e.e2eeManager) !== null && t !== void 0 ? t : null;
    }
    /** @internal */
    updateE2eeManager(e) {
      this.e2eeManager = e;
      for (const t of this.descriptors.values())
        t.subscription.type === "active" && t.subscription.pipeline.updateE2eeManager(e);
    }
    /** Allocates a ReadableStream which emits when a new {@link DataTrackFrame} is received from the
     * SFU. The SFU subscription is initiated lazily when the stream is created.
     *
     * @returns A tuple of the ReadableStream and a Promise that resolves once the SFU subscription
     * is fully established / the stream is ready to receive frames.
     *
     * @internal
     **/
    openSubscriptionStream(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : hf, s = null;
      const r = new Se(), a = () => {
        t == null || t.removeEventListener("abort", d);
      }, o = () => {
        if (a(), !s) {
          le.warn("ReadableStream subscribed to ".concat(e, " was not started."));
          return;
        }
        const l = this.descriptors.get(e);
        if (!l) {
          le.warn("Unknown track ".concat(e, ", skipping cancel..."));
          return;
        }
        if (l.subscription.type !== "active") {
          le.warn("Subscription for track ".concat(e, " is not active, skipping cancel..."));
          return;
        }
        l.subscription.streamControllers.delete(s), l.subscription.streamControllers.size === 0 && this.unSubscribeRequest(l.info.sid);
      }, d = () => {
        var l;
        if (!s)
          return;
        const u = this.descriptors.get(e);
        (u == null ? void 0 : u.subscription.type) === "active" && u.subscription.streamControllers.delete(s), s.error(ye.cancelled()), (l = r.reject) === null || l === void 0 || l.call(r, ye.cancelled()), o();
      };
      return [new ReadableStream({
        start: (l) => {
          s = l, this.subscribeRequest(e, t).then(() => m(this, void 0, void 0, function* () {
            var u, h, f;
            const v = this.descriptors.get(e);
            if (!v) {
              le.error("Unknown track ".concat(e));
              const g = ye.disconnected();
              l.error(g), (u = r.reject) === null || u === void 0 || u.call(r, g);
              return;
            }
            if (v.subscription.type !== "active") {
              le.error("Subscription for track ".concat(e, " is not active"));
              const g = ye.disconnected();
              l.error(g), (h = r.reject) === null || h === void 0 || h.call(r, g);
              return;
            }
            if (t != null && t.aborted) {
              d();
              return;
            }
            t == null || t.addEventListener("abort", d), v.subscription.streamControllers.set(l, a), (f = r.resolve) === null || f === void 0 || f.call(r);
          })).catch((u) => {
            var h;
            l.error(u), (h = r.reject) === null || h === void 0 || h.call(r, u);
          });
        },
        cancel: () => {
          o();
        }
      }, new CountQueuingStrategy({
        highWaterMark: n
      })), r.promise];
    }
    /** Client requested to subscribe to a data track.
     *
     * This is sent when the user calls {@link RemoteDataTrack.subscribe}.
     *
     * Only the first request to subscribe to a given track incurs meaningful overhead; subsequent
     * requests simply attach an additional receiver to the broadcast channel, allowing them to consume
     * frames from the existing subscription pipeline.
     */
    subscribeRequest(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = this.descriptors.get(e);
        if (!n)
          throw new Error("Cannot subscribe to unknown track");
        const s = (r, a, o) => m(this, void 0, void 0, function* () {
          if (r.subscription.type === "active")
            return;
          if (r.subscription.type !== "pending")
            throw new Error("Descriptor for track ".concat(e, " is not pending, found ").concat(r.subscription.type));
          const d = Ic([a, o].filter((u) => typeof u < "u")), c = new Se();
          r.subscription.completionFuture.promise.then(() => {
            var u;
            return (u = c.resolve) === null || u === void 0 ? void 0 : u.call(c);
          }).catch((u) => {
            var h;
            return (h = c.reject) === null || h === void 0 ? void 0 : h.call(c, u);
          });
          const l = () => {
            var u;
            if (r.subscription.type === "pending") {
              if (r.subscription.pendingRequestCount -= 1, o != null && o.aborted) {
                r.subscription.cancel();
                return;
              }
              if (r.subscription.pendingRequestCount <= 0) {
                r.subscription.cancel();
                return;
              }
              (u = c.reject) === null || u === void 0 || u.call(c, ye.cancelled());
            }
          };
          d.aborted && l(), d.addEventListener("abort", l), yield c.promise, d.removeEventListener("abort", l);
        });
        switch (n.subscription.type) {
          case "none": {
            n.subscription = {
              type: "pending",
              completionFuture: new Se(),
              pendingRequestCount: 1,
              cancel: () => {
                var a, o;
                const d = n.subscription;
                n.subscription = {
                  type: "none"
                }, this.emit("sfuUpdateSubscription", {
                  sid: e,
                  subscribe: false
                }), d.type === "pending" && ((o = (a = d.completionFuture).reject) === null || o === void 0 || o.call(a, r.aborted ? ye.timeout() : (
                  // NOTE: the below cancelled case was introduced by web / there isn't a corresponding case in the rust version.
                  ye.cancelled()
                )));
              }
            }, this.emit("sfuUpdateSubscription", {
              sid: e,
              subscribe: true
            });
            const r = Oc(uf);
            yield s(n, t, r);
            return;
          }
          case "pending": {
            n.subscription.pendingRequestCount += 1, yield s(n, t);
            return;
          }
          case "active":
            return;
        }
      });
    }
    /**
     * Get information about all currently subscribed tracks.
     * @internal */
    querySubscribed() {
      return m(this, void 0, void 0, function* () {
        return Array.from(this.descriptors.values()).filter((t) => t.subscription.type === "active").map((t) => [t.info, t.publisherIdentity]);
      });
    }
    /** Client requested to unsubscribe from a data track. */
    unSubscribeRequest(e) {
      var t;
      const n = this.descriptors.get(e);
      if (!n)
        throw new Error("Cannot subscribe to unknown track");
      if (n.subscription.type !== "active") {
        le.warn("Unexpected descriptor state in unSubscribeRequest, expected active, found ".concat((t = n.subscription) === null || t === void 0 ? void 0 : t.type));
        return;
      }
      this.closeStreamControllers(n.subscription.streamControllers, e);
      const s = n.subscription;
      n.subscription = {
        type: "none"
      }, this.subscriptionHandles.delete(s.subcriptionHandle), this.emit("sfuUpdateSubscription", {
        sid: e,
        subscribe: false
      });
    }
    /** Detach abort-signal listeners and close all downstream stream controllers for an active
     * subscription. Used when the subscription is being torn down by the manager (unsubscribe,
     * unpublish, or shutdown). */
    closeStreamControllers(e, t) {
      for (const [n, s] of e) {
        s();
        try {
          n.close();
        } catch (r) {
          le.warn("Failed to close readable stream for track ".concat(t, ": ").concat(r));
        }
      }
    }
    /** SFU notification that track publications have changed.
     *
     * This event is produced from both {@link JoinResponse} and {@link ParticipantUpdate}
     * to provide a complete view of remote participants' track publications:
     *
     * - From a `JoinResponse`, it captures the initial set of tracks published when a participant joins.
     * - From a `ParticipantUpdate`, it captures subsequent changes (i.e., new tracks being
     *   published and existing tracks unpublished).
     */
    receiveSfuPublicationUpdates(e) {
      return m(this, void 0, void 0, function* () {
        if (e.size === 0)
          return;
        const t = /* @__PURE__ */ new Map();
        for (const [n, s] of e.entries()) {
          const r = /* @__PURE__ */ new Set();
          for (const a of s)
            r.add(a.sid), !this.descriptors.has(a.sid) && (yield this.handleTrackPublished(n, a));
          t.set(n, r);
        }
        for (const [n, s] of t.entries()) {
          let a = Array.from(this.descriptors.entries()).filter((o) => {
            let [d, c] = o;
            return c.publisherIdentity === n;
          }).map((o) => {
            let [d] = o;
            return d;
          }).filter((o) => !s.has(o));
          for (const o of a)
            this.handleTrackUnpublished(o);
        }
      });
    }
    /**
     * Get information about all currently remotely published tracks which could be subscribed to.
     * @internal */
    queryPublications() {
      return m(this, void 0, void 0, function* () {
        return Array.from(this.descriptors.values()).map((e) => e.info);
      });
    }
    handleTrackPublished(e, t) {
      return m(this, void 0, void 0, function* () {
        if (this.descriptors.has(t.sid)) {
          le.error("Existing descriptor for track ".concat(t.sid));
          return;
        }
        let n = {
          info: t,
          publisherIdentity: e,
          subscription: {
            type: "none"
          }
        };
        this.descriptors.set(n.info.sid, n);
        const s = new Nc(n.info, this, {
          publisherIdentity: e
        });
        this.emit("trackPublished", {
          track: s
        });
      });
    }
    handleTrackUnpublished(e) {
      const t = this.descriptors.get(e);
      if (!t) {
        le.error("Unknown track ".concat(e));
        return;
      }
      this.descriptors.delete(e), t.subscription.type === "active" && (this.closeStreamControllers(t.subscription.streamControllers, e), this.subscriptionHandles.delete(t.subscription.subcriptionHandle)), this.emit("trackUnpublished", {
        sid: e,
        publisherIdentity: t.publisherIdentity
      });
    }
    /** SFU notification that handles have been assigned for requested subscriptions. */
    receivedSfuSubscriberHandles(e) {
      for (const [t, n] of e.entries())
        this.registerSubscriberHandle(t, n);
    }
    registerSubscriberHandle(e, t) {
      var n, s;
      const r = this.descriptors.get(t);
      if (!r) {
        le.error("Unknown track ".concat(t));
        return;
      }
      switch (r.subscription.type) {
        case "none": {
          le.warn("No subscription for ".concat(t));
          return;
        }
        case "active": {
          r.subscription.subcriptionHandle = e, this.subscriptionHandles.set(e, t);
          return;
        }
        case "pending": {
          const a = new lf({
            info: r.info,
            publisherIdentity: r.publisherIdentity,
            e2eeManager: this.e2eeManager
          }), o = r.subscription;
          r.subscription = {
            type: "active",
            subcriptionHandle: e,
            pipeline: a,
            streamControllers: /* @__PURE__ */ new Map()
          }, this.subscriptionHandles.set(e, t), (s = (n = o.completionFuture).resolve) === null || s === void 0 || s.call(n);
        }
      }
    }
    /** Packet has been received over the transport. */
    packetReceived(e) {
      return m(this, void 0, void 0, function* () {
        let t;
        try {
          [t] = bi.fromBinary(e);
        } catch (a) {
          le.error("Failed to deserialize packet: ".concat(a));
          return;
        }
        const n = this.subscriptionHandles.get(t.header.trackHandle);
        if (!n) {
          le.warn("Unknown subscriber handle ".concat(t.header.trackHandle));
          return;
        }
        const s = this.descriptors.get(n);
        if (!s) {
          le.error("Missing descriptor for track ".concat(n));
          return;
        }
        if (s.subscription.type !== "active") {
          le.warn("Received packet for track ".concat(n, " without active subscription"));
          return;
        }
        const r = yield s.subscription.pipeline.processPacket(t);
        if (r)
          for (const a of s.subscription.streamControllers.keys()) {
            if (a.desiredSize !== null && a.desiredSize <= 0) {
              le.warn("Cannot send frame to subscribers: readable stream is full (desiredSize is ".concat(a.desiredSize, "). To increase this threshold, set a higher 'options.highWaterMark' when calling .subscribe()."));
              continue;
            }
            const o = Dc.lossyIntoFrame(r);
            a.enqueue(o);
          }
      });
    }
    /** Resend all subscription updates.
     *
     * This must be sent after a full reconnect to ensure the SFU knows which
     * tracks are subscribed to locally.
     */
    resendSubscriptionUpdates() {
      for (const [e, t] of this.descriptors)
        t.subscription.type !== "none" && this.emit("sfuUpdateSubscription", {
          sid: e,
          subscribe: true
        });
    }
    /** Called when a remote participant is disconnected so that any pending data tracks can be
     * cancelled. */
    handleRemoteParticipantDisconnected(e) {
      var t, n;
      for (const s of this.descriptors.values())
        if (s.publisherIdentity === e)
          switch (s.subscription.type) {
            case "none":
              break;
            case "pending":
              (n = (t = s.subscription.completionFuture).reject) === null || n === void 0 || n.call(t, ye.disconnected());
              break;
            case "active":
              this.unSubscribeRequest(s.info.sid);
              break;
          }
    }
    /** Shutdown the manager, ending any subscriptions. */
    shutdown() {
      var e, t;
      for (const n of this.descriptors.values())
        this.emit("trackUnpublished", {
          sid: n.info.sid,
          publisherIdentity: n.publisherIdentity
        }), n.subscription.type === "pending" && ((t = (e = n.subscription.completionFuture).reject) === null || t === void 0 || t.call(e, ye.disconnected())), n.subscription.type === "active" && this.closeStreamControllers(n.subscription.streamControllers, n.info.sid);
      this.descriptors.clear();
    }
  }
  class ki extends Oe {
    constructor(e, t, n) {
      super(19, e, n), this.name = "DataTrackPacketizerError", this.reason = t, this.reasonName = ti[t];
    }
    static mtuTooShort() {
      return new ki("MTU is too short to send frame", ti.MtuTooShort);
    }
  }
  var ti;
  (function(i) {
    i[i.MtuTooShort = 0] = "MtuTooShort";
  })(ti || (ti = {}));
  class or {
    constructor(e, t) {
      this.sequence = Ve.u16(0), this.frameNumber = Ve.u16(0), this.clock = kt.rtpStartingNow(Wt.rtpRandom()), this.handle = e, this.mtuSizeBytes = t;
    }
    /** @internal */
    static computeFrameMarker(e, t) {
      return t <= 1 ? z.Single : e === 0 ? z.Start : e === t - 1 ? z.Final : z.Inter;
    }
    /** Generates a series of packets for the specified {@link DataTrackFrameInternal}.
     *
     * NOTE: The return value of this function is a generator, so it can be lazily ran if desired,
     * or converted to an array with {@link Array.from}.
     */
    *packetize(e, t) {
      var n;
      const s = this.frameNumber.getThenIncrement(), r = {
        marker: z.Inter,
        trackHandle: this.handle,
        sequence: Ve.u16(0),
        frameNumber: s,
        timestamp: (n = t == null ? void 0 : t.now) !== null && n !== void 0 ? n : this.clock.now(),
        extensions: e.extensions
      }, a = new Sn(r).toBinaryLengthBytes();
      if (a >= this.mtuSizeBytes)
        throw ki.mtuTooShort();
      const o = this.mtuSizeBytes - a, d = Math.ceil(e.payload.byteLength / o);
      for (let c = 0, l = 0; l < e.payload.byteLength; [c, l] = [c + 1, l + o]) {
        const u = this.sequence.getThenIncrement(), h = new Sn(Object.assign(Object.assign({}, r), {
          marker: or.computeFrameMarker(c, d),
          sequence: u
        })), f = Math.min(
          // All but the last packet will be max length ...
          o,
          // ... and the last packet will be as long as it needs to be to finish out the buffer.
          e.payload.byteLength - l
        ), v = new Uint8Array(e.payload.buffer, e.payload.byteOffset + l, f);
        yield new bi(h, v);
      }
    }
  }
  var De;
  (function(i) {
    i[i.NotAllowed = 0] = "NotAllowed", i[i.DuplicateName = 1] = "DuplicateName", i[i.Timeout = 2] = "Timeout", i[i.LimitReached = 3] = "LimitReached", i[i.Disconnected = 4] = "Disconnected", i[i.Cancelled = 5] = "Cancelled", i[i.InvalidName = 6] = "InvalidName", i[i.Unknown = 7] = "Unknown";
  })(De || (De = {}));
  class re extends Oe {
    constructor(e, t, n) {
      super(21, e, n), this.name = "DataTrackPublishError", this.reason = t, this.reasonName = De[t], this.rawMessage = n == null ? void 0 : n.rawMessage;
    }
    static notAllowed(e) {
      return new re("Data track publishing unauthorized", De.NotAllowed, {
        rawMessage: e
      });
    }
    static duplicateName(e) {
      return new re("Track name already taken", De.DuplicateName, {
        rawMessage: e
      });
    }
    static invalidName(e) {
      return new re("Track name is invalid", De.InvalidName, {
        rawMessage: e
      });
    }
    static timeout() {
      return new re("Publish data track timed-out. Does the LiveKit server support data tracks?", De.Timeout);
    }
    static limitReached(e) {
      return new re("Data track publication limit reached", De.LimitReached, {
        rawMessage: e
      });
    }
    static unknown(e, t) {
      return new re("Received RequestResponse for publishDataTrack, but reason was unrecognised (".concat(e, ", ").concat(t, ")"), De.Unknown);
    }
    static disconnected() {
      return new re("Room disconnected", De.Disconnected);
    }
    // NOTE: this was introduced by web / there isn't a corresponding case in the rust version.
    static cancelled() {
      return new re("Publish data track cancelled by caller", De.Cancelled);
    }
  }
  var ln;
  (function(i) {
    i[i.TrackUnpublished = 0] = "TrackUnpublished", i[i.Dropped = 1] = "Dropped";
  })(ln || (ln = {}));
  class lt extends Oe {
    constructor(e, t, n) {
      super(22, e, n), this.name = "DataTrackPushFrameError", this.reason = t, this.reasonName = ln[t];
    }
    static trackUnpublished() {
      return new lt("Track is no longer published", ln.TrackUnpublished);
    }
    static dropped(e) {
      return new lt("Frame was dropped", ln.Dropped, {
        cause: e
      });
    }
  }
  var un;
  (function(i) {
    i[i.Packetizer = 0] = "Packetizer", i[i.Encryption = 1] = "Encryption";
  })(un || (un = {}));
  class Cn extends Oe {
    constructor(e, t, n) {
      super(21, e, n), this.name = "DataTrackOutgoingPipelineError", this.reason = t, this.reasonName = un[t];
    }
    static packetizer(e) {
      return new Cn("Error packetizing frame", un.Packetizer, {
        cause: e
      });
    }
    static encryption(e) {
      return new Cn("Error encrypting frame", un.Encryption, {
        cause: e
      });
    }
  }
  class Ti {
    /** @internal */
    constructor(e, t) {
      this.trackSymbol = Ac, this.isLocal = true, this.typeSymbol = xc, this.handle = null, this.log = U, this.options = e, this.manager = t, this.log = Ee(fe.DataTracks);
    }
    /** @internal */
    static withExplicitHandle(e, t, n) {
      const s = new Ti(e, t);
      return s.handle = n, s;
    }
    /** Metrics about the data track publication. */
    get info() {
      const e = this.descriptor;
      if ((e == null ? void 0 : e.type) === "active")
        return e.info;
    }
    /** The raw descriptor from the manager containing the internal state for this local track. */
    get descriptor() {
      return this.handle ? this.manager.getDescriptor(this.handle) : null;
    }
    /**
     * Publish the track to the SFU. This must be done before calling {@link tryPush} for the first time.
     * @internal
     * */
    publish(e) {
      return m(this, void 0, void 0, function* () {
        try {
          this.handle = yield this.manager.publishRequest(this.options, e);
        } catch (t) {
          throw t;
        }
      });
    }
    isPublished() {
      var e;
      return ((e = this.descriptor) === null || e === void 0 ? void 0 : e.type) === "active" && this.descriptor.publishState !== "unpublished";
    }
    /** Try pushing a frame to subscribers of the track.
     *
     * Pushing a frame can fail for several reasons:
     *
     * - The track has been unpublished by the local participant or SFU
     * - The room is no longer connected
     */
    tryPush(e) {
      if (!this.handle)
        throw lt.trackUnpublished();
      const t = Dc.from(e);
      try {
        return this.manager.tryProcessAndSend(this.handle, t);
      } catch (n) {
        throw n;
      }
    }
    /**
     * Unpublish the track from the SFU. Once this is called, any further calls to {@link tryPush}
     * will fail.
     * */
    unpublish() {
      return m(this, void 0, void 0, function* () {
        if (!this.handle) {
          U.warn('Data track "'.concat(this.options.name, '" is not published, so unpublishing has no effect.'));
          return;
        }
        try {
          yield this.manager.unpublishRequest(this.handle);
        } catch (e) {
          throw e;
        }
      });
    }
  }
  class Si {
    constructor(e) {
      this.e2eeManager = e.e2eeManager, this.packetizer = new or(e.info.pubHandle, Si.TRANSPORT_MTU_BYTES);
    }
    updateE2eeManager(e) {
      this.e2eeManager = e;
    }
    processFrame(e) {
      return Yl(this, arguments, function* () {
        const n = yield Gt(this.encryptIfNeeded(e));
        try {
          yield Gt(yield* Ql(Ue(this.packetizer.packetize(n))));
        } catch (s) {
          throw s instanceof ki ? Cn.packetizer(s) : s;
        }
      });
    }
    encryptIfNeeded(e) {
      return m(this, void 0, void 0, function* () {
        if (!this.e2eeManager)
          return e;
        let t;
        try {
          t = yield this.e2eeManager.encryptData(e.payload);
        } catch (n) {
          throw Cn.encryption(n);
        }
        return e.payload = t.payload, e.extensions.e2ee = new je(t.keyIndex, t.iv), e;
      });
    }
  }
  Si.TRANSPORT_MTU_BYTES = 16e3;
  const Ze = Ee(fe.DataTracks), _a = {
    pending() {
      return {
        type: "pending",
        completionFuture: new Se()
      };
    },
    active(i, e) {
      return {
        type: "active",
        info: i,
        publishState: "published",
        pipeline: new Si({
          info: i,
          e2eeManager: e
        }),
        unpublishingFuture: new Se()
      };
    }
  }, mf = 1e4;
  class cr extends Ie.EventEmitter {
    constructor(e) {
      var t;
      super(), this.handleAllocator = new oh(), this.descriptors = /* @__PURE__ */ new Map(), this.e2eeManager = (t = e == null ? void 0 : e.e2eeManager) !== null && t !== void 0 ? t : null;
    }
    static withDescriptors(e) {
      const t = new cr();
      return t.descriptors = e, t;
    }
    /** @internal */
    updateE2eeManager(e) {
      this.e2eeManager = e;
      for (const t of this.descriptors.values())
        t.type === "active" && t.pipeline.updateE2eeManager(e);
    }
    /**
     * Used by attached {@link LocalDataTrack} instances to query their associated descriptor info.
     * @internal
     */
    getDescriptor(e) {
      var t;
      return (t = this.descriptors.get(e)) !== null && t !== void 0 ? t : null;
    }
    /** Used by attached {@link LocalDataTrack} instances to broadcast data track packets to other
     * subscribers.
     * @internal
     */
    tryProcessAndSend(e, t) {
      return m(this, void 0, void 0, function* () {
        var n, s, r, a;
        const o = this.getDescriptor(e);
        if ((o == null ? void 0 : o.type) !== "active" || o.publishState === "unpublished")
          throw lt.trackUnpublished();
        if (o.publishState === "republishing")
          throw lt.dropped("Data track republishing");
        try {
          try {
            for (var d = !0, c = Ue(o.pipeline.processFrame(t)), l; l = yield c.next(), n = l.done, !n; d = !0) {
              a = l.value, d = !1;
              const u = a;
              this.emit("packetAvailable", {
                bytes: u.toBinary()
              });
            }
          } catch (u) {
            s = {
              error: u
            };
          } finally {
            try {
              !d && !n && (r = c.return) && (yield r.call(c));
            } finally {
              if (s) throw s.error;
            }
          }
        } catch (u) {
          throw lt.dropped(u);
        }
      });
    }
    /**
     * Client requested to publish a track.
     *
     * If the LiveKit server is too old and doesn't support data tracks, a
     * {@link DataTrackPublishError#timeout} will be thrown.
     *
     * @internal
     **/
    publishRequest(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = this.handleAllocator.get();
        if (!n)
          throw re.limitReached();
        const s = Oc(mf), r = t ? Ic([t, s]) : s;
        if (this.descriptors.has(n))
          throw new Error("Descriptor for handle already exists");
        const a = _a.pending();
        this.descriptors.set(n, a);
        const o = () => {
          var d, c;
          const l = this.descriptors.get(n);
          if (!l) {
            Ze.warn("No descriptor for ".concat(n));
            return;
          }
          this.descriptors.delete(n), this.emit("sfuUnpublishRequest", {
            handle: n
          }), l.type === "pending" && ((c = (d = l.completionFuture).reject) === null || c === void 0 || c.call(d, s.aborted ? re.timeout() : (
            // NOTE: the below cancelled case was introduced by web / there isn't a corresponding case in the rust version.
            re.cancelled()
          )));
        };
        return r.aborted ? (o(), a.completionFuture.promise.then(
          () => n
          /* no-op, makes typescript happy */
        )) : (r.addEventListener("abort", o), this.emit("sfuPublishRequest", {
          handle: n,
          name: e.name,
          usesE2ee: this.e2eeManager !== null
        }), yield a.completionFuture.promise, r.removeEventListener("abort", o), this.emit("trackPublished", {
          track: Ti.withExplicitHandle(e, this, n)
        }), n);
      });
    }
    /**
     * Get information about all currently published tracks.
     * @internal
     **/
    queryPublished() {
      return Array.from(this.descriptors.values()).filter((t) => t.type === "active").map((t) => t.info);
    }
    /**
     * Client request to unpublish a track.
     * @internal
     **/
    unpublishRequest(e) {
      return m(this, void 0, void 0, function* () {
        const t = this.descriptors.get(e);
        if (!t) {
          Ze.warn("No descriptor for ".concat(e));
          return;
        }
        if (t.type !== "active") {
          Ze.warn("Track ".concat(e, " not active"));
          return;
        }
        this.emit("sfuUnpublishRequest", {
          handle: e
        }), yield t.unpublishingFuture.promise, this.emit("trackUnpublished", {
          sid: t.info.sid
        });
      });
    }
    /**
     * SFU responded to a request to publish a data track.
     * @internal
     **/
    receivedSfuPublishResponse(e, t) {
      var n, s, r, a;
      const o = this.descriptors.get(e);
      if (!o) {
        Ze.warn("No descriptor for ".concat(e));
        return;
      }
      switch (this.descriptors.delete(e), o.type) {
        case "pending": {
          if (t.type === "ok") {
            const d = t.data, c = d.usesE2ee ? this.e2eeManager : null;
            this.descriptors.set(d.pubHandle, _a.active(d, c)), (s = (n = o.completionFuture).resolve) === null || s === void 0 || s.call(n);
          } else
            (a = (r = o.completionFuture).reject) === null || a === void 0 || a.call(r, t.error);
          return;
        }
        case "active": {
          if (o.publishState !== "republishing") {
            Ze.warn("Track ".concat(e, " already active"));
            return;
          }
          if (t.type === "error") {
            Ze.warn("Republish failed for track ".concat(e));
            return;
          }
          Ze.debug("Track ".concat(e, " republished")), o.info.sid = t.data.sid, o.publishState = "published", this.descriptors.set(o.info.pubHandle, o);
        }
      }
    }
    /**
     * SFU notification that a track has been unpublished.
     * @internal
     **/
    receivedSfuUnpublishResponse(e) {
      var t, n;
      const s = this.descriptors.get(e);
      if (!s) {
        Ze.warn("No descriptor for ".concat(e));
        return;
      }
      if (this.descriptors.delete(e), s.type !== "active") {
        Ze.warn("Track ".concat(e, " not active"));
        return;
      }
      s.publishState = "unpublished", (n = (t = s.unpublishingFuture).resolve) === null || n === void 0 || n.call(t);
    }
    /** Republish all tracks.
     *
     * This must be sent after a full reconnect in order for existing publications
     * to be recognized by the SFU. Each republished track will be assigned a new SID.
     * @internal
     */
    sfuWillRepublishTracks() {
      var e, t;
      for (const [n, s] of this.descriptors.entries())
        switch (s.type) {
          case "pending":
            this.descriptors.delete(n), (t = (e = s.completionFuture).reject) === null || t === void 0 || t.call(e, re.disconnected());
            break;
          case "active":
            s.publishState = "republishing", this.emit("sfuPublishRequest", {
              handle: s.info.pubHandle,
              name: s.info.name,
              usesE2ee: s.info.usesE2ee
            });
        }
    }
    /**
     * Shuts down the manager and all associated tracks.
     * @internal
     **/
    shutdown() {
      return m(this, void 0, void 0, function* () {
        var e, t, n, s;
        for (const r of this.descriptors.values())
          switch (r.type) {
            case "pending":
              (t = (e = r.completionFuture).reject) === null || t === void 0 || t.call(e, re.disconnected());
              break;
            case "active":
              (s = (n = r.unpublishingFuture).resolve) === null || s === void 0 || s.call(n), yield this.unpublishRequest(r.info.pubHandle);
              break;
          }
        this.descriptors.clear();
      });
    }
  }
  class Lc extends C {
    constructor(e, t, n, s, r) {
      super(e, n, r), this.sid = t, this.receiver = s;
    }
    get isLocal() {
      return false;
    }
    /** @internal */
    setMuted(e) {
      this.isMuted !== e && (this.isMuted = e, this._mediaStreamTrack.enabled = !e, this.emit(e ? R.Muted : R.Unmuted, this));
    }
    /** @internal */
    setMediaStream(e) {
      this.mediaStream = e;
      const t = (n) => {
        n.track === this._mediaStreamTrack && (e.removeEventListener("removetrack", t), this.receiver && "playoutDelayHint" in this.receiver && (this.receiver.playoutDelayHint = void 0), this.receiver = void 0, this._currentBitrate = 0, this.emit(R.Ended, this));
      };
      e.addEventListener("removetrack", t);
    }
    start() {
      this.startMonitor(), super.enable();
    }
    stop() {
      this.stopMonitor(), super.disable();
    }
    /**
     * Gets the RTCStatsReport for the RemoteTrack's underlying RTCRtpReceiver
     * See https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport
     *
     * @returns Promise<RTCStatsReport> | undefined
     */
    getRTCStatsReport() {
      return m(this, void 0, void 0, function* () {
        var e;
        return !((e = this.receiver) === null || e === void 0) && e.getStats ? yield this.receiver.getStats() : void 0;
      });
    }
    /**
     * Allows to set a playout delay (in seconds) for this track.
     * A higher value allows for more buffering of the track in the browser
     * and will result in a delay of media being played back of `delayInSeconds`
     */
    setPlayoutDelay(e) {
      this.receiver ? "playoutDelayHint" in this.receiver ? this.receiver.playoutDelayHint = e : this.log.warn("Playout delay not supported in this browser") : this.log.warn("Cannot set playout delay, track already ended");
    }
    /**
     * Returns the current playout delay (in seconds) of this track.
     */
    getPlayoutDelay() {
      if (this.receiver) {
        if ("playoutDelayHint" in this.receiver)
          return this.receiver.playoutDelayHint;
        this.log.warn("Playout delay not supported in this browser");
      } else
        this.log.warn("Cannot get playout delay, track already ended");
      return 0;
    }
    /* @internal */
    startMonitor() {
      this.monitorInterval || (this.monitorInterval = setInterval(() => this.monitorReceiver(), rr)), ku() && this.registerTimeSyncUpdate();
    }
    registerTimeSyncUpdate() {
      const e = () => {
        var t;
        this.timeSyncHandle = requestAnimationFrame(() => e());
        const n = (t = this.receiver) === null || t === void 0 ? void 0 : t.getSynchronizationSources()[0];
        if (n) {
          const {
            timestamp: s,
            rtpTimestamp: r
          } = n;
          r && this.rtpTimestamp !== r && (this.emit(R.TimeSyncUpdate, {
            timestamp: s,
            rtpTimestamp: r
          }), this.rtpTimestamp = r);
        }
      };
      e();
    }
  }
  class pf extends Lc {
    constructor(e, t, n, s, r, a) {
      super(e, t, C.Kind.Audio, n, a), this.monitorReceiver = () => m(this, void 0, void 0, function* () {
        if (!this.receiver) {
          this._currentBitrate = 0;
          return;
        }
        const o = yield this.getReceiverStats();
        o && this.prevStats && this.receiver && (this._currentBitrate = gi(o, this.prevStats)), this.prevStats = o;
      }), this.audioContext = s, this.webAudioPluginNodes = [], r && (this.sinkId = r.deviceId);
    }
    /**
     * sets the volume for all attached audio elements
     */
    setVolume(e) {
      var t;
      for (const n of this.attachedElements)
        this.audioContext ? (t = this.gainNode) === null || t === void 0 || t.gain.setTargetAtTime(e, 0, 0.1) : n.volume = e;
      Ye() && this._mediaStreamTrack._setVolume(e), this.elementVolume = e;
    }
    /**
     * gets the volume of attached audio elements (loudest)
     */
    getVolume() {
      if (this.elementVolume)
        return this.elementVolume;
      if (Ye())
        return 1;
      let e = 0;
      return this.attachedElements.forEach((t) => {
        t.volume > e && (e = t.volume);
      }), e;
    }
    /**
     * calls setSinkId on all attached elements, if supported
     * @param deviceId audio output device
     */
    setSinkId(e) {
      return m(this, void 0, void 0, function* () {
        this.sinkId = e, yield Promise.all(this.attachedElements.map((t) => {
          if (Zn(t))
            return t.setSinkId(e);
        }));
      });
    }
    attach(e) {
      const t = this.attachedElements.length === 0;
      return e ? super.attach(e) : e = super.attach(), this.sinkId && Zn(e) && e.setSinkId(this.sinkId).catch((n) => {
        this.log.error("Failed to set sink id on remote audio track", n, this.logContext);
      }), this.audioContext && t && (this.log.debug("using audio context mapping", this.logContext), this.connectWebAudio(this.audioContext, e), e.volume = 0, e.muted = true), this.elementVolume && this.setVolume(this.elementVolume), e;
    }
    detach(e) {
      let t;
      return e ? (t = super.detach(e), this.audioContext && (this.attachedElements.length > 0 ? this.connectWebAudio(this.audioContext, this.attachedElements[0]) : this.disconnectWebAudio())) : (t = super.detach(), this.disconnectWebAudio()), t;
    }
    /**
     * @internal
     * @experimental
     */
    setAudioContext(e) {
      this.audioContext = e, e && this.attachedElements.length > 0 ? this.connectWebAudio(e, this.attachedElements[0]) : e || this.disconnectWebAudio();
    }
    /**
     * @internal
     * @experimental
     * @param {AudioNode[]} nodes - An array of WebAudio nodes. These nodes should not be connected to each other when passed, as the sdk will take care of connecting them in the order of the array.
     */
    setWebAudioPlugins(e) {
      this.webAudioPluginNodes = e, this.attachedElements.length > 0 && this.audioContext && this.connectWebAudio(this.audioContext, this.attachedElements[0]);
    }
    connectWebAudio(e, t) {
      this.disconnectWebAudio(), this.sourceNode = e.createMediaStreamSource(t.srcObject);
      let n = this.sourceNode;
      this.webAudioPluginNodes.forEach((s) => {
        n.connect(s), n = s;
      }), this.gainNode = e.createGain(), n.connect(this.gainNode), this.gainNode.connect(e.destination), this.elementVolume && this.gainNode.gain.setTargetAtTime(this.elementVolume, 0, 0.1), e.state !== "running" && e.resume().then(() => {
        e.state !== "running" && this.emit(R.AudioPlaybackFailed, new Error("Audio Context couldn't be started automatically"));
      }).catch((s) => {
        this.emit(R.AudioPlaybackFailed, s);
      });
    }
    disconnectWebAudio() {
      var e, t;
      (e = this.gainNode) === null || e === void 0 || e.disconnect(), (t = this.sourceNode) === null || t === void 0 || t.disconnect(), this.gainNode = void 0, this.sourceNode = void 0;
    }
    getReceiverStats() {
      return m(this, void 0, void 0, function* () {
        if (!this.receiver || !this.receiver.getStats)
          return;
        const e = yield this.receiver.getStats();
        let t;
        return e.forEach((n) => {
          n.type === "inbound-rtp" && (t = {
            type: "audio",
            streamId: n.id,
            timestamp: n.timestamp,
            jitter: n.jitter,
            bytesReceived: n.bytesReceived,
            concealedSamples: n.concealedSamples,
            concealmentEvents: n.concealmentEvents,
            silentConcealedSamples: n.silentConcealedSamples,
            silentConcealmentEvents: n.silentConcealmentEvents,
            totalAudioEnergy: n.totalAudioEnergy,
            totalSamplesDuration: n.totalSamplesDuration
          });
        }), t;
      });
    }
  }
  const Qi = 100;
  class gf extends Lc {
    constructor(e, t, n, s, r) {
      super(e, t, C.Kind.Video, n, r), this.elementInfos = [], this.monitorReceiver = () => m(this, void 0, void 0, function* () {
        if (!this.receiver) {
          this._currentBitrate = 0;
          return;
        }
        const a = yield this.getReceiverStats();
        a && this.prevStats && this.receiver && (this._currentBitrate = gi(a, this.prevStats)), this.prevStats = a;
      }), this.debouncedHandleResize = tr(() => {
        this.updateDimensions();
      }, Qi), this.adaptiveStreamSettings = s;
    }
    get isAdaptiveStream() {
      return this.adaptiveStreamSettings !== void 0;
    }
    setStreamState(e) {
      super.setStreamState(e), this.log.debug("setStreamState", e), this.isAdaptiveStream && e === C.StreamState.Active && this.updateVisibility();
    }
    /**
     * Note: When using adaptiveStream, you need to use remoteVideoTrack.attach() to add the track to a HTMLVideoElement, otherwise your video tracks might never start
     */
    get mediaStreamTrack() {
      return this._mediaStreamTrack;
    }
    /** @internal */
    setMuted(e) {
      super.setMuted(e), this.attachedElements.forEach((t) => {
        e ? qt(this._mediaStreamTrack, t) : Ut(this._mediaStreamTrack, t);
      });
    }
    attach(e) {
      if (e ? super.attach(e) : e = super.attach(), this.adaptiveStreamSettings && this.elementInfos.find((t) => t.element === e) === void 0) {
        const t = new vf(e);
        this.observeElementInfo(t);
      }
      return e;
    }
    /**
     * Observe an ElementInfo for changes when adaptive streaming.
     * @param elementInfo
     * @internal
     */
    observeElementInfo(e) {
      this.adaptiveStreamSettings && this.elementInfos.find((t) => t === e) === void 0 ? (e.handleResize = () => {
        this.debouncedHandleResize();
      }, e.handleVisibilityChanged = () => {
        this.updateVisibility();
      }, this.elementInfos.push(e), e.observe(), this.debouncedHandleResize(), this.updateVisibility()) : this.log.warn("visibility resize observer not triggered", this.logContext);
    }
    /**
     * Stop observing an ElementInfo for changes.
     * @param elementInfo
     * @internal
     */
    stopObservingElementInfo(e) {
      if (!this.isAdaptiveStream) {
        this.log.warn("stopObservingElementInfo ignored", this.logContext);
        return;
      }
      const t = this.elementInfos.filter((n) => n === e);
      for (const n of t)
        n.stopObserving();
      this.elementInfos = this.elementInfos.filter((n) => n !== e), this.updateVisibility(), this.debouncedHandleResize();
    }
    detach(e) {
      let t = [];
      if (e)
        return this.stopObservingElement(e), super.detach(e);
      t = super.detach();
      for (const n of t)
        this.stopObservingElement(n);
      return t;
    }
    /** @internal */
    getDecoderImplementation() {
      var e;
      return (e = this.prevStats) === null || e === void 0 ? void 0 : e.decoderImplementation;
    }
    getReceiverStats() {
      return m(this, void 0, void 0, function* () {
        if (!this.receiver || !this.receiver.getStats)
          return;
        const e = yield this.receiver.getStats();
        let t, n = "", s = /* @__PURE__ */ new Map();
        return e.forEach((r) => {
          r.type === "inbound-rtp" ? (n = r.codecId, t = {
            type: "video",
            streamId: r.id,
            framesDecoded: r.framesDecoded,
            framesDropped: r.framesDropped,
            framesReceived: r.framesReceived,
            packetsReceived: r.packetsReceived,
            packetsLost: r.packetsLost,
            frameWidth: r.frameWidth,
            frameHeight: r.frameHeight,
            pliCount: r.pliCount,
            firCount: r.firCount,
            nackCount: r.nackCount,
            jitter: r.jitter,
            timestamp: r.timestamp,
            bytesReceived: r.bytesReceived,
            decoderImplementation: r.decoderImplementation
          }) : r.type === "codec" && s.set(r.id, r);
        }), t && n !== "" && s.get(n) && (t.mimeType = s.get(n).mimeType), t;
      });
    }
    stopObservingElement(e) {
      const t = this.elementInfos.filter((n) => n.element === e);
      for (const n of t)
        this.stopObservingElementInfo(n);
    }
    handleAppVisibilityChanged() {
      const e = Object.create(null, {
        handleAppVisibilityChanged: {
          get: () => super.handleAppVisibilityChanged
        }
      });
      return m(this, void 0, void 0, function* () {
        yield e.handleAppVisibilityChanged.call(this), this.isAdaptiveStream && this.updateVisibility();
      });
    }
    updateVisibility(e) {
      var t, n;
      const s = this.elementInfos.reduce((d, c) => Math.max(d, c.visibilityChangedAt || 0), 0), r = !((n = (t = this.adaptiveStreamSettings) === null || t === void 0 ? void 0 : t.pauseVideoInBackground) !== null && n !== void 0) || n ? this.isInBackground : false, a = this.elementInfos.some((d) => d.pictureInPicture), o = this.elementInfos.some((d) => d.visible) && !r || a;
      if (!(this.lastVisible === o && !e)) {
        if (!o && Date.now() - s < Qi) {
          se.setTimeout(() => {
            this.updateVisibility();
          }, Qi);
          return;
        }
        this.lastVisible = o, this.emit(R.VisibilityChanged, o, this);
      }
    }
    updateDimensions() {
      var e, t;
      let n = 0, s = 0;
      const r = this.getPixelDensity();
      for (const a of this.elementInfos) {
        const o = a.width() * r, d = a.height() * r;
        o + d > n + s && (n = o, s = d);
      }
      ((e = this.lastDimensions) === null || e === void 0 ? void 0 : e.width) === n && ((t = this.lastDimensions) === null || t === void 0 ? void 0 : t.height) === s || (this.lastDimensions = {
        width: n,
        height: s
      }, this.emit(R.VideoDimensionsChanged, this.lastDimensions, this));
    }
    getPixelDensity() {
      var e;
      const t = (e = this.adaptiveStreamSettings) === null || e === void 0 ? void 0 : e.pixelDensity;
      return t === "screen" ? Hr() : t || (Hr() > 2 ? 2 : 1);
    }
  }
  class vf {
    get visible() {
      return this.isPiP || this.isIntersecting;
    }
    get pictureInPicture() {
      return this.isPiP;
    }
    constructor(e, t) {
      this.onVisibilityChanged = (n) => {
        var s;
        const {
          target: r,
          isIntersecting: a
        } = n;
        r === this.element && (this.isIntersecting = a, this.isPiP = tn(this.element), this.visibilityChangedAt = Date.now(), (s = this.handleVisibilityChanged) === null || s === void 0 || s.call(this));
      }, this.onEnterPiP = () => {
        var n, s, r;
        (s = (n = window.documentPictureInPicture) === null || n === void 0 ? void 0 : n.window) === null || s === void 0 || s.addEventListener("pagehide", this.onLeavePiP), this.isPiP = tn(this.element), (r = this.handleVisibilityChanged) === null || r === void 0 || r.call(this);
      }, this.onLeavePiP = () => {
        var n;
        this.isPiP = tn(this.element), (n = this.handleVisibilityChanged) === null || n === void 0 || n.call(this);
      }, this.element = e, this.isIntersecting = t ?? Ps(e), this.isPiP = Te() && tn(e), this.visibilityChangedAt = 0;
    }
    width() {
      return this.element.clientWidth;
    }
    height() {
      return this.element.clientHeight;
    }
    observe() {
      var e, t, n;
      this.isIntersecting = Ps(this.element), this.isPiP = tn(this.element), this.element.handleResize = () => {
        var s;
        (s = this.handleResize) === null || s === void 0 || s.call(this);
      }, this.element.handleVisibilityChanged = this.onVisibilityChanged, Gr().observe(this.element), Kr().observe(this.element), this.element.addEventListener("enterpictureinpicture", this.onEnterPiP), this.element.addEventListener("leavepictureinpicture", this.onLeavePiP), (e = window.documentPictureInPicture) === null || e === void 0 || e.addEventListener("enter", this.onEnterPiP), (n = (t = window.documentPictureInPicture) === null || t === void 0 ? void 0 : t.window) === null || n === void 0 || n.addEventListener("pagehide", this.onLeavePiP);
    }
    stopObserving() {
      var e, t, n, s, r;
      (e = Gr()) === null || e === void 0 || e.unobserve(this.element), (t = Kr()) === null || t === void 0 || t.unobserve(this.element), this.element.removeEventListener("enterpictureinpicture", this.onEnterPiP), this.element.removeEventListener("leavepictureinpicture", this.onLeavePiP), (n = window.documentPictureInPicture) === null || n === void 0 || n.removeEventListener("enter", this.onEnterPiP), (r = (s = window.documentPictureInPicture) === null || s === void 0 ? void 0 : s.window) === null || r === void 0 || r.removeEventListener("pagehide", this.onLeavePiP);
    }
  }
  function tn(i) {
    var e, t;
    return document.pictureInPictureElement === i ? true : !((e = window.documentPictureInPicture) === null || e === void 0) && e.window ? Ps(i, (t = window.documentPictureInPicture) === null || t === void 0 ? void 0 : t.window) : false;
  }
  function Ps(i, e) {
    const t = e || window;
    let n = i.offsetTop, s = i.offsetLeft;
    const r = i.offsetWidth, a = i.offsetHeight, {
      hidden: o
    } = i, {
      display: d
    } = getComputedStyle(i);
    for (; i.offsetParent; )
      i = i.offsetParent, n += i.offsetTop, s += i.offsetLeft;
    return n < t.pageYOffset + t.innerHeight && s < t.pageXOffset + t.innerWidth && n + a > t.pageYOffset && s + r > t.pageXOffset && !o && d !== "none";
  }
  class nt extends Ie.EventEmitter {
    constructor(e, t, n, s) {
      var r;
      super(), this.metadataMuted = false, this.encryption = J.NONE, this.log = U, this.handleMuted = () => {
        this.emit(R.Muted);
      }, this.handleUnmuted = () => {
        this.emit(R.Unmuted);
      }, this.log = Ee((r = s == null ? void 0 : s.loggerName) !== null && r !== void 0 ? r : fe.Publication), this.loggerContextCb = this.loggerContextCb, this.setMaxListeners(100), this.kind = e, this.trackSid = t, this.trackName = n, this.source = C.Source.Unknown;
    }
    /** @internal */
    setTrack(e) {
      this.track && (this.track.off(R.Muted, this.handleMuted), this.track.off(R.Unmuted, this.handleUnmuted)), this.track = e, e && (e.on(R.Muted, this.handleMuted), e.on(R.Unmuted, this.handleUnmuted));
    }
    get logContext() {
      var e;
      return Object.assign(Object.assign({}, (e = this.loggerContextCb) === null || e === void 0 ? void 0 : e.call(this)), j(this));
    }
    get isMuted() {
      return this.metadataMuted;
    }
    get isEnabled() {
      return true;
    }
    get isSubscribed() {
      return this.track !== void 0;
    }
    get isEncrypted() {
      return this.encryption !== J.NONE;
    }
    /**
     * an [AudioTrack] if this publication holds an audio track
     */
    get audioTrack() {
      if (ze(this.track))
        return this.track;
    }
    /**
     * an [VideoTrack] if this publication holds a video track
     */
    get videoTrack() {
      if (pt(this.track))
        return this.track;
    }
    /** @internal */
    updateInfo(e) {
      this.trackSid = e.sid, this.trackName = e.name, this.source = C.sourceFromProto(e.source), this.mimeType = e.mimeType, this.kind === C.Kind.Video && e.width > 0 && (this.dimensions = {
        width: e.width,
        height: e.height
      }, this.simulcasted = e.simulcast), this.encryption = e.encryption, this.trackInfo = e, this.log.debug("update publication info", Object.assign(Object.assign({}, this.logContext), {
        info: e
      }));
    }
  }
  (function(i) {
    ((function(e) {
      e.Desired = "desired", e.Subscribed = "subscribed", e.Unsubscribed = "unsubscribed";
    }))(i.SubscriptionStatus || (i.SubscriptionStatus = {})), (function(e) {
      e.Allowed = "allowed", e.NotAllowed = "not_allowed";
    })(i.PermissionStatus || (i.PermissionStatus = {}));
  })(nt || (nt = {}));
  class _s extends nt {
    get isUpstreamPaused() {
      var e;
      return (e = this.track) === null || e === void 0 ? void 0 : e.isUpstreamPaused;
    }
    constructor(e, t, n, s) {
      super(e, t.sid, t.name, s), this.track = void 0, this.handleTrackEnded = () => {
        this.emit(R.Ended);
      }, this.handleCpuConstrained = () => {
        this.track && pt(this.track) && this.emit(R.CpuConstrained, this.track);
      }, this.updateInfo(t), this.setTrack(n);
    }
    setTrack(e) {
      this.track && (this.track.off(R.Ended, this.handleTrackEnded), this.track.off(R.CpuConstrained, this.handleCpuConstrained)), super.setTrack(e), e && (e.on(R.Ended, this.handleTrackEnded), e.on(R.CpuConstrained, this.handleCpuConstrained));
    }
    get isMuted() {
      return this.track ? this.track.isMuted : super.isMuted;
    }
    get audioTrack() {
      return super.audioTrack;
    }
    get videoTrack() {
      return super.videoTrack;
    }
    get isLocal() {
      return true;
    }
    /**
     * Mute the track associated with this publication
     */
    mute() {
      return m(this, void 0, void 0, function* () {
        var e;
        return (e = this.track) === null || e === void 0 ? void 0 : e.mute();
      });
    }
    /**
     * Unmute track associated with this publication
     */
    unmute() {
      return m(this, void 0, void 0, function* () {
        var e;
        return (e = this.track) === null || e === void 0 ? void 0 : e.unmute();
      });
    }
    /**
     * Pauses the media stream track associated with this publication from being sent to the server
     * and signals "muted" event to other participants
     * Useful if you want to pause the stream without pausing the local media stream track
     */
    pauseUpstream() {
      return m(this, void 0, void 0, function* () {
        var e;
        yield (e = this.track) === null || e === void 0 ? void 0 : e.pauseUpstream();
      });
    }
    /**
     * Resumes sending the media stream track associated with this publication to the server after a call to [[pauseUpstream()]]
     * and signals "unmuted" event to other participants (unless the track is explicitly muted)
     */
    resumeUpstream() {
      return m(this, void 0, void 0, function* () {
        var e;
        yield (e = this.track) === null || e === void 0 ? void 0 : e.resumeUpstream();
      });
    }
    getTrackFeatures() {
      var e;
      if (ze(this.track)) {
        const t = this.track.getSourceTrackSettings(), n = /* @__PURE__ */ new Set();
        return t.autoGainControl && n.add(ae.TF_AUTO_GAIN_CONTROL), t.echoCancellation && n.add(ae.TF_ECHO_CANCELLATION), t.noiseSuppression && n.add(ae.TF_NOISE_SUPPRESSION), t.channelCount && t.channelCount > 1 && n.add(ae.TF_STEREO), !((e = this.options) === null || e === void 0) && e.dtx || n.add(ae.TF_NO_DTX), this.track.enhancedNoiseCancellation && n.add(ae.TF_ENHANCED_NOISE_CANCELLATION), Array.from(n.values());
      } else return [];
    }
  }
  function Ci(i, e) {
    return m(this, void 0, void 0, function* () {
      i ?? (i = {});
      let t = false;
      const {
        audioProcessor: n,
        videoProcessor: s,
        optionsWithoutProcessor: r
      } = uc(i);
      let a = r.audio, o = r.video;
      if (n && typeof r.audio == "object" && (r.audio.processor = n), s && typeof r.video == "object" && (r.video.processor = s), i.audio && typeof r.audio == "object" && typeof r.audio.deviceId == "string") {
        const u = r.audio.deviceId;
        r.audio.deviceId = {
          exact: u
        }, t = true, a = Object.assign(Object.assign({}, r.audio), {
          deviceId: {
            ideal: u
          }
        });
      }
      if (r.video && typeof r.video == "object" && typeof r.video.deviceId == "string") {
        const u = r.video.deviceId;
        r.video.deviceId = {
          exact: u
        }, t = true, o = Object.assign(Object.assign({}, r.video), {
          deviceId: {
            ideal: u
          }
        });
      }
      r.audio === true ? r.audio = {
        deviceId: "default"
      } : typeof r.audio == "object" && r.audio !== null && (r.audio = Object.assign(Object.assign({}, r.audio), {
        deviceId: r.audio.deviceId || "default"
      })), r.video === true ? r.video = {
        deviceId: "default"
      } : typeof r.video == "object" && !r.video.deviceId && (r.video.deviceId = "default");
      const d = cc(r, kc, Tc), c = zs(d), l = navigator.mediaDevices.getUserMedia(c);
      r.audio && (oe.userMediaPromiseMap.set("audioinput", l), l.catch(() => oe.userMediaPromiseMap.delete("audioinput"))), r.video && (oe.userMediaPromiseMap.set("videoinput", l), l.catch(() => oe.userMediaPromiseMap.delete("videoinput")));
      try {
        const u = yield l;
        return yield Promise.all(u.getTracks().map((h) => m(this, void 0, void 0, function* () {
          const f = h.kind === "audio";
          let v = f ? d.audio : d.video;
          (typeof v == "boolean" || !v) && (v = {});
          let g;
          const T = f ? c.audio : c.video;
          typeof T != "boolean" && (g = T);
          const k = h.getSettings().deviceId;
          g != null && g.deviceId && Pt(g.deviceId) !== k ? g.deviceId = k : g || (g = {
            deviceId: k
          });
          const w = Dh(h, g, e);
          return w.kind === C.Kind.Video ? w.source = C.Source.Camera : w.kind === C.Kind.Audio && (w.source = C.Source.Microphone), w.mediaStream = u, ze(w) && n ? yield w.setProcessor(n) : pt(w) && s && (yield w.setProcessor(s)), w;
        })));
      } catch (u) {
        if (!t)
          throw u;
        return Ci(Object.assign(Object.assign({}, i), {
          audio: a,
          video: o
        }), e);
      }
    });
  }
  function bf(i) {
    return m(this, void 0, void 0, function* () {
      return (yield Ci({
        audio: false,
        video: i ?? true
      }))[0];
    });
  }
  function yf(i) {
    return m(this, void 0, void 0, function* () {
      return (yield Ci({
        audio: i ?? true,
        video: false
      }))[0];
    });
  }
  function Lm(i) {
    return m(this, void 0, void 0, function* () {
      if (i === void 0 && (i = {}), i.resolution === void 0 && !hc() && (i.resolution = pi.h1080fps30.resolution), navigator.mediaDevices.getDisplayMedia === void 0)
        throw new mi("getDisplayMedia not supported");
      const e = lc(i), t = yield navigator.mediaDevices.getDisplayMedia(e), n = t.getVideoTracks();
      if (n.length === 0)
        throw new Je("no video track found");
      const s = new kn(n[0], void 0, false);
      s.source = C.Source.ScreenShare;
      const r = [s];
      if (t.getAudioTracks().length > 0) {
        const a = new yn(t.getAudioTracks()[0], void 0, false);
        a.source = C.Source.ScreenShareAudio, r.push(a);
      }
      return r;
    });
  }
  var ct;
  (function(i) {
    i.Excellent = "excellent", i.Good = "good", i.Poor = "poor", i.Lost = "lost", i.Unknown = "unknown";
  })(ct || (ct = {}));
  function kf(i) {
    switch (i) {
      case nn.EXCELLENT:
        return ct.Excellent;
      case nn.GOOD:
        return ct.Good;
      case nn.POOR:
        return ct.Poor;
      case nn.LOST:
        return ct.Lost;
      default:
        return ct.Unknown;
    }
  }
  class Uc extends Ie.EventEmitter {
    get logContext() {
      var e, t;
      return Object.assign({}, (t = (e = this.loggerOptions) === null || e === void 0 ? void 0 : e.loggerContextCb) === null || t === void 0 ? void 0 : t.call(e));
    }
    get isEncrypted() {
      return this.trackPublications.size > 0 && Array.from(this.trackPublications.values()).every((e) => e.isEncrypted);
    }
    get isAgent() {
      var e;
      return ((e = this.permissions) === null || e === void 0 ? void 0 : e.agent) || this.kind === fn.AGENT;
    }
    get isActive() {
      var e;
      return ((e = this.participantInfo) === null || e === void 0 ? void 0 : e.state) === Ft.ACTIVE;
    }
    get kind() {
      return this._kind;
    }
    /** participant attributes, similar to metadata, but as a key/value map */
    get attributes() {
      return Object.freeze(Object.assign({}, this._attributes));
    }
    /** @internal */
    constructor(e, t, n, s, r, a) {
      let o = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : fn.STANDARD;
      var d;
      super(), this.audioLevel = 0, this.isSpeaking = false, this._connectionQuality = ct.Unknown, this.log = U, this.log = Ee((d = a == null ? void 0 : a.loggerName) !== null && d !== void 0 ? d : fe.Participant), this.loggerOptions = a, this.setMaxListeners(100), this.sid = e, this.identity = t, this.name = n, this.metadata = s, this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.trackPublications = /* @__PURE__ */ new Map(), this._kind = o, this._attributes = r ?? {};
    }
    getTrackPublications() {
      return Array.from(this.trackPublications.values());
    }
    /**
     * Finds the first track that matches the source filter, for example, getting
     * the user's camera track with getTrackBySource(Track.Source.Camera).
     */
    getTrackPublication(e) {
      for (const [, t] of this.trackPublications)
        if (t.source === e)
          return t;
    }
    /**
     * Finds the first track that matches the track's name.
     */
    getTrackPublicationByName(e) {
      for (const [, t] of this.trackPublications)
        if (t.trackName === e)
          return t;
    }
    /**
     * Waits until the participant is active and ready to receive data messages
     * @returns a promise that resolves when the participant is active
     */
    waitUntilActive() {
      return this.isActive ? Promise.resolve() : this.activeFuture ? this.activeFuture.promise : (this.activeFuture = new Se(), this.once(I.Active, () => {
        var e, t;
        (t = (e = this.activeFuture) === null || e === void 0 ? void 0 : e.resolve) === null || t === void 0 || t.call(e), this.activeFuture = void 0;
      }), this.activeFuture.promise);
    }
    get connectionQuality() {
      return this._connectionQuality;
    }
    get isCameraEnabled() {
      var e;
      const t = this.getTrackPublication(C.Source.Camera);
      return !(!((e = t == null ? void 0 : t.isMuted) !== null && e !== void 0) || e);
    }
    get isMicrophoneEnabled() {
      var e;
      const t = this.getTrackPublication(C.Source.Microphone);
      return !(!((e = t == null ? void 0 : t.isMuted) !== null && e !== void 0) || e);
    }
    get isScreenShareEnabled() {
      return !!this.getTrackPublication(C.Source.ScreenShare);
    }
    get isLocal() {
      return false;
    }
    /** when participant joined the room */
    get joinedAt() {
      return this.participantInfo ? new Date(Number.parseInt(this.participantInfo.joinedAt.toString()) * 1e3) : /* @__PURE__ */ new Date();
    }
    /** @internal */
    updateInfo(e) {
      var t;
      return this.participantInfo && this.participantInfo.sid === e.sid && this.participantInfo.version > e.version ? false : (this.identity = e.identity, this.sid = e.sid, this._setName(e.name), this._setMetadata(e.metadata), this._setAttributes(e.attributes), e.state === Ft.ACTIVE && ((t = this.participantInfo) === null || t === void 0 ? void 0 : t.state) !== Ft.ACTIVE && this.emit(I.Active), e.permission && this.setPermissions(e.permission), this.participantInfo = e, true);
    }
    /**
     * Updates metadata from server
     **/
    _setMetadata(e) {
      const t = this.metadata !== e, n = this.metadata;
      this.metadata = e, t && this.emit(I.ParticipantMetadataChanged, n);
    }
    _setName(e) {
      const t = this.name !== e;
      this.name = e, t && this.emit(I.ParticipantNameChanged, e);
    }
    /**
     * Updates metadata from server
     **/
    _setAttributes(e) {
      const t = Tu(this.attributes, e);
      this._attributes = e, Object.keys(t).length > 0 && this.emit(I.AttributesChanged, t);
    }
    /** @internal */
    setPermissions(e) {
      var t, n, s, r, a, o;
      const d = this.permissions, c = e.canPublish !== ((t = this.permissions) === null || t === void 0 ? void 0 : t.canPublish) || e.canSubscribe !== ((n = this.permissions) === null || n === void 0 ? void 0 : n.canSubscribe) || e.canPublishData !== ((s = this.permissions) === null || s === void 0 ? void 0 : s.canPublishData) || e.hidden !== ((r = this.permissions) === null || r === void 0 ? void 0 : r.hidden) || e.recorder !== ((a = this.permissions) === null || a === void 0 ? void 0 : a.recorder) || e.canPublishSources.length !== this.permissions.canPublishSources.length || e.canPublishSources.some((l, u) => {
        var h;
        return l !== ((h = this.permissions) === null || h === void 0 ? void 0 : h.canPublishSources[u]);
      }) || e.canSubscribeMetrics !== ((o = this.permissions) === null || o === void 0 ? void 0 : o.canSubscribeMetrics);
      return this.permissions = e, c && this.emit(I.ParticipantPermissionsChanged, d), c;
    }
    /** @internal */
    setIsSpeaking(e) {
      e !== this.isSpeaking && (this.isSpeaking = e, e && (this.lastSpokeAt = /* @__PURE__ */ new Date()), this.emit(I.IsSpeakingChanged, e));
    }
    /** @internal */
    setConnectionQuality(e) {
      const t = this._connectionQuality;
      this._connectionQuality = kf(e), t !== this._connectionQuality && this.emit(I.ConnectionQualityChanged, this._connectionQuality);
    }
    /**
     * @internal
     */
    setDisconnected() {
      var e, t;
      this.activeFuture && ((t = (e = this.activeFuture).reject) === null || t === void 0 || t.call(e, new Error("Participant disconnected")), this.activeFuture = void 0);
    }
    /**
     * @internal
     */
    setAudioContext(e) {
      this.audioContext = e, this.audioTrackPublications.forEach((t) => ze(t.track) && t.track.setAudioContext(e));
    }
    addTrackPublication(e) {
      e.on(R.Muted, () => {
        this.emit(I.TrackMuted, e);
      }), e.on(R.Unmuted, () => {
        this.emit(I.TrackUnmuted, e);
      });
      const t = e;
      switch (t.track && (t.track.sid = e.trackSid), this.trackPublications.set(e.trackSid, e), e.kind) {
        case C.Kind.Audio:
          this.audioTrackPublications.set(e.trackSid, e);
          break;
        case C.Kind.Video:
          this.videoTrackPublications.set(e.trackSid, e);
          break;
      }
    }
  }
  function Tf(i) {
    var e, t, n;
    if (!i.participantSid && !i.participantIdentity)
      throw new Error("Invalid track permission, must provide at least one of participantIdentity and participantSid");
    return new bo({
      participantIdentity: (e = i.participantIdentity) !== null && e !== void 0 ? e : "",
      participantSid: (t = i.participantSid) !== null && t !== void 0 ? t : "",
      allTracks: (n = i.allowAll) !== null && n !== void 0 ? n : false,
      trackSids: i.allowedTrackSids || []
    });
  }
  class Sf extends Uc {
    /** @internal */
    constructor(e, t, n, s, r, a, o) {
      super(e, t, void 0, void 0, void 0, {
        loggerName: s.loggerName,
        loggerContextCb: () => this.engine.logContext
      }), this.pendingPublishing = /* @__PURE__ */ new Set(), this.pendingPublishPromises = /* @__PURE__ */ new Map(), this.participantTrackPermissions = [], this.allParticipantsAllowedToSubscribe = true, this.encryptionType = J.NONE, this.e2eeStateMutex = new ce(), this.enabledPublishVideoCodecs = [], this.pendingAcks = /* @__PURE__ */ new Map(), this.pendingResponses = /* @__PURE__ */ new Map(), this.handleReconnecting = () => {
        this.reconnectFuture || (this.reconnectFuture = new Se());
      }, this.handleReconnected = () => {
        var d, c;
        (c = (d = this.reconnectFuture) === null || d === void 0 ? void 0 : d.resolve) === null || c === void 0 || c.call(d), this.reconnectFuture = void 0, this.updateTrackSubscriptionPermissions();
      }, this.handleClosing = () => {
        var d, c, l, u, h, f;
        this.reconnectFuture && (this.reconnectFuture.promise.catch((v) => this.log.warn(v.message, this.logContext)), (c = (d = this.reconnectFuture) === null || d === void 0 ? void 0 : d.reject) === null || c === void 0 || c.call(d, new Error("Got disconnected during reconnection attempt")), this.reconnectFuture = void 0), this.signalConnectedFuture && ((u = (l = this.signalConnectedFuture).reject) === null || u === void 0 || u.call(l, new Error("Got disconnected without signal connected")), this.signalConnectedFuture = void 0), (f = (h = this.activeAgentFuture) === null || h === void 0 ? void 0 : h.reject) === null || f === void 0 || f.call(h, new Error("Got disconnected without active agent present")), this.activeAgentFuture = void 0, this.firstActiveAgent = void 0;
      }, this.handleSignalConnected = (d) => {
        var c, l;
        d.participant && this.updateInfo(d.participant), this.signalConnectedFuture || (this.signalConnectedFuture = new Se()), (l = (c = this.signalConnectedFuture).resolve) === null || l === void 0 || l.call(c);
      }, this.handleSignalRequestResponse = (d) => {
        const {
          requestId: c,
          reason: l,
          message: u
        } = d, h = this.pendingSignalRequests.get(c);
        switch (h && (l !== yt.OK && h.reject(new Br(u, l)), this.pendingSignalRequests.delete(c)), d.request.case) {
          case "publishDataTrack": {
            let f;
            switch (d.reason) {
              case yt.NOT_ALLOWED:
                f = re.notAllowed(d.message);
                break;
              case yt.DUPLICATE_NAME:
                f = re.duplicateName(d.message);
                break;
              case yt.INVALID_NAME:
                f = re.invalidName(d.message);
                break;
              case yt.LIMIT_EXCEEDED:
                f = re.limitReached(d.message);
                break;
              default:
                f = re.unknown(d.reason, d.message);
                return;
            }
            this.roomOutgoingDataTrackManager.receivedSfuPublishResponse(d.request.value.pubHandle, {
              type: "error",
              error: f
            });
            break;
          }
        }
      }, this.handleDataPacket = (d) => {
        switch (d.value.case) {
          case "rpcResponse":
            let c = d.value.value, l = null, u = null;
            c.value.case === "payload" ? l = c.value.value : c.value.case === "error" && (u = Z.fromProto(c.value.value)), this.handleIncomingRpcResponse(c.requestId, l, u);
            break;
          case "rpcAck":
            let h = d.value.value;
            this.handleIncomingRpcAck(h.requestId);
            break;
        }
      }, this.updateTrackSubscriptionPermissions = () => {
        this.log.debug("updating track subscription permissions", Object.assign(Object.assign({}, this.logContext), {
          allParticipantsAllowed: this.allParticipantsAllowedToSubscribe,
          participantTrackPermissions: this.participantTrackPermissions
        })), this.engine.client.sendUpdateSubscriptionPermissions(this.allParticipantsAllowedToSubscribe, this.participantTrackPermissions.map((d) => Tf(d)));
      }, this.onTrackUnmuted = (d) => {
        this.onTrackMuted(d, d.isUpstreamPaused);
      }, this.onTrackMuted = (d, c) => {
        if (c === void 0 && (c = true), !d.sid) {
          this.log.error("could not update mute status for unpublished track", Object.assign(Object.assign({}, this.logContext), j(d)));
          return;
        }
        this.engine.updateMuteStatus(d.sid, c);
      }, this.onTrackUpstreamPaused = (d) => {
        this.log.debug("upstream paused", Object.assign(Object.assign({}, this.logContext), j(d))), this.onTrackMuted(d, true);
      }, this.onTrackUpstreamResumed = (d) => {
        this.log.debug("upstream resumed", Object.assign(Object.assign({}, this.logContext), j(d))), this.onTrackMuted(d, d.isMuted);
      }, this.onTrackFeatureUpdate = (d) => {
        const c = this.audioTrackPublications.get(d.sid);
        if (!c) {
          this.log.warn("Could not update local audio track settings, missing publication for track ".concat(d.sid), this.logContext);
          return;
        }
        this.engine.client.sendUpdateLocalAudioTrack(c.trackSid, c.getTrackFeatures());
      }, this.onTrackCpuConstrained = (d, c) => {
        this.log.debug("track cpu constrained", Object.assign(Object.assign({}, this.logContext), j(c))), this.emit(I.LocalTrackCpuConstrained, d, c);
      }, this.handleSubscribedQualityUpdate = (d) => m(this, void 0, void 0, function* () {
        var c, l, u, h, f;
        if (!(!((f = this.roomOptions) === null || f === void 0) && f.dynacast))
          return;
        const v = this.videoTrackPublications.get(d.trackSid);
        if (!v) {
          this.log.warn("received subscribed quality update for unknown track", Object.assign(Object.assign({}, this.logContext), {
            trackSid: d.trackSid
          }));
          return;
        }
        if (!v.videoTrack)
          return;
        const g = yield v.videoTrack.setPublishingCodecs(d.subscribedCodecs);
        try {
          for (var T = !0, k = Ue(g), w; w = yield k.next(), c = w.done, !c; T = !0) {
            h = w.value, T = !1;
            const O = h;
            vu(O) && (this.log.debug("publish ".concat(O, " for ").concat(v.videoTrack.sid), Object.assign(Object.assign({}, this.logContext), j(v))), yield this.publishAdditionalCodecForTrack(v.videoTrack, O, v.options));
          }
        } catch (O) {
          l = {
            error: O
          };
        } finally {
          try {
            !T && !c && (u = k.return) && (yield u.call(k));
          } finally {
            if (l) throw l.error;
          }
        }
      }), this.handleLocalTrackUnpublished = (d) => {
        const c = this.trackPublications.get(d.trackSid);
        if (!c) {
          this.log.warn("received unpublished event for unknown track", Object.assign(Object.assign({}, this.logContext), {
            trackSid: d.trackSid
          }));
          return;
        }
        this.unpublishTrack(c.track);
      }, this.handleTrackEnded = (d) => m(this, void 0, void 0, function* () {
        if (d.source === C.Source.ScreenShare || d.source === C.Source.ScreenShareAudio)
          this.log.debug("unpublishing local track due to TrackEnded", Object.assign(Object.assign({}, this.logContext), j(d))), this.unpublishTrack(d);
        else if (d.isUserProvided)
          yield d.mute();
        else if (et(d) || at(d))
          try {
            if (Te())
              try {
                const c = yield navigator == null ? void 0 : navigator.permissions.query({
                  // the permission query for camera and microphone currently not supported in Safari and Firefox
                  // @ts-ignore
                  name: d.source === C.Source.Camera ? "camera" : "microphone"
                });
                if (c && c.state === "denied")
                  throw this.log.warn("user has revoked access to ".concat(d.source), Object.assign(Object.assign({}, this.logContext), j(d))), c.onchange = () => {
                    c.state !== "denied" && (d.isMuted || d.restartTrack(), c.onchange = null);
                  }, new Error("GetUserMedia Permission denied");
              } catch {
              }
            d.isMuted || (this.log.debug("track ended, attempting to use a different device", Object.assign(Object.assign({}, this.logContext), j(d))), et(d) ? yield d.restartTrack({
              deviceId: "default"
            }) : yield d.restartTrack());
          } catch {
            this.log.warn("could not restart track, muting instead", Object.assign(Object.assign({}, this.logContext), j(d))), yield d.mute();
          }
      }), this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.trackPublications = /* @__PURE__ */ new Map(), this.engine = n, this.roomOptions = s, this.setupEngine(n), this.activeDeviceMap = /* @__PURE__ */ new Map([["audioinput", "default"], ["videoinput", "default"], ["audiooutput", "default"]]), this.pendingSignalRequests = /* @__PURE__ */ new Map(), this.rpcHandlers = r, this.roomOutgoingDataStreamManager = a, this.roomOutgoingDataTrackManager = o;
    }
    get lastCameraError() {
      return this.cameraError;
    }
    get lastMicrophoneError() {
      return this.microphoneError;
    }
    get isE2EEEnabled() {
      return this.encryptionType !== J.NONE;
    }
    getTrackPublication(e) {
      const t = super.getTrackPublication(e);
      if (t)
        return t;
    }
    getTrackPublicationByName(e) {
      const t = super.getTrackPublicationByName(e);
      if (t)
        return t;
    }
    /**
     * @internal
     */
    setupEngine(e) {
      var t;
      this.engine = e, this.engine.on(_.RemoteMute, (n, s) => {
        const r = this.trackPublications.get(n);
        !r || !r.track || (s ? r.mute() : r.unmute());
      }), !((t = this.signalConnectedFuture) === null || t === void 0) && t.isResolved && (this.signalConnectedFuture = void 0), this.engine.on(_.Connected, this.handleReconnected).on(_.SignalConnected, this.handleSignalConnected).on(_.SignalRestarted, this.handleReconnected).on(_.SignalResumed, this.handleReconnected).on(_.Restarting, this.handleReconnecting).on(_.Resuming, this.handleReconnecting).on(_.LocalTrackUnpublished, this.handleLocalTrackUnpublished).on(_.SubscribedQualityUpdate, this.handleSubscribedQualityUpdate).on(_.Closing, this.handleClosing).on(_.SignalRequestResponse, this.handleSignalRequestResponse).on(_.DataPacketReceived, this.handleDataPacket);
    }
    /**
     * Sets and updates the metadata of the local participant.
     * Note: this requires `canUpdateOwnMetadata` permission.
     * method will throw if the user doesn't have the required permissions
     * @param metadata
     */
    setMetadata(e) {
      return m(this, void 0, void 0, function* () {
        yield this.requestMetadataUpdate({
          metadata: e
        });
      });
    }
    /**
     * Sets and updates the name of the local participant.
     * Note: this requires `canUpdateOwnMetadata` permission.
     * method will throw if the user doesn't have the required permissions
     * @param metadata
     */
    setName(e) {
      return m(this, void 0, void 0, function* () {
        yield this.requestMetadataUpdate({
          name: e
        });
      });
    }
    /**
     * Set or update participant attributes. It will make updates only to keys that
     * are present in `attributes`, and will not override others.
     * Note: this requires `canUpdateOwnMetadata` permission.
     * @param attributes attributes to update
     */
    setAttributes(e) {
      return m(this, void 0, void 0, function* () {
        yield this.requestMetadataUpdate({
          attributes: e
        });
      });
    }
    requestMetadataUpdate(e) {
      return m(this, arguments, void 0, function(t) {
        var n = this;
        let {
          metadata: s,
          name: r,
          attributes: a
        } = t;
        return (function* () {
          return new ue((o, d) => m(n, void 0, void 0, function* () {
            var c, l;
            try {
              let u = !1;
              const h = yield this.engine.client.sendUpdateLocalMetadata((c = s ?? this.metadata) !== null && c !== void 0 ? c : "", (l = r ?? this.name) !== null && l !== void 0 ? l : "", a), f = performance.now();
              for (this.pendingSignalRequests.set(h, {
                resolve: o,
                reject: (v) => {
                  d(v), u = !0;
                },
                values: {
                  name: r,
                  metadata: s,
                  attributes: a
                }
              }); performance.now() - f < 5e3 && !u; ) {
                if ((!r || this.name === r) && (!s || this.metadata === s) && (!a || Object.entries(a).every((v) => {
                  let [g, T] = v;
                  return this.attributes[g] === T || T === "" && !this.attributes[g];
                }))) {
                  this.pendingSignalRequests.delete(h), o();
                  return;
                }
                yield he(50);
              }
              d(new Br("Request to update local metadata timed out", "TimeoutError"));
            } catch (u) {
              u instanceof Error ? d(u) : d(new Error(String(u)));
            }
          }));
        })();
      });
    }
    /**
     * Enable or disable a participant's camera track.
     *
     * If a track has already published, it'll mute or unmute the track.
     * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
     */
    setCameraEnabled(e, t, n) {
      return this.setTrackEnabled(C.Source.Camera, e, t, n);
    }
    /**
     * Enable or disable a participant's microphone track.
     *
     * If a track has already published, it'll mute or unmute the track.
     * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
     */
    setMicrophoneEnabled(e, t, n) {
      return this.setTrackEnabled(C.Source.Microphone, e, t, n);
    }
    /**
     * Start or stop sharing a participant's screen
     * Resolves with a `LocalTrackPublication` instance if successful and `undefined` otherwise
     */
    setScreenShareEnabled(e, t, n) {
      return this.setTrackEnabled(C.Source.ScreenShare, e, t, n);
    }
    /** @internal */
    setE2EEEnabled(e) {
      return m(this, void 0, void 0, function* () {
        const t = yield this.e2eeStateMutex.lock();
        try {
          if (this.encryptionType = e ? J.GCM : J.NONE, yield Promise.all(this.pendingPublishPromises.values()), this.trackPublications.size === 0 || Array.from(this.trackPublications.values()).every((n) => n.isEncrypted === e))
            return;
          yield this.republishAllTracks(void 0, !1);
        } finally {
          t();
        }
      });
    }
    setTrackEnabled(e, t, n, s) {
      return m(this, void 0, void 0, function* () {
        var r, a;
        this.log.debug("setTrackEnabled", Object.assign(Object.assign({}, this.logContext), {
          source: e,
          enabled: t
        })), this.republishPromise && (yield this.republishPromise);
        let o = this.getTrackPublication(e);
        if (t)
          if (o)
            yield o.unmute();
          else {
            let d;
            if (this.pendingPublishing.has(e)) {
              const c = yield this.waitForPendingPublicationOfSource(e);
              return c || this.log.info("waiting for pending publication promise timed out", Object.assign(Object.assign({}, this.logContext), {
                source: e
              })), yield c == null ? void 0 : c.unmute(), c;
            }
            this.pendingPublishing.add(e);
            try {
              switch (e) {
                case C.Source.Camera:
                  d = yield this.createTracks({
                    video: (r = n) !== null && r !== void 0 ? r : !0
                  });
                  break;
                case C.Source.Microphone:
                  d = yield this.createTracks({
                    audio: (a = n) !== null && a !== void 0 ? a : !0
                  });
                  break;
                case C.Source.ScreenShare:
                  d = yield this.createScreenTracks(Object.assign({}, n));
                  break;
                default:
                  throw new Je(e);
              }
            } catch (c) {
              throw d == null || d.forEach((l) => {
                l.stop();
              }), c instanceof Error && this.emit(I.MediaDevicesError, c, gs(e)), this.pendingPublishing.delete(e), c;
            }
            for (const c of d) {
              const l = Object.assign(Object.assign({}, this.roomOptions.publishDefaults), n);
              e === C.Source.Microphone && ze(c) && l.preConnectBuffer && (this.log.info("starting preconnect buffer for microphone", Object.assign({}, this.logContext)), c.startPreConnectBuffer());
            }
            try {
              const c = [];
              for (const u of d)
                this.log.info("publishing track", Object.assign(Object.assign({}, this.logContext), j(u))), c.push(this.publishTrack(u, s));
              [o] = yield Promise.all(c);
            } catch (c) {
              throw d == null || d.forEach((l) => {
                l.stop();
              }), c;
            } finally {
              this.pendingPublishing.delete(e);
            }
          }
        else if (!(o != null && o.track) && this.pendingPublishing.has(e) && (o = yield this.waitForPendingPublicationOfSource(e), o || this.log.info("waiting for pending publication promise timed out", Object.assign(Object.assign({}, this.logContext), {
          source: e
        }))), o && o.track)
          if (e === C.Source.ScreenShare) {
            o = yield this.unpublishTrack(o.track);
            const d = this.getTrackPublication(C.Source.ScreenShareAudio);
            d && d.track && this.unpublishTrack(d.track);
          } else
            yield o.mute();
        return o;
      });
    }
    /**
     * Publish both camera and microphone at the same time. This is useful for
     * displaying a single Permission Dialog box to the end user.
     */
    enableCameraAndMicrophone() {
      return m(this, void 0, void 0, function* () {
        if (!(this.pendingPublishing.has(C.Source.Camera) || this.pendingPublishing.has(C.Source.Microphone))) {
          this.pendingPublishing.add(C.Source.Camera), this.pendingPublishing.add(C.Source.Microphone);
          try {
            const e = yield this.createTracks({
              audio: !0,
              video: !0
            });
            yield Promise.all(e.map((t) => this.publishTrack(t)));
          } finally {
            this.pendingPublishing.delete(C.Source.Camera), this.pendingPublishing.delete(C.Source.Microphone);
          }
        }
      });
    }
    /**
     * Create local camera and/or microphone tracks
     * @param options
     * @returns
     */
    createTracks(e) {
      return m(this, void 0, void 0, function* () {
        var t, n;
        e ?? (e = {});
        const s = cc(e, (t = this.roomOptions) === null || t === void 0 ? void 0 : t.audioCaptureDefaults, (n = this.roomOptions) === null || n === void 0 ? void 0 : n.videoCaptureDefaults);
        try {
          return (yield Ci(s, {
            loggerName: this.roomOptions.loggerName,
            loggerContextCb: () => this.logContext
          })).map((o) => (ze(o) && (this.microphoneError = void 0, o.setAudioContext(this.audioContext), o.source = C.Source.Microphone, this.emit(I.AudioStreamAcquired)), pt(o) && (this.cameraError = void 0, o.source = C.Source.Camera), o));
        } catch (r) {
          throw r instanceof Error && (e.audio && (this.microphoneError = r), e.video && (this.cameraError = r)), r;
        }
      });
    }
    /**
     * Creates a screen capture tracks with getDisplayMedia().
     * A LocalVideoTrack is always created and returned.
     * If { audio: true }, and the browser supports audio capture, a LocalAudioTrack is also created.
     */
    createScreenTracks(e) {
      return m(this, void 0, void 0, function* () {
        if (e === void 0 && (e = {}), navigator.mediaDevices.getDisplayMedia === void 0)
          throw new mi("getDisplayMedia not supported");
        e.resolution === void 0 && !hc() && (e.resolution = pi.h1080fps30.resolution);
        const t = lc(e), n = yield navigator.mediaDevices.getDisplayMedia(t), s = n.getVideoTracks();
        if (s.length === 0)
          throw new Je("no video track found");
        const r = new kn(s[0], void 0, false, {
          loggerName: this.roomOptions.loggerName,
          loggerContextCb: () => this.logContext
        });
        r.source = C.Source.ScreenShare, e.contentHint && (r.mediaStreamTrack.contentHint = e.contentHint);
        const a = [r];
        if (n.getAudioTracks().length > 0) {
          this.emit(I.AudioStreamAcquired);
          const o = new yn(n.getAudioTracks()[0], void 0, false, this.audioContext, {
            loggerName: this.roomOptions.loggerName,
            loggerContextCb: () => this.logContext
          });
          o.source = C.Source.ScreenShareAudio, a.push(o);
        }
        return a;
      });
    }
    /**
     * Publish a new track to the room
     * @param track
     * @param options
     */
    publishTrack(e, t) {
      return m(this, void 0, void 0, function* () {
        return this.publishOrRepublishTrack(e, t);
      });
    }
    publishOrRepublishTrack(e, t) {
      return m(this, arguments, void 0, function(n, s) {
        var r = this;
        let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        return (function* () {
          var o, d, c, l;
          et(n) && n.setAudioContext(r.audioContext), yield (o = r.reconnectFuture) === null || o === void 0 ? void 0 : o.promise, r.republishPromise && !a && (yield r.republishPromise), _t(n) && r.pendingPublishPromises.has(n) && (yield r.pendingPublishPromises.get(n));
          let u;
          if (n instanceof MediaStreamTrack)
            u = n.getConstraints();
          else {
            u = n.constraints;
            let k;
            switch (n.source) {
              case C.Source.Microphone:
                k = "audioinput";
                break;
              case C.Source.Camera:
                k = "videoinput";
            }
            k && r.activeDeviceMap.has(k) && (u = Object.assign(Object.assign({}, u), {
              deviceId: r.activeDeviceMap.get(k)
            }));
          }
          if (n instanceof MediaStreamTrack)
            switch (n.kind) {
              case "audio":
                n = new yn(n, u, true, r.audioContext, {
                  loggerName: r.roomOptions.loggerName,
                  loggerContextCb: () => r.logContext
                });
                break;
              case "video":
                n = new kn(n, u, true, {
                  loggerName: r.roomOptions.loggerName,
                  loggerContextCb: () => r.logContext
                });
                break;
              default:
                throw new Je("unsupported MediaStreamTrack kind ".concat(n.kind));
            }
          else
            n.updateLoggerOptions({
              loggerName: r.roomOptions.loggerName,
              loggerContextCb: () => r.logContext
            });
          let h;
          if (r.trackPublications.forEach((k) => {
            k.track && k.track === n && (h = k);
          }), h)
            return r.log.warn("track has already been published, skipping", Object.assign(Object.assign({}, r.logContext), j(h))), h;
          const f = Object.assign(Object.assign({}, r.roomOptions.publishDefaults), s), v = "channelCount" in n.mediaStreamTrack.getSettings() && // @ts-ignore `channelCount` on getSettings() is currently only available for Safari, but is generally the best way to determine a stereo track https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings/channelCount
          n.mediaStreamTrack.getSettings().channelCount === 2 || n.mediaStreamTrack.getConstraints().channelCount === 2, g = (d = f.forceStereo) !== null && d !== void 0 ? d : v;
          g && (f.dtx === void 0 && r.log.info("Opus DTX will be disabled for stereo tracks by default. Enable them explicitly to make it work.", Object.assign(Object.assign({}, r.logContext), j(n))), f.red === void 0 && r.log.info("Opus RED will be disabled for stereo tracks by default. Enable them explicitly to make it work."), (c = f.dtx) !== null && c !== void 0 || (f.dtx = false), (l = f.red) !== null && l !== void 0 || (f.red = false)), !Mu() && r.roomOptions.e2ee && (r.log.info("End-to-end encryption is set up, simulcast publishing will be disabled on Safari versions and iOS browsers running iOS < v17.2", Object.assign({}, r.logContext)), f.simulcast = false), f.source && (n.source = f.source);
          const T = new Promise((k, w) => m(r, void 0, void 0, function* () {
            try {
              if (this.engine.client.currentState !== K.CONNECTED) {
                this.log.debug("deferring track publication until signal is connected", Object.assign(Object.assign({}, this.logContext), {
                  track: j(n)
                }));
                let O = !1;
                const b = setTimeout(() => {
                  O = !0, n.stop(), w(new Fr("publishing rejected as engine not connected within timeout", 408));
                }, 15e3);
                if (yield this.waitUntilEngineConnected(), clearTimeout(b), O)
                  return;
                const y = yield this.publish(n, f, g);
                k(y);
              } else
                try {
                  const O = yield this.publish(n, f, g);
                  k(O);
                } catch (O) {
                  w(O);
                }
            } catch (O) {
              w(O);
            }
          }));
          r.pendingPublishPromises.set(n, T);
          try {
            return yield T;
          } catch (k) {
            throw k;
          } finally {
            r.pendingPublishPromises.delete(n);
          }
        })();
      });
    }
    waitUntilEngineConnected() {
      return this.signalConnectedFuture || (this.signalConnectedFuture = new Se()), this.signalConnectedFuture.promise;
    }
    hasPermissionsToPublish(e) {
      if (!this.permissions)
        return this.log.warn("no permissions present for publishing track", Object.assign(Object.assign({}, this.logContext), j(e))), false;
      const {
        canPublish: t,
        canPublishSources: n
      } = this.permissions;
      return t && (n.length === 0 || n.map((s) => Su(s)).includes(e.source)) ? true : (this.log.warn("insufficient permissions to publish", Object.assign(Object.assign({}, this.logContext), j(e))), false);
    }
    publish(e, t, n) {
      return m(this, void 0, void 0, function* () {
        var s, r, a, o, d, c, l, u, h, f;
        if (!this.hasPermissionsToPublish(e))
          throw new Fr("failed to publish track, insufficient permissions", 403);
        Array.from(this.trackPublications.values()).find((x) => _t(e) && x.source === e.source) && e.source !== C.Source.Unknown && this.log.info("publishing a second track with the same source: ".concat(e.source), Object.assign(Object.assign({}, this.logContext), j(e))), t.stopMicTrackOnMute && ze(e) && (e.stopOnMute = true), e.source === C.Source.ScreenShare && Mt() && (t.simulcast = false), t.videoCodec === "av1" && !_u() && (t.videoCodec = void 0), t.videoCodec === "vp9" && !Ru() && (t.videoCodec = void 0), t.videoCodec === void 0 && (t.videoCodec = Cs), this.enabledPublishVideoCodecs.length > 0 && (this.enabledPublishVideoCodecs.some((x) => t.videoCodec === on(x.mime)) || (t.videoCodec = on(this.enabledPublishVideoCodecs[0].mime)));
        const g = t.videoCodec;
        e.on(R.Muted, this.onTrackMuted), e.on(R.Unmuted, this.onTrackUnmuted), e.on(R.Ended, this.handleTrackEnded), e.on(R.UpstreamPaused, this.onTrackUpstreamPaused), e.on(R.UpstreamResumed, this.onTrackUpstreamResumed), e.on(R.AudioTrackFeatureUpdate, this.onTrackFeatureUpdate);
        const T = [], k = !(!((s = t.dtx) !== null && s !== void 0) || s), w = e.getSourceTrackSettings();
        w.autoGainControl && T.push(ae.TF_AUTO_GAIN_CONTROL), w.echoCancellation && T.push(ae.TF_ECHO_CANCELLATION), w.noiseSuppression && T.push(ae.TF_NOISE_SUPPRESSION), w.channelCount && w.channelCount > 1 && T.push(ae.TF_STEREO), k && T.push(ae.TF_NO_DTX), et(e) && e.hasPreConnectBuffer && T.push(ae.TF_PRECONNECT_BUFFER);
        const O = new mn({
          // get local track id for use during publishing
          cid: e.mediaStreamTrack.id,
          name: t.name,
          type: C.kindToProto(e.kind),
          muted: e.isMuted,
          source: C.sourceToProto(e.source),
          disableDtx: k,
          encryption: this.encryptionType,
          stereo: n,
          disableRed: this.isE2EEEnabled || !(!((r = t.red) !== null && r !== void 0) || r),
          stream: t == null ? void 0 : t.stream,
          backupCodecPolicy: t == null ? void 0 : t.backupCodecPolicy,
          audioFeatures: T
        });
        let b;
        if (e.kind === C.Kind.Video) {
          let x = {
            width: 0,
            height: 0
          };
          try {
            x = yield e.waitForDimensions();
          } catch {
            const A = (o = (a = this.roomOptions.videoCaptureDefaults) === null || a === void 0 ? void 0 : a.resolution) !== null && o !== void 0 ? o : gn.h720.resolution;
            x = {
              width: A.width,
              height: A.height
            }, this.log.error("could not determine track dimensions, using defaults", Object.assign(Object.assign(Object.assign({}, this.logContext), j(e)), {
              dims: x
            }));
          }
          O.width = x.width, O.height = x.height, at(e) && (Fe(g) && (e.source === C.Source.ScreenShare && (t.scalabilityMode = "L1T3", "contentHint" in e.mediaStreamTrack && (e.mediaStreamTrack.contentHint = "motion", this.log.info("forcing contentHint to motion for screenshare with SVC codecs", Object.assign(Object.assign({}, this.logContext), j(e))))), t.scalabilityMode = (d = t.scalabilityMode) !== null && d !== void 0 ? d : "L3T3_KEY"), O.simulcastCodecs = [new ns({
            codec: g,
            cid: e.mediaStreamTrack.id
          })], t.backupCodec === true && (t.backupCodec = {
            codec: Cs
          }), t.backupCodec && g !== t.backupCodec.codec && // TODO remove this once e2ee is supported for backup codecs
          O.encryption === J.NONE && (this.roomOptions.dynacast || (this.roomOptions.dynacast = true), O.simulcastCodecs.push(new ns({
            codec: t.backupCodec.codec,
            cid: ""
          })))), b = ws(e.source === C.Source.ScreenShare, O.width, O.height, t), O.layers = ua(O.width, O.height, b, Fe(t.videoCodec));
        } else e.kind === C.Kind.Audio && (b = [{
          maxBitrate: (c = t.audioPreset) === null || c === void 0 ? void 0 : c.maxBitrate,
          priority: (u = (l = t.audioPreset) === null || l === void 0 ? void 0 : l.priority) !== null && u !== void 0 ? u : "high",
          networkPriority: (f = (h = t.audioPreset) === null || h === void 0 ? void 0 : h.priority) !== null && f !== void 0 ? f : "high"
        }]);
        if (!this.engine || this.engine.isClosed)
          throw new Q("cannot publish track when not connected");
        const y = () => m(this, void 0, void 0, function* () {
          var x, N, A;
          if (!this.engine.pcManager)
            throw new Q("pcManager is not ready");
          if (e.sender = yield this.engine.createSender(e, t, b), this.emit(I.LocalSenderCreated, e.sender, e), at(e) && ((x = t.degradationPreference) !== null && x !== void 0 || (t.degradationPreference = Vh(e)), e.setDegradationPreference(t.degradationPreference)), b)
            if (Mt() && e.kind === C.Kind.Audio) {
              let F;
              for (const te of this.engine.pcManager.publisher.getTransceivers())
                if (te.sender === e.sender) {
                  F = te;
                  break;
                }
              F && this.engine.pcManager.publisher.setTrackCodecBitrate({
                transceiver: F,
                codec: "opus",
                maxbr: !((N = b[0]) === null || N === void 0) && N.maxBitrate ? b[0].maxBitrate / 1e3 : 0
              });
            } else e.codec && Fe(e.codec) && (!((A = b[0]) === null || A === void 0) && A.maxBitrate) && this.engine.pcManager.publisher.setTrackCodecBitrate({
              cid: O.cid,
              codec: e.codec,
              maxbr: b[0].maxBitrate / 1e3
            });
          yield this.engine.negotiate();
        });
        let S;
        const M = new Promise((x, N) => m(this, void 0, void 0, function* () {
          var A;
          try {
            S = yield this.engine.addTrack(O), x(S);
          } catch (F) {
            e.sender && (!((A = this.engine.pcManager) === null || A === void 0) && A.publisher) && (this.engine.pcManager.publisher.removeTrack(e.sender), yield this.engine.negotiate().catch((te) => {
              this.log.error("failed to negotiate after removing track due to failed add track request", Object.assign(Object.assign(Object.assign({}, this.logContext), j(e)), {
                error: te
              }));
            })), N(F);
          }
        }));
        if (this.enabledPublishVideoCodecs.length > 0)
          S = (yield Promise.all([M, y()]))[0];
        else {
          S = yield M;
          let x;
          if (S.codecs.forEach((N) => {
            x === void 0 && (x = N.mimeType);
          }), x && e.kind === C.Kind.Video) {
            const N = on(x);
            N !== g && (this.log.debug("falling back to server selected codec", Object.assign(Object.assign(Object.assign({}, this.logContext), j(e)), {
              codec: N
            })), t.videoCodec = N, b = ws(e.source === C.Source.ScreenShare, O.width, O.height, t));
          }
          yield y();
        }
        const D = new _s(e.kind, S, e, {
          loggerName: this.roomOptions.loggerName,
          loggerContextCb: () => this.logContext
        });
        if (D.on(R.CpuConstrained, (x) => this.onTrackCpuConstrained(x, D)), D.options = t, e.sid = S.sid, this.log.debug("publishing ".concat(e.kind, " with encodings"), Object.assign(Object.assign({}, this.logContext), {
          encodings: b,
          trackInfo: S
        })), at(e) ? e.startMonitor(this.engine.client) : et(e) && e.startMonitor(), this.addTrackPublication(D), this.emit(I.LocalTrackPublished, D), et(e) && S.audioFeatures.includes(ae.TF_PRECONNECT_BUFFER)) {
          const x = e.getPreConnectBuffer(), N = e.getPreConnectBufferMimeType();
          this.on(I.LocalTrackSubscribed, (A) => {
            if (A.trackSid === S.sid) {
              if (!e.hasPreConnectBuffer) {
                this.log.warn("subscribe event came to late, buffer already closed", this.logContext);
                return;
              }
              this.log.debug("finished recording preconnect buffer", Object.assign(Object.assign({}, this.logContext), j(e))), e.stopPreConnectBuffer();
            }
          }), x && new Promise((F, te) => m(this, void 0, void 0, function* () {
            var de, He, Pn, me, Xe, Ei;
            try {
              this.log.debug("waiting for agent", Object.assign(Object.assign({}, this.logContext), j(e)));
              const Ri = setTimeout(() => {
                te(new Error("agent not active within 10 seconds"));
              }, 1e4), Wc = yield this.waitUntilActiveAgentPresent();
              clearTimeout(Ri), this.log.debug("sending preconnect buffer", Object.assign(Object.assign({}, this.logContext), j(e)));
              const lr = yield this.streamBytes({
                name: "preconnect-buffer",
                mimeType: N,
                topic: "lk.agent.pre-connect-audio-buffer",
                destinationIdentities: [Wc.identity],
                attributes: {
                  trackId: D.trackSid,
                  sampleRate: String((Xe = w.sampleRate) !== null && Xe !== void 0 ? Xe : "48000"),
                  channels: String((Ei = w.channelCount) !== null && Ei !== void 0 ? Ei : "1")
                }
              });
              try {
                for (var wi = !0, Pi = Ue(x), _i; _i = yield Pi.next(), de = _i.done, !de; wi = !0) {
                  me = _i.value, wi = !1;
                  const Ii = me;
                  yield lr.write(Ii);
                }
              } catch (Ii) {
                He = {
                  error: Ii
                };
              } finally {
                try {
                  !wi && !de && (Pn = Pi.return) && (yield Pn.call(Pi));
                } finally {
                  if (He) throw He.error;
                }
              }
              yield lr.close(), F();
            } catch (Ri) {
              te(Ri);
            }
          })).then(() => {
            this.log.debug("preconnect buffer sent successfully", Object.assign(Object.assign({}, this.logContext), j(e)));
          }).catch((F) => {
            this.log.error("error sending preconnect buffer", Object.assign(Object.assign(Object.assign({}, this.logContext), j(e)), {
              error: F
            }));
          });
        }
        return D;
      });
    }
    get isLocal() {
      return true;
    }
    /** @internal
     * publish additional codec to existing track
     */
    publishAdditionalCodecForTrack(e, t, n) {
      return m(this, void 0, void 0, function* () {
        var s;
        if (this.encryptionType !== J.NONE)
          return;
        let r;
        if (this.trackPublications.forEach((f) => {
          f.track && f.track === e && (r = f);
        }), !r)
          throw new Je("track is not published");
        if (!at(e))
          throw new Je("track is not a video track");
        const a = Object.assign(Object.assign({}, (s = this.roomOptions) === null || s === void 0 ? void 0 : s.publishDefaults), n), o = Bh(e, t, a);
        if (!o) {
          this.log.info("backup codec has been disabled, ignoring request to add additional codec for track", Object.assign(Object.assign({}, this.logContext), j(e)));
          return;
        }
        const d = e.addSimulcastTrack(t, o);
        if (!d)
          return;
        const c = new mn({
          cid: d.mediaStreamTrack.id,
          type: C.kindToProto(e.kind),
          muted: e.isMuted,
          source: C.sourceToProto(e.source),
          sid: e.sid,
          simulcastCodecs: [{
            codec: a.videoCodec,
            cid: d.mediaStreamTrack.id
          }]
        });
        if (c.layers = ua(c.width, c.height, o), !this.engine || this.engine.isClosed)
          throw new Q("cannot publish track when not connected");
        const l = () => m(this, void 0, void 0, function* () {
          yield this.engine.createSimulcastSender(e, d, a, o), yield this.engine.negotiate();
        }), h = (yield Promise.all([this.engine.addTrack(c), l()]))[0];
        this.log.debug("published ".concat(t, " for track ").concat(e.sid), Object.assign(Object.assign({}, this.logContext), {
          encodings: o,
          trackInfo: h
        }));
      });
    }
    unpublishTrack(e, t) {
      return m(this, void 0, void 0, function* () {
        var n, s;
        if (_t(e)) {
          const c = this.pendingPublishPromises.get(e);
          c && (this.log.info("awaiting publish promise before attempting to unpublish", Object.assign(Object.assign({}, this.logContext), j(e))), yield c);
        }
        const r = this.getPublicationForTrack(e), a = r ? j(r) : void 0;
        if (this.log.debug("unpublishing track", Object.assign(Object.assign({}, this.logContext), a)), !r || !r.track) {
          this.log.warn("track was not unpublished because no publication was found", Object.assign(Object.assign({}, this.logContext), a));
          return;
        }
        e = r.track, e.off(R.Muted, this.onTrackMuted), e.off(R.Unmuted, this.onTrackUnmuted), e.off(R.Ended, this.handleTrackEnded), e.off(R.UpstreamPaused, this.onTrackUpstreamPaused), e.off(R.UpstreamResumed, this.onTrackUpstreamResumed), e.off(R.AudioTrackFeatureUpdate, this.onTrackFeatureUpdate), t === void 0 && (t = (s = (n = this.roomOptions) === null || n === void 0 ? void 0 : n.stopLocalTrackOnUnpublish) !== null && s !== void 0 ? s : true), t ? e.stop() : e.stopMonitor();
        let o = false;
        const d = e.sender;
        if (e.sender = void 0, this.engine.pcManager && this.engine.pcManager.currentState < X.FAILED && d)
          try {
            for (const c of this.engine.pcManager.publisher.getTransceivers())
              c.sender === d && (c.direction = "inactive", o = !0);
            if (this.engine.removeTrack(d) && (o = !0), at(e)) {
              for (const [, c] of e.simulcastCodecs)
                c.sender && (this.engine.removeTrack(c.sender) && (o = !0), c.sender = void 0);
              e.simulcastCodecs.clear();
            }
          } catch (c) {
            this.log.warn("failed to unpublish track", Object.assign(Object.assign(Object.assign({}, this.logContext), a), {
              error: c
            }));
          }
        switch (this.trackPublications.delete(r.trackSid), r.kind) {
          case C.Kind.Audio:
            this.audioTrackPublications.delete(r.trackSid);
            break;
          case C.Kind.Video:
            this.videoTrackPublications.delete(r.trackSid);
            break;
        }
        return this.emit(I.LocalTrackUnpublished, r), r.setTrack(void 0), o && (yield this.engine.negotiate()), r;
      });
    }
    unpublishTracks(e) {
      return m(this, void 0, void 0, function* () {
        return (yield Promise.all(e.map((n) => this.unpublishTrack(n)))).filter((n) => !!n);
      });
    }
    republishAllTracks(e) {
      return m(this, arguments, void 0, function(t) {
        var n = this;
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return (function* () {
          n.republishPromise && (yield n.republishPromise), n.republishPromise = new ue((r, a) => m(n, void 0, void 0, function* () {
            try {
              const o = [];
              this.trackPublications.forEach((d) => {
                d.track && (t && (d.options = Object.assign(Object.assign({}, d.options), t)), o.push(d));
              }), yield Promise.all(o.map((d) => m(this, void 0, void 0, function* () {
                const c = d.track;
                yield this.unpublishTrack(c, !1), s && !c.isMuted && c.source !== C.Source.ScreenShare && c.source !== C.Source.ScreenShareAudio && (et(c) || at(c)) && !c.isUserProvided && (this.log.debug("restarting existing track", Object.assign(Object.assign({}, this.logContext), {
                  track: d.trackSid
                })), yield c.restartTrack()), yield this.publishOrRepublishTrack(c, d.options, !0);
              }))), r();
            } catch (o) {
              o instanceof Error ? a(o) : a(new Error(String(o)));
            } finally {
              this.republishPromise = void 0;
            }
          })), yield n.republishPromise;
        })();
      });
    }
    /**
     * Publish a new data payload to the room. Data will be forwarded to each
     * participant in the room if the destination field in publishOptions is empty
     *
     * @param data Uint8Array of the payload. To send string data, use TextEncoder.encode
     * @param options optionally specify a `reliable`, `topic` and `destination`
     */
    publishData(e) {
      return m(this, arguments, void 0, function(t) {
        var n = this;
        let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return (function* () {
          const r = s.reliable ? B.RELIABLE : B.LOSSY, a = s.reliable ? Et.RELIABLE : Et.LOSSY, o = s.destinationIdentities, d = s.topic;
          let c = new As({
            participantIdentity: n.identity,
            payload: t,
            destinationIdentities: o,
            topic: d
          });
          const l = new ge({
            kind: a,
            value: {
              case: "user",
              value: c
            }
          });
          yield n.engine.sendDataPacket(l, r);
        })();
      });
    }
    /**
     * Publish SIP DTMF message to the room.
     *
     * @param code DTMF code
     * @param digit DTMF digit
     */
    publishDtmf(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = new ge({
          kind: Et.RELIABLE,
          value: {
            case: "sipDtmf",
            value: new eo({
              code: e,
              digit: t
            })
          }
        });
        yield this.engine.sendDataPacket(n, B.RELIABLE);
      });
    }
    /** @deprecated Consider migrating to {@link sendText} */
    sendChatMessage(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = {
          id: crypto.randomUUID(),
          message: e,
          timestamp: Date.now(),
          attachedFiles: t == null ? void 0 : t.attachments
        }, s = new ge({
          value: {
            case: "chatMessage",
            value: new Gn(Object.assign(Object.assign({}, n), {
              timestamp: Y.parse(n.timestamp)
            }))
          }
        });
        return yield this.engine.sendDataPacket(s, B.RELIABLE), this.emit(I.ChatMessage, n), n;
      });
    }
    /** @deprecated Consider migrating to {@link sendText} */
    editChatMessage(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = Object.assign(Object.assign({}, t), {
          message: e,
          editTimestamp: Date.now()
        }), s = new ge({
          value: {
            case: "chatMessage",
            value: new Gn(Object.assign(Object.assign({}, n), {
              timestamp: Y.parse(n.timestamp),
              editTimestamp: Y.parse(n.editTimestamp)
            }))
          }
        });
        return yield this.engine.sendDataPacket(s, B.RELIABLE), this.emit(I.ChatMessage, n), n;
      });
    }
    /**
     * Sends the given string to participants in the room via the data channel.
     * For longer messages, consider using {@link streamText} instead.
     *
     * @param text The text payload
     * @param options.topic Topic identifier used to route the stream to appropriate handlers.
     */
    sendText(e, t) {
      return m(this, void 0, void 0, function* () {
        return this.roomOutgoingDataStreamManager.sendText(e, t);
      });
    }
    /**
     * Creates a new TextStreamWriter which can be used to stream text incrementally
     * to participants in the room via the data channel.
     *
     * @param options.topic Topic identifier used to route the stream to appropriate handlers.
     *
     * @internal
     * @experimental CAUTION, might get removed in a minor release
     */
    streamText(e) {
      return m(this, void 0, void 0, function* () {
        return this.roomOutgoingDataStreamManager.streamText(e);
      });
    }
    /** Send a File to all participants in the room via the data channel.
     * @param file The File object payload
     * @param options.topic Topic identifier used to route the stream to appropriate handlers.
     * @param options.onProgress A callback function used to monitor the upload progress percentage.
     */
    sendFile(e, t) {
      return m(this, void 0, void 0, function* () {
        return this.roomOutgoingDataStreamManager.sendFile(e, t);
      });
    }
    /**
     * Stream bytes incrementally to participants in the room via the data channel.
     * For sending files, consider using {@link sendFile} instead.
     *
     * @param options.topic Topic identifier used to route the stream to appropriate handlers.
     */
    streamBytes(e) {
      return m(this, void 0, void 0, function* () {
        return this.roomOutgoingDataStreamManager.streamBytes(e);
      });
    }
    /**
     * Initiate an RPC call to a remote participant
     * @param params - Parameters for initiating the RPC call, see {@link PerformRpcParams}
     * @returns A promise that resolves with the response payload or rejects with an error.
     * @throws Error on failure. Details in `message`.
     */
    performRpc(e) {
      let {
        destinationIdentity: t,
        method: n,
        payload: s,
        responseTimeout: r = 15e3
      } = e;
      const a = 7e3, o = a + 1e3;
      return new ue((d, c) => m(this, void 0, void 0, function* () {
        var l, u, h, f;
        if (sr(s) > Cc) {
          c(Z.builtIn("REQUEST_PAYLOAD_TOO_LARGE"));
          return;
        }
        if (!((u = (l = this.engine.latestJoinResponse) === null || l === void 0 ? void 0 : l.serverInfo) === null || u === void 0) && u.version && Qe((f = (h = this.engine.latestJoinResponse) === null || h === void 0 ? void 0 : h.serverInfo) === null || f === void 0 ? void 0 : f.version, "1.8.0") < 0) {
          c(Z.builtIn("UNSUPPORTED_SERVER"));
          return;
        }
        const v = Math.max(r, o), g = crypto.randomUUID();
        yield this.publishRpcRequest(t, g, n, s, v);
        const T = setTimeout(() => {
          this.pendingAcks.delete(g), c(Z.builtIn("CONNECTION_TIMEOUT")), this.pendingResponses.delete(g), clearTimeout(k);
        }, a);
        this.pendingAcks.set(g, {
          resolve: () => {
            clearTimeout(T);
          },
          participantIdentity: t
        });
        const k = setTimeout(() => {
          this.pendingResponses.delete(g), c(Z.builtIn("RESPONSE_TIMEOUT"));
        }, r);
        this.pendingResponses.set(g, {
          resolve: (w, O) => {
            clearTimeout(k), this.pendingAcks.has(g) && (this.log.warn("RPC response received before ack", g), this.pendingAcks.delete(g), clearTimeout(T)), O ? c(O) : d(w ?? "");
          },
          participantIdentity: t
        });
      }));
    }
    /**
     * @deprecated use `room.registerRpcMethod` instead
     */
    registerRpcMethod(e, t) {
      this.rpcHandlers.has(e) && this.log.warn("you're overriding the RPC handler for method ".concat(e, ", in the future this will throw an error")), this.rpcHandlers.set(e, t);
    }
    /**
     * @deprecated use `room.unregisterRpcMethod` instead
     */
    unregisterRpcMethod(e) {
      this.rpcHandlers.delete(e);
    }
    /**
     * Control who can subscribe to LocalParticipant's published tracks.
     *
     * By default, all participants can subscribe. This allows fine-grained control over
     * who is able to subscribe at a participant and track level.
     *
     * Note: if access is given at a track-level (i.e. both [allParticipantsAllowed] and
     * [ParticipantTrackPermission.allTracksAllowed] are false), any newer published tracks
     * will not grant permissions to any participants and will require a subsequent
     * permissions update to allow subscription.
     *
     * @param allParticipantsAllowed Allows all participants to subscribe all tracks.
     *  Takes precedence over [[participantTrackPermissions]] if set to true.
     *  By default this is set to true.
     * @param participantTrackPermissions Full list of individual permissions per
     *  participant/track. Any omitted participants will not receive any permissions.
     */
    setTrackSubscriptionPermissions(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      this.participantTrackPermissions = t, this.allParticipantsAllowedToSubscribe = e, this.engine.client.isDisconnected || this.updateTrackSubscriptionPermissions();
    }
    handleIncomingRpcAck(e) {
      const t = this.pendingAcks.get(e);
      t ? (t.resolve(), this.pendingAcks.delete(e)) : console.error("Ack received for unexpected RPC request", e);
    }
    handleIncomingRpcResponse(e, t, n) {
      const s = this.pendingResponses.get(e);
      s ? (s.resolve(t, n), this.pendingResponses.delete(e)) : console.error("Response received for unexpected RPC request", e);
    }
    /** @internal */
    publishRpcRequest(e, t, n, s, r) {
      return m(this, void 0, void 0, function* () {
        const a = new ge({
          destinationIdentities: [e],
          kind: Et.RELIABLE,
          value: {
            case: "rpcRequest",
            value: new xs({
              id: t,
              method: n,
              payload: s,
              responseTimeoutMs: r,
              version: 1
            })
          }
        });
        yield this.engine.sendDataPacket(a, B.RELIABLE);
      });
    }
    /** @internal */
    handleParticipantDisconnected(e) {
      for (const [t, {
        participantIdentity: n
      }] of this.pendingAcks)
        n === e && this.pendingAcks.delete(t);
      for (const [t, {
        participantIdentity: n,
        resolve: s
      }] of this.pendingResponses)
        n === e && (s(null, Z.builtIn("RECIPIENT_DISCONNECTED")), this.pendingResponses.delete(t));
    }
    /** @internal */
    setEnabledPublishCodecs(e) {
      this.enabledPublishVideoCodecs = e.filter((t) => t.mime.split("/")[0].toLowerCase() === "video");
    }
    /** @internal */
    updateInfo(e) {
      return super.updateInfo(e) ? (e.tracks.forEach((t) => {
        var n, s;
        const r = this.trackPublications.get(t.sid);
        if (r) {
          const a = r.isMuted || ((s = (n = r.track) === null || n === void 0 ? void 0 : n.isUpstreamPaused) !== null && s !== void 0 ? s : false);
          a !== t.muted && (this.log.debug("updating server mute state after reconcile", Object.assign(Object.assign(Object.assign({}, this.logContext), j(r)), {
            mutedOnServer: a
          })), this.engine.client.sendMuteTrack(t.sid, a));
        }
      }), true) : false;
    }
    /** @internal */
    setActiveAgent(e) {
      var t, n, s, r;
      this.firstActiveAgent = e, e && !this.firstActiveAgent && (this.firstActiveAgent = e), e ? (n = (t = this.activeAgentFuture) === null || t === void 0 ? void 0 : t.resolve) === null || n === void 0 || n.call(t, e) : (r = (s = this.activeAgentFuture) === null || s === void 0 ? void 0 : s.reject) === null || r === void 0 || r.call(s, new Error("Agent disconnected")), this.activeAgentFuture = void 0;
    }
    waitUntilActiveAgentPresent() {
      return this.firstActiveAgent ? Promise.resolve(this.firstActiveAgent) : (this.activeAgentFuture || (this.activeAgentFuture = new Se()), this.activeAgentFuture.promise);
    }
    getPublicationForTrack(e) {
      let t;
      return this.trackPublications.forEach((n) => {
        const s = n.track;
        s && (e instanceof MediaStreamTrack ? (et(s) || at(s)) && s.mediaStreamTrack === e && (t = n) : e === s && (t = n));
      }), t;
    }
    waitForPendingPublicationOfSource(e) {
      return m(this, void 0, void 0, function* () {
        const n = Date.now();
        for (; Date.now() < n + 1e4; ) {
          const s = Array.from(this.pendingPublishPromises.entries()).find((r) => {
            let [a] = r;
            return a.source === e;
          });
          if (s)
            return s[1];
          yield he(20);
        }
      });
    }
    /** Publishes a data track.
     *
     * Returns the published data track if successful. Use {@link LocalDataTrack#tryPush}
     * to send data frames on the track.
     */
    publishDataTrack(e) {
      return m(this, void 0, void 0, function* () {
        const t = new Ti(e, this.roomOutgoingDataTrackManager);
        return yield t.publish(), t;
      });
    }
  }
  class Ra extends DOMException {
    constructor(e, t) {
      super(e, "AbortError"), this.reason = t;
    }
  }
  class Cf extends Map {
    constructor() {
      super(...arguments), this.pending = /* @__PURE__ */ new Map();
    }
    set(e, t) {
      var n, s;
      super.set(e, t);
      const r = (n = this.pending) === null || n === void 0 ? void 0 : n.get(e);
      if (r) {
        for (const a of r)
          a.isResolved || (s = a.resolve) === null || s === void 0 || s.call(a, t);
        this.pending.delete(e);
      }
      return this;
    }
    get [Symbol.toStringTag]() {
      return "DeferrableMap";
    }
    getDeferred(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = this.get(e);
        if (typeof n < "u")
          return n;
        if (t != null && t.aborted)
          throw new Ra("The operation was aborted.", t.reason);
        const s = new Se(void 0, () => {
          const a = this.pending.get(e);
          if (!a)
            return;
          const o = a.indexOf(s);
          o !== -1 && a.splice(o, 1), a.length === 0 && this.pending.delete(e);
        }), r = this.pending.get(e);
        if (r ? r.push(s) : this.pending.set(e, [s]), t) {
          const a = () => {
            var o;
            s.isResolved || (o = s.reject) === null || o === void 0 || o.call(s, new Ra("The operation was aborted.", t.reason));
          };
          t.addEventListener("abort", a, {
            once: true
          }), s.promise.finally(() => {
            t.removeEventListener("abort", a);
          });
        }
        return s.promise;
      });
    }
  }
  class Ef extends nt {
    constructor(e, t, n, s) {
      super(e, t.sid, t.name, s), this.track = void 0, this.allowed = true, this.requestedDisabled = void 0, this.visible = true, this.handleEnded = (r) => {
        this.setTrack(void 0), this.emit(R.Ended, r);
      }, this.handleVisibilityChange = (r) => {
        this.log.debug("adaptivestream video visibility ".concat(this.trackSid, ", visible=").concat(r), this.logContext), this.visible = r, this.emitTrackUpdate();
      }, this.handleVideoDimensionsChange = (r) => {
        this.log.debug("adaptivestream video dimensions ".concat(r.width, "x").concat(r.height), this.logContext), this.videoDimensionsAdaptiveStream = r, this.emitTrackUpdate();
      }, this.subscribed = n, this.updateInfo(t);
    }
    /**
     * Subscribe or unsubscribe to this remote track
     * @param subscribed true to subscribe to a track, false to unsubscribe
     */
    setSubscribed(e) {
      const t = this.subscriptionStatus, n = this.permissionStatus;
      this.subscribed = e, e && (this.allowed = true);
      const s = new ci({
        trackSids: [this.trackSid],
        subscribe: this.subscribed,
        participantTracks: [new no({
          // sending an empty participant id since TrackPublication doesn't keep it
          // this is filled in by the participant that receives this message
          participantSid: "",
          trackSids: [this.trackSid]
        })]
      });
      this.emit(R.UpdateSubscription, s), this.emitSubscriptionUpdateIfChanged(t), this.emitPermissionUpdateIfChanged(n);
    }
    get subscriptionStatus() {
      return this.subscribed === false ? nt.SubscriptionStatus.Unsubscribed : super.isSubscribed ? nt.SubscriptionStatus.Subscribed : nt.SubscriptionStatus.Desired;
    }
    get permissionStatus() {
      return this.allowed ? nt.PermissionStatus.Allowed : nt.PermissionStatus.NotAllowed;
    }
    /**
     * Returns true if track is subscribed, and ready for playback
     */
    get isSubscribed() {
      return this.subscribed === false ? false : super.isSubscribed;
    }
    // returns client's desire to subscribe to a track, also true if autoSubscribe is enabled
    get isDesired() {
      return this.subscribed !== false;
    }
    get isEnabled() {
      return this.requestedDisabled !== void 0 ? !this.requestedDisabled : this.isAdaptiveStream ? this.visible : true;
    }
    get isLocal() {
      return false;
    }
    /**
     * disable server from sending down data for this track. this is useful when
     * the participant is off screen, you may disable streaming down their video
     * to reduce bandwidth requirements
     * @param enabled
     */
    setEnabled(e) {
      !this.isManualOperationAllowed() || this.requestedDisabled === !e || (this.requestedDisabled = !e, this.emitTrackUpdate());
    }
    /**
     * for tracks that support simulcasting, adjust subscribed quality
     *
     * This indicates the highest quality the client can accept. if network
     * bandwidth does not allow, server will automatically reduce quality to
     * optimize for uninterrupted video
     */
    setVideoQuality(e) {
      !this.isManualOperationAllowed() || this.requestedMaxQuality === e || (this.requestedMaxQuality = e, this.requestedVideoDimensions = void 0, this.emitTrackUpdate());
    }
    /**
     * Explicitly set the video dimensions for this track.
     *
     * This will take precedence over adaptive stream dimensions.
     *
     * @param dimensions The video dimensions to set.
     */
    setVideoDimensions(e) {
      var t, n;
      this.isManualOperationAllowed() && (((t = this.requestedVideoDimensions) === null || t === void 0 ? void 0 : t.width) === e.width && ((n = this.requestedVideoDimensions) === null || n === void 0 ? void 0 : n.height) === e.height || (qi(this.track) && (this.requestedVideoDimensions = e), this.requestedMaxQuality = void 0, this.emitTrackUpdate()));
    }
    setVideoFPS(e) {
      this.isManualOperationAllowed() && qi(this.track) && this.fps !== e && (this.fps = e, this.emitTrackUpdate());
    }
    get videoQuality() {
      var e;
      return (e = this.requestedMaxQuality) !== null && e !== void 0 ? e : we.HIGH;
    }
    /** @internal */
    setTrack(e) {
      const t = this.subscriptionStatus, n = this.permissionStatus, s = this.track;
      s !== e && (s && (s.off(R.VideoDimensionsChanged, this.handleVideoDimensionsChange), s.off(R.VisibilityChanged, this.handleVisibilityChange), s.off(R.Ended, this.handleEnded), s.detach(), s.stopMonitor(), this.emit(R.Unsubscribed, s)), super.setTrack(e), e && (e.sid = this.trackSid, e.on(R.VideoDimensionsChanged, this.handleVideoDimensionsChange), e.on(R.VisibilityChanged, this.handleVisibilityChange), e.on(R.Ended, this.handleEnded), this.emit(R.Subscribed, e)), this.emitPermissionUpdateIfChanged(n), this.emitSubscriptionUpdateIfChanged(t));
    }
    /** @internal */
    setAllowed(e) {
      const t = this.subscriptionStatus, n = this.permissionStatus;
      this.allowed = e, this.emitPermissionUpdateIfChanged(n), this.emitSubscriptionUpdateIfChanged(t);
    }
    /** @internal */
    setSubscriptionError(e) {
      this.emit(R.SubscriptionFailed, e);
    }
    /** @internal */
    updateInfo(e) {
      super.updateInfo(e);
      const t = this.metadataMuted;
      this.metadataMuted = e.muted, this.track ? this.track.setMuted(e.muted) : t !== e.muted && this.emit(e.muted ? R.Muted : R.Unmuted);
    }
    emitSubscriptionUpdateIfChanged(e) {
      const t = this.subscriptionStatus;
      e !== t && this.emit(R.SubscriptionStatusChanged, t, e);
    }
    emitPermissionUpdateIfChanged(e) {
      this.permissionStatus !== e && this.emit(R.SubscriptionPermissionChanged, this.permissionStatus, e);
    }
    isManualOperationAllowed() {
      return this.isDesired ? true : (this.log.warn("cannot update track settings when not subscribed", this.logContext), false);
    }
    get isAdaptiveStream() {
      return qi(this.track) && this.track.isAdaptiveStream;
    }
    /* @internal */
    emitTrackUpdate() {
      const e = new mo({
        trackSids: [this.trackSid],
        disabled: !this.isEnabled,
        fps: this.fps
      });
      if (this.kind === C.Kind.Video) {
        let t = this.requestedVideoDimensions;
        if (this.videoDimensionsAdaptiveStream !== void 0)
          if (t)
            qr(this.videoDimensionsAdaptiveStream, t) && (this.log.debug("using adaptive stream dimensions instead of requested", Object.assign(Object.assign({}, this.logContext), this.videoDimensionsAdaptiveStream)), t = this.videoDimensionsAdaptiveStream);
          else if (this.requestedMaxQuality !== void 0 && this.trackInfo) {
            const n = Cu(this.trackInfo, this.requestedMaxQuality);
            n && qr(this.videoDimensionsAdaptiveStream, n) && (this.log.debug("using adaptive stream dimensions instead of max quality layer", Object.assign(Object.assign({}, this.logContext), this.videoDimensionsAdaptiveStream)), t = this.videoDimensionsAdaptiveStream);
          } else
            this.log.debug("using adaptive stream dimensions", Object.assign(Object.assign({}, this.logContext), this.videoDimensionsAdaptiveStream)), t = this.videoDimensionsAdaptiveStream;
        t ? (e.width = Math.ceil(t.width), e.height = Math.ceil(t.height)) : this.requestedMaxQuality !== void 0 ? (this.log.debug("using requested max quality", Object.assign(Object.assign({}, this.logContext), {
          quality: this.requestedMaxQuality
        })), e.quality = this.requestedMaxQuality) : (this.log.debug("using default quality", Object.assign(Object.assign({}, this.logContext), {
          quality: we.HIGH
        })), e.quality = we.HIGH);
      }
      this.emit(R.UpdateSettings, e);
    }
  }
  class ni extends Uc {
    /** @internal */
    static fromParticipantInfo(e, t, n, s) {
      return new ni(e, t.sid, t.identity, t.name, t.metadata, t.attributes, n, t.kind, t.dataTracks.map((r) => {
        const a = ei.from(r);
        return new Nc(a, s, {
          publisherIdentity: t.identity
        });
      }));
    }
    get logContext() {
      return Object.assign(Object.assign({}, super.logContext), {
        remoteParticipantID: this.sid,
        remoteParticipant: this.identity
      });
    }
    /** @internal */
    constructor(e, t, n, s, r, a, o) {
      let d = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : fn.STANDARD, c = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : [];
      super(t, n || "", s, r, a, o, d), this.signalClient = e, this.trackPublications = /* @__PURE__ */ new Map(), this.audioTrackPublications = /* @__PURE__ */ new Map(), this.videoTrackPublications = /* @__PURE__ */ new Map(), this.dataTracks = new Cf(c.map((l) => [l.info.name, l])), this.volumeMap = /* @__PURE__ */ new Map();
    }
    addTrackPublication(e) {
      super.addTrackPublication(e), e.on(R.UpdateSettings, (t) => {
        this.log.debug("send update settings", Object.assign(Object.assign(Object.assign({}, this.logContext), j(e)), {
          settings: t
        })), this.signalClient.sendUpdateTrackSettings(t);
      }), e.on(R.UpdateSubscription, (t) => {
        t.participantTracks.forEach((n) => {
          n.participantSid = this.sid;
        }), this.signalClient.sendUpdateSubscription(t);
      }), e.on(R.SubscriptionPermissionChanged, (t) => {
        this.emit(I.TrackSubscriptionPermissionChanged, e, t);
      }), e.on(R.SubscriptionStatusChanged, (t) => {
        this.emit(I.TrackSubscriptionStatusChanged, e, t);
      }), e.on(R.Subscribed, (t) => {
        this.emit(I.TrackSubscribed, t, e);
      }), e.on(R.Unsubscribed, (t) => {
        this.emit(I.TrackUnsubscribed, t, e);
      }), e.on(R.SubscriptionFailed, (t) => {
        this.emit(I.TrackSubscriptionFailed, e.trackSid, t);
      });
    }
    getTrackPublication(e) {
      const t = super.getTrackPublication(e);
      if (t)
        return t;
    }
    getTrackPublicationByName(e) {
      const t = super.getTrackPublicationByName(e);
      if (t)
        return t;
    }
    /**
     * sets the volume on the participant's audio track
     * by default, this affects the microphone publication
     * a different source can be passed in as a second argument
     * if no track exists the volume will be applied when the microphone track is added
     */
    setVolume(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : C.Source.Microphone;
      this.volumeMap.set(t, e);
      const n = this.getTrackPublication(t);
      n && n.track && n.track.setVolume(e);
    }
    /**
     * gets the volume on the participant's microphone track
     */
    getVolume() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : C.Source.Microphone;
      const t = this.getTrackPublication(e);
      return t && t.track ? t.track.getVolume() : this.volumeMap.get(e);
    }
    /** @internal */
    addSubscribedMediaTrack(e, t, n, s, r, a) {
      let o = this.getTrackPublicationBySid(t);
      if (o || t.startsWith("TR") || this.trackPublications.forEach((l) => {
        !o && e.kind === l.kind.toString() && (o = l);
      }), !o) {
        if (a === 0) {
          this.log.error("could not find published track", Object.assign(Object.assign({}, this.logContext), {
            trackSid: t
          })), this.emit(I.TrackSubscriptionFailed, t);
          return;
        }
        a === void 0 && (a = 20), setTimeout(() => {
          this.addSubscribedMediaTrack(e, t, n, s, r, a - 1);
        }, 150);
        return;
      }
      if (e.readyState === "ended") {
        this.log.error("unable to subscribe because MediaStreamTrack is ended. Do not call MediaStreamTrack.stop()", Object.assign(Object.assign({}, this.logContext), j(o))), this.emit(I.TrackSubscriptionFailed, t);
        return;
      }
      const d = e.kind === "video";
      let c;
      return d ? c = new gf(e, t, s, r) : c = new pf(e, t, s, this.audioContext, this.audioOutput), c.source = o.source, c.isMuted = o.isMuted, c.setMediaStream(n), c.start(), o.setTrack(c), this.volumeMap.has(o.source) && ys(c) && ze(c) && c.setVolume(this.volumeMap.get(o.source)), o;
    }
    /** @internal */
    get hasMetadata() {
      return !!this.participantInfo;
    }
    /**
     * @internal
     */
    getTrackPublicationBySid(e) {
      return this.trackPublications.get(e);
    }
    /** @internal */
    updateInfo(e) {
      if (!super.updateInfo(e))
        return false;
      const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
      return e.tracks.forEach((s) => {
        var r, a;
        let o = this.getTrackPublicationBySid(s.sid);
        if (o)
          o.updateInfo(s);
        else {
          const d = C.kindFromProto(s.type);
          if (!d)
            return;
          o = new Ef(d, s, (r = this.signalClient.connectOptions) === null || r === void 0 ? void 0 : r.autoSubscribe, {
            loggerContextCb: () => this.logContext,
            loggerName: (a = this.loggerOptions) === null || a === void 0 ? void 0 : a.loggerName
          }), o.updateInfo(s), n.set(s.sid, o);
          const c = Array.from(this.trackPublications.values()).find((l) => l.source === (o == null ? void 0 : o.source));
          c && o.source !== C.Source.Unknown && this.log.debug("received a second track publication for ".concat(this.identity, " with the same source: ").concat(o.source), Object.assign(Object.assign({}, this.logContext), {
            oldTrack: j(c),
            newTrack: j(o)
          })), this.addTrackPublication(o);
        }
        t.set(s.sid, o);
      }), this.trackPublications.forEach((s) => {
        t.has(s.trackSid) || (this.log.trace("detected removed track on remote participant, unpublishing", Object.assign(Object.assign({}, this.logContext), j(s))), this.unpublishTrack(s.trackSid, true));
      }), n.forEach((s) => {
        this.emit(I.TrackPublished, s);
      }), true;
    }
    /** @internal */
    unpublishTrack(e, t) {
      const n = this.trackPublications.get(e);
      if (!n)
        return;
      const {
        track: s
      } = n;
      switch (s && (s.stop(), n.setTrack(void 0)), this.trackPublications.delete(e), n.kind) {
        case C.Kind.Audio:
          this.audioTrackPublications.delete(e);
          break;
        case C.Kind.Video:
          this.videoTrackPublications.delete(e);
          break;
      }
      t && this.emit(I.TrackUnpublished, n);
    }
    /**
     * @internal
     */
    setAudioOutput(e) {
      return m(this, void 0, void 0, function* () {
        this.audioOutput = e;
        const t = [];
        this.audioTrackPublications.forEach((n) => {
          var s;
          ze(n.track) && ys(n.track) && t.push(n.track.setSinkId((s = e.deviceId) !== null && s !== void 0 ? s : "default"));
        }), yield Promise.all(t);
      });
    }
    /** @internal */
    addRemoteDataTrack(e) {
      this.dataTracks.set(e.info.name, e);
    }
    /** @internal */
    removeRemoteDataTrack(e) {
      for (const [t, n] of this.dataTracks.entries())
        e === n.info.sid && this.dataTracks.delete(t);
    }
    /** @internal */
    emit(e) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
        n[s - 1] = arguments[s];
      return this.log.trace("participant event", Object.assign(Object.assign({}, this.logContext), {
        event: e,
        args: n
      })), super.emit(e, ...n);
    }
  }
  var W;
  (function(i) {
    i.Disconnected = "disconnected", i.Connecting = "connecting", i.Connected = "connected", i.Reconnecting = "reconnecting", i.SignalReconnecting = "signalReconnecting";
  })(W || (W = {}));
  const wf = 4 * 1e3;
  class En extends Ie.EventEmitter {
    get hasE2EESetup() {
      return this.e2eeManager !== void 0;
    }
    /**
     * Creates a new Room, the primary construct for a LiveKit session.
     * @param options
     */
    constructor(e) {
      var t, n, s, r, a, o, d;
      if (super(), t = this, this.state = W.Disconnected, this.activeSpeakers = [], this.isE2EEEnabled = false, this.audioEnabled = true, this.e2eeStateMutex = new ce(), this.isVideoPlaybackBlocked = false, this.log = U, this.bufferedEvents = [], this.isResuming = false, this.rpcHandlers = /* @__PURE__ */ new Map(), this.connect = (c, l, u) => m(this, void 0, void 0, function* () {
        var h;
        if (!Iu())
          throw Ye() ? Error("WebRTC isn't detected, have you called registerGlobals?") : Error("LiveKit doesn't seem to be supported on this browser. Try to update your browser and make sure no browser extensions are disabling webRTC.");
        const f = yield this.disconnectLock.lock();
        if (this.state === W.Connected)
          return this.log.info("already connected to room ".concat(this.name), this.logContext), f(), Promise.resolve();
        if (this.connectFuture)
          return f(), this.connectFuture.promise;
        this.setAndEmitConnectionState(W.Connecting), ((h = this.regionUrlProvider) === null || h === void 0 ? void 0 : h.getServerUrl().toString()) !== gc(c) && (this.regionUrl = void 0, this.regionUrlProvider = void 0), Jt(new URL(c)) && (this.regionUrlProvider === void 0 ? this.regionUrlProvider = new V(c, l) : this.regionUrlProvider.updateToken(l), this.regionUrlProvider.fetchRegionSettings().then((T) => {
          var k;
          (k = this.regionUrlProvider) === null || k === void 0 || k.setServerReportedRegions(T);
        }).catch((T) => {
          this.log.warn("could not fetch region settings", Object.assign(Object.assign({}, this.logContext), {
            error: T
          }));
        }));
        const v = (T, k, w) => m(this, void 0, void 0, function* () {
          var O, b;
          this.abortController && this.abortController.abort();
          const y = new AbortController();
          this.abortController = y, f == null || f();
          try {
            if (yield Vt.getInstance().getBackOffPromise(c), y.signal.aborted)
              throw L.cancelled("Connection attempt aborted");
            yield this.attemptConnection(w ?? c, l, u, y), this.abortController = void 0, T();
          } catch (S) {
            if (this.regionUrlProvider && S instanceof L && S.reason !== G.Cancelled && S.reason !== G.NotAllowed) {
              let M = null;
              try {
                this.log.debug("Fetching next region"), M = yield this.regionUrlProvider.getNextBestRegionUrl((O = this.abortController) === null || O === void 0 ? void 0 : O.signal);
              } catch (D) {
                if (D instanceof L && (D.status === 401 || D.reason === G.Cancelled)) {
                  this.handleDisconnect(this.options.stopLocalTrackOnUnpublish), k(D);
                  return;
                }
              }
              // making sure we only register failed attempts on things we actually care about
              [G.InternalError, G.ServerUnreachable, G.Timeout].includes(S.reason) && (this.log.debug("Adding failed connection attempt to back off"), Vt.getInstance().addFailedConnectionAttempt(c)), M && !(!((b = this.abortController) === null || b === void 0) && b.signal.aborted) ? (this.log.info("Initial connection failed with ConnectionError: ".concat(S.message, ". Retrying with another region: ").concat(M), this.logContext), this.recreateEngine(true), yield v(T, k, M)) : (this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, Jr(S)), k(S));
            } else {
              let M = qe.UNKNOWN_REASON;
              S instanceof L && (M = Jr(S)), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, M), k(S);
            }
          }
        }), g = this.regionUrl;
        return this.regionUrl = void 0, this.connectFuture = new Se((T, k) => {
          v(T, k, g);
        }, () => {
          this.clearConnectionFutures();
        }), this.connectFuture.promise;
      }), this.connectSignal = (c, l, u, h, f, v) => m(this, void 0, void 0, function* () {
        const {
          joinResponse: g,
          serverInfo: T
        } = yield u.join(c, l, {
          autoSubscribe: h.autoSubscribe,
          adaptiveStream: typeof f.adaptiveStream == "object" ? true : f.adaptiveStream,
          maxRetries: h.maxRetries,
          e2eeEnabled: !!this.e2eeManager,
          websocketTimeout: h.websocketTimeout
        }, v.signal, !f.singlePeerConnection);
        if (this.serverInfo = T, !T.version)
          throw new uu("unknown server version");
        return T.version === "0.15.1" && this.options.dynacast && (this.log.debug("disabling dynacast due to server version", this.logContext), f.dynacast = false), g;
      }), this.applyJoinResponse = (c) => {
        const l = c.participant;
        if (this.localParticipant.sid = l.sid, this.localParticipant.identity = l.identity, this.localParticipant.setEnabledPublishCodecs(c.enabledPublishCodecs), this.e2eeManager)
          try {
            this.e2eeManager.setSifTrailer(c.sifTrailer);
          } catch (u) {
            this.log.error(u instanceof Error ? u.message : "Could not set SifTrailer", Object.assign(Object.assign({}, this.logContext), {
              error: u
            }));
          }
        this.handleParticipantUpdates([l, ...c.otherParticipants]), c.room && this.handleRoomUpdate(c.room);
      }, this.attemptConnection = (c, l, u, h) => m(this, void 0, void 0, function* () {
        var f, v;
        this.state === W.Reconnecting || this.isResuming || !((f = this.engine) === null || f === void 0) && f.pendingReconnect ? (this.log.info("Reconnection attempt replaced by new connection attempt", this.logContext), this.recreateEngine(true)) : this.maybeCreateEngine(), !((v = this.regionUrlProvider) === null || v === void 0) && v.isCloud() && this.engine.setRegionUrlProvider(this.regionUrlProvider), this.acquireAudioContext(), this.connOptions = Object.assign(Object.assign({}, ir), u), this.connOptions.rtcConfig && (this.engine.rtcConfig = this.connOptions.rtcConfig), this.connOptions.peerConnectionTimeout && (this.engine.peerConnectionTimeout = this.connOptions.peerConnectionTimeout);
        try {
          const g = yield this.connectSignal(c, l, this.engine, this.connOptions, this.options, h);
          this.applyJoinResponse(g), this.setupLocalParticipantEvents(), this.emit(P.SignalConnected);
        } catch (g) {
          yield this.engine.close(), this.recreateEngine();
          const T = h.signal.aborted ? L.cancelled("Signal connection aborted") : L.serverUnreachable("could not establish signal connection");
          throw g instanceof Error && (T.message = "".concat(T.message, ": ").concat(g.message)), g instanceof L && (T.reason = g.reason, T.status = g.status), this.log.debug("error trying to establish signal connection", Object.assign(Object.assign({}, this.logContext), {
            error: g
          })), T;
        }
        if (h.signal.aborted)
          throw yield this.engine.close(), this.recreateEngine(), L.cancelled("Connection attempt aborted");
        try {
          yield this.engine.waitForPCInitialConnection(this.connOptions.peerConnectionTimeout, h);
        } catch (g) {
          throw yield this.engine.close(), this.recreateEngine(), g;
        }
        Te() && this.options.disconnectOnPageLeave && (window.addEventListener("pagehide", this.onPageLeave), window.addEventListener("beforeunload", this.onPageLeave)), Te() && window.addEventListener("freeze", this.onPageLeave), this.setAndEmitConnectionState(W.Connected), this.emit(P.Connected), Vt.getInstance().resetFailedConnectionAttempts(c), this.registerConnectionReconcile(), this.regionUrlProvider && this.regionUrlProvider.notifyConnected();
      }), this.disconnect = function() {
        for (var c = arguments.length, l = new Array(c), u = 0; u < c; u++)
          l[u] = arguments[u];
        return m(t, [...l], void 0, function() {
          var h = this;
          let f = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
          return (function* () {
            var v, g, T;
            const k = yield h.disconnectLock.lock();
            try {
              if (h.state === W.Disconnected) {
                h.log.debug("already disconnected", h.logContext);
                return;
              }
              if (h.log.info("disconnect from room", Object.assign({}, h.logContext)), h.state === W.Connecting || h.state === W.Reconnecting || h.isResuming) {
                const w = "Abort connection attempt due to user initiated disconnect";
                h.log.warn(w, h.logContext), (v = h.abortController) === null || v === void 0 || v.abort(w), (T = (g = h.connectFuture) === null || g === void 0 ? void 0 : g.reject) === null || T === void 0 || T.call(g, L.cancelled("Client initiated disconnect")), h.connectFuture = void 0;
              }
              h.engine && (h.engine.client.isDisconnected || (yield h.engine.client.sendLeave()), yield h.engine.close()), h.handleDisconnect(f, qe.CLIENT_INITIATED), h.engine = void 0;
            } finally {
              k();
            }
          })();
        });
      }, this.onPageLeave = () => m(this, void 0, void 0, function* () {
        this.log.info("Page leave detected, disconnecting", this.logContext), yield this.disconnect();
      }), this.startAudio = () => m(this, void 0, void 0, function* () {
        const c = [], l = Ce();
        if (l && l.os === "iOS") {
          const u = "livekit-dummy-audio-el";
          let h = document.getElementById(u);
          if (!h) {
            h = document.createElement("audio"), h.id = u, h.autoplay = true, h.hidden = true;
            const f = ji();
            f.enabled = true;
            const v = new MediaStream([f]);
            h.srcObject = v, document.addEventListener("visibilitychange", () => {
              h && (h.srcObject = document.hidden ? null : v, document.hidden || (this.log.debug("page visible again, triggering startAudio to resume playback and update playback status", this.logContext), this.startAudio()));
            }), document.body.append(h), this.once(P.Disconnected, () => {
              h == null || h.remove(), h = null;
            });
          }
          c.push(h);
        }
        this.remoteParticipants.forEach((u) => {
          u.audioTrackPublications.forEach((h) => {
            h.track && h.track.attachedElements.forEach((f) => {
              c.push(f);
            });
          });
        });
        try {
          yield Promise.all([this.acquireAudioContext(), ...c.map((u) => (u.muted = !1, u.play()))]), this.handleAudioPlaybackStarted();
        } catch (u) {
          throw this.handleAudioPlaybackFailed(u), u;
        }
      }), this.startVideo = () => m(this, void 0, void 0, function* () {
        const c = [];
        for (const l of this.remoteParticipants.values())
          l.videoTrackPublications.forEach((u) => {
            var h;
            (h = u.track) === null || h === void 0 || h.attachedElements.forEach((f) => {
              c.includes(f) || c.push(f);
            });
          });
        yield Promise.all(c.map((l) => l.play())).then(() => {
          this.handleVideoPlaybackStarted();
        }).catch((l) => {
          l.name === "NotAllowedError" ? this.handleVideoPlaybackFailed() : this.log.warn("Resuming video playback failed, make sure you call `startVideo` directly in a user gesture handler", this.logContext);
        });
      }), this.handleRestarting = () => {
        this.clearConnectionReconcile(), this.isResuming = false;
        for (const c of this.remoteParticipants.values())
          this.handleParticipantDisconnected(c.identity, c);
        this.setAndEmitConnectionState(W.Reconnecting) && this.emit(P.Reconnecting);
      }, this.handleRestarted = () => {
        this.outgoingDataTrackManager.sfuWillRepublishTracks(), this.incomingDataTrackManager.resendSubscriptionUpdates();
      }, this.handleSignalRestarted = (c) => m(this, void 0, void 0, function* () {
        this.log.debug("signal reconnected to server, region ".concat(c.serverRegion), Object.assign(Object.assign({}, this.logContext), {
          region: c.serverRegion
        })), this.bufferedEvents = [], this.applyJoinResponse(c);
        try {
          yield this.localParticipant.republishAllTracks(void 0, !0);
        } catch (l) {
          this.log.error("error trying to re-publish tracks after reconnection", Object.assign(Object.assign({}, this.logContext), {
            error: l
          }));
        }
        try {
          yield this.engine.waitForRestarted(), this.log.debug("fully reconnected to server", Object.assign(Object.assign({}, this.logContext), {
            region: c.serverRegion
          }));
        } catch {
          return;
        }
        this.setAndEmitConnectionState(W.Connected), this.emit(P.Reconnected), this.registerConnectionReconcile(), this.emitBufferedEvents();
      }), this.handleParticipantUpdates = (c) => {
        var l;
        for (const h of c) {
          if (h.identity === this.localParticipant.identity) {
            this.localParticipant.updateInfo(h);
            continue;
          }
          h.identity === "" && (h.identity = (l = this.sidToIdentity.get(h.sid)) !== null && l !== void 0 ? l : "");
          let f = this.remoteParticipants.get(h.identity);
          h.state === Ft.DISCONNECTED ? this.handleParticipantDisconnected(h.identity, f) : f = this.getOrCreateParticipant(h.identity, h);
        }
        const u = new Map(c.filter((h) => h.identity !== this.localParticipant.identity).map((h) => [h.identity, h.dataTracks.map((f) => ei.from(f))]));
        this.incomingDataTrackManager.receiveSfuPublicationUpdates(u);
      }, this.handleActiveSpeakersUpdate = (c) => {
        const l = [], u = {};
        c.forEach((h) => {
          if (u[h.sid] = true, h.sid === this.localParticipant.sid)
            this.localParticipant.audioLevel = h.level, this.localParticipant.setIsSpeaking(true), l.push(this.localParticipant);
          else {
            const f = this.getRemoteParticipantBySid(h.sid);
            f && (f.audioLevel = h.level, f.setIsSpeaking(true), l.push(f));
          }
        }), u[this.localParticipant.sid] || (this.localParticipant.audioLevel = 0, this.localParticipant.setIsSpeaking(false)), this.remoteParticipants.forEach((h) => {
          u[h.sid] || (h.audioLevel = 0, h.setIsSpeaking(false));
        }), this.activeSpeakers = l, this.emitWhenConnected(P.ActiveSpeakersChanged, l);
      }, this.handleSpeakersChanged = (c) => {
        const l = /* @__PURE__ */ new Map();
        this.activeSpeakers.forEach((h) => {
          const f = this.remoteParticipants.get(h.identity);
          f && f.sid !== h.sid || l.set(h.sid, h);
        }), c.forEach((h) => {
          let f = this.getRemoteParticipantBySid(h.sid);
          h.sid === this.localParticipant.sid && (f = this.localParticipant), f && (f.audioLevel = h.level, f.setIsSpeaking(h.active), h.active ? l.set(h.sid, f) : l.delete(h.sid));
        });
        const u = Array.from(l.values());
        u.sort((h, f) => f.audioLevel - h.audioLevel), this.activeSpeakers = u, this.emitWhenConnected(P.ActiveSpeakersChanged, u);
      }, this.handleStreamStateUpdate = (c) => {
        c.streamStates.forEach((l) => {
          const u = this.getRemoteParticipantBySid(l.participantSid);
          if (!u)
            return;
          const h = u.getTrackPublicationBySid(l.trackSid);
          if (!h || !h.track)
            return;
          const f = C.streamStateFromProto(l.state);
          h.track.setStreamState(f), f !== h.track.streamState && (u.emit(I.TrackStreamStateChanged, h, h.track.streamState), this.emitWhenConnected(P.TrackStreamStateChanged, h, h.track.streamState, u));
        });
      }, this.handleSubscriptionPermissionUpdate = (c) => {
        const l = this.getRemoteParticipantBySid(c.participantSid);
        if (!l)
          return;
        const u = l.getTrackPublicationBySid(c.trackSid);
        u && u.setAllowed(c.allowed);
      }, this.handleSubscriptionError = (c) => {
        const l = Array.from(this.remoteParticipants.values()).find((h) => h.trackPublications.has(c.trackSid));
        if (!l)
          return;
        const u = l.getTrackPublicationBySid(c.trackSid);
        u && u.setSubscriptionError(c.err);
      }, this.handleDataPacket = (c, l) => {
        const u = this.remoteParticipants.get(c.participantIdentity);
        if (c.value.case === "user")
          this.handleUserPacket(u, c.value.value, c.kind, l);
        else if (c.value.case === "transcription")
          this.handleTranscription(u, c.value.value);
        else if (c.value.case === "sipDtmf")
          this.handleSipDtmf(u, c.value.value);
        else if (c.value.case === "chatMessage")
          this.handleChatMessage(u, c.value.value);
        else if (c.value.case === "metrics")
          this.handleMetrics(c.value.value, u);
        else if (c.value.case === "streamHeader" || c.value.case === "streamChunk" || c.value.case === "streamTrailer")
          this.handleDataStream(c, l);
        else if (c.value.case === "rpcRequest") {
          const h = c.value.value;
          this.handleIncomingRpcRequest(c.participantIdentity, h.id, h.method, h.payload, h.responseTimeoutMs, h.version);
        }
      }, this.handleUserPacket = (c, l, u, h) => {
        this.emit(P.DataReceived, l.payload, c, u, l.topic, h), c == null || c.emit(I.DataReceived, l.payload, u, h);
      }, this.handleSipDtmf = (c, l) => {
        this.emit(P.SipDTMFReceived, l, c), c == null || c.emit(I.SipDTMFReceived, l);
      }, this.handleTranscription = (c, l) => {
        const u = l.transcribedParticipantIdentity === this.localParticipant.identity ? this.localParticipant : this.getParticipantByIdentity(l.transcribedParticipantIdentity), h = u == null ? void 0 : u.trackPublications.get(l.trackId), f = Uu(l, this.transcriptionReceivedTimes);
        h == null || h.emit(R.TranscriptionReceived, f), u == null || u.emit(I.TranscriptionReceived, f, h), this.emit(P.TranscriptionReceived, f, u, h);
      }, this.handleChatMessage = (c, l) => {
        const u = Fu(l);
        this.emit(P.ChatMessage, u, c);
      }, this.handleMetrics = (c, l) => {
        this.emit(P.MetricsReceived, c, l);
      }, this.handleDataStream = (c, l) => {
        this.incomingDataStreamManager.handleDataStreamPacket(c, l);
      }, this.bufferedSegments = /* @__PURE__ */ new Map(), this.handleAudioPlaybackStarted = () => {
        this.canPlaybackAudio || (this.audioEnabled = true, this.emit(P.AudioPlaybackStatusChanged, true));
      }, this.handleAudioPlaybackFailed = (c) => {
        this.log.warn("could not playback audio", Object.assign(Object.assign({}, this.logContext), {
          error: c
        })), this.canPlaybackAudio && (this.audioEnabled = false, this.emit(P.AudioPlaybackStatusChanged, false));
      }, this.handleVideoPlaybackStarted = () => {
        this.isVideoPlaybackBlocked && (this.isVideoPlaybackBlocked = false, this.emit(P.VideoPlaybackStatusChanged, true));
      }, this.handleVideoPlaybackFailed = () => {
        this.isVideoPlaybackBlocked || (this.isVideoPlaybackBlocked = true, this.emit(P.VideoPlaybackStatusChanged, false));
      }, this.handleDeviceChange = () => m(this, void 0, void 0, function* () {
        var c;
        ((c = Ce()) === null || c === void 0 ? void 0 : c.os) !== "iOS" && (yield this.selectDefaultDevices()), this.emit(P.MediaDevicesChanged);
      }), this.handleRoomUpdate = (c) => {
        const l = this.roomInfo;
        this.roomInfo = c, l && l.metadata !== c.metadata && this.emitWhenConnected(P.RoomMetadataChanged, c.metadata), (l == null ? void 0 : l.activeRecording) !== c.activeRecording && this.emitWhenConnected(P.RecordingStatusChanged, c.activeRecording);
      }, this.handleConnectionQualityUpdate = (c) => {
        c.updates.forEach((l) => {
          if (l.participantSid === this.localParticipant.sid) {
            this.localParticipant.setConnectionQuality(l.quality);
            return;
          }
          const u = this.getRemoteParticipantBySid(l.participantSid);
          u && u.setConnectionQuality(l.quality);
        });
      }, this.onLocalParticipantMetadataChanged = (c) => {
        this.emit(P.ParticipantMetadataChanged, c, this.localParticipant);
      }, this.onLocalParticipantNameChanged = (c) => {
        this.emit(P.ParticipantNameChanged, c, this.localParticipant);
      }, this.onLocalAttributesChanged = (c) => {
        this.emit(P.ParticipantAttributesChanged, c, this.localParticipant);
      }, this.onLocalTrackMuted = (c) => {
        this.emit(P.TrackMuted, c, this.localParticipant);
      }, this.onLocalTrackUnmuted = (c) => {
        this.emit(P.TrackUnmuted, c, this.localParticipant);
      }, this.onTrackProcessorUpdate = (c) => {
        var l;
        (l = c == null ? void 0 : c.onPublish) === null || l === void 0 || l.call(c, this);
      }, this.onLocalTrackPublished = (c) => m(this, void 0, void 0, function* () {
        var l, u, h, f, v, g;
        (l = c.track) === null || l === void 0 || l.on(R.TrackProcessorUpdate, this.onTrackProcessorUpdate), (u = c.track) === null || u === void 0 || u.on(R.Restarted, this.onLocalTrackRestarted), (v = (f = (h = c.track) === null || h === void 0 ? void 0 : h.getProcessor()) === null || f === void 0 ? void 0 : f.onPublish) === null || v === void 0 || v.call(f, this), this.emit(P.LocalTrackPublished, c, this.localParticipant), et(c.track) && (yield c.track.checkForSilence()) && this.emit(P.LocalAudioSilenceDetected, c);
        const T = yield (g = c.track) === null || g === void 0 ? void 0 : g.getDeviceId(false), k = gs(c.source);
        k && T && T !== this.localParticipant.activeDeviceMap.get(k) && (this.localParticipant.activeDeviceMap.set(k, T), this.emit(P.ActiveDeviceChanged, k, T));
      }), this.onLocalTrackUnpublished = (c) => {
        var l, u;
        (l = c.track) === null || l === void 0 || l.off(R.TrackProcessorUpdate, this.onTrackProcessorUpdate), (u = c.track) === null || u === void 0 || u.off(R.Restarted, this.onLocalTrackRestarted), this.emit(P.LocalTrackUnpublished, c, this.localParticipant);
      }, this.onLocalTrackRestarted = (c) => m(this, void 0, void 0, function* () {
        const l = yield c.getDeviceId(false), u = gs(c.source);
        u && l && l !== this.localParticipant.activeDeviceMap.get(u) && (this.log.debug("local track restarted, setting ".concat(u, " ").concat(l, " active"), this.logContext), this.localParticipant.activeDeviceMap.set(u, l), this.emit(P.ActiveDeviceChanged, u, l));
      }), this.onLocalConnectionQualityChanged = (c) => {
        this.emit(P.ConnectionQualityChanged, c, this.localParticipant);
      }, this.onMediaDevicesError = (c, l) => {
        this.emit(P.MediaDevicesError, c, l);
      }, this.onLocalParticipantPermissionsChanged = (c) => {
        this.emit(P.ParticipantPermissionsChanged, c, this.localParticipant);
      }, this.onLocalChatMessageSent = (c) => {
        this.emit(P.ChatMessage, c, this.localParticipant);
      }, this.setMaxListeners(100), this.remoteParticipants = /* @__PURE__ */ new Map(), this.sidToIdentity = /* @__PURE__ */ new Map(), this.options = Object.assign(Object.assign({}, Ch), e), this.log = Ee((n = this.options.loggerName) !== null && n !== void 0 ? n : fe.Room), this.transcriptionReceivedTimes = /* @__PURE__ */ new Map(), this.options.audioCaptureDefaults = Object.assign(Object.assign({}, kc), e == null ? void 0 : e.audioCaptureDefaults), this.options.videoCaptureDefaults = Object.assign(Object.assign({}, Tc), e == null ? void 0 : e.videoCaptureDefaults), this.options.publishDefaults = Object.assign(Object.assign({}, Sh), e == null ? void 0 : e.publishDefaults), this.maybeCreateEngine(), this.incomingDataStreamManager = new Zh(), this.outgoingDataStreamManager = new nf(this.engine, this.log), this.incomingDataTrackManager = new ff({
        e2eeManager: this.e2eeManager
      }), this.incomingDataTrackManager.on("sfuUpdateSubscription", (c) => {
        this.engine.client.sendUpdateDataSubscription(c.sid, c.subscribe);
      }).on("trackPublished", (c) => {
        var l;
        c.track.publisherIdentity !== this.localParticipant.identity && (this.emit(P.DataTrackPublished, c.track), (l = this.remoteParticipants.get(c.track.publisherIdentity)) === null || l === void 0 || l.addRemoteDataTrack(c.track));
      }).on("trackUnpublished", (c) => {
        var l;
        c.publisherIdentity !== this.localParticipant.identity && (this.emit(P.DataTrackUnpublished, c.sid), (l = this.remoteParticipants.get(c.publisherIdentity)) === null || l === void 0 || l.removeRemoteDataTrack(c.sid));
      }), this.outgoingDataTrackManager = new cr({
        e2eeManager: this.e2eeManager
      }), this.outgoingDataTrackManager.on("sfuPublishRequest", (c) => {
        this.engine.client.sendPublishDataTrackRequest(c.handle, c.name, c.usesE2ee);
      }).on("sfuUnpublishRequest", (c) => {
        this.engine.client.sendUnPublishDataTrackRequest(c.handle);
      }).on("trackPublished", (c) => {
        this.emit(P.LocalDataTrackPublished, c.track);
      }).on("trackUnpublished", (c) => {
        this.emit(P.LocalDataTrackUnpublished, c.sid);
      }).on("packetAvailable", (c) => {
        let {
          bytes: l
        } = c;
        this.engine.sendLossyBytes(l, B.DATA_TRACK_LOSSY, "wait");
      }), this.disconnectLock = new ce(), this.localParticipant = new Sf("", "", this.engine, this.options, this.rpcHandlers, this.outgoingDataStreamManager, this.outgoingDataTrackManager), (this.options.e2ee || this.options.encryption) && this.setupE2EE(), this.engine.e2eeManager = this.e2eeManager, this.incomingDataTrackManager.updateE2eeManager((s = this.e2eeManager) !== null && s !== void 0 ? s : null), this.outgoingDataTrackManager.updateE2eeManager((r = this.e2eeManager) !== null && r !== void 0 ? r : null), this.options.videoCaptureDefaults.deviceId && this.localParticipant.activeDeviceMap.set("videoinput", Pt(this.options.videoCaptureDefaults.deviceId)), this.options.audioCaptureDefaults.deviceId && this.localParticipant.activeDeviceMap.set("audioinput", Pt(this.options.audioCaptureDefaults.deviceId)), !((a = this.options.audioOutput) === null || a === void 0) && a.deviceId && this.switchActiveDevice("audiooutput", Pt(this.options.audioOutput.deviceId)).catch((c) => this.log.warn("Could not set audio output: ".concat(c.message), this.logContext)), Te()) {
        const c = new AbortController();
        (d = (o = navigator.mediaDevices) === null || o === void 0 ? void 0 : o.addEventListener) === null || d === void 0 || d.call(o, "devicechange", this.handleDeviceChange, {
          signal: c.signal
        }), En.cleanupRegistry && En.cleanupRegistry.register(this, () => {
          c.abort();
        });
      }
    }
    registerTextStreamHandler(e, t) {
      return this.incomingDataStreamManager.registerTextStreamHandler(e, t);
    }
    unregisterTextStreamHandler(e) {
      return this.incomingDataStreamManager.unregisterTextStreamHandler(e);
    }
    registerByteStreamHandler(e, t) {
      return this.incomingDataStreamManager.registerByteStreamHandler(e, t);
    }
    unregisterByteStreamHandler(e) {
      return this.incomingDataStreamManager.unregisterByteStreamHandler(e);
    }
    /**
     * Establishes the participant as a receiver for calls of the specified RPC method.
     *
     * @param method - The name of the indicated RPC method
     * @param handler - Will be invoked when an RPC request for this method is received
     * @returns A promise that resolves when the method is successfully registered
     * @throws {Error} If a handler for this method is already registered (must call unregisterRpcMethod first)
     *
     * @example
     * ```typescript
     * room.localParticipant?.registerRpcMethod(
     *   'greet',
     *   async (data: RpcInvocationData) => {
     *     console.log(`Received greeting from ${data.callerIdentity}: ${data.payload}`);
     *     return `Hello, ${data.callerIdentity}!`;
     *   }
     * );
     * ```
     *
     * The handler should return a Promise that resolves to a string.
     * If unable to respond within `responseTimeout`, the request will result in an error on the caller's side.
     *
     * You may throw errors of type `RpcError` with a string `message` in the handler,
     * and they will be received on the caller's side with the message intact.
     * Other errors thrown in your handler will not be transmitted as-is, and will instead arrive to the caller as `1500` ("Application Error").
     */
    registerRpcMethod(e, t) {
      if (this.rpcHandlers.has(e))
        throw Error("RPC handler already registered for method ".concat(e, ", unregisterRpcMethod before trying to register again"));
      this.rpcHandlers.set(e, t);
    }
    /**
     * Unregisters a previously registered RPC method.
     *
     * @param method - The name of the RPC method to unregister
     */
    unregisterRpcMethod(e) {
      this.rpcHandlers.delete(e);
    }
    /**
     * @experimental
     */
    setE2EEEnabled(e) {
      return m(this, void 0, void 0, function* () {
        const t = yield this.e2eeStateMutex.lock();
        try {
          if (this.e2eeManager)
            this.isE2EEEnabled !== e && (yield this.localParticipant.setE2EEEnabled(e), this.localParticipant.identity !== "" && this.e2eeManager.setParticipantCryptorEnabled(e, this.localParticipant.identity));
          else
            throw Error("e2ee not configured, please set e2ee settings within the room options");
        } finally {
          t();
        }
      });
    }
    setupE2EE() {
      var e, t;
      const n = !!this.options.encryption, s = this.options.encryption || this.options.e2ee;
      s && ("e2eeManager" in s ? (this.e2eeManager = s.e2eeManager, this.e2eeManager.isDataChannelEncryptionEnabled = n) : this.e2eeManager = new ih(s, n), this.e2eeManager.on(dt.ParticipantEncryptionStatusChanged, (r, a) => {
        ju(a) && (this.isE2EEEnabled = r), this.emit(P.ParticipantEncryptionStatusChanged, r, a);
      }), this.e2eeManager.on(dt.EncryptionError, (r, a) => {
        const o = a ? this.getParticipantByIdentity(a) : void 0;
        this.emit(P.EncryptionError, r, o);
      }), (e = this.e2eeManager) === null || e === void 0 || e.setup(this), (t = this.e2eeManager) === null || t === void 0 || t.setupEngine(this.engine));
    }
    get logContext() {
      var e;
      return {
        room: this.name,
        roomID: (e = this.roomInfo) === null || e === void 0 ? void 0 : e.sid,
        participant: this.localParticipant.identity,
        participantID: this.localParticipant.sid
      };
    }
    /**
     * if the current room has a participant with `recorder: true` in its JWT grant
     **/
    get isRecording() {
      var e, t;
      return (t = (e = this.roomInfo) === null || e === void 0 ? void 0 : e.activeRecording) !== null && t !== void 0 ? t : false;
    }
    /**
     * server assigned unique room id.
     * returns once a sid has been issued by the server.
     */
    getSid() {
      return this.state === W.Disconnected ? ue.resolve("") : this.roomInfo && this.roomInfo.sid !== "" ? ue.resolve(this.roomInfo.sid) : new ue((e, t) => {
        const n = (s) => {
          s.sid !== "" && (this.engine.off(_.RoomUpdate, n), e(s.sid));
        };
        this.engine.on(_.RoomUpdate, n), this.once(P.Disconnected, () => {
          this.engine.off(_.RoomUpdate, n), t(new Q("Room disconnected before room server id was available"));
        });
      });
    }
    /** user assigned name, derived from JWT token */
    get name() {
      var e, t;
      return (t = (e = this.roomInfo) === null || e === void 0 ? void 0 : e.name) !== null && t !== void 0 ? t : "";
    }
    /** room metadata */
    get metadata() {
      var e;
      return (e = this.roomInfo) === null || e === void 0 ? void 0 : e.metadata;
    }
    get numParticipants() {
      var e, t;
      return (t = (e = this.roomInfo) === null || e === void 0 ? void 0 : e.numParticipants) !== null && t !== void 0 ? t : 0;
    }
    get numPublishers() {
      var e, t;
      return (t = (e = this.roomInfo) === null || e === void 0 ? void 0 : e.numPublishers) !== null && t !== void 0 ? t : 0;
    }
    maybeCreateEngine() {
      this.engine && (this.engine.isNewlyCreated || !this.engine.isClosed) || (this.engine = new Qh(this.options), this.engine.e2eeManager = this.e2eeManager, this.engine.on(_.ParticipantUpdate, this.handleParticipantUpdates).on(_.RoomUpdate, this.handleRoomUpdate).on(_.SpeakersChanged, this.handleSpeakersChanged).on(_.StreamStateChanged, this.handleStreamStateUpdate).on(_.ConnectionQualityUpdate, this.handleConnectionQualityUpdate).on(_.SubscriptionError, this.handleSubscriptionError).on(_.SubscriptionPermissionUpdate, this.handleSubscriptionPermissionUpdate).on(_.MediaTrackAdded, (e, t, n) => {
        this.onTrackAdded(e, t, n);
      }).on(_.Disconnected, (e) => {
        this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, e);
      }).on(_.ActiveSpeakersUpdate, this.handleActiveSpeakersUpdate).on(_.DataPacketReceived, this.handleDataPacket).on(_.Resuming, () => {
        this.clearConnectionReconcile(), this.isResuming = true, this.log.info("Resuming signal connection", this.logContext), this.setAndEmitConnectionState(W.SignalReconnecting) && this.emit(P.SignalReconnecting);
      }).on(_.Resumed, () => {
        this.registerConnectionReconcile(), this.isResuming = false, this.log.info("Resumed signal connection", this.logContext), this.updateSubscriptions(), this.emitBufferedEvents(), this.setAndEmitConnectionState(W.Connected) && this.emit(P.Reconnected);
      }).on(_.SignalResumed, () => {
        this.bufferedEvents = [], (this.state === W.Reconnecting || this.isResuming) && this.sendSyncState();
      }).on(_.Restarting, this.handleRestarting).on(_.Restarted, this.handleRestarted).on(_.SignalRestarted, this.handleSignalRestarted).on(_.Offline, () => {
        this.setAndEmitConnectionState(W.Reconnecting) && this.emit(P.Reconnecting);
      }).on(_.DCBufferStatusChanged, (e, t) => {
        this.emit(P.DCBufferStatusChanged, e, t);
      }).on(_.LocalTrackSubscribed, (e) => {
        this.handleLocalTrackSubscribed(e);
      }).on(_.RoomMoved, (e) => {
        this.log.debug("room moved", e), e.room && this.handleRoomUpdate(e.room), this.remoteParticipants.forEach((t, n) => {
          this.handleParticipantDisconnected(n, t);
        }), this.emit(P.Moved, e.room.name), e.participant ? this.handleParticipantUpdates([e.participant, ...e.otherParticipants]) : this.handleParticipantUpdates(e.otherParticipants);
      }).on(_.PublishDataTrackResponse, (e) => {
        if (!e.info) {
          this.log.warn("received PublishDataTrackResponse, but event.info was ".concat(e.info, ", so skipping."), this.logContext);
          return;
        }
        this.outgoingDataTrackManager.receivedSfuPublishResponse(e.info.pubHandle, {
          type: "ok",
          data: {
            sid: e.info.sid,
            pubHandle: e.info.pubHandle,
            name: e.info.name,
            usesE2ee: e.info.encryption !== J.NONE
          }
        });
      }).on(_.UnPublishDataTrackResponse, (e) => {
        if (!e.info) {
          this.log.warn("received UnPublishDataTrackResponse, but event.info was ".concat(e.info, ", so skipping."), this.logContext);
          return;
        }
        this.outgoingDataTrackManager.receivedSfuUnpublishResponse(e.info.pubHandle);
      }).on(_.DataTrackSubscriberHandles, (e) => {
        const t = new Map(Object.entries(e.subHandles).map((n) => {
          let [s, r] = n;
          return [parseInt(s, 10), r.trackSid];
        }));
        this.incomingDataTrackManager.receivedSfuSubscriberHandles(t);
      }).on(_.DataTrackPacketReceived, (e) => {
        try {
          this.incomingDataTrackManager.packetReceived(e);
        } catch (t) {
          throw t;
        }
      }).on(_.Joined, (e) => {
        const t = new Map(e.otherParticipants.map((n) => [n.identity, n.dataTracks.map((s) => ei.from(s))]));
        this.incomingDataTrackManager.receiveSfuPublicationUpdates(t);
      }), this.localParticipant && this.localParticipant.setupEngine(this.engine), this.e2eeManager && this.e2eeManager.setupEngine(this.engine), this.outgoingDataStreamManager && this.outgoingDataStreamManager.setupEngine(this.engine));
    }
    /**
     * getLocalDevices abstracts navigator.mediaDevices.enumerateDevices.
     * In particular, it requests device permissions by default if needed
     * and makes sure the returned device does not consist of dummy devices
     * @param kind
     * @returns a list of available local devices
     */
    static getLocalDevices(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      return oe.getInstance().getDevices(e, t);
    }
    /**
     * prepareConnection should be called as soon as the page is loaded, in order
     * to speed up the connection attempt. This function will
     * - perform DNS resolution and pre-warm the DNS cache
     * - establish TLS connection and cache TLS keys
     *
     * With LiveKit Cloud, it will also determine the best edge data center for
     * the current client to connect to if a token is provided.
     */
    prepareConnection(e, t) {
      return m(this, void 0, void 0, function* () {
        if (this.state === W.Disconnected) {
          this.log.debug("prepareConnection to ".concat(e), this.logContext);
          try {
            if (Jt(new URL(e)) && t) {
              this.regionUrlProvider = new V(e, t);
              const n = yield this.regionUrlProvider.getNextBestRegionUrl();
              n && this.state === W.Disconnected && (this.regionUrl = n, yield fetch(bn(n), {
                method: "HEAD"
              }), this.log.debug("prepared connection to ".concat(n), this.logContext));
            } else
              yield fetch(bn(e), {
                method: "HEAD"
              });
          } catch (n) {
            this.log.warn("could not prepare connection", Object.assign(Object.assign({}, this.logContext), {
              error: n
            }));
          }
        }
      });
    }
    /**
     * retrieves a participant by identity
     * @param identity
     * @returns
     */
    getParticipantByIdentity(e) {
      return this.localParticipant.identity === e ? this.localParticipant : this.remoteParticipants.get(e);
    }
    clearConnectionFutures() {
      this.connectFuture = void 0;
    }
    /**
     * @internal for testing
     */
    simulateScenario(e, t) {
      return m(this, void 0, void 0, function* () {
        let n = () => m(this, void 0, void 0, function* () {
        }), s;
        switch (e) {
          case "signal-reconnect":
            yield this.engine.client.handleOnClose("simulate disconnect");
            break;
          case "fail-on-v1-path":
            this.engine.failNextV1Path();
            break;
          case "speaker":
            s = new Ke({
              scenario: {
                case: "speakerUpdate",
                value: 3
              }
            });
            break;
          case "node-failure":
            s = new Ke({
              scenario: {
                case: "nodeFailure",
                value: true
              }
            });
            break;
          case "server-leave":
            s = new Ke({
              scenario: {
                case: "serverLeave",
                value: true
              }
            });
            break;
          case "migration":
            s = new Ke({
              scenario: {
                case: "migration",
                value: true
              }
            });
            break;
          case "resume-reconnect":
            this.engine.failNext(), yield this.engine.client.handleOnClose("simulate resume-disconnect");
            break;
          case "disconnect-signal-on-resume":
            n = () => m(this, void 0, void 0, function* () {
              yield this.engine.client.handleOnClose("simulate resume-disconnect");
            }), s = new Ke({
              scenario: {
                case: "disconnectSignalOnResume",
                value: true
              }
            });
            break;
          case "disconnect-signal-on-resume-no-messages":
            n = () => m(this, void 0, void 0, function* () {
              yield this.engine.client.handleOnClose("simulate resume-disconnect");
            }), s = new Ke({
              scenario: {
                case: "disconnectSignalOnResumeNoMessages",
                value: true
              }
            });
            break;
          case "full-reconnect":
            this.engine.fullReconnectOnNext = true, yield this.engine.client.handleOnClose("simulate full-reconnect");
            break;
          case "force-tcp":
          case "force-tls":
            s = new Ke({
              scenario: {
                case: "switchCandidateProtocol",
                value: e === "force-tls" ? 2 : 1
              }
            }), n = () => m(this, void 0, void 0, function* () {
              const r = this.engine.client.onLeave;
              r && r(new di({
                reason: qe.CLIENT_INITIATED,
                action: Bt.RECONNECT
              }));
            });
            break;
          case "subscriber-bandwidth":
            if (t === void 0 || typeof t != "number")
              throw new Error("subscriber-bandwidth requires a number as argument");
            s = new Ke({
              scenario: {
                case: "subscriberBandwidth",
                value: bt(t)
              }
            });
            break;
          case "leave-full-reconnect":
            s = new Ke({
              scenario: {
                case: "leaveRequestFullReconnect",
                value: true
              }
            });
        }
        s && (yield this.engine.client.sendSimulateScenario(s), yield n());
      });
    }
    /**
     * Returns true if audio playback is enabled
     */
    get canPlaybackAudio() {
      return this.audioEnabled;
    }
    /**
     * Returns true if video playback is enabled
     */
    get canPlaybackVideo() {
      return !this.isVideoPlaybackBlocked;
    }
    getActiveDevice(e) {
      return this.localParticipant.activeDeviceMap.get(e);
    }
    /**
     * Switches all active devices used in this room to the given device.
     *
     * Note: setting AudioOutput is not supported on some browsers. See [setSinkId](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId#browser_compatibility)
     *
     * @param kind use `videoinput` for camera track,
     *  `audioinput` for microphone track,
     *  `audiooutput` to set speaker for all incoming audio tracks
     * @param deviceId
     */
    switchActiveDevice(e, t) {
      return m(this, arguments, void 0, function(n, s) {
        var r = this;
        let a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
        return (function* () {
          var o, d, c, l, u, h, f;
          let v = true, g = false;
          const T = a ? {
            exact: s
          } : s;
          if (n === "audioinput") {
            g = r.localParticipant.audioTrackPublications.size === 0;
            const k = (o = r.getActiveDevice(n)) !== null && o !== void 0 ? o : r.options.audioCaptureDefaults.deviceId;
            r.options.audioCaptureDefaults.deviceId = T;
            const w = Array.from(r.localParticipant.audioTrackPublications.values()).filter((b) => b.source === C.Source.Microphone);
            try {
              v = (yield Promise.all(w.map((b) => {
                var y;
                return (y = b.audioTrack) === null || y === void 0 ? void 0 : y.setDeviceId(T);
              }))).every((b) => b === !0);
            } catch (b) {
              throw r.options.audioCaptureDefaults.deviceId = k, b;
            }
            const O = w.some((b) => {
              var y, S;
              return (S = (y = b.track) === null || y === void 0 ? void 0 : y.isMuted) !== null && S !== void 0 ? S : false;
            });
            v && O && (g = true);
          } else if (n === "videoinput") {
            g = r.localParticipant.videoTrackPublications.size === 0;
            const k = (d = r.getActiveDevice(n)) !== null && d !== void 0 ? d : r.options.videoCaptureDefaults.deviceId;
            r.options.videoCaptureDefaults.deviceId = T;
            const w = Array.from(r.localParticipant.videoTrackPublications.values()).filter((b) => b.source === C.Source.Camera);
            try {
              v = (yield Promise.all(w.map((b) => {
                var y;
                return (y = b.videoTrack) === null || y === void 0 ? void 0 : y.setDeviceId(T);
              }))).every((b) => b === !0);
            } catch (b) {
              throw r.options.videoCaptureDefaults.deviceId = k, b;
            }
            const O = w.some((b) => {
              var y, S;
              return (S = (y = b.track) === null || y === void 0 ? void 0 : y.isMuted) !== null && S !== void 0 ? S : false;
            });
            v && O && (g = true);
          } else if (n === "audiooutput") {
            if (g = true, !Zn() && !r.options.webAudioMix || r.options.webAudioMix && r.audioContext && !("setSinkId" in r.audioContext))
              throw new Error("cannot switch audio output, the current browser does not support it");
            r.options.webAudioMix && (s = (c = yield oe.getInstance().normalizeDeviceId("audiooutput", s)) !== null && c !== void 0 ? c : ""), (l = (f = r.options).audioOutput) !== null && l !== void 0 || (f.audioOutput = {});
            const k = (u = r.getActiveDevice(n)) !== null && u !== void 0 ? u : r.options.audioOutput.deviceId;
            r.options.audioOutput.deviceId = s;
            try {
              r.options.webAudioMix && ((h = r.audioContext) === null || h === void 0 || h.setSinkId(s)), yield Promise.all(Array.from(r.remoteParticipants.values()).map((w) => w.setAudioOutput({
                deviceId: s
              })));
            } catch (w) {
              throw r.options.audioOutput.deviceId = k, w;
            }
          }
          return g && (r.localParticipant.activeDeviceMap.set(n, s), r.emit(P.ActiveDeviceChanged, n, s)), v;
        })();
      });
    }
    setupLocalParticipantEvents() {
      this.localParticipant.on(I.ParticipantMetadataChanged, this.onLocalParticipantMetadataChanged).on(I.ParticipantNameChanged, this.onLocalParticipantNameChanged).on(I.AttributesChanged, this.onLocalAttributesChanged).on(I.TrackMuted, this.onLocalTrackMuted).on(I.TrackUnmuted, this.onLocalTrackUnmuted).on(I.LocalTrackPublished, this.onLocalTrackPublished).on(I.LocalTrackUnpublished, this.onLocalTrackUnpublished).on(I.ConnectionQualityChanged, this.onLocalConnectionQualityChanged).on(I.MediaDevicesError, this.onMediaDevicesError).on(I.AudioStreamAcquired, this.startAudio).on(I.ChatMessage, this.onLocalChatMessageSent).on(I.ParticipantPermissionsChanged, this.onLocalParticipantPermissionsChanged);
    }
    recreateEngine(e) {
      const t = this.engine;
      e && t && !t.client.isDisconnected ? t.client.sendLeave().finally(() => t.close()) : t == null || t.close(), this.engine = void 0, this.isResuming = false, this.remoteParticipants.clear(), this.sidToIdentity.clear(), this.bufferedEvents = [], this.maybeCreateEngine();
    }
    onTrackAdded(e, t, n) {
      if (this.state === W.Connecting || this.state === W.Reconnecting) {
        const u = () => {
          this.log.debug("deferring on track for later", {
            mediaTrackId: e.id,
            mediaStreamId: t.id,
            tracksInStream: t.getTracks().map((f) => f.id)
          }), this.onTrackAdded(e, t, n), h();
        }, h = () => {
          this.off(P.Reconnected, u), this.off(P.Connected, u), this.off(P.Disconnected, h);
        };
        this.once(P.Reconnected, u), this.once(P.Connected, u), this.once(P.Disconnected, h);
        return;
      }
      if (this.state === W.Disconnected) {
        this.log.warn("skipping incoming track after Room disconnected", this.logContext);
        return;
      }
      if (e.readyState === "ended") {
        this.log.info("skipping incoming track as it already ended", this.logContext);
        return;
      }
      const s = Pu(t.id), r = s[0];
      let a = s[1], o = e.id;
      if (a && a.startsWith("TR") && (o = a), r === this.localParticipant.sid) {
        this.log.warn("tried to create RemoteParticipant for local participant", this.logContext);
        return;
      }
      const d = Array.from(this.remoteParticipants.values()).find((u) => u.sid === r);
      if (!d) {
        r.startsWith("PA") && this.log.error("Tried to add a track for a participant, that's not present. Sid: ".concat(r), this.logContext);
        return;
      }
      if (!o.startsWith("TR")) {
        const u = this.engine.getTrackIdForReceiver(n);
        if (!u) {
          this.log.error("Tried to add a track whose 'sid' could not be found for a participant, that's not present. Sid: ".concat(r), this.logContext);
          return;
        }
        o = u;
      }
      o.startsWith("TR") || this.log.warn("Tried to add a track whose 'sid' could not be determined for a participant, that's not present. Sid: ".concat(r, ", streamId: ").concat(a, ", trackId: ").concat(o), Object.assign(Object.assign({}, this.logContext), {
        remoteParticipantID: r,
        streamId: a,
        trackId: o
      }));
      let c;
      this.options.adaptiveStream && (typeof this.options.adaptiveStream == "object" ? c = this.options.adaptiveStream : c = {});
      const l = d.addSubscribedMediaTrack(e, o, t, n, c);
      l != null && l.isEncrypted && !this.e2eeManager && this.emit(P.EncryptionError, new Error("Encrypted ".concat(l.source, " track received from participant ").concat(d.sid, ", but room does not have encryption enabled!")));
    }
    handleLocalTrackSubscribed(e) {
      const t = () => this.localParticipant.getTrackPublications().find((d) => {
        let {
          trackSid: c
        } = d;
        return c === e;
      }), n = t();
      if (n) {
        this.emitLocalTrackSubscribed(n);
        return;
      }
      this.log.debug("deferring LocalTrackSubscribed, publication not yet available", Object.assign(Object.assign({}, this.logContext), {
        subscribedSid: e
      }));
      const s = 1e4;
      let r;
      const a = (d) => {
        d.trackSid === e && (o(), this.emitLocalTrackSubscribed(d));
      }, o = () => {
        clearTimeout(r), this.localParticipant.off(I.LocalTrackPublished, a), this.off(P.Disconnected, o);
      };
      this.localParticipant.on(I.LocalTrackPublished, a), this.once(P.Disconnected, o), r = setTimeout(() => {
        o();
        const d = t();
        d ? this.emitLocalTrackSubscribed(d) : this.log.warn("could not find local track publication for LocalTrackSubscribed event after timeout", Object.assign(Object.assign({}, this.logContext), {
          subscribedSid: e
        }));
      }, s);
    }
    emitLocalTrackSubscribed(e) {
      this.localParticipant.emit(I.LocalTrackSubscribed, e), this.emitWhenConnected(P.LocalTrackSubscribed, e, this.localParticipant);
    }
    handleDisconnect() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true, t = arguments.length > 1 ? arguments[1] : void 0;
      var n, s;
      if (this.clearConnectionReconcile(), this.isResuming = false, this.bufferedEvents = [], this.transcriptionReceivedTimes.clear(), this.incomingDataStreamManager.clearControllers(), this.state !== W.Disconnected) {
        this.regionUrl = void 0, this.regionUrlProvider && this.regionUrlProvider.notifyDisconnected();
        try {
          this.remoteParticipants.forEach((r) => {
            r.trackPublications.forEach((a) => {
              r.unpublishTrack(a.trackSid);
            });
          }), this.localParticipant.trackPublications.forEach((r) => {
            var a, o, d;
            r.track && this.localParticipant.unpublishTrack(r.track, e), e ? ((a = r.track) === null || a === void 0 || a.detach(), (o = r.track) === null || o === void 0 || o.stop()) : (d = r.track) === null || d === void 0 || d.stopMonitor();
          }), this.localParticipant.off(I.ParticipantMetadataChanged, this.onLocalParticipantMetadataChanged).off(I.ParticipantNameChanged, this.onLocalParticipantNameChanged).off(I.AttributesChanged, this.onLocalAttributesChanged).off(I.TrackMuted, this.onLocalTrackMuted).off(I.TrackUnmuted, this.onLocalTrackUnmuted).off(I.LocalTrackPublished, this.onLocalTrackPublished).off(I.LocalTrackUnpublished, this.onLocalTrackUnpublished).off(I.ConnectionQualityChanged, this.onLocalConnectionQualityChanged).off(I.MediaDevicesError, this.onMediaDevicesError).off(I.AudioStreamAcquired, this.startAudio).off(I.ChatMessage, this.onLocalChatMessageSent).off(I.ParticipantPermissionsChanged, this.onLocalParticipantPermissionsChanged), this.localParticipant.trackPublications.clear(), this.localParticipant.videoTrackPublications.clear(), this.localParticipant.audioTrackPublications.clear(), this.remoteParticipants.clear(), this.sidToIdentity.clear(), this.activeSpeakers = [], this.audioContext && typeof this.options.webAudioMix == "boolean" && (this.audioContext.close(), this.audioContext = void 0), Te() && (window.removeEventListener("beforeunload", this.onPageLeave), window.removeEventListener("pagehide", this.onPageLeave), window.removeEventListener("freeze", this.onPageLeave), (s = (n = navigator.mediaDevices) === null || n === void 0 ? void 0 : n.removeEventListener) === null || s === void 0 || s.call(n, "devicechange", this.handleDeviceChange));
        } finally {
          this.setAndEmitConnectionState(W.Disconnected), this.emit(P.Disconnected, t);
        }
      }
    }
    handleParticipantDisconnected(e, t) {
      var n;
      this.remoteParticipants.delete(e), t && (this.incomingDataStreamManager.validateParticipantHasNoActiveDataStreams(e), this.incomingDataTrackManager.handleRemoteParticipantDisconnected(e), t.trackPublications.forEach((s) => {
        t.unpublishTrack(s.trackSid, true);
      }), this.emit(P.ParticipantDisconnected, t), t.setDisconnected(), (n = this.localParticipant) === null || n === void 0 || n.handleParticipantDisconnected(t.identity));
    }
    handleIncomingRpcRequest(e, t, n, s, r, a) {
      return m(this, void 0, void 0, function* () {
        if (yield this.engine.publishRpcAck(e, t), a !== 1) {
          yield this.engine.publishRpcResponse(e, t, null, Z.builtIn("UNSUPPORTED_VERSION"));
          return;
        }
        const o = this.rpcHandlers.get(n);
        if (!o) {
          yield this.engine.publishRpcResponse(e, t, null, Z.builtIn("UNSUPPORTED_METHOD"));
          return;
        }
        let d = null, c = null;
        try {
          const l = yield o({
            requestId: t,
            callerIdentity: e,
            payload: s,
            responseTimeout: r
          });
          sr(l) > Cc ? (d = Z.builtIn("RESPONSE_PAYLOAD_TOO_LARGE"), this.log.warn("RPC Response payload too large for ".concat(n))) : c = l;
        } catch (l) {
          l instanceof Z ? d = l : (this.log.warn("Uncaught error returned by RPC handler for ".concat(n, ". Returning APPLICATION_ERROR instead."), l), d = Z.builtIn("APPLICATION_ERROR"));
        }
        yield this.engine.publishRpcResponse(e, t, c, d);
      });
    }
    /**
     * attempt to select the default devices if the previously selected devices are no longer available after a device change event
     */
    selectDefaultDevices() {
      return m(this, void 0, void 0, function* () {
        var e, t, n;
        const s = oe.getInstance().previousDevices, r = yield oe.getInstance().getDevices(void 0, false), a = Ce();
        if ((a == null ? void 0 : a.name) === "Chrome" && a.os !== "iOS")
          for (let d of r) {
            const c = s.find((l) => l.deviceId === d.deviceId);
            c && c.label !== "" && c.kind === d.kind && c.label !== d.label && this.getActiveDevice(d.kind) === "default" && this.emit(P.ActiveDeviceChanged, d.kind, d.deviceId);
          }
        const o = ["audiooutput", "audioinput", "videoinput"];
        for (let d of o) {
          const c = bu(d), l = this.localParticipant.getTrackPublication(c);
          if (l && (!((e = l.track) === null || e === void 0) && e.isUserProvided))
            continue;
          const u = r.filter((f) => f.kind === d), h = this.getActiveDevice(d);
          if (h === ((t = s.filter((f) => f.kind === d)[0]) === null || t === void 0 ? void 0 : t.deviceId) && u.length > 0 && ((n = u[0]) === null || n === void 0 ? void 0 : n.deviceId) !== h) {
            yield this.switchActiveDevice(d, u[0].deviceId);
            continue;
          }
          d === "audioinput" && !vn() || d === "videoinput" || u.length > 0 && !u.find((f) => f.deviceId === this.getActiveDevice(d)) && // avoid switching audio output on safari without explicit user action as it leads to slowed down audio playback
          (d !== "audiooutput" || !vn()) && (yield this.switchActiveDevice(d, u[0].deviceId));
        }
      });
    }
    acquireAudioContext() {
      return m(this, void 0, void 0, function* () {
        var e, t;
        if (typeof this.options.webAudioMix != "boolean" && this.options.webAudioMix.audioContext ? this.audioContext = this.options.webAudioMix.audioContext : (!this.audioContext || this.audioContext.state === "closed") && (this.audioContext = (e = Ys()) !== null && e !== void 0 ? e : void 0), this.options.webAudioMix && this.remoteParticipants.forEach((s) => s.setAudioContext(this.audioContext)), this.localParticipant.setAudioContext(this.audioContext), this.audioContext && this.audioContext.state === "suspended")
          try {
            yield Promise.race([this.audioContext.resume(), he(200)]);
          } catch (s) {
            this.log.warn("Could not resume audio context", Object.assign(Object.assign({}, this.logContext), {
              error: s
            }));
          }
        const n = ((t = this.audioContext) === null || t === void 0 ? void 0 : t.state) === "running";
        n !== this.canPlaybackAudio && (this.audioEnabled = n, this.emit(P.AudioPlaybackStatusChanged, n));
      });
    }
    createParticipant(e, t) {
      var n;
      let s;
      return t ? s = ni.fromParticipantInfo(this.engine.client, t, {
        loggerContextCb: () => this.logContext,
        loggerName: this.options.loggerName
      }, this.incomingDataTrackManager) : s = new ni(this.engine.client, "", e, void 0, void 0, void 0, {
        loggerContextCb: () => this.logContext,
        loggerName: this.options.loggerName
      }), this.options.webAudioMix && s.setAudioContext(this.audioContext), !((n = this.options.audioOutput) === null || n === void 0) && n.deviceId && s.setAudioOutput(this.options.audioOutput).catch((r) => this.log.warn("Could not set audio output: ".concat(r.message), this.logContext)), s;
    }
    getOrCreateParticipant(e, t) {
      if (this.remoteParticipants.has(e)) {
        const s = this.remoteParticipants.get(e);
        return t && s.updateInfo(t) && this.sidToIdentity.set(t.sid, t.identity), s;
      }
      const n = this.createParticipant(e, t);
      return this.remoteParticipants.set(e, n), this.sidToIdentity.set(t.sid, t.identity), this.emitWhenConnected(P.ParticipantConnected, n), n.on(I.TrackPublished, (s) => {
        this.emitWhenConnected(P.TrackPublished, s, n);
      }).on(I.TrackSubscribed, (s, r) => {
        s.kind === C.Kind.Audio ? (s.on(R.AudioPlaybackStarted, this.handleAudioPlaybackStarted), s.on(R.AudioPlaybackFailed, this.handleAudioPlaybackFailed)) : s.kind === C.Kind.Video && (s.on(R.VideoPlaybackFailed, this.handleVideoPlaybackFailed), s.on(R.VideoPlaybackStarted, this.handleVideoPlaybackStarted)), this.emitWhenConnected(P.TrackSubscribed, s, r, n);
      }).on(I.TrackUnpublished, (s) => {
        this.emit(P.TrackUnpublished, s, n);
      }).on(I.TrackUnsubscribed, (s, r) => {
        this.emit(P.TrackUnsubscribed, s, r, n);
      }).on(I.TrackMuted, (s) => {
        this.emitWhenConnected(P.TrackMuted, s, n);
      }).on(I.TrackUnmuted, (s) => {
        this.emitWhenConnected(P.TrackUnmuted, s, n);
      }).on(I.ParticipantMetadataChanged, (s) => {
        this.emitWhenConnected(P.ParticipantMetadataChanged, s, n);
      }).on(I.ParticipantNameChanged, (s) => {
        this.emitWhenConnected(P.ParticipantNameChanged, s, n);
      }).on(I.AttributesChanged, (s) => {
        this.emitWhenConnected(P.ParticipantAttributesChanged, s, n);
      }).on(I.ConnectionQualityChanged, (s) => {
        this.emitWhenConnected(P.ConnectionQualityChanged, s, n);
      }).on(I.ParticipantPermissionsChanged, (s) => {
        this.emitWhenConnected(P.ParticipantPermissionsChanged, s, n);
      }).on(I.TrackSubscriptionStatusChanged, (s, r) => {
        this.emitWhenConnected(P.TrackSubscriptionStatusChanged, s, r, n);
      }).on(I.TrackSubscriptionFailed, (s, r) => {
        this.emit(P.TrackSubscriptionFailed, s, n, r);
      }).on(I.TrackSubscriptionPermissionChanged, (s, r) => {
        this.emitWhenConnected(P.TrackSubscriptionPermissionChanged, s, r, n);
      }).on(I.Active, () => {
        this.emitWhenConnected(P.ParticipantActive, n), n.kind === fn.AGENT && this.localParticipant.setActiveAgent(n);
      }), t && n.updateInfo(t), n;
    }
    sendSyncState() {
      const e = Array.from(this.remoteParticipants.values()).reduce((s, r) => (s.push(...r.getTrackPublications()), s), []), t = this.localParticipant.getTrackPublications(), n = this.outgoingDataTrackManager.queryPublished();
      this.engine.sendSyncState(e, t, n);
    }
    /**
     * After resuming, we'll need to notify the server of the current
     * subscription settings.
     */
    updateSubscriptions() {
      for (const e of this.remoteParticipants.values())
        for (const t of e.videoTrackPublications.values())
          t.isSubscribed && Bu(t) && t.emitTrackUpdate();
    }
    getRemoteParticipantBySid(e) {
      const t = this.sidToIdentity.get(e);
      if (t)
        return this.remoteParticipants.get(t);
    }
    registerConnectionReconcile() {
      this.clearConnectionReconcile();
      let e = 0;
      this.connectionReconcileInterval = se.setInterval(() => {
        // ensure we didn't tear it down
        !this.engine || // engine detected close, but Room missed it
        this.engine.isClosed || // transports failed without notifying engine
        !this.engine.verifyTransport() ? (e++, this.log.warn("detected connection state mismatch", Object.assign(Object.assign({}, this.logContext), {
          numFailures: e,
          engine: this.engine ? {
            closed: this.engine.isClosed,
            transportsConnectedOrConnecting: this.engine.verifyTransport()
          } : void 0
        })), e >= 3 && (this.recreateEngine(), this.handleDisconnect(this.options.stopLocalTrackOnUnpublish, qe.STATE_MISMATCH))) : e = 0;
      }, wf);
    }
    clearConnectionReconcile() {
      this.connectionReconcileInterval && se.clearInterval(this.connectionReconcileInterval);
    }
    setAndEmitConnectionState(e) {
      return e === this.state ? false : (this.state = e, this.incomingDataStreamManager.setConnected(e === W.Connected), this.emit(P.ConnectionStateChanged, this.state), true);
    }
    emitBufferedEvents() {
      this.bufferedEvents.forEach((e) => {
        let [t, n] = e;
        this.emit(t, ...n);
      }), this.bufferedEvents = [];
    }
    emitWhenConnected(e) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
        n[s - 1] = arguments[s];
      if (this.state === W.Reconnecting || this.isResuming || !this.engine || this.engine.pendingReconnect)
        this.bufferedEvents.push([e, n]);
      else if (this.state === W.Connected)
        return this.emit(e, ...n);
      return false;
    }
    /**
     * Allows to populate a room with simulated participants.
     * No actual connection to a server will be established, all state is
     * @experimental
     */
    simulateParticipants(e) {
      return m(this, void 0, void 0, function* () {
        var t, n, s, r;
        const a = Object.assign({
          audio: true,
          video: true,
          useRealTracks: false
        }, e.publish), o = Object.assign({
          count: 9,
          audio: false,
          video: true,
          aspectRatios: [1.66, 1.7, 1.3]
        }, e.participants);
        if (this.handleDisconnect(), this.roomInfo = new si({
          sid: "RM_SIMULATED",
          name: "simulated-room",
          emptyTimeout: 0,
          maxParticipants: 0,
          creationTime: Y.parse((/* @__PURE__ */ new Date()).getTime()),
          metadata: "",
          numParticipants: 1,
          numPublishers: 1,
          turnPassword: "",
          enabledCodecs: [],
          activeRecording: false
        }), this.localParticipant.updateInfo(new Ot({
          identity: "simulated-local",
          name: "local-name"
        })), this.setupLocalParticipantEvents(), this.emit(P.SignalConnected), this.emit(P.Connected), this.setAndEmitConnectionState(W.Connected), a.video) {
          const d = new _s(C.Kind.Video, new Lt({
            source: ie.CAMERA,
            sid: Math.floor(Math.random() * 1e4).toString(),
            type: Ne.AUDIO,
            name: "video-dummy"
          }), new kn(a.useRealTracks && (!((t = window.navigator.mediaDevices) === null || t === void 0) && t.getUserMedia) ? (yield window.navigator.mediaDevices.getUserMedia({
            video: true
          })).getVideoTracks()[0] : bs(160 * ((n = o.aspectRatios[0]) !== null && n !== void 0 ? n : 1), 160, true, true), void 0, false, {
            loggerName: this.options.loggerName,
            loggerContextCb: () => this.logContext
          }), {
            loggerName: this.options.loggerName,
            loggerContextCb: () => this.logContext
          });
          this.localParticipant.addTrackPublication(d), this.localParticipant.emit(I.LocalTrackPublished, d);
        }
        if (a.audio) {
          const d = new _s(C.Kind.Audio, new Lt({
            source: ie.MICROPHONE,
            sid: Math.floor(Math.random() * 1e4).toString(),
            type: Ne.AUDIO
          }), new yn(a.useRealTracks && (!((s = navigator.mediaDevices) === null || s === void 0) && s.getUserMedia) ? (yield navigator.mediaDevices.getUserMedia({
            audio: true
          })).getAudioTracks()[0] : ji(), void 0, false, this.audioContext, {
            loggerName: this.options.loggerName,
            loggerContextCb: () => this.logContext
          }), {
            loggerName: this.options.loggerName,
            loggerContextCb: () => this.logContext
          });
          this.localParticipant.addTrackPublication(d), this.localParticipant.emit(I.LocalTrackPublished, d);
        }
        for (let d = 0; d < o.count - 1; d += 1) {
          let c = new Ot({
            sid: Math.floor(Math.random() * 1e4).toString(),
            identity: "simulated-".concat(d),
            state: Ft.ACTIVE,
            tracks: [],
            joinedAt: Y.parse(Date.now())
          });
          const l = this.getOrCreateParticipant(c.identity, c);
          if (o.video) {
            const u = bs(160 * ((r = o.aspectRatios[d % o.aspectRatios.length]) !== null && r !== void 0 ? r : 1), 160, false, true), h = new Lt({
              source: ie.CAMERA,
              sid: Math.floor(Math.random() * 1e4).toString(),
              type: Ne.AUDIO
            });
            l.addSubscribedMediaTrack(u, h.sid, new MediaStream([u]), new RTCRtpReceiver()), c.tracks = [...c.tracks, h];
          }
          if (o.audio) {
            const u = ji(), h = new Lt({
              source: ie.MICROPHONE,
              sid: Math.floor(Math.random() * 1e4).toString(),
              type: Ne.AUDIO
            });
            l.addSubscribedMediaTrack(u, h.sid, new MediaStream([u]), new RTCRtpReceiver()), c.tracks = [...c.tracks, h];
          }
          l.updateInfo(c);
        }
      });
    }
    // /** @internal */
    emit(e) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++)
        n[s - 1] = arguments[s];
      if (e !== P.ActiveSpeakersChanged && e !== P.TranscriptionReceived) {
        const r = Fc(n).filter((a) => a !== void 0);
        (e === P.TrackSubscribed || e === P.TrackUnsubscribed) && this.log.trace("subscribe trace: ".concat(e), Object.assign(Object.assign({}, this.logContext), {
          event: e,
          args: r
        })), this.log.debug("room event ".concat(e), Object.assign(Object.assign({}, this.logContext), {
          event: e,
          args: r
        }));
      }
      return super.emit(e, ...n);
    }
  }
  En.cleanupRegistry = typeof FinalizationRegistry < "u" && new FinalizationRegistry((i) => {
    i();
  });
  function Fc(i) {
    return i.map((e) => {
      if (e)
        return Array.isArray(e) ? Fc(e) : typeof e == "object" ? "logContext" in e ? e.logContext : void 0 : e;
    });
  }
  class Pf {
    static toAgentAttributes(e) {
      return JSON.parse(e);
    }
    static agentAttributesToJson(e) {
      return JSON.stringify(e);
    }
    static toTranscriptionAttributes(e) {
      return JSON.parse(e);
    }
    static transcriptionAttributesToJson(e) {
      return JSON.stringify(e);
    }
  }
  var Um = /* @__PURE__ */ Object.freeze({ __proto__: null, Convert: Pf }), Ae;
  (function(i) {
    i[i.IDLE = 0] = "IDLE", i[i.RUNNING = 1] = "RUNNING", i[i.SKIPPED = 2] = "SKIPPED", i[i.SUCCESS = 3] = "SUCCESS", i[i.FAILED = 4] = "FAILED";
  })(Ae || (Ae = {}));
  class gt extends Ie.EventEmitter {
    constructor(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      super(), this.status = Ae.IDLE, this.logs = [], this.options = {}, this.url = e, this.token = t, this.name = this.constructor.name, this.room = new En(n.roomOptions), this.connectOptions = n.connectOptions, this.options = n;
    }
    run(e) {
      return m(this, void 0, void 0, function* () {
        if (this.status !== Ae.IDLE)
          throw Error("check is running already");
        this.setStatus(Ae.RUNNING);
        try {
          yield this.perform();
        } catch (t) {
          t instanceof Error && (this.options.errorsAsWarnings ? this.appendWarning(t.message) : this.appendError(t.message));
        }
        return yield this.disconnect(), yield new Promise((t) => setTimeout(t, 500)), this.status !== Ae.SKIPPED && this.setStatus(this.isSuccess() ? Ae.SUCCESS : Ae.FAILED), e && e(), this.getInfo();
      });
    }
    isSuccess() {
      return !this.logs.some((e) => e.level === "error");
    }
    connect(e) {
      return m(this, void 0, void 0, function* () {
        return this.room.state === W.Connected ? this.room : (e || (e = this.url), yield this.room.connect(e, this.token, this.connectOptions), this.room);
      });
    }
    disconnect() {
      return m(this, void 0, void 0, function* () {
        this.room && this.room.state !== W.Disconnected && (yield this.room.disconnect(), yield new Promise((e) => setTimeout(e, 500)));
      });
    }
    skip() {
      this.setStatus(Ae.SKIPPED);
    }
    switchProtocol(e) {
      return m(this, void 0, void 0, function* () {
        let t = false, n = false;
        if (this.room.on(P.Reconnecting, () => {
          t = true;
        }), this.room.once(P.Reconnected, () => {
          n = true;
        }), this.room.simulateScenario("force-".concat(e)), yield new Promise((r) => setTimeout(r, 1e3)), !t)
          return;
        const s = Date.now() + 1e4;
        for (; Date.now() < s; ) {
          if (n)
            return;
          yield he(100);
        }
        throw new Error("Could not reconnect using ".concat(e, " protocol after 10 seconds"));
      });
    }
    appendMessage(e) {
      this.logs.push({
        level: "info",
        message: e
      }), this.emit("update", this.getInfo());
    }
    appendWarning(e) {
      this.logs.push({
        level: "warning",
        message: e
      }), this.emit("update", this.getInfo());
    }
    appendError(e) {
      this.logs.push({
        level: "error",
        message: e
      }), this.emit("update", this.getInfo());
    }
    setStatus(e) {
      this.status = e, this.emit("update", this.getInfo());
    }
    get engine() {
      var e;
      return (e = this.room) === null || e === void 0 ? void 0 : e.engine;
    }
    getInfo() {
      return {
        logs: this.logs,
        name: this.name,
        status: this.status,
        description: this.description
      };
    }
  }
  class _f extends gt {
    get description() {
      return "Cloud regions";
    }
    perform() {
      return m(this, void 0, void 0, function* () {
        const e = new V(this.url, this.token);
        if (!e.isCloud()) {
          this.skip();
          return;
        }
        const t = [], n = /* @__PURE__ */ new Set();
        for (let r = 0; r < 3; r++) {
          const a = yield e.getNextBestRegionUrl();
          if (!a)
            break;
          if (n.has(a))
            continue;
          n.add(a);
          const o = yield this.checkCloudRegion(a);
          this.appendMessage("".concat(o.region, " RTT: ").concat(o.rtt, "ms, duration: ").concat(o.duration, "ms")), t.push(o);
        }
        t.sort((r, a) => (r.duration - a.duration) * 0.5 + (r.rtt - a.rtt) * 0.5);
        const s = t[0];
        this.bestStats = s, this.appendMessage("best Cloud region: ".concat(s.region));
      });
    }
    getInfo() {
      const e = super.getInfo();
      return e.data = this.bestStats, e;
    }
    checkCloudRegion(e) {
      return m(this, void 0, void 0, function* () {
        var t, n;
        yield this.connect(e), this.options.protocol === "tcp" && (yield this.switchProtocol("tcp"));
        const s = (t = this.room.serverInfo) === null || t === void 0 ? void 0 : t.region;
        if (!s)
          throw new Error("Region not found");
        const r = yield this.room.localParticipant.streamText({
          topic: "test"
        }), a = 1e3, d = 1e6 / a, c = "A".repeat(a), l = Date.now();
        for (let v = 0; v < d; v++)
          yield r.write(c);
        yield r.close();
        const u = Date.now(), h = yield (n = this.room.engine.pcManager) === null || n === void 0 ? void 0 : n.publisher.getStats(), f = {
          region: s,
          rtt: 1e4,
          duration: u - l
        };
        return h == null || h.forEach((v) => {
          v.type === "candidate-pair" && v.nominated && (f.rtt = v.currentRoundTripTime * 1e3);
        }), yield this.disconnect(), f;
      });
    }
  }
  const Xi = 1e4;
  class Rf extends gt {
    get description() {
      return "Connection via UDP vs TCP";
    }
    perform() {
      return m(this, void 0, void 0, function* () {
        const e = yield this.checkConnectionProtocol("udp"), t = yield this.checkConnectionProtocol("tcp");
        this.bestStats = e, e.qualityLimitationDurations.bandwidth - t.qualityLimitationDurations.bandwidth > 0.5 || (e.packetsLost - t.packetsLost) / e.packetsSent > 0.01 ? (this.appendMessage("best connection quality via tcp"), this.bestStats = t) : this.appendMessage("best connection quality via udp");
        const n = this.bestStats;
        this.appendMessage("upstream bitrate: ".concat((n.bitrateTotal / n.count / 1e3 / 1e3).toFixed(2), " mbps")), this.appendMessage("RTT: ".concat((n.rttTotal / n.count * 1e3).toFixed(2), " ms")), this.appendMessage("jitter: ".concat((n.jitterTotal / n.count * 1e3).toFixed(2), " ms")), n.packetsLost > 0 && this.appendWarning("packets lost: ".concat((n.packetsLost / n.packetsSent * 100).toFixed(2), "%")), n.qualityLimitationDurations.bandwidth > 1 && this.appendWarning("bandwidth limited ".concat((n.qualityLimitationDurations.bandwidth / (Xi / 1e3) * 100).toFixed(2), "%")), n.qualityLimitationDurations.cpu > 0 && this.appendWarning("cpu limited ".concat((n.qualityLimitationDurations.cpu / (Xi / 1e3) * 100).toFixed(2), "%"));
      });
    }
    getInfo() {
      const e = super.getInfo();
      return e.data = this.bestStats, e;
    }
    checkConnectionProtocol(e) {
      return m(this, void 0, void 0, function* () {
        yield this.connect(), e === "tcp" ? yield this.switchProtocol("tcp") : yield this.switchProtocol("udp");
        const t = document.createElement("canvas");
        t.width = 1280, t.height = 720;
        const n = t.getContext("2d");
        if (!n)
          throw new Error("Could not get canvas context");
        let s = 0;
        const r = () => {
          s = (s + 1) % 360, n.fillStyle = "hsl(".concat(s, ", 100%, 50%)"), n.fillRect(0, 0, t.width, t.height), requestAnimationFrame(r);
        };
        r();
        const o = t.captureStream(30).getVideoTracks()[0], c = (yield this.room.localParticipant.publishTrack(o, {
          simulcast: false,
          degradationPreference: "maintain-resolution",
          videoEncoding: {
            maxBitrate: 2e6
          }
        })).track, l = {
          protocol: e,
          packetsLost: 0,
          packetsSent: 0,
          qualityLimitationDurations: {},
          rttTotal: 0,
          jitterTotal: 0,
          bitrateTotal: 0,
          count: 0
        }, u = setInterval(() => m(this, void 0, void 0, function* () {
          const h = yield c.getRTCStatsReport();
          h == null || h.forEach((f) => {
            f.type === "outbound-rtp" ? (l.packetsSent = f.packetsSent, l.qualityLimitationDurations = f.qualityLimitationDurations, l.bitrateTotal += f.targetBitrate, l.count++) : f.type === "remote-inbound-rtp" && (l.packetsLost = f.packetsLost, l.rttTotal += f.roundTripTime, l.jitterTotal += f.jitter);
          });
        }), 1e3);
        return yield new Promise((h) => setTimeout(h, Xi)), clearInterval(u), o.stop(), t.remove(), yield this.disconnect(), l;
      });
    }
  }
  class If extends gt {
    get description() {
      return "Can publish audio";
    }
    perform() {
      return m(this, void 0, void 0, function* () {
        var e;
        const t = yield this.connect(), n = yield yf();
        if (yield dc(n, 1e3))
          throw new Error("unable to detect audio from microphone");
        this.appendMessage("detected audio from microphone"), t.localParticipant.publishTrack(n), yield new Promise((o) => setTimeout(o, 3e3));
        const r = yield (e = n.sender) === null || e === void 0 ? void 0 : e.getStats();
        if (!r)
          throw new Error("Could not get RTCStats");
        let a = 0;
        if (r.forEach((o) => {
          o.type === "outbound-rtp" && (o.kind === "audio" || !o.kind && o.mediaType === "audio") && (a = o.packetsSent);
        }), a === 0)
          throw new Error("Could not determine packets are sent");
        this.appendMessage("published ".concat(a, " audio packets"));
      });
    }
  }
  class Of extends gt {
    get description() {
      return "Can publish video";
    }
    perform() {
      return m(this, void 0, void 0, function* () {
        var e;
        const t = yield this.connect(), n = yield bf();
        yield this.checkForVideo(n.mediaStreamTrack), t.localParticipant.publishTrack(n), yield new Promise((a) => setTimeout(a, 5e3));
        const s = yield (e = n.sender) === null || e === void 0 ? void 0 : e.getStats();
        if (!s)
          throw new Error("Could not get RTCStats");
        let r = 0;
        if (s.forEach((a) => {
          a.type === "outbound-rtp" && (a.kind === "video" || !a.kind && a.mediaType === "video") && (r += a.packetsSent);
        }), r === 0)
          throw new Error("Could not determine packets are sent");
        this.appendMessage("published ".concat(r, " video packets"));
      });
    }
    checkForVideo(e) {
      return m(this, void 0, void 0, function* () {
        const t = new MediaStream();
        t.addTrack(e.clone());
        const n = document.createElement("video");
        n.srcObject = t, n.muted = true, n.autoplay = true, n.playsInline = true, n.setAttribute("playsinline", "true"), document.body.appendChild(n), yield new Promise((s) => {
          n.onplay = () => {
            setTimeout(() => {
              var r, a, o, d;
              const c = document.createElement("canvas"), l = e.getSettings(), u = (a = (r = l.width) !== null && r !== void 0 ? r : n.videoWidth) !== null && a !== void 0 ? a : 1280, h = (d = (o = l.height) !== null && o !== void 0 ? o : n.videoHeight) !== null && d !== void 0 ? d : 720;
              c.width = u, c.height = h;
              const f = c.getContext("2d");
              f.drawImage(n, 0, 0);
              const g = f.getImageData(0, 0, c.width, c.height).data;
              let T = true;
              for (let k = 0; k < g.length; k += 4)
                if (g[k] !== 0 || g[k + 1] !== 0 || g[k + 2] !== 0) {
                  T = false;
                  break;
                }
              T ? this.appendError("camera appears to be producing only black frames") : this.appendMessage("received video frames"), s();
            }, 1e3);
          }, n.play();
        }), t.getTracks().forEach((s) => s.stop()), n.remove();
      });
    }
  }
  class Mf extends gt {
    get description() {
      return "Resuming connection after interruption";
    }
    perform() {
      return m(this, void 0, void 0, function* () {
        var e;
        const t = yield this.connect();
        let n = false, s = false, r;
        const a = new Promise((c) => {
          setTimeout(c, 5e3), r = c;
        }), o = () => {
          n = true;
        };
        t.on(P.SignalReconnecting, o).on(P.Reconnecting, o).on(P.Reconnected, () => {
          s = true, r(true);
        }), (e = t.engine.client.ws) === null || e === void 0 || e.close();
        const d = t.engine.client.onClose;
        if (d && d(""), yield a, n) {
          if (!s || t.state !== W.Connected)
            throw this.appendWarning("reconnection is only possible in Redis-based configurations"), new Error("Not able to reconnect");
        } else throw new Error("Did not attempt to reconnect");
      });
    }
  }
  class Df extends gt {
    get description() {
      return "Can connect via TURN";
    }
    perform() {
      return m(this, void 0, void 0, function* () {
        var e, t, n;
        Jt(new URL(this.url)) && (this.appendMessage("Using region specific url"), this.url = (e = yield new V(this.url, this.token).getNextBestRegionUrl()) !== null && e !== void 0 ? e : this.url);
        const s = new Zs(), r = yield s.join(this.url, this.token, {
          autoSubscribe: true,
          maxRetries: 0,
          e2eeEnabled: false,
          websocketTimeout: 15e3
        }, void 0, true);
        let a = false, o = false, d = false;
        for (let c of r.iceServers)
          for (let l of c.urls)
            l.startsWith("turn:") ? (o = true, d = true) : l.startsWith("turns:") && (o = true, d = true, a = true), l.startsWith("stun:") && (d = true);
        d ? o && !a && this.appendWarning("TURN is configured server side, but TURN/TLS is unavailable.") : this.appendWarning("No STUN servers configured on server side."), yield s.close(), !((n = (t = this.connectOptions) === null || t === void 0 ? void 0 : t.rtcConfig) === null || n === void 0) && n.iceServers || o ? yield this.room.connect(this.url, this.token, {
          rtcConfig: {
            iceTransportPolicy: "relay"
          }
        }) : (this.appendWarning("No TURN servers configured."), this.skip(), yield new Promise((c) => setTimeout(c, 0)));
      });
    }
  }
  class Af extends gt {
    get description() {
      return "Establishing WebRTC connection";
    }
    perform() {
      return m(this, void 0, void 0, function* () {
        let e = false, t = false;
        this.room.on(P.SignalConnected, () => {
          var n;
          const s = this.room.engine.client.onTrickle;
          this.room.engine.client.onTrickle = (r, a) => {
            if (r.candidate) {
              const o = new RTCIceCandidate(r);
              let d = "".concat(o.protocol, " ").concat(o.address, ":").concat(o.port, " ").concat(o.type);
              o.address && (xf(o.address) ? d += " (private)" : o.protocol === "tcp" && o.tcpType === "passive" ? (e = true, d += " (passive)") : o.protocol === "udp" && (t = true)), this.appendMessage(d);
            }
            s && s(r, a);
          }, !((n = this.room.engine.pcManager) === null || n === void 0) && n.subscriber && (this.room.engine.pcManager.subscriber.onIceCandidateError = (r) => {
            r instanceof RTCPeerConnectionIceErrorEvent && this.appendWarning("error with ICE candidate: ".concat(r.errorCode, " ").concat(r.errorText, " ").concat(r.url));
          });
        });
        try {
          yield this.connect(), U.info("now the room is connected");
        } catch (n) {
          throw this.appendWarning("ports need to be open on firewall in order to connect."), n;
        }
        e || this.appendWarning("Server is not configured for ICE/TCP"), t || this.appendWarning("No public IPv4 UDP candidates were found. Your server is likely not configured correctly");
      });
    }
  }
  function xf(i) {
    const e = i.split(".");
    if (e.length === 4) {
      if (e[0] === "10")
        return true;
      if (e[0] === "192" && e[1] === "168")
        return true;
      if (e[0] === "172") {
        const t = parseInt(e[1], 10);
        if (t >= 16 && t <= 31)
          return true;
      }
    }
    return false;
  }
  class Nf extends gt {
    get description() {
      return "Connecting to signal connection via WebSocket";
    }
    perform() {
      return m(this, void 0, void 0, function* () {
        var e, t, n;
        (this.url.startsWith("ws:") || this.url.startsWith("http:")) && this.appendWarning("Server is insecure, clients may block connections to it");
        let s = new Zs(), r;
        try {
          r = yield s.join(this.url, this.token, {
            autoSubscribe: !0,
            maxRetries: 0,
            e2eeEnabled: !1,
            websocketTimeout: 15e3
          }, void 0, !0);
        } catch (a) {
          if (Jt(new URL(this.url))) {
            this.appendMessage("Initial connection failed with error ".concat(a.message, ". Retrying with region fallback"));
            const d = yield new V(this.url, this.token).getNextBestRegionUrl();
            d && (r = yield s.join(d, this.token, {
              autoSubscribe: true,
              maxRetries: 0,
              e2eeEnabled: false,
              websocketTimeout: 15e3
            }, void 0, true), this.appendMessage("Fallback to region worked. To avoid initial connections failing, ensure you're calling room.prepareConnection() ahead of time"));
          }
        }
        r ? (this.appendMessage("Connected to server, version ".concat(r.serverVersion, ".")), ((e = r.serverInfo) === null || e === void 0 ? void 0 : e.edition) === so.Cloud && (!((t = r.serverInfo) === null || t === void 0) && t.region) && this.appendMessage("LiveKit Cloud: ".concat((n = r.serverInfo) === null || n === void 0 ? void 0 : n.region))) : this.appendError("Websocket connection could not be established"), yield s.close();
      });
    }
  }
  class Fm extends Ie.EventEmitter {
    constructor(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      super(), this.options = {}, this.checkResults = /* @__PURE__ */ new Map(), this.url = e, this.token = t, this.options = n;
    }
    getNextCheckId() {
      const e = this.checkResults.size;
      return this.checkResults.set(e, {
        logs: [],
        status: Ae.IDLE,
        name: "",
        description: ""
      }), e;
    }
    updateCheck(e, t) {
      this.checkResults.set(e, t), this.emit("checkUpdate", e, t);
    }
    isSuccess() {
      return Array.from(this.checkResults.values()).every((e) => e.status !== Ae.FAILED);
    }
    getResults() {
      return Array.from(this.checkResults.values());
    }
    createAndRunCheck(e) {
      return m(this, void 0, void 0, function* () {
        const t = this.getNextCheckId(), n = new e(this.url, this.token, this.options), s = (a) => {
          this.updateCheck(t, a);
        };
        n.on("update", s);
        const r = yield n.run();
        return n.off("update", s), r;
      });
    }
    checkWebsocket() {
      return m(this, void 0, void 0, function* () {
        return this.createAndRunCheck(Nf);
      });
    }
    checkWebRTC() {
      return m(this, void 0, void 0, function* () {
        return this.createAndRunCheck(Af);
      });
    }
    checkTURN() {
      return m(this, void 0, void 0, function* () {
        return this.createAndRunCheck(Df);
      });
    }
    checkReconnect() {
      return m(this, void 0, void 0, function* () {
        return this.createAndRunCheck(Mf);
      });
    }
    checkPublishAudio() {
      return m(this, void 0, void 0, function* () {
        return this.createAndRunCheck(If);
      });
    }
    checkPublishVideo() {
      return m(this, void 0, void 0, function* () {
        return this.createAndRunCheck(Of);
      });
    }
    checkConnectionProtocol() {
      return m(this, void 0, void 0, function* () {
        const e = yield this.createAndRunCheck(Rf);
        if (e.data && "protocol" in e.data) {
          const t = e.data;
          this.options.protocol = t.protocol;
        }
        return e;
      });
    }
    checkCloudRegion() {
      return m(this, void 0, void 0, function* () {
        return this.createAndRunCheck(_f);
      });
    }
  }
  class Lf {
  }
  class Uf {
  }
  function q(i, e, t) {
    return (e = Bf(e)) in i ? Object.defineProperty(i, e, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : i[e] = t, i;
  }
  function Ff(i, e) {
    if (typeof i != "object" || !i) return i;
    var t = i[Symbol.toPrimitive];
    if (t !== void 0) {
      var n = t.call(i, e);
      if (typeof n != "object") return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (e === "string" ? String : Number)(i);
  }
  function Bf(i) {
    var e = Ff(i, "string");
    return typeof e == "symbol" ? e : e + "";
  }
  new TextEncoder();
  const Rs = new TextDecoder();
  function jf(i) {
    if (Uint8Array.fromBase64)
      return Uint8Array.fromBase64(i);
    const e = atob(i), t = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++)
      t[n] = e.charCodeAt(n);
    return t;
  }
  function qf(i) {
    if (Uint8Array.fromBase64)
      return Uint8Array.fromBase64(typeof i == "string" ? i : Rs.decode(i), {
        alphabet: "base64url"
      });
    let e = i;
    e instanceof Uint8Array && (e = Rs.decode(e)), e = e.replace(/-/g, "+").replace(/_/g, "/");
    try {
      return jf(e);
    } catch {
      throw new TypeError("The input to be decoded is not correctly encoded.");
    }
  }
  class be extends Error {
    constructor(e, t) {
      var n;
      super(e, t), q(this, "code", "ERR_JOSE_GENERIC"), this.name = this.constructor.name, (n = Error.captureStackTrace) === null || n === void 0 || n.call(Error, this, this.constructor);
    }
  }
  q(be, "code", "ERR_JOSE_GENERIC");
  class Vf extends be {
    constructor(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "unspecified", s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unspecified";
      super(e, {
        cause: {
          claim: n,
          reason: s,
          payload: t
        }
      }), q(this, "code", "ERR_JWT_CLAIM_VALIDATION_FAILED"), q(this, "claim", void 0), q(this, "reason", void 0), q(this, "payload", void 0), this.claim = n, this.reason = s, this.payload = t;
    }
  }
  q(Vf, "code", "ERR_JWT_CLAIM_VALIDATION_FAILED");
  class Wf extends be {
    constructor(e, t) {
      let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "unspecified", s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unspecified";
      super(e, {
        cause: {
          claim: n,
          reason: s,
          payload: t
        }
      }), q(this, "code", "ERR_JWT_EXPIRED"), q(this, "claim", void 0), q(this, "reason", void 0), q(this, "payload", void 0), this.claim = n, this.reason = s, this.payload = t;
    }
  }
  q(Wf, "code", "ERR_JWT_EXPIRED");
  class Hf extends be {
    constructor() {
      super(...arguments), q(this, "code", "ERR_JOSE_ALG_NOT_ALLOWED");
    }
  }
  q(Hf, "code", "ERR_JOSE_ALG_NOT_ALLOWED");
  class Kf extends be {
    constructor() {
      super(...arguments), q(this, "code", "ERR_JOSE_NOT_SUPPORTED");
    }
  }
  q(Kf, "code", "ERR_JOSE_NOT_SUPPORTED");
  class Gf extends be {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "decryption operation failed", t = arguments.length > 1 ? arguments[1] : void 0;
      super(e, t), q(this, "code", "ERR_JWE_DECRYPTION_FAILED");
    }
  }
  q(Gf, "code", "ERR_JWE_DECRYPTION_FAILED");
  class Jf extends be {
    constructor() {
      super(...arguments), q(this, "code", "ERR_JWE_INVALID");
    }
  }
  q(Jf, "code", "ERR_JWE_INVALID");
  class zf extends be {
    constructor() {
      super(...arguments), q(this, "code", "ERR_JWS_INVALID");
    }
  }
  q(zf, "code", "ERR_JWS_INVALID");
  class ot extends be {
    constructor() {
      super(...arguments), q(this, "code", "ERR_JWT_INVALID");
    }
  }
  q(ot, "code", "ERR_JWT_INVALID");
  class Yf extends be {
    constructor() {
      super(...arguments), q(this, "code", "ERR_JWK_INVALID");
    }
  }
  q(Yf, "code", "ERR_JWK_INVALID");
  class Qf extends be {
    constructor() {
      super(...arguments), q(this, "code", "ERR_JWKS_INVALID");
    }
  }
  q(Qf, "code", "ERR_JWKS_INVALID");
  class Xf extends be {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "no applicable key found in the JSON Web Key Set", t = arguments.length > 1 ? arguments[1] : void 0;
      super(e, t), q(this, "code", "ERR_JWKS_NO_MATCHING_KEY");
    }
  }
  q(Xf, "code", "ERR_JWKS_NO_MATCHING_KEY");
  class $f extends be {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "multiple matching keys found in the JSON Web Key Set", t = arguments.length > 1 ? arguments[1] : void 0;
      super(e, t), q(this, Symbol.asyncIterator, void 0), q(this, "code", "ERR_JWKS_MULTIPLE_MATCHING_KEYS");
    }
  }
  q($f, "code", "ERR_JWKS_MULTIPLE_MATCHING_KEYS");
  class Zf extends be {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "request timed out", t = arguments.length > 1 ? arguments[1] : void 0;
      super(e, t), q(this, "code", "ERR_JWKS_TIMEOUT");
    }
  }
  q(Zf, "code", "ERR_JWKS_TIMEOUT");
  class em extends be {
    constructor() {
      let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "signature verification failed", t = arguments.length > 1 ? arguments[1] : void 0;
      super(e, t), q(this, "code", "ERR_JWS_SIGNATURE_VERIFICATION_FAILED");
    }
  }
  q(em, "code", "ERR_JWS_SIGNATURE_VERIFICATION_FAILED");
  const tm = (i) => typeof i == "object" && i !== null;
  function nm(i) {
    if (!tm(i) || Object.prototype.toString.call(i) !== "[object Object]")
      return false;
    if (Object.getPrototypeOf(i) === null)
      return true;
    let e = i;
    for (; Object.getPrototypeOf(e) !== null; )
      e = Object.getPrototypeOf(e);
    return Object.getPrototypeOf(i) === e;
  }
  function im(i) {
    if (typeof i != "string") throw new ot("JWTs must use Compact JWS serialization, JWT must be a string");
    const {
      1: e,
      length: t
    } = i.split(".");
    if (t === 5) throw new ot("Only JWTs using Compact JWS serialization can be decoded");
    if (t !== 3) throw new ot("Invalid JWT");
    if (!e) throw new ot("JWTs must contain a payload");
    let n;
    try {
      n = qf(e);
    } catch {
      throw new ot("Failed to base64url decode the payload");
    }
    let s;
    try {
      s = JSON.parse(Rs.decode(n));
    } catch {
      throw new ot("Failed to parse the decoded payload as JSON");
    }
    if (!nm(s)) throw new ot("Invalid JWT Claims Set");
    return s;
  }
  const Is = 1e3, sm = 60 * Is;
  function rm(i) {
    const e = Bc(i.participantToken);
    if (!(e != null && e.nbf) || !(e != null && e.exp))
      return true;
    const t = /* @__PURE__ */ new Date(), n = e.nbf * Is, s = new Date(n), r = e.exp * Is, a = new Date(r - sm);
    return s <= t && a > t;
  }
  function Bc(i) {
    const e = im(i), {
      roomConfig: t
    } = e, n = Ks(e, ["roomConfig"]);
    return Object.assign(Object.assign({}, n), {
      roomConfig: e.roomConfig ? Qn.fromJson(e.roomConfig, {
        ignoreUnknownFields: true
      }) : void 0
    });
  }
  function Bm(i, e) {
    const t = /* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(e)]);
    for (const n of t)
      switch (n) {
        case "roomName":
        case "participantName":
        case "participantIdentity":
        case "participantMetadata":
        case "participantAttributes":
        case "agentName":
        case "agentMetadata":
          if (i[n] !== e[n])
            return false;
          break;
        default:
          const s = n;
          throw new Error("Options key ".concat(s, " not being checked for equality!"));
      }
    return true;
  }
  class jc extends Uf {
    constructor() {
      super(...arguments), this.cachedFetchOptions = null, this.cachedResponse = null, this.fetchMutex = new ce();
    }
    isSameAsCachedFetchOptions(e) {
      if (!this.cachedFetchOptions)
        return false;
      for (const t of Object.keys(this.cachedFetchOptions))
        switch (t) {
          case "roomName":
          case "participantName":
          case "participantIdentity":
          case "participantMetadata":
          case "participantAttributes":
          case "agentName":
          case "agentMetadata":
            if (this.cachedFetchOptions[t] !== e[t])
              return false;
            break;
          default:
            const n = t;
            throw new Error("Options key ".concat(n, " not being checked for equality!"));
        }
      return true;
    }
    shouldReturnCachedValueFromFetch(e) {
      return !(!this.cachedResponse || !rm(this.cachedResponse) || !this.isSameAsCachedFetchOptions(e));
    }
    getCachedResponseJwtPayload() {
      return this.cachedResponse ? Bc(this.cachedResponse.participantToken) : null;
    }
    fetch(e, t) {
      return m(this, void 0, void 0, function* () {
        const n = yield this.fetchMutex.lock();
        try {
          if (t && (this.cachedResponse = null), this.shouldReturnCachedValueFromFetch(e))
            return this.cachedResponse.toJson();
          this.cachedFetchOptions = e;
          const s = yield this.update(e);
          return this.cachedResponse = s, s.toJson();
        } finally {
          n();
        }
      });
    }
  }
  class am extends Lf {
    constructor(e) {
      super(), this.literalOrFn = e;
    }
    fetch() {
      return m(this, void 0, void 0, function* () {
        return typeof this.literalOrFn == "function" ? this.literalOrFn() : this.literalOrFn;
      });
    }
  }
  class om extends jc {
    constructor(e) {
      super(), this.customFn = e;
    }
    update(e) {
      return m(this, void 0, void 0, function* () {
        const t = this.customFn(e);
        let n;
        return t instanceof Promise ? n = yield t : n = t, _o.fromJson(n, {
          // NOTE: it could be possible that the response body could contain more fields than just
          // what's in TokenSourceResponse depending on the implementation
          ignoreUnknownFields: true
        });
      });
    }
  }
  class qc extends jc {
    constructor(e) {
      let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      super(), this.url = e, this.endpointOptions = t;
    }
    createRequestFromOptions(e) {
      var t, n, s;
      const r = new Vl();
      for (const a of Object.keys(e))
        switch (a) {
          case "roomName":
          case "participantName":
          case "participantIdentity":
          case "participantMetadata":
            r[a] = e[a];
            break;
          case "participantAttributes":
            r.participantAttributes = (t = e.participantAttributes) !== null && t !== void 0 ? t : {};
            break;
          case "agentName":
            r.roomConfig = (n = r.roomConfig) !== null && n !== void 0 ? n : new Qn(), r.roomConfig.agents.length === 0 && r.roomConfig.agents.push(new es()), r.roomConfig.agents[0].agentName = e.agentName;
            break;
          case "agentMetadata":
            r.roomConfig = (s = r.roomConfig) !== null && s !== void 0 ? s : new Qn(), r.roomConfig.agents.length === 0 && r.roomConfig.agents.push(new es()), r.roomConfig.agents[0].metadata = e.agentMetadata;
            break;
          default:
            const o = a;
            throw new Error("Options key ".concat(o, " not being included in forming request!"));
        }
      return r;
    }
    update(e) {
      return m(this, void 0, void 0, function* () {
        var t;
        const n = this.createRequestFromOptions(e), s = yield fetch(this.url, Object.assign(Object.assign({}, this.endpointOptions), {
          method: (t = this.endpointOptions.method) !== null && t !== void 0 ? t : "POST",
          headers: Object.assign({
            "Content-Type": "application/json"
          }, this.endpointOptions.headers),
          body: n.toJsonString({
            useProtoFieldName: true
          })
        }));
        if (!s.ok)
          throw new Error("Error generating token from endpoint ".concat(this.url, ": received ").concat(s.status, " / ").concat(yield s.text()));
        const r = yield s.json();
        return _o.fromJson(r, {
          // NOTE: it could be possible that the response body could contain more fields than just
          // what's in TokenSourceResponse depending on the implementation (ie, SandboxTokenServer)
          ignoreUnknownFields: true
        });
      });
    }
  }
  class cm extends qc {
    constructor(e, t) {
      const {
        baseUrl: n = "https://cloud-api.livekit.io"
      } = t, s = Ks(t, ["baseUrl"]);
      super("".concat(n, "/api/v2/sandbox/connection-details"), Object.assign(Object.assign({}, s), {
        headers: {
          "X-Sandbox-ID": e
        }
      }));
    }
  }
  const jm = {
    /** TokenSource.literal contains a single, literal set of {@link TokenSourceResponseObject}
     * credentials, either provided directly or returned from a provided function. */
    literal(i) {
      return new am(i);
    },
    /**
     * TokenSource.custom allows a user to define a manual function which generates new
     * {@link TokenSourceResponseObject} values on demand.
     *
     * Use this to get credentials from custom backends / etc.
     */
    custom(i) {
      return new om(i);
    },
    /**
     * TokenSource.endpoint creates a token source that fetches credentials from a given URL using
     * the standard endpoint format:
     * @see https://cloud.livekit.io/projects/p_/sandbox/templates/token-server
     */
    endpoint(i) {
      let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return new qc(i, e);
    },
    /**
     * TokenSource.sandboxTokenServer queries a sandbox token server for credentials,
     * which supports quick prototyping / getting started types of use cases.
     *
     * This token provider is INSECURE and should NOT be used in production.
     *
     * For more info:
     * @see https://cloud.livekit.io/projects/p_/sandbox/templates/token-server
     */
    sandboxTokenServer(i) {
      let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return new cm(i, e);
    }
  };
  function qm(i) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var t;
    const n = _t(i) ? i.mediaStreamTrack : i, s = n.getSettings();
    let r = {
      facingMode: (t = e.defaultFacingMode) !== null && t !== void 0 ? t : "user",
      confidence: "low"
    };
    if ("facingMode" in s) {
      const a = s.facingMode;
      U.trace("rawFacingMode", {
        rawFacingMode: a
      }), a && typeof a == "string" && um(a) && (r = {
        facingMode: a,
        confidence: "high"
      });
    }
    if (["low", "medium"].includes(r.confidence)) {
      U.trace("Try to get facing mode from device label: (".concat(n.label, ")"));
      const a = lm(n.label);
      a !== void 0 && (r = a);
    }
    return r;
  }
  const Ia = /* @__PURE__ */ new Map([["obs virtual camera", {
    facingMode: "environment",
    confidence: "medium"
  }]]), dm = /* @__PURE__ */ new Map([["iphone", {
    facingMode: "environment",
    confidence: "medium"
  }], ["ipad", {
    facingMode: "environment",
    confidence: "medium"
  }]]);
  function lm(i) {
    var e;
    const t = i.trim().toLowerCase();
    if (t !== "")
      return Ia.has(t) ? Ia.get(t) : (e = Array.from(dm.entries()).find((n) => {
        let [s] = n;
        return t.includes(s);
      })) === null || e === void 0 ? void 0 : e[1];
  }
  function um(i) {
    return i === void 0 || ["user", "environment", "left", "right"].includes(i);
  }
  const Vc = Symbol.for("lk.serializer");
  function Vm(i) {
    return typeof i == "object" && i !== null && "symbol" in i && i.symbol === Vc;
  }
  function dr(i) {
    return Object.assign(Object.assign({}, i), {
      symbol: Vc
    });
  }
  function hm() {
    return dr({
      parse: (i) => JSON.parse(i),
      serialize: (i) => JSON.stringify(i)
    });
  }
  function fm() {
    return dr({
      parse: (i) => i,
      serialize: (i) => i
    });
  }
  function mm(i) {
    return dr(i);
  }
  const Wm = {
    json: hm,
    raw: fm,
    custom: mm
  };

  var livekitClient_esmQkbCKsng = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get AudioPresets () { return fs; },
    get BackupCodecPolicy () { return jr; },
    BaseKeyProvider: nh,
    get CheckStatus () { return Ae; },
    Checker: gt,
    ConnectionCheck: Fm,
    ConnectionError: L,
    get ConnectionErrorReason () { return G; },
    get ConnectionQuality () { return ct; },
    get ConnectionState () { return W; },
    CriticalTimers: se,
    CryptorError: Nm,
    get CryptorErrorReason () { return Ss; },
    get CryptorEvent () { return Qr; },
    DataPacket_Kind: Et,
    DataStreamError: Re,
    get DataStreamErrorReason () { return pe; },
    DataTrackPacket: bi,
    DefaultReconnectPolicy: zl,
    DeviceUnsupportedError: mi,
    DisconnectReason: qe,
    get EncryptionEvent () { return dt; },
    Encryption_Type: J,
    get EngineEvent () { return _; },
    ExternalE2EEKeyProvider: xm,
    get KeyHandlerEvent () { return Yr; },
    get KeyProviderEvent () { return ht; },
    LivekitError: We,
    LivekitReasonedError: Oe,
    LocalAudioTrack: yn,
    LocalDataTrack: Ti,
    LocalParticipant: Sf,
    LocalTrack: Ec,
    LocalTrackPublication: _s,
    LocalTrackRecorder: Rh,
    LocalVideoTrack: kn,
    get LogLevel () { return pn; },
    get LoggerNames () { return fe; },
    get MediaDeviceFailure () { return Xn; },
    Mutex: ce,
    NegotiationError: wt,
    Participant: Uc,
    get ParticipantEvent () { return I; },
    ParticipantKind: fn,
    PublishDataError: bm,
    PublishTrackError: Fr,
    RemoteAudioTrack: pf,
    RemoteDataTrack: Nc,
    RemoteParticipant: ni,
    RemoteTrack: Lc,
    RemoteTrackPublication: Ef,
    RemoteVideoTrack: gf,
    Room: En,
    get RoomEvent () { return P; },
    RpcError: Z,
    ScreenSharePresets: pi,
    SignalReconnectError: Nt,
    SignalRequestError: Br,
    SimulatedError: vm,
    SubscriptionError: Wd,
    TokenSource: jm,
    TokenSourceConfigurable: Uf,
    TokenSourceFixed: Lf,
    get Track () { return C; },
    get TrackEvent () { return R; },
    TrackInvalidError: Je,
    get TrackPublication () { return nt; },
    TrackType: Ne,
    UnexpectedConnectionState: Q,
    UnsupportedServer: uu,
    VideoPreset: H,
    VideoPresets: gn,
    VideoPresets43: ms,
    get VideoQuality () { return we; },
    areTokenSourceFetchOptionsEqual: Bm,
    asEncryptablePacket: th,
    attachToElement: Ut,
    attributes: Um,
    audioCodecs: fu,
    compareVersions: Qe,
    createAudioAnalyser: Cm,
    createE2EEKey: Im,
    createKeyMaterialFromBuffer: Zu,
    createKeyMaterialFromString: $u,
    createLocalAudioTrack: yf,
    createLocalScreenTracks: Lm,
    createLocalTracks: Ci,
    createLocalVideoTrack: bf,
    decodeTokenPayload: Bc,
    deriveKeys: Rm,
    detachTrack: qt,
    facingModeFromDeviceLabel: lm,
    facingModeFromLocalTrack: qm,
    getBrowser: Ce,
    getEmptyAudioStreamTrack: ji,
    getEmptyVideoStreamTrack: Sm,
    getLogger: Ee,
    importKey: _m,
    isAudioCodec: Em,
    isAudioTrack: ze,
    isBackupCodec: vu,
    isBackupVideoCodec: gu,
    isBrowserSupported: Iu,
    isE2EESupported: Qu,
    isInsertableStreamSupported: Xu,
    isLocalParticipant: ju,
    isLocalTrack: _t,
    isRemoteParticipant: wm,
    isRemoteTrack: ys,
    isScriptTransformSupported: Ts,
    isSerializer: Vm,
    isVideoCodec: Nu,
    isVideoFrame: Pm,
    isVideoTrack: pt,
    needsRbspUnescaping: Mm,
    parseRbsp: Dm,
    protocolVersion: lu,
    ratchet: Om,
    serializers: Wm,
    setLogExtension: gm,
    setLogLevel: pm,
    supportsAV1: _u,
    supportsAdaptiveStream: ym,
    supportsAudioOutputSelection: Tm,
    supportsDynacast: km,
    supportsVP9: Ru,
    version: du,
    videoCodecs: pu,
    writeRbsp: Am
  });

  exports.createDirectPlaybackAgent = createDirectPlaybackAgent;
  exports.speakText = speakText;

}));
