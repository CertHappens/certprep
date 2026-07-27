---
layout: layouts/article.njk
title: Hashing, Encryption, and Encoding Quick Reference for Security+ SY0-701
description: Compare hashing, encryption, encoding, digital signatures, HMAC, salts, and key stretching with practical Security+ scenarios.
permalink: /security-plus/quick-review/hashing-encryption-encoding/
ogType: article
printable: true
printTitle: Hashing, Encryption, and Encoding Quick Reference for Security+ SY0-701
author: certHappens
datePublished: 2026-07-24
dateModified: 2026-07-27
articleSection: Security+ SY0-701 Quick Review
eyebrow: Security+ quick review
lede: Start with the security goal, then choose the transformation that actually provides it.
breadcrumbs:
  - label: Home
    url: /
  - label: Security+
    url: /security-plus/
  - label: Quick Review
    url: /security-plus/quick-review/
  - label: Hashing, Encryption, and Encoding
    url: /security-plus/quick-review/hashing-encryption-encoding/
toc:
  - id: three-methods
    label: Three methods at a glance
  - id: hashing
    label: Hashing
  - id: encryption
    label: Encryption
  - id: encoding
    label: Encoding
  - id: signatures-hmac
    label: Digital signatures and HMAC
  - id: password-protection
    label: Password protection
  - id: scenario-comparisons
    label: Scenario comparisons
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review grid
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CompTIA Security+
  - SY0-701 cryptography
  - hashing versus encryption
  - Base64 encoding
  - digital signatures
  - HMAC
  - password salting
relatedLinks:
  - title: "Security+ Quick Review Guides"
    url: /security-plus/quick-review/
    description: Browse all focused comparisons and return to the quick-review hub.
  - title: "Domain 1: General Security Concepts"
    url: /security-plus/sy0-701/study-guide/general-security-concepts/
    description: Continue with security controls, zero trust, change management, cryptography, PKI, and certificates.
  - title: "Security controls quick reference"
    url: /security-plus/quick-review/security-controls/
    description: Compare control categories and functions with realistic Security+ scenarios.
  - title: "Recovery metrics quick reference"
    url: /security-plus/quick-review/recovery-metrics/
    description: Separate RTO, RPO, MTTR, and MTBF with timelines and calculations.
  - title: "Security+ acronyms and terms"
    url: /security-plus/acronyms/
    description: Search Security+ abbreviations and related terms with plain-English explanations.
  - title: "Take a randomized SY0-701 practice test"
    url: /security-plus/sy0-701/practice-test/
    description: Apply these distinctions in a fresh 10, 20, 30, or 50-question session.
---

A cryptography question often becomes manageable as soon as you identify the requested outcome:

- **Confidentiality:** prevent unauthorized reading
- **Integrity:** detect unauthorized change
- **Authenticity:** verify the claimed source
- **Compatibility:** represent data in a format another system can handle

Hashing, encryption, and encoding solve different problems. Digital signatures and HMAC combine cryptographic operations to add source assurance.

<div class="article-callout">
  <p><strong>Fast split:</strong> Encrypt to keep data secret. Hash to create a one-way digest. Encode to change representation without adding secrecy.</p>
</div>

<h2 id="three-methods">Three methods at a glance</h2>

<div class="table-scroll" role="region" aria-label="Hashing encryption and encoding comparison" tabindex="0">
<table>
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Primary purpose</th>
      <th scope="col">Reversible?</th>
      <th scope="col">Uses a secret key?</th>
      <th scope="col">Typical examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hashing</strong></td>
      <td>Create a digest for integrity checks or password verification</td>
      <td>No practical reversal</td>
      <td>No for an ordinary hash</td>
      <td>SHA-256, SHA-3</td>
    </tr>
    <tr>
      <td><strong>Encryption</strong></td>
      <td>Protect confidentiality</td>
      <td>Yes, with the proper key</td>
      <td>Yes</td>
      <td>AES, RSA</td>
    </tr>
    <tr>
      <td><strong>Encoding</strong></td>
      <td>Represent data for storage, transfer, or compatibility</td>
      <td>Yes, without a secret</td>
      <td>No</td>
      <td>Base64, hexadecimal</td>
    </tr>
  </tbody>
</table>
</div>

The output may look unreadable in all three cases. Appearance does not determine the security property. Ask what information or key is needed to recover or verify the original data.

<h2 id="hashing">Hashing</h2>

A cryptographic hash function accepts data of varying length and produces a fixed-length digest. A secure hash is designed to be one-way and collision resistant.

Useful properties include:

- The same input produces the same digest when the same algorithm is used.
- A small input change should produce a very different digest.
- The digest length is determined by the algorithm, not by the input size.
- Finding the original input from the digest should be computationally infeasible.
- Finding two different inputs with the same digest should be computationally infeasible.

### Integrity checking

A software publisher can post a file and its expected SHA-256 digest. After downloading the file, a user calculates a new digest and compares it with the published value.

A match supports the conclusion that the file did not change between the publisher's calculation and the user's calculation. It does not prove who created the file unless the expected digest is delivered through a trusted, authenticated source.

### An ordinary hash does not authenticate the sender

Anyone who has a message can calculate its unkeyed hash. Matching digests show that the compared data is the same. They do not identify who produced it.

Use a digital signature when public verification and signatory assurance are needed. Use HMAC when parties share a secret and need message authentication.

### Example digest

For the text:

```text
Cert happens.
```

SHA-256 produces:

```text
0875b0b38c71dc648dfcc1ebfd8cb5cc9b1d510b884fd2ebb5d023a4f7bfc2f2
```

Changing even the final period changes the digest. Deleting the period does not produce a slightly shorter result. SHA-256 still returns a 256-bit digest.

### Recognize weak legacy choices

MD5 and SHA-1 may still appear in old systems, file listings, or exam distractors. Their collision resistance is not suitable for modern security uses. Prefer current approved hash families such as SHA-2 or SHA-3 when the scenario requires a secure cryptographic hash.

<h2 id="encryption">Encryption</h2>

Encryption transforms plaintext into ciphertext using an algorithm and a key. Decryption uses the required key to restore the plaintext.

Encryption primarily protects **confidentiality**. It does not automatically prove who created the data or guarantee that no one modified it. Secure protocols often combine encryption with an authentication mechanism.

### Symmetric encryption

Symmetric encryption uses the same secret key for encryption and decryption.

**Strengths**

- Fast enough for large amounts of data
- Efficient for disks, files, databases, and network sessions
- Commonly used after two parties establish a shared session key

**Main challenge**

- The secret key must be distributed and protected safely.

AES is the main Security+ example of a symmetric block cipher.

### Asymmetric encryption

Asymmetric cryptography uses a mathematically related public and private key pair.

When protecting confidentiality for a recipient:

1. The sender encrypts with the recipient's public key.
2. The recipient decrypts with the recipient's private key.

**Strengths**

- The public key can be distributed broadly.
- It supports digital signatures and key-establishment processes.
- It reduces the need to share one long-term secret with every party.

**Tradeoffs**

- It is slower and more computationally expensive than symmetric encryption.
- Real systems commonly use asymmetric methods to establish or protect a symmetric session key, then use symmetric encryption for the data.

RSA and elliptic-curve cryptography are common asymmetric concepts. The exact operation depends on the algorithm and protocol. Do not assume every asymmetric algorithm supports both encryption and signatures.

### Hybrid encryption

A typical secure session uses both types:

- Asymmetric cryptography authenticates parties or protects key establishment.
- Symmetric encryption protects the application data efficiently.

When a question offers both methods, look for the stage of the process being described.

<h2 id="encoding">Encoding</h2>

Encoding changes how data is represented so that it can be stored or transferred through a particular system. It does not require a secret key.

Base64 is useful when binary data must travel through a text-oriented format. Hexadecimal represents each byte as two base-16 characters.

The text:

```text
Cert happens.
```

can be represented as Base64:

```text
Q2VydCBoYXBwZW5zLg==
```

or hexadecimal:

```text
43 65 72 74 20 68 61 70 70 65 6e 73 2e
```

Anyone who recognizes the encoding can reverse it. Encoding may make data less readable at a glance, but it does not provide confidentiality.

### Encoding can carry encrypted or hashed data

These operations can be layered.

For example, a system may:

1. Encrypt binary data.
2. Encode the ciphertext with Base64 so it can be placed in a text field.

Base64 is still only the representation layer. The encryption is what protects confidentiality.

### Common clues

Look for encoding when the scenario mentions:

- Binary data inside email, JSON, XML, or another text format
- Printable representation
- Character compatibility
- Base64 or hexadecimal output
- A value that anyone can decode without a key

<h2 id="signatures-hmac">Digital signatures and HMAC</h2>

Hashing is often one part of a larger cryptographic process.

### Digital signatures

A digital signature uses asymmetric cryptography.

1. The signer creates the signature using the signer's private key.
2. A verifier checks the signature using the corresponding public key.

A properly implemented digital signature supports:

- Integrity
- Origin authentication
- Non-repudiation support

It does **not** provide confidentiality by itself. Anyone may be able to read a signed message unless the message is also encrypted.

Digital-signature systems normally operate on a digest of the data rather than applying the signature algorithm directly to an entire large file.

### HMAC

A hash-based message authentication code combines a cryptographic hash function with a shared secret key.

HMAC supports:

- Integrity
- Message authentication between parties that share the secret

HMAC does not provide confidentiality. It also does not provide the same third-party non-repudiation support as a digital signature because every party holding the shared secret could generate a valid HMAC.

<div class="table-scroll" role="region" aria-label="Hash HMAC and digital signature comparison" tabindex="0">
<table>
  <thead>
    <tr>
      <th scope="col">Mechanism</th>
      <th scope="col">Key material</th>
      <th scope="col">Integrity</th>
      <th scope="col">Source assurance</th>
      <th scope="col">Confidentiality</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ordinary hash</strong></td>
      <td>None</td>
      <td>Yes, when compared with a trusted digest</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>HMAC</strong></td>
      <td>Shared secret</td>
      <td>Yes</td>
      <td>Yes, among holders of the shared secret</td>
      <td>No</td>
    </tr>
    <tr>
      <td><strong>Digital signature</strong></td>
      <td>Private key signs; public key verifies</td>
      <td>Yes</td>
      <td>Yes, with a trusted public-key binding</td>
      <td>No</td>
    </tr>
  </tbody>
</table>
</div>

<h2 id="password-protection">Password protection</h2>

Passwords should not be stored as plaintext or as reversibly encrypted values for routine authentication. A verifier usually stores the output of a password-hashing or password-based key-derivation process.

### Salt

A salt is a unique random value combined with a password before hashing.

Salting helps because:

- Two users with the same password receive different stored values.
- Precomputed hash lists become far less useful.
- An attacker must work on each salted password separately.

The salt is not normally secret. It can be stored beside the resulting password hash.

### Key stretching

Key stretching deliberately makes each password guess more expensive by repeating or strengthening the derivation process.

The goal is to slow offline guessing after a credential database is stolen while keeping legitimate login verification practical.

A work factor or cost setting controls the expense. As hardware improves, an organization can increase that cost for newly created or updated password values.

### Pepper

A pepper is an additional secret value kept separately from the password database. It can add protection if the database is stolen without the separate secret.

Peppering is not a replacement for unique salts or an appropriate password-hashing function.

<div class="article-callout">
  <p><strong>Password clue:</strong> Salt defeats easy reuse of precomputed results. Key stretching raises the cost of every guess.</p>
</div>

<h2 id="scenario-comparisons">Scenario comparisons</h2>

<div class="table-scroll" role="region" aria-label="Cryptographic method scenario comparisons" tabindex="0">
<table>
  <thead>
    <tr>
      <th scope="col">Scenario</th>
      <th scope="col">Best match</th>
      <th scope="col">Why</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A company must prevent someone who steals a laptop from reading its files.</td>
      <td><strong>Encryption</strong></td>
      <td>The required property is confidentiality.</td>
    </tr>
    <tr>
      <td>An administrator compares a downloaded image with a trusted SHA-256 value.</td>
      <td><strong>Hashing</strong></td>
      <td>The digest can reveal whether the file changed.</td>
    </tr>
    <tr>
      <td>Binary certificate data must be placed inside a text-only configuration file.</td>
      <td><strong>Encoding</strong></td>
      <td>The problem is data representation and compatibility.</td>
    </tr>
    <tr>
      <td>A software vendor wants customers to verify the publisher and detect modified packages.</td>
      <td><strong>Digital signature</strong></td>
      <td>Customers need integrity and public verification of the claimed signer.</td>
    </tr>
    <tr>
      <td>Two internal services share a secret and must authenticate API messages.</td>
      <td><strong>HMAC</strong></td>
      <td>A shared secret can produce and verify message-authentication tags.</td>
    </tr>
    <tr>
      <td>Users with the same password must not have identical stored password values.</td>
      <td><strong>Unique salts</strong></td>
      <td>The random value makes otherwise identical passwords produce different results.</td>
    </tr>
    <tr>
      <td>A stolen credential database should require more computation for every password guess.</td>
      <td><strong>Key stretching</strong></td>
      <td>The process deliberately increases the cost of offline guessing.</td>
    </tr>
    <tr>
      <td>A sender needs to transfer a large encrypted file efficiently after negotiating a session key.</td>
      <td><strong>Symmetric encryption</strong></td>
      <td>Symmetric encryption is efficient for bulk data.</td>
    </tr>
  </tbody>
</table>
</div>

<h2 id="exam-traps">Common exam traps</h2>

### Choosing Base64 to protect a secret

Base64 is reversible without a key. It solves a representation problem, not a confidentiality problem.

### Choosing hashing for confidentiality

Hashing can support integrity checks and password verification. It does not let an authorized recipient recover the original message.

### Assuming encryption supplies every security property

Encryption protects confidentiality when implemented correctly. Integrity and authentication usually require an authenticated-encryption mode, MAC, signature, or protocol that supplies those protections.

### Signing with the public key

The signer uses the private key. Verifiers use the corresponding public key.

For confidentiality, the direction is different: a sender encrypts for a recipient with the recipient's public key, and the recipient decrypts with the private key.

### Treating an ordinary hash as proof of origin

Anyone can calculate an unkeyed hash. Use a trusted digital signature or HMAC when the source matters.

### Treating HMAC as a digital signature

HMAC uses a shared secret. A digital signature uses a private key for signing and a public key for verification. HMAC cannot show a third party which shared-secret holder created the tag.

### Assuming a salt must remain secret

A salt should be unique and unpredictable when generated, but it can be stored with the password hash. Its job is to make identical passwords and precomputed attacks less useful.

### Confusing key stretching with encryption

Key stretching increases the work needed to test password guesses or derive a key. It does not replace encryption when data must later be recovered.

<h2 id="rapid-review">Rapid review grid</h2>

<div class="table-scroll" role="region" aria-label="Cryptographic methods rapid review" tabindex="0">
<table>
  <thead>
    <tr>
      <th scope="col">Need</th>
      <th scope="col">Choose</th>
      <th scope="col">Memory cue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Confidentiality</td>
      <td>Encryption</td>
      <td>Recover with the proper key</td>
    </tr>
    <tr>
      <td>Integrity comparison</td>
      <td>Hash</td>
      <td>One-way digest</td>
    </tr>
    <tr>
      <td>Text-safe representation</td>
      <td>Encoding</td>
      <td>Reformat without a secret</td>
    </tr>
    <tr>
      <td>Integrity and shared-secret authentication</td>
      <td>HMAC</td>
      <td>Hash plus shared secret</td>
    </tr>
    <tr>
      <td>Integrity and public verification of a signer</td>
      <td>Digital signature</td>
      <td>Private signs, public verifies</td>
    </tr>
    <tr>
      <td>Different stored values for identical passwords</td>
      <td>Salt</td>
      <td>Unique random input</td>
    </tr>
    <tr>
      <td>More expensive password guessing</td>
      <td>Key stretching</td>
      <td>Raise the cost per guess</td>
    </tr>
    <tr>
      <td>Efficient bulk-data protection</td>
      <td>Symmetric encryption</td>
      <td>One shared secret key</td>
    </tr>
    <tr>
      <td>Signatures or protected key establishment</td>
      <td>Asymmetric cryptography</td>
      <td>Public and private key pair</td>
    </tr>
  </tbody>
</table>
</div>

A useful decision path:

1. **Must authorized users recover the original data?** Choose encryption.
2. **Must anyone be able to reverse the representation?** Choose encoding.
3. **Is a one-way comparison enough?** Choose hashing.
4. **Must the source also be verified?** Add HMAC or a digital signature, depending on the trust model.

<h2 id="review-checklist">Review checklist</h2>

Before moving on, confirm that you can:

- State the main purpose of hashing, encryption, and encoding.
- Explain why unreadable output is not automatically encrypted.
- Separate symmetric and asymmetric encryption use cases.
- Remember that private keys sign and public keys verify.
- Explain why an ordinary hash does not authenticate a sender.
- Choose HMAC for shared-secret message authentication.
- Choose a digital signature for public verification of a signer.
- Explain how salts change password-storage results.
- Explain how key stretching increases the cost of password guessing.
- Recognize Base64 and hexadecimal as encodings rather than confidentiality controls.
- Identify whether a scenario requests confidentiality, integrity, authenticity, or compatibility.

For the broader cryptography and PKI material, continue with the [General Security Concepts guide](/security-plus/sy0-701/study-guide/general-security-concepts/).

<h2 id="official-references">Official references</h2>

The Security+ SY0-701 objectives include cryptographic solutions such as symmetric and asymmetric encryption, hashing, salting, key stretching, digital signatures, and public-key infrastructure. The following primary sources provide standards and definitions used in this guide.

- [CompTIA Security+ certification page](https://www.comptia.org/en-us/certifications/security/)
- [CompTIA Security+ SY0-701 exam objectives PDF](https://www.comptia.jp/pdf/CompTIA%20Security%2B%20SY0-701%20Exam%20Objectives.pdf)
- [NIST FIPS 180-4: Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
- [NIST FIPS 197: Advanced Encryption Standard](https://csrc.nist.gov/pubs/fips/197/final)
- [NIST FIPS 186-5: Digital Signature Standard](https://csrc.nist.gov/pubs/fips/186-5/final)
- [NIST SP 800-63B-4: Authentication and Authenticator Management](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [IETF RFC 2104: HMAC](https://www.rfc-editor.org/rfc/rfc2104)
- [IETF RFC 4648: Base16, Base32, and Base64 Encodings](https://www.rfc-editor.org/rfc/rfc4648)
