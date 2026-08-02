export default {
  "assessment": {
    "anchorId": "career-quiz",
    "title": "Find your strongest technology career directions",
    "introduction": "Choose the work that sounds most interesting, even when you have not learned the skill yet. The assessment returns your two strongest matches.",
    "paths": [
      {
        "id": "it-operations",
        "label": "IT Operations and Infrastructure",
        "description": "You may enjoy keeping systems available, tracing technical failures, and improving the infrastructure people depend on.",
        "nextSteps": [
          "Learn how devices communicate across a small network.",
          "Build a Windows or Linux lab and practice account, service, and permission changes.",
          "Document one troubleshooting problem from symptoms through resolution."
        ],
        "url": "/network-plus/",
        "linkLabel": "Explore Network+ resources"
      },
      {
        "id": "development",
        "label": "Software Development and Automation",
        "description": "You may enjoy building useful tools, translating requirements into logic, and improving repetitive work through code.",
        "nextSteps": [
          "Choose one beginner-friendly language and complete a small working program.",
          "Use version control to track changes and explain why each change was made.",
          "Practice debugging by reproducing and fixing a problem you introduced."
        ]
      },
      {
        "id": "management",
        "label": "Technology Management and Coordination",
        "description": "You may enjoy organizing technical work, helping specialists make decisions, and keeping complicated efforts moving toward a clear result.",
        "nextSteps": [
          "Plan a small technology project with scope, dependencies, risks, and owners.",
          "Practice writing concise status updates for technical and nontechnical readers.",
          "Notice which blockers require a decision, more information, or better coordination."
        ]
      },
      {
        "id": "cybersecurity",
        "label": "Cybersecurity",
        "description": "You may enjoy reducing technology risk, finding weaknesses, investigating unusual activity, or helping offensive and defensive teams improve each other.",
        "nextSteps": [
          "Diagram a small network and identify its important assets, access paths, and likely risks.",
          "Learn what normal network, account, and system activity looks like before studying attacks.",
          "Compare defensive, offensive, purple-team, engineering, incident response, and risk roles."
        ],
        "url": "/security-plus/",
        "linkLabel": "Explore Security+ resources"
      },
      {
        "id": "quality-assurance",
        "label": "Quality, Testing, and Improvement",
        "description": "You may enjoy comparing expected and actual behavior, exploring edge cases, and describing problems clearly enough for someone else to reproduce them.",
        "nextSteps": [
          "Test a small application with normal, missing, invalid, and unusually large inputs.",
          "Write a defect report with exact steps, expected behavior, and actual behavior.",
          "Try a basic automated test after you understand the manual test."
        ]
      },
      {
        "id": "technical-assurance",
        "label": "Audit, Compliance, and Technical Assurance",
        "description": "You may enjoy working with requirements, configurations, evidence, and corrective actions to determine whether technology meets an established standard.",
        "nextSteps": [
          "Build a short configuration checklist and collect evidence for each requirement.",
          "Compare a device or virtual machine with a published security baseline.",
          "Practice explaining why a finding matters and what evidence would close it."
        ],
        "url": "/security-plus/",
        "linkLabel": "Explore security and governance foundations"
      }
    ],
    "questions": [
      {
        "id": "system-outage",
        "prompt": "A business system suddenly stops working. Which part of the problem interests you most?",
        "options": [
          {
            "id": "investigate-security",
            "label": "Determining whether suspicious or malicious activity caused the outage.",
            "scores": {
              "cybersecurity": 3,
              "technical-assurance": 1
            }
          },
          {
            "id": "restore-service",
            "label": "Restoring the service and isolating the failed component.",
            "scores": {
              "it-operations": 3,
              "quality-assurance": 1
            }
          },
          {
            "id": "reproduce-failure",
            "label": "Reproducing the failure and identifying the exact conditions that trigger it.",
            "scores": {
              "quality-assurance": 3,
              "development": 1
            }
          },
          {
            "id": "coordinate-response",
            "label": "Coordinating the people involved, clarifying responsibilities, and keeping others informed.",
            "scores": {
              "management": 3,
              "it-operations": 1
            }
          },
          {
            "id": "review-controls",
            "label": "Checking whether required controls, procedures, and approvals were followed.",
            "scores": {
              "technical-assurance": 3,
              "management": 1
            }
          },
          {
            "id": "automate-prevention",
            "label": "Writing a fix or creating an automated way to prevent the same failure.",
            "scores": {
              "development": 3,
              "cybersecurity": 1
            }
          }
        ]
      },
      {
        "id": "application-launch",
        "prompt": "A new application is being prepared for launch. Which responsibility would you choose?",
        "options": [
          {
            "id": "design-tests",
            "label": "Designing tests for normal use, invalid inputs, unusual conditions, and future changes.",
            "scores": {
              "quality-assurance": 3,
              "development": 1
            }
          },
          {
            "id": "prepare-infrastructure",
            "label": "Preparing the servers, network connections, accounts, backups, and monitoring.",
            "scores": {
              "it-operations": 3,
              "management": 1
            }
          },
          {
            "id": "review-threats",
            "label": "Reviewing possible threats, access risks, and ways the application could be misused.",
            "scores": {
              "cybersecurity": 3,
              "technical-assurance": 1
            }
          },
          {
            "id": "build-feature",
            "label": "Building a feature, integration, or supporting tool.",
            "scores": {
              "development": 3,
              "quality-assurance": 1
            }
          },
          {
            "id": "map-controls",
            "label": "Mapping requirements to controls and gathering evidence that the requirements were met.",
            "scores": {
              "technical-assurance": 3,
              "cybersecurity": 1
            }
          },
          {
            "id": "organize-launch",
            "label": "Organizing the schedule, dependencies, responsibilities, and decisions needed for launch.",
            "scores": {
              "management": 3,
              "it-operations": 1
            }
          }
        ]
      },
      {
        "id": "repeated-task",
        "prompt": "You discover that someone performs the same manual task every week. What is your first instinct?",
        "options": [
          {
            "id": "automate-task",
            "label": "Automate the task with a script, application, or workflow.",
            "scores": {
              "development": 3,
              "it-operations": 1
            }
          },
          {
            "id": "check-security-gap",
            "label": "Determine whether the repeated task creates or reveals a security weakness.",
            "scores": {
              "cybersecurity": 3,
              "technical-assurance": 1
            }
          },
          {
            "id": "standardize-operation",
            "label": "Standardize the configuration or operating procedure so the task is easier to manage.",
            "scores": {
              "it-operations": 3,
              "quality-assurance": 1
            }
          },
          {
            "id": "test-earlier",
            "label": "Create a repeatable test that detects the issue earlier.",
            "scores": {
              "quality-assurance": 3,
              "development": 1
            }
          },
          {
            "id": "review-control-failure",
            "label": "Find out why the related process or control continues to fail.",
            "scores": {
              "technical-assurance": 3,
              "management": 1
            }
          },
          {
            "id": "assign-ownership",
            "label": "Assign clear ownership and create a plan to eliminate the recurring problem.",
            "scores": {
              "management": 3,
              "cybersecurity": 1
            }
          }
        ]
      },
      {
        "id": "information-preference",
        "prompt": "Which type of information would you most enjoy examining?",
        "options": [
          {
            "id": "project-information",
            "label": "Project plans, dependencies, priorities, budgets, and status reports.",
            "scores": {
              "management": 3,
              "technical-assurance": 1
            }
          },
          {
            "id": "source-code",
            "label": "Source code, application logic, data structures, and application programming interfaces.",
            "scores": {
              "development": 3,
              "quality-assurance": 1
            }
          },
          {
            "id": "standards-evidence",
            "label": "Standards, configuration baselines, control requirements, and supporting evidence.",
            "scores": {
              "technical-assurance": 3,
              "cybersecurity": 1
            }
          },
          {
            "id": "system-data",
            "label": "Network diagrams, system settings, performance data, and troubleshooting output.",
            "scores": {
              "it-operations": 3,
              "development": 1
            }
          },
          {
            "id": "security-data",
            "label": "Security alerts, vulnerabilities, access logs, and threat information.",
            "scores": {
              "cybersecurity": 3,
              "it-operations": 1
            }
          },
          {
            "id": "test-evidence",
            "label": "Test cases, expected results, defect reports, and reproduction steps.",
            "scores": {
              "quality-assurance": 3,
              "management": 1
            }
          }
        ]
      },
      {
        "id": "satisfying-result",
        "prompt": "Which result would feel most satisfying?",
        "options": [
          {
            "id": "find-weakness",
            "label": "Finding a weakness before someone can use it to cause harm.",
            "scores": {
              "cybersecurity": 3,
              "technical-assurance": 1
            }
          },
          {
            "id": "stable-system",
            "label": "Keeping a system stable, connected, and available to the people who need it.",
            "scores": {
              "it-operations": 3,
              "management": 1
            }
          },
          {
            "id": "catch-defect",
            "label": "Catching a defect before it reaches users.",
            "scores": {
              "quality-assurance": 3,
              "development": 1
            }
          },
          {
            "id": "create-tool",
            "label": "Creating a useful feature, tool, or automation that did not exist before.",
            "scores": {
              "development": 3,
              "quality-assurance": 1
            }
          },
          {
            "id": "complete-project",
            "label": "Helping a team complete complicated work successfully.",
            "scores": {
              "management": 3,
              "it-operations": 1
            }
          },
          {
            "id": "close-finding",
            "label": "Identifying a gap, documenting the evidence, and confirming that it was corrected.",
            "scores": {
              "technical-assurance": 3,
              "cybersecurity": 1
            }
          }
        ]
      },
      {
        "id": "incomplete-information",
        "prompt": "You are given an unfamiliar problem with incomplete information. How would you prefer to begin?",
        "options": [
          {
            "id": "compare-standard",
            "label": "Compare the available evidence with an established requirement or standard.",
            "scores": {
              "technical-assurance": 3,
              "cybersecurity": 1
            }
          },
          {
            "id": "build-prototype",
            "label": "Build a small prototype to test an idea.",
            "scores": {
              "development": 3,
              "quality-assurance": 1
            }
          },
          {
            "id": "organize-specialists",
            "label": "Gather the right specialists, define the decision that must be made, and organize the response.",
            "scores": {
              "management": 3,
              "technical-assurance": 1
            }
          },
          {
            "id": "narrow-causes",
            "label": "Check the most likely technical causes and narrow them down one at a time.",
            "scores": {
              "it-operations": 3,
              "development": 1
            }
          },
          {
            "id": "isolate-conditions",
            "label": "Reproduce the problem and isolate the conditions that change the result.",
            "scores": {
              "quality-assurance": 3,
              "it-operations": 1
            }
          },
          {
            "id": "develop-threat-theory",
            "label": "Search for unusual activity and develop a theory about what may have happened.",
            "scores": {
              "cybersecurity": 3,
              "management": 1
            }
          }
        ]
      },
      {
        "id": "major-change",
        "prompt": "A team proposes a major technology change. Which question would you be most likely to ask?",
        "options": [
          {
            "id": "required-records",
            "label": "Were the required reviews, approvals, and records completed?",
            "scores": {
              "technical-assurance": 3,
              "management": 1
            }
          },
          {
            "id": "security-impact",
            "label": "How could this change affect access, data protection, or the attack surface?",
            "scores": {
              "cybersecurity": 3,
              "technical-assurance": 1
            }
          },
          {
            "id": "operational-impact",
            "label": "Will the system remain reliable, supportable, and easy to recover?",
            "scores": {
              "it-operations": 3,
              "cybersecurity": 1
            }
          },
          {
            "id": "design-change",
            "label": "How should the feature or integration be designed?",
            "scores": {
              "development": 3,
              "quality-assurance": 1
            }
          },
          {
            "id": "test-change",
            "label": "How will we test expected behavior, unusual inputs, and possible side effects?",
            "scores": {
              "quality-assurance": 3,
              "development": 1
            }
          },
          {
            "id": "delivery-impact",
            "label": "What will this change require in time, people, budget, and coordination?",
            "scores": {
              "management": 3,
              "it-operations": 1
            }
          }
        ]
      },
      {
        "id": "conversation",
        "prompt": "Which conversation sounds most interesting?",
        "options": [
          {
            "id": "present-finding",
            "label": "Presenting a finding, explaining the evidence, and discussing corrective action.",
            "scores": {
              "technical-assurance": 3,
              "cybersecurity": 1
            }
          },
          {
            "id": "diagnose-system",
            "label": "Helping someone diagnose a server, account, device, or network problem.",
            "scores": {
              "it-operations": 3,
              "management": 1
            }
          },
          {
            "id": "explain-threat",
            "label": "Explaining how a threat works and which control could reduce the risk.",
            "scores": {
              "cybersecurity": 3,
              "technical-assurance": 1
            }
          },
          {
            "id": "align-teams",
            "label": "Helping technical and business teams agree on priorities and next steps.",
            "scores": {
              "management": 3,
              "it-operations": 1
            }
          },
          {
            "id": "structure-code",
            "label": "Discussing how a feature should work and how the code should be structured.",
            "scores": {
              "development": 3,
              "quality-assurance": 1
            }
          },
          {
            "id": "explain-defect",
            "label": "Walking a developer through a defect and showing how to reproduce it.",
            "scores": {
              "quality-assurance": 3,
              "development": 1
            }
          }
        ]
      }
    ]
  }
};
