const IPV4_OCTET_COUNT = 4;
const IPV4_BIT_COUNT = 32;

function assertInteger(value, message) {
  if (!Number.isInteger(value)) {
    throw new Error(message);
  }
}

export function parseIPv4(value) {
  const text = String(value ?? "").trim();
  const parts = text.split(".");

  if (parts.length !== IPV4_OCTET_COUNT) {
    throw new Error("Enter an IPv4 address with four decimal octets, such as 192.168.40.77.");
  }

  const octets = parts.map((part) => {
    if (!/^\d{1,3}$/.test(part)) {
      throw new Error("Each IPv4 octet must contain only decimal digits.");
    }

    const octet = Number(part);
    if (octet < 0 || octet > 255) {
      throw new Error("Each IPv4 octet must be between 0 and 255.");
    }

    return octet;
  });

  return octets;
}

export function ipv4ToInt(value) {
  const octets = Array.isArray(value) ? value : parseIPv4(value);

  if (octets.length !== IPV4_OCTET_COUNT) {
    throw new Error("An IPv4 address must contain four octets.");
  }

  return (
    ((octets[0] << 24) >>> 0) +
    (octets[1] << 16) +
    (octets[2] << 8) +
    octets[3]
  ) >>> 0;
}

export function intToIPv4(value) {
  assertInteger(value, "The IPv4 numeric value must be an integer.");

  if (value < 0 || value > 0xffffffff) {
    throw new Error("The IPv4 numeric value must be between 0 and 4294967295.");
  }

  const unsigned = value >>> 0;
  return [
    unsigned >>> 24,
    (unsigned >>> 16) & 255,
    (unsigned >>> 8) & 255,
    unsigned & 255
  ].join(".");
}

export function prefixToMaskInt(prefix) {
  assertInteger(prefix, "The CIDR prefix must be a whole number.");

  if (prefix < 0 || prefix > IPV4_BIT_COUNT) {
    throw new Error("The CIDR prefix must be between 0 and 32.");
  }

  if (prefix === 0) {
    return 0;
  }

  return (0xffffffff << (IPV4_BIT_COUNT - prefix)) >>> 0;
}

export function maskToPrefix(maskValue) {
  const maskOctets = parseIPv4(maskValue);
  const bits = maskOctets
    .map((octet) => octet.toString(2).padStart(8, "0"))
    .join("");

  if (!/^1*0*$/.test(bits)) {
    throw new Error("The subnet mask must contain contiguous 1 bits followed by contiguous 0 bits.");
  }

  const firstZero = bits.indexOf("0");
  return firstZero === -1 ? IPV4_BIT_COUNT : firstZero;
}

export function parsePrefixOrMask(value) {
  const text = String(value ?? "").trim();
  if (!text) {
    throw new Error("Enter a CIDR prefix or subnet mask.");
  }

  const withoutSlash = text.startsWith("/") ? text.slice(1) : text;

  if (/^\d{1,2}$/.test(withoutSlash)) {
    const prefix = Number(withoutSlash);
    if (prefix < 0 || prefix > IPV4_BIT_COUNT) {
      throw new Error("The CIDR prefix must be between 0 and 32.");
    }
    return prefix;
  }

  return maskToPrefix(withoutSlash);
}

export function parseSubnetInput(addressValue, prefixOrMaskValue = "") {
  const rawAddress = String(addressValue ?? "").trim();
  const rawSecondField = String(prefixOrMaskValue ?? "").trim();

  if (!rawAddress) {
    throw new Error("Enter an IPv4 address.");
  }

  let addressText = rawAddress;
  let inlinePrefixText = "";

  if (rawAddress.includes("/")) {
    const parts = rawAddress.split("/");
    if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
      throw new Error("Use CIDR notation such as 192.168.40.77/26.");
    }
    addressText = parts[0].trim();
    inlinePrefixText = parts[1].trim();
  } else {
    const whitespaceParts = rawAddress.split(/\s+/);
    if (whitespaceParts.length === 2) {
      addressText = whitespaceParts[0];
      inlinePrefixText = whitespaceParts[1];
    } else if (whitespaceParts.length > 2) {
      throw new Error("Enter one IPv4 address and one optional prefix or mask.");
    }
  }

  const addressOctets = parseIPv4(addressText);
  const inlinePrefix = inlinePrefixText ? parsePrefixOrMask(inlinePrefixText) : null;
  const fieldPrefix = rawSecondField ? parsePrefixOrMask(rawSecondField) : null;

  if (inlinePrefix === null && fieldPrefix === null) {
    throw new Error("Add a CIDR prefix to the address or enter a subnet mask in the second field.");
  }

  if (inlinePrefix !== null && fieldPrefix !== null && inlinePrefix !== fieldPrefix) {
    throw new Error(
      `The CIDR prefix /${inlinePrefix} does not match the second-field prefix /${fieldPrefix}.`
    );
  }

  return {
    address: addressOctets.join("."),
    addressOctets,
    prefix: inlinePrefix ?? fieldPrefix
  };
}

const SPECIAL_RANGES = [
  {
    network: "255.255.255.255",
    prefix: 32,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Limited broadcast address. Routers do not forward it as an ordinary destination."
  },
  {
    network: "192.0.0.9",
    prefix: 32,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Special-purpose Port Control Protocol anycast address."
  },
  {
    network: "192.0.0.10",
    prefix: 32,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Special-purpose TURN anycast address."
  },
  {
    network: "192.0.0.170",
    prefix: 31,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Special-purpose NAT64 and DNS64 discovery addresses."
  },
  {
    network: "192.88.99.2",
    prefix: 32,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Special-purpose 6a44 relay anycast address."
  },
  {
    network: "0.0.0.0",
    prefix: 8,
    category: "other-reserved",
    label: "Other reserved",
    detail: "This-network address space, including 0.0.0.0 for an unspecified local address."
  },
  {
    network: "10.0.0.0",
    prefix: 8,
    category: "private",
    label: "Private",
    detail: "RFC 1918 private-use address space."
  },
  {
    network: "100.64.0.0",
    prefix: 10,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Shared address space commonly used for carrier-grade NAT."
  },
  {
    network: "127.0.0.0",
    prefix: 8,
    category: "loopback",
    label: "Loopback",
    detail: "Traffic remains on the local host and does not leave through a normal interface."
  },
  {
    network: "169.254.0.0",
    prefix: 16,
    category: "link-local",
    label: "Link-local",
    detail: "IPv4 link-local range, often called APIPA in Windows troubleshooting."
  },
  {
    network: "172.16.0.0",
    prefix: 12,
    category: "private",
    label: "Private",
    detail: "RFC 1918 private-use address space from 172.16.0.0 through 172.31.255.255."
  },
  {
    network: "192.0.0.0",
    prefix: 24,
    category: "other-reserved",
    label: "Other reserved",
    detail: "IETF protocol-assignment range with several more-specific special-purpose addresses."
  },
  {
    network: "192.0.2.0",
    prefix: 24,
    category: "documentation",
    label: "Documentation",
    detail: "TEST-NET-1, reserved for examples and documentation."
  },
  {
    network: "192.31.196.0",
    prefix: 24,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Special-purpose AS112 service range."
  },
  {
    network: "192.52.193.0",
    prefix: 24,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Special-purpose Automatic Multicast Tunneling range."
  },
  {
    network: "192.88.99.0",
    prefix: 24,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Deprecated 6to4 relay anycast range."
  },
  {
    network: "192.168.0.0",
    prefix: 16,
    category: "private",
    label: "Private",
    detail: "RFC 1918 private-use address space."
  },
  {
    network: "192.175.48.0",
    prefix: 24,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Special-purpose direct-delegation AS112 service range."
  },
  {
    network: "198.18.0.0",
    prefix: 15,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Reserved for network-device benchmarking tests."
  },
  {
    network: "198.51.100.0",
    prefix: 24,
    category: "documentation",
    label: "Documentation",
    detail: "TEST-NET-2, reserved for examples and documentation."
  },
  {
    network: "203.0.113.0",
    prefix: 24,
    category: "documentation",
    label: "Documentation",
    detail: "TEST-NET-3, reserved for examples and documentation."
  },
  {
    network: "224.0.0.0",
    prefix: 4,
    category: "multicast",
    label: "Multicast",
    detail: "IPv4 multicast address space for group delivery, not ordinary unicast host assignment."
  },
  {
    network: "240.0.0.0",
    prefix: 4,
    category: "other-reserved",
    label: "Other reserved",
    detail: "Reserved address space. Special-use rules take precedence over ordinary public addressing."
  }
];

function isInRange(addressInt, networkText, prefix) {
  const mask = prefixToMaskInt(prefix);
  const networkInt = ipv4ToInt(networkText);
  return ((addressInt & mask) >>> 0) === ((networkInt & mask) >>> 0);
}

export function classifyAddress(addressValue) {
  const addressInt = typeof addressValue === "number" ? addressValue >>> 0 : ipv4ToInt(addressValue);

  const match = SPECIAL_RANGES.find((range) =>
    isInRange(addressInt, range.network, range.prefix)
  );

  if (match) {
    return {
      category: match.category,
      label: match.label,
      detail: match.detail,
      matchedRange: `${match.network}/${match.prefix}`
    };
  }

  return {
    category: "public",
    label: "Public",
    detail: "No listed special-purpose range matched. This does not verify current ownership, allocation, or internet reachability.",
    matchedRange: null
  };
}

export function getLegacyClass(addressValue) {
  const octets = Array.isArray(addressValue) ? addressValue : parseIPv4(addressValue);
  const first = octets[0];

  if (first >= 1 && first <= 126) {
    return "Class A (historical /8 default)";
  }
  if (first === 127) {
    return "Class A range historically, but 127.0.0.0/8 is loopback";
  }
  if (first >= 128 && first <= 191) {
    return "Class B (historical /16 default)";
  }
  if (first >= 192 && first <= 223) {
    return "Class C (historical /24 default)";
  }
  if (first >= 224 && first <= 239) {
    return "Class D (historical multicast label)";
  }
  if (first >= 240 && first <= 255) {
    return "Class E (historical reserved or experimental label)";
  }
  return "No ordinary legacy class (special-use first-octet range)";
}

function ordinalOctet(index) {
  return ["first", "second", "third", "fourth"][index] ?? "relevant";
}

function binaryOctets(octets) {
  return octets.map((octet) => octet.toString(2).padStart(8, "0"));
}

function addressRole(addressInt, networkInt, broadcastInt, prefix) {
  if (prefix === 32) {
    return "Single address (host route)";
  }
  if (prefix === 31) {
    return "RFC 3021 point-to-point endpoint";
  }
  if (addressInt === networkInt) {
    return "Network address";
  }
  if (addressInt === broadcastInt) {
    return "Broadcast address";
  }
  return "Usable host position under traditional subnet math";
}

export function calculateSubnet(addressValue, prefixOrMaskValue = "") {
  const parsed = parseSubnetInput(addressValue, prefixOrMaskValue);
  const addressInt = ipv4ToInt(parsed.addressOctets);
  const maskInt = prefixToMaskInt(parsed.prefix);
  const wildcardInt = (~maskInt) >>> 0;
  const networkInt = (addressInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;
  const hostBits = IPV4_BIT_COUNT - parsed.prefix;
  const totalAddresses = 2 ** hostBits;
  const classification = classifyAddress(addressInt);

  let firstUsableInt;
  let lastUsableInt;
  let usableAddresses;
  let broadcastDisplay;

  if (parsed.prefix === 32) {
    firstUsableInt = networkInt;
    lastUsableInt = networkInt;
    usableAddresses = 1;
    broadcastDisplay = "Not applicable for a /32 host route";
  } else if (parsed.prefix === 31) {
    firstUsableInt = networkInt;
    lastUsableInt = broadcastInt;
    usableAddresses = 2;
    broadcastDisplay = `None for RFC 3021 point-to-point use (upper endpoint ${intToIPv4(broadcastInt)})`;
  } else {
    firstUsableInt = networkInt + 1;
    lastUsableInt = broadcastInt - 1;
    usableAddresses = Math.max(totalAddresses - 2, 0);
    broadcastDisplay = intToIPv4(broadcastInt);
  }

  const addressOctets = parsed.addressOctets;
  const maskOctets = parseIPv4(intToIPv4(maskInt));
  const networkOctets = parseIPv4(intToIPv4(networkInt));
  const wildcardOctets = parseIPv4(intToIPv4(wildcardInt));
  const addressBinary = binaryOctets(addressOctets);
  const maskBinary = binaryOctets(maskOctets);
  const networkBinary = binaryOctets(networkOctets);
  const wildcardBinary = binaryOctets(wildcardOctets);

  const explanation = [
    `A /${parsed.prefix} prefix uses ${parsed.prefix} network bit${parsed.prefix === 1 ? "" : "s"} and leaves ${hostBits} host bit${hostBits === 1 ? "" : "s"}.`,
    `The subnet mask is ${intToIPv4(maskInt)}. Inverting every mask bit produces the wildcard mask ${intToIPv4(wildcardInt)}.`,
    `The network address comes from a bitwise AND between ${parsed.address} and ${intToIPv4(maskInt)}, producing ${intToIPv4(networkInt)}.`
  ];

  if (parsed.prefix === 0) {
    explanation.push("A /0 contains the entire IPv4 address space, so its only boundary runs from 0.0.0.0 through 255.255.255.255.");
  } else if (parsed.prefix === 32) {
    explanation.push("All 32 bits are fixed. The block contains one address, so no separate broadcast address exists.");
  } else {
    const changingOctetIndex = Math.floor(parsed.prefix / 8);
    const relevantIndex = Math.min(changingOctetIndex, 3);
    const blockSize = 256 - maskOctets[relevantIndex];
    const lowerBoundary = networkOctets[relevantIndex];
    const upperBoundary = lowerBoundary + blockSize - 1;

    explanation.push(
      `The changing octet is the ${ordinalOctet(relevantIndex)} octet. Its mask value is ${maskOctets[relevantIndex]}, so the block size is 256 - ${maskOctets[relevantIndex]} = ${blockSize}. The entered octet ${addressOctets[relevantIndex]} falls in the ${lowerBoundary}-${upperBoundary} block.`
    );
  }

  if (parsed.prefix === 31) {
    explanation.push("RFC 3021 permits both addresses on a /31 point-to-point link to act as endpoints, so the usual network-and-broadcast subtraction is not used.");
  } else if (parsed.prefix === 32) {
    explanation.push("A /32 identifies one host address or route. Total and usable counts are both 1.");
  } else {
    explanation.push(
      `${hostBits} host bits provide 2^${hostBits} = ${totalAddresses.toLocaleString("en-US")} total addresses. Subtracting the network and broadcast addresses leaves ${usableAddresses.toLocaleString("en-US")} traditional usable host addresses.`
    );
  }

  return {
    inputAddress: parsed.address,
    prefix: parsed.prefix,
    cidr: `${parsed.address}/${parsed.prefix}`,
    subnetMask: intToIPv4(maskInt),
    wildcardMask: intToIPv4(wildcardInt),
    networkAddress: intToIPv4(networkInt),
    broadcastAddress: broadcastDisplay,
    firstUsableAddress: intToIPv4(firstUsableInt),
    lastUsableAddress: intToIPv4(lastUsableInt),
    totalAddresses,
    usableAddresses,
    hostBits,
    addressRole: addressRole(addressInt, networkInt, broadcastInt, parsed.prefix),
    addressStatus: classification,
    legacyClass: getLegacyClass(addressOctets),
    binaryRows: addressOctets.map((octet, index) => ({
      octet: index + 1,
      addressDecimal: octet,
      addressBinary: addressBinary[index],
      maskDecimal: maskOctets[index],
      maskBinary: maskBinary[index],
      networkDecimal: networkOctets[index],
      networkBinary: networkBinary[index],
      wildcardDecimal: wildcardOctets[index],
      wildcardBinary: wildcardBinary[index]
    })),
    explanation
  };
}

function setOutput(root, name, value) {
  const element = root.querySelector(`[data-subnet-output="${name}"]`);
  if (element) {
    element.textContent = value;
  }
}

function renderBinaryRows(tbody, rows) {
  tbody.replaceChildren();

  for (const row of rows) {
    const tr = document.createElement("tr");
    const values = [
      row.octet,
      `${row.addressDecimal} (${row.addressBinary})`,
      `${row.maskDecimal} (${row.maskBinary})`,
      row.networkBinary,
      row.wildcardBinary
    ];
    const labels = ["Octet", "Address", "Mask", "Network bits", "Wildcard bits"];

    values.forEach((value, index) => {
      const cell = document.createElement(index === 0 ? "th" : "td");
      cell.dataset.label = labels[index];
      if (index === 0) {
        cell.scope = "row";
      }
      cell.textContent = value;
      tr.append(cell);
    });

    tbody.append(tr);
  }
}

function appendSegmentedValue(element, parts) {
  const accessibleText = document.createElement("span");
  accessibleText.className = "visually-hidden";
  accessibleText.textContent = parts.join(".");
  element.append(accessibleText);

  parts.forEach((part, index) => {
    const value = document.createElement("span");
    value.textContent = part;
    value.setAttribute("aria-hidden", "true");
    element.append(value);

    if (index < parts.length - 1) {
      const separator = document.createElement("span");
      separator.textContent = ".";
      separator.setAttribute("aria-hidden", "true");
      element.append(separator);
    }
  });
}

function appendBinaryOctetGrid(element, labelParts, binaryParts) {
  const accessibleText = document.createElement("span");
  accessibleText.className = "visually-hidden";
  accessibleText.textContent = binaryParts.join(".");

  const grid = document.createElement("span");
  grid.className = "subnet-binary-mobile__octets";
  grid.setAttribute("aria-hidden", "true");

  binaryParts.forEach((part, index) => {
    const pair = document.createElement("span");
    pair.className = "subnet-binary-mobile__octet-pair";

    const label = document.createElement("span");
    label.className = "subnet-binary-mobile__octet-label";
    label.textContent = String(labelParts[index]);

    const octet = document.createElement("code");
    octet.className = "subnet-binary-mobile__octet";
    octet.textContent = part;

    pair.append(label, octet);
    grid.append(pair);
  });

  element.append(accessibleText, grid);
}

function createBinaryMobileGroup(label, labelParts, binaryParts, decimalParts = null) {
  const group = document.createElement("section");
  group.className = "subnet-binary-mobile__group";

  const heading = document.createElement("h4");
  heading.textContent = label;
  group.append(heading);

  if (decimalParts) {
    const decimal = document.createElement("div");
    decimal.className = "subnet-binary-mobile__decimal";
    appendSegmentedValue(decimal, decimalParts.map(String));
    group.append(decimal);
  }

  const binary = document.createElement("div");
  binary.className = "subnet-binary-mobile__bits";
  appendBinaryOctetGrid(binary, labelParts, binaryParts);
  group.append(binary);

  return group;
}

function renderBinaryMobile(container, rows) {
  container.replaceChildren(
    createBinaryMobileGroup(
      "Address",
      rows.map((row) => row.addressDecimal),
      rows.map((row) => row.addressBinary),
      rows.map((row) => row.addressDecimal)
    ),
    createBinaryMobileGroup(
      "Mask",
      rows.map((row) => row.maskDecimal),
      rows.map((row) => row.maskBinary),
      rows.map((row) => row.maskDecimal)
    ),
    createBinaryMobileGroup(
      "Network bits",
      rows.map((row) => row.networkDecimal),
      rows.map((row) => row.networkBinary)
    ),
    createBinaryMobileGroup(
      "Wildcard bits",
      rows.map((row) => row.wildcardDecimal),
      rows.map((row) => row.wildcardBinary)
    )
  );
}

function renderExplanation(list, steps) {
  list.replaceChildren();
  for (const step of steps) {
    const item = document.createElement("li");
    item.textContent = step;
    list.append(item);
  }
}

function initializeSubnetCalculator(root) {
  const form = root.querySelector("[data-subnet-form]");
  const addressInput = root.querySelector("[data-subnet-address]");
  const maskInput = root.querySelector("[data-subnet-mask]");
  const error = root.querySelector("[data-subnet-error]");
  const results = root.querySelector("[data-subnet-results]");
  const resultsHeading = root.querySelector("[data-subnet-results-heading]");
  const binaryBody = root.querySelector("[data-subnet-binary-body]");
  const binaryRegion = binaryBody?.closest(".subnet-binary-table");
  const explanationList = root.querySelector("[data-subnet-explanation]");

  let binaryMobile = binaryRegion?.querySelector("[data-subnet-binary-mobile]");
  if (binaryRegion && !binaryMobile) {
    binaryMobile = document.createElement("div");
    binaryMobile.className = "subnet-binary-mobile";
    binaryMobile.dataset.subnetBinaryMobile = "";
    binaryRegion.append(binaryMobile);
  }

  if (
    !form ||
    !addressInput ||
    !maskInput ||
    !error ||
    !results ||
    !resultsHeading ||
    !binaryBody ||
    !binaryMobile ||
    !explanationList
  ) {
    return;
  }

  const render = ({ moveFocus = false } = {}) => {
    try {
      const calculation = calculateSubnet(addressInput.value, maskInput.value);
      error.hidden = true;
      error.textContent = "";

      setOutput(root, "cidr", calculation.cidr);
      setOutput(root, "network", calculation.networkAddress);
      setOutput(root, "broadcast", calculation.broadcastAddress);
      setOutput(root, "first-usable", calculation.firstUsableAddress);
      setOutput(root, "last-usable", calculation.lastUsableAddress);
      setOutput(root, "total", calculation.totalAddresses.toLocaleString("en-US"));
      setOutput(root, "usable", calculation.usableAddresses.toLocaleString("en-US"));
      setOutput(root, "mask", calculation.subnetMask);
      setOutput(root, "prefix", `/${calculation.prefix}`);
      setOutput(root, "wildcard", calculation.wildcardMask);
      setOutput(root, "role", calculation.addressRole);
      setOutput(root, "status", calculation.addressStatus.label);
      setOutput(root, "status-detail", calculation.addressStatus.detail);
      setOutput(root, "legacy-class", calculation.legacyClass);

      const statusBadge = root.querySelector("[data-subnet-status-badge]");
      if (statusBadge) {
        statusBadge.dataset.status = calculation.addressStatus.category;
      }

      renderBinaryRows(binaryBody, calculation.binaryRows);
      renderBinaryMobile(binaryMobile, calculation.binaryRows);
      renderExplanation(explanationList, calculation.explanation);
      results.hidden = false;

      if (moveFocus) {
        resultsHeading.focus();
      }
    } catch (calculationError) {
      results.hidden = true;
      error.textContent = calculationError instanceof Error
        ? calculationError.message
        : "The subnet could not be calculated.";
      error.hidden = false;

      if (moveFocus) {
        error.focus();
      }
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render({ moveFocus: true });
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => render(), 0);
  });

  render();
}

if (typeof document !== "undefined") {
  for (const calculator of document.querySelectorAll("[data-subnet-calculator]")) {
    initializeSubnetCalculator(calculator);
  }
}
