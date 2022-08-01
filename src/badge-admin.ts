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

export function handleOPCOAdded(event: OPCOAdded): void {

  let badgeAdmin = getBadgeAdminInstance(event.address)
  let opcoId = event.params._opco.toHex()
  let opco = new Opco(opcoId)
  opco.valid = badgeAdmin.getOPCO(event.params._opco).valid
  opco.supply = badgeAdmin.getOPCO(event.params._opco).supply
  opco.minted = badgeAdmin.getOPCO(event.params._opco).minted
  opco.metadata = badgeAdmin.getOPCO(event.params._opco).metadata
  opco.save()

}

export function handleCitizenAdded(event: CitizenAdded): void {
  let badgeAdmin = getBadgeAdminInstance(event.address)
  let citizenId = event.params._citizen.toHex()
  let citizen = new Citizen(citizenId)
  citizen.valid = badgeAdmin.getCitizen(event.params._citizen).valid
  citizen.minted = badgeAdmin.getCitizen(event.params._citizen).minted
  citizen.opco = event.params._opco.toHex()
  citizen.metadata = badgeAdmin.getCitizen(event.params._citizen).metadata
  citizen.save()
}

export function handleCitizenRemoved(event: CitizenRemoved): void {}

export function handleMetadataChanged(event: MetadataChanged): void {}

export function handleMinted(event: Minted): void {}


function getBadgeAdminInstance(address: Address): BadgeAdmin {
  return BadgeAdmin.bind(address)
}