'use client';

import { createContext, useContext } from 'react';

/**
 * Whether object reveals should replay.
 *
 * The miniatures are shared between /v2 and /v3, and their entrance animations
 * are `viewport={{ once: true }}` — animate on first sight, then never again.
 * That is right for /v2, where objects sit quietly in the gutters, and wrong
 * for /v3, where the desk is supposed to react every time you scroll past.
 *
 * Rather than thread a prop through every call site, /v3 wraps its field in
 * this provider and the shared drawing components read it. Default is false,
 * so /v2 and anything else keeps today's behaviour untouched.
 */
const DeskMotionContext = createContext<{ replay: boolean }>({ replay: false });

export const DeskMotionProvider = DeskMotionContext.Provider;

export function useDeskMotion() {
  return useContext(DeskMotionContext);
}
