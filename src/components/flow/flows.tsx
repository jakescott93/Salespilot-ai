"use client";

/**
 * Client-side bindings of flow configs to the FlowShell. Flow configs
 * carry functions (dynamic options, conditional stages), so they must be
 * imported inside the client boundary, not serialized across it.
 */

import { FlowShell } from "./FlowShell";
import { automotiveAcquire } from "@/flows/automotiveAcquire";
import { automotiveSell } from "@/flows/automotiveSell";
import { horologyAcquire } from "@/flows/horologyAcquire";
import { horologySell } from "@/flows/horologySell";

export function AutomotiveAcquireFlow() {
  return (
    <FlowShell
      flow={automotiveAcquire}
      housePath="/automotive"
      descriptor="Private Automotive Office"
    />
  );
}

export function AutomotiveSellFlow() {
  return (
    <FlowShell
      flow={automotiveSell}
      housePath="/automotive"
      descriptor="Private Automotive Office"
    />
  );
}

export function HorologyAcquireFlow() {
  return (
    <FlowShell
      flow={horologyAcquire}
      housePath="/horology"
      descriptor="Private Watch Office"
    />
  );
}

export function HorologySellFlow() {
  return (
    <FlowShell
      flow={horologySell}
      housePath="/horology"
      descriptor="Private Watch Office"
    />
  );
}
