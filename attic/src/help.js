const fs = require("fs");
const path = require("path");
const faker = require("faker");

const getAllJsonFilesFromDirectory = (targetDirectory) => {
  const files = fs.readdirSync(targetDirectory).filter((f) => {
    return f.indexOf(".json") !== -1;
  });
  return files.map((f) => {
    return JSON.parse(
      fs.readFileSync(path.resolve(targetDirectory, f).toString())
    );
  });
};

const getIntermediateFromDirectory = (targetDirectory) => {
  const intermediate = {};
  const files = getAllJsonFilesFromDirectory(targetDirectory);
  files.forEach((file) => {
    const $classComment = JSON.parse(file.$comment);
    if (!intermediate[$classComment["@id"]]) {
      intermediate[$classComment["@id"]] = {
        $id: file.$id,
        $schema: file.$schema,
        $comment: $classComment,
        title: file.title,
        description: file.description,
        classProperties: {},
        examples: file.examples,
        // schema: file,
      };
    }
    Object.values(file.properties).forEach((prop) => {
      if (prop.type !== "object") {
        const $propertyComment = JSON.parse(prop.$comment);
        intermediate[$classComment["@id"]].classProperties[
          $propertyComment["@id"]
        ] = {
          $comment: $propertyComment,
          title: prop.title,
          description: prop.description,
        };
      } else {
        // let layer2ClassProperties = {};
        // Object.values(prop.properties).forEach((layer2Property) => {
        //   const $layer2PropertyComment = JSON.parse(layer2Property.$comment);
        //   //   console.log($layer2PropertyComment);
        //   if (!intermediate[$layer2PropertyComment["@id"]]) {
        //     intermediate[$layer2PropertyComment["@id"]] = {
        //       $comment: $layer2PropertyComment,
        //       title: layer2Property.title,
        //       description: layer2Property.description,
        //       classProperties: {},
        //     };
        //   }
        // });
        // const $propertyComment = JSON.parse(prop.$comment);
        // intermediate[$classComment["@id"]].classProperties[
        //   $propertyComment["@id"]
        // ] = {
        //   $comment: $propertyComment,
        //   title: prop.title,
        //   description: prop.description,
        // };
        // console.log(prop);
      }
    });
  });
  return intermediate;
};

const getContextFromIntermediate = (intermediate) => {
  let partialContext = {};
  Object.values(intermediate).forEach((classDefinition) => {
    let propertDefinitionPartialContext = {};
    Object.values(classDefinition.classProperties).forEach((classProperty) => {
      propertDefinitionPartialContext = {
        ...propertDefinitionPartialContext,
        [classProperty.$comment.term]: {
          "@id": classProperty.$comment["@id"],
        },
      };
    });

    partialContext = {
      ...partialContext,
      [classDefinition.$comment.term]: {
        "@id": classDefinition.$comment["@id"],
        "@context": {
          "@version": 1.1,
          "@protected": true,
          id: "@id",
          type: "@type",
          ...propertDefinitionPartialContext,
        },
      },
    };
  });
  return {
    "@context": {
      "@version": 1.1,
      "@protected": true,
      name: "http://schema.org/name",
      description: "http://schema.org/description",
      identifier: "http://schema.org/identifier",
      image: {
        "@id": "http://schema.org/image",
        "@type": "@id",
      },
      ...partialContext,
    },
  };
};

const deleteRandomProperty = (obj) => {
  let mutated = { ...obj };
  let randomProperty = Object.keys(mutated)[
    faker.random.number(Object.keys(mutated).length - 1)
  ];
  delete mutated[randomProperty];
  return mutated;
};

const addRandomProperty = (obj) => {
  let mutated = { ...obj };
  mutated = {
    ...mutated,
    [faker.hacker.noun()]: faker.hacker.verb(),
  };
  return mutated;
};

const deleteRandomNumberProperties = (obj) => {
  let mutated = { ...obj };
  let randomNumberOfPropertiesToDelete =
    faker.random.number(Object.keys(mutated).length - 1) + 1;
  while (randomNumberOfPropertiesToDelete > 0) {
    mutated = deleteRandomProperty(mutated);
    randomNumberOfPropertiesToDelete -= 1;
  }
  return mutated;
};

const addRandomNumberProperties = (obj) => {
  let mutated = { ...obj };
  let randomNumberOfPropertiesToAdd = faker.random.number(3) + 1;
  while (randomNumberOfPropertiesToAdd > 0) {
    mutated = addRandomProperty(mutated);
    randomNumberOfPropertiesToAdd -= 1;
  }
  return mutated;
};

const writeFileToPublic = (targetSubDirectory, fileData) => {
  fs.writeFileSync(
    path.resolve(__dirname, "../../../docs/", targetSubDirectory),
    fileData
  );
};

const classDefinitionToFixtureJson = (classDefinition) => {
  const relativePathToFixture = classDefinition.$id
    .split("https://w3id.org/traceability/schemas/")
    .pop();
  const fixture = fs
    .readFileSync(
      path.resolve(
        __dirname,
        "../../../docs/test-vectors/",
        relativePathToFixture
      )
    )
    .toString();
  return JSON.parse(fixture);
};

module.exports = {
  classDefinitionToFixtureJson,
  writeFileToPublic,
  addRandomProperty,
  addRandomNumberProperties,
  deleteRandomNumberProperties,
  deleteRandomProperty,
  getAllJsonFilesFromDirectory,
  getIntermediateFromDirectory,
  getContextFromIntermediate,
};
