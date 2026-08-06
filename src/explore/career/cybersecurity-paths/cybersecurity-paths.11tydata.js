export default {
  "assessment": {
    "anchorId": "cybersecurity-career-quiz",
    "title": "Find your cybersecurity career paths",
    "introduction": "Pick the answer that sounds most satisfying. Do not overthink it. The quiz returns your two strongest matches.",
    "paths": [
      {
        "id": "defensive-security",
        "label": "Defensive Security and Security Operations",
        "description": "You may enjoy monitoring systems, recognizing unusual behavior, prioritizing threats, and improving the organization’s ability to detect and contain suspicious activity.",
        "nextSteps": [
          "Review sample authentication, endpoint, or network logs.",
          "Compare normal activity with patterns that deserve investigation.",
          "Practice prioritizing vulnerabilities by exposure and business impact."
        ],
        "url": "#defensive-security",
        "linkLabel": "Read about Defensive Security and Security Operations"
      },
      {
        "id": "incident-response",
        "label": "Incident Response, Forensics, and Threat Hunting",
        "description": "You may enjoy following evidence, reconstructing events, investigating uncertain situations, and determining what happened during or after an incident.",
        "nextSteps": [
          "Build a timeline from sample login and system events.",
          "Separate confirmed facts from theories and unanswered questions.",
          "Compare containment needs with evidence-preservation needs."
        ],
        "url": "#incident-response",
        "linkLabel": "Read about Incident Response, Forensics, and Threat Hunting"
      },
      {
        "id": "offensive-security",
        "label": "Offensive Security and Security Testing",
        "description": "You may enjoy finding weaknesses, testing assumptions, exploring attack paths, and helping teams understand how an attacker could approach a target.",
        "nextSteps": [
          "Use an authorized lab to practice basic vulnerability discovery.",
          "Write a finding with evidence, impact, and a practical correction.",
          "Compare a weakness with the conditions required to exploit it."
        ],
        "url": "#offensive-security",
        "linkLabel": "Read about Offensive Security and Security Testing"
      },
      {
        "id": "security-engineering",
        "label": "Security Engineering and Architecture",
        "description": "You may enjoy building controls, improving system designs, automating security work, and reducing risk before a system reaches production.",
        "nextSteps": [
          "Diagram a small environment and identify its trust boundaries.",
          "Design access roles for users with different responsibilities.",
          "Build a simple check or automation for one security setting."
        ],
        "url": "#security-engineering",
        "linkLabel": "Read about Security Engineering and Architecture"
      },
      {
        "id": "governance-assurance",
        "label": "Governance, Risk, Compliance, and Assurance",
        "description": "You may enjoy evaluating controls, working with evidence and standards, explaining risk, and determining whether requirements are met in practice.",
        "nextSteps": [
          "Review a device or account against a short security checklist.",
          "Record the evidence supporting each conclusion.",
          "Write a finding with the requirement, condition, risk, and correction."
        ],
        "url": "#governance-assurance",
        "linkLabel": "Read about Governance, Risk, Compliance, and Assurance"
      },
      {
        "id": "security-leadership",
        "label": "Security Leadership and Coordination",
        "description": "You may enjoy organizing security work, coordinating specialists, balancing technical and business concerns, and helping teams make clear decisions.",
        "nextSteps": [
          "Create a small incident plan with roles and decision points.",
          "Translate a technical risk into a concise business impact statement.",
          "Build a project plan with owners, dependencies, risks, and status."
        ],
        "url": "#security-leadership",
        "linkLabel": "Read about Security Leadership and Coordination"
      }
    ],
    "questions": [
      {
        "id": "strange-alert",
        "prompt": "A strange security alert appears. What do you want to do?",
        "options": [
          {
            "id": "decide-real-threat",
            "label": "Decide whether it is a real threat.",
            "scores": {
              "defensive-security": 3,
              "incident-response": 1
            }
          },
          {
            "id": "trace-what-happened",
            "label": "Trace exactly what happened.",
            "scores": {
              "incident-response": 3,
              "defensive-security": 1
            }
          },
          {
            "id": "recreate-attack",
            "label": "Recreate the attack.",
            "scores": {
              "offensive-security": 3,
              "incident-response": 1
            }
          },
          {
            "id": "fix-design",
            "label": "Fix the weak system design.",
            "scores": {
              "security-engineering": 3,
              "defensive-security": 1
            }
          },
          {
            "id": "find-control-failure",
            "label": "Find which control failed.",
            "scores": {
              "governance-assurance": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "move-people",
            "label": "Get the right people moving.",
            "scores": {
              "security-leadership": 3,
              "incident-response": 1
            }
          }
        ]
      },
      {
        "id": "best-win",
        "prompt": "Which win would feel best?",
        "options": [
          {
            "id": "build-safer",
            "label": "Building something safer.",
            "scores": {
              "security-engineering": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "hidden-weakness",
            "label": "Finding a hidden weakness.",
            "scores": {
              "offensive-security": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "teams-succeed",
            "label": "Helping several teams succeed.",
            "scores": {
              "security-leadership": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "catch-early",
            "label": "Catching trouble early.",
            "scores": {
              "defensive-security": 3,
              "incident-response": 1
            }
          },
          {
            "id": "close-gap",
            "label": "Closing a control gap.",
            "scores": {
              "governance-assurance": 3,
              "security-leadership": 1
            }
          },
          {
            "id": "solve-mystery",
            "label": "Solving the mystery.",
            "scores": {
              "incident-response": 3,
              "offensive-security": 1
            }
          }
        ]
      },
      {
        "id": "preferred-screen",
        "prompt": "Which screen would you rather open?",
        "options": [
          {
            "id": "risk-tracker",
            "label": "A risk and controls tracker.",
            "scores": {
              "governance-assurance": 3,
              "security-leadership": 1
            }
          },
          {
            "id": "test-lab",
            "label": "A vulnerable test lab.",
            "scores": {
              "offensive-security": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "incident-timeline",
            "label": "An incident timeline.",
            "scores": {
              "incident-response": 3,
              "defensive-security": 1
            }
          },
          {
            "id": "incident-board",
            "label": "A project or incident board.",
            "scores": {
              "security-leadership": 3,
              "incident-response": 1
            }
          },
          {
            "id": "system-diagram",
            "label": "A cloud or network diagram.",
            "scores": {
              "security-engineering": 3,
              "defensive-security": 1
            }
          },
          {
            "id": "alert-dashboard",
            "label": "A security alert dashboard.",
            "scores": {
              "defensive-security": 3,
              "incident-response": 1
            }
          }
        ]
      },
      {
        "id": "repeated-problem",
        "prompt": "The same problem keeps returning. What is your instinct?",
        "options": [
          {
            "id": "owner-deadline",
            "label": "Assign an owner and deadline.",
            "scores": {
              "security-leadership": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "root-cause",
            "label": "Find the root cause.",
            "scores": {
              "incident-response": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "tighten-process",
            "label": "Tighten the requirement or process.",
            "scores": {
              "governance-assurance": 3,
              "security-leadership": 1
            }
          },
          {
            "id": "improve-detection",
            "label": "Improve the detection.",
            "scores": {
              "defensive-security": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "redesign-system",
            "label": "Redesign the system.",
            "scores": {
              "security-engineering": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "test-depth",
            "label": "See how far the weakness goes.",
            "scores": {
              "offensive-security": 3,
              "incident-response": 1
            }
          }
        ]
      },
      {
        "id": "system-secure",
        "prompt": "A team says its new system is secure. What do you want to do?",
        "options": [
          {
            "id": "prove-controls",
            "label": "Ask them to prove the controls work.",
            "scores": {
              "governance-assurance": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "inspect-design",
            "label": "Inspect how it was designed.",
            "scores": {
              "security-engineering": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "monitor-activity",
            "label": "Monitor it for suspicious activity.",
            "scores": {
              "defensive-security": 3,
              "incident-response": 1
            }
          },
          {
            "id": "remaining-risk",
            "label": "Confirm who owns the remaining risks.",
            "scores": {
              "security-leadership": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "break-safely",
            "label": "Try to break it safely.",
            "scores": {
              "offensive-security": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "recorded-evidence",
            "label": "Examine what evidence it records.",
            "scores": {
              "incident-response": 3,
              "defensive-security": 1
            }
          }
        ]
      },
      {
        "id": "interesting-day",
        "prompt": "Which workday sounds most interesting?",
        "options": [
          {
            "id": "real-incident",
            "label": "Investigating a real incident.",
            "scores": {
              "incident-response": 3,
              "defensive-security": 1
            }
          },
          {
            "id": "controls-automation",
            "label": "Building controls and automation.",
            "scores": {
              "security-engineering": 3,
              "defensive-security": 1
            }
          },
          {
            "id": "test-weaknesses",
            "label": "Testing systems for weaknesses.",
            "scores": {
              "offensive-security": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "coordinate-decisions",
            "label": "Coordinating people and decisions.",
            "scores": {
              "security-leadership": 3,
              "incident-response": 1
            }
          },
          {
            "id": "review-requirements",
            "label": "Reviewing evidence and requirements.",
            "scores": {
              "governance-assurance": 3,
              "security-leadership": 1
            }
          },
          {
            "id": "hunt-activity",
            "label": "Hunting suspicious activity.",
            "scores": {
              "defensive-security": 3,
              "incident-response": 1
            }
          }
        ]
      },
      {
        "id": "preferred-compliment",
        "prompt": "Which compliment would you most like to hear?",
        "options": [
          {
            "id": "system-safer",
            "label": "You made the whole system safer.",
            "scores": {
              "security-engineering": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "caught-early",
            "label": "You caught it early.",
            "scores": {
              "defensive-security": 3,
              "incident-response": 1
            }
          },
          {
            "id": "kept-focused",
            "label": "You kept everyone focused.",
            "scores": {
              "security-leadership": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "gap-before-audit",
            "label": "You found the gap before the audit.",
            "scores": {
              "governance-assurance": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "found-missed",
            "label": "You found what everyone missed.",
            "scores": {
              "offensive-security": 3,
              "incident-response": 1
            }
          },
          {
            "id": "figured-out",
            "label": "You figured out what happened.",
            "scores": {
              "incident-response": 3,
              "defensive-security": 1
            }
          }
        ]
      },
      {
        "id": "afternoon-topic",
        "prompt": "Which topic would you willingly spend an afternoon exploring?",
        "options": [
          {
            "id": "programs-priorities",
            "label": "Programs, people, and priorities.",
            "scores": {
              "security-leadership": 3,
              "governance-assurance": 1
            }
          },
          {
            "id": "exploits-testing",
            "label": "Exploits, attack paths, and testing.",
            "scores": {
              "offensive-security": 3,
              "security-engineering": 1
            }
          },
          {
            "id": "risk-audits",
            "label": "Risk, standards, and audits.",
            "scores": {
              "governance-assurance": 3,
              "security-leadership": 1
            }
          },
          {
            "id": "forensics-timelines",
            "label": "Forensics, evidence, and timelines.",
            "scores": {
              "incident-response": 3,
              "defensive-security": 1
            }
          },
          {
            "id": "cloud-identity",
            "label": "Cloud security, identity, and automation.",
            "scores": {
              "security-engineering": 3,
              "defensive-security": 1
            }
          },
          {
            "id": "threats-detection",
            "label": "Threats, alerts, and detection.",
            "scores": {
              "defensive-security": 3,
              "incident-response": 1
            }
          }
        ]
      }
    ]
  }
};
