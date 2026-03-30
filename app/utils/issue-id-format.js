/**
 * Convert a canonical Beads issue id into the compact UI display form.
 *
 * Canonical ids remain authoritative for routing, transport, and mutations.
 * The compact form is only for user-facing presentation.
 *
 * @param {string} id
 * @returns {string}
 */
export function toDisplayIssueId(id) {
  const value = String(id || '');
  const match = /^beads-enhanced-ui-(\d+)$/.exec(value);
  if (match) {
    return `bd-ui-${match[1]}`;
  }
  return value;
}
