import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateIPv6,
  classifyIPv6,
  formatCompressedIPv6,
  formatExpandedIPv6,
  parseIPv6,
  parseIPv6Input
} from "../src/assets/js/ipv6-calculator.js";

test("parses compressed IPv6 and returns eight groups", () => {
  assert.deepEqual(parseIPv6("2001:db8::1"), [0x2001, 0x0db8, 0, 0, 0, 0, 0, 1]);
});

test("formats expanded and RFC 5952-style compressed text", () => {
  const address = "2001:0db8:0000:0000:0001:0000:0000:0001";
  assert.equal(formatExpandedIPv6(address), address);
  assert.equal(formatCompressedIPv6(address), "2001:db8::1:0:0:1");
});

test("uses the first zero run when equal runs have the same length", () => {
  assert.equal(
    formatCompressedIPv6("2001:db8:0:0:1:0:0:1"),
    "2001:db8::1:0:0:1"
  );
});

test("does not compress one isolated zero group", () => {
  assert.equal(
    formatCompressedIPv6("2001:db8:0:1:2:3:4:5"),
    "2001:db8:0:1:2:3:4:5"
  );
});

test("accepts and formats an IPv4-mapped IPv6 address", () => {
  assert.equal(
    formatCompressedIPv6("::ffff:192.0.2.1"),
    "::ffff:192.0.2.1"
  );
  assert.equal(classifyIPv6("::ffff:192.0.2.1").embeddedIPv4, "192.0.2.1");
});

test("calculates a /48 parent and selected /64 child", () => {
  const result = calculateIPv6("2001:db8:1234:12ab::20/48", "", "/64");

  assert.equal(result.networkPrefix, "2001:db8:1234::/48");
  assert.equal(result.firstAddress, "2001:db8:1234::");
  assert.equal(result.finalAddress, "2001:db8:1234:ffff:ffff:ffff:ffff:ffff");
  assert.equal(result.containing64, "2001:db8:1234:12ab::/64");
  assert.equal(result.childPlan.childCount, 65536n);
  assert.equal(result.childPlan.selectedIndex, 0x12abn);
  assert.equal(result.childPlan.selectedPrefix, "2001:db8:1234:12ab::/64");
  assert.equal(result.childPlan.previousPrefix, "2001:db8:1234:12aa::/64");
  assert.equal(result.childPlan.nextPrefix, "2001:db8:1234:12ac::/64");
});

test("handles a non-hextet prefix boundary", () => {
  const result = calculateIPv6("2001:db8:1234:abff::1/57");

  assert.equal(result.networkPrefix, "2001:db8:1234:ab80::/57");
  assert.equal(result.finalAddress, "2001:db8:1234:abff:ffff:ffff:ffff:ffff");
  assert.equal(result.groupRoles[3].role, "9 prefix bits, 7 remaining bits");
});

test("allows a child prefix equal to the parent", () => {
  const result = calculateIPv6("2001:db8:1::5/64", "", "64");
  assert.equal(result.childPlan.childCount, 1n);
  assert.equal(result.childPlan.selectedIndex, 0n);
  assert.match(result.childPlan.previousPrefix, /first child/);
  assert.match(result.childPlan.nextPrefix, /last child/);
});

test("rejects malformed IPv6 addresses", () => {
  assert.throws(() => parseIPv6("2001::db8::1"), /only once/);
  assert.throws(() => parseIPv6("2001:db8:1:2:3:4:5"), /eight hexadecimal groups/);
  assert.throws(() => parseIPv6("2001:db8::gg"), /hexadecimal digits/);
});

test("rejects conflicting inline and field prefixes", () => {
  assert.throws(
    () => parseIPv6Input("2001:db8::1/64", "/56"),
    /does not match/
  );
});

test("rejects a child prefix shorter than the parent", () => {
  assert.throws(
    () => calculateIPv6("2001:db8::1/64", "", "/48"),
    /between \/64 and \/128/
  );
});

test("classifies common IPv6 address categories", () => {
  assert.equal(classifyIPv6("::").category, "unspecified");
  assert.equal(classifyIPv6("::1").category, "loopback");
  assert.equal(classifyIPv6("fe80::1").category, "link-local");
  assert.equal(classifyIPv6("fd12:3456::1").category, "unique-local");
  assert.equal(classifyIPv6("2001:db8::1").category, "documentation");
  assert.equal(classifyIPv6("2600::1").category, "global-unicast");
});

test("identifies multicast scope and solicited-node multicast", () => {
  assert.equal(classifyIPv6("ff02::1").label, "Multicast (link-local)");
  assert.equal(classifyIPv6("ff0e::1").label, "Multicast (global)");
  assert.equal(classifyIPv6("ff02::1:ff00:1234").label, "Solicited-node multicast");
});
