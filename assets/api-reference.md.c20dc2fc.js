import{_ as s,o as n,c as a,a as t}from"./app.f9cc102a.js";const m='{"title":"API Reference","description":"","frontmatter":{},"headers":[{"level":2,"title":"MISC","slug":"misc"},{"level":2,"title":"usePopperjs","slug":"usepopperjs"},{"level":2,"title":"Popper","slug":"popper"}],"relativePath":"api-reference.md","lastUpdated":1637415968562}',o={},p=t(`<h1 id="api-reference" tabindex="-1">API Reference <a class="header-anchor" href="#api-reference" aria-hidden="true">#</a></h1><h2 id="misc" tabindex="-1">MISC <a class="header-anchor" href="#misc" aria-hidden="true">#</a></h2><div class="language-typescript"><pre><code><span class="token keyword">type</span> <span class="token class-name">MaybeRef<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token operator">|</span> Ref<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Trigger</span> <span class="token operator">=</span>
  <span class="token operator">|</span> <span class="token string">&quot;hover&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;focus&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;click-to-open&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;click-to-toggle&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;manual&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Placement</span> <span class="token operator">=</span>
  <span class="token operator">|</span> <span class="token string">&quot;auto&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;auto-start&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;auto-end&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;left&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;right&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;top&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;bottom&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;top-start&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;top-end&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;bottom-start&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;bottom-end&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;right-start&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;right-end&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;left-start&quot;</span>
  <span class="token operator">|</span> <span class="token string">&quot;left-end&quot;</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="usepopperjs" tabindex="-1">usePopperjs <a class="header-anchor" href="#usepopperjs" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">function</span> <span class="token function">usePopperjs</span><span class="token punctuation">(</span>
  reference<span class="token operator">:</span> MaybeRef<span class="token operator">&lt;</span>Element <span class="token operator">|</span> VirtualElement<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  popper<span class="token operator">:</span> MaybeRef<span class="token operator">&lt;</span>HTMLElement<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  options<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// The Popperjs options</span>
    placement<span class="token operator">?</span><span class="token operator">:</span> Placement<span class="token punctuation">;</span> <span class="token comment">// default: &quot;bottom&quot;</span>
    modifiers<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span>TModifier<span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// default: []</span>
    strategy<span class="token operator">?</span><span class="token operator">:</span> PositioningStrategy<span class="token punctuation">;</span> <span class="token comment">// default: &quot;absolute&quot;</span>
    onFirstUpdate<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>arg0<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>State<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

    <span class="token comment">// Extra options</span>
    trigger<span class="token operator">?</span><span class="token operator">:</span> MaybeRef<span class="token operator">&lt;</span>Trigger <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// default: &quot;hover&quot;</span>
    delayOnMouseover<span class="token operator">?</span><span class="token operator">:</span> MaybeRef<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// default: 200, only works when trigger=&#39;hover&#39;</span>
    delayOnMouseout<span class="token operator">?</span><span class="token operator">:</span> MaybeRef<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// default: 200, only works when trigger=&#39;hover&#39;</span>
    forceShow<span class="token operator">?</span><span class="token operator">:</span> MaybeRef<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// default: false</span>
    onShow<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">;</span>
    onHide<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token comment">// The Popperjs instance</span>
  instance<span class="token operator">:</span> Ref<span class="token operator">&lt;</span>Instance <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  visible<span class="token operator">:</span> Ref<span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="popper" tabindex="-1">Popper <a class="header-anchor" href="#popper" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">type</span> <span class="token class-name">props</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// The Popperjs options (non-reactive)</span>
  placement<span class="token operator">?</span><span class="token operator">:</span> Placement<span class="token punctuation">;</span> <span class="token comment">// default: &quot;bottom&quot;</span>
  modifiers<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span>TModifier<span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// default: []</span>
  strategy<span class="token operator">?</span><span class="token operator">:</span> PositioningStrategy<span class="token punctuation">;</span> <span class="token comment">// default: &quot;absolute&quot;</span>
  onFirstUpdate<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>arg0<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>State<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

  <span class="token comment">// The usePopperjs options (reactive)</span>
  trigger<span class="token operator">?</span><span class="token operator">:</span> Exclude<span class="token operator">&lt;</span>Trigger<span class="token punctuation">,</span> <span class="token string">&quot;manual&quot;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// default: &quot;hover&quot;</span>
  delayOnMouseover<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// default: 200, only works when trigger=&#39;hover&#39;</span>
  delayOnMouseout<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> <span class="token comment">// default: 200, only works when trigger=&#39;hover&#39;</span>
  forceShow<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// default: false</span>

  <span class="token comment">// Extra props (reactive)</span>
  referenceIs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// default: &quot;div&quot;</span>
  referenceProps<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  popperIs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// default: &quot;div&quot;</span>
  popperProps<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
  disabled<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  teleportProps<span class="token operator">?</span><span class="token operator">:</span> TeleportProps<span class="token punctuation">;</span>
  transitionProps<span class="token operator">?</span><span class="token operator">:</span> TransitionProps<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">emitOptions</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">&quot;show&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;hide&quot;</span><span class="token punctuation">,</span>

  <span class="token comment">// Deprecated: pass following props to transitionProps instead</span>
  <span class="token comment">// Transition only</span>
  <span class="token string">&quot;before-enter&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;enter&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;after-enter&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;enter-cancelled&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;before-leave&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;leave&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;after-leave&quot;</span><span class="token punctuation">,</span>
  <span class="token string">&quot;leave-cancelled&quot;</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre></div>`,7),e=[p];function r(c,l,k,u,i,d){return n(),a("div",null,e)}var q=s(o,[["render",r]]);export{m as __pageData,q as default};
