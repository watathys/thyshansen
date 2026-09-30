/**
 * Module-level flag so the intro plays on every full page load / reload
 * (module state resets) but not when navigating client-side back to `/`
 * (module state persists). Deliberately not sessionStorage.
 */
let played = false;

export function hasPreloaderPlayed() {
  return played;
}

export function markPreloaderPlayed() {
  played = true;
}
