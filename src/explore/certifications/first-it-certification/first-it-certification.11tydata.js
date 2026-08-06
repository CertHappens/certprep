export default {
  "assessment": {
    "anchorId": "first-it-certification-quiz",
    "eyebrow": "Certification chooser",
    "title": "Find a practical first certification",
    "introduction": "Choose the answer closest to your current experience and goals. The quiz gives you one best starting point and one useful alternative.",
    "submitLabel": "See my recommendations",
    "resultsTitle": "Your recommended certification starting points",
    "resultLead": "Based on your answers, start here:",
    "resultRankLabels": [
      "Best starting point",
      "Also consider"
    ],
    "resultNote": "This is a planning tool, not a rule. Job requirements, current skills, budget, and available study time may point you toward a different route.",
    "resultNext": "Continue below to compare each route, what it covers, and what knowledge helps before you start.",
    "completionAnnouncement": "Quiz complete. Your recommended starting points are shown below.",
    "paths": [
      {
        "id": "it-foundations",
        "label": "Build IT Foundations with CompTIA A+",
        "description": "This is the most practical starting point if you still need confidence with computers, operating systems, user support, basic networking, and structured troubleshooting.",
        "nextSteps": [
          "Practice installing and troubleshooting an operating system in a virtual machine.",
          "Work through common account, device, software, and connectivity problems.",
          "Compare the current A+ objectives with what you already know before paying for an exam."
        ],
        "url": "#it-foundations-a-plus",
        "linkLabel": "Read about building IT foundations with A+"
      },
      {
        "id": "network-plus",
        "label": "CompTIA Network+",
        "description": "Network+ is a broad, vendor-neutral networking path. It can strengthen support, infrastructure, cloud, and cybersecurity work without centering the exam on one equipment maker.",
        "nextSteps": [
          "Practice subnetting, common protocols, network diagrams, and troubleshooting tools.",
          "Use the CertHappens Network+ guide and practice questions to find weak areas.",
          "Compare Network+ with CCNA if you want more configuration depth."
        ],
        "url": "#network-plus",
        "linkLabel": "Read about CompTIA Network+"
      },
      {
        "id": "ccna",
        "label": "Cisco CCNA",
        "description": "CCNA is a stronger fit when you want deeper networking knowledge and hands-on configuration practice with switching, routing, services, security, and automation.",
        "nextSteps": [
          "Build small switch and router labs and verify every change with show commands.",
          "Confirm which CCNA exam version matches your planned test date.",
          "Use the CertHappens CCNA guides and practice questions to build depth."
        ],
        "url": "#ccna",
        "linkLabel": "Read about Cisco CCNA"
      },
      {
        "id": "security-plus",
        "label": "CompTIA Security+",
        "description": "Security+ is a broad security certification for learners who already understand basic computing and networking and want to study threats, controls, architecture, operations, and security programs.",
        "nextSteps": [
          "Check that basic networking, operating systems, and account management are not major gaps.",
          "Use the CertHappens Security+ study guides and practice questions.",
          "Add small labs so the terminology connects to real systems and decisions."
        ],
        "url": "#security-plus",
        "linkLabel": "Read about CompTIA Security+"
      },
      {
        "id": "isc2-cc",
        "label": "ISC2 Certified in Cybersecurity",
        "description": "ISC2 Certified in Cybersecurity is an entry-level security credential with no work-experience requirement. It can provide a simpler security-first starting point for a student or career changer.",
        "nextSteps": [
          "Confirm which CC exam outline applies to your planned test date.",
          "Study basic security principles, access controls, network security, and security operations.",
          "Keep building general IT and networking skills alongside the certification."
        ],
        "url": "#isc2-cc",
        "linkLabel": "Read about ISC2 Certified in Cybersecurity"
      },
      {
        "id": "cissp-later",
        "label": "Build Experience Before CISSP",
        "description": "Your interests point toward broad security responsibility, architecture, risk, or leadership. CISSP may become useful later, but it is designed for experienced professionals rather than as a normal first certification.",
        "nextSteps": [
          "Map your current work against the eight CISSP domains.",
          "Choose a nearer-term certification that supports the work you do now.",
          "Use the CertHappens CISSP guides to explore advanced topics while you build experience."
        ],
        "url": "#cissp-later",
        "linkLabel": "Read about preparing for CISSP later"
      }
    ],
    "questions": [
      {
        "id": "current-experience",
        "prompt": "Which description is closest to your experience today?",
        "options": [
          {
            "id": "learning-computer-basics",
            "label": "I am still learning common computer, operating system, and support tasks.",
            "scores": {
              "it-foundations": 3,
              "network-plus": 1
            }
          },
          {
            "id": "ready-for-network-breadth",
            "label": "I can solve basic computer problems and want to understand networks better.",
            "scores": {
              "network-plus": 3,
              "it-foundations": 1
            }
          },
          {
            "id": "ready-for-network-depth",
            "label": "I know basic networking and want deeper configuration practice.",
            "scores": {
              "ccna": 3,
              "network-plus": 1
            }
          },
          {
            "id": "ready-for-security-breadth",
            "label": "I understand basic IT and networking and want a broad security foundation.",
            "scores": {
              "security-plus": 3,
              "network-plus": 1
            }
          },
          {
            "id": "new-to-security",
            "label": "I am new to cybersecurity and want a simpler security starting point.",
            "scores": {
              "isc2-cc": 3,
              "it-foundations": 1
            }
          },
          {
            "id": "experienced-security",
            "label": "I already have several years of security work across more than one area.",
            "scores": {
              "cissp-later": 3,
              "security-plus": 1
            }
          }
        ]
      },
      {
        "id": "preferred-practice",
        "prompt": "Which task would you rather practice?",
        "options": [
          {
            "id": "fix-user-computer",
            "label": "Fix a user account, operating system, or computer problem.",
            "scores": {
              "it-foundations": 3,
              "network-plus": 1
            }
          },
          {
            "id": "trace-connectivity",
            "label": "Trace why two devices or services cannot communicate.",
            "scores": {
              "network-plus": 3,
              "ccna": 1
            }
          },
          {
            "id": "configure-network",
            "label": "Configure switches, routes, and network access rules.",
            "scores": {
              "ccna": 3,
              "network-plus": 1
            }
          },
          {
            "id": "investigate-security",
            "label": "Investigate suspicious activity and choose the right control.",
            "scores": {
              "security-plus": 3,
              "isc2-cc": 1
            }
          },
          {
            "id": "learn-security-basics",
            "label": "Learn security principles, access controls, and safe daily practices.",
            "scores": {
              "isc2-cc": 3,
              "security-plus": 1
            }
          },
          {
            "id": "make-security-decisions",
            "label": "Make decisions about security risk, architecture, and program priorities.",
            "scores": {
              "cissp-later": 3,
              "security-plus": 1
            }
          }
        ]
      },
      {
        "id": "job-direction",
        "prompt": "Which direction sounds closest to your next job goal?",
        "options": [
          {
            "id": "support-role",
            "label": "IT support, desktop support, or an entry-level systems role.",
            "scores": {
              "it-foundations": 3,
              "network-plus": 1
            }
          },
          {
            "id": "network-support",
            "label": "Network support or a broad infrastructure role.",
            "scores": {
              "network-plus": 3,
              "it-foundations": 1
            }
          },
          {
            "id": "network-engineering",
            "label": "Network administration or network engineering.",
            "scores": {
              "ccna": 3,
              "network-plus": 1
            }
          },
          {
            "id": "security-analyst",
            "label": "Security analyst, security administrator, or security operations work.",
            "scores": {
              "security-plus": 3,
              "isc2-cc": 1
            }
          },
          {
            "id": "junior-cybersecurity",
            "label": "A junior cybersecurity role while changing careers or finishing school.",
            "scores": {
              "isc2-cc": 3,
              "security-plus": 1
            }
          },
          {
            "id": "security-leadership",
            "label": "Security architecture, risk leadership, consulting, or program management.",
            "scores": {
              "cissp-later": 3,
              "security-plus": 1
            }
          }
        ]
      },
      {
        "id": "study-style",
        "prompt": "Which study session sounds most useful?",
        "options": [
          {
            "id": "support-labs",
            "label": "Troubleshooting hardware, software, accounts, and operating systems.",
            "scores": {
              "it-foundations": 3,
              "network-plus": 1
            }
          },
          {
            "id": "network-concepts",
            "label": "Drawing network diagrams and working through protocols and troubleshooting steps.",
            "scores": {
              "network-plus": 3,
              "ccna": 1
            }
          },
          {
            "id": "configuration-labs",
            "label": "Using a command line to configure and verify network devices.",
            "scores": {
              "ccna": 3,
              "network-plus": 1
            }
          },
          {
            "id": "security-scenarios",
            "label": "Working through threats, identity, incident response, and control decisions.",
            "scores": {
              "security-plus": 3,
              "isc2-cc": 1
            }
          },
          {
            "id": "security-introduction",
            "label": "Learning security ideas in plain language before going deeper.",
            "scores": {
              "isc2-cc": 3,
              "it-foundations": 1
            }
          },
          {
            "id": "advanced-security-breadth",
            "label": "Connecting security operations, architecture, risk, and business decisions.",
            "scores": {
              "cissp-later": 3,
              "security-plus": 1
            }
          }
        ]
      },
      {
        "id": "desired-proof",
        "prompt": "What do you most want the certification to show?",
        "options": [
          {
            "id": "support-proof",
            "label": "I can handle common computer and user-support problems.",
            "scores": {
              "it-foundations": 3,
              "network-plus": 1
            }
          },
          {
            "id": "network-foundation-proof",
            "label": "I understand how networks work and how to troubleshoot them.",
            "scores": {
              "network-plus": 3,
              "ccna": 1
            }
          },
          {
            "id": "network-configuration-proof",
            "label": "I can configure and troubleshoot enterprise network technologies.",
            "scores": {
              "ccna": 3,
              "network-plus": 1
            }
          },
          {
            "id": "security-foundation-proof",
            "label": "I understand a broad set of security threats, controls, and operations.",
            "scores": {
              "security-plus": 3,
              "isc2-cc": 1
            }
          },
          {
            "id": "entry-security-proof",
            "label": "I have learned entry-level cybersecurity concepts even without work experience.",
            "scores": {
              "isc2-cc": 3,
              "security-plus": 1
            }
          },
          {
            "id": "experienced-security-proof",
            "label": "I can connect technical security work with risk, architecture, and leadership.",
            "scores": {
              "cissp-later": 3,
              "security-plus": 1
            }
          }
        ]
      },
      {
        "id": "network-comfort",
        "prompt": "How comfortable are you with networking?",
        "options": [
          {
            "id": "need-network-basics",
            "label": "I still need the basics, including addresses, Wi-Fi, cables, and common connection problems.",
            "scores": {
              "it-foundations": 3,
              "network-plus": 1
            }
          },
          {
            "id": "need-structured-networking",
            "label": "I know some pieces, but I want a complete and organized networking foundation.",
            "scores": {
              "network-plus": 3,
              "it-foundations": 1
            }
          },
          {
            "id": "want-routing-switching-depth",
            "label": "I am comfortable with the basics and want more routing, switching, and configuration depth.",
            "scores": {
              "ccna": 3,
              "network-plus": 1
            }
          },
          {
            "id": "network-ready-for-security",
            "label": "I know enough networking to focus most of my study time on security.",
            "scores": {
              "security-plus": 3,
              "network-plus": 1
            }
          },
          {
            "id": "little-networking-security-first",
            "label": "I know very little networking, but I want a gentle introduction to cybersecurity.",
            "scores": {
              "isc2-cc": 3,
              "it-foundations": 1
            }
          },
          {
            "id": "broad-professional-experience",
            "label": "I use networking and security concepts in broader professional decisions already.",
            "scores": {
              "cissp-later": 3,
              "security-plus": 1
            }
          }
        ]
      },
      {
        "id": "credential-fit",
        "prompt": "Which credential style fits you best?",
        "options": [
          {
            "id": "broad-support-credential",
            "label": "A broad support credential that covers several kinds of everyday IT work.",
            "scores": {
              "it-foundations": 3,
              "network-plus": 1
            }
          },
          {
            "id": "vendor-neutral-networking",
            "label": "A vendor-neutral networking credential with broad coverage.",
            "scores": {
              "network-plus": 3,
              "security-plus": 1
            }
          },
          {
            "id": "vendor-network-depth",
            "label": "A deeper networking credential built around real configuration skills.",
            "scores": {
              "ccna": 3,
              "network-plus": 1
            }
          },
          {
            "id": "broad-security-credential",
            "label": "A widely used security credential that assumes some basic IT knowledge.",
            "scores": {
              "security-plus": 3,
              "network-plus": 1
            }
          },
          {
            "id": "no-experience-security",
            "label": "An entry-level security credential with no work-experience requirement.",
            "scores": {
              "isc2-cc": 3,
              "security-plus": 1
            }
          },
          {
            "id": "experience-based-security",
            "label": "An advanced security credential whose experience requirement matches my background.",
            "scores": {
              "cissp-later": 3,
              "security-plus": 1
            }
          }
        ]
      },
      {
        "id": "next-project",
        "prompt": "Which project would you be most willing to do next?",
        "options": [
          {
            "id": "desktop-lab",
            "label": "Install a virtual computer and troubleshoot accounts, updates, software, and devices.",
            "scores": {
              "it-foundations": 3,
              "network-plus": 1
            }
          },
          {
            "id": "network-troubleshooting-lab",
            "label": "Use subnetting, packet captures, and network tools to trace a connection problem.",
            "scores": {
              "network-plus": 3,
              "ccna": 1
            }
          },
          {
            "id": "router-switch-lab",
            "label": "Build a small switch and router lab, then verify every configuration.",
            "scores": {
              "ccna": 3,
              "network-plus": 1
            }
          },
          {
            "id": "security-investigation-lab",
            "label": "Review logs and decide how to handle a suspicious event.",
            "scores": {
              "security-plus": 3,
              "isc2-cc": 1
            }
          },
          {
            "id": "basic-security-checklist",
            "label": "Review a simple security checklist for accounts, devices, networks, and backups.",
            "scores": {
              "isc2-cc": 3,
              "it-foundations": 1
            }
          },
          {
            "id": "experience-domain-map",
            "label": "Map my work experience across security risk, architecture, operations, and other domains.",
            "scores": {
              "cissp-later": 3,
              "security-plus": 1
            }
          }
        ]
      }
    ]
  }
};
