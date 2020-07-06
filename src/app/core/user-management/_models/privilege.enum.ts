export enum Privilege {
     /** USER */
    READ_USER_ALL    = 'READ_USER_ALL',
    READ_USER        = 'READ_USER',
    CREATE_USER      = 'CREATE_USER',
    UPDATE_USER      = 'UPDATE_USER',
    DELETE_USER      = 'DELETE_USER',
     /** ISSUE */
    READ_ISSUE       = 'READ_ISSUE',
    CREATE_ISSUE     = 'CREATE_ISSUE',
    UPDATE_ISSUE     = 'UPDATE_ISSUE',
    DELETE_ISSUE     = 'DELETE_ISSUE',
     /** CANDIDATE */
     READ_CANDIDATE       = 'READ_CANDIDATE',
     CREATE_CANDIDATE     = 'CREATE_CANDIDATE',
     UPDATE_CANDIDATE     = 'UPDATE_CANDIDATE',
     DELETE_CANDIDATE     = 'DELETE_CANDIDATE',
     /** ROLE */
     UPDATE_ROLE          = 'UPDATE_ROLE',
     /** DEVELOPER */
     DEVELOPER            = 'DEVELOPER',
}
