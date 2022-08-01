import { BigInt } from "@graphprotocol/graph-ts"
import {
  BadgeAdmin,
  OPCOsAdded,
  CitizensAdded,
  MetadataChanged,
  Minted,
  CitizenRemoved
} from "../generated/BadgeAdmin/BadgeAdmin"
import { Opco, Citizen } from "../generated/schema"

export function handleOPCOAdded(event: OPCOAdded): void {}

export function handleCitizenAdded(event: CitizenAdded): void {}

export function handleCitizenRemoved(event: CitizenRemoved): void {}

export function handleMetadataChanged(event: MetadataChanged): void {}

export function handleMinted(event: Minted): void {}


