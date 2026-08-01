---
layout: layouts/article.njk
title: "Network+ N10-009 Domain 5: Network Troubleshooting"
description: Learn Network+ N10-009 Domain 5 with a repeatable method for diagnosing cabling, switching, routing, wireless, performance, and service failures.
permalink: /network-plus/n10-009/study-guide/network-troubleshooting/
ogType: article
printable: true
printTitle: "Network+ N10-009 Domain 5: Network Troubleshooting"
author: certHappens
datePublished: 2026-07-26
dateModified: 2026-07-31
articleSection: Network+ N10-009 Domain 5
eyebrow: Network+ domain 5 guide
lede: Isolate the fault with evidence, change one thing for a reason, and verify the whole service after the fix.
breadcrumbs:
  - label: Home
    url: /
  - label: Network+
    url: /network-plus/
  - label: N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
  - label: Domain 5
    url: /network-plus/n10-009/study-guide/network-troubleshooting/
toc:
  - id: domain-map
    label: Domain map
  - id: troubleshooting-method
    label: Troubleshooting method
  - id: scope-evidence
    label: Scope and evidence
  - id: cabling-media
    label: Cabling and media
  - id: interface-counters
    label: Interfaces and counters
  - id: poe-transceivers
    label: PoE and transceivers
  - id: switching-services
    label: Switching and services
  - id: routing-addressing
    label: Routing and addressing
  - id: performance
    label: Performance issues
  - id: wireless
    label: Wireless issues
  - id: software-tools
    label: Software tools
  - id: hardware-tools
    label: Hardware tools
  - id: device-commands
    label: Device commands
  - id: troubleshooting-scenarios
    label: Troubleshooting scenarios
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review
  - id: official-references
    label: Official references
keywords:
  - CompTIA Network+
  - N10-009 Domain 5
  - network troubleshooting
  - cable troubleshooting
  - network performance
  - wireless troubleshooting
  - network tools
relatedLinks:
  - title: Network Troubleshooting Tools Quick Reference
    url: /network-plus/quick-review/troubleshooting-tools/
    description: Match host commands, path and DNS tests, packet tools, copper and fiber equipment, and wireless analyzers to a theory.
  - title: Network+ Acronyms and Terms
    url: /network-plus/acronyms/
    description: Look up full expansions, practical meanings, related terms, and the domains where each abbreviation appears.
  - title: Network+ N10-009 Practice Test
    url: /network-plus/n10-009/practice-test/
    description: Apply troubleshooting decisions in randomized questions with detailed explanations.
  - title: Network+ N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
    description: Return to the complete roadmap for all five exam domains.
  - title: "Domain 1: Networking Concepts"
    url: /network-plus/n10-009/study-guide/networking-concepts/
    description: Review the protocols, media, addressing, topology, and traffic behavior that troubleshooting evidence describes.
  - title: "Domain 2: Network Implementation"
    url: /network-plus/n10-009/study-guide/network-implementation/
    description: Review the routing, switching, wireless, and installation settings that commonly create or resolve faults.
  - title: "Domain 3: Network Operations"
    url: /network-plus/n10-009/study-guide/network-operations/
    description: Use diagrams, baselines, monitoring, logs, configuration history, and recovery records as troubleshooting evidence.
  - title: "Domain 4: Network Security"
    url: /network-plus/n10-009/study-guide/network-security/
    description: Distinguish ordinary faults from blocked traffic, unauthorized services, attacks, and access-control failures.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Rebuild masks, boundaries, usable ranges, and VLSM allocations when addressing evidence looks wrong.
  - title: IPv4 Subnet Calculator
    url: /tools/subnet-calculator/
    description: Check network boundaries, host ranges, masks, wildcard masks, and address status while testing an addressing theory.
  - title: Common Ports and Protocols Reference
    url: /ports-protocols/
    description: Confirm service ports, transports, secure alternatives, and protocols that do not use TCP or UDP ports.
  - title: Network+ resource hub
    url: /network-plus/
    description: Find the current practice test, detailed guides, and shared networking references.
---
Domain 5 accounts for 24% of N10-009, making it the largest exam domain. The weight reflects a practical truth: networking knowledge becomes useful when you can turn a symptom into a focused test, identify the failing layer or dependency, restore service safely, and explain what happened afterward.

A user saying “the network is slow” has not identified a cause. The problem could be one client, one wireless channel, one overloaded uplink, a duplex mismatch, a failing transceiver, packet loss, a busy application server, or a route that takes an unexpected path. Troubleshooting begins by replacing the broad complaint with measurable scope and evidence.

Use this guide to practice decisions, not just vocabulary. For every symptom, ask what still works, which systems share the failure, what changed, which observation would confirm the leading theory, and what effect a proposed fix could have on the rest of the network.

<div class="article-callout">
  <p><strong>Troubleshooting rule:</strong> Use the least disruptive test that can confirm or reject the current theory. A dramatic change is not a better test simply because it feels decisive.</p>
</div>

<h2 id="domain-map">Domain 5 objective map</h2>

<div class="table-scroll" role="region" aria-label="Network+ Domain 5 objective map" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main topic</th>
        <th scope="col">Decision to make</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Objective">5.1</td>
        <td data-label="Main topic">Troubleshooting methodology</td>
        <td data-label="Decision to make">What evidence should be gathered, which theory should be tested, and how should the solution be verified and documented?</td>
      </tr>
      <tr>
        <td data-label="Objective">5.2</td>
        <td data-label="Main topic">Cabling and physical interfaces</td>
        <td data-label="Decision to make">Does the symptom point to the cable, termination, signal, interface state, counter pattern, Power over Ethernet, or transceiver?</td>
      </tr>
      <tr>
        <td data-label="Objective">5.3</td>
        <td data-label="Main topic">Network services</td>
        <td data-label="Decision to make">Which switching, routing, address-assignment, gateway, address, or subnet error explains the affected traffic?</td>
      </tr>
      <tr>
        <td data-label="Objective">5.4</td>
        <td data-label="Main topic">Performance issues</td>
        <td data-label="Decision to make">Is the limiting factor congestion, a bottleneck, capacity, latency, loss, jitter, wireless interference, coverage, or roaming?</td>
      </tr>
      <tr>
        <td data-label="Objective">5.5</td>
        <td data-label="Main topic">Tools, protocols, and commands</td>
        <td data-label="Decision to make">Which software tool, hardware tool, discovery protocol, or device command produces the evidence needed next?</td>
      </tr>
    </tbody>
  </table>
</div>

The objectives work together. Objective 5.1 controls the process. Objectives 5.2 through 5.4 supply common fault patterns. Objective 5.5 supplies the instruments used to test a theory. A cable tester is useful only when the current theory concerns the cable. A packet capture is powerful only when packet behavior is the evidence you need.

<h2 id="troubleshooting-method">Use the troubleshooting method without turning it into a script</h2>

The official methodology is a sequence, but real troubleshooting often revisits earlier steps as new evidence appears.

<h3>1. Identify the problem</h3>

Gather information before changing the system. Question users in concrete terms:

- What action were you attempting?
- What happened instead?
- When did it last work?
- Is the failure constant or intermittent?
- Does it affect every application or one service?
- Does another device, location, account, or connection method work?
- Did anything change before the symptom began?

Identify symptoms, review monitoring and logs, and duplicate the problem when it is safe and useful. A reproducible failure is easier to measure than a report that appears once a week.

Approach multiple problems individually until evidence shows a shared cause. A printer outage and a slow video call may begin at the same time but still have unrelated causes. Combining them too early can produce a theory broad enough to explain anything and prove nothing.

<h3>2. Establish a theory of probable cause</h3>

Question the obvious. Check power, link state, addressing, gateway, name resolution, and recent changes before assuming an obscure protocol defect.

Choose an approach that fits the symptom:

- **Top to bottom:** Start near the application when the physical and local network path appear healthy.
- **Bottom to top:** Start at the physical layer when link, signal, cable, or interface evidence is suspicious.
- **Divide and conquer:** Start at a middle layer, often IP connectivity, then move up or down according to the result.

A theory should predict an observable result. “The network is broken” is not a theory. “The client received no Dynamic Host Configuration Protocol (DHCP) lease and assigned itself an Automatic Private IP Addressing (APIPA) address” predicts a 169.254.0.0/16 address, missing normal scope options, and failure to reach routed destinations.

<h3>3. Test the theory</h3>

Use a test that separates the leading theory from reasonable alternatives. If a host can ping its default gateway by address but cannot open a site by name, test name resolution before replacing the cable. If interface cyclic redundancy check errors increase while traffic passes, inspect the physical link before changing the route.

When the theory is confirmed, determine the next steps required to resolve the problem. When it is not confirmed, establish a new theory or escalate with the evidence already collected. Escalation is not failure when the issue requires authority, access, equipment, or expertise you do not have.

<h3>4. Establish a plan of action</h3>

Identify the proposed change, expected result, possible effects, validation steps, rollback path, communication needs, and maintenance constraints. A correct fix can still create an avoidable outage if it is applied without considering dependencies.

<h3>5. Implement the solution or escalate</h3>

Change the intended component, not several unrelated settings. Preserve evidence when the incident may involve security, compliance, vendor support, or an intermittent fault that could disappear after a reboot.

<h3>6. Verify full functionality and prevent recurrence</h3>

Confirm more than the original symptom. Verify the service from the user’s perspective, inspect relevant counters and logs, check dependent systems, and confirm that the fix did not break another path. Preventive measures might include a monitoring threshold, corrected documentation, a configuration baseline, a cable replacement standard, capacity planning, or a change-control improvement.

<h3>7. Document throughout the process</h3>

Record findings, tests, actions, outcomes, and lessons learned. Good documentation lets another technician reproduce the reasoning. “Rebooted switch, fixed” may describe an action, but it does not identify the cause, prove the repair, or help when the symptom returns.

<h2 id="scope-evidence">Narrow the scope before choosing the tool</h2>

Scope is one of the fastest ways to reduce the possible causes.

<div class="table-scroll" role="region" aria-label="Troubleshooting scope and likely shared dependencies" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Observed scope</th>
        <th scope="col">Likely place to look</th>
        <th scope="col">Useful comparison</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Observed scope">One application on one host</td><td data-label="Likely place to look">Local application, host firewall, name resolution, proxy, credentials, or service port</td><td data-label="Useful comparison">Try another application on the same host and the same application from another host.</td></tr>
      <tr><td data-label="Observed scope">All applications on one host</td><td data-label="Likely place to look">Link, interface, address, mask, gateway, Domain Name System (DNS) settings, virtual local area network (VLAN) access, or endpoint condition</td><td data-label="Useful comparison">Test a nearby host using the same switch or access point.</td></tr>
      <tr><td data-label="Observed scope">One VLAN or floor</td><td data-label="Likely place to look">Access switch, trunk, VLAN assignment, gateway interface, Dynamic Host Configuration Protocol scope, or local uplink</td><td data-label="Useful comparison">Compare an unaffected VLAN on the same switch and the same VLAN on another switch.</td></tr>
      <tr><td data-label="Observed scope">One site</td><td data-label="Likely place to look">Site edge, wide area network path, local routing, site services, power, or provider circuit</td><td data-label="Useful comparison">Test another site reaching the same destination.</td></tr>
      <tr><td data-label="Observed scope">One hosted service from every site</td><td data-label="Likely place to look">Service availability, Domain Name System, load balancer, firewall, certificate, server route, or upstream provider</td><td data-label="Useful comparison">Test another service across the same wide area paths.</td></tr>
      <tr><td data-label="Observed scope">Only during busy periods</td><td data-label="Likely place to look">Capacity, congestion, contention, queueing, wireless airtime, or application resource limits</td><td data-label="Useful comparison">Compare baseline and peak-period utilization, loss, latency, and flow data.</td></tr>
    </tbody>
  </table>
</div>

Gather evidence from more than one source when possible. A user report provides impact. Monitoring provides timing and trend. Interface counters provide physical or queue symptoms. Logs provide events. Configuration history provides change evidence. A packet capture provides protocol behavior. A diagram shows shared dependencies.

Time alignment matters. If device clocks disagree, a routing change at 10:04 can appear to occur after an authentication failure logged at 10:07 even when the real order was reversed. Domain 3 operations practices such as Network Time Protocol, centralized logs, baselines, and configuration backups make Domain 5 troubleshooting faster.

<h2 id="cabling-media">Recognize cabling and media faults</h2>

An incorrect cable can establish no link, negotiate a lower speed, operate unreliably, or fail only under the required distance or environment.

<h3>Copper choices</h3>

Category ratings describe supported performance under defined installation conditions. A higher category label does not repair poor termination, excessive distance, sharp bends, damaged conductors, or a noisy pathway. Compare the installed category and length with the required Ethernet standard.

**Unshielded twisted pair (UTP)** is common and depends on the twists and installation quality to control interference. **Shielded twisted pair (STP)** adds shielding but requires compatible components and proper grounding practices. Installing shielded cable without treating the full channel correctly can add cost without delivering the expected protection.

<h3>Fiber choices</h3>

Single-mode and multimode fiber use different optical characteristics and commonly require matching transceivers. The fiber type, connector, polish, wavelength, transceiver standard, distance, and receive power must be compatible end to end.

A link can fail because transmit and receive strands are crossed incorrectly. Each transmitter must connect to the receiver at the opposite end. When a duplex fiber link has no light or no link despite compatible components, verify the transmit and receive path rather than assuming the switch is defective.

<h3>Signal degradation</h3>

- **Crosstalk** is unwanted coupling between nearby signal paths, often within or between copper pairs.
- **Interference** comes from external electrical or radio-frequency sources.
- **Attenuation** is signal loss over distance and through the transmission path.
- **Improper termination** includes wrong pinout, excessive untwisting, damaged connectors, contamination, poor splices, or incomplete seating.

Symptoms may include no link, lower negotiated speed, cyclic redundancy check errors, retransmissions, intermittent connectivity, or failures that worsen with distance and traffic load.

<h2 id="interface-counters">Read interface state and counters together</h2>

A link light tells you that some physical negotiation occurred. It does not prove that frames pass without error, that the port belongs to the correct VLAN, or that the upper-layer service works.

<div class="table-scroll" role="region" aria-label="Interface counters and likely troubleshooting meaning" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Counter or state</th>
        <th scope="col">What it means</th>
        <th scope="col">What to investigate</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Counter or state">CRC errors</td><td data-label="What it means">Frames failed the cyclic redundancy check.</td><td data-label="What to investigate">Cable quality, connector damage, interference, optics, duplex problems, or failing hardware. Watch whether the count keeps increasing.</td></tr>
      <tr><td data-label="Counter or state">Runts</td><td data-label="What it means">Frames are smaller than the valid minimum.</td><td data-label="What to investigate">Collisions, malformed traffic, faulty interfaces, or capture context. Do not confuse a runt with any ordinary small frame.</td></tr>
      <tr><td data-label="Counter or state">Giants</td><td data-label="What it means">Frames exceed the accepted maximum.</td><td data-label="What to investigate">Maximum transmission unit mismatch, jumbo-frame inconsistency, malformed frames, or device limits.</td></tr>
      <tr><td data-label="Counter or state">Drops</td><td data-label="What it means">Frames or packets were discarded.</td><td data-label="What to investigate">Queue congestion, buffer limits, policy, oversubscription, processing capacity, or receive errors. Direction and counter type matter.</td></tr>
      <tr><td data-label="Counter or state">Administratively down</td><td data-label="What it means">The interface was disabled by configuration.</td><td data-label="What to investigate">Intended shutdown, incomplete deployment, change record, or mistaken configuration.</td></tr>
      <tr><td data-label="Counter or state">Error-disabled</td><td data-label="What it means">The device disabled the port after detecting a protected condition.</td><td data-label="What to investigate">The exact trigger, such as a security violation, loop protection, link behavior, or policy event. Correct the cause before restoring the port.</td></tr>
      <tr><td data-label="Counter or state">Suspended</td><td data-label="What it means">The interface is not forwarding because a feature or bundle rejected it.</td><td data-label="What to investigate">Link-aggregation consistency, policy, negotiation, or platform-specific status details.</td></tr>
    </tbody>
  </table>
</div>

Use deltas, not just totals. A port may show 20 errors accumulated over five years and be healthy now. Clear counters only when appropriate and permitted, or record the current value and compare it after a controlled interval.

Speed and duplex mismatches can produce poor throughput, errors, and retransmissions. Autonegotiation usually works best when both ends support it. A forced setting on one side and automatic negotiation on the other can create inconsistent results. Verify both ends rather than correcting only the side you can see first.

<h2 id="poe-transceivers">Separate PoE and transceiver problems from data problems</h2>

Power over Ethernet (PoE) supplies power and data over the Ethernet cabling, but the two functions can fail differently.

A powered device may have no power because:

- The switch has exhausted its total PoE power budget.
- The port or switch supports an incompatible or insufficient PoE standard.
- The cable or pair condition does not support reliable power delivery.
- The port is configured not to provide power.
- The endpoint requires more power than the source can negotiate or supply.

Check `show power` or the equivalent device view, the per-port power state, total available budget, endpoint requirements, and cabling. Moving the device to another powered port can be a useful controlled test, but it does not prove the original port is bad until budget and configuration are considered.

Transceiver problems commonly involve form factor, speed, supported standard, wavelength, fiber type, distance, vendor compatibility policy, or receive signal strength. A transceiver can be physically insertable and still be electrically or optically incompatible.

Compare both ends of the link. One side reporting transmit power does not prove the other side receives enough light. Dirty connectors and excessive loss can produce a link that flaps or fails only at higher rates or environmental changes.

<h2 id="switching-services">Troubleshoot switching and policy from the frame path</h2>

<h3>Spanning Tree Protocol</h3>

Spanning Tree Protocol (STP) prevents Layer 2 loops by selecting a loop-free forwarding topology. A loop can produce broadcast amplification, unstable Media Access Control tables, high switch and link utilization, duplicate frames, and widespread intermittent connectivity.

When STP is part of the theory, inspect:

- Which switch is the root bridge.
- Which path cost and bridge information selected it.
- Port roles and states.
- Recent topology changes.
- Whether an access port unexpectedly connects switches.
- Whether protection features disabled a port after receiving unexpected bridge traffic.

Do not solve every blocked-port question by enabling forwarding. A blocked redundant path may be preventing the outage.

<h3>Incorrect VLAN assignment</h3>

A device in the wrong virtual local area network (VLAN) may receive an address from the wrong scope, reach the wrong gateway, fail policy checks, or lose access to intended services. Verify the access VLAN, trunk allowed VLANs, tagging, native VLAN behavior, and the Layer 3 interface serving that VLAN.

A port showing link does not prove correct VLAN membership. Compare the endpoint address and gateway with the intended subnet and inspect the switchport configuration.

<h3>Access control lists</h3>

An access control list (ACL) can block traffic while basic reachability still works. Confirm source, destination, protocol, port, direction, interface, rule order, and implicit behavior. A rule intended to protect one subnet can accidentally block return traffic or a required service if placed incorrectly.

Use counters or logs when available. A matching deny counter is stronger evidence than assuming the firewall or ACL is responsible because security exists somewhere in the path.

<h2 id="routing-addressing">Use routing and addressing evidence in the correct order</h2>

Start with the host’s address, prefix or mask, default gateway, and Domain Name System server. Then compare the destination with the local subnet boundary. The [IPv4 Subnetting Reference](/network-plus/n10-009/study-guide/ipv4-subnetting/) explains the method, and the [IPv4 Subnet Calculator](/tools/subnet-calculator/) can check the result after you work it manually.

<h3>Incorrect address or subnet mask</h3>

An incorrect IP address can place the host in the wrong network or conflict with another system. An incorrect subnet mask changes which destinations the host considers local. Two hosts can have addresses that look similar but make different local-routing decisions because their masks differ.

A host that believes a remote address is local will try Address Resolution Protocol resolution instead of sending traffic to its gateway. A host that believes a local neighbor is remote will send traffic to the gateway unnecessarily, and communication may fail depending on routing and proxy behavior.

<h3>Duplicate IP address</h3>

Duplicate addresses can cause intermittent connectivity, changing Address Resolution Protocol entries, warnings, or traffic delivered to the wrong device. Compare the observed Media Access Control address with inventory and switch tables. Remove the duplicate assignment from the source rather than repeatedly clearing caches.

<h3>Incorrect default gateway</h3>

A host can communicate within its local subnet without a working default gateway. Failure to reach remote networks while local peers work strongly supports a gateway, route, or policy theory. Confirm that the gateway address is in the host’s local subnet and that the gateway interface is reachable and operational.

<h3>Address pool exhaustion</h3>

A Dynamic Host Configuration Protocol scope with no available leases cannot serve new clients even while existing leased clients continue working. Check scope utilization, exclusions, reservations, lease duration, stale leases, relay behavior, and whether unauthorized clients consumed addresses.

An Automatic Private IP Addressing address in 169.254.0.0/16 indicates that a Windows client did not obtain normal IPv4 configuration and used a link-local address. It is a symptom of failed address assignment, not a complete diagnosis. The failure could involve the client, access path, VLAN, relay, server, exhausted pool, or policy.

<h3>Routing table and default route</h3>

Routers choose among matching routes using the platform’s route-selection process, including prefix specificity and route source preferences. Inspect the route for the actual destination, not merely whether a default route exists.

A default route handles destinations without a more-specific match. A missing default can isolate unknown external destinations while internal routes continue working. A wrong or stale more-specific route can override a correct default and affect only one prefix.

Use bidirectional reasoning. Forward traffic may reach the destination while the return path follows another route, encounters a firewall, or lacks a route back. A successful outbound hop does not guarantee a complete conversation.

<h2 id="performance">Distinguish capacity, delay, loss, and variation</h2>

Performance problems are easier when each metric keeps its own meaning.

<div class="table-scroll" role="region" aria-label="Network performance symptoms and likely evidence" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Condition</th>
        <th scope="col">Meaning</th>
        <th scope="col">Evidence to seek</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Condition">Congestion or contention</td><td data-label="Meaning">Multiple traffic sources compete for limited forwarding or airtime resources.</td><td data-label="Evidence to seek">High utilization, queue growth, drops, retransmissions, busy periods, wireless airtime use, or flow concentration.</td></tr>
      <tr><td data-label="Condition">Bottleneck</td><td data-label="Meaning">One component limits the end-to-end rate.</td><td data-label="Evidence to seek">A slower uplink, firewall, server interface, wireless cell, provider circuit, storage path, or processing stage compared with surrounding capacity.</td></tr>
      <tr><td data-label="Condition">Bandwidth</td><td data-label="Meaning">The theoretical or configured capacity of a link or channel.</td><td data-label="Evidence to seek">Negotiated speed, circuit rate, channel width, or configured limit.</td></tr>
      <tr><td data-label="Condition">Throughput</td><td data-label="Meaning">The useful rate achieved in practice.</td><td data-label="Evidence to seek">Measured transfer rate after overhead, loss, protocol behavior, contention, and endpoint limits.</td></tr>
      <tr><td data-label="Condition">Latency</td><td data-label="Meaning">Delay between sending and receiving.</td><td data-label="Evidence to seek">Round-trip measurements, hop changes, queue delay, path distance, processing delay, and application response time.</td></tr>
      <tr><td data-label="Condition">Packet loss</td><td data-label="Meaning">Packets fail to reach the intended destination.</td><td data-label="Evidence to seek">Interface drops, errors, failed probes, retransmissions, capture gaps, wireless retries, or queue overflow.</td></tr>
      <tr><td data-label="Condition">Jitter</td><td data-label="Meaning">Packet delay varies over time.</td><td data-label="Evidence to seek">Uneven arrival intervals, voice or video quality problems, queue variation, path changes, or wireless contention.</td></tr>
    </tbody>
  </table>
</div>

A high-bandwidth link can still have high latency. A low-latency path can still lose packets. A speed test may show acceptable average throughput while voice quality suffers from jitter and short bursts of loss.

Measure at the right time and place. An average over one hour can hide a 30-second queue collapse during every backup burst. A test from the data center can miss a wireless problem affecting one conference room. Baselines help distinguish normal peaks from a new condition.

<h2 id="wireless">Troubleshoot wireless as a shared radio system</h2>

Wireless clients share airtime and operate in an environment affected by distance, obstacles, reflections, neighboring networks, non-Wi-Fi interference, client capability, channel plan, power, and roaming policy.

<h3>Interference and channel overlap</h3>

Interference can come from other wireless networks or non-Wi-Fi devices using nearby spectrum. Channel overlap increases contention and interference between cells. Use a Wi-Fi analyzer and wireless controller data to inspect channel use, signal strength, noise, retries, utilization, and neighboring access points.

Changing channels without surveying the environment can move the problem rather than solve it. Wider channels offer more potential capacity but use more spectrum and may increase overlap in a dense deployment.

<h3>Signal degradation and insufficient coverage</h3>

Signal weakens with distance and obstacles. Coverage can appear adequate for a survey device yet fail for clients with weaker radios or different antenna characteristics. Inspect both signal strength and signal quality, including noise and retry behavior.

Adding access points is not automatically the answer. Too many poorly planned access points can increase contention and roaming complexity. Placement, channel plan, power, antenna pattern, and capacity must work together.

<h3>Client disassociation</h3>

A client may disconnect because of weak signal, interference, authentication failure, access-point restart, driver behavior, power saving, policy, or a controller event. Correlate client logs, access-point logs, authentication logs, and the wireless timeline.

<h3>Roaming misconfiguration</h3>

Roaming depends on overlapping coverage, compatible security, consistent network configuration, client decisions, and infrastructure support. A client that remains attached to a distant access point may experience poor performance even when a closer access point exists. A client that changes cells too aggressively may disconnect repeatedly.

Compare the service set identifier, security configuration, VLAN mapping, radio coverage, minimum data rates, power levels, and controller settings across the roaming area.

<h2 id="software-tools">Choose software tools from the question you need answered</h2>

<p>Use the <a href="/network-plus/quick-review/troubleshooting-tools/">Network Troubleshooting Tools Quick Reference</a> when command-line, packet, copper, fiber, or wireless tools seem interchangeable. State the theory first, then choose the least disruptive tool that can confirm or reject it.</p>

<div class="table-scroll" role="region" aria-label="Network troubleshooting software tools" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Tool or command</th>
        <th scope="col">Best question</th>
        <th scope="col">Important limit</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Tool or command">Protocol analyzer</td><td data-label="Best question">What frames, packets, handshakes, flags, retransmissions, responses, or errors crossed the observation point?</td><td data-label="Important limit">It sees only traffic available at the capture point and may require decryption keys or another inspection point for protected content.</td></tr>
      <tr><td data-label="Tool or command"><code>ping</code></td><td data-label="Best question">Can the target respond to an Internet Control Message Protocol echo test, and what loss or round-trip pattern appears?</td><td data-label="Important limit">A blocked echo response does not prove the target or application is down.</td></tr>
      <tr><td data-label="Tool or command"><code>traceroute</code> or <code>tracert</code></td><td data-label="Best question">Which Layer 3 hops respond along the path, and where does the observed path or delay change?</td><td data-label="Important limit">Some hops do not respond or rate-limit probes, and the return path may differ.</td></tr>
      <tr><td data-label="Tool or command"><code>nslookup</code> or <code>dig</code></td><td data-label="Best question">Which Domain Name System server answered, what record was returned, and how did resolution behave?</td><td data-label="Important limit">A correct record does not prove the application at that address works.</td></tr>
      <tr><td data-label="Tool or command"><code>tcpdump</code></td><td data-label="Best question">What packet-level traffic is visible from a command-line capture point?</td><td data-label="Important limit">Filters and interface selection matter; a capture on the wrong interface may look like no traffic exists.</td></tr>
      <tr><td data-label="Tool or command"><code>netstat</code> or platform equivalent</td><td data-label="Best question">Which local connections, listening sockets, and protocol statistics exist?</td><td data-label="Important limit">Output describes the local system and does not replace packet or path evidence.</td></tr>
      <tr><td data-label="Tool or command"><code>ipconfig</code>, <code>ifconfig</code>, or <code>ip</code></td><td data-label="Best question">What address, prefix, gateway, interface state, and related local configuration does the host have?</td><td data-label="Important limit">A plausible configuration still needs reachability and service validation.</td></tr>
      <tr><td data-label="Tool or command"><code>arp</code> or Address Resolution Protocol (ARP) neighbor-table command</td><td data-label="Best question">Which local protocol address maps to which Media Access Control (MAC) address?</td><td data-label="Important limit">Entries age and can be incomplete, stale, or affected by duplicate addresses or spoofing.</td></tr>
      <tr><td data-label="Tool or command">Nmap</td><td data-label="Best question">Which hosts, ports, services, or response patterns are visible from the scanner’s position?</td><td data-label="Important limit">Use only with authorization. Filtering and host defenses affect results.</td></tr>
      <tr><td data-label="Tool or command">Link Layer Discovery Protocol (LLDP) or Cisco Discovery Protocol (CDP)</td><td data-label="Best question">Which neighboring device and port advertise a direct Layer 2 relationship?</td><td data-label="Important limit">Discovery may be disabled, filtered, unsupported, or reveal only directly connected neighbors.</td></tr>
      <tr><td data-label="Tool or command">Speed tester</td><td data-label="Best question">What throughput and sometimes latency or loss does this test achieve between its endpoints?</td><td data-label="Important limit">The result includes endpoint, path, server, protocol, and timing effects and may not represent every application.</td></tr>
    </tbody>
  </table>
</div>

Do not treat one tool as a verdict. A failed ping can be a blocked Internet Control Message Protocol response. A successful ping proves little about Domain Name System, Transmission Control Protocol port access, authentication, or application health. Combine tests so each result narrows the theory.

<h2 id="hardware-tools">Match hardware tools to the physical question</h2>

<div class="table-scroll" role="region" aria-label="Network troubleshooting hardware tools" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Tool</th>
        <th scope="col">Use it for</th>
        <th scope="col">Do not assume</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Tool">Toner and probe</td><td data-label="Use it for">Tracing an unlabeled copper cable or identifying its far end.</td><td data-label="Do not assume">Finding the cable proves its pinout, performance, or destination configuration is correct.</td></tr>
      <tr><td data-label="Tool">Cable tester</td><td data-label="Use it for">Checking continuity, pin mapping, opens, shorts, crossed pairs, split pairs, length, or certification features supported by the tester.</td><td data-label="Do not assume">A basic continuity pass proves the channel supports the required Ethernet speed.</td></tr>
      <tr><td data-label="Tool">Network tap</td><td data-label="Use it for">Providing a controlled copy of traffic from a physical link to an analyzer.</td><td data-label="Do not assume">Every tap is passive, lossless, transparent, or appropriate for every speed and medium.</td></tr>
      <tr><td data-label="Tool">Wi-Fi analyzer</td><td data-label="Use it for">Viewing wireless networks, channels, signal, and environment details supported by the tool.</td><td data-label="Do not assume">One reading from one location represents every client or time period.</td></tr>
      <tr><td data-label="Tool">Visual fault locator</td><td data-label="Use it for">Using visible light to locate certain fiber continuity problems, breaks, severe bends, or identification points over practical distances.</td><td data-label="Do not assume">It measures optical budget or replaces a full fiber certification and loss test.</td></tr>
    </tbody>
  </table>
</div>

Select the least invasive connection method. A switch port mirror may provide the needed traffic without inserting hardware. A tap may be appropriate when a reliable observation point is required and the change is planned. Any insertion into a production path needs risk review and validation.

<h2 id="device-commands">Read device commands as linked evidence</h2>

Command syntax varies by platform, but the objectives emphasize the information each command reveals.

<div class="table-scroll" role="region" aria-label="Basic networking device commands and evidence" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Command family</th>
        <th scope="col">Evidence</th>
        <th scope="col">Typical follow-up</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Command family"><code>show mac-address-table</code></td><td data-label="Evidence">Which Media Access Control addresses were learned on which ports and VLANs.</td><td data-label="Typical follow-up">Compare endpoint identity, VLAN, expected port, movement, and aging behavior.</td></tr>
      <tr><td data-label="Command family"><code>show route</code></td><td data-label="Evidence">Known prefixes, next hops, outgoing interfaces, route sources, and default route.</td><td data-label="Typical follow-up">Inspect the most specific route for the affected destination and verify the return path.</td></tr>
      <tr><td data-label="Command family"><code>show interface</code></td><td data-label="Evidence">Link state, speed, duplex, counters, errors, drops, and sometimes transceiver data.</td><td data-label="Typical follow-up">Compare both ends and observe whether suspicious counters increase during the test.</td></tr>
      <tr><td data-label="Command family"><code>show config</code></td><td data-label="Evidence">Current or saved settings, depending on the platform and command.</td><td data-label="Typical follow-up">Compare with the approved baseline, change record, and intended design.</td></tr>
      <tr><td data-label="Command family"><code>show arp</code></td><td data-label="Evidence">Local Internet Protocol to Media Access Control mappings.</td><td data-label="Typical follow-up">Compare with host identity, duplicate-address evidence, and switch forwarding tables.</td></tr>
      <tr><td data-label="Command family"><code>show vlan</code></td><td data-label="Evidence">VLAN existence, status, and access-port membership.</td><td data-label="Typical follow-up">Also inspect trunk allowance, tagging, native VLAN, and Layer 3 gateway configuration.</td></tr>
      <tr><td data-label="Command family"><code>show power</code></td><td data-label="Evidence">Power over Ethernet budget, per-port delivery, classification, and faults supported by the platform.</td><td data-label="Typical follow-up">Compare endpoint demand, switch capacity, port configuration, and cable condition.</td></tr>
    </tbody>
  </table>
</div>

Correlate tables. A host address maps to a Media Access Control address in the Address Resolution Protocol table. That Media Access Control address maps to a switchport and VLAN in the forwarding table. The VLAN maps to a gateway and subnet. The route table determines the next path. Each view answers one part of the forwarding decision.

<h2 id="troubleshooting-scenarios">Worked troubleshooting scenarios</h2>

<h3>Scenario 1: A new laptop has a 169.254 address</h3>

The laptop connects to the access point but receives `169.254.24.18/16`. Existing nearby clients work.

The symptom shows failed normal IPv4 address assignment, but the scope points toward the new client or its admission path rather than a total Dynamic Host Configuration Protocol outage. Verify whether the client reached the intended service set identifier and VLAN, whether network access control completed, whether the client sent discovery traffic, and whether an offer returned. Compare the working client configuration and wireless event logs.

Do not manually assign a random address as the first response. That may hide the address-assignment failure and create a duplicate.

<h3>Scenario 2: One uplink accumulates CRC errors</h3>

Traffic passes, but users report intermittent application delays. The uplink’s cyclic redundancy check counter increases during busy periods.

The increasing counter is physical evidence. Compare speed and duplex on both ends, inspect cable or fiber type, connectors, transceivers, receive signal, and recent physical work. Replace one suspected component at a time or move the link to a known-good path according to the change plan. Verify that the error rate stops increasing under load.

A routing change would not address corrupted frames on the link.

<h3>Scenario 3: Voice calls break up while file transfers appear acceptable</h3>

Average throughput is within expectations, but voice users hear gaps and uneven audio during peak periods.

Measure latency, jitter, short packet-loss bursts, interface queues, wireless airtime, and contention during the affected period. Average throughput can remain acceptable while delay variation harms real-time traffic. Inspect quality-of-service classification and queue behavior only after confirming where the variation occurs.

Buying a faster user workstation does not repair an overloaded uplink queue.

<h3>Scenario 4: The network becomes unstable after a second switch is connected</h3>

Broadcast traffic rises, switch Media Access Control tables change rapidly, and connectivity becomes intermittent.

Suspect a Layer 2 loop. Inspect Spanning Tree Protocol topology changes, root selection, port roles, and the new connection. Remove or block the unintended loop safely, then correct the design and protection configuration. Verify stable forwarding and normal utilization.

Do not enable every blocked port. A blocked port may be the mechanism preventing the loop.

<h3>Scenario 5: Users can reach local systems but not the internet</h3>

Clients on one VLAN can reach each other and their local server. They cannot reach remote networks.

Check the assigned default gateway and mask, then test reachability to the gateway. Inspect the gateway interface, route table, default route, translation, and policy. If only one VLAN is affected, compare its gateway and routing configuration with a working VLAN.

Successful local communication makes a total physical outage less likely, but it does not prove the uplink, gateway, or remote path works.

<h3>Scenario 6: New devices cannot obtain leases, but existing devices work</h3>

The address scope is nearly full. Existing clients retain connectivity while new arrivals fail.

Inspect address-pool utilization, lease duration, exclusions, reservations, stale leases, and unexpected client growth. Recover addresses through the approved service process and expand or redesign capacity if the subnet supports it. Use the subnetting reference to verify whether the planned scope fits within the network boundary.

Restarting every client can make the shortage worse by forcing more lease activity.

<h3>Scenario 7: Wireless clients disconnect while walking between rooms</h3>

Clients work when stationary but briefly lose sessions while moving between access points.

Compare overlapping coverage, signal and noise at transition areas, security settings, VLAN mapping, controller events, client logs, and roaming configuration. Confirm that every participating access point serves the same intended network and that the client is not clinging to a distant cell or repeatedly reauthenticating because of inconsistent settings.

Increasing transmit power everywhere can worsen cell overlap and roaming behavior.

<h3>Scenario 8: A web service works by address but not by name</h3>

The client can open the service using its Internet Protocol address. The fully qualified domain name fails.

Test name resolution with `nslookup` or `dig`, confirm the configured resolver, inspect the returned record and cache behavior, and compare with another client. The successful address-based connection makes physical connectivity, basic routing, and the application listener more likely to be healthy.

Changing the subnet mask does not target the failed dependency unless other addressing evidence also points there.

<h3>Scenario 9: A newly installed access point has data link but no power</h3>

The cable passes a basic test, and the switchport can forward data when a separately powered device is connected. The access point does not start.

Inspect the Power over Ethernet standard, per-port state, total switch power budget, endpoint requirement, cable pair condition, and configuration. Test the access point on a known compatible powered port if allowed. A working data pair does not prove adequate power delivery.

<h2 id="exam-traps">Common Network+ Domain 5 traps</h2>

<h3>Changing several settings before testing a theory</h3>

Multiple simultaneous changes destroy evidence and make rollback harder. Change one intended variable when practical.

<h3>Skipping scope</h3>

A one-host failure and a whole-site failure should not begin with the same theory. Determine who and what is affected first.

<h3>Treating ping as complete service validation</h3>

A successful echo response does not validate Domain Name System, a Transmission Control Protocol port, authentication, encryption, or application health. A failed response may reflect filtering rather than an unreachable host.

<h3>Assuming a link light proves a good cable</h3>

A link can negotiate while errors, attenuation, interference, poor termination, or the wrong speed still harm traffic.

<h3>Replacing hardware because a counter is nonzero</h3>

Determine whether the counter is increasing now and whether it matches the symptom. Old totals can outlive the original problem.

<h3>Confusing bandwidth and throughput</h3>

Bandwidth is capacity. Throughput is achieved rate. Protocol overhead, loss, contention, endpoint limits, and application behavior can reduce throughput below bandwidth.

<h3>Confusing latency and jitter</h3>

Latency is delay. Jitter is variation in delay. Real-time media can suffer from variation even when the average delay looks acceptable.

<h3>Calling every wireless failure weak signal</h3>

Interference, channel overlap, authentication, controller events, client drivers, roaming, airtime contention, and policy can produce similar reports.

<h3>Clearing the error-disabled state without correcting the trigger</h3>

The protective condition may immediately return, or the original risk may remain. Identify why the port was disabled first.

<h3>Assuming Automatic Private IP Addressing (APIPA) proves the DHCP server is down</h3>

The failure may be the client, VLAN, relay, access control, pool, server, or return path. APIPA shows that normal configuration was not obtained.

<h3>Checking only the forward route</h3>

A conversation needs a return path. Asymmetric routing may be valid, but stateful policy and missing return routes can still break the session.

<h3>Using a protocol analyzer before checking local configuration</h3>

A capture is appropriate when packet behavior is the needed evidence. An obviously wrong address or gateway may be found faster with a local configuration command.

<h3>Choosing a toner as a cable-performance test</h3>

A toner helps identify or trace a cable. It does not certify that the cable supports the required standard.

<h3>Treating a speed test as proof that every application is healthy</h3>

The test uses particular endpoints, protocols, and timing. It may not reveal jitter, application delay, packet bursts, or a different path.

<h2 id="rapid-review">Rapid review checklist</h2>

You are ready to move beyond Domain 5 review when you can:

- Rebuild the seven troubleshooting steps in order and explain why each one exists.
- Turn a broad user report into measurable scope, timing, symptoms, and comparisons.
- Choose top-to-bottom, bottom-to-top, or divide-and-conquer reasoning from the evidence.
- Write a theory that predicts an observable result.
- Plan a fix with effects, validation, rollback, communication, and escalation in mind.
- Distinguish incorrect cable type, crosstalk, interference, attenuation, improper termination, and transposed transmit or receive paths.
- Interpret increasing cyclic redundancy check errors, runts, giants, drops, and interface states.
- Diagnose Power over Ethernet budget, standard, port, endpoint, and cable issues.
- Compare transceiver form factor, speed, wavelength, media, distance, and receive signal.
- Explain why a blocked Spanning Tree Protocol port can be healthy and necessary.
- Trace a wrong virtual local area network assignment through address, gateway, trunk, and policy symptoms.
- Inspect an access control list by source, destination, service, direction, order, and match evidence.
- Diagnose address-pool exhaustion, incorrect gateway, incorrect address, duplicate address, and incorrect subnet mask.
- Read a routing table for the actual destination and consider the return path.
- Distinguish congestion, contention, bottlenecks, bandwidth, throughput, latency, loss, and jitter.
- Diagnose wireless interference, channel overlap, signal loss, insufficient coverage, disassociation, and roaming problems.
- Choose `ping`, `traceroute`, `nslookup`, `dig`, `tcpdump`, `netstat`, local interface commands, Address Resolution Protocol tools, Nmap, discovery protocols, or a speed tester for a specific question.
- Choose a toner, cable tester, tap, Wi-Fi analyzer, or visual fault locator for the physical evidence required.
- Interpret the purpose of `show mac-address-table`, `show route`, `show interface`, `show config`, `show arp`, `show vlan`, and `show power`.
- Verify the user-facing service, dependent systems, counters, logs, and preventive action after the repair.
- Document enough evidence and reasoning for another technician to continue the case.

After reviewing, take a [Network+ N10-009 practice test](/network-plus/n10-009/practice-test/). For each missed troubleshooting question, write the leading theory and the smallest test that would reject it. That exercise exposes whether you understand the evidence or merely recognize the vocabulary.

<h2 id="official-references">Official references</h2>

- [CompTIA Network+ certification page](https://www.comptia.org/en-us/certifications/network/)
- [RFC 792: Internet Control Message Protocol](https://www.rfc-editor.org/rfc/rfc792)
- [RFC 826: An Ethernet Address Resolution Protocol](https://www.rfc-editor.org/rfc/rfc826)
- [RFC 2131: Dynamic Host Configuration Protocol](https://www.rfc-editor.org/rfc/rfc2131)
- [RFC 3393: IP Packet Delay Variation Metric](https://www.rfc-editor.org/rfc/rfc3393)
- [RFC 9293: Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc9293)
