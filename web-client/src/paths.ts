export enum CrudOperation {
    Create,
    Read,
    Update,
    Delete,
    ViewAll
}

const crudOperationName: any = {
    [CrudOperation.Create]: 'cr',
    [CrudOperation.Update]: 'up',
    [CrudOperation.ViewAll]: 'va'
};

const mainPath = '/admin';

export const paths = {
    signIn: `${mainPath}`,
    signUp: `${mainPath}/signup`,
    reset: `${mainPath}/reset`,
    profile: `${mainPath}/profile`,
    welcome: `${mainPath}/welcome`,

    vaBed: `${mainPath}/va-bed`,
    crBed: `${mainPath}/cr-bed`,
    upBed: `${mainPath}/up-bed`,

    vaRoom: `${mainPath}/va-room`,
    crRoom: `${mainPath}/cr-room`,
    upRoom: `${mainPath}/up-room`,

    vaFlatType: `${mainPath}/va-flatType`,
    crFlatType: `${mainPath}/cr-flatType`,
    upFlatType: `${mainPath}/up-flatType`,

    crReservation: `${mainPath}/cr-reservation`,
    upReservation: `${mainPath}/up-reservation`,
    vaReservation: `${mainPath}/va-reservation`,

    crLocalization: `${mainPath}/cr-localization`,
    upLocalization: `${mainPath}/up-localization`,
    vaLocalization: `${mainPath}/va-localization`,

    vaReservedFlat: `${mainPath}/va-reservedFlat`,
    vaReservationLog: `${mainPath}/va-reservationLog`,

    flatAvailability: `${mainPath}/flat-availability`
};

export const generatePath = (entityName: string, intention: CrudOperation) => {
    return `${mainPath}/${crudOperationName[intention]}-${entityName}`;
};
