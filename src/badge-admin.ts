import { Address, BigInt, log } from "@graphprotocol/graph-ts"
import {
  BadgeAdmin,
  OPCOAdded,
  CitizenAdded,
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
  citizen.ballot = badgeAdmin.getCitizen(event.params._citizen).ballot
  citizen.delegate = badgeAdmin.getCitizen(event.params._citizen).delegate.toHex()
  citizen.power = badgeAdmin.getCitizen(event.params._citizen).power
  citizen.metadata = badgeAdmin.getCitizen(event.params._citizen).metadata
  citizen.save()
}

export function handleMinted(event: Minted): void {
  let badgeAdmin = getBadgeAdminInstance(event.address)
  let opcoId = event.params._opco.toHex()
  let citizenId = event.params._minter.toHex()
  let opco =  Opco.load(opcoId)

  if (opco == null) {
    log.critical('handleMinted: Opco with id {} not found.', [opcoId])
  } else {
    opco.minted = badgeAdmin.getOPCO(event.params._opco).minted
    opco.save()
  }

  let citizen =  Citizen.load(citizenId)

  if (citizen == null) {
    log.critical('handleMinted: Citizen with id {} not found.', [citizenId])
  } else {
    citizen.minted = badgeAdmin.getCitizen(event.params._minter).minted
    citizen.save()
  }
}

export function handleMetadataChanged(event: MetadataChanged): void {
  let badgeAdmin = getBadgeAdminInstance(event.address)
  let role = event.params._role
  if (role == 'OPCO') {
    let opcoId = event.params._adr.toHex()
    let opco =  Opco.load(opcoId)

    if (opco == null) {
      log.critical('handleMetadataChanged: Opco with id {} not found.', [opcoId])
    } else {
      opco.metadata = badgeAdmin.getOPCO(event.params._adr).metadata
      opco.save()
    }    
  }

  if (role == 'Citizen') {
    let citizenId = event.params._adr.toHex()
    let citizen =  Citizen.load(citizenId)

    if (citizen == null) {
      log.critical('handleMetadataChanged: Citizen with id {} not found.', [citizenId])
    } else {
      citizen.metadata = badgeAdmin.getCitizen(event.params._adr).metadata
      citizen.save()
    }    
  }
}

export function handleCitizenRemoved(event: CitizenRemoved): void {}

function getBadgeAdminInstance(address: Address): BadgeAdmin {
  return BadgeAdmin.bind(address)
}