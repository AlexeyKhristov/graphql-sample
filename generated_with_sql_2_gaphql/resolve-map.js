export const resolveMap = {
    'Story': {
        'name': 'Story',
        'table': 'stories',
        'primaryKey': 'id',

        'aliases': {
            'author_id': 'authorId'
        },

        'referenceMap': {},
        'listReferences': {}
    },

    'User': {
        'name': 'User',
        'table': 'users',
        'primaryKey': 'id',
        'aliases': {},
        'referenceMap': {},
        'listReferences': {}
    }
};

export function registerType(type) {
    if (!resolveMap[type.name]) {
        throw new Error(
            'Cannot register type "' + type.name + '" - resolve map does not exist for that type'
        );
    }

    resolveMap[type.name].type = type;
};

export function getType(type) {
    if (!resolveMap[type] || !resolveMap[type].type) {
        throw new Error('No type registered for type \'' + type + '\'');
    }

    return resolveMap[type].type;
};