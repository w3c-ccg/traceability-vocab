const fs = require('fs')
const path = require('path')

const getAllJsonFilesFromDirectory = (targetDirectory) => {
    const files = fs.readdirSync(targetDirectory).filter(f => {
        return f.indexOf('.json') !== -1;
    });
    return files.map(f => {
        return JSON.parse(fs.readFileSync(path.resolve(targetDirectory, f).toString()));
    });
}

const getIntermediateFromDirectory = (targetDirectory) => {
    const intermediate = {}
    const files = getAllJsonFilesFromDirectory(targetDirectory)
    files.forEach((file) => {
        const $classComment = JSON.parse(file.$comment)
        if (!intermediate[$classComment['@id']]) {
            intermediate[$classComment['@id']] = {
                $id: file.$id,
                $schema: file.$schema,
                $comment: $classComment,
                title: file.title,
                description: file.description,
                classProperties: {}
            }
        }
        Object.values(file.properties).forEach((prop) => {
            const $propertyComment = JSON.parse(prop.$comment)
            intermediate[$classComment['@id']].classProperties[$propertyComment['@id']] = {
                $comment: $propertyComment,
                title: prop.title,
                description: prop.description
            }
        })
    })
    return intermediate;
}

const getContextFromIntermediate = (intermediate) => {
    let partialContext = {};
    Object.values(intermediate).forEach((classDefinition) => {
        let propertDefinitionPartialContext = {};
        Object.values(classDefinition.classProperties).forEach((classProperty) => {
            propertDefinitionPartialContext = {
                ...propertDefinitionPartialContext,
                [classProperty.$comment.term]: {
                    "@id": classProperty.$comment['@id'],
                }

            }
        })

        partialContext = {
            ...partialContext,
            [classDefinition.$comment.term]: {
                "@id": classDefinition.$comment['@id'],
                "@context": {
                    "@version": 1.1,
                    "@protected": true,
                    "id": "@id",
                    "type": "@type",
                    ...propertDefinitionPartialContext
                }
            }
        }

    })
    return {
        "@context": {
            "@version": 1.1,
            "@protected": true,
            "name": "http://schema.org/name",
            "description": "http://schema.org/description",
            "identifier": "http://schema.org/identifier",
            "image": {
                "@id": "http://schema.org/image",
                "@type": "@id"
            },
            ...partialContext
        }
    }
}

module.exports = { getAllJsonFilesFromDirectory, getIntermediateFromDirectory, getContextFromIntermediate };