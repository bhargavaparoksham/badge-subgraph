import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  Burned,
  CitizenAdded,
  CitizenRemoved,
  MetadataChanged,
  Minted,
  OPAdded,
  OPCOAdded,
  OwnershipTransferred
} from "../generated/BadgeAdmin/BadgeAdmin"

export function createBurnedEvent(_burner: Address): Burned {
  let burnedEvent = changetype<Burned>(newMockEvent())

  burnedEvent.parameters = new Array()

  burnedEvent.parameters.push(
    new ethereum.EventParam("_burner", ethereum.Value.fromAddress(_burner))
  )

  return burnedEvent
}

export function createCitizenAddedEvent(
  _opco: Address,
  _citizen: Address
): CitizenAdded {
  let citizenAddedEvent = changetype<CitizenAdded>(newMockEvent())

  citizenAddedEvent.parameters = new Array()

  citizenAddedEvent.parameters.push(
    new ethereum.EventParam("_opco", ethereum.Value.fromAddress(_opco))
  )
  citizenAddedEvent.parameters.push(
    new ethereum.EventParam("_citizen", ethereum.Value.fromAddress(_citizen))
  )

  return citizenAddedEvent
}

export function createCitizenRemovedEvent(
  _opco: Address,
  _removed: Address
): CitizenRemoved {
  let citizenRemovedEvent = changetype<CitizenRemoved>(newMockEvent())

  citizenRemovedEvent.parameters = new Array()

  citizenRemovedEvent.parameters.push(
    new ethereum.EventParam("_opco", ethereum.Value.fromAddress(_opco))
  )
  citizenRemovedEvent.parameters.push(
    new ethereum.EventParam("_removed", ethereum.Value.fromAddress(_removed))
  )

  return citizenRemovedEvent
}

export function createMetadataChangedEvent(
  _role: string,
  _adr: Address
): MetadataChanged {
  let metadataChangedEvent = changetype<MetadataChanged>(newMockEvent())

  metadataChangedEvent.parameters = new Array()

  metadataChangedEvent.parameters.push(
    new ethereum.EventParam("_role", ethereum.Value.fromString(_role))
  )
  metadataChangedEvent.parameters.push(
    new ethereum.EventParam("_adr", ethereum.Value.fromAddress(_adr))
  )

  return metadataChangedEvent
}

export function createMintedEvent(_minter: Address, _opco: Address): Minted {
  let mintedEvent = changetype<Minted>(newMockEvent())

  mintedEvent.parameters = new Array()

  mintedEvent.parameters.push(
    new ethereum.EventParam("_minter", ethereum.Value.fromAddress(_minter))
  )
  mintedEvent.parameters.push(
    new ethereum.EventParam("_opco", ethereum.Value.fromAddress(_opco))
  )

  return mintedEvent
}

export function createOPAddedEvent(_op: Address): OPAdded {
  let opAddedEvent = changetype<OPAdded>(newMockEvent())

  opAddedEvent.parameters = new Array()

  opAddedEvent.parameters.push(
    new ethereum.EventParam("_op", ethereum.Value.fromAddress(_op))
  )

  return opAddedEvent
}

export function createOPCOAddedEvent(_op: Address, _opco: Address): OPCOAdded {
  let opcoAddedEvent = changetype<OPCOAdded>(newMockEvent())

  opcoAddedEvent.parameters = new Array()

  opcoAddedEvent.parameters.push(
    new ethereum.EventParam("_op", ethereum.Value.fromAddress(_op))
  )
  opcoAddedEvent.parameters.push(
    new ethereum.EventParam("_opco", ethereum.Value.fromAddress(_opco))
  )

  return opcoAddedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
