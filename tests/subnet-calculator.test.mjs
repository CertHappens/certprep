import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateSubnet,
  classifyAddress,
  maskToPrefix,
  parseSubnetInput
} from "../src/assets/js/subnet-calculator.js";

test("calculates a typical /26 subnet from CIDR input", () => {
  const result = calculateSubnet("192.168.40.77/26");

  assert.equal(result.networkAddress, "192.168.40.64");
  assert.equal(result.broadcastAddress, "192.168.40.127");
  assert.equal(result.firstUsableAddress, "192.168.40.65");
  assert.equal(result.lastUsableAddress, "192.168.40.126");
  assert.equal(result.totalAddresses, 64);
  assert.equal(result.usableAddresses, 62);
  assert.equal(result.subnetMask, "255.255.255.192");
  assert.equal(result.wildcardMask, "0.0.0.63");
  assert.equal(result.addressStatus.category, "private");
});

test("accepts a dotted-decimal mask in the second field", () => {
  const result = calculateSubnet("198.51.100.130", "255.255.255.224");

  assert.equal(result.prefix, 27);
  assert.equal(result.networkAddress, "198.51.100.128");
  assert.equal(result.broadcastAddress, "198.51.100.159");
  assert.equal(result.addressStatus.category, "documentation");
});

test("rejects a noncontiguous dotted-decimal mask", () => {
  assert.throws(
    () => maskToPrefix("255.0.255.0"),
    /contiguous 1 bits/
  );
});

test("rejects conflicting inline and second-field prefixes", () => {
  assert.throws(
    () => parseSubnetInput("192.168.1.20/24", "255.255.255.192"),
    /does not match/
  );
});

test("handles an RFC 3021 /31 point-to-point link", () => {
  const result = calculateSubnet("203.0.113.10/31");

  assert.equal(result.networkAddress, "203.0.113.10");
  assert.match(result.broadcastAddress, /None for RFC 3021/);
  assert.equal(result.firstUsableAddress, "203.0.113.10");
  assert.equal(result.lastUsableAddress, "203.0.113.11");
  assert.equal(result.totalAddresses, 2);
  assert.equal(result.usableAddresses, 2);
});

test("handles a /32 host route", () => {
  const result = calculateSubnet("192.0.2.44/32");

  assert.equal(result.networkAddress, "192.0.2.44");
  assert.match(result.broadcastAddress, /Not applicable/);
  assert.equal(result.firstUsableAddress, "192.0.2.44");
  assert.equal(result.lastUsableAddress, "192.0.2.44");
  assert.equal(result.totalAddresses, 1);
  assert.equal(result.usableAddresses, 1);
});

test("handles the IPv4 default route block", () => {
  const result = calculateSubnet("8.8.8.8/0");

  assert.equal(result.networkAddress, "0.0.0.0");
  assert.equal(result.broadcastAddress, "255.255.255.255");
  assert.equal(result.totalAddresses, 4294967296);
  assert.equal(result.usableAddresses, 4294967294);
});

test("classifies common special-purpose address categories", () => {
  assert.equal(classifyAddress("10.20.30.40").category, "private");
  assert.equal(classifyAddress("127.0.0.1").category, "loopback");
  assert.equal(classifyAddress("169.254.20.3").category, "link-local");
  assert.equal(classifyAddress("224.0.0.5").category, "multicast");
  assert.equal(classifyAddress("203.0.113.8").category, "documentation");
  assert.equal(classifyAddress("198.18.1.1").category, "other-reserved");
  assert.equal(classifyAddress("8.8.8.8").category, "public");
});
