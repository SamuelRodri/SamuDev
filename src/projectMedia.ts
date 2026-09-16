export function resolveMedia(value: string) {
  if (/^https:\/\//.test(value)) return value;
  return `${import.meta.env.BASE_URL}${value.replace(/^\/+/, "")}`;
}
