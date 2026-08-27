from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
DEFAULT_OUTPUT = PUBLIC / "Fathallah_Haj_DevOps_CV_2026.pdf"
ONE_PAGE_OUTPUT = PUBLIC / "Fathallah_Haj_DevOps_CV_2026_One_Page.pdf"
FULL_OUTPUT = PUBLIC / "Fathallah_Haj_DevOps_CV_2026_Full.pdf"

INK = "#111827"
MUTED = "#4B5563"
BODY = "#1F2937"
BLUE = "#0369A1"
RULE = "#CBD5E1"


@dataclass(frozen=True)
class Role:
    title: str
    company: str
    period: str
    bullets: list[str]


@dataclass(frozen=True)
class Project:
    name: str
    label: str
    bullets: list[str]


CONTACTS = [
    ("fatoh.haj@gmail.com", "mailto:fatoh.haj@gmail.com"),
    ("fhaj.vercel.app", "https://fhaj.vercel.app"),
    ("LinkedIn", "https://linkedin.com/in/fathallah-haj-a59258123/"),
    ("GitHub", "https://github.com/fatoh2"),
]

SUMMARY = (
    "DevOps Engineer with 5+ years of experience building and operating Kubernetes platforms, "
    "Terraform/Ansible automation, GitOps delivery, CI/CD workflows, and observability systems across "
    "production operations. Current focus: reliable platform engineering and AI-assisted infrastructure "
    "tools that keep operational answers tied to real system evidence."
)

ROLES = [
    Role(
        title="DevOps Engineer",
        company="KLA",
        period="2023-Present",
        bullets=[
            "Built a multi-node Kubernetes platform on VMware vSphere, including networking, storage, and scaling.",
            "Built and operated containerized workloads with Docker and Kubernetes for Linux and Windows containers and VMs.",
            "Automated infrastructure provisioning using Terraform and configuration management with Ansible.",
            "Worked with Docker-based containerization workflows including image building, deployment, and runtime management.",
            "Worked with Git and GitHub workflows including branching, review, and version-control practices.",
            "Supported Kubernetes networking, load balancing, service communication, and platform troubleshooting.",
            "Investigated and resolved production issues to improve system reliability.",
            "Applied basic security practices across infrastructure and CI/CD pipelines.",
            "Migrated development environments from Windows to Linux.",
            "Developed a Python-based installer to automate Ubuntu environment setup.",
            "Built and maintained Debian/Ubuntu packages for internal distribution.",
            "Implemented Jenkins CI/CD pipelines for build, test, and deployment automation.",
            "Used AI tools and APIs to assist with automation, scripting, and infrastructure tooling workflows.",
        ],
    ),
    Role(
        title="DevOps Engineer",
        company="Dynamic Yield",
        period="2021-2023",
        bullets=[
            "Managed and scaled AWS infrastructure supporting production workloads across Linux environments.",
            "Deployed and maintained Kubernetes clusters using Helm.",
            "Implemented GitOps workflows using ArgoCD.",
            "Built Jenkins and GitHub Actions CI/CD pipelines for application and infrastructure delivery.",
            "Operated Prometheus, Grafana, and ELK observability for production systems.",
            "Automated operational workflows using Bash, Python, Go, Terraform, and CloudFormation.",
            "Supported incident investigation, deployment review, and production reliability workflows.",
        ],
    ),
    Role(
        title="NOC Tech Lead",
        company="Dynamic Yield",
        period="2018-2021",
        bullets=[
            "Developed internal monitoring and automation tools to improve system visibility.",
            "Improved incident response through enhanced monitoring and automation.",
            "Monitored production systems using Graphite, Nagios, and ELK.",
            "Authored operational playbooks and supported team onboarding.",
        ],
    ),
]

PROJECTS = [
    Project(
        name="Argus AI",
        label="AI DevOps assistant",
        bullets=[
            "Built a NestJS/TypeScript assistant that connects natural-language infrastructure questions to Kubernetes, Prometheus, Loki, ArgoCD, and GitHub Actions context.",
            "Designed read-only connector architecture with validation, rate limits, provider fallback, and safe logging boundaries.",
            "Built local Docker Compose observability stack with Redis, Prometheus, Loki, Promtail, Grafana, and the AI service.",
            "Structured responses around retrieved operational evidence instead of unsupported AI answers.",
            "Kept v1 scoped to safe diagnostics and operator assistance, avoiding write actions against production systems.",
        ],
    ),
    Project(
        name="Argus Infra",
        label="GitOps Kubernetes platform",
        bullets=[
            "Built a platform repo using Terraform/OpenTofu, Ansible, Kubernetes, ArgoCD, Helm, External Secrets, cert-manager, Prometheus, Grafana, and Loki.",
            "Separated infrastructure provisioning, host configuration, and GitOps delivery into clear operating layers.",
            "Added local-cluster, health, sanity, runbook, and CI workflows for repeatable platform verification.",
            "Documented promotion, rollback, secret-management, and platform troubleshooting paths as operating runbooks.",
            "Designed the repo as a reusable reference platform for future AI DevOps and monitoring projects.",
        ],
    ),
    Project(
        name="Argus Monitor",
        label="Reliability product system",
        bullets=[
            "Built a microservice monitoring architecture with React, NestJS, PostgreSQL, Redis/BullMQ, WebSockets, alert rules, and Telegram notifications.",
            "Implemented validation, secret redaction, rate limiting, health checks, and external API resilience patterns.",
            "Added unit, integration, and E2E test coverage patterns around auth, wallets, alerts, dashboard, and WebSocket flows.",
            "Used Docker Compose to run local service dependencies consistently across development and test workflows.",
            "Modeled production reliability concerns including queues, alert delivery, dashboard updates, and failure handling.",
        ],
    ),
    Project(
        name="SOLitaire",
        label="Competitive Solitaire product",
        bullets=[
            "Built a React Native/Expo product with Supabase, Solana wallet authentication, and Anchor escrow-oriented game flows.",
            "Implemented deterministic Solitaire game logic, match history, rewards, profile flows, and admin/recovery surfaces.",
            "Documented production constraints around legal signoff, escrow audit, replay validation, refunds, and settlement recovery.",
            "Added backend validation paths for score submission, settlement jobs, profile synchronization, and abuse controls.",
            "Kept the portfolio framing focused on product engineering, mobile delivery, and operational risk management.",
        ],
    ),
]

SKILLS = [
    ("Cloud / Platforms", "AWS, VMware vSphere, GKE, Hetzner, Linux, Windows"),
    ("Infrastructure / GitOps", "Kubernetes, Terraform, OpenTofu, CloudFormation, Ansible, ArgoCD, Helm, External Secrets"),
    ("CI/CD", "Jenkins, GitHub Actions, Git, release automation, package distribution"),
    ("Observability / Reliability", "Prometheus, Grafana, Loki, ELK, Graphite, Nagios, runbooks, incident response"),
    ("Languages / AI", "Python, Bash, Go, Node.js, PowerShell, TypeScript, LLM APIs, tool calling"),
]

ONE_PAGE_EXPERIENCE = [
    (
        ROLES[0],
        [
            "Built a multi-node Kubernetes platform on VMware vSphere with networking, storage, scaling, and Linux/Windows workloads.",
            "Automated infrastructure with Terraform and Ansible; supported Docker image build, deployment, and runtime workflows.",
            "Implemented Jenkins CI/CD pipelines and used Git/GitHub branching, review, and version-control workflows.",
            "Migrated developer environments from Windows to Linux; built a Python Ubuntu installer and Debian/Ubuntu packages.",
            "Supported Kubernetes networking, load balancing, service communication, production troubleshooting, and reliability.",
            "Applied infrastructure/CI/CD security practices and used AI tools/APIs for automation and scripting workflows.",
        ],
    ),
    (
        ROLES[1],
        [
            "Managed AWS production infrastructure across Linux environments and maintained Kubernetes clusters using Helm.",
            "Implemented ArgoCD GitOps workflows and Jenkins/GitHub Actions pipelines for application and infrastructure delivery.",
            "Operated Prometheus, Grafana, and ELK observability while supporting incident investigation and reliability workflows.",
            "Automated operational workflows using Bash, Python, Go, Terraform, and CloudFormation.",
        ],
    ),
    (
        ROLES[2],
        [
            "Developed internal monitoring and automation tools to improve production visibility and incident response.",
            "Monitored production systems using Graphite, Nagios, and ELK; authored playbooks and supported team onboarding.",
        ],
    ),
]

ONE_PAGE_PROJECTS = [
    (
        PROJECTS[0],
        [
            "Built a NestJS/TypeScript assistant that connects infrastructure questions to Kubernetes, Prometheus, Loki, ArgoCD, and GitHub Actions context.",
            "Designed read-only connectors with validation, rate limits, provider fallback, safe logging, and evidence-backed AI responses.",
            "Built a local Docker Compose observability stack with Redis, Prometheus, Loki, Promtail, Grafana, and the AI service.",
        ],
    ),
    (
        PROJECTS[1],
        [
            "Built a GitOps platform repo using Terraform/OpenTofu, Ansible, Kubernetes, ArgoCD, Helm, External Secrets, cert-manager, Prometheus, Grafana, and Loki.",
            "Separated provisioning, host configuration, GitOps delivery, health checks, sanity tests, CI workflows, and runbooks.",
        ],
    ),
    (
        PROJECTS[2],
        [
            "Built a reliability product system with React, NestJS, PostgreSQL, Redis/BullMQ, WebSockets, alert rules, and Telegram notifications.",
            "Implemented validation, secret redaction, rate limiting, health checks, external API resilience, and test coverage patterns.",
        ],
    ),
]


def styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            name="Name",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=23,
            alignment=TA_CENTER,
            textColor=colors.HexColor(INK),
            spaceAfter=2,
        ),
        "tagline": ParagraphStyle(
            name="Tagline",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=11.5,
            alignment=TA_CENTER,
            textColor=colors.HexColor(MUTED),
            spaceAfter=5,
        ),
        "section": ParagraphStyle(
            name="Section",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=10.8,
            textColor=colors.HexColor(BLUE),
            spaceBefore=8,
            spaceAfter=3,
        ),
        "body": ParagraphStyle(
            name="Body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            leading=9.8,
            textColor=colors.HexColor(BODY),
            spaceAfter=2,
        ),
        "tight": ParagraphStyle(
            name="TightBody",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.55,
            leading=9.15,
            textColor=colors.HexColor(BODY),
            spaceAfter=1.6,
        ),
        "role": ParagraphStyle(
            name="Role",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.7,
            leading=10.5,
            textColor=colors.HexColor(INK),
            spaceBefore=3,
            spaceAfter=0.5,
        ),
        "meta": ParagraphStyle(
            name="Meta",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7.4,
            leading=8.7,
            textColor=colors.HexColor(MUTED),
            spaceAfter=1,
        ),
        "footer": ParagraphStyle(
            name="Footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=7,
            leading=8,
            alignment=TA_CENTER,
            textColor=colors.HexColor(MUTED),
        ),
    }


def para(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(text, style)


def link(label: str, href: str) -> str:
    return f'<font color="{BLUE}"><link href="{href}">{label}</link></font>'


def contact_line() -> str:
    return " | ".join(link(label, href) for label, href in CONTACTS) + " | Israel time zone"


def section(title: str, st: dict[str, ParagraphStyle]) -> list:
    return [
        para(title.upper(), st["section"]),
        HRFlowable(width="100%", thickness=0.45, color=colors.HexColor(RULE), spaceAfter=3),
    ]


def bullet(text: str, style: ParagraphStyle) -> Paragraph:
    return para(f"- {text}", style)


def role_heading(role: Role, st: dict[str, ParagraphStyle]) -> Table:
    table = Table(
        [[para(f"{role.title} - {role.company}", st["role"]), para(role.period, st["meta"])]],
        colWidths=[124 * mm, 38 * mm],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
            ]
        )
    )
    return table


def skill_table(st: dict[str, ParagraphStyle], compact: bool) -> Table:
    body_style = st["tight"] if compact else st["body"]
    rows = [[para(f"<b>{label}</b>", body_style), para(items, body_style)] for label, items in SKILLS]
    table = Table(rows, colWidths=[38 * mm, 124 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 0.8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8),
            ]
        )
    )
    return table


def header(st: dict[str, ParagraphStyle]) -> list:
    return [
        para("Fathallah Haj", st["name"]),
        para(
            "DevOps Engineer | Kubernetes, Terraform, GitOps, Observability, CI/CD, AI Infrastructure Tooling",
            st["tagline"],
        ),
        para(contact_line(), st["tagline"]),
        Spacer(1, 1.2),
    ]


def one_page_story(st: dict[str, ParagraphStyle]) -> list:
    story = header(st)
    story += section("Professional Summary", st)
    story.append(para(SUMMARY, st["tight"]))

    story += section("Experience", st)
    for role, bullets in ONE_PAGE_EXPERIENCE:
        story.append(role_heading(role, st))
        for item in bullets:
            story.append(bullet(item, st["tight"]))

    story += section("Selected Engineering Work", st)
    for project, bullets in ONE_PAGE_PROJECTS:
        story.append(para(f"<b>{project.name}</b> - {project.label}", st["role"]))
        for item in bullets:
            story.append(bullet(item, st["tight"]))

    story += section("Skills", st)
    story.append(skill_table(st, compact=True))

    story += section("Education and Languages", st)
    story.append(
        para(
            "B.Sc. Electrical Engineering and Computer Science - Tel Aviv University | "
            "Arabic: Native | Hebrew: Fluent | English: Fluent",
            st["tight"],
        )
    )
    return story


def full_story(st: dict[str, ParagraphStyle]) -> list:
    story = header(st)
    story += section("Professional Summary", st)
    story.append(para(SUMMARY, st["body"]))

    story += section("Core Platform Strengths", st)
    strengths = [
        "Kubernetes platform workflows, GitOps delivery, and infrastructure-as-code operating models.",
        "CI/CD automation, developer environment reliability, package/install paths, and release workflows.",
        "Observability and incident response across metrics, logs, dashboards, alerts, and runbooks.",
        "AI-assisted infrastructure tooling that retrieves system evidence before composing operational answers.",
    ]
    for item in strengths:
        story.append(bullet(item, st["body"]))

    story += section("Experience", st)
    for role in ROLES:
        story.append(role_heading(role, st))
        for item in role.bullets:
            story.append(bullet(item, st["body"]))

    story.append(PageBreak())

    story += section("Selected Engineering Work", st)
    for project in PROJECTS:
        story.append(para(f"<b>{project.name}</b> - {project.label}", st["role"]))
        for item in project.bullets:
            story.append(bullet(item, st["body"]))

    story += section("Skills", st)
    story.append(skill_table(st, compact=False))

    story += section("Education and Languages", st)
    story.append(
        para(
            "B.Sc. Electrical Engineering and Computer Science - Tel Aviv University",
            st["body"],
        )
    )
    story.append(para("Arabic: Native | Hebrew: Fluent | English: Fluent", st["body"]))
    return story


def footer(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor(MUTED))
    canvas.drawCentredString(
        A4[0] / 2,
        7 * mm,
        f"Fathallah Haj | fhaj.vercel.app | Page {doc.page}",
    )
    canvas.restoreState()


def build_pdf(path: Path, story: list, title: str, top_margin: float = 11 * mm) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=17 * mm,
        leftMargin=17 * mm,
        topMargin=top_margin,
        bottomMargin=12 * mm,
        title=title,
        author="Fathallah Haj",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def main() -> None:
    st = styles()
    one_page = one_page_story(st)
    full = full_story(st)
    build_pdf(DEFAULT_OUTPUT, one_page, "Fathallah Haj DevOps CV 2026 - One Page")
    build_pdf(ONE_PAGE_OUTPUT, one_page_story(st), "Fathallah Haj DevOps CV 2026 - One Page")
    build_pdf(FULL_OUTPUT, full, "Fathallah Haj DevOps CV 2026 - Full")
    print(DEFAULT_OUTPUT)
    print(ONE_PAGE_OUTPUT)
    print(FULL_OUTPUT)


if __name__ == "__main__":
    main()
