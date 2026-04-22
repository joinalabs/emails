---
name: Backoffice namespace templates
description: Current template names and purposes in the backoffice namespace, including renames from the Producer prefix era
type: project
---

The `backoffice` namespace serves internal Joina operations and account/producer management. Templates were renamed to drop the "Producer" prefix because the backoffice serves accounts generically — not producers specifically.

## Rename history (applied 2026-04-21)

| Old name | New name |
|---|---|
| `ProducerFirstAccountInvite` | `AccountInvite` |
| `ProducerInvite` | `AccountMemberInvite` |
| `ProducerPasswordReset` | `AccountMemberPasswordReset` |

The rename is total: folder name, file name, component export name, Props type name, and Copy type name all follow the same rename. Example: `ProducerFirstAccountInviteProps` → `AccountInviteProps`.

## Current templates

### `AccountInvite`
Sent by the platform (Joina backoffice) after a commercial contract is signed. The recipient has **no account yet**. Invites them to create their first account and fill in company/producer and user profile details. Uses a signed, time-limited `inviteUrl`.

### `AccountMemberInvite`
Sent when a team member who **already has an account** invites another email address to join their producer organization. Includes optional `inviterName` and `inviteeEmail`. Uses a signed `inviteUrl`.

### `AccountMemberPasswordReset`
Sent when a producer account holder requests a password reset. Contains a single `resetUrl` CTA. No branding detail card — minimal layout.

**Why:** Removing the "Producer" prefix decouples the backoffice template naming from a single account type. Backoffice serves accounts generically.

**How to apply:** When adding new backoffice templates, do not use "Producer" as a prefix unless the template is genuinely producer-specific and no equivalent account-generic use case exists. Prefer `Account*` or `AccountMember*` prefixes.
