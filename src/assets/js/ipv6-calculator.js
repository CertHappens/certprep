const IPV6_GROUP_COUNT = 8;
const IPV6_BIT_COUNT = 128;
const MAX_IPV6 = (1n << 128n) - 1n;

function parseIPv4Tail(value) {
  const parts = String(value ?? "").split(".");
  if (parts.length !== 4) {
    throw new Error("An embedded IPv4 address must contain four decimal octets.");
  }

  const octets = parts.map((part) => {
    if (!/^\d{1,3}$/.test(part)) {
      throw new Error("Each embedded IPv4 octet must contain only decimal digits.");
    }
    const octet = Number(part);
    if (octet < 0 || octet > 255) {
      throw new Error("Each embedded IPv4 octet must be between 0 and 255.");
    }
    return octet;
  });

  return [
    ((octets[0] << 8) | octets[1]).toString(16),
    ((octets[2] << 8) | octets[3]).toString(16)
  ];
}

function normalizeAddressText(value) {
  let text = String(value ?? "").trim();
  if (!text) {
    throw new Error("Enter an IPv6 address.");
  }

  if (text.startsWith("[") || text.endsWith("]")) {
    if (!(text.startsWith("[") && text.endsWith("]"))) {
      throw new Error("Use matching brackets around an IPv6 address.");
    }
    text = text.slice(1, -1);
  }

  if (text.includes("%")) {
    throw new Error("Remove the zone identifier, such as %eth0, before calculating the prefix.");
  }

  if (/\s/.test(text)) {
    throw new Error("Enter one IPv6 address without spaces.");
  }

  return text.toLowerCase();
}

export function parseIPv6(value) {
  let text = normalizeAddressText(value);

  if (text.includes(".")) {
    const finalColon = text.lastIndexOf(":");
    if (finalColon < 0) {
      throw new Error("The embedded IPv4 address must follow an IPv6 prefix.");
    }
    const ipv4Tail = text.slice(finalColon + 1);
    const [high, low] = parseIPv4Tail(ipv4Tail);
    text = `${text.slice(0, finalColon)}:${high}:${low}`;
  }

  if ((text.match(/::/g) || []).length > 1) {
    throw new Error("An IPv6 address can use :: only once.");
  }

  let groups;
  if (text.includes("::")) {
    const [leftText, rightText] = text.split("::");
    const left = leftText ? leftText.split(":") : [];
    const right = rightText ? rightText.split(":") : [];

    if ([...left, ...right].some((group) => !group)) {
      throw new Error("The IPv6 address contains an empty group outside the :: abbreviation.");
    }

    const missing = IPV6_GROUP_COUNT - left.length - right.length;
    if (missing < 1) {
      throw new Error("The :: abbreviation must replace at least one 16-bit zero group.");
    }
    groups = [...left, ...Array(missing).fill("0"), ...right];
  } else {
    groups = text.split(":");
    if (groups.length !== IPV6_GROUP_COUNT) {
      throw new Error("Enter eight hexadecimal groups, or use :: once to shorten consecutive zero groups.");
    }
  }

  if (groups.length !== IPV6_GROUP_COUNT) {
    throw new Error("An IPv6 address must expand to eight 16-bit groups.");
  }

  return groups.map((group) => {
    if (!/^[0-9a-f]{1,4}$/.test(group)) {
      throw new Error("Each IPv6 group must contain one to four hexadecimal digits.");
    }
    return Number.parseInt(group, 16);
  });
}

export function ipv6ToBigInt(value) {
  const groups = Array.isArray(value) ? value : parseIPv6(value);
  if (groups.length !== IPV6_GROUP_COUNT) {
    throw new Error("An IPv6 address must contain eight groups.");
  }

  return groups.reduce((result, group) => {
    if (!Number.isInteger(group) || group < 0 || group > 0xffff) {
      throw new Error("Each IPv6 group must be between 0x0000 and 0xffff.");
    }
    return (result << 16n) | BigInt(group);
  }, 0n);
}

export function bigIntToIPv6Groups(value) {
  if (typeof value !== "bigint" || value < 0n || value > MAX_IPV6) {
    throw new Error("The IPv6 numeric value must fit within 128 bits.");
  }

  const groups = [];
  for (let index = 0; index < IPV6_GROUP_COUNT; index += 1) {
    const shift = BigInt((IPV6_GROUP_COUNT - index - 1) * 16);
    groups.push(Number((value >> shift) & 0xffffn));
  }
  return groups;
}

export function formatExpandedIPv6(value) {
  const groups = typeof value === "bigint" ? bigIntToIPv6Groups(value) : Array.isArray(value) ? value : parseIPv6(value);
  return groups.map((group) => group.toString(16).padStart(4, "0")).join(":");
}

function low32ToIPv4(value) {
  const low = Number(value & 0xffffffffn);
  return [
    (low >>> 24) & 255,
    (low >>> 16) & 255,
    (low >>> 8) & 255,
    low & 255
  ].join(".");
}

function prefixMask(prefix) {
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > IPV6_BIT_COUNT) {
    throw new Error("The IPv6 prefix length must be a whole number between 0 and 128.");
  }
  if (prefix === 0) {
    return 0n;
  }
  return (MAX_IPV6 << BigInt(IPV6_BIT_COUNT - prefix)) & MAX_IPV6;
}

function isInPrefix(value, networkValue, prefix) {
  const mask = prefixMask(prefix);
  return (value & mask) === (networkValue & mask);
}

function isIPv4Mapped(value) {
  return isInPrefix(value, ipv6ToBigInt("::ffff:0:0"), 96);
}

function isWellKnownNat64(value) {
  return isInPrefix(value, ipv6ToBigInt("64:ff9b::"), 96);
}

export function formatCompressedIPv6(value) {
  const numeric = typeof value === "bigint" ? value : ipv6ToBigInt(value);
  const groups = bigIntToIPv6Groups(numeric);

  if (isIPv4Mapped(numeric)) {
    return `::ffff:${low32ToIPv4(numeric)}`;
  }
  if (isWellKnownNat64(numeric)) {
    return `64:ff9b::${low32ToIPv4(numeric)}`;
  }

  let bestStart = -1;
  let bestLength = 0;
  let currentStart = -1;
  let currentLength = 0;

  for (let index = 0; index <= groups.length; index += 1) {
    if (index < groups.length && groups[index] === 0) {
      if (currentStart < 0) {
        currentStart = index;
        currentLength = 1;
      } else {
        currentLength += 1;
      }
    } else {
      if (currentLength >= 2 && currentLength > bestLength) {
        bestStart = currentStart;
        bestLength = currentLength;
      }
      currentStart = -1;
      currentLength = 0;
    }
  }

  const textGroups = groups.map((group) => group.toString(16));
  if (bestStart < 0) {
    return textGroups.join(":");
  }

  const before = textGroups.slice(0, bestStart).join(":");
  const after = textGroups.slice(bestStart + bestLength).join(":");
  if (!before && !after) {
    return "::";
  }
  if (!before) {
    return `::${after}`;
  }
  if (!after) {
    return `${before}::`;
  }
  return `${before}::${after}`;
}

export function parseIPv6Prefix(value) {
  const text = String(value ?? "").trim();
  if (!text) {
    throw new Error("Enter an IPv6 prefix length.");
  }
  const normalized = text.startsWith("/") ? text.slice(1) : text;
  if (!/^\d{1,3}$/.test(normalized)) {
    throw new Error("The IPv6 prefix must be a whole number such as /64.");
  }
  const prefix = Number(normalized);
  if (prefix < 0 || prefix > IPV6_BIT_COUNT) {
    throw new Error("The IPv6 prefix length must be between 0 and 128.");
  }
  return prefix;
}

export function parseIPv6Input(addressValue, prefixValue = "") {
  const rawAddress = String(addressValue ?? "").trim();
  const rawPrefix = String(prefixValue ?? "").trim();
  if (!rawAddress) {
    throw new Error("Enter an IPv6 address.");
  }

  let addressText = rawAddress;
  let inlinePrefix = null;
  if (rawAddress.includes("/")) {
    const parts = rawAddress.split("/");
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      throw new Error("Use IPv6 CIDR notation such as 2001:db8:1234::20/48.");
    }
    [addressText] = parts;
    inlinePrefix = parseIPv6Prefix(parts[1]);
  }

  const fieldPrefix = rawPrefix ? parseIPv6Prefix(rawPrefix) : null;
  if (inlinePrefix === null && fieldPrefix === null) {
    throw new Error("Add a prefix to the address or enter one in the prefix field.");
  }
  if (inlinePrefix !== null && fieldPrefix !== null && inlinePrefix !== fieldPrefix) {
    throw new Error(`The inline prefix /${inlinePrefix} does not match the prefix field /${fieldPrefix}.`);
  }

  const groups = parseIPv6(addressText.trim());
  const numeric = ipv6ToBigInt(groups);
  return {
    address: formatCompressedIPv6(numeric),
    groups,
    numeric,
    prefix: inlinePrefix ?? fieldPrefix
  };
}

const SPECIAL_PREFIXES = [
  {
    network: "::",
    prefix: 128,
    category: "unspecified",
    label: "Unspecified",
    detail: "The all-zero address means that a node does not yet have a usable source address. It is not assigned to an interface for ordinary communication."
  },
  {
    network: "::1",
    prefix: 128,
    category: "loopback",
    label: "Loopback",
    detail: "Traffic stays on the local system. This is the IPv6 equivalent of the IPv4 loopback address 127.0.0.1."
  },
  {
    network: "::ffff:0:0",
    prefix: 96,
    category: "ipv4-mapped",
    label: "IPv4-mapped IPv6",
    detail: "This form represents an IPv4 address inside an IPv6 data structure. It is commonly seen in software and APIs rather than assigned as an ordinary IPv6 interface address."
  },
  {
    network: "::",
    prefix: 96,
    category: "special-purpose",
    label: "IPv4-compatible form (deprecated)",
    detail: "This older transition form is deprecated. More-specific addresses such as :: and ::1 have their own meanings."
  },
  {
    network: "64:ff9b::",
    prefix: 96,
    category: "translation",
    label: "Well-known NAT64 prefix",
    detail: "This prefix can carry an embedded IPv4 destination for IPv6-to-IPv4 translation. It does not prove that a NAT64 service is present on the network."
  },
  {
    network: "64:ff9b:1::",
    prefix: 48,
    category: "translation",
    label: "Local-use NAT64 prefix",
    detail: "This prefix is reserved for locally assigned IPv4-embedded IPv6 translation addresses."
  },
  {
    network: "100::",
    prefix: 64,
    category: "special-purpose",
    label: "Discard-only",
    detail: "This special-purpose block is intended for traffic that should be discarded."
  },
  {
    network: "2001:2::",
    prefix: 48,
    category: "benchmarking",
    label: "Benchmarking",
    detail: "This block is reserved for controlled network-device benchmarking and should not be used as ordinary production addressing."
  },
  {
    network: "2001:db8::",
    prefix: 32,
    category: "documentation",
    label: "Documentation",
    detail: "This block is reserved for examples and documentation. It should not be used as ordinary production addressing."
  },
  {
    network: "2002::",
    prefix: 16,
    category: "special-purpose",
    label: "6to4 (deprecated)",
    detail: "This prefix belongs to the deprecated 6to4 transition mechanism."
  },
  {
    network: "fc00::",
    prefix: 7,
    category: "unique-local",
    label: "Unique local",
    detail: "This address is intended for local private communication. It is not normally routed across the public IPv6 internet."
  },
  {
    network: "fe80::",
    prefix: 10,
    category: "link-local",
    label: "Link-local",
    detail: "This address works only on the local link. Routers do not forward it to another IPv6 link."
  },
  {
    network: "2000::",
    prefix: 3,
    category: "global-unicast",
    label: "Global unicast",
    detail: "This address falls within the main globally routable unicast range. The result does not confirm allocation, ownership, or current reachability."
  }
];

const MULTICAST_SCOPES = new Map([
  [0x0, "reserved"],
  [0x1, "interface-local"],
  [0x2, "link-local"],
  [0x3, "realm-local"],
  [0x4, "admin-local"],
  [0x5, "site-local"],
  [0x8, "organization-local"],
  [0xe, "global"],
  [0xf, "reserved"]
]);

export function classifyIPv6(value) {
  const numeric = typeof value === "bigint" ? value : ipv6ToBigInt(value);

  if (isInPrefix(numeric, ipv6ToBigInt("ff02::1:ff00:0"), 104)) {
    return {
      category: "multicast",
      label: "Solicited-node multicast",
      detail: "Neighbor Discovery uses this link-local multicast range to reach nodes associated with a target IPv6 address.",
      matchedRange: "ff02::1:ff00:0/104",
      embeddedIPv4: null
    };
  }

  if (isInPrefix(numeric, ipv6ToBigInt("ff00::"), 8)) {
    const firstGroup = bigIntToIPv6Groups(numeric)[0];
    const scopeCode = firstGroup & 0x000f;
    const scope = MULTICAST_SCOPES.get(scopeCode) ?? `unassigned scope 0x${scopeCode.toString(16)}`;
    return {
      category: "multicast",
      label: `Multicast (${scope})`,
      detail: "Multicast sends traffic to a group of interfaces. IPv6 uses multicast instead of broadcast.",
      matchedRange: "ff00::/8",
      embeddedIPv4: null
    };
  }

  for (const entry of SPECIAL_PREFIXES) {
    const networkValue = ipv6ToBigInt(entry.network);
    if (isInPrefix(numeric, networkValue, entry.prefix)) {
      const embeddedIPv4 =
        entry.category === "ipv4-mapped" || (entry.category === "translation" && entry.prefix === 96)
          ? low32ToIPv4(numeric)
          : null;
      return {
        ...entry,
        matchedRange: `${entry.network}/${entry.prefix}`,
        embeddedIPv4
      };
    }
  }

  return {
    category: "other-reserved",
    label: "Other or reserved IPv6 space",
    detail: "No common address category in this tool matched. Check the IANA IPv6 special-purpose registry when allocation or routability matters.",
    matchedRange: null,
    embeddedIPv4: null
  };
}

export function formatBigInt(value) {
  const text = BigInt(value).toString();
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateChildPlan(address, parentNetwork, parentPrefix, childPrefix) {
  if (childPrefix === null) {
    return null;
  }
  if (!Number.isInteger(childPrefix) || childPrefix < parentPrefix || childPrefix > IPV6_BIT_COUNT) {
    throw new Error(`The child prefix must be between /${parentPrefix} and /128.`);
  }

  const childCount = 1n << BigInt(childPrefix - parentPrefix);
  const childSize = 1n << BigInt(IPV6_BIT_COUNT - childPrefix);
  const selectedIndex = (address - parentNetwork) / childSize;
  const selectedNetwork = parentNetwork + selectedIndex * childSize;
  const previousNetwork = selectedIndex > 0n ? selectedNetwork - childSize : null;
  const nextNetwork = selectedIndex + 1n < childCount ? selectedNetwork + childSize : null;
  const sampleCount = childCount < 4n ? Number(childCount) : 4;
  const firstChildren = Array.from({ length: sampleCount }, (_, index) => {
    const network = parentNetwork + BigInt(index) * childSize;
    return `${formatCompressedIPv6(network)}/${childPrefix}`;
  });

  return {
    childPrefix,
    childCount,
    selectedIndex,
    selectedPrefix: `${formatCompressedIPv6(selectedNetwork)}/${childPrefix}`,
    previousPrefix: previousNetwork === null ? "None: this is the first child prefix" : `${formatCompressedIPv6(previousNetwork)}/${childPrefix}`,
    nextPrefix: nextNetwork === null ? "None: this is the last child prefix" : `${formatCompressedIPv6(nextNetwork)}/${childPrefix}`,
    firstChildren
  };
}

export function calculateIPv6(addressValue, prefixValue = "", childPrefixValue = "") {
  const parsed = parseIPv6Input(addressValue, prefixValue);
  const childPrefix = String(childPrefixValue ?? "").trim() ? parseIPv6Prefix(childPrefixValue) : null;
  const mask = prefixMask(parsed.prefix);
  const network = parsed.numeric & mask;
  const finalAddress = network | (MAX_IPV6 ^ mask);
  const containing64Network = parsed.numeric & prefixMask(64);
  const status = classifyIPv6(parsed.numeric);
  const groups = bigIntToIPv6Groups(parsed.numeric);
  const groupRoles = groups.map((group, index) => {
    const startBit = index * 16;
    const endBit = startBit + 16;
    let role;
    if (parsed.prefix >= endBit) {
      role = "Prefix bits";
    } else if (parsed.prefix <= startBit) {
      role = "Bits after the prefix";
    } else {
      role = `${parsed.prefix - startBit} prefix bits, ${endBit - parsed.prefix} remaining bits`;
    }
    return {
      position: index + 1,
      hex: group.toString(16).padStart(4, "0"),
      binary: group.toString(2).padStart(16, "0"),
      role
    };
  });

  const childPlan = calculateChildPlan(parsed.numeric, network, parsed.prefix, childPrefix);
  const explanation = [
    `The address expands to ${formatExpandedIPv6(parsed.numeric)} and compresses to ${formatCompressedIPv6(parsed.numeric)}.`,
    `The /${parsed.prefix} prefix fixes the first ${parsed.prefix} bits and leaves ${IPV6_BIT_COUNT - parsed.prefix} bits after the prefix.`,
    `Clearing the remaining bits gives ${formatCompressedIPv6(network)}/${parsed.prefix}. Setting them all to 1 gives the final address in that prefix: ${formatCompressedIPv6(finalAddress)}.`,
    "IPv6 does not use a broadcast address. The first and final values shown are prefix boundaries, not automatically reserved host positions."
  ];

  if (childPlan) {
    explanation.push(
      `Subdividing /${parsed.prefix} into /${childPlan.childPrefix} creates ${formatBigInt(childPlan.childCount)} child prefix${childPlan.childCount === 1n ? "" : "es"}. The entered address falls within child number ${formatBigInt(childPlan.selectedIndex)} when counting from zero.`
    );
  }

  return {
    inputAddress: parsed.address,
    prefix: parsed.prefix,
    compressedAddress: formatCompressedIPv6(parsed.numeric),
    expandedAddress: formatExpandedIPv6(parsed.numeric),
    normalizedCidr: `${formatCompressedIPv6(parsed.numeric)}/${parsed.prefix}`,
    networkPrefix: `${formatCompressedIPv6(network)}/${parsed.prefix}`,
    firstAddress: formatCompressedIPv6(network),
    finalAddress: formatCompressedIPv6(finalAddress),
    containing64: `${formatCompressedIPv6(containing64Network)}/64`,
    prefixBits: parsed.prefix,
    remainingBits: IPV6_BIT_COUNT - parsed.prefix,
    addressStatus: status,
    groupRoles,
    childPlan,
    explanation
  };
}

function setText(root, key, value) {
  const element = root.querySelector(`[data-ipv6-output="${key}"]`);
  if (element) {
    element.textContent = value;
  }
}

function appendRows(body, rows) {
  body.replaceChildren();
  for (const row of rows) {
    const tr = document.createElement("tr");
    for (const value of row) {
      const td = document.createElement("td");
      td.textContent = value;
      tr.append(td);
    }
    body.append(tr);
  }
}

function initializeIPv6Calculator(root) {
  const form = root.querySelector("[data-ipv6-form]");
  const addressInput = root.querySelector("[data-ipv6-address]");
  const prefixInput = root.querySelector("[data-ipv6-prefix]");
  const childInput = root.querySelector("[data-ipv6-child-prefix]");
  const results = root.querySelector("[data-ipv6-results]");
  const resultsHeading = root.querySelector("[data-ipv6-results-heading]");
  const error = root.querySelector("[data-ipv6-error]");
  const status = root.querySelector("[data-ipv6-status]");
  const hextetBody = root.querySelector("[data-ipv6-hextet-body]");
  const explanation = root.querySelector("[data-ipv6-explanation]");
  const childSection = root.querySelector("[data-ipv6-child-section]");
  const childList = root.querySelector("[data-ipv6-child-list]");

  if (!form || !addressInput || !prefixInput || !childInput || !results || !error) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const calculation = calculateIPv6(addressInput.value, prefixInput.value, childInput.value);
      error.hidden = true;
      error.textContent = "";

      setText(root, "cidr", calculation.normalizedCidr);
      setText(root, "compressed", calculation.compressedAddress);
      setText(root, "expanded", calculation.expandedAddress);
      setText(root, "network-prefix", calculation.networkPrefix);
      setText(root, "first", calculation.firstAddress);
      setText(root, "final", calculation.finalAddress);
      setText(root, "containing-64", calculation.containing64);
      setText(root, "prefix-bits", String(calculation.prefixBits));
      setText(root, "remaining-bits", String(calculation.remainingBits));
      setText(root, "status", calculation.addressStatus.label);
      setText(root, "status-detail", calculation.addressStatus.detail);
      setText(root, "matched-range", calculation.addressStatus.matchedRange ?? "No common range matched");
      setText(root, "embedded-ipv4", calculation.addressStatus.embeddedIPv4 ?? "Not applicable");

      if (status) {
        status.dataset.status = calculation.addressStatus.category;
      }

      if (hextetBody) {
        appendRows(
          hextetBody,
          calculation.groupRoles.map((group) => [
            String(group.position),
            group.hex,
            group.binary,
            group.role
          ])
        );
      }

      if (explanation) {
        explanation.replaceChildren();
        for (const text of calculation.explanation) {
          const item = document.createElement("li");
          item.textContent = text;
          explanation.append(item);
        }
      }

      if (calculation.childPlan) {
        childSection.hidden = false;
        setText(root, "child-count", formatBigInt(calculation.childPlan.childCount));
        setText(root, "child-selected", calculation.childPlan.selectedPrefix);
        setText(root, "child-index", formatBigInt(calculation.childPlan.selectedIndex));
        setText(root, "child-previous", calculation.childPlan.previousPrefix);
        setText(root, "child-next", calculation.childPlan.nextPrefix);
        if (childList) {
          childList.replaceChildren();
          for (const prefix of calculation.childPlan.firstChildren) {
            const item = document.createElement("li");
            const code = document.createElement("code");
            code.textContent = prefix;
            item.append(code);
            childList.append(item);
          }
        }
      } else {
        childSection.hidden = true;
      }

      results.hidden = false;
      resultsHeading?.focus();
    } catch (caught) {
      results.hidden = true;
      error.textContent = caught instanceof Error ? caught.message : "Unable to calculate the IPv6 prefix.";
      error.hidden = false;
      error.focus();
    }
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      error.hidden = true;
      error.textContent = "";
      results.hidden = true;
    }, 0);
  });
}

if (typeof document !== "undefined") {
  for (const root of document.querySelectorAll("[data-ipv6-calculator]")) {
    initializeIPv6Calculator(root);
  }
}
