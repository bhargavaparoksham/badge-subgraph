import { BigInt } from "@graphprotocol/graph-ts"
import {
  BadgeAdmin,
  Burned,
  CitizenAdded,
  CitizenRemoved,
  MetadataChanged,
  Minted,
  OPAdded,
  OPCOAdded,
  OwnershipTransferred
} from "../generated/BadgeAdmin/BadgeAdmin"
import { ExampleEntity } from "../generated/schema"

export function handleBurned(event: Burned): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._burner = event.params._burner

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BadgeContract(...)
  // - contract.getCitizen(...)
  // - contract.getCitizenCount(...)
  // - contract.getCitizens(...)
  // - contract.getOP(...)
  // - contract.getOPCO(...)
  // - contract.getOPCOs(...)
  // - contract.getOPCount(...)
  // - contract.getOPs(...)
  // - contract.isCitizen(...)
  // - contract.isOP(...)
  // - contract.isOPCO(...)
  // - contract.maxCitizenLimit(...)
  // - contract.maxOPCOLimit(...)
  // - contract.maxOPLimit(...)
  // - contract.owner(...)
}

export function handleCitizenAdded(event: CitizenAdded): void {}

export function handleCitizenRemoved(event: CitizenRemoved): void {}

export function handleMetadataChanged(event: MetadataChanged): void {}

export function handleMinted(event: Minted): void {}

export function handleOPAdded(event: OPAdded): void {}

export function handleOPCOAdded(event: OPCOAdded): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
