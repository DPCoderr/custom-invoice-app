import { ApiError } from "#/lib/api/client";

export function projectAuthErrors<TField extends string>(
  error: Error,
  knownFields: readonly TField[],
): { fields: Partial<Record<TField, string>>; root?: string } {
  const fields: Partial<Record<TField, string>> = {};
  if (!(error instanceof ApiError) || !error.errors) {
    return { fields, root: error.message };
  }

  let hasUnknown = false;
  for (const [key, messages] of Object.entries(error.errors)) {
    const field = knownFields.find(
      (candidate) => candidate.toLowerCase() === key.toLowerCase(),
    );
    const message = messages.join(" ");
    if (field && message) fields[field] = message;
    else hasUnknown = true;
  }

  return {
    fields,
    root: hasUnknown || Object.keys(fields).length === 0 ? error.message : undefined,
  };
}
