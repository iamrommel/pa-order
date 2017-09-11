export const Action =
    {type: 'PUSH_NEW_ROUTE', route: ''}
    | {type: 'POP_ROUTE'}
    | {type: 'POP_TO_ROUTE', route: ''}
    | {type: 'REPLACE_ROUTE', route: ''}
    | {type: 'REPLACE_OR_PUSH_ROUTE', route: ''}
    | {type: 'OPEN_DRAWER'}
    | {type: 'CLOSE_DRAWER'}
    | {type: 'CHANGE_PLATFORM'}
    | {type: 'CHANGE_MATERIAL'}

