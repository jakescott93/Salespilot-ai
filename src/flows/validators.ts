const COMPLETE = "Please complete this detail before continuing.";

export const required = (v: string) => (v.trim() ? null : COMPLETE);

export const email = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
    ? null
    : "Please check this email address.";

export const phone = (v: string) =>
  /^[+()\d\s.-]{7,32}$/.test(v.trim())
    ? null
    : "Please check this telephone number.";

export { COMPLETE };
