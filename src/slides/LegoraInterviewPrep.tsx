import { Code, Deck, Fragment, Slide, Stack } from "@revealjs/react";
import { revealConfig } from "@/lib/reveal-config";
import { revealPlugins } from "@/lib/reveal-plugins";

const trustContract = `{
  "system_frame": "source-grounded, permission-aware, audit-ready",
  "preconditions": ["tenant", "matter", "role", "document_acl"],
  "model_output": "untrusted_until_validated",
  "human_gate": "required_before_client_delivery",
  "learning_loop": "trace -> label -> eval -> release_gate"
}`;

const runtimeTrace = `{
  "run_id": "matter-review-042",
  "allowed_sources": ["matter_docs", "firm_playbook", "authorized_research"],
  "blocked": ["cross_matter_vector_hit", "unsupported_citation"],
  "tool_policy": "narrow_typed_idempotent",
  "approval_state": "lawyer_review_required"
}`;

const signalCards = [
	{
		title: "aOS launch",
		date: "May 7, 2026",
		body: "Legora is positioning aOS as the agentic operating system for legal work: intake, research, drafting, review, and client delivery.",
	},
	{
		title: "Agent execution engine",
		date: "Official product surface",
		body: "Agent plans, executes, reviews, and delivers complex legal work, while keeping judgment-sensitive output in the lawyer's control.",
	},
	{
		title: "Qura + Graceview",
		date: "Apr-May 2026",
		body: "AI-native legal research and regulatory monitoring deepen the structured knowledge layer behind agentic workflows.",
	},
	{
		title: "NYC platform signal",
		date: "Foundations / SRE postings",
		body: "Public hiring signals emphasize reliability, observability, incident response, automation, and platform abstraction.",
	},
] as const;

const metricCards = [
	["$600M", "Series D total after extension"],
	["$5.6B", "post-money valuation claim"],
	["$100M+", "ARR reported Apr 2026"],
	["~400", "employees per 2026 releases"],
	["1,000+", "customers in newer official releases"],
	["50+", "markets in newer official releases"],
] as const;

const workflowSteps = [
	["Clarify", "risk boundary + approval requirements"],
	["Bundle", "matter docs + metadata + versions"],
	["Authorize", "tenant / matter / role / ACL before retrieval"],
	["Retrieve", "precedent, playbooks, authorities, preferences"],
	["Plan", "explicit subtasks and tool choices"],
	["Execute", "narrow typed tools with deterministic checks"],
	["Validate", "citations, schemas, rules, confidence, policy"],
	["Approve", "lawyer review before client delivery"],
	["Learn", "traces and corrections become evals"],
] as const;

const storyCards = [
	{
		title: "Frame Payments",
		cue: "AI systems, document workflows, guardrails, human review",
		useFor: "Ownership, agentic systems, safety boundary, product fit",
	},
	{
		title: "JPMorgan",
		cue: "Regulated enterprise data infrastructure and observability",
		useFor: "Reliability, scale, stakeholder complexity, production discipline",
	},
	{
		title: "Startup mode",
		cue: "Ambiguity to shipped vertical slices",
		useFor: "Execution speed, prioritization, unblock-the-team energy",
	},
] as const;

const failureModes = [
	"Cross-tenant, client, or matter retrieval leakage",
	"Citation mismatch: source exists but does not support the claim",
	"Silent truncation, stale document versions, or missed attachments",
	"Tool succeeds halfway, then leaves an external system inconsistent",
	"Confident output when authorities, jurisdictions, or experts disagree",
	"Prompt injection hidden inside uploaded documents or email threads",
] as const;

const evalGates = [
	"Permission-filter correctness on deterministic ACL fixtures",
	"Citation support with source-span verification and expert sampling",
	"Redline issue recall / precision against golden matters",
	"Lawyer edit distance, review burden, escalation quality, and completion SLA",
	"Release gates fed by production traces, not one-off anecdotes",
] as const;

function SectionLabel({ children }: { children: string }) {
	return (
		<p className="mb-5 text-sm font-semibold uppercase tracking-[0.38em] text-cyan-200/80">
			{children}
		</p>
	);
}

function Panel({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`rounded-3xl border border-white/12 bg-white/[0.07] p-6 text-left shadow-2xl shadow-black/20 backdrop-blur ${className}`}
		>
			{children}
		</div>
	);
}

function SmallNote({ children }: { children: React.ReactNode }) {
	return <p className="mt-6 text-lg leading-snug text-slate-300">{children}</p>;
}

export function LegoraInterviewPrep() {
	return (
		<Deck config={revealConfig} plugins={revealPlugins}>
			<Slide backgroundGradient="linear-gradient(135deg, #020617 0%, #111827 45%, #155e75 100%)">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>
						Legora / Senior Software Engineer / Hiring Manager
					</SectionLabel>
					<h1 className="text-balance text-7xl font-black tracking-tight">
						Reliable systems around probabilistic components
					</h1>
					<p className="mt-8 max-w-4xl text-3xl leading-snug text-cyan-50/90">
						Interview prep for Wyatt Walsh: make the case for platform judgment,
						trust-aware agent design, and end-to-end ownership.
					</p>
					<div className="mt-10 grid grid-cols-4 gap-3 text-center text-base font-semibold uppercase tracking-[0.18em] text-cyan-100">
						<span className="rounded-full bg-white/10 px-4 py-3">
							45 minutes
						</span>
						<span className="rounded-full bg-white/10 px-4 py-3">
							Greg Bell
						</span>
						<span className="rounded-full bg-white/10 px-4 py-3">
							Platform lens
						</span>
						<span className="rounded-full bg-white/10 px-4 py-3">NYC hub</span>
					</div>
				</div>
				<aside className="notes">
					Open with the stance, not generic AI enthusiasm. Core claim: reliable
					legal AI needs permissions, validation, observability, and workflow
					fit around the model.
				</aside>
			</Slide>

			<Slide backgroundColor="#08111f">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Interview Operating System</SectionLabel>
					<h2 className="text-5xl font-black">Say this, not that</h2>
					<div className="mt-8 grid grid-cols-2 gap-6">
						<Panel className="border-emerald-300/25 bg-emerald-300/10">
							<h3 className="text-3xl font-bold text-emerald-100">Say this</h3>
							<ul className="mt-5 space-y-4 text-2xl leading-snug text-emerald-50">
								<li>Workflow-first systems engineering.</li>
								<li>Source-grounded, permission-aware, audit-ready.</li>
								<li>Model output is untrusted until validated.</li>
								<li>
									Incidents become traces, labels, evals, and release gates.
								</li>
							</ul>
						</Panel>
						<Panel className="border-rose-300/25 bg-rose-300/10">
							<h3 className="text-3xl font-bold text-rose-100">
								Do not say this
							</h3>
							<ul className="mt-5 space-y-4 text-2xl leading-snug text-rose-50">
								<li>Agents are the answer to every legal task.</li>
								<li>Hallucination is mostly a prompting problem.</li>
								<li>Security means asking the model not to leak data.</li>
								<li>Quality is a vibe or a demo that looked good once.</li>
							</ul>
						</Panel>
					</div>
				</div>
				<aside className="notes">
					Use this as the mental rubric for every answer. Name the risk boundary
					before naming the model or framework.
				</aside>
			</Slide>

			<Slide backgroundColor="#07131f">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Latest Legora Signals</SectionLabel>
					<h2 className="text-5xl font-black">
						Why Legora is an engineering problem
					</h2>
					<div className="mt-7 grid grid-cols-2 gap-5">
						{signalCards.map((card) => (
							<Panel key={card.title}>
								<div className="flex items-start justify-between gap-4">
									<h3 className="text-3xl font-bold text-cyan-100">
										{card.title}
									</h3>
									<span className="rounded-full border border-cyan-200/20 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100/80">
										{card.date}
									</span>
								</div>
								<p className="mt-4 text-xl leading-snug text-slate-200">
									{card.body}
								</p>
							</Panel>
						))}
					</div>
					<SmallNote>
						Translation: Legora is moving from task assistance to legal-work
						orchestration, which rewards engineers who can make autonomy
						dependable.
					</SmallNote>
				</div>
				<aside className="notes">
					Use current signals as technical anchors: operating-system scope,
					execution engine, structured legal knowledge, regulatory monitoring,
					and the NYC platform/SRE hiring signal.
				</aside>
			</Slide>

			<Slide backgroundColor="#08111f">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Scale + Trust</SectionLabel>
					<h2 className="text-5xl font-black">
						Make scale a reliability argument
					</h2>
					<div className="mt-8 grid grid-cols-3 gap-4">
						{metricCards.map(([metric, label]) => (
							<div
								key={metric}
								className="rounded-3xl border border-cyan-200/15 bg-cyan-200/10 p-6 text-center"
							>
								<strong className="block text-5xl font-black text-cyan-100">
									{metric}
								</strong>
								<span className="mt-3 block text-lg leading-tight text-cyan-50/80">
									{label}
								</span>
							</div>
						))}
					</div>
					<div className="mt-8 grid grid-cols-2 gap-6">
						<Panel>
							<h3 className="text-3xl font-bold text-cyan-100">
								Trust posture to echo
							</h3>
							<p className="mt-4 text-xl leading-snug text-slate-200">
								ISO 42001, ISO 27001, SOC 2 Type II, GDPR, no foundation-model
								training on customer data, SSO, BYOK option, TLS 1.2+, AES-256,
								least privilege, audit trails, ethical walls.
							</p>
						</Panel>
						<Panel>
							<h3 className="text-3xl font-bold text-amber-100">
								Careful caveat
							</h3>
							<p className="mt-4 text-xl leading-snug text-slate-200">
								Official pages vary on customer, market, and employee counts.
								Say "newer official releases say" for the bold numbers; do not
								overclaim Trust Center details without report access.
							</p>
						</Panel>
					</div>
				</div>
				<aside className="notes">
					The point is not memorizing metrics. The point is that fast enterprise
					adoption makes reliability, authorization, evals, and supportability
					the real engineering challenge.
				</aside>
			</Slide>

			<Slide backgroundGradient="linear-gradient(135deg, #0f172a 0%, #312e81 100%)">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Why Legora</SectionLabel>
					<h2 className="text-5xl font-black">The answer to rehearse</h2>
					<Panel className="mt-8 border-violet-200/25 bg-violet-200/10 p-8">
						<p className="text-4xl font-semibold leading-tight text-violet-50">
							I build reliable AI and data systems for high-stakes workflows.
							Legal AI is compelling because the model is only one component;
							the platform has to be source-grounded, permission-aware,
							auditable, and useful inside expert work.
						</p>
					</Panel>
					<div className="mt-7 grid grid-cols-3 gap-5 text-xl leading-snug">
						<Panel>
							<h3 className="text-2xl font-bold text-cyan-100">Frame bridge</h3>
							<p className="mt-3 text-slate-200">
								Document workflow, guardrails, structured extraction, human
								review.
							</p>
						</Panel>
						<Panel>
							<h3 className="text-2xl font-bold text-cyan-100">
								JPMorgan bridge
							</h3>
							<p className="mt-3 text-slate-200">
								Regulated systems, data reliability, observability, enterprise
								users.
							</p>
						</Panel>
						<Panel>
							<h3 className="text-2xl font-bold text-cyan-100">
								Startup bridge
							</h3>
							<p className="mt-3 text-slate-200">
								Ambiguity, ownership, shipping the smallest trustworthy slice.
							</p>
						</Panel>
					</div>
				</div>
				<aside className="notes">
					Avoid market hype. Make the answer about trustworthy systems around
					expert users and end-to-end ownership.
				</aside>
			</Slide>

			<Slide backgroundColor="#07131f">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Greg Bell Lens</SectionLabel>
					<h2 className="text-5xl font-black">
						What the hiring manager likely listens for
					</h2>
					<div className="mt-8 grid grid-cols-[1fr_1.1fr] gap-6">
						<Panel className="border-cyan-200/25 bg-cyan-200/10">
							<h3 className="text-3xl font-bold text-cyan-100">
								Public signals
							</h3>
							<ul className="mt-5 space-y-3 text-2xl leading-snug text-slate-100">
								<li>Director, Platform Engineering at Legora.</li>
								<li>Joined through Walter acquisition.</li>
								<li>Former Amazon S3 / infrastructure leader.</li>
								<li>Former Hootsuite engineering executive.</li>
							</ul>
						</Panel>
						<Panel>
							<h3 className="text-3xl font-bold text-emerald-100">
								Answer style
							</h3>
							<div className="mt-5 grid grid-cols-2 gap-4 text-xl leading-snug text-slate-100">
								<span className="rounded-2xl bg-white/8 p-4">
									Reliability under growth
								</span>
								<span className="rounded-2xl bg-white/8 p-4">
									Customer-centered tradeoffs
								</span>
								<span className="rounded-2xl bg-white/8 p-4">
									Observability and incidents
								</span>
								<span className="rounded-2xl bg-white/8 p-4">
									Automation without hidden risk
								</span>
								<span className="rounded-2xl bg-white/8 p-4">
									Platform abstractions
								</span>
								<span className="rounded-2xl bg-white/8 p-4">
									Data-driven engineering culture
								</span>
							</div>
						</Panel>
					</div>
					<SmallNote>
						Default posture: technical depth plus pragmatic operating taste.
					</SmallNote>
				</div>
				<aside className="notes">
					Expect platform/SRE discussion around SLIs, SLOs, incident response,
					deployment safety, toil reduction, and resilient distributed systems.
				</aside>
			</Slide>

			<Stack>
				<Slide backgroundColor="#08111f">
					<div className="mx-auto max-w-6xl text-left text-white">
						<SectionLabel>Story Chooser</SectionLabel>
						<h2 className="text-5xl font-black">
							Choose the story by interview signal
						</h2>
						<div className="mt-8 grid grid-cols-3 gap-5">
							{storyCards.map((card) => (
								<Panel key={card.title}>
									<h3 className="text-3xl font-bold text-cyan-100">
										{card.title}
									</h3>
									<p className="mt-4 text-xl leading-snug text-slate-200">
										{card.cue}
									</p>
									<p className="mt-5 rounded-2xl bg-white/8 p-4 text-lg leading-snug text-slate-100">
										Use for: {card.useFor}
									</p>
								</Panel>
							))}
						</div>
						<SmallNote>
							Never invent metrics. If a number is not confirmed, describe
							directionally and anchor on the system design.
						</SmallNote>
					</div>
					<aside className="notes">
						The default first story is Frame Payments. Use JPMorgan when Greg
						pulls toward reliability or enterprise trust. Use startup mode for
						ambiguity.
					</aside>
				</Slide>

				<Slide backgroundColor="#0f172a">
					<div className="mx-auto max-w-6xl text-left text-white">
						<SectionLabel>Frame Payments Story</SectionLabel>
						<h2 className="text-5xl font-black">
							AI workflow where safety is architecture
						</h2>
						<div className="mt-8 grid grid-cols-[1.2fr_0.8fr] gap-6">
							<Panel>
								<ol className="space-y-4 text-2xl leading-snug text-slate-100">
									<li>
										Start with business pain and repeated document
										back-and-forth.
									</li>
									<li>
										Normalize inputs into structured extraction with explicit
										failure states.
									</li>
									<li>
										Escalate ambiguous or high-risk cases to human review.
									</li>
									<li>
										Make outputs inspectable: source support, validation
										failures, and audit trail.
									</li>
								</ol>
							</Panel>
							<Panel className="border-emerald-200/25 bg-emerald-200/10">
								<h3 className="text-3xl font-bold text-emerald-100">
									Legora map
								</h3>
								<p className="mt-4 text-2xl leading-snug text-emerald-50">
									Document complexity, high-trust output, expert review,
									workflow compression, and auditability.
								</p>
							</Panel>
						</div>
						<SmallNote>
							The model did not solve the problem alone; the system design did.
						</SmallNote>
					</div>
				</Slide>

				<Slide backgroundColor="#0f172a">
					<div className="mx-auto max-w-6xl text-left text-white">
						<SectionLabel>JPMorgan Story</SectionLabel>
						<h2 className="text-5xl font-black">
							Regulated data infrastructure taste
						</h2>
						<ul className="mt-9 grid grid-cols-2 gap-5 text-2xl leading-snug text-slate-100">
							<li className="rounded-3xl border border-white/12 bg-white/8 p-6">
								Built and maintained data infrastructure with clear downstream
								interfaces.
							</li>
							<li className="rounded-3xl border border-white/12 bg-white/8 p-6">
								Improved signal quality instead of only adding alerts or
								dashboards.
							</li>
							<li className="rounded-3xl border border-white/12 bg-white/8 p-6">
								Handled latency, failure isolation, maintainability, and
								observability tradeoffs.
							</li>
							<li className="rounded-3xl border border-white/12 bg-white/8 p-6">
								Communicated complexity across stakeholder groups without hiding
								risk.
							</li>
						</ul>
						<SmallNote>
							Use for reliability, scale, expert users, and enterprise
							credibility.
						</SmallNote>
					</div>
				</Slide>
			</Stack>

			<Slide backgroundGradient="linear-gradient(135deg, #111827 0%, #064e3b 100%)">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>System Design Prompt</SectionLabel>
					<h2 className="text-5xl font-black">Agentic legal-review workflow</h2>
					<p className="mt-7 text-3xl leading-snug text-emerald-50">
						A lawyer receives a contract redline or client request. Design a
						system that reviews changes against matter context, firm playbooks,
						precedent, authoritative sources, and client preferences; proposes a
						response; and routes it for lawyer approval before delivery.
					</p>
					<div className="mt-9 grid grid-cols-8 gap-3 text-center text-base font-bold uppercase tracking-[0.14em] text-emerald-950">
						{[
							"permissions",
							"context",
							"planner",
							"tools",
							"validation",
							"approval",
							"delivery",
							"evals",
						].map((step) => (
							<span
								key={step}
								className="rounded-full bg-emerald-100 px-3 py-3"
							>
								{step}
							</span>
						))}
					</div>
					<SmallNote>
						Start with the risk boundary and workflow. Do not make the agent an
						opaque transaction.
					</SmallNote>
				</div>
				<aside className="notes">
					Use this if Greg asks architecture. Start with tenants, matters,
					document versions, permission filters, and human approval.
				</aside>
			</Slide>

			<Slide backgroundColor="#07131f" autoAnimate>
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Architecture Walkthrough</SectionLabel>
					<h2 className="text-5xl font-black">
						Build the workflow left to right
					</h2>
					<div className="mt-7 grid grid-cols-3 gap-4">
						{workflowSteps.slice(0, 3).map(([title, body]) => (
							<div
								key={title}
								data-id={title}
								className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-6 text-center"
							>
								<strong className="block text-3xl text-cyan-100">
									{title}
								</strong>
								<span className="mt-3 block text-lg leading-tight text-slate-200">
									{body}
								</span>
							</div>
						))}
					</div>
					<SmallNote>
						Authorization is a precondition, not a post-filter.
					</SmallNote>
				</div>
			</Slide>

			<Slide backgroundColor="#07131f" autoAnimate>
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Architecture Walkthrough</SectionLabel>
					<h2 className="text-5xl font-black">
						Then add context, planning, and tools
					</h2>
					<div className="mt-7 grid grid-cols-6 gap-4">
						{workflowSteps.slice(0, 6).map(([title, body]) => (
							<div
								key={title}
								data-id={title}
								className="rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-5 text-center"
							>
								<strong className="block text-2xl text-cyan-100">
									{title}
								</strong>
								<span className="mt-3 block text-base leading-tight text-slate-200">
									{body}
								</span>
							</div>
						))}
					</div>
					<SmallNote>
						Keep the planner inspectable. Tools should be narrow, typed,
						observable, and idempotent.
					</SmallNote>
				</div>
			</Slide>

			<Slide backgroundColor="#07131f" autoAnimate>
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Architecture Walkthrough</SectionLabel>
					<h2 className="text-5xl font-black">
						Finish with validation, approval, and evals
					</h2>
					<div className="mt-7 grid grid-cols-9 gap-3">
						{workflowSteps.map(([title, body]) => (
							<div
								key={title}
								data-id={title}
								className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-center"
							>
								<strong className="block text-xl text-cyan-100">{title}</strong>
								<span className="mt-2 block text-sm leading-tight text-slate-200">
									{body}
								</span>
							</div>
						))}
					</div>
					<SmallNote>
						Human approval is the safety boundary for legally sensitive output.
					</SmallNote>
				</div>
				<aside className="notes">
					Treat model output as untrusted until citations, schemas, business
					rules, confidence thresholds, and policies pass. Mention retries,
					idempotency, and compensating actions if asked about partial failure.
				</aside>
			</Slide>

			<Slide backgroundColor="#020617">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Runtime Contract</SectionLabel>
					<h2 className="text-5xl font-black">
						Make invalid states hard to represent
					</h2>
					<div className="mt-7 grid grid-cols-[1fr_1.1fr] gap-6">
						<Panel>
							<ul className="space-y-4 text-2xl leading-snug text-slate-100">
								<li>
									No retrieval without tenant, matter, role, and document ACL.
								</li>
								<li>
									No client-facing output without citation validation and lawyer
									approval.
								</li>
								<li>
									No silent mutating tool action without idempotency key and
									audit event.
								</li>
								<li>No eval-free release for new agent behavior.</li>
							</ul>
						</Panel>
						<Code
							language="json"
							code={trustContract}
							codeProps={{ tabIndex: 0 }}
						/>
					</div>
				</div>
				<aside className="notes">
					This is the engineering-taste slide. It turns legal-trust language
					into a runtime contract.
				</aside>
			</Slide>

			<Slide backgroundColor="#08111f">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Failure Modes</SectionLabel>
					<h2 className="text-5xl font-black">
						Every system answer needs a failure mode
					</h2>
					<div className="mt-8 grid grid-cols-2 gap-6">
						<Panel>
							<h3 className="text-3xl font-bold text-rose-100">
								Threats to name
							</h3>
							<ul className="mt-5 space-y-3 text-xl leading-snug text-slate-100">
								{failureModes.map((mode) => (
									<Fragment key={mode} as="li">
										{mode}
									</Fragment>
								))}
							</ul>
						</Panel>
						<Panel>
							<h3 className="text-3xl font-bold text-emerald-100">
								Eval gates
							</h3>
							<ul className="mt-5 space-y-3 text-xl leading-snug text-slate-100">
								{evalGates.map((gate) => (
									<Fragment key={gate} as="li">
										{gate}
									</Fragment>
								))}
							</ul>
						</Panel>
					</div>
				</div>
				<aside className="notes">
					Prefer eval language over vibes. Strong phrase: I want a reproducible
					trace and regression test, not a one-off explanation.
				</aside>
			</Slide>

			<Slide backgroundColor="#0f172a">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Debug Drill</SectionLabel>
					<h2 className="text-5xl font-black">
						Unsupported claim in a client-ready draft
					</h2>
					<div className="mt-7 grid grid-cols-[0.95fr_1.05fr] gap-6">
						<Panel className="border-amber-200/25 bg-amber-200/10">
							<h3 className="text-3xl font-bold text-amber-100">
								Answer shape
							</h3>
							<ol className="mt-5 space-y-3 text-xl leading-snug text-slate-100">
								<li>
									Reproduce the run with the same matter, permissions, prompt,
									and tool versions.
								</li>
								<li>
									Inspect retrieved sources, citation spans, truncation, and
									validators.
								</li>
								<li>
									Classify the miss: retrieval, reasoning, tool, policy, or UX
									handoff.
								</li>
								<li>
									Add a labeled eval and release gate before calling it fixed.
								</li>
							</ol>
						</Panel>
						<Code
							language="json"
							code={runtimeTrace}
							codeProps={{ tabIndex: 0 }}
						/>
					</div>
				</div>
				<aside className="notes">
					If pressed on model choice, pivot to eval-driven routing rather than
					favorite-model opinions.
				</aside>
			</Slide>

			<Slide backgroundGradient="linear-gradient(135deg, #020617 0%, #0f766e 100%)">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>First 90 Days</SectionLabel>
					<h2 className="text-5xl font-black">
						Learn fast, ship safely, scale the pattern
					</h2>
					<div className="mt-8 grid grid-cols-3 gap-5">
						<Panel>
							<h3 className="text-4xl font-black text-cyan-100">0-30</h3>
							<p className="mt-4 text-xl leading-snug text-slate-100">
								Map product surface, agent runtime, integration boundaries,
								on-call posture, and eval stack. Ship one small reliability win.
							</p>
						</Panel>
						<Panel>
							<h3 className="text-4xl font-black text-cyan-100">31-60</h3>
							<p className="mt-4 text-xl leading-snug text-slate-100">
								Own a vertical slice through permissioned retrieval or
								validation, with traces and regression coverage.
							</p>
						</Panel>
						<Panel>
							<h3 className="text-4xl font-black text-cyan-100">61-90</h3>
							<p className="mt-4 text-xl leading-snug text-slate-100">
								Remove a platform bottleneck, codify a reusable workflow
								pattern, and document the operating standard.
							</p>
						</Panel>
					</div>
				</div>
				<aside className="notes">
					Make it concrete and humble: learn the system, then increase leverage.
					This is a senior-engineer answer, not a hero answer.
				</aside>
			</Slide>

			<Slide backgroundColor="#08111f">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Questions For Greg</SectionLabel>
					<h2 className="text-5xl font-black">
						Ask about leverage and bottlenecks
					</h2>
					<ol className="mt-8 space-y-4 text-2xl leading-snug text-slate-100">
						<li className="rounded-3xl border border-white/12 bg-white/8 p-5">
							For the NYC engineering hub, what platform or product bottlenecks
							should senior engineers remove first?
						</li>
						<li className="rounded-3xl border border-white/12 bg-white/8 p-5">
							How is ownership split across agent runtime, integrations,
							retrieval, product surfaces, and infrastructure?
						</li>
						<li className="rounded-3xl border border-white/12 bg-white/8 p-5">
							What is a high-quality agentic workflow: accuracy, latency,
							adoption, review burden, completion rate, or something else?
						</li>
						<li className="rounded-3xl border border-white/12 bg-white/8 p-5">
							Where are the hardest reliability problems now: permissions,
							long-running workflows, model variability, integrations, document
							scale, or evals?
						</li>
					</ol>
				</div>
				<aside className="notes">
					Pick two based on what Greg emphasizes. End with what a great first 90
					days would look like.
				</aside>
			</Slide>

			<Slide backgroundGradient="linear-gradient(135deg, #111827 0%, #155e75 55%, #0f766e 100%)">
				<div className="mx-auto max-w-6xl text-left text-white">
					<SectionLabel>Close</SectionLabel>
					<h2 className="text-balance text-7xl font-black tracking-tight">
						I am strongest where systems reliability and AI workflow depth have
						to meet.
					</h2>
					<p className="mt-8 max-w-4xl text-3xl leading-snug text-cyan-50/90">
						Legora's current direction is exactly that: legal-domain agents,
						permissioned context, integrations, validation, and expert approval
						inside the flow of work.
					</p>
				</div>
				<aside className="notes">
					Tie the close back to aOS, Agent, Qura, Graceview, Everlaw, and the
					security model. Keep it crisp.
				</aside>
			</Slide>
		</Deck>
	);
}
