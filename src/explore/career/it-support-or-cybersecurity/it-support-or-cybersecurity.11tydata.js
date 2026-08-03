export default {
  scenarioLab: {
    anchorId: "technology-team-scenarios",
    title: "You’re on the Technology Team. What Happens Next?",
    introduction:
      "Choose an organization size, then work through six situations. There is no grade. Each choice reveals what happened, what a strong response considers, and how ownership may change as a company grows.",
    sizes: [
      {
        id: "small",
        label: "Small company",
        description: "One person or a very small team may handle nearly every technology problem.",
      },
      {
        id: "midsize",
        label: "Midsize company",
        description: "A general IT team may have a few specialists, but responsibilities still overlap.",
      },
      {
        id: "large",
        label: "Large company",
        description: "Specialized support, infrastructure, security, identity, and management teams are more common.",
      },
    ],
    hats: [
      { id: "user-support", label: "User support" },
      { id: "infrastructure", label: "Systems and infrastructure" },
      { id: "cybersecurity", label: "Cybersecurity" },
      { id: "identity", label: "Identity and access" },
      { id: "continuity", label: "Backup and recovery" },
      { id: "assets", label: "Asset management" },
      { id: "documentation", label: "Documentation" },
      { id: "risk", label: "Business risk and priorities" },
    ],
    scenarios: [
      {
        id: "unplugged-computer",
        title: "The computer that suddenly died",
        prompt:
          "An employee says their computer shut off without warning and will not turn back on. What would you check first?",
        options: [
          {
            id: "check-power",
            label: "Check the power cable, power strip, outlet, and nearby equipment.",
            tone: "strong",
            feedbackTitle: "Strong first move",
            feedback:
              "Start with the simplest plausible failure. A quick physical check can resolve the issue before logs, scans, or replacement work consume time.",
          },
          {
            id: "review-logs",
            label: "Review operating-system logs for a shutdown event.",
            tone: "workable",
            feedbackTitle: "Useful after power is restored",
            feedback:
              "Logs may help explain an unexpected shutdown, but the computer must have power before you can examine them locally.",
          },
          {
            id: "scan-malware",
            label: "Begin a malware investigation because sudden shutdowns can be suspicious.",
            tone: "weak",
            feedbackTitle: "Possible, but too early",
            feedback:
              "Security remains in the background, but there is not yet evidence that malicious activity caused the failure.",
          },
          {
            id: "replace-device",
            label: "Replace the computer so the employee can return to work quickly.",
            tone: "weak",
            feedbackTitle: "Fast, but wasteful",
            feedback:
              "A replacement may eventually be needed. Skipping basic troubleshooting can turn a loose cable into an unnecessary hardware purchase.",
          },
        ],
        reveal: {
          happened:
            "Someone kicked the power-strip plug out of the wall. The computer, monitor, and desk phone all lost power.",
          lesson:
            "Support work often begins with ordinary physical causes. Good troubleshooting stays alert for security concerns without assuming every failure is an attack.",
          ownership: {
            small:
              "The same person may inspect the desk, restore the equipment, check for file corruption, secure the cable, and explain the interruption.",
            midsize:
              "Desktop support may resolve the immediate problem and ask facilities or the office manager to correct an unsafe cable arrangement.",
            large:
              "A service desk may triage the ticket, desktop support may visit the user, and facilities may own the power placement. Security probably stays uninvolved unless evidence suggests tampering.",
          },
          hats: ["user-support", "infrastructure", "documentation"],
        },
      },
      {
        id: "missing-file",
        title: "The missing executive file",
        prompt:
          "A senior employee deleted an important file and expects it to be restored immediately. What would you do first?",
        options: [
          {
            id: "clarify-file",
            label:
              "Ask when and where the file was created and deleted, then check local recovery, version history, and application options.",
            tone: "strong",
            feedbackTitle: "Strong first move",
            feedback:
              "Recovery depends on where the file lived, whether it ever reached a protected location, and which recovery features are available.",
          },
          {
            id: "promise-restore",
            label: "Promise that the backup team will restore it shortly.",
            tone: "weak",
            feedbackTitle: "Avoid promises before checking",
            feedback:
              "Backups may not contain the file, and restoration may be slow. A confident promise can create a second problem when the recovery design cannot meet the expectation.",
          },
          {
            id: "restore-tape",
            label: "Start restoring the newest tape backup immediately.",
            tone: "workable",
            feedbackTitle: "A possible later step",
            feedback:
              "A tape restore may be appropriate after faster options are exhausted and the correct backup set is identified. It should not be the automatic first action.",
          },
          {
            id: "security-incident",
            label: "Open a security incident because an important file was deleted.",
            tone: "workable",
            feedbackTitle: "Escalate when evidence supports it",
            feedback:
              "Accidental deletion is common. Security should become involved when logs, access patterns, or the surrounding circumstances suggest misuse.",
          },
        ],
        reveal: {
          happened:
            "The company funded periodic full tape backups with daily change backups, compressed to save space. Restores were slow, testing was limited, and a file created and deleted between runs might never have reached a backup.",
          lesson:
            "Backup design reflects business choices about cost, recovery time, and acceptable data loss. Users often expect capabilities that leadership did not fund.",
          ownership: {
            small:
              "One generalist may search local recovery options, inspect backup logs, attempt the restore, explain the limitation, and receive the frustration caused by a budget decision.",
            midsize:
              "Support may gather details while a systems administrator checks backups. A manager may need to explain the recovery limitation and propose a better retention or testing process.",
            large:
              "Support, storage or backup engineering, application owners, and security may each handle a portion. Recovery objectives and exceptions are usually documented more formally.",
          },
          hats: ["user-support", "continuity", "infrastructure", "risk", "documentation"],
        },
      },
      {
        id: "suspicious-popup",
        title: "The suspicious pop-up",
        prompt:
          "An employee reports a strange pop-up after opening an email attachment. What is the best first response?",
        options: [
          {
            id: "gather-isolate",
            label:
              "Ask what happened, preserve useful details, and isolate the device if compromise is reasonably suspected.",
            tone: "strong",
            feedbackTitle: "Strong first move",
            feedback:
              "The response protects the organization while preserving the information needed to determine what happened and how far it may have spread.",
          },
          {
            id: "close-popup",
            label: "Tell the employee to close the pop-up and continue working.",
            tone: "weak",
            feedbackTitle: "Too little information",
            feedback:
              "Closing a window does not undo a download, credential entry, or malicious process. The report needs enough attention to determine whether exposure occurred.",
          },
          {
            id: "scan-return",
            label: "Run one malware scan and return the device if it reports no findings.",
            tone: "workable",
            feedbackTitle: "One useful signal, not a full answer",
            feedback:
              "A scan can help, but no single tool proves the device or account is safe. Email, identity, endpoint, and network evidence may matter.",
          },
          {
            id: "reimage-now",
            label: "Reimage the computer immediately before investigating.",
            tone: "workable",
            feedbackTitle: "Containment may be right, but evidence can be lost",
            feedback:
              "Reimaging may restore a known state. Doing it before collecting essential information can erase evidence needed to understand the incident and protect other users.",
          },
        ],
        reveal: {
          happened:
            "The attachment displayed a fake update prompt. The employee entered their password before becoming suspicious.",
          lesson:
            "The device may need attention, but the account is now part of the incident too. Support and security must share accurate details rather than treating the pop-up as an isolated desktop problem.",
          ownership: {
            small:
              "The same person may disconnect the device, reset credentials, review available logs, scan or rebuild the system, notify leadership, and check whether anyone else received the message.",
            midsize:
              "Support may collect the report and isolate the device while a security or senior infrastructure specialist reviews the account, email, endpoint, and broader exposure.",
            large:
              "The service desk, endpoint team, identity team, email security team, and incident responders may follow a documented handoff and containment process.",
          },
          hats: ["user-support", "cybersecurity", "identity", "documentation"],
        },
      },
      {
        id: "new-employee",
        title: "The new employee who starts today",
        prompt:
          "A manager asks for immediate access because a new employee has arrived, but the access request is incomplete. What would you do?",
        options: [
          {
            id: "confirm-approval",
            label:
              "Confirm the approved role and required systems, then provide only the access needed for the work.",
            tone: "strong",
            feedbackTitle: "Strong first move",
            feedback:
              "A fast onboarding process still needs an accountable request, appropriate approval, and access matched to the person’s role.",
          },
          {
            id: "copy-coworker",
            label: "Copy the permissions of a coworker with a similar title.",
            tone: "workable",
            feedbackTitle: "Common, but risky",
            feedback:
              "A coworker may have accumulated special access over time. Copying it can reproduce old mistakes and grant more than the new employee needs.",
          },
          {
            id: "broad-access",
            label: "Grant broad access now and remove anything unnecessary later.",
            tone: "weak",
            feedbackTitle: "Convenient access tends to remain",
            feedback:
              "Temporary broad access is easily forgotten. It also creates avoidable exposure before anyone has confirmed what the employee should use.",
          },
          {
            id: "wait-for-tickets",
            label: "Create the basic account and wait for the employee to report each missing permission.",
            tone: "workable",
            feedbackTitle: "Safer than broad access, but disruptive",
            feedback:
              "This limits initial access, but poor planning shifts the cost to the employee and support team through repeated interruptions.",
          },
        ],
        reveal: {
          happened:
            "The employee needs several standard tools, one sensitive system, a laptop, remote access, and a phone. No one completed the approvals before the start date.",
          lesson:
            "Onboarding connects user support, asset preparation, identity, security, management approval, and business productivity. Clear role-based access makes the process faster and safer.",
          ownership: {
            small:
              "One person may prepare the equipment, create accounts, configure remote access, teach the employee, chase approvals, and later remove access when the employee leaves.",
            midsize:
              "Support may prepare the device while identity or systems staff provision access. Managers and system owners still need to approve sensitive permissions.",
            large:
              "Human resources, identity governance, service desk, endpoint engineering, telecom, application owners, and security may participate through an automated workflow.",
          },
          hats: ["user-support", "identity", "assets", "cybersecurity", "documentation"],
        },
      },
      {
        id: "damaged-laptop",
        title: "The traveling laptop comes home",
        prompt:
          "A company laptop returns from a trip with severe physical damage. What should happen before it is quietly replaced?",
        options: [
          {
            id: "document-assess",
            label:
              "Document the condition, assess whether the device and data are secure, then repair or replace it under policy.",
            tone: "strong",
            feedbackTitle: "Strong first move",
            feedback:
              "The organization needs an accurate asset record, a safe device, and confidence that company information was not exposed during the damage or travel.",
          },
          {
            id: "replace-silently",
            label: "Replace it without documenting the damage so the employee can keep working.",
            tone: "weak",
            feedbackTitle: "Fast, but accountability disappears",
            feedback:
              "A silent replacement hides costs, weakens asset records, and prevents the organization from recognizing a recurring handling problem.",
          },
          {
            id: "boot-and-return",
            label: "If it starts, return it to service until the screen fails completely.",
            tone: "weak",
            feedbackTitle: "Powering on is not a safety or security assessment",
            feedback:
              "Severe physical damage can affect batteries, storage, displays, and reliability. A device that boots can still be unsafe or unsuitable for company use.",
          },
          {
            id: "security-only",
            label: "Send it directly to cybersecurity because damaged laptops are security incidents.",
            tone: "workable",
            feedbackTitle: "Security may be involved, but the issue is broader",
            feedback:
              "Security should review possible exposure when warranted. Asset management, support, repair, data recovery, and management policy also matter.",
          },
        ],
        reveal: {
          happened:
            "The screen was cracked in a broad pressure pattern consistent with someone sitting squarely on the closed laptop. The employee described the damage as unexpected.",
          lesson:
            "Technology work includes equipment handling, awkward conversations, evidence, policy, and business continuity. The technical repair is only one part of the response.",
          ownership: {
            small:
              "The same person may inspect the laptop, recover data, arrange repair, issue a replacement, update the inventory, discuss the damage with management, and reinforce travel expectations.",
            midsize:
              "Desktop support or asset management may document and replace the device. Security reviews data exposure when the circumstances or controls require it.",
            large:
              "Asset management, desktop engineering, information security, travel support, procurement, and the employee’s management chain may each have defined responsibilities.",
          },
          hats: ["user-support", "assets", "cybersecurity", "documentation", "risk"],
        },
      },
      {
        id: "budget-cut",
        title: "The budget is cut, but the expectations are not",
        prompt:
          "Leadership reduces funding for replacement equipment, backups, software, and contingency while expecting the same service. What is the strongest response?",
        options: [
          {
            id: "document-tradeoffs",
            label:
              "Prioritize essential services, translate the cuts into business effects, and document the risks leadership accepts.",
            tone: "strong",
            feedbackTitle: "Strong first move",
            feedback:
              "Decision makers need a clear connection between funding and outcomes such as recovery time, replacement delays, security exposure, and downtime.",
          },
          {
            id: "absorb-cut",
            label: "Quietly absorb the cut and continue promising the same service.",
            tone: "weak",
            feedbackTitle: "The hidden gap becomes the technology team’s problem",
            feedback:
              "Unfunded expectations usually surface during an outage, failed restore, urgent replacement, or security event. Silence makes the eventual surprise worse.",
          },
          {
            id: "shift-maintenance",
            label: "Move long-term maintenance funds into immediate support needs.",
            tone: "workable",
            feedbackTitle: "Sometimes necessary, but expensive later",
            feedback:
              "This may solve today’s shortage while increasing future failures, emergency purchases, technical debt, and security risk.",
          },
          {
            id: "remove-contingency",
            label: "Submit the leanest possible budget to show that the team is saving money.",
            tone: "weak",
            feedbackTitle: "A lean request can still be treated as an opening bid",
            feedback:
              "Reasonable contingency covers failures, price changes, urgent replacements, and unplanned work. Removing it before leadership applies cuts can leave the final budget below the minimum needed.",
          },
        ],
        reveal: {
          happened:
            "A carefully reduced budget was cut again the same day it was submitted. Service expectations, recovery promises, and the list of supported equipment did not change.",
          lesson:
            "Technical teams cannot remove the consequences of business decisions. Clear service levels, contingency, risk records, and honest tradeoffs protect the organization and the people expected to support it.",
          ownership: {
            small:
              "The technology generalist may prepare the budget, operate within the cuts, explain every limitation, and still be held responsible when an unfunded capability is needed.",
            midsize:
              "An IT manager may negotiate priorities with leadership while systems, support, and security staff identify which services or protections must change.",
            large:
              "Budget owners, service managers, architecture, risk, procurement, and business leaders may use formal planning and risk-acceptance processes, although cuts still create real tradeoffs.",
          },
          hats: ["risk", "continuity", "infrastructure", "cybersecurity", "documentation"],
        },
      },
    ],
  },
};
