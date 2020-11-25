const fs = require('fs');
const path = require('path');
const issuer = require('../services/issuer');

it('can issue / verify AgInspectionReport', async () => {
    const { verified, verifiableCredential } = await issuer.issue({
        credentialSubject: {
            id: 'did:example:123',
            type: 'AgInspectionReport',
            facility: {
                type: "Place",
                globalLocationNumber: "9101318209329",
                geo: {
                    type: "GeoCoordinates",
                    latitude: "-62.7434",
                    longitude: "-162.4415"
                },
                address: {
                    type: "PostalAddress",
                    organizationName: "Luettgen - Kris",
                    streetAddress: "8593 Alejandra Stream",
                    addressLocality: "Toymouth",
                    addressRegion: "Florida",
                    postalCode: "39338-8131",
                    addressCountry: "Benin"
                }
            },
            inspector: {
                type: "Inspector",
                person: "Janice Franecki",
                credential: [
                    {
                        type: "Credential",
                        credentialCategory: "Dynamic Program Agent",
                        credentialValue: "Specialist"
                    },
                    {
                        type: "Credential",
                        credentialCategory: "Dynamic Group Assistant",
                        credentialValue: "Manager"
                    },
                    {
                        type: "Credential",
                        credentialCategory: "Direct Response Facilitator",
                        credentialValue: "Executive"
                    }
                ]
            },
            applicantId: "148140",
            inspectionDate: "10-4-2020",
            inspectionType: "General",
            observation: [
                {
                    type: "Observation",
                    property: {
                        type: "ChemicalProperty",
                        name: "Radon",
                        formula: "Rn",
                        inchi: "InChI=1S/Rn",
                        inchikey: "SYUHGPGVQRZVTB-UHFFFAOYSA-N"
                    }
                }
            ]
        }
    }, [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/traceability/v1',
    ]);
    expect(verified).toBe(true);
    fs.writeFileSync(path.resolve(__dirname, '../../../docs/credentials/AgInspectionReport.json'), JSON.stringify(verifiableCredential, null, 2));
});
