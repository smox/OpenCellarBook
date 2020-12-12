interface IWellKnownPropertyTypeNode {
  typeId: number
}
interface IWellKnownPropertyType {
  TRANSFILL_FROM: IWellKnownPropertyTypeNode,
  TRANSFILL_TO: IWellKnownPropertyTypeNode,
  WINE_DESIGNATION: IWellKnownPropertyTypeNode,
  CHECK_NUMBER: IWellKnownPropertyTypeNode,
  EXTERNAL_BOTTLED_CODE: IWellKnownPropertyTypeNode,
}

export const WellKnownPropertyTypes: IWellKnownPropertyType = {
  TRANSFILL_FROM: {
    typeId: 351
  },
  TRANSFILL_TO: {
    typeId: 352
  },
  WINE_DESIGNATION: {
    typeId: 353
  },
  CHECK_NUMBER: {
    typeId: 354
  },
  EXTERNAL_BOTTLED_CODE: {
    typeId: 355
  }
}

